---
id: "authored-referral-policy-decision-lane"
title: "Referral Policy Decision Lane"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/10-open-decisions", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-10-open-decisions", "section-17-referral-program-17-docs-10-open-decisions-10-1-referral-policy", "authored-referral-depth-open-question"]
---

# Referral Policy Decision Lane

Neelo's open-decisions section separates referral policy from the rest of the program because these questions directly shape what users believe they are earning.

The source names three policy decisions:

- whether referral depth remains one-level or expands to multi-level;
- whether referee benefits are always uniform or can vary by campaign;
- when, if ever, referral attachment can be changed after signup.

Those decisions are not cosmetic. Referral depth changes the meaning of network volume. Benefit variation changes whether users compare codes by relationship or by hidden discount. Attachment changes can create support and accounting disputes if users think their economic history can be rewritten.

## Publication Rule

The compendium can document the decision lane before the final answers are approved, but it should not publish a final-looking depth, benefit, or reattachment rule from this source alone.

The current public stance on referral depth is already parked as an operator decision because local code, dashboard copy, and rollout notes carry conflicting evidence. This page gives that open item a home inside the referral architecture: depth, benefit uniformity, and attachment mutability need owner-approved policy before they become public promises.

## Reader Implication

When users ask "how many levels count?", "can another code give me better terms?", or "can I change who referred me?", the answer engine should route to the specific owner-approved policy once it exists. Until then, it should state that these are open referral-policy decisions and link to the broader governance checklist.

## Sources

- `vibe-papers`: Neelo, "Section 10: Open Decisions", "Referral Policy".
- `spec-03`: current referral-depth and public-economics caveats.

## Related Pages

- `authored-referral-depth-open-question`
- `authored-referral-uniform-referee-benefit`
- `authored-referral-rollout-governance-checklist`
