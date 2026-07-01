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

function operatorTasks(items = []) {
  return items
    .map((item) => typeof item === "object"
      ? { id: Number(item.id), linearTask: item.linearTask || null }
      : { id: Number(item), linearTask: null })
    .filter((item) => Number.isFinite(item.id) && item.linearTask)
    .sort((a, b) => a.id - b.id)
    .map((item) => `#${item.id}=${item.linearTask}`)
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

function dispositionSummary(disposition = {}) {
  return `ready \`${disposition.readyForReviewerHandoff ?? "unknown"}\` (keep-copy \`${disposition.pageFitKeepExistingPublicCopy ?? "unknown"}/${disposition.pageFitGroups ?? "unknown"}\`; keep-refusal \`${disposition.refusalKeepPolicy ?? "unknown"}/${disposition.refusalItems ?? "unknown"}\`; copy changes \`${disposition.publicCopyChangesProposed ?? "unknown"}\`; promoted \`${disposition.exactDiscordStatementsPromoted ?? "unknown"}\`)`;
}

function reviewerWorkflowSummary(workflow = {}) {
  return `ready \`${workflow.status || "missing"}\` (${workflow.phases ?? "unknown"} phases; page-fit \`${workflow.pageFitGroups ?? "unknown"}\`; refusals \`${workflow.refusalItems ?? "unknown"}\`; copy changes allowed \`${workflow.publicCopyChangesAllowed ?? "unknown"}\`; exact promotions allowed \`${workflow.exactDiscordStatementsAllowed ?? "unknown"}\`)`;
}

function launchSummary(packet) {
  const launch = packet.launchEvidence?.parsed?.evidence?.launchReadiness || packet.launchEvidence?.parsed || {};
  const monitoring = packet.monitoringEvidence?.parsed || {};
  const sourceFreshness = packet.sourceFreshnessEvidence?.parsed || {};
  const statusEvidence = packet.statusEvidence?.parsed || {};
  const specReconciliation = packet.specReconciliation?.parsed || {};
  const discord = packet.discordReviewArtifacts?.parsed || {};
  const discordRefusalRuntime = packet.discordRefusalRuntime?.parsed || {};
  const publication = packet.publicationBoundaries?.parsed || {};
  const backupRestore = packet.backupRestoreEvidence?.parsed || {};
  const livingDocsReview = packet.livingDocsReviewEvidence?.parsed || {};
  const evidenceSummaryRenderer = packet.evidenceSummaryRenderer?.parsed || {};
  const discordSummary = discord.summary || {};
  const routeCoverage = discordSummary.routeCoverage || {};
  const queue = discord.editorialQueue || {};
  const queueData = discord.editorialQueueData || {};
  const refusalProbes = refusalProbeCount(discordRefusalRuntime);
  const publicationEvidence = publication.evidence || {};
  const publicationChecks = publication.checks || [];
  const publicationChecksPassed = publicationChecks.filter((check) => check.passed).length;
  const backupEvidence = backupRestore.evidence || {};
  const backupChecks = backupRestore.checks || [];
  const backupChecksPassed = backupChecks.filter((check) => check.passed).length;
  const livingDocsEvidence = livingDocsReview.evidence || {};
  const livingDocsChecks = livingDocsReview.checks || [];
  const livingDocsChecksPassed = livingDocsChecks.filter((check) => check.passed).length;
  const statusDocuments = statusEvidence.documents || [];
  const passedStatusDocuments = statusDocuments.filter((doc) => doc.passed).length;
  const specReconciliationChecks = specReconciliation.checks || [];
  const specReconciliationPassedChecks = specReconciliationChecks.filter((check) => check.passed).length;
  const specReconciliationEvidence = specReconciliation.evidence || {};
  const openOperatorItems = operatorItems(statusEvidence.evidence?.openOperatorItems || packet.readiness?.openOperatorItems || []);
  const openOperatorTasks = operatorTasks(packet.readiness?.openOperatorItems || []);

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
    [
      "Spec reconciliation",
      `\`${specReconciliation.status || "missing"}\` (${specReconciliationPassedChecks}/${specReconciliationChecks.length} checks; source ${specReconciliationEvidence.sourceIngestion || "unknown"}; open ${operatorItems(specReconciliationEvidence.openOperatorIds || [])})`,
    ],
    ["Discord review artifacts", `\`${discord.status || "missing"}\``],
    ["Discord routed items", `\`${discordSummary.routedItems ?? "unknown"}\``],
    ["Discord route coverage", `\`${routeCoverage.coveredPageFitGroups ?? "unknown"}/${routeCoverage.totalPageFitGroups ?? "unknown"} page-fit groups\``],
    ["Discord source-backed triage", `\`${routeCoverage.triageReadyPageFitGroups ?? "unknown"}/${routeCoverage.totalPageFitGroups ?? "unknown"} page-fit groups\``],
    ["Discord public copy ready", `\`${routeCoverage.publicCopyReadyPageFitGroups ?? "unknown"}/${routeCoverage.totalPageFitGroups ?? "unknown"} page-fit groups\``],
    ["Discord refusal policy", `\`${queue.refusalPolicyReadyItems ?? "unknown"}/${queue.refusalReviewReady ?? "unknown"} refusals\``],
    [
      "Discord editorial queue data",
      `\`${queueData.status || "missing"}\` (${queueData.routedItems ?? "unknown"} routed / ${queueData.pageFitReviewReady ?? "unknown"} page-fit / ${queueData.refusalReviewReady ?? "unknown"} refusals; ready: \`${queueData.queueReady ?? "unknown"}\`)`,
    ],
    ["Discord editorial disposition", dispositionSummary(queueData.disposition || {})],
    ["Discord reviewer workflow", reviewerWorkflowSummary(queueData.reviewerWorkflow || {})],
    [
      "Discord refusal runtime",
      `\`${discordRefusalRuntime.status || "missing"}\` (${refusalProbes.passed}/${refusalProbes.total} probes; LLM credentials loaded: \`${discordRefusalRuntime.secrets?.llmCredentialsLoaded ?? "unknown"}\`)`,
    ],
    ["Discord editorial queue", `\`${queue.pageFitReviewReady ?? "unknown"} page-fit groups / ${queue.refusalReviewReady ?? "unknown"} refusals\``],
    [
      "Discord leakage checks",
      `raw keys \`${discordSummary.rawKeyHits ?? "unknown"}\`, sample leaks \`${discordSummary.sampleLeaks ?? "unknown"}\`, queue-data raw keys \`${queueData.rawKeyHits ?? "unknown"}\`, queue-data sample leaks \`${queueData.sampleLeaks ?? "unknown"}\`, queue raw tables \`${queue.rawTableHits ?? "unknown"}\``,
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
    ["Backup restore evidence", `\`${backupRestore.status || "missing"}\``],
    [
      "Backup restore tables",
      `\`${backupEvidence.tablesMatched ?? "unknown"}/${backupEvidence.tablesChecked ?? "unknown"} tables\`; restore \`${backupEvidence.restoreCheckStatus || "missing"}\`; integrity \`${backupEvidence.integrity || "missing"}\``,
    ],
    [
      "Backup restore seed counts",
      `questions \`${backupEvidence.seededCounts?.questions ?? "unknown"}\`, ratings \`${backupEvidence.seededCounts?.ratings ?? "unknown"}\`, gaps \`${backupEvidence.seededCounts?.gaps ?? "unknown"}\`, answer cache \`${backupEvidence.seededCounts?.answerCache ?? "unknown"}\``,
    ],
    ["Backup restore checks", `\`${backupChecksPassed}/${backupChecks.length}\`; values printed: \`${backupRestore.valuesPrinted ?? false}\`; raw content printed: \`${backupEvidence.rawContentPrinted ?? "unknown"}\``],
    ["Living-docs review evidence", `\`${livingDocsReview.status || "missing"}\``],
    [
      "Living-docs review queue",
      `gap backlog \`${livingDocsEvidence.queueCounts?.gapBacklog ?? "unknown"}\`, low-rated \`${livingDocsEvidence.queueCounts?.lowRatedAnswers ?? "unknown"}\`, unanswered \`${livingDocsEvidence.queueCounts?.unansweredQuestions ?? "unknown"}\`, repeated \`${livingDocsEvidence.queueCounts?.repeatedQuestions ?? "unknown"}\`, recommendations \`${livingDocsEvidence.queueCounts?.recommendations ?? "unknown"}\``,
    ],
    [
      "Living-docs review privacy",
      `raw internal \`${livingDocsEvidence.rawSummaryFlaggedInternal ?? "unknown"}\`; sanitized seeded hits \`${livingDocsEvidence.seededRawValuesInSanitizedEvidence ?? "unknown"}\`; raw keys \`${livingDocsEvidence.rawKeyHitsInSanitizedEvidence ?? "unknown"}\`; raw content printed \`${livingDocsEvidence.rawContentPrinted ?? "unknown"}\``,
    ],
    ["Living-docs review checks", `\`${livingDocsChecksPassed}/${livingDocsChecks.length}\`; values printed: \`${livingDocsReview.valuesPrinted ?? false}\`; LLM credentials loaded: \`${livingDocsReview.secrets?.llmCredentialsLoaded ?? "unknown"}\``],
    [
      "Evidence summary renderer",
      `\`${evidenceSummaryRenderer.status || "missing"}\` (${evidenceSummaryRenderer.evidence?.launchSummaryLines ?? "unknown"} launch lines / ${evidenceSummaryRenderer.evidence?.releaseSummaryLines ?? "unknown"} release lines; values printed: \`${evidenceSummaryRenderer.evidence?.valuesPrinted ?? "unknown"}\`)`,
    ],
    ["Open operator items", `\`${openOperatorItems}\``],
    ["Open operator Linear tasks", `\`${openOperatorTasks}\``],
    ["Secrets printed", `\`${packet.secrets?.valuesPrinted ?? false}\``],
  ]);
}

