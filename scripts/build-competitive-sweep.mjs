#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  outJson: path.join(searchBookRoot, "data", "competitive-sweep.json"),
  outJs: path.join(searchBookRoot, "data", "competitive-sweep.js"),
};

const rubric = [
  {
    id: "front-door",
    label: "Front door",
    question: "Does the docs home start from reader questions, product jobs, or a generic nav tree?",
  },
  {
    id: "ia",
    label: "Information architecture",
    question: "How clearly does it separate narrative, reference, API/protocol material, and operations?",
  },
  {
    id: "search",
    label: "Search and exact routing",
    question: "Can a reader ask or search and land on the exact page or paragraph they need?",
  },
  {
    id: "sources",
    label: "Source and version trust",
    question: "Does the docs surface versions, source repos, generated references, changelog, or citations?",
  },
  {
    id: "risk",
    label: "Risk and economics",
    question: "Does it explain risk, incentives, fees, and economic assumptions without hiding complexity?",
  },
  {
    id: "journeys",
    label: "Guided journeys",
    question: "Does it guide distinct reader roles through a practical sequence?",
  },
  {
    id: "feedback",
    label: "Living-docs loop",
    question: "Can users rate answers, report gaps, or make repeated questions visible to maintainers?",
  },
  {
    id: "borrow",
    label: "Borrowable pattern",
    question: "What pattern should Vibe x Symmio borrow, adapt, or deliberately avoid?",
  },
];

