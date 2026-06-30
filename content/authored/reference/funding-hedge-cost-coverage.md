---
id: "authored-funding-hedge-cost-coverage"
title: "Funding Hedge Cost Coverage"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/09-insurance-adl#exposure-reduction-via-hedging"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-09-insurance-adl", "authored-funding-control-actions-map", "authored-vibecap-hedge-first-requirement"]
---

# Funding Hedge Cost Coverage

Neelo's insurance and ADL source treats hedging as an active exposure-reduction control. Before ADL reduces user positions, the system can use a hedge or trade action to bring exposure down.

The source writes the hedge action as:

```
E(t + Delta t) = E(t) - h_m(t)
```

where `h_m(t)` is the hedge or trade action in base units.

The hedge has a cost:

```
Cost_m_hedge(t) = c_m(abs(h_m), liquidity_m, spread_m)
```

That cost must fit inside available insurance spend:

```
Cost_m_hedge(t) <= x_m_loc(t) + x_m_glob(t)
```

## Why This Is Not Free Protection

The hedge action can reduce exposure, but the model still prices the action against market liquidity and spread. In thin or stressed markets, the cost of reducing exposure can be exactly the problem: the system may know what exposure it wants to reduce, while the available local and global insurance spend limits whether it can pay for that reduction.

This keeps the docs from describing hedging as a magic escape hatch. Hedging is part of the defense stack, but it competes for the same capped defense budget that later determines residual stress and ADL proximity.

## Publication Boundary

This page explains the source-model hedge-cost constraint. It should not publish live hedge venues, routing policy, liquidity assumptions, spread tables, execution guarantees, hedge-size limits, or insurance spend availability without operator, solver, risk, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Insurance & ADL Logic", "Exposure Reduction via Hedging".

## Related Pages

- `authored-funding-control-actions-map`
- `authored-vibecap-hedge-first-requirement`
- `authored-funding-stress-demand-and-insurance-spend`
