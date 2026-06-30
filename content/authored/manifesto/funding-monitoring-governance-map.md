---
id: "authored-funding-monitoring-governance-map"
title: "Funding Monitoring And Governance Map"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/01-abstract#e-monitoring"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-01-abstract-e-monitoring", "authored-funding-risk-signals-map", "authored-funding-defense-hierarchy"]
---

# Funding Monitoring And Governance Map

The monitoring section of the funding-model abstract is short but important. It states that a dynamic market-control model has to be observable. Real-time metrics, insurance-fund health, ADL proximity, cross-market correlation, historical performance, alert thresholds, and governance parameters all belong in the operating surface.

This prevents the model from becoming decorative math. If utilization, skew, exposure, insurance depletion, ADL proximity, and cross-market stress are not visible, operators cannot know whether pricing is doing its job, whether insurance is being consumed too quickly, or whether a market is moving toward a state that should be paused, repriced, hedged, or deleveraged.

## What Must Be Watched

The first monitoring layer is market state: utilization, skew, and exposure. These are the live signals that tell the system whether flow is balanced or whether inventory and solver capacity are being pushed into stress.

The second layer is defense capacity: local and global insurance levels, depletion rate, and distance to ADL trigger thresholds. A market can look tradable until defense capacity is exhausted, so health has to be measured against available buffers, not just current open interest.

The third layer is system coupling: cross-market correlation and historical performance. If several markets are stressed in the same direction, a global pool can be pressured differently than in isolated one-market stress. Profit, drawdown, ADL frequency, and other history help distinguish routine turbulence from structural weakness.

The fourth layer is governance. Parameters such as lambda, beta, tail cutoffs, eligibility values, and caps are not merely mathematical symbols. They are governance and risk choices, so they need auditability, change control, and public wording that does not imply fixed live policy unless the operator approves it.

## Publication Boundary

This page does not publish live dashboards, alert thresholds, governance values, ADL trigger distances, insurance balances, or parameter-change authority. It explains the monitoring categories that production docs and operations must eventually make explicit.

## Sources

- `vibe-papers`: Neelo, "Abstract", "(E) Monitoring".

## Related Pages

- `authored-funding-risk-signals-map`
- `authored-funding-defense-hierarchy`
- `authored-funding-insurance-safety-budgets`
