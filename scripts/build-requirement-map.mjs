#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { COMPENDIUM_TARGET_LABEL, withinCompendiumPageTarget } from "./compendium-target.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(searchBookRoot, "..", "..");

const defaults = {
  manifest: path.join(searchBookRoot, "page-manifest.json"),
  searchIndex: path.join(searchBookRoot, "data", "search-index.json"),
  authoredIndex: path.join(searchBookRoot, "data", "authored-pages.json"),
  volumeMap: path.join(searchBookRoot, "data", "volume-map.json"),
  publicationPlan: path.join(searchBookRoot, "data", "publication-plan.json"),
  journeys: path.join(searchBookRoot, "data", "journeys.json"),
  questionRoutes: path.join(searchBookRoot, "data", "question-routes.json"),
  faq: path.join(searchBookRoot, "data", "faq.json"),
  gapQueue: path.join(searchBookRoot, "data", "gap-queue.json"),
  answerEngineContract: path.join(searchBookRoot, "data", "answer-engine-contract.json"),
  llmRagContract: path.join(searchBookRoot, "data", "llm-rag-contract.json"),
  answerValidationReport: path.join(searchBookRoot, "data", "answer-validation-report.json"),
  livingDocsEvents: path.join(searchBookRoot, "data", "living-docs-events.json"),
  discordCorpus: path.join(searchBookRoot, "data", "discord-corpus.json"),
  answerChunks: path.join(searchBookRoot, "data", "answer-chunks.json"),
  glossary: path.join(searchBookRoot, "data", "glossary.json"),
  sourceCatalog: path.join(searchBookRoot, "data", "source-catalog.json"),
  sourceIngestion: path.join(searchBookRoot, "data", "source-ingestion.json"),
  competitiveSweep: path.join(searchBookRoot, "data", "competitive-sweep.json"),
  crosslinks: path.join(searchBookRoot, "data", "crosslinks.json"),
  inbox: path.join(repoRoot, "_specs", "app-docs", "OPERATOR-INBOX.md"),
  finalReport: path.join(searchBookRoot, "FINAL-REPORT.md"),
  frontendPrototype: path.join(searchBookRoot, "index.html"),
  buildOrchestrator: path.join(searchBookRoot, "scripts", "build-all.mjs"),
  packageJson: path.join(repoRoot, "package.json"),
  outJson: path.join(searchBookRoot, "data", "requirement-map.json"),
  outJs: path.join(searchBookRoot, "data", "requirement-map.js"),
};

const statuses = new Set(["complete", "partial", "parked", "missing"]);

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--out-js") args.outJs = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node src/search-book/scripts/build-requirement-map.mjs [--out-json path] [--out-js path]");
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function readJson(filePath, fallback = null) {
  return fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, "utf8")) : fallback;
}

function readText(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
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

function parseOpenInboxItems(markdown) {
  const openSection = markdown.split("## Open")[1]?.split("## Resolved")[0] || "";
  return [...openSection.matchAll(/^### \[OPEN\] #(\d+) — (.+)$/gm)].map((match) => ({
    id: Number(match[1]),
    title: match[2].trim(),
  }));
}

function inboxHas(openItems, id) {
  return openItems.some((item) => item.id === id);
}

function req({ id, label, status, category, sourceSpecs, evidence, blocks = [], nextAction }) {
  if (!statuses.has(status)) throw new Error(`Unknown requirement status for ${id}: ${status}`);
  return { id, label, status, category, sourceSpecs, evidence, blocks, nextAction };
}

