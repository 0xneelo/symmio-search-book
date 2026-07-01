#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { assertCompendiumPageTarget, compendiumTargetFields } from "./compendium-target.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const defaultInput = "/tmp/vibe_docs/Website/public/generated/docs-data.json";
const defaultOutput = path.join(searchBookRoot, "page-manifest.json");
const companionPath = path.join(searchBookRoot, "data", "companion-pages.json");
const sourceBase = "https://0xneelo.github.io/vibe_docs";

const sourcePriority = {
  neeloVision:
    "Primary vision source for narrative, category thesis, market-formation logic, and long-form Vibe argumentation.",
  neeloSection:
    "Section-level expansion from Neelo vision docs; intended for standalone compendium pages with exact source citation.",
  publicProduct: "Primary public product source for current product claims and user-facing mechanics.",
  symmioProtocol:
    "Primary protocol source for PartyA/PartyB, intents, solvers, settlement, margin, and contract concepts.",
  localImplementation:
    "Primary implementation source for current dashboard, revenue, points, and network-volume behavior.",
  competitiveContext: "Primary competitor docs for comparative architecture context.",
};

const expansionRules = [
  ["01_perp_classes_zscore", Infinity, "bootstrap-trilemma and architecture spine"],
  ["02_proof_of_value", Infinity, "information/trade verification thesis"],
  ["03_listing_monopoly", Infinity, "listing-power and token-lifecycle thesis"],
  ["04_ode_to_the_orderbook", Infinity, "order-book completion thesis"],
  ["05_ode_to_the_orderbook_part2", Infinity, "Hyperliquid-facing listing thesis"],
  ["06_usdc_token_perps", Infinity, "USDC versus token-margin economics"],
  ["07_token_margined_issues_perculator", 20, "token-margin risk core sections"],
  ["12_case_study_symm_lp", Infinity, "LP/vault case-study economics"],
  ["13_framework_value_permissionless_perps", Infinity, "proof-of-value economic framework"],
  ["14_information_trade_convergence", Infinity, "verification-layer expansion"],
  ["15_funding_model", 40, "funding model technical spine"],
  ["17_referral_program", Infinity, "referral architecture and incentives"],
].map(([collectionKey, h2Cap, reason]) => ({ collectionKey, h2Cap, reason }));

function parseArgs(argv) {
  const args = {
    input: process.env.VIBE_DOCS_DATA || defaultInput,
    output: defaultOutput,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") args.input = argv[++index];
    else if (arg === "--out") args.output = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node scripts/build-page-manifest.mjs [--input docs-data.json] [--out page-manifest.json]");
      process.exit(0);
    }
    else throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function cleanSummary(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function makeSlug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "page";
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function buildManifest(docsData, companions) {
  const pages = [];
  const collectionsByKey = new Map(docsData.collections.map((collection) => [collection.key, collection]));

  for (const page of docsData.pages) {
    const collection = collectionsByKey.get(page.collectionKey);
    pages.push({
      id: `neelo-${makeSlug(page.id)}`,
      title: page.title,
      section: "vision-papers",
      track: collection ? collection.title : page.collectionSlug,
      sourcePriority: "neeloVision",
      status: "source-mapped",
      sourceKeys: ["vibe-papers"],
      sourceUrls: [`${sourceBase}${page.href}`],
      brief: cleanSummary(page.summary || collection?.summary || ""),
      routeHint: page.href,
      sourcePath: `Docs/public/${page.collectionKey}/${page.relativePath}`,
      granularity: "source-page",
    });
  }

  for (const page of companions) {
    pages.push({
      ...page,
      track: page.track || page.section,
      routeHint: page.routeHint || `/docs/${page.id}`,
      granularity: "companion-page",
    });
  }

  const ruleMap = new Map(expansionRules.map((rule) => [rule.collectionKey, rule]));
  const usedByCollection = new Map();
  const sectionPages = [];

  for (const page of docsData.pages) {
    const rule = ruleMap.get(page.collectionKey);
    if (!rule) continue;

    const already = usedByCollection.get(page.collectionKey) || 0;
    if (already >= rule.h2Cap) continue;

    const remaining = Number.isFinite(rule.h2Cap) ? rule.h2Cap - already : Infinity;
    const collection = collectionsByKey.get(page.collectionKey);
    const h2s = (page.headings || []).filter((heading) => heading.level === 2).slice(0, remaining);
    usedByCollection.set(page.collectionKey, already + h2s.length);

    for (const heading of h2s) {
      sectionPages.push({
        id: `section-${makeSlug(page.id)}-${makeSlug(heading.id || heading.title)}`,
        title: `${page.title}: ${heading.title}`,
        section: "vision-sections",
        track: collection ? collection.title : page.collectionSlug,
        sourcePriority: "neeloSection",
        status: "section-mapped",
        sourceKeys: ["vibe-papers"],
        sourceUrls: [`${sourceBase}${page.href}${heading.id ? `#${heading.id}` : ""}`],
        brief: `Standalone expansion of the source heading "${heading.title}" from ${page.title}.`,
        routeHint: `/docs/${page.collectionSlug}/${page.routeSlug}/${makeSlug(heading.title)}`,
        sourcePath: `Docs/public/${page.collectionKey}/${page.relativePath}`,
        parentPageId: `neelo-${makeSlug(page.id)}`,
        headingLevel: heading.level,
        headingId: heading.id || null,
        expansionReason: rule.reason,
        granularity: "section-page",
      });
    }
  }

  pages.push(...sectionPages);

  const manifest = {
    manifestVersion: "session-1-2026-06-28-500-800-scale",
    compendiumTarget: {
      ...compendiumTargetFields(pages.length),
      strategy:
        "Use Neelo vision docs as the backbone, expand high-value H2 sections into standalone pages, and add public product, Symmio protocol, local dashboard, Linear research, and competitive-context companions.",
    },
    generatedFrom: [
      "0xneelo/vibe_docs Website/public/generated/docs-data.json",
      "public Vibe GitBook docs",
      "public Symmio GitBook docs",
      "local onboarding-app source review",
      "Linear research notes",
    ],
    sourcePriority,
    counts: {
      totalPages: pages.length,
      neeloVisionPages: docsData.pages.length,
      curatedCompanionPages: companions.length,
      neeloSectionPages: sectionPages.length,
      collections: docsData.collections.length,
      byGranularity: countBy(pages, (page) => page.granularity),
      bySourcePriority: countBy(pages, (page) => page.sourcePriority),
    },
    sectionExpansionRules: expansionRules.map((rule) => ({
      collectionKey: rule.collectionKey,
      collectionTitle: collectionsByKey.get(rule.collectionKey)?.title || rule.collectionKey,
      h2Cap: Number.isFinite(rule.h2Cap) ? rule.h2Cap : "all",
      h2Used: usedByCollection.get(rule.collectionKey) || 0,
      reason: rule.reason,
    })),
    collections: docsData.collections.map((collection) => ({
      key: collection.key,
      slug: collection.slug,
      title: collection.title,
      pageCount: collection.pageCount,
      summary: cleanSummary(collection.summary),
      sourceUrl: `${sourceBase}${collection.href}`,
    })),
    pages,
  };

  assertCompendiumPageTarget(pages.length);

  return manifest;
}

const args = parseArgs(process.argv.slice(2));
const docsData = readJson(args.input);
const companionData = readJson(companionPath);
const manifest = buildManifest(docsData, companionData.companions);
fs.writeFileSync(args.output, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify(manifest.counts, null, 2));
