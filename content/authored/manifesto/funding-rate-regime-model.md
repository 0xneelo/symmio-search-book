---
id: "authored-funding-rate-regime-model"
title: "Funding Rate Regime Model"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/funding-rate-model", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/05-utilization-modes", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/10-defense-hierarchy"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-funding-rate-model", "neelo-15-funding-model-15-docs-05-utilization-modes", "neelo-15-funding-model-15-docs-10-defense-hierarchy"]
---

# Funding Rate Regime Model

The funding-rate model is not one static APR. It is a regime system that changes behavior as a market moves from ordinary inventory use toward stress, emergency, insurance mode, and finally ADL.

## The Regime Ladder

In normal operation, utilization is below the model's kink point and funding can stay near a base rate. In stress, utilization has crossed the kink and a convex curve makes worsening imbalance more expensive. In emergency, high utilization has persisted long enough that time becomes part of the penalty, so the system pushes harder as the condition lasts.

When exposure exceeds token inventory, the model switches from token-inventory utilization to insurance-fund utilization. At that point spreads and rates can become more directional: trades that worsen exposure become expensive, while trades that reduce exposure can receive better pricing or even rebates in the source model.

ADL is the final regime. It appears only after the defense stack cannot keep exposure inside safe limits or insurance spend has been exhausted while residual stress remains.

## Why It Matters

This ladder is the practical version of the manifesto's market-balancing claim. Vibe does not need every long-tail market to start with perfect two-sided liquidity. It needs a way to make imbalance progressively more visible and costly before user-facing forced unwinds become necessary.

## Publication Boundary

This page explains the source-model regime ladder. It does not publish live rates, thresholds, grace periods, rebates, insurance-mode rules, or ADL policy without operator, implementation, risk, legal, and accounting review.

## Sources

- `vibe-papers`: Neelo, "Funding Rate Model for Low-Cap Perpetual Contracts".
- `vibe-papers`: Neelo, "Utilization Modes: Token Inventory vs Insurance Fund".
- `vibe-papers`: Neelo, "Defense Hierarchy: The Complete Protection Stack".

## Related Pages

- `authored-funding-as-market-balancing`
- `authored-dynamic-pricing-controls`
- `authored-funding-defense-hierarchy`
