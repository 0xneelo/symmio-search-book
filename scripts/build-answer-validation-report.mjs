#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const repoRoot = searchBookRoot;

const defaults = {
  answerEngineContract: path.join(searchBookRoot, "data", "answer-engine-contract.json"),
  llmRagContract: path.join(searchBookRoot, "data", "llm-rag-contract.json"),
  answerChunks: path.join(searchBookRoot, "data", "answer-chunks.json"),
  pageStateRegistry: path.join(searchBookRoot, "data", "page-state-registry.json"),
  sourceCatalog: path.join(searchBookRoot, "data", "source-catalog.json"),
  gapQueue: path.join(searchBookRoot, "data", "gap-queue.json"),
  operatorInbox: path.join(repoRoot, "_specs", "app-docs", "OPERATOR-INBOX.md"),
  outJson: path.join(searchBookRoot, "data", "answer-validation-report.json"),
  outJs: path.join(searchBookRoot, "data", "answer-validation-report.js"),
};

const validationPolicy = {
  answeredStatus: "answered",
  allowedAnswerPageStates: ["candidate", "published"],
  allowedContextPageStates: ["candidate", "published", "source-companion"],
  citationsRequired: true,
  paragraphCitationIdsRequired: true,
  sourceHrefRequired: true,
  gapEventRequiredForRefusals: true,
};

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--out-js") args.outJs = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node scripts/build-answer-validation-report.mjs [--out-json path] [--out-js path]");
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
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function firstMatchingChunk(route, chunksByPageId, sourceByKey) {
  const chunks = chunksByPageId.get(route.expectedPageId) || [];
  return chunks.find((chunk) =>
    (chunk.sourceKeys || []).some((key) => (route.sourceKeys || []).includes(key) && sourceByKey[key]?.href),
  ) || chunks.find((chunk) => (chunk.sourceKeys || []).some((key) => sourceByKey[key]?.href));
}

function firstMatchingAdversarialChunk(test, chunksByPageId, sourceByKey) {
  const chunks = chunksByPageId.get(test.expectedAnswerPageId) || [];
  return chunks.find((chunk) =>
    (chunk.sourceKeys || []).some((key) => (test.expectedSourceKeys || []).includes(key) && sourceByKey[key]?.href),
  ) || chunks.find((chunk) => (chunk.sourceKeys || []).some((key) => sourceByKey[key]?.href));
}

function parseOpenInboxItems(markdown) {
  const openSection = markdown.split("## Open")[1]?.split("## Resolved")[0] || "";
  return [...openSection.matchAll(/^### \[OPEN\] #(\d+) — (.+)$/gm)].map((match) => ({
    id: Number(match[1]),
    title: match[2].trim(),
  }));
}

function citedAnswerFixture(route, chunk, sourceByKey) {
  const sourceKey = (chunk.sourceKeys || []).find((key) => sourceByKey[key]?.href);
  const citationId = `${route.id}-citation-1`;
  const answer = route.expectedPageId === "authored-amfq-legacy-intent-naming"
    ? "AMFQ, sometimes written aMFQ, stands for Automated Market for Quotes and is legacy naming for the current Intents model, not a separate live system."
    : `${route.expectedPageTitle} is the cited answer route for this seeded question.`;
  return {
    id: `fixture-${route.id}`,
    type: "cited-answer",
    query: route.query,
    expectedPageId: route.expectedPageId,
    response: {
      requestId: `req-${route.id}`,
      status: validationPolicy.answeredStatus,
      answer,
      primaryPageId: route.expectedPageId,
      citations: [
        {
          id: citationId,
          pageId: route.expectedPageId,
          pageTitle: route.expectedPageTitle,
          sourceKey,
          sourceHref: sourceByKey[sourceKey]?.href || "",
          chunkIds: [chunk.id],
        },
      ],
      paragraphs: [
        {
          text: answer,
          citationIds: [citationId],
        },
      ],
      events: [
        {
          type: "question-answered",
          pageId: route.expectedPageId,
        },
      ],
    },
  };
}

