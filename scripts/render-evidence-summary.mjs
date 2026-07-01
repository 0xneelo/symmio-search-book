#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

function usage() {
  return `Usage:
  node scripts/render-evidence-summary.mjs --kind launch|release --packet path

Options:
  --kind launch|release  Packet shape to summarize
  --packet path          launch-evidence.json or release-dry-run.json
  --json                 Accepted for command symmetry; output is Markdown

Prints a count-only Markdown summary and appends it to GITHUB_STEP_SUMMARY when
that environment variable is set. The summary intentionally avoids raw questions,
Discord/Lafa excerpts, source bodies, API keys, and token values.`;
}

function parseArgs(argv) {
  const args = {
    kind: "",
    packet: "",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--json") continue;
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) throw new Error(`${arg} requires a value.\n${usage()}`);
    if (arg === "--kind") args.kind = next;
    else if (arg === "--packet") args.packet = path.resolve(next);
    else throw new Error(`Unknown argument: ${arg}\n${usage()}`);
    index += 1;
  }

  if (!["launch", "release"].includes(args.kind)) throw new Error("--kind must be launch or release.");
  if (!args.packet) throw new Error(`--packet is required.\n${usage()}`);
  return args;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function operatorItems(items = []) {
  return items
    .map((item) => typeof item === "object" ? `#${item.id}` : `#${item}`)
    .filter((item) => item !== "#undefined" && item !== "#null")
    .join(", ") || "none";
}

function markdownTable(title, rows) {
  return [
    `## ${title}`,
    "",
    "| Check | Value |",
    "| --- | --- |",
    ...rows.map(([label, value]) => `| ${label} | ${value} |`),
    "",
  ].join("\n");
}

function refusalProbeCount(runtime = {}) {
  const probes = Array.isArray(runtime.probes)
    ? runtime.probes
    : Array.isArray(runtime.evidence?.probes)
      ? runtime.evidence.probes
      : [];
  return {
    passed: probes.filter((probe) => probe.status === "refusal").length,
    total: probes.length,
  };
}

