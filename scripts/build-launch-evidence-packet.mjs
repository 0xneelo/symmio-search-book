#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const validProfiles = new Set(["production", "staging"]);

const defaults = {
  profile: "staging",
  siteUrl: process.env.SEARCH_BOOK_DEPLOYMENT_SITE_URL || "",
  serviceUrl: process.env.SEARCH_BOOK_ANSWER_ENGINE_URL || "",
  backupManifest: process.env.SEARCH_BOOK_ANSWER_ENGINE_BACKUP_MANIFEST || process.env.SEARCH_BOOK_BACKUP_MANIFEST || "",
  backupMaxAgeHours: process.env.SEARCH_BOOK_BACKUP_MAX_AGE_HOURS || "24",
  runVerify: true,
  writeSmoke: null,
  allowLocal: false,
  skipProductionEnv: false,
  skipDeploymentSmoke: false,
  includeMonitoring: true,
  includeSourceFreshness: true,
  monitoringRequired: null,
  monitoringTokenEnv: "SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN",
  monitoringOrigin: "",
  localDrill: false,
  outDir: "",
};

function usage() {
  return `Usage:
  node scripts/build-launch-evidence-packet.mjs [options]

Options:
  --profile production|staging     Default: staging
  --site-url url                   Defaults to SEARCH_BOOK_DEPLOYMENT_SITE_URL
  --service-url url                Defaults to SEARCH_BOOK_ANSWER_ENGINE_URL
  --backup-manifest path           Defaults to SEARCH_BOOK_ANSWER_ENGINE_BACKUP_MANIFEST / SEARCH_BOOK_BACKUP_MANIFEST
  --backup-max-age-hours n         Default: SEARCH_BOOK_BACKUP_MAX_AGE_HOURS or 24
  --run-verify / --no-run-verify   Default: --run-verify
  --write-smoke / --no-write-smoke Let launch readiness write one answer/rating/page-feedback event set
  --allow-local                    Permit localhost URLs in staging launch readiness
  --skip-production-env            Staging only
  --skip-deployment-smoke          Staging only
  --skip-monitoring                Do not include health/metrics monitoring evidence
  --skip-source-freshness          Do not include Vibe public-docs freshness evidence
  --monitoring-required            Fail packet if metrics monitoring evidence is unavailable
  --monitoring-optional            Include monitoring as warning-only evidence
  --monitoring-token-env NAME      Default: SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN
  --monitoring-origin url          Optional Origin header for monitoring probe
  --local-drill                    Run scripts/run-local-launch-drill.mjs and package its evidence
  --out-dir path                   Default: /tmp/search-book-launch-evidence-<timestamp>

If no site/service URL is provided for the staging profile, --local-drill is implied.
The packet writes launch-evidence.json and launch-evidence.md and never prints secret values.`;
}

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--run-verify") {
      args.runVerify = true;
      continue;
    }
    if (arg === "--no-run-verify") {
      args.runVerify = false;
      continue;
    }
    if (arg === "--write-smoke") {
      args.writeSmoke = true;
      continue;
    }
    if (arg === "--no-write-smoke") {
      args.writeSmoke = false;
      continue;
    }
    if (arg === "--allow-local") {
      args.allowLocal = true;
      continue;
    }
    if (arg === "--skip-production-env") {
      args.skipProductionEnv = true;
      continue;
    }
    if (arg === "--skip-deployment-smoke") {
      args.skipDeploymentSmoke = true;
      continue;
    }
    if (arg === "--skip-monitoring") {
      args.includeMonitoring = false;
      continue;
    }
    if (arg === "--skip-source-freshness") {
      args.includeSourceFreshness = false;
      continue;
    }
    if (arg === "--monitoring-required") {
      args.monitoringRequired = true;
      continue;
    }
    if (arg === "--monitoring-optional") {
      args.monitoringRequired = false;
      continue;
    }
    if (arg === "--local-drill") {
      args.localDrill = true;
      continue;
    }

    const next = argv[index + 1];
    if (!next || next.startsWith("--")) throw new Error(`${arg} requires a value.\n${usage()}`);
    if (arg === "--profile") args.profile = next;
    else if (arg === "--site-url") args.siteUrl = next;
    else if (arg === "--service-url") args.serviceUrl = next;
    else if (arg === "--backup-manifest") args.backupManifest = next;
    else if (arg === "--backup-max-age-hours") args.backupMaxAgeHours = next;
    else if (arg === "--monitoring-token-env") args.monitoringTokenEnv = next;
    else if (arg === "--monitoring-origin") args.monitoringOrigin = next;
    else if (arg === "--out-dir") args.outDir = path.resolve(next);
    else throw new Error(`Unknown argument: ${arg}\n${usage()}`);
    index += 1;
  }

  if (!validProfiles.has(args.profile)) throw new Error("--profile must be production or staging.");
  if (args.profile === "production" && args.localDrill) throw new Error("--local-drill is staging-only.");
  if (args.profile === "production" && args.allowLocal) throw new Error("--allow-local is staging-only.");
  if (args.profile === "production" && args.skipProductionEnv) throw new Error("--skip-production-env is staging-only.");
  if (args.profile === "production" && args.skipDeploymentSmoke) throw new Error("--skip-deployment-smoke is staging-only.");
  if (args.profile === "staging" && !args.siteUrl && !args.serviceUrl) args.localDrill = true;
  if (args.profile === "production" && args.monitoringRequired === false) throw new Error("--monitoring-optional is staging-only.");
  if (!args.outDir) args.outDir = defaultOutDir();
  return args;
}

