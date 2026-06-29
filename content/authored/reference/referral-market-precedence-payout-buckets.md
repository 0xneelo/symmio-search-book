---
id: "authored-referral-market-precedence-payout-buckets"
title: "Referral Market Precedence And Payout Buckets"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/07-lp-and-category-layer#7-4-integration-requirements", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-07-lp-and-category-layer", "section-17-referral-program-17-docs-07-lp-and-category-layer-7-4-integration-requirements", "authored-market-scoped-referrals", "authored-referral-three-plane-architecture"]
---

# Referral Market Precedence And Payout Buckets

The LP and category layer has three integration requirements: deterministic category tagging, precedence rules between global referral and market referral, and explicit payout accounting per market and partner bucket.

Precedence rules answer what happens when several attribution paths could apply. A trader may have a user-level referral code. A market may have a market-scoped referral attachment. A market group may sit under a partner category overlay. Without precedence, the same fee flow can be claimed by multiple surfaces.

Payout buckets answer where the accounting lands. User-level rewards, market-level referral share, partner category uplift, platform revenue, and LP-side economics should be separable in reports and settlement.

## Publication Boundary

The docs can explain why deterministic precedence and separate buckets are required. They should not publish final precedence order, stacking rules, bucket names, formula versions, payout cadence, partner ledgers, or dispute procedures until accounting, legal, commercial, and implementation owners approve them.

## Sources

- `vibe-papers`: Neelo, "Section 7: LP and Category Layer".
- `spec-03`: referral, revenue, and dashboard disclosure caveats.

## Related Pages

- `authored-market-scoped-referrals`
- `authored-referral-three-plane-architecture`
- `authored-referral-dashboard-reporting-standards`
