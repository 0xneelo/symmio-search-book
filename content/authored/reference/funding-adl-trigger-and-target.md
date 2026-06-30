---
id: "authored-funding-adl-trigger-and-target"
title: "Funding ADL Trigger And Target"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/09-insurance-adl", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/10-defense-hierarchy"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-09-insurance-adl", "neelo-15-funding-model-15-docs-10-defense-hierarchy", "section-15-funding-model-15-docs-01-abstract-d-safety-adl"]
---

# Funding ADL Trigger And Target

ADL is the last resort in Neelo's funding model. It appears after dynamic pricing, token inventory, local insurance, and capped global insurance cannot keep exposure inside the safe zone.

The source gives two trigger conditions:

```
x_m = B_m_def AND D_m_res > 0
```

or:

```
E_usd > E_safe
```

In plain English: ADL can trigger when all available defense budget is spent and uncovered stress remains, or when exposure exceeds the safe level the model can cover in a worst-case unwind.

## ADL To Safer Levels

The model does not require a full zeroing of exposure. It chooses the minimum ADL fraction that brings exposure back to a safer target:

```
a_m = 1 - (E_target / E_current)
```

The source example reduces `$60,000` of exposure toward a `$40,000` target with a `33%` ADL fraction.

When positions must be selected, the source prioritizes largest winners first, then oldest positions as a tie-breaker, then proportional treatment if needed.

## Publication Boundary

This page should not publish final production ADL thresholds, safe exposure multipliers, position-ranking rules, or supported emergency paths without operator and implementation review. The source-backed claim is narrower: ADL is a final exposure-reduction mechanism after cheaper defenses are exhausted or safety limits are breached.

## Sources

- `vibe-papers`: Neelo, "Insurance & ADL Logic".
- `vibe-papers`: Neelo, "Defense Hierarchy".

## Related Pages

- `authored-funding-defense-hierarchy`
- `authored-funding-stress-demand-and-insurance-spend`
- `authored-tail-event-profit-cap-emergency-brake`
