---
id: "authored-funding-worked-examples-reading-guide"
title: "Funding Worked Examples Reading Guide"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/12-worked-examples", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/funding-rate-model"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-12-worked-examples", "neelo-15-funding-model-15-docs-funding-rate-model", "authored-funding-rate-regime-model"]
---

# Funding Worked Examples Reading Guide

The worked examples should be read as model walkthroughs, not as a production parameter sheet. Their value is that they show how the same market can move through normal operation, stress, emergency, insurance mode, bell-curve support, and ADL trigger analysis.

## What The Examples Teach

The normal and stress examples show the first calculation path: net longs and shorts, compute solver exposure, compare exposure with token capacity, then apply the appropriate utilization regime.

The emergency example adds duration and loss intensity. A market that briefly touches a high-utilization state should not be treated the same as one that remains there while losses accumulate.

The insurance example shows the second utilization mode. Once exposure exceeds token inventory, the question becomes whether insurance budget can cover estimated unhedged loss and whether pricing should push flow back toward safety.

The bell-curve and ADL examples show system-level consequences. Cross-market support can compress extreme outcomes, while ADL appears when insurance and safe exposure limits are no longer enough.

## Reader Implication

Use these examples to teach reasoning order: net first, identify exposure, determine the binding constraint, apply pricing pressure, spend insurance only when needed, and treat ADL as a final solvency tool.

## Publication Note

The example numbers are illustrative model values. Production docs should not expose them as live market parameters unless the operator confirms they match deployed policy.

## Sources

- `vibe-papers`: Neelo, "Worked Examples".
- `vibe-papers`: Neelo, "Funding Rate Model for Low-Cap Perpetual Contracts".

## Related Pages

- `authored-funding-rate-regime-model`
- `authored-funding-state-variable-map`
- `authored-funding-full-objective`
