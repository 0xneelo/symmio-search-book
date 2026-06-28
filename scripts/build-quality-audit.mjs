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
  faq: path.join(searchBookRoot, "data", "faq.json"),
  glossary: path.join(searchBookRoot, "data", "glossary.json"),
  sourceCatalog: path.join(searchBookRoot, "data", "source-catalog.json"),
  crosslinks: path.join(searchBookRoot, "data", "crosslinks.json"),
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
const faq = fs.existsSync(args.faq)
  ? readJson(args.faq)
  : { totalEntries: 0, totalAnswerable: 0, totalUnresolved: 0, totalCategories: 0, missingPageIds: [], missingSourceKeys: [], byCategory: {} };
const glossary = fs.existsSync(args.glossary)
  ? readJson(args.glossary)
  : { terms: [], totalTerms: 0, byCategory: {}, missingPageIds: [], missingSourceKeys: [] };
const sourceCatalog = fs.existsSync(args.sourceCatalog)
  ? readJson(args.sourceCatalog)
  : { sources: [], sourceByKey: {}, totalSources: 0, duplicateKeys: [], byGroup: {}, byKind: {} };
const crosslinks = fs.existsSync(args.crosslinks)
  ? readJson(args.crosslinks)
  : { totalPages: 0, pagesWithPrevious: 0, pagesWithNext: 0, pagesWithRelated: 0, missingExplicitRelatedPageIds: [], duplicatePageIds: [], pageById: {} };
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
const sourceCatalogKeys = Object.keys(sourceCatalog.sourceByKey || {}).sort((a, b) => a.localeCompare(b));
const usedKeysMissingCatalog = usedSourceKeys.filter((key) => !sourceCatalogKeys.includes(key));
const registryKeysMissingCatalog = [...knownSourceKeys].filter((key) => !sourceCatalogKeys.includes(key));
const catalogKeysMissingRegistry = sourceCatalogKeys.filter((key) => !knownSourceKeys.has(key));
const unusedRegisteredSourceKeys = [...knownSourceKeys].filter((key) => !usedSourceKeys.includes(key));
const generatedFiles = listMarkdownFiles(args.generatedDir).length;
const authoredFiles = listMarkdownFiles(args.authoredDir).length;
const openInboxItems = parseOpenInboxItems(inboxMarkdown);
const resolvedInboxItems = parseResolvedInboxItems(inboxMarkdown);
const gaps = parseGapItems(gapMarkdown);
const answerableQuestions = parseQuestionRows(questionMarkdown, "Answerable In Prototype");
const reconciliationQuestions = parseQuestionRows(questionMarkdown, "Needs Reconciliation");
const questionRouteMissingIds = questionRoutes.missingRouteIds || [];
const faqMissingPageIds = faq.missingPageIds || [];
const faqMissingSourceKeys = faq.missingSourceKeys || [];
const faqMatchesQuestionRoutes =
  (faq.totalAnswerable || 0) === (questionRoutes.totalRoutes || 0) &&
  (faq.totalUnresolved || 0) === (questionRoutes.totalReconciliationQuestions || 0);
