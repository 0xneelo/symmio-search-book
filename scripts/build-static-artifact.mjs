#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  outDir: process.env.SEARCH_BOOK_STATIC_ARTIFACT_DIR || path.join(os.tmpdir(), "search-book-static-site"),
  runIntegrity: true,
};

const rootFiles = [
  "index.html",
  "answer-corpus.js",
  "page-manifest.json",
];

const directorySpecs = [
  { relative: "data", include: /\.(js|json)$/ },
  { relative: "content", include: /\.md$/ },
];

const sensitivePatterns = [
  /\bsk-[A-Za-z0-9_-]{20,}\b/,
  /Bearer\s+[A-Za-z0-9._-]{12,}/i,
  /SEARCH_BOOK_LLM_API_KEY\s*=\s*\S+/,
  /SEARCH_BOOK_ANSWER_ENGINE_MODERATION_TOKEN\s*=\s*\S+/,
  /SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN\s*=\s*\S+/,
  /DISCORD_TOKEN\s*=\s*\S+/,
];

function usage() {
  return `Usage:
  node scripts/build-static-artifact.mjs [options]

Options:
  --out-dir path             Default: SEARCH_BOOK_STATIC_ARTIFACT_DIR or /tmp/search-book-static-site
  --no-integrity             Skip check-static-integrity on the copied artifact

The artifact contains the static front door, generated data assets, and content markdown.
It does not copy .secrets, env files, SQLite databases, workflow logs, or production evidence.`;
}

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--no-integrity") {
      args.runIntegrity = false;
      continue;
    }
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) throw new Error(`${arg} requires a value.\n${usage()}`);
    if (arg === "--out-dir") args.outDir = path.resolve(next);
    else throw new Error(`Unknown argument: ${arg}\n${usage()}`);
    index += 1;
  }
  args.outDir = path.resolve(args.outDir);
  return args;
}

function assertSafeOutDir(outDir) {
  const relativeToRoot = path.relative(searchBookRoot, outDir);
  if (outDir === "/" || outDir === searchBookRoot || outDir === os.homedir()) {
    throw new Error(`Refusing unsafe artifact directory: ${outDir}`);
  }
  if (!path.isAbsolute(outDir)) throw new Error("--out-dir must resolve to an absolute path.");
  if (!relativeToRoot.startsWith("..") && !path.isAbsolute(relativeToRoot)) {
    throw new Error("--out-dir must not be inside the repository.");
  }
}

function copyFile(relativePath, outDir, copied) {
  const source = path.join(searchBookRoot, relativePath);
  const target = path.join(outDir, relativePath);
  if (!fs.existsSync(source)) throw new Error(`Missing artifact source file: ${relativePath}`);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
  const stats = fs.statSync(target);
  copied.push({
    path: relativePath,
    bytes: stats.size,
    sha256: sha256File(target),
  });
}

function walkDirectory(relativeDir, include, outDir, copied) {
  const sourceDir = path.join(searchBookRoot, relativeDir);
  if (!fs.existsSync(sourceDir)) throw new Error(`Missing artifact source directory: ${relativeDir}`);
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name));
  for (const entry of entries) {
    const relativePath = path.join(relativeDir, entry.name);
    const sourcePath = path.join(searchBookRoot, relativePath);
    if (entry.isDirectory()) {
      walkDirectory(relativePath, include, outDir, copied);
      continue;
    }
    if (!entry.isFile() || !include.test(entry.name)) continue;
    const targetPath = path.join(outDir, relativePath);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.copyFileSync(sourcePath, targetPath);
    const stats = fs.statSync(targetPath);
    copied.push({
      path: relativePath.split(path.sep).join("/"),
      bytes: stats.size,
      sha256: sha256File(targetPath),
    });
  }
}

function sha256File(filePath) {
  const hash = crypto.createHash("sha256");
  hash.update(fs.readFileSync(filePath));
  return hash.digest("hex");
}

function readJson(relativePath, fallback = {}) {
  try {
    return JSON.parse(fs.readFileSync(path.join(searchBookRoot, relativePath), "utf8"));
  } catch {
    return fallback;
  }
}

function runIntegrity(outDir) {
  const result = spawnSync(process.execPath, [
    path.join(searchBookRoot, "scripts", "check-static-integrity.mjs"),
    "--index",
    path.join(outDir, "index.html"),
  ], {
    cwd: searchBookRoot,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 20,
  });
  const parsed = parseJson(result.stdout) || parseJson(result.stderr);
  return {
    status: !result.error && result.status === 0 && parsed?.status === "passed" ? "passed" : "failed",
    exitCode: result.status,
    spawnError: result.error?.message || null,
    parsed,
    stderrTail: parsed ? "" : tail(result.stderr),
    stdoutTail: parsed ? "" : tail(result.stdout),
  };
}

