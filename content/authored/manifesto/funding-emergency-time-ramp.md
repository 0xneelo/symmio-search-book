---
id: "authored-funding-emergency-time-ramp"
title: "Funding Emergency Time Ramp"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/07-dynamic-pricing#emergency-regime-time-based-ramp"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-07-dynamic-pricing", "authored-funding-rate-regime-model", "authored-funding-worked-examples-reading-guide"]
---

# Funding Emergency Time Ramp

The emergency time ramp is how Neelo's dynamic-pricing model distinguishes a brief stress touch from a persistent dangerous state. In the source, emergency funding does not only depend on the current utilization snapshot. It can rise with effective time once the market has remained beyond the critical zone for a grace period.

The ramp is convex: the longer the market remains in emergency, the more pressure can build. The source also accelerates effective time with loss intensity. A market that is barely noisy should not be treated the same as a market losing equity quickly while exposure remains high. Loss intensity makes the clock run faster.

This is a critical nuance for long-tail markets. A momentary spike can be handled by ordinary stress pricing. Persistent exposure under loss pressure is different. It tells the system that passive waiting is failing and that the cost of worsening or holding the state should rise.

## Why Time Belongs In The Model

Without time, the model only sees a state. With time, it sees behavior. A market that enters stress and self-corrects is not the same as one that refuses to clear. The time ramp turns duration into a risk input, which is especially relevant when liquidity is episodic and the market may not rebalance immediately.

For readers, this explains why the model can become more aggressive even if the headline utilization number looks unchanged. The problem is not just the level; it is how long the level persisted and how much loss intensity accumulated while it persisted.

## Publication Boundary

This page explains the source-model emergency ramp. It does not publish live grace periods, ramp coefficients, loss-intensity thresholds, acceleration caps, or user-facing emergency policy. Those remain implementation and operator-review items.

## Sources

- `vibe-papers`: Neelo, "Emergency Regime: Time-Based Ramp".

## Related Pages

- `authored-funding-rate-regime-model`
- `authored-funding-worked-examples-reading-guide`
- `authored-funding-adl-trigger-and-target`
