#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  routingJson: path.join(searchBookRoot, "data", "discord-review-routing.json"),
  authoredJson: path.join(searchBookRoot, "data", "authored-pages.json"),
  outMarkdown: path.join(searchBookRoot, "DISCORD-EDITORIAL-QUEUE.md"),
};

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--routing-json") args.routingJson = path.resolve(argv[++index] || "");
    else if (arg === "--authored-json") args.authoredJson = path.resolve(argv[++index] || "");
    else if (arg === "--out") args.outMarkdown = path.resolve(argv[++index] || "");
    else if (arg === "--help") {
      console.log("Usage: node scripts/build-discord-editorial-queue.mjs [--routing-json data/discord-review-routing.json] [--out DISCORD-EDITORIAL-QUEUE.md]");
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function markdownCell(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\|/g, "\\|");
}

function inlineCodeList(values) {
  const items = (values || []).filter(Boolean);
  return items.length ? items.map((item) => `\`${markdownCell(item)}\``).join(", ") : "`none`";
}

function reviewTypeSummary(byReviewType = {}) {
  const entries = Object.entries(byReviewType).sort((a, b) => a[0].localeCompare(b[0]));
  return entries.length ? entries.map(([key, count]) => `${key}:${count}`).join(", ") : "none";
}

function pageTitle(pageById, pageId) {
  return pageById.get(pageId)?.title || pageId;
}

function assertSafeRoutingSummary(routing) {
  if (routing.rawDiscordTextIncluded !== false) throw new Error("Discord routing summary includes raw Discord text.");
  if (routing.sourceAnswerTextIncluded !== false) throw new Error("Discord routing summary includes source answer text.");
  if (routing.valuesPrinted !== false) throw new Error("Discord routing summary is not marked valuesPrinted:false.");
  if (routing.routingReady !== true || routing.status !== "routed") throw new Error("Discord routing summary is not ready.");
}