const lanes = [
  {
    id: "lane-01",
    batch: "batch-01",
    status: "assigned",
    focus: "Perps venue docs",
    targets: [
      ["hyperliquid-docs", "Hyperliquid Docs", "Derivatives", "https://hyperliquid.gitbook.io/hyperliquid-docs/", "HIP-3 and venue-level perps framing."],
      ["dydx-docs", "dYdX Docs", "Derivatives", "https://docs.dydx.xyz/", "Perps protocol and exchange reference architecture."],
    ],
  },
  {
    id: "lane-02",
    batch: "batch-01",
    status: "assigned",
    focus: "Perps product docs",
    targets: [
      ["gmx-docs", "GMX Docs", "Derivatives", "https://docs.gmx.io/", "GMX product/risk and liquidity docs."],
      ["jupiter-docs", "Jupiter Docs", "Derivatives", "https://dev.jup.ag/docs", "Developer-first trading/aggregation docs."],
    ],
  },
  {
    id: "lane-03",
    batch: "batch-01",
    status: "assigned",
    focus: "Perps and derivatives UX",
    targets: [
      ["drift-docs", "Drift Docs", "Derivatives", "https://docs.drift.trade/", "Solana perps and market-making docs."],
      ["synthetix-docs", "Synthetix Docs", "Derivatives", "https://docs.synthetix.io/", "Derivatives liquidity and protocol references."],
    ],
  },
  {
    id: "lane-04",
    batch: "batch-01",
    status: "assigned",
    focus: "Options venues",
    targets: [
      ["derive-docs", "Derive Docs", "Options", "https://docs.derive.xyz/", "Options/perps product docs and risk explanation."],
      ["aevo-docs", "Aevo Docs", "Options", "https://docs.aevo.xyz/", "Options exchange docs and user onboarding."],
    ],
  },
  {
    id: "lane-05",
    batch: "batch-01",
    status: "assigned",
    focus: "Options protocols",
    targets: [
      ["opyn-docs", "Opyn Docs", "Options", "https://opyn.gitbook.io/opyn/", "Options protocol and vault primitives."],
      ["premia-docs", "Premia Docs", "Options", "https://docs.premia.finance/", "Options trading/liquidity docs."],
    ],
  },
  {
    id: "lane-06",
    batch: "batch-01",
    status: "assigned",
    focus: "Core DeFi references",
    targets: [
      ["uniswap-docs", "Uniswap Docs", "DeFi", "https://docs.uniswap.org/", "Reference-heavy DeFi docs and developer IA."],
      ["aave-docs", "Aave Docs", "DeFi", "https://aave.com/docs", "Risk, governance, and product-reference docs."],
    ],
  },
  {
    id: "lane-07",
    batch: "batch-01",
    status: "assigned",
    focus: "Stablecoin and AMM docs",
    targets: [
      ["sky-docs", "Sky Docs", "DeFi", "https://docs.sky.money/", "Economic system and governance docs."],
      ["curve-docs", "Curve Docs", "DeFi", "https://docs.curve.finance/", "AMM, pool, and liquidity-provider references."],
    ],
  },
  {
    id: "lane-08",
    batch: "batch-01",
    status: "assigned",
    focus: "Liquidity protocol docs",
    targets: [
      ["balancer-docs", "Balancer Docs", "DeFi", "https://docs.balancer.fi/", "Pool mechanics and developer references."],
      ["pendle-docs", "Pendle Docs", "DeFi", "https://docs.pendle.finance/", "Yield-market education and product docs."],
    ],
  },
  {
    id: "lane-09",
    batch: "batch-01",
    status: "assigned",
    focus: "Yield and staking docs",
    targets: [
      ["ethena-docs", "Ethena Docs", "DeFi", "https://docs.ethena.fi/", "Risk/economic model docs for synthetic-dollar products."],
      ["lido-docs", "Lido Docs", "DeFi", "https://docs.lido.fi/", "Staking protocol docs and operational references."],
    ],
  },
  {
    id: "lane-10",
    batch: "batch-01",
    status: "assigned",
    focus: "Lending and intent settlement docs",
    targets: [
      ["morpho-docs", "Morpho Docs", "DeFi", "https://docs.morpho.org/", "Lending-market docs and risk framing."],
      ["cow-docs", "CoW Protocol Docs", "Intents", "https://docs.cow.fi/", "Intent/order-flow docs and solver framing."],
    ],
  },
  {
    id: "lane-11",
    batch: "batch-01",
    status: "assigned",
    focus: "Ethereum and Solana docs",
    targets: [
      ["ethereum-docs", "Ethereum Developer Docs", "Infrastructure", "https://ethereum.org/developers/docs/", "Concept-first developer education."],
      ["solana-docs", "Solana Docs", "Infrastructure", "https://solana.com/docs", "Developer onboarding and protocol references."],
    ],
  },
  {
    id: "lane-12",
    batch: "batch-01",
    status: "assigned",
    focus: "L2 docs",
    targets: [
      ["base-docs", "Base Docs", "Infrastructure", "https://docs.base.org/", "Builder docs and network onboarding."],
      ["arbitrum-docs", "Arbitrum Docs", "Infrastructure", "https://docs.arbitrum.io/", "L2 architecture and developer references."],
    ],
  },
  {
    id: "lane-13",
    batch: "batch-01",
    status: "assigned",
    focus: "Rollup ecosystem docs",
    targets: [
      ["optimism-docs", "Optimism Docs", "Infrastructure", "https://docs.optimism.io/", "Superchain docs and operational references."],
      ["polygon-docs", "Polygon Docs", "Infrastructure", "https://docs.polygon.technology/", "Protocol and chain developer docs."],
    ],
  },
  {
    id: "lane-14",
    batch: "batch-01",
    status: "assigned",
    focus: "Chain platform docs",
    targets: [
      ["avalanche-docs", "Avalanche Docs", "Infrastructure", "https://build.avax.network/docs", "Builder docs and subnet/L1 references."],
      ["cosmos-docs", "Cosmos SDK Docs", "Infrastructure", "https://docs.cosmos.network/", "SDK/concept docs and modular IA."],
    ],
  },
  {
    id: "lane-15",
    batch: "batch-01",
    status: "assigned",
    focus: "Modular and Move docs",
    targets: [
      ["celestia-docs", "Celestia Docs", "Infrastructure", "https://docs.celestia.org/", "Modular stack education and developer docs."],
      ["sui-docs", "Sui Docs", "Infrastructure", "https://docs.sui.io/", "Move/object-model docs and onboarding."],
    ],
  },
  {
    id: "lane-16",
    batch: "batch-01",
    status: "assigned",
    focus: "Oracle docs",
    targets: [
      ["chainlink-docs", "Chainlink Docs", "Data", "https://docs.chain.link/", "Oracle/data-feed docs and risk/source framing."],
      ["pyth-docs", "Pyth Docs", "Data", "https://docs.pyth.network/", "Price-feed docs and integration references."],
    ],
  },
  {
    id: "lane-17",
    batch: "batch-01",
    status: "assigned",
    focus: "Indexing docs",
    targets: [
      ["the-graph-docs", "The Graph Docs", "Data", "https://thegraph.com/docs/", "Subgraph/indexing education and reference docs."],
      ["goldsky-docs", "Goldsky Docs", "Data", "https://docs.goldsky.com/", "Subgraph and data-pipeline docs."],
    ],
  },
  {
    id: "lane-18",
    batch: "batch-01",
    status: "assigned",
    focus: "Interop docs",
    targets: [
      ["layerzero-docs", "LayerZero Docs", "Interoperability", "https://docs.layerzero.network/", "Cross-chain messaging docs."],
      ["wormhole-docs", "Wormhole Docs", "Interoperability", "https://wormhole.com/docs/", "Cross-chain protocol docs."],
    ],
  },
  {
    id: "lane-19",
    batch: "batch-01",
    status: "assigned",
    focus: "Developer operations docs",
    targets: [
      ["tenderly-docs", "Tenderly Docs", "Developer Tools", "https://docs.tenderly.co/", "Debugging/monitoring docs and operational flows."],
      ["alchemy-docs", "Alchemy Docs", "Developer Tools", "https://www.alchemy.com/docs", "API docs, recipes, and developer onboarding."],
    ],
  },
  {
    id: "lane-20",
    batch: "batch-01",
    status: "assigned",
    focus: "Node and app tooling docs",
    targets: [
      ["quicknode-docs", "QuickNode Docs", "Developer Tools", "https://www.quicknode.com/docs", "RPC/API docs and recipes."],
      ["thirdweb-docs", "Thirdweb Docs", "Developer Tools", "https://portal.thirdweb.com/", "App-builder docs and quickstarts."],
    ],
  },
  {
    id: "lane-21",
    batch: "batch-01",
    status: "assigned",
    focus: "Wallet platform docs",
    targets: [
      ["coinbase-developer-docs", "Coinbase Developer Docs", "Product", "https://docs.cdp.coinbase.com/", "Product/developer docs and platform IA."],
      ["coinbase-wallet-docs", "Coinbase Wallet Docs", "Product", "https://docs.cdp.coinbase.com/wallets/non-custodial-wallets/overview", "Current wallet onboarding and account docs after the older wallet entry moved."],
    ],
  },
  {
    id: "lane-22",
    batch: "batch-01",
    status: "assigned",
    focus: "Social/account docs",
    targets: [
      ["farcaster-docs", "Farcaster Docs", "Product", "https://docs.farcaster.xyz/", "Social protocol and app docs."],
      ["safe-docs", "Safe Docs", "Product", "https://docs.safe.global/", "Smart-account docs and operational references."],
    ],
  },
  {
    id: "lane-23",
    batch: "batch-01",
    status: "assigned",
    focus: "Embedded wallet docs",
    targets: [
      ["privy-docs", "Privy Docs", "Product", "https://docs.privy.io/", "Auth/wallet onboarding docs."],
      ["dynamic-docs", "Dynamic Docs", "Product", "https://docs.dynamic.xyz/", "Wallet/account onboarding docs."],
    ],
  },
  {
    id: "lane-24",
    batch: "batch-01",
    status: "assigned",
    focus: "Wallet connection docs",
    targets: [
      ["walletconnect-docs", "WalletConnect Docs", "Product", "https://docs.walletconnect.network/", "Wallet connection and app integration docs."],
      ["rainbowkit-docs", "RainbowKit Docs", "Product", "https://rainbowkit.com/docs/introduction", "Wallet connection quickstart docs."],
    ],
  },
  {
    id: "lane-25",
    batch: "batch-01",
    status: "assigned",
    focus: "Frontend web3 docs",
    targets: [
      ["wagmi-docs", "Wagmi Docs", "Developer Tools", "https://wagmi.sh/react/getting-started", "React/web3 integration docs."],
      ["viem-docs", "Viem Docs", "Developer Tools", "https://viem.sh/docs/getting-started", "Typed Ethereum client docs."],
    ],
  },
];

