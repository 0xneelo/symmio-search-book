---
id: "authored-funding-magnet-attractor-repeller-analogy"
title: "Funding Magnet Attractor Repeller Analogy"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/03-core-concepts#the-fundamental-analogy"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-03-core-concepts-the-fundamental-analogy", "authored-gradient-flow-market-balancing", "authored-funding-model-control-problem", "authored-funding-full-objective"]
---

# Funding Magnet Attractor Repeller Analogy

Neelo's funding-model core concepts use a magnet analogy to make the control problem legible: the south pole attracts, the north pole pushes. In the model, the attractor is global sustainability. The repellers are local danger zones such as high utilization, skew, exposure, and other market-specific risk.

That analogy keeps the model from sounding like a static fee table. A long-tail market is not merely charged a funding number at intervals. It is pushed away from states that can exhaust inventory or insurance, while being pulled toward states where capital, flow, and profit can remain durable.

## Mapping

The source maps north-pole behavior to local maxima or sources: risk spikes push capital away. It maps south-pole behavior to a sink or global minimum: sustainable system state attracts capital trajectories.

Translated into product language, a market with dangerous same-side exposure should not keep quoting as if nothing changed. Dynamic pricing, borrow, funding, insurance, and ADL constraints are all ways of shaping the field so the market does not casually drift into a fragile local state.

## Why It Matters

The analogy is useful because it separates "profitable activity" from "any activity." A market can create volume while moving toward a local stress peak. The funding model's job is to keep that local stress visible and expensive enough that ordinary flow is redirected before the defense stack has to spend scarce insurance or force deleveraging.

## Publication Boundary

This page explains the source-model analogy. It should not publish live field weights, utilization thresholds, pricing ramps, insurance rules, ADL guarantees, or production solver policies without operator, risk, legal, accounting, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Core Concepts: Gradient Flow & Attractor-Repeller Dynamics", "The Fundamental Analogy".

## Related Pages

- `authored-gradient-flow-market-balancing`
- `authored-funding-model-control-problem`
- `authored-funding-full-objective`
