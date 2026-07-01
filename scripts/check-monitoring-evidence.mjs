#!/usr/bin/env node

import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serviceScript = path.join(__dirname, "serve-answer-engine.mjs");
const searchBookRoot = path.resolve(__dirname, "..");
const validProfiles = new Set(["production", "staging"]);
const host = "127.0.0.1";
const localMetricsToken = "search-book-monitoring-evidence-token";

const defaults = {
  profile: "staging",
  serviceUrl: process.env.SEARCH_BOOK_ANSWER_ENGINE_URL || "",
  origin: "",
  metricsTokenEnv: "SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN",
  metricsRequired: null,
  local: false,
  timeoutMs: 10_000,
};

function usage() {
  return `Usage:
  node scripts/check-monitoring-evidence.mjs [options]

Options:
  --profile production|staging       Default: staging
  --service-url url                  Defaults to SEARCH_BOOK_ANSWER_ENGINE_URL
  --origin url                       Optional Origin header for CORS-aware probes
  --metrics-token-env NAME           Default: SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN
  --metrics-required                 Fail if token-gated metrics are unavailable
  --metrics-optional                 Warn if token-gated metrics are unavailable
  --local                            Start a temporary local service with metrics enabled
  --timeout-ms n                     Default: 10000

If no service URL is supplied for staging, --local is implied. Production requires HTTPS,
non-local service URL and token-gated metrics. Tokens are read from env only and never printed.`;
}

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--metrics-required") {
      args.metricsRequired = true;
      continue;
    }
    if (arg === "--metrics-optional") {
      args.metricsRequired = false;
      continue;
    }
    if (arg === "--local") {
      args.local = true;
      continue;
    }

    const next = argv[index + 1];
    if (!next || next.startsWith("--")) throw new Error(`${arg} requires a value.\n${usage()}`);
    if (arg === "--profile") args.profile = next;
    else if (arg === "--service-url") args.serviceUrl = next;
    else if (arg === "--origin") args.origin = next;
    else if (arg === "--metrics-token-env") args.metricsTokenEnv = next;
    else if (arg === "--timeout-ms") args.timeoutMs = Number(next);
    else throw new Error(`Unknown argument: ${arg}\n${usage()}`);
    index += 1;
  }

  if (!validProfiles.has(args.profile)) throw new Error("--profile must be production or staging.");
  if (args.profile === "production" && args.local) throw new Error("--local is staging-only.");
  if (args.profile === "staging" && !args.serviceUrl) args.local = true;
  if (args.metricsRequired === null) args.metricsRequired = args.profile === "production" || args.local;
  if (!Number.isFinite(args.timeoutMs) || args.timeoutMs < 1000) throw new Error("--timeout-ms must be at least 1000.");
  if (!args.local && !args.serviceUrl) throw new Error("--service-url or SEARCH_BOOK_ANSWER_ENGINE_URL is required unless --local is used.");
  if (!args.local) args.serviceUrl = normalizeBaseUrl(args.serviceUrl, "service URL");
  if (args.origin) args.origin = normalizeBaseUrl(args.origin, "origin URL");
  return args;
}

function normalizeBaseUrl(value, label) {
  const raw = String(value || "").trim();
  if (!raw) throw new Error(`Missing ${label}.`);
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`Invalid ${label}: ${raw}`);
  }
  if (!["http:", "https:"].includes(url.protocol)) throw new Error(`${label} must use http or https.`);
  url.hash = "";
  url.search = "";
  return url.toString().replace(/\/$/, "");
}

function addCheck(checks, { id, label, passed, severity = "error", detail = "", evidence = null }) {
  checks.push({
    id,
    label,
    severity,
    passed: Boolean(passed),
    detail,
    ...(evidence ? { evidence } : {}),
  });
}

function serviceUrlCheck(checks, args) {
  const parsed = new URL(args.serviceUrl);
  const localHost = ["localhost", "127.0.0.1", "::1"].includes(parsed.hostname);
  const passed = args.profile === "production"
    ? parsed.protocol === "https:" && !localHost
    : ["http:", "https:"].includes(parsed.protocol);
  addCheck(checks, {
    id: "service-url",
    label: "Service URL is valid for monitoring profile",
    passed,
    detail: `protocol=${parsed.protocol}, local=${localHost}`,
  });
}

function tail(text, maxLength = 5000) {
  const value = String(text || "");
  return value.length > maxLength ? value.slice(value.length - maxLength) : value;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.on("error", reject);
    server.listen(0, host, () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : 0;
      server.close(() => resolve(port));
    });
  });
}

