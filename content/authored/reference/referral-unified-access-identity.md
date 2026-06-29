---
id: "authored-referral-unified-access-identity"
title: "Referral Unified Access And Identity"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/06-access-phasing", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/02-architecture", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-06-access-phasing", "section-17-referral-program-17-docs-06-access-phasing-6-2-phase-b-unified-access-and-referral-identity", "authored-referral-identity-anchor"]
---

# Referral Unified Access And Identity

Neelo's second access phase converges access and referral into one identity surface.

The source gives three reasons for the convergence:

- lower user confusion;
- cleaner attribution;
- stronger growth instrumentation.

## Why A Single Surface Helps

If access codes, referral identity, and reward-eligible referral state are presented as unrelated systems, users will not know which code did what. Support will also struggle to explain which action created attribution and which action unlocked rewards.

A unified identity surface lets the docs explain access, attribution, and growth telemetry in one flow while still keeping reward eligibility as a separate policy state.

## Publication Boundary

This page explains the source convergence model. It should not publish final account-schema details, identity-token metadata, referral-code migration behavior, activation timing, analytics fields, or user-visible wording until operator and implementation review confirm them.

## Sources

- `vibe-papers`: Neelo, "Section 6: Access Phasing", "Phase B - Unified Access and Referral Identity".
- `vibe-papers`: Neelo, "Section 2: Architecture".
- `spec-03`: Current referral-depth and product-state caveats.

## Related Pages

- `authored-referral-identity-anchor`
- `authored-referral-three-plane-architecture`
- `authored-referral-code-activation-gates`
