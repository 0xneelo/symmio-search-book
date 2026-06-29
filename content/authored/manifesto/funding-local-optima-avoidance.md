---
id: "authored-funding-local-optima-avoidance"
title: "Funding Local Optima Avoidance"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/03-core-concepts#how-systems-avoid-bad-local-optima"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-03-core-concepts-how-systems-avoid-bad-local-optima", "authored-funding-gradient-flow-math-map", "authored-funding-local-risk-score-penalties", "authored-funding-full-objective"]
---

# Funding Local Optima Avoidance

Neelo's core-concepts source names the failure mode directly: a system that only follows local improvement can get stuck in bad local optima. In market terms, a venue can optimize for immediate flow, immediate utilization, or immediate profit while letting deeper risk accumulate.

The source lists several general mechanisms that help systems escape those traps: noise or temperature, momentum, local repulsive penalties, and population or mean-field effects. The Vibe funding model emphasizes the local-penalty version: risk spikes create repulsive gradients.

## What This Means For Funding

The local-penalty frame says the model should not merely reward the highest short-term profit state. It should subtract the cost of local stress. Utilization, skew, residual exposure, volatility, insurance stress, profit deviation, and proximity to forced unwind paths can all become reasons to make a state less attractive.

That matters because a young market can look locally profitable while becoming structurally brittle. If same-side demand is large, if hedging is weak, or if token inventory is close to exhausted, quoting more aggressively in the same direction may maximize near-term fees but worsen the path to solvency.

## Why It Belongs In The Manifesto

The local-optima page gives the compendium a rigorous way to say "more volume is not always better." Vibe's thesis is not only permissionless listing. It is permissionless market formation with controls that try to prevent fragile local success from turning into a tail event.

## Publication Boundary

This page explains the source-model mechanism. It should not publish live penalty weights, temperature/noise behavior, quote-routing rules, solver discretion, eligibility criteria, or production risk-score formulas without operator, risk, legal, accounting, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Core Concepts: Gradient Flow & Attractor-Repeller Dynamics", "How Systems Avoid Bad Local Optima".

## Related Pages

- `authored-funding-gradient-flow-math-map`
- `authored-funding-local-risk-score-penalties`
- `authored-funding-full-objective`
