---
id: "authored-points-taxonomy"
title: "Points Taxonomy"
section: "rewards-referrals"
track: "Points"
status: "published"
sourceKeys: ["server-points", "server-me", "dashboard-app", "dashboard-overview", "vibe-points", "spec-03"]
sourceUrls: ["server/points.js", "server/routes/me.js", "src/dashboard/app.jsx", "src/dashboard/overview.jsx", "https://docs.vibe.trading/trading/vibe-points.md", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["local-points-engine", "local-dashboard-points-distinction", "vibe-points-overview", "neelo-17-referral-program-17-docs-04-points-and-rewards"]
---

# Points Taxonomy

The docs should never answer "points" as if there is only one rail. The current source set supports at least four distinct meanings:

1. **Onboarding points** are campaign/accounting points inside this onboarding app. They come from registration, verification-adjacent tasks, content actions, and referral-chain awards.
2. **Referral points** are the onboarding-app entries awarded through the referral chain when a referred user qualifies.
3. **Network/trading points** are aggregated from wallet trading data alongside network volume, where the backend returns `total_points` for wallets in the user's network.
4. **Vibe points** are the public Vibe trading-program points described by Vibe's docs, covering trading, referring, and community categories.

Those rails can be related, but they are not interchangeable.

## Onboarding Points

`server/points.js` is the local points ledger for the onboarding app. It is append-only: entries are written as ledger events and totals are computed from the ledger. The default config includes self/action bonuses, referral-level amounts, code-grant counts, grant pool, and referral-depth config. Admin config now treats percentages and totals as canonical inputs, derives absolute reward amounts, and restricts unknown config keys.

The Overview page displays this ledger as user-facing points history. It shows the type, amount, referred user/level when present, and time.

## Network And Trading Points

`server/volume.js` accepts `total_points` from the same wallet-total payload that provides `total_trade_volume`. `server/routes/me.js` aggregates that value across snapshot rows and returns it to both the Volume and Pulse surfaces. That makes network/trading points part of the same measurement stack as network volume.

Because this is tied to the volume source, it inherits the same source caveats: caching, daily snapshots, and the future Barometer/subgraph upgrade.

## Vibe Points

The public Vibe points docs describe Vibe's own points program. Those docs are the source for trading-program categories. The onboarding app should cite them when it talks about Vibe points, but it should not collapse Vibe points into onboarding campaign points.

## Publication Rule

Every page should name the rail before explaining the number. "Your points" is too vague. Use "onboarding points," "referral points," "network/trading points," or "Vibe points" depending on the source and behavior being explained.

## Sources

- `server-points`: Local points ledger, config, referral chain, and award semantics.
- `server-me`: Points ledger payload and aggregated network points.
- `dashboard-app`: Footer distinction between onboarding points and trading points.
- `dashboard-overview`: Points ledger UI.
- `vibe-points`: Public Vibe points categories.
- `spec-03`: Required separation of onboarding, network/trading, referral, and Vibe points.

## Related Pages

- `authored-points-and-vibe-points`
- `authored-vibe-points-program`
- `authored-tge-settlement-multiplier`
