#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const allowedOpenOperatorItems = new Set([4, 11]);

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
  --json         Accepted for command symmetry; output is always JSON

Validates a no-secret launch-evidence packet, including launch readiness,
monitoring, Vibe source freshness, source-ingestion readiness, Discord route
coverage, living-docs controls, and reconciled open operator gates.`;
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

function validateLaunchPacket(packet, packetPath) {
  const checks = [];
  const launch = normalizedLaunchEvidence(packet);
  const monitoring = normalizedMonitoringEvidence(packet);
  const sourceFreshness = normalizedSourceFreshnessEvidence(packet);
  const readiness = packet.readiness || {};
  const sourceTotals = sourceFreshness.totals || {};
  const sourceSecrets = sourceFreshness.secrets || {};
  const sourceBodyMarkers = sourceFreshnessBodyMarkers(sourceFreshness);
  const unexpectedOpen = unexpectedOpenOperatorItems(readiness);

  addCheck(checks, "packet-status", packet.status === "passed", `status=${packet.status || "missing"}`);
  addCheck(checks, "packet-secret-values", packet.secrets?.valuesPrinted === false, `valuesPrinted=${packet.secrets?.valuesPrinted}`);
  addCheck(checks, "launch-evidence-passed", packet.launchEvidence?.passed === true, `passed=${packet.launchEvidence?.passed}`);
  addCheck(checks, "launch-status", launch.status === "passed", `status=${launch.status || "missing"}`);
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
    service: "search-book-launch-evidence-packet-check",
    packet: path.relative(searchBookRoot, packetPath).startsWith("..") ? packetPath : path.relative(searchBookRoot, packetPath),
    generatedAt: packet.generatedAt || null,
    evidence: {
      packetStatus: packet.status || null,
      launchStatus: launch.status || null,
      monitoringStatus: monitoring.status || null,
      sourceFreshnessStatus: sourceFreshness.status || null,
      sourceFreshnessChecks: sourceTotals.checks ? `${sourceTotals.passed}/${sourceTotals.checks}` : null,
      sourceFreshnessSources: sourceTotals.sources ? `${sourceTotals.sourcesFetched}/${sourceTotals.sources}` : null,
      sourceBodiesPrinted: sourceSecrets.sourceBodiesPrinted,
      sourceCompletionReady: readiness.sourceCompletionReady === true,
      sourceRequirements: readiness.sourceRequirements || null,
      discordRouteCoverage: readiness.discordRouteCoverage || null,
      openOperatorItems: readiness.openOperatorItems || [],
    },
    checks,
  };
}

try {
  const args = parseArgs(process.argv.slice(2));
  const packet = readJson(args.packet);
  const result = validateLaunchPacket(packet, args.packet);
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
