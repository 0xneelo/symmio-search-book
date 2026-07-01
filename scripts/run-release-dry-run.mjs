#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  outDir: process.env.SEARCH_BOOK_RELEASE_DRY_RUN_DIR || "",
  artifactDir: process.env.SEARCH_BOOK_STATIC_ARTIFACT_DIR || "",
  launchEvidenceDir: process.env.SEARCH_BOOK_LAUNCH_EVIDENCE_DIR || "",
  runLaunchVerify: true,
};

const sensitivePatterns = [
  /\bsk-[A-Za-z0-9_-]{20,}\b/,
  /Bearer\s+[A-Za-z0-9._-]{12,}/i,
  /SEARCH_BOOK_LLM_API_KEY\s*=\s*\S+/,
  /SEARCH_BOOK_ANSWER_ENGINE_MODERATION_TOKEN\s*=\s*\S+/,
  /SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN\s*=\s*\S+/,
  /DISCORD_TOKEN\s*=\s*\S+/,
];

function usage() {
  return `Usage:
  node scripts/run-release-dry-run.mjs [options]

Options:
  --out-dir path                  Default: SEARCH_BOOK_RELEASE_DRY_RUN_DIR or /tmp/search-book-release-dry-run-<timestamp>
  --artifact-dir path             Default: <out-dir>/static-site
  --launch-evidence-dir path      Default: <out-dir>/launch-evidence
  --launch-run-verify             Default: enabled
  --no-launch-run-verify          Skip verify inside launch evidence

Runs a no-secret release rehearsal:
  1. build the platform-neutral static artifact
  2. smoke the copied artifact as a static site
  3. smoke the copied artifact against a temporary answer-engine service
  4. build the launch-evidence packet
  5. write release-dry-run.json and release-dry-run.md

The command uses existing extractive/local smoke paths and never calls or prints LLM secrets.`;
}

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--launch-run-verify") {
      args.runLaunchVerify = true;
      continue;
    }
    if (arg === "--no-launch-run-verify") {
      args.runLaunchVerify = false;
      continue;
    }
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) throw new Error(`${arg} requires a value.\n${usage()}`);
    if (arg === "--out-dir") args.outDir = path.resolve(next);
    else if (arg === "--artifact-dir") args.artifactDir = path.resolve(next);
    else if (arg === "--launch-evidence-dir") args.launchEvidenceDir = path.resolve(next);
    else throw new Error(`Unknown argument: ${arg}\n${usage()}`);
    index += 1;
  }

  if (!args.outDir) args.outDir = defaultOutDir();
  args.outDir = path.resolve(args.outDir);
  if (!args.artifactDir) args.artifactDir = path.join(args.outDir, "static-site");
  if (!args.launchEvidenceDir) args.launchEvidenceDir = path.join(args.outDir, "launch-evidence");
  assertSafeOutDir(args.outDir, "--out-dir");
  assertSafeOutDir(args.artifactDir, "--artifact-dir");
  assertSafeOutDir(args.launchEvidenceDir, "--launch-evidence-dir");
  return args;
}

function defaultOutDir() {
  const stamp = new Date().toISOString().replaceAll(":", "").replaceAll(".", "-");
  return path.join(os.tmpdir(), `search-book-release-dry-run-${stamp}`);
}

function assertSafeOutDir(outDir, label) {
  const resolved = path.resolve(outDir);
  const relativeToRoot = path.relative(searchBookRoot, resolved);
  if (!path.isAbsolute(resolved)) throw new Error(`${label} must resolve to an absolute path.`);
  if (resolved === "/" || resolved === searchBookRoot || resolved === os.homedir()) {
    throw new Error(`Refusing unsafe ${label}: ${resolved}`);
  }
  if (!relativeToRoot.startsWith("..") && !path.isAbsolute(relativeToRoot)) {
    throw new Error(`${label} must not be inside the repository.`);
  }
}

function tail(text, maxLength = 6000) {
  const value = String(text || "");
  return value.length > maxLength ? value.slice(value.length - maxLength) : value;
}

function redact(text) {
  return String(text || "")
    .replace(/sk-[A-Za-z0-9_-]{12,}/g, "sk-[redacted]")
    .replace(/Bearer\s+[A-Za-z0-9._-]{12,}/gi, "Bearer [redacted]");
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
  return redact(value);
}

