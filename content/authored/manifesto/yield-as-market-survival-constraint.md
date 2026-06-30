---
id: "authored-yield-as-market-survival-constraint"
title: "Yield As Market Survival Constraint"
section: "manifesto"
track: "07 — Architecture Thesis"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/10-vibe-pillars/10-docs/04-pillar-three-lp-yield-and-capital-efficiency"]
relatedGeneratedPages: ["neelo-10-vibe-pillars-10-docs-04-pillar-three-lp-yield-and-capital-efficiency", "authored-lp-yield-capital-efficiency-pillar", "authored-risk-adjusted-capital-efficiency"]
---

# Yield As Market Survival Constraint

In the Vibe Pillars paper, LP yield is not a marketing flourish. It is a survival constraint.

If a solver, maker, LP, vault, or designated counterparty helps bootstrap a low-cap market, that capital is taking risk. It may face thin flow, volatility, adverse selection, inventory exposure, funding costs, or stress events. If the return is weak or inconsistent, the market can technically exist while the capital supporting it leaves.

## Enough Yield Relative To Risk

The source frames the question as risk-adjusted. The point is not whether a line item called yield exists. The point is whether the return is enough to justify the residual counterparty exposure and the opportunity cost of capital.

This is why capital efficiency matters. A design that needs too much idle balance sheet per market cannot scale across the long tail. A design that underpays its risk-takers cannot persist. A design that overpays by hiding tail risk is not stable either.

## Publication Boundary

Exact Vibe revenue share, LP rights, fee routing, Phase B economics, and live yield claims remain operator/accounting review items. The publishable thesis is narrower: yield is architectural evidence that risk-bearing capital can remain in the system.

## Sources

- `vibe-papers`: Neelo, "Pillar Three: LP Yield and Capital Efficiency".

## Related Pages

- `authored-lp-yield-capital-efficiency-pillar`
- `authored-risk-adjusted-capital-efficiency`
- `authored-no-ponzi-market-revenue-test`
