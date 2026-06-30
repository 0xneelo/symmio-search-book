---
id: "authored-technically-async-economically-sync"
title: "Technically Async, Economically Sync"
section: "manifesto"
track: "16 - Listing Additional Notes"
status: "published"
volumeId: "volume-03-listing-power-and-orderbooks"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/16-listing-additional/16-docs/04-async-tech-sync-economics", "https://0xneelo.github.io/vibe_docs/docs/16-listing-additional/16-docs/05-liquidity-as-trader-experience"]
relatedGeneratedPages: ["neelo-16-listing-additional-16-docs-04-async-tech-sync-economics", "neelo-16-listing-additional-16-docs-05-liquidity-as-trader-experience", "authored-liquidity-as-trader-experience"]
---

# Technically Async, Economically Sync

The annex gives the compendium a useful vocabulary distinction: a system can be technically asynchronous while still economically synchronous.

Technically asynchronous means users can enter, exit, and update state at different times. The protocol can use oracle marks, queues, funding, accounting, or vault state to bridge those timing gaps. That is an engineering property.

Economically synchronous means PnL eventually has to clear. A winning long is paid by a losing short, an LP, token inventory, an insurance budget, a mint/burn mechanism, or a socialized loss path. If no credible payment path exists, the position is not economically complete even if the protocol accepted the trade.

This distinction explains why many long-tail perp designs look more permissionless than they feel. They solve the timing of market entry, but not necessarily the counterparty economics of market exit.

## Why Vibe Needs A Solver Layer

The source points toward dynamic mode switching: net internally when flow is balanced, use inventory when one side dominates, hedge externally when possible, widen or skew pricing when risk worsens, and isolate or graduate markets based on behavior. That is not a single curve. It is a risk-management layer.

## Sources

- `vibe-papers`: Neelo, "Section 4: Async Tech vs Sync Economics".
- `vibe-papers`: Neelo, "Section 5: Liquidity as Trader Experience".

## Related Pages

- `authored-liquidity-as-trader-experience`
- `authored-hybrid-settlement-solver-stack`
- `authored-dynamic-pricing-controls`
