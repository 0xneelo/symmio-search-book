#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  questionRoutes: path.join(searchBookRoot, "data", "question-routes.json"),
  faq: path.join(searchBookRoot, "data", "faq.json"),
  answerChunks: path.join(searchBookRoot, "data", "answer-chunks.json"),
  pageStateRegistry: path.join(searchBookRoot, "data", "page-state-registry.json"),
  sourceCatalog: path.join(searchBookRoot, "data", "source-catalog.json"),
  gapQueue: path.join(searchBookRoot, "data", "gap-queue.json"),
  outJson: path.join(searchBookRoot, "data", "answer-engine-contract.json"),
  outJs: path.join(searchBookRoot, "data", "answer-engine-contract.js"),
};

const stopWords = [
  "a",
  "about",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "been",
  "being",
  "can",
  "could",
  "do",
  "does",
  "for",
  "from",
  "had",
  "has",
  "have",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "shall",
  "should",
  "that",
  "the",
  "then",
  "these",
  "this",
  "those",
  "to",
  "what",
  "when",
  "where",
  "which",
  "who",
  "why",
  "will",
  "with",
  "without",
  "would",
  "was",
  "were",
];

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--out-js") args.outJs = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node src/search-book/scripts/build-answer-engine-contract.mjs [--out-json path] [--out-js path]");
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

