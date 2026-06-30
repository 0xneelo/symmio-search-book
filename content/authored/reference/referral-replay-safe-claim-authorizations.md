---
id: "authored-referral-replay-safe-claim-authorizations"
title: "Replay-Safe Referral Claim Authorizations"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/08-security-controls", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/02-architecture", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-08-security-controls", "neelo-17-referral-program-17-docs-02-architecture", "authored-referral-identity-and-claim-flow"]
---

# Replay-Safe Referral Claim Authorizations

The security source requires replay-safe claims using nonces and expiry. The reason is direct: a claim authorization should be usable only for the intended account, amount, policy version, and time window.

Without replay protection, a legitimate claim can become an over-issuance vector. A user or attacker could attempt to reuse a stale authorization, submit the same claim through multiple paths, or exploit a policy transition where old and new claim formats overlap.

Replay safety belongs in deterministic settlement state. Policy can decide who is eligible, but claim consumption, nonces, and expiry should not be mutable growth-policy state. That separation keeps marketing changes from rewriting economic history.

## Publication Boundary

The docs can describe the minimum properties of a safe claim: scoped recipient, amount, source bucket, nonce, expiry, policy version, and one-time consumption. Exact message schema, contract interface, nonce storage, and expiration windows remain implementation and security review.

## Sources

- `vibe-papers`: Neelo, "Section 8: Security Controls".
- `vibe-papers`: Neelo, "Section 2: Architecture".
- `spec-03`: current points and referral-settlement caveats.

## Related Pages

- `authored-referral-identity-and-claim-flow`
- `authored-referral-three-plane-architecture`
- `authored-points-claim-bridge-and-vesting`
