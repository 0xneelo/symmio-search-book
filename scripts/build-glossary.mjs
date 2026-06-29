#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  sourceRegistry: path.join(searchBookRoot, "SOURCES.md"),
  authoredIndex: path.join(searchBookRoot, "data", "authored-pages.json"),
  searchIndex: path.join(searchBookRoot, "data", "search-index.json"),
  outJson: path.join(searchBookRoot, "data", "glossary.json"),
  outJs: path.join(searchBookRoot, "data", "glossary.js"),
};

const glossaryDefinitions = [
  {
    term: "ADL",
    aliases: ["Auto-deleveraging"],
    category: "Risk",
    definition: "A defensive mechanism for reducing exposure when ordinary margin, liquidation, or insurance controls are not enough.",
    pageIds: ["neelo-15-funding-model-15-docs-09-insurance-adl"],
    sourceKeys: ["vibe-papers"],
  },
  {
    term: "AMFQ",
    aliases: ["aMFQ", "Automated Market for Quotes"],
    category: "Trading Flow",
    definition: "Legacy Vibe naming for the current Intents model. AMFQ/aMFQ expands to Automated Market for Quotes and should translate to intent-based trading in current docs, not a separate live system.",
    pageIds: ["authored-amfq-legacy-intent-naming", "authored-vibe-intent-architecture", "vibe-architecture-amfq"],
    sourceKeys: ["vibe-architecture", "styleguide", "authored-pages"],
  },
  {
    term: "Barometer",
    aliases: ["Goldsky volume upgrade"],
    category: "Data",
    definition: "The planned analytics upgrade that moves network-volume sourcing from the current backend wallet-volume path toward Goldsky-backed subgraph data.",
    pageIds: ["linear-subgraph-volume", "authored-network-volume"],
    sourceKeys: ["syn-200", "spec-03", "authored-pages"],
  },
  {
    term: "Bootstrap trilemma",
    aliases: ["Market bootstrap problem"],
    category: "Market Formation",
    definition: "The Vibe thesis that permissionless listing, capital efficiency, and reliable counterparty guarantees are difficult to satisfy together in a static perp design.",
    pageIds: ["authored-bootstrap-trilemma", "neelo-01-perp-classes-zscore-01-docs-04-bootstrap-trilemma"],
    sourceKeys: ["vibe-papers", "authored-pages"],
  },
  {
    term: "Collateral",
    aliases: ["Margin collateral"],
    category: "Risk",
    definition: "Assets posted to support positions, absorb losses, and keep a position or counterparty account inside its risk requirements.",
    pageIds: ["vibe-collateral-margining", "symmio-core-concepts"],
    sourceKeys: ["vibe-margin", "symmio-core"],
  },
  {
    term: "Cross-margin",
    aliases: ["Cross-market margining"],
    category: "Risk",
    definition: "A margin model where risk is shared across positions or markets instead of being boxed into one isolated market or position.",
    pageIds: ["symmio-core-concepts", "neelo-15-funding-model-15-docs-08-bell-curve-flattening"],
    sourceKeys: ["symmio-core", "vibe-papers"],
  },
  {
    term: "Estimated network revenue",
    aliases: ["Estimated revenue", "Network revenue"],
    category: "Dashboard",
    definition: "The dashboard estimate derived from descendant network volume, configurable fee inputs, and a referrer share; it is not final realized protocol accounting.",
    pageIds: ["authored-estimated-network-revenue", "local-network-revenue", "local-revenue-pulse"],
    sourceKeys: ["local-revenue-doc", "dashboard-revenue-doc", "server-pulse", "spec-03"],
  },
  {
    term: "Funding",
    aliases: ["Funding rate"],
    category: "Economics",
    definition: "A periodic economic adjustment used by perp systems to shape exposure, pricing, and inventory incentives.",
    pageIds: ["vibe-funding", "symmio-funding-rates", "neelo-15-funding-model-15-docs-07-dynamic-pricing"],
    sourceKeys: ["vibe-papers", "symmio-core"],
  },
  {
    term: "Gamma",
    aliases: ["Hyperliquid-native majors phase"],
    category: "Revenue",
    definition: "The phase covering Hyperliquid majors in the current revenue matrix; unlike Symmio-settled venues, this path settles outside Symmio.",
    pageIds: ["authored-estimated-network-revenue", "hyperliquid-hip3"],
    sourceKeys: ["spec-03", "hyperliquid-hip3", "authored-pages"],
  },
  {
    term: "HIP-3",
    aliases: ["Builder-deployed perpetuals"],
    category: "Market Formation",
    definition: "Hyperliquid's builder-deployed perpetuals program, used in the compendium as the comparison point for deployer-owned mature order-book markets.",
    pageIds: ["hyperliquid-hip3", "authored-vibe-as-discovery-layer"],
    sourceKeys: ["hyperliquid-hip3", "authored-pages"],
  },
  {
    term: "Intent",
    aliases: ["Trade intent"],
    category: "Trading Flow",
    definition: "A user's expressed desired trade or action before the final counterparty and execution terms have been accepted.",
    pageIds: ["authored-intents-and-solvers", "symmio-intent-lifecycle", "neelo-02-proof-of-value-02-docs-05-intent-based-architecture"],
    sourceKeys: ["symmio-intent-lifecycle", "vibe-architecture", "vibe-papers", "authored-pages"],
  },
  {
    term: "Isolation",
    aliases: ["Isolated market risk"],
    category: "Risk",
    definition: "A risk boundary that keeps the failure or volatility of one market from automatically mutualizing across unrelated markets or accounts.",
    pageIds: ["authored-token-vault-perps-versus-usdc-pools", "symmio-core-concepts"],
    sourceKeys: ["symmio-core", "vibe-papers", "authored-pages"],
  },
  {
    term: "Liquidation",
    aliases: ["Account health liquidation"],
    category: "Risk",
    definition: "The risk action that closes or reduces an unsafe position or account when its margin no longer satisfies the required safety buffer.",
    pageIds: ["vibe-account-health-liquidations", "symmio-liquidations"],
    sourceKeys: ["vibe-margin", "symmio-core"],
  },
  {
    term: "Listing monopoly",
    aliases: ["Listing control"],
    category: "Market Formation",
    definition: "The control a venue or gatekeeper gains by deciding which token markets earn liquidity, visibility, and a derivatives lifecycle.",
    pageIds: ["authored-listing-monopoly", "neelo-03-listing-monopoly-03-docs-00-abstract"],
    sourceKeys: ["vibe-papers", "authored-pages"],
  },
  {
    term: "Network volume",
    aliases: ["Referral network volume"],
    category: "Dashboard",
    definition: "Trading volume attributed to descendant wallets in a user's referral tree; exact public depth remains an operator-resolved publication question.",
    pageIds: ["authored-network-volume", "local-network-depth", "authored-referral-depth-open-question"],
    sourceKeys: ["server-volume", "server-me", "spec-03", "authored-pages"],
  },
  {
    term: "Onboarding points",
    aliases: ["Campaign points"],
    category: "Rewards",
    definition: "The onboarding app's campaign/accounting points for registration, tasks, and referral activity, separate from Vibe protocol trading points.",
    pageIds: ["authored-points-and-vibe-points", "local-points-engine"],
    sourceKeys: ["server-points", "dashboard-app", "spec-03", "authored-pages"],
  },
  {
    term: "Order book",
    aliases: ["CLOB"],
    category: "Market Formation",
    definition: "A venue model where resting bids and asks form the visible market; the compendium frames order books as mature-market infrastructure that intents can feed.",
    pageIds: ["authored-intents-complete-order-books", "neelo-04-ode-to-the-orderbook-04-docs-02-the-limit-of-order-books"],
    sourceKeys: ["vibe-papers", "authored-pages"],
  },
  {
    term: "PartyA",
    aliases: ["Trader side"],
    category: "Symmio",
    definition: "Symmio's requester or trader side: the party expressing trade demand that a counterparty can quote and accept.",
    pageIds: ["authored-symmio-party-a-party-b", "symmio-core-concepts"],
    sourceKeys: ["symmio-core", "authored-pages"],
  },
  {
    term: "PartyB",
    aliases: ["Solver side", "Counterparty side"],
    category: "Symmio",
    definition: "Symmio's counterparty side: the solver or liquidity provider role that accepts, hedges, monitors, and settles PartyA flow.",
    pageIds: ["authored-symmio-party-a-party-b", "symmio-solver-role"],
    sourceKeys: ["symmio-core", "symmio-intent-lifecycle", "authored-pages"],
  },
  {
    term: "Perpetual",
    aliases: ["Perp"],
    category: "Product",
    definition: "A derivative exposure without a fixed expiry; Vibe and Symmio documentation use perps as the core product context for intent-based derivatives.",
    pageIds: ["vibe-product-what-is", "symmio-what-is", "authored-vibe-trade-flow"],
    sourceKeys: ["vibe-what-is", "symmio-what-is", "authored-pages"],
  },
  {
    term: "Phase A",
    aliases: ["Live revenue estimate phase"],
    category: "Revenue",
    definition: "The live dashboard revenue model: network volume multiplied by platform fee rate and referrer share, using current product data boundaries.",
    pageIds: ["authored-estimated-network-revenue", "local-network-revenue"],
    sourceKeys: ["local-revenue-doc", "dashboard-revenue-doc", "server-pulse", "spec-03"],
  },
  {
    term: "Phase B",
    aliases: ["Designed revenue expansion"],
    category: "Revenue",
    definition: "The planned economics expansion covering spread, liquidations, funding, LP/referral/management splits, settlement costs, rebate tiers, and valuation framing.",
    pageIds: ["linear-phase-b-revenue", "authored-lp-profit-and-dynamic-pricing"],
    sourceKeys: ["syn-203", "spec-03", "authored-pages"],
  },
  {
    term: "Proof of Value",
    aliases: ["PoV"],
    category: "Market Formation",
    definition: "Neelo's thesis that markets can become verification infrastructure where price, liquidity, and participation expose information about value.",
    pageIds: ["authored-proof-of-value", "neelo-02-proof-of-value-02-docs-00-abstract"],
    sourceKeys: ["vibe-papers", "authored-pages"],
  },
  {
    term: "Referral depth",
    aliases: ["Network depth"],
    category: "Rewards",
    definition: "The number of referral levels included in a calculation or display; current evidence conflicts, so final public wording remains parked for operator resolution.",
    pageIds: ["authored-referral-depth-open-question", "local-network-depth", "linear-referral-depth-rollout"],
    sourceKeys: ["server-points", "server-me", "dashboard-faq", "syn-172", "syn-118", "authored-pages"],
  },
  {
    term: "Solver",
    aliases: ["Liquidity provider solver", "Counterparty"],
    category: "Trading Flow",
    definition: "A professional counterparty or routing actor that prices, accepts, hedges, monitors, and settles intent flow.",
    pageIds: ["authored-intents-and-solvers", "symmio-solver-role", "symmio-intent-lifecycle"],
    sourceKeys: ["symmio-core", "symmio-intent-lifecycle", "vibe-architecture", "authored-pages"],
  },
  {
    term: "Spread",
    aliases: ["Bid/ask spread"],
    category: "Economics",
    definition: "The difference or premium in pricing that can compensate liquidity, risk, or inventory provision in the planned economics model.",
    pageIds: ["authored-lp-profit-and-dynamic-pricing", "neelo-15-funding-model-15-docs-07-dynamic-pricing"],
    sourceKeys: ["vibe-papers", "syn-203", "authored-pages"],
  },
  {
    term: "Symmio",
    aliases: ["Intent-based clearing layer"],
    category: "Symmio",
    definition: "The protocol layer and clearing-house model for bilateral, intent-based derivatives between PartyA and PartyB.",
    pageIds: ["symmio-what-is", "authored-symmio-party-a-party-b"],
    sourceKeys: ["symmio-what-is", "symmio-core", "authored-pages"],
  },
  {
    term: "TGE settlement",
    aliases: ["Token generation event settlement"],
    category: "Rewards",
    definition: "The dashboard framing that onboarding points settle at TGE with a multiplier tied to the network's VibeCaps trading volume.",
    pageIds: ["authored-points-and-vibe-points", "authored-dashboard-overview"],
    sourceKeys: ["spec-03", "dashboard-app", "authored-pages"],
  },
  {
    term: "Token-vault perp",
    aliases: ["Token-margined perp"],
    category: "Product",
    definition: "A perp design that uses project or token inventory as the economic base, creating different risks from a generic USDC-pool perp model.",
    pageIds: ["authored-token-vault-perps-versus-usdc-pools", "neelo-06-usdc-token-perps-06-docs-overview"],
    sourceKeys: ["vibe-papers", "authored-pages"],
  },
  {
    term: "Vibe",
    aliases: ["Vibe Trading"],
    category: "Product",
    definition: "The permissionless perps network and discovery layer built around intent-based markets, VibeCaps, referral demand, and Symmio settlement paths.",
    pageIds: ["vibe-product-what-is", "authored-vibe-as-discovery-layer", "authored-vibe-trade-flow"],
    sourceKeys: ["vibe-what-is", "vibe-architecture", "authored-pages"],
  },
  {
    term: "Vibe points",
    aliases: ["Protocol points", "Trading points"],
    category: "Rewards",
    definition: "The public Vibe protocol points earned through trading, referrals, or community participation; keep distinct from onboarding-app points.",
    pageIds: ["authored-points-and-vibe-points", "vibe-points-overview"],
    sourceKeys: ["vibe-points", "spec-03", "authored-pages"],
  },
  {
    term: "VibeCaps",
    aliases: ["Lowcap perps"],
    category: "Product",
    definition: "Vibe's low-cap perpetuals surface, used throughout the reference for margin, volume, and TGE multiplier context.",
    pageIds: ["vibe-vibecaps-margin", "authored-token-vault-perps-versus-usdc-pools"],
    sourceKeys: ["vibe-what-is", "vibe-margin", "authored-pages"],
  },
];

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--out-js") args.outJs = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node src/search-book/scripts/build-glossary.mjs [--out-json path] [--out-js path]");
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function sourceRegistryKeys(markdown) {
  return markdown
    .split("\n")
    .filter((line) => line.trim().startsWith("| `"))
    .map((line) => line.match(/`([^`]+)`/)?.[1])
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

function slug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item) || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function pageMap(authoredIndex, searchIndex) {
  const pages = [...(authoredIndex.pages || []), ...(searchIndex || [])];
  return new Map(
    pages.map((page) => [
      page.id,
      {
        id: page.id,
        title: page.title,
        section: page.section,
        track: page.track,
        status: page.status,
        sourceKeys: page.sourceKeys || [],
      },
    ]),
  );
}

function buildTerm(definition, pagesById, knownSourceKeys) {
  const missingPageIds = definition.pageIds.filter((pageId) => !pagesById.has(pageId));
  const missingSourceKeys = definition.sourceKeys.filter((sourceKey) => !knownSourceKeys.has(sourceKey));
  const pages = definition.pageIds.map((pageId) => pagesById.get(pageId)).filter(Boolean);
  return {
    id: `term-${slug(definition.term)}`,
    term: definition.term,
    aliases: definition.aliases || [],
    category: definition.category,
    definition: definition.definition,
    pageIds: definition.pageIds,
    pages,
    primaryPageId: definition.pageIds[0],
    sourceKeys: definition.sourceKeys,
    missingPageIds,
    missingSourceKeys,
  };
}

const args = parseArgs(process.argv.slice(2));
const authoredIndex = readJson(args.authoredIndex);
const searchIndex = readJson(args.searchIndex);
const registryMarkdown = readText(args.sourceRegistry);
const pagesById = pageMap(authoredIndex, searchIndex);
const knownSourceKeys = new Set(sourceRegistryKeys(registryMarkdown));
const terms = glossaryDefinitions
  .map((definition) => buildTerm(definition, pagesById, knownSourceKeys))
  .sort((a, b) => a.term.localeCompare(b.term));
const duplicateIds = terms.map((term) => term.id).filter((id, index, ids) => ids.indexOf(id) !== index);
const missingPageIds = terms.flatMap((term) => term.missingPageIds.map((pageId) => ({ term: term.term, pageId })));
const missingSourceKeys = terms.flatMap((term) => term.missingSourceKeys.map((sourceKey) => ({ term: term.term, sourceKey })));

if (duplicateIds.length) throw new Error(`Duplicate glossary ids: ${[...new Set(duplicateIds)].join(", ")}`);
if (missingPageIds.length) throw new Error(`Glossary terms point at unknown pages: ${missingPageIds.map((item) => `${item.term} -> ${item.pageId}`).join("; ")}`);
if (missingSourceKeys.length) throw new Error(`Glossary terms point at unknown source keys: ${missingSourceKeys.map((item) => `${item.term} -> ${item.sourceKey}`).join("; ")}`);

const alphabet = terms.reduce((acc, term) => {
  const letter = term.term[0].toUpperCase();
  if (!acc[letter]) acc[letter] = [];
  acc[letter].push(term.id);
  return acc;
}, {});

const payload = {
  generatedAt: "deterministic-build",
  totalTerms: terms.length,
  byCategory: countBy(terms, (term) => term.category),
  alphabet,
  missingPageIds,
  missingSourceKeys,
  terms,
};

ensureDir(path.dirname(args.outJson));
fs.writeFileSync(args.outJson, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(args.outJs, `window.SearchBookGlossary = ${JSON.stringify(payload)};\n`);
console.log(JSON.stringify({ terms: payload.totalTerms, categories: Object.keys(payload.byCategory).length, missingPages: missingPageIds.length, missingSources: missingSourceKeys.length }, null, 2));
