#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  manifest: path.join(searchBookRoot, "page-manifest.json"),
  searchIndex: path.join(searchBookRoot, "data", "search-index.json"),
  authoredIndex: path.join(searchBookRoot, "data", "authored-pages.json"),
  sourceCatalog: path.join(searchBookRoot, "data", "source-catalog.json"),
  crosslinks: path.join(searchBookRoot, "data", "crosslinks.json"),
  outJson: path.join(searchBookRoot, "data", "volume-map.json"),
  outJs: path.join(searchBookRoot, "data", "volume-map.js"),
};

const volumeDefinitions = [
  {
    id: "volume-01-orientation-and-thesis",
    number: 1,
    title: "Orientation And Core Thesis",
    premise: "Start with Vibe's category thesis, authored manifesto pages, product context, and competitive framing.",
    readerPromise: "Understand why the compendium exists and how Vibe positions itself before entering the long-form research spine.",
  },
  {
    id: "volume-02-bootstrap-and-proof-of-value",
    number: 2,
    title: "Bootstrap Trilemma And Proof Of Value",
    premise: "Group the foundational Neelo papers on market bootstrap, proof of value, and measurable demand signals.",
    readerPromise: "See why permissionless perps need a path from early intent flow to credible market proof.",
  },
  {
    id: "volume-03-listing-power-and-orderbooks",
    number: 3,
    title: "Listing Power And Orderbook Alternatives",
    premise: "Cover listing monopoly, orderbook constraints, industry primitive gaps, and game theory of market access.",
    readerPromise: "Trace how Vibe argues against venue-controlled listing power without dismissing mature order books.",
  },
  {
    id: "volume-04-token-margin-and-funding-systems",
    number: 4,
    title: "Token Margin, Pillars, And Funding Systems",
    premise: "Collect token-margined perps, Vibe pillars, information/trade convergence, and funding model architecture.",
    readerPromise: "Understand the infrastructure mechanics that make inventory-backed markets economically legible.",
  },
  {
    id: "volume-05-solver-lp-and-protocol-operations",
    number: 5,
    title: "Solver, LP, And Protocol Operations",
    premise: "Bind due diligence, the SYMM LP case study, solver references, Symmio protocol pages, and builder/developer material.",
    readerPromise: "Move from thesis to operational workflows for LPs, solvers, market creators, and protocol integrators.",
  },
  {
    id: "volume-06-referrals-and-market-formation",
    number: 6,
    title: "Referrals And Market Formation",
    premise: "Separate referral architecture, rewards, points, and unresolved public-depth questions into their own book part.",
    readerPromise: "Read referrals as a market-formation mechanism while seeing exactly where operator reconciliation remains open.",
  },
  {
    id: "volume-07-product-trading-and-risk",
    number: 7,
    title: "Product, Trading, And Risk Guides",
    premise: "Collect user-facing Vibe guides for trading, fees, collateral, risk, security, and market operations.",
    readerPromise: "Translate the vision into practical product behavior and reader-facing operational semantics.",
  },
  {
    id: "volume-08-dashboard-faq-and-living-docs",
    number: 8,
    title: "Dashboard, FAQ, And Living Docs",
    premise: "Close with dashboard reference pages, local FAQ seeds, glossary/reference pages, and the answer-engine improvement loop.",
    readerPromise: "Use the docs as an operating surface: dashboard semantics, repeated questions, and gaps that must keep improving.",
  },
];

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--out-js") args.outJs = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node src/search-book/scripts/build-volume-map.mjs [--out-json path] [--out-js path]");
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
  const counts = items.reduce((acc, item) => {
    const key = getKey(item) || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  return Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)));
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function titleCase(value) {
  return String(value || "Uncategorized")
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function trackNumber(track) {
  const match = String(track || "").match(/^(\d+)/);
  return match ? Number(match[1]) : null;
}

function routeSourceRank(routeSource) {
  if (routeSource === "authored") return 0;
  return 1;
}

function pagePosition(page, crosslinkById) {
  return crosslinkById[page.id]?.position || Number.MAX_SAFE_INTEGER;
}

function pageUniverse({ authoredIndex, searchIndex, crosslinks }) {
  const pages = new Map();
  for (const page of authoredIndex.pages || []) {
    pages.set(page.id, {
      id: page.id,
      title: page.title,
      section: page.section,
      track: page.track,
      granularity: "authored-page",
      status: page.status,
      sourceKeys: page.sourceKeys || [],
      sourceUrls: page.sourceUrls || [],
      volumeId: page.volumeId || "",
      routeSource: "authored",
    });
  }
  for (const page of searchIndex || []) {
    if (pages.has(page.id)) continue;
    pages.set(page.id, {
      id: page.id,
      title: page.title,
      section: page.section,
      track: page.track,
      granularity: page.granularity,
      status: page.status,
      sourceKeys: page.sourceKeys || [],
      sourceUrls: page.sourceUrls || [],
      volumeId: page.volumeId || "",
      routeSource: "generated",
    });
  }
  const crosslinkById = crosslinks.pageById || {};
  return [...pages.values()].sort((a, b) => {
    const positionDelta = pagePosition(a, crosslinkById) - pagePosition(b, crosslinkById);
    if (positionDelta) return positionDelta;
    const sourceDelta = routeSourceRank(a.routeSource) - routeSourceRank(b.routeSource);
    if (sourceDelta) return sourceDelta;
    return a.id.localeCompare(b.id);
  });
}

function volumeForPage(page) {
  if (page.volumeId) return page.volumeId;
  const section = page.section || "";
  const number = trackNumber(page.track);
  if (section === "manifesto" || section === "product-reference" || section === "product-research" || section === "competitive-context" || section === "architecture") {
    return "volume-01-orientation-and-thesis";
  }
  if ([1, 2, 13].includes(number)) return "volume-02-bootstrap-and-proof-of-value";
  if ([3, 4, 5, 9, 11, 16].includes(number)) return "volume-03-listing-power-and-orderbooks";
  if ([6, 7, 10, 14, 15].includes(number)) return "volume-04-token-margin-and-funding-systems";
  if ([8, 12].includes(number)) return "volume-05-solver-lp-and-protocol-operations";
  if (number === 17 || section === "rewards-referrals") return "volume-06-referrals-and-market-formation";
  if (["protocol-reference", "solver-reference", "options-reference", "settlement", "developer-reference", "builder-reference"].includes(section)) {
    return "volume-05-solver-lp-and-protocol-operations";
  }
  if (["dashboard-reference", "faq", "glossary", "answer-engine", "reference"].includes(section)) {
    return "volume-08-dashboard-faq-and-living-docs";
  }
  return "volume-07-product-trading-and-risk";
}

function chapterKeyForPage(page) {
  if (page.section === "vision-papers" || page.section === "vision-sections") return page.track || page.section;
  if (page.routeSource === "authored") return page.track || page.section;
  return page.section || page.track || "uncategorized";
}

function pageSummary(page) {
  return {
    id: page.id,
    title: page.title,
    section: page.section,
    track: page.track,
    granularity: page.granularity,
    status: page.status,
    routeSource: page.routeSource,
    volumeId: page.volumeId || "",
    sourceKeys: page.sourceKeys || [],
  };
}

function buildChapter(chapterId, pages) {
  const first = pages[0];
  return {
    id: chapterId.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    title: chapterId.includes("—") || chapterId.includes("-") ? chapterId : titleCase(chapterId),
    section: first.section,
    track: first.track,
    totalPages: pages.length,
    authoredPages: pages.filter((page) => page.routeSource === "authored").length,
    generatedPages: pages.filter((page) => page.routeSource === "generated").length,
    statusCounts: countBy(pages, (page) => page.status),
    granularityCounts: countBy(pages, (page) => page.granularity),
    sourceKeys: unique(pages.flatMap((page) => page.sourceKeys || [])),
    firstPageId: first.id,
    pageIds: pages.map((page) => page.id),
    samplePages: pages.slice(0, 6).map(pageSummary),
  };
}

function buildVolume(definition, pages) {
  const overview = pages.find((page) => page.volumeId === definition.id && page.section === "compendium");
  const chapterMap = new Map();
  for (const page of pages) {
    const chapterKey = chapterKeyForPage(page);
    if (!chapterMap.has(chapterKey)) chapterMap.set(chapterKey, []);
    chapterMap.get(chapterKey).push(page);
  }
  const chapters = [...chapterMap.entries()].map(([chapterId, chapterPages]) => buildChapter(chapterId, chapterPages));
  return {
    ...definition,
    totalPages: pages.length,
    overviewPageId: overview?.id || "",
    overviewTitle: overview?.title || "",
    authoredPages: pages.filter((page) => page.routeSource === "authored").length,
    generatedPages: pages.filter((page) => page.routeSource === "generated").length,
    statusCounts: countBy(pages, (page) => page.status),
    granularityCounts: countBy(pages, (page) => page.granularity),
    routeSourceCounts: countBy(pages, (page) => page.routeSource),
    sectionCounts: countBy(pages, (page) => page.section),
    sourceKeys: unique(pages.flatMap((page) => page.sourceKeys || [])),
    openingPageIds: [overview, ...pages.filter((page) => page.id !== overview?.id)].filter(Boolean).slice(0, 8).map((page) => page.id),
    pageIds: pages.map((page) => page.id),
    chapters,
  };
}

const args = parseArgs(process.argv.slice(2));
const manifest = readJson(args.manifest);
const searchIndex = readJson(args.searchIndex);
const authoredIndex = readJson(args.authoredIndex);
const sourceCatalog = readJson(args.sourceCatalog);
const crosslinks = readJson(args.crosslinks);
const sourceByKey = sourceCatalog.sourceByKey || {};
const pages = pageUniverse({ authoredIndex, searchIndex, crosslinks });
const volumeById = new Map(volumeDefinitions.map((volume) => [volume.id, []]));
const unassignedPageIds = [];

for (const page of pages) {
  const volumeId = volumeForPage(page);
  if (!volumeById.has(volumeId)) {
    unassignedPageIds.push(page.id);
    continue;
  }
  volumeById.get(volumeId).push(page);
}

const volumes = volumeDefinitions.map((definition) => buildVolume(definition, volumeById.get(definition.id) || []));
const pageToVolume = Object.fromEntries(volumes.flatMap((volume) => volume.pageIds.map((pageId) => [pageId, volume.id])));
const assignedPageIds = Object.keys(pageToVolume);
const duplicatePageIds = assignedPageIds.filter((pageId, index, ids) => ids.indexOf(pageId) !== index);
const volumeIdsMissingPages = volumes.filter((volume) => !volume.totalPages).map((volume) => volume.id);
const volumeIdsMissingOverview = volumes.filter((volume) => !volume.overviewPageId).map((volume) => volume.id);
const unknownSourceKeys = unique(pages.flatMap((page) => (page.sourceKeys || []).filter((sourceKey) => !sourceByKey[sourceKey])));
const manifestWithinTarget = manifest.pages.length >= 500 && manifest.pages.length <= 800;

if (unassignedPageIds.length) throw new Error(`Unassigned volume pages: ${unassignedPageIds.join(", ")}`);
if (duplicatePageIds.length) throw new Error(`Duplicate volume page assignments: ${unique(duplicatePageIds).join(", ")}`);
if (assignedPageIds.length !== pages.length) throw new Error(`Volume map assigned ${assignedPageIds.length} pages for ${pages.length} reader pages`);
if (volumeIdsMissingPages.length) throw new Error(`Empty compendium volumes: ${volumeIdsMissingPages.join(", ")}`);
if (volumeIdsMissingOverview.length) throw new Error(`Compendium volumes missing overview pages: ${volumeIdsMissingOverview.join(", ")}`);
if (unknownSourceKeys.length) throw new Error(`Volume map uses unknown source keys: ${unknownSourceKeys.join(", ")}`);

const payload = {
  generatedAt: "deterministic-build",
  status: "prototype-compendium-volume-map",
  targetRange: manifest.compendiumTarget?.requestedRange || "500-800 pages",
  manifestPages: manifest.pages.length,
  readerPages: pages.length,
  totalVolumes: volumes.length,
  totalChapters: volumes.reduce((sum, volume) => sum + volume.chapters.length, 0),
  pagesAssigned: assignedPageIds.length,
  manifestWithinTarget,
  duplicatePageIds: [],
  unassignedPageIds,
  volumeIdsMissingPages,
  volumeIdsMissingOverview,
  unknownSourceKeys,
  volumeDefinitions: volumeDefinitions.map(({ id, number, title, premise, readerPromise }) => ({ id, number, title, premise, readerPromise })),
  volumes,
  pageToVolume,
};

ensureDir(path.dirname(args.outJson));
fs.writeFileSync(args.outJson, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(args.outJs, `window.SearchBookVolumeMap = ${JSON.stringify(payload)};\n`);
console.log(
  JSON.stringify(
    {
      volumes: payload.totalVolumes,
      chapters: payload.totalChapters,
      manifestPages: payload.manifestPages,
      readerPages: payload.readerPages,
      pagesAssigned: payload.pagesAssigned,
      manifestWithinTarget: payload.manifestWithinTarget,
    },
    null,
    2,
  ),
);
