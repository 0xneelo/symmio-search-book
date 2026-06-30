#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  pageStateRegistry: path.join(searchBookRoot, "data", "page-state-registry.json"),
  volumeMap: path.join(searchBookRoot, "data", "volume-map.json"),
  questionRoutes: path.join(searchBookRoot, "data", "question-routes.json"),
  gapQueue: path.join(searchBookRoot, "data", "gap-queue.json"),
  crosslinks: path.join(searchBookRoot, "data", "crosslinks.json"),
  sourceCatalog: path.join(searchBookRoot, "data", "source-catalog.json"),
  authoredIndex: path.join(searchBookRoot, "data", "authored-pages.json"),
  outJson: path.join(searchBookRoot, "data", "publication-plan.json"),
  outJs: path.join(searchBookRoot, "data", "publication-plan.js"),
};

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--out-js") args.outJs = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node src/search-book/scripts/build-publication-plan.mjs [--out-json path] [--out-js path]");
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

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item) || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function sourceObjects(sourceKeys, sourceCatalog) {
  return (sourceKeys || []).map((sourceKey) => ({
    sourceKey,
    sourceHref: sourceCatalog.sourceByKey?.[sourceKey]?.href || "",
    sourceGroup: sourceCatalog.sourceByKey?.[sourceKey]?.group || "",
  }));
}

function templateFor(page) {
  if (/product|trading|user|fees|risk|settlement|market/i.test(page.section || "")) return "reference-page";
  if (page.granularity === "section-page") return "section-derived-authored-page";
  if (page.granularity === "source-page") return "source-navigation-map";
  return "source-companion-fold-in";
}

function actionFor(page, relatedCandidatePageIds) {
  if (relatedCandidatePageIds.length) return "fold-into-existing-authored-page";
  if (page.granularity === "section-page") return "promote-section-to-authored-page";
  return "create-authored-source-map-or-reference-page";
}

function priorityFor(page, volume, routeCount, gapIds, relatedCandidatePageIds, authoredCoveragePageIds) {
  const granularityScore = {
    "source-page": 28,
    "companion-page": 20,
    "section-page": 12,
  }[page.granularity] || 8;
  const volumePressure = Math.max(0, (volume?.generatedPages || 0) - (volume?.authoredPages || 0));
  const routeScore = routeCount * 24;
  const gapScore = gapIds.length * 18;
  const noAuthoredTargetBonus = relatedCandidatePageIds.length ? 0 : 10;
  const alreadyCoveredPenalty = authoredCoveragePageIds.length ? -80 : 0;
  const operatorReviewPenalty = /operator-review/i.test(page.status || "") ? -12 : 0;
  return granularityScore + Math.min(volumePressure, 60) + routeScore + gapScore + noAuthoredTargetBonus + alreadyCoveredPenalty + operatorReviewPenalty;
}

function stageFor(item) {
  if (item.authoredCoveragePageIds.length) return "4-covered-by-authored-pages";
  if (item.gapIds.length || item.questionRouteCount > 0) return "1-demand-and-gap-driven";
  if (item.relatedCandidatePageIds.length) return "2-fold-into-existing-authored-pages";
  return "3-promote-remaining-source-companions";
}

function stageRank(stage) {
  return {
    "1-demand-and-gap-driven": 1,
    "2-fold-into-existing-authored-pages": 2,
    "3-promote-remaining-source-companions": 3,
    "4-covered-by-authored-pages": 4,
  }[stage] || 9;
}

function reviewReasonFor(status) {
  if (/operator-review/i.test(status || "")) return "operator-review";
  if (/current-source|fresh-source/i.test(status || "")) return "source-refresh";
  if (/publication-date/i.test(status || "")) return "publication-date-review";
  if (/editorial-review|needs-review/i.test(status || "")) return "editorial-review";
  return "candidate-final-review";
}

function reviewActionFor(reason) {
  return {
    "candidate-final-review": "final-editorial-source-check-then-publish",
    "editorial-review": "tighten-prose-structure-before-publish",
    "publication-date-review": "refresh-time-sensitive-product-source-before-publish",
    "source-refresh": "refresh-current-source-evidence-before-publish",
    "operator-review": "operator-product-risk-legal-accounting-review-before-publish",
  }[reason] || "review-before-publish";
}

function reviewRank(reason) {
  return {
    "candidate-final-review": 1,
    "editorial-review": 2,
    "publication-date-review": 3,
    "source-refresh": 4,
    "operator-review": 5,
  }[reason] || 9;
}

