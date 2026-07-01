#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const repoRoot = searchBookRoot;

const defaults = {
  answerEngineContract: path.join(searchBookRoot, "data", "answer-engine-contract.json"),
  questionRoutes: path.join(searchBookRoot, "data", "question-routes.json"),
  gapQueue: path.join(searchBookRoot, "data", "gap-queue.json"),
  pageStateRegistry: path.join(searchBookRoot, "data", "page-state-registry.json"),
  operatorInbox: path.join(repoRoot, "_specs", "app-docs", "OPERATOR-INBOX.md"),
  outJson: path.join(searchBookRoot, "data", "living-docs-events.json"),
  outJs: path.join(searchBookRoot, "data", "living-docs-events.js"),
  packageJson: path.join(repoRoot, "package.json"),
  serviceScript: path.join(searchBookRoot, "scripts", "serve-answer-engine.mjs"),
  productionPreflightScript: path.join(searchBookRoot, "scripts", "check-production-env.mjs"),
  gapSummaryScript: path.join(searchBookRoot, "scripts", "summarize-living-docs-gaps.mjs"),
  backupScript: path.join(searchBookRoot, "scripts", "backup-answer-engine-db.mjs"),
  reviewerRunbook: path.join(searchBookRoot, "LIVING-DOCS-OPERATIONS.md"),
  frontendPrototype: path.join(searchBookRoot, "index.html"),
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
const packageJson = readJson(args.packageJson);
const openInboxItems = parseOpenInboxItems(readText(args.operatorInbox));
const frontendPrototype = readText(args.frontendPrototype);
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
const serviceRuntimeImplemented = fs.existsSync(args.serviceScript);
const serviceScriptText = readText(args.serviceScript);
const gapSummaryJobImplemented =
  fs.existsSync(args.gapSummaryScript) &&
  readText(args.gapSummaryScript).includes("search-book-living-docs-summary") &&
  readText(args.gapSummaryScript).includes("search_book_gaps") &&
  readText(args.gapSummaryScript).includes("lowRatedAnswers") &&
  readText(args.gapSummaryScript).includes("repeatedQuestions");
const backupScriptText = readText(args.backupScript);
const productionPreflightText = readText(args.productionPreflightScript);
const backupRestoreImplemented =
  fs.existsSync(args.backupScript) &&
  packageJson.scripts?.["search-book:backup-db"] === "node scripts/backup-answer-engine-db.mjs" &&
  backupScriptText.includes("search-book-answer-engine-backup") &&
  backupScriptText.includes("VACUUM INTO") &&
  backupScriptText.includes("PRAGMA integrity_check") &&
  backupScriptText.includes("search_book_questions") &&
  backupScriptText.includes("search_book_answer_cache") &&
  backupScriptText.includes("restoreCheck");
const productionPreflightImplemented =
  fs.existsSync(args.productionPreflightScript) &&
  packageJson.scripts?.["search-book:check-production-env"] === "node scripts/check-production-env.mjs" &&
  productionPreflightText.includes("search-book-production-preflight") &&
  productionPreflightText.includes("SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS") &&
  productionPreflightText.includes("SEARCH_BOOK_ANSWER_ENGINE_DEFAULT_MODE") &&
  productionPreflightText.includes("SEARCH_BOOK_LLM_API_KEY") &&
  productionPreflightText.includes("valuesPrinted: false");
const reviewerRunbookText = readText(args.reviewerRunbook);
const reviewerWorkflowDocumented =
  fs.existsSync(args.reviewerRunbook) &&
  reviewerRunbookText.includes("# Search Book Living-Docs Operations") &&
  reviewerRunbookText.includes("Daily Review Loop") &&
  reviewerRunbookText.includes("Moderation Export") &&
  reviewerRunbookText.includes("Metrics Export") &&
  reviewerRunbookText.includes("Triage Rules") &&
  reviewerRunbookText.includes("Launch Gate") &&
  reviewerRunbookText.includes("SEARCH_BOOK_ANSWER_ENGINE_MODERATION_TOKEN") &&
  reviewerRunbookText.includes("SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN") &&
  reviewerRunbookText.includes("npm run search-book:living-docs-summary");
const sqliteDatastoreImplemented = serviceRuntimeImplemented;
const frontendServiceIntegrationImplemented =
  frontendPrototype.includes("SEARCH_BOOK_ANSWER_ENGINE_URL") &&
  frontendPrototype.includes('"/api/search-book/answer"') &&
  frontendPrototype.includes('"/api/search-book/rating"') &&
  frontendPrototype.includes('"/api/search-book/page-feedback"') &&
  frontendPrototype.includes('"/api/search-book/insights"') &&
  frontendPrototype.includes("searchBookPrototype.serviceUrl");
const retentionPolicyImplemented =
  serviceRuntimeImplemented &&
  serviceScriptText.includes("SEARCH_BOOK_ANSWER_ENGINE_RETENTION_DAYS") &&
  serviceScriptText.includes("applyRetention") &&
  serviceScriptText.includes("retentionPolicy");
const moderationExportImplemented =
  serviceRuntimeImplemented &&
  serviceScriptText.includes("SEARCH_BOOK_ANSWER_ENGINE_ENABLE_MODERATION_EXPORT") &&
  serviceScriptText.includes("SEARCH_BOOK_ANSWER_ENGINE_MODERATION_TOKEN") &&
  serviceScriptText.includes("/api/search-book/moderation") &&
  serviceScriptText.includes("requireModerationAccess");
const metricsExportImplemented =
  serviceRuntimeImplemented &&
  serviceScriptText.includes("SEARCH_BOOK_ANSWER_ENGINE_ENABLE_METRICS_EXPORT") &&
  serviceScriptText.includes("SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN") &&
  serviceScriptText.includes("/api/search-book/metrics") &&
  serviceScriptText.includes("requireMetricsAccess") &&
  serviceScriptText.includes("includesRawUserQuestions: false");
const corsPolicyImplemented =
  serviceRuntimeImplemented &&
  serviceScriptText.includes("SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS") &&
  serviceScriptText.includes("requireAllowedOrigin") &&
  serviceScriptText.includes("access-control-allow-origin");
const answerCacheImplemented =
  serviceRuntimeImplemented &&
  serviceScriptText.includes("search_book_answer_cache") &&
  serviceScriptText.includes("syncAnswerCacheForRating") &&
  serviceScriptText.includes("findReusableAnswer") &&
  serviceScriptText.includes('source: "reuse-cache"');
const dynamicExamplesImplemented =
  serviceRuntimeImplemented &&
  frontendPrototype.includes('"/api/search-book/examples"') &&
  serviceScriptText.includes("/api/search-book/examples") &&
  serviceScriptText.includes("handleExamples") &&
  serviceScriptText.includes("exampleRows");
const pageFeedbackServiceImplemented =
  serviceRuntimeImplemented &&
  frontendPrototype.includes('"/api/search-book/page-feedback"') &&
  serviceScriptText.includes("/api/search-book/page-feedback") &&
  serviceScriptText.includes("persistPageFeedback") &&
  serviceScriptText.includes("page-feedback-needs-work");

const payload = {
  generatedAt: "deterministic-build",
  status: "sqlite-backed-living-docs-event-contract",
  contractVersion: "2026-06-29.v3",
  eventContractReady,
  serviceRuntimeImplemented,
  sqliteDatastoreImplemented,
  frontendServiceIntegrationImplemented,
  retentionPolicyImplemented,
  moderationExportImplemented,
  metricsExportImplemented,
  corsPolicyImplemented,
  answerCacheImplemented,
  dynamicExamplesImplemented,
  pageFeedbackServiceImplemented,
  gapSummaryJobImplemented,
  reviewerWorkflowDocumented,
  backupRestoreImplemented,
  productionPreflightImplemented,
  datastoreImplemented: sqliteDatastoreImplemented,
  livingDocsProductionReady: false,
  reasonLivingDocsProductionReadyIsFalse: sqliteDatastoreImplemented
      ? frontendServiceIntegrationImplemented
      ? retentionPolicyImplemented && moderationExportImplemented && metricsExportImplemented && corsPolicyImplemented && answerCacheImplemented && dynamicExamplesImplemented && pageFeedbackServiceImplemented && gapSummaryJobImplemented && reviewerWorkflowDocumented && backupRestoreImplemented && productionPreflightImplemented
        ? "The standalone answer-engine service persists question, answer-rating, reader page-feedback, gap, and helpful answer-cache events to SQLite, the static frontend can call it when configured, rated answers can be reused for semantically similar questions, dynamic example chips can read helpful cached questions, and the service has retention, a configurable CORS allowlist, disabled-by-default token-gated moderation and metrics exports, a reviewer gap-summary job, a documented reviewer operating runbook, an executable SQLite backup/restore-check path, a production configuration preflight, and an imported redacted Discord/Lafa demand corpus. Production deployment/public route, production VPS LLM/service env, production moderation/metrics/backup storage access, and assigned production owner/cadence are still not complete."
        : "The standalone answer-engine service persists question, rating, and gap events to SQLite and the static frontend can call it when configured, but production deployment/public route, production preflight, retention policy, CORS allowlist configuration, moderation/metrics workflow, reviewer operating workflow, and production VPS service env are not complete."
      : "The standalone answer-engine service now persists question, rating, and gap events to SQLite, but production deployment, frontend integration, CORS allowlist configuration, retention policy, moderation workflow, and production VPS service env are not complete."
    : "The event schema and fixture validation are ready, but production persistence, retention policy, moderation workflow, and reviewer workflow are not complete.",
  storage: {
    ...storage,
    productionService: {
      script: "scripts/serve-answer-engine.mjs",
      adapter: "node:sqlite",
      defaultDbEnv: "SEARCH_BOOK_ANSWER_ENGINE_DB",
      defaultModeEnv: "SEARCH_BOOK_ANSWER_ENGINE_DEFAULT_MODE",
      endpoints: [
        "GET /health",
        "POST /api/search-book/answer",
        "POST /api/search-book/rating",
        "POST /api/search-book/page-feedback",
        "GET /api/search-book/insights",
        "GET /api/search-book/examples",
        "GET /api/search-book/moderation",
        "GET /api/search-book/metrics",
      ],
      tables: ["search_book_questions", "search_book_ratings", "search_book_gaps", "search_book_answer_cache"],
      answerReuse: answerCacheImplemented
        ? {
            cacheTable: "search_book_answer_cache",
            embeddingEnv: ["SEARCH_BOOK_EMBED_ENDPOINT", "SEARCH_BOOK_EMBED_MODEL", "SEARCH_BOOK_LLM_API_KEY"],
            thresholdEnv: "SEARCH_BOOK_REUSE_THRESHOLD",
            maxCandidatesEnv: "SEARCH_BOOK_REUSE_MAX_CANDIDATES",
            behavior: "Positive ratings populate a helpful-answer cache. After guardrail preflight and retrieval, semantically similar questions can replay a validated cached answer as source:\"reuse-cache\" without calling the LLM.",
            guardrailInvariant: "Operator-blocked and source-family-missing questions refuse before cache lookup, so guardrail refusals cannot be served from the reuse cache.",
          }
        : "Rated-answer reuse cache is not implemented in the service.",
      dynamicExamples: dynamicExamplesImplemented
        ? {
            endpoint: "GET /api/search-book/examples",
            limitEnv: "SEARCH_BOOK_EXAMPLE_LIMIT",
            behavior: "Returns top helpful cached questions for homepage example chips. The static frontend uses these only when available and keeps curated chips as fallback.",
        }
        : "Dynamic example questions are not implemented in the service/frontend bridge.",
      pageFeedback: pageFeedbackServiceImplemented
        ? {
            endpoint: "POST /api/search-book/page-feedback",
            behavior: "Reader-page Useful/Needs work controls persist a service-backed page-feedback event plus linked rating; negative feedback creates a page-feedback-needs-work gap.",
            fallback: "The static frontend keeps the same localStorage page-feedback fallback for unconfigured previews or service outages.",
          }
        : "Reader page feedback is not wired to the SQLite service yet.",
      retention: retentionPolicyImplemented
        ? {
            env: "SEARCH_BOOK_ANSWER_ENGINE_RETENTION_DAYS",
            defaultDays: 180,
            behavior: "The service prunes old question, rating, gap, and answer-cache rows on startup and before insight/moderation reads; set 0 to disable local pruning.",
          }
        : "Retention policy is not implemented in the service.",
      moderation: moderationExportImplemented
        ? {
            enabledEnv: "SEARCH_BOOK_ANSWER_ENGINE_ENABLE_MODERATION_EXPORT",
            tokenEnv: "SEARCH_BOOK_ANSWER_ENGINE_MODERATION_TOKEN",
            limitEnv: "SEARCH_BOOK_ANSWER_ENGINE_MODERATION_LIMIT",
            behavior: "The moderation export is disabled by default and requires a bearer or x-search-book-moderation-token header when enabled.",
          }
        : "Moderation export is not implemented in the service.",
      metrics: metricsExportImplemented
        ? {
            enabledEnv: "SEARCH_BOOK_ANSWER_ENGINE_ENABLE_METRICS_EXPORT",
            tokenEnv: "SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN",
            fallbackTokenEnv: "SEARCH_BOOK_ANSWER_ENGINE_MODERATION_TOKEN",
            behavior: "The metrics export is disabled by default and requires a bearer, x-search-book-metrics-token, or moderation-token fallback when enabled.",
            privacy: "Exposes operational counters, datastore totals, runtime counts, uptime, and memory usage; does not expose raw questions, answers, notes, moderation queues, API keys, or tokens.",
          }
        : "Metrics export is not implemented in the service.",
      cors: corsPolicyImplemented
        ? {
            allowedOriginsEnv: "SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS",
            localDefault: "*",
            behavior: "Browser requests with an Origin header must match the configured allowlist unless the local wildcard default is used; server-to-server requests without Origin remain allowed.",
            boundary: "The final production origin value depends on the selected public frontend route and must be set in the service env before launch.",
          }
        : "Configurable CORS allowlisting is not implemented in the service.",
      reviewerSummary: gapSummaryJobImplemented
        ? {
            script: "scripts/summarize-living-docs-gaps.mjs",
            defaultDbEnv: "SEARCH_BOOK_ANSWER_ENGINE_DB",
            formats: ["markdown", "json"],
            behavior: "Reads the SQLite datastore directly and emits an internal reviewer summary of gap backlog, low-rated answers, unanswered/refused questions, repeated questions, and recommended actions.",
            privacy: "Output includes raw user questions and notes; do not publish it without an approved privacy review.",
          }
        : "Reviewer gap-summary job is not implemented yet.",
      reviewerWorkflow: reviewerWorkflowDocumented
        ? {
            runbook: "LIVING-DOCS-OPERATIONS.md",
            cadence: ["daily review loop", "weekly summary cadence", "launch gate", "incident handling"],
            behavior: "Documents how reviewers inspect Search Insights, run SQLite summaries, use the gated moderation export, triage low-rated/unanswered/repeated questions, preserve privacy, and escalate source/operator blockers.",
            boundary: "The runbook documents operation; it does not deploy the service, install production credentials, assign owners, or import parked source families.",
          }
        : "Reviewer operating runbook is not documented yet.",
      backupRestore: backupRestoreImplemented
        ? {
            script: "scripts/backup-answer-engine-db.mjs",
            packageScript: "npm run search-book:backup-db",
            defaultDbEnv: "SEARCH_BOOK_ANSWER_ENGINE_DB",
            behavior: "Creates a SQLite-consistent backup with VACUUM INTO, writes a manifest containing table counts and SHA-256, and can reopen the backup read-only for PRAGMA integrity_check plus table-count restore verification.",
            boundary: "This provides an executable backup/restore-check path; production still needs a deployed persistent DB path, backup storage location, owner cadence, and retention/deletion approval.",
          }
        : "SQLite backup/restore-check utility is not implemented yet.",
      productionPreflight: productionPreflightImplemented
        ? {
            script: "scripts/check-production-env.mjs",
            packageScript: "npm run search-book:check-production-env",
            behavior: "Validates built artifacts, production SQLite path, LLM default mode and provider env, allowed origins, public service URL, rate/retention/body limits, moderation token rules, and live-eval evidence without calling the provider.",
            secretBoundary: "Reports whether LLM and moderation secrets are configured but never prints secret values.",
            boundary: "The check can only pass in production once the operator supplies the deploy route and service credentials.",
          }
        : "Production configuration preflight is not implemented yet.",
      frontendIntegration: frontendServiceIntegrationImplemented
        ? "index.html can call the service for answers, answer ratings, reader page feedback, Search Insights, and optional dynamic examples when configured with ?service=... or window.SEARCH_BOOK_ANSWER_ENGINE_URL, while preserving localStorage and curated-example fallbacks."
        : "No public frontend is wired to the service yet.",
    },
  },
  schemas,
  requiredRuntimeBehaviors: [
    "Persist every asked question as a question event.",
    "Persist every answer rating as a rating event linked to the answer/question event.",
    "Create a low-rated-answer gap when a user rates an answer negatively.",
    "Create a page-feedback-needs-work gap when a reader rates a page negatively.",
    "Create a no-grounded-page gap when retrieval cannot cite a grounded page.",
    "Attach operator item ids and known gap ids for parked decisions.",
    "Expose the aggregated event stream in Search Insights for editorial triage.",
    "Populate the helpful answer-cache from positive ratings when embedding configuration is available.",
    "Run reuse-cache lookup only after guardrail preflight, and replay cached answers as source:\"reuse-cache\" only for eligible answered questions.",
    "Expose helpful cached questions through /api/search-book/examples for optional dynamic example chips.",
    "Persist reader page feedback through the service when configured, and fall back to localStorage only when the service is unavailable.",
    "Let the static frontend use configured service endpoints for answers, answer ratings, page feedback, insights, and dynamic examples while preserving localStorage and curated-example fallbacks.",
    "Apply the configured retention window to question, rating, gap, and answer-cache event storage.",
    "Expose a disabled-by-default, token-gated moderation export for reviewer triage.",
    "Expose a disabled-by-default, token-gated metrics export for internal monitoring without raw user content or secrets.",
    "Enforce the configured browser CORS allowlist for service endpoints while preserving same-origin and server-to-server operations.",
    "Produce an internal reviewer gap summary from the SQLite datastore for scheduled editorial review.",
    "Follow the internal living-docs operations runbook for daily triage, weekly summaries, moderation export handling, privacy boundaries, and incident response.",
    "Back up the SQLite datastore with the internal backup utility and verify restore viability before production launch and on an agreed cadence.",
    "Run the production configuration preflight before launch so local defaults, missing LLM env, unsafe CORS origins, and missing operational paths fail closed.",
    "Keep API keys in process environment only; never persist or print them.",
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
    sqliteService: sqliteDatastoreImplemented
      ? "The standalone service persists equivalent event shapes to SQLite and exposes Search Insights data over HTTP."
      : "The standalone SQLite service is not implemented yet.",
    frontendIntegration: frontendServiceIntegrationImplemented
      ? "The static prototype has an optional configured-service bridge for answer, rating, and Search Insights endpoints."
      : "The static prototype is not wired to the standalone service.",
    retention: retentionPolicyImplemented
      ? "The service has a configured retention policy with a 180-day default and a documented env override."
      : "Retention policy is not implemented yet.",
    moderation: moderationExportImplemented
      ? "The service has a token-gated moderation export for gap, low-rating, unanswered, and repeated-question review; a full admin workflow is still production work."
      : "Moderation export is not implemented yet.",
    metrics: metricsExportImplemented
      ? "The service has a token-gated metrics export for internal monitoring; it excludes raw questions, answers, notes, moderation queues, API keys, and tokens."
      : "Metrics export is not implemented yet.",
    cors: corsPolicyImplemented
      ? "The service can enforce SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS for browser access; final production origin configuration is still tied to the deploy-route decision."
      : "Configurable CORS allowlisting is not implemented yet.",
    answerReuse: answerCacheImplemented
      ? "The service stores helpful-rated answers with embeddings and can reuse them for semantically similar questions after guardrail preflight."
      : "Helpful-rated answer reuse is not implemented yet.",
    dynamicExamples: dynamicExamplesImplemented
      ? "The service exposes helpful cached questions for dynamic example chips while the frontend keeps curated examples as fallback."
      : "Dynamic example chips are not implemented yet.",
    pageFeedback: pageFeedbackServiceImplemented
      ? "Reader page feedback is service-backed when configured, and negative page feedback creates page-feedback-needs-work gaps in SQLite."
      : "Reader page feedback is still localStorage-only.",
    reviewerSummary: gapSummaryJobImplemented
      ? "A local summary job can read the SQLite datastore and emit markdown or JSON for the editorial review cadence."
      : "The scheduled/reviewer gap-summary job is not implemented yet.",
    reviewerWorkflow: reviewerWorkflowDocumented
      ? "The internal living-docs operations runbook documents daily triage, weekly summaries, moderation export handling, privacy boundaries, escalation rules, launch gates, and incident handling."
      : "The reviewer operating runbook is not documented yet.",
    backupRestore: backupRestoreImplemented
      ? "The internal backup utility can create a SQLite-consistent backup manifest and verify restore viability with integrity and table-count checks."
      : "The SQLite backup/restore-check utility is not implemented yet.",
    productionPreflight: productionPreflightImplemented
      ? "The production preflight validates artifacts, service env, LLM env, CORS origins, moderation token rules, and secret-printing boundaries before launch."
      : "Production configuration preflight is not implemented yet.",
    requiredNextStep: frontendServiceIntegrationImplemented
      ? retentionPolicyImplemented && moderationExportImplemented && metricsExportImplemented && corsPolicyImplemented && gapSummaryJobImplemented && reviewerWorkflowDocumented && backupRestoreImplemented && productionPreflightImplemented
        ? "Deploy the standalone service and selected public frontend route, configure production allowed origins plus retention/moderation/metrics/backup storage access, assign reviewer owner/cadence, install production VPS service env, and run the production preflight."
        : "Deploy the standalone service and selected public frontend route, define allowed origins plus retention/moderation/metrics policy, and install production VPS service env."
      : "Deploy the standalone service, connect the public frontend to it, define retention/moderation/metrics policy, and install production VPS service env.",
    blockedBy: ["OPERATOR-INBOX #4", "OPERATOR-INBOX #11"],
  },
};

ensureDir(path.dirname(args.outJson));
fs.writeFileSync(args.outJson, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(args.outJs, `window.SearchBookLivingDocsEvents = ${JSON.stringify(payload)};\n`);

console.log(JSON.stringify({
  eventContractReady: payload.eventContractReady,
  fixtures: `${payload.coverage.passingFixtures}/${payload.coverage.totalFixtures}`,
  datastoreImplemented: payload.datastoreImplemented,
  frontendServiceIntegrationImplemented: payload.frontendServiceIntegrationImplemented,
  retentionPolicyImplemented: payload.retentionPolicyImplemented,
  moderationExportImplemented: payload.moderationExportImplemented,
  metricsExportImplemented: payload.metricsExportImplemented,
  corsPolicyImplemented: payload.corsPolicyImplemented,
  answerCacheImplemented: payload.answerCacheImplemented,
  dynamicExamplesImplemented: payload.dynamicExamplesImplemented,
  pageFeedbackServiceImplemented: payload.pageFeedbackServiceImplemented,
  gapSummaryJobImplemented: payload.gapSummaryJobImplemented,
  reviewerWorkflowDocumented: payload.reviewerWorkflowDocumented,
  backupRestoreImplemented: payload.backupRestoreImplemented,
  productionPreflightImplemented: payload.productionPreflightImplemented,
  livingDocsProductionReady: payload.livingDocsProductionReady,
}, null, 2));
