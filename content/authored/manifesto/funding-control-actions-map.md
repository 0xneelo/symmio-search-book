---
id: "authored-funding-control-actions-map"
title: "Funding Control Actions Map"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions#control-variables-what-the-system-chooses"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-04-variable-definitions-control-variables-what-the-system-chooses", "neelo-15-funding-model-15-docs-04-variable-definitions", "authored-funding-state-variable-map"]
---

# Funding Control Actions Map

The funding-model variable definitions separate market state from system choice. The market reports exposure, utilization, skew, volatility, profit deviation, and residual stress. The control layer chooses what to do about that state.

Neelo's source names five control actions: local insurance spend, global insurance spend, total insurance spend, hedge action, and ADL action. That distinction should be visible in the docs because it prevents a common mistake: saying a metric "causes" an outcome without showing the control choice in between.

For example, high utilization does not automatically mean ADL. It can first change spreads, funding, borrow, or hedging. If exposure remains dangerous, the system can spend local insurance. If the market is eligible and the policy permits it, global insurance can support the market. Only when cheaper or less disruptive defenses are insufficient does ADL become the final forced-reduction action in the source model.

## How To Read The Actions

Local insurance spend is market-specific defense budget. Global insurance spend is shared support that should be governed more carefully because it can socialize risk across markets. Hedge action is an exposure-reducing trade or inventory adjustment. ADL action is the fraction of exposure reduced through forced deleveraging.

That order is not merely a formula list. It is a governance and user-experience story. Spending insurance changes who bears cost. Hedging changes inventory and execution risk. ADL protects solvency but damages user experience and trust. The control map tells readers that risk management is a sequence of increasingly expensive actions, not one hidden black box.

## Publication Boundary

This page does not assert live insurance budgets, hedge venues, ADL fractions, governance authority, or market eligibility. It preserves the source-model distinction between observed state and chosen control action.

## Sources

- `vibe-papers`: Neelo, "Control Variables (What the System Chooses)".

## Related Pages

- `authored-funding-defense-hierarchy`
- `authored-funding-adl-trigger-and-target`
- `authored-funding-stress-demand-and-insurance-spend`
