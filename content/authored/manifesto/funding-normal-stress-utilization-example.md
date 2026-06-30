---
id: "authored-funding-normal-stress-utilization-example"
title: "Funding Normal And Stress Utilization Example"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/12-worked-examples#example-1-normal-operation", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/12-worked-examples#example-2-stress-regime"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-12-worked-examples", "authored-funding-rate-regime-model", "authored-funding-token-inventory-utilization-mode"]
---

# Funding Normal And Stress Utilization Example

Neelo's first two worked examples show the ordinary token-inventory path: net user positions, compute residual solver exposure, divide by token inventory value, then select the utilization regime.

In the normal example, `$60,000` of longs and `$50,000` of shorts net to `$50,000`, leaving `$10,000` of residual long exposure. With `5,000` tokens at `$10`, token inventory is worth `$50,000`, so token utilization is:

```
u1 = 10,000 / 50,000 = 20%
```

That sits below the source example's optimal utilization threshold, so the market remains in normal funding.

## What Changes In Stress

The stress example uses `$120,000` longs and `$80,000` shorts. Netting leaves `$40,000` residual exposure against the same `$50,000` token inventory:

```
u1 = 40,000 / 50,000 = 80%
```

At the example boundary, stress pricing begins. If utilization rises to `90%`, the source's normalized stress term becomes:

```
s = (0.90 - 0.80) / (1 - 0.80) = 0.50
```

With the illustrative stress curve, funding moves from `30%` APR to `55%` APR.

## Reader Implication

The example is not mainly about the specific threshold. It teaches the first diagnostic: exposure is measured after user netting, and token utilization determines whether ordinary pricing is enough or whether stress pricing should push the market back toward balance.

## Publication Boundary

The percentages, threshold, market name, APRs, and token amounts are source-model examples. Do not publish them as live market parameters without operator, risk, legal, accounting, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Worked Examples", "Example 1: Normal Operation" and "Example 2: Stress Regime".

## Related Pages

- `authored-funding-rate-regime-model`
- `authored-funding-token-inventory-utilization-mode`
- `authored-funding-worked-examples-reading-guide`
