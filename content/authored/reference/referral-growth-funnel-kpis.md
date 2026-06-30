---
id: "authored-referral-growth-funnel-kpis"
title: "Referral Growth Funnel KPIs"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/09-metrics-framework", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-product-metrics-prebeta-beta", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-09-metrics-framework", "neelo-17-referral-program-17-docs-12-product-metrics-prebeta-beta", "authored-referral-dashboard-reporting-standards"]
---

# Referral Growth Funnel KPIs

The growth layer measures whether referral participation turns into real product actions.

The source names several funnel KPIs:

- referral attach rate;
- code-to-first-trade conversion;
- code-to-first-listing conversion;
- claim conversion rate from off-chain to on-chain points;
- pack conversion rate from claimed points to packs if that future layer launches.

The product-metrics dashboard architecture gives the public funnel shape: code issued, signup, first deposit, first trade, and first listing. That progression is useful because it separates vanity issuance from economically relevant activation.

## How To Read The Funnel

Each stage answers a different question. Signup shows onboarding reach. First deposit shows funding intent. First trade shows demand activation. First listing shows supply activation. Claim and pack conversion show whether rewards are moving through the approved economic path.

## Publication Boundary

The docs should not publish target conversion rates, anti-abuse thresholds, cohort definitions, or live pack-conversion promises until the operator confirms phase, policy, and instrumentation.

## Sources

- `vibe-papers`: Neelo, "Section 9: Metrics Framework".
- `vibe-papers`: Neelo, "Product Metrics Framework".
- `spec-03`: referral and points publication caveats.

## Related Pages

- `authored-referral-dashboard-reporting-standards`
- `authored-referral-access-phasing-operating-model`
- `authored-points-value-state-lifecycle`
