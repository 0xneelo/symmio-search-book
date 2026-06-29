---
id: "authored-referral-mixed-accountability-boundary"
title: "Referral Mixed Accountability Boundary"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/01-system-baseline#14-operational-reality", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/01-system-baseline#15-design-requirement", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-01-system-baseline", "section-17-referral-program-17-docs-01-system-baseline-1-4-operational-reality", "section-17-referral-program-17-docs-01-system-baseline-1-5-design-requirement"]
---

# Referral Mixed Accountability Boundary

The referral baseline is functional for early growth, but Neelo flags mixed on-chain and off-chain accountability as a known limit.

That boundary matters because the two systems answer different questions. On-chain state can anchor identity, settlement, claim consumption, and replay protection. Off-chain systems can iterate on partner terms, eligibility, analytics, monitoring, and campaign policy. A credible architecture needs both, but it cannot let readers guess which layer is authoritative for each fact.

## Where Confusion Appears

Mixed accountability becomes risky when the public docs say "the referral system pays X" without saying whether X is:

- settled by contract state;
- computed from a versioned off-chain policy;
- provisional until reconciliation;
- subject to a private overlay;
- or blocked until a claim authorization is issued.

The source requirement is to reduce hidden trust assumptions. That does not mean every policy has to move on-chain immediately. It means every user-facing claim should name the accountable layer.

## Publication Boundary

The docs can explain the accountability model at a high level. They should not publish final contract addresses, message schemas, signer powers, off-chain reconciliation logic, or private policy overlays until implementation and security owners approve them.

## Sources

- `vibe-papers`: Neelo, "Section 1: System Baseline", "Operational Reality" and "Design Requirement".
- `spec-03`: current referral and rewards-publication caveats.

## Related Pages

- `authored-referral-three-plane-architecture`
- `authored-referral-settlement-security-controls`
- `authored-referral-public-private-policy-overlays`