function normalizeQuestion(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

const args = parseArgs(process.argv.slice(2));
const questionRoutes = readJson(args.questionRoutes);
const faq = readJson(args.faq);
const answerChunks = readJson(args.answerChunks);
const pageStateRegistry = readJson(args.pageStateRegistry);
const sourceCatalog = readJson(args.sourceCatalog);
const gapQueue = readJson(args.gapQueue);

const pageStateById = new Map((pageStateRegistry.pages || []).map((page) => [page.id, page]));
const chunksByPageId = new Map();
for (const chunk of answerChunks.chunks || []) {
  if (!chunksByPageId.has(chunk.pageId)) chunksByPageId.set(chunk.pageId, []);
  chunksByPageId.get(chunk.pageId).push(chunk);
}
const sourceByKey = sourceCatalog.sourceByKey || {};
const faqByQuestion = new Map((faq.answerable || []).map((entry) => [normalizeQuestion(entry.question), entry]));

const exactRouteTests = (questionRoutes.answerable || []).map((route) => {
  const pageState = pageStateById.get(route.pageId);
  const chunks = chunksByPageId.get(route.pageId) || [];
  const unknownSourceKeys = (route.sourceKeys || []).filter((key) => !sourceByKey[key]);
  const linkedSourceKeys = (route.sourceKeys || []).filter((key) => sourceByKey[key]?.href);
  const faqEntry = faqByQuestion.get(route.normalizedQuestion);
  return {
    id: route.id,
    query: route.question,
    normalizedQuery: route.normalizedQuestion,
    expectedStage: "exact-question-route",
    expectedPageId: route.pageId,
    expectedPageTitle: route.pageTitle,
    expectedPageState: pageState?.pageState || "missing",
    routeConfidence: route.confidence,
    routeSource: route.routeSource,
    sourceKeys: route.sourceKeys || [],
    linkedSourceKeys,
    unknownSourceKeys,
    chunkCount: chunks.length,
    faqEntryId: faqEntry?.id || "",
    passes:
      Boolean(pageState) &&
      ["candidate", "published"].includes(pageState.pageState) &&
      (route.sourceKeys || []).length > 0 &&
      unknownSourceKeys.length === 0 &&
      linkedSourceKeys.length > 0 &&
      chunks.length > 0 &&
      Boolean(faqEntry),
  };
});

const refusalTests = (questionRoutes.reconciliation || []).map((item) => ({
  id: item.id,
  query: item.question,
  normalizedQuery: normalizeQuestion(item.question),
  expectedStage: "gap-refusal",
  gapId: item.gapId,
  notes: item.notes,
  passes: Boolean(item.gapId),
}));

const lowRatedFeedbackContract = {
  trigger: "rating:no",
  expectedEvent: "low-rated-answer",
  storageKey: "searchBookPrototype.gaps",
  requiredFields: ["id", "query", "reason", "page", "time"],
};

const noRouteFeedbackContract = {
  trigger: "no-grounded-page",
  expectedEvent: "no-grounded-page",
  storageKey: "searchBookPrototype.gaps",
  requiredFields: ["id", "query", "reason", "page", "time"],
};

const failingExactRoutes = exactRouteTests.filter((test) => !test.passes);
const failingRefusals = refusalTests.filter((test) => !test.passes);
const exactRoutesByPageState = countBy(exactRouteTests, (test) => test.expectedPageState);
const exactRoutesByConfidence = countBy(exactRouteTests, (test) => test.routeConfidence);
const exactRoutesMissingChunks = exactRouteTests.filter((test) => !test.chunkCount).map((test) => test.id);
const exactRoutesWithUnknownSourceKeys = exactRouteTests.filter((test) => test.unknownSourceKeys.length).map((test) => ({
  id: test.id,
  unknownSourceKeys: test.unknownSourceKeys,
}));
const exactRoutesWithoutLinkedSources = exactRouteTests.filter((test) => !test.linkedSourceKeys.length).map((test) => test.id);
const exactRoutesInternalDraft = exactRouteTests.filter((test) => test.expectedPageState === "internal-draft").map((test) => test.id);
const allExactRoutesPass = failingExactRoutes.length === 0 && exactRouteTests.length === (questionRoutes.totalRoutes || 0);
const allRefusalTestsPass = failingRefusals.length === 0 && refusalTests.length === (questionRoutes.totalReconciliationQuestions || 0);
const deterministicReady = allExactRoutesPass && allRefusalTestsPass && (pageStateRegistry.retrievalEligiblePages || 0) > 0;

const payload = {
  generatedAt: "deterministic-build",
  status: "prototype-deterministic-answer-engine-contract",
  contractVersion: "2026-06-28.v1",
  deterministicReady,
  llmProductionReady: false,
  reasonLlmProductionReadyIsFalse: "LLM answering still needs API implementation, citation validation runtime, prompt-injection tests, operator source decisions, and Discord/Lafa import.",
  pipeline: [
    {
      stage: "normalize",
      priority: 0,
      behavior: "Lowercase, strip non-alphanumeric characters, collapse whitespace, remove common stop words for token scoring.",
      stopWords,
    },
    {
      stage: "exact-question-route",
      priority: 1,
      behavior: "If normalized query matches or strongly overlaps a seeded QUESTION route, return that exact page first.",
      sourceData: "data/question-routes.json",
      requiredPageStates: ["candidate", "published"],
      totalGoldenRoutes: exactRouteTests.length,
    },
    {
      stage: "glossary-route",
      priority: 2,
      behavior: "If a query asks for a term or alias, route to the term's primary page.",
      sourceData: "data/glossary.json",
    },
    {
      stage: "chunk-retrieval",
      priority: 3,
      behavior: "Search answer chunks for candidate and source-companion pages. Internal drafts are excluded from answer synthesis.",
      sourceData: "data/answer-chunks.json",
      eligiblePageStates: ["candidate", "published", "source-companion"],
      excludedPageStates: ["internal-draft"],
    },
    {
      stage: "gap-refusal",
      priority: 4,
      behavior: "If no grounded page is found or a reconciliation question is asked, record a gap/refusal event instead of inventing an answer.",
      sourceData: ["data/gap-queue.json", "QUESTIONS.md"],
      totalGoldenRefusals: refusalTests.length,
    },
  ],
  citationPolicy: {
    sourceKeysRequired: true,
    linkedSourceRequired: true,
    paragraphLevelCitationsRequiredForLlm: true,
    unknownSourceKeysAllowed: false,
    exactRoutesWithUnknownSourceKeys,
    exactRoutesWithoutLinkedSources,
  },
  storageContract: {
    localPrototype: {
      questionsKey: "searchBookPrototype.questions",
      ratingsKey: "searchBookPrototype.ratings",
      gapsKey: "searchBookPrototype.gaps",
      maxLocalEvents: 200,
    },
    questionEventRequiredFields: ["id", "query", "source", "pageId", "page", "score", "status", "time"],
    ratingEventRequiredFields: ["rating", "query", "page", "pageId", "eventId", "time"],
    gapEventContracts: [noRouteFeedbackContract, lowRatedFeedbackContract],
    productionRequirement: "Persist these event shapes to the production datastore behind Search Insights.",
  },
  pageStateContract: {
    publicNavigationPages: pageStateRegistry.publicNavigationPages || 0,
    retrievalEligiblePages: pageStateRegistry.retrievalEligiblePages || 0,
    internalDraftPages: pageStateRegistry.internalDraftPages || 0,
    byState: pageStateRegistry.byState || {},
    internalDraftPageIds: pageStateRegistry.internalDraftPageIds || [],
  },
  evaluation: {
    totalExactRouteTests: exactRouteTests.length,
    exactRouteTestsPassing: exactRouteTests.length - failingExactRoutes.length,
    totalRefusalTests: refusalTests.length,
    refusalTestsPassing: refusalTests.length - failingRefusals.length,
    allExactRoutesPass,
    allRefusalTestsPass,
    exactRoutesByPageState,
    exactRoutesByConfidence,
    exactRoutesMissingChunks,
    exactRoutesInternalDraft,
    failingExactRouteIds: failingExactRoutes.map((test) => test.id),
    failingRefusalIds: failingRefusals.map((test) => test.id),
    exactRouteTests,
    refusalTests,
  },
  llmReadinessContract: {
    retrievalSubstrate: "Use exact-route, glossary, and chunk retrieval before synthesis.",
    contextBoundary: "Only retrieved chunks with known source keys may enter the model context.",
    answerBoundary: "The model must answer only from supplied chunks and page metadata.",
    refusalBoundary: "If retrieved evidence is insufficient or page state is internal-draft, refuse and create a gap signal.",
    citationBoundary: "Every substantive answer paragraph must cite page ids and source keys.",
    evaluationSet: {
      exactRoutes: exactRouteTests.length,
      refusals: refusalTests.length,
      lowRatedFeedback: 1,
      noRouteFeedback: 1,
      adversarialMinimumRequiredBeforeProduction: 12,
    },
  },
  gapSignals: {
    totalGapQueueItems: gapQueue.totalItems || 0,
    questionSignals: gapQueue.totalQuestionSignals || 0,
    operatorSignals: gapQueue.totalOperatorSignals || 0,
    parkedPageSignals: gapQueue.totalParkedPageSignals || 0,
  },
  warnings: [
    ...(deterministicReady ? [] : ["Deterministic contract is not ready; inspect failing route/refusal tests."]),
    "LLM production readiness is intentionally false until runtime citation validation, prompt-injection tests, and operator-blocked source decisions are resolved.",
  ],
};

ensureDir(path.dirname(args.outJson));
fs.writeFileSync(args.outJson, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(args.outJs, `window.SearchBookAnswerEngineContract = ${JSON.stringify(payload)};\n`);
console.log(
  JSON.stringify(
    {
      deterministicReady: payload.deterministicReady,
      exactRoutes: `${payload.evaluation.exactRouteTestsPassing}/${payload.evaluation.totalExactRouteTests}`,
      refusals: `${payload.evaluation.refusalTestsPassing}/${payload.evaluation.totalRefusalTests}`,
      retrievalEligiblePages: payload.pageStateContract.retrievalEligiblePages,
      llmProductionReady: payload.llmProductionReady,
    },
    null,
    2,
  ),
);