function releaseSummary(packet) {
  const artifact = packet.staticArtifact || {};
  const launch = packet.launchEvidence || {};
  const sourceFreshness = launch.sourceFreshness || {};
  const statusEvidence = launch.statusEvidence || {};
  const specReconciliation = launch.specReconciliation || {};
  const discord = launch.discordReviewArtifacts || {};
  const discordRefusalRuntime = launch.discordRefusalRuntime || {};
  const publication = launch.publicationBoundaries || {};
  const backupRestore = launch.backupRestoreEvidence || {};
  const livingDocsReview = launch.livingDocsReviewEvidence || {};
  const evidenceSummaryRenderer = launch.evidenceSummaryRenderer || {};
  const discordSummary = discord.summary || {};
  const routeCoverage = discordSummary.routeCoverage || {};
  const queue = discord.editorialQueue || {};
  const queueData = discord.editorialQueueData || {};
  const refusalProbes = refusalProbeCount(discordRefusalRuntime);
  const publicationEvidence = publication.evidence || {};
  const backupEvidence = backupRestore.evidence || {};
  const livingDocsEvidence = livingDocsReview.evidence || {};
  const readinessRouteCoverage = packet.readiness?.discordRouteCoverage || {};
  const stepSummary = (packet.steps || [])
    .map((step) => `${step.id}:${step.status}`)
    .join(", ") || "none";
  const openOperatorItems = operatorItems(packet.readiness?.openOperatorItems || []);
  const openOperatorTasks = operatorTasks(packet.readiness?.openOperatorItems || []);

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
    [
      "Spec reconciliation",
      `\`${launch.specReconciliationStatus || "missing"}\` (${specReconciliation.checks?.passed ?? 0}/${specReconciliation.checks?.total ?? 0} checks; source ${specReconciliation.evidence?.sourceIngestion || "unknown"}; open ${operatorItems(specReconciliation.evidence?.openOperatorIds || [])})`,
    ],
    ["Discord review artifacts", `\`${launch.discordReviewArtifactsStatus || "missing"}\``],
    ["Discord routed items", `\`${discordSummary.routedItems ?? "unknown"}\``],
    ["Discord route coverage", `\`${routeCoverage.coveredPageFitGroups ?? "unknown"}/${routeCoverage.totalPageFitGroups ?? "unknown"} page-fit groups\``],
    ["Discord source-backed triage", `\`${routeCoverage.triageReadyPageFitGroups ?? "unknown"}/${routeCoverage.totalPageFitGroups ?? "unknown"} page-fit groups\``],
    ["Discord public copy ready", `\`${routeCoverage.publicCopyReadyPageFitGroups ?? "unknown"}/${routeCoverage.totalPageFitGroups ?? "unknown"} page-fit groups\``],
    ["Discord refusal policy", `\`${queue.refusalPolicyReadyItems ?? "unknown"}/${queue.refusalReviewReady ?? "unknown"} refusals\``],
    [
      "Discord editorial queue data",
      `\`${queueData.status || "missing"}\` (${queueData.routedItems ?? "unknown"} routed / ${queueData.pageFitReviewReady ?? "unknown"} page-fit / ${queueData.refusalReviewReady ?? "unknown"} refusals; ready: \`${queueData.queueReady ?? "unknown"}\`)`,
    ],
    ["Discord editorial disposition", dispositionSummary(queueData.disposition || {})],
    ["Discord reviewer workflow", reviewerWorkflowSummary(queueData.reviewerWorkflow || {})],
    [
      "Discord refusal runtime",
      `\`${launch.discordRefusalRuntimeStatus || "missing"}\` (${refusalProbes.passed}/${refusalProbes.total} probes; LLM credentials loaded: \`${discordRefusalRuntime.secrets?.llmCredentialsLoaded ?? "unknown"}\`)`,
    ],
    ["Discord editorial queue", `\`${queue.pageFitReviewReady ?? "unknown"} page-fit groups / ${queue.refusalReviewReady ?? "unknown"} refusals\``],
    [
      "Discord leakage checks",
      `raw keys \`${discordSummary.rawKeyHits ?? "unknown"}\`, sample leaks \`${discordSummary.sampleLeaks ?? "unknown"}\`, queue-data raw keys \`${queueData.rawKeyHits ?? "unknown"}\`, queue-data sample leaks \`${queueData.sampleLeaks ?? "unknown"}\`, queue raw tables \`${queue.rawTableHits ?? "unknown"}\``,
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
    ["Backup restore evidence", `\`${launch.backupRestoreEvidenceStatus || "missing"}\``],
    [
      "Backup restore tables",
      `\`${backupEvidence.tablesMatched ?? "unknown"}/${backupEvidence.tablesChecked ?? "unknown"} tables\`; restore \`${backupEvidence.restoreCheckStatus || "missing"}\`; integrity \`${backupEvidence.integrity || "missing"}\``,
    ],
    [
      "Backup restore seed counts",
      `questions \`${backupEvidence.seededCounts?.questions ?? "unknown"}\`, ratings \`${backupEvidence.seededCounts?.ratings ?? "unknown"}\`, gaps \`${backupEvidence.seededCounts?.gaps ?? "unknown"}\`, answer cache \`${backupEvidence.seededCounts?.answerCache ?? "unknown"}\``,
    ],
    ["Backup restore checks", `\`${backupRestore.checks?.passed ?? "unknown"}/${backupRestore.checks?.total ?? "unknown"}\`; values printed: \`${backupRestore.valuesPrinted ?? false}\`; raw content printed: \`${backupEvidence.rawContentPrinted ?? "unknown"}\``],
    ["Living-docs review evidence", `\`${launch.livingDocsReviewEvidenceStatus || "missing"}\``],
    [
      "Living-docs review queue",
      `gap backlog \`${livingDocsEvidence.queueCounts?.gapBacklog ?? "unknown"}\`, low-rated \`${livingDocsEvidence.queueCounts?.lowRatedAnswers ?? "unknown"}\`, unanswered \`${livingDocsEvidence.queueCounts?.unansweredQuestions ?? "unknown"}\`, repeated \`${livingDocsEvidence.queueCounts?.repeatedQuestions ?? "unknown"}\`, recommendations \`${livingDocsEvidence.queueCounts?.recommendations ?? "unknown"}\``,
    ],
    [
      "Living-docs review privacy",
      `raw internal \`${livingDocsEvidence.rawSummaryFlaggedInternal ?? "unknown"}\`; sanitized seeded hits \`${livingDocsEvidence.seededRawValuesInSanitizedEvidence ?? "unknown"}\`; raw keys \`${livingDocsEvidence.rawKeyHitsInSanitizedEvidence ?? "unknown"}\`; raw content printed \`${livingDocsEvidence.rawContentPrinted ?? "unknown"}\``,
    ],
    ["Living-docs review checks", `\`${livingDocsReview.checks?.passed ?? "unknown"}/${livingDocsReview.checks?.total ?? "unknown"}\`; values printed: \`${livingDocsReview.valuesPrinted ?? false}\`; LLM credentials loaded: \`${livingDocsReview.secrets?.llmCredentialsLoaded ?? "unknown"}\``],
    [
      "Evidence summary renderer",
      `\`${launch.evidenceSummaryRendererStatus || "missing"}\` (${evidenceSummaryRenderer.launchSummaryLines ?? "unknown"} launch lines / ${evidenceSummaryRenderer.releaseSummaryLines ?? "unknown"} release lines; values printed: \`${evidenceSummaryRenderer.valuesPrinted ?? "unknown"}\`)`,
    ],
    ["Readiness route coverage", `\`${readinessRouteCoverage.pageFitCoveredByPublicRoutes ?? "unknown"}/${readinessRouteCoverage.totalPageFitGroups ?? "unknown"} page-fit groups\``],
    ["Open operator items", `\`${openOperatorItems}\``],
    ["Open operator Linear tasks", `\`${openOperatorTasks}\``],
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
