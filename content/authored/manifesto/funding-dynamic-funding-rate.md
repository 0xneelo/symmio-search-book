---
id: "authored-funding-dynamic-funding-rate"
title: "Funding Dynamic Funding Rate"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/07-dynamic-pricing#2-dynamic-funding-rate"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-07-dynamic-pricing", "authored-funding-rate-regime-model", "authored-vibe-funding-payment-direction"]
---

# Funding Dynamic Funding Rate

The dynamic funding rate is the model's periodic pressure on crowded exposure. In Neelo's source, funding begins with a base funding rate and then responds to inventory utilization, absolute long/short skew, and insurance utilization.

Inventory utilization makes funding steeper when exposure is using too much covered capacity. Skew makes the dominant side more expensive because crowded directionality is the state the market needs to rebalance. Insurance utilization makes funding more aggressive when exposure has moved beyond ordinary inventory pressure and is stressing the defense budget.

The source's critical behavior is simple: when insurance utilization exceeds capacity, funding becomes much more aggressive. That is a different state from ordinary skew. A market can be imbalanced, but still inside token-inventory mode. Once insurance utilization is above the relevant budget, funding is no longer only an equilibrium signal; it is part of emergency risk reduction.

## How This Helps Readers

Users often ask who pays funding. That is a product-level question. This page answers the next layer: why might the funding rate move at all? In the source model, it moves because crowded exposure, inventory pressure, and insurance stress are different signals that can stack.

For solvers and LPs, dynamic funding is one of the softer defenses. It gives traders an economic reason to reduce the side that worsens exposure before the protocol has to spend insurance or consider ADL.

## Publication Boundary

This page does not publish live funding intervals, base rates, skew curves, insurance multipliers, caps, grace periods, or final production thresholds. It explains the source-model structure that production docs must reconcile with implementation.

## Sources

- `vibe-papers`: Neelo, "Dynamic Funding Rate".

## Related Pages

- `authored-vibe-funding-payment-direction`
- `authored-funding-rate-regime-model`
- `authored-funding-insurance-fund-utilization-mode`
