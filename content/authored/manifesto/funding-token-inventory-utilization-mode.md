---
id: "authored-funding-token-inventory-utilization-mode"
title: "Funding Token-Inventory Utilization Mode"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/05-utilization-modes#mode-1-token-inventory-utilization"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-05-utilization-modes-mode-1-token-inventory-utilization", "neelo-15-funding-model-15-docs-05-utilization-modes", "authored-utilization-modes-inventory-insurance"]
---

# Funding Token-Inventory Utilization Mode

Token-inventory utilization is the first mode in Neelo's two-mode funding model. It asks how much un-netted exposure exists relative to the token inventory available to cover it.

In the source, this mode applies while exposure remains inside token inventory. If the market has enough token coverage, the system is in ordinary inventory management rather than insurance mode. That does not mean the market is always calm. It can still move from normal to stress to critical as utilization approaches the edge of token coverage.

The important idea is that token inventory is the first constraint. When exposure is small relative to covered amount, base rates can be enough. As exposure approaches a kink or critical zone, dynamic pricing can become more aggressive. If exposure moves beyond token coverage, the model shifts toward insurance-fund utilization.

## Reader Implication

For traders, token-inventory mode explains why a market can become more expensive before any insurance or ADL language appears. The market is still within token coverage, but additional same-direction flow consumes scarce inventory and can be priced accordingly.

For LPs and projects, this mode clarifies what their token inventory is doing. It is not a passive display number. It defines the ordinary coverage zone where the market can support exposure before tail-risk budgets become the binding constraint.

## Publication Boundary

This page should not publish live kink points, utilization thresholds, critical levels, or exact rate ramps without operator and implementation review. It documents the source-model concept: token inventory utilization is the normal/stress mode while exposure remains within token coverage.

## Sources

- `vibe-papers`: Neelo, "Mode 1: Token Inventory Utilization".

## Related Pages

- `authored-utilization-modes-inventory-insurance`
- `authored-funding-per-market-state-variables`
- `authored-two-mode-utilization-rationale`
