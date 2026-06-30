---
id: "authored-funding-transfer-pool-feasibility"
title: "Funding Transfer Pool Feasibility"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/08-bell-curve-flattening#transfer-pool"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-08-bell-curve-flattening", "authored-funding-winner-surplus-loser-shortfall", "authored-funding-bell-curve-transfer-pool"]
---

# Funding Transfer Pool Feasibility

Neelo's bell-curve source sizes the transfer pool conservatively. The pool is a flattening intensity times the smaller of total winner excess and total loser shortfall.

That "smaller of the two" rule is the feasibility check. If winner excess is limited, the model cannot distribute more than exists. If loser shortfall is limited, the model should not collect more than can be used for flattening. The pool is bounded by both sides of the tail.

This is why the transfer pool is different from an uncapped shared insurance promise. It is a constrained amount derived from current tail conditions, not an open-ended obligation across all markets.

## Operational Meaning

Feasible pool sizing gives the system a way to support stressed markets while preserving accounting discipline. It can compress extremes, but it does not let the left tail demand unlimited capital or the right tail lose all profits automatically.

For public docs, this is the right answer to "can one bad market drain the winners?" The source model says no by construction, before operator eligibility caps are even considered.

## Publication Boundary

This page explains the source-model pool sizing. It does not publish live flattening intensity, market inclusion rules, time windows, transfer execution mechanics, or production insurance commitments.

## Sources

- `vibe-papers`: Neelo, "Bell Curve Flattening", transfer pool.

## Related Pages

- `authored-funding-winner-surplus-loser-shortfall`
- `authored-funding-bell-curve-transfer-pool`
- `authored-funding-global-insurance-eligibility`
