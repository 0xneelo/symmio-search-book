#!/usr/bin/env node

import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticScript = path.join(__dirname, "serve-static-preview.mjs");
const serviceScript = path.join(__dirname, "serve-answer-engine.mjs");
const host = "127.0.0.1";
const dbPath = path.join(os.tmpdir(), `search-book-preview-service-smoke-${process.pid}-${Date.now()}.sqlite`);

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

async function requestText(baseUrl, pathname, options = {}) {
  const response = await fetch(`${baseUrl}${pathname}`, options);
  return {
    statusCode: response.status,
    headers: response.headers,
    contentType: response.headers.get("content-type") || "",
    body: await response.text(),
  };
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
  return {
    statusCode: response.status,
    headers: response.headers,
    payload,
  };
}

async function waitForPreview(baseUrl, child, logs) {
  const started = Date.now();
  let lastError = "";
  while (Date.now() - started < 10_000) {
    if (child.exitCode !== null) {
      throw new Error(`preview server exited early; stdout=${tail(logs.stdout)} stderr=${tail(logs.stderr)}`);
    }
    try {
      const home = await requestText(baseUrl, "/");
      if (home.statusCode === 200 && home.body.includes("Vibe Docs Search Book Prototype")) return home;
      lastError = `preview status ${home.statusCode}`;
    } catch (error) {
      lastError = error.message;
    }
    await sleep(150);
  }
  throw new Error(`preview server did not become ready: ${lastError}; stdout=${tail(logs.stdout)} stderr=${tail(logs.stderr)}`);
}