function commandResult(commandArgs) {
  const result = spawnSync(process.execPath, commandArgs, {
    cwd: searchBookRoot,
    encoding: "utf8",
    env: process.env,
    maxBuffer: 1024 * 1024 * 60,
  });
  const parsed = parseJsonFromOutput(result.stdout) || parseJsonFromOutput(result.stderr);
  return {
    command: ["node", ...commandArgs],
    exitCode: result.status,
    signal: result.signal,
    passed: !result.error && result.status === 0,
    parsed: sanitize(parsed),
    stdoutTail: parsed ? "" : redact(tail(result.stdout)),
    stderrTail: parsed ? "" : redact(tail(result.stderr)),
    error: redact(result.error?.message || ""),
  };
}

function runStep(id, title, commandArgs) {
  const result = commandResult(commandArgs);
  const parsedStatus = result.parsed?.status || "";
  const passed = result.passed && (!parsedStatus || parsedStatus === "passed");
  return {
    id,
    title,
    status: passed ? "passed" : "failed",
    ...result,
    passed,
  };
}

function skippedStep(id, title, reason) {
  return {
    id,
    title,
    status: "skipped",
    passed: false,
    command: [],
    exitCode: null,
    signal: null,
    parsed: null,
    stdoutTail: "",
    stderrTail: "",
    error: "",
    reason,
  };
}

function gitValue(args) {
  const result = spawnSync("git", args, {
    cwd: searchBookRoot,
    encoding: "utf8",
  });
  return result.status === 0 ? result.stdout.trim() : "";
}

