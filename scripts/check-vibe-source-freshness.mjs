#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaultArgs = {
  sourceCatalog: path.join(searchBookRoot, "data", "source-catalog.json"),
  timeoutMs: 15_000,
  outJson: "",
};

const sourceKeys = ["vibe-what-is", "vibe-platform"];

const claimChecks = [
  {
    id: "vibe-what-is-binance-perp-coverage",
    sourceKey: "vibe-what-is",
    label: "What Is Vibe Trading page still states Binance perp market coverage",
    patterns: [
      {
        id: "all-binance-perp-markets",
        expected: "all Binance perp markets",
        regex: /\ball\s+Binance\s+perp\s+markets\b/i,
      },
    ],
  },
  {
    id: "vibe-what-is-market-count",
    sourceKey: "vibe-what-is",
    label: "What Is Vibe Trading page still states 390+ markets",
    patterns: [
      {
        id: "390-plus-markets",
        expected: "390+ markets",
        regex: /\b390\+\s+markets\b/i,
      },
    ],
  },
  {
    id: "vibe-platform-market-count",
    sourceKey: "vibe-platform",
    label: "Vibe Platform page still states 390+ markets",
    patterns: [
      {
        id: "390-plus-markets",
        expected: "390+ Markets",
        regex: /\b390\+\s+Markets\b/i,
      },
    ],
  },
  {
    id: "vibe-platform-leverage",
    sourceKey: "vibe-platform",
    label: "Vibe Platform page still states published leverage wording",
    patterns: [
      {
        id: "up-to-60x-leverage",
        expected: "up to 60x Leverage",
        regex: /\bup\s+to\s+60x\s+Leverage\b/i,
      },
      {
        id: "x100-on-some",
        expected: "x100 on some",
        regex: /\bx100\s+on\s+some\b/i,
      },
    ],
  },
];

function usage() {
  return `Usage:
  node scripts/check-vibe-source-freshness.mjs [options]

Options:
  --source-catalog path  Defaults to data/source-catalog.json
  --timeout-ms n         Per-source fetch timeout. Default: 15000
  --out-json path        Write the JSON report to this path
  --json                 Accepted for command symmetry; output is always JSON

This command fetches official public Vibe docs Markdown URLs registered in
data/source-catalog.json and verifies publication-date market-count/leverage
wording without printing source bodies, API keys, or token values.`;
}

function parseArgs(argv) {
  const args = { ...defaultArgs };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--json") continue;
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) throw new Error(`${arg} requires a value.`);
    if (arg === "--source-catalog") args.sourceCatalog = next;
    else if (arg === "--timeout-ms") args.timeoutMs = Number(next);
    else if (arg === "--out-json") args.outJson = next;
    else throw new Error(`Unknown argument: ${arg}`);
    index += 1;
  }
  if (!Number.isFinite(args.timeoutMs) || args.timeoutMs <= 0) throw new Error("--timeout-ms must be a positive number.");
  return args;
}

function readSourceCatalog(catalogPath) {
  const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  const byKey = catalog.sourceByKey || Object.fromEntries((catalog.sources || []).map((source) => [source.key, source]));
  return Object.fromEntries(
    sourceKeys.map((key) => {
      const source = byKey[key];
      if (!source) throw new Error(`Missing source key in catalog: ${key}`);
      const url = source.href || source.source;
      if (!/^https?:\/\//i.test(url || "")) throw new Error(`Source key ${key} is not a public URL.`);
      return [key, { key, url, use: source.use || "" }];
    }),
  );
}

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function normalizeText(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

async function fetchSource(source, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(source.url, {
      signal: controller.signal,
      headers: {
        accept: "text/markdown,text/plain;q=0.9,*/*;q=0.1",
        "user-agent": "symmio-search-book-source-freshness/1.0",
      },
    });
    const body = await response.text();
    return {
      key: source.key,
      url: source.url,
      ok: response.ok,
      status: response.status,
      contentType: response.headers.get("content-type") || "",
      bytes: Buffer.byteLength(body),
      sha256: sha256(body),
      normalizedText: normalizeText(body),
    };
  } catch (error) {
    return {
      key: source.key,
      url: source.url,
      ok: false,
      status: 0,
      contentType: "",
      bytes: 0,
      sha256: "",
      normalizedText: "",
      error: error.name === "AbortError" ? `fetch timed out after ${timeoutMs}ms` : error.message,
    };
  } finally {
    clearTimeout(timeout);
  }
}

function summarizeSource(fetched) {
  return {
    key: fetched.key,
    url: fetched.url,
    fetched: fetched.ok,
    httpStatus: fetched.status,
    contentType: fetched.contentType,
    bytes: fetched.bytes,
    sha256: fetched.sha256,
    error: fetched.error || "",
  };
}

function evaluateClaims(fetchedByKey) {
  return claimChecks.map((claim) => {
    const fetched = fetchedByKey[claim.sourceKey];
    const patternResults = claim.patterns.map((pattern) => ({
      id: pattern.id,
      expected: pattern.expected,
      matched: Boolean(fetched?.ok && pattern.regex.test(fetched.normalizedText)),
    }));
    return {
      id: claim.id,
      sourceKey: claim.sourceKey,
      label: claim.label,
      passed: Boolean(fetched?.ok) && patternResults.every((pattern) => pattern.matched),
      patterns: patternResults,
    };
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const sources = readSourceCatalog(path.resolve(args.sourceCatalog));
  const fetchedSources = await Promise.all(Object.values(sources).map((source) => fetchSource(source, args.timeoutMs)));
  const fetchedByKey = Object.fromEntries(fetchedSources.map((source) => [source.key, source]));
  const checks = evaluateClaims(fetchedByKey);
  const failedChecks = checks.filter((check) => !check.passed);
  const failedSources = fetchedSources.filter((source) => !source.ok);
  const result = {
    status: failedSources.length || failedChecks.length ? "failed" : "passed",
    service: "search-book-vibe-source-freshness",
    generatedAt: new Date().toISOString(),
    sourceCatalog: path.relative(searchBookRoot, path.resolve(args.sourceCatalog)) || args.sourceCatalog,
    claimBoundary:
      "This verifies current official public-docs wording for freshness-sensitive market-count/leverage claims; it is not a live exchange market-index audit.",
    secrets: {
      valuesPrinted: false,
      sourceBodiesPrinted: false,
    },
    totals: {
      sources: fetchedSources.length,
      sourcesFetched: fetchedSources.filter((source) => source.ok).length,
      checks: checks.length,
      passed: checks.filter((check) => check.passed).length,
      failed: failedChecks.length,
    },
    sources: fetchedSources.map(summarizeSource),
    checks,
  };

  const rendered = `${JSON.stringify(result, null, 2)}\n`;
  if (args.outJson) {
    fs.mkdirSync(path.dirname(path.resolve(args.outJson)), { recursive: true });
    fs.writeFileSync(path.resolve(args.outJson), rendered);
  }
  if (result.status === "passed") {
    console.log(rendered);
    return;
  }
  console.error(rendered);
  process.exitCode = 1;
}

main().catch((error) => {
  console.error(
    JSON.stringify(
      {
        status: "failed",
        service: "search-book-vibe-source-freshness",
        message: error.message,
        secrets: {
          valuesPrinted: false,
          sourceBodiesPrinted: false,
        },
      },
      null,
      2,
    ),
  );
  process.exitCode = 1;
});