const args = parseArgs(process.argv.slice(2));
const manifest = readJson(args.manifest, { pages: [], compendiumTarget: {} });
const searchIndex = readJson(args.searchIndex, []);
const authored = readJson(args.authoredIndex, { pages: [], totalPages: 0, bySection: {}, byStatus: {} });
const volumeMap = readJson(args.volumeMap, { totalVolumes: 0, totalChapters: 0, readerPages: 0, pagesAssigned: 0, volumes: [] });
const publicationPlan = readJson(args.publicationPlan, {
  planReady: false,
  totals: { sourceCompanionsQueued: 0, candidateReviewPages: 0, candidateFinalReviewReadyPages: 0 },
  byStage: {},
});
const journeys = readJson(args.journeys, { totalJourneys: 0, totalSteps: 0, missingPageIds: [] });
const questionRoutes = readJson(args.questionRoutes, { totalRoutes: 0, totalReconciliationQuestions: 0, missingRouteIds: [] });
const faq = readJson(args.faq, { totalEntries: 0, totalAnswerable: 0, totalUnresolved: 0 });
const gapQueue = readJson(args.gapQueue, { totalItems: 0, totalOperatorSignals: 0, totalQuestionSignals: 0 });
const answerEngineContract = readJson(args.answerEngineContract, {
  deterministicReady: false,
  llmProductionReady: false,
  evaluation: { totalExactRouteTests: 0, exactRouteTestsPassing: 0, totalRefusalTests: 0, refusalTestsPassing: 0 },
});
const llmRagContract = readJson(args.llmRagContract, {
  apiContractReady: false,
  evalHarnessReady: false,
  runtimeImplemented: false,
  llmProductionReady: false,
  adversarialEvaluation: { totalCases: 0, passingCases: 0 },
});
const answerValidationReport = readJson(args.answerValidationReport, {
  reportReady: false,
  coverage: { totalFixtures: 0, passingFixtures: 0, failingFixtures: 0 },
});
const livingDocsEvents = readJson(args.livingDocsEvents, {
  eventContractReady: false,
  datastoreImplemented: false,
  livingDocsProductionReady: false,
  coverage: { totalFixtures: 0, passingFixtures: 0, failingFixtures: 0 },
});
const discordCorpus = readJson(args.discordCorpus, {
  importContractReady: false,
  apiScraperReady: false,
  corpusReady: false,
  totals: { seededTopics: 0, importedMessages: 0, questionClusters: 0, lafaAnswerCandidates: 0 },
});
const answerChunks = readJson(args.answerChunks, { totalPages: 0, totalChunks: 0, pagesMissingChunks: [], unknownSourceKeys: [] });
const glossary = readJson(args.glossary, { totalTerms: 0, missingPageIds: [], missingSourceKeys: [] });
const sourceCatalog = readJson(args.sourceCatalog, { totalSources: 0, duplicateKeys: [], sources: [] });
const sourceIngestion = readJson(args.sourceIngestion, { totalSourceRequirements: 0, byStatus: {}, sourceCompletionReady: false, missingSourceFamilies: [] });
const competitiveSweep = readJson(args.competitiveSweep, {
  targetDocs: 0,
  targetDocsReviewed: 0,
  targetDocsUnverified: 0,
  plannedAgentLanes: 0,
  completedExplorerBatches: 0,
  completedLaneReviews: 0,
  completionReady: false,
});
const crosslinks = readJson(args.crosslinks, { totalPages: 0, missingExplicitRelatedPageIds: [] });
const openInboxItems = parseOpenInboxItems(readText(args.inbox));
const frontendPrototype = readText(args.frontendPrototype);
const packageJson = readJson(args.packageJson, { scripts: {} });
const finalReportExists = fs.existsSync(args.finalReport);
const finalReportText = readText(args.finalReport);
const authoredSections = authored.bySection || countBy(authored.pages || [], (page) => page.section);
const authoredStatuses = authored.byStatus || countBy(authored.pages || [], (page) => page.status);
const sourceCompanionsCoveredByAuthoredPages = publicationPlan.totals?.sourceCompanionsCoveredByAuthoredPages || 0;
const sourceCompanionsNeedingAuthoredCoverage = publicationPlan.totals?.sourceCompanionsNeedingAuthoredCoverage || 0;
const candidateReviewPages = publicationPlan.totals?.candidateReviewPages || 0;
const candidateFinalReviewReadyPages = publicationPlan.totals?.candidateFinalReviewReadyPages || 0;
const candidateOperatorReviewPages = publicationPlan.totals?.candidateOperatorReviewPages || 0;
const candidateSourceRefreshPages = publicationPlan.totals?.candidateSourceRefreshPages || 0;
const candidatePublicationDateReviewPages = publicationPlan.totals?.candidatePublicationDateReviewPages || 0;
const candidateEditorialReviewPages = publicationPlan.totals?.candidateEditorialReviewPages || 0;
const authoredPageIds = new Set((authored.pages || []).map((page) => page.id));
const volumeOverviews = (volumeMap.volumes || []).filter((volume) => volume.overviewPageId).length;
const manifestWithinTarget = withinCompendiumPageTarget((manifest.pages || []).length);
const answerEngineEvaluation = answerEngineContract.evaluation || {};
const llmRagAdversarial = llmRagContract.adversarialEvaluation || {};
const answerValidationCoverage = answerValidationReport.coverage || {};
const deterministicAnswerEngineReady =
  answerEngineContract.deterministicReady === true &&
  (answerEngineEvaluation.totalExactRouteTests || 0) === (questionRoutes.totalRoutes || 0) &&
  (answerEngineEvaluation.exactRouteTestsPassing || 0) === (questionRoutes.totalRoutes || 0) &&
  (answerEngineEvaluation.totalRefusalTests || 0) === (questionRoutes.totalReconciliationQuestions || 0) &&
  (answerEngineEvaluation.refusalTestsPassing || 0) === (questionRoutes.totalReconciliationQuestions || 0);
