---
id: "authored-dashboard-revenue-pulse"
title: "Dashboard Revenue Pulse"
section: "dashboard-reference"
track: "Revenue"
status: "published"
sourceKeys: ["server-pulse", "spec-03"]
sourceUrls: ["server/pulse.js", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["local-revenue-pulse", "authored-estimated-network-revenue", "authored-dashboard-overview"]
---

# Dashboard Revenue Pulse

The dashboard revenue pulse is a display model for motion in the "estimated network revenue" surface. It is not a settlement ledger and not a new revenue source.

The tracked implementation keeps the v1 revenue derivation deliberately local:

```text
referrer revenue = network volume x platform fee rate x referrer platform share
```

The pulse module reads platform fee and referrer-share inputs from server configuration at call time, with code defaults if those values are absent. The v1 defaults are `0.05%` (`5 bps`) platform fee and `30%` referrer platform share. It intentionally excludes Phase B solver/LP terms.

## Why The Number Moves

The moving counter is driven by per-user pulse history. The server records samples containing timestamp, volume, revenue, and points. It throttles appends so samples are at least 30 minutes apart and keeps a bounded history.

When it needs a rate, the implementation looks at recent entries inside a seven-day window. If it has at least two entries, it uses the slope between the oldest and newest recent readings: revenue change divided by elapsed seconds. If there is not enough history yet, it falls back to total revenue divided by account age. The rate is clamped to non-negative.

That means the counter can move for two reasons:

- the user's network volume/revenue history has increased over time;
- a new account has enough total estimated revenue to derive a cold-start rate.

## What It Does Not Mean

The pulse does not prove a final payout, per-trade fee attribution, liquidation revenue, funding revenue, or LP profit share. The code comment is explicit that pro-rata solver/LP terms are Phase B and intentionally absent.

This is why the page should stay paired with the broader estimated-revenue page. The pulse explains display behavior and Phase A defaults; it does not make Phase B economics live.

## Reader Implication

If a user asks why the counter moves, answer from history and rate calculation. If they ask whether the number is payable, final, or complete, route to the estimated-revenue page and keep the Phase A/Phase B distinction visible.

## Sources

- `server-pulse`: current network pulse implementation, revenue formula, sample history, rate window, and Phase B exclusion.
- `spec-03`: revenue status boundary and need for public disclosure review.

## Related Pages

- `authored-estimated-network-revenue`
- `authored-dashboard-overview`
- `local-revenue-pulse`
