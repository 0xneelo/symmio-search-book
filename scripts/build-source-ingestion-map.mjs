#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(searchBookRoot, "..", "..");

const defaults = {
  manifest: path.join(searchBookRoot, "page-manifest.json"),
  authoredIndex: path.join(searchBookRoot, "data", "authored-pages.json"),
  sourceCatalog: path.join(searchBookRoot, "data", "source-catalog.json"),
  competitiveSweep: path.join(searchBookRoot, "data", "competitive-sweep.json"),
  sourceRegistry: path.join(searchBookRoot, "SOURCES.md"),
  gaps: path.join(searchBookRoot, "GAPS.md"),
  inbox: path.join(repoRoot, "_specs", "app-docs", "OPERATOR-INBOX.md"),
  outJson: path.join(searchBookRoot, "data", "source-ingestion.json"),
  outJs: path.join(searchBookRoot, "data", "source-ingestion.js"),
};

const statuses = new Set(["complete", "partial", "parked", "missing"]);

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--out-js") args.outJs = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node src/search-book/scripts/build-source-ingestion-map.mjs [--out-json path] [--out-js path]");
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function readJson(filePath, fallback = null) {
  return fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, "utf8")) : fallback;
}

function readText(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function countBy(items, getKey) {
  const counts = items.reduce((acc, item) => {
    const key = getKey(item) || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  return Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)));
}

function parseOpenInboxItems(markdown) {
  const openSection = markdown.split("## Open")[1]?.split("## Resolved")[0] || "";
  return [...openSection.matchAll(/^### \[OPEN\] #(\d+) — (.+)$/gm)].map((match) => ({
    id: Number(match[1]),
    title: match[2].trim(),
  }));
}

function inboxHas(openItems, id) {
  return openItems.some((item) => item.id === id);
}

function hasGap(markdown, id) {
  return new RegExp(`^## ${id}:`, "m").test(markdown);
}

function keySet(sourceCatalog) {
  return new Set(Object.keys(sourceCatalog.sourceByKey || {}));
}

function sourceReq({ id, label, status, category, sourceSpecs, presentKeys = [], missingKeys = [], evidence, blocks = [], nextAction }) {
  if (!statuses.has(status)) throw new Error(`Unknown source-ingestion status for ${id}: ${status}`);
  return {
    id,
    label,
    status,
    category,
    sourceSpecs,
    presentKeys: [...presentKeys].sort((a, b) => a.localeCompare(b)),
    missingKeys: [...missingKeys].sort((a, b) => a.localeCompare(b)),
    evidence,
    blocks,
    nextAction,
  };
}

function requiredKeysStatus(keys, required) {
  const present = required.filter((key) => keys.has(key));
  const missing = required.filter((key) => !keys.has(key));
  return { present, missing, complete: missing.length === 0 };
}

const args = parseArgs(process.argv.slice(2));
const manifest = readJson(args.manifest, { pages: [] });
const authored = readJson(args.authoredIndex, { totalPages: 0, bySection: {} });
const sourceCatalog = readJson(args.sourceCatalog, { sourceByKey: {}, totalSources: 0, duplicateKeys: [] });
const competitiveSweep = readJson(args.competitiveSweep, {
  targetDocs: 0,
  targetDocsReviewed: 0,
  targetDocsUnverified: 0,
  plannedAgentLanes: 0,
  completedExplorerBatches: 0,
  completionReady: false,
});
const registryMarkdown = readText(args.sourceRegistry);
const gapMarkdown = readText(args.gaps);
const openInboxItems = parseOpenInboxItems(readText(args.inbox));
const keys = keySet(sourceCatalog);
const neeloPages = (manifest.pages || []).filter((page) => page.sourcePriority === "neeloVision" || page.sourcePriority === "neeloSection").length;

