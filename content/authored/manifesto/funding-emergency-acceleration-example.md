---
id: "authored-funding-emergency-acceleration-example"
title: "Funding Emergency Acceleration Example"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/12-worked-examples#example-3-emergency-with-acceleration"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-12-worked-examples", "authored-funding-emergency-time-ramp", "authored-funding-dynamic-funding-rate"]
---

# Funding Emergency Acceleration Example

Neelo's emergency worked example shows why duration and loss intensity matter after utilization has crossed the critical zone.

The example market has `$120,000` of longs, `$60,000` of shorts, and `$50,000` of token inventory. Residual exposure is:

```
E_usd = |120,000 - 60,000| = 60,000
u1 = 60,000 / 50,000 = 120%
```

Because utilization is above the critical example threshold for longer than the example grace period, the market enters emergency mode.

## Loss Intensity Accelerates Time

The source example uses loss intensity to accelerate effective emergency time:

```
ratio = (0.10 - 0.03) / (0.20 - 0.03) = 0.41
m = 1 + 2.0 * 0.41 = 1.82x
```

One real day at that multiplier adds `1.82` effective days. The example's accumulated emergency time moves from `3.0` days to `4.82` days.

## Emergency Funding Result

The example emergency funding formula then reads:

```
f = 0.30 + 0.08 * 4.82^1.5 = 115% APR
```

The cap check leaves it below the example maximum cap.

## Reader Implication

Emergency pricing is not only a high-utilization switch. It is a persistence and loss-speed problem. A market that briefly touches a stress boundary should not be treated the same as one that remains beyond safe utilization while loss intensity keeps rising.

## Publication Boundary

The grace period, loss-intensity floor, stress threshold, multiplier, emergency exponent, cap, and APR are source-model examples. Do not publish them as live Vibe market policy without operator, risk, legal, accounting, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Worked Examples", "Example 3: Emergency with Acceleration".

## Related Pages

- `authored-funding-emergency-time-ramp`
- `authored-funding-dynamic-funding-rate`
- `authored-funding-defense-activation-timeline`
