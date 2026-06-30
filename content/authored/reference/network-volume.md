---
id: "authored-network-volume"
title: "Network Volume"
section: "dashboard-reference"
track: "Volume"
status: "published"
sourceKeys: ["server-volume", "server-volume-snapshots", "server-me", "syn-200", "spec-03"]
sourceUrls: ["server/volume.js", "server/volume-snapshots.js", "server/routes/me.js", "Linear SYN-200", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["local-volume-source", "local-volume-snapshots", "linear-subgraph-volume"]
---

# Network Volume

Network volume is the trading volume attributed to wallets in a user's referral network, excluding the user's own wallet. In the current local implementation, wallet volume is sourced from the Vibe backend wallet-volume API, normalized, cached, and supported by daily snapshots.

The product roadmap separates this current source from the planned Barometer/Goldsky subgraph direction. The docs should describe the current implementation as current, then describe subgraph-based volume as the intended accuracy upgrade only where that status is supported by product research.

Depth is no longer an unresolved publication question. The public referral depth is fifteen levels, and historical backfill is additive without lowering existing balances. Older 5-level evidence should be treated as historical implementation context, not current public policy.

## Reader Implication

If a user's revenue or points depend on volume, they need to know three separate things: which wallets are included, which trading source supplies the numbers, and which depth policy is currently public. The current public stance is fifteen levels; the Barometer/subgraph path remains a source-accuracy upgrade, not a depth-policy change.

## Sources

- `server-volume`: Current volume source, cache, and normalization.
- `server-volume-snapshots`: Daily snapshot behavior.
- `server-me`: Network and volume aggregation route behavior.
- `syn-200`: Subgraph migration research.
- `spec-03`: Current/future volume guidance.

## Related Pages

- `authored-estimated-network-revenue`
- `authored-dashboard-network`
- `local-volume-source`