async function requestJson(baseUrl, pathname, { headers = {}, timeoutMs = 10_000 } = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${baseUrl}${pathname}`, {
      headers,
      signal: controller.signal,
    });
    const text = await response.text();
    let payload = {};
    try {
      payload = text ? JSON.parse(text) : {};
    } catch {
      throw new Error(`${pathname} returned non-JSON body: ${text.slice(0, 200)}`);
    }
    return {
      statusCode: response.status,
      headers: response.headers,
      payload,
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function startLocalService(args) {
  const port = await getFreePort();
  if (!port) throw new Error("could not allocate a local monitoring evidence port.");
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "search-book-monitoring-evidence-"));
  const dbPath = path.join(tempDir, "search-book-answer-engine.sqlite");
  const baseUrl = `http://${host}:${port}`;
  const logs = { stdout: "", stderr: "" };
  const child = spawn(process.execPath, [serviceScript], {
    cwd: searchBookRoot,
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      SEARCH_BOOK_LLM_API_STYLE: "",
      SEARCH_BOOK_LLM_ENDPOINT: "",
      SEARCH_BOOK_LLM_MODEL: "",
      SEARCH_BOOK_LLM_API_KEY: "",
      SEARCH_BOOK_LLM_ALLOW_EXTERNAL_CONTEXT: "",
      SEARCH_BOOK_ANSWER_ENGINE_HOST: host,
      SEARCH_BOOK_ANSWER_ENGINE_PORT: String(port),
      SEARCH_BOOK_ANSWER_ENGINE_URL: baseUrl,
      SEARCH_BOOK_ANSWER_ENGINE_DB: dbPath,
      SEARCH_BOOK_ANSWER_ENGINE_DEFAULT_MODE: "extractive",
      SEARCH_BOOK_ANSWER_ENGINE_RATE_LIMIT_PER_MINUTE: "0",
      SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS: args.origin || "*",
      SEARCH_BOOK_ANSWER_ENGINE_ENABLE_METRICS_EXPORT: "true",
      SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN: localMetricsToken,
    },
  });
  child.stdout.setEncoding("utf8");
  child.stderr.setEncoding("utf8");
  child.stdout.on("data", (chunk) => {
    logs.stdout += chunk;
  });
  child.stderr.on("data", (chunk) => {
    logs.stderr += chunk;
  });

  const started = Date.now();
  let lastError = "";
  while (Date.now() - started < args.timeoutMs) {
    if (child.exitCode !== null) {
      throw new Error(`local monitoring service exited early; stdout=${tail(logs.stdout)} stderr=${tail(logs.stderr)}`);
    }
    try {
      const health = await requestJson(baseUrl, "/health", { timeoutMs: 1000 });
      if (health.statusCode === 200 && health.payload.status === "ok") {
        return {
          baseUrl,
          child,
          tempDir,
          dbPath,
          logs,
          metricsToken: localMetricsToken,
        };
      }
      lastError = `health ${health.statusCode}`;
    } catch (error) {
      lastError = error.message;
    }
    await sleep(150);
  }
  throw new Error(`local monitoring service did not become healthy: ${lastError}; stdout=${tail(logs.stdout)} stderr=${tail(logs.stderr)}`);
}

async function stopLocalService(local) {
  if (!local) return;
  if (local.child.exitCode === null) {
    local.child.kill("SIGTERM");
    const stopped = await Promise.race([
      new Promise((resolve) => local.child.once("exit", () => resolve(true))),
      sleep(2_000).then(() => false),
    ]);
    if (!stopped && local.child.exitCode === null) {
      local.child.kill("SIGKILL");
      await new Promise((resolve) => local.child.once("exit", resolve));
    }
  }
  fs.rmSync(local.tempDir, { recursive: true, force: true });
}

function metricHeaders(token, origin) {
  return {
    ...(origin ? { origin } : {}),
    ...(token ? { "x-search-book-metrics-token": token } : {}),
  };
}

