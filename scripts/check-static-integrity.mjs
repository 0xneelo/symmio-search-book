#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const repoRoot = searchBookRoot;

const defaults = {
  indexHtml: path.join(searchBookRoot, "index.html"),
};

const requiredScriptGlobals = new Map([
  ["./answer-corpus.js", "SearchBookCorpus"],
  ["./data/authored-pages.js", "SearchBookAuthored"],
  ["./data/search-index.js", "SearchBookIndex"],
  ["./data/navigation-tree.js", "SearchBookNavigation"],
  ["./data/journeys.js", "SearchBookJourneys"],
  ["./data/question-routes.js", "SearchBookQuestionRoutes"],
  ["./data/faq.js", "SearchBookFAQ"],
  ["./data/gap-queue.js", "SearchBookGapQueue"],
  ["./data/answer-chunks.js", "SearchBookAnswerChunks"],
  ["./data/answer-engine-contract.js", "SearchBookAnswerEngineContract"],
  ["./data/llm-rag-contract.js", "SearchBookLlmRagContract"],
  ["./data/answer-validation-report.js", "SearchBookAnswerValidationReport"],
  ["./data/volume-map.js", "SearchBookVolumeMap"],
  ["./data/glossary.js", "SearchBookGlossary"],
  ["./data/source-catalog.js", "SearchBookSourceCatalog"],
  ["./data/source-ingestion.js", "SearchBookSourceIngestion"],
  ["./data/crosslinks.js", "SearchBookCrosslinks"],
  ["./data/requirement-map.js", "SearchBookRequirementMap"],
  ["./data/quality-audit.js", "SearchBookQualityAudit"],
]);

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--index") args.indexHtml = path.resolve(argv[++index] || "");
    else if (arg === "--help") {
      console.log("Usage: node scripts/check-static-integrity.mjs [--index index.html]");
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
}

function resolveAsset(assetRoot, assetPath) {
  const normalized = assetPath.replace(/^\.\//, "");
  const absolutePath = path.resolve(assetRoot, normalized);
  const relative = path.relative(assetRoot, absolutePath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) return null;
  return absolutePath;
}

function localScriptSources(html) {
  return unique([...html.matchAll(/<script\s+src="([^"]+)"/g)].map((match) => match[1]));
}

function staticOpenPageIds(html) {
  return unique([...html.matchAll(/data-open-page="([^"$]+)"/g)].map((match) => match[1]));
}

function staticPageQueryIds(html) {
  return unique([...html.matchAll(/[?&]page=([a-z0-9-]+)/g)].map((match) => match[1]));
}

function assert(condition, message, failures) {
  if (!condition) failures.push(message);
}

const args = parseArgs(process.argv.slice(2));
const assetRoot = path.dirname(args.indexHtml);
const dataRoot = path.join(assetRoot, "data");
const pageStateRegistryPath = path.join(dataRoot, "page-state-registry.json");
const searchIndexPath = path.join(dataRoot, "search-index.json");
const authoredPagesPath = path.join(dataRoot, "authored-pages.json");
const html = fs.readFileSync(args.indexHtml, "utf8");
const pageStateRegistry = readJson(pageStateRegistryPath);
const searchIndex = readJson(searchIndexPath);
const authoredPages = readJson(authoredPagesPath);
const failures = [];
const warnings = [];

const pageById = new Map((pageStateRegistry.pages || []).map((page) => [page.id, page]));
const publicNavigationPages = (pageStateRegistry.pages || []).filter((page) => page.publicNavigationEligible);
const searchIndexIds = new Set((Array.isArray(searchIndex) ? searchIndex : searchIndex.pages || []).map((page) => page.id));
const authoredPageIds = new Set((authoredPages.pages || []).map((page) => page.id));

assert(html.includes("Vibe Docs Search Book Prototype"), "index-title-marker-missing", failures);
assert(html.includes("Ask the docs"), "ask-action-missing", failures);
assert(html.includes("Search insights"), "search-insights-nav-missing", failures);
assert(html.includes("Back to dashboard"), "dashboard-back-link-label-missing", failures);

const scriptSources = localScriptSources(html);
const missingScriptRefs = [...requiredScriptGlobals.keys()].filter((scriptPath) => !scriptSources.includes(scriptPath));
for (const scriptPath of missingScriptRefs) failures.push(`script-reference-missing:${scriptPath}`);

const unexpectedLocalScripts = scriptSources.filter((scriptPath) => !requiredScriptGlobals.has(scriptPath));
for (const scriptPath of unexpectedLocalScripts) warnings.push(`unexpected-local-script:${scriptPath}`);

for (const [scriptPath, globalName] of requiredScriptGlobals) {
  const absolutePath = resolveAsset(assetRoot, scriptPath);
  if (!absolutePath || !fs.existsSync(absolutePath)) {
    failures.push(`script-file-missing:${scriptPath}`);
    continue;
  }
  const scriptText = fs.readFileSync(absolutePath, "utf8");
  if (!scriptText.includes(`window.${globalName}`)) failures.push(`script-global-missing:${scriptPath}:${globalName}`);
}

const staticPageIds = unique([...staticOpenPageIds(html), ...staticPageQueryIds(html)]);
for (const pageId of staticPageIds) {
  const page = pageById.get(pageId);
  if (!page) {
    failures.push(`static-page-id-missing:${pageId}`);
    continue;
  }
  if (!page.publicNavigationEligible) failures.push(`static-page-not-public-navigation:${pageId}`);
  if (!["published", "candidate"].includes(page.pageState)) failures.push(`static-page-state-disallowed:${pageId}:${page.pageState}`);
}

const invalidPublicPageIds = publicNavigationPages
  .map((page) => page.id)
  .filter((pageId) => !/^[a-z0-9][a-z0-9-]*$/.test(pageId));
for (const pageId of invalidPublicPageIds) failures.push(`public-page-id-url-unsafe:${pageId}`);

const publicPagesMissingReaderData = publicNavigationPages
  .map((page) => page.id)
  .filter((pageId) => !searchIndexIds.has(pageId) && !authoredPageIds.has(pageId));
for (const pageId of publicPagesMissingReaderData) failures.push(`public-page-missing-reader-data:${pageId}`);

const result = {
  status: failures.length ? "failed" : "passed",
  service: "search-book-static-integrity",
  index: path.relative(repoRoot, args.indexHtml),
  assetRoot: path.relative(repoRoot, assetRoot) || ".",
  checks: {
    scriptReferences: `${requiredScriptGlobals.size - missingScriptRefs.length}/${requiredScriptGlobals.size}`,
    expectedGlobals: requiredScriptGlobals.size,
    staticPageLinks: staticPageIds.length,
    publicNavigationPages: publicNavigationPages.length,
    publicPagesMissingReaderData: publicPagesMissingReaderData.length,
    urlUnsafePublicPageIds: invalidPublicPageIds.length,
  },
  warnings,
  failures,
};

const rendered = JSON.stringify(result, null, 2);
if (failures.length) {
  console.error(rendered);
  process.exit(1);
}
console.log(rendered);