const llmContractReady =
  llmRagContract.apiContractReady === true &&
  llmRagContract.evalHarnessReady === true &&
  llmRagContract.runtimeImplemented === true &&
  llmRagContract.llmProductionReady === false &&
  (llmRagAdversarial.totalCases || 0) >= 12 &&
  (llmRagAdversarial.passingCases || 0) === (llmRagAdversarial.totalCases || 0);
const liveLlmEvaluation = llmRagContract.liveEvaluation || {};
const liveLlmValidationReady =
  liveLlmEvaluation.status === "passed" &&
  (liveLlmEvaluation.suites?.total?.passing || 0) === (liveLlmEvaluation.suites?.total?.total || 0) &&
  (liveLlmEvaluation.suites?.total?.total || 0) >=
    (llmRagAdversarial.totalCases || 0) + (answerValidationCoverage.totalFixtures || 0);
const answerValidationReady =
  answerValidationReport.reportReady === true &&
  (answerValidationCoverage.totalFixtures || 0) >= 20 &&
  (answerValidationCoverage.passingFixtures || 0) === (answerValidationCoverage.totalFixtures || 0) &&
  (answerValidationCoverage.failingFixtures || 0) === 0;
const livingDocsCoverage = livingDocsEvents.coverage || {};
const sqliteAnswerServiceImplemented =
  livingDocsEvents.serviceRuntimeImplemented === true &&
  livingDocsEvents.sqliteDatastoreImplemented === true &&
  livingDocsEvents.datastoreImplemented === true;
const frontendServiceIntegrationImplemented =
  livingDocsEvents.frontendServiceIntegrationImplemented === true ||
  (frontendPrototype.includes("SEARCH_BOOK_ANSWER_ENGINE_URL") &&
    frontendPrototype.includes('"/api/search-book/answer"') &&
    frontendPrototype.includes('"/api/search-book/rating"') &&
    frontendPrototype.includes('"/api/search-book/insights"') &&
    frontendPrototype.includes("searchBookPrototype.serviceUrl"));
const retentionPolicyImplemented = livingDocsEvents.retentionPolicyImplemented === true;
const moderationExportImplemented = livingDocsEvents.moderationExportImplemented === true;
const reviewerWorkflowDocumented = livingDocsEvents.reviewerWorkflowDocumented === true;
const backupRestoreImplemented = livingDocsEvents.backupRestoreImplemented === true;
const buildOrchestratorReady =
  fs.existsSync(args.buildOrchestrator) &&
  packageJson.scripts?.["search-book:build"] === "node src/search-book/scripts/build-all.mjs" &&
  packageJson.scripts?.["search-book:verify"] === "node src/search-book/scripts/build-all.mjs --verify";
const finalReportMentionsOpenItems =
  finalReportExists &&
  openInboxItems.every((item) => finalReportText.includes(`OPERATOR-INBOX #${item.id}`));
const finalReportDocumentsState =
  finalReportExists &&
  finalReportText.includes("## Current Status") &&
  finalReportText.includes("## Verification Evidence") &&
  finalReportText.includes("## Remaining Production Work") &&
  finalReportMentionsOpenItems;
const publicManifestoAndReferenceComplete =
  manifestWithinTarget &&
  (authored.totalPages || 0) >= 500 &&
  (authoredStatuses.published || 0) >= 500 &&
  volumeMap.totalVolumes >= 8 &&
  publicationPlan.planReady === true &&
  sourceCompanionsNeedingAuthoredCoverage === 0 &&
  candidateReviewPages === 0 &&
  candidateFinalReviewReadyPages === 0 &&
  candidateOperatorReviewPages === 0 &&
  candidateSourceRefreshPages === 0 &&
  candidatePublicationDateReviewPages === 0 &&
  candidateEditorialReviewPages === 0;
const requiredDashboardPageIds = [
  "authored-dashboard-route-inventory",
  "authored-dashboard-overview",
  "authored-dashboard-invites",
  "authored-dashboard-network",
  "authored-dashboard-volume",
  "authored-dashboard-tasks",
  "authored-dashboard-faq",
  "authored-dashboard-settings",
  "authored-estimated-network-revenue",
  "authored-dashboard-revenue-pulse",
];
const missingDashboardPageIds = requiredDashboardPageIds.filter((pageId) => !authoredPageIds.has(pageId));
const dashboardQuestionRouted = (questionRoutes.answerable || []).some(
  (route) => route.question === "Which dashboard views are documented?" && route.pageId === "authored-dashboard-route-inventory",
);
const dashboardReferenceComplete =
  !missingDashboardPageIds.length && dashboardQuestionRouted && !inboxHas(openInboxItems, 1) && !inboxHas(openInboxItems, 3);
