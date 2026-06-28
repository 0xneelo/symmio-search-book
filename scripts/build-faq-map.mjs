#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  questions: path.join(searchBookRoot, "QUESTIONS.md"),
  gaps: path.join(searchBookRoot, "GAPS.md"),
  questionRoutes: path.join(searchBookRoot, "data", "question-routes.json"),
  authoredIndex: path.join(searchBookRoot, "data", "authored-pages.json"),
  searchIndex: path.join(searchBookRoot, "data", "search-index.json"),
  answerCorpus: path.join(searchBookRoot, "answer-corpus.js"),
  sourceCatalog: path.join(searchBookRoot, "data", "source-catalog.json"),
  outJson: path.join(searchBookRoot, "data", "faq.json"),
  outJs: path.join(searchBookRoot, "data", "faq.js"),
};

const gapSourceKeys = {
  "G-001": ["spec-04", "spec-06"],
  "G-003": ["spec-03", "server-points", "server-me", "dashboard-faq", "dashboard-volume", "syn-172", "syn-118"],
  "G-004": ["spec-03", "local-revenue-doc", "dashboard-revenue-doc", "server-pulse", "syn-203"],
  "G-005": ["spec-03", "server-volume", "server-volume-snapshots", "syn-200"],
  "G-008": ["spec-02", "spec-04", "symmio-core", "symmio-whitepaper"],
  "G-009": ["spec-03", "dashboard-app", "vibe-points", "server-points"],
};

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--out-js") args.outJs = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node src/search-book/scripts/build-faq-map.mjs [--out-json path] [--out-js path]");
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

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function slug(value) {
  return normalize(value).replace(/\s+/g, "-").slice(0, 90);
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
      sourceUrls: page.sourceUrls || [],
      routeSource,
    });
  }
}

function pageUniverse({ authoredIndex, searchIndex, legacyCorpus }) {
  const pages = new Map();
  addPages(pages, authoredIndex.pages || [], "authored");
  addPages(pages, legacyCorpus.pages || [], "curated");
  addPages(pages, searchIndex, "generated");
  return pages;
}

function parseGapItems(markdown) {
  return Object.fromEntries(
    [...markdown.matchAll(/^## (G-[0-9A-Z]+): (.+)$/gm)].map((match) => [
      match[1],
      {
        id: match[1],
        title: match[2].trim(),
      },
    ]),
  );
}

function sourceSummaries(sourceKeys, sourceByKey) {
  return sourceKeys.map((key) => {
    const source = sourceByKey[key];
    return {
      key,
      group: source?.group || "missing",
      use: source?.use || "unregistered source key",
      href: source?.href || "",
      missing: !source,
    };
  });
}

function categoryForText(question, section, track, gapId = "") {
  const haystack = normalize([question, section, track, gapId].join(" "));
  if (/revenue|earning|fee|funding|profit|phase/.test(haystack)) return "Revenue";
  if (/point|reward|referral|invite|network depth|onboard/.test(haystack)) return "Rewards And Referrals";
  if (/dashboard|settings|task|overview|faq/.test(haystack)) return "Dashboard";
  if (/volume|subgraph|barometer|backend|data/.test(haystack)) return "Data And Volume";
  if (/solver|lp|liquidity|partyb|party b|vault|option|settlement/.test(haystack)) return "Solvers And Settlement";
  if (/margin|vibecaps|risk|short|rug/.test(haystack)) return "Risk And Markets";
  if (/intent|partya|party a|symmio|trade/.test(haystack)) return "Trading Flow";
  if (/hip 3|proof of value|order book|listing|pillars|thesis|market formation|vibe x symmio/.test(haystack)) return "Manifesto";
  if (/terminology|term|glossary/.test(haystack)) return "Terminology";
  if (/discord|lafa/.test(haystack)) return "Discord Import";
  return "Getting Started";
}

function compactSummary(value) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= 360) return text;
  return `${text.slice(0, 357).trim()}...`;
}

function answerableEntry(route, page, sourceByKey) {
  const sourceKeys = route.sourceKeys || page.sourceKeys || [];
  const category = categoryForText(route.question, route.pageSection || page.section, route.pageTrack || page.track);
  return {
    id: `faq-${slug(route.question)}`,
    type: "answerable",
    seedSource: "local-question-ledger",
    category,
    question: route.question,
    normalizedQuestion: route.normalizedQuestion,
    shortAnswer: route.notes,
    answerSummary: compactSummary(page.summary),
    confidence: route.confidence,
    pageId: route.pageId,
    pageTitle: page.title || route.pageTitle,
    pageSection: page.section || route.pageSection,
    pageTrack: page.track || route.pageTrack,
    pageStatus: page.status || route.pageStatus,
    routeSource: page.routeSource || route.routeSource,
    sourceKeys,
    sources: sourceSummaries(sourceKeys, sourceByKey),
  };
}