const preliminaryPatterns = [
  {
    id: "question-first",
    title: "Question-first docs remain rare",
    implication: "Vibe x Symmio can differentiate by making the answer engine the front door instead of burying search in a sidebar.",
  },
  {
    id: "risk-economics",
    title: "Risk and economics need first-class treatment",
    implication: "Derivatives docs often split product actions from risk/economic assumptions; the compendium should keep those threads connected.",
  },
  {
    id: "role-journeys",
    title: "Role journeys beat generic nav for complex protocols",
    implication: "Separate paths for traders, solvers, LPs, projects, and researchers should remain core IA, not decorative landing copy.",
  },
  {
    id: "source-trust",
    title: "Version and source trust are a competitive surface",
    implication: "Generated reference, GitHub-linked sources, and source-status badges matter for institutional readers.",
  },
  {
    id: "living-loop",
    title: "Most docs do not expose the improvement loop",
    implication: "Ratings, unanswered questions, and gap queues can be an actual product advantage if they are visible and maintained.",
  },
];

const completedExplorerBatches = [
  {
    id: "explorer-a-derivatives",
    label: "Derivatives and options docs",
    agentPath: "019f0ca9-d005-75b1-b4b1-e2ecf26aca00",
    laneIds: ["lane-01", "lane-02", "lane-03", "lane-04", "lane-05"],
    reviewedTargetIds: [
      "hyperliquid-docs",
      "dydx-docs",
      "gmx-docs",
      "jupiter-docs",
      "drift-docs",
      "synthetix-docs",
      "derive-docs",
      "aevo-docs",
      "premia-docs",
    ],
    unverifiedTargetIds: ["opyn-docs"],
    summary: "Benchmarked official/public derivatives docs. Opyn's official GitBook was blocked to the crawl, so no mirrors or third-party snippets were used.",
    takeaways: [
      "Use a cited answer-engine front door with role/task routing and clear action boundaries.",
      "Publish AI-consumable docs surfaces such as llms.txt, full markdown, raw page markdown, and exact-page citations.",
      "Make derivatives risk a first-class lane: margin, collateral haircuts, liquidation, funding, oracle, solver exposure, and settlement failure modes.",
      "Explain market creation from intent to quote, fill, vault inventory, solver pricing, and Symmio settlement.",
      "Ship page feedback, last-updated metadata, edit links, changelog, and unanswered-search review.",
    ],
  },
  {
    id: "explorer-b-defi",
    label: "Core DeFi protocol docs",
    agentPath: "019f0ca9-fb04-7c50-9e65-fff016693030",
    laneIds: ["lane-06", "lane-07", "lane-08", "lane-09", "lane-10"],
    reviewedTargetIds: [
      "uniswap-docs",
      "aave-docs",
      "sky-docs",
      "curve-docs",
      "balancer-docs",
      "pendle-docs",
      "ethena-docs",
      "lido-docs",
      "morpho-docs",
      "cow-docs",
    ],
    unverifiedTargetIds: [],
    summary: "Reviewed major DeFi references for source trust, risk taxonomy, economic primitives, dashboards, and role lanes.",
    takeaways: [
      "Use source-cited reference pages with canonical source links, LLM files, edit links, and page-level source status.",
      "Give protocol risk a taxonomy with categories, mitigations, and affected user roles.",
      "Document formulas and worked examples for intents, solver competition, vault inventory, premiums, funding, settlement, liquidation, and fees.",
      "Connect user docs to live positions, dashboards, addresses, APIs, and operational flows.",
      "Separate glossary and navigation by treasury/foundation, solver/MM, vault LP, PartyA buyer, and developer/integrator.",
    ],
  },
  {
    id: "explorer-c-infrastructure",
    label: "L1/L2 and infrastructure docs",
    agentPath: "019f0caa-2848-70d0-b37f-762d68d97d26",
    laneIds: ["lane-11", "lane-12", "lane-13", "lane-14", "lane-15"],
    reviewedTargetIds: [
      "ethereum-docs",
      "solana-docs",
      "base-docs",
      "arbitrum-docs",
      "optimism-docs",
      "polygon-docs",
      "avalanche-docs",
      "cosmos-docs",
      "celestia-docs",
      "sui-docs",
    ],
    unverifiedTargetIds: [],
    summary: "Reviewed chain and infrastructure docs for concept-first education, reference structure, first-run paths, and AI-readable docs packaging.",
    takeaways: [
      "Use two-layer IA: front door by actor/job, then reference by object.",
      "Explain intents, covered-call inventory, solver pricing, collateral, settlement, and failure modes before API recipes.",
      "Maintain a canonical networks, contracts, and endpoints reference with chain IDs, RPCs, explorers, contracts, finality, and limits.",
      "Ship first-run paths for signing an intent, quoting as a solver, depositing vault inventory, and settling through Symmio.",
      "Expose llms.txt, page markdown, copy-page markdown, MCP/search, and page-level answer citations.",
    ],
  },
  {
    id: "explorer-d-data-devtools",
    label: "Data, oracle, indexing, and devtool docs",
    agentPath: "019f0caa-5de9-7181-9f94-2ca3f817edfc",
    laneIds: ["lane-16", "lane-17", "lane-18", "lane-19", "lane-20"],
    reviewedTargetIds: [
      "chainlink-docs",
      "pyth-docs",
      "the-graph-docs",
      "goldsky-docs",
      "layerzero-docs",
      "wormhole-docs",
      "tenderly-docs",
      "alchemy-docs",
      "quicknode-docs",
      "thirdweb-docs",
    ],
    unverifiedTargetIds: [],
    summary: "Reviewed data, oracle, indexing, interoperability, and developer tooling docs for source-data clarity and operational trust.",
    takeaways: [
      "Document every oracle, quote, vault metric, settlement state, and derived analytic with owner, cadence, fallback, and risk.",
      "Separate raw RPC, indexed APIs, subgraphs, streams, pipeline status, schema, start blocks, reorg assumptions, lag SLAs, and runbooks.",
      "Distinguish oracle data, solver quotes, settlement state, and derived analytics by responsibility and risk.",
      "Expose raw markdown, LLM indexes, GitHub source/edit links, last-updated metadata, and page feedback.",
      "Add operational docs for stale oracle data, failed solvers, stuck settlement, vault exhaustion, indexer lag, alerts, and incidents.",
    ],
  },
  {
    id: "explorer-e-product-wallet",
    label: "Product, wallet, and app docs",
    agentPath: "019f0caa-8a76-7102-bb15-5aac04d75c61",
    laneIds: ["lane-21", "lane-22", "lane-23", "lane-24", "lane-25"],
    reviewedTargetIds: [
      "coinbase-developer-docs",
      "coinbase-wallet-docs",
      "farcaster-docs",
      "safe-docs",
      "privy-docs",
      "dynamic-docs",
      "walletconnect-docs",
      "rainbowkit-docs",
      "wagmi-docs",
      "viem-docs",
    ],
    unverifiedTargetIds: [],
    summary: "Reviewed product, wallet, account, auth, and app-integration docs for onboarding patterns and user-state failure modes.",
    takeaways: [
      "Use a job-based front door: trade intent, fund vault, solve flow, settle on Symmio, debug wallet/account.",
      "Define wallet, account, signer, owner, delegate, policy, session, custody, and settlement account once.",
      "Build support FAQ pages around real failure modes: invalid signature, wrong chain, no solver fill, expired quote, rejected settlement, and wallet session mismatch.",
      "Start with product flows, then reveal protocol mechanics, contract/API references, and solver/operator docs.",
      "Borrow AI affordances from product docs, but require every answer to cite exact source pages, contract references, FAQs, and product routes.",
    ],
  },
];

