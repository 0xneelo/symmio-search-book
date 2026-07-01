#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  authoredIndex: path.join(searchBookRoot, "data", "authored-pages.json"),
  searchIndex: path.join(searchBookRoot, "data", "search-index.json"),
  answerCorpus: path.join(searchBookRoot, "answer-corpus.js"),
  sourceCatalog: path.join(searchBookRoot, "data", "source-catalog.json"),
  outJson: path.join(searchBookRoot, "data", "answer-chunks.json"),
  outJs: path.join(searchBookRoot, "data", "answer-chunks.js"),
  maxWords: 220,
  overlapWords: 35,
};

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--out-js") args.outJs = argv[++index];
    else if (arg === "--max-words") args.maxWords = Number(argv[++index]);
    else if (arg === "--overlap-words") args.overlapWords = Number(argv[++index]);
    else if (arg === "--help") {
      console.log("Usage: node scripts/build-answer-chunks.mjs [--out-json path] [--out-js path] [--max-words 220] [--overlap-words 35]");
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (!Number.isInteger(args.maxWords) || args.maxWords < 80) throw new Error("--max-words must be an integer >= 80");
  if (!Number.isInteger(args.overlapWords) || args.overlapWords < 0 || args.overlapWords >= args.maxWords) {
    throw new Error("--overlap-words must be an integer >= 0 and smaller than --max-words");
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

function stripMarkdown(markdown) {
  return String(markdown || "")
    .replace(/^---\n[\s\S]*?\n---\n?/, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`|~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compactText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function addPages(map, pages, routeSource) {
  for (const page of pages || []) {
    if (!page?.id || map.has(page.id)) continue;
    map.set(page.id, {
      id: page.id,
      title: page.title,
      section: page.section,
      track: page.track,
      granularity: page.granularity,
      status: page.status,
      sourceKeys: page.sourceKeys || page.sources || [],
      sourceUrls: page.sourceUrls || [],
      volumeId: page.volumeId || "",
      file: page.file || page.route || "",
      bodyMarkdown: page.bodyMarkdown || "",
      summary: page.summary || page.excerpt || "",
      routeSource,
    });
  }
}

function pageUniverse({ authoredIndex, searchIndex, legacyCorpus }) {
  const pages = new Map();
  addPages(pages, authoredIndex.pages || [], "authored");
  addPages(pages, legacyCorpus.pages || [], "curated");
  addPages(pages, searchIndex, "generated");
  return [...pages.values()].sort((a, b) => {
    const routeDelta = routeSourceRank(a.routeSource) - routeSourceRank(b.routeSource);
    if (routeDelta) return routeDelta;
    return a.id.localeCompare(b.id);
  });
}

function routeSourceRank(routeSource) {
  if (routeSource === "authored") return 0;
  if (routeSource === "curated") return 1;
  return 2;
}

function pageMarkdown(page) {
  if (page.bodyMarkdown) return page.bodyMarkdown;
  const filePath = page.file ? path.join(searchBookRoot, page.file) : "";
  if (filePath && fs.existsSync(filePath)) return fs.readFileSync(filePath, "utf8");
  return [page.title, page.summary].filter(Boolean).join("\n\n");
}

function chunkPage(page, args) {
  const words = stripMarkdown(pageMarkdown(page)).split(/\s+/).filter(Boolean);
  const fallbackWords = stripMarkdown([page.title, page.summary].filter(Boolean).join(" ")).split(/\s+/).filter(Boolean);
  const sourceWords = words.length ? words : fallbackWords;
  if (!sourceWords.length) return [];

  const chunks = [];
  const step = args.maxWords - args.overlapWords;
  for (let start = 0; start < sourceWords.length; start += step) {
    const end = Math.min(sourceWords.length, start + args.maxWords);
    const slice = sourceWords.slice(start, end);
    if (slice.length < 35 && chunks.length) {
      chunks[chunks.length - 1].text = `${chunks[chunks.length - 1].text} ${slice.join(" ")}`.trim();
      chunks[chunks.length - 1].wordCount = chunks[chunks.length - 1].text.split(/\s+/).filter(Boolean).length;
      break;
    }
    chunks.push({
      id: `${page.id}::${String(chunks.length + 1).padStart(3, "0")}`,
      pageId: page.id,
      chunkIndex: chunks.length + 1,
      title: page.title,
      section: page.section,
      track: page.track,
      granularity: page.granularity,
      status: page.status,
      routeSource: page.routeSource,
      sourceKeys: page.sourceKeys || [],
      sourceUrls: page.sourceUrls || [],
      volumeId: page.volumeId || "",
      file: page.file || "",
      wordStart: start,
      wordEnd: end,
      wordCount: slice.length,
      text: slice.join(" "),
    });
    if (end >= sourceWords.length) break;
  }
  return chunks;
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item) || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

const args = parseArgs(process.argv.slice(2));
const authoredIndex = readJson(args.authoredIndex);
const searchIndex = readJson(args.searchIndex);
const legacyCorpus = readLegacyCorpus(args.answerCorpus);
const sourceCatalog = readJson(args.sourceCatalog);
const sourceByKey = sourceCatalog.sourceByKey || {};
const pages = pageUniverse({ authoredIndex, searchIndex, legacyCorpus });
const chunks = pages.flatMap((page) => chunkPage(page, args));
const chunkedPageIds = unique(chunks.map((chunk) => chunk.pageId));
const pagesMissingChunks = pages.filter((page) => !chunkedPageIds.includes(page.id)).map((page) => page.id);
const duplicateChunkIds = chunks.map((chunk) => chunk.id).filter((id, index, ids) => ids.indexOf(id) !== index);
const unknownSourceKeys = unique(
  pages.flatMap((page) => (page.sourceKeys || []).filter((sourceKey) => !sourceByKey[sourceKey])),
);
const usedSourceKeys = unique(chunks.flatMap((chunk) => chunk.sourceKeys || []));
const sourceRefs = Object.fromEntries(
  usedSourceKeys.map((sourceKey) => {
    const source = sourceByKey[sourceKey];
    return [
      sourceKey,
      {
        key: sourceKey,
        group: source?.group || "missing",
        use: source?.use || "",
        href: source?.href || "",
      },
    ];
  }),
);

if (duplicateChunkIds.length) throw new Error(`Duplicate answer chunk ids: ${unique(duplicateChunkIds).join(", ")}`);
if (pagesMissingChunks.length) throw new Error(`Pages missing answer chunks: ${pagesMissingChunks.join(", ")}`);
if (unknownSourceKeys.length) throw new Error(`Answer chunks use unknown source keys: ${unknownSourceKeys.join(", ")}`);

const payload = {
  generatedAt: "deterministic-build",
  sourceFiles: ["data/authored-pages.json", "data/search-index.json", "answer-corpus.js", "data/source-catalog.json", "content/generated/**"],
  status: "prototype-retrieval-chunks",
  chunking: {
    maxWords: args.maxWords,
    overlapWords: args.overlapWords,
  },
  totalPages: pages.length,
  totalChunks: chunks.length,
  pagesWithChunks: chunkedPageIds.length,
  pagesMissingChunks,
  duplicateChunkIds: [],
  unknownSourceKeys,
  usedSourceKeys,
  sourceRefs,
  byRouteSource: countBy(pages, (page) => page.routeSource),
  chunksByRouteSource: countBy(chunks, (chunk) => chunk.routeSource),
  chunksBySection: countBy(chunks, (chunk) => chunk.section),
  chunks,
};

ensureDir(path.dirname(args.outJson));
fs.writeFileSync(args.outJson, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(args.outJs, `window.SearchBookAnswerChunks = ${JSON.stringify(payload)};\n`);
console.log(
  JSON.stringify(
    {
      pages: payload.totalPages,
      chunks: payload.totalChunks,
      pagesWithChunks: payload.pagesWithChunks,
      usedSourceKeys: payload.usedSourceKeys.length,
      unknownSourceKeys: payload.unknownSourceKeys.length,
    },
    null,
    2,
  ),
);