const requiredRevenueVolumePointsPageIds = [
  "authored-estimated-network-revenue",
  "authored-dashboard-revenue-pulse",
  "authored-network-volume",
  "authored-dashboard-volume",
  "authored-barometer-subgraph-upgrade",
  "authored-volume-snapshot-cadence",
  "authored-points-taxonomy",
  "authored-points-and-vibe-points",
  "authored-vibe-points-program",
  "authored-tge-settlement-multiplier",
];
const missingRevenueVolumePointsPageIds = requiredRevenueVolumePointsPageIds.filter((pageId) => !authoredPageIds.has(pageId));
const revenueVolumePointsRoutes = new Set(
  (questionRoutes.answerable || [])
    .filter((route) =>
      [
        "How is estimated network revenue calculated?",
        "Which revenue sources are live today?",
        "Where does network volume come from?",
        "Is network volume sourced from backend REST or subgraphs?",
        "What are the different kinds of points?",
        "Are onboarding points the same as Vibe trading points?",
        "How are Vibe points earned?",
        "How do onboarding points settle at TGE?",
      ].includes(route.question),
    )
    .map((route) => route.question),
);
const revenueVolumePointsComplete =
  !missingRevenueVolumePointsPageIds.length &&
  revenueVolumePointsRoutes.size >= 8 &&
  !inboxHas(openInboxItems, 1) &&
  !inboxHas(openInboxItems, 3);
const livingDocsEventContractReady =
  livingDocsEvents.eventContractReady === true &&
  livingDocsEvents.livingDocsProductionReady === false &&
  (livingDocsCoverage.totalFixtures || 0) >= 8 &&
  (livingDocsCoverage.passingFixtures || 0) === (livingDocsCoverage.totalFixtures || 0) &&
  (livingDocsCoverage.failingFixtures || 0) === 0;
const sourceIngestionOpenBlocks = [
  ...(inboxHas(openInboxItems, 2) ? ["OPERATOR-INBOX #2"] : []),
  ...(inboxHas(openInboxItems, 5) ? ["OPERATOR-INBOX #5"] : []),
  ...(inboxHas(openInboxItems, 6) ? ["OPERATOR-INBOX #6"] : []),
  ...(inboxHas(openInboxItems, 7) ? ["OPERATOR-INBOX #7"] : []),
  ...(inboxHas(openInboxItems, 8) ? ["OPERATOR-INBOX #8"] : []),
  ...(inboxHas(openInboxItems, 9) ? ["OPERATOR-INBOX #9"] : []),
];
const sourceIngestionIncomplete =
  !sourceIngestion.sourceCompletionReady ||
  (sourceIngestion.byStatus?.missing || 0) > 0 ||
  (sourceIngestion.byStatus?.partial || 0) > 0 ||
  (sourceIngestion.byStatus?.parked || 0) > 0;

