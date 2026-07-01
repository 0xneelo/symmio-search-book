#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const repoRoot = searchBookRoot;

const defaults = {
  docsRoot: process.env.VIBE_DOCS_PUBLIC || "/tmp/vibe_docs/Docs/public",
  docsData: process.env.VIBE_DOCS_DATA || "/tmp/vibe_docs/Website/public/generated/docs-data.json",
  manifestOut: path.join(searchBookRoot, "page-manifest.json"),
};

function parseArgs(argv) {
  const args = {
    ...defaults,
    verify: false,
    dryRun: false,
    list: false,
    from: "",
    only: "",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--verify") args.verify = true;
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--list") args.list = true;
    else if (arg === "--from" || arg === "--resume-from") args.from = argv[++index] || "";
    else if (arg === "--only") args.only = argv[++index] || "";
    else if (arg === "--docs-root") args.docsRoot = argv[++index] || "";
    else if (arg === "--docs-data") args.docsData = argv[++index] || "";
    else if (arg === "--manifest-out") args.manifestOut = argv[++index] || "";
    else if (arg === "--help") {
      console.log(`Usage:
  node src/search-book/scripts/build-all.mjs [--verify] [--dry-run] [--list]
  node src/search-book/scripts/build-all.mjs --from build-answer-chunks
  node src/search-book/scripts/build-all.mjs --only build-quality-audit

Options:
  --verify          Run build steps, syntax checks, invariant checks, and sensitive-pattern scan.
  --dry-run         Print selected steps without running them.
  --list            Print available build step ids.
  --from ID         Resume from a build step id.
  --only ID         Run exactly one build step id.
  --docs-root PATH  Override VIBE_DOCS_PUBLIC.
  --docs-data PATH  Override VIBE_DOCS_DATA.
  --manifest-out    Override page-manifest output path.`);
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function buildSteps(args) {
  return [
    ["build-page-manifest", ["scripts/build-page-manifest.mjs", "--input", args.docsData, "--out", args.manifestOut]],
    ["build-content-corpus", ["scripts/build-content-corpus.mjs", "--docs-root", args.docsRoot, "--docs-data", args.docsData]],
    ["build-authored-index", ["scripts/build-authored-index.mjs"]],
    ["build-source-catalog", ["scripts/build-source-catalog.mjs"]],
    ["build-navigation-tree", ["scripts/build-navigation-tree.mjs"]],
    ["build-journey-map", ["scripts/build-journey-map.mjs"]],
    ["build-question-routes", ["scripts/build-question-routes.mjs"]],
    ["build-faq-map", ["scripts/build-faq-map.mjs"]],
    ["build-discord-corpus", ["scripts/build-discord-corpus.mjs"]],
    ["build-discord-routing-summary", ["scripts/build-discord-routing-summary.mjs"]],
    ["build-gap-queue", ["scripts/build-gap-queue.mjs"]],
    ["build-answer-chunks", ["scripts/build-answer-chunks.mjs"]],
    ["build-crosslink-map", ["scripts/build-crosslink-map.mjs"]],
    ["build-volume-map", ["scripts/build-volume-map.mjs"]],
    ["build-page-state-registry", ["scripts/build-page-state-registry.mjs"]],
    ["build-publication-plan", ["scripts/build-publication-plan.mjs"]],
    ["build-glossary", ["scripts/build-glossary.mjs"]],
    ["build-answer-engine-contract", ["scripts/build-answer-engine-contract.mjs"]],
    ["build-living-docs-events", ["scripts/build-living-docs-events.mjs"]],
    ["build-llm-rag-contract", ["scripts/build-llm-rag-contract.mjs"]],
    ["build-answer-validation-report", ["scripts/build-answer-validation-report.mjs"]],
    ["build-competitive-sweep", ["scripts/build-competitive-sweep.mjs"]],
    ["build-source-ingestion-map", ["scripts/build-source-ingestion-map.mjs"]],
    ["build-requirement-map", ["scripts/build-requirement-map.mjs"]],
    ["build-quality-audit", ["scripts/build-quality-audit.mjs"]],
  ].map(([id, scriptArgs]) => ({
    id,
    command: process.execPath,
    args: scriptArgs.map((item, index) => index === 0 ? path.join(searchBookRoot, item) : item),
  }));
}

function selectedSteps(steps, args) {
  if (args.only) return steps.filter((step) => step.id === args.only);
  if (!args.from) return steps;
  const start = steps.findIndex((step) => step.id === args.from);
  if (start === -1) throw new Error(`Unknown --from step id: ${args.from}`);
  return steps.slice(start);
}

function commandLine(step) {
  return [step.command, ...step.args].map((part) => JSON.stringify(part)).join(" ");
}

function runStep(step, env) {
  console.log(`\n$ ${commandLine(step)}`);
  const result = spawnSync(step.command, step.args, {
    cwd: repoRoot,
    env,
    stdio: "inherit",
  });
  if (result.status !== 0) {
    throw new Error(`${step.id} failed with exit code ${result.status ?? "unknown"}`);
  }
}

function assertExists(filePath, label) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${label} not found at ${filePath}. Set VIBE_DOCS_PUBLIC/VIBE_DOCS_DATA or pass --docs-root/--docs-data.`);
  }
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(searchBookRoot, relativePath), "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function listFiles(dirPath, predicate) {
  return fs.readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && predicate(entry.name))
    .map((entry) => path.join(dirPath, entry.name))
    .sort((a, b) => a.localeCompare(b));
}

function syntaxCheckFiles() {
  return [
    path.join(searchBookRoot, "answer-corpus.js"),
    ...listFiles(path.join(searchBookRoot, "scripts"), (name) => name.endsWith(".mjs")),
    ...listFiles(path.join(searchBookRoot, "data"), (name) => name.endsWith(".js")),
  ];
}

function runSyntaxChecks(env, dryRun) {
  const files = syntaxCheckFiles();
  for (const filePath of files) {
    const step = {
      id: `syntax:${path.relative(searchBookRoot, filePath)}`,
      command: process.execPath,
      args: ["--check", filePath],
    };
    if (dryRun) console.log(commandLine(step));
    else runStep(step, env);
  }
  return files.length;
}

function runSensitivePatternScan(dryRun) {
  const pattern = /VIBE_BACK_URL|PRIVATE|TOKEN|SECRET|ADMIN|0x[a-fA-F0-9]{40}/;
  const targetDir = searchBookRoot;
  if (dryRun) {
    console.log(`native sensitive-pattern scan ${JSON.stringify(path.relative(repoRoot, targetDir))}`);
    return { matches: 0, files: 0, dryRun: true };
  }
  const files = [];
  const skipDirs = new Set([".git", "node_modules", "backups"]);
  const visit = (dirPath) => {
    for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
      if (entry.isDirectory() && skipDirs.has(entry.name)) continue;
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) visit(fullPath);
      else if (entry.isFile()) files.push(fullPath);
    }
  };
  visit(targetDir);

  let matches = 0;
  const matchedFiles = new Set();
  for (const filePath of files) {
    const text = fs.readFileSync(filePath, "utf8");
    const lines = text.split(/\r?\n/);
    const fileMatches = lines.filter((line) => pattern.test(line)).length;
    if (fileMatches) {
      matches += fileMatches;
      matchedFiles.add(filePath);
    }
  }
  return {
    matches,
    files: matchedFiles.size,
  };
}

function runReadinessEvidenceCheck(env, dryRun) {
  const step = {
    id: "check-readiness-evidence",
    command: process.execPath,
    args: [path.join(searchBookRoot, "scripts", "check-readiness-evidence.mjs")],
  };
  if (dryRun) {
    console.log(commandLine(step));
    return { dryRun: true };
  }
  runStep(step, env);
  return { passed: true };
}

function runStaticIntegrityCheck(env, dryRun) {
  const step = {
    id: "check-static-integrity",
    command: process.execPath,
    args: [path.join(searchBookRoot, "scripts", "check-static-integrity.mjs")],
  };
  if (dryRun) {
    console.log(commandLine(step));
    return { dryRun: true };
  }
  runStep(step, env);
  return { passed: true };
}

function runInvariants() {
  const journeys = readJson("data/journeys.json");
  assert(!journeys.missingPageIds.length && journeys.totalJourneys >= 5, "journey routes are incomplete");

  const routes = readJson("data/question-routes.json");
  assert(!routes.missingRouteIds.length && routes.totalRoutes >= 1, "question routes are incomplete");

  const faq = readJson("data/faq.json");
  assert(!faq.missingPageIds.length && !faq.missingSourceKeys.length, "FAQ routes have missing pages or sources");
  assert(faq.totalAnswerable === routes.totalRoutes, "FAQ answerable count does not match question routes");

  const discord = readJson("data/discord-corpus.json");
  assert(discord.importContractReady && discord.apiScraperReady, "Discord import contract is not ready");
  const discordParked = !discord.corpusReady && discord.totals.importedMessages === 0 && discord.totals.seededTopics >= 1;
  const discordImported =
    discord.corpusReady &&
    discord.totals.importedMessages > 0 &&
    discord.totals.questionClusters >= 1 &&
    discord.publicationMode !== "unknown";
  assert(discordParked || discordImported, "Discord corpus state is invalid");

  const discordRouting = readJson("data/discord-review-routing.json");
  assert(
    discordRouting.rawDiscordTextIncluded === false && discordRouting.sourceAnswerTextIncluded === false,
    "Discord routing summary includes raw text",
  );
  assert(discordRouting.valuesPrinted === false, "Discord routing summary value-printing boundary is invalid");
  if (discordRouting.routingReady) {
    assert((discordRouting.summary?.routedItems || 0) === (discordRouting.items || []).length, "Discord routing summary item count mismatch");
    assert(
      (discordRouting.reviewPlan?.pageFitItemCount || 0) + (discordRouting.reviewPlan?.refusalItemCount || 0) === (discordRouting.items || []).length,
      "Discord routing review plan item count mismatch",
    );
  }

  const gaps = readJson("data/gap-queue.json");
  assert(!gaps.missingQuestionGapIds.length && !gaps.missingRelatedPageIds.length && !gaps.missingSourceKeys.length, "gap queue has unresolved references");
  assert(gaps.totalQuestionSignals === routes.totalReconciliationQuestions, "gap question signals do not match reconciliation routes");

  const answerEngine = readJson("data/answer-engine-contract.json");
  assert(answerEngine.deterministicReady && !answerEngine.llmProductionReady, "answer-engine deterministic/prod readiness state is unexpected");
  assert(answerEngine.evaluation.allExactRoutesPass && answerEngine.evaluation.allRefusalTestsPass, "answer-engine evals are failing");
  assert(answerEngine.evaluation.totalExactRouteTests === routes.totalRoutes, "answer-engine exact-route count does not match routes");

  const living = readJson("data/living-docs-events.json");
  assert(living.eventContractReady && living.datastoreImplemented && living.sqliteDatastoreImplemented, "living-docs service contract is incomplete");
  assert(living.retentionPolicyImplemented && living.moderationExportImplemented && living.metricsExportImplemented && living.corsPolicyImplemented && living.gapSummaryJobImplemented && living.backupRestoreImplemented && living.productionPreflightImplemented && !living.livingDocsProductionReady, "living-docs production boundary is unexpected");
  assert(living.coverage.passingFixtures === living.coverage.totalFixtures && !living.coverage.failingFixtures, "living-docs fixtures are failing");

  const llm = readJson("data/llm-rag-contract.json");
  assert(llm.apiContractReady && llm.evalHarnessReady && llm.runtimeImplemented && !llm.llmProductionReady, "LLM RAG contract state is unexpected");
  assert(llm.adversarialEvaluation.passingCases === llm.adversarialEvaluation.totalCases, "LLM adversarial fixtures are failing");

  const answerValidation = readJson("data/answer-validation-report.json");
  assert(answerValidation.reportReady && answerValidation.coverage.totalFixtures >= 20, "answer-validation report is incomplete");
  assert(answerValidation.coverage.passingFixtures === answerValidation.coverage.totalFixtures, "answer-validation fixtures are failing");
  assert(!answerValidation.failureSummary.failingFixtureIds.length, "answer-validation failure ids are present");

  const chunks = readJson("data/answer-chunks.json");
  assert(!chunks.pagesMissingChunks.length && !chunks.unknownSourceKeys.length, "answer chunks have missing pages or unknown sources");
  assert(chunks.totalPages >= 821 && chunks.totalChunks >= chunks.totalPages, "answer chunk coverage is too low");

  const volume = readJson("data/volume-map.json");
  assert(!volume.unassignedPageIds.length && !volume.duplicatePageIds.length && !volume.volumeIdsMissingPages.length, "volume map has unresolved page ids");
  assert(volume.readerPages === volume.pagesAssigned && volume.manifestWithinTarget, "volume map assignment or target range is invalid");

  const pageState = readJson("data/page-state-registry.json");
  assert(!pageState.duplicatePageIds.length && !pageState.unclassifiedPageIds.length && !pageState.missingVolumeIds.length, "page-state registry has unresolved pages");
  const finalOrCandidatePages = (pageState.byState.published || 0) + (pageState.byState.candidate || 0);
  const routedNonPublicPageIds = (pageState.pages || [])
    .filter((page) => (page.questionRouteCount || 0) > 0 && !page.publicNavigationEligible)
    .map((page) => page.id);
  assert(!routedNonPublicPageIds.length, `question routes point at non-public pages: ${routedNonPublicPageIds.join(", ")}`);
  assert(
    pageState.totalPages >= 900 &&
      finalOrCandidatePages >= pageState.exactQuestionRoutedPages &&
      pageState.byState["source-companion"],
    "page-state registry coverage is too low",
  );

  const publicationPlan = readJson("data/publication-plan.json");
  assert(publicationPlan.planReady, "publication authoring plan is not ready");
  assert(publicationPlan.totals.sourceCompanionsQueued === pageState.sourceCompanionPages, "publication plan does not queue every source companion");
  assert(publicationPlan.sourceCompanionQueue.length === publicationPlan.totals.sourceCompanionsQueued, "publication queue count mismatch");
  assert(publicationPlan.sourceBlockRequiredFields.includes("sourceKey") && publicationPlan.sourceBlockRequiredFields.includes("sourceHref"), "publication plan source block contract is incomplete");

  const glossary = readJson("data/glossary.json");
  assert(!glossary.missingPageIds.length && !glossary.missingSourceKeys.length && glossary.totalTerms >= 25, "glossary routes are incomplete");

  const sources = readJson("data/source-catalog.json");
  assert(!sources.duplicateKeys.length && sources.totalSources >= 1, "source catalog is incomplete");

  const sweep = readJson("data/competitive-sweep.json");
  assert(sweep.targetDocs === 50 && sweep.plannedAgentLanes === 25 && sweep.completedExplorerBatches === 5 && sweep.targetDocsReviewed === 49, "competitive sweep state is unexpected");

  const ingestion = readJson("data/source-ingestion.json");
  assert(!ingestion.duplicateRequirementIds.length && !ingestion.invalidParkedRequirements.length && ingestion.totalSourceRequirements >= 12, "source-ingestion map is invalid");
  assert(
    ingestion.sourceCompletionReady || (ingestion.byStatus.parked || 0) > 0 || (ingestion.byStatus.partial || 0) > 0 || (ingestion.byStatus.missing || 0) > 0,
    "source-ingestion readiness/state is invalid",
  );

  const crosslinks = readJson("data/crosslinks.json");
  assert(!crosslinks.missingExplicitRelatedPageIds.length && crosslinks.totalPages >= 800, "crosslinks are incomplete");

  const requirements = readJson("data/requirement-map.json");
  assert(!requirements.duplicateRequirementIds.length && !requirements.invalidParkedRequirements.length && requirements.totalRequirements >= 12, "requirement map is invalid");
  assert(!requirements.completionReady, "completion readiness should remain false until production/deploy/final-report work finishes");

  const authored = readJson("data/authored-pages.json");
  assert(authored.pages.every((page) => page.bodyMarkdown), "authored pages missing body markdown");
  assert(authored.pages.filter((page) => page.section === "compendium" && page.volumeId).length === 8, "volume overview page count is not 8");

  const audit = readJson("data/quality-audit.json");
  assert(audit.totals.manifestWithinTarget && audit.totals.manifestPages >= audit.targetMinimumPages && audit.totals.manifestPages <= audit.targetMaximumPages, "quality audit manifest target failed");
  assert(audit.gates.length >= 1, "quality audit has no gates");

  const manifest = readJson("page-manifest.json");
  assert(manifest.pages && manifest.pages.length >= manifest.compendiumTarget.minimumPages, "page manifest is below target minimum");
  assert(manifest.pages.length <= manifest.compendiumTarget.maximumPages, "page manifest is above target maximum");

  return {
    routes: routes.totalRoutes,
    faqAnswerable: faq.totalAnswerable,
    chunks: chunks.totalChunks,
    authored: authored.totalPages,
    qualityGates: `${audit.gates.filter((gate) => gate.passed).length}/${audit.gates.length}`,
  };
}

const args = parseArgs(process.argv.slice(2));
const steps = buildSteps(args);

if (args.list) {
  for (const step of steps) console.log(step.id);
  process.exit(0);
}

const chosenSteps = selectedSteps(steps, args);
if (!chosenSteps.length) throw new Error("No build steps selected.");

const env = {
  ...process.env,
  VIBE_DOCS_PUBLIC: args.docsRoot,
  VIBE_DOCS_DATA: args.docsData,
};

if (args.dryRun) {
  for (const step of chosenSteps) console.log(commandLine(step));
  if (args.verify) {
    runSyntaxChecks(env, true);
    runSensitivePatternScan(true);
    runReadinessEvidenceCheck(env, true);
    runStaticIntegrityCheck(env, true);
  }
  process.exit(0);
}

assertExists(args.docsRoot, "Vibe docs public directory");
assertExists(args.docsData, "Vibe docs data JSON");

const startedAt = Date.now();
for (const step of chosenSteps) runStep(step, env);

let syntaxChecks = 0;
let invariants = null;
let sensitivePatternScan = null;
let readinessEvidence = null;
let staticIntegrity = null;
if (args.verify) {
  syntaxChecks = runSyntaxChecks(env, false);
  invariants = runInvariants();
  sensitivePatternScan = runSensitivePatternScan(false);
  readinessEvidence = runReadinessEvidenceCheck(env, false);
  staticIntegrity = runStaticIntegrityCheck(env, false);
}

console.log(JSON.stringify({
  status: "passed",
  mode: args.verify ? "build-and-verify" : "build",
  buildSteps: chosenSteps.length,
  syntaxChecks,
  invariants,
  sensitivePatternScan,
  readinessEvidence,
  staticIntegrity,
  elapsedMs: Date.now() - startedAt,
}, null, 2));
