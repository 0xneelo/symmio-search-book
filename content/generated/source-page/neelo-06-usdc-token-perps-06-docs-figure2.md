---
id: "neelo-06-usdc-token-perps-06-docs-figure2"
title: "Figure2"
section: "vision-papers"
track: "06 - USDC vs Token-Margined Perpetuals"
granularity: "source-page"
status: "draft-imported-from-primary-source"
sourcePriority: "neeloVision"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/figure2"]
sourcePath: "Docs/public/06_usdc_token_perps/06_docs/Figure2.md"
---

# Figure2

> Draft status: imported from the primary markdown source. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/figure2

## Source Draft

graph TD
  A[USDC LP Capital] --> B[LP Pool]
  B --> C[Delta‑Neutral Engine]

  subgraph Market Dynamics
    C --> D[Trader Positions\n(High‑Leverage Longs/Shorts)]
    D --> E[Underlying AMM / Spot Market\n(Thin Liquidity, Low‑Cap Token)]
  end

  subgraph Risk Layer
    E --> F1[Instant Pump (1000x in 1 block)]
    E --> F2[Instant Dump (→ 0 in 1 block)]
    E --> F3[Oracle Manipulation]
    D --> F4[Net‑Short / Net‑Long Imbalances]
    C --> F5[Liquidation Latency\n& Keeper Failure]
    B --> F6[Backstop Correlation Risk]
  end

  F1 --> G[Bad Debt]
  F2 --> G
  F3 --> G
  F4 --> G
  F5 --> G
  F6 --> G

  G --> H[Losses to Backstop Fund]
  H --> I[Residual Losses to USDC LPs]
