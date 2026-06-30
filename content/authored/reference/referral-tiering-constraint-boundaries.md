---
id: "authored-referral-tiering-constraint-boundaries"
title: "Referral Tiering Constraint Boundaries"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/03-rakeback-design#3-2-tiering-constraints", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["section-17-referral-program-17-docs-03-rakeback-design-3-2-tiering-constraints", "authored-referral-rakeback-policy-model", "authored-referral-public-private-policy-overlays"]
---

# Referral Tiering Constraint Boundaries

The rakeback source gives three constraints for a tiered referral system: public default tables, a clean private-overlay model, and unambiguous behavior at threshold edges.

Public tables make the baseline readable. Private overlays allow commercial agreements without pretending that every partner receives the same economics. Boundary rules decide what happens when a user sits exactly on a threshold, crosses a tier mid-window, or qualifies for a private overlay and a public tier at the same time.

Those are not cosmetic documentation details. They are the difference between a tier system users can audit and a reward system that turns every edge case into support or dispute work.

## Documentation Rule

A production tier page should identify the public policy version, the calculation window, the threshold rule, the upgrade or downgrade timing, whether private overlays can override defaults, and whether caps or stacking rules apply.

Until those values are approved, the docs should explain the constraint model without publishing final tier economics.

## Sources

- `vibe-papers`: Neelo, "Section 3: Rakeback Design", 3.2.
- `spec-03`: resolved referral depth; rates, tier behavior, and private economics remain owner-review.

## Related Pages

- `authored-referral-rakeback-policy-model`
- `authored-referral-public-private-policy-overlays`
- `authored-referral-policy-clarity-requirements`
