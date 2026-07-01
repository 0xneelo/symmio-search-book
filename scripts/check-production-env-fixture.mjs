#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const preflightScript = path.join(searchBookRoot, "scripts", "check-production-env.mjs");
const sensitiveFixtureValues = [
  "fixture-openai-api-key-not-real",
  "fixture-metrics-token-not-real",
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function baseEnv() {
  const allowed = ["HOME", "LANG", "LC_ALL", "PATH", "TMPDIR", "TEMP", "TMP"];
  return Object.fromEntries(allowed.filter((key) => process.env[key]).map((key) => [key, process.env[key]]));
}

function runPreflight(env) {
  const result = spawnSync(process.execPath, [preflightScript, "--json"], {
    cwd: searchBookRoot,
    env,
    encoding: "utf8",
  });
  const output = `${result.stdout || ""}${result.stderr || ""}`;
  const parsed = JSON.parse((result.stdout || result.stderr || "").trim());
  return {
    exitStatus: result.status,
    stdoutBytes: Buffer.byteLength(result.stdout || ""),
    stderrBytes: Buffer.byteLength(result.stderr || ""),
    output,
    parsed,
  };
}

function checkById(result, id) {
  return (result.parsed.checks || []).find((check) => check.id === id);
}

function assertNoFixtureValuesPrinted(output) {
  for (const value of sensitiveFixtureValues) {
    assert(!output.includes(value), `production preflight printed fixture secret value: ${value}`);
  }
}

const noEnvRun = runPreflight(baseEnv());
assert(noEnvRun.exitStatus !== 0, "production preflight without env must fail closed");
assert(noEnvRun.parsed.status === "failed", "no-env preflight must report failed status");
assert(noEnvRun.parsed.secrets?.valuesPrinted === false, "no-env preflight must not print values");
assert(noEnvRun.parsed.secrets?.llmApiKeyConfigured === false, "no-env preflight must report missing LLM key as a boolean");
assert(checkById(noEnvRun, "known-quality-boundary")?.passed === true, "known quality boundary should pass in no-env preflight");
assert(checkById(noEnvRun, "known-quality-boundary")?.detail?.includes("failed=operator-inbox"), "known quality boundary must name operator-inbox as the only failed quality gate");
for (const id of [
  "db-path-configured",
  "default-mode",
  "allowed-origins",
  "llm-api-style",
  "llm-model",
  "llm-api-key",
  "external-context-policy",
  "metrics-enabled",
  "metrics-token-rule",
  "reviewer-owner",
  "reviewer-cadence",
  "backup-storage",
]) {
  assert(checkById(noEnvRun, id)?.passed === false, `no-env preflight should fail ${id}`);
}

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "search-book-production-env-fixture-"));
const dbDir = path.join(tempRoot, "db");
const backupDir = path.join(tempRoot, "backups");
fs.mkdirSync(dbDir, { recursive: true });
fs.mkdirSync(backupDir, { recursive: true });

const fixtureRun = runPreflight({
  ...baseEnv(),
  SEARCH_BOOK_ANSWER_ENGINE_DB: path.join(dbDir, "search-book-answer-engine.sqlite"),
  SEARCH_BOOK_ANSWER_ENGINE_HOST: "127.0.0.1",
  SEARCH_BOOK_ANSWER_ENGINE_PORT: "8787",
  SEARCH_BOOK_ANSWER_ENGINE_URL: "https://answers.example.com",
  SEARCH_BOOK_ANSWER_ENGINE_DEFAULT_MODE: "llm",
  SEARCH_BOOK_ANSWER_ENGINE_RETENTION_DAYS: "180",
  SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS: "https://docs.example.com",
  SEARCH_BOOK_ANSWER_ENGINE_RATE_LIMIT_PER_MINUTE: "60",
  SEARCH_BOOK_ANSWER_ENGINE_MAX_BODY_BYTES: "65536",
  SEARCH_BOOK_ANSWER_ENGINE_MAX_RECENT_EVENTS: "500",
  SEARCH_BOOK_ANSWER_ENGINE_ENABLE_MODERATION_EXPORT: "false",
  SEARCH_BOOK_ANSWER_ENGINE_MODERATION_LIMIT: "200",
  SEARCH_BOOK_ANSWER_ENGINE_ENABLE_METRICS_EXPORT: "true",
  SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN: sensitiveFixtureValues[1],
  SEARCH_BOOK_LLM_API_STYLE: "openai-compatible",
  SEARCH_BOOK_LLM_ENDPOINT: "https://api.openai.com/v1/chat/completions",
  SEARCH_BOOK_LLM_MODEL: "gpt-4.1-mini",
  SEARCH_BOOK_LLM_API_KEY: sensitiveFixtureValues[0],
  SEARCH_BOOK_LLM_ALLOW_EXTERNAL_CONTEXT: "true",
  SEARCH_BOOK_REVIEWER_OWNER: "Search Book reviewer rotation",
  SEARCH_BOOK_REVIEW_CADENCE: "daily",
  SEARCH_BOOK_ANSWER_ENGINE_BACKUP_DIR: backupDir,
});

assert(fixtureRun.exitStatus === 0, "production-shaped fixture preflight must pass");
assert(fixtureRun.parsed.status === "passed", "fixture preflight must report passed status");
assert(fixtureRun.parsed.secrets?.valuesPrinted === false, "fixture preflight must report valuesPrinted=false");
assert(fixtureRun.parsed.secrets?.llmApiKeyConfigured === true, "fixture preflight must report LLM key configured as a boolean");
assert(fixtureRun.parsed.totals?.failed === 0, "fixture preflight must have zero failed checks");
assert((fixtureRun.parsed.checks || []).every((check) => check.passed === true), "fixture preflight checks must all pass");
assert(checkById(fixtureRun, "known-quality-boundary")?.detail?.includes("failed=operator-inbox"), "fixture preflight must preserve the operator-inbox quality boundary");
assertNoFixtureValuesPrinted(fixtureRun.output);
fs.rmSync(tempRoot, { recursive: true, force: true });

const result = {
  status: "passed",
  service: "search-book-production-env-fixture",
  valuesPrinted: false,
  noEnv: {
    exitStatus: noEnvRun.exitStatus,
    status: noEnvRun.parsed.status,
    failedChecks: noEnvRun.parsed.totals?.failed || 0,
    knownQualityBoundary: checkById(noEnvRun, "known-quality-boundary")?.detail || "",
    llmApiKeyConfigured: noEnvRun.parsed.secrets?.llmApiKeyConfigured === true,
  },
  fixture: {
    exitStatus: fixtureRun.exitStatus,
    status: fixtureRun.parsed.status,
    checks: fixtureRun.parsed.totals?.checks || 0,
    failedChecks: fixtureRun.parsed.totals?.failed || 0,
    knownQualityBoundary: checkById(fixtureRun, "known-quality-boundary")?.detail || "",
    llmApiKeyConfigured: fixtureRun.parsed.secrets?.llmApiKeyConfigured === true,
  },
};

console.log(JSON.stringify(result, null, 2));
