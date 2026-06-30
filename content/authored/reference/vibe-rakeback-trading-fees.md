---
id: "authored-vibe-rakeback-trading-fees"
title: "Vibe Rakeback And Trading Fees"
section: "rewards-referrals"
track: "Fees"
status: "published"
sourceKeys: ["vibe-rakeback", "vibe-referral-codes", "vibe-fees"]
sourceUrls: ["https://docs.vibe.trading/trading/rakeback-trading-fees.md", "https://docs.vibe.trading/getting-started/referral-codes.md", "https://docs.vibe.trading/trading/fees.md"]
relatedGeneratedPages: ["vibe-rakeback", "vibe-referral-codes", "vibe-fees"]
---

# Vibe Rakeback And Trading Fees

The public rakeback page says signing up with a friend's referral code gives the user trading-fee rakeback: part of the fees paid by the trader is returned to that trader. The mechanism is progressive, so higher trading volume maps to a higher rakeback percentage.

## Rakeback Tiers

The official table starts below $25,000 of trading volume at 2.5% rakeback and rises through multiple bands up to 50% above $100,000,000 of trading volume. The referral-code page summarizes this as "up to 50% trading fee rakeback."

The docs should avoid mixing rakeback with referrer commission. Rakeback is a referee-side fee return after signing up with a friend's code; referral commission is a referrer-side reward based on referred traders' aggregated volume.

## Fee Context

The rakeback page is a rewards table, while the fees page explains that trade costs can include platform and solver/hedger fee categories. A production answer should say that rakeback changes the fee experience for eligible referred traders, but the trade ticket and fee page remain the right source for the cost breakdown before confirmation.

## Reader Implication

When a trader asks "why did I get money back from fees?", route here. When a user asks "what does this trade cost before I click?", route to the fees and funding page. When a referrer asks "what do I earn from my network?", route to referral commission and keep depth/accounting caveats visible.

## Publication Boundary

Do not mix referee rakeback with referrer commission or dashboard network revenue. Exact rakeback tiers should cite the current public Vibe rakeback page, while trade-cost questions still route to the live trade panel and fee/funding docs.

## Sources

- `vibe-rakeback`: official progressive rakeback table.
- `vibe-referral-codes`: referral-code prerequisite and up-to-50% summary.
- `vibe-fees`: broader trade-cost category context.

## Related Pages

- `authored-vibe-fees-and-funding`
- `authored-vibe-referral-code-flow`
- `authored-vibe-referral-commission-program`
