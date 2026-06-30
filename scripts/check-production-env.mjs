#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const repoRoot = searchBookRoot;

const requiredArtifacts = [
  "index.html",
  "page-manifest.json",
  "data/answer-chunks.json",
  "data/answer-engine-contract.json",
  "data/living-docs-events.json",
  "data/llm-rag-contract.json",
  "data/quality-audit.json",
  "deploy/symmio-search-book.service",
];

const productionDefaults = {
  host: "127.0.0.1",
  port: 8787,
  retentionDays: 180,
  rateLimitPerMinute: 60,
  maxBodyBytes: 64_000,
  maxRecentEvents: 25,
  endpoint: "https://api.openai.com/v1/chat/completions",
};

function usage() {
  return `Usage:
  node scripts/check-production-env.mjs [--json]

Environment:
  SEARCH_BOOK_ANSWER_ENGINE_DB=/var/lib/symmio-search-book/search-book-answer-engine.sqlite
  SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS=https://docs.example.com
  SEARCH_BOOK_ANSWER_ENGINE_DEFAULT_MODE=llm
  SEARCH_BOOK_LLM_API_STYLE=openai-compatible
  SEARCH_BOOK_LLM_ENDPOINT=https://api.openai.com/v1/chat/completions
  SEARCH_BOOK_LLM_MODEL=gpt-4.1-mini
  SEARCH_BOOK_LLM_API_KEY=<server-only>
  SEARCH_BOOK_LLM_ALLOW_EXTERNAL_CONTEXT=true

Notes:
  This preflight validates production configuration without calling the LLM provider.
  It reports whether secrets are configured but never prints secret values.`;
}

