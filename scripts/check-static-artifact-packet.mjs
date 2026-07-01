#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const allowedOpenOperatorItems = new Set([4, 11]);

const requiredArtifactFiles = [
  "index.html",
  "answer-corpus.js",
  "page-manifest.json",
  "data/search-index.js",
  "data/question-routes.js",
  "data/quality-audit.js",
  "data/source-ingestion.js",
  "data/requirement-map.js",
  "data/answer-engine-contract.js",
  "data/living-docs-events.js",
  "data/llm-rag-contract.js",
  "data/discord-review-routing.js",
  "data/discord-editorial-queue.json",
  "data/discord-editorial-queue.js",
];

const forbiddenArtifactPathPatterns = [
  /(^|\/)\.secrets(\/|$)/,
  /(^|\/)\.env(\.|$)/,
  /(^|\/)[^/]*\.env$/,
  /(^|\/)[^/]*\.sqlite(?:3|\.db)?$/,
  /(^|\/)[^/]*\.db$/,
  /(^|\/)node_modules(\/|$)/,
  /(^|\/)\.git(\/|$)/,
];

function defaultRoot() {
  return process.env.SEARCH_BOOK_STATIC_ARTIFACT_DIR || path.join(os.tmpdir(), "search-book-static-site");
}

function defaultManifest() {
  if (process.env.SEARCH_BOOK_STATIC_ARTIFACT_MANIFEST) {
    return process.env.SEARCH_BOOK_STATIC_ARTIFACT_MANIFEST;
  }
  return path.join(defaultRoot(), "static-artifact-manifest.json");
}

function usage() {
  return `Usage:
  node scripts/check-static-artifact-packet.mjs [options]

Options:
  --root path      Static artifact root. Defaults to SEARCH_BOOK_STATIC_ARTIFACT_DIR
                   or /tmp/search-book-static-site.
  --manifest path  Manifest path. Defaults to SEARCH_BOOK_STATIC_ARTIFACT_MANIFEST
                   or <root>/static-artifact-manifest.json.
  --json           Accepted for command symmetry; output is always JSON.

Validates a no-secret Search Book static artifact, including copied-file hashes,
front-door/data files, manifest integrity, source-ingestion readiness, Discord
route/queue evidence, and reconciled open operator gates.`;
}

function parseArgs(argv) {
  const args = { root: null, manifest: null };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--json") continue;
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) throw new Error(`${arg} requires a value.\n${usage()}`);
    if (arg === "--root") args.root = next;
    else if (arg === "--manifest") args.manifest = next;
    else throw new Error(`Unknown argument: ${arg}\n${usage()}`);
    index += 1;
  }

  const root = path.resolve(args.root || defaultRoot());
  const manifest = path.resolve(args.manifest || path.join(root, "static-artifact-manifest.json"));
  return { root, manifest };
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function addCheck(checks, id, passed, detail = "", evidence = null) {
  checks.push({
    id,
    passed: Boolean(passed),
    detail,
    ...(evidence ? { evidence } : {}),
  });
}

function relativeOrAbsolute(filePath) {
  const relativePath = path.relative(searchBookRoot, filePath);
  return relativePath.startsWith("..") ? filePath : relativePath;
}

function toArtifactPath(filePath) {
  return filePath.split(path.sep).join("/");
}

function walkFiles(root) {
  const files = [];
  const visit = (directory) => {
    const entries = fs.readdirSync(directory, { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        visit(absolutePath);
        continue;
      }
      if (!entry.isFile()) continue;
      files.push(toArtifactPath(path.relative(root, absolutePath)));
    }
  };
  visit(root);
  return files;
}

function sha256File(filePath) {
  const hash = crypto.createHash("sha256");
  hash.update(fs.readFileSync(filePath));
  return hash.digest("hex");
}

function copiedFileMap(manifest) {
  return new Map((manifest.copiedFiles || []).map((file) => [file.path, file]));
}

function copiedHashesMatch(root, copiedFiles) {
  const mismatches = [];
  for (const file of copiedFiles || []) {
    const filePath = path.join(root, file.path);
    if (!fs.existsSync(filePath)) {
      mismatches.push({ path: file.path, reason: "missing" });
      continue;
    }
    const actualBytes = fs.statSync(filePath).size;
    const actualSha256 = sha256File(filePath);
    if (actualBytes !== file.bytes || actualSha256 !== file.sha256) {
      mismatches.push({
        path: file.path,
        reason: "digest-or-size-mismatch",
      });
    }
  }
  return mismatches;
}

function forbiddenArtifactPaths(paths) {
  return paths
    .filter((filePath) => forbiddenArtifactPathPatterns.some((pattern) => pattern.test(filePath)))
    .sort((a, b) => a.localeCompare(b));
}

function openOperatorIds(readiness = {}) {
  return (readiness.openOperatorItems || [])
    .map((item) => Number(item.id))
    .filter((id) => Number.isFinite(id))
    .sort((a, b) => a - b);
}

