---
id: "authored-conservative-launch-collateralization"
title: "Conservative Launch Collateralization"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/risk-walkthrough/a-bearer-of-losses/ii-balancing-ux-vs-risk"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-risk-walkthrough-a-bearer-of-losses-ii-balancing-ux-vs-risk", "authored-loss-waterfall-and-profit-caps", "authored-market-maturation-risk-posture"]
---

# Conservative Launch Collateralization

The DDQ's risk-control model starts new markets from a conservative mental model: treat net solver exposure as close to fully backed until the market earns looser conditions.

In the source, a newly launched market can be understood as beginning near `100%` protocol-side collateralization. If the solver is warehousing residual long-side or short-side exposure, the system should assume that exposure needs explicit backing through token inventory, stablecoin resources, hedges, local buffers, or other disclosed protections.

That does not mean every public page should publish a literal live collateral ratio. The useful reader-facing point is the launch posture. An immature market should not be documented like a mature perp venue with deep two-sided flow. It has less history, weaker price formation, thinner liquidity, and more adversarial uncertainty.

## UX Tradeoff

Conservative collateralization can make early markets feel less generous. Leverage may be lower. Open-interest caps may be tighter. Spreads may widen. Some quote requests may be refused.

Those are not arbitrary frictions if the market is still proving itself. They are the cost of giving a low-cap market a credible place to begin without pretending it already has mature order-book depth.

## Publication Boundary

This page should not publish final collateral ratios, exact leverage bands, inventory requirements, or solver backing formulas. It documents the DDQ model: launch safely first, then relax only as market evidence improves.

## Sources

- `vibe-papers`: Neelo DDQ, "Balancing UX vs Risk".

## Related Pages

- `authored-loss-waterfall-and-profit-caps`
- `authored-market-maturation-state-map`
- `neelo-08-due-diligence-questionnaire-08-docs-risk-walkthrough-a-bearer-of-losses-ii-balancing-ux-vs-risk`
