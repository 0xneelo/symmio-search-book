---
id: "authored-symmio-contract-quote-lifecycle"
title: "Symmio Contract Quote Lifecycle"
section: "protocol-reference"
track: "Symmio Contracts"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["symmio-contract-architecture", "symmio-intent-lifecycle", "symmio-market-limit-orders"]
sourceUrls: ["https://docs.symm.io/security-and-architecture/contract-architecture-overview.md", "https://docs.symm.io/liquidity-provider-documentation/core-concepts/intent-lifecycle-and-event-monitoring.md", "https://docs.symm.io/trader-documentation/how-trading-works-in-symmio/market-vs.-limit-orders.md"]
relatedGeneratedPages: ["symmio-contract-architecture", "symmio-intent-lifecycle", "symmio-market-limit-orders"]
---

# Symmio Contract Quote Lifecycle

The official architecture page gives the contract-layer view of the Symmio quote lifecycle: a quote moves from pending, to locked, to opened, to close-pending, then closed or cancelled through defined state transitions.

## From Pending To Opened

PartyA creates a quote with symbol, side, order type, price, quantity, margin components, deadline, affiliate context, and required signed data. Pending balances lock while the quote waits.

PartyB can lock an eligible quote after validating its own solvency and the quote's risk. Locking is a protocol state transition, not just a frontend status. If PartyB proceeds, the open call can fill the whole quote or partially fill it, creating a remainder quote for the unfilled amount.

## Closing And Cancellation

PartyA requests a close by specifying close terms. PartyB fills the close request, with the official page distinguishing partial-fill behavior for limit orders from full-execution requirements for market orders. Cancellation flows cover pending quotes, locked quotes, and pending close requests.

The architecture page also describes batch variants for PartyB group actions and newer funding-rate aggregation that reduces per-quote processing pressure by tracking symbol-level aggregates.

## Reader Implication

When a user asks why a trade is pending, locked, open, close-pending, cancelled, or partially filled, the answer should route to lifecycle state, solver eligibility, collateral checks, and the quote's order type. The docs should not flatten those states into a generic "order status."

## Sources

- `symmio-contract-architecture`: official contract quote lifecycle and grouped PartyB action context.
- `symmio-intent-lifecycle`: official solver event-monitoring lifecycle.
- `symmio-market-limit-orders`: official market and limit quote behavior.

## Related Pages

- `authored-bilateral-intent-lifecycle`
- `authored-solver-event-monitoring`
- `authored-symmio-solver-operations-and-hedging`
