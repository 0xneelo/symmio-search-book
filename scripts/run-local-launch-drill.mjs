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

const defaults = {
  runVerify: true,
  writeSmoke: true,
  keepArtifacts: true,
};

function usage() {
  return `Usage:
  node scripts/run-local-launch-drill.mjs [--no-run-verify] [--no-write-smoke] [--cleanup]

Runs a local staging drill:
  1. start static preview and answer-engine service on free localhost ports
  2. run URL deployment smoke once to seed answer/rating persistence
  3. create a restore-checked SQLite backup manifest
  4. run check-launch-readiness in staging mode
  5. stop temporary services

The command uses extractive answers only and does not load or print LLM credentials.`;
}

function parseArgs(argv) {
  const args = { ...defaults };
  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    } else if (arg === "--no-run-verify") {
      args.runVerify = false;
    } else if (arg === "--no-write-smoke") {
      args.writeSmoke = false;
    } else if (arg === "--cleanup") {
      args.keepArtifacts = false;
    } else {
      throw new Error(`Unknown argument: ${arg}\n${usage()}`);
    }
  }
  return args;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function tail(text, maxLength = 5000) {
  const value = String(text || "");
  return value.length > maxLength ? value.slice(value.length - maxLength) : value;
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

function commandResult(commandArgs, env = {}) {
  const result = spawnSync(process.execPath, commandArgs, {
    cwd: searchBookRoot,
    encoding: "utf8",
    env: {
      ...process.env,
      ...env,
    },
    maxBuffer: 1024 * 1024 * 30,
  });
  const parsed = parseJsonFromOutput(result.stdout) || parseJsonFromOutput(result.stderr);
  return {
    exitCode: result.status,
    signal: result.signal,
    passed: result.status === 0,
    stdout: tail(result.stdout),
    stderr: tail(result.stderr),
    parsed,
    error: result.error?.message || "",
  };
}

async function requestText(baseUrl, pathname) {
  const response = await fetch(`${baseUrl}${pathname}`);
  return {
    statusCode: response.status,
    contentType: response.headers.get("content-type") || "",
    body: await response.text(),
  };
}

async function requestJson(baseUrl, pathname) {
  const response = await fetch(`${baseUrl}${pathname}`);
  const text = await response.text();
  let payload = {};
  try {
    payload = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`${pathname} returned non-JSON body: ${text.slice(0, 200)}`);
  }
  return {
    statusCode: response.status,
    payload,
  };
}