function operatorBoundaryReady(readiness = {}) {
  const ids = openOperatorIds(readiness);
  const unexpected = ids.filter((id) => !allowedOpenOperatorItems.has(id));
  const exactReconciledBoundary = ids.length === 2 && ids[0] === 4 && ids[1] === 11;
  return {
    ready: unexpected.length === 0 && (ids.length === 0 || exactReconciledBoundary),
    ids,
    unexpected,
  };
}

function sourceRequirementsReady(sourceRequirements = {}) {
  return (
    Number(sourceRequirements.complete || 0) === 17
    && Number(sourceRequirements.partial || 0) === 0
    && Number(sourceRequirements.parked || 0) === 0
    && Number(sourceRequirements.missing || 0) === 0
  );
}

function discordRouteCoverageReady(coverage = {}) {
  const total = Number(coverage.totalPageFitGroups || 0);
  const covered = Number(coverage.pageFitCoveredByPublicRoutes || 0);
  return (
    coverage.coverageReady === true
    && total > 0
    && covered === total
    && Number(coverage.pageFitSingleRouteRemaining || 0) === 0
    && Number(coverage.pageFitWithoutPublicRoute || 0) === 0
  );
}

function livingDocsControlsReady(controls = {}) {
  const required = [
    "datastore",
    "frontendBridge",
    "pageFeedback",
    "retention",
    "moderation",
    "metrics",
    "cors",
    "backup",
    "preflight",
  ];
  return {
    ready: required.every((key) => controls[key] === true),
    missing: required.filter((key) => controls[key] !== true),
  };
}

function parseQualityGates(value) {
  const match = String(value || "").match(/^(\d+)\/(\d+)$/);
  if (!match) return { passed: 0, total: 0, valid: false };
  return {
    passed: Number(match[1]),
    total: Number(match[2]),
    valid: true,
  };
}

function qualityBoundaryReady(readiness = {}) {
  const parsed = parseQualityGates(readiness.qualityGates);
  if (!parsed.valid || parsed.total === 0) return { ready: false, ...parsed };
  const openIds = openOperatorIds(readiness);
  if (openIds.length === 0) return { ready: parsed.passed === parsed.total, ...parsed };
  return { ready: parsed.total - parsed.passed <= 1, ...parsed };
}

function readinessEvidence(manifest) {
  const readiness = manifest.readiness || {};
  const operatorBoundary = operatorBoundaryReady(readiness);
  const livingDocsControls = livingDocsControlsReady(readiness.livingDocsControls || {});
  const qualityGates = qualityBoundaryReady(readiness);
  return {
    manifestPages: readiness.manifestPages ?? null,
    authoredPages: readiness.authoredPages ?? null,
    publicNavigationPages: readiness.publicNavigationPages ?? null,
    exactRoutes: readiness.exactRoutes ?? null,
    chunks: readiness.chunks ?? null,
    qualityGates: readiness.qualityGates ?? null,
    qualityGateBoundaryReady: qualityGates.ready,
    completionReady: readiness.completionReady === true,
    livingDocsControlsReady: livingDocsControls.ready,
    sourceCompletionReady: readiness.sourceCompletionReady === true,
    sourceRequirements: readiness.sourceRequirements || {},
    discordRouteCoverage: readiness.discordRouteCoverage || {},
    openOperatorItems: operatorBoundary.ids,
  };
}

