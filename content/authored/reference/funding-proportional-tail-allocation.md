---
id: "authored-funding-proportional-tail-allocation"
title: "Funding Proportional Tail Allocation"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/08-bell-curve-flattening#allocation-rules"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-08-bell-curve-flattening", "authored-funding-transfer-pool-feasibility", "authored-funding-bell-curve-transfer-pool"]
---

# Funding Proportional Tail Allocation

Once the transfer pool exists, Neelo's source allocates it proportionally. Winner markets are charged according to their share of total right-tail excess. Losing or stressed markets receive according to their share of total left-tail shortfall or stress demand.

This avoids a flat tax and avoids equal subsidies. The market that is farther into the right tail contributes more. The market that is farther into the left tail receives more, subject to the pool and the relevant caps.

The flattened market profit is then raw market profit minus the tail tax plus the tail subsidy. The model compresses extremes rather than replacing market-level accounting.

## Why Proportionality Matters

Proportional allocation keeps the rule tied to measured tail contribution. A small outlier should not pay the same as a large outlier. A lightly stressed market should not receive the same support as the market creating the largest residual stress.

For solvers and LPs, this is part of the fairness story. Cross-market support is not arbitrary discretionary rescue. It is modeled as a measured transfer from excess to shortfall.

## Publication Boundary

This page explains the source allocation rule. It does not publish live charge mechanics, subsidy mechanics, execution timing, accounting treatment, or user-facing claims about production redistribution.

## Sources

- `vibe-papers`: Neelo, "Bell Curve Flattening", allocation rules.

## Related Pages

- `authored-funding-transfer-pool-feasibility`
- `authored-funding-bell-curve-transfer-pool`
- `authored-cross-market-risk-mutualization`
