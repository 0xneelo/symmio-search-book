---
id: "authored-protocol-owned-solver-public-option"
title: "Protocol-Owned Solver As Public Option"
section: "manifesto"
track: "05 - Proof Of Value"
status: "published"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/02-proof-of-value/02-docs/06-hybrid-solver-model"]
relatedGeneratedPages: ["neelo-02-proof-of-value-02-docs-06-hybrid-solver-model", "section-02-proof-of-value-02-docs-06-hybrid-solver-model-6-1-protocol-owned-solver-pos", "section-02-proof-of-value-02-docs-06-hybrid-solver-model-6-2-the-liquidity-waterfall"]
---

# Protocol-Owned Solver As Public Option

The hybrid solver model needs a cold-start answer: who quotes when a new market is too early, too volatile, or too small for third-party solvers to want the flow?

Neelo's source describes the protocol-owned solver as a public option for liquidity. External solvers can compete for attractive flow first. If they decline, the protocol-owned or protocol-operated solver can become the market maker of last resort, quoting wider prices that reflect the risk of supporting the market before organic liquidity has arrived.

That framing is important because it avoids two weak extremes. A pure third-party solver marketplace can leave niche intents unanswered. A pure protocol backstop can absorb every toxic trade. The public-option model tries to preserve market access while making the risk premium explicit.

## Publication Boundary

Whether the production system uses a protocol-owned solver, operator-run solver, third-party solvers, or a mixed routing model is implementation-sensitive. This page documents the source architecture and should be reviewed against the current solver deployment model before publication.

## Sources

- `vibe-papers`: Neelo, "Section 6: The Hybrid Solver Model: 6.1 Protocol-Owned Solver (POS)".
- `vibe-papers`: Neelo, "Section 6: The Hybrid Solver Model: 6.2 The Liquidity Waterfall".

## Related Pages

- `authored-solver-owned-market-maker`
- `authored-hybrid-solver-liquidity-waterfall`
- `authored-symmio-solver-operations-and-hedging`
