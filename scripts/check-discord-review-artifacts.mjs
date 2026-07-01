#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  reviewJson: process.env.SEARCH_BOOK_DISCORD_REVIEW_QUEUE || "",
  routingJson: process.env.SEARCH_BOOK_DISCORD_ROUTING_REPORT || "",
  summaryJson: process.env.SEARCH_BOOK_DISCORD_ROUTING_SUMMARY || path.join(searchBookRoot, "data", "discord-review-routing.json"),
};

const forbiddenSanitizedKeys = new Set([
  "answer",
  "answerExcerpt",
  "content",
  "generatedAnswer",
  "markdownBody",
  "messageText",
  "normalizedContent",
  "normalizedQuestion",
  "normalizedText",
  "paragraphs",
  "question",
  "rawMarkdown",
  "rawText",
  "relatedQuestion",
  "sourceAnswer",
  "sourceBody",
  "sourceText",
  "text",
]);

function usage() {
  return `Usage:
  node scripts/check-discord-review-artifacts.mjs [options]

Options:
  --review-json path   Optional raw internal review packet; must be outside repo
  --routing-json path  Optional sanitized route-review report; must be outside repo
  --summary-json path  Defaults to data/discord-review-routing.json
  --json               Accepted for command symmetry; output is always JSON

The command validates Discord/Lafa review privacy boundaries without printing raw
Discord questions, Lafa excerpts, generated answers, API keys, or token values.`;
}

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--json") continue;
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) throw new Error(`${arg} requires a value.\n${usage()}`);
    if (arg === "--review-json") args.reviewJson = next;
    else if (arg === "--routing-json") args.routingJson = next;
    else if (arg === "--summary-json") args.summaryJson = next;
    else throw new Error(`Unknown argument: ${arg}\n${usage()}`);
    index += 1;
  }
  args.reviewJson = args.reviewJson ? path.resolve(args.reviewJson) : "";
  args.routingJson = args.routingJson ? path.resolve(args.routingJson) : "";
  args.summaryJson = path.resolve(args.summaryJson);
  return args;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function isInsideRepo(filePath) {
  const relative = path.relative(searchBookRoot, path.resolve(filePath));
  return !relative.startsWith("..") && !path.isAbsolute(relative);
}

function printablePath(filePath) {
  const resolved = path.resolve(filePath);
  return isInsideRepo(resolved) ? path.relative(searchBookRoot, resolved) : resolved;
}

function addCheck(checks, id, passed, detail = "", evidence = null) {
  checks.push({
    id,
    passed: Boolean(passed),
    detail,
    ...(evidence ? { evidence } : {}),
  });
}

function rawKeyHits(value) {
  const hits = [];
  const visit = (node, trail = []) => {
    if (Array.isArray(node)) {
      node.forEach((item, index) => visit(item, [...trail, String(index)]));
      return;
    }
    if (!node || typeof node !== "object") return;
    for (const [key, child] of Object.entries(node)) {
      if (forbiddenSanitizedKeys.has(key)) hits.push([...trail, key].join("."));
      visit(child, [...trail, key]);
    }
  };
  visit(value);
  return hits;
}

function reviewSamples(reviewPacket) {
  if (!reviewPacket) return [];
  const samples = [];
  const maybeAdd = (value) => {
    const text = String(value || "").replace(/\s+/g, " ").trim();
    if (text.length >= 24) samples.push(text.slice(0, 120));
  };
  for (const item of reviewPacket.questionReviewItems || []) {
    maybeAdd(item.question);
    maybeAdd(item.normalizedQuestion);
  }
  for (const item of reviewPacket.lafaReviewItems || []) {
    maybeAdd(item.relatedQuestion);
    maybeAdd(item.answerExcerpt);
  }
  return [...new Set(samples)].slice(0, 200);
}

function sampleLeakCount(target, samples) {
  if (!samples.length) return 0;
  const serialized = JSON.stringify(target || {});
  return samples.filter((sample) => serialized.includes(sample)).length;
}

