#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(searchBookRoot, relativePath), "utf8"));
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item) || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function flattenNavigationPages(navigation) {
  return (navigation.sections || []).flatMap((section) =>
    (section.tracks || []).flatMap((track) => (track.pages || []).map((page) => page.id)),
  );
}

function volumeLinkPageIds(volumeMap) {
  return unique(
    (volumeMap.volumes || []).flatMap((volume) => [
      volume.overviewPageId || "",
      ...(volume.openingPageIds || []),
    ]),
  );
}

function nonPublicPageIds(pageIds, pageById) {
  return unique(
    pageIds.filter((pageId) => {
      const page = pageById.get(pageId);
      return !page || !page.publicNavigationEligible;
    }),
  );
}

function missingPageIds(pageIds, pageById) {
  return unique(pageIds.filter((pageId) => !pageById.has(pageId)));
}

function intersection(left, rightSet) {
  return unique(left.filter((value) => rightSet.has(value)));
}

function sameMembers(actual, expected) {
  if (actual.length !== expected.length) return false;
  return actual.every((value, index) => value === expected[index]);
}

function check(id, passed, details = {}) {
  return { id, passed: Boolean(passed), ...details };
}

const pageState = readJson("data/page-state-registry.json");
const navigation = readJson("data/navigation-tree.json");
const questionRoutes = readJson("data/question-routes.json");
const faq = readJson("data/faq.json");
const answerChunks = readJson("data/answer-chunks.json");
const answerEngine = readJson("data/answer-engine-contract.json");
const llmRag = readJson("data/llm-rag-contract.json");
const sourceCatalog = readJson("data/source-catalog.json");
const volumeMap = readJson("data/volume-map.json");

const pages = pageState.pages || [];
const pageById = new Map(pages.map((page) => [page.id, page]));
const sourceKeys = new Set(Object.keys(sourceCatalog.sourceByKey || {}));

const publicPageIds = unique(pages.filter((page) => page.publicNavigationEligible).map((page) => page.id));
const sourceCompanionPageIds = unique(pages.filter((page) => page.pageState === "source-companion").map((page) => page.id));
const internalDraftPageIds = unique(pages.filter((page) => page.pageState === "internal-draft").map((page) => page.id));
const sourceCompanionSet = new Set(sourceCompanionPageIds);
const internalDraftSet = new Set(internalDraftPageIds);

const navigationPageIds = unique(flattenNavigationPages(navigation));
const navigationParkedPageIds = unique((navigation.parkedPages || []).map((page) => page.id));
const exactRoutePageIds = unique((questionRoutes.answerable || []).map((route) => route.pageId));
const faqAnswerablePageIds = unique((faq.answerable || []).map((entry) => entry.pageId));
const volumeEntryPageIds = volumeLinkPageIds(volumeMap);

const llmAllowedAnswerStates = unique(llmRag.validationPolicy?.allowedAnswerPageStates || []);
const llmAllowedContextStates = unique(llmRag.validationPolicy?.allowedContextPageStates || []);
const llmExcludedStates = unique(llmRag.validationPolicy?.excludedPageStates || []);
const answerEngineRetrievalStage = (answerEngine.pipeline || []).find((stage) => stage.stage === "chunk-retrieval") || {};
const answerEngineEligibleStates = unique(answerEngineRetrievalStage.eligiblePageStates || []);
const answerEngineExcludedStates = unique(answerEngineRetrievalStage.excludedPageStates || []);
const allowedContextStateSet = new Set(llmAllowedContextStates);

const chunkRows = answerChunks.chunks || [];
const chunksWithUnknownSourceKeys = chunkRows.filter((chunk) => (chunk.sourceKeys || []).some((key) => !sourceKeys.has(key)));
const chunksByKnownPageState = countBy(
  chunkRows.filter((chunk) => pageById.has(chunk.pageId)),
  (chunk) => pageById.get(chunk.pageId)?.pageState,
);
const chunksWithoutPageState = chunkRows.filter((chunk) => !pageById.has(chunk.pageId));
const runtimeContextChunks = chunkRows.filter((chunk) => {
  const page = pageById.get(chunk.pageId);
  return page && allowedContextStateSet.has(page.pageState) && !(chunk.sourceKeys || []).some((key) => !sourceKeys.has(key));
});
const runtimeContextByState = countBy(runtimeContextChunks, (chunk) => pageById.get(chunk.pageId)?.pageState);