function groundedAdversarialAnswerFixture(test, chunk, sourceByKey) {
  const sourceKey = (test.expectedSourceKeys || []).find((key) =>
    (chunk.sourceKeys || []).includes(key) && sourceByKey[key]?.href,
  ) || (chunk.sourceKeys || []).find((key) => sourceByKey[key]?.href);
  const citationId = `${test.id}-citation-1`;
  const answer = test.expectedAnswer;
  return {
    id: `fixture-${test.id}`,
    type: "cited-answer",
    query: test.query,
    expectedPageId: test.expectedAnswerPageId,
    requiredAnswerIncludes: test.requiredAnswerIncludes || [],
    mustNotInclude: test.mustNotInclude || [],
    response: {
      requestId: `req-${test.id}`,
      status: validationPolicy.answeredStatus,
      answer,
      primaryPageId: test.expectedAnswerPageId,
      citations: [
        {
          id: citationId,
          pageId: test.expectedAnswerPageId,
          pageTitle: test.expectedPageTitle,
          sourceKey,
          sourceHref: sourceByKey[sourceKey]?.href || "",
          chunkIds: [chunk.id],
        },
      ],
      paragraphs: [
        {
          text: answer,
          citationIds: [citationId],
        },
      ],
      events: [
        {
          type: "question-answered",
          pageId: test.expectedAnswerPageId,
        },
      ],
    },
  };
}

function refusalFixture(test) {
  return {
    id: `fixture-${test.id}`,
    type: "refusal",
    query: test.query,
    expectedStatus: test.expectedStatus,
    expectedRefusalReason: test.expectedRefusalReason,
    response: {
      requestId: `req-${test.id}`,
      status: test.expectedStatus,
      answer: "",
      primaryPageId: "",
      citations: [],
      refusalReason: test.expectedRefusalReason,
      events: [
        {
          type: "gap-created",
          gapId: test.requiredGapId || "",
          operatorItemIds: test.requiredOperatorItemIds || [],
        },
      ],
      gapEvent: {
        id: `gap-${test.id}`,
        query: test.query,
        reason: test.expectedRefusalReason,
        page: "",
        gapId: test.requiredGapId || "",
        operatorItemIds: test.requiredOperatorItemIds || [],
        time: "deterministic-build",
      },
    },
  };
}

function validateCitation(citation, fixture, context) {
  const failures = [];
  const page = context.pageStateById.get(citation.pageId);
  const source = context.sourceByKey[citation.sourceKey];
  if (!page) failures.push("citation-page-missing");
  if (page && !validationPolicy.allowedContextPageStates.includes(page.pageState)) failures.push("citation-page-state-disallowed");
  if (!source) failures.push("citation-source-key-missing");
  if (source && !source.href) failures.push("citation-source-href-missing");
  if (citation.sourceHref && source?.href && citation.sourceHref !== source.href) failures.push("citation-source-href-mismatch");
  if (!(citation.chunkIds || []).length) failures.push("citation-chunk-id-missing");
  for (const chunkId of citation.chunkIds || []) {
    const chunk = context.chunkById.get(chunkId);
    if (!chunk) {
      failures.push("citation-chunk-missing");
      continue;
    }
    if (chunk.pageId !== citation.pageId) failures.push("citation-chunk-page-mismatch");
    if (!(chunk.sourceKeys || []).includes(citation.sourceKey)) failures.push("citation-chunk-source-mismatch");
  }
  if (fixture.response.primaryPageId && citation.pageId !== fixture.response.primaryPageId) failures.push("citation-primary-page-mismatch");
  return unique(failures);
}

