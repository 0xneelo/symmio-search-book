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
  outJson: path.join(searchBookRoot, "data", "discord-editorial-queue.json"),
  outJs: path.join(searchBookRoot, "data", "discord-editorial-queue.js"),
};

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--routing-json") args.routingJson = path.resolve(argv[++index] || "");
    else if (arg === "--authored-json") args.authoredJson = path.resolve(argv[++index] || "");
    else if (arg === "--out") args.outMarkdown = path.resolve(argv[++index] || "");
    else if (arg === "--out-json") args.outJson = path.resolve(argv[++index] || "");
    else if (arg === "--out-js") args.outJs = path.resolve(argv[++index] || "");
    else if (arg === "--help") {
      console.log("Usage: node scripts/build-discord-editorial-queue.mjs [--routing-json data/discord-review-routing.json] [--out DISCORD-EDITORIAL-QUEUE.md] [--out-json data/discord-editorial-queue.json] [--out-js data/discord-editorial-queue.js]");
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

function buildDisposition(pageFitReview, refusalReview) {
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
  const publicCopyChangesProposed = pageFitReview.filter(
    (entry) => entry.publicCopyStatus !== "source-backed-public-copy-sufficient",
  ).length;
  const exactDiscordStatementsPromoted = 0;

  return {
    readyForReviewerHandoff:
      pageFitReview.length > 0 &&
      pageFitKeepExistingPublicCopy === pageFitReview.length &&
      refusalKeepPolicy === refusalReview.length &&
      publicCopyChangesProposed === 0 &&
      exactDiscordStatementsPromoted === 0,
    pageFitGroups: pageFitReview.length,
    pageFitKeepExistingPublicCopy,
    pageFitNeedsPublicCopyChange: pageFitReview.length - pageFitKeepExistingPublicCopy,
    refusalItems: refusalReview.length,
    refusalKeepPolicy,
    refusalNeedsPolicyReview: refusalReview.length - refusalKeepPolicy,
    publicCopyChangesProposed,
    exactDiscordStatementsPromoted,
    publicEffect: "Existing source-backed public pages and refusal behavior stay unchanged; Discord/Lafa items remain demand signals unless a future primary-source review approves new public paraphrases.",
  };
}

function buildReviewerWorkflow(pageFitReview, refusalReview) {
  return {
    status: "ready",
    mode: "no-raw-source-backed-review",
    counts: {
      pageFitGroups: pageFitReview.length,
      refusalItems: refusalReview.length,
      publicCopyChangesAllowed: 0,
      exactDiscordStatementsAllowed: 0,
    },
    phaseOrder: [
      {
        id: "privacy-preflight",
        label: "Privacy Preflight",
        items: 1,
        action: "Run the Discord review-artifact checker against committed data and any local /tmp packets before editorial review.",
        acceptance: "Raw Discord/Lafa excerpts stay outside the repo, raw-field checks pass, and valuesPrinted remains false.",
      },
      {
        id: "page-fit-review",
        label: "Page-Fit Review",
        items: pageFitReview.length,
        action: "For each page-fit group, open the existing public page and confirm the cited source keys already cover the demand signal.",
        acceptance: "Keep existing source-backed public copy unless a primary-source gap is found; never quote Discord/Lafa text.",
      },
      {
        id: "refusal-review",
        label: "Refusal Review",
        items: refusalReview.length,
        action: "Confirm refusal-lane items still require policy refusal rather than a new public answer.",
        acceptance: "Keep refusal behavior unless future primary-source review creates a grounded public page.",
      },
      {
        id: "closeout",
        label: "Closeout",
        items: 1,
        action: "Regenerate the sanitized queue and rerun verification before any public-copy change is committed.",
        acceptance: "The queue reports zero public-copy changes proposed and zero exact Discord/Lafa statements promoted.",
      },
    ],
    requiredEvidence: [
      "npm run search-book:discord-editorial-queue",
      "npm run search-book:check-discord-review-artifacts",
      "npm run search-book:check-discord-refusals",
    ],
    promotionPolicy: {
      publicCopyChangeSource: "primary-source-only",
      discordQuotationAllowed: false,
      lafaQuotationAllowed: false,
      exactDiscordStatementsAllowed: 0,
      publicCopyChangesAllowed: 0,
    },
  };
}

function buildQueueData(routing, authored) {
  assertSafeRoutingSummary(routing);
  const pageById = new Map((authored.pages || []).map((page) => [page.id, page]));
  const reviewPlan = routing.reviewPlan || {};
  const routeCoverage = reviewPlan.routeCoverage || {};
  const pageFitReview = reviewPlan.pageFitReview || [];
  const refusalReview = reviewPlan.refusalReview || [];
  const summary = routing.summary || {};
  const queue = {
    generatedAt: "deterministic-build",
    status: "passed",
    queueReady: true,
    source: {
      routingJson: "data/discord-review-routing.json",
      markdown: "DISCORD-EDITORIAL-QUEUE.md",
    },
    privacy: {
      rawDiscordTextIncluded: routing.rawDiscordTextIncluded === true,
      sourceAnswerTextIncluded: routing.sourceAnswerTextIncluded === true,
      generatedAnswerTextIncluded: false,
      valuesPrinted: routing.valuesPrinted === true,
      publicUseBoundary: reviewPlan.publicUseBoundary || "Do not quote Discord/Lafa text from this plan; use it only to prioritize source-backed page and route review.",
    },
    summary: {
      routingStatus: routing.status || null,
      routedItems: summary.routedItems || 0,
      pageFitGroupsReady: reviewPlan.pageFitReviewReady || 0,
      pageFitRoutedItems: reviewPlan.pageFitItemCount || 0,
      refusalReviewItems: reviewPlan.refusalReviewReady || 0,
      refusalPolicyReadyItems: reviewPlan.refusalPolicyReadyItems || 0,
      refusalPolicyReviewRequired: reviewPlan.refusalPolicyReviewRequired || 0,
      routeCoverage: {
        totalPageFitGroups: routeCoverage.totalPageFitGroups || 0,
        pageFitCoveredByPublicRoutes: routeCoverage.pageFitCoveredByPublicRoutes || 0,
        sourceBackedPageFitGroups: routeCoverage.triageReadyPageFitGroups || 0,
        publicCopyReadyPageFitGroups: routeCoverage.publicCopyReadyPageFitGroups || 0,
        publicCopyReviewRequired: routeCoverage.publicCopyReviewRequired || 0,
        pageFitSingleRouteRemaining: routeCoverage.pageFitSingleRouteRemaining || 0,
        pageFitWithoutPublicRoute: routeCoverage.pageFitWithoutPublicRoute || 0,
        totalPublicRoutesToPageFitPages: routeCoverage.totalPublicRoutesToPageFitPages || 0,
        coverageReady: routeCoverage.coverageReady === true,
        triageReady: routeCoverage.triageReady === true,
        publicCopyReady: routeCoverage.publicCopyReady === true,
      },
    },
    reviewerRules: [
      "Treat this as evidence for existing public pages, not permission to quote Discord or Lafa.",
      "Add new public copy only when a cited page is missing a source-backed explanation.",
      "Promote only primary-source paraphrases; do not quote Discord or Lafa excerpts from local packets.",
      "Keep unreviewed Discord/Lafa identity claims, Phase B economics, secrets, and financial advice in refusal lanes.",
    ],
    reviewerWorkflow: buildReviewerWorkflow(pageFitReview, refusalReview),
    pageFitReview: pageFitReview.map((entry, index) => ({
      rank: index + 1,
      pageId: entry.pageId,
      title: pageTitle(pageById, entry.pageId),
      routedItems: entry.routedItems || 0,
      itemIds: entry.itemIds || [],
      byReviewType: entry.byReviewType || {},
      sourceKeys: entry.sourceKeys || [],
      publicRouteCount: entry.publicRouteCount || 0,
      automatedTriageStatus: entry.automatedTriageStatus || "untriaged",
      publicCopyStatus: entry.publicCopyStatus || "editorial-review-required",
      reviewAction: entry.reviewAction || "",
      nextStep: entry.nextStep || "Confirm the existing page fit before changing public copy.",
    })),
    refusalReview: refusalReview.map((entry) => ({
      itemId: entry.itemId,
      reviewType: entry.reviewType,
      routeStatus: entry.routeStatus,
      refusalReason: entry.refusalReason,
      refusalPolicyStatus: entry.refusalPolicyStatus || "needs-refusal-policy-review",
      reviewAction: entry.reviewAction,
      nextStep: entry.nextStep || "Keep refusal behavior unless primary-source review approves a grounded public answer.",
    })),
  };
  queue.disposition = buildDisposition(queue.pageFitReview, queue.refusalReview);
  return queue;
}

function renderMarkdown(queue) {
  const summary = queue.summary || {};
  const routeCoverage = summary.routeCoverage || {};
  const disposition = queue.disposition || {};

  const lines = [
    "# Discord Editorial Queue",
    "",
    "Generated: `deterministic-build`",
    "",
    "> Reviewer artifact derived only from `data/discord-review-routing.json`. It contains item ids, page ids, source keys, route counts, and refusal reasons. It intentionally omits raw Discord questions, raw Lafa excerpts, and generated answer text.",
    "",
    "## Summary",
    "",
    `- Routing status: \`${summary.routingStatus}\``,
    `- Routed review items: ${summary.routedItems || 0}`,
    `- Page-fit groups ready: ${summary.pageFitGroupsReady || 0}`,
    `- Page-fit routed items: ${summary.pageFitRoutedItems || 0}`,
    `- Refusal-review items: ${summary.refusalReviewItems || 0}`,
    `- Refusal policy ready: ${summary.refusalPolicyReadyItems || 0}/${summary.refusalReviewItems || 0}`,
    `- Refusal policy review required: ${summary.refusalPolicyReviewRequired || 0}/${summary.refusalReviewItems || 0}`,
    `- Route coverage: ${routeCoverage.pageFitCoveredByPublicRoutes || 0}/${routeCoverage.totalPageFitGroups || 0} page-fit groups covered by public route aliases`,
    `- Source-backed existing page fits: ${routeCoverage.sourceBackedPageFitGroups || 0}/${routeCoverage.totalPageFitGroups || 0}`,
    `- Public copy sufficient: ${routeCoverage.publicCopyReadyPageFitGroups || 0}/${routeCoverage.totalPageFitGroups || 0}`,
    `- Public copy review required: ${routeCoverage.publicCopyReviewRequired || 0}/${routeCoverage.totalPageFitGroups || 0}`,
    `- Single-route page-fit groups remaining: ${routeCoverage.pageFitSingleRouteRemaining || 0}`,
    `- Groups without a public route: ${routeCoverage.pageFitWithoutPublicRoute || 0}`,
    `- Raw Discord text included: \`${queue.privacy?.rawDiscordTextIncluded}\``,
    `- Source answer text included: \`${queue.privacy?.sourceAnswerTextIncluded}\``,
    `- Values printed: \`${queue.privacy?.valuesPrinted}\``,
    "",
    "## Reviewer Rules",
    "",
    ...queue.reviewerRules.map((rule) => `- ${rule}`),
    "",
    "## Reviewer Workflow",
    "",
    `- Workflow status: \`${queue.reviewerWorkflow?.status || "unknown"}\``,
    `- Workflow mode: \`${queue.reviewerWorkflow?.mode || "unknown"}\``,
    `- Page-fit groups to review: ${queue.reviewerWorkflow?.counts?.pageFitGroups || 0}`,
    `- Refusal items to review: ${queue.reviewerWorkflow?.counts?.refusalItems || 0}`,
    `- Public-copy changes allowed from Discord/Lafa alone: ${queue.reviewerWorkflow?.counts?.publicCopyChangesAllowed || 0}`,
    `- Exact Discord/Lafa statements allowed for promotion: ${queue.reviewerWorkflow?.counts?.exactDiscordStatementsAllowed || 0}`,
    "",
    "| Phase | Items | Action | Acceptance |",
    "| --- | ---: | --- | --- |",
    ...(queue.reviewerWorkflow?.phaseOrder || []).map((phase) =>
      [
        `\`${markdownCell(phase.id)}\``,
        phase.items || 0,
        markdownCell(phase.action),
        markdownCell(phase.acceptance),
      ].join(" | ").replace(/^/, "| ").replace(/$/, " |"),
    ),
    "",
    `Required evidence: ${inlineCodeList(queue.reviewerWorkflow?.requiredEvidence || [])}`,
    "",
    "## Automated Disposition",
    "",
    `- Ready for reviewer handoff: \`${disposition.readyForReviewerHandoff === true}\``,
    `- Page-fit disposition: ${disposition.pageFitKeepExistingPublicCopy || 0}/${disposition.pageFitGroups || 0} keep existing source-backed public copy`,
    `- Page-fit public-copy changes proposed: ${disposition.publicCopyChangesProposed || 0}`,
    `- Refusal disposition: ${disposition.refusalKeepPolicy || 0}/${disposition.refusalItems || 0} keep refusal policy`,
    `- Refusal policy review required: ${disposition.refusalNeedsPolicyReview || 0}`,
    `- Exact Discord/Lafa statements promoted: ${disposition.exactDiscordStatementsPromoted || 0}`,
    `- Public effect: ${disposition.publicEffect || "Existing source-backed public pages and refusal behavior stay unchanged."}`,
    "",
    "## Page-Fit Review",
    "",
    "| Rank | Page | Title | Routed Items | Item IDs | Review Types | Source Keys | Public Routes | Triage Status | Public Copy | Next Step |",
    "| ---: | --- | --- | ---: | --- | --- | --- | ---: | --- | --- | --- |",
    ...queue.pageFitReview.map((entry) =>
      [
        entry.rank,
        `\`${markdownCell(entry.pageId)}\``,
        markdownCell(entry.title),
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
    ...queue.refusalReview.map((entry) =>
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
  const queue = buildQueueData(routing, authored);
  const markdown = renderMarkdown(queue);
  fs.writeFileSync(args.outMarkdown, markdown);
  fs.writeFileSync(args.outJson, `${JSON.stringify(queue, null, 2)}\n`);
  fs.writeFileSync(args.outJs, `window.SearchBookDiscordEditorialQueue = ${JSON.stringify(queue)};\n`);
  const routeCoverage = queue.summary?.routeCoverage || {};
  console.log(JSON.stringify({
    status: "passed",
    service: "search-book-discord-editorial-queue",
    output: path.relative(searchBookRoot, args.outMarkdown),
    outputJson: path.relative(searchBookRoot, args.outJson),
    outputJs: path.relative(searchBookRoot, args.outJs),
    routedItems: queue.summary?.routedItems || 0,
    pageFitReviewReady: queue.summary?.pageFitGroupsReady || 0,
    refusalReviewReady: queue.summary?.refusalReviewItems || 0,
    pageFitCoveredByPublicRoutes: routeCoverage.pageFitCoveredByPublicRoutes || 0,
    totalPageFitGroups: routeCoverage.totalPageFitGroups || 0,
    readyForReviewerHandoff: queue.disposition?.readyForReviewerHandoff === true,
    pageFitKeepExistingPublicCopy: queue.disposition?.pageFitKeepExistingPublicCopy || 0,
    refusalKeepPolicy: queue.disposition?.refusalKeepPolicy || 0,
    exactDiscordStatementsPromoted: queue.disposition?.exactDiscordStatementsPromoted || 0,
    reviewerWorkflowStatus: queue.reviewerWorkflow?.status || "missing",
    reviewerWorkflowPhases: queue.reviewerWorkflow?.phaseOrder?.length || 0,
    rawDiscordTextIncluded: queue.privacy?.rawDiscordTextIncluded === true,
    sourceAnswerTextIncluded: queue.privacy?.sourceAnswerTextIncluded === true,
    valuesPrinted: queue.privacy?.valuesPrinted === true,
  }, null, 2));
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