function renderMarkdown(routing, authored) {
  assertSafeRoutingSummary(routing);
  const pageById = new Map((authored.pages || []).map((page) => [page.id, page]));
  const reviewPlan = routing.reviewPlan || {};
  const routeCoverage = reviewPlan.routeCoverage || {};
  const pageFitReview = reviewPlan.pageFitReview || [];
  const refusalReview = reviewPlan.refusalReview || [];
  const summary = routing.summary || {};

  const lines = [
    "# Discord Editorial Queue",
    "",
    "Generated: `deterministic-build`",
    "",
    "> Reviewer artifact derived only from `data/discord-review-routing.json`. It contains item ids, page ids, source keys, route counts, and refusal reasons. It intentionally omits raw Discord questions, raw Lafa excerpts, and generated answer text.",
    "",
    "## Summary",
    "",
    `- Routing status: \`${routing.status}\``,
    `- Routed review items: ${summary.routedItems || 0}`,
    `- Page-fit groups ready: ${reviewPlan.pageFitReviewReady || 0}`,
    `- Page-fit routed items: ${reviewPlan.pageFitItemCount || 0}`,
    `- Refusal-review items: ${reviewPlan.refusalReviewReady || 0}`,
    `- Refusal policy ready: ${reviewPlan.refusalPolicyReadyItems || 0}/${reviewPlan.refusalReviewReady || 0}`,
    `- Refusal policy review required: ${reviewPlan.refusalPolicyReviewRequired || 0}/${reviewPlan.refusalReviewReady || 0}`,
    `- Route coverage: ${routeCoverage.pageFitCoveredByPublicRoutes || 0}/${routeCoverage.totalPageFitGroups || 0} page-fit groups covered by public route aliases`,
    `- Source-backed existing page fits: ${routeCoverage.triageReadyPageFitGroups || 0}/${routeCoverage.totalPageFitGroups || 0}`,
    `- Public copy sufficient: ${routeCoverage.publicCopyReadyPageFitGroups || 0}/${routeCoverage.totalPageFitGroups || 0}`,
    `- Public copy review required: ${routeCoverage.publicCopyReviewRequired || 0}/${routeCoverage.totalPageFitGroups || 0}`,
    `- Single-route page-fit groups remaining: ${routeCoverage.pageFitSingleRouteRemaining || 0}`,
    `- Groups without a public route: ${routeCoverage.pageFitWithoutPublicRoute || 0}`,
    `- Raw Discord text included: \`${routing.rawDiscordTextIncluded}\``,
    `- Source answer text included: \`${routing.sourceAnswerTextIncluded}\``,
    `- Values printed: \`${routing.valuesPrinted}\``,
    "",
    "## Reviewer Rules",
    "",
    "- Treat this as evidence for existing public pages, not permission to quote Discord or Lafa.",
    "- Add new public copy only when a cited page is missing a source-backed explanation.",
    "- Promote only primary-source paraphrases; do not quote Discord or Lafa excerpts from local packets.",
    "- Keep unreviewed Discord/Lafa identity claims, Phase B economics, secrets, and financial advice in refusal lanes.",
    "",
    "## Page-Fit Review",
    "",
    "| Rank | Page | Title | Routed Items | Item IDs | Review Types | Source Keys | Public Routes | Triage Status | Public Copy | Next Step |",
    "| ---: | --- | --- | ---: | --- | --- | --- | ---: | --- | --- | --- |",
    ...pageFitReview.map((entry, index) =>
      [
        index + 1,
        `\`${markdownCell(entry.pageId)}\``,
        markdownCell(pageTitle(pageById, entry.pageId)),
        entry.routedItems || 0,
        inlineCodeList(entry.itemIds),
        markdownCell(reviewTypeSummary(entry.byReviewType)),
        inlineCodeList(entry.sourceKeys),
        entry.publicRouteCount || 0,
        `\`${markdownCell(entry.automatedTriageStatus || "untriaged")}\``,
        `\`${markdownCell(entry.publicCopyStatus || "editorial-review-required")}\``,
        markdownCell(entry.nextStep || "Confirm the existing page fit before changing public copy."),
      ].join(" | ").replace(/^/, "| ").replace(/$/, " |"),
    ),
    "",
    "## Refusal Review",
    "",
    "| Item ID | Type | Status | Refusal Reason | Policy Status | Action | Next Step |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...refusalReview.map((entry) =>
      [
        `\`${markdownCell(entry.itemId)}\``,
        markdownCell(entry.reviewType),
        `\`${markdownCell(entry.routeStatus)}\``,
        `\`${markdownCell(entry.refusalReason)}\``,
        `\`${markdownCell(entry.refusalPolicyStatus || "needs-refusal-policy-review")}\``,
        `\`${markdownCell(entry.reviewAction)}\``,
        markdownCell(entry.nextStep || "Keep refusal behavior unless primary-source review approves a grounded public answer."),
      ].join(" | ").replace(/^/, "| ").replace(/$/, " |"),
    ),
    "",
  ];
  return `${lines.join("\n")}\n`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const routing = readJson(args.routingJson);
  const authored = readJson(args.authoredJson);
  const markdown = renderMarkdown(routing, authored);
  fs.writeFileSync(args.outMarkdown, markdown);
  const reviewPlan = routing.reviewPlan || {};
  const routeCoverage = reviewPlan.routeCoverage || {};
  console.log(JSON.stringify({
    status: "passed",
    service: "search-book-discord-editorial-queue",
    output: path.relative(searchBookRoot, args.outMarkdown),
    routedItems: routing.summary?.routedItems || 0,
    pageFitReviewReady: reviewPlan.pageFitReviewReady || 0,
    refusalReviewReady: reviewPlan.refusalReviewReady || 0,
    pageFitCoveredByPublicRoutes: routeCoverage.pageFitCoveredByPublicRoutes || 0,
    totalPageFitGroups: routeCoverage.totalPageFitGroups || 0,
    valuesPrinted: false,
  }, null, 2));
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