function launchSummary(packet) {
  const launch = packet.launchEvidence?.parsed?.evidence?.launchReadiness || packet.launchEvidence?.parsed || {};
  const monitoring = packet.monitoringEvidence?.parsed || {};
  const sourceFreshness = packet.sourceFreshnessEvidence?.parsed || {};
  const statusEvidence = packet.statusEvidence?.parsed || {};
  const discord = packet.discordReviewArtifacts?.parsed || {};
  const discordRefusalRuntime = packet.discordRefusalRuntime?.parsed || {};
  const publication = packet.publicationBoundaries?.parsed || {};
  const evidenceSummaryRenderer = packet.evidenceSummaryRenderer?.parsed || {};
  const discordSummary = discord.summary || {};
  const routeCoverage = discordSummary.routeCoverage || {};
  const queue = discord.editorialQueue || {};
  const refusalProbes = refusalProbeCount(discordRefusalRuntime);
  const publicationEvidence = publication.evidence || {};
  const publicationChecks = publication.checks || [];
  const publicationChecksPassed = publicationChecks.filter((check) => check.passed).length;
  const statusDocuments = statusEvidence.documents || [];
  const passedStatusDocuments = statusDocuments.filter((doc) => doc.passed).length;
  const openOperatorItems = operatorItems(statusEvidence.evidence?.openOperatorItems || packet.readiness?.openOperatorItems || []);

  return markdownTable("Search Book Launch Evidence", [
    ["Packet status", `\`${packet.status || "missing"}\``],
    ["Repository", `commit \`${packet.repository?.commit || "unknown"}\`, dirty \`${packet.repository?.dirty ?? "unknown"}\``],
    ["Launch status", `\`${launch.status || "missing"}\``],
    ["Monitoring status", `\`${monitoring.status || "missing"}\``],
    [
      "Source freshness",
      `\`${sourceFreshness.status || "missing"}\` (${sourceFreshness.totals?.passed ?? 0}/${sourceFreshness.totals?.checks ?? 0} checks; source bodies printed: \`${sourceFreshness.secrets?.sourceBodiesPrinted ?? false}\`)`,
    ],
    ["Status evidence", `\`${statusEvidence.status || "missing"}\` (${passedStatusDocuments}/${statusDocuments.length} documents)`],
    ["Discord review artifacts", `\`${discord.status || "missing"}\``],
    ["Discord routed items", `\`${discordSummary.routedItems ?? "unknown"}\``],
    ["Discord route coverage", `\`${routeCoverage.coveredPageFitGroups ?? "unknown"}/${routeCoverage.totalPageFitGroups ?? "unknown"} page-fit groups\``],
    ["Discord source-backed triage", `\`${routeCoverage.triageReadyPageFitGroups ?? "unknown"}/${routeCoverage.totalPageFitGroups ?? "unknown"} page-fit groups\``],
    ["Discord public copy ready", `\`${routeCoverage.publicCopyReadyPageFitGroups ?? "unknown"}/${routeCoverage.totalPageFitGroups ?? "unknown"} page-fit groups\``],
    ["Discord refusal policy", `\`${queue.refusalPolicyReadyItems ?? "unknown"}/${queue.refusalReviewReady ?? "unknown"} refusals\``],
    [
      "Discord refusal runtime",
      `\`${discordRefusalRuntime.status || "missing"}\` (${refusalProbes.passed}/${refusalProbes.total} probes; LLM credentials loaded: \`${discordRefusalRuntime.secrets?.llmCredentialsLoaded ?? "unknown"}\`)`,
    ],
    ["Discord editorial queue", `\`${queue.pageFitReviewReady ?? "unknown"} page-fit groups / ${queue.refusalReviewReady ?? "unknown"} refusals\``],
    [
      "Discord leakage checks",
      `raw keys \`${discordSummary.rawKeyHits ?? "unknown"}\`, sample leaks \`${discordSummary.sampleLeaks ?? "unknown"}\`, queue raw tables \`${queue.rawTableHits ?? "unknown"}\``,
    ],
    ["Publication boundaries", `\`${publication.status || "missing"}\``],
    [
      "Publication public/source pages",
      `\`${publicationEvidence.publicNavigationPages ?? "unknown"}/${publicationEvidence.sourceCompanionPages ?? "unknown"} pages\``,
    ],
    [
      "Publication exact/FAQ routes",
      `\`${publicationEvidence.exactRoutes ?? "unknown"}/${publicationEvidence.faqAnswerable ?? "unknown"} routes\``,
    ],
    [
      "Publication runtime boundary",
      `source companions \`${publicationEvidence.sourceCompanionRuntimeChunks ?? "unknown"}\`, internal drafts \`${publicationEvidence.internalDraftRuntimeChunks ?? "unknown"}\``,
    ],
    ["Publication boundary checks", `\`${publicationChecksPassed}/${publicationChecks.length}\`; values printed: \`${publication.valuesPrinted ?? false}\``],
    [
      "Evidence summary renderer",
      `\`${evidenceSummaryRenderer.status || "missing"}\` (${evidenceSummaryRenderer.evidence?.launchSummaryLines ?? "unknown"} launch lines / ${evidenceSummaryRenderer.evidence?.releaseSummaryLines ?? "unknown"} release lines; values printed: \`${evidenceSummaryRenderer.evidence?.valuesPrinted ?? "unknown"}\`)`,
    ],
    ["Open operator items", `\`${openOperatorItems}\``],
    ["Secrets printed", `\`${packet.secrets?.valuesPrinted ?? false}\``],
  ]);
}

