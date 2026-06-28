---
id: "authored-gradient-flow-market-balancing"
title: "Gradient Flow Market Balancing"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/03-core-concepts", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/11-full-objective"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-03-core-concepts", "neelo-15-funding-model-15-docs-11-full-objective", "authored-funding-model-control-problem"]
---

# Gradient Flow Market Balancing

The funding-model source uses gradient flow as a way to explain how a market can be pushed away from dangerous local states while still being pulled toward global sustainability.

In plain English: risk should repel capital before the system breaks. High utilization, extreme skew, volatility, underperformance, insurance stress, and uncovered residual exposure should make the wrong side more expensive. At the same time, the system should reward states where market profit, usable open interest, and solvency are more stable.

That is the "field" model behind the source. Profit and durable OI are the attractor. Local risk is the repeller. Dynamic prices, insurance rules, and ADL constraints define the paths capital can take through the field.

## What The Analogy Clarifies

The analogy helps readers avoid a common mistake. A funding model is not just a number paid every interval. It is a signal-routing system.

If a market has too much one-sided exposure, the dominant side should feel more cost. If inventory is scarce, additional same-direction flow should get worse pricing. If insurance capacity is becoming the binding constraint, the system should stop acting like normal utilization is the only relevant state.

In that framing, the objective is not "maximize volume at any cost." It is closer to maximize risk-adjusted market activity while avoiding local states that can force insurance exhaustion or ADL.

## Why It Matters For Vibe

Long-tail derivatives cannot depend on the same liquidity assumptions as mature BTC or ETH markets. Many markets will start with uneven information, uneven demand, and a small set of risk-bearing counterparties. Gradient-flow language gives Vibe a way to describe how those markets should mature without pretending they are already mature.

The reader implication is practical: when a Vibe market becomes more expensive, wider, or more constrained, that should be explained as a market-state response, not as arbitrary fee drift.

## Publication Note

This is a conceptual page from Neelo's model. The final docs should map any published gradient-flow language to the actual Vibe/Symmio controls implemented at launch.

## Sources

- `vibe-papers`: Neelo, "03. Core Concepts: Gradient Flow & Attractor-Repeller Dynamics".
- `vibe-papers`: Neelo, "11. Full Combined Objective".

## Related Pages

- `authored-funding-model-control-problem`
- `authored-dynamic-pricing-controls`
- `authored-funding-defense-hierarchy`