function validateReviewPacket(packet, filePath, checks) {
  if (!filePath) return null;
  addCheck(checks, "review-packet-outside-repo", !isInsideRepo(filePath), "raw review packet must stay outside the repository");
  addCheck(checks, "review-packet-ready", packet.status === "review-queue-ready", `status=${packet.status || "missing"}`);
  addCheck(
    checks,
    "review-packet-marked-internal",
    packet.containsRawDiscordExcerpts === true && packet.doNotCommit === true,
    `containsRawDiscordExcerpts=${packet.containsRawDiscordExcerpts}; doNotCommit=${packet.doNotCommit}`,
  );
  addCheck(
    checks,
    "review-packet-source-corpus-ready",
    packet.sourceCorpus?.corpusReady === true && packet.sourceCorpus?.publicationMode === "paraphrase",
    `corpusReady=${packet.sourceCorpus?.corpusReady}; publicationMode=${packet.sourceCorpus?.publicationMode || "missing"}`,
  );
  addCheck(
    checks,
    "review-packet-review-items",
    Number(packet.totals?.questionReviewItems || 0) + Number(packet.totals?.lafaReviewItems || 0) > 0,
    `questions=${packet.totals?.questionReviewItems ?? 0}; lafa=${packet.totals?.lafaReviewItems ?? 0}`,
  );
  return {
    path: printablePath(filePath),
    status: packet.status || null,
    containsRawDiscordExcerpts: packet.containsRawDiscordExcerpts === true,
    doNotCommit: packet.doNotCommit === true,
    totals: packet.totals || null,
    sourceTotals: packet.sourceCorpus?.totals || null,
  };
}

function validateRoutingReport(report, filePath, checks, samples) {
  if (!filePath) return null;
  const hits = rawKeyHits(report);
  const leaks = sampleLeakCount(report, samples);
  addCheck(checks, "routing-report-outside-repo", !isInsideRepo(filePath), "temporary route-review report should stay outside the repository");
  addCheck(checks, "routing-report-ready", report.status === "routed", `status=${report.status || "missing"}`);
  addCheck(checks, "routing-report-no-raw-flags", report.rawDiscordTextIncluded === false && report.sourceAnswerTextIncluded === false, "");
  addCheck(checks, "routing-report-values-not-printed", report.valuesPrinted === false, `valuesPrinted=${report.valuesPrinted}`);
  addCheck(checks, "routing-report-raw-keys-absent", hits.length === 0, hits.length ? `rawKeyHits=${hits.length}` : "none");
  addCheck(checks, "routing-report-sample-leaks-absent", leaks === 0, `sampleLeaks=${leaks}`);
  addCheck(
    checks,
    "routing-report-counts",
    Number(report.summary?.routedItems || 0) === (report.items || []).length && (report.items || []).length > 0,
    `routedItems=${report.summary?.routedItems ?? 0}; items=${(report.items || []).length}`,
  );
  return {
    path: printablePath(filePath),
    status: report.status || null,
    routedItems: report.summary?.routedItems ?? null,
    rawDiscordTextIncluded: report.rawDiscordTextIncluded === true,
    sourceAnswerTextIncluded: report.sourceAnswerTextIncluded === true,
    valuesPrinted: report.valuesPrinted === true,
    rawKeyHits: hits.length,
    sampleLeaks: leaks,
  };
}

