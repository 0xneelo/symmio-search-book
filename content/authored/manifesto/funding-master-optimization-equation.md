---
id: "authored-funding-master-optimization-equation"
title: "Funding Master Optimization Equation"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/11-full-objective#the-master-equation"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-11-full-objective", "authored-funding-full-objective", "authored-gradient-flow-market-balancing"]
---

# Funding Master Optimization Equation

Neelo's full funding objective expresses the control problem as a single optimization:

```
maximize sum_m Pi'_m - lambda * sum_m R_m - sum_m C_ins(x_m) - sum_m C_adl(a_m)
```

The source describes this as an optimization over markets subject to insurance budget constraints, global allocation rules, exposure dynamics, and ADL safety constraints.

In plain English, the system wants high flattened profit, but it subtracts local risk, insurance spend, and ADL cost. That makes the objective different from a naive "maximize fees" target.

## What Each Term Means

`Pi'_m` is flattened per-market profit after cross-market tail adjustment. It is the attractor: the system wants durable, risk-adjusted market profit.

`R_m` is local risk score. It captures pressure from utilization, insurance stress, skew, volatility, profit deviation, and residual stress.

`C_ins(x_m)` is insurance cost. It prevents insurance from being treated as free capital.

`C_adl(a_m)` is ADL cost. It makes forced deleveraging an expensive last-resort action rather than a normal balancing tool.

## Publication Boundary

This page explains the source-model equation. It should not publish live lambda values, objective weights, optimized variables, production solver policy, or operator-approved risk tolerances without risk, legal, accounting, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Full Combined Objective", "The Master Equation".

## Related Pages

- `authored-funding-full-objective`
- `authored-gradient-flow-market-balancing`
- `authored-funding-defense-layer-cost-ordering`
