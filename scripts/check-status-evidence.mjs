#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const docs = [
  { id: "final-report", relativePath: "FINAL-REPORT.md" },
  { id: "completion-audit", relativePath: "COMPLETION-AUDIT.md" },
  { id: "production-readiness-packet", relativePath: "PRODUCTION-READINESS-PACKET.md" },
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

function fragmentsForEvidence() {
  const manifest = readJson("page-manifest.json");
  const authored = readJson("data/authored-pages.json");
  const pageState = readJson("data/page-state-registry.json");
  const routes = readJson("data/question-routes.json");
  const faq = readJson("data/faq.json");
  const chunks = readJson("data/answer-chunks.json");
  const sourceIngestion = readJson("data/source-ingestion.json");
  const requirements = readJson("data/requirement-map.json");
  const quality = readJson("data/quality-audit.json");
  const discord = readJson("data/discord-corpus.json");
  const discordRouting = readJson("data/discord-review-routing.json");
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
  const live = llm.liveEvaluation || {};
  const suites = live.suites || {};

  return {
    manifestPages: String(manifest.pages.length),
    authoredPages: String(authored.totalPages),
    publicNavigationPages: String(pageState.publicNavigationPages),
    sourceCompanionPages: String(pageState.sourceCompanionPages),
    internalDraftPages: String(pageState.internalDraftPages),
    exactRoutes: String(routes.totalRoutes),
    faqEntries: String(faq.totalEntries),
    chunks: formatInteger(chunks.totalChunks),
    chunksRaw: String(chunks.totalChunks),
    sourceIngestion: `${sourceStatus.complete}/${sourceIngestion.totalSourceRequirements}`,
    sourceComplete: String(sourceStatus.complete),
    sourcePartial: String(sourceStatus.partial),
    sourceParked: String(sourceStatus.parked),
    sourceMissing: String(sourceStatus.missing),
    requirementComplete: String(requirementStatus.complete),
    requirementPartial: String(requirementStatus.partial),
    requirementParked: String(requirementStatus.parked),
    requirementMissing: String(requirementStatus.missing),
    qualityGates: `${qualityPassed}/${qualityTotal}`,
    discordMessages: formatInteger(discord.totals?.importedMessages || 0),
    discordClusters: formatInteger(discord.totals?.questionClusters || 0),
    discordLafaCandidates: formatInteger(discord.totals?.lafaAnswerCandidates || 0),
    discordRoutedItems: String(discordRouting.summary?.routedItems || 0),
    discordPageFitCoverage: `${routeCoverage.pageFitCoveredByPublicRoutes || 0}/${routeCoverage.totalPageFitGroups || 0}`,
    discordPageFitTriage: `${routeCoverage.triageReadyPageFitGroups || 0}/${routeCoverage.totalPageFitGroups || 0}`,
    discordSourceBackedPageFits: `${routeCoverage.sourceBackedPageFitGroups || 0}/${routeCoverage.totalPageFitGroups || 0}`,
    discordPublicCopyReady: `${routeCoverage.publicCopyReadyPageFitGroups || 0}/${routeCoverage.totalPageFitGroups || 0}`,
    discordPublicCopyReviewRequired: `${routeCoverage.publicCopyReviewRequired || 0}/${routeCoverage.totalPageFitGroups || 0}`,
    discordRefusalPolicyReady: `${discordRouting.reviewPlan?.refusalPolicyReadyItems || 0}/${discordRouting.reviewPlan?.refusalReviewReady || 0}`,
    discordRefusalPolicyReviewRequired: `${discordRouting.reviewPlan?.refusalPolicyReviewRequired || 0}/${discordRouting.reviewPlan?.refusalReviewReady || 0}`,
    discordSingleRouteRemaining: String(routeCoverage.pageFitSingleRouteRemaining || 0),
    syntaxChecks: String(countSyntaxCheckFiles()),
    liveEvalTotal: suites.total ? `${suites.total.passing}/${suites.total.total}` : "",
    liveEvalAdversarial: suites.adversarial ? `${suites.adversarial.passing}/${suites.adversarial.total}` : "",
    liveEvalAnswerValidation: suites.answerValidation ? `${suites.answerValidation.passing}/${suites.answerValidation.total}` : "",
    openOperatorItems: (requirements.openOperatorItems || []).map((item) => String(item.id)).sort((a, b) => Number(a) - Number(b)),
  };
}

function expectedChecks(evidence) {
  const openOperatorFragments = evidence.openOperatorItems.map((id) => `#${id}`);
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
      { id: "clean-release-evidence", allOf: ["search-book-release-dry-run-production-packet", "repository dirty state `false`", "same commit", "productionReadinessPacket:passed", "original-spec reconciliation evidence", "evidence summary renderer status `passed`", "publication boundaries status `passed`", "backup-restore evidence", "living-docs review evidence"] },
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
      { id: "workflow-contract", allOf: ["search-book:check-github-workflows", "workflow contract guard"] },
      { id: "living-docs-review-evidence", allOf: ["search-book:check-living-docs-review", "living-docs reviewer evidence"] },
      { id: "production-packet", allOf: ["search-book:check-production-packet", "production-readiness packet guard"] },
      { id: "clean-release-evidence", allOf: ["search-book-release-dry-run-production-packet", "repository dirty state `false`", "same commit", "productionReadinessPacket:passed", "original-spec reconciliation evidence", "evidence summary renderer evidence `passed`", "publication-boundary evidence `passed`", "backup-restore evidence", "living-docs review evidence"] },
      { id: "completion-boundary", allOf: openOperatorFragments },
    ],
    "PRODUCTION-READINESS-PACKET.md": [
      { id: "routes", allOf: [`${evidence.exactRoutes} exact routes`] },
      { id: "chunks", anyOf: [`${evidence.chunks} chunks`, `${evidence.chunksRaw} chunks`] },
      { id: "authored", allOf: [`${evidence.authoredPages} authored pages`] },
      { id: "source-ingestion", allOf: [`${evidence.sourceIngestion}`] },
      { id: "source-zero-counts", anyOf: [`0 partial / 0 parked / 0 missing`, `0 partial, 0 parked, and 0 missing`] },
      { id: "quality-gates", allOf: [`${evidence.qualityGates}`] },
      { id: "discord-route-coverage", allOf: [`${evidence.discordPageFitCoverage} page-fit groups`, `${evidence.discordSingleRouteRemaining} single-route groups`, `source-backed triage ${evidence.discordPageFitTriage} page-fit groups`, `public-copy ready ${evidence.discordPublicCopyReady} page-fit groups`, `refusal policy ready ${evidence.discordRefusalPolicyReady} refusal items`] },
      { id: "backup-restore-evidence", allOf: ["backup-restore evidence passed", "4/4 tables matched"] },
      { id: "workflow-contract", allOf: ["GitHub workflow contract evidence reports 4/4 expected workflows"] },
      { id: "living-docs-review-evidence", allOf: ["living-docs review evidence passed", "living-docs reviewer evidence reports"] },
      { id: "production-packet", allOf: ["npm run search-book:check-production-packet"] },
      { id: "operator-gates", allOf: openOperatorFragments },
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
