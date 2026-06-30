---
id: "authored-funding-defense-activation-timeline"
title: "Funding Defense Activation Timeline"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/10-defense-hierarchy#defense-activation-timeline"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-10-defense-hierarchy", "authored-funding-rate-regime-model", "authored-funding-emergency-time-ramp"]
---

# Funding Defense Activation Timeline

Neelo's defense hierarchy presents a staged activation timeline. The model moves from ordinary netting to increasingly forceful controls only as utilization and uncovered exposure worsen.

The source sequence is:

- normal operation: netting is active and status is green;
- rising utilization: netting and token inventory are active, with elevated funding and spreads;
- high utilization: the emergency funding ramp appears;
- unhedged exposure: local insurance can deploy, spreads become aggressive, and rebalancing-side spreads can become negative;
- local insurance depleted: global insurance can deploy and the system prepares for possible ADL;
- all insurance exhausted: ADL triggers to deleverage toward a safe level and reset to a sustainable state.

## Why The Timeline Matters

The timeline makes the defense stack operational. It shows that ADL is not a switch beside normal operation. It is reached after softer incentives, inventory coverage, local insurance, and capped global insurance have failed to restore safety.

It also explains why traders can see different kinds of pressure before an emergency. Funding, borrow costs, spread widening, rebates, insurance deployment, and ADL are not interchangeable. They belong to different points in the stress path.

## Publication Boundary

This page explains the source-model timeline. It should not publish live utilization thresholds, colors, timing, ramp speeds, spread tables, rebate guarantees, insurance deployment rules, or production ADL procedures without operator, risk, legal, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Defense Hierarchy", "Defense Activation Timeline".

## Related Pages

- `authored-funding-rate-regime-model`
- `authored-funding-emergency-time-ramp`
- `authored-funding-directional-spreads-and-rebates`
