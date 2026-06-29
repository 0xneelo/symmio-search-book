---
id: "authored-referral-lp-side-bounded-accounting"
title: "Referral LP-Side Bounded Accounting"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/07-lp-and-category-layer", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-07-lp-and-category-layer", "authored-market-scoped-referrals", "authored-lp-profit-and-dynamic-pricing"]
---

# Referral LP-Side Bounded Accounting

The source proposes a practical implementation frame: model market-scoped referral share as a bounded slice of LP-side economics.

That framing is useful because it makes accounting predictable. Instead of creating an unbounded side promise, the market referral share can reuse fee plumbing and remain tied to the economics of the relevant market. It also clarifies that market-level referrals are not the same thing as a universal claim on platform revenue.

Bounded accounting is especially important in thin markets. If referral share, LP share, partner uplift, user rakeback, and platform fees are all described loosely, public docs can imply more value is available than the market actually generates.

## Publication Boundary

The docs can state the accounting principle: market-scoped referral share should be bounded, market-specific, and reconciled against approved fee flow. They should not publish final percentages, LP-side definitions, fee bases, revenue share caps, partner waterfall, or settlement timing until operator, legal, accounting, and implementation review approve them.

## Sources

- `vibe-papers`: Neelo, "Section 7: LP and Category Layer".
- `spec-03`: revenue and referral disclosure caveats.

## Related Pages

- `authored-market-scoped-referrals`
- `authored-referral-public-private-policy-overlays`
- `authored-lp-profit-and-dynamic-pricing`
