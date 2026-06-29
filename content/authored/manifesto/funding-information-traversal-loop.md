---
id: "authored-funding-information-traversal-loop"
title: "Funding Information And Traversal Loop"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/00-informal-intro#information-and-traversal"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-00-informal-intro-information-and-traversal", "authored-gradient-flow-market-balancing", "authored-funding-rate-regime-model"]
---

# Funding Information And Traversal Loop

The funding model is also an information system. Neelo's intro says that moving up the z-score or netting spectrum teaches the protocol from flow, stress, and recoveries. Stepping back through ADL, parameter resets, or a more isolated posture is not only failure handling. It is part of how the system corrects and recalibrates.

That is an important inversion. A brittle model pretends that every market should move one way: toward more leverage, more netting, and more capital efficiency. A living control model accepts that markets can advance, reveal stress, and need to retreat before trying again.

## What Traversal Means

Traversal is the movement between market states:

- up toward more netting and more capital efficiency when evidence supports it;
- inward toward a more cross-market, netted posture when coupling becomes safe;
- down and outward toward isolation, collateralization, or ADL when stress says the market is not ready.

The goal is not to discover a unique algorithm that ends market design. The goal is to approximate better over time, including through future solver competition and better control policies.

## Publication Boundary

Do not imply that current Vibe markets automatically traverse these states, that z-score thresholds are final, or that external solvers currently compete over every control policy. Those are product and implementation claims that need fresh review.

## Sources

- `vibe-papers`: Neelo, "Informal intro", "Information and traversal".

## Related Pages

- `authored-gradient-flow-market-balancing`
- `authored-funding-rate-regime-model`
- `authored-trilemma-escape-route`
