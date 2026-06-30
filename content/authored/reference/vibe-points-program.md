---
id: "authored-vibe-points-program"
title: "Vibe Points Program"
section: "rewards-referrals"
track: "Points"
status: "published"
sourceKeys: ["vibe-points", "dashboard-app", "spec-03"]
sourceUrls: ["https://docs.vibe.trading/trading/vibe-points.md", "src/dashboard/app.jsx", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["vibe-points-overview", "authored-points-and-vibe-points", "authored-referral-depth-open-question"]
---

# Vibe Points Program

The official Vibe points page gives the public top-level answer: before the `$VIBE` TGE, Vibe Points can be earned through trading, referring, and community participation. It also says each points program rewards users daily and resets at 00:00 UTC.

That is enough to answer the basic user question "how are Vibe points earned?" It is not enough to collapse every points or rewards surface in this onboarding app into the same number.

## Public Categories

The source-backed public categories are:

- Trading.
- Referring.
- Community participation.

Users can participate in all three if they choose. The public page does not, by itself, collapse dashboard-specific onboarding points, referral points, network/trading points, or Vibe points into one balance.

## Separation From Onboarding Points

The existing authored points distinction remains important. The onboarding app has its own campaign/accounting language, while Vibe public docs describe Vibe points categories. A production FAQ should first identify which rail the user means, then answer only that rail.

The canonical point taxonomy is approved for v1: onboarding points, referral points, network/trading points, and Vibe points are separate rails. The public TGE settlement formula is deferred and not public for v1, so this page should not convert points into token outcomes.

## Reader Implication

For the basic public answer, Vibe points come from trading, referring, and community participation, with daily rewards and reset timing. For a dashboard-support answer, route to the points-distinction page before explaining onboarding points, referral points, network/trading points, or deferred TGE settlement language.

## Sources

- `vibe-points`: public Vibe Points categories and reset timing.
- `dashboard-app`: local dashboard distinction between app-level point categories.
- `spec-03`: required separation of public product facts and unresolved local points terminology.

## Related Pages

- `authored-points-and-vibe-points`
- `authored-referral-depth-open-question`
- `vibe-points-overview`