async function runChecks(args) {
  let local = null;
  if (args.local) {
    local = await startLocalService(args);
    args.serviceUrl = local.baseUrl;
  }
  const checks = [];
  try {
    serviceUrlCheck(checks, args);
    const originHeaders = args.origin ? { origin: args.origin } : {};
    const health = await requestJson(args.serviceUrl, "/health", {
      headers: originHeaders,
      timeoutMs: args.timeoutMs,
    });
    addCheck(checks, {
      id: "health",
      label: "Health endpoint is reachable",
      passed: health.statusCode === 200 && health.payload.status === "ok" && health.payload.service === "search-book-answer-engine",
      detail: `statusCode=${health.statusCode}, status=${health.payload.status || "missing"}`,
      evidence: {
        defaultMode: health.payload.defaultMode || "missing",
        datastore: health.payload.datastore || "missing",
        answerChunks: health.payload.runtime?.answerChunks ?? null,
        questionRoutes: health.payload.runtime?.questionRoutes ?? null,
        openOperatorItems: health.payload.runtime?.openOperatorItems ?? null,
        metricsConfigured: health.payload.operations?.metrics?.configured === true,
        metricsEnabled: health.payload.operations?.metrics?.enabled === true,
      },
    });

    if (args.metricsRequired) {
      addCheck(checks, {
        id: "health-reports-metrics",
        label: "Health reports metrics export configured",
        passed: health.payload.operations?.metrics?.configured === true,
        detail: `configured=${health.payload.operations?.metrics?.configured === true}, enabled=${health.payload.operations?.metrics?.enabled === true}`,
      });
    }

    const fallbackToken = args.metricsTokenEnv === "SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN"
      ? process.env.SEARCH_BOOK_ANSWER_ENGINE_MODERATION_TOKEN || ""
      : "";
    const token = local?.metricsToken || process.env[args.metricsTokenEnv] || fallbackToken;
    const unauthenticated = await requestJson(args.serviceUrl, "/api/search-book/metrics", {
      headers: originHeaders,
      timeoutMs: args.timeoutMs,
    });
    addCheck(checks, {
      id: "metrics-unauthenticated",
      label: "Metrics endpoint rejects unauthenticated access",
      passed: unauthenticated.statusCode === 403 || (!args.metricsRequired && unauthenticated.statusCode === 404),
      severity: args.metricsRequired ? "error" : "warning",
      detail: `statusCode=${unauthenticated.statusCode}`,
    });

    if (!token) {
      addCheck(checks, {
        id: "metrics-token",
        label: "Metrics token is configured in env",
        passed: !args.metricsRequired,
        severity: args.metricsRequired ? "error" : "warning",
        detail: `${args.metricsTokenEnv} configured=false`,
      });
      return { checks, health: health.payload, metrics: null };
    }

    addCheck(checks, {
      id: "metrics-token",
      label: "Metrics token is configured in env",
      passed: true,
      detail: `${args.metricsTokenEnv} configured=true`,
    });

    const metrics = await requestJson(args.serviceUrl, "/api/search-book/metrics", {
      headers: metricHeaders(token, args.origin),
      timeoutMs: args.timeoutMs,
    });
    const metricsOk = metrics.statusCode === 200 && metrics.payload.status === "ok";
    addCheck(checks, {
      id: "metrics-authenticated",
      label: "Metrics endpoint accepts authenticated monitoring request",
      passed: metricsOk,
      severity: args.metricsRequired ? "error" : "warning",
      detail: `statusCode=${metrics.statusCode}, status=${metrics.payload.status || "missing"}`,
      evidence: metricsOk ? {
        answers: metrics.payload.counters?.answers?.total ?? null,
        ratings: metrics.payload.counters?.ratings?.total ?? null,
        questions: metrics.payload.datastore?.totals?.questions ?? null,
        uptimeSeconds: metrics.payload.uptimeSeconds ?? null,
        defaultMode: metrics.payload.runtime?.defaultMode || "missing",
      } : null,
    });
    addCheck(checks, {
      id: "metrics-privacy",
      label: "Metrics payload excludes raw user content and secrets",
      passed:
        metricsOk &&
        metrics.payload.policy?.privacy?.includesRawUserQuestions === false &&
        metrics.payload.policy?.privacy?.includesSecrets === false &&
        !JSON.stringify(metrics.payload).includes(token),
      severity: args.metricsRequired ? "error" : "warning",
      detail: `rawQuestions=${metrics.payload.policy?.privacy?.includesRawUserQuestions}, secrets=${metrics.payload.policy?.privacy?.includesSecrets}`,
    });
    return { checks, health: health.payload, metrics: metricsOk ? metrics.payload : null };
  } finally {
    await stopLocalService(local);
  }
}

function summarizeResult(args, checks, health, metrics) {
  const failed = checks.filter((check) => check.severity === "error" && !check.passed);
  const warnings = checks.filter((check) => check.severity === "warning" && !check.passed);
  return {
    status: failed.length ? "failed" : "passed",
    service: "search-book-monitoring-evidence",
    generatedAt: new Date().toISOString(),
    profile: args.profile,
    serviceUrl: args.serviceUrl,
    local: args.local,
    secrets: {
      valuesPrinted: false,
      metricsTokenConfigured: args.local || Boolean(process.env[args.metricsTokenEnv] || process.env.SEARCH_BOOK_ANSWER_ENGINE_MODERATION_TOKEN),
      metricsTokenEnv: args.metricsTokenEnv,
    },
    totals: {
      checks: checks.length,
      passed: checks.filter((check) => check.passed).length,
      failed: failed.length,
      warnings: warnings.length,
    },
    checks,
    summary: {
      health: {
        status: health?.status || "missing",
        defaultMode: health?.defaultMode || "missing",
        answerChunks: health?.runtime?.answerChunks ?? null,
        questionRoutes: health?.runtime?.questionRoutes ?? null,
        metricsConfigured: health?.operations?.metrics?.configured === true,
      },
      metrics: metrics ? {
        status: metrics.status,
        answers: metrics.counters?.answers?.total ?? null,
        ratings: metrics.counters?.ratings?.total ?? null,
        questions: metrics.datastore?.totals?.questions ?? null,
        privacy: metrics.policy?.privacy || null,
      } : null,
    },
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const { checks, health, metrics } = await runChecks(args);
  const result = summarizeResult(args, checks, health, metrics);
  const rendered = JSON.stringify(result, null, 2);
  if (result.status === "passed") {
    console.log(rendered);
  } else {
    console.error(rendered);
    process.exitCode = 1;
  }
}

try {
  await main();
} catch (error) {
  console.error(JSON.stringify({
    status: "failed",
    service: "search-book-monitoring-evidence",
    message: error.message,
    secrets: { valuesPrinted: false },
  }, null, 2));
  process.exitCode = 1;
}
