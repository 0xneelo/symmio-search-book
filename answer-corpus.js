/* Throwaway prototype data. Production ingestion should read page-manifest.json and authored page bodies. */
(function () {
  const manifestStats = {
    totalPages: 794,
    neeloVisionPages: 188,
    neeloSectionPages: 541,
    companionPages: 65,
    targetRange: "500-800",
  };

  const pages = [
    {
      id: "neelo-bootstrap-trilemma",
      title: "Bootstrap Trilemma",
      section: "Vision",
      route: "page-manifest.json#section-neelo-01-perp-classes-zscore-01-docs-04-bootstrap-trilemma",
      summary:
        "Vibe's market-formation thesis starts from the constraint that permissionless listing, capital efficiency, and reliable counterparty guarantees are hard to combine in one static perp architecture.",
      sources: ["vibe-papers"],
      keywords: ["bootstrap", "trilemma", "permissionless", "capital efficiency", "counterparty", "market creation"],
    },
    {
      id: "neelo-proof-of-value",
      title: "Proof of Value",
      section: "Vision",
      route: "page-manifest.json#neelo-02-proof-of-value-02-docs-overview",
      summary:
        "Neelo's Proof of Value arc frames markets as verification infrastructure where price, liquidity, and participation become signals in an information-heavy internet.",
      sources: ["vibe-papers"],
      keywords: ["proof of value", "verification", "information", "trade", "market cap", "truth"],
    },
    {
      id: "neelo-listing-monopoly",
      title: "Listing Monopoly",
      section: "Vision",
      route: "page-manifest.json#neelo-03-listing-monopoly-03-docs-overview",
      summary:
        "The listing-monopoly thesis treats control over token lifecycle gates as a core source of crypto market power.",
      sources: ["vibe-papers"],
      keywords: ["listing", "monopoly", "token lifecycle", "market power", "launch", "liquidity"],
    },
    {
      id: "neelo-orderbooks",
      title: "Order Books And Vibe",
      section: "Vision",
      route: "page-manifest.json#neelo-04-ode-to-the-orderbook-04-docs-overview",
      summary:
        "The order-book thesis is complementary: order books remain the mature-market end state, while Vibe helps markets bootstrap toward that state.",
      sources: ["vibe-papers"],
      keywords: ["order book", "clob", "bootstrap", "rfq", "hyperliquid", "market lifecycle"],
    },
    {
      id: "neelo-funding-model",
      title: "Funding Model",
      section: "Vision",
      route: "page-manifest.json#neelo-15-funding-model-15-docs-funding-rate-model",
      summary:
        "The funding model chapter is the technical spine for low-cap perps, dynamic pricing, utilization modes, insurance, ADL, and defensive controls.",
      sources: ["vibe-papers"],
      keywords: ["funding", "spread", "borrow", "insurance", "adl", "low cap", "dynamic pricing"],
    },
    {
      id: "neelo-referral-architecture",
      title: "Referral Architecture",
      section: "Vision",
      route: "page-manifest.json#neelo-17-referral-program-17-docs-overview",
      summary:
        "The referral layer should be documented as incentives and market formation infrastructure, not only as growth copy.",
      sources: ["vibe-papers"],
      keywords: ["referral", "incentives", "packs", "artifact", "network", "market formation"],
    },
    {
      id: "vibe-what-is",
      title: "What Is Vibe Trading?",
      section: "Product",
      route: "page-manifest.json#vibe-product-what-is",
      summary:
        "Vibe public docs position Vibe as a perpetuals DEX with broad market coverage and permissionless lowcap perp listings.",
      sources: ["vibe-what-is"],
      keywords: ["vibe", "perpetuals dex", "lowcap", "market coverage", "vibecaps"],
    },
    {
      id: "vibe-amfq",
      title: "Vibe AMFQ Architecture",
      section: "Architecture",
      route: "page-manifest.json#vibe-architecture-amfq",
      summary:
        "Vibe describes an intent-based quotation flow: traders express a goal, solvers stream offers, and accepted trades proceed to on-chain execution.",
      sources: ["vibe-architecture"],
      keywords: ["amfq", "rfq", "intent", "solver", "quote", "on-chain execution"],
    },
    {
      id: "vibecaps-margin",
      title: "VibeCaps Margin",
      section: "Risk",
      route: "page-manifest.json#vibe-vibecaps-margin",
      summary:
        "Adding margin increases the collateral cushion and moves liquidation farther away; removing margin frees balance but reduces the safety buffer.",
      sources: ["vibe-margin"],
      keywords: ["margin", "vibecaps", "liquidation", "collateral", "risk", "virtual account"],
    },
    {
      id: "vibe-points",
      title: "Vibe Points",
      section: "Rewards",
      route: "page-manifest.json#vibe-points-overview",
      summary:
        "Public Vibe docs describe three point categories before TGE: trading, referring, and community participation.",
      sources: ["vibe-points"],
      keywords: ["points", "trading points", "referring", "community", "tge", "rewards"],
    },
    {
      id: "vibe-referral-program",
      title: "Referral Program",
      section: "Rewards",
      route: "page-manifest.json#vibe-referral-program",
      summary:
        "Public Vibe docs describe referral commission on aggregated 30-day referred volume and daily pre-TGE points for referred active wallets.",
      sources: ["vibe-referral-program"],
      keywords: ["referral", "commission", "30 day volume", "pre-tge", "active wallets"],
    },
    {
      id: "symmio-what-is",
      title: "What Is Symmio?",
      section: "Protocol",
      route: "page-manifest.json#symmio-what-is",
      summary:
        "Symmio is a hybrid clearing-house and settlement layer for permissionless derivatives, using off-chain pricing with on-chain collateral, positions, and settlement.",
      sources: ["symmio-what-is"],
      keywords: ["symmio", "clearing house", "settlement", "permissionless derivatives", "off-chain pricing"],
    },
    {
      id: "party-a-party-b",
      title: "PartyA And PartyB",
      section: "Protocol",
      route: "page-manifest.json#symmio-core-concepts",
      summary:
        "In Symmio terms, PartyA is the trader creating the intent; PartyB is the solver or hedger that accepts the other side.",
      sources: ["symmio-core"],
      keywords: ["party a", "partya", "party b", "partyb", "solver", "hedger", "counterparty"],
    },
    {
      id: "intent-lifecycle",
      title: "Intent Lifecycle",
      section: "Protocol",
      route: "page-manifest.json#symmio-intent-lifecycle",
      summary:
        "A trade begins as an on-chain intent containing symbol, side, order type, requested price, quantity, and eligible PartyB addresses; solvers watch, evaluate, lock, open, and reconcile lifecycle events.",
      sources: ["symmio-intent-lifecycle"],
      keywords: ["intent", "quote", "event", "lock", "opened", "close", "liquidated", "solver"],
    },
    {
      id: "solver-role",
      title: "Solver Role",
      section: "Protocol",
      route: "page-manifest.json#symmio-solver-role",
      summary:
        "A solver is the professional counterparty that prices, accepts, hedges, monitors, and settles positions against user intent flow.",
      sources: ["symmio-llms", "vibe-architecture"],
      keywords: ["solver", "market maker", "hedging", "risk", "party b", "quote"],
    },
    {
      id: "estimated-network-revenue",
      title: "Estimated Network Revenue",
      section: "Dashboard",
      route: "page-manifest.json#local-network-revenue",
      summary:
        "Current local implementation estimates revenue from network volume multiplied by configurable platform fee and referrer share. Phase B sources remain separately tracked.",
      sources: ["local-revenue-doc", "server-pulse"],
      keywords: ["revenue", "network volume", "platform fee", "referrer share", "counter", "dashboard"],
      gap: "Current public disclosure boundary is parked in OPERATOR-INBOX #1.",
    },
    {
      id: "revenue-pulse",
      title: "Revenue Pulse",
      section: "Dashboard",
      route: "page-manifest.json#local-revenue-pulse",
      summary:
        "The local pulse uses recent network-volume history to derive an estimated live counter rate while keeping the display monotonic.",
      sources: ["server-pulse"],
      keywords: ["pulse", "counter", "monotonic", "rate", "history", "network revenue"],
    },
    {
      id: "network-depth",
      title: "Referral Depth",
      section: "Gap",
      route: "GAPS.md#G-003",
      summary:
        "Referral depth is currently contradictory across code, dashboard copy, and rollout notes. The docs should not publish a single final answer until the operator resolves the public stance.",
      sources: ["server-points", "server-me", "dashboard-faq", "syn-172"],
      keywords: ["5 levels", "15 levels", "referral depth", "network", "volume", "points"],
      gap: "Tracked in OPERATOR-INBOX #3 and GAPS.md G-003.",
    },
    {
      id: "subgraph-volume",
      title: "Subgraph Volume Migration",
      section: "Research",
      route: "page-manifest.json#linear-subgraph-volume",
      summary:
        "Linear research says subgraphs should become the more accurate volume source; current local implementation still uses backend wallet-volume data.",
      sources: ["syn-200", "server-volume"],
      keywords: ["subgraph", "goldsky", "volume", "backend", "migration", "totalUserHistory"],
    },
    {
      id: "hip3-context",
      title: "HIP-3 Competitive Context",
      section: "Competitive",
      route: "page-manifest.json#hyperliquid-hip3",
      summary:
        "HIP-3 documents builder-deployed perpetuals with deployer duties, staking requirements, independent margin/order books, fee sharing, settlement, and slashing context.",
      sources: ["hyperliquid-hip3"],
      keywords: ["hip-3", "hyperliquid", "builder deployed", "perps", "staking", "order books"],
    },
  ];

  const journeys = [
    {
      id: "projects",
      title: "Project / Treasury",
      focus: "List or support markets, understand inventory, and turn attention into tradeable liquidity.",
      pages: ["neelo-listing-monopoly", "neelo-bootstrap-trilemma", "vibe-what-is", "vibecaps-margin"],
    },
    {
      id: "solvers",
      title: "Solver / Market Maker",
      focus: "Understand intent flow, PartyB obligations, hedging, lifecycle monitoring, and edge sources.",
      pages: ["solver-role", "intent-lifecycle", "symmio-what-is", "neelo-funding-model"],
    },
    {
      id: "lps",
      title: "LP / Inventory Owner",
      focus: "Evaluate risk surfaces, margin, revenue share, and case-study economics.",
      pages: ["neelo-funding-model", "vibecaps-margin", "estimated-network-revenue", "neelo-proof-of-value"],
    },
    {
      id: "dashboard",
      title: "Dashboard User",
      focus: "Separate points, revenue estimates, network volume, referral depth, and current gaps.",
      pages: ["estimated-network-revenue", "revenue-pulse", "network-depth", "vibe-points"],
    },
  ];

  const gaps = [
    "Discord/Lafa corpus access is parked in OPERATOR-INBOX #2.",
    "Referral depth public stance is parked in OPERATOR-INBOX #3.",
    "Revenue disclosure boundary is parked in OPERATOR-INBOX #1.",
    "Production platform decision is parked in OPERATOR-INBOX #4.",
  ];

  window.SearchBookCorpus = { manifestStats, pages, journeys, gaps };
})();

