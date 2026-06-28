---
id: "authored-network-volume"
title: "Network Volume"
section: "dashboard-reference"
track: "Volume"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["server-volume", "server-volume-snapshots", "server-me", "syn-200", "spec-03"]
sourceUrls: ["server/volume.js", "server/volume-snapshots.js", "server/routes/me.js", "Linear SYN-200", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["local-volume-source", "local-volume-snapshots", "linear-subgraph-volume"]
---

# Network Volume

Network volume is the trading volume attributed to wallets in a user's referral network, excluding the user's own wallet. In the current local implementation, wallet volume is sourced from the Vibe backend wallet-volume API, normalized, cached, and supported by daily snapshots.

The product roadmap separates this current source from the planned Barometer/Goldsky subgraph direction. The docs should describe the current implementation as current, then describe subgraph-based volume as the intended accuracy upgrade only where that status is supported by product research.

Depth remains the unresolved part of this page. The same source set contains evidence for 5-level language, 15-level rollout work, and configurable depth behavior. Until the operator resolves the public stance, this authored page should avoid a final numeric depth claim and route readers to the referral-depth gap.

## Reader Implication

If a user's revenue or points depend on volume, they need to know three separate things: which wallets are included, which trading source supplies the numbers, and which depth policy is currently public. Only the first two are safe to explain now.

## Open Gap

Operator inbox item `#3` must resolve referral-depth language before this page becomes final.

## Sources

- `server-volume`: Current volume source, cache, and normalization.
- `server-volume-snapshots`: Daily snapshot behavior.
- `server-me`: Network and volume aggregation route behavior.
- `syn-200`: Subgraph migration research.
- `spec-03`: Current/future volume guidance.

## Related Pages

- `authored-estimated-network-revenue`
- `authored-referral-depth-open-question`
- `local-volume-source`
