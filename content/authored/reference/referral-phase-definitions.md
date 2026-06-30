---
id: "authored-referral-phase-definitions"
title: "Referral Phase Definitions"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-product-metrics-prebeta-beta#1-phase-definitions", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["section-17-referral-program-17-docs-12-product-metrics-prebeta-beta-1-phase-definitions", "authored-referral-access-gated-launch", "authored-referral-unified-access-identity", "authored-referral-open-participation-benefits"]
---

# Referral Phase Definitions

Neelo's product-metrics source gives the referral rollout three phase labels: beta access-gated, beta, and open phase.

Those labels should be read as operating states, not as marketing milestones. The source uses them to explain what kind of referral evidence can be trusted at each stage.

## The Three Phases

Beta access-gated is the controlled state. Onboarding and market growth are intentionally constrained so the team can observe flow quality, attribution behavior, and operational load before broad expansion.

Beta is the scale-up state. Referral mechanics and attribution are live to a wider set of users, so reporting has to distinguish acquisition, market creation, demand, and integrity instead of treating all growth as the same signal.

Open phase is the broad-access state. Access is broadly available, and referral benefits act as an accelerator layer rather than the only way into the system.

## Why Phase Labels Matter

The same metric can mean different things in different phases. A low number of issued codes during access-gated beta may be an intentional capacity decision. The same number in open phase may signal weak demand or a broken funnel.

Every public referral dashboard should therefore carry a phase label and, where relevant, a formula version. Without phase context, readers cannot tell whether a metric is measuring controlled launch quality, beta-scale activation, or open-network throughput.

## Publication Boundary

This page defines the source's phase vocabulary. Public referral depth is 15 levels with additive backfill, but this page does not publish launch dates, eligibility thresholds, code quotas, future depth or eligibility changes, final economic terms, or milestone acceptance criteria. Those remain operator and product review items.

## Sources

- `vibe-papers`: Neelo, "Product Metrics Framework", "Phase definitions".
- `spec-03`: referral-depth and public disclosure caveats.

## Related Pages

- `authored-referral-access-gated-launch`
- `authored-referral-access-phasing-operating-model`
- `authored-referral-dashboard-reporting-standards`