const reviewedTargetIds = new Set(completedExplorerBatches.flatMap((batch) => batch.reviewedTargetIds));
const unverifiedTargetIds = new Set(completedExplorerBatches.flatMap((batch) => batch.unverifiedTargetIds));
const completedLaneIds = new Set(completedExplorerBatches.flatMap((batch) => batch.laneIds));

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--out-js") args.outJs = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node src/search-book/scripts/build-competitive-sweep.mjs [--out-json path] [--out-js path]");
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item) || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

const args = parseArgs(process.argv.slice(2));
const targets = lanes.flatMap((lane) =>
  lane.targets.map(([id, name, category, url, relevance]) => ({
    id,
    name,
    category,
    url,
    relevance,
    laneId: lane.id,
    laneFocus: lane.focus,
    batch: lane.batch,
    status: reviewedTargetIds.has(id) ? "reviewed" : unverifiedTargetIds.has(id) ? "unverified-access-gap" : lane.status,
  })),
);

const lanePayload = lanes.map(({ targets: laneTargets, ...lane }) => {
  const targetIds = laneTargets.map(([id]) => id);
  const laneReviewedTargets = targetIds.filter((id) => reviewedTargetIds.has(id));
  const laneUnverifiedTargets = targetIds.filter((id) => unverifiedTargetIds.has(id));
  const status = laneUnverifiedTargets.length
    ? "completed-with-access-gap"
    : laneReviewedTargets.length === targetIds.length
      ? "completed"
      : completedLaneIds.has(lane.id)
        ? "completed-with-unreviewed-target"
        : lane.status;
  return {
    ...lane,
    status,
    targetIds,
    targetDocs: targetIds.length,
    reviewedTargetDocs: laneReviewedTargets.length,
    unverifiedTargetDocs: laneUnverifiedTargets.length,
  };
});

