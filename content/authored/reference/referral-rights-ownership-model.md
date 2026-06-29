---
id: "authored-referral-rights-ownership-model"
title: "Referral Rights Ownership Model"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/05-referral-economics#54-referral-ownership-model", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-05-referral-economics", "section-17-referral-program-17-docs-05-referral-economics-5-4-referral-ownership-model", "authored-market-scoped-referrals"]
---

# Referral Rights Ownership Model

Neelo's referral-economics source says the program has to define what owns referral rights.

The source names three possible models:

- account-bound rights;
- NFT-portable rights;
- market-scoped rights.

Each model answers a different question. Account-bound rights attach attribution to a user account. NFT-portable rights let an identity object carry the right. Market-scoped rights tie referral economics to a specific market or listing surface.

## Why Precedence Matters

The source warning is that mixing ownership models without precedence creates economic ambiguity. A single referred trade might appear to belong to an account referrer, a portable identity holder, and a market-level partner unless the system defines which right wins.

That ambiguity affects support, accounting, and settlement. Public docs should not merely say "you earn from referrals"; they should identify the active ownership model and how conflicts are handled once the operator confirms it.

## Publication Boundary

This page explains the source ownership options. It should not publish final transferability, attachment-change rules, market-versus-account precedence, NFT ownership rights, dispute handling, or historical reassignment behavior until operator, legal, accounting, and implementation review confirm them.

## Sources

- `vibe-papers`: Neelo, "Section 5: Referral Economics", "Referral Ownership Model".
- `spec-03`: Current referral-depth and public-economics caveats.

## Related Pages

- `authored-referral-identity-anchor`
- `authored-market-scoped-referrals`
- `authored-referral-policy-governance`
