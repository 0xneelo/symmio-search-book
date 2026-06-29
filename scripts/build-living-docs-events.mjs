#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(searchBookRoot, "..", "..");

const defaults = {
  answerEngineContract: path.join(searchBookRoot, "data", "answer-engine-contract.json"),
  questionRoutes: path.join(searchBookRoot, "data", "question-routes.json"),
  gapQueue: path.join(searchBookRoot, "data", "gap-queue.json"),
  pageStateRegistry: path.join(searchBookRoot, "data", "page-state-registry.json"),
  operatorInbox: path.join(repoRoot, "_specs", "app-docs", "OPERATOR-INBOX.md"),
  outJson: path.join(searchBookRoot, "data", "living-docs-events.json"),
  outJs: path.join(searchBookRoot, "data", "living-docs-events.js"),
};

const schemas = {
  question: {
    name: "SearchBookQuestionEvent",
    requiredFields: ["id", "query", "source", "pageId", "page", "score", "status", "time"],
    optionalFields: ["requestId", "routeSource", "confidence", "refusalReason", "gapId", "operatorItemIds"],
    storageKey: "searchBookPrototype.questions",
  },
  rating: {
    name: "SearchBookRatingEvent",
    requiredFields: ["rating", "query", "page", "pageId", "eventId", "time"],
    optionalFields: ["requestId", "reason"],
    storageKey: "searchBookPrototype.ratings",
  },
  gap: {
    name: "SearchBookGapEvent",
    requiredFields: ["id", "query", "reason", "page", "time"],
    optionalFields: ["pageId", "gapId", "operatorItemIds", "source", "rating", "eventId"],
    storageKey: "searchBookPrototype.gaps",
  },
};

const allowedQuestionStatuses = new Set(["answered", "refused", "operator-blocked-refusal", "no-grounded-page"]);
const allowedRatings = new Set(["yes", "no", "useful", "not-useful"]);
const allowedGapReasons = new Set([
  "low-rated-answer",
  "page-feedback-needs-work",
  "no-grounded-page",
  "operator-decision-required",
  "operator-access-required",
  "source-family-missing",
  "prompt-injection",
  "secret-or-credential-request",
  "financial-advice",
  "citation-validation-failed",
  "internal-draft-excluded",
]);

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--out-js") args.outJs = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node src/search-book/scripts/build-living-docs-events.mjs [--out-json path] [--out-js path]");
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

function readText(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item) || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function parseOpenInboxItems(markdown) {
  const openSection = markdown.split("## Open")[1]?.split("## Resolved")[0] || "";
  return [...openSection.matchAll(/^### \[OPEN\] #(\d+) — (.+)$/gm)].map((match) => ({
    id: Number(match[1]),
    title: match[2].trim(),
  }));
}

function hasRequiredFields(event, requiredFields) {
  return requiredFields.filter((field) => !(field in event) || event[field] === undefined || event[field] === null);
}

function firstRoute(questionRoutes) {
  return (questionRoutes.answerable || []).find((route) => route.pageId && route.pageTitle);
}

function routeByQuestion(questionRoutes, question) {
  return (questionRoutes.reconciliation || []).find((item) => item.question === question) || null;
}

function gapOperatorItemIds(gapQueue, gapId) {
  const item = (gapQueue.items || []).find((gap) => gap.gapId === gapId);
  return (item?.linkedOperatorItems || []).map((operatorItem) => operatorItem.id).filter(Boolean);
}

