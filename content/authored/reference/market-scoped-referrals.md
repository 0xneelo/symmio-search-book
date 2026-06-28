---
id: "authored-market-scoped-referrals"
title: "Market-Scoped Referrals"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/07-lp-and-category-layer", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/09-metrics-framework", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-07-lp-and-category-layer", "section-17-referral-program-17-docs-07-lp-and-category-layer-7-1-market-scoped-referral", "section-17-referral-program-17-docs-07-lp-and-category-layer-7-5-strategic-role"]
---

# Market-Scoped Referrals

The LP and category layer expands referrals beyond user acquisition. The source describes a second referral surface attached to market creation: a referral can be bound to a specific market's fee flow, and the absence of attachment means no market-level referral share.

This turns referral design into market supply design. Creators, LPs, and distribution partners can be aligned around listing velocity and market activation instead of only signup counts.

## Partner And Category Overlays

For strategic partners, the source allows category-level overlays on tagged market groups, with uplift split between the platform and partner. This is separate from normal user-level referral and should be accounted for separately.

The implementation requirements are strict:

- deterministic category tagging;
- precedence rules between global referral and market referral;
- explicit payout accounting per market and partner bucket.

Without those rules, partner economics blur into the public referral policy and become difficult to audit.

## Reader Implication

Market-scoped referrals explain why the compendium treats referrals as market-formation infrastructure. They can connect distribution to listings, LP flow, and partner-led market categories. They should not be described as live universal policy until the owner confirms current partner, category, and payout semantics.

## Sources

- `vibe-papers`: Neelo, "Section 7: LP and Category Layer".
- `vibe-papers`: Neelo, "Section 9: Metrics Framework".
- `spec-03`: Public economics and referral-depth caveats.

## Related Pages

- `authored-referral-architecture-as-market-formation`
- `authored-network-volume`
- `neelo-17-referral-program-17-docs-07-lp-and-category-layer`
