---
id: "authored-funding-adl-penalty-function"
title: "Funding ADL Penalty Function"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/11-full-objective#component-4-adl-penalty-c_adla_m"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-11-full-objective", "authored-funding-adl-target-sizing", "authored-funding-adl-priority-ranking"]
---

# Funding ADL Penalty Function

Neelo's full objective makes ADL strongly costly:

```
C_adl(a_m) = c_adl * a_m^p, p >= 2
```

The source notes `p = 3` as a typical shape, making ADL increasingly expensive as the ADL fraction grows.

The interpretation is:

- `a_m = 0`: no ADL penalty;
- small ADL fraction: smaller penalty;
- large ADL fraction: large penalty;
- full ADL fraction: very large penalty.

## Why The Penalty Is Convex

ADL can protect solvency, but it damages user experience and trust. A convex penalty encodes that cost directly in the objective. It lets the system acknowledge that small emergency exposure reductions and large forced unwinds are not socially or operationally equivalent.

This also explains why ADL appears after dynamic pricing, inventory, insurance, and hedging. The source model can allow ADL while still making it expensive enough to remain the last resort.

## Publication Boundary

This page explains the source-model ADL penalty. It should not publish production penalty coefficients, ADL thresholds, allowed fractions, position-selection rules, compensation semantics, or user-facing emergency guarantees without operator, risk, legal, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Full Combined Objective", "Component 4: ADL Penalty".

## Related Pages

- `authored-funding-adl-target-sizing`
- `authored-funding-adl-priority-ranking`
- `authored-funding-defense-layer-cost-ordering`