function startProcess(script, args, env) {
  const logs = { stdout: "", stderr: "" };
  const child = spawn(process.execPath, [script, ...args], {
    cwd: searchBookRoot,
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

async function waitForService(baseUrl, child, logs) {
  const started = Date.now();
  let lastError = "";
  while (Date.now() - started < 12_000) {
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

async function waitForPreview(baseUrl, child, logs) {
  const started = Date.now();
  let lastError = "";
  while (Date.now() - started < 12_000) {
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

function cleanupArtifacts(tempDir, keepArtifacts) {
  if (keepArtifacts) return;
  fs.rmSync(tempDir, { recursive: true, force: true });
}

function commandEvidence(result) {
  return result.parsed || {
    exitCode: result.exitCode,
    signal: result.signal,
    error: result.error,
    stdoutTail: tail(result.stdout, 1200),
    stderrTail: tail(result.stderr, 1200),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "search-book-local-launch-drill-"));
  const backupDir = path.join(tempDir, "backups");
  const dbPath = path.join(tempDir, "search-book-answer-engine.sqlite");
  const backupManifest = path.join(backupDir, "latest.manifest.json");
  fs.mkdirSync(backupDir, { recursive: true });

  const [staticPort, servicePort] = await Promise.all([getFreePort(), getFreePort()]);
  assert(staticPort && servicePort && staticPort !== servicePort, "could not allocate distinct local drill ports.");

  const staticBaseUrl = `http://${host}:${staticPort}`;
  const serviceBaseUrl = `http://${host}:${servicePort}`;
  const staticScript = path.join(__dirname, "serve-static-preview.mjs");
  const serviceScript = path.join(__dirname, "serve-answer-engine.mjs");

  const drillEnv = {
    SEARCH_BOOK_REVIEWER_OWNER: "local-launch-drill",
    SEARCH_BOOK_REVIEW_CADENCE: "daily",
    SEARCH_BOOK_ANSWER_ENGINE_BACKUP_DIR: backupDir,
    SEARCH_BOOK_ANSWER_ENGINE_BACKUP_MANIFEST: backupManifest,
    SEARCH_BOOK_BACKUP_MAX_AGE_HOURS: "24",
  };

  const service = startProcess(serviceScript, [], {
    ...drillEnv,
    SEARCH_BOOK_ANSWER_ENGINE_HOST: host,
    SEARCH_BOOK_ANSWER_ENGINE_PORT: String(servicePort),
    SEARCH_BOOK_ANSWER_ENGINE_URL: serviceBaseUrl,
    SEARCH_BOOK_ANSWER_ENGINE_DB: dbPath,
    SEARCH_BOOK_ANSWER_ENGINE_DEFAULT_MODE: "extractive",
    SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS: staticBaseUrl,
    SEARCH_BOOK_ANSWER_ENGINE_RATE_LIMIT_PER_MINUTE: "0",
    SEARCH_BOOK_ANSWER_ENGINE_MAX_RECENT_EVENTS: "20",
    SEARCH_BOOK_ANSWER_ENGINE_RETENTION_DAYS: "180",
    SEARCH_BOOK_ANSWER_ENGINE_ENABLE_MODERATION_EXPORT: "false",
    SEARCH_BOOK_ANSWER_ENGINE_ENABLE_METRICS_EXPORT: "false",
  });
  const preview = startProcess(staticScript, ["--host", host, "--port", String(staticPort)], {});

  try {
    const health = await waitForService(serviceBaseUrl, service.child, service.logs);
    await waitForPreview(staticBaseUrl, preview.child, preview.logs);

    const seedSmoke = commandResult([
      "scripts/smoke-deployment.mjs",
      "--site-url",
      staticBaseUrl,
      "--service-url",
      serviceBaseUrl,
      "--mode",
      "extractive",
      "--write",
    ]);
    assert(seedSmoke.passed, `deployment seed smoke failed: ${seedSmoke.stderr || seedSmoke.stdout}`);

    const backup = commandResult(["scripts/backup-answer-engine-db.mjs"], {
      ...drillEnv,
      SEARCH_BOOK_ANSWER_ENGINE_DB: dbPath,
    });
    assert(backup.passed, `backup failed: ${backup.stderr || backup.stdout}`);
    assert(backup.parsed?.status === "passed", "backup did not report status passed.");
    assert(backup.parsed?.restoreCheck?.status === "passed", "backup restore check did not pass.");
    assert(fs.existsSync(backupManifest), "latest backup manifest was not written.");

    const launchArgs = [
      "scripts/check-launch-readiness.mjs",
      "--profile",
      "staging",
      "--allow-local",
      "--site-url",
      staticBaseUrl,
      "--service-url",
      serviceBaseUrl,
      "--mode",
      "extractive",
      "--backup-manifest",
      backupManifest,
      "--skip-production-env",
    ];
    if (args.runVerify) launchArgs.push("--run-verify");
    if (args.writeSmoke) launchArgs.push("--write-smoke");

    const launch = commandResult(launchArgs, {
      ...drillEnv,
      SEARCH_BOOK_ANSWER_ENGINE_URL: serviceBaseUrl,
      SEARCH_BOOK_DEPLOYMENT_SITE_URL: staticBaseUrl,
    });
    assert(launch.passed, `launch readiness failed: ${launch.stderr || launch.stdout}`);
    assert(launch.parsed?.status === "passed", "launch readiness did not report status passed.");

    console.log(JSON.stringify({
      status: "passed",
      service: "search-book-local-launch-drill",
      generatedAt: new Date().toISOString(),
      previewBaseUrl: staticBaseUrl,
      answerEngineBaseUrl: serviceBaseUrl,
      artifacts: {
        kept: args.keepArtifacts,
        tempDir,
        dbPath,
        backupDir,
        backupManifest,
      },
      secrets: {
        valuesPrinted: false,
        llmApiKeyLoaded: false,
      },
      checks: {
        serviceHealth: health.status,
        seedDeploymentSmoke: seedSmoke.parsed?.status || "passed",
        backup: backup.parsed?.status || "passed",
        restoreCheck: backup.parsed?.restoreCheck?.status || "passed",
        launchReadiness: launch.parsed?.status || "passed",
      },
      evidence: {
        seedDeploymentSmoke: commandEvidence(seedSmoke),
        backup: commandEvidence(backup),
        launchReadiness: commandEvidence(launch),
      },
    }, null, 2));
  } catch (error) {
    console.error(JSON.stringify({
      status: "failed",
      service: "search-book-local-launch-drill",
      message: error.message,
      previewStdout: tail(preview.logs.stdout),
      previewStderr: tail(preview.logs.stderr),
      serviceStdout: tail(service.logs.stdout),
      serviceStderr: tail(service.logs.stderr),
      artifacts: {
        tempDir,
        dbPath,
        backupDir,
        backupManifest,
      },
      secrets: { valuesPrinted: false },
    }, null, 2));
    process.exitCode = 1;
  } finally {
    await Promise.all([stopChild(preview.child), stopChild(service.child)]);
    cleanupArtifacts(tempDir, args.keepArtifacts);
  }
}

try {
  await main();
} catch (error) {
  console.error(JSON.stringify({
    status: "failed",
    service: "search-book-local-launch-drill",
    message: error.message,
    secrets: { valuesPrinted: false },
  }, null, 2));
  process.exitCode = 1;
}
