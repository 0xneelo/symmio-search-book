#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const allowedOpenOperatorItems = new Set([4, 11]);
const expectedOpenOperatorLinearTasks = new Map([
  [4, "SYN-285"],
  [11, "SYN-281"],
]);

function defaultPacketPath() {
  if (process.env.SEARCH_BOOK_LAUNCH_EVIDENCE_PACKET) {
    return process.env.SEARCH_BOOK_LAUNCH_EVIDENCE_PACKET;
  }
  if (process.env.SEARCH_BOOK_LAUNCH_EVIDENCE_DIR) {
    return path.join(process.env.SEARCH_BOOK_LAUNCH_EVIDENCE_DIR, "launch-evidence.json");
  }
  return "/tmp/search-book-launch-evidence/launch-evidence.json";
}

function usage() {
  return `Usage:
  node scripts/check-launch-evidence-packet.mjs [options]

Options:
  --packet path  Defaults to SEARCH_BOOK_LAUNCH_EVIDENCE_PACKET,
                 SEARCH_BOOK_LAUNCH_EVIDENCE_DIR/launch-evidence.json,
                 or /tmp/search-book-launch-evidence/launch-evidence.json
  --require-summary
                 Require adjacent launch-evidence.summary.md and validate its
                 count-only no-secret rows
  --json         Accepted for command symmetry; output is always JSON

Validates a no-secret launch-evidence packet, including launch readiness,
monitoring, Vibe source freshness, status-document evidence, source-ingestion
readiness, original-spec reconciliation, production-readiness packet evidence,
Discord route coverage, publication boundaries, backup/restore evidence,
living-docs reviewer evidence, living-docs controls, clean repository state,
and reconciled open operator gates.`;
}

function parseArgs(argv) {
  const args = { packet: defaultPacketPath(), requireSummary: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--json") continue;
    if (arg === "--require-summary") {
      args.requireSummary = true;
      continue;
    }
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) throw new Error(`${arg} requires a value.\n${usage()}`);
    if (arg === "--packet") args.packet = next;
    else throw new Error(`Unknown argument: ${arg}\n${usage()}`);
    index += 1;
  }
  args.packet = path.resolve(args.packet);
  return args;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function addCheck(checks, id, passed, detail = "", evidence = null) {
  checks.push({
    id,
    passed: Boolean(passed),
    detail,
    ...(evidence ? { evidence } : {}),
  });
}

function relativeOrAbsolute(filePath) {
  const relativePath = path.relative(searchBookRoot, filePath);
  return relativePath.startsWith("..") ? filePath : relativePath;
}

function repositoryClean(repository = {}) {
  return repository.dirty === false && (!Array.isArray(repository.dirtyStatus) || repository.dirtyStatus.length === 0);
}

function normalizedLaunchEvidence(packet) {
  const parsed = packet.launchEvidence?.parsed || {};
  if (parsed.evidence?.launchReadiness) return parsed.evidence.launchReadiness;
  return parsed;
}

function normalizedMonitoringEvidence(packet) {
  return packet.monitoringEvidence?.parsed || {};
}

function normalizedSourceFreshnessEvidence(packet) {
  return packet.sourceFreshnessEvidence?.parsed || {};
}

function normalizedStatusEvidence(packet) {
  return packet.statusEvidence?.parsed || {};
}

function normalizedSpecReconciliation(packet) {
  return packet.specReconciliation?.parsed || {};
}

function normalizedDiscordReviewArtifacts(packet) {
  return packet.discordReviewArtifacts?.parsed || {};
}

function normalizedDiscordRefusalRuntime(packet) {
  return packet.discordRefusalRuntime?.parsed || {};
}

function normalizedPublicationBoundaries(packet) {
  return packet.publicationBoundaries?.parsed || {};
}

function normalizedBackupRestoreEvidence(packet) {
  return packet.backupRestoreEvidence?.parsed || {};
}

function normalizedLivingDocsReviewEvidence(packet) {
  return packet.livingDocsReviewEvidence?.parsed || {};
}

function normalizedEvidenceSummaryRenderer(packet) {
  return packet.evidenceSummaryRenderer?.parsed || {};
}

function sourceFreshnessBodyMarkers(sourceFreshness) {
  const forbiddenKeys = new Set(["normalizedText", "rawText", "sourceBody", "markdownBody", "rawMarkdown"]);
  const markers = new Set();
  const visit = (value) => {
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    if (!value || typeof value !== "object") return;
    for (const [key, child] of Object.entries(value)) {
      if (forbiddenKeys.has(key)) markers.add(key);
      visit(child);
    }
  };
  visit(sourceFreshness);
  return [...markers].sort();
}

