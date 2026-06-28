#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(searchBookRoot, "..", "..");

const defaults = {
  manifest: path.join(searchBookRoot, "page-manifest.json"),
  searchIndex: path.join(searchBookRoot, "data", "search-index.json"),
  authoredIndex: path.join(searchBookRoot, "data", "authored-pages.json"),
  journeys: path.join(searchBookRoot, "data", "journeys.json"),
  questionRoutes: path.join(searchBookRoot, "data", "question-routes.json"),
  navigationTree: path.join(searchBookRoot, "data", "navigation-tree.json"),
  contentStats: path.join(searchBookRoot, "data", "content-stats.json"),
  sourceRegistry: path.join(searchBookRoot, "SOURCES.md"),
  gaps: path.join(searchBookRoot, "GAPS.md"),
  questions: path.join(searchBookRoot, "QUESTIONS.md"),
  operatorInbox: path.join(repoRoot, "_specs", "app-docs", "OPERATOR-INBOX.md"),
  generatedDir: path.join(searchBookRoot, "content", "generated"),
  authoredDir: path.join(searchBookRoot, "content", "authored"),
  outJson: path.join(searchBookRoot, "data", "quality-audit.json"),
  outJs: path.join(searchBookRoot, "data", "quality-audit.js"),
};

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--out-js") args.outJs = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node src/search-book/scripts/build-quality-audit.mjs [--out-json path] [--out-js path]");
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