function defaultOutDir() {
  const stamp = new Date().toISOString().replaceAll(":", "").replaceAll(".", "-");
  return path.join(os.tmpdir(), `search-book-launch-evidence-${stamp}`);
}

function tail(text, maxLength = 6000) {
  const value = String(text || "");
  return value.length > maxLength ? value.slice(value.length - maxLength) : value;
}

function parseJsonFromOutput(output) {
  const raw = String(output || "").trim();
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    for (let index = raw.lastIndexOf("{"); index >= 0; index = raw.lastIndexOf("{", index - 1)) {
      try {
        return JSON.parse(raw.slice(index));
      } catch {
        // Keep scanning for the final JSON object.
      }
    }
  }
  return null;
}

function commandResult(commandArgs, env = {}) {
  const result = spawnSync(process.execPath, commandArgs, {
    cwd: searchBookRoot,
    encoding: "utf8",
    env: {
      ...process.env,
      ...env,
    },
    maxBuffer: 1024 * 1024 * 40,
  });
  const parsed = parseJsonFromOutput(result.stdout) || parseJsonFromOutput(result.stderr);
  return {
    command: ["node", ...commandArgs],
    exitCode: result.status,
    signal: result.signal,
    passed: !result.error && result.status === 0,
    parsed,
    stdoutTail: parsed ? "" : tail(result.stdout),
    stderrTail: parsed ? "" : tail(result.stderr),
    error: result.error?.message || "",
  };
}

function gitValue(args) {
  const result = spawnSync("git", args, {
    cwd: searchBookRoot,
    encoding: "utf8",
  });
  return result.status === 0 ? result.stdout.trim() : "";
}

function readJson(relativePath, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(path.join(searchBookRoot, relativePath), "utf8"));
  } catch {
    return fallback;
  }
}

function summarizeDiscordRouteCoverage() {
  const routing = readJson("data/discord-review-routing.json", {});
  const coverage = routing?.reviewPlan?.routeCoverage || {};
  return {
    coverageReady: coverage.coverageReady === true,
    totalPageFitGroups: coverage.totalPageFitGroups ?? null,
    pageFitCoveredByPublicRoutes: coverage.pageFitCoveredByPublicRoutes ?? null,
    pageFitSingleRouteRemaining: coverage.pageFitSingleRouteRemaining ?? null,
    pageFitWithoutPublicRoute: coverage.pageFitWithoutPublicRoute ?? null,
    totalPublicRoutesToPageFitPages: coverage.totalPublicRoutesToPageFitPages ?? null,
  };
}

function normalizeStatusCounts(byStatus = {}) {
  return {
    complete: byStatus.complete ?? 0,
    partial: byStatus.partial ?? 0,
    parked: byStatus.parked ?? 0,
    missing: byStatus.missing ?? 0,
  };
}

