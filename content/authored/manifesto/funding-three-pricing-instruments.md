---
id: "authored-funding-three-pricing-instruments"
title: "Funding Three Pricing Instruments"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/07-dynamic-pricing#the-three-pricing-instruments"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-07-dynamic-pricing", "authored-dynamic-pricing-controls", "authored-funding-dynamic-pricing-multipliers"]
---

# Funding Three Pricing Instruments

Neelo's dynamic-pricing source separates the market-balancing toolkit into three instruments: funding, borrow, and spread. They all respond to risk state, but they act on different time scales and different user actions.

Funding is periodic. It pressures the dominant side of open interest by making crowded exposure pay the other side. Borrow is continuous. It charges the cost of carrying position or using risk-bearing capital over time. Spread is immediate. It changes the cost of opening or closing a trade at execution time.

This separation is important because long-tail market stress does not have one shape. A market can be skewed but not yet inventory-exhausted. It can be volatile even if long and short interest are not badly imbalanced. It can be below profit target even while utilization looks tolerable. One blunt fee cannot express all of those states.

## Why The Instruments Are Separate

The instruments map to different control needs. Funding is good at changing holding incentives over periods. Borrow is good at making capital usage expensive when the market needs to recover cost or conserve capacity. Spread is good at changing marginal behavior right now, before the next funding epoch arrives.

For the compendium, this gives the answer engine a precise way to explain "why did my cost change?" The answer may be funding, borrow, spread, or a combination. The model says all three can increase together in stress, creating compounding pressure to rebalance before insurance spend or ADL becomes necessary.

## Publication Boundary

This page explains the source-model instrument split. It does not publish live Vibe funding intervals, borrow accrual policy, spread formulas, user-facing fee disclosures, or market-specific rate schedules. Those need implementation and operator review.

## Sources

- `vibe-papers`: Neelo, "The Three Pricing Instruments".

## Related Pages

- `authored-dynamic-pricing-controls`
- `authored-funding-dynamic-pricing-multipliers`
- `authored-vibe-fees-and-funding`