function readText(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function listMarkdownFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) return listMarkdownFiles(fullPath);
    if (entry.isFile() && entry.name.endsWith(".md")) return [fullPath];
    return [];
  });
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item) || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function sourceRegistryKeys(markdown) {
  return markdown
    .split("\n")
    .filter((line) => line.trim().startsWith("| `"))
    .map((line) => line.match(/`([^`]+)`/)?.[1])
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

function uniqueSourceKeys(...pageGroups) {
  return [...new Set(pageGroups.flatMap((pages) => pages.flatMap((page) => page.sourceKeys || [])))].sort((a, b) => a.localeCompare(b));
}

function coverageFor(pages, knownKeys) {
  const missingSourceKeys = pages.filter((page) => !(page.sourceKeys || []).length).map((page) => page.id);
  const missingSourceUrls = pages.filter((page) => !(page.sourceUrls || []).length).map((page) => page.id);
  const unknownSourceKeys = pages.flatMap((page) =>
    (page.sourceKeys || [])
      .filter((key) => !knownKeys.has(key))
      .map((key) => ({ pageId: page.id, sourceKey: key })),
  );
  return {
    total: pages.length,
    withSourceKeys: pages.length - missingSourceKeys.length,
    withSourceUrls: pages.length - missingSourceUrls.length,
    missingSourceKeys,
    missingSourceUrls,
    unknownSourceKeys,
  };
}

function parseOpenInboxItems(markdown) {
  const openSection = markdown.split("## Open")[1]?.split("## Resolved")[0] || "";
  return [...openSection.matchAll(/^### \[OPEN\] #(\d+) — (.+)$/gm)].map((match) => ({
    id: Number(match[1]),
    title: match[2].trim(),
  }));
}

function parseResolvedInboxItems(markdown) {
  const resolvedSection = markdown.split("## Resolved")[1]?.split("---")[0] || "";
  return [...resolvedSection.matchAll(/^### \[RESOLVED\] #(\d+) — (.+)$/gm)].map((match) => ({
    id: Number(match[1]),
    title: match[2].trim(),
  }));
}

function parseGapItems(markdown) {
  return [...markdown.matchAll(/^## (G-[0-9A-Z]+): (.+)$/gm)].map((match) => ({
    id: match[1],
    title: match[2].trim(),
  }));
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

function statusSeverity(status) {
  if (/needs-reconciliation|operator-review|missing|blocked/i.test(status)) return "blocked";
  if (/source-mapped|draft|generated/i.test(status)) return "draft";
  if (/candidate/i.test(status)) return "candidate";
  return "info";
}

const args = parseArgs(process.argv.slice(2));
const manifest = readJson(args.manifest);
const searchIndex = readJson(args.searchIndex);
const authored = readJson(args.authoredIndex);
const journeys = fs.existsSync(args.journeys) ? readJson(args.journeys) : { journeys: [], totalJourneys: 0, totalSteps: 0, missingPageIds: [] };
const questionRoutes = fs.existsSync(args.questionRoutes)
  ? readJson(args.questionRoutes)
  : { answerable: [], reconciliation: [], totalRoutes: 0, totalReconciliationQuestions: 0, missingRouteIds: [] };
const navigation = readJson(args.navigationTree);
const contentStats = readJson(args.contentStats);
const registryMarkdown = readText(args.sourceRegistry);
const gapMarkdown = readText(args.gaps);
const questionMarkdown = readText(args.questions);
const inboxMarkdown = readText(args.operatorInbox);

const manifestPages = manifest.pages || [];
const authoredPages = authored.pages || [];
const knownSourceKeys = new Set(sourceRegistryKeys(registryMarkdown));
const usedSourceKeys = uniqueSourceKeys(manifestPages, searchIndex, authoredPages);
const unknownUsedSourceKeys = usedSourceKeys.filter((key) => !knownSourceKeys.has(key));
const unusedRegisteredSourceKeys = [...knownSourceKeys].filter((key) => !usedSourceKeys.includes(key));
const generatedFiles = listMarkdownFiles(args.generatedDir).length;
const authoredFiles = listMarkdownFiles(args.authoredDir).length;
const openInboxItems = parseOpenInboxItems(inboxMarkdown);
const resolvedInboxItems = parseResolvedInboxItems(inboxMarkdown);
const gaps = parseGapItems(gapMarkdown);
const answerableQuestions = parseQuestionRows(questionMarkdown, "Answerable In Prototype");
const reconciliationQuestions = parseQuestionRows(questionMarkdown, "Needs Reconciliation");
const questionRouteMissingIds = questionRoutes.missingRouteIds || [];
const manifestCoverage = coverageFor(manifestPages, knownSourceKeys);
const searchCoverage = coverageFor(searchIndex, knownSourceKeys);
const authoredCoverage = coverageFor(authoredPages, knownSourceKeys);
const authoredMissingBodies = authoredPages.filter((page) => !page.bodyMarkdown).map((page) => page.id);
const readerPageIds = new Set([...searchIndex.map((page) => page.id), ...authoredPages.map((page) => page.id)]);
const journeyMissingPageIds = (journeys.journeys || []).flatMap((journey) =>
  (journey.steps || [])
    .filter((step) => !readerPageIds.has(step.pageId))
    .map((step) => ({ journeyId: journey.id, pageId: step.pageId })),
);
const manifestTarget = manifest.compendiumTarget?.requestedRange || "500-800 pages";
const withinTargetRange = manifestPages.length >= 500 && manifestPages.length <= 800;
const duplicateIds = manifestPages
  .map((page) => page.id)
  .filter((id, index, ids) => ids.indexOf(id) !== index);
const combinedStatusCounts = {};
for (const [status, count] of Object.entries(navigation.counts?.byStatus || {})) {
  combinedStatusCounts[status] = (combinedStatusCounts[status] || 0) + count;
}
for (const [status, count] of Object.entries(countBy(authoredPages, (page) => page.status))) {
  combinedStatusCounts[status] = (combinedStatusCounts[status] || 0) + count;
}
const statusRows = Object.entries(combinedStatusCounts).map(([status, count]) => ({ status, count, severity: statusSeverity(status) }));

const gates = [
  {
    id: "manifest-size",
    label: "500-800 page target",
    passed: withinTargetRange,
    detail: `${manifestPages.length} manifest pages for ${manifestTarget}`,
  },
  {
    id: "generated-files",
    label: "Generated files match manifest",
    passed: generatedFiles === manifestPages.length && contentStats.generatedFiles === manifestPages.length,
    detail: `${generatedFiles} markdown files, ${contentStats.generatedFiles} content-stats files, ${manifestPages.length} manifest pages`,
  },
  {
    id: "search-index",
    label: "Search index matches manifest",
    passed: searchIndex.length === manifestPages.length && contentStats.indexEntries === manifestPages.length,
    detail: `${searchIndex.length} search entries, ${contentStats.indexEntries} content-stats entries`,
  },
  {
    id: "source-keys",
    label: "Registered source-key coverage",
    passed: unknownUsedSourceKeys.length === 0 && manifestCoverage.missingSourceKeys.length === 0 && searchCoverage.missingSourceKeys.length === 0 && authoredCoverage.missingSourceKeys.length === 0,
    detail: `${usedSourceKeys.length} used keys, ${knownSourceKeys.size} registered keys, ${unknownUsedSourceKeys.length} unknown used keys`,
  },
  {
    id: "source-urls",
    label: "Primary-source URL coverage",
    passed: manifestCoverage.missingSourceUrls.length === 0 && searchCoverage.missingSourceUrls.length === 0 && authoredCoverage.missingSourceUrls.length === 0,
    detail: `${manifestCoverage.missingSourceUrls.length + searchCoverage.missingSourceUrls.length + authoredCoverage.missingSourceUrls.length} pages missing source URLs across manifest/search/authored`,
  },
  {
    id: "authored-bodies",
    label: "Authored pages carry bodies",
    passed: authoredMissingBodies.length === 0 && authoredFiles === authoredPages.length,
    detail: `${authoredPages.length} authored index pages, ${authoredFiles} authored markdown files`,
  },
  {
    id: "duplicate-manifest-ids",
    label: "Manifest IDs are unique",
    passed: duplicateIds.length === 0,
    detail: `${[...new Set(duplicateIds)].length} duplicate ids`,
  },
  {
    id: "journey-routes",
    label: "Guided journey page IDs resolve",
    passed: journeyMissingPageIds.length === 0 && (journeys.totalJourneys || 0) >= 5,
    detail: `${journeys.totalJourneys || 0} journeys, ${journeys.totalSteps || 0} steps, ${journeyMissingPageIds.length} missing page ids`,
  },
  {
    id: "question-routes",
    label: "Question ledger routes resolve",
    passed: questionRouteMissingIds.length === 0 && (questionRoutes.totalRoutes || 0) === answerableQuestions.length && (questionRoutes.totalRoutes || 0) > 0,
    detail: `${questionRoutes.totalRoutes || 0} generated routes, ${answerableQuestions.length} answerable ledger rows, ${questionRouteMissingIds.length} missing page ids`,
  },
  {
    id: "operator-inbox",
    label: "Operator-blocked threads are surfaced",
    passed: openInboxItems.length === 0,
    detail: `${openInboxItems.length} open operator items, ${resolvedInboxItems.length} resolved`,
  },
  {
    id: "discord",
    label: "Discord/Lafa corpus imported",
    passed: !openInboxItems.some((item) => /Discord|Lafa/i.test(item.title)),
    detail: openInboxItems.some((item) => /Discord|Lafa/i.test(item.title)) ? "Discord/Lafa corpus remains parked in OPERATOR-INBOX" : "No open Discord/Lafa inbox item",
  },
];

const payload = {
  generatedAt: "deterministic-build",
  manifestVersion: manifest.manifestVersion,
  targetRange: manifestTarget,
  totals: {
    manifestPages: manifestPages.length,
    generatedFiles,
    searchIndexEntries: searchIndex.length,
    authoredPublicationCandidates: authoredPages.length,
    authoredFiles,
    readerRoutablePages: searchIndex.length + authoredPages.length,
    guidedJourneys: journeys.totalJourneys || 0,
    guidedJourneySteps: journeys.totalSteps || 0,
    seededQuestionRoutes: questionRoutes.totalRoutes || 0,
    seededReconciliationQuestions: questionRoutes.totalReconciliationQuestions || 0,
    sourceRegistryKeys: knownSourceKeys.size,
    usedSourceKeys: usedSourceKeys.length,
    openOperatorItems: openInboxItems.length,
    resolvedOperatorItems: resolvedInboxItems.length,
    trackedGaps: gaps.length,
    answerablePrototypeQuestions: answerableQuestions.length,
    reconciliationQuestions: reconciliationQuestions.length,
  },
  gates,
  byStatus: {
    manifest: navigation.counts?.byStatus || {},
    authored: authored.byStatus || {},
    rows: statusRows,
  },
  bySection: {
    navigationSections: navigation.counts?.sections || navigation.sections?.length || 0,
    navigationTracks: navigation.counts?.tracks || 0,
    authored: authored.bySection || {},
  },
  sourceCoverage: {
    manifest: manifestCoverage,
    searchIndex: searchCoverage,
    authored: authoredCoverage,
    usedSourceKeys,
    unknownUsedSourceKeys,
    unusedRegisteredSourceKeys,
  },
  journeyCoverage: {
    totalJourneys: journeys.totalJourneys || 0,
    totalSteps: journeys.totalSteps || 0,
    missingPageIds: journeyMissingPageIds,
    journeyIds: (journeys.journeys || []).map((journey) => journey.id),
  },
  questionRouteCoverage: {
    totalRoutes: questionRoutes.totalRoutes || 0,
    totalReconciliationQuestions: questionRoutes.totalReconciliationQuestions || 0,
    byConfidence: questionRoutes.byConfidence || {},
    byRouteSource: questionRoutes.byRouteSource || {},
    missingRouteIds: questionRouteMissingIds,
  },
  unresolved: {
    operatorInbox: openInboxItems,
    gaps,
    journeyMissingPageIds,
    questionRouteMissingIds,
    reconciliationQuestions: reconciliationQuestions.map((row) => ({ question: row[0], gap: row[1], notes: row[2] })),
  },
  nextAuditFocus: [
    "Convert generated drafts into publication-quality authored pages.",
    "Resolve operator inbox items before final publication claims.",
    "Import Discord/Lafa Q&A once access is provided.",
    "Run final link, source, and live-market-count checks at publication time.",
  ],
};

ensureDir(path.dirname(args.outJson));
fs.writeFileSync(args.outJson, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(args.outJs, `window.SearchBookQualityAudit = ${JSON.stringify(payload)};\n`);
console.log(
  JSON.stringify(
    {
      manifestPages: payload.totals.manifestPages,
      authored: payload.totals.authoredPublicationCandidates,
      gatesPassed: payload.gates.filter((gate) => gate.passed).length,
      gatesTotal: payload.gates.length,
      openOperatorItems: payload.totals.openOperatorItems,
    },
    null,
    2,
  ),
);