const glossaryMissingPageIds = glossary.missingPageIds || [];
const glossaryMissingSourceKeys = glossary.missingSourceKeys || [];
const manifestCoverage = coverageFor(manifestPages, knownSourceKeys);
const searchCoverage = coverageFor(searchIndex, knownSourceKeys);
const authoredCoverage = coverageFor(authoredPages, knownSourceKeys);
const authoredMissingBodies = authoredPages.filter((page) => !page.bodyMarkdown).map((page) => page.id);
const readerPageIds = new Set([...searchIndex.map((page) => page.id), ...authoredPages.map((page) => page.id)]);
const crosslinkPageIds = Object.keys(crosslinks.pageById || {});
const readerIdsMissingCrosslinks = [...readerPageIds].filter((pageId) => !crosslinkPageIds.includes(pageId));
const crosslinkIdsMissingReader = crosslinkPageIds.filter((pageId) => !readerPageIds.has(pageId));
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
    id: "source-catalog",
    label: "Source catalog matches registry",
    passed:
      (sourceCatalog.totalSources || 0) === knownSourceKeys.size &&
      !(sourceCatalog.duplicateKeys || []).length &&
      usedKeysMissingCatalog.length === 0 &&
      registryKeysMissingCatalog.length === 0 &&
      catalogKeysMissingRegistry.length === 0,
    detail: `${sourceCatalog.totalSources || 0} catalog sources, ${knownSourceKeys.size} registry keys, ${usedKeysMissingCatalog.length} used keys missing catalog`,
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
    id: "local-faq-routes",
    label: "Local FAQ seed routes resolve",
    passed:
      faqMatchesQuestionRoutes &&
      faqMissingPageIds.length === 0 &&
      faqMissingSourceKeys.length === 0 &&
      (faq.totalAnswerable || 0) > 0 &&
      faq.seedSource === "local-question-ledger",
    detail: `${faq.totalAnswerable || 0} answerable FAQs, ${faq.totalUnresolved || 0} unresolved gaps, ${faqMissingPageIds.length} missing page ids, ${faqMissingSourceKeys.length} missing source keys`,
  },
  {
    id: "glossary-routes",
    label: "Glossary terms resolve",
    passed: glossaryMissingPageIds.length === 0 && glossaryMissingSourceKeys.length === 0 && (glossary.totalTerms || 0) >= 25,
    detail: `${glossary.totalTerms || 0} terms, ${Object.keys(glossary.byCategory || {}).length} categories, ${glossaryMissingPageIds.length} missing page ids, ${glossaryMissingSourceKeys.length} missing source keys`,
  },
  {
    id: "reader-crosslinks",
    label: "Reader crosslinks resolve",
    passed:
      (crosslinks.totalPages || 0) === readerPageIds.size &&
      readerIdsMissingCrosslinks.length === 0 &&
      crosslinkIdsMissingReader.length === 0 &&
      !(crosslinks.duplicatePageIds || []).length &&
      !(crosslinks.missingExplicitRelatedPageIds || []).length &&
      (crosslinks.pagesWithPrevious || 0) >= readerPageIds.size - 1 &&
      (crosslinks.pagesWithNext || 0) >= readerPageIds.size - 1,
    detail: `${crosslinks.totalPages || 0} crosslinked pages, ${readerPageIds.size} reader routes, ${(crosslinks.missingExplicitRelatedPageIds || []).length} broken explicit related routes`,
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
    localFaqEntries: faq.totalEntries || 0,
    localFaqAnswerable: faq.totalAnswerable || 0,
    localFaqUnresolved: faq.totalUnresolved || 0,
    localFaqCategories: faq.totalCategories || Object.keys(faq.byCategory || {}).length,
    glossaryTerms: glossary.totalTerms || 0,
    glossaryCategories: Object.keys(glossary.byCategory || {}).length,
    sourceCatalogEntries: sourceCatalog.totalSources || 0,
    linkedSourceCatalogEntries: (sourceCatalog.sources || []).filter((source) => source.href).length,
    crosslinkedReaderPages: crosslinks.totalPages || 0,
    readerPagesWithPrevious: crosslinks.pagesWithPrevious || 0,
    readerPagesWithNext: crosslinks.pagesWithNext || 0,
    readerPagesWithRelated: crosslinks.pagesWithRelated || 0,
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
  sourceCatalogCoverage: {
    totalSources: sourceCatalog.totalSources || 0,
    linkedSources: (sourceCatalog.sources || []).filter((source) => source.href).length,
    byGroup: sourceCatalog.byGroup || {},
    byKind: sourceCatalog.byKind || {},
    usedKeysMissingCatalog,
    registryKeysMissingCatalog,
    catalogKeysMissingRegistry,
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
  faqCoverage: {
    seedSource: faq.seedSource || "missing",
    status: faq.status || "missing",
    totalEntries: faq.totalEntries || 0,
    totalAnswerable: faq.totalAnswerable || 0,
    totalUnresolved: faq.totalUnresolved || 0,
    totalCategories: faq.totalCategories || Object.keys(faq.byCategory || {}).length,
    byCategory: faq.byCategory || {},
    byConfidence: faq.byConfidence || {},
    byRouteSource: faq.byRouteSource || {},
    missingPageIds: faqMissingPageIds,
    missingSourceKeys: faqMissingSourceKeys,
    matchesQuestionRoutes: faqMatchesQuestionRoutes,
  },
  glossaryCoverage: {
    totalTerms: glossary.totalTerms || 0,
    byCategory: glossary.byCategory || {},
    alphabet: glossary.alphabet || {},
    missingPageIds: glossaryMissingPageIds,
    missingSourceKeys: glossaryMissingSourceKeys,
  },
  crosslinkCoverage: {
    totalPages: crosslinks.totalPages || 0,
    pagesWithPrevious: crosslinks.pagesWithPrevious || 0,
    pagesWithNext: crosslinks.pagesWithNext || 0,
    pagesWithRelated: crosslinks.pagesWithRelated || 0,
    bySection: crosslinks.bySection || {},
    byRouteSource: crosslinks.byRouteSource || {},
    missingExplicitRelatedPageIds: crosslinks.missingExplicitRelatedPageIds || [],
    duplicatePageIds: crosslinks.duplicatePageIds || [],
    readerIdsMissingCrosslinks,
    crosslinkIdsMissingReader,
  },
  unresolved: {
    operatorInbox: openInboxItems,
    gaps,
    journeyMissingPageIds,
    questionRouteMissingIds,
    faqMissingPageIds,
    faqMissingSourceKeys,
    glossaryMissingPageIds,
    glossaryMissingSourceKeys,
    usedKeysMissingCatalog,
    registryKeysMissingCatalog,
    catalogKeysMissingRegistry,
    crosslinkMissingExplicitRelatedPageIds: crosslinks.missingExplicitRelatedPageIds || [],
    readerIdsMissingCrosslinks,
    crosslinkIdsMissingReader,
    reconciliationQuestions: reconciliationQuestions.map((row) => ({ question: row[0], gap: row[1], notes: row[2] })),
  },
  nextAuditFocus: [
    "Convert generated drafts into publication-quality authored pages.",
    "Replace the local FAQ seed with Discord/Lafa-mined FAQ coverage once access is provided.",
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