function sanitize(value, key = "") {
  if (Array.isArray(value)) return value.map((item) => sanitize(item, key));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([childKey, childValue]) => [
      childKey,
      sanitize(childValue, childKey),
    ]));
  }
  if (typeof value !== "string") return value;
  if (/api[_-]?key|token|secret|authorization|password|bearer/i.test(key)) {
    return value ? "[redacted]" : "";
  }
  return value
    .replace(/sk-[A-Za-z0-9_-]{12,}/g, "sk-[redacted]")
    .replace(/Bearer\s+[A-Za-z0-9._-]{12,}/gi, "Bearer [redacted]");
}

function summarizeReadiness() {
  const quality = readJson("data/quality-audit.json", {});
  const requirements = readJson("data/requirement-map.json", {});
  const sourceIngestion = readJson("data/source-ingestion.json", {});
  const answerContract = readJson("data/answer-engine-contract.json", {});
  const livingDocs = readJson("data/living-docs-events.json", {});
  const llm = readJson("data/llm-rag-contract.json", {});
  const gates = Array.isArray(quality.gates) ? quality.gates : [];
  const gatePasses = gates.filter((gate) => gate?.passed === true).length;
  const totals = quality.totals || {};
  const sourceStatus = sourceIngestion.byStatus || {};
  const llmSuites = llm.liveEvaluation?.suites || {};
  return {
    manifestPages: totals.manifestPages || null,
    authoredPages: totals.authoredFiles || totals.authoredPublicationCandidates || null,
    qualityGates: gates.length ? `${gatePasses}/${gates.length}` : null,
    exactRoutes: totals.answerEngineExactRouteTestsPassing && totals.answerEngineExactRouteTests
      ? `${totals.answerEngineExactRouteTestsPassing}/${totals.answerEngineExactRouteTests}`
      : null,
    retrievalEligiblePages: totals.pageStateRetrievalEligiblePages || null,
    llmProductionReady: answerContract.llmProductionReady === true || llm.llmProductionReady === true,
    livingDocsProductionReady: livingDocs.livingDocsProductionReady === true,
    livingDocsControls: {
      datastore: livingDocs.datastoreImplemented === true,
      frontendBridge: livingDocs.frontendServiceIntegrationImplemented === true,
      pageFeedback: livingDocs.pageFeedbackServiceImplemented === true,
      retention: livingDocs.retentionPolicyImplemented === true,
      moderation: livingDocs.moderationExportImplemented === true,
      metrics: livingDocs.metricsExportImplemented === true,
      cors: livingDocs.corsPolicyImplemented === true,
      backup: livingDocs.backupRestoreImplemented === true,
      preflight: livingDocs.productionPreflightImplemented === true,
    },
    sourceCompletionReady: sourceIngestion.sourceCompletionReady === true,
    sourceRequirements: normalizeStatusCounts(sourceStatus),
    completionReady: requirements.completionReady === true,
    requirementStatus: requirements.byStatus || null,
    discordRouteCoverage: summarizeDiscordRouteCoverage(),
    openOperatorItems: (requirements.openOperatorItems || []).map((item) => ({
      id: item.id,
      title: item.title,
    })),
    liveLlmEval: {
      status: llm.liveEvaluation?.status || null,
      provider: llm.liveEvaluation?.provider || null,
      model: llm.liveEvaluation?.model || null,
      total: llmSuites.total ? `${llmSuites.total.passing}/${llmSuites.total.total}` : null,
      adversarial: llmSuites.adversarial ? `${llmSuites.adversarial.passing}/${llmSuites.adversarial.total}` : null,
      answerValidation: llmSuites.answerValidation ? `${llmSuites.answerValidation.passing}/${llmSuites.answerValidation.total}` : null,
      estimatedCostUsd: llm.liveEvaluation?.measuredUsage?.estimatedCostUsd ?? null,
    },
  };
}

