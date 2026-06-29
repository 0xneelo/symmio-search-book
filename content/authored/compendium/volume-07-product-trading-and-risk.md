---
id: "authored-volume-07-product-trading-and-risk"
title: "Volume 07: Product, Trading, And Risk Guides"
section: "compendium"
track: "Volume 07"
status: "publication-candidate"
volumeId: "volume-07-product-trading-and-risk"
sourceKeys: ["spec-03", "vibe-llms", "vibe-margin", "symmio-core"]
sourceUrls: ["_specs/app-docs/03-grounding.md", "https://docs.vibe.trading/llms.txt", "https://docs.vibe.trading/trading/managing-vibecaps-margin.md", "https://docs.symm.io/"]
relatedGeneratedPages: ["authored-vibe-product-overview", "authored-vibe-account-creation-and-login", "authored-vibe-simple-trade-flow", "authored-vibe-fees-and-funding", "authored-vibe-account-health-and-liquidations", "authored-vibe-security-and-audits", "authored-vibe-project-listing-terms", "authored-vibecap-hedge-first-requirement"]
---

# Volume 07: Product, Trading, And Risk Guides

This volume is the user's practical product reference. It answers the questions that appear after the thesis lands: what can I trade, how does margin work, what are fees and funding, what happens near liquidation, and where does Vibe behavior differ from a generic perps venue?

The source material here is intentionally more operational than the manifesto volumes. It should be precise, quiet, and explicit about what the current product does. When the docs mention future Barometer or Phase B improvements, those should remain labeled as roadmap unless the implementation evidence changes.

## What This Volume Does

- It groups trading guides, fee pages, funding explanations, collateral behavior, and liquidation/account-health references.
- It links user-facing Vibe docs back to the economic and protocol volumes that explain why the mechanics exist.
- It keeps risk language concrete rather than promotional.
- It gives the answer engine grounded pages for common product questions.

## Reading Order

Start with the product orientation path: `authored-vibe-product-overview`, `authored-vibe-platform-overview`, `authored-vibe-intent-architecture`, and `authored-vibecaps-margin-management`. These pages explain what Vibe offers, why the product is intent-based, and how VibeCaps margin should be read before a user reaches for leverage or project-specific markets.

Then read the account and custody path: `authored-vibe-account-creation-and-login`, `authored-vibe-login-path-choice`, `authored-vibe-deposits-and-withdrawals`, `authored-vibe-deposit-chain-support`, `authored-vibe-allocated-balance`, `authored-vibe-large-withdrawal-window`, `authored-vibe-portfolio-and-account-data`, and `authored-vibe-account-history-and-csv-export`. This path answers the questions a user asks before trading: how to log in, how custody changes by login path, where funds appear, why withdrawal timing can differ, and what account records are visible.

Next read the trading and cost path: `authored-vibe-simple-trade-flow`, `authored-vibe-order-types`, `authored-vibe-tpsl`, `authored-vibe-stop-order-trigger-model`, `authored-vibe-oi-and-liquidity`, `authored-vibe-available-liquidity-capacity`, `authored-vibe-fees-and-funding`, `authored-vibe-trade-panel-cost-breakdown`, `authored-vibe-funding-payment-direction`, `authored-vibe-tpsl-slippage-threshold`, `authored-vibe-collateral-and-margining`, and `authored-vibe-account-health-and-liquidations`. This is the practical trading shelf: order entry, solver capacity, funding direction, cost fields, margin, CVA, and liquidation risk.

Use the security and client-controls path when the reader asks whether the product surface is safe to use: `authored-vibe-security-and-audits`, `authored-vibe-settlement-contract-audit-scope`, `authored-vibe-token-staking-audit-caveat`, `authored-vibe-sherlock-audit-contest-reference`, `authored-vibe-security-claim-versioning`, `authored-vibe-custody-path-security-boundary`, `authored-vibe-hotkeys`, `authored-vibe-mobile-pwa`, `authored-vibe-pwa-notification-categories`, and `authored-vibe-tradingview-controls`. This path distinguishes settlement-contract audit evidence from token/staking caveats, then covers the controls users operate day to day.

For project-side readers, use the listing and commercial-boundary path: `authored-vibe-system-visualization`, `authored-vibe-project-listing-terms`, `authored-vibe-project-supply-loan-flow`, `authored-vibe-project-solver-profit-sources`, `authored-vibe-project-profit-share-boundary`, `authored-vibe-project-token-custody-boundary`, and `authored-vibe-project-audit-and-exit-rights`. This path keeps supply loans, solver profit sources, custody, security-fund language, audit rights, and exit paths grounded in official product material.

Finish with the VibeCaps risk bridge: `authored-vibecap-hedge-first-requirement`, `authored-soft-quote-last-look-risk-gating`, `authored-liquidity-collapse-freeze-logic`, `authored-discontinuous-outcome-market-guardrails`, and `authored-strategic-unhedged-exposure-boundary`. These pages connect product usage back to the solver/LP operations volume: the user-facing trading surface is only credible if low-cap market risk is hedged, gated, frozen, or bounded when conditions deteriorate.

## Reader Implication

If you came to use the product rather than study the thesis, this volume is your reference shelf. It should make the product legible without hiding the risk model.

## Publication Boundary

Treat this volume as the compendium's product-reference and user-risk spine, not as a legal, accounting, tax, investment, or current-parameter guarantee. Market counts, leverage limits, chain support, deposit/withdrawal timing, fee percentages, funding values, available liquidity, liquidation thresholds, solver capacity, project profit splits, custody/security-fund details, audit scope, mobile notification behavior, and VibeCaps guardrail behavior must be checked against fresh official product sources and implementation evidence at publication time.

## Sources

- `spec-03`: Product reference grounding.
- `vibe-llms`: Public Vibe docs index.
- `vibe-margin`: VibeCaps margin guide.
- `symmio-core`: Symmio protocol source for settlement context.

## Related Pages

- `authored-vibe-product-overview`
- `authored-vibe-account-creation-and-login`
- `authored-vibe-simple-trade-flow`
- `authored-vibe-fees-and-funding`
- `authored-vibe-account-health-and-liquidations`
- `authored-vibe-security-and-audits`
- `authored-vibe-project-listing-terms`
- `authored-vibecap-hedge-first-requirement`