function compactCandidate(page) {
  const reviewReason = reviewReasonFor(page.status);
  const volume = volumeById.get(page.volumeId);
  return {
    pageId: page.id,
    title: page.title,
    volumeId: page.volumeId,
    volumeTitle: volume?.title || "",
    section: page.section,
    track: page.track,
    status: page.status,
    reviewReason,
    reviewAction: reviewActionFor(reviewReason),
    questionRouteCount: routeCountsByPageId[page.id] || 0,
    sourceKeys: page.sourceKeys || [],
  };
}

const args = parseArgs(process.argv.slice(2));
const pageState = readJson(args.pageStateRegistry);
const volumeMap = readJson(args.volumeMap);
const questionRoutes = readJson(args.questionRoutes);
const gapQueue = readJson(args.gapQueue);
const crosslinks = readJson(args.crosslinks);
const sourceCatalog = readJson(args.sourceCatalog);
const authoredIndex = readJson(args.authoredIndex);

const pagesById = new Map((pageState.pages || []).map((page) => [page.id, page]));
const volumeById = new Map((volumeMap.volumes || []).map((volume) => [volume.id, volume]));
const routeCountsByPageId = countBy(questionRoutes.answerable || [], (route) => route.pageId);
const gapItemsByRelatedPageId = {};
for (const item of gapQueue.items || []) {
  if (item.status === "resolved") continue;
  for (const pageId of item.relatedPageIds || []) {
    gapItemsByRelatedPageId[pageId] ||= [];
    gapItemsByRelatedPageId[pageId].push(item);
  }
}

const publicCandidateIds = new Set(
  (pageState.pages || [])
    .filter((page) => page.pageState === "candidate" || page.pageState === "published")
    .map((page) => page.id),
);

const authoredCoverageByGeneratedPageId = new Map();
for (const page of authoredIndex.pages || []) {
  if (!publicCandidateIds.has(page.id)) continue;
  for (const generatedPageId of page.relatedGeneratedPages || []) {
    if (!generatedPageId) continue;
    if (!authoredCoverageByGeneratedPageId.has(generatedPageId)) {
      authoredCoverageByGeneratedPageId.set(generatedPageId, []);
    }
    authoredCoverageByGeneratedPageId.get(generatedPageId).push(page.id);
  }
}
for (const [generatedPageId, authoredPageIds] of authoredCoverageByGeneratedPageId.entries()) {
  authoredCoverageByGeneratedPageId.set(generatedPageId, unique(authoredPageIds));
}

const sourceCompanionQueue = (pageState.pages || [])
  .filter((page) => page.pageState === "source-companion")
  .map((page) => {
    const crosslink = crosslinks.pageById?.[page.id] || {};
    const relatedCandidatePageIds = (crosslink.relatedPageIds || []).filter((pageId) => publicCandidateIds.has(pageId));
    const authoredCoveragePageIds = authoredCoverageByGeneratedPageId.get(page.id) || [];
    const volume = volumeById.get(page.volumeId);
    const gapItems = gapItemsByRelatedPageId[page.id] || [];
    const gapIds = unique(gapItems.map((item) => item.gapId));
    const questionRouteCount = routeCountsByPageId[page.id] || 0;
    const priorityScore = priorityFor(page, volume, questionRouteCount, gapIds, relatedCandidatePageIds, authoredCoveragePageIds);
    const item = {
      pageId: page.id,
      title: page.title,
      volumeId: page.volumeId,
      volumeTitle: volume?.title || "",
      section: page.section,
      track: page.track,
      granularity: page.granularity,
      status: page.status,
      sourceKeys: page.sourceKeys || [],
      sources: sourceObjects(page.sourceKeys || [], sourceCatalog),
      questionRouteCount,
      gapIds,
      gapTitles: gapItems.map((gap) => gap.title),
      relatedCandidatePageIds,
      authoredCoveragePageIds,
      coverageState: authoredCoveragePageIds.length ? "covered-by-authored-page" : "needs-authored-coverage",
      suggestedTargetPageId: authoredCoveragePageIds[0] || relatedCandidatePageIds[0] || "",
      suggestedAction: authoredCoveragePageIds.length ? "already-covered-by-authored-page" : actionFor(page, relatedCandidatePageIds),
      authoringTemplate: templateFor(page),
      priorityScore,
      rationale: [
        questionRouteCount ? `${questionRouteCount} seeded question route(s)` : "",
        gapIds.length ? `${gapIds.length} linked gap(s)` : "",
        authoredCoveragePageIds.length ? `covered by ${authoredCoveragePageIds.length} authored page(s)` : "",
        relatedCandidatePageIds.length ? "has nearby authored target" : "needs authored target",
        `${page.granularity || "unknown"} companion`,
      ].filter(Boolean),
    };
    return { ...item, stage: stageFor(item) };
  })
  .sort((a, b) =>
    stageRank(a.stage) - stageRank(b.stage) ||
    b.priorityScore - a.priorityScore ||
    a.volumeId.localeCompare(b.volumeId) ||
    a.pageId.localeCompare(b.pageId),
  );