function runEvidenceCommand(args) {
  if (args.localDrill) {
    const commandArgs = ["scripts/run-local-launch-drill.mjs"];
    if (!args.runVerify) commandArgs.push("--no-run-verify");
    if (args.writeSmoke === false) commandArgs.push("--no-write-smoke");
    return {
      source: "local-launch-drill",
      result: commandResult(commandArgs),
    };
  }

  const commandArgs = [
    "scripts/check-launch-readiness.mjs",
    "--profile",
    args.profile,
    "--site-url",
    args.siteUrl,
    "--service-url",
    args.serviceUrl,
    "--mode",
    args.profile === "production" ? "llm" : "extractive",
  ];
  if (args.backupManifest) commandArgs.push("--backup-manifest", args.backupManifest);
  if (args.backupMaxAgeHours) commandArgs.push("--backup-max-age-hours", String(args.backupMaxAgeHours));
  if (args.runVerify) commandArgs.push("--run-verify");
  if (args.writeSmoke === true) commandArgs.push("--write-smoke");
  if (args.allowLocal) commandArgs.push("--allow-local");
  if (args.skipProductionEnv) commandArgs.push("--skip-production-env");
  if (args.skipDeploymentSmoke) commandArgs.push("--skip-deployment-smoke");
  return {
    source: "launch-readiness",
    result: commandResult(commandArgs),
  };
}

function runMonitoringCommand(args) {
  if (!args.includeMonitoring) {
    return {
      source: "skipped",
      result: {
        command: [],
        exitCode: 0,
        signal: null,
        passed: true,
        parsed: {
          status: "skipped",
          service: "search-book-monitoring-evidence",
          reason: "skipped by --skip-monitoring",
          totals: { checks: 0, passed: 0, failed: 0, warnings: 0 },
          secrets: { valuesPrinted: false },
        },
        stdoutTail: "",
        stderrTail: "",
        error: "",
      },
    };
  }

  const commandArgs = ["scripts/check-monitoring-evidence.mjs"];
  if (args.localDrill && !args.serviceUrl) {
    return {
      source: "local-monitoring",
      result: commandResult(commandArgs),
    };
  }

  commandArgs.push("--profile", args.profile, "--service-url", args.serviceUrl);
  if (args.monitoringOrigin) commandArgs.push("--origin", args.monitoringOrigin);
  if (args.monitoringTokenEnv) commandArgs.push("--metrics-token-env", args.monitoringTokenEnv);
  if (args.monitoringRequired === true) commandArgs.push("--metrics-required");
  if (args.monitoringRequired === false) commandArgs.push("--metrics-optional");
  return {
    source: "monitoring-evidence",
    result: commandResult(commandArgs),
  };
}

function runSourceFreshnessCommand(args) {
  if (!args.includeSourceFreshness) {
    return {
      source: "skipped",
      result: {
        command: [],
        exitCode: 0,
        signal: null,
        passed: true,
        parsed: {
          status: "skipped",
          service: "search-book-vibe-source-freshness",
          reason: "skipped by --skip-source-freshness",
          totals: { sources: 0, sourcesFetched: 0, checks: 0, passed: 0, failed: 0 },
          secrets: { valuesPrinted: false, sourceBodiesPrinted: false },
        },
        stdoutTail: "",
        stderrTail: "",
        error: "",
      },
    };
  }

  return {
    source: "vibe-source-freshness",
    result: commandResult(["scripts/check-vibe-source-freshness.mjs"]),
  };
}

function runStatusEvidenceCommand() {
  return {
    source: "status-evidence",
    result: commandResult(["scripts/check-status-evidence.mjs"]),
  };
}

function runDiscordReviewArtifactsCommand() {
  return {
    source: "discord-review-artifacts",
    result: commandResult(["scripts/check-discord-review-artifacts.mjs"]),
  };
}

function runEvidenceSummaryRendererCommand() {
  return {
    source: "evidence-summary-renderer",
    result: commandResult(["scripts/check-evidence-summary-renderer.mjs"]),
  };
}

