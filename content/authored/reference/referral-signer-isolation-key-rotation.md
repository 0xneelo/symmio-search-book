---
id: "authored-referral-signer-isolation-key-rotation"
title: "Referral Signer Isolation And Key Rotation"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/08-security-controls", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-08-security-controls", "authored-referral-settlement-security-controls", "authored-referral-three-plane-architecture"]
---

# Referral Signer Isolation And Key Rotation

The referral security source names signer compromise as a critical risk surface. If referral rewards can become claims, the signer path becomes part of economic settlement, not just a backend convenience.

Signer isolation means the authority that approves reward claims should be separated from ordinary growth tooling. A campaign operator should not be able to silently mint economic claims by changing a tier table or exporting a CSV. Claim authorization needs constrained keys, approval controls, and a rotation path if a key is suspected to be exposed.

Key rotation is not only a recovery action. It is also a readiness requirement. A system that cannot rotate signers without breaking claim accounting is not ready for high-growth launch conditions.

## Publication Boundary

The public docs can explain the control objective: referral settlement keys should be isolated, approval-gated, and rotatable. They should not publish signer addresses, custody topology, approval quorum, rotation procedure, or emergency thresholds until implementation and security review approve those details.

## Sources

- `vibe-papers`: Neelo, "Section 8: Security Controls".
- `spec-03`: referral and points settlement caveats.

## Related Pages

- `authored-referral-settlement-security-controls`
- `authored-referral-three-plane-architecture`
- `authored-points-claim-bridge-and-vesting`
