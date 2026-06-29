---
id: "authored-funding-gradient-flow-math-map"
title: "Funding Gradient Flow Math Map"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/03-core-concepts#mathematical-foundation-gradient-flow"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-03-core-concepts-mathematical-foundation-gradient-flow", "authored-funding-magnet-attractor-repeller-analogy", "authored-gradient-flow-market-balancing", "authored-funding-model-control-problem"]
---

# Funding Gradient Flow Math Map

The gradient-flow section gives the funding model its control-language skeleton. It starts from the idea that a system follows a local gradient of a potential: it moves downhill in cost, stress, or risk.

In the source's notation, the master equation is `dx/dt = -grad V(x)`. `V(x)` is the potential landscape. Local gradients push the system away from danger. A global minimum represents the sustainable state toward which capital and liquidity trajectories should converge.

## Mapping To Vibe Markets

The mapping is not that markets literally become physics. The mapping is that each market has state, and the control system should shape the path through that state.

- local risk maps to a high local gradient;
- the push away from danger maps to the force `-grad V`;
- global sustainability maps to the lower-risk attractor;
- capital, liquidity, exposure, and quote behavior map to the trajectory.

That is a concise way to explain why funding, spread, borrow, insurance, and ADL are not independent widgets. They are different controls acting on the same market-state landscape.

## Reader Implication

When a user asks why a market is more expensive or constrained, the answer should not be "because the formula says so." The better answer is that the market state moved closer to a risk gradient, and the controls are supposed to push additional flow away from that state.

## Publication Boundary

This page explains the source-model math map. It should not publish final production potentials, gradients, weights, risk scores, solver quote functions, or live parameter values without operator, risk, legal, accounting, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Core Concepts: Gradient Flow & Attractor-Repeller Dynamics", "Mathematical Foundation: Gradient Flow".

## Related Pages

- `authored-funding-magnet-attractor-repeller-analogy`
- `authored-gradient-flow-market-balancing`
- `authored-funding-model-control-problem`
