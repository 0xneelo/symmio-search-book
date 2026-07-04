#!/usr/bin/env node

import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverScript = path.join(__dirname, "serve-static-preview.mjs");
const searchBookRoot = path.resolve(__dirname, "..");
const host = "127.0.0.1";

const defaults = {
  root: searchBookRoot,
};

function usage() {
  return `Usage:
  node scripts/smoke-static-preview.mjs [--root path]

Options:
  --root path   Static site root to serve. Default: repository root.
`;
}

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) throw new Error(`${arg} requires a value.\n${usage()}`);
    if (arg === "--root") args.root = path.resolve(next);
    else throw new Error(`Unknown argument: ${arg}\n${usage()}`);
    index += 1;
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

async function requestText(baseUrl, pathname) {
  const response = await fetch(`${baseUrl}${pathname}`);
  return {
    statusCode: response.status,
    contentType: response.headers.get("content-type") || "",
    body: await response.text(),
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
      const index = await requestText(baseUrl, "/");
      // Pre-cutover the root is the old prototype; post-cutover it is the Field Manual.
      if (
        index.statusCode === 200 &&
        (index.body.includes("Vibe Docs Search Book Prototype") || index.body.includes("Vibe × SYMM Field Manual"))
      ) {
        return index;
      }
      lastError = `index status ${index.statusCode}`;
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

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const port = await getFreePort();
  assert(port, "could not allocate a local port for static preview smoke test.");
  const baseUrl = `http://${host}:${port}`;
  const logs = { stdout: "", stderr: "" };
  const child = spawn(process.execPath, [serverScript, "--host", host, "--port", String(port), "--root", args.root], {
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env },
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
    const home = await waitForPreview(baseUrl, child, logs);
    assert(home.contentType.includes("text/html"), "home did not return HTML content type.");
    const oldFrontDoor = home.body.includes("Vibe Docs Search Book Prototype");
    if (oldFrontDoor) {
      assert(home.body.includes("Ask the docs"), "home did not render the Ask the docs action.");
      assert(home.body.includes("Search insights"), "home did not render Search insights navigation.");
      assert(home.body.includes("./data/search-index.js"), "home did not reference the search index asset.");
    }

    const index = await requestText(baseUrl, "/index.html?page=authored-vibe-product-overview");
    assert(index.statusCode === 200, `index exact-page URL returned ${index.statusCode}.`);
    assert(
      index.body.includes("Vibe Docs Search Book Prototype") || index.body.includes("Vibe × SYMM Field Manual"),
      "exact-page URL did not serve a front door.",
    );

    // Field Manual v2 overlay (SYN-356): served whenever web/dist is built.
    const webDistIndexPath = path.join(args.root, "web", "dist", "index.html");
    let webChecks = "skipped (web/dist not built)";
    if (fs.existsSync(webDistIndexPath)) {
      const v2 = await requestText(baseUrl, "/v2/");
      assert(v2.statusCode === 200, `/v2/ returned ${v2.statusCode}.`);
      // Symmiopedia v3 (SYN-368): the web app front door is the portal.
      assert(v2.body.includes("Symmiopedia"), "/v2/ did not serve the Symmiopedia app.");

      const distHtml = fs.readFileSync(webDistIndexPath, "utf8");
      const assetMatch = distHtml.match(/src="(\/assets\/[^"]+\.js)"/);
      assert(assetMatch, "web/dist index.html did not reference a bundled asset.");
      const asset = await requestText(baseUrl, assetMatch[1]);
      assert(asset.statusCode === 200, `web asset ${assetMatch[1]} returned ${asset.statusCode}.`);

      const pageDir = path.join(args.root, "web", "dist", "page");
      const firstPage = fs.existsSync(pageDir) ? fs.readdirSync(pageDir).find(Boolean) : null;
      assert(firstPage, "web/dist/page has no prerendered pages.");
      const reader = await requestText(baseUrl, `/page/${firstPage}/`);
      assert(reader.statusCode === 200, `prerendered page returned ${reader.statusCode}.`);
      assert(reader.body.includes('class="wk-body"'), "prerendered page did not include reader content.");
      webChecks = "ok";
    }

    const searchIndex = await requestText(baseUrl, "/data/search-index.js");
    assert(searchIndex.statusCode === 200, `search-index asset returned ${searchIndex.statusCode}.`);
    assert(searchIndex.body.includes("window.SearchBookIndex"), "search-index asset did not expose SearchBookIndex.");

    const questionRoutes = await requestText(baseUrl, "/data/question-routes.js");
    assert(questionRoutes.statusCode === 200, `question-routes asset returned ${questionRoutes.statusCode}.`);
    assert(questionRoutes.body.includes("window.SearchBookQuestionRoutes"), "question-routes asset did not expose SearchBookQuestionRoutes.");

    const qualityAudit = await requestText(baseUrl, "/data/quality-audit.js");
    assert(qualityAudit.statusCode === 200, `quality-audit asset returned ${qualityAudit.statusCode}.`);
    assert(qualityAudit.body.includes("window.SearchBookQualityAudit"), "quality-audit asset did not expose SearchBookQualityAudit.");

    const missing = await requestText(baseUrl, "/missing-static-preview-check");
    assert(missing.statusCode === 404, `missing route returned ${missing.statusCode}, expected 404.`);

    console.log(JSON.stringify({
      status: "passed",
      service: "search-book-static-preview",
      baseUrl,
      root: args.root,
      checks: {
        home: "ok",
        exactPageUrl: "ok",
        searchIndex: "ok",
        questionRoutes: "ok",
        qualityAudit: "ok",
        missingRoute: 404,
        fieldManualV2: webChecks,
      },
      server: {
        stdout: tail(logs.stdout, 600),
      },
    }, null, 2));
  } catch (error) {
    console.error(JSON.stringify({
      status: "failed",
      message: error.message,
      serverStdout: tail(logs.stdout),
      serverStderr: tail(logs.stderr),
    }, null, 2));
    process.exitCode = 1;
  } finally {
    await stopChild(child);
  }
}

try {
  await main();
} catch (error) {
  console.error(JSON.stringify({
    status: "failed",
    message: error.message,
  }, null, 2));
  process.exitCode = 1;
}
