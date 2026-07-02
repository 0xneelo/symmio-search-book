#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const docs = [
  { id: "final-report", relativePath: "FINAL-REPORT.md" },
  { id: "gaps", relativePath: "GAPS.md" },
  { id: "questions", relativePath: "QUESTIONS.md" },
  { id: "completion-audit", relativePath: "COMPLETION-AUDIT.md" },
  { id: "production-readiness-packet", relativePath: "PRODUCTION-READINESS-PACKET.md" },
  { id: "completion-plan", relativePath: "_specs/app-docs/12-search-book-to-100-percent.md" },
  { id: "answer-engine-contract", relativePath: "ANSWER-ENGINE-CONTRACT.md" },
  { id: "llm-rag-contract", relativePath: "LLM-RAG-CONTRACT.md" },
  { id: "answer-validation-harness", relativePath: "ANSWER-VALIDATION-HARNESS.md" },
  { id: "living-docs-operations", relativePath: "LIVING-DOCS-OPERATIONS.md" },
  { id: "source-ingestion-goal", relativePath: "docs/goals/source-ingestion/goal.md" },
  { id: "source-ingestion-plan", relativePath: "docs/goals/source-ingestion/plan.md" },
  { id: "source-ingestion-launch-prompt", relativePath: "docs/goals/source-ingestion/launch-prompt.md" },
  { id: "source-ingestion-execution-protocol", relativePath: "docs/goals/source-ingestion/execution-protocol.md" },
  { id: "readme", relativePath: "README.md" },
];

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(searchBookRoot, relativePath), "utf8"));
}

function readText(relativePath) {
  return fs.readFileSync(path.join(searchBookRoot, relativePath), "utf8");
}

