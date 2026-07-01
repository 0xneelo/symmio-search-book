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
  queueJson: process.env.SEARCH_BOOK_DISCORD_EDITORIAL_QUEUE_JSON || path.join(searchBookRoot, "data", "discord-editorial-queue.json"),
  queueMarkdown: process.env.SEARCH_BOOK_DISCORD_EDITORIAL_QUEUE || path.join(searchBookRoot, "DISCORD-EDITORIAL-QUEUE.md"),
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
  --queue-json path    Defaults to data/discord-editorial-queue.json
  --queue-md path      Defaults to DISCORD-EDITORIAL-QUEUE.md
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
    else if (arg === "--queue-json") args.queueJson = next;
    else if (arg === "--queue-md") args.queueMarkdown = next;
    else throw new Error(`Unknown argument: ${arg}\n${usage()}`);
    index += 1;
  }
  args.reviewJson = args.reviewJson ? path.resolve(args.reviewJson) : "";
  args.routingJson = args.routingJson ? path.resolve(args.routingJson) : "";
  args.summaryJson = path.resolve(args.summaryJson);
  args.queueJson = path.resolve(args.queueJson);
  args.queueMarkdown = path.resolve(args.queueMarkdown);
  return args;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
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
  const refusalPolicyReadyItems = Number(reviewPlan.refusalPolicyReadyItems || 0);
  const refusalPolicyReviewRequired = Number(reviewPlan.refusalPolicyReviewRequired || 0);
  const totalPageFitGroups = Number(routeCoverage.totalPageFitGroups || 0);
  const coveredPageFitGroups = Number(routeCoverage.pageFitCoveredByPublicRoutes || 0);
  const sourceBackedPageFitGroups = Number(routeCoverage.sourceBackedPageFitGroups || 0);
  const triageReadyPageFitGroups = Number(routeCoverage.triageReadyPageFitGroups || 0);
  const publicCopyReadyPageFitGroups = Number(routeCoverage.publicCopyReadyPageFitGroups || 0);
  const publicCopyReviewRequired = Number(routeCoverage.publicCopyReviewRequired || 0);

  addCheck(checks, "summary-ready", summary.routingReady === true && summary.status === "routed", `status=${summary.status}; routingReady=${summary.routingReady}`);
  addCheck(checks, "summary-no-raw-flags", summary.rawDiscordTextIncluded === false && summary.sourceAnswerTextIncluded === false, "");
  addCheck(checks, "summary-values-not-printed", summary.valuesPrinted === false, `valuesPrinted=${summary.valuesPrinted}`);
  addCheck(checks, "summary-raw-keys-absent", hits.length === 0, hits.length ? `rawKeyHits=${hits.length}` : "none");
  addCheck(checks, "summary-sample-leaks-absent", leaks === 0, `sampleLeaks=${leaks}`);
  addCheck(
    checks,
    "summary-counts",
    Number(summary.summary?.routedItems || 0) === items.length &&
      items.length > 0 &&
      pageFitCount + refusalCount === items.length &&
      reviewPlan.refusalPolicyReady === true &&
      refusalPolicyReadyItems === refusalCount &&
      refusalPolicyReviewRequired === 0,
    `routedItems=${summary.summary?.routedItems ?? 0}; items=${items.length}; reviewPlanItems=${pageFitCount + refusalCount}; refusalPolicyReady=${refusalPolicyReadyItems}/${refusalCount}; refusalPolicyReviewRequired=${refusalPolicyReviewRequired}`,
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
  addCheck(
    checks,
    "summary-page-fit-triage-ready",
    routeCoverage.triageReady === true &&
      totalPageFitGroups > 0 &&
      sourceBackedPageFitGroups === totalPageFitGroups &&
      triageReadyPageFitGroups === totalPageFitGroups &&
      publicCopyReadyPageFitGroups === totalPageFitGroups &&
      publicCopyReviewRequired === 0 &&
      routeCoverage.publicCopyReady === true,
    JSON.stringify({
      totalPageFitGroups,
      sourceBackedPageFitGroups,
      triageReadyPageFitGroups,
      publicCopyReadyPageFitGroups,
      publicCopyReviewRequired,
      triageReady: routeCoverage.triageReady === true,
      publicCopyReady: routeCoverage.publicCopyReady === true,
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
      sourceBackedPageFitGroups: routeCoverage.sourceBackedPageFitGroups ?? null,
      triageReadyPageFitGroups: routeCoverage.triageReadyPageFitGroups ?? null,
      publicCopyReadyPageFitGroups: routeCoverage.publicCopyReadyPageFitGroups ?? null,
      publicCopyReviewRequired: routeCoverage.publicCopyReviewRequired ?? null,
      coverageReady: routeCoverage.coverageReady === true,
      triageReady: routeCoverage.triageReady === true,
      publicCopyReady: routeCoverage.publicCopyReady === true,
    },
    refusalPolicy: {
      refusalPolicyReadyItems,
      refusalPolicyReviewRequired,
      refusalPolicyReady: reviewPlan.refusalPolicyReady === true,
    },
  };
}

function validateEditorialQueue(markdown, filePath, summary, checks, samples) {
  const reviewPlan = summary.reviewPlan || {};
  const routeCoverage = reviewPlan.routeCoverage || {};
  const pageFitReview = reviewPlan.pageFitReview || [];
  const refusalReview = reviewPlan.refusalReview || [];
  const pageFitKeepExistingPublicCopy = pageFitReview.filter(
    (entry) =>
      entry.reviewAction === "keep-existing-public-copy" &&
      entry.publicCopyStatus === "source-backed-public-copy-sufficient",
  ).length;
  const refusalKeepPolicy = refusalReview.filter(
    (entry) =>
      entry.reviewAction === "keep-refusal-policy" &&
      entry.refusalPolicyStatus === "policy-refusal-ready",
  ).length;
  const summaryFragments = [
    "# Discord Editorial Queue",
    "Generated: `deterministic-build`",
    `- Routed review items: ${summary.summary?.routedItems || 0}`,
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
    "- Raw Discord text included: `false`",
    "- Source answer text included: `false`",
    "- Values printed: `false`",
    "## Automated Disposition",
    "## Reviewer Workflow",
    "- Workflow status: `ready`",
    "- Workflow mode: `no-raw-source-backed-review`",
    `- Page-fit groups to review: ${pageFitReview.length}`,
    `- Refusal items to review: ${refusalReview.length}`,
    "- Public-copy changes allowed from Discord/Lafa alone: 0",
    "- Exact Discord/Lafa statements allowed for promotion: 0",
    "| Phase | Items | Action | Acceptance |",
    "`privacy-preflight`",
    "`page-fit-review`",
    "`refusal-review`",
    "`closeout`",
    "Required evidence:",
    "`npm run search-book:discord-editorial-queue`",
    "`npm run search-book:check-discord-review-artifacts`",
    "`npm run search-book:check-discord-refusals`",
    "- Ready for reviewer handoff: `true`",
    `- Page-fit disposition: ${pageFitKeepExistingPublicCopy}/${pageFitReview.length} keep existing source-backed public copy`,
    "- Page-fit public-copy changes proposed: 0",
    `- Refusal disposition: ${refusalKeepPolicy}/${refusalReview.length} keep refusal policy`,
    "- Refusal policy review required: 0",
    "- Exact Discord/Lafa statements promoted: 0",
  ];
  const missingSummaryFragments = summaryFragments.filter((fragment) => !markdown.includes(fragment));
  const missingPageIds = pageFitReview.map((entry) => entry.pageId).filter((pageId) => !markdown.includes(`\`${pageId}\``));
  const missingPageItemIds = pageFitReview
    .flatMap((entry) => entry.itemIds || [])
    .filter((itemId) => !markdown.includes(`\`${itemId}\``));
  const missingPageSourceKeys = pageFitReview
    .flatMap((entry) => entry.sourceKeys || [])
    .filter((sourceKey) => !markdown.includes(`\`${sourceKey}\``));
  const missingPageTriageStatuses = pageFitReview
    .map((entry) => entry.automatedTriageStatus)
    .filter((status) => status && !markdown.includes(`\`${status}\``));
  const missingPagePublicCopyStatuses = pageFitReview
    .map((entry) => entry.publicCopyStatus)
    .filter((status) => status && !markdown.includes(`\`${status}\``));
  const missingRefusalIds = refusalReview.map((entry) => entry.itemId).filter((itemId) => !markdown.includes(`\`${itemId}\``));
  const missingRefusalReasons = refusalReview.map((entry) => entry.refusalReason).filter((reason) => reason && !markdown.includes(`\`${reason}\``));
  const missingRefusalPolicyStatuses = refusalReview
    .map((entry) => entry.refusalPolicyStatus)
    .filter((status) => status && !markdown.includes(`\`${status}\``));
  const rawReviewTableMarkers = [
    "| ID | Count | Question |",
    "| ID | Related Question | Answer Excerpt |",
    "Answer Excerpt",
    "Related Question",
    "normalizedQuestion",
    "answerExcerpt",
    "relatedQuestion",
    "containsRawDiscordExcerpts: true",
  ];
  const rawTableHits = rawReviewTableMarkers.filter((marker) => markdown.includes(marker));
  const leaks = sampleLeakCount(markdown, samples);

  addCheck(
    checks,
    "editorial-queue-summary-current",
    missingSummaryFragments.length === 0,
    missingSummaryFragments.length ? `missing=${missingSummaryFragments.join(" | ")}` : "summary fragments match sanitized routing summary",
  );
  addCheck(
    checks,
    "editorial-queue-page-fit-ids-present",
    missingPageIds.length === 0 &&
      missingPageItemIds.length === 0 &&
      missingPageSourceKeys.length === 0 &&
      missingPageTriageStatuses.length === 0 &&
      missingPagePublicCopyStatuses.length === 0,
    JSON.stringify({
      missingPageIds: missingPageIds.length,
      missingPageItemIds: missingPageItemIds.length,
      missingPageSourceKeys: missingPageSourceKeys.length,
      missingPageTriageStatuses: missingPageTriageStatuses.length,
      missingPagePublicCopyStatuses: missingPagePublicCopyStatuses.length,
    }),
  );
  addCheck(
    checks,
    "editorial-queue-refusals-present",
    missingRefusalIds.length === 0 && missingRefusalReasons.length === 0 && missingRefusalPolicyStatuses.length === 0,
    JSON.stringify({
      missingRefusalIds: missingRefusalIds.length,
      missingRefusalReasons: missingRefusalReasons.length,
      missingRefusalPolicyStatuses: missingRefusalPolicyStatuses.length,
    }),
  );
  addCheck(
    checks,
    "editorial-queue-no-raw-review-table",
    rawTableHits.length === 0,
    rawTableHits.length ? `rawTableMarkers=${rawTableHits.join(",")}` : "no raw review packet table markers",
  );
  addCheck(checks, "editorial-queue-sample-leaks-absent", leaks === 0, `sampleLeaks=${leaks}`);

  return {
    path: printablePath(filePath),
    pageFitReviewReady: pageFitReview.length,
    refusalReviewReady: refusalReview.length,
    sourceBackedExistingPageFits: routeCoverage.triageReadyPageFitGroups ?? null,
    publicCopyReadyPageFits: routeCoverage.publicCopyReadyPageFitGroups ?? null,
    publicCopyReviewRequired: routeCoverage.publicCopyReviewRequired ?? null,
    refusalPolicyReadyItems: reviewPlan.refusalPolicyReadyItems ?? null,
    refusalPolicyReviewRequired: reviewPlan.refusalPolicyReviewRequired ?? null,
    rawTableHits: rawTableHits.length,
    sampleLeaks: leaks,
  };
}

function sameValues(left = [], right = []) {
  const normalize = (values) => [...new Set((values || []).map(String).filter(Boolean))].sort();
  return JSON.stringify(normalize(left)) === JSON.stringify(normalize(right));
}

function validateEditorialQueueData(queue, filePath, summary, checks, samples) {
  const hits = rawKeyHits(queue);
  const leaks = sampleLeakCount(queue, samples);
  const reviewPlan = summary.reviewPlan || {};
  const routeCoverage = reviewPlan.routeCoverage || {};
  const queueSummary = queue.summary || {};
  const queueCoverage = queueSummary.routeCoverage || {};
  const disposition = queue.disposition || {};
  const workflow = queue.reviewerWorkflow || {};
  const workflowCounts = workflow.counts || {};
  const workflowPromotionPolicy = workflow.promotionPolicy || {};
  const workflowPhaseIds = (workflow.phaseOrder || []).map((phase) => phase.id);
  const pageFitReview = reviewPlan.pageFitReview || [];
  const queuePageFitReview = queue.pageFitReview || [];
  const refusalReview = reviewPlan.refusalReview || [];
  const queueRefusalReview = queue.refusalReview || [];
  const pageFitKeepExistingPublicCopy = queuePageFitReview.filter(
    (entry) =>
      entry.reviewAction === "keep-existing-public-copy" &&
      entry.publicCopyStatus === "source-backed-public-copy-sufficient",
  ).length;
  const refusalKeepPolicy = queueRefusalReview.filter(
    (entry) =>
      entry.reviewAction === "keep-refusal-policy" &&
      entry.refusalPolicyStatus === "policy-refusal-ready",
  ).length;
  const publicCopyChangesProposed = queuePageFitReview.filter(
    (entry) => entry.publicCopyStatus !== "source-backed-public-copy-sufficient",
  ).length;

  const pageFitMirrorFailures = pageFitReview.filter((entry) => {
    const matching = queuePageFitReview.find((candidate) => candidate.pageId === entry.pageId);
    return !matching ||
      matching.routedItems !== entry.routedItems ||
      matching.publicRouteCount !== entry.publicRouteCount ||
      matching.automatedTriageStatus !== entry.automatedTriageStatus ||
      matching.publicCopyStatus !== entry.publicCopyStatus ||
      !sameValues(matching.itemIds, entry.itemIds) ||
      !sameValues(matching.sourceKeys, entry.sourceKeys);
  });
  const refusalMirrorFailures = refusalReview.filter((entry) => {
    const matching = queueRefusalReview.find((candidate) => candidate.itemId === entry.itemId);
    return !matching ||
      matching.reviewType !== entry.reviewType ||
      matching.routeStatus !== entry.routeStatus ||
      matching.refusalReason !== entry.refusalReason ||
      matching.refusalPolicyStatus !== entry.refusalPolicyStatus ||
      matching.reviewAction !== entry.reviewAction;
  });

  addCheck(
    checks,
    "editorial-queue-data-ready",
    queue.status === "passed" &&
      queue.queueReady === true &&
      queue.privacy?.rawDiscordTextIncluded === false &&
      queue.privacy?.sourceAnswerTextIncluded === false &&
      queue.privacy?.generatedAnswerTextIncluded === false &&
      queue.privacy?.valuesPrinted === false,
    `status=${queue.status || "missing"}; queueReady=${queue.queueReady}; rawDiscord=${queue.privacy?.rawDiscordTextIncluded}; sourceAnswer=${queue.privacy?.sourceAnswerTextIncluded}; generatedAnswer=${queue.privacy?.generatedAnswerTextIncluded}; valuesPrinted=${queue.privacy?.valuesPrinted}`,
  );
  addCheck(checks, "editorial-queue-data-raw-keys-absent", hits.length === 0, hits.length ? `rawKeyHits=${hits.length}` : "none");
  addCheck(checks, "editorial-queue-data-sample-leaks-absent", leaks === 0, `sampleLeaks=${leaks}`);
  addCheck(
    checks,
    "editorial-queue-data-summary-current",
    queueSummary.routingStatus === summary.status &&
      queueSummary.routedItems === Number(summary.summary?.routedItems || 0) &&
      queueSummary.pageFitGroupsReady === Number(reviewPlan.pageFitReviewReady || 0) &&
      queueSummary.pageFitRoutedItems === Number(reviewPlan.pageFitItemCount || 0) &&
      queueSummary.refusalReviewItems === Number(reviewPlan.refusalReviewReady || 0) &&
      queueSummary.refusalPolicyReadyItems === Number(reviewPlan.refusalPolicyReadyItems || 0) &&
      queueSummary.refusalPolicyReviewRequired === Number(reviewPlan.refusalPolicyReviewRequired || 0) &&
      queueCoverage.totalPageFitGroups === Number(routeCoverage.totalPageFitGroups || 0) &&
      queueCoverage.pageFitCoveredByPublicRoutes === Number(routeCoverage.pageFitCoveredByPublicRoutes || 0) &&
      queueCoverage.sourceBackedPageFitGroups === Number(routeCoverage.triageReadyPageFitGroups || 0) &&
      queueCoverage.publicCopyReadyPageFitGroups === Number(routeCoverage.publicCopyReadyPageFitGroups || 0) &&
      queueCoverage.publicCopyReviewRequired === Number(routeCoverage.publicCopyReviewRequired || 0),
    JSON.stringify({
      routedItems: queueSummary.routedItems,
      expectedRoutedItems: summary.summary?.routedItems ?? null,
      pageFitGroupsReady: queueSummary.pageFitGroupsReady,
      expectedPageFitGroupsReady: reviewPlan.pageFitReviewReady ?? null,
      refusalReviewItems: queueSummary.refusalReviewItems,
      expectedRefusalReviewItems: reviewPlan.refusalReviewReady ?? null,
    }),
  );
  addCheck(
    checks,
    "editorial-queue-data-page-fit-plan-current",
    queuePageFitReview.length === pageFitReview.length && pageFitMirrorFailures.length === 0,
    JSON.stringify({
      queuePageFitReview: queuePageFitReview.length,
      expectedPageFitReview: pageFitReview.length,
      mirrorFailures: pageFitMirrorFailures.length,
    }),
  );
  addCheck(
    checks,
    "editorial-queue-data-refusal-plan-current",
    queueRefusalReview.length === refusalReview.length && refusalMirrorFailures.length === 0,
    JSON.stringify({
      queueRefusalReview: queueRefusalReview.length,
      expectedRefusalReview: refusalReview.length,
      mirrorFailures: refusalMirrorFailures.length,
    }),
  );
  addCheck(
    checks,
    "editorial-queue-data-disposition-current",
    disposition.readyForReviewerHandoff === true &&
      disposition.pageFitGroups === queuePageFitReview.length &&
      disposition.pageFitKeepExistingPublicCopy === pageFitKeepExistingPublicCopy &&
      disposition.pageFitNeedsPublicCopyChange === queuePageFitReview.length - pageFitKeepExistingPublicCopy &&
      disposition.refusalItems === queueRefusalReview.length &&
      disposition.refusalKeepPolicy === refusalKeepPolicy &&
      disposition.refusalNeedsPolicyReview === queueRefusalReview.length - refusalKeepPolicy &&
      disposition.publicCopyChangesProposed === publicCopyChangesProposed &&
      disposition.exactDiscordStatementsPromoted === 0,
    JSON.stringify({
      readyForReviewerHandoff: disposition.readyForReviewerHandoff === true,
      pageFitGroups: disposition.pageFitGroups ?? null,
      pageFitKeepExistingPublicCopy: disposition.pageFitKeepExistingPublicCopy ?? null,
      expectedPageFitKeepExistingPublicCopy: pageFitKeepExistingPublicCopy,
      refusalItems: disposition.refusalItems ?? null,
      refusalKeepPolicy: disposition.refusalKeepPolicy ?? null,
      expectedRefusalKeepPolicy: refusalKeepPolicy,
      publicCopyChangesProposed: disposition.publicCopyChangesProposed ?? null,
      exactDiscordStatementsPromoted: disposition.exactDiscordStatementsPromoted ?? null,
    }),
  );
  addCheck(
    checks,
    "editorial-queue-data-no-public-promotion",
    disposition.publicCopyChangesProposed === 0 && disposition.exactDiscordStatementsPromoted === 0,
    `publicCopyChangesProposed=${disposition.publicCopyChangesProposed ?? "missing"}; exactDiscordStatementsPromoted=${disposition.exactDiscordStatementsPromoted ?? "missing"}`,
  );
  addCheck(
    checks,
    "editorial-queue-data-reviewer-workflow-current",
    workflow.status === "ready" &&
      workflow.mode === "no-raw-source-backed-review" &&
      workflowCounts.pageFitGroups === queuePageFitReview.length &&
      workflowCounts.refusalItems === queueRefusalReview.length &&
      workflowCounts.publicCopyChangesAllowed === 0 &&
      workflowCounts.exactDiscordStatementsAllowed === 0 &&
      workflowPromotionPolicy.publicCopyChangeSource === "primary-source-only" &&
      workflowPromotionPolicy.discordQuotationAllowed === false &&
      workflowPromotionPolicy.lafaQuotationAllowed === false &&
      workflowPromotionPolicy.publicCopyChangesAllowed === 0 &&
      workflowPromotionPolicy.exactDiscordStatementsAllowed === 0 &&
      workflowPhaseIds.join(",") === "privacy-preflight,page-fit-review,refusal-review,closeout" &&
      (workflow.requiredEvidence || []).includes("npm run search-book:discord-editorial-queue") &&
      (workflow.requiredEvidence || []).includes("npm run search-book:check-discord-review-artifacts") &&
      (workflow.requiredEvidence || []).includes("npm run search-book:check-discord-refusals"),
    JSON.stringify({
      status: workflow.status || "missing",
      mode: workflow.mode || "missing",
      pageFitGroups: workflowCounts.pageFitGroups ?? null,
      expectedPageFitGroups: queuePageFitReview.length,
      refusalItems: workflowCounts.refusalItems ?? null,
      expectedRefusalItems: queueRefusalReview.length,
      phaseIds: workflowPhaseIds,
      publicCopyChangesAllowed: workflowCounts.publicCopyChangesAllowed ?? null,
      exactDiscordStatementsAllowed: workflowCounts.exactDiscordStatementsAllowed ?? null,
    }),
  );

  return {
    path: printablePath(filePath),
    status: queue.status || null,
    queueReady: queue.queueReady === true,
    routedItems: queueSummary.routedItems ?? null,
    pageFitReviewReady: queuePageFitReview.length,
    refusalReviewReady: queueRefusalReview.length,
    disposition: {
      readyForReviewerHandoff: disposition.readyForReviewerHandoff === true,
      pageFitGroups: disposition.pageFitGroups ?? null,
      pageFitKeepExistingPublicCopy: disposition.pageFitKeepExistingPublicCopy ?? null,
      pageFitNeedsPublicCopyChange: disposition.pageFitNeedsPublicCopyChange ?? null,
      refusalItems: disposition.refusalItems ?? null,
      refusalKeepPolicy: disposition.refusalKeepPolicy ?? null,
      refusalNeedsPolicyReview: disposition.refusalNeedsPolicyReview ?? null,
      publicCopyChangesProposed: disposition.publicCopyChangesProposed ?? null,
      exactDiscordStatementsPromoted: disposition.exactDiscordStatementsPromoted ?? null,
    },
    reviewerWorkflow: {
      status: workflow.status || null,
      mode: workflow.mode || null,
      phases: workflowPhaseIds.length,
      pageFitGroups: workflowCounts.pageFitGroups ?? null,
      refusalItems: workflowCounts.refusalItems ?? null,
      publicCopyChangesAllowed: workflowCounts.publicCopyChangesAllowed ?? null,
      exactDiscordStatementsAllowed: workflowCounts.exactDiscordStatementsAllowed ?? null,
    },
    rawKeyHits: hits.length,
    sampleLeaks: leaks,
    valuesPrinted: queue.privacy?.valuesPrinted === true,
  };
}

try {
  const args = parseArgs(process.argv.slice(2));
  const checks = [];
  const reviewPacket = args.reviewJson ? readJson(args.reviewJson) : null;
  const samples = reviewSamples(reviewPacket);
  const routingReport = args.routingJson ? readJson(args.routingJson) : null;
  const summary = readJson(args.summaryJson);
  const queueData = readJson(args.queueJson);
  const queueMarkdown = readText(args.queueMarkdown);

  const result = {
    status: "passed",
    service: "search-book-discord-review-artifacts-check",
    secrets: { valuesPrinted: false },
    reviewPacket: validateReviewPacket(reviewPacket, args.reviewJson, checks),
    routingReport: validateRoutingReport(routingReport, args.routingJson, checks, samples),
    summary: validateSummary(summary, args.summaryJson, checks, samples),
    editorialQueueData: validateEditorialQueueData(queueData, args.queueJson, summary, checks, samples),
    editorialQueue: validateEditorialQueue(queueMarkdown, args.queueMarkdown, summary, checks, samples),
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