function unexpectedOpenOperatorItems(readiness) {
  return (readiness?.openOperatorItems || [])
    .map((item) => Number(item.id))
    .filter((id) => !allowedOpenOperatorItems.has(id));
}

function operatorLinearTasks(readiness = {}) {
  return (readiness.openOperatorItems || [])
    .map((item) => ({
      id: Number(item.id),
      linearTask: item.linearTask || null,
    }))
    .filter((item) => Number.isFinite(item.id));
}

function operatorLinearTaskSummary(readiness = {}) {
  return operatorLinearTasks(readiness)
    .filter((item) => item.linearTask)
    .sort((a, b) => a.id - b.id)
    .map((item) => `#${item.id}=${item.linearTask}`)
    .join(", ") || "none";
}

function operatorLinearTasksReady(readiness = {}) {
  const tasks = operatorLinearTasks(readiness);
  return (
    tasks.length === expectedOpenOperatorLinearTasks.size
    && tasks.every((item) => expectedOpenOperatorLinearTasks.get(item.id) === item.linearTask)
  );
}

function unexpectedStatusEvidenceOpenOperatorItems(statusEvidence) {
  return (statusEvidence.evidence?.openOperatorItems || [])
    .map((id) => Number(id))
    .filter((id) => !allowedOpenOperatorItems.has(id));
}

function sourceStatusReady(sourceRequirements = {}) {
  return (
    Number(sourceRequirements.complete || 0) > 0
    && Number(sourceRequirements.partial || 0) === 0
    && Number(sourceRequirements.parked || 0) === 0
    && Number(sourceRequirements.missing || 0) === 0
  );
}

function discordRouteCoverageReady(coverage = {}) {
  const total = Number(coverage.totalPageFitGroups || 0);
  const covered = Number(coverage.pageFitCoveredByPublicRoutes || 0);
  return (
    coverage.coverageReady === true
    && total > 0
    && covered === total
    && Number(coverage.pageFitSingleRouteRemaining || 0) === 0
    && Number(coverage.pageFitWithoutPublicRoute || 0) === 0
  );
}

function discordReviewArtifactsReady(evidence = {}) {
  const summary = evidence.summary || {};
  const routeCoverage = summary.routeCoverage || {};
  const editorialQueue = evidence.editorialQueue || {};
  const editorialQueueData = evidence.editorialQueueData || {};
  const disposition = editorialQueueData.disposition || {};
  const total = Number(routeCoverage.totalPageFitGroups || 0);
  const covered = Number(routeCoverage.coveredPageFitGroups || 0);
  const triageReady = Number(routeCoverage.triageReadyPageFitGroups || 0);
  const sourceBacked = Number(routeCoverage.sourceBackedPageFitGroups || 0);
  const publicCopyReady = Number(routeCoverage.publicCopyReadyPageFitGroups || 0);
  const publicCopyReviewRequired = Number(routeCoverage.publicCopyReviewRequired || 0);
  const refusalReviewReady = Number(editorialQueue.refusalReviewReady || 0);
  const refusalPolicyReady = Number(editorialQueue.refusalPolicyReadyItems || 0);
  const refusalPolicyReviewRequired = Number(editorialQueue.refusalPolicyReviewRequired || 0);
  const queueDataRouted = Number(editorialQueueData.routedItems || 0);
  const queueDataPageFits = Number(editorialQueueData.pageFitReviewReady || 0);
  const queueDataRefusals = Number(editorialQueueData.refusalReviewReady || 0);
  const dispositionPageFitGroups = Number(disposition.pageFitGroups || 0);
  const dispositionKeepCopy = Number(disposition.pageFitKeepExistingPublicCopy || 0);
  const dispositionNeedsCopyChange = Number(disposition.pageFitNeedsPublicCopyChange || 0);
  const dispositionRefusalItems = Number(disposition.refusalItems || 0);
  const dispositionKeepRefusal = Number(disposition.refusalKeepPolicy || 0);
  const dispositionNeedsRefusalReview = Number(disposition.refusalNeedsPolicyReview || 0);
  return (
    evidence.status === "passed"
    && summary.routingReady === true
    && Number(summary.routedItems || 0) > 0
    && summary.rawDiscordTextIncluded === false
    && summary.sourceAnswerTextIncluded === false
    && summary.valuesPrinted === false
    && Number(summary.rawKeyHits || 0) === 0
    && Number(summary.sampleLeaks || 0) === 0
    && routeCoverage.coverageReady === true
    && routeCoverage.triageReady === true
    && total > 0
    && covered === total
    && triageReady === total
    && sourceBacked === total
    && publicCopyReady === total
    && publicCopyReviewRequired === 0
    && routeCoverage.publicCopyReady === true
    && Number(routeCoverage.pageFitSingleRouteRemaining || 0) === 0
    && Number(routeCoverage.pageFitWithoutPublicRoute || 0) === 0
    && Number(editorialQueue.pageFitReviewReady || 0) > 0
    && refusalReviewReady > 0
    && refusalPolicyReady === refusalReviewReady
    && refusalPolicyReviewRequired === 0
    && Number(editorialQueue.rawTableHits || 0) === 0
    && Number(editorialQueue.sampleLeaks || 0) === 0
    && editorialQueueData.status === "passed"
    && editorialQueueData.queueReady === true
    && queueDataRouted === Number(summary.routedItems || 0)
    && queueDataRouted === 24
    && queueDataPageFits === Number(editorialQueue.pageFitReviewReady || 0)
    && queueDataPageFits === 19
    && queueDataRefusals === refusalReviewReady
    && queueDataRefusals === 2
    && Number(editorialQueueData.rawKeyHits || 0) === 0
    && Number(editorialQueueData.sampleLeaks || 0) === 0
    && editorialQueueData.valuesPrinted === false
    && disposition.readyForReviewerHandoff === true
    && dispositionPageFitGroups === queueDataPageFits
    && dispositionKeepCopy === queueDataPageFits
    && dispositionNeedsCopyChange === 0
    && dispositionRefusalItems === queueDataRefusals
    && dispositionKeepRefusal === queueDataRefusals
    && dispositionNeedsRefusalReview === 0
    && Number(disposition.publicCopyChangesProposed || 0) === 0
    && Number(disposition.exactDiscordStatementsPromoted || 0) === 0
  );
}

