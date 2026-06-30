---
id: "authored-referral-public-private-policy-overlays"
title: "Referral Public And Private Policy Overlays"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/03-rakeback-design#32-tiering-constraints", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/03-rakeback-design#34-public-vs-private-economics", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-03-rakeback-design", "authored-referral-rakeback-policy-model", "authored-referral-policy-governance"]
---

# Referral Public And Private Policy Overlays

Neelo's rakeback-design source expects the referral system to support public default tables and private commercial overlays.

That is not a contradiction by itself. A public default table gives normal users a legible baseline. A private overlay can support strategic partners or commercial agreements. The important source requirement is that private terms should be explicit overlays, not hidden side effects inside the public policy model.

## Boundary Behavior Must Be Clear

The source says tier systems need clean boundary behavior at threshold edges. Users should not have to guess what happens when they cross a tier threshold, sit exactly on an eligibility boundary, or move between public and private terms.

It also flags policy questions that must be explicit:

- the public referral depth, now resolved as 15 levels with additive backfill;
- whether referee perks are uniform;
- whether referrer benefits stack additively or with caps.

## Reader Implication

The docs should name the public policy version, identify whether a private overlay exists, and avoid presenting private terms as universal. Public docs can use the resolved 15-level depth and additive-backfill stance, but they should keep private economics, stacking, caps, threshold behavior, and future eligibility changes owner-approved.

## Publication Boundary

This page explains the policy model. It should not publish private partner terms, public tier percentages, cap behavior, stacking rules, threshold tables, future backfill rules, future depth or eligibility changes, or private overlay terms without operator, legal, accounting, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Section 3: Rakeback Design", "Tiering Constraints" and "Public vs Private Economics".
- `spec-03`: resolved 15-level referral depth, additive backfill, and public disclosure caveats.

## Related Pages

- `authored-referral-rakeback-policy-model`
- `authored-referral-policy-governance`
- `authored-referral-policy-decision-lane`