function readJson(filePath, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function readRepoJson(relativePath, fallback = null) {
  return readJson(path.join(searchBookRoot, relativePath), fallback);
}

function summarizeDiscordRouteCoverage() {
  const routing = readRepoJson("data/discord-review-routing.json", {});
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

function summarizeStaticArtifact(artifactDir) {
  const manifest = readJson(path.join(artifactDir, "static-artifact-manifest.json"), null);
  if (!manifest) return null;
  return {
    status: manifest.status || null,
    outDir: manifest.outDir || artifactDir,
    files: manifest.files ?? null,
    bytes: manifest.bytes ?? null,
    integrity: manifest.integrity?.status || null,
    secrets: {
      valuesPrinted: manifest.secrets?.valuesPrinted === true,
      sensitiveMatches: Array.isArray(manifest.secrets?.sensitiveMatches)
        ? manifest.secrets.sensitiveMatches.length
        : null,
    },
    readiness: manifest.readiness || null,
  };
}

function summarizeLaunchEvidence(launchEvidenceDir) {
  const packet = readJson(path.join(launchEvidenceDir, "launch-evidence.json"), null);
  if (!packet) return null;
  const sourceFreshness = packet.sourceFreshnessEvidence?.parsed || null;
  const statusEvidence = packet.statusEvidence?.parsed || null;
  const discordReviewArtifacts = packet.discordReviewArtifacts?.parsed || null;
  const publicationBoundaries = packet.publicationBoundaries?.parsed || null;
  const evidenceSummaryRenderer = packet.evidenceSummaryRenderer?.parsed || null;
  const statusEvidenceDocuments = statusEvidence?.documents || [];
  const statusEvidencePassedDocuments = statusEvidenceDocuments.filter((doc) => doc.passed).length;
  const discordSummary = discordReviewArtifacts?.summary || null;
  const discordQueue = discordReviewArtifacts?.editorialQueue || null;
  const publicationBoundaryChecks = publicationBoundaries?.checks || [];
  const publicationBoundaryChecksPassed = publicationBoundaryChecks.filter((check) => check.passed).length;
  return {
    status: packet.status || null,
    generatedAt: packet.generatedAt || null,
    evidenceSource: packet.evidenceSource || null,
    launchStatus: packet.launchEvidence?.parsed?.evidence?.launchReadiness?.status
      || packet.launchEvidence?.parsed?.status
      || null,
    monitoringStatus: packet.monitoringEvidence?.parsed?.status || null,
    sourceFreshnessStatus: sourceFreshness?.status || null,
    statusEvidenceStatus: statusEvidence?.status || null,
    discordReviewArtifactsStatus: discordReviewArtifacts?.status || null,
    publicationBoundariesStatus: publicationBoundaries?.status || null,
    evidenceSummaryRendererStatus: evidenceSummaryRenderer?.status || null,
    sourceFreshness: sourceFreshness
      ? {
          status: sourceFreshness.status || null,
          claimBoundary: sourceFreshness.claimBoundary || "",
          totals: sourceFreshness.totals || null,
          secrets: {
            valuesPrinted: sourceFreshness.secrets?.valuesPrinted === true,
            sourceBodiesPrinted: sourceFreshness.secrets?.sourceBodiesPrinted === true,
          },
        }
      : null,
    statusEvidence: statusEvidence
      ? {
          status: statusEvidence.status || null,
          documents: {
            passed: statusEvidencePassedDocuments,
            total: statusEvidenceDocuments.length,
          },
          openOperatorItems: statusEvidence.evidence?.openOperatorItems || [],
        }
      : null,
    discordReviewArtifacts: discordReviewArtifacts
      ? {
          status: discordReviewArtifacts.status || null,
          summary: discordSummary
            ? {
                routedItems: discordSummary.routedItems ?? null,
                rawKeyHits: discordSummary.rawKeyHits ?? null,
                sampleLeaks: discordSummary.sampleLeaks ?? null,
                routeCoverage: discordSummary.routeCoverage || null,
              }
            : null,
          editorialQueue: discordQueue
            ? {
                pageFitReviewReady: discordQueue.pageFitReviewReady ?? null,
                refusalReviewReady: discordQueue.refusalReviewReady ?? null,
                rawTableHits: discordQueue.rawTableHits ?? null,
                sampleLeaks: discordQueue.sampleLeaks ?? null,
              }
            : null,
        }
      : null,
    publicationBoundaries: publicationBoundaries
      ? {
          status: publicationBoundaries.status || null,
          evidence: publicationBoundaries.evidence || null,
          checks: {
            passed: publicationBoundaryChecksPassed,
            total: publicationBoundaryChecks.length,
          },
          valuesPrinted: publicationBoundaries.valuesPrinted === true,
        }
      : null,
    evidenceSummaryRenderer: evidenceSummaryRenderer
      ? {
          status: evidenceSummaryRenderer.status || null,
          launchSummaryLines: evidenceSummaryRenderer.evidence?.launchSummaryLines ?? null,
          releaseSummaryLines: evidenceSummaryRenderer.evidence?.releaseSummaryLines ?? null,
          appendedBytes: evidenceSummaryRenderer.evidence?.appendedBytes ?? null,
          valuesPrinted: evidenceSummaryRenderer.evidence?.valuesPrinted === true,
        }
      : null,
    secrets: {
      valuesPrinted: packet.secrets?.valuesPrinted === true,
    },
    readiness: packet.readiness || null,
    files: packet.files || null,
  };
}

function summarizeReadiness() {
  const quality = readRepoJson("data/quality-audit.json", {});
  const requirements = readRepoJson("data/requirement-map.json", {});
  const sourceIngestion = readRepoJson("data/source-ingestion.json", {});
  const answerContract = readRepoJson("data/answer-engine-contract.json", {});
  const livingDocs = readRepoJson("data/living-docs-events.json", {});
  const llm = readRepoJson("data/llm-rag-contract.json", {});
  const gates = Array.isArray(quality.gates) ? quality.gates : [];
  const gatePasses = gates.filter((gate) => gate?.passed === true).length;
  const totals = quality.totals || {};
  return {
    manifestPages: totals.manifestPages || null,
    authoredPages: totals.authoredFiles || totals.authoredPublicationCandidates || null,
    exactRoutes: totals.answerEngineExactRouteTestsPassing && totals.answerEngineExactRouteTests
      ? `${totals.answerEngineExactRouteTestsPassing}/${totals.answerEngineExactRouteTests}`
      : null,
    answerChunks: totals.answerChunks || null,
    qualityGates: gates.length ? `${gatePasses}/${gates.length}` : null,
    sourceCompletionReady: sourceIngestion.sourceCompletionReady === true,
    sourceRequirements: normalizeStatusCounts(sourceIngestion.byStatus),
    completionReady: requirements.completionReady === true,
    requirementStatus: requirements.byStatus || null,
    deterministicReady: answerContract.deterministicReady === true,
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
    discordRouteCoverage: summarizeDiscordRouteCoverage(),
    openOperatorItems: (requirements.openOperatorItems || []).map((item) => ({
      id: item.id,
      title: item.title,
    })),
  };
}

function scanSensitive(root) {
  const matches = [];
  if (!fs.existsSync(root)) return matches;
  const visit = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      const filePath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        visit(filePath);
        continue;
      }
      if (!entry.isFile() || !/\.(html|js|json|md|txt)$/i.test(entry.name)) continue;
      const text = fs.readFileSync(filePath, "utf8");
      for (const pattern of sensitivePatterns) {
        if (pattern.test(text)) {
          matches.push({
            path: path.relative(root, filePath).split(path.sep).join("/"),
            pattern: String(pattern),
          });
          break;
        }
      }
    }
  };
  visit(root);
  return matches;
}

