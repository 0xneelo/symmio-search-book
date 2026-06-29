---
id: "authored-listing-zero-cost-liquidity-analogy"
title: "The Zero-Cost Liquidity Analogy"
section: "manifesto"
track: "03 - Listing Monopoly"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-03-listing-power-and-orderbooks"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/03-listing-monopoly/03-docs/04z-listing-and-liquidity-thesis#4z-3-zero-cost-liquidity-generation-the-uniswap-analogy"]
relatedGeneratedPages: ["section-03-listing-monopoly-03-docs-04z-listing-and-liquidity-thesis-4z-3-zero-cost-liquidity-generation-the-uniswap-analogy", "authored-uniswap-permissionless-swapping", "authored-listing-generalized-market-maker-problem"]
---

# The Zero-Cost Liquidity Analogy

The Section 4Z Uniswap analogy is about removing the bespoke market-maker deal from marginal market creation.

"Zero-cost" does not mean liquidity is free. LP capital still bears risk, and the system still needs a return. The phrase means that a founder does not need to negotiate a separate professional market-making mandate every time a new market is created. Deposited capital plus software quoting supplies a default path to tradeability.

## Why The Perp Analogy Is Harder

Spot AMMs solved this problem for spot pairs under one risk shape. Perpetuals add leverage, funding, liquidation, manipulation risk, oracle risk, and residual counterparty exposure. A permissionless perp analog therefore needs more than a pool and a price curve.

The useful reading is narrower and stronger: a permissionless perp system needs a default bootstrap path from capital or counterparty participation to tradeable depth, until the market matures enough for deeper venues and natural two-sided flow.

## Publication Boundary

Do not publish liquidity as free, riskless, automatically available, or production-equivalent to Uniswap-style spot AMMs. Do not publish current LP returns, solver terms, market-maker requirements, or automated counterparty guarantees without fresh primary-source/operator/product/risk review.

## Sources

- `vibe-papers`: Neelo, "Section 4Z: Listing, Liquidity, and the Generalized Bootstrap Problem: 4Z.3 Zero-Cost Liquidity Generation (The Uniswap Analogy)".

## Related Pages

- `authored-uniswap-permissionless-swapping`
- `authored-listing-plus-liquidity-thesis`
- `authored-static-perp-design-failures`
