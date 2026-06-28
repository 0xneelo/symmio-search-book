---
id: "neelo-06-usdc-token-perps-06-docs-figure3"
title: "Figure3"
section: "vision-papers"
track: "06 - USDC vs Token-Margined Perpetuals"
granularity: "source-page"
status: "draft-imported-from-primary-source"
sourcePriority: "neeloVision"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/figure3"]
sourcePath: "Docs/public/06_usdc_token_perps/06_docs/Figure3.md"
---

# Figure3

> Draft status: imported from the primary markdown source. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/figure3

## Source Draft

graph TD
  A[Project / Whales\nHold SIM] --> B[Stake SIM in Vibecaps]
  B --> C[SIM Inventory Vault]

  C --> D[Solver / Market Maker]
  D --> E[Perp Market\n(Longs / Shorts via Symmio)]
  E --> D

  subgraph Solver Hedging
    D --> F[Spot / Perp Hedges\nShort‑Term USDC / Other Assets]
  end

  subgraph Risk Layer
    E --> R1[Order Flow Imbalance\n(Inventory Risk)]
    D --> R2[Model / Spread / Funding Error]
    F --> R3[External Exchange Risk]
    C --> R4[Protocol / Smart Contract Risk]
    C --> R5[SIM Market Risk\n(Token repricing)]
  end

  R1 --> G[Solver PnL Volatility]
  R2 --> G
  R3 --> G

  G --> H[Solver Capital Drawdown\n(not protocol‑wide insolvency)]

  R4 --> I[Systemic Protocol Loss]
  R5 --> J[SIM Price Moves\n(borne by same holders either way)]
