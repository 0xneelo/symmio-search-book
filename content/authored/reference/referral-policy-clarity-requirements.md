---
id: "authored-referral-policy-clarity-requirements"
title: "Referral Policy Clarity Requirements"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/03-rakeback-design#3-5-policy-clarity", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["section-17-referral-program-17-docs-03-rakeback-design-3-5-policy-clarity", "authored-referral-policy-decision-lane", "authored-referral-uniform-referee-benefit", "authored-referral-policy-governance"]
---

# Referral Policy Clarity Requirements

The rakeback source names three questions that must be answered before referral economics can be treated as clear policy:

- whether referral depth is one-level or multi-level;
- whether referee benefits are uniform;
- whether referrer benefits stack additively or with caps.

These questions are not optional appendices. They define what a user is being promised and what an operator has to reconcile. Without them, growth incentives become adversarial: users can code-shop, partners can interpret terms differently, and support teams inherit disputes that should have been prevented by policy.

## Current Boundary

The referral-depth answer is resolved for public v1 docs: Vibe uses 15 levels, and historical backfill is additive so it never lowers an existing balance. The remaining clarity requirement is to keep final economics explicit: public policy must name referee benefit rules, stacking rules, caps, effective dates, and any future depth or eligibility change before users can reason about final economics.

## Sources

- `vibe-papers`: Neelo, "Section 3: Rakeback Design", 3.5.
- `spec-03`: resolved 15-level referral depth, additive backfill, and public referral-economics caveats.

## Related Pages

- `authored-referral-policy-decision-lane`
- `authored-referral-uniform-referee-benefit`
- `authored-referral-policy-governance`