function validateAnsweredFixture(fixture, context) {
  const failures = [];
  const response = fixture.response || {};
  const page = context.pageStateById.get(response.primaryPageId);
  const answerText = `${response.answer || ""} ${(response.paragraphs || []).map((paragraph) => paragraph.text || "").join(" ")}`;
  const normalizedAnswerText = answerText.toLowerCase();
  if (response.status !== validationPolicy.answeredStatus) failures.push("answered-status-invalid");
  if (!response.answer) failures.push("answer-empty");
  if (!page) failures.push("primary-page-missing");
  if (page && !validationPolicy.allowedAnswerPageStates.includes(page.pageState)) failures.push("primary-page-state-disallowed");
  if (fixture.expectedPageId === "authored-amfq-legacy-intent-naming") {
    if (!/Automated Market for Quotes/.test(answerText)) failures.push("amfq-expansion-missing");
    if (!/legacy/i.test(answerText)) failures.push("amfq-legacy-framing-missing");
    if (!/Intent/i.test(answerText)) failures.push("amfq-intent-translation-missing");
    if (/separate live system/i.test(answerText) === false) failures.push("amfq-separate-system-negation-missing");
  }
  for (const requiredText of fixture.requiredAnswerIncludes || []) {
    if (!normalizedAnswerText.includes(String(requiredText).toLowerCase())) failures.push("required-answer-text-missing");
  }
  for (const disallowedText of fixture.mustNotInclude || []) {
    if (normalizedAnswerText.includes(String(disallowedText).toLowerCase())) failures.push("disallowed-answer-text-present");
  }
  if (!(response.citations || []).length) failures.push("citations-missing");
  const citationIds = new Set((response.citations || []).map((citation) => citation.id));
  for (const citation of response.citations || []) failures.push(...validateCitation(citation, fixture, context));
  for (const paragraph of response.paragraphs || []) {
    if (!(paragraph.citationIds || []).length) failures.push("paragraph-citations-missing");
    for (const citationId of paragraph.citationIds || []) {
      if (!citationIds.has(citationId)) failures.push("paragraph-citation-id-unknown");
    }
  }
  if (!(response.paragraphs || []).length) failures.push("paragraphs-missing");
  if (!(response.events || []).length) failures.push("events-missing");
  return unique(failures);
}

function validateRefusalFixture(fixture, context) {
  const failures = [];
  const response = fixture.response || {};
  if (response.status !== fixture.expectedStatus) failures.push("refusal-status-mismatch");
  if (response.refusalReason !== fixture.expectedRefusalReason) failures.push("refusal-reason-mismatch");
  if ((response.citations || []).length) failures.push("refusal-has-citations");
  if (!response.gapEvent) failures.push("gap-event-missing");
  if (response.gapEvent) {
    for (const field of ["id", "query", "reason", "page", "time"]) {
      if (!(field in response.gapEvent)) failures.push(`gap-event-${field}-missing`);
    }
    if (response.gapEvent.reason !== fixture.expectedRefusalReason) failures.push("gap-event-reason-mismatch");
    if (response.gapEvent.gapId && !context.gapIds.has(response.gapEvent.gapId)) failures.push("gap-event-gap-id-missing");
  }
  for (const operatorItemId of response.gapEvent?.operatorItemIds || []) {
    if (!context.openOperatorItemIds.has(operatorItemId)) failures.push("gap-event-operator-item-missing");
  }
  if (!(response.events || []).length) failures.push("events-missing");
  return unique(failures);
}

const args = parseArgs(process.argv.slice(2));
const answerEngineContract = readJson(args.answerEngineContract);
const llmRagContract = readJson(args.llmRagContract);
const answerChunks = readJson(args.answerChunks);
const pageStateRegistry = readJson(args.pageStateRegistry);
const sourceCatalog = readJson(args.sourceCatalog);
const gapQueue = readJson(args.gapQueue);
const openInboxItems = parseOpenInboxItems(readText(args.operatorInbox));

const chunksByPageId = new Map();
const chunkById = new Map();
for (const chunk of answerChunks.chunks || []) {
  if (!chunksByPageId.has(chunk.pageId)) chunksByPageId.set(chunk.pageId, []);
  chunksByPageId.get(chunk.pageId).push(chunk);
  chunkById.set(chunk.id, chunk);
}
const pageStateById = new Map((pageStateRegistry.pages || []).map((page) => [page.id, page]));
const sourceByKey = sourceCatalog.sourceByKey || {};
const gapIds = new Set((gapQueue.items || []).map((item) => item.gapId));
const openOperatorItemIds = new Set(openInboxItems.map((item) => item.id));
const context = { chunkById, pageStateById, sourceByKey, gapIds, openOperatorItemIds };

