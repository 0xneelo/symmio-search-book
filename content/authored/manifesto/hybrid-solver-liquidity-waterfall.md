---
id: "authored-hybrid-solver-liquidity-waterfall"
title: "The Hybrid Solver Liquidity Waterfall"
section: "manifesto"
track: "14 - Information and Trade Convergence"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/14-information-trade-convergence/14-docs/06-hybrid-solver-model"]
relatedGeneratedPages: ["neelo-14-information-trade-convergence-14-docs-06-hybrid-solver-model", "section-14-information-trade-convergence-14-docs-06-hybrid-solver-model-6-1-protocol-owned-solver-pos", "section-14-information-trade-convergence-14-docs-06-hybrid-solver-model-6-2-the-liquidity-waterfall"]
---

# The Hybrid Solver Liquidity Waterfall

The hybrid solver model answers the cold-start question for intent markets: who quotes when a market is too new, too volatile, or too niche for external solvers to want the trade?

Neelo's source proposes a waterfall. External solvers see flow first and can fill when they have the appetite or hedge path. If they can quote tighter than the backstop, the user benefits and the protocol does not need to warehouse that risk. When external solvers pass, a protocol-owned or protocol-operated solver can provide the fallback quote with wider pricing that reflects the risk of being last resort.

The strategic reason is simple. Pure intent systems can fail if no one answers the intent. Pure protocol backstops can absorb too much toxic flow if they quote blindly. A waterfall can combine both: market competition where external solvers are willing, and a controlled bootstrap path where the protocol wants a market to exist.

The same source discusses inventory vaults, risk tranching, cross-market mutualization, pass-through execution, and LP revenue-sharing concepts. Those details are important for the economic model, but they should stay under operator and implementation review until public vault semantics, fee splits, and loss allocation are confirmed. The publishable architectural point is the waterfall itself: external price discovery first, backstop liquidity second, explicit risk premium throughout.

## Reader Implication

Solvers should read this as a market-access stack rather than a single counterparty. Traders should understand why early markets may receive wider quotes: the fallback quote is doing the work that a mature market's organic liquidity has not yet earned.

## Sources

- `vibe-papers`: Neelo, "Section 6: The Hybrid Solver Model".

## Related Pages

- `authored-solver-owned-market-maker`
- `authored-residual-counterparty-hedge-first`
- `authored-loss-waterfall-and-profit-caps`