function buildFixtures({ questionRoutes, gapQueue }) {
  const route = firstRoute(questionRoutes);
  const answerQuestion = {
    id: "fixture-question-answered",
    query: route?.question || "What is Vibe Trading?",
    source: "fixture",
    pageId: route?.pageId || "",
    page: route?.pageTitle || "",
    score: 1,
    status: "answered",
    routeSource: route?.routeSource || "",
    confidence: route?.confidence || "",
    time: "deterministic-build",
  };
  const usefulRating = {
    rating: "yes",
    query: answerQuestion.query,
    page: answerQuestion.page,
    pageId: answerQuestion.pageId,
    eventId: answerQuestion.id,
    time: "deterministic-build",
  };
  const lowRatedQuestion = {
    ...answerQuestion,
    id: "fixture-question-low-rated",
    query: "What does a solver do?",
    time: "deterministic-build",
  };
  const notUsefulRating = {
    rating: "no",
    query: lowRatedQuestion.query,
    page: lowRatedQuestion.page,
    pageId: lowRatedQuestion.pageId,
    eventId: lowRatedQuestion.id,
    time: "deterministic-build",
  };
  const pageFeedbackRating = {
    rating: "no",
    query: `Page feedback: ${answerQuestion.page}`,
    page: answerQuestion.page,
    pageId: answerQuestion.pageId,
    eventId: "fixture-page-feedback-not-useful",
    time: "deterministic-build",
  };
  const lowRatedGap = {
    id: notUsefulRating.eventId,
    query: lowRatedQuestion.query,
    reason: "low-rated-answer",
    page: lowRatedQuestion.page,
    pageId: lowRatedQuestion.pageId,
    rating: "no",
    eventId: notUsefulRating.eventId,
    time: "deterministic-build",
  };
  const pageFeedbackGap = {
    id: pageFeedbackRating.eventId,
    query: pageFeedbackRating.query,
    reason: "page-feedback-needs-work",
    page: pageFeedbackRating.page,
    time: "deterministic-build",
  };
  const noGroundedQuestion = {
    id: "fixture-question-no-grounded-page",
    query: "Can the docs quote the current Discord answer from Lafa?",
    source: "fixture",
    pageId: "",
    page: "",
    score: 0,
    status: "no-grounded-page",
    refusalReason: "source-family-missing",
    gapId: "G-001",
    operatorItemIds: gapOperatorItemIds(gapQueue, "G-001"),
    time: "deterministic-build",
  };
  const noGroundedGap = {
    id: "fixture-gap-no-grounded-page",
    query: noGroundedQuestion.query,
    reason: "no-grounded-page",
    page: "",
    gapId: "G-001",
    operatorItemIds: noGroundedQuestion.operatorItemIds,
    time: "deterministic-build",
  };
  const operatorBlockedQuestion = {
    id: "fixture-question-operator-blocked",
    query: "Can the docs quote the Vibe Trading Notion workspace?",
    source: "fixture",
    pageId: "",
    page: "",
    score: 0,
    status: "operator-blocked-refusal",
    refusalReason: "operator-access-required",
    gapId: "G-011",
    operatorItemIds: gapOperatorItemIds(gapQueue, "G-011"),
    time: "deterministic-build",
  };
  const operatorBlockedGap = {
    id: "fixture-gap-operator-blocked",
    query: operatorBlockedQuestion.query,
    reason: "operator-access-required",
    page: "",
    gapId: operatorBlockedQuestion.gapId,
    operatorItemIds: operatorBlockedQuestion.operatorItemIds,
    time: "deterministic-build",
  };
  const sourceFamilyQuestion = {
    id: "fixture-question-original-whitepaper",
    query: "Quote the original 2021 Symmio whitepaper and compare it to the current version.",
    source: "fixture",
    pageId: "",
    page: "",
    score: 0,
    status: "operator-blocked-refusal",
    refusalReason: "source-family-missing",
    gapId: "G-007",
    operatorItemIds: gapOperatorItemIds(gapQueue, "G-007"),
    time: "deterministic-build",
  };
  return {
    questions: [answerQuestion, lowRatedQuestion, noGroundedQuestion, operatorBlockedQuestion, sourceFamilyQuestion],
    ratings: [usefulRating, notUsefulRating, pageFeedbackRating],
    gaps: [lowRatedGap, pageFeedbackGap, noGroundedGap, operatorBlockedGap],
  };
}

function validateQuestion(event, context) {
  const failures = hasRequiredFields(event, schemas.question.requiredFields).map((field) => `question-${field}-missing`);
  if (!allowedQuestionStatuses.has(event.status)) failures.push("question-status-invalid");
  if (event.status === "answered") {
    const page = context.pageById.get(event.pageId);
    if (!page) failures.push("question-page-missing");
    if (page && !["candidate", "published"].includes(page.pageState)) failures.push("question-page-state-disallowed");
  }
  if (event.status !== "answered" && event.pageId) failures.push("question-refusal-has-page");
  if (event.gapId && !context.gapIds.has(event.gapId)) failures.push("question-gap-id-missing");
  for (const itemId of event.operatorItemIds || []) {
    if (!context.openOperatorItemIds.has(itemId)) failures.push("question-operator-item-missing");
  }
  return unique(failures);
}

function validateRating(event, context) {
  const failures = hasRequiredFields(event, schemas.rating.requiredFields).map((field) => `rating-${field}-missing`);
  if (!allowedRatings.has(event.rating)) failures.push("rating-value-invalid");
  const isPageFeedback = String(event.query || "").startsWith("Page feedback:");
  if (!isPageFeedback && !context.questionEventIds.has(event.eventId)) failures.push("rating-event-id-missing");
  const page = context.pageById.get(event.pageId);
  if (!page) failures.push("rating-page-missing");
  return unique(failures);
}

function validateGap(event, context) {
  const failures = hasRequiredFields(event, schemas.gap.requiredFields).map((field) => `gap-${field}-missing`);
  if (!allowedGapReasons.has(event.reason)) failures.push("gap-reason-invalid");
  if (event.reason === "low-rated-answer" && !context.ratingEventIds.has(event.eventId)) failures.push("gap-low-rating-event-missing");
  if (event.reason === "page-feedback-needs-work" && !context.ratingEventIds.has(event.id)) failures.push("gap-page-feedback-rating-missing");
  if (event.gapId && !context.gapIds.has(event.gapId)) failures.push("gap-id-missing");
  for (const itemId of event.operatorItemIds || []) {
    if (!context.openOperatorItemIds.has(itemId)) failures.push("gap-operator-item-missing");
  }
  if (event.pageId && !context.pageById.has(event.pageId)) failures.push("gap-page-missing");
  return unique(failures);
}

