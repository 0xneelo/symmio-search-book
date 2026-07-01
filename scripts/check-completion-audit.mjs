#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const requiredSections = new Set([
  "manifesto",
  "product-reference",
  "rewards-referrals",
  "dashboard-reference",
  "protocol-reference",
  "answer-engine",
  "compendium",
]);

const requiredRequirementRows = [
  "Read and follow `_specs/app-docs/01-09` plus pasted objective",
  "Build a 500-800 page cited compendium",
  "Include manifesto and full Symmio/Vibe reference",
  "Cover revenue, volume, points, vibe-points, referrals, and every dashboard view",
  "Primary-source traceability and contradiction reconciliation",
  "Mine Symmio Discord and Lafa answers into FAQ/answer-engine seed",
  "Run competitive sweep over top crypto/docs references",
  "Maintain one IA and one style guide",
  "Build answer-engine front door with exact page routing and citations",
  "Refuse unsupported, unsafe, secret, financial-advice, and out-of-scope questions",
  "Build living-docs loop: track questions, rate answers, surface gaps",
  "Deploy or preview docs site",
  "Maintain DECISIONS, SOURCES, STYLEGUIDE, GAPS, QUESTIONS, page manifest, final report",
  "No secrets leaked",
  "Checkpoint and coordinate in shared repo",
];

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(searchBookRoot, relativePath), "utf8"));
}

function readText(relativePath) {
  return fs.readFileSync(path.join(searchBookRoot, relativePath), "utf8");
}

function addCheck(checks, id, passed, detail = "", evidence = null) {
  checks.push({
    id,
    passed: Boolean(passed),
    detail,
    ...(evidence ? { evidence } : {}),
  });
}

function countBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key] || "unknown";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function valuesEqual(actual = [], expected = []) {
  const actualSorted = actual.map(Number).sort((a, b) => a - b);
  const expectedSorted = expected.map(Number).sort((a, b) => a - b);
  return JSON.stringify(actualSorted) === JSON.stringify(expectedSorted);
}

const audit = readText("COMPLETION-AUDIT.md");
const progress = readText("PROGRESS.md");
const finalReportExists = fs.existsSync(path.join(searchBookRoot, "FINAL-REPORT.md"));
const decisionsExists = fs.existsSync(path.join(searchBookRoot, "DECISIONS.md"));
const sourcesExists = fs.existsSync(path.join(searchBookRoot, "SOURCES.md"));
const styleguideExists = fs.existsSync(path.join(searchBookRoot, "STYLEGUIDE.md"));
const gapsExists = fs.existsSync(path.join(searchBookRoot, "GAPS.md"));
const questionsExists = fs.existsSync(path.join(searchBookRoot, "QUESTIONS.md"));

const manifest = readJson("page-manifest.json");
const authored = readJson("data/authored-pages.json");
const pageState = readJson("data/page-state-registry.json");
const routes = readJson("data/question-routes.json");
const faq = readJson("data/faq.json");
const chunks = readJson("data/answer-chunks.json");
const sourceCatalog = readJson("data/source-catalog.json");
const sourceIngestion = readJson("data/source-ingestion.json");
const requirements = readJson("data/requirement-map.json");
const quality = readJson("data/quality-audit.json");
const answerContract = readJson("data/answer-engine-contract.json");
const llm = readJson("data/llm-rag-contract.json");
const answerValidation = readJson("data/answer-validation-report.json");
const livingDocs = readJson("data/living-docs-events.json");
const discord = readJson("data/discord-corpus.json");
const discordRouting = readJson("data/discord-review-routing.json");
const competitive = readJson("data/competitive-sweep.json");
const journeys = readJson("data/journeys.json");
const volume = readJson("data/volume-map.json");

