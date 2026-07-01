#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  routingJson: process.env.SEARCH_BOOK_DISCORD_ROUTING_REPORT || "",
  outJson: path.join(searchBookRoot, "data", "discord-review-routing.json"),
  outJs: path.join(searchBookRoot, "data", "discord-review-routing.js"),
  routesJson: path.join(searchBookRoot, "data", "question-routes.json"),
  authoredJson: path.join(searchBookRoot, "data", "authored-pages.json"),
};

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--routing-json") args.routingJson = argv[++index] || "";
    else if (arg === "--out-json") args.outJson = argv[++index] || "";
    else if (arg === "--out-js") args.outJs = argv[++index] || "";
    else if (arg === "--routes-json") args.routesJson = argv[++index] || "";
    else if (arg === "--authored-json") args.authoredJson = argv[++index] || "";
    else if (arg === "--help") {
      console.log("Usage: node scripts/build-discord-routing-summary.mjs [--routing-json /tmp/.../discord-review-routing.json] [--routes-json data/question-routes.json]");
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function readJson(filePath, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function writeOutputs(report, args) {
  fs.mkdirSync(path.dirname(args.outJson), { recursive: true });
  fs.writeFileSync(args.outJson, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(args.outJs, `window.SearchBookDiscordReviewRouting = ${JSON.stringify(report)};\n`);
  console.log(
    JSON.stringify(
      {
        status: report.status,
        routingReady: report.routingReady,
        rawDiscordTextIncluded: report.rawDiscordTextIncluded,
        sourceAnswerTextIncluded: report.sourceAnswerTextIncluded,
        valuesPrinted: report.valuesPrinted,
        routedItems: report.summary.routedItems,
        answered: report.summary.byStatus.answered || 0,
        refusals: report.summary.byStatus.refusal || 0,
        pageFitReviewReady: report.reviewPlan.pageFitReviewReady,
        refusalReviewReady: report.reviewPlan.refusalReviewReady,
        pageFitCoveredByPublicRoutes: report.reviewPlan.routeCoverage?.pageFitCoveredByPublicRoutes || 0,
        pageFitSingleRouteRemaining: report.reviewPlan.routeCoverage?.pageFitSingleRouteRemaining || 0,
        publicCopyReadyPageFitGroups: report.reviewPlan.routeCoverage?.publicCopyReadyPageFitGroups || 0,
        publicCopyReviewRequired: report.reviewPlan.routeCoverage?.publicCopyReviewRequired || 0,
      },
      null,
      2,
    ),
  );
}

function assertSafeRoutingReport(report) {
  if (report.rawDiscordTextIncluded !== false) throw new Error("Routing report includes raw Discord text.");
  if (report.sourceAnswerTextIncluded !== false) throw new Error("Routing report includes source answer text.");
  if (report.valuesPrinted !== false) throw new Error("Routing report is not marked valuesPrinted:false.");
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
}

function sanitizeItem(item) {
  const route = item.route || {};
  return {
    itemId: item.itemId || "",
    reviewType: item.reviewType || "",
    queryInputKind: item.queryInputKind || "",
    queryHash: item.queryHash || "",
    count: item.count || 0,
    seededTopicMatches: item.seededTopicMatches || [],
    hasRelatedQuestion: item.hasRelatedQuestion === true,
    requiresReview: item.requiresReview === true,
    route: {
      status: route.status || "",
      refusalReason: route.refusalReason || "",
      primaryPageId: route.primaryPageId || "",
      confidence: route.confidence || "",
      citationCount: route.citationCount || 0,
      citationPageIds: unique(route.citationPageIds || []),
      citationSourceKeys: unique(route.citationSourceKeys || []),
      relatedPageIds: unique(route.relatedPageIds || []),
    },
    reviewAction: item.reviewAction || "",
  };
}

function summarizeItems(items) {
  const byStatus = {};
  const byAction = {};
  const byReviewType = {};
  const byPrimaryPageId = {};
  for (const item of items) {
    const status = item.route.status || "unknown";
    byStatus[status] = (byStatus[status] || 0) + 1;
    byAction[item.reviewAction || "unclassified"] = (byAction[item.reviewAction || "unclassified"] || 0) + 1;
    byReviewType[item.reviewType || "unknown"] = (byReviewType[item.reviewType || "unknown"] || 0) + 1;
    if (item.route.primaryPageId) byPrimaryPageId[item.route.primaryPageId] = (byPrimaryPageId[item.route.primaryPageId] || 0) + 1;
  }
  return {
    routedItems: items.length,
    byStatus,
    byAction,
    byReviewType,
    topPrimaryPageIds: Object.entries(byPrimaryPageId)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 20)
      .map(([pageId, count]) => ({ pageId, count })),
  };
}

function incrementCount(map, key) {
  if (!key) return;
  map[key] = (map[key] || 0) + 1;
}

function readPublicRouteCounts(args) {
  const routes = readJson(args.routesJson, {});
  const counts = new Map();
  for (const route of routes.answerable || []) {
    if (!route.pageId || route.missing === true) continue;
    if (route.pageStatus && route.pageStatus !== "published") continue;
    counts.set(route.pageId, (counts.get(route.pageId) || 0) + 1);
  }
  return counts;
}

function readAuthoredPages(args) {
  const authored = readJson(args.authoredJson, {});
  return new Map((authored.pages || []).map((page) => [page.id, page]));
}

function hasSourcesSection(page) {
  return /(^|\n)## Sources\b/.test(page?.bodyMarkdown || "");
}

function routeSourceKeysCoveredByPage(entry, page) {
  const pageSourceKeys = new Set(page?.sourceKeys || []);
  return (entry.sourceKeys || []).every((sourceKey) => pageSourceKeys.has(sourceKey));
}

function addPublicRouteCoverage(pageFitReview, args) {
  const publicRouteCounts = readPublicRouteCounts(args);
  const authoredPages = readAuthoredPages(args);
  const annotated = pageFitReview.map((entry) => {
    const publicRouteCount = publicRouteCounts.get(entry.pageId) || 0;
    const page = authoredPages.get(entry.pageId) || null;
    const coverageStatus =
      publicRouteCount > 1 ? "route-aliases-present" : publicRouteCount === 1 ? "single-route" : "no-public-route";
    const sourceBacked = (entry.sourceKeys || []).length > 0;
    const automatedTriageStatus =
      coverageStatus === "route-aliases-present" && sourceBacked
        ? "source-backed-existing-page-fit"
        : coverageStatus === "route-aliases-present"
          ? "existing-page-fit-needs-source-review"
          : coverageStatus === "single-route"
            ? "needs-route-alias-review"
            : "needs-public-route-review";
    const sourcesSectionPresent = hasSourcesSection(page);
    const sourceKeysCovered = routeSourceKeysCoveredByPage(entry, page);
    const existingPublicCopySufficient =
      automatedTriageStatus === "source-backed-existing-page-fit" &&
      page?.status === "published" &&
      sourcesSectionPresent &&
      sourceKeysCovered;
    const publicCopyStatus = existingPublicCopySufficient
      ? "source-backed-public-copy-sufficient"
      : "editorial-review-required";
    return {
      ...entry,
      publicRouteCount,
      coverageStatus,
      sourceBacked,
      automatedTriageStatus,
      publicCopyStatus,
      pageStatus: page?.status || "",
      pageSourceKeys: unique(page?.sourceKeys || []),
      sourcesSectionPresent,
      sourceKeysCovered,
      existingPublicCopySufficient,
      reviewAction: existingPublicCopySufficient ? "keep-existing-public-copy" : entry.reviewAction,
      nextStep: existingPublicCopySufficient
        ? "Existing source-backed public copy and route aliases are sufficient; do not add Discord-derived wording unless a reviewer finds a primary-source gap."
        : entry.nextStep,
      coveredByPublicRoutes: coverageStatus === "route-aliases-present",
    };
  });
  const sourceBackedPageFitGroups = annotated.filter((entry) => entry.sourceBacked).length;
  const triageReadyPageFitGroups = annotated.filter(
    (entry) => entry.automatedTriageStatus === "source-backed-existing-page-fit",
  ).length;
  const publicCopyReadyPageFitGroups = annotated.filter((entry) => entry.existingPublicCopySufficient).length;
  const publicCopyReviewRequired = annotated.filter((entry) => entry.publicCopyStatus === "editorial-review-required").length;

  return {
    pageFitReview: annotated,
    routeCoverage: {
      totalPageFitGroups: annotated.length,
      pageFitCoveredByPublicRoutes: annotated.filter((entry) => entry.coveredByPublicRoutes).length,
      pageFitSingleRouteRemaining: annotated.filter((entry) => entry.coverageStatus === "single-route").length,
      pageFitWithoutPublicRoute: annotated.filter((entry) => entry.coverageStatus === "no-public-route").length,
      totalPublicRoutesToPageFitPages: annotated.reduce((total, entry) => total + entry.publicRouteCount, 0),
      sourceBackedPageFitGroups,
      triageReadyPageFitGroups,
      publicCopyReadyPageFitGroups,
      publicCopyReviewRequired,
      coverageReady:
        annotated.length > 0 &&
        annotated.every((entry) => entry.coverageStatus === "route-aliases-present"),
      triageReady:
        annotated.length > 0 &&
        triageReadyPageFitGroups === annotated.length,
      publicCopyReady:
        annotated.length > 0 &&
        publicCopyReadyPageFitGroups === annotated.length &&
        publicCopyReviewRequired === 0,
    },
  };
}

const refusalPolicyReadyReasons = new Set([
  "discord-corpus-review-required",
  "no-public-answer-page",
]);

function refusalPolicyStatus(item) {
  if (item.route.status !== "refusal") return "needs-refusal-policy-review";
  if (!refusalPolicyReadyReasons.has(item.route.refusalReason || "")) return "needs-refusal-policy-review";
  return "policy-refusal-ready";
}

function buildReviewPlan(items, args) {
  const pageFitById = new Map();
  const refusalReview = [];
  for (const item of items) {
    if (item.route.status === "answered" && item.route.primaryPageId) {
      const pageId = item.route.primaryPageId;
      const entry =
        pageFitById.get(pageId) ||
        {
          pageId,
          routedItems: 0,
          itemIds: [],
          byReviewType: {},
          sourceKeys: [],
          reviewAction: "review-existing-page-fit",
          nextStep: "Confirm the existing page and citations satisfy the demand signal before adding any public route or copy.",
        };
      entry.routedItems += 1;
      entry.itemIds.push(item.itemId);
      incrementCount(entry.byReviewType, item.reviewType);
      entry.sourceKeys = unique([...entry.sourceKeys, ...(item.route.citationSourceKeys || [])]);
      pageFitById.set(pageId, entry);
      continue;
    }

    const policyStatus = refusalPolicyStatus(item);
    refusalReview.push({
      itemId: item.itemId,
      reviewType: item.reviewType,
      reviewAction: policyStatus === "policy-refusal-ready" ? "keep-refusal-policy" : item.reviewAction || "review-refusal-policy",
      routeStatus: item.route.status || "unknown",
      refusalReason: item.route.refusalReason || "",
      refusalPolicyStatus: policyStatus,
      nextStep: policyStatus === "policy-refusal-ready"
        ? "Keep refusal behavior; answer only if future primary-source review creates a grounded public page."
        : "Review refusal behavior before exposing any public answer.",
    });
  }

  const pageFitReview = [...pageFitById.values()]
    .map((entry) => ({
      ...entry,
      itemIds: unique(entry.itemIds),
    }))
    .sort((a, b) => b.routedItems - a.routedItems || a.pageId.localeCompare(b.pageId));
  const routeCoverage = addPublicRouteCoverage(pageFitReview, args);

  return {
    pageFitReviewReady: routeCoverage.pageFitReview.length,
    pageFitItemCount: routeCoverage.pageFitReview.reduce((total, entry) => total + entry.routedItems, 0),
    refusalReviewReady: refusalReview.length,
    refusalItemCount: refusalReview.length,
    refusalPolicyReadyItems: refusalReview.filter((entry) => entry.refusalPolicyStatus === "policy-refusal-ready").length,
    refusalPolicyReviewRequired: refusalReview.filter((entry) => entry.refusalPolicyStatus !== "policy-refusal-ready").length,
    refusalPolicyReady: refusalReview.length > 0 && refusalReview.every((entry) => entry.refusalPolicyStatus === "policy-refusal-ready"),
    publicUseBoundary: "Do not quote Discord/Lafa text from this plan; use it only to prioritize source-backed page and route review.",
    routeCoverage: routeCoverage.routeCoverage,
    pageFitReview: routeCoverage.pageFitReview,
    refusalReview: refusalReview.sort((a, b) => a.itemId.localeCompare(b.itemId)),
  };
}

function sanitizeSource(input, args) {
  const packet = input.reviewPacket || input.source?.reviewPacket || {};
  return {
    reportBasename: args.routingJson ? path.basename(args.routingJson) : input.source?.reportBasename || "",
    reviewPacket: {
      basename: packet.basename || "",
      totals: packet.totals || {},
      sourceTotals: packet.sourceTotals || {},
    },
  };
}

function buildFromRoutingReport(input, args) {
  assertSafeRoutingReport(input);
  const items = (input.items || []).map(sanitizeItem);
  const summary = summarizeItems(items);
  const reviewPlan = buildReviewPlan(items, args);
  return {
    generatedAt: "deterministic-build",
    status: "routed",
    routingReady: true,
    rawDiscordTextIncluded: false,
    sourceAnswerTextIncluded: false,
    valuesPrinted: false,
    source: sanitizeSource(input, args),
    summary,
    reviewPlan,
    items,
  };
}

function buildFromExisting(input, args) {
  assertSafeRoutingReport(input);
  const items = (input.items || []).map(sanitizeItem);
  const summary = summarizeItems(items);
  const reviewPlan = buildReviewPlan(items, args);
  return {
    generatedAt: "deterministic-build",
    status: "routed",
    routingReady: true,
    rawDiscordTextIncluded: false,
    sourceAnswerTextIncluded: false,
    valuesPrinted: false,
    reusedCheckedInRouting: true,
    source: sanitizeSource(input, args),
    summary,
    reviewPlan,
    items,
  };
}

function parkedReport() {
  return {
    generatedAt: "deterministic-build",
    status: "no-routing-report",
    routingReady: false,
    rawDiscordTextIncluded: false,
    sourceAnswerTextIncluded: false,
    valuesPrinted: false,
    source: {
      reportBasename: "",
      reviewPacket: {
        basename: "",
        totals: {},
        sourceTotals: {},
      },
    },
    summary: {
      routedItems: 0,
      byStatus: {},
      byAction: {},
      byReviewType: {},
      topPrimaryPageIds: [],
    },
    reviewPlan: {
      pageFitReviewReady: 0,
      pageFitItemCount: 0,
      refusalReviewReady: 0,
      refusalItemCount: 0,
      publicUseBoundary: "Do not quote Discord/Lafa text from this plan; use it only to prioritize source-backed page and route review.",
      routeCoverage: {
        totalPageFitGroups: 0,
        pageFitCoveredByPublicRoutes: 0,
        pageFitSingleRouteRemaining: 0,
        pageFitWithoutPublicRoute: 0,
        totalPublicRoutesToPageFitPages: 0,
        coverageReady: false,
      },
      pageFitReview: [],
      refusalReview: [],
    },
    items: [],
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.routingJson) {
    const input = readJson(args.routingJson);
    if (!input) throw new Error(`Routing report not readable: ${args.routingJson}`);
    writeOutputs(buildFromRoutingReport(input, args), args);
    return;
  }

  const existing = readJson(args.outJson);
  if (existing?.routingReady === true) {
    writeOutputs(buildFromExisting(existing, args), args);
    return;
  }

  writeOutputs(parkedReport(), args);
}

main();
