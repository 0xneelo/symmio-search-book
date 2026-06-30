---
id: "authored-funding-unified-objective-preview"
title: "Funding Unified Objective Preview"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/03-core-concepts#the-unified-objective-preview"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-03-core-concepts-the-unified-objective-preview", "authored-funding-full-objective", "authored-funding-local-risk-score-penalties", "authored-funding-magnet-attractor-repeller-analogy"]
---

# Funding Unified Objective Preview

The unified-objective preview compresses the source's control idea into one simple expression: maximize flattened market profit while subtracting local risk. In source notation, that is the "global attractor plus local repellers" version of the funding model.

The preview formula is:

```text
max sum_m profit'_m - lambda * sum_m risk_m
```

`profit'_m` is the flattened or adjusted market profit term. `risk_m` is the local market risk score. `lambda` controls how aggressively risk repels the objective away from dangerous local states.

## How To Read The Preview

The formula is not the full product policy. It is the shortest version of the principle: profit matters, but risk changes the meaning of profit. A state that earns fees while concentrating unhedged exposure can be worse than a lower-volume state that keeps the market solvent and quoteable.

The preview also explains why later source sections add more terms. Insurance spend, ADL cost, flattening, utilization modes, and dynamic pricing are not separate ideas bolted on afterward. They are ways of specifying what profit and risk mean under long-tail market stress.

## Reader Implication

For the answer engine, route broad "what is the objective?" questions here first, then send readers to the full objective page when they need the complete accounting stack.

## Publication Boundary

This page explains the source preview. It should not publish final production `lambda` values, profit definitions, risk-score formulas, market eligibility, insurance weights, or ADL costs without operator, risk, legal, accounting, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Core Concepts: Gradient Flow & Attractor-Repeller Dynamics", "The Unified Objective (Preview)".

## Related Pages

- `authored-funding-full-objective`
- `authored-funding-local-risk-score-penalties`
- `authored-funding-magnet-attractor-repeller-analogy`