const requirements = [
  req({
    id: "pages-and-manifest",
    label: "500-800 page compendium manifest exists",
    status: manifestWithinTarget && searchIndex.length === (manifest.pages || []).length ? "complete" : "partial",
    category: "content",
    sourceSpecs: ["01", "05", "08"],
    evidence: `${(manifest.pages || []).length} manifest pages, ${searchIndex.length} search-index entries, target ${manifest.compendiumTarget?.requestedRange || COMPENDIUM_TARGET_LABEL}`,
    nextAction: "Keep the manifest inside the 500-800 page target and regenerate deterministic data after source or publication-state changes.",
  }),
  req({
    id: "manifesto-and-reference",
    label: "Unified manifesto plus reference layer",
    status: publicManifestoAndReferenceComplete
      ? "complete"
      : (authored.totalPages || 0) >= 35 && volumeMap.totalVolumes >= 8
        ? "partial"
        : "missing",
    category: "content",
    sourceSpecs: ["01", "02", "03", "05"],
    evidence: `${authored.totalPages || 0} authored pages across ${Object.keys(authoredSections).length} sections; ${authoredStatuses.published || 0} published authored pages; ${volumeMap.totalVolumes || 0} volumes and ${volumeMap.totalChapters || 0} chapters; publication plan ready=${publicationPlan.planReady === true} with ${publicationPlan.totals?.sourceCompanionsQueued || 0} source companions queued, ${sourceCompanionsCoveredByAuthoredPages} covered by authored pages, ${sourceCompanionsNeedingAuthoredCoverage} needing authored coverage, ${candidateReviewPages} candidate review pages, ${candidateFinalReviewReadyPages} final-review-ready pages, ${candidateOperatorReviewPages} operator-review pages, ${candidateSourceRefreshPages} source-refresh pages, ${candidatePublicationDateReviewPages} publication-date-review pages, and ${candidateEditorialReviewPages} editorial-review pages`,
    nextAction: publicManifestoAndReferenceComplete
      ? "Keep the published manifesto/reference corpus synchronized as source, operator, or deploy inputs change; remaining source/deploy gaps are tracked by separate parked requirements."
      : publicationPlan.planReady
      ? sourceCompanionsNeedingAuthoredCoverage > 0
        ? "Use data/publication-plan.json to fold the remaining source companions into authored pages in demand/gap order."
        : "Use data/publication-plan.json nextCandidateReviewBatch first, then clear source/operator/editorial lanes and promote approved candidate pages to published status."
      : "Create a deterministic publication authoring plan, then continue converting generated source pages into publication-quality authored manifesto/reference pages.",
  }),
  req({
    id: "volume-orientation",
    label: "Book-scale volume orientation",
    status: volumeMap.totalVolumes === 8 && volumeOverviews === 8 && volumeMap.pagesAssigned === volumeMap.readerPages ? "complete" : "partial",
    category: "content",
    sourceSpecs: ["05", "08"],
    evidence: `${volumeMap.totalVolumes || 0} volumes, ${volumeMap.totalChapters || 0} chapters, ${volumeOverviews} authored overviews, ${volumeMap.pagesAssigned || 0}/${volumeMap.readerPages || 0} reader pages assigned`,
    nextAction: "Use the volume map as production IA input once the platform decision is resolved.",
  }),
  req({
    id: "dashboard-reference",
    label: "Every dashboard view documented",
    status: dashboardReferenceComplete ? "complete" : (authoredSections["dashboard-reference"] || 0) >= 8 ? "partial" : "missing",
    category: "reference",
    sourceSpecs: ["01", "03", "05", "09"],
    evidence: dashboardReferenceComplete
      ? `Current dashboard route inventory plus ${requiredDashboardPageIds.length - 1} required dashboard/revenue pages cover visible routes and hidden #revenue; route question mapped=${dashboardQuestionRouted}.`
      : `${authoredSections["dashboard-reference"] || 0} authored dashboard-reference pages; missing required ids ${missingDashboardPageIds.join(", ") || "none"}; route question mapped=${dashboardQuestionRouted}; statuses ${JSON.stringify(authoredStatuses)}`,
    nextAction: dashboardReferenceComplete
      ? "Keep the route inventory synchronized with dashboard shell changes."
      : "Resolve missing dashboard/revenue pages and route inventory before publication.",
  }),
  req({
    id: "revenue-volume-points-reference",
    label: "Revenue, volume, points, and Vibe-points reference",
    status: inboxHas(openInboxItems, 1) ? "parked" : revenueVolumePointsComplete ? "complete" : "partial",
    category: "reference",
    sourceSpecs: ["01", "03", "08", "09"],
    evidence: inboxHas(openInboxItems, 1)
      ? "Authored revenue, network-volume, points, and dashboard pages exist; public revenue disclosure boundary would need operator input before publication."
      : revenueVolumePointsComplete
        ? `Required v1 revenue, volume, Barometer, points-taxonomy, Vibe-points, and TGE-boundary pages exist; ${revenueVolumePointsRoutes.size}/8 required questions route to authored pages. Phase A formula and 15-level depth are approved; public TGE formula is deferred/not public for v1.`
        : `Authored revenue, network-volume, points, and dashboard pages exist; missing required ids ${missingRevenueVolumePointsPageIds.join(", ") || "none"}; ${revenueVolumePointsRoutes.size}/8 required questions route to authored pages; operator-approved v1 revenue is Phase A only.`,
    blocks: inboxHas(openInboxItems, 1) ? ["OPERATOR-INBOX #1"] : [],
    nextAction: inboxHas(openInboxItems, 1)
      ? "Resume final revenue/economics wording when the operator fills inbox item #1."
      : revenueVolumePointsComplete
        ? "Keep Phase A public copy aligned with the approved formula, keep Barometer as a tracked upgrade, and keep the public TGE formula deferred/not public for v1."
        : "Route remaining revenue, volume, points, and Vibe-points questions to authored pages.",
  }),
  req({
    id: "referral-depth-reconciliation",
    label: "Referral-depth contradiction reconciled",
    status: inboxHas(openInboxItems, 3) ? "parked" : "complete",
    category: "reference",
    sourceSpecs: ["01", "03", "08"],
    evidence: inboxHas(openInboxItems, 3)
      ? "Referral-depth evidence is logged and an authored open-question page exists; public stance would need operator input before publication."
      : "Referral-depth public stance is resolved: public depth is 15 levels, and historical backfill is additive and never lowers a balance.",
    blocks: inboxHas(openInboxItems, 3) ? ["OPERATOR-INBOX #3"] : [],
    nextAction: inboxHas(openInboxItems, 3)
      ? "Resume final referral/rewards wording when the operator fills inbox item #3."
      : "Keep generated routes, dashboard copy, and validation fixtures aligned to 15-level additive-backfill wording.",
  }),
  req({
    id: "answer-engine-front-door",
    label: "Ask-first answer-engine front door",
    status: deterministicAnswerEngineReady && answerChunks.totalChunks >= 1000 && questionRoutes.totalRoutes >= 20 ? "partial" : "missing",
    category: "answer-engine",
    sourceSpecs: ["01", "05", "06", "09"],
    evidence: `${questionRoutes.totalRoutes || 0} seeded routes, ${answerChunks.totalChunks || 0} retrieval chunks, ${answerEngineEvaluation.exactRouteTestsPassing || 0}/${answerEngineEvaluation.totalExactRouteTests || 0} exact-route tests, ${answerEngineEvaluation.refusalTestsPassing || 0}/${answerEngineEvaluation.totalRefusalTests || 0} refusal tests, static Ask UI routes to exact pages, LLM runtime implemented=${llmRagContract.runtimeImplemented === true}, SQLite service implemented=${sqliteAnswerServiceImplemented}, frontend service bridge=${frontendServiceIntegrationImplemented}, retention policy implemented=${retentionPolicyImplemented}, moderation export implemented=${moderationExportImplemented}, reviewer workflow documented=${reviewerWorkflowDocumented}, backup/restore implemented=${backupRestoreImplemented}`,
    nextAction: sqliteAnswerServiceImplemented
      ? frontendServiceIntegrationImplemented
        ? retentionPolicyImplemented && moderationExportImplemented
          ? reviewerWorkflowDocumented && backupRestoreImplemented
            ? "Install production service env, configure production retention/moderation/backup storage access, assign reviewer owner/cadence, and deploy behind the selected public frontend route."
            : reviewerWorkflowDocumented
            ? "Add backup/restore-check operations, install production service env, configure production retention/moderation access, assign reviewer owner/cadence, and deploy behind the selected public frontend route."
            : "Document the reviewer operating workflow, install production service env, configure production retention/admin moderation access, and deploy behind the selected public frontend route."
          : "Install production service env, define retention/moderation policy, and deploy behind the selected public frontend route."
        : "Connect the public frontend to the standalone service, install production service env, and deploy behind the selected frontend route."
      : "Promote the proven runtime into the standalone service, wire persistence/rate-limit/abuse controls, and carry the front door into the selected production platform.",
  }),
  req({
    id: "answer-engine-contracts-and-evals",
    label: "Answer-engine contracts, adversarial evals, and response validator",
    status: deterministicAnswerEngineReady && llmContractReady && answerValidationReady && liveLlmValidationReady ? "complete" : "partial",
    category: "answer-engine",
    sourceSpecs: ["06", "08", "11"],
    evidence: `deterministicReady=${answerEngineContract.deterministicReady === true}; LLM API contract ${llmRagContract.apiContractReady === true ? "ready" : "not-ready"}; adversarial cases ${llmRagAdversarial.passingCases || 0}/${llmRagAdversarial.totalCases || 0}; answer-validation fixtures ${answerValidationCoverage.passingFixtures || 0}/${answerValidationCoverage.totalFixtures || 0}; recorded live LLM eval ${liveLlmEvaluation.suites?.total?.passing || 0}/${liveLlmEvaluation.suites?.total?.total || 0} on ${liveLlmEvaluation.model || "unrecorded-model"}`,
    nextAction: "Rerun live model validation at deployment time and after source-corpus changes; keep the validator strict.",
  }),
  req({
    id: "living-docs-loop",
    label: "Question tracking, ratings, and gaps loop",
    status:
      livingDocsEventContractReady && gapQueue.totalItems >= 1 && questionRoutes.totalReconciliationQuestions >= 1
        ? "partial"
        : "missing",
    category: "answer-engine",
    sourceSpecs: ["01", "06", "09"],
    evidence: `${gapQueue.totalItems || 0} generated gap items, ${gapQueue.totalOperatorSignals || 0} operator signals, ${questionRoutes.totalReconciliationQuestions || 0} reconciliation questions, living-docs event contract ready=${livingDocsEvents.eventContractReady === true}, fixtures ${livingDocsCoverage.passingFixtures || 0}/${livingDocsCoverage.totalFixtures || 0}, SQLite service implemented=${sqliteAnswerServiceImplemented}, frontend service bridge=${frontendServiceIntegrationImplemented}, retention policy implemented=${retentionPolicyImplemented}, moderation export implemented=${moderationExportImplemented}, reviewer workflow documented=${reviewerWorkflowDocumented}, backup/restore implemented=${backupRestoreImplemented}, localStorage prototype still present for static preview`,
    nextAction: sqliteAnswerServiceImplemented
      ? frontendServiceIntegrationImplemented
        ? retentionPolicyImplemented && moderationExportImplemented
          ? reviewerWorkflowDocumented && backupRestoreImplemented
            ? "Install production env, deploy the service plus selected public frontend route, and assign a reviewer owner/cadence for the documented workflow."
            : reviewerWorkflowDocumented
            ? "Add backup/restore-check operations, install production env, and deploy the service plus selected public frontend route."
            : "Document the reviewer workflow, install production env, and deploy the service plus selected public frontend route."
          : "Define retention/moderation policy, install production env, and deploy the service plus selected public frontend route."
        : "Wire Search Insights and rating controls to the SQLite service, then define retention/moderation policy and deploy."
      : "Implement the production datastore service behind Search Insights after platform/backend selection.",
  }),
  req({
    id: "discord-seeded-faq",
    label: "Discord/Lafa Q&A mined into FAQ",
    status: inboxHas(openInboxItems, 2) ? "parked" : "partial",
    category: "demand-signal",
    sourceSpecs: ["01", "04", "06", "07", "08"],
    evidence: `${faq.totalEntries || 0} local FAQ entries exist. Discord import contract ready=${discordCorpus.importContractReady === true}; API scraper ready=${discordCorpus.apiScraperReady === true}; imported messages=${discordCorpus.totals?.importedMessages || 0}; question clusters=${discordCorpus.totals?.questionClusters || 0}; Lafa answer candidates=${discordCorpus.totals?.lafaAnswerCandidates || 0}.`,
    blocks: inboxHas(openInboxItems, 2) ? ["OPERATOR-INBOX #2"] : [],
    nextAction: "Run Discord-derived FAQ import when the operator provides channel access/export, Lafa author identity, and public-use boundary.",
  }),
  req({
    id: "guided-journeys",
    label: "Guided onboarding journeys",
    status: journeys.totalJourneys >= 5 && !(journeys.missingPageIds || []).length ? "complete" : "partial",
    category: "navigation",
    sourceSpecs: ["02", "05", "08"],
    evidence: `${journeys.totalJourneys || 0} journeys, ${journeys.totalSteps || 0} exact-page steps, ${(journeys.missingPageIds || []).length} missing route ids`,
    nextAction: "Carry journey data into the production docs platform.",
  }),
  req({
    id: "crosslinks-and-navigation",
    label: "Cross-links, prev/next, glossary, and navigability",
    status: crosslinks.totalPages >= 800 && glossary.totalTerms >= 25 && !(crosslinks.missingExplicitRelatedPageIds || []).length ? "complete" : "partial",
    category: "navigation",
    sourceSpecs: ["05", "08"],
    evidence: `${crosslinks.totalPages || 0} crosslinked reader pages, ${glossary.totalTerms || 0} glossary terms`,
    nextAction: "Port generated navigation/crosslink data into the final platform.",
  }),
  req({
    id: "source-traceability",
    label: "Every claim traceable to primary sources",
    status:
      sourceCatalog.totalSources >= 50 &&
      !(sourceCatalog.duplicateKeys || []).length &&
      (sourceIngestion.totalSourceRequirements || 0) >= 12 &&
      !sourceIngestionIncomplete
        ? "complete"
        : sourceIngestionOpenBlocks.length
          ? "parked"
          : "partial",
    category: "sourcing",
    sourceSpecs: ["01", "04", "07", "08"],
    evidence: `${sourceCatalog.totalSources || 0} registered sources; ${answerChunks.usedSourceKeys?.length || 0} source keys used in retrieval chunks; source-ingestion coverage ${sourceIngestion.byStatus?.complete || 0}/${sourceIngestion.totalSourceRequirements || 0} complete, ${sourceIngestion.byStatus?.partial || 0} partial, ${sourceIngestion.byStatus?.parked || 0} parked, ${sourceIngestion.byStatus?.missing || 0} missing`,
    blocks: sourceIngestionOpenBlocks,
    nextAction: "Close source-ingestion missing, partial, and parked families before final source-completeness claims.",
  }),
  req({
    id: "competitive-docs-sweep",
    label: "25-lane competitive docs sweep synthesized",
    status:
      competitiveSweep.completionReady
        ? "complete"
        : (competitiveSweep.targetDocs || 0) >= 50 &&
            (competitiveSweep.plannedAgentLanes || 0) >= 25 &&
            (competitiveSweep.completedExplorerBatches || 0) >= 5 &&
            inboxHas(openInboxItems, 8)
          ? "parked"
        : (competitiveSweep.targetDocs || 0) >= 50 &&
            (competitiveSweep.plannedAgentLanes || 0) >= 25 &&
            (competitiveSweep.completedExplorerBatches || 0) >= 5
          ? "partial"
          : "missing",
    category: "sourcing",
    sourceSpecs: ["07"],
    evidence: `${competitiveSweep.targetDocsReviewed || 0}/${competitiveSweep.targetDocs || 0} official docs verified, ${competitiveSweep.targetDocsUnverified || 0} unverified, ${competitiveSweep.completedExplorerBatches || 0} explorer batches, ${competitiveSweep.completedLaneReviews || 0}/${competitiveSweep.plannedAgentLanes || 0} lanes`,
    blocks: inboxHas(openInboxItems, 8) && !competitiveSweep.completionReady ? ["OPERATOR-INBOX #8"] : [],
    nextAction: competitiveSweep.completionReady
      ? "Keep the 49/50 sweep plus Opyn exclusion documented; rerun the benchmark periodically after launch."
      : "Resolve or explicitly exclude the unverified Opyn target before claiming the competitive sweep complete.",
  }),
  req({
    id: "phase-zero-platform",
    label: "Platform, repository, and transparency decisions locked",
    status: inboxHas(openInboxItems, 4) ? "parked" : "partial",
    category: "production",
    sourceSpecs: ["08", "10"],
    evidence: inboxHas(openInboxItems, 4)
      ? "Backend architecture and economics transparency are decided, but the public frontend platform/repo/deploy route remains open."
      : "Backend architecture, economics transparency, and public frontend platform/repo/deploy route are decided.",
    blocks: inboxHas(openInboxItems, 4) ? ["OPERATOR-INBOX #4"] : [],
    nextAction: "Resume final scaffold/deploy implementation when platform/repo and transparency items are resolved.",
  }),
  req({
    id: "deploy-preview",
    label: "Deployed or preview docs site",
    status: inboxHas(openInboxItems, 4) ? "parked" : "missing",
    category: "production",
    sourceSpecs: ["01", "08"],
    evidence: "Static local prototype exists; production platform/repo/deploy target is not selected.",
    blocks: inboxHas(openInboxItems, 4) ? ["OPERATOR-INBOX #4"] : [],
    nextAction: "Deploy preview after the operator selects platform/repo ownership.",
  }),
  req({
    id: "final-report",
    label: "Final report committed",
    status: finalReportDocumentsState ? "complete" : "missing",
    category: "delivery",
    sourceSpecs: ["01", "08"],
    evidence: finalReportDocumentsState
      ? `FINAL-REPORT.md exists and documents ${openInboxItems.length} open operator item(s).`
      : finalReportExists
        ? "FINAL-REPORT.md exists but does not document current status, verification evidence, remaining production work, and all open operator items."
        : "No src/search-book/FINAL-REPORT.md exists yet.",
    nextAction: finalReportDocumentsState
      ? "Keep FINAL-REPORT.md current when deploy/source blockers resolve or verification counts change."
      : "Write the final report only after deployed/preview state and parked source decisions are resolved or explicitly documented.",
  }),
  req({
    id: "maintained-core-artifacts",
    label: "DECISIONS, SOURCES, STYLEGUIDE, GAPS, QUESTIONS, manifest, and build entrypoint maintained",
    status: ["DECISIONS.md", "SOURCES.md", "STYLEGUIDE.md", "GAPS.md", "QUESTIONS.md", "page-manifest.json"].every((file) => fs.existsSync(path.join(searchBookRoot, file))) && buildOrchestratorReady ? "complete" : "partial",
    category: "delivery",
    sourceSpecs: ["01", "07", "08"],
    evidence: `Core search-book artifacts exist and have been updated across checkpoints; build orchestrator ready=${buildOrchestratorReady}.`,
    nextAction: "Keep these artifacts current as final platform/deploy work proceeds.",
  }),
];

