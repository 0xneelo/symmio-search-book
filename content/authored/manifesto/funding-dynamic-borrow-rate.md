---
id: "authored-funding-dynamic-borrow-rate"
title: "Funding Dynamic Borrow Rate"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/07-dynamic-pricing#1-dynamic-borrow-rate"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-07-dynamic-pricing", "authored-funding-dynamic-pricing-multipliers", "authored-funding-lp-master-profit-formula"]
---

# Funding Dynamic Borrow Rate

The dynamic borrow rate is the model's continuous capital-usage charge. In Neelo's source, borrow starts from a base rate and is multiplied by responses to inventory utilization and profit deviation.

The utilization response has a kink. Below the chosen utilization point, borrow can stay near base. Above the kink, the multiplier rises convexly as the market moves closer to exhausting token inventory. The profit-deviation response raises borrow when the market is below its target economic state and needs to recover more revenue for the risk it is carrying.

The source example is useful because it shows the structure rather than just the symbol. A market at higher inventory utilization and below target profit receives a borrow multiplier from both conditions. The resulting borrow rate is not arbitrary; it is the base borrow rate multiplied by state-based pressure.

## Why Borrow Is Not Funding

Borrow is not the same as funding. Funding is a transfer used to pressure crowded directional exposure. Borrow is a continuous cost of carrying position or using scarce risk-bearing capacity. In a thin market, those can overlap in the trader's total cost, but they answer different control questions.

Borrow asks: is this market consuming inventory or capital in a way that should be more expensive to hold? That is why the source ties it to utilization and profit deviation rather than only long/short skew.

## Publication Boundary

This page explains the source formula shape. It does not publish live borrow base rates, kink points, amplitudes, convexity values, profit targets, accrual frequency, or user-facing fee policy. Source example values should not be treated as production commitments.

## Sources

- `vibe-papers`: Neelo, "Dynamic Borrow Rate".

## Related Pages

- `authored-funding-dynamic-pricing-multipliers`
- `authored-funding-lp-master-profit-formula`
- `authored-funding-risk-signals-map`
