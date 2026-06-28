---
id: "authored-four-transitions"
title: "The Four Transitions"
section: "manifesto"
track: "06 — Market Creation Architecture"
status: "publication-candidate"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/05-vibe-architecture#5-2-the-four-transitions"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-05-vibe-architecture-5-2-the-four-transitions"]
---

# The Four Transitions

Neelo's architecture is a transition system, not a static exchange design. A new market starts in the safest workable state, then moves toward capital efficiency as the market proves itself.

The first transition is collateralization. Bootstrap markets need more explicit backing because natural trader flow is thin. Mature markets can rely more on netting because opposing positions increasingly offset one another.

The second transition is matching synchronicity. Early execution can be asynchronous because traders need immediate fills before a natural counterparty exists. Later, as the market thickens, synchronous matching and order-book behavior become more plausible.

The third transition is counterparty mix. At first, the solver is the main counterparty. Over time, the solver becomes less of a directional backstop and more of a market-maker around naturally matched trader flow.

The fourth transition is insurance topology. Early markets should be isolated because the failure of one experimental market should not contaminate the system. Mature markets can earn better cross-margin and insurance treatment after their behavior is known.

## Reader Implication

The compendium should use the four transitions to explain why a Vibe market can be worse than an order book at launch but still be the right primitive. The point is not to freeze the bootstrap state; the point is to give markets a path out of it.

## Sources

- `vibe-papers`: Neelo, "Section 5: Vibe Trading Architecture: 5.2 The Four Transitions".

## Related Pages

- `authored-autonomous-market-creation`
- `authored-market-maturation-z-score`
- `authored-solver-owned-market-maker`
