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
const linearExpectedKeys = ["syn-166", "syn-200", "syn-201", "syn-203", "syn-204", "syn-163", "syn-56", "syn-118", "syn-192", "syn-98", "syn-73", "syn-205"];
const revenueKeys = ["local-revenue-doc", "dashboard-revenue-doc", "server-pulse", "server-volume", "server-volume-snapshots", "server-me"];
const neeloKeys = ["vibe-papers", "vibe-papers-site", "vibe-papers-data"];
const vibePublicKeys = ["vibe-llms", "vibe-what-is", "vibe-architecture", "vibe-referral-program", "vibe-points", "vibe-margin"];
const symmioPublicKeys = ["symmio-llms", "symmio-what-is", "symmio-core", "symmio-intent-lifecycle", "symmio-whitepaper"];
const hyperliquidKeys = ["hyperliquid-llms", "hyperliquid-hip3"];

const localSpecStatus = requiredKeysStatus(keys, localSpecKeys);
const localCodeStatus = requiredKeysStatus(keys, localCodeKeys);
const linearStatus = requiredKeysStatus(keys, linearExpectedKeys);
const revenueStatus = requiredKeysStatus(keys, revenueKeys);
const neeloStatus = requiredKeysStatus(keys, neeloKeys);
const vibeStatus = requiredKeysStatus(keys, vibePublicKeys);
const symmioStatus = requiredKeysStatus(keys, symmioPublicKeys);
const hyperliquidStatus = requiredKeysStatus(keys, hyperliquidKeys);

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
    nextAction: "Keep final public wording parked behind revenue-disclosure and referral-depth operator decisions.",
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
    status: symmioStatus.complete ? "partial" : "missing",
    category: "protocol-reference",
    sourceSpecs: ["02", "04", "07"],
    presentKeys: symmioStatus.present,
    missingKeys: [...symmioStatus.missing, "docs.symmio.foundation", "symmio-options-docs"],
    evidence: `${symmioStatus.present.length}/${symmioPublicKeys.length} core Symmio source keys registered; docs foundation/options pages still need deep mining.`,
    nextAction: "Mine Symmio options, foundation docs, and deeper architecture pages before final protocol-reference publication.",
  }),
  sourceReq({
    id: "symmio-whitepaper-history",
    label: "Original/oldest Symmio whitepaper and earliest docs",
    status: keys.has("symmio-whitepaper") ? "partial" : "missing",
    category: "protocol-reference",
    sourceSpecs: ["02", "04", "07"],
    presentKeys: keys.has("symmio-whitepaper") ? ["symmio-whitepaper"] : [],
    missingKeys: ["symmio-original-whitepaper", "symmio-earliest-docs"],
    evidence: "Current Symmio whitepaper pointer is registered, but oldest whitepaper/version-history evidence is not.",
    nextAction: "Locate and register the oldest whitepaper, archived docs, or Git history before publishing the origin story.",
  }),
  sourceReq({
    id: "symm-io-github",
    label: "github.com/symm-io repositories",
    status: /github\.com\/symm-io/i.test(registryMarkdown) ? "partial" : "missing",
    category: "protocol-reference",
    sourceSpecs: ["04", "07"],
    presentKeys: [],
    missingKeys: ["symm-io-github"],
    evidence: "No dedicated symm-io GitHub repository source key is registered.",
    nextAction: "Register relevant symm-io repositories and link them to protocol/developer reference pages.",
  }),
  sourceReq({
    id: "superflow-sshe",
    label: "SuperFlow / SSHE docs",
    status: /SuperFlow|SSHE/i.test(registryMarkdown) ? "partial" : "missing",
    category: "protocol-reference",
    sourceSpecs: ["04", "07"],
    presentKeys: [],
    missingKeys: ["superflow-sshe"],
    evidence: "No SuperFlow or SSHE source key is registered.",
    nextAction: "Add SuperFlow/SSHE source material or record why it is out of scope before final source-completeness claims.",
  }),
  sourceReq({
    id: "hyperliquid-goldsky",
    label: "Hyperliquid HIP-3 and Goldsky analytics",
    status: keys.has("goldsky") || /Goldsky/i.test(registryMarkdown) ? "complete" : "partial",
    category: "competitive-reference",
    sourceSpecs: ["02", "03", "04", "07"],
    presentKeys: hyperliquidStatus.present,
    missingKeys: [...hyperliquidStatus.missing, "goldsky-analytics-subgraphs"],
    evidence: `${hyperliquidStatus.present.length}/${hyperliquidKeys.length} Hyperliquid source keys registered; Goldsky source remains unregistered.`,
    nextAction: "Register Goldsky analytics/subgraph docs before finalizing the Barometer and HIP-3 data-source argument.",
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
    status: hasGap(gapMarkdown, "G-002") ? "partial" : "missing",
    category: "competitive-reference",
    sourceSpecs: ["07"],
    presentKeys: [],
    missingKeys: ["25-agent-competitive-sweep-report"],
    evidence: hasGap(gapMarkdown, "G-002") ? "G-002 records that the competitive sweep is not complete." : "No competitive-sweep gap is registered.",
    nextAction: "Run or import the competitive sweep before claiming Session 1 research is complete.",
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
