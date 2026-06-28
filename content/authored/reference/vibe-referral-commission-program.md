---
id: "authored-vibe-referral-commission-program"
title: "Vibe Referral Commission Program"
section: "rewards-referrals"
track: "Referral Guides"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["vibe-referral-program", "vibe-referral-codes", "spec-03"]
sourceUrls: ["https://docs.vibe.trading/trading/referral-program.md", "https://docs.vibe.trading/getting-started/referral-codes.md", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["vibe-referral-program", "vibe-referral-codes", "authored-referral-depth-open-question"]
---

# Vibe Referral Commission Program

The public referral-program page says referrers are rewarded through two rails: referral commission and pre-TGE points. The safest documentation shape is to keep those rails separate.

## Referral Commission

The commission rail is based on the total aggregated volume of referred traders over the previous rolling 30 days. The public guide says aggregation happens each day at 00:00 UTC and that commission is paid instantly into the referrer's account.

The same page publishes percentage tiers by aggregated 30-day volume: 10%, 15%, 20%, 25%, and 30% across increasing volume bands. Those percentages can be cited as public Vibe docs, but the final compendium should still preserve the separate unresolved question of how many referral levels count in the onboarding dashboard.

## Pre-TGE Points

The pre-TGE rail is tied to daily active referred wallets and a daily leaderboard pool. The source says 100,000 points are available daily and reset at 00:00 UTC, then gives rank bands from first place through positions 501-1000.

This overlaps with the trading-program page's leaderboard table. That overlap should be treated as corroboration for daily point mechanics, not as proof that all local onboarding points settle the same way at TGE.

## Reader Implication

When answering referral questions, first ask which rail the user means: commission from referred volume, pre-TGE referral points, referee rakeback, or local dashboard/network accounting. Publishing one blended answer would recreate the existing product ambiguity.

## Sources

- `vibe-referral-program`: official referral commission tiers, 30-day aggregation, instant commission statement, and pre-TGE leaderboard points table.
- `vibe-referral-codes`: referral-code onboarding and benefit context.
- `spec-03`: local grounding file that keeps referral-depth and points terminology under review.

## Related Pages

- `authored-vibe-referral-code-flow`
- `authored-vibe-trading-program-points`
- `authored-referral-depth-open-question`