function reconciliationEntry(route, gapsById, sourceByKey) {
  const sourceKeys = gapSourceKeys[route.gapId] || ["spec-06"];
  const gap = gapsById[route.gapId] || { id: route.gapId, title: "Unregistered gap" };
  return {
    id: `faq-${route.id}`,
    type: "reconciliation",
    seedSource: "local-question-ledger",
    category: categoryForText(route.question, gap.title, route.notes, route.gapId),
    question: route.question,
    gapId: route.gapId,
    gapTitle: gap.title,
    shortAnswer: "Parked for operator/source reconciliation. The prototype should route this as a gap, not as a final answer.",
    notes: route.notes,
    confidence: "Needs Reconciliation",
    sourceKeys,
    sources: sourceSummaries(sourceKeys, sourceByKey),
  };
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item) || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

const args = parseArgs(process.argv.slice(2));
const questionRoutes = readJson(args.questionRoutes);
const authoredIndex = readJson(args.authoredIndex);
const searchIndex = readJson(args.searchIndex);
const legacyCorpus = readLegacyCorpus(args.answerCorpus);
const sourceCatalog = readJson(args.sourceCatalog);
const gapsById = parseGapItems(fs.readFileSync(args.gaps, "utf8"));
const pagesById = pageUniverse({ authoredIndex, searchIndex, legacyCorpus });
const sourceByKey = sourceCatalog.sourceByKey || {};

const answerable = (questionRoutes.answerable || []).map((route) => {
  const page = pagesById.get(route.pageId);
  if (!page) {
    return {
      id: `faq-${slug(route.question)}`,
      type: "answerable",
      question: route.question,
      pageId: route.pageId,
      missing: true,
      sourceKeys: route.sourceKeys || [],
      sources: sourceSummaries(route.sourceKeys || [], sourceByKey),
    };
  }
  return answerableEntry(route, page, sourceByKey);
});
const unresolved = (questionRoutes.reconciliation || []).map((route) => reconciliationEntry(route, gapsById, sourceByKey));
const entries = [...answerable, ...unresolved];
const missingPageIds = answerable.filter((entry) => entry.missing).map((entry) => ({ question: entry.question, pageId: entry.pageId }));
const missingSourceKeys = entries.flatMap((entry) =>
  (entry.sources || [])
    .filter((source) => source.missing)
    .map((source) => ({ entryId: entry.id, sourceKey: source.key })),
);

if (missingPageIds.length) {
  throw new Error(`FAQ routes point at unknown pages: ${missingPageIds.map((item) => `${item.question} -> ${item.pageId}`).join("; ")}`);
}
if (missingSourceKeys.length) {
  throw new Error(`FAQ entries use unknown source keys: ${missingSourceKeys.map((item) => `${item.entryId} -> ${item.sourceKey}`).join("; ")}`);
}

const payload = {
  generatedAt: "deterministic-build",
  sourceFiles: ["QUESTIONS.md", "GAPS.md", "data/question-routes.json", "data/source-catalog.json"],
  seedSource: "local-question-ledger",
  status: "prototype-local-seed-discord-pending",
  totalEntries: entries.length,
  totalAnswerable: answerable.length,
  totalUnresolved: unresolved.length,
  totalCategories: Object.keys(countBy(entries, (entry) => entry.category)).length,
  missingPageIds,
  missingSourceKeys,
  byCategory: countBy(entries, (entry) => entry.category),
  byConfidence: countBy(answerable, (entry) => entry.confidence),
  byRouteSource: countBy(answerable, (entry) => entry.routeSource),
  byType: countBy(entries, (entry) => entry.type),
  answerable,
  unresolved,
  entries,
};

ensureDir(path.dirname(args.outJson));
fs.writeFileSync(args.outJson, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(args.outJs, `window.SearchBookFAQ = ${JSON.stringify(payload)};\n`);
console.log(
  JSON.stringify(
    {
      entries: payload.totalEntries,
      answerable: payload.totalAnswerable,
      unresolved: payload.totalUnresolved,
      categories: payload.totalCategories,
      missingPages: payload.missingPageIds.length,
      missingSources: payload.missingSourceKeys.length,
    },
    null,
    2,
  ),
);
