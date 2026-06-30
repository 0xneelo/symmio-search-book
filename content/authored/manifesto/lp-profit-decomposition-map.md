---
id: "authored-lp-profit-decomposition-map"
title: "LP Profit Needs A Decomposition Map"
section: "manifesto"
track: "13 — Proof of Value Framework"
status: "published"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/03-lp-value-proposition"]
relatedGeneratedPages: ["section-13-framework-value-permissionless-perps-13-docs-03-lp-value-proposition-3-7-lp-profit-decomposition-technical", "authored-funding-lp-master-profit-formula", "authored-symm-lp-gross-to-net-attribution-bridge"]
---

# LP Profit Needs A Decomposition Map

Neelo's LP value proposition includes a technical profit decomposition because LP yield cannot be explained as one undifferentiated number.

The source formula starts from market revenue, subtracts operating and hedge costs, accounts for the trader PnL share the LP effectively bears, adds solver hedge PnL, and subtracts bad debt or liquidation shortfall. In plain language, LP economics are a bridge from gross market activity to net risk-bearing result.

That bridge matters because two markets can show similar fee revenue while having very different quality. One market may have balanced flow, low hedge cost, and manageable residual exposure. Another may have high fees only because it is stressed, one-sided, or expensive to hedge.

## What Readers Should Ask

The useful LP question is not "what is the APY?" It is:

- which cashflows counted as revenue;
- which costs were netted before LP share;
- how trader PnL is allocated during bootstrap versus mature phases;
- whether hedge PnL belongs to the solver, LPs, protocol, or another bucket;
- how shortfall, bad debt, liquidation effects, and insurance spend are reported.

Those questions are also why the SYMM LP reporting pages require gross-to-net attribution. Yield claims become credible only when the bridge is visible.

## Publication Boundary

Do not publish final formula coefficients, counterparty-share schedules, hedge PnL ownership, bad-debt allocation, LP accounting treatment, or public yield displays without operator, accounting, legal, risk, and implementation review. This page documents the source-backed need for decomposition.

## Sources

- `vibe-papers`: Neelo, "Section 3: LP Value Proposition", "LP Profit Decomposition (Technical)".

## Related Pages

- `authored-funding-lp-master-profit-formula`
- `authored-symm-lp-gross-to-net-attribution-bridge`
- `authored-funding-revenue-cost-accounting-map`
