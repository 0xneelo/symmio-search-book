#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  searchIndex: path.join(searchBookRoot, "data", "search-index.json"),
  authoredIndex: path.join(searchBookRoot, "data", "authored-pages.json"),
  volumeMap: path.join(searchBookRoot, "data", "volume-map.json"),
  questionRoutes: path.join(searchBookRoot, "data", "question-routes.json"),
  outJson: path.join(searchBookRoot, "data", "page-state-registry.json"),
  outJs: path.join(searchBookRoot, "data", "page-state-registry.js"),
};

const pageStates = {
  published: {
    label: "Published",
    publicNavigationEligible: true,
    retrievalEligible: true,
    launchRole: "final-public-page",
    description: "Final public prose that has passed editorial, source, and operator review.",
  },
  candidate: {
    label: "Candidate",
    publicNavigationEligible: true,
    retrievalEligible: true,
    launchRole: "public-candidate-page",
    description: "Authored prose that can support the prototype and review flow, but still needs final production review.",
  },
  "source-companion": {
    label: "Source Companion",
    publicNavigationEligible: false,
    retrievalEligible: true,
    launchRole: "retrieval-source-material",
    description: "Generated source-mapped material that can support retrieval and authoring, but should not be presented as final public prose.",
  },
  "internal-draft": {
    label: "Internal Draft",
    publicNavigationEligible: false,
    retrievalEligible: false,
    launchRole: "hidden-review-material",
    description: "Contradictory, parked, or unresolved material that must stay out of public navigation and answer synthesis.",
  },
};

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--out-js") args.outJs = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node src/search-book/scripts/build-page-state-registry.mjs [--out-json path] [--out-js path]");
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

function routeSourceRank(routeSource) {
  if (routeSource === "authored") return 0;
  return 1;
}

function classifyPage(page) {
  const status = String(page.status || "");
  if (/needs-reconciliation/i.test(status)) {
    return {
      pageState: "internal-draft",
      reviewRequired: true,
      reason: "Status requires reconciliation before publication or answer synthesis.",
    };
  }
  if (page.routeSource === "authored") {
    return {
      pageState: "candidate",
      reviewRequired: /operator-review|needs-review/i.test(status),
      reason: "Authored page is suitable for prototype navigation and final editorial review.",
    };
  }
  if (page.routeSource === "generated") {
    return {
      pageState: "source-companion",
      reviewRequired: true,
      reason: "Generated source companion is useful for retrieval and authoring, but is not final prose.",
    };
  }
  return {
    pageState: "internal-draft",
    reviewRequired: true,
    reason: "Page route source is unknown.",
  };
}

function pageUniverse({ authoredIndex, searchIndex }) {
  const pages = new Map();
  for (const page of authoredIndex.pages || []) {
    pages.set(page.id, {
      id: page.id,
      title: page.title,
      section: page.section,
      track: page.track,
      granularity: page.granularity,
      status: page.status,
      routeSource: "authored",
      file: page.file,
      volumeId: page.volumeId || "",
      sourceKeys: page.sourceKeys || [],
      sourceUrls: page.sourceUrls || [],
    });
  }
  for (const page of searchIndex || []) {
    if (pages.has(page.id)) continue;
    pages.set(page.id, {
      id: page.id,
      title: page.title,
      section: page.section,
      track: page.track,
      granularity: page.granularity,
      status: page.status,
      routeSource: "generated",
      file: page.file,
      volumeId: page.volumeId || "",
      sourceKeys: page.sourceKeys || [],
      sourceUrls: page.sourceUrls || [],
    });
  }
  return [...pages.values()].sort((a, b) => {
    const sourceDelta = routeSourceRank(a.routeSource) - routeSourceRank(b.routeSource);
    if (sourceDelta) return sourceDelta;
    return a.id.localeCompare(b.id);
  });
}

function compactPage(page, volumeId, questionRouteCount) {
  const classification = classifyPage(page);
  const definition = pageStates[classification.pageState];
  return {
    id: page.id,
    title: page.title,
    section: page.section,
    track: page.track,
    granularity: page.granularity,
    status: page.status,
    routeSource: page.routeSource,
    file: page.file,
    volumeId,
    pageState: classification.pageState,
    launchRole: definition.launchRole,
    publicNavigationEligible: definition.publicNavigationEligible,
    retrievalEligible: definition.retrievalEligible,
    reviewRequired: classification.reviewRequired,
    questionRouteCount,
    sourceKeys: page.sourceKeys || [],
    sourceUrls: page.sourceUrls || [],
    classificationReason: classification.reason,
  };
}