function discordRefusalRuntimeReady(evidence = {}) {
  const probes = Array.isArray(evidence.evidence?.probes) ? evidence.evidence.probes : [];
  const checks = Array.isArray(evidence.checks) ? evidence.checks : [];
  return (
    evidence.status === "passed"
    && evidence.secrets?.valuesPrinted === false
    && evidence.secrets?.llmCredentialsLoaded === false
    && Number(evidence.evidence?.routingRefusals || 0) === 2
    && probes.length === 2
    && probes.every((probe) => (
      probe.status === "refusal"
      && probe.refusalReason === "discord-corpus-review-required"
      && probe.gapId === "G-001"
      && Number(probe.citations || 0) === 0
      && Number(probe.answerBytes || 0) === 0
    ))
    && checks.length > 0
    && checks.every((check) => check.passed === true)
  );
}

function evidenceSummaryRendererReady(evidence = {}) {
  const checks = Array.isArray(evidence.checks) ? evidence.checks : [];
  return (
    evidence.status === "passed"
    && evidence.evidence?.valuesPrinted === false
    && Number(evidence.evidence?.launchSummaryLines || 0) > 0
    && Number(evidence.evidence?.releaseSummaryLines || 0) > 0
    && Number(evidence.evidence?.appendedBytes || 0) > 0
    && checks.length > 0
    && checks.every((check) => check.passed === true)
  );
}

function summaryArtifactPath(packetPath, filename) {
  return path.join(path.dirname(packetPath), filename);
}

function queueDataRow(queueData = {}) {
  return `Discord editorial queue data | \`${queueData.status || "missing"}\` (${queueData.routedItems ?? "unknown"} routed / ${queueData.pageFitReviewReady ?? "unknown"} page-fit / ${queueData.refusalReviewReady ?? "unknown"} refusals; ready: \`${queueData.queueReady ?? "unknown"}\`)`;
}

function queueDispositionRow(disposition = {}) {
  return `Discord editorial disposition | ready \`${disposition.readyForReviewerHandoff ?? "unknown"}\` (keep-copy \`${disposition.pageFitKeepExistingPublicCopy ?? "unknown"}/${disposition.pageFitGroups ?? "unknown"}\`; keep-refusal \`${disposition.refusalKeepPolicy ?? "unknown"}/${disposition.refusalItems ?? "unknown"}\`; copy changes \`${disposition.publicCopyChangesProposed ?? "unknown"}\`; promoted \`${disposition.exactDiscordStatementsPromoted ?? "unknown"}\`)`;
}

