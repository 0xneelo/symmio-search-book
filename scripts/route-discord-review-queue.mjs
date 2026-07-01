#!/usr/bin/env node

import childProcess from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

function parseArgs(argv) {
  const args = {
    reviewJson: "",
    outDir: path.join(os.tmpdir(), `search-book-discord-routing-${stamp()}`),
    questionLimit: 80,
    lafaLimit: 80,
    allowRepoOutput: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--review-json") args.reviewJson = argv[++index];
    else if (arg === "--out-dir") args.outDir = argv[++index];
    else if (arg === "--question-limit") args.questionLimit = Number(argv[++index]);
    else if (arg === "--lafa-limit") args.lafaLimit = Number(argv[++index]);
    else if (arg === "--allow-repo-output") args.allowRepoOutput = true;
    else if (arg === "--help") {
      console.log(`Usage: node scripts/route-discord-review-queue.mjs --review-json /tmp/review/discord-review-queue.json [--out-dir /tmp/routes]`);
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (!args.reviewJson) throw new Error("Missing --review-json.");
  assertPositiveInteger(args.questionLimit, "--question-limit");
  assertPositiveInteger(args.lafaLimit, "--lafa-limit");
  return args;
}

function assertPositiveInteger(value, label) {
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`Invalid ${label}: ${value}`);
  }
}

function stamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function sha(value) {
  return crypto.createHash("sha256").update(String(value || "")).digest("hex").slice(0, 16);
}

