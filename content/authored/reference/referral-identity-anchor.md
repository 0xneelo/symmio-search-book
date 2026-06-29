---
id: "authored-referral-identity-anchor"
title: "Referral Identity Anchor"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/01-system-baseline#1-1-referral-identity", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/02-architecture#2-3-referral-code-activation-policy", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-01-system-baseline", "section-17-referral-program-17-docs-01-system-baseline-1-1-referral-identity", "neelo-17-referral-program-17-docs-02-architecture", "section-17-referral-program-17-docs-02-architecture-2-3-referral-code-activation-policy", "authored-referral-identity-and-claim-flow"]
---

# Referral Identity Anchor

Neelo's referral baseline uses a referral NFT, or equivalent identity object, as the user's referral identity anchor and code carrier.

That anchor should not be confused with immediate reward eligibility. The architecture source separates base referral identity from reward-eligible code activation. A user can have identity metadata at onboarding while activation remains subject to policy thresholds, exceptions, or rollout phase.

## Why The Split Matters

The identity anchor answers "who is this referral participant?" Code activation answers "can this participant route reward-eligible referrals right now?" Keeping those states separate lets the system onboard users quickly without promising that every identity can immediately issue economically active codes.

The split also supports later settlement. If identity, activation, attribution, and claim consumption are collapsed into one mutable off-chain record, the program becomes hard to audit. If the identity anchor is stable and policy state is separately versioned, the docs can explain how eligibility changes without rewriting referral history.

## Publication Boundary

This page explains the source architecture. It should not publish final NFT metadata, code-activation rights, transferability, eligibility thresholds, exception lists, or referral-depth behavior until operator and implementation review resolve the current referral policy boundary.

## Sources

- `vibe-papers`: Neelo, "Section 1: System Baseline", "Referral Identity".
- `vibe-papers`: Neelo, "Section 2: Architecture", "Referral Code Activation Policy".
- `spec-03`: Referral-depth and public points/revenue caveats.

## Related Pages

- `authored-referral-identity-and-claim-flow`
- `authored-referral-code-activation-gates`
- `authored-referral-depth-open-question`
