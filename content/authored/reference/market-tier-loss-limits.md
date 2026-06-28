---
id: "authored-market-tier-loss-limits"
title: "Market Tier Loss Limits"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/risk-walkthrough/a-bearer-of-losses/i-bearer-of-losses", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/risk-walkthrough/a-bearer-of-losses/ii-balancing-ux-vs-risk"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-risk-walkthrough-a-bearer-of-losses-i-bearer-of-losses", "neelo-08-due-diligence-questionnaire-08-docs-risk-walkthrough-a-bearer-of-losses-ii-balancing-ux-vs-risk", "authored-market-maturation-risk-posture", "authored-liquidity-disappearance-protective-posture"]
---

# Market Tier Loss Limits

The DDQ describes markets as tiered by how much loss the solver and system buffers can absorb. That is the operational follow-through of the loss waterfall.

In an extreme event, a market may hit risk limits or triggers. The solver can respond by widening spreads, changing funding aggressively, forcing de-risking, applying ADL-style controls where enabled, or reducing and closing positions. If the relevant limits are breached, the source says the market may be forcibly reduced, closed, or delisted depending on governance and risk policy.

## Why Tiers Exist

Permissionless markets are not equally trustworthy on day one. A mature market with deeper liquidity, cleaner liquidation history, and healthier local buffers can justify a different risk posture from a newly created or suspicious market.

Tiering gives the system a bounded answer to "how much can this market cost the solver, LPs, and insurance?" The answer should not be infinite. It should depend on the market's maturity, inventory, local insurance, eligible global insurance, open interest, manipulation signals, and the solver's confidence in price formation.

## Reader Implication

For traders, a tier is part of the market terms. It can affect leverage, open-interest limits, quote availability, tail-event caps, and emergency de-risking.

For LPs and project teams, a tier is the risk budget that protects the rest of the system from one market's failure. Better market behavior can support a higher tier and better UX; worse behavior can force tighter terms or removal.

## Publication Boundary

Do not publish live tier names, loss limits, ADL triggers, delisting authority, governance process, user-notice workflow, or per-market classifications without operator and implementation review. This page documents the DDQ concept that markets need explicit loss limits and escalation paths.

## Sources

- `vibe-papers`: Neelo DDQ, "Bearer of Losses".
- `vibe-papers`: Neelo DDQ, "Balancing UX vs Risk".

## Related Pages

- `authored-market-maturation-risk-posture`
- `authored-liquidity-disappearance-protective-posture`
- `authored-tail-event-profit-cap-emergency-brake`