function validateSummaryArtifact({
  kind,
  summaryPath,
  repository = {},
  queueData = {},
  queueDisposition = {},
  readiness = {},
  required = false,
}) {
  const present = fs.existsSync(summaryPath);
  const rows = [
    {
      id: "status-row",
      fragment: `${kind === "launch" ? "Packet" : "Release"} status | \`passed\``,
    },
    {
      id: "repository-row",
      fragment: `Repository | commit \`${repository.commit || "missing"}\`, dirty \`false\``,
    },
    {
      id: "discord-queue-data-row",
      fragment: queueDataRow(queueData),
    },
    {
      id: "discord-disposition-row",
      fragment: queueDispositionRow(queueDisposition),
    },
    {
      id: "open-operator-linear-tasks-row",
      fragment: `Open operator Linear tasks | \`${operatorLinearTaskSummary(readiness)}\``,
    },
    {
      id: "secrets-row",
      fragment: "Secrets printed | `false`",
    },
  ];

  if (!present) {
    return {
      status: required ? "failed" : "not-found",
      required,
      present: false,
      path: relativeOrAbsolute(summaryPath),
      checks: rows.map((row) => ({
        id: row.id,
        passed: !required,
        detail: required ? "summary artifact missing" : "summary artifact not present; optional check skipped",
      })),
    };
  }

  const summary = fs.readFileSync(summaryPath, "utf8");
  const checks = rows.map((row) => ({
    id: row.id,
    passed: summary.includes(row.fragment),
    detail: row.fragment,
  }));
  const failed = checks.filter((check) => !check.passed);
  return {
    status: failed.length ? "failed" : "passed",
    required,
    present: true,
    path: relativeOrAbsolute(summaryPath),
    checks,
  };
}

function summaryArtifactReady(summaryArtifact) {
  return summaryArtifact.status === "passed" || (summaryArtifact.required === false && summaryArtifact.present === false);
}

function specReconciliationReady(evidence = {}) {
  const totals = evidence.evidence || {};
  const checks = Array.isArray(evidence.checks) ? evidence.checks : [];
  const openOperatorIds = Array.isArray(totals.openOperatorIds)
    ? totals.openOperatorIds.map((id) => Number(id)).sort((a, b) => a - b)
    : [];
  const specChecks = checks.filter((check) => String(check.id || "").startsWith("spec-"));
  return (
    evidence.status === "passed"
    && totals.sourceIngestion === "17/17"
    && Number(totals.sourcePartial || 0) === 0
    && Number(totals.sourceParked || 0) === 0
    && Number(totals.sourceMissing || 0) === 0
    && totals.sourceCompletionReady === true
    && totals.competitiveSweep === "49/50"
    && totals.llmProvider === "OpenAI"
    && totals.llmModel === "gpt-4.1-mini"
    && openOperatorIds.length === 2
    && openOperatorIds[0] === 4
    && openOperatorIds[1] === 11
    && specChecks.length >= 6
    && checks.length >= 10
    && checks.every((check) => check.passed === true)
  );
}

function publicationBoundariesReady(evidence = {}) {
  const totals = evidence.evidence || {};
  const checks = Array.isArray(evidence.checks) ? evidence.checks : [];
  return (
    evidence.status === "passed"
    && evidence.valuesPrinted === false
    && Number(totals.publicNavigationPages || 0) === 800
    && Number(totals.sourceCompanionPages || 0) === 792
    && Number(totals.exactRoutes || 0) === 820
    && Number(totals.faqAnswerable || 0) === 820
    && Number(totals.sourceCompanionRuntimeChunks || 0) > 0
    && Number(totals.internalDraftRuntimeChunks || 0) === 0
    && checks.length > 0
    && checks.every((check) => check.passed === true)
  );
}

function backupRestoreEvidenceReady(evidence = {}) {
  const totals = evidence.evidence || {};
  const checks = Array.isArray(evidence.checks) ? evidence.checks : [];
  return (
    evidence.status === "passed"
    && evidence.valuesPrinted === false
    && evidence.secrets?.valuesPrinted === false
    && evidence.secrets?.llmCredentialsLoaded === false
    && totals.manifestStatus === "passed"
    && totals.restoreCheckStatus === "passed"
    && totals.integrity === "ok"
    && Number(totals.tablesChecked || 0) === 4
    && Number(totals.tablesMatched || 0) === 4
    && totals.backupSizePositive === true
    && totals.checksumPresent === true
    && totals.latestManifestWritten === true
    && totals.rawContentPrinted === false
    && Number(totals.seededCounts?.questions || 0) >= 2
    && Number(totals.seededCounts?.ratings || 0) >= 2
    && Number(totals.seededCounts?.gaps || 0) >= 2
    && checks.length > 0
    && checks.every((check) => check.passed === true)
  );
}

