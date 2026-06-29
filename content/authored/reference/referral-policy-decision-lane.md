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

The source names three policy decision lanes:

- whether referral depth remains one-level or expands to multi-level;
- whether referee benefits are always uniform or can vary by campaign;
- when, if ever, referral attachment can be changed after signup.

Those decisions are not cosmetic. Referral depth changes the meaning of network volume. Benefit variation changes whether users compare codes by relationship or by hidden discount. Attachment changes can create support and accounting disputes if users think their economic history can be rewritten.

The current operator-approved referral-depth stance is no longer open: public docs use fifteen levels, and historical backfill is additive and never lowers a balance. The remaining decision-lane value is to keep referee-benefit variation and referral-attachment mutability clearly owner-approved before they become public promises.

## Publication Rule

The compendium can document the decision lane, but it should not publish benefit-variation or reattachment rules from this source alone. For depth questions, route to the operator-approved dashboard-network page rather than the historical open-decision source.

## Reader Implication

When users ask "how many levels count?", the answer engine should route to the fifteen-level policy. When they ask "can another code give me better terms?" or "can I change who referred me?", the answer engine should keep those as owner-review policy topics unless a more specific approved page exists.

## Sources

- `vibe-papers`: Neelo, "Section 10: Open Decisions", "Referral Policy".
- `spec-03`: current referral-depth and public-economics caveats.

## Related Pages

- `authored-referral-depth-open-question`
- `authored-referral-uniform-referee-benefit`
- `authored-referral-rollout-governance-checklist`