const payload = {
  generatedAt: "deterministic-build",
  status: "competitive-sweep-batch-01",
  plannedAgentLanes: lanes.length,
  activeExplorerBatches: 0,
  completedExplorerBatches: completedExplorerBatches.length,
  actualSubAgentsCompleted: completedExplorerBatches.length,
  completedLaneReviews: completedLaneIds.size,
  targetDocs: targets.length,
  targetDocsReviewed: reviewedTargetIds.size,
  targetDocsUnverified: unverifiedTargetIds.size,
  targetDocsExcluded: 1,
  excludedTargetIds: ["opyn-docs"],
  completionReady: true,
  completionStatusReason: "The official-docs batch has an authored synthesis page. Opyn remains 1/50 unreviewed from official docs, but the operator excluded Opyn because it shut down, so the launch benchmark is complete at 49/50 with the exclusion documented.",
  authoredSynthesisPageId: "authored-competitive-docs-benchmark",
  completionCriteria: {
    requiredAgentLanes: 25,
    requiredTargetDocs: 50,
    requiredReviewedOrExcludedDocs: 50,
    requiredSynthesis: "A sourced synthesis that compares front door, IA, search, citations, journeys, risk/economics, and living-docs loops.",
  },
  rubric,
  lanes: lanePayload,
  targets,
  explorerBatches: completedExplorerBatches,
  blockedTargets: targets
    .filter((target) => unverifiedTargetIds.has(target.id))
    .map((target) => ({
      id: target.id,
      name: target.name,
      url: target.url,
      reason: "Official URL could not be crawled by the research agent; mirrors and third-party snippets were intentionally not used.",
    })),
  byCategory: countBy(targets, (target) => target.category),
  byStatus: countBy(targets, (target) => target.status),
  preliminaryPatterns,
  synthesisFindings: [
    {
      id: "ai-readable-source-trust",
      title: "AI-readable source trust is now table stakes",
      implication: "Publish llms.txt, full markdown, raw page markdown, copy-page affordances, edit/source links, and exact citations so both humans and answer engines can verify claims.",
      evidenceTargetIds: ["jupiter-docs", "coinbase-developer-docs", "privy-docs", "dynamic-docs", "synthetix-docs", "gmx-docs"],
    },
    {
      id: "job-first-front-door",
      title: "Job-first routing beats broad protocol navigation",
      implication: "The compendium should open with role and task paths for PartyA buyers, solvers/MMs, vault LPs, treasuries, integrators, and account-support users.",
      evidenceTargetIds: ["dydx-docs", "gmx-docs", "farcaster-docs", "walletconnect-docs", "ethereum-docs", "solana-docs"],
    },
    {
      id: "risk-economic-primitives",
      title: "Risk and economics need formulas plus failure modes",
      implication: "Margin, collateral, funding, liquidation, solver exposure, quote expiry, vault exhaustion, stale data, and settlement failure pages should be first-class, with formulas and worked examples.",
      evidenceTargetIds: ["synthetix-docs", "gmx-docs", "drift-docs", "aave-docs", "ethena-docs", "chainlink-docs", "pyth-docs"],
    },
    {
      id: "data-lineage",
      title: "Data lineage is part of product trust",
      implication: "Every oracle, quote, vault metric, settlement state, and derived dashboard analytic needs owner, freshness, fallback, finality, and source-status metadata.",
      evidenceTargetIds: ["chainlink-docs", "pyth-docs", "the-graph-docs", "goldsky-docs", "tenderly-docs", "alchemy-docs"],
    },
    {
      id: "living-docs-visible-loop",
      title: "The living-docs loop should be visible",
      implication: "Helpful/not-helpful ratings, gap queues, issue/edit links, last-updated stamps, changelogs, and unanswered-search review can become a trust advantage instead of an internal process.",
      evidenceTargetIds: ["drift-docs", "premia-docs", "safe-docs", "rainbowkit-docs", "wagmi-docs", "viem-docs"],
    },
  ],
};

ensureDir(path.dirname(args.outJson));
fs.writeFileSync(args.outJson, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(args.outJs, `window.SearchBookCompetitiveSweep = ${JSON.stringify(payload)};\n`);
console.log(
  JSON.stringify(
    {
      lanes: payload.plannedAgentLanes,
      targets: payload.targetDocs,
      reviewed: payload.targetDocsReviewed,
      unverified: payload.targetDocsUnverified,
      completedExplorerBatches: payload.completedExplorerBatches,
      categories: Object.keys(payload.byCategory).length,
    },
    null,
    2,
  ),
);