function parseJson(text) {
  const raw = String(text || "").trim();
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function tail(text, maxLength = 4000) {
  const value = String(text || "");
  return value.length > maxLength ? value.slice(value.length - maxLength) : value;
}

function scanSensitive(outDir, copied) {
  const matches = [];
  for (const file of copied) {
    const filePath = path.join(outDir, file.path);
    if (!/\.(html|js|json|md|txt)$/i.test(file.path)) continue;
    const text = fs.readFileSync(filePath, "utf8");
    for (const pattern of sensitivePatterns) {
      if (pattern.test(text)) {
        matches.push({ path: file.path, pattern: String(pattern) });
        break;
      }
    }
  }
  return matches;
}

function summarizeData() {
  const pageManifest = readJson("page-manifest.json", {});
  const quality = readJson("data/quality-audit.json", {});
  const requirementMap = readJson("data/requirement-map.json", {});
  const sourceIngestion = readJson("data/source-ingestion.json", {});
  const answerChunks = readJson("data/answer-chunks.json", {});
  const questionRoutes = readJson("data/question-routes.json", {});
  const pageStateRegistry = readJson("data/page-state-registry.json", {});
  return {
    manifestPages: pageManifest.totalPages ?? pageManifest.counts?.totalPages ?? pageManifest.pages?.length ?? null,
    authoredPages: quality.totals?.authoredFiles ?? quality.totals?.authoredPublicationCandidates ?? null,
    publicNavigationPages: pageStateRegistry.publicNavigationPages ?? pageStateRegistry.pages?.filter((page) => page.publicNavigationEligible).length ?? null,
    exactRoutes: questionRoutes.routes?.length ?? quality.totals?.answerEngineExactRouteTests ?? null,
    chunks: answerChunks.chunks?.length ?? quality.totals?.answerChunks ?? null,
    qualityGates: quality.gates ? `${quality.gates.filter((gate) => gate.passed).length}/${quality.gates.length}` : null,
    completionReady: requirementMap.completionReady === true,
    sourceCompletionReady: sourceIngestion.sourceCompletionReady === true,
    openOperatorItems: (requirementMap.openOperatorItems || []).map((item) => ({
      id: item.id,
      title: item.title,
    })),
  };
}

function buildArtifact(args) {
  assertSafeOutDir(args.outDir);
  fs.rmSync(args.outDir, { recursive: true, force: true });
  fs.mkdirSync(args.outDir, { recursive: true });

  const copied = [];
  for (const relativePath of rootFiles) copyFile(relativePath, args.outDir, copied);
  for (const spec of directorySpecs) walkDirectory(spec.relative, spec.include, args.outDir, copied);

  const sensitiveMatches = scanSensitive(args.outDir, copied);
  const integrity = args.runIntegrity ? runIntegrity(args.outDir) : { status: "skipped" };
  const manifest = {
    status: sensitiveMatches.length === 0 && ["passed", "skipped"].includes(integrity.status) ? "passed" : "failed",
    service: "search-book-static-artifact",
    generatedAt: new Date().toISOString(),
    outDir: args.outDir,
    files: copied.length,
    bytes: copied.reduce((total, file) => total + file.bytes, 0),
    included: {
      rootFiles,
      directories: directorySpecs.map((spec) => spec.relative),
    },
    readiness: summarizeData(),
    integrity,
    secrets: {
      valuesPrinted: false,
      sensitiveMatches,
    },
    copiedFiles: copied,
  };

  fs.writeFileSync(path.join(args.outDir, "static-artifact-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  return manifest;
}

try {
  const args = parseArgs(process.argv.slice(2));
  const manifest = buildArtifact(args);
  console.log(JSON.stringify({
    status: manifest.status,
    service: manifest.service,
    outDir: manifest.outDir,
    files: manifest.files,
    bytes: manifest.bytes,
    integrity: manifest.integrity.status,
    secrets: {
      valuesPrinted: false,
      sensitiveMatches: manifest.secrets.sensitiveMatches.length,
    },
    readiness: {
      manifestPages: manifest.readiness.manifestPages,
      authoredPages: manifest.readiness.authoredPages,
      exactRoutes: manifest.readiness.exactRoutes,
      chunks: manifest.readiness.chunks,
      qualityGates: manifest.readiness.qualityGates,
      openOperatorItems: manifest.readiness.openOperatorItems,
    },
  }, null, 2));
  if (manifest.status !== "passed") process.exitCode = 1;
} catch (error) {
  console.error(JSON.stringify({
    status: "failed",
    service: "search-book-static-artifact",
    message: error.message,
    secrets: { valuesPrinted: false },
  }, null, 2));
  process.exitCode = 1;
}