const duplicateRequirementIds = requirements.map((item) => item.id).filter((id, index, ids) => ids.indexOf(id) !== index);
const invalidParkedRequirements = requirements
  .filter((item) => item.status === "parked" && !item.blocks.length)
  .map((item) => item.id);

if (duplicateRequirementIds.length) throw new Error(`Duplicate requirement ids: ${[...new Set(duplicateRequirementIds)].join(", ")}`);
if (invalidParkedRequirements.length) throw new Error(`Parked requirements missing blocker labels: ${invalidParkedRequirements.join(", ")}`);

const byStatus = countBy(requirements, (item) => item.status);
const byCategory = countBy(requirements, (item) => item.category);
const payload = {
  generatedAt: "deterministic-build",
  status: "completion-coverage-map",
  completionReady: (byStatus.complete || 0) === requirements.length,
  totalRequirements: requirements.length,
  byStatus,
  byCategory,
  openOperatorItems: openInboxItems,
  duplicateRequirementIds: [],
  invalidParkedRequirements: [],
  requirements,
  nextFocus: requirements.filter((item) => item.status !== "complete").map((item) => ({
    id: item.id,
    status: item.status,
    nextAction: item.nextAction,
    blocks: item.blocks,
  })),
};

ensureDir(path.dirname(args.outJson));
fs.writeFileSync(args.outJson, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(args.outJs, `window.SearchBookRequirementMap = ${JSON.stringify(payload)};\n`);
console.log(
  JSON.stringify(
    {
      requirements: payload.totalRequirements,
      complete: payload.byStatus.complete || 0,
      partial: payload.byStatus.partial || 0,
      parked: payload.byStatus.parked || 0,
      missing: payload.byStatus.missing || 0,
      completionReady: payload.completionReady,
    },
    null,
    2,
  ),
);