const candidateReviewQueue = (pageState.pages || [])
  .filter((page) => page.pageState === "candidate")
  .map(compactCandidate)
  .sort((a, b) =>
    reviewRank(a.reviewReason) - reviewRank(b.reviewReason) ||
    b.questionRouteCount - a.questionRouteCount ||
    a.volumeId.localeCompare(b.volumeId) ||
    a.pageId.localeCompare(b.pageId),
  );

const stageDefinitions = [
  {
    id: "1-demand-and-gap-driven",
    label: "Demand And Gap Driven",
    rule: "Promote source companions that already have routed demand, gap links, or unresolved review pressure.",
  },
  {
    id: "2-fold-into-existing-authored-pages",
    label: "Fold Into Existing Authored Pages",
    rule: "Attach source companions to nearby authored pages when the public page already exists.",
  },
  {
    id: "3-promote-remaining-source-companions",
    label: "Promote Remaining Source Companions",
    rule: "Create new authored source maps or reference pages for companions without a public target.",
  },
  {
    id: "4-covered-by-authored-pages",
    label: "Covered By Authored Pages",
    rule: "Keep source companions in retrieval inventory when authored pages already name them in relatedGeneratedPages.",
  },
  {
    id: "5-final-candidate-review",
    label: "Final Candidate Review",
    rule: "Review authored candidates by lane, then promote approved pages to published status.",
  },
];

const candidateReviewLaneDefinitions = [
  {
    id: "candidate-final-review",
    label: "Final Review Ready",
    rule: "Run final editorial/source/link checks and promote approved pages to published status.",
  },
  {
    id: "editorial-review",
    label: "Editorial Review",
    rule: "Tighten prose, structure, and page shape before final publish review.",
  },
  {
    id: "publication-date-review",
    label: "Publication-Date Review",
    rule: "Refresh time-sensitive product, market-count, fee, security, chain, and audit claims before publishing.",
  },
  {
    id: "source-refresh",
    label: "Current Source Refresh",
    rule: "Refresh current primary-source evidence before publishing source-sensitive pages.",
  },
  {
    id: "operator-review",
    label: "Operator Review",
    rule: "Keep pages out of published status until product, risk, legal, accounting, security, or operator review clears.",
  },
];

const sourceCompanionsNeedingAuthoredCoverage = sourceCompanionQueue.filter((item) => item.coverageState === "needs-authored-coverage");
const sourceCompanionsCoveredByAuthoredPages = sourceCompanionQueue.filter((item) => item.coverageState === "covered-by-authored-page");
const candidateFinalReviewReadyPages = candidateReviewQueue.filter((item) => item.reviewReason === "candidate-final-review");
const candidateOperatorReviewPages = candidateReviewQueue.filter((item) => item.reviewReason === "operator-review");
const candidateSourceRefreshPages = candidateReviewQueue.filter((item) => item.reviewReason === "source-refresh");
const candidatePublicationDateReviewPages = candidateReviewQueue.filter((item) => item.reviewReason === "publication-date-review");
const candidateEditorialReviewPages = candidateReviewQueue.filter((item) => item.reviewReason === "editorial-review");
const byStage = countBy(sourceCompanionQueue, (item) => item.stage);
const byTemplate = countBy(sourceCompanionQueue, (item) => item.authoringTemplate);
const bySuggestedAction = countBy(sourceCompanionQueue, (item) => item.suggestedAction);
const byCoverageState = countBy(sourceCompanionQueue, (item) => item.coverageState);
const byCandidateReviewReason = countBy(candidateReviewQueue, (item) => item.reviewReason);
const byCandidateReviewAction = countBy(candidateReviewQueue, (item) => item.reviewAction);
const byCandidateReviewStatus = countBy(candidateReviewQueue, (item) => item.status);
const byCandidateReviewVolume = {};
for (const volume of volumeMap.volumes || []) {
  const volumeItems = candidateReviewQueue.filter((item) => item.volumeId === volume.id);
  byCandidateReviewVolume[volume.id] = {
    title: volume.title,
    candidateReviewPages: volumeItems.length,
    byReviewReason: countBy(volumeItems, (item) => item.reviewReason),
    topPageIds: volumeItems.slice(0, 10).map((item) => item.pageId),
  };
}
const byVolume = {};
for (const volume of volumeMap.volumes || []) {
  const volumeItems = sourceCompanionQueue.filter((item) => item.volumeId === volume.id);
  const volumeNeedsCoverage = volumeItems.filter((item) => item.coverageState === "needs-authored-coverage");
  byVolume[volume.id] = {
    title: volume.title,
    sourceCompanionsQueued: volumeItems.length,
    sourceCompanionsCoveredByAuthoredPages: volumeItems.length - volumeNeedsCoverage.length,
    sourceCompanionsNeedingAuthoredCoverage: volumeNeedsCoverage.length,
    authoredPages: volume.authoredPages || 0,
    generatedPages: volume.generatedPages || 0,
    topPageIds: volumeNeedsCoverage.slice(0, 10).map((item) => item.pageId),
  };
}

