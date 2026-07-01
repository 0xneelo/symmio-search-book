#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  authoredIndex: path.join(searchBookRoot, "data", "authored-pages.json"),
  searchIndex: path.join(searchBookRoot, "data", "search-index.json"),
  outJson: path.join(searchBookRoot, "data", "journeys.json"),
  outJs: path.join(searchBookRoot, "data", "journeys.js"),
};

const journeyDefinitions = [
  {
    id: "new-reader",
    title: "New Reader: Full Thesis",
    audience: "Reader starting from zero",
    entryQuestion: "Explain the whole Vibe x Symmio thesis.",
    promise: "Move from the market-formation problem to intents, solvers, product flow, and the dashboard reference.",
    steps: [
      ["authored-bootstrap-trilemma", "Start with why new perp markets are hard to create."],
      ["authored-proof-of-value", "See why markets become a verification layer in the Vibe thesis."],
      ["authored-listing-monopoly", "Understand why listing control is market power."],
      ["authored-intents-complete-order-books", "Place intents beside order books instead of against them."],
      ["authored-intents-and-solvers", "Learn the mechanism that turns requests into priced trades."],
      ["authored-vibe-trade-flow", "Follow the product path from intent to settlement."],
      ["authored-dashboard-overview", "End where users see revenue, points, invites, and progress."],
    ],
  },
  {
    id: "trader",
    title: "Trader",
    audience: "PartyA, buyer, or active app user",
    entryQuestion: "How does a Vibe trade work and where do I track it?",
    promise: "Focus on the trading flow, Symmio roles, volume, points, and the dashboard surfaces a trader touches.",
    steps: [
      ["authored-vibe-trade-flow", "Start with the user-facing trade lifecycle."],
      ["authored-symmio-party-a-party-b", "Decode PartyA and PartyB before reading protocol pages."],
      ["authored-intents-and-solvers", "Understand who quotes and carries risk."],
      ["authored-dashboard-overview", "Find the status console for a logged-in account."],
      ["authored-dashboard-volume", "Trace how network volume is displayed."],
      ["authored-points-and-vibe-points", "Separate onboarding points from Vibe protocol points."],
    ],
  },
  {
    id: "market-creator",
    title: "HIP-3 Deployer / Market Creator",
    audience: "Project, treasury, foundation, or market launcher",
    entryQuestion: "How can a long-tail token earn a real derivatives market?",
    promise: "Follow the path from listing power and demand discovery to Vibe's role beside HIP-3 and mature order books.",
    steps: [
      ["authored-listing-monopoly", "Frame market access as lifecycle control."],
      ["authored-game-theory-of-listings", "Separate perceived interest from actual market interest."],
      ["authored-bootstrap-trilemma", "See the bootstrap constraint that a new market must solve."],
      ["authored-vibe-as-discovery-layer", "Understand Vibe as upstream discovery for mature venues."],
      ["hyperliquid-hip3", "Compare against builder-deployed perpetual infrastructure."],
      ["authored-dashboard-network", "Connect market formation to network visibility and referrals."],
    ],
  },
  {
    id: "solver-lp",
    title: "Solver / LP",
    audience: "PartyB, market maker, vault LP, or inventory owner",
    entryQuestion: "What risk does the counterparty side carry and how can it be paid?",
    promise: "Move from solver roles into Vibe's architecture thesis, LP profit controls, and token-vault risk framing.",
    steps: [
      ["authored-intents-and-solvers", "Start with the solver mechanism."],
      ["authored-symmio-party-a-party-b", "Map solver language to PartyB responsibilities."],
      ["symmio-solver-role", "Read the Symmio solver role reference."],
      ["authored-vibe-pillars", "Connect bootstrap, defense, and capital efficiency."],
      ["authored-lp-profit-and-dynamic-pricing", "Understand the economic control surface."],
      ["authored-token-vault-perps-versus-usdc-pools", "Compare token-vault risk with generic USDC-pool risk."],
    ],
  },
  {
    id: "researcher",
    title: "Researcher",
    audience: "Protocol researcher, analyst, or reviewer",
    entryQuestion: "What is the deepest vision and what remains unresolved?",
    promise: "Read the strongest Neelo thesis pages, then inspect gaps, open operator decisions, and the living-docs loop.",
    steps: [
      ["authored-proof-of-value", "Start with the information-and-trade thesis."],
      ["authored-truth-markets-no-button", "Inspect the short-side verification argument."],
      ["authored-vibe-pillars", "Read the architecture compression."],
      ["authored-referral-architecture-as-market-formation", "Treat incentives as market-formation design."],
      ["symmio-whitepaper", "Ground the protocol side in Symmio's whitepaper pointer."],
      ["authored-search-insights-loop", "See how the docs capture questions, ratings, and gaps."],
    ],
  },
  {
    id: "dashboard-user",
    title: "Dashboard User",
    audience: "Referrer, onboarding participant, or support reader",
    entryQuestion: "What does each dashboard view mean?",
    promise: "Walk every dashboard view and keep revenue, volume, points, referral depth, and settings semantics separate.",
    steps: [
      ["authored-dashboard-overview", "Start with the dashboard status console."],
      ["authored-dashboard-invites", "Read invite status, masked-code, and follow-up behavior."],
      ["authored-dashboard-network", "Inspect graph/tree network visibility."],
      ["authored-dashboard-volume", "Trace network-volume source and snapshot status."],
      ["authored-dashboard-tasks", "Understand onboarding campaign actions."],
      ["authored-dashboard-faq", "Use the source-backed FAQ alongside the imported Discord/Lafa review queue."],
      ["authored-dashboard-settings", "Close with contact and recovery metadata."],
    ],
  },
];

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--out-js") args.outJs = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node scripts/build-journey-map.mjs [--out-json path] [--out-js path]");
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

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
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

function buildJourney(definition, pagesById) {
  const steps = definition.steps.map(([pageId, why], index) => {
    const page = pagesById.get(pageId);
    return {
      index: index + 1,
      pageId,
      title: page?.title || pageId,
      section: page?.section || "missing",
      track: page?.track || "missing",
      status: page?.status || "missing",
      why,
      sourceKeys: page?.sourceKeys || [],
      missing: !page,
    };
  });
  return {
    id: definition.id,
    title: definition.title,
    audience: definition.audience,
    entryQuestion: definition.entryQuestion,
    promise: definition.promise,
    steps,
  };
}

const args = parseArgs(process.argv.slice(2));
const authoredIndex = readJson(args.authoredIndex);
const searchIndex = readJson(args.searchIndex);
const pagesById = pageMap(authoredIndex, searchIndex);
const journeys = journeyDefinitions.map((definition) => buildJourney(definition, pagesById));
const missingPageIds = journeys.flatMap((journey) =>
  journey.steps.filter((step) => step.missing).map((step) => ({ journeyId: journey.id, pageId: step.pageId })),
);

if (missingPageIds.length) {
  throw new Error(`Unknown journey page ids: ${missingPageIds.map((item) => `${item.journeyId}:${item.pageId}`).join(", ")}`);
}

const payload = {
  generatedAt: "deterministic-build",
  totalJourneys: journeys.length,
  totalSteps: journeys.reduce((sum, journey) => sum + journey.steps.length, 0),
  missingPageIds,
  journeys,
};

ensureDir(path.dirname(args.outJson));
fs.writeFileSync(args.outJson, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(args.outJs, `window.SearchBookJourneys = ${JSON.stringify(payload)};\n`);
console.log(JSON.stringify({ journeys: payload.totalJourneys, steps: payload.totalSteps, missing: payload.missingPageIds.length }, null, 2));
