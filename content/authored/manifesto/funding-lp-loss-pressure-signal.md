---
id: "authored-funding-lp-loss-pressure-signal"
title: "Funding LP Loss Pressure Signal"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/06-lp-profit#lp-loss-pressure-signal"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-06-lp-profit", "authored-funding-risk-signals-map", "authored-funding-stress-demand-and-insurance-spend"]
---

# Funding LP Loss Pressure Signal

The LP loss pressure signal measures when trader winnings exceed the resources the market has collected to pay them. In the source model, it looks at positive trader winnings and compares them against revenue plus user losses received by the LP side. Only the uncovered portion becomes loss pressure.

In plain language: if winners can be paid from fees, spreads, funding, liquidation revenue, borrow revenue, and losing-trader transfers, the market is not under the same pressure. If trader winnings exceed that cushion, the residual amount becomes a local risk input. That is the signal the control layer should notice before the situation becomes an insurance or ADL problem.

## Why This Matters

Loss pressure is more precise than saying "traders are winning" or "the market is volatile." A market can have winning traders without stressing LP capital if enough offsetting revenue and losing flow exists. The danger begins when the winners outrun the market's earned and transferred resources.

This signal connects the accounting layer to the risk layer. It helps explain why dynamic pricing can rise, why insurance demand can appear, and why the model tracks profit deviation instead of only open interest. The protocol is trying to identify the gap between what the market owes and what the market has earned or received.

## Publication Boundary

This page explains the source-model signal. It does not publish live loss-pressure thresholds, real-time monitoring policy, exact revenue classification, liquidation accounting, or final alert/action triggers. Those remain review-bound.

## Sources

- `vibe-papers`: Neelo, "LP Loss Pressure Signal".

## Related Pages

- `authored-funding-risk-signals-map`
- `authored-funding-stress-demand-and-insurance-spend`
- `authored-funding-rate-regime-model`
