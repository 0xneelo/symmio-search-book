---
id: "authored-funding-bell-curve-example"
title: "Funding Bell-Curve Flattening Example"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/12-worked-examples#example-5-bell-curve-flattening"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-12-worked-examples", "authored-funding-bell-curve-tail-cutoffs", "authored-funding-proportional-tail-allocation"]
---

# Funding Bell-Curve Flattening Example

Neelo's bell-curve worked example shows the cross-market flattening arithmetic with five market profit values:

```
A = +80,000
B = +20,000
C =  +5,000
D = -10,000
E = -45,000
```

The total remains `$50,000`; the mean is `$10,000`.

## Tail Cutoffs

Using the source example's standard deviation of about `$45,960` and `k = 1.0`, the cutoffs become:

```
upper = 10,000 + 45,960 = 55,960
lower = 10,000 - 45,960 = -35,960
```

Market A is above the upper cutoff by `$24,040`. Market E is below the lower cutoff by `$9,040`.

## Transfer Pool And Allocation

The feasible pool is capped by the smaller side of the tail imbalance:

```
T = 0.8 * min(24,040, 9,040) = 7,232
```

Because there is one winner tail and one loser tail in the example, the full `$7,232` comes from A and goes to E.

## Flattened Result

After flattening:

```
A: 80,000 - 7,232 = 72,768
E: -45,000 + 7,232 = -37,768
```

The total before and after remains `$50,000`.

## Reader Implication

Flattening compresses extreme outcomes; it does not create money. It can reduce one market's extreme loss only to the extent there is eligible winner-side excess and the transfer fraction permits it.

## Publication Boundary

The five-market dataset, standard deviation method, cutoff multiplier, transfer fraction, and allocation amounts are source-model examples. Do not publish them as live cross-market mutualization policy without operator, risk, legal, accounting, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Worked Examples", "Example 5: Bell-Curve Flattening".

## Related Pages

- `authored-funding-bell-curve-tail-cutoffs`
- `authored-funding-transfer-pool-feasibility`
- `authored-funding-proportional-tail-allocation`
