---
id: "authored-funding-dynamic-pricing-multipliers"
title: "Funding Dynamic Pricing Multipliers"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions#dynamic-pricing-variables"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-04-variable-definitions-dynamic-pricing-variables", "neelo-15-funding-model-15-docs-04-variable-definitions", "authored-dynamic-pricing-controls"]
---

# Funding Dynamic Pricing Multipliers

Neelo's variable definitions split dynamic pricing into base rates and adjusted rates. The base borrow rate, base funding rate, and base spread describe ordinary market cost. Dynamic borrow, dynamic funding, and dynamic spread describe the state-adjusted version of those costs. The multipliers show how far the market has moved from base.

That structure is useful because it gives the docs a precise way to explain changing costs without pretending every change is arbitrary. If a market's risk state worsens, the relevant multiplier can rise. If a trade helps rebalance exposure, the model can make that side cheaper. In insurance mode, the source even allows directional incentives strong enough to reward exposure-reducing flow.

The important idea is that pricing becomes a control surface. Borrow is the cost of carrying position or capital usage. Funding is the recurring transfer that pressures crowded exposure. Spread is the immediate entry or exit cost. All three can become dynamic because they are the least disruptive ways to steer a market before insurance spend or ADL.

## Why Multipliers Matter

A multiplier separates the concept of a normal market cost from the temporary adjustment caused by state. This helps a reader ask better questions. Is the base fee high, or did the market enter a stress regime? Is the spread wide because the market is illiquid, because the dominant side worsens exposure, or because volatility changed? Is funding a steady balancing payment or an emergency pressure signal?

For the answer engine, these exact distinctions matter. A user asking "why did my cost change?" should not land on one generic fee page. They should see that cost can move through borrow, funding, and spread multipliers based on inventory, insurance, skew, volatility, and profit state.

## Publication Boundary

This page explains the source-model variables only. Public docs should not publish live base rates, multiplier curves, rebates, caps, or market-specific pricing policy until implementation and operator review confirm them.

## Sources

- `vibe-papers`: Neelo, "Dynamic Pricing Variables".

## Related Pages

- `authored-dynamic-pricing-controls`
- `authored-funding-rate-regime-model`
- `authored-vibe-fees-and-funding`
