---
id: "authored-referral-dual-incentive-rails"
title: "Referral Dual Incentive Rails"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/01-system-baseline#1-2-two-incentive-rails", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/03-rakeback-design#3-1-dual-channel-model", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-01-system-baseline", "section-17-referral-program-17-docs-01-system-baseline-1-2-two-incentive-rails", "neelo-17-referral-program-17-docs-03-rakeback-design", "section-17-referral-program-17-docs-03-rakeback-design-3-1-dual-channel-model", "authored-referral-rakeback-policy-model"]
---

# Referral Dual Incentive Rails

Neelo's referral baseline separates two incentive rails:

- trading rakeback, based on the user's own rolling activity;
- referral rewards, based on referred-user activity over the same rolling window.

The rakeback source restates the same split as a self channel and a referral channel. Both can use rolling aggregates, tiers, and attribution rules, but they answer different economic questions.

## Why One Reward Label Is Not Enough

The self channel asks whether a trader should receive value back from their own fee generation. The referral channel asks whether a referrer should receive value from attributed downstream activity. Mixing those rails under one generic "points" or "rewards" label makes it harder to audit attribution, disclose terms, and reconcile dashboard state.

The source emphasizes that the hard part is not just computation. It is consistent and auditable attribution across tiers, rolling windows, and commercial policy.

## Publication Boundary

This page explains source-level channel separation. It should not publish final rakeback percentages, referral percentages, window length, tier tables, stacking behavior, private partner overlays, or referral depth until operator review resolves the public policy.

## Sources

- `vibe-papers`: Neelo, "Section 1: System Baseline", "Two Incentive Rails".
- `vibe-papers`: Neelo, "Section 3: Rakeback Design", "Dual-Channel Model".
- `spec-03`: Current referral-depth and public economics caveats.

## Related Pages

- `authored-referral-rakeback-policy-model`
- `authored-points-taxonomy`
- `authored-vibe-rakeback-trading-fees`
