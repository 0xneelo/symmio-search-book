---
id: "authored-funding-risk-signals-map"
title: "Funding Risk Signals Map"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions#computed-risk-signals-inputs-to-risk-function"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-04-variable-definitions-computed-risk-signals-inputs-to-risk-function", "neelo-15-funding-model-15-docs-04-variable-definitions", "authored-funding-state-variable-map"]
---

# Funding Risk Signals Map

Neelo's funding model does not read one risk number. It builds a risk function from several signals: inventory utilization, insurance utilization, skew, volatility, profit deviation, and residual stress.

That map is important because each signal describes a different failure mode. Inventory utilization asks whether current exposure is large relative to token coverage. Insurance utilization asks whether modeled loss is large relative to the available insurance budget. Skew asks whether the market is one-sided. Volatility asks whether prices are unstable enough to make inventory and hedge management harder. Profit deviation asks whether the market is underperforming relative to its target. Residual stress asks whether demand remains uncovered after insurance spend.

Together, those signals stop the funding model from treating every problem as the same problem. A market can be skewed but still well covered by inventory. A market can have moderate utilization but severe volatility. A market can be profitable in aggregate but still carry uncovered residual exposure. The control layer needs to know which state it is in before it changes pricing, insurance spend, hedge action, or ADL proximity.

## Why This Matters For Readers

For traders, the risk-signal map explains why cost changes can appear before a visible emergency. If skew, volatility, or residual stress is rising, the market can start charging or incentivizing flow differently before liquidation or ADL is relevant.

For LPs and projects, the map explains why "utilization" alone is not enough diligence. They need to know whether the market is consuming token inventory, insurance budget, or both, and whether profit is compensating for the risk being carried.

For solvers and operators, the map explains why a single static funding rate is too blunt for long-tail derivatives. The source model wants the system to respond to state, not merely to charge a default fee.

## Publication Boundary

This page explains source-model signals. It should not publish live thresholds, formulas, oracle vendors, volatility windows, profit targets, insurance budgets, or residual-stress policy until the production implementation and operator disclosure boundary are confirmed.

## Sources

- `vibe-papers`: Neelo, "Computed Risk Signals (Inputs to Risk Function)".

## Related Pages

- `authored-funding-state-variable-map`
- `authored-two-mode-utilization-rationale`
- `authored-dynamic-pricing-controls`
