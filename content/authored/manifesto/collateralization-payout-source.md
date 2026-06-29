---
id: "authored-collateralization-payout-source"
title: "Collateralization Is The Payout Question"
section: "manifesto"
track: "01 — Perps Categories & Bootstrap Trilemma"
status: "publication-candidate"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/02-framework#2-3-dimension-2-collateralization-architecture", "https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/04-bootstrap-trilemma#4-6-why-the-trilemma-exists"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-02-framework-2-3-dimension-2-collateralization-architecture", "section-01-perp-classes-zscore-01-docs-04-bootstrap-trilemma-4-6-why-the-trilemma-exists", "authored-bootstrap-trilemma"]
---

# Collateralization Is The Payout Question

Collateralization is the question of who pays the winning trader. In a fully netted system, longs and shorts pay each other. If price rises, short-side losses fund long-side profits; if price falls, long-side losses fund short-side profits. That design is capital efficient because the venue does not need to pre-fund every directional outcome.

In a fully collateralized system, a vault, LP side, or solver balance sheet backs the payout path. A trader can win even when natural opposite flow has not appeared, because a defined counterparty has accepted the risk. That is why collateralized systems can bootstrap markets that a pure book cannot.

The cost is capital. If a market can produce a large payout, someone has to size, hold, hedge, or price the capital that stands behind it. Neelo's trilemma source treats this as risk transfer rather than risk deletion: bootstrap risk moves from absent traders to a capitalized counterparty, and that counterparty requires compensation.

## Reader Implication

This page helps prevent vague "liquidity" language. A perp market is credible only if the answer to "who pays winners?" is explicit. Vibe's staged thesis is that the answer can change over time: more collateralized at launch, more naturally netted as flow balances, and more order-book-like when the market matures.

## Sources

- `vibe-papers`: Neelo, "Section 2: Collateralization Architecture".
- `vibe-papers`: Neelo, "Section 4: Why The Trilemma Exists".

## Related Pages

- `authored-bootstrap-trilemma`
- `authored-residual-counterparty-balance-sheet-problem`
- `authored-temporal-separation-of-concerns`