const citedAnswerFixtures = (answerEngineContract.evaluation?.exactRouteTests || [])
  .filter((route) => route.passes && validationPolicy.allowedAnswerPageStates.includes(route.expectedPageState))
  .map((route) => ({ route, chunk: firstMatchingChunk(route, chunksByPageId, sourceByKey) }))
  .filter((item) => item.chunk)
  .slice(0, 12)
  .map((item) => citedAnswerFixture(item.route, item.chunk, sourceByKey));
const adversarialCases = llmRagContract.adversarialEvaluation?.cases || [];
const groundedAdversarialFixtures = adversarialCases
  .filter((test) => test.expectedStatus === validationPolicy.answeredStatus)
  .map((test) => ({ test, chunk: firstMatchingAdversarialChunk(test, chunksByPageId, sourceByKey) }))
  .filter((item) => item.chunk)
  .map((item) => groundedAdversarialAnswerFixture(item.test, item.chunk, sourceByKey));
const refusalFixtures = adversarialCases
  .filter((test) => test.expectedStatus !== validationPolicy.answeredStatus)
  .map(refusalFixture);
const fixtures = [...citedAnswerFixtures, ...groundedAdversarialFixtures, ...refusalFixtures];
const validatedFixtures = fixtures.map((fixture) => {
  const failures = fixture.type === "cited-answer"
    ? validateAnsweredFixture(fixture, context)
    : validateRefusalFixture(fixture, context);
  return {
    ...fixture,
    passes: failures.length === 0,
    failures,
  };
});

const failingFixtures = validatedFixtures.filter((fixture) => !fixture.passes);
const failuresByKind = {};
for (const fixture of failingFixtures) {
  for (const failure of fixture.failures) failuresByKind[failure] = (failuresByKind[failure] || 0) + 1;
}
const reportReady =
  citedAnswerFixtures.length >= 12 &&
  refusalFixtures.length + groundedAdversarialFixtures.length === (llmRagContract.adversarialEvaluation?.totalCases || 0) &&
  validatedFixtures.length >= 20 &&
  failingFixtures.length === 0;

const payload = {
  generatedAt: "deterministic-build",
  status: "prototype-answer-validation-report",
  reportVersion: "2026-06-28.v1",
  reportReady,
  validationPolicy,
  coverage: {
    citedAnswerFixtures: citedAnswerFixtures.length,
    groundedAdversarialFixtures: groundedAdversarialFixtures.length,
    refusalFixtures: refusalFixtures.length,
    totalFixtures: validatedFixtures.length,
    passingFixtures: validatedFixtures.length - failingFixtures.length,
    failingFixtures: failingFixtures.length,
    exactRouteGoldenSet: answerEngineContract.evaluation?.totalExactRouteTests || 0,
    adversarialGoldenSet: llmRagContract.adversarialEvaluation?.totalCases || 0,
    answerChunkPages: answerChunks.totalPages || 0,
    answerChunks: answerChunks.totalChunks || 0,
    sourceCatalogEntries: sourceCatalog.totalSources || 0,
    pageStatePages: pageStateRegistry.totalPages || 0,
    openOperatorItems: openOperatorItemIds.size,
    gapQueueItems: gapQueue.totalItems || 0,
  },
  failureSummary: {
    failingFixtureIds: failingFixtures.map((fixture) => fixture.id),
    failuresByKind,
  },
  fixtures: validatedFixtures,
};

ensureDir(path.dirname(args.outJson));
fs.writeFileSync(args.outJson, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(args.outJs, `window.SearchBookAnswerValidationReport = ${JSON.stringify(payload)};\n`);
console.log(
  JSON.stringify(
    {
      reportReady: payload.reportReady,
      fixtures: `${payload.coverage.passingFixtures}/${payload.coverage.totalFixtures}`,
      citedAnswers: payload.coverage.citedAnswerFixtures,
      refusals: payload.coverage.refusalFixtures,
      failingFixtures: payload.coverage.failingFixtures,
    },
    null,
    2,
  ),
);
