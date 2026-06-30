---
id: "authored-solver-event-monitoring"
title: "Solver Event Monitoring"
section: "protocol-reference"
track: "Symmio Core"
status: "published"
sourceKeys: ["symmio-what-is", "symmio-core", "symmio-intent-lifecycle"]
sourceUrls: ["https://docs.symm.io/getting-started/what-is-symmio.md", "https://docs.symm.io/getting-started/core-concepts.md", "https://docs.symm.io/liquidity-provider-documentation/core-concepts/intent-lifecycle-and-event-monitoring.md"]
relatedGeneratedPages: ["symmio-solver-role", "symmio-intent-lifecycle", "symmio-solving", "authored-bilateral-intent-lifecycle"]
---

# Solver Event Monitoring

A solver in Symmio is not only a price source. It is an event-driven counterparty operation. The solver watches on-chain quote events, filters for intents it is allowed to fill, runs risk and pricing logic, locks acceptable quotes, allocates collateral, manages hedging, and keeps reconciling lifecycle events after the position opens.

That is why the compendium should avoid treating "solver" as a cosmetic synonym for "market maker." A market maker can describe the economic role, but the operational role is narrower and more concrete: listen, evaluate, lock, hedge, open, monitor, and reconcile.

## What The Solver Watches

The official lifecycle source identifies quote events as the entry point. A PartyA quote can include symbol id, position type, order type, price, quantity, and a PartyB whitelist. A solver event listener watches for events where its PartyB address is eligible.

After seeing an eligible quote, the solver's own logic decides whether to act. The source names symbol settings, notional limits, spread, hedging inventory, and risk scores as examples of checks before locking an intent.

## What Changes After Locking

Locking changes the quote from pending to locked. That is a protocol state transition, not merely a UI spinner. The solver has committed to processing that intent path and must allocate collateral. Depending on the strategy, the position can open immediately or after the solver completes an off-chain hedge.

The monitoring work continues after the open. The solver should track cancellations, close requests, cancel-close requests, opened positions, close-pending positions, cancelled positions, liquidations, failed transactions, force-close paths, and unexpected states. The operational quality of this monitoring affects trader UX because stale or missed state becomes confusing product behavior.

## Why This Matters For Vibe Docs

Vibe can present an ask-first, trade-first interface, but the docs should make clear that solver quality is part of the product. Better solver infrastructure can produce tighter quotes, faster acceptance, better hedging, and cleaner lifecycle reconciliation. We should still keep exact Vibe solver-performance or venue-specific guarantees out of the public pages unless there is a current product source for them.

## Reader Implication

When a trader asks why an intent did not become a position, the answer should route through solver eligibility, risk acceptance, lock state, collateral allocation, and lifecycle events. When a solver asks what to build, the answer starts with event listeners and reconciliation, not a static pricing page.

## Sources

- `symmio-what-is`: solvers as professional market-maker counterparties who lock collateral.
- `symmio-core`: bilateral PartyA/PartyB model and solver role.
- `symmio-intent-lifecycle`: event listener, quote fields, risk checks, locking, collateral allocation, partial fills, and lifecycle monitoring.

## Related Pages

- `authored-bilateral-intent-lifecycle`
- `authored-intents-and-solvers`
- `authored-vibe-trade-flow`
- `symmio-solver-role`