const internalDraftChunksStored = chunkRows.filter((chunk) => internalDraftSet.has(chunk.pageId));
const sourceCompanionRuntimeChunks = runtimeContextChunks.filter((chunk) => sourceCompanionSet.has(chunk.pageId));
const internalDraftRuntimeChunks = runtimeContextChunks.filter((chunk) => internalDraftSet.has(chunk.pageId));

const expectedAnswerStates = ["candidate", "published"];
const expectedContextStates = ["candidate", "published", "source-companion"];
const expectedExcludedStates = ["internal-draft"];

const checks = [
  check("page-state-registry-clean", !pageState.duplicatePageIds.length && !pageState.unclassifiedPageIds.length && !pageState.missingVolumeIds.length, {
    duplicatePageIds: pageState.duplicatePageIds.length,
    unclassifiedPageIds: pageState.unclassifiedPageIds.length,
    missingVolumeIds: pageState.missingVolumeIds.length,
  }),
  check("public-navigation-count", publicPageIds.length === pageState.publicNavigationPages && publicPageIds.length === navigationPageIds.length, {
    pageStatePublicNavigationPages: pageState.publicNavigationPages,
    navigationTreePages: navigationPageIds.length,
  }),
  check("navigation-sections-public-only", !nonPublicPageIds(navigationPageIds, pageById).length && !missingPageIds(navigationPageIds, pageById).length, {
    nonPublicNavigationPageIds: nonPublicPageIds(navigationPageIds, pageById),
    missingNavigationPageIds: missingPageIds(navigationPageIds, pageById),
    publicPagesMissingFromNavigation: publicPageIds.filter((pageId) => !navigationPageIds.includes(pageId)),
  }),
  check("navigation-parked-pages-source-companion-only", !intersection(navigationParkedPageIds, internalDraftSet).length, {
    parkedPages: navigationParkedPageIds.length,
    internalDraftParkedPageIds: intersection(navigationParkedPageIds, internalDraftSet),
  }),
  check("exact-question-routes-public-only", !nonPublicPageIds(exactRoutePageIds, pageById).length && !missingPageIds(exactRoutePageIds, pageById).length, {
    exactRoutes: questionRoutes.totalRoutes || exactRoutePageIds.length,
    routedPages: exactRoutePageIds.length,
    nonPublicRoutePageIds: nonPublicPageIds(exactRoutePageIds, pageById),
    missingRoutePageIds: missingPageIds(exactRoutePageIds, pageById),
  }),
  check("faq-answer-routes-public-only", !nonPublicPageIds(faqAnswerablePageIds, pageById).length && !missingPageIds(faqAnswerablePageIds, pageById).length, {
    faqAnswerable: faq.totalAnswerable || faqAnswerablePageIds.length,
    routedPages: faqAnswerablePageIds.length,
    nonPublicFaqPageIds: nonPublicPageIds(faqAnswerablePageIds, pageById),
    missingFaqPageIds: missingPageIds(faqAnswerablePageIds, pageById),
  }),
  check("volume-entry-links-public-only", !nonPublicPageIds(volumeEntryPageIds, pageById).length && !missingPageIds(volumeEntryPageIds, pageById).length, {
    volumeEntryLinks: volumeEntryPageIds.length,
    nonPublicVolumeEntryPageIds: nonPublicPageIds(volumeEntryPageIds, pageById),
    missingVolumeEntryPageIds: missingPageIds(volumeEntryPageIds, pageById),
  }),
  check("source-companions-traceability-only", sourceCompanionPageIds.length === pageState.sourceCompanionPages && sourceCompanionRuntimeChunks.length > 0 && !intersection(sourceCompanionPageIds, new Set(navigationPageIds)).length && !intersection(sourceCompanionPageIds, new Set(exactRoutePageIds)).length && !intersection(sourceCompanionPageIds, new Set(faqAnswerablePageIds)).length, {
    sourceCompanionPages: sourceCompanionPageIds.length,
    sourceCompanionRuntimeChunks: sourceCompanionRuntimeChunks.length,
    sourceCompanionNavigationPageIds: intersection(sourceCompanionPageIds, new Set(navigationPageIds)),
    sourceCompanionExactRoutePageIds: intersection(sourceCompanionPageIds, new Set(exactRoutePageIds)),
    sourceCompanionFaqPageIds: intersection(sourceCompanionPageIds, new Set(faqAnswerablePageIds)),
  }),
  check("internal-drafts-hidden-from-public-and-runtime", internalDraftPageIds.length === pageState.internalDraftPages && internalDraftRuntimeChunks.length === 0 && !intersection(internalDraftPageIds, new Set(navigationPageIds)).length && !intersection(internalDraftPageIds, new Set(exactRoutePageIds)).length && !intersection(internalDraftPageIds, new Set(faqAnswerablePageIds)).length && !intersection(internalDraftPageIds, new Set(volumeEntryPageIds)).length, {
    internalDraftPages: internalDraftPageIds.length,
    internalDraftChunksStored: internalDraftChunksStored.length,
    internalDraftRuntimeChunks: internalDraftRuntimeChunks.length,
    internalDraftNavigationPageIds: intersection(internalDraftPageIds, new Set(navigationPageIds)),
    internalDraftExactRoutePageIds: intersection(internalDraftPageIds, new Set(exactRoutePageIds)),
    internalDraftFaqPageIds: intersection(internalDraftPageIds, new Set(faqAnswerablePageIds)),
    internalDraftVolumeEntryPageIds: intersection(internalDraftPageIds, new Set(volumeEntryPageIds)),
  }),
  check("answer-runtime-page-state-contract", sameMembers(llmAllowedAnswerStates, expectedAnswerStates) && sameMembers(llmAllowedContextStates, expectedContextStates) && sameMembers(llmExcludedStates, expectedExcludedStates) && sameMembers(answerEngineEligibleStates, expectedContextStates) && sameMembers(answerEngineExcludedStates, expectedExcludedStates), {
    llmAllowedAnswerStates,
    llmAllowedContextStates,
    llmExcludedStates,
    answerEngineEligibleStates,
    answerEngineExcludedStates,
  }),
  check("runtime-context-known-source-and-page-state-only", !chunksWithUnknownSourceKeys.length && runtimeContextChunks.length > 0 && !runtimeContextByState["internal-draft"], {
    answerChunks: chunkRows.length,
    runtimeContextChunks: runtimeContextChunks.length,
    runtimeContextByState,
    chunksByKnownPageState,
    chunksWithoutPageState: chunksWithoutPageState.length,
    chunksWithUnknownSourceKeys: chunksWithUnknownSourceKeys.length,
  }),
];

const failures = checks.filter((item) => !item.passed);
const result = {
  status: failures.length ? "failed" : "passed",
  service: "search-book-publication-boundaries",
  valuesPrinted: false,
  evidence: {
    publicNavigationPages: publicPageIds.length,
    sourceCompanionPages: sourceCompanionPageIds.length,
    internalDraftPages: internalDraftPageIds.length,
    exactRoutes: questionRoutes.totalRoutes || 0,
    faqAnswerable: faq.totalAnswerable || 0,
    answerChunks: chunkRows.length,
    runtimeContextChunks: runtimeContextChunks.length,
    sourceCompanionRuntimeChunks: sourceCompanionRuntimeChunks.length,
    internalDraftRuntimeChunks: internalDraftRuntimeChunks.length,
    chunksWithoutPageState: chunksWithoutPageState.length,
  },
  checks,
};

const rendered = JSON.stringify(result, null, 2);
if (failures.length) {
  console.error(rendered);
  process.exit(1);
}

console.log(rendered);
