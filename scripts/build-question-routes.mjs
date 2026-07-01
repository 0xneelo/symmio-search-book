#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  questions: path.join(searchBookRoot, "QUESTIONS.md"),
  authoredIndex: path.join(searchBookRoot, "data", "authored-pages.json"),
  searchIndex: path.join(searchBookRoot, "data", "search-index.json"),
  answerCorpus: path.join(searchBookRoot, "answer-corpus.js"),
  outJson: path.join(searchBookRoot, "data", "question-routes.json"),
  outJs: path.join(searchBookRoot, "data", "question-routes.js"),
};

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--out-js") args.outJs = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node scripts/build-question-routes.mjs [--out-json path] [--out-js path]");
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

function readLegacyCorpus(filePath) {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(filePath, "utf8"), context, { filename: filePath });
  return context.window.SearchBookCorpus || { pages: [] };
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function parseQuestionRows(markdown, heading) {
  const start = markdown.indexOf(`## ${heading}`);
  if (start === -1) return [];
  const after = markdown.slice(start).split("\n");
  const rows = [];
  for (const line of after.slice(1)) {
    if (line.startsWith("## ")) break;
    if (!line.startsWith("|") || line.includes("---")) continue;
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());
    if (cells.length && cells[0] && cells[0] !== "Question") rows.push(cells);
  }
  return rows;
}

function stripBackticks(value) {
  return String(value || "").replace(/^`|`$/g, "");
}

function normalizeQuestion(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function slug(value) {
  return normalizeQuestion(value).replace(/\s+/g, "-").slice(0, 80);
}

function addPages(map, pages, routeSource) {
  for (const page of pages || []) {
    if (!page?.id || map.has(page.id)) continue;
    map.set(page.id, {
      id: page.id,
      title: page.title,
      section: page.section,
      track: page.track,
      status: page.status,
      summary: page.excerpt || page.summary || "",
      sourceKeys: page.sourceKeys || page.sources || [],
      routeSource,
    });
  }
}

function pageUniverse({ authoredIndex, searchIndex, legacyCorpus }) {
  const map = new Map();
  addPages(map, authoredIndex.pages || [], "authored");
  addPages(map, searchIndex, "generated");
  addPages(map, legacyCorpus.pages || [], "curated");
  return map;
}

function routeForRow(row, pagesById) {
  const [question, routedPage, confidence, notes] = row;
  const pageId = stripBackticks(routedPage);
  const page = pagesById.get(pageId);
  return {
    id: `qr-${slug(question)}`,
    question,
    normalizedQuestion: normalizeQuestion(question),
    pageId,
    pageTitle: page?.title || pageId,
    pageSection: page?.section || "missing",
    pageTrack: page?.track || "missing",
    pageStatus: page?.status || "missing",
    routeSource: page?.routeSource || "missing",
    confidence,
    notes,
    sourceKeys: page?.sourceKeys || [],
    missing: !page,
  };
}

function reconciliationForRow(row) {
  const [question, gap, notes] = row;
  return {
    id: `gap-${slug(question)}`,
    question,
    gapId: stripBackticks(gap),
    notes,
  };
}

const args = parseArgs(process.argv.slice(2));
const questionMarkdown = fs.readFileSync(args.questions, "utf8");
const authoredIndex = readJson(args.authoredIndex);
const searchIndex = readJson(args.searchIndex);
const legacyCorpus = readLegacyCorpus(args.answerCorpus);
const pagesById = pageUniverse({ authoredIndex, searchIndex, legacyCorpus });

const answerable = parseQuestionRows(questionMarkdown, "Answerable In Prototype").map((row) => routeForRow(row, pagesById));
const reconciliation = parseQuestionRows(questionMarkdown, "Needs Reconciliation").map(reconciliationForRow);
const missingRouteIds = answerable.filter((route) => route.missing).map((route) => ({ question: route.question, pageId: route.pageId }));

if (missingRouteIds.length) {
  throw new Error(`Question routes point at unknown pages: ${missingRouteIds.map((item) => `${item.question} -> ${item.pageId}`).join("; ")}`);
}

const payload = {
  generatedAt: "deterministic-build",
  sourceFile: "QUESTIONS.md",
  totalRoutes: answerable.length,
  totalReconciliationQuestions: reconciliation.length,
  missingRouteIds,
  byConfidence: answerable.reduce((acc, route) => {
    acc[route.confidence] = (acc[route.confidence] || 0) + 1;
    return acc;
  }, {}),
  byRouteSource: answerable.reduce((acc, route) => {
    acc[route.routeSource] = (acc[route.routeSource] || 0) + 1;
    return acc;
  }, {}),
  answerable,
  reconciliation,
};

ensureDir(path.dirname(args.outJson));
fs.writeFileSync(args.outJson, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(args.outJs, `window.SearchBookQuestionRoutes = ${JSON.stringify(payload)};\n`);
console.log(JSON.stringify({ routes: payload.totalRoutes, reconciliation: payload.totalReconciliationQuestions, missing: payload.missingRouteIds.length }, null, 2));
