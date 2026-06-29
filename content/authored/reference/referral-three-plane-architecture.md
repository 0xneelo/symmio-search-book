---
id: "authored-referral-three-plane-architecture"
title: "Referral Three-Plane Architecture"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/02-architecture#2-1-component-boundaries", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/02-architecture#2-4-trust-boundaries", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-02-architecture", "section-17-referral-program-17-docs-02-architecture-2-1-component-boundaries", "section-17-referral-program-17-docs-02-architecture-2-4-trust-boundaries", "authored-referral-identity-and-claim-flow", "authored-referral-settlement-security-controls"]
---

# Referral Three-Plane Architecture

Neelo's referral architecture splits the stack across three planes:

1. on-chain identity and settlement;
2. off-chain attribution and policy logic;
3. user-facing access and claims UX.

That split is the core architecture. Referral programs need policy agility, but value-bearing claims need settlement integrity.

## Deterministic, Policy, And Monitoring State

The source also splits state into deterministic state, policy state, and monitoring state.

Deterministic state covers identity, claim consumption, and nonces. Policy state covers tier tables, eligibility gates, and private overlays. Monitoring state covers anomaly detection and reconciliation.

These boundaries prevent a growth-policy change from silently rewriting economic settlement, and they prevent monitoring tools from becoming hidden policy engines.

## Reader Implication

The docs should not describe the referral system as only an app feature. It is a multi-plane attribution and settlement system. The exact implementation can evolve, but public docs should preserve the distinction between what is deterministic, what is policy-driven, and what is observed for integrity.

## Publication Boundary

This page explains the source architecture. It should not publish final contract addresses, signer topology, claim paths, policy tables, monitoring thresholds, or incident controls until implementation and operator review confirm them.

## Sources

- `vibe-papers`: Neelo, "Section 2: Architecture", "Component Boundaries" and "Trust Boundaries".
- `spec-03`: Referral and public economics caveats.

## Related Pages

- `authored-referral-identity-and-claim-flow`
- `authored-referral-settlement-security-controls`
- `authored-points-claim-bridge-and-vesting`
