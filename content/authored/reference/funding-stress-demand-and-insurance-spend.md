---
id: "authored-funding-stress-demand-and-insurance-spend"
title: "Funding Stress Demand And Insurance Spend"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/09-insurance-adl", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-09-insurance-adl", "section-15-funding-model-15-docs-04-variable-definitions-control-variables-what-the-system-chooses", "section-15-funding-model-15-docs-01-abstract-b-risk"]
---

# Funding Stress Demand And Insurance Spend

The funding model does not spend insurance just because a market is volatile. It first estimates uncovered stress: the exposure loss that remains after the market's own dynamic revenue.

In the source model, stress demand is:

```
D_m = max(0, L(E_usd) - (F_spread + F_fund + F_borrow))
```

That says spread, funding, and borrow revenue are the first economic defense. Insurance is for the residual that dynamic pricing cannot cover.

After insurance spend, the remaining residual is:

```
D_m_res = max(0, D_m - x_m)
```

where `x_m` is combined local plus global insurance spend.

## Why This Matters

This ordering makes insurance a defense budget, not ordinary yield. If pricing can rebalance the market, the model should prefer pricing. If pricing cannot cover the exposure loss, local and eligible global insurance can be deployed. If insurance spend is exhausted and stress remains, the system moves toward ADL.

For docs, the reader-facing question is simple: what is still uncovered after ordinary market revenue and insurance spend?

## Publication Boundary

The formulas are source-model mechanics. Production docs should publish live inputs, safety multipliers, volatility horizons, and spend budgets only after implementation and operator review.

## Sources

- `vibe-papers`: Neelo, "Insurance & ADL Logic".
- `vibe-papers`: Neelo, "Variable Definitions".

## Related Pages

- `authored-dynamic-pricing-controls`
- `authored-funding-rate-regime-model`
- `authored-funding-adl-trigger-and-target`
