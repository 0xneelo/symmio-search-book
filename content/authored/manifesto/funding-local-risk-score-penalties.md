---
id: "authored-funding-local-risk-score-penalties"
title: "Funding Local Risk Score Penalties"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/11-full-objective#component-2-local-risk-score-r_m"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-11-full-objective", "authored-funding-risk-signals-map", "authored-funding-risk-volatility-parameters"]
---

# Funding Local Risk Score Penalties

Neelo's full objective turns local market risk into a penalty term:

```
R_m =
  w1 * phi(u1)
+ w2 * phi(u2)
+ w3 * phi(abs(skew))
+ w4 * phi(dev)
+ w5 * phi(sigma)
+ w6 * phi(D_m_res)
```

The input signals are token utilization, insurance utilization, skew, profit deviation, volatility, and residual stress after insurance.

## Why Penalty Shape Matters

The source names barrier and convex penalty functions. A barrier-style function can grow sharply near a limit:

```
phi(u) = -ln(1 - u)
```

Convex functions can also punish worsening states more than linearly:

```
phi(x) = x^2
phi(x) = exp(kx) - 1
```

The point is not only to identify risk. The point is to make the objective increasingly dislike states that move toward limits, especially when insurance utilization or residual stress is high.

## Publication Boundary

This page explains the source-model penalty structure. It should not publish live weights, thresholds, volatility windows, target-profit definitions, residual-stress limits, or penalty curves without operator, risk, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Full Combined Objective", "Component 2: Local Risk Score".

## Related Pages

- `authored-funding-risk-signals-map`
- `authored-funding-insurance-fund-utilization-mode`
- `authored-funding-exposure-loss-estimate`
