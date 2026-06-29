---
id: "authored-funding-insurance-cost-penalty"
title: "Funding Insurance Cost Penalty"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/11-full-objective#component-3-insurance-cost-c_insx_m"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-11-full-objective", "authored-funding-insurance-spend-caps", "authored-funding-local-insurance-fund"]
---

# Funding Insurance Cost Penalty

Neelo's full objective gives insurance spend its own cost term. The simplest source form is linear:

```
C_ins(x_m) = c_ins * x_m
```

The nonlinear source form adds a quadratic term:

```
C_ins(x_m) = c_ins * x_m + c_nl * x_m^2
```

The quadratic term discourages excessive insurance use.

## Why Insurance Is Not Free

Insurance protects solvency, but it consumes scarce defense budget. If the objective treated insurance as free, weak markets could lean on insurance instead of using dynamic pricing, hedging, local buffers, or market-specific limits.

The insurance cost term keeps the model honest. It says insurance can be used when it is worth using, but the optimizer should still prefer cheaper, less socialized, and less reserve-consuming controls when they can solve the state.

## Publication Boundary

This page explains the source-model insurance cost term. It should not publish live insurance cost coefficients, reserve balances, quadratic penalty terms, spend permissions, or production insurance policy without operator, accounting, risk, legal, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Full Combined Objective", "Component 3: Insurance Cost".

## Related Pages

- `authored-funding-insurance-spend-caps`
- `authored-funding-total-defense-budget`
- `authored-funding-local-insurance-fund`
