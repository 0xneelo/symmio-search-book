---
id: "authored-points-and-vibe-points"
title: "Onboarding Points And Vibe Points"
section: "rewards-referrals"
track: "Points"
status: "publication-candidate"
sourceKeys: ["dashboard-app", "vibe-points", "spec-03"]
sourceUrls: ["src/dashboard/app.jsx", "https://docs.vibe.trading/trading/vibe-points.md", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["local-dashboard-points-distinction", "vibe-points-overview", "local-points-engine"]
---

# Onboarding Points And Vibe Points

The docs need to keep points vocabulary separated. The onboarding app has campaign-style points for actions such as registration, content tasks, and referral participation. Vibe public docs describe protocol-facing Vibe points categories such as trading, referring, and community activity. The dashboard also surfaces network or trading-related values that should not be collapsed into one generic "points" number.

The safest public language is explicit: onboarding points are campaign/accounting units in this app; Vibe points are the trading-program points described by Vibe's public docs; referral points are their own category; and network/trading points are aggregated from trading activity where the product source supports that wording.

TGE settlement language needs care. The current grounding says onboarding points settle at TGE with a multiplier on the network's Vibecaps trading volume, but the public TGE settlement formula is deferred and not public for v1. Do not turn that deferred formula into a conversion promise.

## Reader Implication

Users ask "where did my points go?" because the product has multiple point systems. The answer should first identify which rail they mean, then explain the calculation and settlement status for that rail only.

## Sources

- `dashboard-app`: Local dashboard distinction between point categories.
- `vibe-points`: Public Vibe points documentation.
- `spec-03`: Required point-category separation.

## Related Pages

- `authored-referral-depth-open-question`
- `vibe-points-overview`
- `local-dashboard-points-distinction`