function renderMarkdown(packet) {
  const steps = packet.steps || [];
  const artifact = packet.staticArtifact || {};
  const launch = packet.launchEvidence || {};
  const readiness = packet.readiness || {};
  const openItems = readiness.openOperatorItems || [];
  return `# Search Book Release Dry Run

Generated: ${packet.generatedAt}

Status: **${packet.status}**

Secrets printed: \`${packet.secrets.valuesPrinted}\`

Sensitive-pattern matches: \`${packet.secrets.sensitiveMatches.length}\`

## Repository

- Commit: \`${packet.repository.commit || "unknown"}\`
- Branch: \`${packet.repository.branch || "unknown"}\`
- Dirty worktree: \`${packet.repository.dirty}\`

## Static Artifact

- Directory: \`${packet.artifactDir}\`
- Status: \`${artifact.status || "missing"}\`
- Files: \`${artifact.files ?? "unknown"}\`
- Bytes: \`${artifact.bytes ?? "unknown"}\`
- Integrity: \`${artifact.integrity || "missing"}\`
- Sensitive matches: \`${artifact.secrets?.sensitiveMatches ?? "unknown"}\`

## Launch Evidence

- Directory: \`${packet.launchEvidenceDir}\`
- Status: \`${launch.status || "missing"}\`
- Launch status: \`${launch.launchStatus || "missing"}\`
- Monitoring status: \`${launch.monitoringStatus || "missing"}\`
- Source freshness status: \`${launch.sourceFreshnessStatus || "missing"}\`
- Source freshness checks: \`${launch.sourceFreshness?.totals?.passed ?? 0}/${launch.sourceFreshness?.totals?.checks ?? 0}\`
- Source freshness source bodies printed: \`${launch.sourceFreshness?.secrets?.sourceBodiesPrinted ?? false}\`
- Status evidence status: \`${launch.statusEvidenceStatus || "missing"}\`
- Status evidence documents: \`${launch.statusEvidence?.documents?.passed ?? 0}/${launch.statusEvidence?.documents?.total ?? 0}\`
- Discord review artifacts status: \`${launch.discordReviewArtifactsStatus || "missing"}\`
- Discord routed review items: \`${launch.discordReviewArtifacts?.summary?.routedItems ?? "unknown"}\`
- Discord queue page-fit/refusal items: \`${launch.discordReviewArtifacts?.editorialQueue?.pageFitReviewReady ?? "unknown"}/${launch.discordReviewArtifacts?.editorialQueue?.refusalReviewReady ?? "unknown"}\`
- Discord queue raw table hits: \`${launch.discordReviewArtifacts?.editorialQueue?.rawTableHits ?? "unknown"}\`
- Publication boundaries status: \`${launch.publicationBoundariesStatus || "missing"}\`
- Publication boundary public/source pages: \`${launch.publicationBoundaries?.evidence?.publicNavigationPages ?? "unknown"}/${launch.publicationBoundaries?.evidence?.sourceCompanionPages ?? "unknown"}\`
- Publication boundary exact/FAQ routes: \`${launch.publicationBoundaries?.evidence?.exactRoutes ?? "unknown"}/${launch.publicationBoundaries?.evidence?.faqAnswerable ?? "unknown"}\`
- Publication boundary internal-draft runtime chunks: \`${launch.publicationBoundaries?.evidence?.internalDraftRuntimeChunks ?? "unknown"}\`
- Publication boundary checks: \`${launch.publicationBoundaries?.checks?.passed ?? "unknown"}/${launch.publicationBoundaries?.checks?.total ?? "unknown"}\`
- Evidence summary renderer status: \`${launch.evidenceSummaryRendererStatus || "missing"}\`
- Evidence summary lines: \`${launch.evidenceSummaryRenderer?.launchSummaryLines ?? "unknown"} launch / ${launch.evidenceSummaryRenderer?.releaseSummaryLines ?? "unknown"} release\`
- Evidence summary values printed: \`${launch.evidenceSummaryRenderer?.valuesPrinted ?? "unknown"}\`
- Values printed: \`${launch.secrets?.valuesPrinted ?? false}\`

## Readiness Snapshot

- Manifest pages: \`${readiness.manifestPages ?? "unknown"}\`
- Authored pages: \`${readiness.authoredPages ?? "unknown"}\`
- Exact routes: \`${readiness.exactRoutes ?? "unknown"}\`
- Answer chunks: \`${readiness.answerChunks ?? "unknown"}\`
- Quality gates: \`${readiness.qualityGates ?? "unknown"}\`
- Source completion ready: \`${readiness.sourceCompletionReady}\`
- Source requirements: \`${readiness.sourceRequirements?.complete ?? "unknown"} complete / ${readiness.sourceRequirements?.partial ?? "unknown"} partial / ${readiness.sourceRequirements?.parked ?? "unknown"} parked / ${readiness.sourceRequirements?.missing ?? "unknown"} missing\`
- Discord route coverage: \`${readiness.discordRouteCoverage?.pageFitCoveredByPublicRoutes ?? "unknown"}/${readiness.discordRouteCoverage?.totalPageFitGroups ?? "unknown"} page-fit groups; ${readiness.discordRouteCoverage?.pageFitSingleRouteRemaining ?? "unknown"} single-route groups remaining\`
- Completion ready: \`${readiness.completionReady}\`
- LLM production ready: \`${readiness.llmProductionReady}\`
- Living-docs production ready: \`${readiness.livingDocsProductionReady}\`
- Living-docs controls: \`datastore=${readiness.livingDocsControls?.datastore}, frontendBridge=${readiness.livingDocsControls?.frontendBridge}, pageFeedback=${readiness.livingDocsControls?.pageFeedback}, retention=${readiness.livingDocsControls?.retention}, moderation=${readiness.livingDocsControls?.moderation}, metrics=${readiness.livingDocsControls?.metrics}, cors=${readiness.livingDocsControls?.cors}, backup=${readiness.livingDocsControls?.backup}, preflight=${readiness.livingDocsControls?.preflight}\`

## Steps

${steps.map((step) => `- ${step.id}: \`${step.status}\` (${step.title})`).join("\n")}

