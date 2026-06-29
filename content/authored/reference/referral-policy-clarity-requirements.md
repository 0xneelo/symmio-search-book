---
id: "authored-referral-policy-clarity-requirements"
title: "Referral Policy Clarity Requirements"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/03-rakeback-design#3-5-policy-clarity", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["section-17-referral-program-17-docs-03-rakeback-design-3-5-policy-clarity", "authored-referral-depth-open-question", "authored-referral-uniform-referee-benefit", "authored-referral-policy-governance"]
---

# Referral Policy Clarity Requirements

The rakeback source names three questions that must be answered before referral economics can be treated as clear policy:

- whether referral depth is one-level or multi-level;
- whether referee benefits are uniform;
- whether referrer benefits stack additively or with caps.

These questions are not optional appendices. They define what a user is being promised and what an operator has to reconcile. Without them, growth incentives become adversarial: users can code-shop, partners can interpret terms differently, and support teams inherit disputes that should have been prevented by policy.

## Current Boundary

The referral-depth answer remains operator-controlled because current sources conflict. The docs should therefore preserve the requirement without settling the answer: public policy must name depth, referee benefit rules, stacking rules, caps, and effective dates before users can reason about final economics.

## Sources

- `vibe-papers`: Neelo, "Section 3: Rakeback Design", 3.5.
- `spec-03`: Referral-depth contradiction and public referral policy remain owner-review.

## Related Pages

- `authored-referral-depth-open-question`
- `authored-referral-uniform-referee-benefit`
- `authored-referral-policy-governance`
