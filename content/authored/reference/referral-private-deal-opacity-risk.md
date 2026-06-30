---
id: "authored-referral-private-deal-opacity-risk"
title: "Referral Private Deal Opacity Risk"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/01-system-baseline#14-operational-reality", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/03-rakeback-design#34-public-vs-private-economics", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-01-system-baseline", "section-17-referral-program-17-docs-01-system-baseline-1-4-operational-reality", "authored-referral-public-private-policy-overlays"]
---

# Referral Private Deal Opacity Risk

Neelo's system baseline calls out private deal logic that can obscure public economics. The issue is not that partner-specific terms can never exist. The issue is that hidden terms can make the public referral table misleading.

If a normal user sees one policy while a partner receives a different effective share, boost, eligibility rule, or payout bucket, the docs need to explain the overlay model. Otherwise the referral program looks deterministic in public and discretionary in practice.

## How To Document Private Overlays

The public docs should separate three layers:

- the default public policy that applies to ordinary users;
- the existence of any private commercial overlay category;
- the fact that private terms are not universal.

That does not require publishing confidential partner terms. It does require avoiding copy that implies every participant receives the same economics when approved overlays can change outcomes.

## Publication Boundary

This page should not reveal partner names, private rates, custom thresholds, campaign grants, or contract terms. It only establishes the documentation rule: private economics should be disclosed as overlays, not hidden side effects in public policy.

## Sources

- `vibe-papers`: Neelo, "Section 1: System Baseline", "Operational Reality".
- `vibe-papers`: Neelo, "Section 3: Rakeback Design", "Public vs Private Economics".
- `spec-03`: current referral and public-economics caveats.

## Related Pages

- `authored-referral-public-private-policy-overlays`
- `authored-referral-economic-policy-decision-lane`
- `authored-referral-category-partner-overlays`
