---
id: "authored-funding-exposure-loss-estimate"
title: "Funding Exposure Loss Estimate"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/09-insurance-adl#exposure-loss-estimate"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-09-insurance-adl", "authored-funding-stress-demand-and-insurance-spend", "authored-funding-risk-volatility-parameters"]
---

# Funding Exposure Loss Estimate

Neelo's insurance and ADL source starts the stress calculation with an exposure-loss estimate. It does not treat open interest alone as the loss. It asks how much the solver's net exposure could lose under a modeled adverse move.

The simple source formula is:

```
L(E_usd) = E_usd * (A - 1)
```

where `E_usd` is solver exposure in USDC notional and `A` is the Aenigma worst-case multiplier.

The volatility-aware version is:

```
L(E_usd) = E_usd * max(A - 1, exp(z * sigma * sqrt(Delta t)) - 1)
```

where `sigma` is volatility, `Delta t` is the risk horizon, and `z` is the safety quantile.

## Why This Estimate Comes First

This estimate is the bridge between exposure and defense budget. The model first turns exposure into a stress loss, then subtracts dynamic market revenue to find stress demand, then asks whether local or eligible global insurance can cover the residual.

That ordering matters. A large exposure is not automatically an insurance spend event if inventory, pricing, funding, borrow, or spread revenue can keep the market inside the safe zone. Conversely, a smaller exposure can still become serious if the modeled adverse move or volatility horizon is severe.

## Publication Boundary

This page explains the source-model formula. It should not publish live Aenigma values, volatility windows, safety quantiles, risk horizons, market-specific exposure limits, or production ADL thresholds without operator, risk, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Insurance & ADL Logic", "Exposure Loss Estimate".

## Related Pages

- `authored-funding-stress-demand-and-insurance-spend`
- `authored-funding-risk-volatility-parameters`
- `authored-funding-insurance-fund-utilization-mode`
