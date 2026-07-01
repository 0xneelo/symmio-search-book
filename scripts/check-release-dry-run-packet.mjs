#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const allowedOpenOperatorItems = new Set([4, 11]);

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
  --json         Accepted for command symmetry; output is always JSON

Validates a no-secret release dry-run packet plus its nested launch-evidence
packet. This checks child steps, static artifact integrity, launch readiness,
monitoring, Vibe source freshness, status-document evidence, no sensitive
matches, clean repository state, and reconciled open operator gates.`;
}

function parseArgs(argv) {
  const args = { packet: defaultPacketPath() };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--json") continue;
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

function repositoryClean(repository = {}) {
  return repository.dirty === false && (!Array.isArray(repository.dirtyStatus) || repository.dirtyStatus.length === 0);
}

function nestedLaunchPacketPath(releasePacket, releasePacketPath) {
  if (releasePacket.launchEvidenceDir) {
    return path.join(releasePacket.launchEvidenceDir, "launch-evidence.json");
  }
  return path.join(path.dirname(releasePacketPath), "launch-evidence", "launch-evidence.json");
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

function normalizedDiscordReviewArtifacts(packet) {
  return packet.discordReviewArtifacts?.parsed || {};
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
  const total = Number(routeCoverage.totalPageFitGroups || 0);
  const covered = Number(routeCoverage.coveredPageFitGroups || 0);
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
    && total > 0
    && covered === total
    && Number(routeCoverage.pageFitSingleRouteRemaining || 0) === 0
    && Number(routeCoverage.pageFitWithoutPublicRoute || 0) === 0
    && Number(editorialQueue.pageFitReviewReady || 0) > 0
    && Number(editorialQueue.refusalReviewReady || 0) > 0
    && Number(editorialQueue.rawTableHits || 0) === 0
    && Number(editorialQueue.sampleLeaks || 0) === 0
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

function validateReleasePacket(packet, nestedLaunchPacket, packetPath, nestedLaunchPath) {
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
  const nestedDiscordReviewArtifacts = normalizedDiscordReviewArtifacts(nestedLaunchPacket);
  const nestedEvidenceSummaryRenderer = normalizedEvidenceSummaryRenderer(nestedLaunchPacket);
  const nestedSourceSecrets = nestedSourceFreshness.secrets || {};
  const nestedSourceTotals = nestedSourceFreshness.totals || {};
  const nestedStatusDocuments = nestedStatusEvidence.documents || [];
  const nestedPassedStatusDocuments = nestedStatusDocuments.filter((doc) => doc.passed).length;
  const sourceBodyMarkers = sourceFreshnessBodyMarkers(nestedSourceFreshness);
  const readiness = packet.readiness || {};
  const unexpectedOpen = unexpectedOpenOperatorItems(readiness);
  const unexpectedStatusOpen = unexpectedStatusEvidenceOpenOperatorItems(nestedStatusEvidence);

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
    "launch-summary-discord-review-artifacts-status",
    launchSummary.discordReviewArtifactsStatus === "passed",
    `discordReviewArtifactsStatus=${launchSummary.discordReviewArtifactsStatus || "missing"}`,
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
      rawKeyHits: nestedDiscordReviewArtifacts.summary?.rawKeyHits ?? null,
      sampleLeaks: nestedDiscordReviewArtifacts.summary?.sampleLeaks ?? null,
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

  const failed = checks.filter((check) => !check.passed);
  return {
    status: failed.length ? "failed" : "passed",
    service: "search-book-release-dry-run-packet-check",
    packet: path.relative(searchBookRoot, packetPath).startsWith("..") ? packetPath : path.relative(searchBookRoot, packetPath),
    nestedLaunchPacket: path.relative(searchBookRoot, nestedLaunchPath).startsWith("..")
      ? nestedLaunchPath
      : path.relative(searchBookRoot, nestedLaunchPath),
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
      monitoringStatus: launchSummary.monitoringStatus || null,
      sourceFreshnessStatus: launchSummary.sourceFreshnessStatus || null,
      sourceFreshnessChecks: nestedSourceTotals.checks ? `${nestedSourceTotals.passed}/${nestedSourceTotals.checks}` : null,
      sourceFreshnessSources: nestedSourceTotals.sources ? `${nestedSourceTotals.sourcesFetched}/${nestedSourceTotals.sources}` : null,
      sourceBodiesPrinted: nestedSourceSecrets.sourceBodiesPrinted,
      statusEvidenceStatus: launchSummary.statusEvidenceStatus || null,
      statusEvidenceDocuments: nestedStatusDocuments.length ? `${nestedPassedStatusDocuments}/${nestedStatusDocuments.length}` : null,
      discordReviewArtifactsStatus: launchSummary.discordReviewArtifactsStatus || null,
      discordReviewArtifacts: {
        routedItems: nestedDiscordReviewArtifacts.summary?.routedItems ?? null,
        routeCoverage: nestedDiscordReviewArtifacts.summary?.routeCoverage || null,
        editorialQueue: nestedDiscordReviewArtifacts.editorialQueue || null,
      },
      evidenceSummaryRendererStatus: launchSummary.evidenceSummaryRendererStatus || null,
      evidenceSummaryRenderer: nestedEvidenceSummaryRenderer.evidence || null,
      steps: (packet.steps || []).map((step) => ({ id: step.id, status: step.status })),
      sourceCompletionReady: readiness.sourceCompletionReady === true,
      sourceRequirements: readiness.sourceRequirements || null,
      discordRouteCoverage: readiness.discordRouteCoverage || null,
      openOperatorItems: readiness.openOperatorItems || [],
      sensitiveMatches: sensitiveMatches.length,
    },
    checks,
  };
}

try {
  const args = parseArgs(process.argv.slice(2));
  const packet = readJson(args.packet);
  const nestedPath = nestedLaunchPacketPath(packet, args.packet);
  const nestedLaunchPacket = readJson(nestedPath);
  const result = validateReleasePacket(packet, nestedLaunchPacket, args.packet, nestedPath);
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