const payload = {
  generatedAt: "deterministic-build",
  status: "prototype-publication-authoring-plan",
  planReady: true,
  contractVersion: "2026-06-30.v1",
  scope:
    "Progressive authoring queue for promoting source-companion pages into authored publication pages without exposing internal drafts or weakening citation requirements.",
  sourceBlockRequiredFields: ["sourceKey", "sourceHref", "sourceGroup"],
  authoringTemplateRequiredFields: [
    "pageId",
    "title",
    "volumeId",
    "section",
    "track",
    "sourceKeys",
    "sources",
    "suggestedAction",
    "authoringTemplate",
  ],
  stageDefinitions,
  candidateReviewLaneDefinitions,
  totals: {
    sourceCompanionsAvailable: pageState.sourceCompanionPages || 0,
    sourceCompanionsQueued: sourceCompanionQueue.length,
    sourceCompanionsCoveredByAuthoredPages: sourceCompanionsCoveredByAuthoredPages.length,
    sourceCompanionsNeedingAuthoredCoverage: sourceCompanionsNeedingAuthoredCoverage.length,
    candidateReviewPages: candidateReviewQueue.length,
    candidateFinalReviewReadyPages: candidateFinalReviewReadyPages.length,
    candidateOperatorReviewPages: candidateOperatorReviewPages.length,
    candidateSourceRefreshPages: candidateSourceRefreshPages.length,
    candidatePublicationDateReviewPages: candidatePublicationDateReviewPages.length,
    candidateEditorialReviewPages: candidateEditorialReviewPages.length,
    queueStages: stageDefinitions.length,
    topPriorityScore: sourceCompanionsNeedingAuthoredCoverage.reduce((max, item) => Math.max(max, item.priorityScore || 0), 0),
  },
  byStage,
  byTemplate,
  bySuggestedAction,
  byCoverageState,
  byCandidateReviewReason,
  byCandidateReviewAction,
  byCandidateReviewStatus,
  byCandidateReviewVolume,
  byVolume,
  nextAuthoringBatch: sourceCompanionsNeedingAuthoredCoverage.slice(0, 25),
  nextCandidateReviewBatch: candidateFinalReviewReadyPages.slice(0, 25),
  sourceCompanionQueue,
  candidateReviewQueue,
  warnings: [
    "This plan is an authoring queue, not a publication approval.",
    "Source companions must remain out of public navigation until promoted into authored pages and reviewed.",
    "nextAuthoringBatch excludes source companions already named in authored relatedGeneratedPages coverage.",
    "nextCandidateReviewBatch is final-review ready, but it is not publication approval.",
    "Candidate pages still need final source/operator/deploy review before the production site marks them published.",
  ],
};

ensureDir(path.dirname(args.outJson));
fs.writeFileSync(args.outJson, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(args.outJs, `window.SearchBookPublicationPlan = ${JSON.stringify(payload)};\n`);
console.log(JSON.stringify({
  planReady: payload.planReady,
  sourceCompanionsQueued: payload.totals.sourceCompanionsQueued,
  sourceCompanionsNeedingAuthoredCoverage: payload.totals.sourceCompanionsNeedingAuthoredCoverage,
  candidateReviewPages: payload.totals.candidateReviewPages,
  candidateFinalReviewReadyPages: payload.totals.candidateFinalReviewReadyPages,
  stages: payload.totals.queueStages,
}, null, 2));