const args = parseArgs(process.argv.slice(2));
const searchIndex = readJson(args.searchIndex);
const authoredIndex = readJson(args.authoredIndex);
const volumeMap = readJson(args.volumeMap);
const questionRoutes = readJson(args.questionRoutes);
const volumeByPage = volumeMap.pageToVolume || {};
const questionRouteCounts = countBy(questionRoutes.answerable || [], (route) => route.pageId);
const rawPages = pageUniverse({ authoredIndex, searchIndex });
const duplicatePageIds = rawPages.map((page) => page.id).filter((id, index, ids) => ids.indexOf(id) !== index);
const pages = rawPages.map((page) => compactPage(page, volumeByPage[page.id] || "", questionRouteCounts[page.id] || 0));
const unclassifiedPageIds = pages.filter((page) => !pageStates[page.pageState]).map((page) => page.id);
const missingVolumeIds = pages.filter((page) => !page.volumeId).map((page) => page.id);
const internalDrafts = pages.filter((page) => page.pageState === "internal-draft");
const sourceCompanions = pages.filter((page) => page.pageState === "source-companion");
const publicCandidates = pages.filter((page) => page.pageState === "candidate" || page.pageState === "published");
const retrievalEligiblePages = pages.filter((page) => page.retrievalEligible);
const publicNavigationPages = pages.filter((page) => page.publicNavigationEligible);
const statesByVolume = {};
for (const page of pages) {
  const volumeId = page.volumeId || "missing-volume";
  statesByVolume[volumeId] ||= {};
  statesByVolume[volumeId][page.pageState] = (statesByVolume[volumeId][page.pageState] || 0) + 1;
}

const payload = {
  generatedAt: "deterministic-build",
  status: "prototype-page-state-registry",
  policy: {
    states: pageStates,
    launchRule:
      "Production launch must promote final public pages to published, keep candidate pages under review, keep source companions out of public navigation, and keep internal drafts out of answer synthesis.",
    currentLaunchReady: false,
  },
  totalPages: pages.length,
  byState: countBy(pages, (page) => page.pageState),
  byRouteSource: countBy(pages, (page) => page.routeSource),
  byGranularity: countBy(pages, (page) => page.granularity),
  byStatus: countBy(pages, (page) => page.status),
  bySection: countBy(pages, (page) => page.section),
  statesByVolume,
  publishedPages: pages.filter((page) => page.pageState === "published").length,
  publicCandidatePages: publicCandidates.length,
  sourceCompanionPages: sourceCompanions.length,
  internalDraftPages: internalDrafts.length,
  publicNavigationPages: publicNavigationPages.length,
  retrievalEligiblePages: retrievalEligiblePages.length,
  reviewRequiredPages: pages.filter((page) => page.reviewRequired).length,
  exactQuestionRoutedPages: pages.filter((page) => page.questionRouteCount > 0).length,
  duplicatePageIds: unique(duplicatePageIds),
  unclassifiedPageIds,
  missingVolumeIds,
  internalDraftPageIds: internalDrafts.map((page) => page.id),
  sourceCompanionSamplePageIds: sourceCompanions.slice(0, 25).map((page) => page.id),
  publicCandidateSamplePageIds: publicCandidates.slice(0, 25).map((page) => page.id),
  warnings: [
    ...(pages.some((page) => page.pageState === "published") ? [] : ["No page is marked published yet; current authored pages remain candidates."]),
    ...(internalDrafts.length ? [`${internalDrafts.length} internal draft pages must stay hidden until reconciled.`] : []),
    ...(sourceCompanions.length ? [`${sourceCompanions.length} source companion pages should support retrieval/authoring but not final public navigation.`] : []),
  ],
  pages,
};

ensureDir(path.dirname(args.outJson));
fs.writeFileSync(args.outJson, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(args.outJs, `window.SearchBookPageStateRegistry = ${JSON.stringify(payload)};\n`);
console.log(
  JSON.stringify(
    {
      pages: payload.totalPages,
      states: payload.byState,
      publicNavigationPages: payload.publicNavigationPages,
      retrievalEligiblePages: payload.retrievalEligiblePages,
      internalDraftPages: payload.internalDraftPages,
    },
    null,
    2,
  ),
);
