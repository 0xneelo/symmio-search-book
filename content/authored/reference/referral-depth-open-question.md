---
id: "authored-referral-depth-open-question"
title: "Referral Depth Historical Reconciliation Note"
section: "rewards-referrals"
track: "Referral Depth"
status: "needs-reconciliation"
sourceKeys: ["server-points", "server-me", "dashboard-faq", "dashboard-volume", "syn-172", "syn-118", "spec-03"]
sourceUrls: ["server/points.js", "server/routes/me.js", "src/dashboard/faq.jsx", "src/dashboard/volume.jsx", "Linear SYN-172", "Linear SYN-118", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["local-network-depth", "linear-network-depth-question", "linear-referral-depth-rollout"]
---

# Referral Depth Historical Reconciliation Note

This page intentionally remains an internal reconciliation note, not a public answer source.

The historical evidence was contradictory. Local code supported configurable depth and carried evidence around a 5-level default, while dashboard FAQ copy and rollout work pointed toward 15 levels. That conflict has now been resolved by operator decision.

The public stance is fifteen levels. Historical backfill is additive and never lowers an existing balance. Older 5-level wording should be treated as stale historical context and should not be used as current public copy.

## Reader Implication

If a user's question is "how many levels count?", the answer engine should not route here. It should route to `authored-dashboard-network`, which carries the current public answer and backfill rule.

## Resolution

Operator inbox item `#3` resolved the question: public referral depth is fifteen levels; historical backfill is additive and never lowers a balance.

## Sources

- `server-points`: Referral depth configuration.
- `server-me`: Network and volume aggregation behavior.
- `dashboard-faq`: User-facing FAQ copy.
- `dashboard-volume`: Volume UI copy and historical 5-level remnants.
- `syn-172`: 15-level rollout evidence.
- `syn-118`: Network-depth product question.
- `spec-03`: Grounding note on the contradiction.

## Related Pages

- `authored-network-volume`
- `authored-points-and-vibe-points`
- `local-network-depth`
