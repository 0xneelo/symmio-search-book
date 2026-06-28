#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { COMPENDIUM_TARGET_LABEL } from "./compendium-target.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  manifest: path.join(searchBookRoot, "page-manifest.json"),
  searchIndex: path.join(searchBookRoot, "data", "search-index.json"),
  outJson: path.join(searchBookRoot, "data", "navigation-tree.json"),
  outJs: path.join(searchBookRoot, "data", "navigation-tree.js"),
};

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--manifest") args.manifest = argv[++index];
    else if (arg === "--search-index") args.searchIndex = argv[++index];
    else if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--out-js") args.outJs = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node src/search-book/scripts/build-navigation-tree.mjs [--manifest src/search-book/page-manifest.json] [--search-index src/search-book/data/search-index.json]");
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

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item) || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function byLabel(a, b) {
  return String(a.label || a.title || a.id).localeCompare(String(b.label || b.title || b.id));
}

function pageSummary(page, manifestPage) {
  return {
    id: page.id,
    title: page.title,
    section: page.section,
    track: page.track,
    granularity: page.granularity,
    status: page.status,
    sourcePriority: manifestPage?.sourcePriority || "unknown",
    file: page.file,
    sourceKeys: page.sourceKeys || [],
  };
}

function groupPages(pages, manifestById) {
  const sectionMap = new Map();
  for (const page of pages) {
    const manifestPage = manifestById.get(page.id);
    const sectionKey = page.section || "uncategorized";
    if (!sectionMap.has(sectionKey)) {
      sectionMap.set(sectionKey, { id: sectionKey, label: sectionKey, totalPages: 0, tracks: new Map() });
    }
    const section = sectionMap.get(sectionKey);
    section.totalPages += 1;
    const trackKey = page.track || "Untracked";
    if (!section.tracks.has(trackKey)) {
      section.tracks.set(trackKey, { id: trackKey, label: trackKey, totalPages: 0, pages: [] });
    }
    const track = section.tracks.get(trackKey);
    track.totalPages += 1;
    track.pages.push(pageSummary(page, manifestPage));
  }

  return [...sectionMap.values()]
    .map((section) => ({
      ...section,
      tracks: [...section.tracks.values()]
        .map((track) => ({
          ...track,
          pages: track.pages.sort(byLabel),
        }))
        .sort(byLabel),
    }))
    .sort(byLabel);
}

function buildTree(manifest, searchIndex) {
  const manifestById = new Map(manifest.pages.map((page) => [page.id, page]));
  const sourcePriorities = countBy(manifest.pages, (page) => page.sourcePriority);
  const statuses = countBy(searchIndex, (page) => page.status);
  const granularities = countBy(searchIndex, (page) => page.granularity);
  const sections = groupPages(searchIndex, manifestById);
  const parkedPages = searchIndex
    .filter((page) => page.status === "needs-reconciliation" || page.status === "source-mapped")
    .map((page) => pageSummary(page, manifestById.get(page.id)))
    .sort(byLabel);

  return {
    generatedAt: "deterministic-build",
    manifestVersion: manifest.manifestVersion,
    totalPages: searchIndex.length,
    targetRange: manifest.compendiumTarget?.requestedRange || COMPENDIUM_TARGET_LABEL,
    counts: {
      sections: sections.length,
      tracks: sections.reduce((sum, section) => sum + section.tracks.length, 0),
      byGranularity: granularities,
      byStatus: statuses,
      bySourcePriority: sourcePriorities,
    },
    collections: manifest.collections || [],
    sections,
    parkedPages,
  };
}

const args = parseArgs(process.argv.slice(2));
const manifest = readJson(args.manifest);
const searchIndex = readJson(args.searchIndex);
const tree = buildTree(manifest, searchIndex);

if (tree.totalPages !== manifest.pages.length) {
  throw new Error(`Navigation tree has ${tree.totalPages} pages for manifest count ${manifest.pages.length}`);
}

ensureDir(path.dirname(args.outJson));
fs.writeFileSync(args.outJson, `${JSON.stringify(tree, null, 2)}\n`);
fs.writeFileSync(args.outJs, `window.SearchBookNavigation = ${JSON.stringify(tree)};\n`);
console.log(JSON.stringify({ totalPages: tree.totalPages, sections: tree.counts.sections, tracks: tree.counts.tracks }, null, 2));
