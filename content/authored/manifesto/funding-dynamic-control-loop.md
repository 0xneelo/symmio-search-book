---
id: "authored-funding-dynamic-control-loop"
title: "Funding Dynamic Control Loop"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/11-full-objective#dynamic-pricing-as-implicit-control", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/11-full-objective#order-of-operations"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-11-full-objective", "authored-funding-three-pricing-instruments", "authored-funding-defense-activation-timeline"]
---

# Funding Dynamic Control Loop

Neelo's full objective treats dynamic pricing as implicit control. Funding, spread, and borrow functions respond to state:

```
f = f(u1, skew, u2)
s = s(u1, sigma, dev, u2)
b = b(u1, dev)
```

That means spread revenue, funding revenue, and borrow revenue are endogenous. They respond automatically to utilization, skew, insurance stress, volatility, and profit deviation before insurance or ADL has to carry the whole burden.

## Order Of Operations

The source gives the control loop in seven steps:

1. observe market state: longs, shorts, exposure, utilization, skew, volatility, and profit deviation;
2. apply dynamic pricing: funding, spread, and borrow respond to state;
3. compute revenue and stress demand;
4. apply bell-curve allocation for profit flattening and global stress support;
5. deploy local and eligible global insurance;
6. trigger ADL only if insurance is exhausted with residual stress or exposure exceeds safe limits;
7. update exposure and insurance balances.

## Why This Matters

This loop is what makes the objective operational. The model is not just a formula on paper. It says which facts are observed, which prices adjust first, when insurance is touched, and when ADL becomes permissible.

## Publication Boundary

This page explains the source-model control loop. It should not publish live pricing functions, thresholds, update cadence, source data feeds, market-state formulas, or production emergency sequencing without operator, risk, legal, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Full Combined Objective", "Dynamic Pricing as Implicit Control" and "Order of Operations".

## Related Pages

- `authored-funding-three-pricing-instruments`
- `authored-funding-defense-activation-timeline`
- `authored-funding-stress-demand-and-insurance-spend`
