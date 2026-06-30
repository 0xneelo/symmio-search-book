#!/usr/bin/env node

import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serviceScript = path.join(__dirname, "serve-answer-engine.mjs");
const summaryScript = path.join(__dirname, "summarize-living-docs-gaps.mjs");
const host = "127.0.0.1";
const moderationToken = "search-book-smoke-token";
const dbPath = path.join(os.tmpdir(), `search-book-answer-engine-smoke-${process.pid}-${Date.now()}.sqlite`);

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
    throw new Error(`${pathname} returned non-JSON body: ${text.slice(0, 200)}`);
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

async function stopChild(child) {
  if (child.exitCode !== null) return;
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

function cleanupDb() {
  for (const suffix of ["", "-shm", "-wal"]) {
    fs.rmSync(`${dbPath}${suffix}`, { force: true });
  }
}

async function main() {
  const port = await getFreePort();
  assert(port, "could not allocate a local port for service smoke test.");
  const baseUrl = `http://${host}:${port}`;
  const logs = { stdout: "", stderr: "" };
  const child = spawn(process.execPath, [serviceScript], {
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      SEARCH_BOOK_ANSWER_ENGINE_HOST: host,
      SEARCH_BOOK_ANSWER_ENGINE_PORT: String(port),
      SEARCH_BOOK_ANSWER_ENGINE_DB: dbPath,
      SEARCH_BOOK_ANSWER_ENGINE_DEFAULT_MODE: "extractive",
      SEARCH_BOOK_ANSWER_ENGINE_RATE_LIMIT_PER_MINUTE: "0",
      SEARCH_BOOK_ANSWER_ENGINE_MAX_RECENT_EVENTS: "10",
      SEARCH_BOOK_ANSWER_ENGINE_RETENTION_DAYS: "180",
      SEARCH_BOOK_ANSWER_ENGINE_ENABLE_MODERATION_EXPORT: "true",
      SEARCH_BOOK_ANSWER_ENGINE_MODERATION_TOKEN: moderationToken,
      SEARCH_BOOK_ANSWER_ENGINE_MODERATION_LIMIT: "10",
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

  try {
    const health = await waitForHealth(baseUrl, child, logs);
    assert(health.service === "search-book-answer-engine", "health did not identify the answer-engine service.");
    assert(health.defaultMode === "extractive", "health did not report extractive default mode.");
    assert(health.operations?.moderation?.configured === true, "moderation export was not configured in smoke service.");

    const answer = await requestJson(baseUrl, "/api/search-book/answer", {
      method: "POST",
      body: JSON.stringify({
        requestId: "smoke-answer-vibe-trading",
        query: "What is Vibe Trading?",
        source: "service-smoke",
        mode: "extractive",
      }),
    });
    assert(answer.statusCode === 200, `answer endpoint returned ${answer.statusCode}.`);
    assert(answer.payload.status === "answered", `answer status was ${answer.payload.status}.`);
    assert(answer.payload.persisted?.id, "answer did not include persisted question id.");
    assert(Array.isArray(answer.payload.citations) && answer.payload.citations.length > 0, "answer did not include citations.");
    const eventId = answer.payload.persisted.id;

    const rating = await requestJson(baseUrl, "/api/search-book/rating", {
      method: "POST",
      body: JSON.stringify({
        eventId,
        rating: "no",
        note: "smoke test low-rating event",
      }),
    });
    assert(rating.statusCode === 200, `rating endpoint returned ${rating.statusCode}.`);
    assert(rating.payload.status === "recorded", `rating status was ${rating.payload.status}.`);
    assert(rating.payload.persisted?.eventId === eventId, "rating did not attach to the persisted question.");

    const insights = await requestJson(baseUrl, "/api/search-book/insights");
    assert(insights.statusCode === 200, `insights endpoint returned ${insights.statusCode}.`);
    assert(insights.payload.status === "ok", `insights status was ${insights.payload.status}.`);
    assert((insights.payload.totals?.questions || 0) >= 1, "insights did not count the smoke question.");
    assert((insights.payload.totals?.ratings || 0) >= 1, "insights did not count the smoke rating.");
    assert((insights.payload.totals?.gaps || 0) >= 1, "insights did not create a low-rated-answer gap.");
    assert(insights.payload.retention?.enabled === true, "insights did not report enabled retention.");

    const forbiddenModeration = await requestJson(baseUrl, "/api/search-book/moderation");
    assert(forbiddenModeration.statusCode === 403, "moderation endpoint allowed unauthenticated access.");

    const moderation = await requestJson(baseUrl, "/api/search-book/moderation", {
      headers: { "x-search-book-moderation-token": moderationToken },
    });
    assert(moderation.statusCode === 200, `moderation endpoint returned ${moderation.statusCode}.`);
    assert(moderation.payload.status === "ok", `moderation status was ${moderation.payload.status}.`);
    assert((moderation.payload.queue?.lowRatedAnswers || []).length >= 1, "moderation queue did not expose low-rated answer.");
    assert((moderation.payload.queue?.gapBacklog || []).length >= 1, "moderation queue did not expose gap backlog.");

    const summaryResult = spawnSync(process.execPath, [summaryScript, "--db", dbPath, "--format", "json", "--limit", "10"], {
      encoding: "utf8",
      env: process.env,
    });
    assert(summaryResult.status === 0, `living-docs summary failed: stdout=${tail(summaryResult.stdout)} stderr=${tail(summaryResult.stderr)}`);
    let summary;
    try {
      summary = JSON.parse(summaryResult.stdout);
    } catch {
      throw new Error(`living-docs summary returned non-JSON body: ${tail(summaryResult.stdout)}`);
    }
    assert(summary.status === "ok", `living-docs summary status was ${summary.status}.`);
    assert(summary.service === "search-book-living-docs-summary", "living-docs summary did not identify the expected service.");
    assert(summary.privacy?.includesRawUserQuestions === true, "living-docs summary did not flag raw-question privacy.");
    assert((summary.queues?.gapBacklog || []).length >= 1, "living-docs summary did not include gap backlog.");
    assert((summary.queues?.lowRatedAnswers || []).length >= 1, "living-docs summary did not include low-rated answers.");
    assert((summary.recommendations || []).length >= 1, "living-docs summary did not include reviewer recommendations.");

    console.log(JSON.stringify({
      status: "passed",
      service: "search-book-answer-engine",
      mode: "extractive",
      endpoints: {
        health: "ok",
        answer: answer.payload.status,
        rating: rating.payload.status,
        insights: insights.payload.status,
        moderationUnauthenticated: forbiddenModeration.statusCode,
        moderationAuthenticated: moderation.payload.status,
      },
      totals: insights.payload.totals,
      answer: {
        primaryPageId: answer.payload.primaryPageId,
        citations: answer.payload.citations.length,
        persistedStatus: answer.payload.persisted.status,
      },
      retention: insights.payload.retention,
      moderation: {
        enabled: moderation.payload.policy?.moderation?.enabled === true,
        gapBacklog: moderation.payload.queue.gapBacklog.length,
        lowRatedAnswers: moderation.payload.queue.lowRatedAnswers.length,
      },
      livingDocsSummary: {
        status: summary.status,
        gapBacklog: summary.queues.gapBacklog.length,
        lowRatedAnswers: summary.queues.lowRatedAnswers.length,
        recommendations: summary.recommendations.length,
      },
    }, null, 2));
  } catch (error) {
    console.error(JSON.stringify({
      status: "failed",
      message: error.message,
      serviceStdout: tail(logs.stdout),
      serviceStderr: tail(logs.stderr),
    }, null, 2));
    process.exitCode = 1;
  } finally {
    await stopChild(child);
    cleanupDb();
  }
}

try {
  await main();
} catch (error) {
  cleanupDb();
  console.error(JSON.stringify({
    status: "failed",
    message: error.message,
  }, null, 2));
  process.exitCode = 1;
}
