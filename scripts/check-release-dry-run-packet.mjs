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
  if (process.env.SEARCH_BOOK_RELEASE_DRY_RUN_PACKET) {
    return process.env.SEARCH_BOOK_RELEASE_DRY_RUN_PACKET;
  }
  if (process.env.SEARCH_BOOK_RELEASE_DRY_RUN_DIR) {
    return path.join(process.env.SEARCH_BOOK_RELEASE_DRY_RUN_DIR, "release-dry-run.json");
  }
  return "/tmp/search-book-release-dry-run/release-dry-run.json";
}

function usage() {
  return `Usage:
  node scripts/check-release-dry-run-packet.mjs [options]

Options:
  --packet path  Defaults to SEARCH_BOOK_RELEASE_DRY_RUN_PACKET,
                 SEARCH_BOOK_RELEASE_DRY_RUN_DIR/release-dry-run.json,
                 or /tmp/search-book-release-dry-run/release-dry-run.json
  --require-summary
                 Require adjacent release-dry-run.summary.md and validate its
                 count-only no-secret rows
  --json         Accepted for command symmetry; output is always JSON

Validates a no-secret release dry-run packet plus its nested launch-evidence
packet. This checks child steps, static artifact integrity, launch readiness,
monitoring, Vibe source freshness, status-document evidence, original-spec
reconciliation, production-readiness packet evidence, no sensitive matches,
publication boundaries, backup/restore evidence, living-docs reviewer evidence,
clean repository state, and reconciled open operator gates. Downloaded GitHub
artifacts can be validated from their downloaded directory; the checker falls
back to the sibling launch-evidence packet if the original Actions /tmp path is
not present.`;
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

function nestedLaunchPacketPath(releasePacket, releasePacketPath) {
  const localArtifactPath = path.join(path.dirname(releasePacketPath), "launch-evidence", "launch-evidence.json");
  if (releasePacket.launchEvidenceDir) {
    const embeddedPath = path.join(releasePacket.launchEvidenceDir, "launch-evidence.json");
    if (fs.existsSync(embeddedPath)) return embeddedPath;
    if (fs.existsSync(localArtifactPath)) return localArtifactPath;
    return embeddedPath;
  }
  return localArtifactPath;
}

function normalizedLaunchEvidence(packet) {
  const parsed = packet.launchEvidence?.parsed || {};
  if (parsed.evidence?.launchReadiness) return parsed.evidence.launchReadiness;
  return parsed;
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

function sourceFreshnessBodyMarkers(value) {
  const forbiddenKeys = new Set(["normalizedText", "rawText", "sourceBody", "markdownBody", "rawMarkdown"]);
  const markers = new Set();
  const visit = (childValue) => {
    if (Array.isArray(childValue)) {
      childValue.forEach(visit);
      return;
    }
    if (!childValue || typeof childValue !== "object") return;
    for (const [key, child] of Object.entries(childValue)) {
      if (forbiddenKeys.has(key)) markers.add(key);
      visit(child);
    }
  };
  visit(value);
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

function validateReleasePacket(packet, nestedLaunchPacket, packetPath, nestedLaunchPath, options = {}) {
  const checks = [];
  const failedSteps = (packet.steps || []).filter((step) => step.status !== "passed" || step.passed !== true);
  const sensitiveMatches = packet.secrets?.sensitiveMatches || [];
  const repository = packet.repository || {};
  const nestedRepository = nestedLaunchPacket.repository || {};
  const staticArtifact = packet.staticArtifact || {};
  const launchSummary = packet.launchEvidence || {};
  const nestedLaunch = normalizedLaunchEvidence(nestedLaunchPacket);
  const nestedSourceFreshness = normalizedSourceFreshnessEvidence(nestedLaunchPacket);
  const nestedStatusEvidence = normalizedStatusEvidence(nestedLaunchPacket);
  const nestedSpecReconciliation = normalizedSpecReconciliation(nestedLaunchPacket);
  const nestedDiscordReviewArtifacts = normalizedDiscordReviewArtifacts(nestedLaunchPacket);
  const nestedDiscordRefusalRuntime = normalizedDiscordRefusalRuntime(nestedLaunchPacket);
  const nestedPublicationBoundaries = normalizedPublicationBoundaries(nestedLaunchPacket);
  const nestedBackupRestoreEvidence = normalizedBackupRestoreEvidence(nestedLaunchPacket);
  const nestedLivingDocsReviewEvidence = normalizedLivingDocsReviewEvidence(nestedLaunchPacket);
  const nestedEvidenceSummaryRenderer = normalizedEvidenceSummaryRenderer(nestedLaunchPacket);
  const nestedSourceSecrets = nestedSourceFreshness.secrets || {};
  const nestedSourceTotals = nestedSourceFreshness.totals || {};
  const nestedStatusDocuments = nestedStatusEvidence.documents || [];
  const nestedPassedStatusDocuments = nestedStatusDocuments.filter((doc) => doc.passed).length;
  const nestedSpecChecks = Array.isArray(nestedSpecReconciliation.checks) ? nestedSpecReconciliation.checks : [];
  const nestedSpecPassedChecks = nestedSpecChecks.filter((check) => check.passed).length;
  const sourceBodyMarkers = sourceFreshnessBodyMarkers(nestedSourceFreshness);
  const readiness = packet.readiness || {};
  const unexpectedOpen = unexpectedOpenOperatorItems(readiness);
  const unexpectedStatusOpen = unexpectedStatusEvidenceOpenOperatorItems(nestedStatusEvidence);
  const nestedProductionPacketVerify = productionReadinessPacketVerifySummary(nestedLaunch);
  const summaryArtifact = validateSummaryArtifact({
    kind: "release",
    summaryPath: summaryArtifactPath(packetPath, "release-dry-run.summary.md"),
    repository,
    queueData: launchSummary.discordReviewArtifacts?.editorialQueueData || {},
    queueDisposition: launchSummary.discordReviewArtifacts?.editorialQueueData?.disposition || {},
    readiness,
    required: options.requireSummary === true,
  });

  addCheck(checks, "release-status", packet.status === "passed", `status=${packet.status || "missing"}`);
  addCheck(
    checks,
    "release-repository-clean",
    repositoryClean(repository),
    repository.dirty ? `dirty=${(repository.dirtyStatus || []).join(",") || "true"}` : "clean",
  );
  addCheck(
    checks,
    "nested-launch-repository-clean",
    repositoryClean(nestedRepository),
    nestedRepository.dirty ? `dirty=${(nestedRepository.dirtyStatus || []).join(",") || "true"}` : "clean",
  );
  addCheck(
    checks,
    "release-and-launch-same-commit",
    Boolean(repository.commit) && repository.commit === nestedRepository.commit,
    `release=${repository.commit || "missing"}; launch=${nestedRepository.commit || "missing"}`,
  );
  addCheck(checks, "release-secret-values", packet.secrets?.valuesPrinted === false, `valuesPrinted=${packet.secrets?.valuesPrinted}`);
  addCheck(checks, "release-sensitive-matches", Array.isArray(sensitiveMatches) && sensitiveMatches.length === 0, `matches=${sensitiveMatches.length}`);
  addCheck(checks, "release-steps", failedSteps.length === 0 && (packet.steps || []).length > 0, failedSteps.map((step) => step.id).join(",") || "all passed");
  addCheck(checks, "static-artifact-status", staticArtifact.status === "passed", `status=${staticArtifact.status || "missing"}`);
  addCheck(checks, "static-artifact-integrity", staticArtifact.integrity === "passed", `integrity=${staticArtifact.integrity || "missing"}`);
  addCheck(
    checks,
    "static-artifact-sensitive-matches",
    Number(staticArtifact.secrets?.sensitiveMatches || 0) === 0,
    `matches=${staticArtifact.secrets?.sensitiveMatches}`,
  );
  addCheck(checks, "launch-summary-status", launchSummary.status === "passed", `status=${launchSummary.status || "missing"}`);
  addCheck(checks, "launch-summary-launch-status", launchSummary.launchStatus === "passed", `launchStatus=${launchSummary.launchStatus || "missing"}`);
  addCheck(
    checks,
    "launch-summary-monitoring-status",
    launchSummary.monitoringStatus === "passed",
    `monitoringStatus=${launchSummary.monitoringStatus || "missing"}`,
  );
  addCheck(
    checks,
    "launch-summary-source-freshness-status",
    launchSummary.sourceFreshnessStatus === "passed",
    `sourceFreshnessStatus=${launchSummary.sourceFreshnessStatus || "missing"}`,
  );
  addCheck(
    checks,
    "launch-summary-status-evidence-status",
    launchSummary.statusEvidenceStatus === "passed",
    `statusEvidenceStatus=${launchSummary.statusEvidenceStatus || "missing"}`,
  );
  addCheck(
    checks,
    "launch-summary-spec-reconciliation-status",
    launchSummary.specReconciliationStatus === "passed",
    `specReconciliationStatus=${launchSummary.specReconciliationStatus || "missing"}`,
  );
  addCheck(
    checks,
    "launch-summary-discord-review-artifacts-status",
    launchSummary.discordReviewArtifactsStatus === "passed",
    `discordReviewArtifactsStatus=${launchSummary.discordReviewArtifactsStatus || "missing"}`,
  );
  addCheck(
    checks,
    "launch-summary-discord-refusal-runtime-status",
    launchSummary.discordRefusalRuntimeStatus === "passed",
    `discordRefusalRuntimeStatus=${launchSummary.discordRefusalRuntimeStatus || "missing"}`,
  );
  addCheck(
    checks,
    "launch-summary-publication-boundaries-status",
    launchSummary.publicationBoundariesStatus === "passed",
    `publicationBoundariesStatus=${launchSummary.publicationBoundariesStatus || "missing"}`,
  );
  addCheck(
    checks,
    "launch-summary-backup-restore-evidence-status",
    launchSummary.backupRestoreEvidenceStatus === "passed",
    `backupRestoreEvidenceStatus=${launchSummary.backupRestoreEvidenceStatus || "missing"}`,
  );
  addCheck(
    checks,
    "launch-summary-living-docs-review-evidence-status",
    launchSummary.livingDocsReviewEvidenceStatus === "passed",
    `livingDocsReviewEvidenceStatus=${launchSummary.livingDocsReviewEvidenceStatus || "missing"}`,
  );
  addCheck(
    checks,
    "launch-summary-evidence-summary-renderer-status",
    launchSummary.evidenceSummaryRendererStatus === "passed",
    `evidenceSummaryRendererStatus=${launchSummary.evidenceSummaryRendererStatus || "missing"}`,
  );
  addCheck(checks, "nested-launch-status", nestedLaunchPacket.status === "passed", `status=${nestedLaunchPacket.status || "missing"}`);
  addCheck(checks, "nested-launch-readiness-status", nestedLaunch.status === "passed", `status=${nestedLaunch.status || "missing"}`);
  addCheck(
    checks,
    "nested-production-readiness-packet-verify",
    productionReadinessPacketVerifyReady(nestedLaunch),
    JSON.stringify(nestedProductionPacketVerify),
  );
  addCheck(
    checks,
    "nested-source-freshness-status",
    nestedSourceFreshness.status === "passed",
    `status=${nestedSourceFreshness.status || "missing"}`,
  );
  addCheck(
    checks,
    "nested-source-freshness-secret-values",
    nestedSourceSecrets.valuesPrinted === false,
    `valuesPrinted=${nestedSourceSecrets.valuesPrinted}`,
  );
  addCheck(
    checks,
    "nested-source-freshness-source-bodies",
    nestedSourceSecrets.sourceBodiesPrinted === false && sourceBodyMarkers.length === 0,
    `sourceBodiesPrinted=${nestedSourceSecrets.sourceBodiesPrinted}; markers=${sourceBodyMarkers.join(",") || "none"}`,
  );
  addCheck(
    checks,
    "nested-source-freshness-totals",
    Number(nestedSourceTotals.checks || 0) > 0
      && Number(nestedSourceTotals.passed || 0) === Number(nestedSourceTotals.checks || 0)
      && Number(nestedSourceTotals.sourcesFetched || 0) === Number(nestedSourceTotals.sources || 0),
    `checks=${nestedSourceTotals.passed ?? 0}/${nestedSourceTotals.checks ?? 0}; sources=${nestedSourceTotals.sourcesFetched ?? 0}/${nestedSourceTotals.sources ?? 0}`,
  );
  addCheck(
    checks,
    "nested-status-evidence-passed",
    nestedLaunchPacket.statusEvidence?.passed === true,
    `passed=${nestedLaunchPacket.statusEvidence?.passed}`,
  );
  addCheck(
    checks,
    "nested-status-evidence-status",
    nestedStatusEvidence.status === "passed",
    `status=${nestedStatusEvidence.status || "missing"}`,
  );
  addCheck(
    checks,
    "nested-status-evidence-documents",
    nestedStatusDocuments.length >= 4 && nestedPassedStatusDocuments === nestedStatusDocuments.length,
    `documents=${nestedPassedStatusDocuments}/${nestedStatusDocuments.length}`,
  );
  addCheck(
    checks,
    "nested-status-evidence-open-operator-items-reconciled",
    unexpectedStatusOpen.length === 0,
    unexpectedStatusOpen.length ? `unexpected=${unexpectedStatusOpen.join(",")}` : "only #11/#4 or fewer remain open",
  );
  addCheck(
    checks,
    "nested-spec-reconciliation-passed",
    nestedLaunchPacket.specReconciliation?.passed === true,
    `passed=${nestedLaunchPacket.specReconciliation?.passed}`,
  );
  addCheck(
    checks,
    "nested-spec-reconciliation-status",
    nestedSpecReconciliation.status === "passed",
    `status=${nestedSpecReconciliation.status || "missing"}`,
  );
  addCheck(
    checks,
    "nested-spec-reconciliation-ready",
    specReconciliationReady(nestedSpecReconciliation),
    JSON.stringify({
      evidence: nestedSpecReconciliation.evidence || null,
      checks: `${nestedSpecPassedChecks}/${nestedSpecChecks.length}`,
    }),
  );
  addCheck(
    checks,
    "nested-discord-review-artifacts-passed",
    nestedLaunchPacket.discordReviewArtifacts?.passed === true,
    `passed=${nestedLaunchPacket.discordReviewArtifacts?.passed}`,
  );
  addCheck(
    checks,
    "nested-discord-review-artifacts-status",
    nestedDiscordReviewArtifacts.status === "passed",
    `status=${nestedDiscordReviewArtifacts.status || "missing"}`,
  );
  addCheck(
    checks,
    "nested-discord-review-artifacts-ready",
    discordReviewArtifactsReady(nestedDiscordReviewArtifacts),
    JSON.stringify({
      routedItems: nestedDiscordReviewArtifacts.summary?.routedItems ?? null,
      routeCoverage: nestedDiscordReviewArtifacts.summary?.routeCoverage || null,
      editorialQueue: nestedDiscordReviewArtifacts.editorialQueue || null,
      editorialQueueData: nestedDiscordReviewArtifacts.editorialQueueData || null,
      rawKeyHits: nestedDiscordReviewArtifacts.summary?.rawKeyHits ?? null,
      sampleLeaks: nestedDiscordReviewArtifacts.summary?.sampleLeaks ?? null,
    }),
  );
  addCheck(
    checks,
    "nested-discord-refusal-runtime-passed",
    nestedLaunchPacket.discordRefusalRuntime?.passed === true,
    `passed=${nestedLaunchPacket.discordRefusalRuntime?.passed}`,
  );
  addCheck(
    checks,
    "nested-discord-refusal-runtime-status",
    nestedDiscordRefusalRuntime.status === "passed",
    `status=${nestedDiscordRefusalRuntime.status || "missing"}`,
  );
  addCheck(
    checks,
    "nested-discord-refusal-runtime-ready",
    discordRefusalRuntimeReady(nestedDiscordRefusalRuntime),
    JSON.stringify({
      routingRefusals: nestedDiscordRefusalRuntime.evidence?.routingRefusals ?? null,
      probes: nestedDiscordRefusalRuntime.evidence?.probes || [],
      secrets: nestedDiscordRefusalRuntime.secrets || null,
    }),
  );
  addCheck(
    checks,
    "nested-publication-boundaries-passed",
    nestedLaunchPacket.publicationBoundaries?.passed === true,
    `passed=${nestedLaunchPacket.publicationBoundaries?.passed}`,
  );
  addCheck(
    checks,
    "nested-publication-boundaries-status",
    nestedPublicationBoundaries.status === "passed",
    `status=${nestedPublicationBoundaries.status || "missing"}`,
  );
  addCheck(
    checks,
    "nested-publication-boundaries-ready",
    publicationBoundariesReady(nestedPublicationBoundaries),
    JSON.stringify({
      evidence: nestedPublicationBoundaries.evidence || null,
      valuesPrinted: nestedPublicationBoundaries.valuesPrinted ?? null,
      checks: Array.isArray(nestedPublicationBoundaries.checks) ? nestedPublicationBoundaries.checks.length : null,
    }),
  );
  addCheck(
    checks,
    "nested-backup-restore-evidence-passed",
    nestedLaunchPacket.backupRestoreEvidence?.passed === true,
    `passed=${nestedLaunchPacket.backupRestoreEvidence?.passed}`,
  );
  addCheck(
    checks,
    "nested-backup-restore-evidence-status",
    nestedBackupRestoreEvidence.status === "passed",
    `status=${nestedBackupRestoreEvidence.status || "missing"}`,
  );
  addCheck(
    checks,
    "nested-backup-restore-evidence-ready",
    backupRestoreEvidenceReady(nestedBackupRestoreEvidence),
    JSON.stringify({
      evidence: nestedBackupRestoreEvidence.evidence || null,
      valuesPrinted: nestedBackupRestoreEvidence.valuesPrinted ?? null,
      secrets: nestedBackupRestoreEvidence.secrets || null,
      checks: Array.isArray(nestedBackupRestoreEvidence.checks) ? nestedBackupRestoreEvidence.checks.length : null,
    }),
  );
  addCheck(
    checks,
    "nested-living-docs-review-evidence-passed",
    nestedLaunchPacket.livingDocsReviewEvidence?.passed === true,
    `passed=${nestedLaunchPacket.livingDocsReviewEvidence?.passed}`,
  );
  addCheck(
    checks,
    "nested-living-docs-review-evidence-status",
    nestedLivingDocsReviewEvidence.status === "passed",
    `status=${nestedLivingDocsReviewEvidence.status || "missing"}`,
  );
  addCheck(
    checks,
    "nested-living-docs-review-evidence-ready",
    livingDocsReviewEvidenceReady(nestedLivingDocsReviewEvidence),
    JSON.stringify({
      evidence: nestedLivingDocsReviewEvidence.evidence || null,
      valuesPrinted: nestedLivingDocsReviewEvidence.valuesPrinted ?? null,
      secrets: nestedLivingDocsReviewEvidence.secrets || null,
      checks: Array.isArray(nestedLivingDocsReviewEvidence.checks) ? nestedLivingDocsReviewEvidence.checks.length : null,
    }),
  );
  addCheck(
    checks,
    "nested-evidence-summary-renderer-passed",
    nestedLaunchPacket.evidenceSummaryRenderer?.passed === true,
    `passed=${nestedLaunchPacket.evidenceSummaryRenderer?.passed}`,
  );
  addCheck(
    checks,
    "nested-evidence-summary-renderer-status",
    nestedEvidenceSummaryRenderer.status === "passed",
    `status=${nestedEvidenceSummaryRenderer.status || "missing"}`,
  );
  addCheck(
    checks,
    "nested-evidence-summary-renderer-ready",
    evidenceSummaryRendererReady(nestedEvidenceSummaryRenderer),
    JSON.stringify({
      launchSummaryLines: nestedEvidenceSummaryRenderer.evidence?.launchSummaryLines ?? null,
      releaseSummaryLines: nestedEvidenceSummaryRenderer.evidence?.releaseSummaryLines ?? null,
      appendedBytes: nestedEvidenceSummaryRenderer.evidence?.appendedBytes ?? null,
      valuesPrinted: nestedEvidenceSummaryRenderer.evidence?.valuesPrinted ?? null,
      checks: Array.isArray(nestedEvidenceSummaryRenderer.checks) ? nestedEvidenceSummaryRenderer.checks.length : null,
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
    service: "search-book-release-dry-run-packet-check",
    packet: relativeOrAbsolute(packetPath),
    nestedLaunchPacket: relativeOrAbsolute(nestedLaunchPath),
    generatedAt: packet.generatedAt || null,
    evidence: {
      releaseStatus: packet.status || null,
      repository: {
        branch: repository.branch || null,
        commit: repository.commit || null,
        dirty: repository.dirty === true,
        dirtyStatusCount: Array.isArray(repository.dirtyStatus) ? repository.dirtyStatus.length : null,
      },
      nestedLaunchRepository: {
        branch: nestedRepository.branch || null,
        commit: nestedRepository.commit || null,
        dirty: nestedRepository.dirty === true,
        dirtyStatusCount: Array.isArray(nestedRepository.dirtyStatus) ? nestedRepository.dirtyStatus.length : null,
      },
      staticArtifactStatus: staticArtifact.status || null,
      staticArtifactIntegrity: staticArtifact.integrity || null,
      launchStatus: launchSummary.launchStatus || null,
      productionReadinessPacket: nestedProductionPacketVerify,
      monitoringStatus: launchSummary.monitoringStatus || null,
      sourceFreshnessStatus: launchSummary.sourceFreshnessStatus || null,
      sourceFreshnessChecks: nestedSourceTotals.checks ? `${nestedSourceTotals.passed}/${nestedSourceTotals.checks}` : null,
      sourceFreshnessSources: nestedSourceTotals.sources ? `${nestedSourceTotals.sourcesFetched}/${nestedSourceTotals.sources}` : null,
      sourceBodiesPrinted: nestedSourceSecrets.sourceBodiesPrinted,
      statusEvidenceStatus: launchSummary.statusEvidenceStatus || null,
      statusEvidenceDocuments: nestedStatusDocuments.length ? `${nestedPassedStatusDocuments}/${nestedStatusDocuments.length}` : null,
      specReconciliationStatus: launchSummary.specReconciliationStatus || null,
      specReconciliation: {
        evidence: nestedSpecReconciliation.evidence || null,
        checks: nestedSpecChecks.length ? `${nestedSpecPassedChecks}/${nestedSpecChecks.length}` : null,
      },
      discordReviewArtifactsStatus: launchSummary.discordReviewArtifactsStatus || null,
      discordReviewArtifacts: {
        routedItems: nestedDiscordReviewArtifacts.summary?.routedItems ?? null,
        routeCoverage: nestedDiscordReviewArtifacts.summary?.routeCoverage || null,
        editorialQueue: nestedDiscordReviewArtifacts.editorialQueue || null,
        editorialQueueData: nestedDiscordReviewArtifacts.editorialQueueData || null,
      },
      discordRefusalRuntimeStatus: launchSummary.discordRefusalRuntimeStatus || null,
      discordRefusalRuntime: {
        routingRefusals: nestedDiscordRefusalRuntime.evidence?.routingRefusals ?? null,
        probes: nestedDiscordRefusalRuntime.evidence?.probes || [],
        secrets: nestedDiscordRefusalRuntime.secrets || null,
      },
      publicationBoundariesStatus: launchSummary.publicationBoundariesStatus || null,
      publicationBoundaries: nestedPublicationBoundaries.evidence || null,
      backupRestoreEvidenceStatus: launchSummary.backupRestoreEvidenceStatus || null,
      backupRestoreEvidence: nestedBackupRestoreEvidence.evidence || null,
      livingDocsReviewEvidenceStatus: launchSummary.livingDocsReviewEvidenceStatus || null,
      livingDocsReviewEvidence: nestedLivingDocsReviewEvidence.evidence || null,
      evidenceSummaryRendererStatus: launchSummary.evidenceSummaryRendererStatus || null,
      evidenceSummaryRenderer: nestedEvidenceSummaryRenderer.evidence || null,
      steps: (packet.steps || []).map((step) => ({ id: step.id, status: step.status })),
      sourceCompletionReady: readiness.sourceCompletionReady === true,
      sourceRequirements: readiness.sourceRequirements || null,
      discordRouteCoverage: readiness.discordRouteCoverage || null,
      openOperatorItems: readiness.openOperatorItems || [],
      openOperatorLinearTasks: operatorLinearTasks(readiness),
      sensitiveMatches: sensitiveMatches.length,
      summaryArtifact,
    },
    checks,
  };
}

try {
  const args = parseArgs(process.argv.slice(2));
  const packet = readJson(args.packet);
  const nestedPath = nestedLaunchPacketPath(packet, args.packet);
  const nestedLaunchPacket = readJson(nestedPath);
  const result = validateReleasePacket(packet, nestedLaunchPacket, args.packet, nestedPath, { requireSummary: args.requireSummary });
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
    service: "search-book-release-dry-run-packet-check",
    message: error.message,
    secrets: { valuesPrinted: false },
  }, null, 2));
  process.exitCode = 1;
}
