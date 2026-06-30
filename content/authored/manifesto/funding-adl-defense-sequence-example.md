---
id: "authored-funding-adl-defense-sequence-example"
title: "Funding ADL And Defense Sequence Example"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/12-worked-examples#example-6-adl-trigger", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/12-worked-examples#example-7-complete-defense-sequence"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-12-worked-examples", "authored-funding-adl-target-sizing", "authored-funding-defense-activation-timeline"]
---

# Funding ADL And Defense Sequence Example

Neelo's ADL worked example shows two trigger paths converging: insurance is exhausted with residual stress, and current exposure exceeds the safe exposure target.

The example uses a `$40,000` defense budget that has already been spent. Modeled stress demand is:

```
L(E) = 100,000 * (3 - 1) = 200,000
D_m = max(0, 200,000 - 50,000) = 150,000
D_res = max(0, 150,000 - 40,000) = 110,000
```

That means insurance is exhausted and residual stress remains.

## Safe Exposure Check

The example safe exposure is:

```
E_safe = 10 * 5,000 / 3 = 16,667
```

Current exposure is `$100,000`, so current exposure exceeds safe exposure.

The ADL amount is the fraction needed to return to the safe target:

```
a_m = 1 - (16,667 / 100,000) = 83.3%
```

## Complete Defense Sequence

The final source example then narrates the same logic over time:

1. normal exposure starts at `20%` utilization;
2. shorts close and utilization rises to `60%`;
3. utilization reaches stress at `90%`, raising funding and spreads;
4. utilization crosses emergency and switches toward insurance mode;
5. insurance is deployed while rebates encourage exposure-reducing flow;
6. insurance is exhausted and ADL reduces winning-side exposure;
7. post-ADL exposure returns near the safe target while rates remain elevated.

## Reader Implication

The worked sequence is the funding model's operating philosophy in miniature: net first, price dynamically, spend local defenses, use shared support cautiously, and only then deleverage positions enough to recover safety.

## Publication Boundary

The defense budget, Aenigma value, revenue assumption, safe exposure, ADL fraction, timing, and sequence amounts are source-model examples. Do not publish them as production emergency policy, user guarantees, or live deleveraging parameters without operator, risk, legal, accounting, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Worked Examples", "Example 6: ADL Trigger" and "Example 7: Complete Defense Sequence".

## Related Pages

- `authored-funding-adl-target-sizing`
- `authored-funding-defense-activation-timeline`
- `authored-funding-defense-layer-cost-ordering`
