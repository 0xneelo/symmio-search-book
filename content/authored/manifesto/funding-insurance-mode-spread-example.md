---
id: "authored-funding-insurance-mode-spread-example"
title: "Funding Insurance Mode Spread Example"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/12-worked-examples#example-4-insurance-mode-activation"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-12-worked-examples", "authored-funding-insurance-fund-utilization-mode", "authored-funding-directional-spreads-and-rebates"]
---

# Funding Insurance Mode Spread Example

Neelo's insurance-mode worked example begins when residual exposure exceeds token inventory. The example has `$60,000` of residual exposure and `$50,000` of token inventory, leaving:

```
unhedged = max(0, 60,000 - 50,000) = 10,000
```

With an illustrative Aenigma multiplier of `3.0`, the unhedged loss estimate is:

```
L_unhedged = 10,000 * (3 - 1) = 20,000
```

## Insurance Budget And Utilization

The example combines `$100,000` of local insurance with a `30%` local spend fraction and `$10,000` of global allocation:

```
B_ins = 0.30 * 100,000 + 1.0 * 10,000 = 40,000
u2 = 20,000 / 40,000 = 50%
```

The effective utilization remains the more urgent pressure between token utilization and insurance utilization.

## Why Spreads Become Directional

In insurance mode, the source example changes spreads asymmetrically:

```
long open  = 0.10% * (1 + 2 * 0.50) = 0.20%
short open = 0.10% * (1 - 1 * 0.50) = 0.05%
```

The exposure-worsening side pays more. The exposure-reducing side pays less.

## Reader Implication

Insurance mode is not only "insurance pays." It is a state where pricing should aggressively favor trades that reduce unhedged exposure, because defense budget is now the binding constraint.

## Publication Boundary

The Aenigma value, insurance fractions, global allocation, spread table, and market amounts are source-model examples. Do not publish them as deployed market parameters, rebates, or guarantees without operator, risk, legal, accounting, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Worked Examples", "Example 4: Insurance Mode Activation".

## Related Pages

- `authored-funding-insurance-fund-utilization-mode`
- `authored-funding-directional-spreads-and-rebates`
- `authored-funding-insurance-spend-caps`