const localSpecKeys = ["spec-prompt", "spec-00", "spec-01", "spec-02", "spec-03", "spec-04", "spec-05", "spec-06", "spec-07", "spec-08", "spec-09", "styleguide"];
const localCodeKeys = [
  "server-pulse",
  "server-volume",
  "server-volume-snapshots",
  "server-me",
  "server-points",
  "dashboard-app",
  "dashboard-data",
  "dashboard-revenue-doc",
  "dashboard-overview",
  "dashboard-codes",
  "dashboard-network",
  "dashboard-volume",
  "dashboard-tasks",
  "dashboard-faq",
  "dashboard-settings",
];
const linearExpectedKeys = [
  "syn-56",
  "syn-73",
  "syn-98",
  "syn-118",
  "syn-163",
  "syn-166",
  "syn-172",
  "syn-192",
  "syn-200",
  "syn-201",
  "syn-203",
  "syn-204",
  "syn-205",
];
const revenueKeys = ["local-revenue-doc", "dashboard-revenue-doc", "server-pulse", "server-volume", "server-volume-snapshots", "server-me"];
const neeloKeys = ["vibe-papers", "vibe-papers-site", "vibe-papers-data"];
const vibePublicKeys = ["vibe-llms", "vibe-what-is", "vibe-architecture", "vibe-referral-program", "vibe-points", "vibe-margin"];
const symmioPublicKeys = [
  "symmio-foundation-docs",
  "symmio-token-foundation",
  "symmio-llms",
  "symmio-what-is",
  "symmio-core",
  "symmio-intent-lifecycle",
  "symmio-whitepaper",
  "symmio-options-docs",
  "symmio-options-technical-architecture",
  "symmio-options-facets",
  "symmio-options-partya-open",
  "symmio-options-partyb-open",
  "symmio-options-partya-close",
  "symmio-options-partyb-close",
  "symmio-options-instant-layer",
];
const symmioWhitepaperHistoryKeys = [
  "symmio-whitepaper",
  "symmio-earliest-docs",
  "symmio-docs-initial-commit",
  "symmio-whitepaper-0-8-pdf",
  "symmio-whitepaper-0-8-commit",
  "symm-io-protocol-core-initial-commit",
  "symmio-original-whitepaper",
];
const symmioGithubKeys = [
  "symm-io-github",
  "symm-io-protocol-core",
  "symm-io-protocol-core-readme",
  "symm-io-protocol-core-initial-commit",
  "symm-io-options-core",
  "symm-io-subgraphs",
  "symm-io-analytics",
];
const superflowKeys = ["superflow-she-openapi"];
const hyperliquidGoldskyKeys = ["hyperliquid-llms", "hyperliquid-hip3", "goldsky-subgraphs", "goldsky-graphql-endpoints"];
const competitiveSweepKeys = ["competitive-sweep-batch-01", "competitive-sweep-synthesis"];

const localSpecStatus = requiredKeysStatus(keys, localSpecKeys);
const localCodeStatus = requiredKeysStatus(keys, localCodeKeys);
const linearStatus = requiredKeysStatus(keys, linearExpectedKeys);
const revenueStatus = requiredKeysStatus(keys, revenueKeys);
const neeloStatus = requiredKeysStatus(keys, neeloKeys);
const vibeStatus = requiredKeysStatus(keys, vibePublicKeys);
const symmioStatus = requiredKeysStatus(keys, symmioPublicKeys);
const symmioWhitepaperHistoryStatus = requiredKeysStatus(keys, symmioWhitepaperHistoryKeys);
const symmioGithubStatus = requiredKeysStatus(keys, symmioGithubKeys);
const superflowStatus = requiredKeysStatus(keys, superflowKeys);
const hyperliquidGoldskyStatus = requiredKeysStatus(keys, hyperliquidGoldskyKeys);
const competitiveSweepSourceStatus = requiredKeysStatus(keys, competitiveSweepKeys);
const competitiveSweepHasBatch =
  (competitiveSweep.targetDocs || 0) >= 50 &&
  (competitiveSweep.plannedAgentLanes || 0) >= 25 &&
  (competitiveSweep.completedExplorerBatches || 0) >= 5;