function livingDocsReviewEvidenceReady(evidence = {}) {
  const totals = evidence.evidence || {};
  const checks = Array.isArray(evidence.checks) ? evidence.checks : [];
  return (
    evidence.status === "passed"
    && evidence.valuesPrinted === false
    && evidence.secrets?.valuesPrinted === false
    && evidence.secrets?.llmCredentialsLoaded === false
    && totals.rawSummaryStatus === "ok"
    && totals.rawSummaryFlaggedInternal === true
    && Number(totals.totals?.questions || 0) >= 4
    && Number(totals.totals?.ratings || 0) >= 2
    && Number(totals.totals?.gaps || 0) >= 4
    && Number(totals.queueCounts?.gapBacklog || 0) >= 3
    && Number(totals.queueCounts?.lowRatedAnswers || 0) >= 2
    && Number(totals.queueCounts?.unansweredQuestions || 0) >= 2
    && Number(totals.queueCounts?.repeatedQuestions || 0) >= 1
    && Number(totals.queueCounts?.recommendations || 0) >= 3
    && Number(totals.seededRawValuesInRawSummary || 0) >= 5
    && Number(totals.seededRawValuesInSanitizedEvidence || 0) === 0
    && Number(totals.rawKeyHitsInSanitizedEvidence || 0) === 0
    && totals.rawContentPrinted === false
    && checks.length > 0
    && checks.every((check) => check.passed === true)
  );
}

function freshVerifyEvidence(launch = {}) {
  const checks = Array.isArray(launch.checks) ? launch.checks : [];
  return checks.find((check) => check.id === "fresh-verify")?.evidence || null;
}

function productionReadinessPacketVerifyReady(launch = {}) {
  const evidence = freshVerifyEvidence(launch);
  return (
    evidence?.status === "passed"
    && evidence?.mode === "build-and-verify"
    && Number(evidence?.syntaxChecks || 0) >= 91
    && evidence?.productionReadinessPacket?.passed === true
  );
}

function productionReadinessPacketVerifySummary(launch = {}) {
  const evidence = freshVerifyEvidence(launch);
  return {
    status: evidence?.status || null,
    mode: evidence?.mode || null,
    syntaxChecks: evidence?.syntaxChecks ?? null,
    productionReadinessPacket: evidence?.productionReadinessPacket || null,
  };
}

