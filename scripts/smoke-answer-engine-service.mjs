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
const allowedOrigin = "https://docs.example.test";
const blockedOrigin = "https://blocked.example.test";
const moderationToken = "search-book-smoke-token";
const metricsToken = "search-book-metrics-smoke-token";
const dbPath = path.join(os.tmpdir(), `search-book-answer-engine-smoke-${process.pid}-${Date.now()}.sqlite`);
const emptyLlmEnv = {
  SEARCH_BOOK_LLM_API_STYLE: "",
  SEARCH_BOOK_LLM_ENDPOINT: "",
  SEARCH_BOOK_LLM_MODEL: "",
  SEARCH_BOOK_LLM_API_KEY: "",
  SEARCH_BOOK_LLM_ALLOW_EXTERNAL_CONTEXT: "",
};

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

async function startService(extraEnv, logs) {
  const port = await getFreePort();
  assert(port, "could not allocate a local port for service smoke test.");
  const baseUrl = `http://${host}:${port}`;
  const child = spawn(process.execPath, [serviceScript], {
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      ...emptyLlmEnv,
      SEARCH_BOOK_ANSWER_ENGINE_HOST: host,
      SEARCH_BOOK_ANSWER_ENGINE_PORT: String(port),
      ...extraEnv,
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
  await waitForHealth(baseUrl, child, logs);
  return { child, baseUrl };
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
  return { statusCode: response.status, payload, headers: response.headers };
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
      ...emptyLlmEnv,
      SEARCH_BOOK_ANSWER_ENGINE_HOST: host,
      SEARCH_BOOK_ANSWER_ENGINE_PORT: String(port),
      SEARCH_BOOK_ANSWER_ENGINE_DB: dbPath,
      SEARCH_BOOK_ANSWER_ENGINE_DEFAULT_MODE: "extractive",
      SEARCH_BOOK_ANSWER_ENGINE_RATE_LIMIT_PER_MINUTE: "0",
      SEARCH_BOOK_ANSWER_ENGINE_MAX_RECENT_EVENTS: "10",
      SEARCH_BOOK_ANSWER_ENGINE_RETENTION_DAYS: "180",
      SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS: allowedOrigin,
      SEARCH_BOOK_ANSWER_ENGINE_ENABLE_MODERATION_EXPORT: "true",
      SEARCH_BOOK_ANSWER_ENGINE_MODERATION_TOKEN: moderationToken,
      SEARCH_BOOK_ANSWER_ENGINE_MODERATION_LIMIT: "10",
      SEARCH_BOOK_ANSWER_ENGINE_ENABLE_METRICS_EXPORT: "true",
      SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN: metricsToken,
      SEARCH_BOOK_EMBED_ENDPOINT: "http://127.0.0.1:1/test-embeddings",
      SEARCH_BOOK_EMBED_MODEL: "smoke-embedding",
      SEARCH_BOOK_LLM_API_KEY: "smoke-key",
      SEARCH_BOOK_TEST_EMBEDDINGS: "true",
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
    assert(health.operations?.metrics?.configured === true, "metrics export was not configured in smoke service.");
    assert(
      (health.operations?.cors?.allowedOrigins || []).includes(allowedOrigin),
      "health did not report configured CORS allowed origin.",
    );

    const corsHealth = await requestJson(baseUrl, "/health", {
      headers: { origin: allowedOrigin },
    });
    assert(corsHealth.statusCode === 200, `allowed-origin health returned ${corsHealth.statusCode}.`);
    assert(
      corsHealth.headers.get("access-control-allow-origin") === allowedOrigin,
      `allowed-origin CORS header was ${corsHealth.headers.get("access-control-allow-origin")}.`,
    );

    const preflight = await requestJson(baseUrl, "/api/search-book/answer", {
      method: "OPTIONS",
      headers: {
        origin: allowedOrigin,
        "access-control-request-method": "POST",
      },
    });
    assert(preflight.statusCode === 204, `allowed-origin preflight returned ${preflight.statusCode}.`);
    assert(
      preflight.headers.get("access-control-allow-origin") === allowedOrigin,
      "allowed-origin preflight did not echo the configured origin.",
    );

    const blocked = await requestJson(baseUrl, "/health", {
      headers: { origin: blockedOrigin },
    });
    assert(blocked.statusCode === 403, `blocked-origin health returned ${blocked.statusCode}.`);
    assert(blocked.payload.status === "forbidden-origin", `blocked-origin status was ${blocked.payload.status}.`);
    assert(
      !blocked.headers.get("access-control-allow-origin"),
      "blocked-origin response must not expose an allow-origin header.",
    );

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

    const reuseSeedQuery = "How is my revenue calculated?";
    const reuseSeed = await requestJson(baseUrl, "/api/search-book/answer", {
      method: "POST",
      body: JSON.stringify({
        requestId: "smoke-reuse-seed",
        query: reuseSeedQuery,
        source: "service-smoke",
        mode: "extractive",
      }),
    });
    assert(reuseSeed.statusCode === 200, `reuse seed answer returned ${reuseSeed.statusCode}.`);
    assert(reuseSeed.payload.status === "answered", `reuse seed status was ${reuseSeed.payload.status}.`);
    assert(reuseSeed.payload.persisted?.id, "reuse seed did not include persisted question id.");

    const helpfulRating = await requestJson(baseUrl, "/api/search-book/rating", {
      method: "POST",
      body: JSON.stringify({
        eventId: reuseSeed.payload.persisted.id,
        rating: "yes",
        note: "smoke test helpful reuse seed",
      }),
    });
    assert(helpfulRating.statusCode === 200, `helpful rating endpoint returned ${helpfulRating.statusCode}.`);
    assert(helpfulRating.payload.status === "recorded", `helpful rating status was ${helpfulRating.payload.status}.`);
    assert(
      helpfulRating.payload.cache?.status === "cached",
      `positive rating did not populate cache: ${JSON.stringify(helpfulRating.payload.cache)}.`,
    );

    const reused = await requestJson(baseUrl, "/api/search-book/answer", {
      method: "POST",
      body: JSON.stringify({
        requestId: "smoke-reuse-paraphrase",
        query: "Can you explain how my fees and revenue are calculated?",
        source: "service-smoke",
        mode: "llm",
      }),
    });
    assert(reused.statusCode === 200, `reuse answer returned ${reused.statusCode}.`);
    assert(reused.payload.status === "answered", `reuse status was ${reused.payload.status}.`);
    assert(reused.payload.source === "reuse-cache", `reuse source was ${reused.payload.source}.`);
    assert(!reused.payload.degraded, "reuse answer must not be tagged degraded.");
    assert(reused.payload.reusedFrom?.score >= 0.9, `reuse score was ${JSON.stringify(reused.payload.reusedFrom)}.`);

    const insights = await requestJson(baseUrl, "/api/search-book/insights");
    assert(insights.statusCode === 200, `insights endpoint returned ${insights.statusCode}.`);
    assert(insights.payload.status === "ok", `insights status was ${insights.payload.status}.`);
    assert((insights.payload.totals?.questions || 0) >= 3, "insights did not count the smoke questions.");
    assert((insights.payload.totals?.ratings || 0) >= 2, "insights did not count the smoke ratings.");
    assert((insights.payload.totals?.gaps || 0) >= 1, "insights did not create a low-rated-answer gap.");
    assert((insights.payload.totals?.answerCache || 0) >= 1, "insights did not count the reuse answer cache.");
    assert(insights.payload.retention?.enabled === true, "insights did not report enabled retention.");

    const examples = await requestJson(baseUrl, "/api/search-book/examples");
    assert(examples.statusCode === 200, `examples endpoint returned ${examples.statusCode}.`);
    assert(examples.payload.status === "ok", `examples status was ${examples.payload.status}.`);
    assert(
      (examples.payload.examples || []).some((item) => item.query === reuseSeedQuery),
      "examples did not include the helpful-rated question.",
    );

    const forbiddenModeration = await requestJson(baseUrl, "/api/search-book/moderation");
    assert(forbiddenModeration.statusCode === 403, "moderation endpoint allowed unauthenticated access.");

    const moderation = await requestJson(baseUrl, "/api/search-book/moderation", {
      headers: { "x-search-book-moderation-token": moderationToken },
    });
    assert(moderation.statusCode === 200, `moderation endpoint returned ${moderation.statusCode}.`);
    assert(moderation.payload.status === "ok", `moderation status was ${moderation.payload.status}.`);
    assert((moderation.payload.queue?.lowRatedAnswers || []).length >= 1, "moderation queue did not expose low-rated answer.");
    assert((moderation.payload.queue?.gapBacklog || []).length >= 1, "moderation queue did not expose gap backlog.");

    const forbiddenMetrics = await requestJson(baseUrl, "/api/search-book/metrics");
    assert(forbiddenMetrics.statusCode === 403, "metrics endpoint allowed unauthenticated access.");

    const metricsExport = await requestJson(baseUrl, "/api/search-book/metrics", {
      headers: { "x-search-book-metrics-token": metricsToken },
    });
    assert(metricsExport.statusCode === 200, `metrics endpoint returned ${metricsExport.statusCode}.`);
    assert(metricsExport.payload.status === "ok", `metrics status was ${metricsExport.payload.status}.`);
    assert(metricsExport.payload.policy?.privacy?.includesRawUserQuestions === false, "metrics export must not include raw user questions.");
    assert(metricsExport.payload.policy?.privacy?.includesSecrets === false, "metrics export must not include secrets.");
    assert((metricsExport.payload.counters?.answers?.total || 0) >= 3, "metrics export did not count answer requests.");
    assert((metricsExport.payload.counters?.ratings?.total || 0) >= 2, "metrics export did not count ratings.");
    assert((metricsExport.payload.datastore?.totals?.questions || 0) >= 3, "metrics export did not include datastore totals.");
    const renderedMetrics = JSON.stringify(metricsExport.payload);
    assert(!renderedMetrics.includes("What is Vibe Trading?"), "metrics export leaked raw question text.");
    assert(!renderedMetrics.includes(reuseSeedQuery), "metrics export leaked raw cached-question text.");

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

    const degraded = await requestJson(baseUrl, "/api/search-book/answer", {
      method: "POST",
      body: JSON.stringify({
        requestId: "smoke-degrade-llm-unavailable",
        query: "What is Vibe Trading?",
        source: "service-smoke",
        mode: "llm",
      }),
    });
    assert(degraded.statusCode === 200, `degrade answer returned ${degraded.statusCode}.`);
    assert(degraded.payload.status === "answered", `degrade status was ${degraded.payload.status}, expected answered.`);
    assert(
      degraded.payload.degraded?.reason === "llm-unavailable",
      `degrade reason was ${JSON.stringify(degraded.payload.degraded)}, expected llm-unavailable.`,
    );
    assert(Array.isArray(degraded.payload.citations) && degraded.payload.citations.length > 0, "degraded answer did not include citations.");

    const guardrail = await requestJson(baseUrl, "/api/search-book/answer", {
      method: "POST",
      body: JSON.stringify({
        requestId: "smoke-guardrail-lafa",
        query: "who is lafachief",
        source: "service-smoke",
        mode: "llm",
      }),
    });
    assert(guardrail.statusCode === 200, `guardrail answer returned ${guardrail.statusCode}.`);
    assert(
      guardrail.payload.status === "operator-blocked-refusal",
      `guardrail status was ${guardrail.payload.status}, expected operator-blocked-refusal.`,
    );
    assert(guardrail.payload.refusalReason === "source-family-missing", `guardrail refusalReason was ${guardrail.payload.refusalReason}.`);
    assert(!guardrail.payload.degraded, "guardrail refusal must not be tagged degraded.");
    assert(guardrail.payload.source !== "reuse-cache", "guardrail refusal must not be served from reuse cache.");

    const rlLogs = { stdout: "", stderr: "" };
    const rlDbPath = `${dbPath}.ratelimit`;
    const rl = await startService({
      SEARCH_BOOK_ANSWER_ENGINE_DB: rlDbPath,
      SEARCH_BOOK_ANSWER_ENGINE_RATE_LIMIT_PER_MINUTE: "1",
    }, rlLogs);
    let rateLimitedLlmReason = "";
    let rateLimitedExtractiveStatusCode = 0;
    try {
      const first = await requestJson(rl.baseUrl, "/api/search-book/answer", {
        method: "POST",
        body: JSON.stringify({
          requestId: "smoke-rl-1",
          query: "What is Vibe Trading?",
          source: "service-smoke",
          mode: "llm",
        }),
      });
      assert(first.statusCode === 200, `rate-limit first request returned ${first.statusCode}.`);
      const second = await requestJson(rl.baseUrl, "/api/search-book/answer", {
        method: "POST",
        body: JSON.stringify({
          requestId: "smoke-rl-2",
          query: "How is my revenue calculated?",
          source: "service-smoke",
          mode: "llm",
        }),
      });
      assert(second.statusCode === 200, `rate-limit second request returned ${second.statusCode}, expected 200 (degraded, not 429).`);
      assert(
        second.payload.degraded?.reason === "rate-limited",
        `second request degraded reason was ${JSON.stringify(second.payload.degraded)}, expected rate-limited.`,
      );
      rateLimitedLlmReason = second.payload.degraded.reason;
      const extractiveLimited = await requestJson(rl.baseUrl, "/api/search-book/answer", {
        method: "POST",
        body: JSON.stringify({
          requestId: "smoke-rl-extractive",
          query: "What is Vibe Trading?",
          source: "service-smoke",
          mode: "extractive",
        }),
      });
      assert(extractiveLimited.statusCode === 429, `rate-limited extractive request returned ${extractiveLimited.statusCode}, expected 429.`);
      assert(extractiveLimited.payload.status === "rate-limited", `rate-limited extractive status was ${extractiveLimited.payload.status}.`);
      rateLimitedExtractiveStatusCode = extractiveLimited.statusCode;
    } finally {
      await stopChild(rl.child);
      for (const suffix of ["", "-shm", "-wal"]) fs.rmSync(`${rlDbPath}${suffix}`, { force: true });
    }

    const metricsDisabledLogs = { stdout: "", stderr: "" };
    const metricsDisabledDbPath = `${dbPath}.metrics-disabled`;
    const metricsDisabled = await startService({
      SEARCH_BOOK_ANSWER_ENGINE_DB: metricsDisabledDbPath,
      SEARCH_BOOK_ANSWER_ENGINE_RATE_LIMIT_PER_MINUTE: "0",
    }, metricsDisabledLogs);
    let metricsDisabledStatusCode = 0;
    try {
      const disabledMetrics = await requestJson(metricsDisabled.baseUrl, "/api/search-book/metrics", {
        headers: { "x-search-book-metrics-token": metricsToken },
      });
      assert(disabledMetrics.statusCode === 404, `disabled metrics endpoint returned ${disabledMetrics.statusCode}, expected 404.`);
      metricsDisabledStatusCode = disabledMetrics.statusCode;
    } finally {
      await stopChild(metricsDisabled.child);
      for (const suffix of ["", "-shm", "-wal"]) fs.rmSync(`${metricsDisabledDbPath}${suffix}`, { force: true });
    }

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
        metricsUnauthenticated: forbiddenMetrics.statusCode,
        metricsAuthenticated: metricsExport.payload.status,
      },
      cors: {
        allowedOrigin,
        blockedOriginStatus: blocked.statusCode,
        preflight: preflight.statusCode,
      },
      reuseCache: {
        ratingCacheStatus: helpfulRating.payload.cache?.status,
        reusedSource: reused.payload.source,
        reusedScore: reused.payload.reusedFrom?.score,
        examples: examples.payload.examples.length,
      },
      totals: insights.payload.totals,
      answer: {
        primaryPageId: answer.payload.primaryPageId,
        citations: answer.payload.citations.length,
        persistedStatus: answer.payload.persisted.status,
      },
      limitedMode: {
        llmUnavailable: degraded.payload.degraded.reason,
        guardrailStatus: guardrail.payload.status,
        guardrailRefusalReason: guardrail.payload.refusalReason,
        rateLimitedLlm: rateLimitedLlmReason,
        rateLimitedExtractiveStatusCode,
      },
      retention: insights.payload.retention,
      moderation: {
        enabled: moderation.payload.policy?.moderation?.enabled === true,
        gapBacklog: moderation.payload.queue.gapBacklog.length,
        lowRatedAnswers: moderation.payload.queue.lowRatedAnswers.length,
      },
      metrics: {
        enabled: metricsExport.payload.policy?.metrics?.enabled === true,
        answers: metricsExport.payload.counters.answers.total,
        ratings: metricsExport.payload.counters.ratings.total,
        disabledStatusCode: metricsDisabledStatusCode,
        rawUserContent: metricsExport.payload.policy.privacy.includesRawUserQuestions,
        secrets: metricsExport.payload.policy.privacy.includesSecrets,
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
