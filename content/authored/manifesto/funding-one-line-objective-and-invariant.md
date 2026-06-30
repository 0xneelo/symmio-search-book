---
id: "authored-funding-one-line-objective-and-invariant"
title: "Funding One-Line Objective And Invariant"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/02-index#quick-reference-the-one-line-summary"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-02-index-quick-reference-the-one-line-summary", "authored-funding-master-optimization-equation", "authored-funding-core-invariant"]
---

# Funding One-Line Objective And Invariant

The funding-model index compresses the system into one objective:

```text
max sum_m Pi'_m - lambda sum_m R_m - sum_m C_adl(a_m)
```

Read in plain English, the model wants to maximize flattened per-market profit while subtracting local risk and the user-experience cost of ADL. `Pi'_m` is per-market profit after cross-market flattening, `R_m` is the local risk score, `C_adl(a_m)` is the ADL penalty, and `lambda` is the risk-aversion weight.

That one line is useful because it refuses to optimize profit alone. A market that earns money while pushing utilization, skew, exposure, or ADL proximity into danger is not healthy in the source model. The objective insists that profit, risk, and forced-deleveraging cost be read together.

## The Core Invariant

The same quick-reference section states the invariant: liquidations are inventory reallocations, not loss events, and trader loss events do not require selling the base token into spot markets.

That invariant is central to the Vibe thesis. In a token-inventory-backed perp design, stress handling should move exposure, cashflows, and defense resources through the solver and LP stack before it turns into external spot-market pressure. The purpose is to make liquidation and loss handling anti-cyclical: stress should strengthen internal buffers where possible instead of mechanically pushing project tokens into a falling market.

## How To Use The One-Line Summary

Use it as a reader's map, not as a deployment config. It tells a solver, LP, project, or researcher what the system is trying to trade off:

- keep markets profitable after flattening;
- penalize risky local states;
- avoid ADL except when cheaper defenses are insufficient;
- preserve the liquidation-as-reallocation invariant wherever the implementation and risk controls support it.

## Publication Boundary

This page does not publish a live optimizer, risk-aversion value, ADL-cost function, flattening policy, liquidation rule, or guarantee that base tokens will never be sold under any circumstance. It explains the source-model objective and invariant that production docs must reconcile with implemented contracts, solver policy, and risk operations.

## Sources

- `vibe-papers`: Neelo, "Vibe Perpetual Market - Full Mathematical Derivation", "Quick Reference: The One-Line Summary".

## Related Pages

- `authored-funding-master-optimization-equation`
- `authored-funding-full-objective`
- `authored-funding-core-invariant`