## Open Operator Items

${openItems.length ? openItems.map((item) => `- #${item.id}: ${item.title}`).join("\n") : "- None recorded in requirement map."}

## Files

- JSON: \`${packet.files.json}\`
- Markdown: \`${packet.files.markdown}\`
- Static artifact manifest: \`${path.join(packet.artifactDir, "static-artifact-manifest.json")}\`
- Launch evidence JSON: \`${path.join(packet.launchEvidenceDir, "launch-evidence.json")}\`
`;
}

function writePacket(args, packet) {
  fs.mkdirSync(args.outDir, { recursive: true });
  const jsonPath = path.join(args.outDir, "release-dry-run.json");
  const markdownPath = path.join(args.outDir, "release-dry-run.md");
  packet.files = {
    json: jsonPath,
    markdown: markdownPath,
  };
  fs.writeFileSync(jsonPath, `${JSON.stringify(packet, null, 2)}\n`);
  fs.writeFileSync(markdownPath, renderMarkdown(packet));
  return packet;
}

function buildPacket(args, steps) {
  const dirtyStatus = gitValue(["status", "--short"]);
  const allStepsPassed = steps.every((step) => step.passed);
  return sanitize({
    status: allStepsPassed ? "passed" : "failed",
    service: "search-book-release-dry-run",
    generatedAt: new Date().toISOString(),
    outDir: args.outDir,
    artifactDir: args.artifactDir,
    launchEvidenceDir: args.launchEvidenceDir,
    repository: {
      root: searchBookRoot,
      branch: gitValue(["branch", "--show-current"]),
      commit: gitValue(["rev-parse", "--short", "HEAD"]),
      dirty: Boolean(dirtyStatus),
      dirtyStatus: dirtyStatus ? dirtyStatus.split("\n") : [],
    },
    secrets: {
      valuesPrinted: false,
      sensitiveMatches: [],
    },
    readiness: summarizeReadiness(),
    staticArtifact: summarizeStaticArtifact(args.artifactDir),
    launchEvidence: summarizeLaunchEvidence(args.launchEvidenceDir),
    steps,
    files: {
      json: "",
      markdown: "",
    },
  });
}