function renderMarkdown(packet) {
  const launch = normalizedLaunchEvidence(packet);
  const monitoring = normalizedMonitoringEvidence(packet);
  const sourceFreshness = normalizedSourceFreshnessEvidence(packet);
  const statusEvidence = normalizedStatusEvidence(packet);
  const discordReviewArtifacts = normalizedDiscordReviewArtifacts(packet);
  const evidenceSummaryRenderer = normalizedEvidenceSummaryRenderer(packet);
  const totals = launch.totals || {};
  const monitoringTotals = monitoring.totals || {};
  const sourceFreshnessTotals = sourceFreshness.totals || {};
  const statusEvidenceDocuments = statusEvidence.documents || [];
  const statusEvidencePassedDocuments = statusEvidenceDocuments.filter((doc) => doc.passed).length;
  const discordSummary = discordReviewArtifacts.summary || {};
  const discordRouteCoverage = discordSummary.routeCoverage || {};
  const discordQueue = discordReviewArtifacts.editorialQueue || {};
  const failedChecks = (launch.checks || []).filter((check) => !check.passed && check.severity === "error");
  const warningChecks = (launch.checks || []).filter((check) => !check.passed && check.severity === "warning");
  const failedMonitoringChecks = (monitoring.checks || []).filter((check) => !check.passed && check.severity === "error");
  const warningMonitoringChecks = (monitoring.checks || []).filter((check) => !check.passed && check.severity === "warning");
  const readiness = packet.readiness;
  const openItems = readiness.openOperatorItems || [];
  return `# Search Book Launch Evidence Packet

Generated: ${packet.generatedAt}

Status: **${packet.status}**

Profile: \`${packet.profile}\`

Evidence source: \`${packet.evidenceSource}\`

Secrets printed: \`${packet.secrets.valuesPrinted}\`

## Repository

- Commit: \`${packet.repository.commit || "unknown"}\`
- Branch: \`${packet.repository.branch || "unknown"}\`
- Dirty worktree: \`${packet.repository.dirty}\`

## Readiness Snapshot

- Manifest pages: \`${readiness.manifestPages ?? "unknown"}\`
- Authored pages: \`${readiness.authoredPages ?? "unknown"}\`
- Quality gates: \`${readiness.qualityGates ?? "unknown"}\`
- Exact routes: \`${readiness.exactRoutes ?? "unknown"}\`
- Source completion ready: \`${readiness.sourceCompletionReady}\`
- Source requirements: \`${readiness.sourceRequirements?.complete ?? "unknown"} complete / ${readiness.sourceRequirements?.partial ?? "unknown"} partial / ${readiness.sourceRequirements?.parked ?? "unknown"} parked / ${readiness.sourceRequirements?.missing ?? "unknown"} missing\`
- Discord route coverage: \`${readiness.discordRouteCoverage?.pageFitCoveredByPublicRoutes ?? "unknown"}/${readiness.discordRouteCoverage?.totalPageFitGroups ?? "unknown"} page-fit groups; ${readiness.discordRouteCoverage?.pageFitSingleRouteRemaining ?? "unknown"} single-route groups remaining\`
- Completion ready: \`${readiness.completionReady}\`
- LLM production ready: \`${readiness.llmProductionReady}\`
- Living-docs production ready: \`${readiness.livingDocsProductionReady}\`
- Living-docs controls: \`datastore=${readiness.livingDocsControls?.datastore}, frontendBridge=${readiness.livingDocsControls?.frontendBridge}, pageFeedback=${readiness.livingDocsControls?.pageFeedback}, retention=${readiness.livingDocsControls?.retention}, moderation=${readiness.livingDocsControls?.moderation}, metrics=${readiness.livingDocsControls?.metrics}, cors=${readiness.livingDocsControls?.cors}, backup=${readiness.livingDocsControls?.backup}, preflight=${readiness.livingDocsControls?.preflight}\`

## Launch Evidence

- Launch status: \`${launch.status || "missing"}\`
- Checks: \`${totals.passed ?? 0}/${totals.checks ?? 0}\`
- Failed errors: \`${totals.failed ?? failedChecks.length}\`
- Warnings: \`${totals.warnings ?? warningChecks.length}\`
- Values printed: \`${launch.secrets?.valuesPrinted ?? false}\`

## Monitoring Evidence

- Monitoring status: \`${monitoring.status || "missing"}\`
- Checks: \`${monitoringTotals.passed ?? 0}/${monitoringTotals.checks ?? 0}\`
- Failed errors: \`${monitoringTotals.failed ?? failedMonitoringChecks.length}\`
- Warnings: \`${monitoringTotals.warnings ?? warningMonitoringChecks.length}\`
- Health: \`${monitoring.summary?.health?.status || "missing"}\`
- Metrics: \`${monitoring.summary?.metrics?.status || "missing"}\`
- Values printed: \`${monitoring.secrets?.valuesPrinted ?? false}\`

## Source Freshness Evidence

- Source freshness status: \`${sourceFreshness.status || "missing"}\`
- Sources fetched: \`${sourceFreshnessTotals.sourcesFetched ?? 0}/${sourceFreshnessTotals.sources ?? 0}\`
- Claim checks: \`${sourceFreshnessTotals.passed ?? 0}/${sourceFreshnessTotals.checks ?? 0}\`
- Values printed: \`${sourceFreshness.secrets?.valuesPrinted ?? false}\`
- Source bodies printed: \`${sourceFreshness.secrets?.sourceBodiesPrinted ?? false}\`
- Boundary: ${sourceFreshness.claimBoundary || "not recorded"}

## Status Evidence

- Status evidence status: \`${statusEvidence.status || "missing"}\`
- Documents checked: \`${statusEvidencePassedDocuments}/${statusEvidenceDocuments.length}\`
- Open operator items: \`${(statusEvidence.evidence?.openOperatorItems || []).map((id) => `#${id}`).join(", ") || "none"}\`

## Discord Review Artifacts Evidence

- Discord review artifacts status: \`${discordReviewArtifacts.status || "missing"}\`
- Routed review items: \`${discordSummary.routedItems ?? "unknown"}\`
- Route coverage: \`${discordRouteCoverage.coveredPageFitGroups ?? "unknown"}/${discordRouteCoverage.totalPageFitGroups ?? "unknown"} page-fit groups\`
- Editorial queue: \`${discordQueue.pageFitReviewReady ?? "unknown"} page-fit groups; ${discordQueue.refusalReviewReady ?? "unknown"} refusal items\`
- Raw key hits: \`${discordSummary.rawKeyHits ?? "unknown"}\`
- Sample leaks: \`${discordSummary.sampleLeaks ?? "unknown"}\`
- Queue raw table hits: \`${discordQueue.rawTableHits ?? "unknown"}\`

## Evidence Summary Renderer

- Evidence summary renderer status: \`${evidenceSummaryRenderer.status || "missing"}\`
- Launch summary lines: \`${evidenceSummaryRenderer.evidence?.launchSummaryLines ?? "unknown"}\`
- Release summary lines: \`${evidenceSummaryRenderer.evidence?.releaseSummaryLines ?? "unknown"}\`
- Values printed: \`${evidenceSummaryRenderer.evidence?.valuesPrinted ?? "unknown"}\`

## Open Operator Items

${openItems.length ? openItems.map((item) => `- #${item.id}: ${item.title}`).join("\n") : "- None recorded in requirement map."}

## Failed Checks

${[...failedChecks, ...failedMonitoringChecks].length ? [...failedChecks, ...failedMonitoringChecks].map((check) => `- ${check.id}: ${check.detail || "failed"}`).join("\n") : "- None."}

## Warning Checks

${[...warningChecks, ...warningMonitoringChecks].length ? [...warningChecks, ...warningMonitoringChecks].map((check) => `- ${check.id}: ${check.detail || "warning"}`).join("\n") : "- None."}

## Packet Files

- JSON: \`${packet.files.json}\`
- Markdown: \`${packet.files.markdown}\`
`;
}

