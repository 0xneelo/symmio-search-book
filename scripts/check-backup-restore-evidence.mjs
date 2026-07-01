#!/usr/bin/env node

import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const host = "127.0.0.1";
const serviceScript = path.join(__dirname, "serve-answer-engine.mjs");

const requiredTables = [
  "search_book_questions",
  "search_book_ratings",
  "search_book_gaps",
  "search_book_answer_cache",
];

const seedStrings = [
  "What is Vibe Trading?",
  "backup restore evidence low rating",
  "Page feedback: Vibe Product Overview",
  "backup restore evidence page feedback",
];

function usage() {
  return `Usage:
  node scripts/check-backup-restore-evidence.mjs [--keep-artifacts]

Creates a temporary SQLite answer-engine database, persists real answer/rating/page-feedback events,
runs scripts/backup-answer-engine-db.mjs with restore-check enabled, and prints count-only JSON evidence.
The command uses extractive answers only and does not load or print LLM credentials.`;
}

function parseArgs(argv) {
  const args = { keepArtifacts: false };
  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--keep-artifacts") {
      args.keepArtifacts = true;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}\n${usage()}`);
  }
  return args;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function tail(text, maxLength = 4000) {
  const value = String(text || "");
  return value.length > maxLength ? value.slice(value.length - maxLength) : value;
}

function redact(text) {
  return String(text || "")
    .replace(/sk-[A-Za-z0-9_-]{12,}/g, "sk-[redacted]")
    .replace(/Bearer\s+[A-Za-z0-9._-]{12,}/gi, "Bearer [redacted]");
}

function parseJsonFromOutput(output) {
  const raw = String(output || "").trim();
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    for (let index = raw.lastIndexOf("{"); index >= 0; index = raw.lastIndexOf("{", index - 1)) {
      try {
        return JSON.parse(raw.slice(index));
      } catch {
        // Keep scanning for the final JSON object.
      }
    }
  }
  return null;
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

async function requestJson(baseUrl, pathname, options = {}) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    ...options,
    headers: {
      ...(options.body ? { "content-type": "application/json" } : {}),
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let payload = {};
  try {
    payload = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`${pathname} returned non-JSON status ${response.status}.`);
  }
  return { statusCode: response.status, payload };
}

async function waitForHealth(baseUrl, child, logs) {
  const started = Date.now();
  let lastError = "";
  while (Date.now() - started < 10_000) {
    if (child.exitCode !== null) {
      throw new Error(`service exited before health check; stdout=${tail(logs.stdout)} stderr=${tail(logs.stderr)}`);
    }
    try {
      const health = await requestJson(baseUrl, "/health");
      if (health.statusCode === 200 && health.payload.status === "ok") return health.payload;
      lastError = `health ${health.statusCode}`;
    } catch (error) {
      lastError = error.message;
    }
    await sleep(150);
  }
  throw new Error(`service did not become healthy: ${lastError}; stdout=${tail(logs.stdout)} stderr=${tail(logs.stderr)}`);
}

function startService(port, dbPath) {
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
      SEARCH_BOOK_ANSWER_ENGINE_DB: dbPath,
      SEARCH_BOOK_ANSWER_ENGINE_DEFAULT_MODE: "extractive",
      SEARCH_BOOK_ANSWER_ENGINE_RATE_LIMIT_PER_MINUTE: "0",
      SEARCH_BOOK_ANSWER_ENGINE_MAX_RECENT_EVENTS: "10",
      SEARCH_BOOK_ANSWER_ENGINE_RETENTION_DAYS: "180",
      SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS: "*",
      SEARCH_BOOK_ANSWER_ENGINE_ENABLE_MODERATION_EXPORT: "false",
      SEARCH_BOOK_ANSWER_ENGINE_ENABLE_METRICS_EXPORT: "false",
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
  return { child, logs };
}

async function stopChild(child) {
  if (!child || child.exitCode !== null) return;
  child.kill("SIGTERM");
  const stopped = await Promise.race([
    new Promise((resolve) => child.once("exit", () => resolve(true))),
    sleep(2_000).then(() => false),
  ]);
  if (!stopped && child.exitCode === null) {
    child.kill("SIGKILL");
    await new Promise((resolve) => child.once("exit", resolve));
  }
}

async function seedPersistence(baseUrl) {
  const answer = await requestJson(baseUrl, "/api/search-book/answer", {
    method: "POST",
    body: JSON.stringify({
      requestId: "backup-restore-evidence-answer",
      query: seedStrings[0],
      source: "backup-restore-evidence",
      mode: "extractive",
    }),
  });
  assert(answer.statusCode === 200, `answer endpoint returned ${answer.statusCode}.`);
  assert(answer.payload.status === "answered", `answer status was ${answer.payload.status}.`);
  assert(answer.payload.persisted?.id, "answer did not include a persisted event id.");

  const rating = await requestJson(baseUrl, "/api/search-book/rating", {
    method: "POST",
    body: JSON.stringify({
      eventId: answer.payload.persisted.id,
      rating: "no",
      note: seedStrings[1],
    }),
  });
  assert(rating.statusCode === 200, `rating endpoint returned ${rating.statusCode}.`);
  assert(rating.payload.status === "recorded", `rating status was ${rating.payload.status}.`);

  const pageFeedback = await requestJson(baseUrl, "/api/search-book/page-feedback", {
    method: "POST",
    body: JSON.stringify({
      pageId: "authored-vibe-product-overview",
      rating: "no",
      query: seedStrings[2],
      note: seedStrings[3],
    }),
  });
  assert(pageFeedback.statusCode === 200, `page-feedback endpoint returned ${pageFeedback.statusCode}.`);
  assert(pageFeedback.payload.status === "recorded", `page-feedback status was ${pageFeedback.payload.status}.`);

  const insights = await requestJson(baseUrl, "/api/search-book/insights");
  assert(insights.statusCode === 200, `insights endpoint returned ${insights.statusCode}.`);
  assert(insights.payload.status === "ok", `insights status was ${insights.payload.status}.`);
  return {
    answerStatus: answer.payload.status,
    ratingStatus: rating.payload.status,
    pageFeedbackStatus: pageFeedback.payload.status,
    totals: {
      questions: insights.payload.totals?.questions ?? 0,
      ratings: insights.payload.totals?.ratings ?? 0,
      gaps: insights.payload.totals?.gaps ?? 0,
      answerCache: insights.payload.totals?.answerCache ?? 0,
    },
  };
}

function runBackup(dbPath, backupDir, latestManifest) {
  const result = spawnSync(process.execPath, ["scripts/backup-answer-engine-db.mjs"], {
    cwd: searchBookRoot,
    encoding: "utf8",
    env: {
      ...process.env,
      SEARCH_BOOK_ANSWER_ENGINE_DB: dbPath,
      SEARCH_BOOK_ANSWER_ENGINE_BACKUP_DIR: backupDir,
      SEARCH_BOOK_ANSWER_ENGINE_BACKUP_MANIFEST: latestManifest,
    },
    maxBuffer: 1024 * 1024 * 20,
  });
  return {
    exitCode: result.status,
    signal: result.signal,
    stdout: result.stdout || "",
    stderr: result.stderr || "",
    parsed: parseJsonFromOutput(result.stdout) || parseJsonFromOutput(result.stderr),
    error: result.error?.message || "",
  };
}

function validateBackup(backup, latestManifest, seeded) {
  assert(backup.exitCode === 0, `backup command failed with exit code ${backup.exitCode}.`);
  const manifest = backup.parsed;
  assert(manifest?.service === "search-book-answer-engine-backup", "backup manifest service mismatch.");
  assert(manifest.status === "passed", `backup manifest status was ${manifest.status}.`);
  assert(manifest.restoreCheck?.enabled === true, "restore check was not enabled.");
  assert(manifest.restoreCheck?.status === "passed", `restore check status was ${manifest.restoreCheck?.status}.`);
  assert(manifest.restoreCheck?.integrity === "ok", `restore integrity was ${manifest.restoreCheck?.integrity}.`);
  assert(Number(manifest.backupSizeBytes) > 0, "backup size was not positive.");
  assert(/^[a-f0-9]{64}$/i.test(String(manifest.backupSha256 || "")), "backup checksum was missing or invalid.");
  assert(fs.existsSync(latestManifest), "latest backup manifest was not written.");

  const latest = JSON.parse(fs.readFileSync(latestManifest, "utf8"));
  assert(latest.backupSha256 === manifest.backupSha256, "latest manifest did not match immutable manifest checksum.");

  const tableComparisons = manifest.restoreCheck.tables || {};
  for (const table of requiredTables) {
    assert(tableComparisons[table], `restore check did not include ${table}.`);
    assert(tableComparisons[table].matched === true, `${table} source/backup counts did not match.`);
  }
  const sourceTables = manifest.source?.tables || {};
  assert((sourceTables.search_book_questions || 0) >= 2, "seed did not persist enough questions.");
  assert((sourceTables.search_book_ratings || 0) >= 2, "seed did not persist enough ratings.");
  assert((sourceTables.search_book_gaps || 0) >= 2, "seed did not persist enough gaps.");
  assert((sourceTables.search_book_questions || 0) === seeded.totals.questions, "question totals changed before backup.");
  assert((sourceTables.search_book_ratings || 0) === seeded.totals.ratings, "rating totals changed before backup.");
  assert((sourceTables.search_book_gaps || 0) === seeded.totals.gaps, "gap totals changed before backup.");

  const rawEvidence = `${backup.stdout}\n${backup.stderr}\n${fs.readFileSync(latestManifest, "utf8")}`;
  const rawContentPrinted = seedStrings.some((value) => rawEvidence.includes(value));
  assert(!rawContentPrinted, "backup evidence printed seeded raw content.");

  const tablesMatched = requiredTables.filter((table) => tableComparisons[table]?.matched === true).length;
  return {
    manifestStatus: manifest.status,
    restoreCheckStatus: manifest.restoreCheck.status,
    integrity: manifest.restoreCheck.integrity,
    tablesChecked: requiredTables.length,
    tablesMatched,
    backupSizePositive: Number(manifest.backupSizeBytes) > 0,
    checksumPresent: /^[a-f0-9]{64}$/i.test(String(manifest.backupSha256 || "")),
    latestManifestWritten: true,
    seededEvents: {
      answerStatus: seeded.answerStatus,
      ratingStatus: seeded.ratingStatus,
      pageFeedbackStatus: seeded.pageFeedbackStatus,
    },
    seededCounts: {
      questions: sourceTables.search_book_questions || 0,
      ratings: sourceTables.search_book_ratings || 0,
      gaps: sourceTables.search_book_gaps || 0,
      answerCache: sourceTables.search_book_answer_cache || 0,
    },
    rawContentPrinted,
  };
}

function cleanupTemp(tempDir, keepArtifacts) {
  if (keepArtifacts) return;
  fs.rmSync(tempDir, { recursive: true, force: true });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "search-book-backup-restore-evidence-"));
  const backupDir = path.join(tempDir, "backups");
  const dbPath = path.join(tempDir, "search-book-answer-engine.sqlite");
  const latestManifest = path.join(backupDir, "latest.manifest.json");
  fs.mkdirSync(backupDir, { recursive: true });

  const port = await getFreePort();
  assert(port, "could not allocate a local port.");
  const baseUrl = `http://${host}:${port}`;
  const service = startService(port, dbPath);
  let stopped = false;

  try {
    const health = await waitForHealth(baseUrl, service.child, service.logs);
    assert(health.service === "search-book-answer-engine", "health did not identify the answer-engine service.");
    assert(health.defaultMode === "extractive", "health did not report extractive default mode.");
    assert(health.datastore === "sqlite", "health did not report SQLite datastore.");

    const seeded = await seedPersistence(baseUrl);
    await stopChild(service.child);
    stopped = true;

    const backup = runBackup(dbPath, backupDir, latestManifest);
    const evidence = validateBackup(backup, latestManifest, seeded);
    cleanupTemp(tempDir, args.keepArtifacts);

    console.log(JSON.stringify({
      status: "passed",
      service: "search-book-backup-restore-evidence",
      generatedAt: new Date().toISOString(),
      valuesPrinted: false,
      secrets: {
        valuesPrinted: false,
        llmCredentialsLoaded: false,
      },
      evidence,
      checks: [
        { id: "temporary-service-health", passed: true },
        { id: "sqlite-persistence-seeded", passed: true },
        { id: "backup-command-passed", passed: true },
        { id: "restore-check-passed", passed: true },
        { id: "required-tables-matched", passed: evidence.tablesMatched === evidence.tablesChecked },
        { id: "raw-content-not-printed", passed: evidence.rawContentPrinted === false },
      ],
    }, null, 2));
  } finally {
    if (!stopped) await stopChild(service.child);
    cleanupTemp(tempDir, args.keepArtifacts);
  }
}

try {
  await main();
} catch (error) {
  console.error(JSON.stringify({
    status: "failed",
    service: "search-book-backup-restore-evidence",
    message: redact(error.message),
    valuesPrinted: false,
    secrets: {
      valuesPrinted: false,
      llmCredentialsLoaded: false,
    },
  }, null, 2));
  process.exitCode = 1;
}
