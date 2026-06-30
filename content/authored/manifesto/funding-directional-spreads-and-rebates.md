---
id: "authored-funding-directional-spreads-and-rebates"
title: "Funding Directional Spreads And Rebates"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/07-dynamic-pricing#asymmetric-spreads-directional"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-07-dynamic-pricing", "authored-dynamic-pricing-controls", "authored-residual-counterparty-dynamic-spread"]
---

# Funding Directional Spreads And Rebates

Neelo's dynamic-pricing source makes spread directional. When solver exposure is tilted one way, the model can make trades that worsen that exposure more expensive and trades that reduce it cheaper. In insurance mode, the source even allows negative spreads, meaning a rebate for the side that helps rebalance the market.

If the solver is long exposed, additional long opens can be charged more because they worsen the same exposure. Short opens can be discounted because they help offset it. If the solver is short exposed, the logic flips. The spread is not only compensation for execution; it becomes a steering mechanism.

This matters because spread acts immediately. Funding only arrives periodically, and borrow works over holding time. A directional spread can influence the next trade before the market drifts further into a dangerous state.

## Why Rebates Can Be Rational

The source's negative-spread example is not a marketing gimmick. It is a risk-management tradeoff. If paying a trader to open the exposure-reducing side is cheaper than insurance depletion, forced de-risking, or ADL, then a rebate can be economically rational.

That does not mean rebates are always live, automatic, or promised. It means the model treats pricing as a control surface. Sometimes the cheapest defense is not "charge everyone more"; it is "pay the flow that fixes the state."

## Publication Boundary

This page explains the source-model directionality. It does not publish live spread tables, rebate availability, rebate size, market classes, solver inventory policy, or final user-facing execution promises. Production docs need implementation and operator review before turning this into public pricing language.

## Sources

- `vibe-papers`: Neelo, "Asymmetric Spreads (Directional)" and "Negative Spreads (Rebates)".

## Related Pages

- `authored-dynamic-pricing-controls`
- `authored-residual-counterparty-dynamic-spread`
- `authored-funding-stress-demand-and-insurance-spend`