function runDryRun(args) {
  fs.rmSync(args.outDir, { recursive: true, force: true });
  fs.mkdirSync(args.outDir, { recursive: true });

  const steps = [];
  const buildArtifact = runStep("build-static-artifact", "Build copied static artifact", [
    "scripts/build-static-artifact.mjs",
    "--out-dir",
    args.artifactDir,
  ]);
  steps.push(buildArtifact);

  if (buildArtifact.passed) {
    steps.push(runStep("smoke-static-artifact", "Smoke copied static artifact", [
      "scripts/smoke-static-preview.mjs",
      "--root",
      args.artifactDir,
    ]));
    steps.push(runStep("smoke-artifact-answer-service", "Smoke copied static artifact with answer-engine service", [
      "scripts/smoke-preview-service.mjs",
      "--static-root",
      args.artifactDir,
    ]));
  } else {
    steps.push(skippedStep("smoke-static-artifact", "Smoke copied static artifact", "static artifact build failed"));
    steps.push(skippedStep("smoke-artifact-answer-service", "Smoke copied static artifact with answer-engine service", "static artifact build failed"));
  }

  const launchArgs = [
    "scripts/build-launch-evidence-packet.mjs",
    "--out-dir",
    args.launchEvidenceDir,
  ];
  if (!args.runLaunchVerify) launchArgs.push("--no-run-verify");
  steps.push(runStep("build-launch-evidence", "Build no-secret launch evidence packet", launchArgs));

  let packet = writePacket(args, buildPacket(args, steps));
  const sensitiveMatches = scanSensitive(args.outDir);
  packet.secrets.sensitiveMatches = sensitiveMatches;
  if (sensitiveMatches.length > 0) packet.status = "failed";
  packet = writePacket(args, packet);
  return packet;
}

try {
  const args = parseArgs(process.argv.slice(2));
  const packet = runDryRun(args);
  console.log(JSON.stringify({
    status: packet.status,
    service: packet.service,
    generatedAt: packet.generatedAt,
    outDir: packet.outDir,
    files: packet.files,
    staticArtifact: {
      status: packet.staticArtifact?.status || null,
      files: packet.staticArtifact?.files || null,
      bytes: packet.staticArtifact?.bytes || null,
      integrity: packet.staticArtifact?.integrity || null,
    },
    launchEvidence: {
      status: packet.launchEvidence?.status || null,
      launchStatus: packet.launchEvidence?.launchStatus || null,
      monitoringStatus: packet.launchEvidence?.monitoringStatus || null,
      sourceFreshnessStatus: packet.launchEvidence?.sourceFreshnessStatus || null,
      statusEvidenceStatus: packet.launchEvidence?.statusEvidenceStatus || null,
      discordReviewArtifactsStatus: packet.launchEvidence?.discordReviewArtifactsStatus || null,
      publicationBoundariesStatus: packet.launchEvidence?.publicationBoundariesStatus || null,
      evidenceSummaryRendererStatus: packet.launchEvidence?.evidenceSummaryRendererStatus || null,
    },
    steps: packet.steps.map((step) => ({
      id: step.id,
      status: step.status,
    })),
    readiness: {
      completionReady: packet.readiness.completionReady,
      sourceCompletionReady: packet.readiness.sourceCompletionReady,
      sourceRequirements: packet.readiness.sourceRequirements,
      livingDocsControls: packet.readiness.livingDocsControls,
      discordRouteCoverage: packet.readiness.discordRouteCoverage,
      openOperatorItems: packet.readiness.openOperatorItems,
    },
    secrets: {
      valuesPrinted: false,
      sensitiveMatches: packet.secrets.sensitiveMatches.length,
    },
  }, null, 2));
  if (packet.status !== "passed") process.exitCode = 1;
} catch (error) {
  console.error(JSON.stringify({
    status: "failed",
    service: "search-book-release-dry-run",
    message: redact(error.message),
    secrets: { valuesPrinted: false },
  }, null, 2));
  process.exitCode = 1;
}