function parseArgs(argv) {
  const args = { json: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--json") args.json = true;
    else if (arg === "--help") {
      console.log(usage());
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function env(name, fallback = "") {
  return process.env[name] || fallback;
}

function numberEnv(name, fallback) {
  const raw = env(name, String(fallback));
  return { raw, value: Number(raw) };
}

function parseAllowedOrigins(value) {
  return String(value || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function safeRelative(filePath) {
  return path.relative(repoRoot, filePath) || ".";
}

function isInsideRepo(filePath) {
  const relative = path.relative(repoRoot, path.resolve(filePath));
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function addCheck(checks, { id, label, passed, detail = "", severity = "error" }) {
  checks.push({
    id,
    label,
    severity,
    passed: Boolean(passed),
    detail,
  });
}

function fileExists(relativePath) {
  return fs.existsSync(path.join(searchBookRoot, relativePath));
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(searchBookRoot, relativePath), "utf8"));
}

function checkArtifacts(checks) {
  const missing = requiredArtifacts.filter((relativePath) => !fileExists(relativePath));
  addCheck(checks, {
    id: "required-artifacts",
    label: "Required built artifacts exist",
    passed: missing.length === 0,
    detail: missing.length ? `missing: ${missing.join(", ")}` : `${requiredArtifacts.length} artifacts present`,
  });

  if (missing.length) return;

  const manifest = readJson("page-manifest.json");
  const chunks = readJson("data/answer-chunks.json");
  const answerEngine = readJson("data/answer-engine-contract.json");
  const livingDocs = readJson("data/living-docs-events.json");
  const llm = readJson("data/llm-rag-contract.json");
  const quality = readJson("data/quality-audit.json");

  addCheck(checks, {
    id: "manifest-target",
    label: "Compendium manifest remains in 500-800 target",
    passed: manifest.compendiumTarget?.withinTarget === true || manifest.compendiumTarget?.manifestWithinTarget === true || ((manifest.pages || []).length >= 500 && (manifest.pages || []).length <= 800),
    detail: `${(manifest.pages || []).length} manifest pages`,
  });
  addCheck(checks, {
    id: "answer-chunks",
    label: "Retrieval chunks are built and source-clean",
    passed: (chunks.totalChunks || 0) > 0 && (chunks.unknownSourceKeys || []).length === 0,
    detail: `${chunks.totalChunks || 0} chunks, ${(chunks.unknownSourceKeys || []).length} unknown source keys`,
  });
  addCheck(checks, {
    id: "answer-contract",
    label: "Deterministic answer contract is ready",
    passed: answerEngine.deterministicReady === true && answerEngine.evaluation?.allExactRoutesPass === true && answerEngine.evaluation?.allRefusalTestsPass === true,
    detail: `${answerEngine.evaluation?.exactRouteTestsPassing || 0}/${answerEngine.evaluation?.totalExactRouteTests || 0} exact routes, ${answerEngine.evaluation?.refusalTestsPassing || 0}/${answerEngine.evaluation?.totalRefusalTests || 0} refusals`,
  });
  addCheck(checks, {
    id: "llm-live-evidence",
    label: "Recorded live LLM eval evidence is passing",
    passed: llm.runtimeImplemented === true && llm.liveEvaluation?.status === "passed",
    detail: `${llm.liveEvaluation?.suites?.total?.passing || 0}/${llm.liveEvaluation?.suites?.total?.total || 0} live fixtures, model ${llm.liveEvaluation?.model || "unrecorded"}`,
  });
  addCheck(checks, {
    id: "living-docs-service",
    label: "Living-docs service controls are implemented",
    passed:
      livingDocs.datastoreImplemented === true &&
      livingDocs.retentionPolicyImplemented === true &&
      livingDocs.moderationExportImplemented === true &&
      livingDocs.corsPolicyImplemented === true &&
      livingDocs.backupRestoreImplemented === true,
    detail: `datastore=${livingDocs.datastoreImplemented === true}, retention=${livingDocs.retentionPolicyImplemented === true}, moderation=${livingDocs.moderationExportImplemented === true}, cors=${livingDocs.corsPolicyImplemented === true}, backup=${livingDocs.backupRestoreImplemented === true}`,
  });
  const qualityGatesPassed = (quality.gates || []).filter((gate) => gate.passed).length;
  const qualityGatesTotal = (quality.gates || []).length;
  addCheck(checks, {
    id: "known-quality-boundary",
    label: "Quality audit remains in known non-production boundary",
    passed: qualityGatesPassed === 27 && qualityGatesTotal === 30,
    detail: `quality gates ${qualityGatesPassed}/${qualityGatesTotal}`,
    severity: "warning",
  });
}

function checkServiceEnv(checks) {
  const dbPath = env("SEARCH_BOOK_ANSWER_ENGINE_DB");
  const dbResolved = dbPath ? path.resolve(dbPath) : "";
  const dbParent = dbResolved ? path.dirname(dbResolved) : "";
  addCheck(checks, {
    id: "db-path-configured",
    label: "Production SQLite path is configured",
    passed: Boolean(dbPath) && path.isAbsolute(dbPath) && !isInsideRepo(dbResolved),
    detail: dbPath
      ? `configured outside repo=${!isInsideRepo(dbResolved)}, parent=${dbParent ? safeRelative(dbParent) : ""}`
      : "SEARCH_BOOK_ANSWER_ENGINE_DB is missing",
  });
  addCheck(checks, {
    id: "db-parent-accessible",
    label: "Production SQLite parent directory exists",
    passed: Boolean(dbParent) && fs.existsSync(dbParent),
    detail: dbParent ? `parent exists=${fs.existsSync(dbParent)}` : "no parent directory",
  });

  const host = env("SEARCH_BOOK_ANSWER_ENGINE_HOST", productionDefaults.host);
  const port = numberEnv("SEARCH_BOOK_ANSWER_ENGINE_PORT", productionDefaults.port);
  addCheck(checks, {
    id: "service-listen-config",
    label: "Service host and port are valid",
    passed: Boolean(host) && Number.isInteger(port.value) && port.value > 0 && port.value <= 65_535,
    detail: `host configured=${Boolean(host)}, port=${port.raw}`,
  });

  const defaultMode = env("SEARCH_BOOK_ANSWER_ENGINE_DEFAULT_MODE");
  addCheck(checks, {
    id: "default-mode",
    label: "Production default mode is LLM-backed",
    passed: defaultMode === "llm",
    detail: defaultMode ? `mode=${defaultMode}` : "SEARCH_BOOK_ANSWER_ENGINE_DEFAULT_MODE is missing",
  });

  const retention = numberEnv("SEARCH_BOOK_ANSWER_ENGINE_RETENTION_DAYS", productionDefaults.retentionDays);
  const rateLimit = numberEnv("SEARCH_BOOK_ANSWER_ENGINE_RATE_LIMIT_PER_MINUTE", productionDefaults.rateLimitPerMinute);
  const maxBody = numberEnv("SEARCH_BOOK_ANSWER_ENGINE_MAX_BODY_BYTES", productionDefaults.maxBodyBytes);
  const maxRecent = numberEnv("SEARCH_BOOK_ANSWER_ENGINE_MAX_RECENT_EVENTS", productionDefaults.maxRecentEvents);
  addCheck(checks, {
    id: "retention-policy",
    label: "Retention policy is enabled",
    passed: Number.isFinite(retention.value) && retention.value > 0,
    detail: `days=${retention.raw}`,
  });
  addCheck(checks, {
    id: "rate-limit",
    label: "Rate limit is enabled",
    passed: Number.isFinite(rateLimit.value) && rateLimit.value > 0,
    detail: `perMinute=${rateLimit.raw}`,
  });
  addCheck(checks, {
    id: "body-limit",
    label: "Request body limit is finite",
    passed: Number.isFinite(maxBody.value) && maxBody.value > 0 && maxBody.value <= 1_000_000,
    detail: `bytes=${maxBody.raw}`,
  });
  addCheck(checks, {
    id: "recent-events-limit",
    label: "Recent event payload limit is finite",
    passed: Number.isFinite(maxRecent.value) && maxRecent.value > 0 && maxRecent.value <= 1_000,
    detail: `events=${maxRecent.raw}`,
  });
}

function checkCorsEnv(checks) {
  const originsRaw = env("SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS");
  const origins = parseAllowedOrigins(originsRaw);
  const invalidOrigins = origins.filter((origin) => {
    if (origin === "*") return true;
    try {
      const parsed = new URL(origin);
      return parsed.protocol !== "https:" || parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";
    } catch {
      return true;
    }
  });
  addCheck(checks, {
    id: "allowed-origins",
    label: "Browser CORS allowlist is production-safe",
    passed: origins.length > 0 && invalidOrigins.length === 0,
    detail: origins.length ? `${origins.length} origin(s), invalid=${invalidOrigins.length}` : "SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS is missing",
  });

  const serviceUrl = env("SEARCH_BOOK_ANSWER_ENGINE_URL");
  if (serviceUrl) {
    let passed = false;
    try {
      const parsed = new URL(serviceUrl);
      passed = parsed.protocol === "https:" && parsed.hostname !== "localhost" && parsed.hostname !== "127.0.0.1";
    } catch {
      passed = false;
    }
    addCheck(checks, {
      id: "public-service-url",
      label: "Public service URL is production-safe when configured",
      passed,
      detail: `configured=${Boolean(serviceUrl)}`,
    });
  }
}

function checkLlmEnv(checks) {
  const style = env("SEARCH_BOOK_LLM_API_STYLE");
  const endpoint = env("SEARCH_BOOK_LLM_ENDPOINT", productionDefaults.endpoint);
  const model = env("SEARCH_BOOK_LLM_MODEL");
  const apiKey = env("SEARCH_BOOK_LLM_API_KEY");
  const externalContext = env("SEARCH_BOOK_LLM_ALLOW_EXTERNAL_CONTEXT");

  addCheck(checks, {
    id: "llm-api-style",
    label: "LLM API style is OpenAI-compatible",
    passed: style === "openai-compatible" || style === "openai",
    detail: style ? `style=${style}` : "SEARCH_BOOK_LLM_API_STYLE is missing",
  });
  addCheck(checks, {
    id: "llm-endpoint",
    label: "LLM endpoint is HTTPS",
    passed: endpoint.startsWith("https://"),
    detail: `endpointConfigured=${Boolean(endpoint)}`,
  });
  addCheck(checks, {
    id: "llm-model",
    label: "LLM model is configured",
    passed: Boolean(model),
    detail: model ? "model configured" : "SEARCH_BOOK_LLM_MODEL is missing",
  });
  addCheck(checks, {
    id: "llm-api-key",
    label: "LLM API key is configured",
    passed: Boolean(apiKey),
    detail: `apiKeyConfigured=${Boolean(apiKey)}`,
  });
  addCheck(checks, {
    id: "external-context-policy",
    label: "External context policy matches production decision",
    passed: externalContext === "true",
    detail: `allowExternalContext=${externalContext || "missing"}`,
  });
}

function checkModerationEnv(checks) {
  const enabled = env("SEARCH_BOOK_ANSWER_ENGINE_ENABLE_MODERATION_EXPORT") === "true";
  const token = env("SEARCH_BOOK_ANSWER_ENGINE_MODERATION_TOKEN");
  const limit = numberEnv("SEARCH_BOOK_ANSWER_ENGINE_MODERATION_LIMIT", 50);
  addCheck(checks, {
    id: "moderation-token-rule",
    label: "Moderation export token rule is valid",
    passed: !enabled || Boolean(token),
    detail: `enabled=${enabled}, tokenConfigured=${Boolean(token)}`,
  });
  addCheck(checks, {
    id: "moderation-limit",
    label: "Moderation export limit is finite",
    passed: Number.isFinite(limit.value) && limit.value > 0 && limit.value <= 1_000,
    detail: `limit=${limit.raw}`,
  });
}

function main() {
  parseArgs(process.argv.slice(2));
  const checks = [];
  checkArtifacts(checks);
  checkServiceEnv(checks);
  checkCorsEnv(checks);
  checkLlmEnv(checks);
  checkModerationEnv(checks);

  const failed = checks.filter((check) => check.severity === "error" && !check.passed);
  const warnings = checks.filter((check) => check.severity === "warning" && !check.passed);
  const result = {
    status: failed.length ? "failed" : "passed",
    service: "search-book-production-preflight",
    generatedAt: new Date().toISOString(),
    secrets: {
      llmApiKeyConfigured: Boolean(env("SEARCH_BOOK_LLM_API_KEY")),
      moderationTokenConfigured: Boolean(env("SEARCH_BOOK_ANSWER_ENGINE_MODERATION_TOKEN")),
      valuesPrinted: false,
    },
    totals: {
      checks: checks.length,
      passed: checks.filter((check) => check.passed).length,
      failed: failed.length,
      warnings: warnings.length,
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

main();
