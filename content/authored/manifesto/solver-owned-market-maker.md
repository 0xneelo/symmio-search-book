---
id: "authored-solver-owned-market-maker"
title: "The Solver As Protocol-Owned Market Maker"
section: "manifesto"
track: "06 — Market Creation Architecture"
status: "published"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/05-vibe-architecture#5-3-the-solver-protocol-owned-market-maker", "https://0xneelo.github.io/vibe_docs/docs/02-proof-of-value/02-docs/06-hybrid-solver-model#6-2-the-liquidity-waterfall"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-05-vibe-architecture-5-3-the-solver-protocol-owned-market-maker", "section-02-proof-of-value-02-docs-06-hybrid-solver-model-6-2-the-liquidity-waterfall"]
---

# The Solver As Protocol-Owned Market Maker

The solver is the bridge between "a market should exist" and "the market has enough natural flow to sustain itself." It handles the operations that are too computationally complex, time-sensitive, or state-heavy to run purely on-chain.

In the Neelo architecture, the solver can quote, absorb residual imbalance, manage risk parameters, coordinate hedges, trigger liquidation logic, and decide when a market is ready for a more efficient state. That makes it a protocol-owned market maker during bootstrap rather than a passive matching engine.

The strongest way to document this is as a responsibility boundary. The settlement layer should be where durable state and enforceable outcomes live. The solver layer is where path-dependent calculations, risk decisions, and execution quality are managed.

## Liquidity Waterfall

Neelo's hybrid solver model also introduces a routing order. External solvers can fill flow first when the trade is attractive. If they do not, the protocol-owned solver can step in as the safety net. This keeps niche markets open without forcing every trade to be protocol risk.

## Sources

- `vibe-papers`: Neelo, "Section 5: Vibe Trading Architecture: 5.3 The Solver: Protocol-Owned Market Maker".
- `vibe-papers`: Neelo, "Section 6: The Hybrid Solver Model: 6.2 The Liquidity Waterfall".

## Related Pages

- `authored-intents-and-solvers`
- `authored-symmio-party-a-party-b`
- `authored-hybrid-settlement-solver-stack`
