---
id: "authored-force-close-proof-network"
title: "Force Close Proof Network"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/a-operational-failures/i-operational-failure", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/a-operational-failures/ii-comparsion-to-other-protocols"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-a-operational-failures-i-operational-failure", "neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-a-operational-failures-ii-comparsion-to-other-protocols", "authored-force-close-price-proof"]
---

# Force Close Proof Network

The DDQ source describes the Force Close proof as coming from a decentralized node or endpoint network rather than from the unresponsive solver. That is the trust-minimization claim: the user can obtain proof for the close path without solver cooperation.

The proof network uses account or position data together with market price data to generate a verifiable proof. The user can then submit that proof on-chain to finalize the close if the Force Close conditions are satisfied.

## Why It Is Different From Solver Recovery

If the same solver had to provide the proof, Force Close would not solve the operational-failure problem. The recovery path needs an independent proof source so the user is not waiting for the failed component to become healthy again.

This is also why the DDQ contrasts Force Close with broader escape-mode systems. Both can be trust-minimized, but Force Close is aimed at active position continuity: prove this position can close now, not only recover funds after a prolonged outage.

## Publication Boundary

The source mentions a large decentralized network, but production docs should not publish node counts, vendor names, proof availability guarantees, endpoint topology, or trust assumptions until current implementation and security review confirms them.

## Sources

- `vibe-papers`: Neelo DDQ, "Operational Failure" and "Comparsion to other Protocols".

## Related Pages

- `authored-force-close-price-proof`
- `authored-force-close-versus-escape-mode`
- `authored-solver-operational-failure-force-close`