function normalizedLaunchEvidence(packet) {
  const parsed = packet.launchEvidence?.parsed || {};
  if (packet.evidenceSource === "local-launch-drill") {
    return parsed.evidence?.launchReadiness || {};
  }
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

function normalizedDiscordReviewArtifacts(packet) {
  return packet.discordReviewArtifacts?.parsed || {};
}

function normalizedEvidenceSummaryRenderer(packet) {
  return packet.evidenceSummaryRenderer?.parsed || {};
}

function buildPacket(args, evidence, monitoringEvidence, sourceFreshnessEvidence, statusEvidence, discordReviewArtifacts, evidenceSummaryRenderer) {
  const parsed = evidence.result.parsed || null;
  const monitoringParsed = monitoringEvidence.result.parsed || null;
  const sourceFreshnessParsed = sourceFreshnessEvidence.result.parsed || null;
  const statusEvidenceParsed = statusEvidence.result.parsed || null;
  const discordReviewArtifactsParsed = discordReviewArtifacts.result.parsed || null;
  const evidenceSummaryRendererParsed = evidenceSummaryRenderer.result.parsed || null;
  const commandPassed = evidence.result.passed && (!parsed || parsed.status === "passed");
  const monitoringPassed = monitoringEvidence.result.passed && (!monitoringParsed || ["passed", "skipped"].includes(monitoringParsed.status));
  const sourceFreshnessPassed =
    sourceFreshnessEvidence.result.passed && (!sourceFreshnessParsed || ["passed", "skipped"].includes(sourceFreshnessParsed.status));
  const statusEvidencePassed =
    statusEvidence.result.passed && (!statusEvidenceParsed || statusEvidenceParsed.status === "passed");
  const discordReviewArtifactsPassed =
    discordReviewArtifacts.result.passed && (!discordReviewArtifactsParsed || discordReviewArtifactsParsed.status === "passed");
  const evidenceSummaryRendererPassed =
    evidenceSummaryRenderer.result.passed && (!evidenceSummaryRendererParsed || evidenceSummaryRendererParsed.status === "passed");
  const status =
    commandPassed
      && monitoringPassed
      && sourceFreshnessPassed
      && statusEvidencePassed
      && discordReviewArtifactsPassed
      && evidenceSummaryRendererPassed
      ? "passed"
      : "failed";
  const dirtyStatus = gitValue(["status", "--short"]);
  const packet = {
    status,
    service: "search-book-launch-evidence-packet",
    generatedAt: new Date().toISOString(),
    profile: args.profile,
    evidenceSource: evidence.source,
    command: evidence.result.command,
    monitoringSource: monitoringEvidence.source,
    monitoringCommand: monitoringEvidence.result.command,
    sourceFreshnessSource: sourceFreshnessEvidence.source,
    sourceFreshnessCommand: sourceFreshnessEvidence.result.command,
    statusEvidenceSource: statusEvidence.source,
    statusEvidenceCommand: statusEvidence.result.command,
    discordReviewArtifactsSource: discordReviewArtifacts.source,
    discordReviewArtifactsCommand: discordReviewArtifacts.result.command,
    evidenceSummaryRendererSource: evidenceSummaryRenderer.source,
    evidenceSummaryRendererCommand: evidenceSummaryRenderer.result.command,
    repository: {
      root: searchBookRoot,
      branch: gitValue(["branch", "--show-current"]),
      commit: gitValue(["rev-parse", "--short", "HEAD"]),
      dirty: Boolean(dirtyStatus),
      dirtyStatus: dirtyStatus ? dirtyStatus.split("\n") : [],
    },
    secrets: {
      valuesPrinted: false,
      llmApiKeyConfigured: Boolean(process.env.SEARCH_BOOK_LLM_API_KEY),
      moderationTokenConfigured: Boolean(process.env.SEARCH_BOOK_ANSWER_ENGINE_MODERATION_TOKEN),
      metricsTokenConfigured: Boolean(process.env.SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN),
    },
    readiness: summarizeReadiness(),
    launchEvidence: {
      exitCode: evidence.result.exitCode,
      signal: evidence.result.signal,
      passed: evidence.result.passed,
      parsed,
      error: evidence.result.error,
      stdoutTail: evidence.result.stdoutTail,
      stderrTail: evidence.result.stderrTail,
    },
    monitoringEvidence: {
      exitCode: monitoringEvidence.result.exitCode,
      signal: monitoringEvidence.result.signal,
      passed: monitoringEvidence.result.passed,
      parsed: monitoringParsed,
      error: monitoringEvidence.result.error,
      stdoutTail: monitoringEvidence.result.stdoutTail,
      stderrTail: monitoringEvidence.result.stderrTail,
    },
    sourceFreshnessEvidence: {
      exitCode: sourceFreshnessEvidence.result.exitCode,
      signal: sourceFreshnessEvidence.result.signal,
      passed: sourceFreshnessEvidence.result.passed,
      parsed: sourceFreshnessParsed,
      error: sourceFreshnessEvidence.result.error,
      stdoutTail: sourceFreshnessEvidence.result.stdoutTail,
      stderrTail: sourceFreshnessEvidence.result.stderrTail,
    },
    statusEvidence: {
      exitCode: statusEvidence.result.exitCode,
      signal: statusEvidence.result.signal,
      passed: statusEvidence.result.passed,
      parsed: statusEvidenceParsed,
      error: statusEvidence.result.error,
      stdoutTail: statusEvidence.result.stdoutTail,
      stderrTail: statusEvidence.result.stderrTail,
    },
    discordReviewArtifacts: {
      exitCode: discordReviewArtifacts.result.exitCode,
      signal: discordReviewArtifacts.result.signal,
      passed: discordReviewArtifacts.result.passed,
      parsed: discordReviewArtifactsParsed,
      error: discordReviewArtifacts.result.error,
      stdoutTail: discordReviewArtifacts.result.stdoutTail,
      stderrTail: discordReviewArtifacts.result.stderrTail,
    },
    evidenceSummaryRenderer: {
      exitCode: evidenceSummaryRenderer.result.exitCode,
      signal: evidenceSummaryRenderer.result.signal,
      passed: evidenceSummaryRenderer.result.passed,
      parsed: evidenceSummaryRendererParsed,
      error: evidenceSummaryRenderer.result.error,
      stdoutTail: evidenceSummaryRenderer.result.stdoutTail,
      stderrTail: evidenceSummaryRenderer.result.stderrTail,
    },
    files: {
      json: "",
      markdown: "",
    },
  };
  return sanitize(packet);
}

function writePacket(args, packet) {
  fs.mkdirSync(args.outDir, { recursive: true });
  const jsonPath = path.join(args.outDir, "launch-evidence.json");
  const markdownPath = path.join(args.outDir, "launch-evidence.md");
  packet.files = {
    json: jsonPath,
    markdown: markdownPath,
  };
  fs.writeFileSync(jsonPath, `${JSON.stringify(packet, null, 2)}\n`);
  fs.writeFileSync(markdownPath, renderMarkdown(packet));
  return packet;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const evidence = runEvidenceCommand(args);
  const monitoringEvidence = runMonitoringCommand(args);
  const sourceFreshnessEvidence = runSourceFreshnessCommand(args);
  const statusEvidence = runStatusEvidenceCommand();
  const discordReviewArtifacts = runDiscordReviewArtifactsCommand();
  const evidenceSummaryRenderer = runEvidenceSummaryRendererCommand();
  const packet = writePacket(
    args,
    buildPacket(
      args,
      evidence,
      monitoringEvidence,
      sourceFreshnessEvidence,
      statusEvidence,
      discordReviewArtifacts,
      evidenceSummaryRenderer,
    ),
  );
  console.log(JSON.stringify({
    status: packet.status,
    service: packet.service,
    generatedAt: packet.generatedAt,
    profile: packet.profile,
    evidenceSource: packet.evidenceSource,
    files: packet.files,
    secrets: {
      valuesPrinted: false,
    },
    launchStatus: normalizedLaunchEvidence(packet).status || (packet.launchEvidence?.passed ? "passed" : "failed"),
    monitoringStatus: normalizedMonitoringEvidence(packet).status || (packet.monitoringEvidence?.passed ? "passed" : "failed"),
    sourceFreshnessStatus: normalizedSourceFreshnessEvidence(packet).status || (packet.sourceFreshnessEvidence?.passed ? "passed" : "failed"),
    statusEvidenceStatus: normalizedStatusEvidence(packet).status || (packet.statusEvidence?.passed ? "passed" : "failed"),
    discordReviewArtifactsStatus: normalizedDiscordReviewArtifacts(packet).status || (packet.discordReviewArtifacts?.passed ? "passed" : "failed"),
    evidenceSummaryRendererStatus: normalizedEvidenceSummaryRenderer(packet).status || (packet.evidenceSummaryRenderer?.passed ? "passed" : "failed"),
    readiness: {
      completionReady: packet.readiness.completionReady,
      sourceCompletionReady: packet.readiness.sourceCompletionReady,
      sourceRequirements: packet.readiness.sourceRequirements,
      livingDocsControls: packet.readiness.livingDocsControls,
      discordRouteCoverage: packet.readiness.discordRouteCoverage,
      openOperatorItems: packet.readiness.openOperatorItems,
    },
  }, null, 2));
  if (packet.status !== "passed") process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(JSON.stringify({
    status: "failed",
    service: "search-book-launch-evidence-packet",
    message: error.message,
    secrets: { valuesPrinted: false },
  }, null, 2));
  process.exitCode = 1;
}