function formatInteger(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function countSyntaxCheckFiles() {
  const scriptDir = path.join(searchBookRoot, "scripts");
  const dataDir = path.join(searchBookRoot, "data");
  const scriptChecks = fs.readdirSync(scriptDir).filter((name) => name.endsWith(".mjs")).length;
  const dataChecks = fs.readdirSync(dataDir).filter((name) => name.endsWith(".js")).length;
  return 1 + scriptChecks + dataChecks;
}

function progressEntries() {
  return readText("PROGRESS.md")
    .split(/\n(?=## \d{4}-\d{2}-\d{2} — )/)
    .filter((entry) => entry.startsWith("## "));
}

function latestProgressEntry(predicate) {
  return progressEntries().find(predicate) || "";
}

function latestManualEvidenceFromProgress() {
  const entry = latestProgressEntry(
    (candidate) =>
      candidate.includes("launch evidence run `") &&
      candidate.includes("release dry-run run `") &&
      candidate.includes("/tmp/search-book-gh-manual-launch-") &&
      candidate.includes("/tmp/search-book-gh-manual-release-"),
  );
  return {
    commit: entry.match(/commit `([a-f0-9]+)`/)?.[1] || "",
    launchRun: entry.match(/launch evidence run `(\d+)`/)?.[1] || "",
    releaseRun: entry.match(/release dry-run run `(\d+)`/)?.[1] || "",
    launchArtifact: entry.match(/(\/tmp\/search-book-gh-manual-launch-\d+)/)?.[1] || "",
    releaseArtifact: entry.match(/(\/tmp\/search-book-gh-manual-release-\d+)/)?.[1] || "",
  };
}

function latestStaticArtifactEvidenceFromProgress() {
  const entry = latestProgressEntry(
    (candidate) =>
      candidate.includes("/tmp/search-book-gh-static-artifact-") &&
      (candidate.includes("static artifact run `") || candidate.includes("workflow run `")),
  );
  return {
    commit: entry.match(/commit `([a-f0-9]+)`/)?.[1] || "",
    run: entry.match(/workflow run `(\d+)`/)?.[1] || entry.match(/static artifact run `(\d+)`/)?.[1] || "",
    artifactRoot: entry.match(/(\/tmp\/search-book-gh-static-artifact-\d+)/)?.[1] || "",
    bytes: entry.match(/([\d,]+) bytes/)?.[1] || "",
  };
}

function latestLocalLaunchEvidenceFromProgress() {
  const entry = latestProgressEntry(
    (candidate) =>
      candidate.includes("search-book:drill-local-launch") &&
      candidate.includes("generatedAt `") &&
      candidate.includes("temporary preview `") &&
      candidate.includes("temporary answer-engine service `"),
  );
  const previewUrl = entry.match(/temporary preview `([^`]+)`/)?.[1] || "";
  const serviceUrl = entry.match(/temporary answer-engine service `([^`]+)`/)?.[1] || "";
  const bareUrl = (value) => value.replace(/^https?:\/\//, "");
  const backupManifest = entry.match(/latest manifest `([^`]+)`/)?.[1] || "";
  const artifactDir = entry.match(/artifacts (?:kept )?under `([^`]+)`/)?.[1] || backupManifest.replace(/\/backups\/latest\.manifest\.json$/, "");
  return {
    commit: entry.match(/current head `([a-f0-9]+)`/)?.[1] || "",
    generatedAt: entry.match(/generatedAt `([^`]+)`/)?.[1] || "",
    previewUrl,
    serviceUrl,
    previewBare: bareUrl(previewUrl),
    serviceBare: bareUrl(serviceUrl),
    artifactDir,
    backupManifest,
    launchReadiness: entry.match(/Launch readiness passed (\d+\/\d+) staging checks/)?.[1] || "",
    syntaxChecks: entry.match(/(\d+) syntax checks/)?.[1] || "",
  };
}

function fragmentsForEvidence() {
  const manifest = readJson("page-manifest.json");
  const authored = readJson("data/authored-pages.json");
  const pageState = readJson("data/page-state-registry.json");
  const routes = readJson("data/question-routes.json");
  const faq = readJson("data/faq.json");
  const chunks = readJson("data/answer-chunks.json");
  const answerContract = readJson("data/answer-engine-contract.json");
  const answerValidation = readJson("data/answer-validation-report.json");
  const livingDocs = readJson("data/living-docs-events.json");
  const publicationPlan = readJson("data/publication-plan.json");
  const sourceIngestion = readJson("data/source-ingestion.json");
  const requirements = readJson("data/requirement-map.json");
  const quality = readJson("data/quality-audit.json");
  const discord = readJson("data/discord-corpus.json");
  const discordRouting = readJson("data/discord-review-routing.json");
  const discordEditorialQueue = readJson("data/discord-editorial-queue.json");
  const llm = readJson("data/llm-rag-contract.json");

  const qualityPassed = (quality.gates || []).filter((gate) => gate.passed).length;
  const qualityTotal = (quality.gates || []).length;
  const sourceStatus = {
    complete: sourceIngestion.byStatus?.complete || 0,
    partial: sourceIngestion.byStatus?.partial || 0,
    parked: sourceIngestion.byStatus?.parked || 0,
    missing: sourceIngestion.byStatus?.missing || 0,
  };
  const requirementStatus = {
    complete: requirements.byStatus?.complete || 0,
    partial: requirements.byStatus?.partial || 0,
    parked: requirements.byStatus?.parked || 0,
    missing: requirements.byStatus?.missing || 0,
  };
  const routeCoverage = discordRouting.reviewPlan?.routeCoverage || {};
  const answerEvaluation = answerContract.evaluation || {};
  const answerValidationCoverage = answerValidation.coverage || {};
  const glossaryRoutesByRuntimeAction = answerEvaluation.glossaryRoutesByRuntimeAction || {};
  const live = llm.liveEvaluation || {};
  const suites = live.suites || {};
  const measuredUsage = live.measuredUsage || {};
  const editorialDisposition = discordEditorialQueue.disposition || {};
  const editorialWorkflow = discordEditorialQueue.reviewerWorkflow || {};
  const editorialWorkflowCounts = editorialWorkflow.counts || {};
  const manualEvidence = latestManualEvidenceFromProgress();
  const staticArtifactEvidence = latestStaticArtifactEvidenceFromProgress();
  const localLaunchEvidence = latestLocalLaunchEvidenceFromProgress();

  return {
    manifestPages: String(manifest.pages.length),
    authoredPages: String(authored.totalPages),
    publicNavigationPages: String(pageState.publicNavigationPages),
    sourceCompanionPages: String(pageState.sourceCompanionPages),
    sourceCompanionCoverage: `${publicationPlan.totals?.sourceCompanionsCoveredByAuthoredPages || 0}/${publicationPlan.totals?.sourceCompanionsQueued || 0}`,
    internalDraftPages: String(pageState.internalDraftPages),
    candidatePages: String(pageState.candidatePages || 0),
    exactRoutes: String(routes.totalRoutes),
    reconciliationQuestions: String(routes.totalReconciliationQuestions || 0),
    exactRouteTests: `${answerEvaluation.exactRouteTestsPassing || 0}/${answerEvaluation.totalExactRouteTests || 0}`,
    exactRouteTestsPassing: String(answerEvaluation.exactRouteTestsPassing || 0),
    glossaryRouteTests: `${answerEvaluation.glossaryRouteTestsPassing || 0}/${answerEvaluation.totalGlossaryRouteTests || 0}`,
    glossaryRouteTestsPassing: String(answerEvaluation.glossaryRouteTestsPassing || 0),
    glossaryPublicRoutes: String(glossaryRoutesByRuntimeAction["route-to-public-page"] || 0),
    glossaryRetrievalOnlyRoutes: String(glossaryRoutesByRuntimeAction["retrieve-context-without-public-primary"] || 0),
    glossaryFailingRoutes: String((answerEvaluation.failingGlossaryRouteIds || []).length),
    refusalTests: `${answerEvaluation.refusalTestsPassing || 0}/${answerEvaluation.totalRefusalTests || 0}`,
    refusalTestsPassing: String(answerEvaluation.refusalTestsPassing || 0),
    livingDocsEventContractReady: String(Boolean(livingDocs.eventContractReady)),
    livingDocsFixtures: `${livingDocs.coverage?.passingFixtures || 0}/${livingDocs.coverage?.totalFixtures || 0}`,
    livingDocsReviewerWorkflowDocumented: String(Boolean(livingDocs.reviewerWorkflowDocumented)),
    livingDocsProductionReady: String(Boolean(livingDocs.livingDocsProductionReady)),
    answerValidationFixtures: `${answerValidationCoverage.passingFixtures || 0}/${answerValidationCoverage.totalFixtures || 0}`,
    answerValidationCitedFixtures: String(answerValidationCoverage.citedAnswerFixtures || 0),
    answerValidationGroundedAdversarialFixtures: String(answerValidationCoverage.groundedAdversarialFixtures || 0),
    answerValidationRefusalFixtures: String(answerValidationCoverage.refusalFixtures || 0),
    answerValidationFailingFixtures: String(answerValidationCoverage.failingFixtures || 0),
    answerValidationExactRouteGoldenSet: String(answerValidationCoverage.exactRouteGoldenSet || 0),
    answerValidationAdversarialGoldenSet: String(answerValidationCoverage.adversarialGoldenSet || 0),
    faqEntries: String(faq.totalEntries),
    chunks: formatInteger(chunks.totalChunks),
    chunksRaw: String(chunks.totalChunks),
    sourceIngestion: `${sourceStatus.complete}/${sourceIngestion.totalSourceRequirements}`,
    sourceComplete: String(sourceStatus.complete),
    sourcePartial: String(sourceStatus.partial),
    sourceParked: String(sourceStatus.parked),
    sourceMissing: String(sourceStatus.missing),
    sourceCompletionReady: String(Boolean(sourceIngestion.sourceCompletionReady)),
    requirementComplete: String(requirementStatus.complete),
    requirementPartial: String(requirementStatus.partial),
    requirementParked: String(requirementStatus.parked),
    requirementMissing: String(requirementStatus.missing),
    completionReady: String(Boolean(requirements.completionReady)),
    qualityGates: `${qualityPassed}/${qualityTotal}`,
    discordStatus: discord.status || "",
    discordCorpusReady: String(Boolean(discord.corpusReady)),
    discordMessages: formatInteger(discord.totals?.importedMessages || 0),
    discordClusters: formatInteger(discord.totals?.questionClusters || 0),
    discordLafaCandidates: formatInteger(discord.totals?.lafaAnswerCandidates || 0),
    discordStoresMessageText: String(Boolean(discord.storesMessageText)),
    discordRoutedItems: String(discordRouting.summary?.routedItems || 0),
    discordPageFitCoverage: `${routeCoverage.pageFitCoveredByPublicRoutes || 0}/${routeCoverage.totalPageFitGroups || 0}`,
    discordPageFitTriage: `${routeCoverage.triageReadyPageFitGroups || 0}/${routeCoverage.totalPageFitGroups || 0}`,
    discordSourceBackedPageFits: `${routeCoverage.sourceBackedPageFitGroups || 0}/${routeCoverage.totalPageFitGroups || 0}`,
    discordPublicCopyReady: `${routeCoverage.publicCopyReadyPageFitGroups || 0}/${routeCoverage.totalPageFitGroups || 0}`,
    discordPublicCopyReviewRequired: `${routeCoverage.publicCopyReviewRequired || 0}/${routeCoverage.totalPageFitGroups || 0}`,
    discordRefusalPolicyReady: `${discordRouting.reviewPlan?.refusalPolicyReadyItems || 0}/${discordRouting.reviewPlan?.refusalReviewReady || 0}`,
    discordRefusalPolicyReviewRequired: `${discordRouting.reviewPlan?.refusalPolicyReviewRequired || 0}/${discordRouting.reviewPlan?.refusalReviewReady || 0}`,
    discordSingleRouteRemaining: String(routeCoverage.pageFitSingleRouteRemaining || 0),
    discordTotalPublicRoutesToPageFitPages: String(routeCoverage.totalPublicRoutesToPageFitPages || 0),
    discordEditorialReadyForReviewerHandoff: String(Boolean(editorialDisposition.readyForReviewerHandoff)),
    discordEditorialKeepCopy: `${editorialDisposition.pageFitKeepExistingPublicCopy || 0}/${editorialDisposition.pageFitGroups || 0}`,
    discordEditorialKeepRefusal: `${editorialDisposition.refusalKeepPolicy || 0}/${editorialDisposition.refusalItems || 0}`,
    discordEditorialCopyChanges: String(editorialDisposition.publicCopyChangesProposed || 0),
    discordEditorialExactPromotions: String(editorialDisposition.exactDiscordStatementsPromoted || 0),
    discordEditorialWorkflowStatus: editorialWorkflow.status || "",
    discordEditorialWorkflowMode: editorialWorkflow.mode || "",
    discordEditorialWorkflowPhases: String((editorialWorkflow.phaseOrder || []).length),
    discordEditorialWorkflowPageFitGroups: String(editorialWorkflowCounts.pageFitGroups || 0),
    discordEditorialWorkflowRefusalItems: String(editorialWorkflowCounts.refusalItems || 0),
    syntaxChecks: String(countSyntaxCheckFiles()),
    liveEvalTotal: suites.total ? `${suites.total.passing}/${suites.total.total}` : "",
    liveEvalAdversarial: suites.adversarial ? `${suites.adversarial.passing}/${suites.adversarial.total}` : "",
    liveEvalAnswerValidation: suites.answerValidation ? `${suites.answerValidation.passing}/${suites.answerValidation.total}` : "",
    liveEvalAdversarialTotal: String(suites.adversarial?.total || 0),
    liveEvalProvider: live.provider || "",
    liveEvalModel: live.model || "",
    liveEvalCalls: String(measuredUsage.calls || 0),
    liveEvalInputTokens: formatInteger(measuredUsage.inputTokens || 0),
    liveEvalOutputTokens: formatInteger(measuredUsage.outputTokens || 0),
    liveEvalEstimatedCost: `$${measuredUsage.estimatedCostUsd || 0}`,
    manualEvidence,
    staticArtifactEvidence,
    localLaunchEvidence,
    openOperatorItems: (requirements.openOperatorItems || []).map((item) => String(item.id)).sort((a, b) => Number(a) - Number(b)),
  };
}

function expectedChecks(evidence) {
  const openOperatorFragments = evidence.openOperatorItems.map((id) => `#${id}`);
  const required = (value, label) => value || `<missing ${label}>`;
  const localLaunch = evidence.localLaunchEvidence;
  return {
    "FINAL-REPORT.md": [
      { id: "manifest-pages", allOf: [`${evidence.manifestPages} manifest pages`] },
      { id: "authored-pages", allOf: [`${evidence.authoredPages} authored pages`] },
      { id: "public-navigation-pages", allOf: [`${evidence.publicNavigationPages} published public-navigation pages`] },
      { id: "source-companions", allOf: [`${evidence.sourceCompanionPages} source companions`] },
      { id: "internal-drafts", allOf: [`${evidence.internalDraftPages} internal drafts`] },
      { id: "exact-routes", allOf: [`${evidence.exactRoutes} exact`] },
      { id: "faq-entries", allOf: [`${evidence.faqEntries} local FAQ entries`] },
      { id: "chunks", anyOf: [`${evidence.chunks} retrieval chunks`, `${evidence.chunksRaw} retrieval chunks`] },
      { id: "source-ingestion", anyOf: [`${evidence.sourceIngestion} requirements complete`, `${evidence.sourceIngestion} complete`] },
      { id: "source-zero-counts", anyOf: [`0 partial, 0 parked, and 0 missing`, `0 partial / 0 parked / 0 missing`] },
      { id: "discord-corpus", allOf: [`${evidence.discordMessages} messages`, `${evidence.discordClusters} question clusters`, `${evidence.discordLafaCandidates} configured Lafa answer candidates`] },
      { id: "discord-routing", allOf: [`${evidence.discordRoutedItems} local review items`, `${evidence.discordPageFitCoverage} page-fit`, `source-backed triage at ${evidence.discordPageFitTriage} page-fit groups`, `public-copy ready for ${evidence.discordPublicCopyReady} page-fit groups`, `refusal policy ready at ${evidence.discordRefusalPolicyReady} refusal items`] },
      { id: "manual-evidence", allOf: [`launch evidence run \`${evidence.manualEvidence.launchRun}\``, `release dry-run run \`${evidence.manualEvidence.releaseRun}\``, `commit \`${evidence.manualEvidence.commit}\``, evidence.manualEvidence.launchArtifact, evidence.manualEvidence.releaseArtifact, "strict summary validation", "Open operator Linear tasks | #4=SYN-285, #11=SYN-281", "Secrets printed | false"] },
      { id: "static-artifact-evidence", allOf: [`run \`${evidence.staticArtifactEvidence.run}\``, `commit \`${evidence.staticArtifactEvidence.commit}\``, evidence.staticArtifactEvidence.artifactRoot, evidence.staticArtifactEvidence.bytes, "check-static-artifact-packet", "smoke-preview-service"] },
      { id: "local-launch-evidence", allOf: [required(localLaunch.generatedAt, "local launch generatedAt"), required(localLaunch.previewUrl, "local launch preview URL"), required(localLaunch.serviceUrl, "local launch service URL"), required(localLaunch.artifactDir, "local launch artifact dir"), required(localLaunch.backupManifest, "local launch backup manifest"), required(localLaunch.launchReadiness, "local launch readiness"), "no LLM API key loaded"] },
      { id: "clean-release-evidence", allOf: ["search-book-release-dry-run-discord-editorial-data", "repository dirty state `false`", "same commit", "productionReadinessPacket:passed", "Discord editorial queue data evidence", "original-spec reconciliation evidence", "evidence summary renderer status `passed`", "publication boundaries status `passed`", "backup-restore evidence", "living-docs review evidence"] },
      { id: "requirement-map", anyOf: [`${evidence.requirementComplete}/18 requirements complete`, `${evidence.requirementComplete} requirements complete`] },
      { id: "requirement-status", allOf: [`${evidence.requirementPartial} partial, ${evidence.requirementParked} parked, and ${evidence.requirementMissing} missing`] },
      { id: "quality-gates", allOf: [`${evidence.qualityGates} gates`] },
      { id: "syntax-checks", allOf: [`${evidence.syntaxChecks} syntax checks`] },
      { id: "workflow-contract", allOf: ["GitHub workflow contract consistency", "search-book:check-github-workflows"] },
      { id: "living-docs-review-evidence", allOf: ["no-secret living-docs reviewer evidence privacy", "search-book:check-living-docs-review"] },
      { id: "production-packet", allOf: ["production-readiness packet consistency", "search-book:check-production-packet"] },
      { id: "llm-eval", allOf: [evidence.liveEvalTotal, evidence.liveEvalAdversarial, evidence.liveEvalAnswerValidation] },
      { id: "operator-gates", allOf: openOperatorFragments },
    ],
    "GAPS.md": [
      { id: "discord-reconciliation", allOf: ["G-001: Discord Source Mining Is Imported, Editorial Review Required", "resolves OPERATOR-INBOX #2", "Do not re-open #2", "OPERATOR-INBOX #17 is resolved", "internal-only"] },
      { id: "discord-corpus", allOf: [`${evidence.discordMessages} imported messages`, `${evidence.discordClusters} question clusters`, `${evidence.discordLafaCandidates} configured Lafa answer candidates`, `corpusReady:${evidence.discordCorpusReady}`, `storesMessageText:${evidence.discordStoresMessageText}`] },
      { id: "discord-routing", allOf: [`${evidence.discordRoutedItems} review items`, `${evidence.discordPageFitCoverage} page-fit groups covered by public route aliases`, `${evidence.discordSingleRouteRemaining} single-route groups remaining`, `${evidence.discordTotalPublicRoutesToPageFitPages} public exact routes`, `${evidence.discordEditorialKeepCopy} page-fit groups keeping existing source-backed public copy`, `${evidence.discordEditorialKeepRefusal} refusal items keeping refusal policy`, `${evidence.discordEditorialCopyChanges} public-copy changes proposed`, `${evidence.discordEditorialExactPromotions} exact Discord/Lafa statements promoted`] },
      { id: "manifest-authoring", allOf: [`${evidence.manifestPages} manifest pages`, `${evidence.authoredPages} authored pages`, `${evidence.publicNavigationPages} public-navigation pages`, `${evidence.sourceCompanionCoverage} source companions covered by authored pages`, `${evidence.candidatePages} candidate pages remaining`] },
      { id: "resolved-source-boundaries", allOf: ["Discord, Notion, SSHE, and whitepaper v1 de-scope are resolved", "Do not re-open OPERATOR-INBOX #6", "Do not re-open OPERATOR-INBOX #5", "Do not quote Notion text", "All publication-stance and source-ingestion questions are now resolved for v1"] },
      { id: "operator-gates", allOf: ["remaining production operator gates are production VPS env install (#11) and public frontend platform/deploy route (#4)", "only remaining production operator gates are OPERATOR-INBOX #11 production VPS env install and #4 public frontend platform/repo/deploy route", ...openOperatorFragments] },
    ],
    "QUESTIONS.md": [
      { id: "generated-coverage", allOf: [`${evidence.exactRoutes} answerable question routes`, `${evidence.reconciliationQuestions} reconciliation questions`, `${evidence.faqEntries} FAQ entries`, `${evidence.exactRouteTests} exact-route tests`, `${evidence.glossaryRouteTests} glossary route tests`, `${evidence.refusalTests} refusal tests`, `${evidence.answerValidationFixtures} fixtures`, `live ${evidence.liveEvalProvider} \`${evidence.liveEvalModel}\` eval passes ${evidence.liveEvalTotal}`] },
      { id: "approved-public-answers", allOf: ["What was AMFQ?", "legacy Automated Market for Quotes name", "networkVolume × platformFeeRate × referrerPlatformShare", "0.05% / 5 bps platform fee and 30% referrer platform share", "Phase B economics are out of scope for v1", "Public referral depth is fifteen levels", "historical backfill is additive and never lowers a balance"] },
      { id: "discord-boundary", allOf: ["Discord/Lafa import is internal-only", `${evidence.discordMessages} imported messages`, `${evidence.discordClusters} question clusters`, `${evidence.discordLafaCandidates} configured Lafa answer candidates`, "raw Discord/Lafa text stays out of public answers", "specific Discord/Lafa claims remain non-public until editorial review"] },
      { id: "service-boundary", allOf: ["standalone answer-engine service", "persists questions, ratings, page feedback", "gated moderation and metrics exports", "backup/restore evidence in SQLite"] },
      { id: "operator-gates", allOf: ["only #11 production VPS env install and #4 public frontend/deploy route open", "Production wiring remains gated by #11 production VPS env install and #4 public frontend/deploy route", ...openOperatorFragments] },
    ],
    "COMPLETION-AUDIT.md": [
      { id: "source-ingestion", allOf: [`${evidence.sourceIngestion} source families complete`] },
      { id: "source-zero-counts", allOf: [`0 partial, 0 parked, 0 missing`] },
      { id: "quality-gates", allOf: [`${evidence.qualityGates} gates`] },
      { id: "discord-corpus", allOf: [`${evidence.discordMessages} messages`, `${evidence.discordClusters} question clusters`, `${evidence.discordLafaCandidates} configured Lafa candidates`] },
      { id: "discord-routing", allOf: [`${evidence.discordRoutedItems} routed items`, `${evidence.discordPageFitCoverage} page-fit groups`, `source-backed triage ${evidence.discordPageFitTriage} page-fit groups`, `public-copy ready ${evidence.discordPublicCopyReady} page-fit groups`, `refusal policy ready ${evidence.discordRefusalPolicyReady} refusal items`] },
      { id: "routes", allOf: [`${evidence.exactRoutes} exact routes`] },
      { id: "faq", allOf: [`${evidence.faqEntries} FAQ entries`] },
      { id: "chunks", anyOf: [`${evidence.chunks} chunks`, `${evidence.chunksRaw} chunks`] },
      { id: "authored", allOf: [`${evidence.authoredPages} authored pages`] },
      { id: "page-state", allOf: [`${evidence.publicNavigationPages} published public-navigation pages`, `${evidence.sourceCompanionPages} source companions`, `${evidence.internalDraftPages} internal drafts`] },
      { id: "live-eval", allOf: [evidence.liveEvalTotal] },
      { id: "static-artifact-evidence", allOf: [`run \`${evidence.staticArtifactEvidence.run}\``, `commit \`${evidence.staticArtifactEvidence.commit}\``, evidence.staticArtifactEvidence.artifactRoot, evidence.staticArtifactEvidence.bytes, "check-static-artifact-packet", "smoke-preview-service"] },
      { id: "local-launch-evidence", allOf: [required(localLaunch.generatedAt, "local launch generatedAt"), required(localLaunch.previewUrl, "local launch preview URL"), required(localLaunch.serviceUrl, "local launch service URL"), required(localLaunch.artifactDir, "local launch artifact dir"), required(localLaunch.backupManifest, "local launch backup manifest"), required(localLaunch.launchReadiness, "local launch readiness")] },
      { id: "workflow-contract", allOf: ["search-book:check-github-workflows", "workflow contract guard"] },
      { id: "living-docs-review-evidence", allOf: ["search-book:check-living-docs-review", "living-docs reviewer evidence"] },
      { id: "production-packet", allOf: ["search-book:check-production-packet", "production-readiness packet guard"] },
      { id: "clean-release-evidence", allOf: ["search-book-release-dry-run-discord-editorial-data", "repository dirty state `false`", "same commit", "productionReadinessPacket:passed", "Discord editorial queue data evidence", "original-spec reconciliation evidence", "evidence summary renderer evidence `passed`", "publication-boundary evidence `passed`", "backup-restore evidence", "living-docs review evidence"] },
      { id: "completion-boundary", allOf: openOperatorFragments },
    ],
    "PRODUCTION-READINESS-PACKET.md": [
      { id: "routes", allOf: [`${evidence.exactRoutes} exact routes`] },
      { id: "chunks", anyOf: [`${evidence.chunks} chunks`, `${evidence.chunksRaw} chunks`] },
      { id: "authored", allOf: [`${evidence.authoredPages} authored pages`] },
      { id: "source-ingestion", allOf: [`${evidence.sourceIngestion}`] },
      { id: "source-zero-counts", anyOf: [`0 partial / 0 parked / 0 missing`, `0 partial, 0 parked, and 0 missing`] },
      { id: "quality-gates", allOf: [`${evidence.qualityGates}`] },
      { id: "static-artifact-evidence", allOf: [`run \`${evidence.staticArtifactEvidence.run}\``, `commit \`${evidence.staticArtifactEvidence.commit}\``, evidence.staticArtifactEvidence.artifactRoot, "checked packet validation plus static and preview-service smokes"] },
      { id: "local-launch-evidence", allOf: [required(localLaunch.generatedAt, "local launch generatedAt"), required(localLaunch.previewBare, "local launch preview URL"), required(localLaunch.serviceBare, "local launch service URL"), required(localLaunch.launchReadiness, "local launch readiness"), "write-smoke", "restore-check"] },
      { id: "discord-route-coverage", allOf: [`${evidence.discordPageFitCoverage} page-fit groups`, `${evidence.discordSingleRouteRemaining} single-route groups`, `source-backed triage ${evidence.discordPageFitTriage} page-fit groups`, `public-copy ready ${evidence.discordPublicCopyReady} page-fit groups`, `refusal policy ready ${evidence.discordRefusalPolicyReady} refusal items`] },
      { id: "discord-queue-data-proof", allOf: ["Discord editorial queue data evidence reports `passed`", `\`queueReady:true\`, ${evidence.discordRoutedItems} routed items, ${evidence.discordPageFitCoverage.split("/")[1]} page-fit groups, ${evidence.discordRefusalPolicyReady.split("/")[1]} refusal-review items, 0 raw-key hits, 0 sample leaks, and \`valuesPrinted:false\``] },
      { id: "backup-restore-evidence", allOf: ["backup-restore evidence passed", "4/4 tables matched"] },
      { id: "workflow-contract", allOf: ["GitHub workflow contract evidence reports 4/4 expected workflows"] },
      { id: "living-docs-review-evidence", allOf: ["living-docs review evidence passed", "living-docs reviewer evidence reports"] },
      { id: "production-packet", allOf: ["npm run search-book:check-production-packet"] },
      { id: "operator-gates", allOf: openOperatorFragments },
    ],
    "_specs/app-docs/12-search-book-to-100-percent.md": [
      { id: "snapshot-date", allOf: ["refreshed 2026-07-02"] },
      { id: "manifest-pages", allOf: [`${evidence.manifestPages} manifest pages`] },
      { id: "authored-public-corpus", allOf: [`${evidence.authoredPages} authored pages`, `${evidence.publicNavigationPages} public-navigation pages`, `${evidence.exactRoutes} exact public question routes`, `${evidence.candidatePages} candidates`] },
      { id: "source-companion-coverage", allOf: [`${evidence.sourceCompanionCoverage} source companions covered by authored pages`] },
      { id: "requirement-map", allOf: [`${evidence.requirementComplete}/18 complete, ${evidence.requirementPartial} partial, ${evidence.requirementParked} parked, ${evidence.requirementMissing} missing`] },
      { id: "quality-audit", allOf: [`${evidence.qualityGates} gates passing`] },
      { id: "source-ingestion", allOf: [`${evidence.sourceIngestion} complete, ${evidence.sourcePartial} partial, ${evidence.sourceParked} parked, ${evidence.sourceMissing} missing`] },
      { id: "deterministic-answer-engine", allOf: [`${evidence.exactRouteTestsPassing} exact-route tests pass`, `${evidence.glossaryRouteTestsPassing} glossary route tests pass`, `${evidence.refusalTestsPassing} refusal tests pass`] },
      { id: "llm-eval", allOf: [`Live ${evidence.liveEvalProvider} \`${evidence.liveEvalModel}\` eval passed ${evidence.liveEvalTotal}`] },
      { id: "discord-corpus", allOf: [`${evidence.discordMessages} messages`, `${evidence.discordClusters} question clusters`, `${evidence.discordLafaCandidates} configured Lafa candidates`] },
      { id: "operator-gates", allOf: ["OPERATOR-INBOX #11", "OPERATOR-INBOX #4", ...openOperatorFragments] },
    ],
    "ANSWER-ENGINE-CONTRACT.md": [
      { id: "exact-route-tests", allOf: [`${evidence.exactRouteTests} exact-route tests`] },
      { id: "glossary-route-tests", allOf: [`${evidence.glossaryRouteTests} glossary route tests`] },
      { id: "refusal-tests", allOf: [`${evidence.refusalTests} refusal tests`] },
      { id: "living-docs-fixtures", allOf: [`${evidence.livingDocsFixtures} event fixtures`] },
      { id: "glossary-breakdown", allOf: [`${evidence.glossaryPublicRoutes} route to a public page`, `${evidence.glossaryRetrievalOnlyRoutes} are retrieval-context-only`, `${evidence.glossaryFailingRoutes} failing glossary route ids`] },
      { id: "service-runtime", allOf: ["gated moderation and metrics exports", "GET /api/search-book/metrics", "backup/restore-check utility"] },
      { id: "production-boundary", allOf: ["llmProductionReady` intentionally remains false", "production VPS service env and public route/deploy wiring remain open"] },
    ],
    "LLM-RAG-CONTRACT.md": [
      { id: "generated-proof", allOf: ["API contract", "runtime harness", "executable exact-route/glossary preflight", `${evidence.liveEvalAdversarialTotal} adversarial eval cases are specified`] },
      { id: "status-evidence-guard", allOf: ["checked by `npm run search-book:check-status-evidence`", "against `data/llm-rag-contract.json`"] },
      { id: "live-eval-suite-counts", allOf: [`${evidence.liveEvalProvider}-backed live \`${evidence.liveEvalModel}\` validation run`, `${evidence.liveEvalTotal} total fixtures passed`, `${evidence.liveEvalAdversarial} adversarial cases`, `${evidence.liveEvalAnswerValidation} answer-validation cases`] },
      { id: "live-eval-usage", allOf: [`${evidence.liveEvalCalls} measured calls`, `${evidence.liveEvalInputTokens} input tokens`, `${evidence.liveEvalOutputTokens} output tokens`, `estimated cost of ${evidence.liveEvalEstimatedCost}`] },
      { id: "answer-validation-harness", allOf: ["ANSWER-VALIDATION-HARNESS.md", "data/answer-validation-report.json", "actual model responses before production launch"] },
      { id: "runtime-env-boundary", allOf: ["SEARCH_BOOK_LLM_API_STYLE=openai-compatible", "SEARCH_BOOK_LLM_ALLOW_EXTERNAL_CONTEXT=true", "`--mode llm` fails closed", "not printed or persisted"] },
      { id: "production-boundary", allOf: ["`llmProductionReady` intentionally remains false", "production VPS service env", "public frontend/deploy wiring"] },
    ],
    "ANSWER-VALIDATION-HARNESS.md": [
      { id: "fixture-families", allOf: ["three fixture families", "cited-answer fixtures sampled from the deterministic exact-route golden set", "grounded adversarial fixtures", "refusal fixtures derived from `data/llm-rag-contract.json` adversarial cases"] },
      { id: "generated-coverage", allOf: [`${evidence.answerValidationFixtures} passing fixtures`, `${evidence.answerValidationFailingFixtures} failures`, `${evidence.answerValidationCitedFixtures} cited-answer fixtures`, `${evidence.answerValidationGroundedAdversarialFixtures} grounded adversarial fixtures`, `${evidence.answerValidationRefusalFixtures} refusal fixtures`] },
      { id: "golden-sets", allOf: [`${evidence.answerValidationExactRouteGoldenSet} exact-route golden set`, `${evidence.answerValidationAdversarialGoldenSet} adversarial golden set`] },
      { id: "status-evidence-guard", allOf: ["checked by `npm run search-book:check-status-evidence`", "against `data/answer-validation-report.json`"] },
      { id: "production-boundary", allOf: ["Production readiness still requires running the same validation against actual model responses"] },
    ],
    "LIVING-DOCS-OPERATIONS.md": [
      { id: "runtime-contract", allOf: [`${evidence.livingDocsFixtures} event fixtures`, `event contract ready=${evidence.livingDocsEventContractReady}`, `reviewer workflow documented=${evidence.livingDocsReviewerWorkflowDocumented}`, `livingDocsProductionReady:${evidence.livingDocsProductionReady}`] },
      { id: "discord-closeout-counts", allOf: [`${evidence.discordRoutedItems} routed Discord/Lafa review items`, `${evidence.discordPageFitCoverage} page-fit groups covered by public route aliases`, `${evidence.discordPageFitTriage} source-backed existing page fits`, `${evidence.discordPublicCopyReady} page-fit groups with public copy sufficient`, `${evidence.discordPublicCopyReviewRequired} page-fit groups requiring public-copy review`, `${evidence.discordRefusalPolicyReady} refusal items with policy ready`, `${evidence.discordRefusalPolicyReviewRequired} refusal items requiring policy review`] },
      { id: "discord-closeout-disposition", allOf: [`${evidence.discordEditorialKeepCopy} page-fit groups keep existing source-backed public copy`, `${evidence.discordEditorialKeepRefusal} refusal items keep refusal policy`, `${evidence.discordEditorialCopyChanges} public-copy changes proposed`, `${evidence.discordEditorialExactPromotions} exact Discord/Lafa statements promoted`] },
      { id: "discord-workflow-boundary", allOf: [`Workflow status: \`${evidence.discordEditorialWorkflowStatus}\``, `Workflow mode: \`${evidence.discordEditorialWorkflowMode}\``, `${evidence.discordEditorialWorkflowPhases} phases`, `${evidence.discordEditorialWorkflowPageFitGroups} page-fit groups`, `${evidence.discordEditorialWorkflowRefusalItems} refusal items`, "Do not use Discord/Lafa alone as the source for public copy"] },
      { id: "production-boundary", allOf: ["production still needs the selected public route", "production VPS service environment", "Production service setup:", "node --env-file=/etc/symmio-search-book/search-book.env"] },
    ],
    "docs/goals/source-ingestion/goal.md": [
      { id: "completed-state", allOf: ["Source ingestion is complete for v1", `${evidence.sourceIngestion} complete`, `${evidence.sourcePartial} partial`, `${evidence.sourceParked} parked`, `${evidence.sourceMissing} missing`, `sourceCompletionReady:${evidence.sourceCompletionReady}`] },
      { id: "discord-import", allOf: [`status:"${evidence.discordStatus}"`, `corpusReady:${evidence.discordCorpusReady}`, `${evidence.discordMessages} imported messages`, `${evidence.discordClusters} question clusters`, `${evidence.discordLafaCandidates} configured Lafa answer candidates`, `storesMessageText:${evidence.discordStoresMessageText}`] },
      { id: "requirement-boundary", allOf: [`${evidence.requirementComplete} complete`, `${evidence.requirementPartial} partial`, `${evidence.requirementParked} parked`, `${evidence.requirementMissing} missing`, `completionReady:${evidence.completionReady}`] },
      { id: "operator-boundary", allOf: ["Only #11 and #4 are production operator gates", "#17 is resolved and must not be reopened", "#2, #5, #6, #7, #12, or #17"] },
    ],
    "docs/goals/source-ingestion/plan.md": [
      { id: "current-counts", allOf: ["Source ingestion: 17 complete, 0 parked", "Discord corpus: imported-needs-review", `${evidence.discordMessages} messages`, `${evidence.discordClusters} question clusters`, `${evidence.discordLafaCandidates} configured Lafa answer candidates`, "Open operator items: #11 and #4 only"] },
      { id: "resolved-17", allOf: ["Discord and #17 are resolved for v1", "Keep OPERATOR-INBOX #17 resolved", "do not reopen #2"] },
      { id: "out-of-scope", allOf: ["Production VPS env install (#11)", "Public deploy route/platform decision (#4)", "Reopening #2, #5, #6, #7, #12, or #17"] },
    ],
    "docs/goals/source-ingestion/launch-prompt.md": [
      { id: "current-ground-truth", allOf: ["v1 Discord/#17 follow-up is already resolved", `${evidence.discordMessages} messages`, `${evidence.discordClusters} question clusters`, `${evidence.discordLafaCandidates} configured Lafa answer candidates`, "no raw message text stored", "Production env #11 and deploy route #4 are still production gates"] },
      { id: "task-boundary", allOf: ["open operator boundary is still only #11 and #4", "Do not reopen #2, #5, #6, #7, #12, or #17"] },
    ],
    "docs/goals/source-ingestion/execution-protocol.md": [
      { id: "maintenance-state", allOf: ["source-ingestion maintenance after the v1 source follow-up completion", "Do not reopen resolved operator items #2, #5, #6, #7, #12, or #17"] },
      { id: "linear-boundary", allOf: ["SYN-289: readable Discord export file release (#17, resolved)", "SYN-281: production VPS env install (#11)", "SYN-285: public frontend platform/repo/deploy route (#4)"] },
    ],
    "README.md": [
      { id: "check-status-script", allOf: ["search-book:check-status-evidence"] },
      { id: "verify-command", allOf: ["npm run search-book:verify"] },
      { id: "discord-artifacts-script", allOf: ["search-book:check-discord-review-artifacts"] },
      { id: "spec-reconciliation-evidence", allOf: ["original-spec reconciliation"] },
      { id: "backup-restore-script", allOf: ["search-book:check-backup-restore"] },
      { id: "workflow-contract-script", allOf: ["search-book:check-github-workflows"] },
      { id: "living-docs-review-script", allOf: ["search-book:check-living-docs-review"] },
      { id: "production-packet-script", allOf: ["search-book:check-production-packet", "production-readiness packet guard"] },
    ],
  };
}

function checkDocument(doc, checks) {
  const text = readText(doc.relativePath);
  const missing = checks
    .map((check) => {
      const allOf = (check.allOf || []).filter(Boolean);
      const anyOf = (check.anyOf || []).filter(Boolean);
      const missingAllOf = allOf.filter((fragment) => !text.includes(fragment));
      const anyOfPassed = anyOf.length === 0 || anyOf.some((fragment) => text.includes(fragment));
      return {
        id: check.id,
        expectedAllOf: allOf,
        expectedAnyOf: anyOf,
        missing: [
          ...missingAllOf,
          ...(!anyOfPassed ? [`one of: ${anyOf.join(" | ")}`] : []),
        ],
      };
    })
    .filter((check) => check.missing.length > 0);
  return {
    id: doc.id,
    path: doc.relativePath,
    passed: missing.length === 0,
    missing,
  };
}

const evidence = fragmentsForEvidence();
const checksByPath = expectedChecks(evidence);
const documents = docs.map((doc) => checkDocument(doc, checksByPath[doc.relativePath] || []));
const failures = documents.filter((doc) => !doc.passed);
const result = {
  status: failures.length ? "failed" : "passed",
  service: "search-book-status-evidence",
  evidence,
  documents,
};

const rendered = JSON.stringify(result, null, 2);
if (failures.length) {
  console.error(rendered);
  process.exit(1);
}

console.log(rendered);
