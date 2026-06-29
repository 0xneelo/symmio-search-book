---
id: "authored-referral-qualified-issuance-gating"
title: "Referral Qualified Issuance Gating"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/05-referral-economics#53-issuance-gating", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/06-access-phasing#67-referral-code-issuance-policy", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-05-referral-economics", "section-17-referral-program-17-docs-05-referral-economics-5-3-issuance-gating", "authored-referral-code-activation-gates"]
---

# Referral Qualified Issuance Gating

Neelo's referral-economics source argues against unrestricted reward-eligible code issuance. If every account can immediately issue economically active codes, the system invites spam, self-directed extraction, and weak attribution quality.

The source model favors qualified issuance: activity thresholds, tier thresholds, progressive unlocks, or administrative campaign grants can decide who receives reward-eligible issuance rights.

## Issuance Is Not The Same As Identity

This page is about issuing active referral rights, not simply recording referral identity. A user may have identity metadata, a base code, or access-state history before that code routes reward-eligible referrals.

That distinction lets the product grow in phases. Access and identity can open early, while economically active issuance waits for stronger signal, campaign selection, or operating readiness.

## Publication Boundary

This page explains the source gating model. It should not publish final tier thresholds, volume thresholds, campaign grant criteria, exception lists, cooldowns, activation timing, or backfill behavior until operator and implementation review confirm the public policy.

## Sources

- `vibe-papers`: Neelo, "Section 5: Referral Economics", "Issuance Gating".
- `vibe-papers`: Neelo, "Section 6: Access Phasing", "Referral Code Issuance Policy".
- `spec-03`: Current referral-depth and public-economics caveats.

## Related Pages

- `authored-referral-code-activation-gates`
- `authored-referral-access-phasing-operating-model`
- `authored-referral-abuse-patterns`
