---
id: "authored-referral-code-activation-gates"
title: "Referral Code Activation Gates"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/02-architecture#23-referral-code-activation-policy", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-02-architecture", "authored-referral-access-phasing-operating-model", "authored-referral-identity-anchor"]
---

# Referral Code Activation Gates

Neelo's referral architecture separates referral identity from referral-code activation. The source model allows a user to hold identity metadata at onboarding while reward-eligible code activation requires additional policy approval.

The architecture gives example activation gates:

- reaching a minimum performance threshold, such as rakeback tier 2;
- reaching a minimum cumulative trading threshold, such as `$10M` of volume;
- receiving an administrative exception for strategic partners, designated contributors, or meaningful closed-alpha and pre-beta testers.

## Pre-Beta As A Transition State

The source treats pre-beta as a transition period, roughly 30-60 days after beta launch, where referral codes may exist but are not yet globally activated for normal reward routing.

That distinction matters for public docs. A code can exist, identity can be recorded, and access can be phased before the reward graph is fully open. The docs should name which state the user is in instead of implying that every code has the same economic status.

## Publication Boundary

The threshold examples are source-model examples, not final public Vibe policy. Do not publish live tier gates, volume thresholds, exception lists, pre-beta duration, global activation timing, or retroactive backfill behavior until operator and implementation review confirm them.

## Sources

- `vibe-papers`: Neelo, "Section 2: Architecture", "Referral Code Activation Policy".
- `spec-03`: Referral-depth and historical-accounting caveats.

## Related Pages

- `authored-referral-access-phasing-operating-model`
- `authored-referral-identity-anchor`
- `authored-referral-depth-open-question`
