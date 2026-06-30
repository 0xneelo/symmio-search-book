---
id: "authored-funding-adl-target-sizing"
title: "Funding ADL Target Sizing"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/09-insurance-adl#adl-target", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/09-insurance-adl#adl-to-safer-levels-not-zero"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-09-insurance-adl", "authored-funding-adl-trigger-and-target", "authored-funding-defense-hierarchy"]
---

# Funding ADL Target Sizing

ADL in Neelo's funding model is not defined as "always close everything." The source chooses the minimum ADL fraction that brings exposure back to a safe target.

The exposure update is:

```
E(t + Delta t) = (1 - a_m) * E(t) - h_m(t)
```

where `a_m` is the ADL fraction and `h_m(t)` is any hedge action.

The target rule is to choose the minimum `a_m` such that:

```
E(t + Delta t) <= min(E_safe, E_m_target)
```

The simplified source formula for ADL down to a safer level is:

```
a_m = 1 - (E_target / E_current)
```

The source example uses `$60,000` of current exposure and a `$40,000` target, producing a `33%` ADL fraction.

## Why Target Sizing Matters

This is a solvency-preserving control, not a punishment mechanic. The model tries to reduce enough exposure to restore the safe state. That is less disruptive than assuming every ADL event fully zeroes the market, while still acknowledging that user experience and trust are the cost of the last defense layer.

## Publication Boundary

This page explains the source-model target-sizing logic. It should not publish production safe exposure levels, market targets, ADL percentages, supported emergency paths, timing, or user-facing execution guarantees without operator, risk, legal, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Insurance & ADL Logic", "ADL Action".

## Related Pages

- `authored-funding-adl-trigger-and-target`
- `authored-funding-hedge-cost-coverage`
- `authored-funding-defense-hierarchy`
