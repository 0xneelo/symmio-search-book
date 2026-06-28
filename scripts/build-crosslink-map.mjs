#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  authoredIndex: path.join(searchBookRoot, "data", "authored-pages.json"),
  searchIndex: path.join(searchBookRoot, "data", "search-index.json"),
  navigationTree: path.join(searchBookRoot, "data", "navigation-tree.json"),
  outJson: path.join(searchBookRoot, "data", "crosslinks.json"),
  outJs: path.join(searchBookRoot, "data", "crosslinks.js"),
};

const authoredSectionOrder = [
  "compendium",
  "manifesto",
  "protocol-reference",
  "product-reference",
  "dashboard-reference",
  "rewards-referrals",
  "reference",
  "answer-engine",
];

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--out-js") args.outJs = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node src/search-book/scripts/build-crosslink-map.mjs [--out-json path] [--out-js path]");
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

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function pageSummary(page, routeSource) {
  return {
    id: page.id,
    title: page.title,
    section: page.section,
    track: page.track,
    status: page.status,
    sourceKeys: page.sourceKeys || [],
    volumeId: page.volumeId || "",
    routeSource,
    explicitRelatedPageIds: [...(page.relatedGeneratedPages || []), ...(page.relatedPages || [])],
  };
}

function sortedAuthoredPages(pages) {
  return [...pages].sort((a, b) => {
    const sectionDelta = authoredSectionOrder.indexOf(a.section) - authoredSectionOrder.indexOf(b.section);
    if (sectionDelta) return sectionDelta;
    const trackDelta = String(a.track || "").localeCompare(String(b.track || ""));
    if (trackDelta) return trackDelta;
    return String(a.title || "").localeCompare(String(b.title || ""));
  });
}

function navigationOrderedPages(navigation, searchPagesById) {
  const ordered = [];
  for (const section of navigation.sections || []) {
    for (const track of section.tracks || []) {
      for (const navPage of track.pages || []) {
        const page = searchPagesById.get(navPage.id);
        if (page) ordered.push(page);
      }
    }
  }
  return ordered;
}

function addUnique(items, item) {
  if (!item || items.includes(item)) return;
  items.push(item);
}

function nearestSameTrack(sequence, page, position, limit = 4) {
  const candidates = [];
  for (let offset = 1; candidates.length < limit && (position - offset >= 0 || position + offset < sequence.length); offset += 1) {
    const before = sequence[position - offset];
    const after = sequence[position + offset];
    if (before && before.section === page.section && before.track === page.track) candidates.push(before.id);
    if (after && after.section === page.section && after.track === page.track) candidates.push(after.id);
  }
  return candidates;
}

function sameSourcePages(sequence, page, limit = 6) {
  const sourceKeys = new Set(page.sourceKeys || []);
  if (!sourceKeys.size) return [];
  return sequence
    .filter((candidate) => candidate.id !== page.id && (candidate.sourceKeys || []).some((sourceKey) => sourceKeys.has(sourceKey)))
    .slice(0, limit)
    .map((candidate) => candidate.id);
}

function buildRelatedPageIds(sequence, page, position, pagesById) {
  const related = [];
  const missingExplicitRelatedPageIds = [];
  for (const relatedPageId of page.explicitRelatedPageIds || []) {
    if (!pagesById.has(relatedPageId)) {
      missingExplicitRelatedPageIds.push(relatedPageId);
      continue;
    }
    if (relatedPageId !== page.id) addUnique(related, relatedPageId);
  }
  for (const relatedPageId of nearestSameTrack(sequence, page, position)) addUnique(related, relatedPageId);
  for (const relatedPageId of sameSourcePages(sequence, page)) addUnique(related, relatedPageId);
  return {
    relatedPageIds: related.slice(0, 8),
    missingExplicitRelatedPageIds,
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
const authored = readJson(args.authoredIndex);
const searchIndex = readJson(args.searchIndex);
const navigation = readJson(args.navigationTree);
const searchPagesById = new Map(searchIndex.map((page) => [page.id, pageSummary(page, "generated")]));
const authoredPages = sortedAuthoredPages(authored.pages || []).map((page) => pageSummary(page, "authored"));
const generatedPages = navigationOrderedPages(navigation, searchPagesById);
const orderedIds = new Set();
const sequence = [];

for (const page of [...authoredPages, ...generatedPages, ...searchPagesById.values()]) {
  if (orderedIds.has(page.id)) continue;
  orderedIds.add(page.id);
  sequence.push(page);
}

const duplicatePageIds = sequence.map((page) => page.id).filter((id, index, ids) => ids.indexOf(id) !== index);
const pagesById = new Map(sequence.map((page) => [page.id, page]));
const pageCrosslinks = sequence.map((page, position) => {
  const related = buildRelatedPageIds(sequence, page, position, pagesById);
  return {
    id: page.id,
    title: page.title,
    section: page.section,
    track: page.track,
    routeSource: page.routeSource,
    position: position + 1,
    previousPageId: sequence[position - 1]?.id || null,
    nextPageId: sequence[position + 1]?.id || null,
    relatedPageIds: related.relatedPageIds,
    explicitRelatedPageIds: page.explicitRelatedPageIds || [],
    missingExplicitRelatedPageIds: related.missingExplicitRelatedPageIds,
  };
});
const missingExplicitRelatedPageIds = pageCrosslinks.flatMap((page) =>
  page.missingExplicitRelatedPageIds.map((relatedPageId) => ({ pageId: page.id, relatedPageId })),
);
const pagesWithoutAnyNeighbor = pageCrosslinks
  .filter((page) => !page.previousPageId && !page.nextPageId)
  .map((page) => page.id);

if (duplicatePageIds.length) throw new Error(`Duplicate crosslink page ids: ${[...new Set(duplicatePageIds)].join(", ")}`);
if (missingExplicitRelatedPageIds.length) {
  throw new Error(`Crosslinks point at unknown explicit related pages: ${missingExplicitRelatedPageIds.map((item) => `${item.pageId} -> ${item.relatedPageId}`).join("; ")}`);
}

const payload = {
  generatedAt: "deterministic-build",
  totalPages: pageCrosslinks.length,
  pagesWithPrevious: pageCrosslinks.filter((page) => page.previousPageId).length,
  pagesWithNext: pageCrosslinks.filter((page) => page.nextPageId).length,
  pagesWithRelated: pageCrosslinks.filter((page) => page.relatedPageIds.length).length,
  missingExplicitRelatedPageIds,
  duplicatePageIds: [],
  pagesWithoutAnyNeighbor,
  bySection: countBy(pageCrosslinks, (page) => page.section),
  byRouteSource: countBy(pageCrosslinks, (page) => page.routeSource),
  pages: pageCrosslinks,
  pageById: Object.fromEntries(pageCrosslinks.map((page) => [page.id, page])),
};

ensureDir(path.dirname(args.outJson));
fs.writeFileSync(args.outJson, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(args.outJs, `window.SearchBookCrosslinks = ${JSON.stringify(payload)};\n`);
console.log(JSON.stringify({ pages: payload.totalPages, previous: payload.pagesWithPrevious, next: payload.pagesWithNext, related: payload.pagesWithRelated, missingRelated: payload.missingExplicitRelatedPageIds.length }, null, 2));
