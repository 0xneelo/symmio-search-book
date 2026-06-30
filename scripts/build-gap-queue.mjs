#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const repoRoot = searchBookRoot;

const defaults = {
  gaps: path.join(searchBookRoot, "GAPS.md"),
  questionRoutes: path.join(searchBookRoot, "data", "question-routes.json"),
  navigationTree: path.join(searchBookRoot, "data", "navigation-tree.json"),
  authoredIndex: path.join(searchBookRoot, "data", "authored-pages.json"),
  searchIndex: path.join(searchBookRoot, "data", "search-index.json"),
  answerCorpus: path.join(searchBookRoot, "answer-corpus.js"),
  sourceCatalog: path.join(searchBookRoot, "data", "source-catalog.json"),
  operatorInbox: path.join(repoRoot, "_specs", "app-docs", "OPERATOR-INBOX.md"),
  outJson: path.join(searchBookRoot, "data", "gap-queue.json"),
  outJs: path.join(searchBookRoot, "data", "gap-queue.js"),
};

const gapMeta = {
  "G-001": {
    category: "Discord Import",
    priority: "P0",
    sourceKeys: ["spec-04", "spec-06", "spec-07"],
    relatedPageIds: ["authored-dashboard-faq", "authored-search-insights-loop"],
  },
  "G-002": {
    category: "Research Sweep",
    priority: "P2",
    sourceKeys: ["spec-07", "competitive-sweep-batch-01", "competitive-sweep-synthesis"],
    relatedPageIds: ["authored-competitive-docs-benchmark", "authored-search-insights-loop"],
  },
  "G-002A": {
    category: "Editorial Production",
    priority: "P1",
    sourceKeys: ["spec-08", "authored-pages"],
    relatedPageIds: ["authored-search-insights-loop"],
  },
  "G-003": {
    category: "Rewards And Referrals",
    priority: "P0",
    sourceKeys: ["spec-03", "server-points", "server-me", "dashboard-faq", "dashboard-volume", "syn-172", "syn-118"],
    relatedPageIds: [
      "authored-referral-depth-open-question",
      "local-network-depth",
      "linear-referral-depth-rollout",
      "authored-dashboard-network",
      "authored-dashboard-volume",
      "authored-referral-architecture-as-market-formation",
    ],
  },
  "G-004": {
    category: "Revenue",
    priority: "P0",
    sourceKeys: ["spec-03", "local-revenue-doc", "dashboard-revenue-doc", "server-pulse", "syn-203"],
    relatedPageIds: ["authored-estimated-network-revenue", "local-network-revenue", "linear-phase-b-revenue", "authored-lp-profit-and-dynamic-pricing"],
  },
  "G-005": {
    category: "Data And Volume",
    priority: "P1",
    sourceKeys: ["spec-03", "server-volume", "server-volume-snapshots", "syn-200"],
    relatedPageIds: ["authored-network-volume", "authored-dashboard-volume", "local-volume-source", "linear-subgraph-volume"],
  },
  "G-006": {
    category: "Publication Freshness",
    priority: "P2",
    sourceKeys: ["vibe-what-is"],
    relatedPageIds: ["vibe-product-what-is"],
  },
  "G-007": {
    category: "Origin And Whitepapers",
    priority: "P1",
    sourceKeys: ["spec-02", "symmio-whitepaper"],
    relatedPageIds: ["symmio-whitepaper", "authored-symmio-party-a-party-b"],
  },
  "G-008": {
    category: "Options And Settlement",
    priority: "P1",
    sourceKeys: ["spec-02", "spec-04", "symmio-core", "symmio-options-docs", "symmio-options-partya-open", "symmio-options-partyb-open", "symmio-options-partya-close", "symmio-options-partyb-close", "symmio-options-instant-layer"],
    relatedPageIds: ["authored-options-intent-lifecycle", "symmio-options-contracts", "symmio-settlement", "authored-vibe-trade-flow", "authored-intents-and-solvers"],
  },
  "G-009": {
    category: "Terminology",
    priority: "P1",
    sourceKeys: ["spec-03", "dashboard-app", "vibe-points", "server-points"],
    relatedPageIds: ["authored-points-and-vibe-points", "authored-glossary-core-terms", "local-dashboard-points-distinction", "vibe-points-overview"],
  },
  "G-010": {
    category: "Production Answer Engine",
    priority: "P0",
    sourceKeys: ["spec-06", "spec-08"],
    relatedPageIds: ["authored-search-insights-loop"],
  },
};

const operatorGapMap = {
  1: "G-004",
  2: "G-001",
  3: "G-003",
  4: "G-010",
  5: "G-011",
  6: "G-007",
  8: "G-002",
  9: "G-012",
  11: "G-010",
};

const priorityScores = {
  P0: 100,
  P1: 70,
  P2: 40,
  P3: 20,
};

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--out-js") args.outJs = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node src/search-book/scripts/build-gap-queue.mjs [--out-json path] [--out-js path]");
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