const competitiveSweepMissingKeys = [
  ...competitiveSweepSourceStatus.missing,
  ...((competitiveSweep.targetDocsReviewed || 0) < (competitiveSweep.targetDocs || 0) ? ["opyn-docs-official-review"] : []),
];
const competitiveSweepBlockedByOperator =
  competitiveSweepMissingKeys.includes("opyn-docs-official-review") && inboxHas(openInboxItems, 8);

const requirements = [
  sourceReq({
    id: "local-spec-package",
    label: "Local app-docs specs and goal prompt",
    status: localSpecStatus.complete ? "complete" : "partial",
    category: "local-truth",
    sourceSpecs: ["01", "04", "07", "08", "09"],
    presentKeys: localSpecStatus.present,
    missingKeys: localSpecStatus.missing,
    evidence: `${localSpecStatus.present.length}/${localSpecKeys.length} required spec sources registered.`,
    nextAction: "Keep spec keys current when app-docs changes.",
  }),
  sourceReq({
    id: "local-product-code",
    label: "Onboarding-app product code and dashboard surfaces",
    status: localCodeStatus.complete ? "complete" : "partial",
    category: "local-truth",
    sourceSpecs: ["03", "04", "05", "08"],
    presentKeys: localCodeStatus.present,
    missingKeys: localCodeStatus.missing,
    evidence: `${localCodeStatus.present.length}/${localCodeKeys.length} product-code sources registered.`,
    nextAction: "Add any newly created dashboard/server surfaces to SOURCES.md before citing them.",
  }),
  sourceReq({
    id: "linear-synchronicity-research",
    label: "Synchronicity Linear research issues",
    status: linearStatus.complete ? "complete" : "partial",
    category: "local-truth",
    sourceSpecs: ["03", "04", "07"],
    presentKeys: linearStatus.present,
    missingKeys: linearStatus.missing,
    evidence: `${linearStatus.present.length}/${linearExpectedKeys.length} named Linear issue sources registered.`,
    nextAction: "Register remaining Linear sources or mark unavailable with evidence before final publication.",
  }),
  sourceReq({
    id: "revenue-volume-points-code-docs",
    label: "Revenue, volume, and points local truth",
    status: revenueStatus.complete ? "complete" : "partial",
    category: "reference",
    sourceSpecs: ["03", "04", "08"],
    presentKeys: revenueStatus.present,
    missingKeys: revenueStatus.missing,
    evidence: `${revenueStatus.present.length}/${revenueKeys.length} revenue/volume implementation sources registered.`,
    nextAction: "Keep Phase A revenue and fifteen-level referral-depth wording aligned with the operator-approved public stance; leave Phase B economics out of v1.",
  }),
  sourceReq({
    id: "neelo-vibe-docs",
    label: "0xneelo/vibe_docs corpus",
    status: neeloStatus.complete && neeloPages >= 700 ? "complete" : "partial",
    category: "manifesto",
    sourceSpecs: ["02", "04", "07", "08"],
    presentKeys: neeloStatus.present,
    missingKeys: neeloStatus.missing,
    evidence: `${neeloStatus.present.length}/${neeloKeys.length} Neelo source keys registered; ${neeloPages} manifest pages mapped from Neelo vision/sections.`,
    nextAction: "Continue converting high-leverage Neelo source pages into authored manifesto chapters.",
  }),
  sourceReq({
    id: "public-vibe-docs",
    label: "Public Vibe docs",
    status: vibeStatus.complete ? "complete" : "partial",
    category: "product-reference",
    sourceSpecs: ["03", "04", "05"],
    presentKeys: vibeStatus.present,
    missingKeys: vibeStatus.missing,
    evidence: `${vibeStatus.present.length}/${vibePublicKeys.length} public Vibe source keys registered.`,
    nextAction: "Verify exact market counts and time-sensitive product claims at publication time.",
  }),
  sourceReq({
    id: "vibe-add-token-info",
    label: "Vibe Add Token Info docs",
    status: inboxHas(openInboxItems, 9) ? "parked" : keys.has("vibe-add-token-info") ? "complete" : "missing",
    category: "product-reference",
    sourceSpecs: ["04", "08"],
    presentKeys: keys.has("vibe-add-token-info") ? ["vibe-add-token-info"] : [],
    missingKeys: keys.has("vibe-add-token-info") ? [] : ["vibe-add-token-info"],
    evidence: keys.has("vibe-add-token-info")
      ? "Official Add Token Info Markdown is registered and synthesized into an authored reference page."
      : "The official Add Token Info page is named in the generated companion gap, but its primary-source Markdown has not been fetched.",
    blocks: inboxHas(openInboxItems, 9) ? ["OPERATOR-INBOX #9"] : [],
    nextAction: keys.has("vibe-add-token-info")
      ? "Keep payment details routed to the live app form; do not publish static fee, treasury address, token address, or chain list."
      : "Resume Add Token Info ingestion when the operator provides the official Markdown or a reachable canonical replacement.",
  }),
  sourceReq({
    id: "vibe-notion",
    label: "Vibe Trading Notion workspace",
    status: inboxHas(openInboxItems, 5) ? "parked" : "missing",
    category: "product-reference",
    sourceSpecs: ["04", "07"],
    presentKeys: [],
    missingKeys: ["vibe-trading-notion"],
    evidence: "No Notion export or shared readable copy is registered in SOURCES.md.",
    blocks: inboxHas(openInboxItems, 5) ? ["OPERATOR-INBOX #5"] : [],
    nextAction: "Resume Notion ingestion when the operator fills inbox item #5.",
  }),
  sourceReq({
    id: "public-symmio-docs",
    label: "Public Symmio docs and current whitepaper",
    status: symmioStatus.complete ? "complete" : "partial",
    category: "protocol-reference",
    sourceSpecs: ["02", "04", "07"],
    presentKeys: symmioStatus.present,
    missingKeys: symmioStatus.missing,
    evidence: `${symmioStatus.present.length}/${symmioPublicKeys.length} public Symmio source keys registered, including Foundation and options docs.`,
    nextAction: "Keep mining deeper options examples before final protocol-reference publication.",
  }),
  sourceReq({
    id: "symmio-whitepaper-history",
    label: "Original/oldest Symmio whitepaper and earliest docs",
    status: symmioWhitepaperHistoryStatus.complete ? "complete" : inboxHas(openInboxItems, 6) ? "parked" : "partial",
    category: "protocol-reference",
    sourceSpecs: ["02", "04", "07"],
    presentKeys: symmioWhitepaperHistoryStatus.present,
    missingKeys: symmioWhitepaperHistoryStatus.missing,
    evidence: `${symmioWhitepaperHistoryStatus.present.length}/${symmioWhitepaperHistoryKeys.length} whitepaper/history source keys registered. Official Git evidence now covers protocol-core starting 2023-06-13, docs starting 2023-08-22, and SYMMIO paper v0.8 added 2023-11-16; the exact original/oldest artifact remains open.`,
    blocks: !symmioWhitepaperHistoryStatus.complete && inboxHas(openInboxItems, 6) ? ["OPERATOR-INBOX #6"] : [],
    nextAction: "Locate and register the exact original/oldest whitepaper or archived docs before publishing a 2021/origin-story comparison.",
  }),
  sourceReq({
    id: "symm-io-github",
    label: "github.com/symm-io repositories",
    status: symmioGithubStatus.complete ? "complete" : "partial",
    category: "protocol-reference",
    sourceSpecs: ["04", "07"],
    presentKeys: symmioGithubStatus.present,
    missingKeys: symmioGithubStatus.missing,
    evidence: `${symmioGithubStatus.present.length}/${symmioGithubKeys.length} SYMM-IO GitHub source keys registered.`,
    nextAction: "Link implementation-specific repositories to authored protocol/developer pages as they are written.",
  }),
  sourceReq({
    id: "superflow-sshe",
    label: "SuperFlow / SSHE docs",
    status: superflowStatus.complete ? "partial" : inboxHas(openInboxItems, 7) ? "parked" : "missing",
    category: "protocol-reference",
    sourceSpecs: ["04", "07"],
    presentKeys: superflowStatus.present,
    missingKeys: [
      ...superflowStatus.missing,
      ...(inboxHas(openInboxItems, 7) ? ["sshe-source-family"] : []),
    ],
    evidence: superflowStatus.complete
      ? "SuperFlow/SHE OpenAPI source is registered; fetched title is SYMMIO Hybrid Exchange(SHE), while SSHE remains unidentified."
      : "No SuperFlow or SSHE source key is registered.",
    blocks: inboxHas(openInboxItems, 7) ? ["OPERATOR-INBOX #7"] : [],
    nextAction: superflowStatus.complete
      ? "Identify or exclude the remaining SSHE source family before final source-completeness claims."
      : "Add SuperFlow/SSHE source material or record why it is out of scope before final source-completeness claims.",
  }),
  sourceReq({
    id: "hyperliquid-goldsky",
    label: "Hyperliquid HIP-3 and Goldsky analytics",
    status: hyperliquidGoldskyStatus.complete ? "complete" : "partial",
    category: "competitive-reference",
    sourceSpecs: ["02", "03", "04", "07"],
    presentKeys: hyperliquidGoldskyStatus.present,
    missingKeys: hyperliquidGoldskyStatus.missing,
    evidence: `${hyperliquidGoldskyStatus.present.length}/${hyperliquidGoldskyKeys.length} Hyperliquid/Goldsky source keys registered.`,
    nextAction: "Use the registered Goldsky docs as the public citation layer for the Barometer and HIP-3 data-source argument.",
  }),
  sourceReq({
    id: "discord-lafa-corpus",
    label: "Symmio Discord and Lafa Q&A corpus",
    status: inboxHas(openInboxItems, 2) ? "parked" : "missing",
    category: "demand-signal",
    sourceSpecs: ["01", "04", "06", "07", "08"],
    presentKeys: [],
    missingKeys: ["symmio-discord-lafa-export"],
    evidence: "Discord/Lafa corpus is not imported; local FAQ is seeded from repo/public docs only.",
    blocks: inboxHas(openInboxItems, 2) ? ["OPERATOR-INBOX #2"] : [],
    nextAction: "Resume Discord-derived FAQ and answer-engine seeding when the operator fills inbox item #2.",
  }),
  sourceReq({
    id: "competitive-sweep",
    label: "25-sub-agent competitive documentation sweep",
    status:
      competitiveSweep.completionReady && competitiveSweepSourceStatus.complete
        ? "complete"
        : competitiveSweepHasBatch && competitiveSweepSourceStatus.complete && competitiveSweepBlockedByOperator
          ? "parked"
          : competitiveSweepHasBatch
            ? "partial"
            : "missing",
    category: "competitive-reference",
    sourceSpecs: ["07"],
    presentKeys: competitiveSweepSourceStatus.present,
    missingKeys: competitiveSweepMissingKeys,
    evidence: competitiveSweepHasBatch
      ? `${competitiveSweep.targetDocs || 0} target docs across ${competitiveSweep.plannedAgentLanes || 0} lanes; ${competitiveSweep.completedExplorerBatches || 0} explorer batches returned; ${competitiveSweep.targetDocsReviewed || 0}/${competitiveSweep.targetDocs || 0} docs verified, ${competitiveSweep.targetDocsUnverified || 0} unverified.`
      : hasGap(gapMarkdown, "G-002")
        ? "G-002 records that the competitive sweep is not complete."
        : "No competitive-sweep gap is registered.",
    blocks: competitiveSweepBlockedByOperator ? ["OPERATOR-INBOX #8"] : [],
    nextAction: "Resolve the Opyn official-doc access gap or record an operator exclusion/replacement decision before claiming the sweep complete.",
  }),
  sourceReq({
    id: "authored-derived-pages",
    label: "Authored source-derived page layer",
    status: (authored.totalPages || 0) >= 40 ? "complete" : "partial",
    category: "delivery",
    sourceSpecs: ["05", "08"],
    presentKeys: ["authored-pages", "authored-index"].filter((key) => keys.has(key)),
    missingKeys: ["authored-pages", "authored-index"].filter((key) => !keys.has(key)),
    evidence: `${authored.totalPages || 0} authored pages generated from registered sources across ${Object.keys(authored.bySection || {}).length} sections.`,
    nextAction: "Keep converting generated pages into authored pages until publication coverage is strong enough for the final site.",
  }),
  sourceReq({
    id: "source-catalog-integrity",
    label: "Source catalog integrity",
    status: (sourceCatalog.totalSources || 0) >= 50 && !(sourceCatalog.duplicateKeys || []).length ? "complete" : "partial",
    category: "delivery",
    sourceSpecs: ["01", "04", "08"],
    presentKeys: Object.keys(sourceCatalog.sourceByKey || {}),
    missingKeys: [],
    evidence: `${sourceCatalog.totalSources || 0} registered source keys; ${(sourceCatalog.duplicateKeys || []).length} duplicate keys.`,
    nextAction: "Keep source catalog and SOURCES.md synchronized as new source families are ingested.",
  }),
];

