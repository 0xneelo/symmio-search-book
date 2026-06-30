---
id: "authored-funding-abstract-control-surface"
title: "Funding Abstract Control Surface"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/01-abstract#c-controls"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-01-abstract-c-controls", "authored-funding-control-actions-map", "authored-funding-dynamic-control-loop"]
---

# Funding Abstract Control Surface

The funding-model abstract names the control surface after it names the accounting surface. Once the system can measure state, exposure, profit, risk, and insurance capacity, it has to decide which knobs are available.

Neelo's source lists funding modes, dynamic funding, dynamic borrow, dynamic spread, incentive shaping, recovery constraints, cross-market recovery, bell-curve transfers, flattening allocations, invariants, and final per-market decision outputs. That list is the clearest sign that the model is a control system, not a single scalar fee.

## The Control Families

The first family is pricing. Funding, borrow, and spread can all move with utilization, skew, insurance pressure, and regime multipliers. That lets the system charge flow that worsens stress and potentially reward flow that repairs inventory balance.

The second family is recovery. The source states a recovery constraint in which spread, funding, and borrow revenue must cover a target share of modeled loss or stress. If one market cannot carry enough recovery pressure locally, the model leaves room for cross-market recovery lift and insurance support.

The third family is cross-market flattening. Profit-tail transfers, stress-tail allocations, flattening pools, proportional shares, and conservation invariants describe how winner-market surplus can support stressed markets without pretending that support is free or unlimited.

The output is not only a number shown to traders. It is a per-market decision bundle: mode, funding, borrow, spread, incentive shape, insurance use, flattening allocation, and proximity to more disruptive defenses.

## Publication Boundary

This page explains the source-model control surface. It does not publish production knobs, formulas, multipliers, caps, recovery targets, global-support policy, incentive rebates, or ADL behavior. Public parameter language remains review-bound.

## Sources

- `vibe-papers`: Neelo, "Abstract", "(C) Controls".

## Related Pages

- `authored-funding-control-actions-map`
- `authored-funding-dynamic-control-loop`
- `authored-funding-three-pricing-instruments`
