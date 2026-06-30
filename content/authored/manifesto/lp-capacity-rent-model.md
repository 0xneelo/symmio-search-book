---
id: "authored-lp-capacity-rent-model"
title: "LP Capacity Rent Model"
section: "manifesto"
track: "14 - Information and Trade Convergence"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/14-information-trade-convergence/14-docs/06-hybrid-solver-model"]
relatedGeneratedPages: ["neelo-14-information-trade-convergence-14-docs-06-hybrid-solver-model", "section-14-information-trade-convergence-14-docs-06-hybrid-solver-model-6-5-pass-through-execution", "authored-token-holder-inventory-alignment"]
---

# LP Capacity Rent Model

The Hybrid Solver source uses a landlord-style analogy for LP economics: LPs provide the capacity that lets a market exist, and fees compensate that capacity over time.

The useful publication version is the capacity-rent model. A long-tail perp market needs more than matching buyers and sellers. It needs inventory, collateral, and risk-bearing capacity before organic two-sided flow is mature. LPs or inventory providers are not only chasing generic yield; they are supplying the scarce resource that makes the market possible.

That framing also explains why LP compensation should not disappear the moment flow becomes more balanced. If the market depends on standing capacity, then the system has to decide how that capacity is paid, how much risk it bears, and when compensation changes as the market matures.

The source includes an explicit fee-share claim, but public docs should not publish exact percentages as current policy until the revenue and LP disclosure boundary is operator-approved. The safe claim is the model: LPs are paid for capacity, not merely for momentary trade matching.

## Reader Implication

LPs should ask what capacity they provide, what risk that capacity bears, and how compensation changes as the market matures. Traders should understand that early-market access has a cost because someone is providing the market's carrying capacity.

## Publication Boundary

This page publishes the capacity-rent model, not final LP commercial terms. Exact fee shares, revenue splits, vault rights, risk waterfalls, withdrawal terms, accounting treatment, and investment-sensitive yield claims require approved current sources and operator, risk, legal, and accounting review.

## Sources

- `vibe-papers`: Neelo, "Section 6: The Hybrid Solver Model: 6.5 Pass-Through Execution".

## Related Pages

- `authored-token-holder-inventory-alignment`
- `authored-proof-value-four-constituencies`
- `authored-vibe-project-profit-share-boundary`