const authoredBySection = countBy(authored.pages || [], "section");
const authoredPagesMissingSources = (authored.pages || []).filter((page) => !Array.isArray(page.sourceKeys) || page.sourceKeys.length === 0);
const openOperatorIds = (requirements.openOperatorItems || []).map((item) => Number(item.id));
const requirementById = new Map((requirements.requirements || []).map((requirement) => [requirement.id, requirement]));
const qualityPassed = (quality.gates || []).filter((gate) => gate.passed === true).length;
const qualityTotal = (quality.gates || []).length;
const routeCoverage = discordRouting.reviewPlan?.routeCoverage || {};
const liveSuites = llm.liveEvaluation?.suites || {};
const checks = [];

const manualEvidenceEntry =
  progress.match(/## 2026-07-01 — Manual Evidence Refresh For Production Packet Guard\n\n([\s\S]*?)(?=\n## |\n?$)/)?.[1] || "";
const manualEvidence = {
  commit: manualEvidenceEntry.match(/commit `([a-f0-9]+)`/)?.[1] || "",
  launchRun: manualEvidenceEntry.match(/launch evidence run `(\d+)`/)?.[1] || "",
  releaseRun: manualEvidenceEntry.match(/release dry-run run `(\d+)`/)?.[1] || "",
  launchArtifact: manualEvidenceEntry.match(/(\/tmp\/search-book-gh-manual-launch-\d+)/)?.[1] || "",
  releaseArtifact: manualEvidenceEntry.match(/(\/tmp\/search-book-gh-manual-release-\d+)/)?.[1] || "",
};

addCheck(
  checks,
  "audit-verdict-stays-open",
  audit.includes("not yet production-complete") &&
    audit.includes("Do not mark the goal complete") &&
    audit.includes("OPERATOR-INBOX #11") &&
    audit.includes("OPERATOR-INBOX #4"),
  "completion audit must state preview-ready, not production-complete, with #11/#4 open",
);
addCheck(
  checks,
  "audit-requirement-rows-present",
  requiredRequirementRows.every((row) => audit.includes(row)),
  "completion audit must keep every objective-derived requirement row",
  { missingRows: requiredRequirementRows.filter((row) => !audit.includes(row)) },
);
addCheck(
  checks,
  "page-target-and-public-corpus",
  manifest.pages.length >= 100 &&
    manifest.pages.length >= manifest.compendiumTarget.minimumPages &&
    manifest.pages.length <= manifest.compendiumTarget.maximumPages &&
    pageState.publicNavigationPages >= 100 &&
    authored.totalPages >= 100,
  "compendium must remain >=100 pages and within the 500-800 manifest target",
  {
    manifestPages: manifest.pages.length,
    target: manifest.compendiumTarget,
    publicNavigationPages: pageState.publicNavigationPages,
    authoredPages: authored.totalPages,
  },
);
addCheck(
  checks,
  "authored-scope-sections-present",
  [...requiredSections].every((section) => Number(authoredBySection[section] || 0) > 0) &&
    Number(authoredBySection["dashboard-reference"] || 0) >= 13 &&
    authoredPagesMissingSources.length === 0,
  "authored corpus must cover manifesto/reference/dashboard/answer/compendium sections with source keys",
  {
    authoredBySection,
    authoredPagesMissingSources: authoredPagesMissingSources.slice(0, 10).map((page) => page.id),
  },
);
addCheck(
  checks,
  "answer-front-door-and-citations",
  answerContract.deterministicReady === true &&
    answerContract.evaluation?.allExactRoutesPass === true &&
    answerContract.evaluation?.allRefusalTestsPass === true &&
    routes.totalRoutes === 820 &&
    faq.totalAnswerable === routes.totalRoutes &&
    chunks.totalChunks >= chunks.totalPages &&
    (chunks.unknownSourceKeys || []).length === 0 &&
    (chunks.pagesMissingChunks || []).length === 0 &&
    answerValidation.reportReady === true &&
    answerValidation.coverage?.passingFixtures === answerValidation.coverage?.totalFixtures &&
    Number(answerValidation.coverage?.citedAnswerFixtures || 0) > 0,
  "answer engine must route exact questions, cite known sources, and pass answer-validation fixtures",
  {
    routes: routes.totalRoutes,
    faqAnswerable: faq.totalAnswerable,
    chunks: chunks.totalChunks,
    citedAnswerFixtures: answerValidation.coverage?.citedAnswerFixtures || 0,
  },
);
addCheck(
  checks,
  "living-docs-loop-local-ready",
  livingDocs.eventContractReady === true &&
    livingDocs.datastoreImplemented === true &&
    livingDocs.sqliteDatastoreImplemented === true &&
    livingDocs.frontendServiceIntegrationImplemented === true &&
    livingDocs.pageFeedbackServiceImplemented === true &&
    livingDocs.gapSummaryJobImplemented === true &&
    livingDocs.moderationExportImplemented === true &&
    livingDocs.metricsExportImplemented === true &&
    livingDocs.backupRestoreImplemented === true &&
    livingDocs.livingDocsProductionReady === false,
  "living-docs loop must be locally implemented while production readiness remains false until #11/#4",
);
addCheck(
  checks,
  "discord-seeded-faq-and-demand-loop",
  discord.corpusReady === true &&
    Number(discord.totals?.importedMessages || 0) > 0 &&
    Number(discord.totals?.questionClusters || 0) > 0 &&
    Number(discord.totals?.lafaAnswerCandidates || 0) > 0 &&
    discord.storesMessageText === false &&
    discordRouting.routingReady === true &&
    discordRouting.rawDiscordTextIncluded === false &&
    discordRouting.sourceAnswerTextIncluded === false &&
    routeCoverage.coverageReady === true &&
    routeCoverage.triageReady === true &&
    routeCoverage.publicCopyReady === true,
  "Discord/Lafa corpus must seed no-raw demand evidence and routing/FAQ review",
  {
    importedMessages: discord.totals?.importedMessages || 0,
    questionClusters: discord.totals?.questionClusters || 0,
    lafaAnswerCandidates: discord.totals?.lafaAnswerCandidates || 0,
    routeCoverage,
  },
);
addCheck(
  checks,
  "primary-source-and-sweep-coverage",
  sourceCatalog.totalSources >= 100 &&
    (sourceCatalog.duplicateKeys || []).length === 0 &&
    sourceIngestion.sourceCompletionReady === true &&
    Number(sourceIngestion.byStatus?.complete || 0) === sourceIngestion.totalSourceRequirements &&
    Number(sourceIngestion.byStatus?.partial || 0) === 0 &&
    Number(sourceIngestion.byStatus?.parked || 0) === 0 &&
    Number(sourceIngestion.byStatus?.missing || 0) === 0 &&
    competitive.plannedAgentLanes === 25 &&
    competitive.targetDocs === 50 &&
    competitive.targetDocsReviewed === 49 &&
    competitive.completedExplorerBatches === 5,
  "primary-source ingestion and competitive sweep must be launch-classified for v1",
  {
    sourceCatalogEntries: sourceCatalog.totalSources,
    sourceIngestion: sourceIngestion.byStatus,
    competitive: {
      lanes: competitive.plannedAgentLanes,
      targetDocs: competitive.targetDocs,
      reviewed: competitive.targetDocsReviewed,
      batches: competitive.completedExplorerBatches,
    },
  },
);
addCheck(
  checks,
  "journeys-ia-and-style-artifacts",
  journeys.totalJourneys >= 5 &&
    volume.volumes.length === 8 &&
    Number(volume.totalChapters || 0) >= 100 &&
    finalReportExists &&
    decisionsExists &&
    sourcesExists &&
    styleguideExists &&
    gapsExists &&
    questionsExists,
  "one IA/style-guide/core artifact set must exist with guided journeys and final report",
  {
    journeys: journeys.totalJourneys,
    volumes: volume.volumes.length,
    chapters: volume.totalChapters || 0,
    artifacts: {
      finalReportExists,
      decisionsExists,
      sourcesExists,
      styleguideExists,
      gapsExists,
      questionsExists,
    },
  },
);
addCheck(
  checks,
  "llm-and-refusal-contracts-current",
  llm.apiContractReady === true &&
    llm.evalHarnessReady === true &&
    llm.runtimeImplemented === true &&
    llm.llmProductionReady === false &&
    liveSuites.total?.passing === liveSuites.total?.total &&
    liveSuites.adversarial?.passing === liveSuites.adversarial?.total &&
    liveSuites.answerValidation?.passing === liveSuites.answerValidation?.total,
  "LLM runtime/eval evidence must pass locally while production LLM readiness remains gated",
  {
    llmProductionReady: llm.llmProductionReady,
    liveSuites,
  },
);
addCheck(
  checks,
  "requirement-map-production-boundary",
  requirements.completionReady === false &&
    valuesEqual(openOperatorIds, [4, 11]) &&
    requirementById.get("answer-engine-front-door")?.status === "partial" &&
    requirementById.get("living-docs-loop")?.status === "partial" &&
    requirementById.get("phase-zero-platform")?.status === "parked" &&
    requirementById.get("deploy-preview")?.status === "parked",
  "completion must remain false with only #4/#11 open and production-dependent requirements incomplete",
  {
    completionReady: requirements.completionReady,
    openOperatorIds,
    statuses: {
      answerEngineFrontDoor: requirementById.get("answer-engine-front-door")?.status || "",
      livingDocsLoop: requirementById.get("living-docs-loop")?.status || "",
      phaseZeroPlatform: requirementById.get("phase-zero-platform")?.status || "",
      deployPreview: requirementById.get("deploy-preview")?.status || "",
    },
  },
);
addCheck(
  checks,
  "quality-gates-match-production-boundary",
  qualityPassed === 29 &&
    qualityTotal === 30 &&
    (quality.gates || []).filter((gate) => gate.passed !== true).map((gate) => gate.id).join(",") === "operator-inbox",
  "quality audit must pass every gate except the expected production operator gate",
  { quality: `${qualityPassed}/${qualityTotal}` },
);
addCheck(
  checks,
  "manual-evidence-reflected-in-audit",
  Boolean(manualEvidence.commit) &&
    Boolean(manualEvidence.launchRun) &&
    Boolean(manualEvidence.releaseRun) &&
    audit.includes(manualEvidence.commit) &&
    audit.includes(manualEvidence.launchRun) &&
    audit.includes(manualEvidence.releaseRun) &&
    audit.includes("strict summary validation") &&
    audit.includes("Open operator Linear tasks | #4=SYN-285, #11=SYN-281") &&
    audit.includes("Secrets printed | false"),
  "completion audit must reflect the latest strict manual launch/release evidence from PROGRESS.md",
  manualEvidence,
);

const failed = checks.filter((check) => !check.passed);
const result = {
  status: failed.length ? "failed" : "passed",
  service: "search-book-completion-audit-check",
  evidence: {
    manifestPages: manifest.pages.length,
    authoredPages: authored.totalPages,
    publicNavigationPages: pageState.publicNavigationPages,
    exactRoutes: routes.totalRoutes,
    faqAnswerable: faq.totalAnswerable,
    chunks: chunks.totalChunks,
    sourceCompletionReady: sourceIngestion.sourceCompletionReady === true,
    completionReady: requirements.completionReady === true,
    llmProductionReady: llm.llmProductionReady === true,
    livingDocsProductionReady: livingDocs.livingDocsProductionReady === true,
    openOperatorIds,
    quality: `${qualityPassed}/${qualityTotal}`,
    manualEvidence,
  },
  checks,
};

const rendered = JSON.stringify(result, null, 2);
if (failed.length) {
  console.error(rendered);
  process.exit(1);
}

console.log(rendered);