const duplicateRequirementIds = requirements.map((item) => item.id).filter((id, index, ids) => ids.indexOf(id) !== index);
const invalidParkedRequirements = requirements
  .filter((item) => item.status === "parked" && !item.blocks.length)
  .map((item) => item.id);

if (duplicateRequirementIds.length) throw new Error(`Duplicate source-ingestion ids: ${[...new Set(duplicateRequirementIds)].join(", ")}`);
if (invalidParkedRequirements.length) throw new Error(`Parked source-ingestion items missing blockers: ${invalidParkedRequirements.join(", ")}`);

const byStatus = countBy(requirements, (item) => item.status);
const byCategory = countBy(requirements, (item) => item.category);
const payload = {
  generatedAt: "deterministic-build",
  status: "source-ingestion-coverage-map",
  sourceCompletionReady: requirements.every((item) => item.status === "complete"),
  totalSourceRequirements: requirements.length,
  byStatus,
  byCategory,
  openOperatorItems: openInboxItems,
  duplicateRequirementIds: [],
  invalidParkedRequirements: [],
  requirements,
  missingSourceFamilies: requirements
    .filter((item) => item.status === "missing" || item.status === "partial" || item.status === "parked")
    .map((item) => ({
      id: item.id,
      status: item.status,
      missingKeys: item.missingKeys,
      blocks: item.blocks,
      nextAction: item.nextAction,
    })),
};

ensureDir(path.dirname(args.outJson));
fs.writeFileSync(args.outJson, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(args.outJs, `window.SearchBookSourceIngestion = ${JSON.stringify(payload)};\n`);
console.log(
  JSON.stringify(
    {
      requirements: payload.totalSourceRequirements,
      complete: payload.byStatus.complete || 0,
      partial: payload.byStatus.partial || 0,
      parked: payload.byStatus.parked || 0,
      missing: payload.byStatus.missing || 0,
      sourceCompletionReady: payload.sourceCompletionReady,
    },
    null,
    2,
  ),
);
