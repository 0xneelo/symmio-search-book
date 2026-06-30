---
id: "authored-vibe-as-discovery-layer"
title: "Vibe As The Discovery Layer"
section: "manifesto"
track: "03 — Hyperliquid And Market Graduation"
status: "published"
sourceKeys: ["vibe-papers", "hyperliquid-hip3"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/04-ode-to-the-orderbook/04-docs/overview", "https://hyperliquid.gitbook.io/hyperliquid-docs/hyperliquid-improvement-proposals-hips/hip-3-builder-deployed-perpetuals.md"]
relatedGeneratedPages: ["neelo-04-ode-to-the-orderbook-04-docs-overview", "hyperliquid-hip3"]
---

# Vibe As The Discovery Layer

Hyperliquid-style infrastructure matters because it shows how far order-book execution can go when a market is already active enough to deserve the machinery. HIP-3 extends that logic by letting builders deploy perpetual markets with their own responsibilities and risk constraints.

The discovery problem remains upstream. A builder-deployed market still needs to prove demand, attract makers, manage risk, and avoid launching into a silent book. Vibe's role in the thesis is to sit before that moment: expose demand, let solvers quote the long tail, and produce the evidence that a market deserves a more mature venue.

That makes Vibe complementary to HIP-3 rather than merely competitive with it. If Vibe helps a token prove sustained two-sided derivative demand, then Hyperliquid-style order-book infrastructure becomes more useful, not less. The assembly line is launchpad or DEX attention, then Vibe discovery, then deeper market infrastructure when the asset earns it.

## Reader Implication

A market creator should not treat the first listing as the final venue decision. The important question is which layer answers today's liquidity problem and which layer the market should graduate toward next.

## Sources

- `vibe-papers`: Neelo, "Ode to OrderBooks".
- `hyperliquid-hip3`: Hyperliquid HIP-3 builder-deployed perpetuals documentation.

## Related Pages

- `authored-intents-complete-order-books`
- `hyperliquid-hip3`
- `neelo-04-ode-to-the-orderbook-04-docs-overview`
