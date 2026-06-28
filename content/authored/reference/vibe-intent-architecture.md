---
id: "authored-vibe-intent-architecture"
title: "Vibe Intent Architecture"
section: "product-reference"
track: "Trading Flow"
status: "publication-candidate"
sourceKeys: ["vibe-architecture", "symmio-core", "symmio-intent-lifecycle"]
sourceUrls: ["https://docs.vibe.trading/architectural-overview.md", "https://docs.symm.io/getting-started/core-concepts.md", "https://docs.symm.io/liquidity-provider-documentation/core-concepts/intent-lifecycle-and-event-monitoring.md"]
relatedGeneratedPages: ["vibe-architecture-amfq", "symmio-core-concepts", "symmio-intent-lifecycle", "authored-vibe-trade-flow"]
---

# Vibe Intent Architecture

Vibe's public architecture describes an Automated Market for Quotes, or AMFQ. Treat AMFQ/aMFQ as legacy naming for the current intent-based trading model: the user defines a trade intention, solvers stream real-time offers, and the trader can choose to execute the best available quote immediately instead of manually hunting through a traditional RFQ process.

That is the product-language version of intent-based trading. A trader is not first placing a passive order into a shared order book. They are expressing a desired outcome. Solvers compete to present executable terms.

## Quote First, Collateral After Acceptance

The architecture page makes an important distinction. During the quote stage, solvers can present real-time offers without upfront capital commitment. After the trader accepts an offer, the trader sends a request to trade, the trader's collateral is locked, and the solver reviews the request. If the request checks out, the solver deposits collateral and the bilateral agreement is established.

That prevents two bad explanations:

- Do not say solvers must pre-fund every streamed quote before a trader accepts it.
- Do not say collateral never matters until after execution.

The accurate sequence is quote, accept/request, collateral lock, solver acceptance, solver collateral deposit, bilateral agreement, lifecycle monitoring.

## Bilateral Agreement

Vibe's architecture page calls the live position a perpetual bilateral agreement. Symmio's core docs provide the protocol vocabulary behind that idea: PartyA is the trader/requester side, PartyB is the solver/counterparty side, and the protocol tracks collateral, margin, CVA, and lifecycle state.

This is why the Vibe x Symmio compendium should teach product and protocol language together. Vibe makes the interaction readable; Symmio supplies the settlement grammar.

## Reader Implication

For traders, "intent" means they are asking the market for executable terms. For solvers, it means they are operating quote, risk, collateral, hedging, and lifecycle infrastructure. For docs, it means every page should name whether it is explaining product quote UX, protocol lifecycle state, or solver operations.

## Sources

- `vibe-architecture`: AMFQ/legacy intent naming, trade intention, solver offers, request to trade, solver acceptance, collateral, bilateral agreement, and off-chain hedging.
- `symmio-core`: PartyA/PartyB and collateral vocabulary.
- `symmio-intent-lifecycle`: quote-event monitoring and lifecycle state.

## Related Pages

- `authored-vibe-trade-flow`
- `authored-bilateral-intent-lifecycle`
- `authored-solver-event-monitoring`
- `vibe-architecture-amfq`