function validateLaunchPacket(packet, packetPath, options = {}) {
  const checks = [];
  const launch = normalizedLaunchEvidence(packet);
  const monitoring = normalizedMonitoringEvidence(packet);
  const sourceFreshness = normalizedSourceFreshnessEvidence(packet);
  const statusEvidence = normalizedStatusEvidence(packet);
  const specReconciliation = normalizedSpecReconciliation(packet);
  const discordReviewArtifacts = normalizedDiscordReviewArtifacts(packet);
  const discordRefusalRuntime = normalizedDiscordRefusalRuntime(packet);
  const publicationBoundaries = normalizedPublicationBoundaries(packet);
  const backupRestoreEvidence = normalizedBackupRestoreEvidence(packet);
  const livingDocsReviewEvidence = normalizedLivingDocsReviewEvidence(packet);
  const evidenceSummaryRenderer = normalizedEvidenceSummaryRenderer(packet);
  const repository = packet.repository || {};
  const readiness = packet.readiness || {};
  const sourceTotals = sourceFreshness.totals || {};
  const sourceSecrets = sourceFreshness.secrets || {};
  const statusDocuments = statusEvidence.documents || [];
  const passedStatusDocuments = statusDocuments.filter((doc) => doc.passed).length;
  const specChecks = Array.isArray(specReconciliation.checks) ? specReconciliation.checks : [];
  const specPassedChecks = specChecks.filter((check) => check.passed).length;
  const sourceBodyMarkers = sourceFreshnessBodyMarkers(sourceFreshness);
  const unexpectedOpen = unexpectedOpenOperatorItems(readiness);
  const unexpectedStatusOpen = unexpectedStatusEvidenceOpenOperatorItems(statusEvidence);
  const productionPacketVerify = productionReadinessPacketVerifySummary(launch);
  const summaryArtifact = validateSummaryArtifact({
    kind: "launch",
    summaryPath: summaryArtifactPath(packetPath, "launch-evidence.summary.md"),
    repository,
    queueData: discordReviewArtifacts.editorialQueueData || {},
    queueDisposition: discordReviewArtifacts.editorialQueueData?.disposition || {},
    readiness,
    required: options.requireSummary === true,
  });

  addCheck(checks, "packet-status", packet.status === "passed", `status=${packet.status || "missing"}`);
  addCheck(
    checks,
    "repository-clean",
    repositoryClean(repository),
    repository.dirty ? `dirty=${(repository.dirtyStatus || []).join(",") || "true"}` : "clean",
  );
  addCheck(checks, "packet-secret-values", packet.secrets?.valuesPrinted === false, `valuesPrinted=${packet.secrets?.valuesPrinted}`);
  addCheck(checks, "launch-evidence-passed", packet.launchEvidence?.passed === true, `passed=${packet.launchEvidence?.passed}`);
  addCheck(checks, "launch-status", launch.status === "passed", `status=${launch.status || "missing"}`);
  addCheck(
    checks,
    "production-readiness-packet-verify",
    productionReadinessPacketVerifyReady(launch),
    JSON.stringify(productionPacketVerify),
  );
  addCheck(checks, "monitoring-evidence-passed", packet.monitoringEvidence?.passed === true, `passed=${packet.monitoringEvidence?.passed}`);
  addCheck(checks, "monitoring-status", monitoring.status === "passed", `status=${monitoring.status || "missing"}`);
  addCheck(
    checks,
    "source-freshness-evidence-passed",
    packet.sourceFreshnessEvidence?.passed === true,
    `passed=${packet.sourceFreshnessEvidence?.passed}`,
  );
  addCheck(checks, "source-freshness-status", sourceFreshness.status === "passed", `status=${sourceFreshness.status || "missing"}`);
  addCheck(checks, "source-freshness-secret-values", sourceSecrets.valuesPrinted === false, `valuesPrinted=${sourceSecrets.valuesPrinted}`);
  addCheck(
    checks,
    "source-freshness-source-bodies",
    sourceSecrets.sourceBodiesPrinted === false && sourceBodyMarkers.length === 0,
    `sourceBodiesPrinted=${sourceSecrets.sourceBodiesPrinted}; markers=${sourceBodyMarkers.join(",") || "none"}`,
  );
  addCheck(
    checks,
    "source-freshness-totals",
    Number(sourceTotals.checks || 0) > 0
      && Number(sourceTotals.passed || 0) === Number(sourceTotals.checks || 0)
      && Number(sourceTotals.sourcesFetched || 0) === Number(sourceTotals.sources || 0),
    `checks=${sourceTotals.passed ?? 0}/${sourceTotals.checks ?? 0}; sources=${sourceTotals.sourcesFetched ?? 0}/${sourceTotals.sources ?? 0}`,
  );
  addCheck(
    checks,
    "status-evidence-passed",
    packet.statusEvidence?.passed === true,
    `passed=${packet.statusEvidence?.passed}`,
  );
  addCheck(checks, "status-evidence-status", statusEvidence.status === "passed", `status=${statusEvidence.status || "missing"}`);
  addCheck(
    checks,
    "status-evidence-documents",
    statusDocuments.length >= 4 && passedStatusDocuments === statusDocuments.length,
    `documents=${passedStatusDocuments}/${statusDocuments.length}`,
  );
  addCheck(
    checks,
    "status-evidence-open-operator-items-reconciled",
    unexpectedStatusOpen.length === 0,
    unexpectedStatusOpen.length ? `unexpected=${unexpectedStatusOpen.join(",")}` : "only #11/#4 or fewer remain open",
  );
  addCheck(
    checks,
    "spec-reconciliation-passed",
    packet.specReconciliation?.passed === true,
    `passed=${packet.specReconciliation?.passed}`,
  );
  addCheck(
    checks,
    "spec-reconciliation-status",
    specReconciliation.status === "passed",
    `status=${specReconciliation.status || "missing"}`,
  );
  addCheck(
    checks,
    "spec-reconciliation-ready",
    specReconciliationReady(specReconciliation),
    JSON.stringify({
      evidence: specReconciliation.evidence || null,
      checks: `${specPassedChecks}/${specChecks.length}`,
    }),
  );
  addCheck(
    checks,
    "discord-review-artifacts-passed",
    packet.discordReviewArtifacts?.passed === true,
    `passed=${packet.discordReviewArtifacts?.passed}`,
  );
  addCheck(
    checks,
    "discord-review-artifacts-status",
    discordReviewArtifacts.status === "passed",
    `status=${discordReviewArtifacts.status || "missing"}`,
  );
  addCheck(
    checks,
    "discord-review-artifacts-ready",
    discordReviewArtifactsReady(discordReviewArtifacts),
    JSON.stringify({
      routedItems: discordReviewArtifacts.summary?.routedItems ?? null,
      routeCoverage: discordReviewArtifacts.summary?.routeCoverage || null,
      editorialQueue: discordReviewArtifacts.editorialQueue || null,
      editorialQueueData: discordReviewArtifacts.editorialQueueData || null,
      rawKeyHits: discordReviewArtifacts.summary?.rawKeyHits ?? null,
      sampleLeaks: discordReviewArtifacts.summary?.sampleLeaks ?? null,
    }),
  );
  addCheck(
    checks,
    "discord-refusal-runtime-passed",
    packet.discordRefusalRuntime?.passed === true,
    `passed=${packet.discordRefusalRuntime?.passed}`,
  );
  addCheck(
    checks,
    "discord-refusal-runtime-status",
    discordRefusalRuntime.status === "passed",
    `status=${discordRefusalRuntime.status || "missing"}`,
  );
  addCheck(
    checks,
    "discord-refusal-runtime-ready",
    discordRefusalRuntimeReady(discordRefusalRuntime),
    JSON.stringify({
      routingRefusals: discordRefusalRuntime.evidence?.routingRefusals ?? null,
      probes: discordRefusalRuntime.evidence?.probes || [],
      secrets: discordRefusalRuntime.secrets || null,
    }),
  );
  addCheck(
    checks,
    "publication-boundaries-passed",
    packet.publicationBoundaries?.passed === true,
    `passed=${packet.publicationBoundaries?.passed}`,
  );
  addCheck(
    checks,
    "publication-boundaries-status",
    publicationBoundaries.status === "passed",
    `status=${publicationBoundaries.status || "missing"}`,
  );
  addCheck(
    checks,
    "publication-boundaries-ready",
    publicationBoundariesReady(publicationBoundaries),
    JSON.stringify({
      evidence: publicationBoundaries.evidence || null,
      valuesPrinted: publicationBoundaries.valuesPrinted ?? null,
      checks: Array.isArray(publicationBoundaries.checks) ? publicationBoundaries.checks.length : null,
    }),
  );
  addCheck(
    checks,
    "backup-restore-evidence-passed",
    packet.backupRestoreEvidence?.passed === true,
    `passed=${packet.backupRestoreEvidence?.passed}`,
  );
  addCheck(
    checks,
    "backup-restore-evidence-status",
    backupRestoreEvidence.status === "passed",
    `status=${backupRestoreEvidence.status || "missing"}`,
  );
  addCheck(
    checks,
    "backup-restore-evidence-ready",
    backupRestoreEvidenceReady(backupRestoreEvidence),
    JSON.stringify({
      evidence: backupRestoreEvidence.evidence || null,
      valuesPrinted: backupRestoreEvidence.valuesPrinted ?? null,
      secrets: backupRestoreEvidence.secrets || null,
      checks: Array.isArray(backupRestoreEvidence.checks) ? backupRestoreEvidence.checks.length : null,
    }),
  );
  addCheck(
    checks,
    "living-docs-review-evidence-passed",
    packet.livingDocsReviewEvidence?.passed === true,
    `passed=${packet.livingDocsReviewEvidence?.passed}`,
  );
  addCheck(
    checks,
    "living-docs-review-evidence-status",
    livingDocsReviewEvidence.status === "passed",
    `status=${livingDocsReviewEvidence.status || "missing"}`,
  );
  addCheck(
    checks,
    "living-docs-review-evidence-ready",
    livingDocsReviewEvidenceReady(livingDocsReviewEvidence),
    JSON.stringify({
      evidence: livingDocsReviewEvidence.evidence || null,
      valuesPrinted: livingDocsReviewEvidence.valuesPrinted ?? null,
      secrets: livingDocsReviewEvidence.secrets || null,
      checks: Array.isArray(livingDocsReviewEvidence.checks) ? livingDocsReviewEvidence.checks.length : null,
    }),
  );
  addCheck(
    checks,
    "evidence-summary-renderer-passed",
    packet.evidenceSummaryRenderer?.passed === true,
    `passed=${packet.evidenceSummaryRenderer?.passed}`,
  );
  addCheck(
    checks,
    "evidence-summary-renderer-status",
    evidenceSummaryRenderer.status === "passed",
    `status=${evidenceSummaryRenderer.status || "missing"}`,
  );
  addCheck(
    checks,
    "evidence-summary-renderer-ready",
    evidenceSummaryRendererReady(evidenceSummaryRenderer),
    JSON.stringify({
      launchSummaryLines: evidenceSummaryRenderer.evidence?.launchSummaryLines ?? null,
      releaseSummaryLines: evidenceSummaryRenderer.evidence?.releaseSummaryLines ?? null,
      appendedBytes: evidenceSummaryRenderer.evidence?.appendedBytes ?? null,
      valuesPrinted: evidenceSummaryRenderer.evidence?.valuesPrinted ?? null,
      checks: Array.isArray(evidenceSummaryRenderer.checks) ? evidenceSummaryRenderer.checks.length : null,
    }),
  );
  addCheck(
    checks,
    "source-ingestion-ready",
    readiness.sourceCompletionReady === true && sourceStatusReady(readiness.sourceRequirements),
    JSON.stringify(readiness.sourceRequirements || {}),
  );
  addCheck(
    checks,
    "discord-route-coverage-ready",
    discordRouteCoverageReady(readiness.discordRouteCoverage),
    JSON.stringify(readiness.discordRouteCoverage || {}),
  );
  addCheck(
    checks,
    "page-feedback-control",
    readiness.livingDocsControls?.pageFeedback === true,
    `pageFeedback=${readiness.livingDocsControls?.pageFeedback}`,
  );
  addCheck(
    checks,
    "open-operator-items-reconciled",
    unexpectedOpen.length === 0,
    unexpectedOpen.length ? `unexpected=${unexpectedOpen.join(",")}` : "only #11/#4 or fewer remain open",
  );
  addCheck(
    checks,
    "open-operator-linear-tasks-current",
    operatorLinearTasksReady(readiness),
    operatorLinearTaskSummary(readiness),
    { openOperatorLinearTasks: operatorLinearTasks(readiness) },
  );
  addCheck(
    checks,
    "summary-artifact",
    summaryArtifactReady(summaryArtifact),
    `status=${summaryArtifact.status}; required=${summaryArtifact.required}; present=${summaryArtifact.present}`,
    summaryArtifact,
  );

  const failed = checks.filter((check) => !check.passed);
  return {
    status: failed.length ? "failed" : "passed",
    service: "search-book-launch-evidence-packet-check",
    packet: relativeOrAbsolute(packetPath),
    generatedAt: packet.generatedAt || null,
    evidence: {
      packetStatus: packet.status || null,
      repository: {
        branch: repository.branch || null,
        commit: repository.commit || null,
        dirty: repository.dirty === true,
        dirtyStatusCount: Array.isArray(repository.dirtyStatus) ? repository.dirtyStatus.length : null,
      },
      launchStatus: launch.status || null,
      productionReadinessPacket: productionPacketVerify,
      monitoringStatus: monitoring.status || null,
      sourceFreshnessStatus: sourceFreshness.status || null,
      sourceFreshnessChecks: sourceTotals.checks ? `${sourceTotals.passed}/${sourceTotals.checks}` : null,
      sourceFreshnessSources: sourceTotals.sources ? `${sourceTotals.sourcesFetched}/${sourceTotals.sources}` : null,
      sourceBodiesPrinted: sourceSecrets.sourceBodiesPrinted,
      statusEvidenceStatus: statusEvidence.status || null,
      statusEvidenceDocuments: statusDocuments.length ? `${passedStatusDocuments}/${statusDocuments.length}` : null,
      specReconciliationStatus: specReconciliation.status || null,
      specReconciliation: {
        evidence: specReconciliation.evidence || null,
        checks: specChecks.length ? `${specPassedChecks}/${specChecks.length}` : null,
      },
      discordReviewArtifactsStatus: discordReviewArtifacts.status || null,
      discordReviewArtifacts: {
        routedItems: discordReviewArtifacts.summary?.routedItems ?? null,
        routeCoverage: discordReviewArtifacts.summary?.routeCoverage || null,
        editorialQueue: discordReviewArtifacts.editorialQueue || null,
        editorialQueueData: discordReviewArtifacts.editorialQueueData || null,
      },
      discordRefusalRuntimeStatus: discordRefusalRuntime.status || null,
      discordRefusalRuntime: {
        routingRefusals: discordRefusalRuntime.evidence?.routingRefusals ?? null,
        probes: discordRefusalRuntime.evidence?.probes || [],
        secrets: discordRefusalRuntime.secrets || null,
      },
      publicationBoundariesStatus: publicationBoundaries.status || null,
      publicationBoundaries: publicationBoundaries.evidence || null,
      backupRestoreEvidenceStatus: backupRestoreEvidence.status || null,
      backupRestoreEvidence: backupRestoreEvidence.evidence || null,
      livingDocsReviewEvidenceStatus: livingDocsReviewEvidence.status || null,
      livingDocsReviewEvidence: livingDocsReviewEvidence.evidence || null,
      evidenceSummaryRendererStatus: evidenceSummaryRenderer.status || null,
      evidenceSummaryRenderer: evidenceSummaryRenderer.evidence || null,
      sourceCompletionReady: readiness.sourceCompletionReady === true,
      sourceRequirements: readiness.sourceRequirements || null,
      discordRouteCoverage: readiness.discordRouteCoverage || null,
      openOperatorItems: readiness.openOperatorItems || [],
      openOperatorLinearTasks: operatorLinearTasks(readiness),
      summaryArtifact,
    },
    checks,
  };
}

try {
  const args = parseArgs(process.argv.slice(2));
  const packet = readJson(args.packet);
  const result = validateLaunchPacket(packet, args.packet, { requireSummary: args.requireSummary });
  const rendered = JSON.stringify(result, null, 2);
  if (result.status === "passed") {
    console.log(rendered);
  } else {
    console.error(rendered);
    process.exitCode = 1;
  }
} catch (error) {
  console.error(JSON.stringify({
    status: "failed",
    service: "search-book-launch-evidence-packet-check",
    message: error.message,
    secrets: { valuesPrinted: false },
  }, null, 2));
  process.exitCode = 1;
}