function validate(args) {
  const checks = [];
  addCheck(checks, "artifact-root-exists", fs.existsSync(args.root), relativeOrAbsolute(args.root));
  addCheck(checks, "manifest-exists", fs.existsSync(args.manifest), relativeOrAbsolute(args.manifest));

  if (!fs.existsSync(args.root) || !fs.existsSync(args.manifest)) {
    return { checks, manifest: null, actualFiles: [] };
  }

  const manifest = readJson(args.manifest);
  const actualFiles = walkFiles(args.root);
  const copiedFiles = manifest.copiedFiles || [];
  const copied = copiedFileMap(manifest);
  const requiredMissing = requiredArtifactFiles.filter((file) => !fs.existsSync(path.join(args.root, file)));
  const copiedMissingRequired = requiredArtifactFiles.filter((file) => !copied.has(file));
  const forbiddenPaths = forbiddenArtifactPaths(actualFiles);
  const hashMismatches = copiedHashesMatch(args.root, copiedFiles);
  const actualCopiedCount = actualFiles.filter((file) => file !== "static-artifact-manifest.json").length;
  const sensitiveMatches = manifest.secrets?.sensitiveMatches || [];
  const readiness = manifest.readiness || {};
  const operatorBoundary = operatorBoundaryReady(readiness);
  const sourceReady = sourceRequirementsReady(readiness.sourceRequirements || {});
  const routeCoverageReady = discordRouteCoverageReady(readiness.discordRouteCoverage || {});
  const livingDocs = livingDocsControlsReady(readiness.livingDocsControls || {});
  const qualityGates = qualityBoundaryReady(readiness);
  const manifestPages = Number(readiness.manifestPages || 0);
  const artifactBytes = Number(manifest.bytes || 0);
  const artifactFiles = Number(manifest.files || 0);

  addCheck(checks, "manifest-status", manifest.status === "passed", `status=${manifest.status}`);
  addCheck(checks, "manifest-service", manifest.service === "search-book-static-artifact", `service=${manifest.service || "missing"}`);
  addCheck(checks, "artifact-counts-positive", artifactFiles > 0 && artifactBytes > 0, `files=${artifactFiles}; bytes=${artifactBytes}`);
  addCheck(checks, "actual-file-count-matches-manifest", actualCopiedCount === artifactFiles, `actualCopied=${actualCopiedCount}; manifest=${artifactFiles}`);
  addCheck(checks, "required-files-present", requiredMissing.length === 0, requiredMissing.length ? `missing=${requiredMissing.join(",")}` : `${requiredArtifactFiles.length} required files present`);
  addCheck(checks, "required-files-listed-in-manifest", copiedMissingRequired.length === 0, copiedMissingRequired.length ? `missing=${copiedMissingRequired.join(",")}` : `${requiredArtifactFiles.length} required files listed`);
  addCheck(checks, "copied-file-hashes-match", hashMismatches.length === 0, hashMismatches.length ? `mismatches=${hashMismatches.map((item) => item.path).join(",")}` : `${copiedFiles.length} copied hashes matched`);
  addCheck(checks, "forbidden-artifact-paths-absent", forbiddenPaths.length === 0, forbiddenPaths.length ? `forbidden=${forbiddenPaths.join(",")}` : "no env, secret, sqlite, git, or dependency paths");
  addCheck(checks, "integrity-passed", manifest.integrity?.status === "passed", `integrity=${manifest.integrity?.status || "missing"}`);
  addCheck(checks, "secrets-not-printed", manifest.secrets?.valuesPrinted === false, `valuesPrinted=${manifest.secrets?.valuesPrinted}`);
  addCheck(checks, "sensitive-patterns-absent", sensitiveMatches.length === 0, `sensitiveMatches=${sensitiveMatches.length}`);
  addCheck(checks, "manifest-page-target", manifestPages >= 500 && manifestPages <= 800, `manifestPages=${manifestPages}`);
  addCheck(checks, "reader-data-counts", Number(readiness.authoredPages || 0) >= 800 && Number(readiness.publicNavigationPages || 0) >= 800, `authored=${readiness.authoredPages}; publicNavigation=${readiness.publicNavigationPages}`);
  addCheck(checks, "answer-data-counts", Number(readiness.exactRoutes || 0) >= 820 && Number(readiness.chunks || 0) >= 2800, `exactRoutes=${readiness.exactRoutes}; chunks=${readiness.chunks}`);
  addCheck(checks, "quality-boundary-ready", qualityGates.ready, `qualityGates=${readiness.qualityGates || "missing"}`);
  addCheck(checks, "source-ingestion-ready", readiness.sourceCompletionReady === true && sourceReady, `sourceRequirements=${JSON.stringify(readiness.sourceRequirements || {})}`);
  addCheck(checks, "discord-route-coverage-ready", routeCoverageReady, `coverage=${JSON.stringify(readiness.discordRouteCoverage || {})}`);
  addCheck(checks, "living-docs-controls-ready", livingDocs.ready, livingDocs.ready ? "all controls true" : `missing=${livingDocs.missing.join(",")}`);
  addCheck(checks, "operator-boundary-reconciled", operatorBoundary.ready, `open=${operatorBoundary.ids.join(",") || "none"}; unexpected=${operatorBoundary.unexpected.join(",") || "none"}`);

  return { checks, manifest, actualFiles };
}

try {
  const args = parseArgs(process.argv.slice(2));
  const { checks, manifest, actualFiles } = validate(args);
  const failed = checks.filter((check) => !check.passed);
  const output = {
    status: failed.length === 0 ? "passed" : "failed",
    service: "search-book-static-artifact-packet",
    root: args.root,
    manifest: args.manifest,
    valuesPrinted: false,
    evidence: manifest ? {
      files: manifest.files,
      bytes: manifest.bytes,
      actualFiles: actualFiles.length,
      integrity: manifest.integrity?.status || null,
      sensitiveMatches: manifest.secrets?.sensitiveMatches?.length || 0,
      readiness: readinessEvidence(manifest),
    } : null,
    checks,
  };
  console.log(JSON.stringify(output, null, 2));
  if (failed.length) process.exitCode = 1;
} catch (error) {
  console.error(JSON.stringify({
    status: "failed",
    service: "search-book-static-artifact-packet",
    message: error.message,
    valuesPrinted: false,
  }, null, 2));
  process.exitCode = 1;
}