function assertOutputPath(outDir, allowRepoOutput) {
  const resolved = path.resolve(outDir);
  const relative = path.relative(searchBookRoot, resolved);
  const insideRepo = !relative.startsWith("..") && !path.isAbsolute(relative);
  if (insideRepo && !allowRepoOutput) {
    throw new Error(`Refusing to write Discord-derived routing output inside the repository without --allow-repo-output: ${resolved}`);
  }
  return resolved;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function routeQuery(query, itemId) {
  const result = childProcess.spawnSync(
    process.execPath,
    [
      path.join(searchBookRoot, "scripts", "run-llm-rag-answer.mjs"),
      "--mode",
      "extractive",
      "--query",
      query,
      "--request-id",
      `discord-review-${itemId}`,
      "--source",
      "discord-review-router",
      "--json",
    ],
    {
      cwd: searchBookRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  if (result.status !== 0) {
    return {
      status: "routing-error",
      errorCategory: "extractive-runtime-failed",
      primaryPageId: "",
      confidence: "",
      citationPageIds: [],
      citationSourceKeys: [],
      relatedPageIds: [],
    };
  }

  let response = null;
  try {
    response = JSON.parse(result.stdout);
  } catch {
    return {
      status: "routing-error",
      errorCategory: "invalid-runtime-json",
      primaryPageId: "",
      confidence: "",
      citationPageIds: [],
      citationSourceKeys: [],
      relatedPageIds: [],
    };
  }

  return {
    status: response.status || "",
    refusalReason: response.refusalReason || "",
    primaryPageId: response.primaryPageId || "",
    confidence: response.confidence || "",
    citationCount: Array.isArray(response.citations) ? response.citations.length : 0,
    citationPageIds: unique((response.citations || []).map((citation) => citation.pageId)),
    citationSourceKeys: unique((response.citations || []).map((citation) => citation.sourceKey)),
    relatedPageIds: unique(response.relatedPageIds || []),
  };
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
}

function reviewAction(route) {
  if (route.status === "answered" && route.primaryPageId) return "review-existing-page-fit";
  if (route.status === "refusal" && route.refusalReason === "discord-corpus-review-required") return "keep-discord-claim-refusal";
  if (route.status === "refusal") return "review-refusal-policy";
  if (route.status === "routing-error") return "rerun-or-route-manually";
  return "candidate-gap-or-new-page";
}

function buildItems(packet, args) {
  const questionItems = (packet.questionReviewItems || [])
    .slice(0, args.questionLimit)
    .map((item) => ({
      itemId: item.id,
      reviewType: "repeated-question",
      queryInputKind: "question",
      queryHash: sha(item.question || item.normalizedQuestion),
      count: item.count || 0,
      firstSeen: item.firstSeen || "",
      lastSeen: item.lastSeen || "",
      seededTopicMatches: item.seededTopicMatches || [],
      route: routeQuery(item.question || item.normalizedQuestion || "", item.id),
    }));

  const lafaItems = (packet.lafaReviewItems || [])
    .slice(0, args.lafaLimit)
    .map((item) => {
      const query = item.relatedQuestion || item.answerExcerpt || "";
      const inputKind = item.relatedQuestion ? "related-question" : "answer-excerpt";
      return {
        itemId: item.id,
        reviewType: "lafa-answer-candidate",
        queryInputKind: inputKind,
        queryHash: sha(query),
        hasRelatedQuestion: Boolean(item.relatedQuestion),
        requiresReview: item.requiresReview !== false,
        route: routeQuery(query, item.id),
      };
    });

  return [...questionItems, ...lafaItems].map((item) => ({
    ...item,
    reviewAction: reviewAction(item.route),
  }));
}

function summarize(items) {
  const byStatus = {};
  const byAction = {};
  const byPrimaryPageId = {};
  for (const item of items) {
    byStatus[item.route.status || "unknown"] = (byStatus[item.route.status || "unknown"] || 0) + 1;
    byAction[item.reviewAction] = (byAction[item.reviewAction] || 0) + 1;
    if (item.route.primaryPageId) byPrimaryPageId[item.route.primaryPageId] = (byPrimaryPageId[item.route.primaryPageId] || 0) + 1;
  }
  return {
    routedItems: items.length,
    byStatus,
    byAction,
    topPrimaryPageIds: Object.entries(byPrimaryPageId)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 20)
      .map(([pageId, count]) => ({ pageId, count })),
  };
}

function renderMarkdown(report) {
  const lines = [
    "# Sanitized Discord Review Routing",
    "",
    `Generated: ${report.generatedAt}`,
    "",
    "> This file is safe to share internally as a routing artifact: it contains item ids, hashes, page ids, statuses, and source keys only. It intentionally omits raw Discord questions and answer excerpts.",
    "",
    "## Summary",
    "",
    `- Routed items: ${report.summary.routedItems}`,
    `- Raw Discord text included: ${report.rawDiscordTextIncluded}`,
    `- Source review packet: ${report.reviewPacket.basename}`,
    "",
    "### By Status",
    "",
    ...Object.entries(report.summary.byStatus).map(([status, count]) => `- \`${status}\`: ${count}`),
    "",
    "### By Review Action",
    "",
    ...Object.entries(report.summary.byAction).map(([action, count]) => `- \`${action}\`: ${count}`),
    "",
    "### Top Existing Page Routes",
    "",
    ...report.summary.topPrimaryPageIds.map((item) => `- \`${item.pageId}\`: ${item.count}`),
    "",
    "## Routed Items",
    "",
    "| Item | Type | Status | Primary Page | Confidence | Sources | Action |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...report.items.map(
      (item) =>
        `| \`${item.itemId}\` | ${item.reviewType} | \`${item.route.status || ""}\` | \`${item.route.primaryPageId || ""}\` | \`${item.route.confidence || ""}\` | ${item.route.citationSourceKeys.map((key) => `\`${key}\``).join(", ")} | \`${item.reviewAction}\` |`,
    ),
    "",
  ];
  return `${lines.join("\n")}\n`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const outDir = assertOutputPath(args.outDir, args.allowRepoOutput);
  fs.mkdirSync(outDir, { recursive: true });
  const reviewJson = path.resolve(args.reviewJson);
  const packet = readJson(reviewJson);
  const items = buildItems(packet, args);
  const report = {
    generatedAt: new Date().toISOString(),
    status: "routed",
    rawDiscordTextIncluded: false,
    sourceAnswerTextIncluded: false,
    valuesPrinted: false,
    reviewPacket: {
      basename: path.basename(reviewJson),
      containsRawDiscordExcerpts: packet.containsRawDiscordExcerpts === true,
      totals: packet.totals || {},
      sourceTotals: packet.sourceCorpus?.totals || {},
    },
    summary: summarize(items),
    items,
  };

  const jsonPath = path.join(outDir, "discord-review-routing.json");
  const markdownPath = path.join(outDir, "discord-review-routing.md");
  writeJson(jsonPath, report);
  fs.writeFileSync(markdownPath, renderMarkdown(report));
  console.log(
    JSON.stringify(
      {
        status: report.status,
        outDir,
        jsonPath,
        markdownPath,
        rawDiscordTextIncluded: report.rawDiscordTextIncluded,
        valuesPrinted: report.valuesPrinted,
        summary: report.summary,
      },
      null,
      2,
    ),
  );
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
