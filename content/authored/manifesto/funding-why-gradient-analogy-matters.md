---
id: "authored-funding-why-gradient-analogy-matters"
title: "Why The Funding Gradient Analogy Matters"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/03-core-concepts#why-this-analogy-matters"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-03-core-concepts-why-this-analogy-matters", "authored-funding-magnet-attractor-repeller-analogy", "authored-funding-local-optima-avoidance"]
---

# Why The Funding Gradient Analogy Matters

The funding-model source uses the magnet and gradient-flow analogy because a market-control problem is both local and global. Pure local improvement can get stuck. A market can chase immediate volume, immediate fees, or a locally profitable skew while moving into a fragile state that the broader system should avoid.

The source's answer is to combine local repellers with a global attractor. Local risk signals push the system away from danger zones. Global sustainability pulls the system toward durable profit, balanced exposure, and lower ADL pressure. Multiple mechanisms then reduce the chance that the market gets trapped in a bad local state.

## Source-Sink Structure

The source describes a source-sink flow structure: divergence near the repeller and convergence near the attractor. The analogy appears in magnetism, fluid flow, capital flow, risk routing, and mean-field games. In compendium language, this means the system should not let risk accumulate silently. It should make dangerous states harder to enter and sustainable states easier to return to.

This is why the analogy matters for long-tail perps. A new or thin market can look locally attractive when one side of flow is active, but if that flow consumes token inventory, insurance capacity, or solver capacity too quickly, the market is not globally healthy. Dynamic pricing, insurance use, cross-market flattening, and the defense hierarchy are all ways to shape that field.

## Why Magnets Do Not Get Stuck

The source says magnetic fields are globally constrained: field lines cannot terminate arbitrarily, local extrema are unstable, and the geometry eliminates bad local optima by construction. The funding model mimics that idea with convex penalties near danger zones, cross-market insurance and flattening, and multiple defense layers before ADL.

The compendium should use that analogy carefully. It does not mean the system is mathematically immune to bad outcomes. It means the source model is designed so dangerous local states become visible, penalized, and routed through several defenses instead of being treated as normal market flow.

## Publication Boundary

This page explains the conceptual reason for the analogy. It does not publish live convex penalty formulas, solver routing behavior, insurance allocations, ADL thresholds, or guarantees that the market cannot get stuck in an unsafe state. Those claims require implementation, risk, legal, accounting, and operator review.

## Sources

- `vibe-papers`: Neelo, "Core Concepts: Gradient Flow & Attractor-Repeller Dynamics", "Why This Analogy Matters".

## Related Pages

- `authored-funding-magnet-attractor-repeller-analogy`
- `authored-funding-local-optima-avoidance`
- `authored-funding-key-innovations-summary`
