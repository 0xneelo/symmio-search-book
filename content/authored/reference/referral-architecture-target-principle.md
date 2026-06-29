---
id: "authored-referral-architecture-target-principle"
title: "Referral Architecture Target Principle"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/02-architecture#2-6-target-principle", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-02-architecture", "section-17-referral-program-17-docs-02-architecture-2-6-target-principle", "authored-referral-three-plane-architecture", "authored-referral-architecture-failure-modes"]
---

# Referral Architecture Target Principle

Neelo's referral architecture compresses into one target principle: keep policy agility off-chain where needed, but make settlement integrity on-chain by default.

The principle matters because referral systems need both speed and constraint. Growth teams need room to change tiers, campaign grants, eligibility windows, private overlays, and rollout rules. Users and partners need confidence that value-bearing claims cannot be rewritten by the same mutable policy layer.

## The Two Rules

The source gives two rules for drawing that boundary.

If a rule can change quickly, it must be transparently versioned. That applies to tier tables, eligibility gates, campaign overlays, issuer qualification, and other policy that may need iteration.

If value can be claimed, it must be cryptographically constrained. That applies to claim authorizations, nonces, expiry, recipient scope, amount scope, and one-time consumption.

## Reader Implication

When the docs explain referral flexibility, they should not imply arbitrary operator discretion over settled value. Flexibility belongs in versioned policy. Integrity belongs in constrained claim and settlement paths.

## Publication Boundary

This page explains the source target principle. It should not publish final contract interfaces, signer topology, versioning schema, claim-message format, approval process, or policy-change governance until implementation, security, legal, accounting, and operator review approve them.

## Sources

- `vibe-papers`: Neelo, "Section 2: Architecture", "Target Principle".
- `spec-03`: referral-depth and public economics caveats.

## Related Pages

- `authored-referral-three-plane-architecture`
- `authored-referral-architecture-failure-modes`
- `authored-referral-replay-safe-claim-authorizations`
