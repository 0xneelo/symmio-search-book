#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  COMPENDIUM_TARGET_LABEL,
  COMPENDIUM_TARGET_MAX,
  COMPENDIUM_TARGET_MIN,
  withinCompendiumPageTarget,
} from "./compendium-target.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const repoRoot = searchBookRoot;

const defaults = {
  manifest: path.join(searchBookRoot, "page-manifest.json"),
  searchIndex: path.join(searchBookRoot, "data", "search-index.json"),
  authoredIndex: path.join(searchBookRoot, "data", "authored-pages.json"),
  journeys: path.join(searchBookRoot, "data", "journeys.json"),
  questionRoutes: path.join(searchBookRoot, "data", "question-routes.json"),
  faq: path.join(searchBookRoot, "data", "faq.json"),
  gapQueue: path.join(searchBookRoot, "data", "gap-queue.json"),
  answerEngineContract: path.join(searchBookRoot, "data", "answer-engine-contract.json"),
  llmRagContract: path.join(searchBookRoot, "data", "llm-rag-contract.json"),
  answerValidationReport: path.join(searchBookRoot, "data", "answer-validation-report.json"),
  livingDocsEvents: path.join(searchBookRoot, "data", "living-docs-events.json"),
  answerChunks: path.join(searchBookRoot, "data", "answer-chunks.json"),
  volumeMap: path.join(searchBookRoot, "data", "volume-map.json"),
  pageStateRegistry: path.join(searchBookRoot, "data", "page-state-registry.json"),
  publicationPlan: path.join(searchBookRoot, "data", "publication-plan.json"),
  requirementMap: path.join(searchBookRoot, "data", "requirement-map.json"),
  glossary: path.join(searchBookRoot, "data", "glossary.json"),
  sourceCatalog: path.join(searchBookRoot, "data", "source-catalog.json"),
  sourceIngestion: path.join(searchBookRoot, "data", "source-ingestion.json"),
  competitiveSweep: path.join(searchBookRoot, "data", "competitive-sweep.json"),
  crosslinks: path.join(searchBookRoot, "data", "crosslinks.json"),
  navigationTree: path.join(searchBookRoot, "data", "navigation-tree.json"),
  contentStats: path.join(searchBookRoot, "data", "content-stats.json"),
  sourceRegistry: path.join(searchBookRoot, "SOURCES.md"),
  gaps: path.join(searchBookRoot, "GAPS.md"),
  questions: path.join(searchBookRoot, "QUESTIONS.md"),
  readme: path.join(searchBookRoot, "README.md"),
  operatorInbox: path.join(repoRoot, "_specs", "app-docs", "OPERATOR-INBOX.md"),
  frontendPrototype: path.join(searchBookRoot, "index.html"),
  buildOrchestrator: path.join(searchBookRoot, "scripts", "build-all.mjs"),
  packageJson: path.join(repoRoot, "package.json"),
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
const gapQueue = fs.existsSync(args.gapQueue)
  ? readJson(args.gapQueue)
  : { totalItems: 0, totalQuestionSignals: 0, totalOperatorSignals: 0, totalParkedPageSignals: 0, missingQuestionGapIds: [], missingOperatorGapIds: [], missingRelatedPageIds: [], missingSourceKeys: [], byPriority: {}, byCategory: {} };
const answerEngineContract = fs.existsSync(args.answerEngineContract)
  ? readJson(args.answerEngineContract)
  : { deterministicReady: false, llmProductionReady: false, evaluation: { totalExactRouteTests: 0, exactRouteTestsPassing: 0, totalRefusalTests: 0, refusalTestsPassing: 0, failingExactRouteIds: [], failingRefusalIds: [] } };
const llmRagContract = fs.existsSync(args.llmRagContract)
  ? readJson(args.llmRagContract)
  : { apiContractReady: false, evalHarnessReady: false, runtimeImplemented: false, llmProductionReady: false, adversarialEvaluation: { totalCases: 0, passingCases: 0, minimumRequiredBeforeProduction: 12, missingRequiredCategories: [], failingCaseIds: [] }, coverage: { unknownContextSourceKeys: [] } };
const answerValidationReport = fs.existsSync(args.answerValidationReport)
  ? readJson(args.answerValidationReport)
  : { reportReady: false, coverage: { totalFixtures: 0, passingFixtures: 0, citedAnswerFixtures: 0, groundedAdversarialFixtures: 0, refusalFixtures: 0, failingFixtures: 0 }, failureSummary: { failingFixtureIds: [], failuresByKind: {} } };
const livingDocsEvents = fs.existsSync(args.livingDocsEvents)
  ? readJson(args.livingDocsEvents)
  : {
      eventContractReady: false,
      datastoreImplemented: false,
      livingDocsProductionReady: false,
      coverage: { totalFixtures: 0, passingFixtures: 0, failingFixtures: 0 },
      failureSummary: { failingEventIds: [], failuresByKind: {} },
    };
const answerChunks = fs.existsSync(args.answerChunks)
  ? readJson(args.answerChunks)
  : { totalPages: 0, totalChunks: 0, pagesWithChunks: 0, pagesMissingChunks: [], duplicateChunkIds: [], unknownSourceKeys: [], usedSourceKeys: [], chunks: [], byRouteSource: {}, chunksByRouteSource: {} };
const volumeMap = fs.existsSync(args.volumeMap)
  ? readJson(args.volumeMap)
  : { totalVolumes: 0, totalChapters: 0, manifestPages: 0, readerPages: 0, pagesAssigned: 0, manifestWithinTarget: false, duplicatePageIds: [], unassignedPageIds: [], volumeIdsMissingPages: [], unknownSourceKeys: [], volumes: [], pageToVolume: {} };
const pageStateRegistry = fs.existsSync(args.pageStateRegistry)
  ? readJson(args.pageStateRegistry)
  : { totalPages: 0, byState: {}, pages: [], duplicatePageIds: [], unclassifiedPageIds: [], missingVolumeIds: [], internalDraftPageIds: [], warnings: [] };
const publicationPlan = fs.existsSync(args.publicationPlan)
  ? readJson(args.publicationPlan)
  : {
      planReady: false,
      totals: {
        sourceCompanionsAvailable: 0,
        sourceCompanionsQueued: 0,
        candidateReviewPages: 0,
        candidateFinalReviewReadyPages: 0,
        queueStages: 0,
      },
      sourceBlockRequiredFields: [],
      sourceCompanionQueue: [],
      byStage: {},
      byTemplate: {},
      bySuggestedAction: {},
    };
const requirementMap = fs.existsSync(args.requirementMap)
  ? readJson(args.requirementMap)
  : { totalRequirements: 0, byStatus: {}, byCategory: {}, completionReady: false, duplicateRequirementIds: [], invalidParkedRequirements: [], requirements: [], nextFocus: [] };
const glossary = fs.existsSync(args.glossary)
  ? readJson(args.glossary)
  : { terms: [], totalTerms: 0, byCategory: {}, missingPageIds: [], missingSourceKeys: [] };
const sourceCatalog = fs.existsSync(args.sourceCatalog)
  ? readJson(args.sourceCatalog)
  : { sources: [], sourceByKey: {}, totalSources: 0, duplicateKeys: [], byGroup: {}, byKind: {} };
const sourceIngestion = fs.existsSync(args.sourceIngestion)
  ? readJson(args.sourceIngestion)
  : { totalSourceRequirements: 0, byStatus: {}, byCategory: {}, sourceCompletionReady: false, duplicateRequirementIds: [], invalidParkedRequirements: [], requirements: [], missingSourceFamilies: [] };
const competitiveSweep = fs.existsSync(args.competitiveSweep)
  ? readJson(args.competitiveSweep)
  : { targetDocs: 0, targetDocsReviewed: 0, targetDocsUnverified: 0, plannedAgentLanes: 0, completedExplorerBatches: 0, completedLaneReviews: 0, completionReady: false };
const crosslinks = fs.existsSync(args.crosslinks)
  ? readJson(args.crosslinks)
  : { totalPages: 0, pagesWithPrevious: 0, pagesWithNext: 0, pagesWithRelated: 0, missingExplicitRelatedPageIds: [], duplicatePageIds: [], pageById: {} };
const navigation = readJson(args.navigationTree);
const contentStats = readJson(args.contentStats);
const registryMarkdown = readText(args.sourceRegistry);
const gapMarkdown = readText(args.gaps);
const questionMarkdown = readText(args.questions);
const readmeMarkdown = readText(args.readme);
const inboxMarkdown = readText(args.operatorInbox);
const frontendPrototype = readText(args.frontendPrototype);
const packageJson = fs.existsSync(args.packageJson) ? readJson(args.packageJson) : { scripts: {} };

const manifestPages = manifest.pages || [];
const authoredPages = authored.pages || [];
const knownSourceKeys = new Set(sourceRegistryKeys(registryMarkdown));
const usedSourceKeys = uniqueSourceKeys(manifestPages, searchIndex, authoredPages);
const unknownUsedSourceKeys = usedSourceKeys.filter((key) => !knownSourceKeys.has(key));
const sourceCatalogKeys = Object.keys(sourceCatalog.sourceByKey || {}).sort((a, b) => a.localeCompare(b));
const sourceIngestionDuplicateIds = sourceIngestion.duplicateRequirementIds || [];
const sourceIngestionInvalidParkedIds = sourceIngestion.invalidParkedRequirements || [];
const sourceIngestionRequirementIds = new Set((sourceIngestion.requirements || []).map((requirement) => requirement.id));
const competitiveSweepTargetDocs = competitiveSweep.targetDocs || 0;
const competitiveSweepReviewedDocs = competitiveSweep.targetDocsReviewed || 0;
const competitiveSweepUnverifiedDocs = competitiveSweep.targetDocsUnverified || 0;
const competitiveSweepPlannedLanes = competitiveSweep.plannedAgentLanes || 0;
const competitiveSweepCompletedBatches = competitiveSweep.completedExplorerBatches || 0;
const competitiveSweepCompletedLanes = competitiveSweep.completedLaneReviews || 0;
const usedKeysMissingCatalog = usedSourceKeys.filter((key) => !sourceCatalogKeys.includes(key));
const registryKeysMissingCatalog = [...knownSourceKeys].filter((key) => !sourceCatalogKeys.includes(key));
const catalogKeysMissingRegistry = sourceCatalogKeys.filter((key) => !knownSourceKeys.has(key));
const unusedRegisteredSourceKeys = [...knownSourceKeys].filter((key) => !usedSourceKeys.includes(key));
const generatedFiles = listMarkdownFiles(args.generatedDir).length;
const authoredFiles = listMarkdownFiles(args.authoredDir).length;
const buildOrchestratorReady =
  fs.existsSync(args.buildOrchestrator) &&
  packageJson.scripts?.["search-book:build"] === "node scripts/build-all.mjs" &&
  packageJson.scripts?.["search-book:verify"] === "node scripts/build-all.mjs --verify" &&
  readmeMarkdown.includes("node scripts/build-all.mjs --verify");
const openInboxItems = parseOpenInboxItems(inboxMarkdown);
const resolvedInboxItems = parseResolvedInboxItems(inboxMarkdown);
const gaps = parseGapItems(gapMarkdown);
const answerableQuestions = parseQuestionRows(questionMarkdown, "Answerable In Prototype");
const reconciliationQuestions = parseQuestionRows(questionMarkdown, "Needs Reconciliation");
const questionRouteMissingIds = questionRoutes.missingRouteIds || [];
const nonAuthoredQuestionRoutes = (questionRoutes.answerable || []).filter((route) => route.routeSource !== "authored");
const faqMissingPageIds = faq.missingPageIds || [];
const faqMissingSourceKeys = faq.missingSourceKeys || [];
const faqMatchesQuestionRoutes =
  (faq.totalAnswerable || 0) === (questionRoutes.totalRoutes || 0) &&
  (faq.totalUnresolved || 0) === (questionRoutes.totalReconciliationQuestions || 0);
const gapQueueMissingQuestionGapIds = gapQueue.missingQuestionGapIds || [];
const gapQueueMissingOperatorGapIds = gapQueue.missingOperatorGapIds || [];
const gapQueueMissingRelatedPageIds = gapQueue.missingRelatedPageIds || [];
const gapQueueMissingSourceKeys = gapQueue.missingSourceKeys || [];
const parkedReconciliationPages = (navigation.parkedPages || []).filter((page) => page.status === "needs-reconciliation");
const gapQueueMatchesInputs =
  (gapQueue.totalItems || 0) === gaps.length &&
  (gapQueue.totalQuestionSignals || 0) === (questionRoutes.totalReconciliationQuestions || 0) &&
  (gapQueue.totalOperatorSignals || 0) === openInboxItems.length &&
  (gapQueue.totalParkedPageSignals || 0) === parkedReconciliationPages.length;
const answerEngineEvaluation = answerEngineContract.evaluation || {};
const answerEngineFailingExactRouteIds = answerEngineEvaluation.failingExactRouteIds || [];
const answerEngineFailingRefusalIds = answerEngineEvaluation.failingRefusalIds || [];
const answerEngineCitationUnknownRoutes = answerEngineContract.citationPolicy?.exactRoutesWithUnknownSourceKeys || [];
const answerEngineRoutesWithoutLinkedSources = answerEngineContract.citationPolicy?.exactRoutesWithoutLinkedSources || [];
const answerEngineReady =
  answerEngineContract.deterministicReady === true &&
  (answerEngineEvaluation.totalExactRouteTests || 0) === (questionRoutes.totalRoutes || 0) &&
  (answerEngineEvaluation.exactRouteTestsPassing || 0) === (questionRoutes.totalRoutes || 0) &&
  (answerEngineEvaluation.totalRefusalTests || 0) === (questionRoutes.totalReconciliationQuestions || 0) &&
  (answerEngineEvaluation.refusalTestsPassing || 0) === (questionRoutes.totalReconciliationQuestions || 0) &&
  answerEngineFailingExactRouteIds.length === 0 &&
  answerEngineFailingRefusalIds.length === 0 &&
  answerEngineCitationUnknownRoutes.length === 0 &&
  answerEngineRoutesWithoutLinkedSources.length === 0;
const llmRagAdversarial = llmRagContract.adversarialEvaluation || {};
const llmRagMissingRequiredCategories = llmRagAdversarial.missingRequiredCategories || [];
const llmRagFailingCaseIds = llmRagAdversarial.failingCaseIds || [];
const llmRagUnknownContextSourceKeys = llmRagContract.coverage?.unknownContextSourceKeys || [];
const llmRagContractReady =
  llmRagContract.apiContractReady === true &&
  llmRagContract.evalHarnessReady === true &&
  llmRagContract.runtimeImplemented === true &&
  llmRagContract.llmProductionReady === false &&
  (llmRagAdversarial.totalCases || 0) >= (llmRagAdversarial.minimumRequiredBeforeProduction || 12) &&
  (llmRagAdversarial.passingCases || 0) === (llmRagAdversarial.totalCases || 0) &&
  llmRagMissingRequiredCategories.length === 0 &&
  llmRagFailingCaseIds.length === 0 &&
  llmRagUnknownContextSourceKeys.length === 0;
const answerValidationCoverage = answerValidationReport.coverage || {};
const answerValidationFailingFixtureIds = answerValidationReport.failureSummary?.failingFixtureIds || [];
const answerValidationAdversarialFixtures =
  (answerValidationCoverage.groundedAdversarialFixtures || 0) + (answerValidationCoverage.refusalFixtures || 0);
const answerValidationReportReady =
  answerValidationReport.reportReady === true &&
  (answerValidationCoverage.totalFixtures || 0) >= 20 &&
  (answerValidationCoverage.passingFixtures || 0) === (answerValidationCoverage.totalFixtures || 0) &&
  (answerValidationCoverage.citedAnswerFixtures || 0) >= 12 &&
  answerValidationAdversarialFixtures === (llmRagAdversarial.totalCases || 0) &&
  (answerValidationCoverage.failingFixtures || 0) === 0 &&
  answerValidationFailingFixtureIds.length === 0;
const livingDocsEventCoverage = livingDocsEvents.coverage || {};
const livingDocsFailingEventIds = livingDocsEvents.failureSummary?.failingEventIds || [];
const frontendServiceIntegrationImplemented =
  livingDocsEvents.frontendServiceIntegrationImplemented === true ||
  (frontendPrototype.includes("SEARCH_BOOK_ANSWER_ENGINE_URL") &&
    frontendPrototype.includes('"/api/search-book/answer"') &&
    frontendPrototype.includes('"/api/search-book/rating"') &&
    frontendPrototype.includes('"/api/search-book/insights"') &&
    frontendPrototype.includes("searchBookPrototype.serviceUrl"));
const retentionPolicyImplemented = livingDocsEvents.retentionPolicyImplemented === true;
const moderationExportImplemented = livingDocsEvents.moderationExportImplemented === true;
const corsPolicyImplemented = livingDocsEvents.corsPolicyImplemented === true;
const backupRestoreImplemented = livingDocsEvents.backupRestoreImplemented === true;
const livingDocsEventsReady =
  livingDocsEvents.eventContractReady === true &&
  livingDocsEvents.livingDocsProductionReady === false &&
  (livingDocsEventCoverage.totalFixtures || 0) >= 8 &&
  (livingDocsEventCoverage.passingFixtures || 0) === (livingDocsEventCoverage.totalFixtures || 0) &&
  (livingDocsEventCoverage.failingFixtures || 0) === 0 &&
  livingDocsFailingEventIds.length === 0 &&
  corsPolicyImplemented;
const glossaryMissingPageIds = glossary.missingPageIds || [];
const glossaryMissingSourceKeys = glossary.missingSourceKeys || [];
const manifestCoverage = coverageFor(manifestPages, knownSourceKeys);
const searchCoverage = coverageFor(searchIndex, knownSourceKeys);
const authoredCoverage = coverageFor(authoredPages, knownSourceKeys);
const authoredMissingBodies = authoredPages.filter((page) => !page.bodyMarkdown).map((page) => page.id);
const readerPageIds = new Set([...searchIndex.map((page) => page.id), ...authoredPages.map((page) => page.id)]);
const answerChunkPageIds = new Set((answerChunks.chunks || []).map((chunk) => chunk.pageId));
const answerChunkPagesMissingChunks = answerChunks.pagesMissingChunks || [];
const answerChunkDuplicateIds = answerChunks.duplicateChunkIds || [];
const answerChunkUnknownSourceKeys = answerChunks.unknownSourceKeys || [];
const readerIdsMissingAnswerChunks = [...readerPageIds].filter((pageId) => !answerChunkPageIds.has(pageId));
const volumeMapPageIds = new Set(Object.keys(volumeMap.pageToVolume || {}));
const volumeMapDuplicateIds = volumeMap.duplicatePageIds || [];
const volumeMapUnassignedIds = volumeMap.unassignedPageIds || [];
const volumeMapEmptyIds = volumeMap.volumeIdsMissingPages || [];
const volumeMapMissingOverviewIds = volumeMap.volumeIdsMissingOverview || [];
const volumeMapUnknownSourceKeys = volumeMap.unknownSourceKeys || [];
const readerIdsMissingVolumeMap = [...readerPageIds].filter((pageId) => !volumeMapPageIds.has(pageId));
const volumeMapIdsMissingReader = [...volumeMapPageIds].filter((pageId) => !readerPageIds.has(pageId));
const volumeOverviewPageIds = (volumeMap.volumes || []).map((volume) => volume.overviewPageId).filter(Boolean);
const volumeOverviewIdsMissingReader = volumeOverviewPageIds.filter((pageId) => !readerPageIds.has(pageId));
const pageStatePageIds = new Set((pageStateRegistry.pages || []).map((page) => page.id));
const pageStateDuplicateIds = pageStateRegistry.duplicatePageIds || [];
const pageStateUnclassifiedIds = pageStateRegistry.unclassifiedPageIds || [];
const pageStateMissingVolumeIds = pageStateRegistry.missingVolumeIds || [];
const readerIdsMissingPageState = [...readerPageIds].filter((pageId) => !pageStatePageIds.has(pageId));
const pageStateIdsMissingReader = [...pageStatePageIds].filter((pageId) => !readerPageIds.has(pageId));
const pageStateRegistryReady =
  (pageStateRegistry.totalPages || 0) === readerPageIds.size &&
  pageStateDuplicateIds.length === 0 &&
  pageStateUnclassifiedIds.length === 0 &&
  pageStateMissingVolumeIds.length === 0 &&
  readerIdsMissingPageState.length === 0 &&
  pageStateIdsMissingReader.length === 0 &&
  Object.keys(pageStateRegistry.byState || {}).length > 0;
const publicationPlanReady =
  publicationPlan.planReady === true &&
  (publicationPlan.totals?.sourceCompanionsQueued || 0) === (pageStateRegistry.sourceCompanionPages || 0) &&
  (publicationPlan.sourceCompanionQueue || []).length === (publicationPlan.totals?.sourceCompanionsQueued || 0) &&
  (publicationPlan.totals?.queueStages || 0) >= 4 &&
  (publicationPlan.sourceBlockRequiredFields || []).includes("sourceKey") &&
  (publicationPlan.sourceBlockRequiredFields || []).includes("sourceHref");
const authoredVolumeCounts = (volumeMap.volumes || []).map((volume) => ({
  id: volume.id,
  title: volume.title,
  authoredPages: volume.authoredPages || 0,
}));
const volumesMissingAuthoredPages = authoredVolumeCounts.filter((volume) => volume.authoredPages === 0);
const maxAuthoredPagesInSingleVolume = authoredVolumeCounts.reduce((max, volume) => Math.max(max, volume.authoredPages), 0);
const authoredVolumeSpreadReady =
  authoredVolumeCounts.length > 0 &&
  volumesMissingAuthoredPages.length === 0 &&
  maxAuthoredPagesInSingleVolume < Math.ceil(Math.max(authoredPages.length, 1) / 2);
const requirementDuplicateIds = requirementMap.duplicateRequirementIds || [];
const invalidParkedRequirementIds = requirementMap.invalidParkedRequirements || [];
const requirementIds = new Set((requirementMap.requirements || []).map((requirement) => requirement.id));
const crosslinkPageIds = Object.keys(crosslinks.pageById || {});
const readerIdsMissingCrosslinks = [...readerPageIds].filter((pageId) => !crosslinkPageIds.includes(pageId));
const crosslinkIdsMissingReader = crosslinkPageIds.filter((pageId) => !readerPageIds.has(pageId));
const journeyMissingPageIds = (journeys.journeys || []).flatMap((journey) =>
  (journey.steps || [])
    .filter((step) => !readerPageIds.has(step.pageId))
    .map((step) => ({ journeyId: journey.id, pageId: step.pageId })),
);
const manifestTarget = manifest.compendiumTarget?.requestedRange || COMPENDIUM_TARGET_LABEL;
const manifestTargetMinimum = manifest.compendiumTarget?.minimumPages || COMPENDIUM_TARGET_MIN;
const manifestTargetMaximum = manifest.compendiumTarget?.maximumPages || COMPENDIUM_TARGET_MAX;
const withinTargetRange =
  manifestTargetMinimum === COMPENDIUM_TARGET_MIN && manifestTargetMaximum === COMPENDIUM_TARGET_MAX
    ? withinCompendiumPageTarget(manifestPages.length)
    : manifestPages.length >= manifestTargetMinimum && manifestPages.length <= manifestTargetMaximum;
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
    id: "reproducible-build",
    label: "Reproducible build orchestrator is available",
    passed: buildOrchestratorReady,
    detail: buildOrchestratorReady
      ? "build-all.mjs plus npm search-book build/verify aliases are available"
      : "missing build-all.mjs, README verification command, or npm search-book aliases",
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
    id: "source-ingestion",
    label: "Required source families are ingested",
    passed:
      (sourceIngestion.totalSourceRequirements || 0) >= 12 &&
      sourceIngestionRequirementIds.size === (sourceIngestion.totalSourceRequirements || 0) &&
      sourceIngestionDuplicateIds.length === 0 &&
      sourceIngestionInvalidParkedIds.length === 0 &&
      sourceIngestion.sourceCompletionReady === true,
    detail: `${sourceIngestion.byStatus?.complete || 0}/${sourceIngestion.totalSourceRequirements || 0} complete, ${sourceIngestion.byStatus?.partial || 0} partial, ${sourceIngestion.byStatus?.parked || 0} parked, ${sourceIngestion.byStatus?.missing || 0} missing`,
  },
  {
    id: "competitive-sweep",
    label: "Competitive docs benchmark is tracked",
    passed:
      competitiveSweepTargetDocs >= 50 &&
      competitiveSweepPlannedLanes >= 25 &&
      competitiveSweepCompletedBatches >= 5 &&
      competitiveSweepCompletedLanes >= 25 &&
      competitiveSweepReviewedDocs >= 45,
    detail: `${competitiveSweepReviewedDocs}/${competitiveSweepTargetDocs} official docs reviewed, ${competitiveSweepUnverifiedDocs} unverified, ${competitiveSweepCompletedBatches} explorer batches, ${competitiveSweepCompletedLanes}/${competitiveSweepPlannedLanes} lanes`,
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
    id: "authored-question-routes",
    label: "Answerable seed questions use authored pages",
    passed: questionRouteMissingIds.length === 0 && (questionRoutes.totalRoutes || 0) > 0 && nonAuthoredQuestionRoutes.length === 0,
    detail: `${(questionRoutes.totalRoutes || 0) - nonAuthoredQuestionRoutes.length}/${questionRoutes.totalRoutes || 0} seed routes use authored pages, ${nonAuthoredQuestionRoutes.length} generated/curated fallbacks`,
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
    id: "gap-queue",
    label: "Living-docs gap queue resolves",
    passed:
      gapQueueMatchesInputs &&
      gapQueueMissingQuestionGapIds.length === 0 &&
      gapQueueMissingOperatorGapIds.length === 0 &&
      gapQueueMissingRelatedPageIds.length === 0 &&
      gapQueueMissingSourceKeys.length === 0 &&
      (gapQueue.totalItems || 0) > 0,
    detail: `${gapQueue.totalItems || 0} queue items, ${gapQueue.totalQuestionSignals || 0} question signals, ${gapQueue.totalOperatorSignals || 0} operator signals, ${gapQueue.totalParkedPageSignals || 0} parked pages`,
  },
  {
    id: "deterministic-answer-engine",
    label: "Deterministic answer engine contract resolves",
    passed: answerEngineReady,
    detail: `${answerEngineEvaluation.exactRouteTestsPassing || 0}/${answerEngineEvaluation.totalExactRouteTests || 0} exact routes, ${answerEngineEvaluation.refusalTestsPassing || 0}/${answerEngineEvaluation.totalRefusalTests || 0} refusal tests, LLM production ready ${answerEngineContract.llmProductionReady ? "yes" : "no"}`,
  },
  {
    id: "llm-rag-contract",
    label: "LLM RAG API contract and adversarial evals are specified",
    passed: llmRagContractReady,
    detail: `${llmRagAdversarial.passingCases || 0}/${llmRagAdversarial.totalCases || 0} adversarial cases, contract ready ${llmRagContract.apiContractReady ? "yes" : "no"}, runtime implemented ${llmRagContract.runtimeImplemented ? "yes" : "no"}, production ready ${llmRagContract.llmProductionReady ? "yes" : "no"}`,
  },
  {
    id: "answer-validation-harness",
    label: "Answer validation harness resolves cited and refusal fixtures",
    passed: answerValidationReportReady,
    detail: `${answerValidationCoverage.passingFixtures || 0}/${answerValidationCoverage.totalFixtures || 0} fixtures, ${answerValidationCoverage.citedAnswerFixtures || 0} cited answers, ${answerValidationCoverage.groundedAdversarialFixtures || 0} grounded adversarial answers, ${answerValidationCoverage.refusalFixtures || 0} refusals, ${answerValidationCoverage.failingFixtures || 0} failing`,
  },
  {
    id: "living-docs-events",
    label: "Living-docs question, rating, and gap events validate",
    passed: livingDocsEventsReady,
    detail: `${livingDocsEventCoverage.passingFixtures || 0}/${livingDocsEventCoverage.totalFixtures || 0} fixtures, contract ready ${livingDocsEvents.eventContractReady ? "yes" : "no"}, datastore implemented ${livingDocsEvents.datastoreImplemented ? "yes" : "no"}, frontend service bridge ${frontendServiceIntegrationImplemented ? "yes" : "no"}, retention policy ${retentionPolicyImplemented ? "yes" : "no"}, moderation export ${moderationExportImplemented ? "yes" : "no"}, CORS allowlist ${corsPolicyImplemented ? "yes" : "no"}, backup/restore ${backupRestoreImplemented ? "yes" : "no"}, production ready ${livingDocsEvents.livingDocsProductionReady ? "yes" : "no"}`,
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
    id: "answer-chunks",
    label: "Answer retrieval chunks resolve",
    passed:
      (answerChunks.totalPages || 0) >= readerPageIds.size &&
      (answerChunks.totalChunks || 0) >= (answerChunks.totalPages || 0) &&
      (answerChunks.pagesWithChunks || 0) === (answerChunks.totalPages || 0) &&
      answerChunkPagesMissingChunks.length === 0 &&
      answerChunkDuplicateIds.length === 0 &&
      answerChunkUnknownSourceKeys.length === 0 &&
      readerIdsMissingAnswerChunks.length === 0,
    detail: `${answerChunks.totalPages || 0} pages, ${answerChunks.totalChunks || 0} chunks, ${answerChunkUnknownSourceKeys.length} unknown source keys, ${readerIdsMissingAnswerChunks.length} reader ids missing chunks`,
  },
  {
    id: "volume-map",
    label: "Compendium volume map resolves",
    passed:
      (volumeMap.totalVolumes || 0) >= 6 &&
      (volumeMap.totalChapters || 0) >= 40 &&
      (volumeMap.manifestPages || 0) === manifestPages.length &&
      volumeMap.manifestWithinTarget === withinTargetRange &&
      (volumeMap.readerPages || 0) === readerPageIds.size &&
      (volumeMap.pagesAssigned || 0) === readerPageIds.size &&
      volumeMapDuplicateIds.length === 0 &&
      volumeMapUnassignedIds.length === 0 &&
      volumeMapEmptyIds.length === 0 &&
      volumeMapMissingOverviewIds.length === 0 &&
      volumeMapUnknownSourceKeys.length === 0 &&
      readerIdsMissingVolumeMap.length === 0 &&
      volumeMapIdsMissingReader.length === 0 &&
      volumeOverviewPageIds.length === (volumeMap.totalVolumes || 0) &&
      volumeOverviewIdsMissingReader.length === 0,
    detail: `${volumeMap.totalVolumes || 0} volumes, ${volumeMap.totalChapters || 0} chapters, ${volumeOverviewPageIds.length} overview pages, ${volumeMap.pagesAssigned || 0}/${readerPageIds.size} reader pages assigned, manifest target ${volumeMap.manifestWithinTarget ? "met" : "open"}`,
  },
  {
    id: "authored-volume-spread",
    label: "Authored pages are spread across volumes",
    passed: authoredVolumeSpreadReady,
    detail: `${authoredVolumeCounts.filter((volume) => volume.authoredPages > 0).length}/${authoredVolumeCounts.length} volumes have authored pages; max authored pages in one volume is ${maxAuthoredPagesInSingleVolume}/${authoredPages.length}`,
  },
  {
    id: "page-state-registry",
    label: "Reader pages have launch states",
    passed: pageStateRegistryReady,
    detail: `${pageStateRegistry.totalPages || 0}/${readerPageIds.size} reader pages classified; ${pageStateRegistry.publishedPages || 0} published, ${pageStateRegistry.candidatePages || 0} candidates, ${pageStateRegistry.sourceCompanionPages || 0} source companions, ${pageStateRegistry.internalDraftPages || 0} internal drafts`,
  },
  {
    id: "publication-plan",
    label: "Source companions have a publication authoring plan",
    passed: publicationPlanReady,
    detail: `${publicationPlan.totals?.sourceCompanionsQueued || 0}/${pageStateRegistry.sourceCompanionPages || 0} source companions queued, ${publicationPlan.totals?.sourceCompanionsCoveredByAuthoredPages || 0} covered by authored pages, ${publicationPlan.totals?.sourceCompanionsNeedingAuthoredCoverage || 0} needing authored coverage, ${publicationPlan.totals?.candidateReviewPages || 0} candidate review pages, ${publicationPlan.totals?.candidateFinalReviewReadyPages || 0} final-review ready, ${publicationPlan.totals?.queueStages || 0} stages`,
  },
  {
    id: "requirement-map",
    label: "Definition-of-done requirements are tracked",
    passed:
      (requirementMap.totalRequirements || 0) >= 12 &&
      requirementDuplicateIds.length === 0 &&
      invalidParkedRequirementIds.length === 0 &&
      requirementIds.size === (requirementMap.totalRequirements || 0),
    detail: `${requirementMap.byStatus?.complete || 0}/${requirementMap.totalRequirements || 0} complete, ${requirementMap.byStatus?.partial || 0} partial, ${requirementMap.byStatus?.parked || 0} parked, ${requirementMap.byStatus?.missing || 0} missing`,
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
  targetMinimumPages: manifestTargetMinimum,
  targetMaximumPages: manifestTargetMaximum,
  totals: {
    manifestPages: manifestPages.length,
    manifestTargetMinimum,
    manifestTargetMaximum,
    manifestWithinTarget: withinTargetRange,
    generatedFiles,
    buildOrchestratorReady,
    searchIndexEntries: searchIndex.length,
    authoredPublicationCandidates: authoredPages.length,
    authoredFiles,
    readerRoutablePages: searchIndex.length + authoredPages.length,
    guidedJourneys: journeys.totalJourneys || 0,
    guidedJourneySteps: journeys.totalSteps || 0,
    seededQuestionRoutes: questionRoutes.totalRoutes || 0,
    seededAuthoredQuestionRoutes: (questionRoutes.totalRoutes || 0) - nonAuthoredQuestionRoutes.length,
    seededReconciliationQuestions: questionRoutes.totalReconciliationQuestions || 0,
    localFaqEntries: faq.totalEntries || 0,
    localFaqAnswerable: faq.totalAnswerable || 0,
    localFaqUnresolved: faq.totalUnresolved || 0,
    localFaqCategories: faq.totalCategories || Object.keys(faq.byCategory || {}).length,
    gapQueueItems: gapQueue.totalItems || 0,
    gapQueueQuestionSignals: gapQueue.totalQuestionSignals || 0,
    gapQueueOperatorSignals: gapQueue.totalOperatorSignals || 0,
    gapQueueParkedPageSignals: gapQueue.totalParkedPageSignals || 0,
    gapQueueCategories: Object.keys(gapQueue.byCategory || {}).length,
    answerEngineExactRouteTests: answerEngineEvaluation.totalExactRouteTests || 0,
    answerEngineExactRouteTestsPassing: answerEngineEvaluation.exactRouteTestsPassing || 0,
    answerEngineRefusalTests: answerEngineEvaluation.totalRefusalTests || 0,
    answerEngineRefusalTestsPassing: answerEngineEvaluation.refusalTestsPassing || 0,
    answerEngineDeterministicReady: answerEngineContract.deterministicReady || false,
    answerEngineLlmProductionReady: answerEngineContract.llmProductionReady || false,
    llmRagApiContractReady: llmRagContract.apiContractReady || false,
    llmRagEvalHarnessReady: llmRagContract.evalHarnessReady || false,
    llmRagRuntimeImplemented: llmRagContract.runtimeImplemented || false,
    llmRagProductionReady: llmRagContract.llmProductionReady || false,
    llmRagAdversarialCases: llmRagAdversarial.totalCases || 0,
    llmRagAdversarialCasesPassing: llmRagAdversarial.passingCases || 0,
    answerValidationFixtures: answerValidationCoverage.totalFixtures || 0,
    answerValidationFixturesPassing: answerValidationCoverage.passingFixtures || 0,
    answerValidationCitedAnswerFixtures: answerValidationCoverage.citedAnswerFixtures || 0,
    answerValidationGroundedAdversarialFixtures: answerValidationCoverage.groundedAdversarialFixtures || 0,
    answerValidationRefusalFixtures: answerValidationCoverage.refusalFixtures || 0,
    answerValidationReportReady: answerValidationReport.reportReady || false,
    livingDocsEventContractReady: livingDocsEvents.eventContractReady || false,
    livingDocsDatastoreImplemented: livingDocsEvents.datastoreImplemented || false,
    livingDocsFrontendServiceIntegrationImplemented: frontendServiceIntegrationImplemented,
    livingDocsRetentionPolicyImplemented: retentionPolicyImplemented,
    livingDocsModerationExportImplemented: moderationExportImplemented,
    livingDocsCorsPolicyImplemented: corsPolicyImplemented,
    livingDocsBackupRestoreImplemented: backupRestoreImplemented,
    livingDocsProductionReady: livingDocsEvents.livingDocsProductionReady || false,
    livingDocsEventFixtures: livingDocsEventCoverage.totalFixtures || 0,
    livingDocsEventFixturesPassing: livingDocsEventCoverage.passingFixtures || 0,
    livingDocsEventFixturesFailing: livingDocsEventCoverage.failingFixtures || 0,
    glossaryTerms: glossary.totalTerms || 0,
    glossaryCategories: Object.keys(glossary.byCategory || {}).length,
    sourceCatalogEntries: sourceCatalog.totalSources || 0,
    linkedSourceCatalogEntries: (sourceCatalog.sources || []).filter((source) => source.href).length,
    sourceIngestionRequirements: sourceIngestion.totalSourceRequirements || 0,
    sourceIngestionComplete: sourceIngestion.byStatus?.complete || 0,
    sourceIngestionPartial: sourceIngestion.byStatus?.partial || 0,
    sourceIngestionParked: sourceIngestion.byStatus?.parked || 0,
    sourceIngestionMissing: sourceIngestion.byStatus?.missing || 0,
    sourceIngestionReady: sourceIngestion.sourceCompletionReady || false,
    competitiveSweepTargetDocs,
    competitiveSweepReviewedDocs,
    competitiveSweepUnverifiedDocs,
    competitiveSweepPlannedLanes,
    competitiveSweepCompletedLanes,
    competitiveSweepCompletedBatches,
    competitiveSweepReady: competitiveSweep.completionReady || false,
    crosslinkedReaderPages: crosslinks.totalPages || 0,
    readerPagesWithPrevious: crosslinks.pagesWithPrevious || 0,
    readerPagesWithNext: crosslinks.pagesWithNext || 0,
    readerPagesWithRelated: crosslinks.pagesWithRelated || 0,
    answerChunkPages: answerChunks.totalPages || 0,
    answerChunks: answerChunks.totalChunks || 0,
    answerChunkSourceKeys: (answerChunks.usedSourceKeys || []).length,
    compendiumVolumes: volumeMap.totalVolumes || 0,
    compendiumChapters: volumeMap.totalChapters || 0,
    compendiumVolumesWithAuthoredPages: authoredVolumeCounts.filter((volume) => volume.authoredPages > 0).length,
    compendiumMaxAuthoredPagesInSingleVolume: maxAuthoredPagesInSingleVolume,
    compendiumVolumeOverviews: volumeOverviewPageIds.length,
    compendiumVolumeReaderPages: volumeMap.readerPages || 0,
    compendiumVolumeAssignedPages: volumeMap.pagesAssigned || 0,
    pageStatePages: pageStateRegistry.totalPages || 0,
    pageStatePublishedPages: pageStateRegistry.publishedPages || 0,
    pageStateCandidatePages: pageStateRegistry.candidatePages || 0,
    pageStatePublicCandidatePages: pageStateRegistry.publicCandidatePages || 0,
    pageStateSourceCompanionPages: pageStateRegistry.sourceCompanionPages || 0,
    pageStateInternalDraftPages: pageStateRegistry.internalDraftPages || 0,
    pageStatePublicNavigationPages: pageStateRegistry.publicNavigationPages || 0,
    pageStateRetrievalEligiblePages: pageStateRegistry.retrievalEligiblePages || 0,
    publicationPlanReady,
    publicationPlanQueuedSourceCompanions: publicationPlan.totals?.sourceCompanionsQueued || 0,
    publicationPlanCandidateReviewPages: publicationPlan.totals?.candidateReviewPages || 0,
    publicationPlanCandidateFinalReviewReadyPages: publicationPlan.totals?.candidateFinalReviewReadyPages || 0,
    publicationPlanStages: publicationPlan.totals?.queueStages || 0,
    completionRequirements: requirementMap.totalRequirements || 0,
    completionRequirementsComplete: requirementMap.byStatus?.complete || 0,
    completionRequirementsPartial: requirementMap.byStatus?.partial || 0,
    completionRequirementsParked: requirementMap.byStatus?.parked || 0,
    completionRequirementsMissing: requirementMap.byStatus?.missing || 0,
    completionReady: requirementMap.completionReady || false,
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
  sourceIngestionCoverage: {
    status: sourceIngestion.status || "missing",
    sourceCompletionReady: sourceIngestion.sourceCompletionReady || false,
    totalSourceRequirements: sourceIngestion.totalSourceRequirements || 0,
    byStatus: sourceIngestion.byStatus || {},
    byCategory: sourceIngestion.byCategory || {},
    openOperatorItems: sourceIngestion.openOperatorItems || [],
    missingSourceFamilies: sourceIngestion.missingSourceFamilies || [],
    duplicateRequirementIds: sourceIngestionDuplicateIds,
    invalidParkedRequirements: sourceIngestionInvalidParkedIds,
  },
  competitiveSweepCoverage: {
    status: competitiveSweep.status || "missing",
    completionReady: competitiveSweep.completionReady || false,
    completionStatusReason: competitiveSweep.completionStatusReason || "",
    targetDocs: competitiveSweepTargetDocs,
    targetDocsReviewed: competitiveSweepReviewedDocs,
    targetDocsUnverified: competitiveSweepUnverifiedDocs,
    plannedAgentLanes: competitiveSweepPlannedLanes,
    completedLaneReviews: competitiveSweepCompletedLanes,
    completedExplorerBatches: competitiveSweepCompletedBatches,
    activeExplorerBatches: competitiveSweep.activeExplorerBatches || 0,
    byCategory: competitiveSweep.byCategory || {},
    byStatus: competitiveSweep.byStatus || {},
    blockedTargets: competitiveSweep.blockedTargets || [],
    synthesisFindings: competitiveSweep.synthesisFindings || [],
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
    nonAuthoredQuestionRoutes,
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
  gapQueueCoverage: {
    status: gapQueue.status || "missing",
    totalItems: gapQueue.totalItems || 0,
    totalQuestionSignals: gapQueue.totalQuestionSignals || 0,
    totalOperatorSignals: gapQueue.totalOperatorSignals || 0,
    totalParkedPageSignals: gapQueue.totalParkedPageSignals || 0,
    byPriority: gapQueue.byPriority || {},
    byCategory: gapQueue.byCategory || {},
    byStatus: gapQueue.byStatus || {},
    topItems: gapQueue.topItems || [],
    missingQuestionGapIds: gapQueueMissingQuestionGapIds,
    missingOperatorGapIds: gapQueueMissingOperatorGapIds,
    missingRelatedPageIds: gapQueueMissingRelatedPageIds,
    missingSourceKeys: gapQueueMissingSourceKeys,
    matchesInputs: gapQueueMatchesInputs,
  },
  answerEngineCoverage: {
    status: answerEngineContract.status || "missing",
    contractVersion: answerEngineContract.contractVersion || "",
    deterministicReady: answerEngineContract.deterministicReady || false,
    llmProductionReady: answerEngineContract.llmProductionReady || false,
    exactRouteTests: answerEngineEvaluation.totalExactRouteTests || 0,
    exactRouteTestsPassing: answerEngineEvaluation.exactRouteTestsPassing || 0,
    refusalTests: answerEngineEvaluation.totalRefusalTests || 0,
    refusalTestsPassing: answerEngineEvaluation.refusalTestsPassing || 0,
    exactRoutesByPageState: answerEngineEvaluation.exactRoutesByPageState || {},
    exactRoutesByConfidence: answerEngineEvaluation.exactRoutesByConfidence || {},
    exactRoutesMissingChunks: answerEngineEvaluation.exactRoutesMissingChunks || [],
    exactRoutesInternalDraft: answerEngineEvaluation.exactRoutesInternalDraft || [],
    failingExactRouteIds: answerEngineFailingExactRouteIds,
    failingRefusalIds: answerEngineFailingRefusalIds,
    exactRoutesWithUnknownSourceKeys: answerEngineCitationUnknownRoutes,
    exactRoutesWithoutLinkedSources: answerEngineRoutesWithoutLinkedSources,
    pipeline: answerEngineContract.pipeline || [],
    storageContract: answerEngineContract.storageContract || {},
    llmReadinessContract: answerEngineContract.llmReadinessContract || {},
    warnings: answerEngineContract.warnings || [],
  },
  llmRagCoverage: {
    status: llmRagContract.status || "missing",
    contractVersion: llmRagContract.contractVersion || "",
    apiContractReady: llmRagContract.apiContractReady || false,
    evalHarnessReady: llmRagContract.evalHarnessReady || false,
    runtimeImplemented: llmRagContract.runtimeImplemented || false,
    llmProductionReady: llmRagContract.llmProductionReady || false,
    reasonLlmProductionReadyIsFalse: llmRagContract.reasonLlmProductionReadyIsFalse || "",
    provider: llmRagContract.provider || {},
    requestSchema: llmRagContract.requestSchema || {},
    retrievalContextSchema: llmRagContract.retrievalContextSchema || {},
    responseSchema: llmRagContract.responseSchema || {},
    citationSchema: llmRagContract.citationSchema || {},
    refusalSchema: llmRagContract.refusalSchema || {},
    pipeline: llmRagContract.pipeline || [],
    validationPolicy: llmRagContract.validationPolicy || {},
    gapCreationPolicy: llmRagContract.gapCreationPolicy || {},
    coverage: llmRagContract.coverage || {},
    adversarialEvaluation: {
      minimumRequiredBeforeProduction: llmRagAdversarial.minimumRequiredBeforeProduction || 12,
      requiredCategories: llmRagAdversarial.requiredCategories || [],
      missingRequiredCategories: llmRagMissingRequiredCategories,
      totalCases: llmRagAdversarial.totalCases || 0,
      passingCases: llmRagAdversarial.passingCases || 0,
      failingCaseIds: llmRagFailingCaseIds,
      byCategory: llmRagAdversarial.byCategory || {},
    },
    warnings: llmRagContract.warnings || [],
  },
  answerValidationCoverage: {
    status: answerValidationReport.status || "missing",
    reportVersion: answerValidationReport.reportVersion || "",
    reportReady: answerValidationReport.reportReady || false,
    validationPolicy: answerValidationReport.validationPolicy || {},
    coverage: answerValidationCoverage,
    failureSummary: answerValidationReport.failureSummary || {},
  },
  livingDocsEventCoverage: {
    status: livingDocsEvents.status || "missing",
    contractVersion: livingDocsEvents.contractVersion || "",
    eventContractReady: livingDocsEvents.eventContractReady || false,
    datastoreImplemented: livingDocsEvents.datastoreImplemented || false,
    frontendServiceIntegrationImplemented,
    retentionPolicyImplemented,
    moderationExportImplemented,
    corsPolicyImplemented,
    livingDocsProductionReady: livingDocsEvents.livingDocsProductionReady || false,
    reasonLivingDocsProductionReadyIsFalse: livingDocsEvents.reasonLivingDocsProductionReadyIsFalse || "",
    storage: livingDocsEvents.storage || {},
    schemas: livingDocsEvents.schemas || {},
    requiredRuntimeBehaviors: livingDocsEvents.requiredRuntimeBehaviors || [],
    coverage: livingDocsEventCoverage,
    failureSummary: livingDocsEvents.failureSummary || {},
    productionBoundary: livingDocsEvents.productionBoundary || {},
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
  answerChunkCoverage: {
    status: answerChunks.status || "missing",
    chunking: answerChunks.chunking || {},
    totalPages: answerChunks.totalPages || 0,
    totalChunks: answerChunks.totalChunks || 0,
    pagesWithChunks: answerChunks.pagesWithChunks || 0,
    byRouteSource: answerChunks.byRouteSource || {},
    chunksByRouteSource: answerChunks.chunksByRouteSource || {},
    chunksBySection: answerChunks.chunksBySection || {},
    usedSourceKeys: answerChunks.usedSourceKeys || [],
    pagesMissingChunks: answerChunkPagesMissingChunks,
    duplicateChunkIds: answerChunkDuplicateIds,
    unknownSourceKeys: answerChunkUnknownSourceKeys,
    readerIdsMissingAnswerChunks,
  },
  volumeMapCoverage: {
    status: volumeMap.status || "missing",
    targetRange: volumeMap.targetRange || manifestTarget,
    manifestPages: volumeMap.manifestPages || 0,
    readerPages: volumeMap.readerPages || 0,
    totalVolumes: volumeMap.totalVolumes || 0,
    totalChapters: volumeMap.totalChapters || 0,
    pagesAssigned: volumeMap.pagesAssigned || 0,
    manifestWithinTarget: volumeMap.manifestWithinTarget || false,
    authoredVolumeCounts,
    volumesMissingAuthoredPages,
    authoredVolumeSpreadReady,
    volumes: (volumeMap.volumes || []).map((volume) => ({
      id: volume.id,
      number: volume.number,
      title: volume.title,
      overviewPageId: volume.overviewPageId || "",
      totalPages: volume.totalPages,
      chapters: (volume.chapters || []).length,
      authoredPages: volume.authoredPages,
      generatedPages: volume.generatedPages,
    })),
    duplicatePageIds: volumeMapDuplicateIds,
    unassignedPageIds: volumeMapUnassignedIds,
    volumeIdsMissingPages: volumeMapEmptyIds,
    volumeIdsMissingOverview: volumeMapMissingOverviewIds,
    unknownSourceKeys: volumeMapUnknownSourceKeys,
    readerIdsMissingVolumeMap,
    volumeMapIdsMissingReader,
    volumeOverviewIdsMissingReader,
  },
  pageStateCoverage: {
    status: pageStateRegistry.status || "missing",
    totalPages: pageStateRegistry.totalPages || 0,
    byState: pageStateRegistry.byState || {},
    byRouteSource: pageStateRegistry.byRouteSource || {},
    byGranularity: pageStateRegistry.byGranularity || {},
    byStatus: pageStateRegistry.byStatus || {},
    publicCandidatePages: pageStateRegistry.publicCandidatePages || 0,
    sourceCompanionPages: pageStateRegistry.sourceCompanionPages || 0,
    internalDraftPages: pageStateRegistry.internalDraftPages || 0,
    publicNavigationPages: pageStateRegistry.publicNavigationPages || 0,
    retrievalEligiblePages: pageStateRegistry.retrievalEligiblePages || 0,
    exactQuestionRoutedPages: pageStateRegistry.exactQuestionRoutedPages || 0,
    duplicatePageIds: pageStateDuplicateIds,
    unclassifiedPageIds: pageStateUnclassifiedIds,
    missingVolumeIds: pageStateMissingVolumeIds,
    readerIdsMissingPageState,
    pageStateIdsMissingReader,
    internalDraftPageIds: pageStateRegistry.internalDraftPageIds || [],
    warnings: pageStateRegistry.warnings || [],
  },
  publicationPlanCoverage: {
    status: publicationPlan.status || "missing",
    planReady: publicationPlan.planReady || false,
    contractVersion: publicationPlan.contractVersion || "",
    sourceBlockRequiredFields: publicationPlan.sourceBlockRequiredFields || [],
    totals: publicationPlan.totals || {},
    byStage: publicationPlan.byStage || {},
    byTemplate: publicationPlan.byTemplate || {},
    bySuggestedAction: publicationPlan.bySuggestedAction || {},
    byVolume: publicationPlan.byVolume || {},
    nextAuthoringBatch: publicationPlan.nextAuthoringBatch || [],
    warnings: publicationPlan.warnings || [],
  },
  requirementCoverage: {
    status: requirementMap.status || "missing",
    completionReady: requirementMap.completionReady || false,
    totalRequirements: requirementMap.totalRequirements || 0,
    byStatus: requirementMap.byStatus || {},
    byCategory: requirementMap.byCategory || {},
    openOperatorItems: requirementMap.openOperatorItems || [],
    nextFocus: requirementMap.nextFocus || [],
    duplicateRequirementIds: requirementDuplicateIds,
    invalidParkedRequirements: invalidParkedRequirementIds,
  },
  unresolved: {
    operatorInbox: openInboxItems,
    gaps,
    journeyMissingPageIds,
    questionRouteMissingIds,
    faqMissingPageIds,
    faqMissingSourceKeys,
    gapQueueMissingQuestionGapIds,
    gapQueueMissingOperatorGapIds,
    gapQueueMissingRelatedPageIds,
    gapQueueMissingSourceKeys,
    answerEngineFailingExactRouteIds,
    answerEngineFailingRefusalIds,
    answerEngineCitationUnknownRoutes,
    answerEngineRoutesWithoutLinkedSources,
    llmRagMissingRequiredCategories,
    llmRagFailingCaseIds,
    llmRagUnknownContextSourceKeys,
    answerValidationFailingFixtureIds,
    answerValidationFailuresByKind: answerValidationReport.failureSummary?.failuresByKind || {},
    glossaryMissingPageIds,
    glossaryMissingSourceKeys,
    usedKeysMissingCatalog,
    registryKeysMissingCatalog,
    catalogKeysMissingRegistry,
    sourceIngestionDuplicateIds,
    sourceIngestionInvalidParkedIds,
    sourceIngestionMissingFamilies: sourceIngestion.missingSourceFamilies || [],
    crosslinkMissingExplicitRelatedPageIds: crosslinks.missingExplicitRelatedPageIds || [],
    readerIdsMissingCrosslinks,
    crosslinkIdsMissingReader,
    answerChunkPagesMissingChunks,
    answerChunkDuplicateIds,
    answerChunkUnknownSourceKeys,
    readerIdsMissingAnswerChunks,
    volumeMapDuplicateIds,
    volumeMapUnassignedIds,
    volumeMapEmptyIds,
    volumeMapMissingOverviewIds,
    volumeMapUnknownSourceKeys,
    readerIdsMissingVolumeMap,
    volumeMapIdsMissingReader,
    volumeOverviewIdsMissingReader,
    pageStateDuplicateIds,
    pageStateUnclassifiedIds,
    pageStateMissingVolumeIds,
    readerIdsMissingPageState,
    pageStateIdsMissingReader,
    requirementDuplicateIds,
    invalidParkedRequirementIds,
    incompleteRequirements: (requirementMap.requirements || [])
      .filter((requirement) => requirement.status !== "complete")
      .map((requirement) => ({
        id: requirement.id,
        status: requirement.status,
        blocks: requirement.blocks || [],
        nextAction: requirement.nextAction,
      })),
    reconciliationQuestions: reconciliationQuestions.map((row) => ({ question: row[0], gap: row[1], notes: row[2] })),
  },
  nextAuditFocus: [
    "Close requirement-map partial, parked, and missing items before marking the compendium complete.",
    "Close source-ingestion partial, parked, and missing families before final source-completeness claims.",
    "Use the volume map to drive the production IA when the docs platform is selected.",
    "Use the page-state registry to keep source companions out of public navigation and internal drafts out of answer synthesis.",
    "Use the publication plan to keep source companions retrieval-only and drive final candidate source/operator/editorial review.",
    "Use the deterministic answer-engine contract as the fallback and golden set alongside LLM synthesis.",
    "Keep the LLM RAG runtime behind the API contract and rerun citation validation plus adversarial evals against live answers before production launch.",
    "Run answer validation fixtures against live runtime answers before production launch.",
    "Embed answer chunks in the chosen production retrieval stack.",
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