const args = parseArgs(process.argv.slice(2));
const answerEngineContract = readJson(args.answerEngineContract);
const questionRoutes = readJson(args.questionRoutes);
const gapQueue = readJson(args.gapQueue);
const pageStateRegistry = readJson(args.pageStateRegistry);
const openInboxItems = parseOpenInboxItems(readText(args.operatorInbox));
const fixtures = buildFixtures({ questionRoutes, gapQueue });
const context = {
  pageById: new Map((pageStateRegistry.pages || []).map((page) => [page.id, page])),
  gapIds: new Set((gapQueue.items || []).map((item) => item.gapId)),
  openOperatorItemIds: new Set(openInboxItems.map((item) => item.id)),
  questionEventIds: new Set(fixtures.questions.map((event) => event.id)),
  ratingEventIds: new Set(fixtures.ratings.map((event) => event.eventId)),
};

const validatedQuestions = fixtures.questions.map((event) => ({
  ...event,
  passes: validateQuestion(event, context).length === 0,
  failures: validateQuestion(event, context),
}));
const validatedRatings = fixtures.ratings.map((event) => ({
  ...event,
  passes: validateRating(event, context).length === 0,
  failures: validateRating(event, context),
}));
const validatedGaps = fixtures.gaps.map((event) => ({
  ...event,
  passes: validateGap(event, context).length === 0,
  failures: validateGap(event, context),
}));
const allEvents = [
  ...validatedQuestions.map((event) => ({ type: "question", ...event })),
  ...validatedRatings.map((event) => ({ type: "rating", ...event })),
  ...validatedGaps.map((event) => ({ type: "gap", ...event })),
];
const failingEvents = allEvents.filter((event) => !event.passes);
const failuresByKind = {};
for (const event of failingEvents) {
  for (const failure of event.failures) failuresByKind[failure] = (failuresByKind[failure] || 0) + 1;
}

const storage = answerEngineContract.storageContract || {};
const expectedKeys = [
  storage.localPrototype?.questionsKey,
  storage.localPrototype?.ratingsKey,
  storage.localPrototype?.gapsKey,
];
const eventContractReady =
  expectedKeys.every(Boolean) &&
  allEvents.length >= 8 &&
  failingEvents.length === 0 &&
  (gapQueue.totalItems || 0) > 0 &&
  (questionRoutes.totalRoutes || 0) > 0;

const payload = {
  generatedAt: "deterministic-build",
  status: "prototype-living-docs-event-contract",
  contractVersion: "2026-06-28.v1",
  eventContractReady,
  datastoreImplemented: false,
  livingDocsProductionReady: false,
  reasonLivingDocsProductionReadyIsFalse: "The event schema and fixture validation are ready, but production persistence, retention policy, moderation workflow, and Discord import are not complete.",
  storage,
  schemas,
  requiredRuntimeBehaviors: [
    "Persist every asked question as a question event.",
    "Persist every answer rating as a rating event linked to the answer/question event.",
    "Create a low-rated-answer gap when a user rates an answer negatively.",
    "Create a page-feedback-needs-work gap when a reader rates a page negatively.",
    "Create a no-grounded-page gap when retrieval cannot cite a grounded page.",
    "Attach operator item ids and known gap ids for parked decisions.",
    "Expose the aggregated event stream in Search Insights for editorial triage.",
  ],
  fixtures: {
    questions: validatedQuestions,
    ratings: validatedRatings,
    gaps: validatedGaps,
  },
  coverage: {
    totalFixtures: allEvents.length,
    passingFixtures: allEvents.length - failingEvents.length,
    failingFixtures: failingEvents.length,
    questionFixtures: validatedQuestions.length,
    ratingFixtures: validatedRatings.length,
    gapFixtures: validatedGaps.length,
    gapQueueItems: gapQueue.totalItems || 0,
    questionRouteCount: questionRoutes.totalRoutes || 0,
    reconciliationQuestionCount: questionRoutes.totalReconciliationQuestions || 0,
    operatorSignals: gapQueue.totalOperatorSignals || 0,
    openOperatorItems: openInboxItems.length,
    byEventType: countBy(allEvents, (event) => event.type),
    byQuestionStatus: countBy(validatedQuestions, (event) => event.status),
    byGapReason: countBy(validatedGaps, (event) => event.reason),
  },
  failureSummary: {
    failingEventIds: failingEvents.map((event) => event.id),
    failuresByKind,
  },
  productionBoundary: {
    localPrototype: "The current static prototype uses localStorage with these same event shapes.",
    requiredNextStep: "Move events to the production datastore selected with the final docs platform/backend.",
    blockedBy: ["OPERATOR-INBOX #4", "OPERATOR-INBOX #2"],
  },
};

ensureDir(path.dirname(args.outJson));
fs.writeFileSync(args.outJson, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(args.outJs, `window.SearchBookLivingDocsEvents = ${JSON.stringify(payload)};\n`);

console.log(JSON.stringify({
  eventContractReady: payload.eventContractReady,
  fixtures: `${payload.coverage.passingFixtures}/${payload.coverage.totalFixtures}`,
  datastoreImplemented: payload.datastoreImplemented,
  livingDocsProductionReady: payload.livingDocsProductionReady,
}, null, 2));
