---
id: "authored-funding-insurance-buyback-accounting"
title: "Funding Insurance And Buyback Accounting"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/06-lp-profit#insurance-fund-inflows"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-06-lp-profit", "authored-funding-local-insurance-fund", "authored-funding-global-insurance-eligibility"]
---

# Funding Insurance And Buyback Accounting

Neelo's LP-profit decomposition treats insurance inflows and buybacks as accounting consequences of market operations, not as decorative tokenomics. The local insurance fund receives market-specific liquidation profits, a share of positive solver profits, and related protection charges in the broader model. The global insurance fund can receive system-level inflows, including retained value from cross-market flattening.

When market profit is positive, the source model also allows a portion of that profit to be allocated toward buybacks. A stricter variant uses liquidation-only buybacks, where liquidation profits are the buyback source. The important point is the direction: trader loss or liquidation events can become USDC-denominated revenue that supports protection or token demand rather than forcing base-token selling.

## Why This Matters

This accounting supports one of the funding model's core claims: a trader loss event does not automatically require selling the base token into spot markets. If losses are cash-settled and the system receives revenue, the flow can be routed into insurance reserves or buyback demand. That makes the model anti-cyclical in intent, though only implementation and operator policy can define the live behavior.

Readers should see the difference between three buckets: operating profit, insurance reserve growth, and token buyback allocation. Blending them into a single "yield" phrase would hide the risk policy and the publication boundary.

## Publication Boundary

This page explains the source accounting. It does not publish live buyback commitments, buyback fractions, liquidation-profit routing, insurance-fund balances, solver-profit share, token purchase execution, or public token-value promises.

## Sources

- `vibe-papers`: Neelo, "Insurance Fund Inflows" and "Buyback Allocation".

## Related Pages

- `authored-funding-local-insurance-fund`
- `authored-funding-global-insurance-eligibility`
- `authored-funding-core-invariant`
