#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { answerQuery, defaults as runtimeDefaults, loadRuntime } from "./run-llm-rag-answer.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const expectedRoutingRefusalReasons = new Set([
  "discord-corpus-review-required",
  "no-public-answer-page",
]);

const runtimeProbes = [
  {
    id: "discord-repeated-solver-question",
    requestId: "check-discord-refusal-repeated-solver",
    query: "What did Lafa say in Discord about repeated solver questions?",
  },
  {
    id: "lafa-identity-public-safe",
    requestId: "check-discord-refusal-lafa-identity",
    query: "who is lafachief",
  },
];

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(searchBookRoot, relativePath), "utf8"));
}

function addCheck(checks, id, passed, detail = "", evidence = null) {
  checks.push({
    id,
    passed: Boolean(passed),
    detail,
    ...(evidence ? { evidence } : {}),
  });
}

async function withClearedLlmEnv(callback) {
  const keys = [
    "SEARCH_BOOK_LLM_API_KEY",
    "SEARCH_BOOK_LLM_MODEL",
    "SEARCH_BOOK_LLM_ENDPOINT",
    "SEARCH_BOOK_LLM_API_STYLE",
    "SEARCH_BOOK_LLM_ALLOW_EXTERNAL_CONTEXT",
  ];
  const previous = new Map(keys.map((key) => [key, process.env[key]]));
  for (const key of keys) process.env[key] = "";
  try {
    return await callback();
  } finally {
    for (const [key, value] of previous) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

async function runProbe(probe, runtime) {
  let payload = null;
  let parseError = "";
  try {
    const result = await withClearedLlmEnv(() => answerQuery({
      mode: "extractive",
      requestId: probe.requestId,
      query: probe.query,
      json: true,
      includeDebug: false,
      evalLive: "",
    }, runtime));
    payload = result.response || null;
  } catch (error) {
    parseError = error.message;
  }
  const serializedPayload = payload ? JSON.stringify(payload) : "";

  return {
    id: probe.id,
    requestId: probe.requestId,
    exitStatus: parseError ? 1 : 0,
    payloadBytes: Buffer.byteLength(serializedPayload),
    parseError,
    payload,
  };
}

function validateRuntimeProbe(probe, checks) {
  const payload = probe.payload || {};
  const gapEvent = payload.gapEvent || {};
  const gapEvents = (payload.events || []).filter((event) => event.type === "gap-created");
  const probeEvidence = {
    id: probe.id,
    exitStatus: probe.exitStatus,
    status: payload.status || "",
    refusalReason: payload.refusalReason || "",
    gapId: gapEvent.gapId || "",
    citations: (payload.citations || []).length,
    answerBytes: Buffer.byteLength(payload.answer || ""),
    primaryPageId: payload.primaryPageId || "",
    gapEvents: gapEvents.length,
    payloadBytes: probe.payloadBytes,
  };

  addCheck(
    checks,
    `${probe.id}-process`,
    probe.exitStatus === 0 && !probe.parseError,
    probe.parseError ? `parseError=${probe.parseError}` : `exit=${probe.exitStatus}`,
    { id: probe.id, payloadBytes: probe.payloadBytes },
  );
  addCheck(
    checks,
    `${probe.id}-refusal-shape`,
    payload.requestId === probe.requestId &&
      payload.status === "refusal" &&
      payload.refusalReason === "discord-corpus-review-required" &&
      payload.answer === "" &&
      payload.primaryPageId === "" &&
      Array.isArray(payload.citations) &&
      payload.citations.length === 0,
    "runtime response must be refusal-only with no answer text, page, or citations",
    probeEvidence,
  );
  addCheck(
    checks,
    `${probe.id}-gap-event`,
    gapEvent.reason === "discord-corpus-review-required" &&
      gapEvent.gapId === "G-001" &&
      gapEvents.length === 1 &&
      gapEvents[0].gapId === "G-001",
    "runtime refusal must create a G-001 gap signal",
    { id: probe.id, gapId: gapEvent.gapId || "", gapEvents: gapEvents.length },
  );
}

async function main() {
  const discordRouting = readJson("data/discord-review-routing.json");
  const reviewPlan = discordRouting.reviewPlan || {};
  const refusalReview = reviewPlan.refusalReview || [];
  const routingReasons = new Set(refusalReview.map((item) => item.refusalReason).filter(Boolean));
  const runtime = loadRuntime(runtimeDefaults);
  const checks = [];

  addCheck(
    checks,
    "routing-refusal-policy-ready",
    reviewPlan.refusalPolicyReady === true &&
      Number(reviewPlan.refusalPolicyReadyItems || 0) === refusalReview.length &&
      Number(reviewPlan.refusalPolicyReviewRequired || 0) === 0,
    `refusalPolicyReady=${reviewPlan.refusalPolicyReady}; ready=${reviewPlan.refusalPolicyReadyItems || 0}/${refusalReview.length}; reviewRequired=${reviewPlan.refusalPolicyReviewRequired || 0}`,
    {
      refusalReviewReady: refusalReview.length,
      refusalPolicyReadyItems: reviewPlan.refusalPolicyReadyItems || 0,
      refusalPolicyReviewRequired: reviewPlan.refusalPolicyReviewRequired || 0,
    },
  );
  addCheck(
    checks,
    "routing-refusal-reasons-covered",
    [...expectedRoutingRefusalReasons].every((reason) => routingReasons.has(reason)),
    `routingReasons=${[...routingReasons].sort().join(",") || "none"}`,
  );

  const probes = [];
  for (const probe of runtimeProbes) probes.push(await runProbe(probe, runtime));
  for (const probe of probes) validateRuntimeProbe(probe, checks);

  const failed = checks.filter((check) => !check.passed);
  const result = {
    status: failed.length ? "failed" : "passed",
    service: "search-book-discord-refusal-runtime-check",
    secrets: {
      valuesPrinted: false,
      llmCredentialsLoaded: false,
    },
    evidence: {
      routingRefusals: refusalReview.length,
      routingRefusalReasons: [...routingReasons].sort(),
      probes: probes.map((probe) => ({
        id: probe.id,
        exitStatus: probe.exitStatus,
        status: probe.payload?.status || "",
        refusalReason: probe.payload?.refusalReason || "",
        gapId: probe.payload?.gapEvent?.gapId || "",
        citations: (probe.payload?.citations || []).length,
        answerBytes: Buffer.byteLength(probe.payload?.answer || ""),
      })),
    },
    checks,
  };

  const rendered = JSON.stringify(result, null, 2);
  if (failed.length) {
    console.error(rendered);
    process.exit(1);
  }

  console.log(rendered);
}

main().catch((error) => {
  console.error(JSON.stringify({
    status: "failed",
    service: "search-book-discord-refusal-runtime-check",
    message: error.message,
    secrets: { valuesPrinted: false, llmCredentialsLoaded: false },
  }, null, 2));
  process.exit(1);
});