function stripMarkdown(value) {
  return String(value || "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .trim();
}

function firstParagraph(markdown) {
  return stripMarkdown(
    String(markdown || "")
      .split("\n\n")
      .find((block) => block.trim() && !block.trim().startsWith("**Needed:**")) || "",
  ).replace(/\s+/g, " ");
}

function parseGaps(markdown) {
  const headings = [...markdown.matchAll(/^## (G-[0-9A-Z]+): (.+)$/gm)];
  return headings.map((heading, index) => {
    const start = heading.index + heading[0].length;
    const end = headings[index + 1]?.index ?? markdown.length;
    const body = markdown.slice(start, end).trim();
    const needed = stripMarkdown(body.match(/\*\*Needed:\*\*\s*(.+)/)?.[1] || "");
    return {
      id: heading[1],
      title: heading[2].trim(),
      summary: firstParagraph(body),
      needed,
      rawBody: body,
    };
  });
}

function parseResolvedGapIds(markdown) {
  const section = markdown.split("## Resolutions & Dispositions")[1] || "";
  return new Set(
    [...section.matchAll(/^\s*-\s+\*\*(G-[0-9A-Z]+)[^*]*\*\*\s+—\s+✅ RESOLVED/gm)].map((match) => match[1]),
  );
}

function parseOpenInboxItems(markdown) {
  const openSection = markdown.split("## Open")[1]?.split("## Resolved")[0] || "";
  const matches = [...openSection.matchAll(/^### \[OPEN\] #(\d+) — (.+)$/gm)];
  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? openSection.length;
    const body = openSection.slice(start, end).trim();
    const detailLine = body.split("\n").find((line) => line.startsWith("- Need:")) || "";
    const details = detailLine.match(/Need:\s*(.*?)\s*·\s*Why\/impact:\s*(.*?)\s*·\s*Blocks:\s*(.*?)\s*·\s*Meanwhile:\s*(.*?)\s*·\s*Resolution/s);
    return {
      id: Number(match[1]),
      title: match[2].trim(),
      gapId: operatorGapMap[Number(match[1])] || null,
      need: details?.[1]?.trim() || "",
      whyImpact: details?.[2]?.trim() || "",
      blocks: details?.[3]?.trim() || "",
      meanwhile: details?.[4]?.trim() || "",
    };
  });
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
      sourceKeys: page.sourceKeys || page.sources || [],
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

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item) || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function parkedGapId(page) {
  const haystack = `${page.id} ${page.title} ${(page.sourceKeys || []).join(" ")}`.toLowerCase();
  if (/depth|referral|syn-172|syn-118/.test(haystack)) return "G-003";
  return null;
}

function pageRef(page) {
  return {
    id: page.id,
    title: page.title,
    section: page.section,
    track: page.track,
    status: page.status,
    routeSource: page.routeSource,
  };
}

function priorityScore(priority) {
  return priorityScores[priority] || 10;
}

const args = parseArgs(process.argv.slice(2));
const gaps = parseGaps(fs.readFileSync(args.gaps, "utf8"));
const resolvedGapIds = parseResolvedGapIds(fs.readFileSync(args.gaps, "utf8"));
const questionRoutes = readJson(args.questionRoutes);
const navigation = readJson(args.navigationTree);
const authoredIndex = readJson(args.authoredIndex);
const searchIndex = readJson(args.searchIndex);
const legacyCorpus = readLegacyCorpus(args.answerCorpus);
const sourceCatalog = readJson(args.sourceCatalog);
const operatorItems = parseOpenInboxItems(fs.readFileSync(args.operatorInbox, "utf8"));
const pagesById = pageUniverse({ authoredIndex, searchIndex, legacyCorpus });
const sourceByKey = sourceCatalog.sourceByKey || {};
const questionSignals = questionRoutes.reconciliation || [];
const parkedSignals = (navigation.parkedPages || []).filter((page) => page.status === "needs-reconciliation");

const gapIds = new Set(gaps.map((gap) => gap.id));
const missingQuestionGapIds = questionSignals.filter((signal) => !gapIds.has(signal.gapId)).map((signal) => ({ question: signal.question, gapId: signal.gapId }));
const missingOperatorGapIds = operatorItems.filter((item) => item.gapId && !gapIds.has(item.gapId)).map((item) => ({ operatorItemId: item.id, gapId: item.gapId }));

const items = gaps.map((gap) => {
  const meta = gapMeta[gap.id] || { category: "General", priority: "P2", sourceKeys: [], relatedPageIds: [] };
  const linkedQuestions = questionSignals
    .filter((signal) => signal.gapId === gap.id)
    .map((signal) => ({
      id: signal.id,
      question: signal.question,
      notes: signal.notes,
    }));
  const linkedOperatorItems = operatorItems
    .filter((item) => item.gapId === gap.id)
    .map((item) => ({
      id: item.id,
      title: item.title,
      need: item.need,
      blocks: item.blocks,
    }));
  const linkedParkedPages = parkedSignals
    .filter((page) => parkedGapId(page) === gap.id)
    .map((page) => ({
      id: page.id,
      title: page.title,
      file: page.file,
      sourceKeys: page.sourceKeys || [],
    }));
  const sourceKeys = unique([...meta.sourceKeys, ...linkedParkedPages.flatMap((page) => page.sourceKeys || [])]);
  const relatedPageIds = unique([...(meta.relatedPageIds || []), ...linkedParkedPages.map((page) => page.id)]);
  const missingRelatedPageIds = relatedPageIds.filter((pageId) => !pagesById.has(pageId));
  const sources = sourceSummaries(sourceKeys, sourceByKey);
  const missingSourceKeys = sources.filter((source) => source.missing).map((source) => source.key);
  const score =
    priorityScore(meta.priority) +
    linkedOperatorItems.length * 12 +
    linkedQuestions.length * 5 +
    linkedParkedPages.length * 4 +
    (missingRelatedPageIds.length || missingSourceKeys.length ? -20 : 0);

  const resolvedByBody = /\*\*Disposition:\*\*\s*Resolved for v1/i.test(gap.rawBody);
  const resolved = (resolvedGapIds.has(gap.id) || resolvedByBody) && !linkedOperatorItems.length;

  return {
    id: `queue-${gap.id.toLowerCase()}`,
    gapId: gap.id,
    title: gap.title,
    type: "documented-gap",
    status: linkedOperatorItems.length ? "operator-parked" : resolved ? "resolved" : "open",
    priority: meta.priority,
    priorityScore: score,
    category: meta.category,
    summary: gap.summary,
    needed: gap.needed,
    resolved,
    sourceKeys,
    sources,
    relatedPageIds,
    relatedPages: relatedPageIds.map((pageId) => pagesById.get(pageId)).filter(Boolean).map(pageRef),
    linkedQuestions,
    linkedOperatorItems,
    linkedParkedPages,
    missingRelatedPageIds,
    missingSourceKeys,
  };
}).sort((a, b) => b.priorityScore - a.priorityScore || a.gapId.localeCompare(b.gapId));

const missingRelatedPageIds = items.flatMap((item) => item.missingRelatedPageIds.map((pageId) => ({ itemId: item.id, pageId })));
const missingSourceKeys = items.flatMap((item) => item.missingSourceKeys.map((sourceKey) => ({ itemId: item.id, sourceKey })));

if (missingQuestionGapIds.length) {
  throw new Error(`Question reconciliation rows point at unknown gaps: ${missingQuestionGapIds.map((item) => `${item.question} -> ${item.gapId}`).join("; ")}`);
}
if (missingOperatorGapIds.length) {
  throw new Error(`Operator inbox rows map to unknown gaps: ${missingOperatorGapIds.map((item) => `#${item.operatorItemId} -> ${item.gapId}`).join("; ")}`);
}
if (missingRelatedPageIds.length) {
  throw new Error(`Gap queue related pages are missing: ${missingRelatedPageIds.map((item) => `${item.itemId} -> ${item.pageId}`).join("; ")}`);
}
if (missingSourceKeys.length) {
  throw new Error(`Gap queue source keys are missing: ${missingSourceKeys.map((item) => `${item.itemId} -> ${item.sourceKey}`).join("; ")}`);
}

const payload = {
  generatedAt: "deterministic-build",
  sourceFiles: ["GAPS.md", "QUESTIONS.md", "OPERATOR-INBOX.md", "data/navigation-tree.json", "data/source-catalog.json"],
  status: "prototype-gap-queue",
  totalItems: items.length,
  totalQuestionSignals: questionSignals.length,
  totalOperatorSignals: operatorItems.length,
  totalParkedPageSignals: parkedSignals.length,
  missingQuestionGapIds,
  missingOperatorGapIds,
  missingRelatedPageIds,
  missingSourceKeys,
  byPriority: countBy(items, (item) => item.priority),
  byCategory: countBy(items, (item) => item.category),
  byStatus: countBy(items, (item) => item.status),
  topItems: items.slice(0, 6).map((item) => item.id),
  items,
};

ensureDir(path.dirname(args.outJson));
fs.writeFileSync(args.outJson, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(args.outJs, `window.SearchBookGapQueue = ${JSON.stringify(payload)};\n`);
console.log(
  JSON.stringify(
    {
      items: payload.totalItems,
      questionSignals: payload.totalQuestionSignals,
      operatorSignals: payload.totalOperatorSignals,
      parkedPageSignals: payload.totalParkedPageSignals,
      missingPages: payload.missingRelatedPageIds.length,
      missingSources: payload.missingSourceKeys.length,
    },
    null,
    2,
  ),
);
