---
id: "authored-bilateral-intent-lifecycle"
title: "Bilateral Intent Lifecycle"
section: "protocol-reference"
track: "Symmio Core"
status: "publication-candidate"
sourceKeys: ["symmio-core", "symmio-intent-lifecycle"]
sourceUrls: ["https://docs.symm.io/getting-started/core-concepts.md", "https://docs.symm.io/liquidity-provider-documentation/core-concepts/intent-lifecycle-and-event-monitoring.md"]
relatedGeneratedPages: ["symmio-core-concepts", "symmio-intent-lifecycle", "authored-symmio-clearing-house-layer", "authored-symmio-party-a-party-b"]
---

# Bilateral Intent Lifecycle

The Symmio trade lifecycle begins with a bilateral request, not with a global matching engine. PartyA expresses a trade intent: market, side, size, price, collateral terms, and allowed counterparties. PartyB watches for acceptable intents, evaluates whether the trade fits its pricing and risk constraints, then locks and accepts it if the terms work.

That lifecycle is the operating shape behind the Vibe front door. A product can make the action feel like "submit a trade," but the protocol-level sequence is more precise: submit intent, observe event, evaluate, lock, allocate collateral, open position, monitor lifecycle, request close, settle or liquidate.

## State Path

The source-backed state path is:

- PartyA submits an intent on-chain.
- The intent is visible to solvers, especially the PartyB addresses whitelisted for that quote.
- A solver evaluates symbol settings, notional limits, spread, hedging inventory, and risk before acting.
- If the solver accepts, it locks the quote; the lifecycle moves from pending to locked.
- Collateral is allocated and the position can open immediately or after the solver completes its hedging path.
- If only part of the quantity is accepted, the remaining amount can be reposted as a new quote.
- Close requests, close-cancel requests, cancellations, force-close paths, and liquidations become distinct lifecycle events that solvers and frontends must reconcile.

The important docs move is to name the state. A pending intent, locked quote, opened position, close-pending position, cancelled request, and liquidated position are not interchangeable user-support cases.

## Why This Is Bilateral

Symmio's core docs deliberately name PartyA and PartyB because responsibility is split. PartyA requests. PartyB accepts and manages the other side. Liquidators monitor collateral. The protocol does not need a central order book to decide whether the trade exists; it needs a counterparty willing to lock collateral and accept the quote under the rules.

## Reader Implication

For traders, the lifecycle answers "what happens after I submit?" For solvers, it answers "which event should I react to next?" For support, it prevents vague answers like "the trade is processing" when the precise state is pending, locked, close-pending, cancelled, or liquidated.

## Sources

- `symmio-core`: PartyA/PartyB bilateral model and high-level trade path.
- `symmio-intent-lifecycle`: quote submission, solver monitoring, locking, collateral allocation, partial fills, and lifecycle status changes.

## Related Pages

- `authored-symmio-clearing-house-layer`
- `authored-solver-event-monitoring`
- `authored-symmio-party-a-party-b`
- `symmio-intent-lifecycle`
