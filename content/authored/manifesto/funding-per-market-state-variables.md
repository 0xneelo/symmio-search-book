---
id: "authored-funding-per-market-state-variables"
title: "Funding Per-Market State Variables"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions#per-market-state-variables"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-04-variable-definitions-per-market-state-variables", "neelo-15-funding-model-15-docs-04-variable-definitions", "authored-funding-state-variable-map"]
---

# Funding Per-Market State Variables

Neelo's funding model begins from per-market state, not global averages. Each market needs its own inventory, exposure, utilization, and skew picture before the system can choose rates or defenses.

The state map starts with inventory and balances: initial token deposit, USDC held, token price, covered notional, remaining tokens, obtainable tokens, and total token capacity. These variables answer a basic question: what resources can this specific market use to absorb or hedge exposure?

It then reads open interest: total long exposure, total short exposure, netted amount, solver exposure, token-denominated exposure, and exposure direction. These variables answer a second question: how much of the market is naturally offsetting, and how much is still sitting on the solver or LP side?

Finally, it derives utilization and imbalance: exposure relative to covered amount, exposure relative to absolute token capacity, theoretical overexposure, max overexposure, skew, non-covered exposure, and non-covered ratio. These variables answer the question that matters for pricing: is this market balanced, merely inventory-constrained, or already beyond its covered zone?

## Why Per-Market State Matters

Long-tail derivatives cannot be governed by a single "platform utilization" number. One market may be healthy while another is skewed, inventory-constrained, or exposed beyond its token coverage. The source model treats those as local facts because funding, spreads, insurance, and ADL should respond to the market actually carrying the risk.

For traders, this means costs can differ by market even when the UI looks similar. For LPs and projects, it means market support is not just a deposit size; it is a relation between token inventory, price, open interest, netting, and exposure direction.

## Publication Boundary

This page explains the source-model variables. Final public docs should not publish live token capacity, max-overexposure limits, covered-amount formulas, inventory rights, or market-specific state without implementation and operator review.

## Sources

- `vibe-papers`: Neelo, "Per-Market State Variables".

## Related Pages

- `authored-funding-state-variable-map`
- `authored-funding-risk-signals-map`
- `authored-market-maturation-state-map`