function releaseSummary(packet) {
  const artifact = packet.staticArtifact || {};
  const launch = packet.launchEvidence || {};
  const sourceFreshness = launch.sourceFreshness || {};
  const statusEvidence = launch.statusEvidence || {};
  const discord = launch.discordReviewArtifacts || {};
  const discordRefusalRuntime = launch.discordRefusalRuntime || {};
  const publication = launch.publicationBoundaries || {};
  const evidenceSummaryRenderer = launch.evidenceSummaryRenderer || {};
  const discordSummary = discord.summary || {};
  const routeCoverage = discordSummary.routeCoverage || {};
  const queue = discord.editorialQueue || {};
  const refusalProbes = refusalProbeCount(discordRefusalRuntime);
  const publicationEvidence = publication.evidence || {};
  const readinessRouteCoverage = packet.readiness?.discordRouteCoverage || {};
  const stepSummary = (packet.steps || [])
    .map((step) => `${step.id}:${step.status}`)
    .join(", ") || "none";
  const openOperatorItems = operatorItems(packet.readiness?.openOperatorItems || []);

  return markdownTable("Search Book Release Dry Run", [
    ["Release status", `\`${packet.status || "missing"}\``],
    ["Repository", `commit \`${packet.repository?.commit || "unknown"}\`, dirty \`${packet.repository?.dirty ?? "unknown"}\``],
    [
      "Static artifact",
      `\`${artifact.status || "missing"}\`, integrity \`${artifact.integrity || "missing"}\`, files \`${artifact.files ?? "unknown"}\`, bytes \`${artifact.bytes ?? "unknown"}\``,
    ],
    ["Child steps", `\`${stepSummary}\``],
    ["Launch status", `\`${launch.launchStatus || "missing"}\``],
    ["Monitoring status", `\`${launch.monitoringStatus || "missing"}\``],
    [
      "Source freshness",
      `\`${launch.sourceFreshnessStatus || "missing"}\` (${sourceFreshness.totals?.passed ?? 0}/${sourceFreshness.totals?.checks ?? 0} checks; source bodies printed: \`${sourceFreshness.secrets?.sourceBodiesPrinted ?? false}\`)`,
    ],
    ["Status evidence", `\`${launch.statusEvidenceStatus || "missing"}\` (${statusEvidence.documents?.passed ?? 0}/${statusEvidence.documents?.total ?? 0} documents)`],
    ["Discord review artifacts", `\`${launch.discordReviewArtifactsStatus || "missing"}\``],
    ["Discord routed items", `\`${discordSummary.routedItems ?? "unknown"}\``],
    ["Discord route coverage", `\`${routeCoverage.coveredPageFitGroups ?? "unknown"}/${routeCoverage.totalPageFitGroups ?? "unknown"} page-fit groups\``],
    ["Discord source-backed triage", `\`${routeCoverage.triageReadyPageFitGroups ?? "unknown"}/${routeCoverage.totalPageFitGroups ?? "unknown"} page-fit groups\``],
    ["Discord public copy ready", `\`${routeCoverage.publicCopyReadyPageFitGroups ?? "unknown"}/${routeCoverage.totalPageFitGroups ?? "unknown"} page-fit groups\``],
    ["Discord refusal policy", `\`${queue.refusalPolicyReadyItems ?? "unknown"}/${queue.refusalReviewReady ?? "unknown"} refusals\``],
    [
      "Discord refusal runtime",
      `\`${launch.discordRefusalRuntimeStatus || "missing"}\` (${refusalProbes.passed}/${refusalProbes.total} probes; LLM credentials loaded: \`${discordRefusalRuntime.secrets?.llmCredentialsLoaded ?? "unknown"}\`)`,
    ],
    ["Discord editorial queue", `\`${queue.pageFitReviewReady ?? "unknown"} page-fit groups / ${queue.refusalReviewReady ?? "unknown"} refusals\``],
    [
      "Discord leakage checks",
      `raw keys \`${discordSummary.rawKeyHits ?? "unknown"}\`, sample leaks \`${discordSummary.sampleLeaks ?? "unknown"}\`, queue raw tables \`${queue.rawTableHits ?? "unknown"}\``,
    ],
    ["Publication boundaries", `\`${launch.publicationBoundariesStatus || "missing"}\``],
    [
      "Publication public/source pages",
      `\`${publicationEvidence.publicNavigationPages ?? "unknown"}/${publicationEvidence.sourceCompanionPages ?? "unknown"} pages\``,
    ],
    [
      "Publication exact/FAQ routes",
      `\`${publicationEvidence.exactRoutes ?? "unknown"}/${publicationEvidence.faqAnswerable ?? "unknown"} routes\``,
    ],
    [
      "Publication runtime boundary",
      `source companions \`${publicationEvidence.sourceCompanionRuntimeChunks ?? "unknown"}\`, internal drafts \`${publicationEvidence.internalDraftRuntimeChunks ?? "unknown"}\``,
    ],
    ["Publication boundary checks", `\`${publication.checks?.passed ?? "unknown"}/${publication.checks?.total ?? "unknown"}\`; values printed: \`${publication.valuesPrinted ?? false}\``],
    [
      "Evidence summary renderer",
      `\`${launch.evidenceSummaryRendererStatus || "missing"}\` (${evidenceSummaryRenderer.launchSummaryLines ?? "unknown"} launch lines / ${evidenceSummaryRenderer.releaseSummaryLines ?? "unknown"} release lines; values printed: \`${evidenceSummaryRenderer.valuesPrinted ?? "unknown"}\`)`,
    ],
    ["Readiness route coverage", `\`${readinessRouteCoverage.pageFitCoveredByPublicRoutes ?? "unknown"}/${readinessRouteCoverage.totalPageFitGroups ?? "unknown"} page-fit groups\``],
    ["Open operator items", `\`${openOperatorItems}\``],
    ["Sensitive matches", `\`${packet.secrets?.sensitiveMatches?.length ?? "unknown"}\``],
    ["Secrets printed", `\`${packet.secrets?.valuesPrinted ?? false}\``],
  ]);
}

try {
  const args = parseArgs(process.argv.slice(2));
  const packet = readJson(args.packet);
  const markdown = args.kind === "launch" ? launchSummary(packet) : releaseSummary(packet);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${markdown}\n`);
  console.log(markdown);
} catch (error) {
  console.error(JSON.stringify({
    status: "failed",
    service: "search-book-evidence-summary",
    message: error.message,
    secrets: { valuesPrinted: false },
  }, null, 2));
  process.exitCode = 1;
}