async function waitForService(baseUrl, child, logs) {
  const started = Date.now();
  let lastError = "";
  while (Date.now() - started < 10_000) {
    if (child.exitCode !== null) {
      throw new Error(`answer-engine service exited early; stdout=${tail(logs.stdout)} stderr=${tail(logs.stderr)}`);
    }
    try {
      const health = await requestJson(baseUrl, "/health");
      if (health.statusCode === 200 && health.payload.status === "ok") return health.payload;
      lastError = `health status ${health.statusCode}`;
    } catch (error) {
      lastError = error.message;
    }
    await sleep(150);
  }
  throw new Error(`answer-engine service did not become healthy: ${lastError}; stdout=${tail(logs.stdout)} stderr=${tail(logs.stderr)}`);
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

function startProcess(script, args, env) {
  const logs = { stdout: "", stderr: "" };
  const child = spawn(process.execPath, [script, ...args], {
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      ...env,
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

async function main() {
  const [staticPort, servicePort] = await Promise.all([getFreePort(), getFreePort()]);
  assert(staticPort && servicePort && staticPort !== servicePort, "could not allocate distinct local smoke ports.");
  const staticBaseUrl = `http://${host}:${staticPort}`;
  const serviceBaseUrl = `http://${host}:${servicePort}`;

  const service = startProcess(serviceScript, [], {
    SEARCH_BOOK_ANSWER_ENGINE_HOST: host,
    SEARCH_BOOK_ANSWER_ENGINE_PORT: String(servicePort),
    SEARCH_BOOK_ANSWER_ENGINE_DB: dbPath,
    SEARCH_BOOK_ANSWER_ENGINE_DEFAULT_MODE: "extractive",
    SEARCH_BOOK_ANSWER_ENGINE_RATE_LIMIT_PER_MINUTE: "0",
    SEARCH_BOOK_ANSWER_ENGINE_MAX_RECENT_EVENTS: "10",
    SEARCH_BOOK_ANSWER_ENGINE_RETENTION_DAYS: "180",
    SEARCH_BOOK_ANSWER_ENGINE_ENABLE_MODERATION_EXPORT: "false",
  });
  const preview = startProcess(staticScript, ["--host", host, "--port", String(staticPort)], {});

  try {
    const health = await waitForService(serviceBaseUrl, service.child, service.logs);
    assert(health.service === "search-book-answer-engine", "health did not identify the answer-engine service.");
    assert(health.defaultMode === "extractive", "service did not run in extractive mode.");

    const homePath = `/?service=${encodeURIComponent(serviceBaseUrl)}&serviceMode=extractive`;
    const home = await waitForPreview(staticBaseUrl, preview.child, preview.logs);
    assert(home.contentType.includes("text/html"), "preview home did not return HTML.");
    const configuredHome = await requestText(staticBaseUrl, homePath);
    assert(configuredHome.statusCode === 200, `configured preview home returned ${configuredHome.statusCode}.`);
    assert(configuredHome.body.includes("Ask the docs"), "configured preview did not render the Ask the docs action.");
    assert(configuredHome.body.includes("Search insights"), "configured preview did not render Search insights navigation.");
    assert(configuredHome.body.includes("searchBookPrototype.serviceUrl"), "configured preview did not include service bridge state.");

    const preflight = await requestJson(serviceBaseUrl, "/api/search-book/answer", {
      method: "OPTIONS",
      headers: {
        origin: staticBaseUrl,
        "access-control-request-method": "POST",
        "access-control-request-headers": "content-type",
      },
    });
    assert(preflight.statusCode === 204, `CORS preflight returned ${preflight.statusCode}.`);
    assert(preflight.headers.get("access-control-allow-origin") === "*", "CORS preflight did not allow the preview origin.");
    assert((preflight.headers.get("access-control-allow-methods") || "").includes("POST"), "CORS preflight did not allow POST.");
    assert((preflight.headers.get("access-control-allow-methods") || "").includes("OPTIONS"), "CORS preflight did not allow OPTIONS.");
    assert((preflight.headers.get("access-control-allow-headers") || "").includes("content-type"), "CORS preflight did not allow content-type.");

    const answer = await requestJson(serviceBaseUrl, "/api/search-book/answer", {
      method: "POST",
      headers: { origin: staticBaseUrl },
      body: JSON.stringify({
        requestId: "preview-service-smoke-answer",
        query: "What is Vibe Trading?",
        source: "preview-service-smoke",
        mode: "extractive",
      }),
    });
    assert(answer.statusCode === 200, `answer endpoint returned ${answer.statusCode}.`);
    assert(answer.headers.get("access-control-allow-origin") === "*", "answer response did not include CORS allow-origin.");
    assert(answer.payload.status === "answered", `answer status was ${answer.payload.status}.`);
    assert(answer.payload.persisted?.id, "answer did not persist the question event.");
    assert(answer.payload.primaryPageId, "answer did not include a primary page id.");
    assert(Array.isArray(answer.payload.citations) && answer.payload.citations.length > 0, "answer did not include citations.");

    const rating = await requestJson(serviceBaseUrl, "/api/search-book/rating", {
      method: "POST",
      headers: { origin: staticBaseUrl },
      body: JSON.stringify({
        eventId: answer.payload.persisted.id,
        rating: "yes",
        note: "preview service smoke rating",
      }),
    });
    assert(rating.statusCode === 200, `rating endpoint returned ${rating.statusCode}.`);
    assert(rating.payload.status === "recorded", `rating status was ${rating.payload.status}.`);
    assert(rating.payload.persisted?.eventId === answer.payload.persisted.id, "rating did not attach to the persisted question.");

    const insights = await requestJson(serviceBaseUrl, "/api/search-book/insights", {
      headers: { origin: staticBaseUrl },
    });
    assert(insights.statusCode === 200, `insights endpoint returned ${insights.statusCode}.`);
    assert(insights.payload.status === "ok", `insights status was ${insights.payload.status}.`);
    assert((insights.payload.totals?.questions || 0) >= 1, "insights did not count the smoke question.");
    assert((insights.payload.totals?.ratings || 0) >= 1, "insights did not count the smoke rating.");
    assert((insights.payload.recent?.questions || []).some((item) => item.requestId === "preview-service-smoke-answer"), "insights did not expose the smoke question.");

    const exactPage = await requestText(staticBaseUrl, `/index.html?page=authored-vibe-product-overview&service=${encodeURIComponent(serviceBaseUrl)}&serviceMode=extractive`);
    assert(exactPage.statusCode === 200, `configured exact-page URL returned ${exactPage.statusCode}.`);
    assert(exactPage.body.includes("Vibe Docs Search Book Prototype"), "configured exact-page URL did not serve index.html.");

    console.log(JSON.stringify({
      status: "passed",
      service: "search-book-preview-service",
      previewBaseUrl: staticBaseUrl,
      answerEngineBaseUrl: serviceBaseUrl,
      checks: {
        staticHome: "ok",
        configuredHome: "ok",
        corsPreflight: "ok",
        answer: answer.payload.status,
        rating: rating.payload.status,
        insights: insights.payload.status,
        exactPageUrl: "ok",
      },
      totals: insights.payload.totals,
      answer: {
        primaryPageId: answer.payload.primaryPageId,
        citations: answer.payload.citations.length,
        persistedStatus: answer.payload.persisted.status,
      },
    }, null, 2));
  } catch (error) {
    console.error(JSON.stringify({
      status: "failed",
      message: error.message,
      previewStdout: tail(preview.logs.stdout),
      previewStderr: tail(preview.logs.stderr),
      serviceStdout: tail(service.logs.stdout),
      serviceStderr: tail(service.logs.stderr),
    }, null, 2));
    process.exitCode = 1;
  } finally {
    await Promise.all([stopChild(preview.child), stopChild(service.child)]);
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
