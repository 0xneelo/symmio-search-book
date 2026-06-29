---
id: "authored-funding-adl-priority-ranking"
title: "Funding ADL Priority Ranking"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/09-insurance-adl#adl-priority-who-gets-deleveraged", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/10-defense-hierarchy#adl-priority"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-09-insurance-adl", "neelo-15-funding-model-15-docs-10-defense-hierarchy", "authored-funding-adl-trigger-and-target"]
---

# Funding ADL Priority Ranking

When Neelo's source reaches ADL, it also names a ranking rule for which positions are touched first. The stated priority is:

1. Largest winners first.
2. Oldest positions if profits are equal.
3. Proportional treatment if needed for fairness.

The rationale is that deleveraging winners is less harmful than deleveraging losers, because losers would crystallize losses. ADL is therefore aimed at reducing system exposure while avoiding the most damaging position-selection order.

## How This Fits The Defense Stack

The priority rule only matters after earlier defenses have failed or safety limits have been breached. Normal operation uses user netting, token inventory, dynamic pricing, local insurance, capped global insurance, and hedging before ADL becomes relevant.

That context matters for documentation. A reader asking "who gets deleveraged first?" should see both the ranking and the fact that ranking belongs to the last-resort layer. The model does not present ADL as an ordinary rebalancing tool.

## Publication Boundary

This page explains the source-model ADL ranking. It should not publish final production ranking fields, profit measurement windows, age tie-breaker definitions, proportional-allocation details, notification behavior, user compensation, or legal settlement semantics without operator, risk, legal, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Insurance & ADL Logic", "ADL Priority".
- `vibe-papers`: Neelo, "Defense Hierarchy", "Auto-Deleveraging".

## Related Pages

- `authored-funding-adl-trigger-and-target`
- `authored-funding-adl-target-sizing`
- `authored-funding-defense-hierarchy`
