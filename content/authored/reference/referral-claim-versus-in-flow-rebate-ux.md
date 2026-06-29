---
id: "authored-referral-claim-versus-in-flow-rebate-ux"
title: "Referral Claim Versus In-Flow Rebate UX"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/03-rakeback-design#3-3-immediate-vs-claim-based-ux", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["section-17-referral-program-17-docs-03-rakeback-design-3-3-immediate-vs-claim-based-ux", "authored-referral-rakeback-policy-model", "authored-referral-settlement-security-controls", "authored-referral-fail-closed-incident-operations"]
---

# Referral Claim Versus In-Flow Rebate UX

The rakeback source frames rebate UX as a tradeoff between operational simplicity and user immediacy.

A claim-based model is simpler early because reward settlement can be authorized, checked, and consumed through a constrained claim path. That makes rollout easier, but it adds user friction and concentrates risk around signer controls, claim authorization, replay protection, and support.

A same-flow rebate or net-fee model is smoother for the user because the benefit appears directly in the trading flow. The cost is stronger real-time determinism: attribution, tier state, policy version, and settlement constraints must be known at execution time.

## Publication Boundary

The docs can explain the tradeoff before the final UX is locked. They should not imply that rebates are live, instantaneous, claimable, netted from fees, or available on every venue until the settlement path and policy version are approved.

## Sources

- `vibe-papers`: Neelo, "Section 3: Rakeback Design", 3.3.
- `spec-03`: Current referral and revenue disclosure boundaries remain owner-review.

## Related Pages

- `authored-referral-rakeback-policy-model`
- `authored-referral-settlement-security-controls`
- `authored-referral-fail-closed-incident-operations`