function validateSummary(summary, filePath, checks, samples) {
  const hits = rawKeyHits(summary);
  const leaks = sampleLeakCount(summary, samples);
  const items = summary.items || [];
  const reviewPlan = summary.reviewPlan || {};
  const routeCoverage = reviewPlan.routeCoverage || {};
  const pageFitCount = Number(reviewPlan.pageFitItemCount || 0);
  const refusalCount = Number(reviewPlan.refusalItemCount || 0);
  const totalPageFitGroups = Number(routeCoverage.totalPageFitGroups || 0);
  const coveredPageFitGroups = Number(routeCoverage.pageFitCoveredByPublicRoutes || 0);

  addCheck(checks, "summary-ready", summary.routingReady === true && summary.status === "routed", `status=${summary.status}; routingReady=${summary.routingReady}`);
  addCheck(checks, "summary-no-raw-flags", summary.rawDiscordTextIncluded === false && summary.sourceAnswerTextIncluded === false, "");
  addCheck(checks, "summary-values-not-printed", summary.valuesPrinted === false, `valuesPrinted=${summary.valuesPrinted}`);
  addCheck(checks, "summary-raw-keys-absent", hits.length === 0, hits.length ? `rawKeyHits=${hits.length}` : "none");
  addCheck(checks, "summary-sample-leaks-absent", leaks === 0, `sampleLeaks=${leaks}`);
  addCheck(
    checks,
    "summary-counts",
    Number(summary.summary?.routedItems || 0) === items.length && items.length > 0 && pageFitCount + refusalCount === items.length,
    `routedItems=${summary.summary?.routedItems ?? 0}; items=${items.length}; reviewPlanItems=${pageFitCount + refusalCount}`,
  );
  addCheck(
    checks,
    "summary-route-coverage",
    routeCoverage.coverageReady === true &&
      totalPageFitGroups > 0 &&
      coveredPageFitGroups === totalPageFitGroups &&
      Number(routeCoverage.pageFitSingleRouteRemaining || 0) === 0 &&
      Number(routeCoverage.pageFitWithoutPublicRoute || 0) === 0,
    JSON.stringify({
      totalPageFitGroups,
      coveredPageFitGroups,
      singleRoute: routeCoverage.pageFitSingleRouteRemaining || 0,
      withoutPublicRoute: routeCoverage.pageFitWithoutPublicRoute || 0,
      coverageReady: routeCoverage.coverageReady === true,
    }),
  );
  return {
    path: printablePath(filePath),
    status: summary.status || null,
    routingReady: summary.routingReady === true,
    routedItems: summary.summary?.routedItems ?? null,
    rawDiscordTextIncluded: summary.rawDiscordTextIncluded === true,
    sourceAnswerTextIncluded: summary.sourceAnswerTextIncluded === true,
    valuesPrinted: summary.valuesPrinted === true,
    rawKeyHits: hits.length,
    sampleLeaks: leaks,
    routeCoverage: {
      totalPageFitGroups,
      coveredPageFitGroups,
      pageFitSingleRouteRemaining: routeCoverage.pageFitSingleRouteRemaining ?? null,
      pageFitWithoutPublicRoute: routeCoverage.pageFitWithoutPublicRoute ?? null,
      coverageReady: routeCoverage.coverageReady === true,
    },
  };
}

try {
  const args = parseArgs(process.argv.slice(2));
  const checks = [];
  const reviewPacket = args.reviewJson ? readJson(args.reviewJson) : null;
  const samples = reviewSamples(reviewPacket);
  const routingReport = args.routingJson ? readJson(args.routingJson) : null;
  const summary = readJson(args.summaryJson);

  const result = {
    status: "passed",
    service: "search-book-discord-review-artifacts-check",
    secrets: { valuesPrinted: false },
    reviewPacket: validateReviewPacket(reviewPacket, args.reviewJson, checks),
    routingReport: validateRoutingReport(routingReport, args.routingJson, checks, samples),
    summary: validateSummary(summary, args.summaryJson, checks, samples),
    checks,
  };

  const failed = checks.filter((check) => !check.passed);
  if (failed.length) result.status = "failed";

  const rendered = JSON.stringify(result, null, 2);
  if (failed.length) {
    console.error(rendered);
    process.exitCode = 1;
  } else {
    console.log(rendered);
  }
} catch (error) {
  console.error(JSON.stringify({
    status: "failed",
    service: "search-book-discord-review-artifacts-check",
    message: error.message,
    secrets: { valuesPrinted: false },
  }, null, 2));
  process.exitCode = 1;
}
