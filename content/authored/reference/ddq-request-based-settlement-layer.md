---
id: "authored-ddq-request-based-settlement-layer"
title: "DDQ Request-Based Settlement Layer"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers", "vibe-architecture", "symmio-intent-lifecycle"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/ddq-general-introduciton", "https://docs.vibe.trading/architectural-overview.md", "https://docs.symm.io/liquidity-provider-documentation/core-concepts/intent-lifecycle-and-event-monitoring.md"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-ddq-general-introduciton", "vibe-architecture-amfq", "symmio-intent-lifecycle", "authored-vibe-intent-architecture"]
---

# DDQ Request-Based Settlement Layer

The DDQ introduction names a request-based, or intent, settlement layer as one of the six primitives in the Vibe architecture stack. Its role is to make execution conditional on current risk review instead of forcing every trade through a continuously available public book.

In this model, a trader submits a request for exposure. The solver can price the request, assess inventory and hedge feasibility, set per-quote parameters, and then accept, refuse, or adjust terms before the bilateral position is formed. That makes the intent layer a risk-control surface, not just a different user-interface metaphor.

## Why Requests Matter

Long-tail markets are not continuously liquid. If a protocol must always fill at a displayed price, it can be forced into stale, unhedgeable, or manipulative conditions. A request-based path gives the solver a final opportunity to evaluate the actual market state before committing capital.

That is especially important for VibeCaps and other early markets where available liquidity, volatility, vault inventory, and external hedge routes can change quickly. The request layer lets the system quote the current state rather than pretending a market has mature order-book depth.

## Reader Implication

For traders, "intent" means the trade still needs a counterparty decision. The product can feel immediate when quotes are available, but the economic guarantee comes from accepted bilateral settlement, not from a passive order sitting in a public queue.

For solvers and LPs, the request layer is where per-trade risk discipline enters the flow. It is the place to explain quote validity, last-look style controls, collateral lock, solver acceptance, and why some requests may be refused or repriced when conditions change.

## Publication Boundary

Do not publish final quote-validity windows, solver acceptance rules, request cancellation semantics, collateral-lock timing, front-end last-look language, or production settlement guarantees without operator and implementation review. The source-backed claim is architectural: request-based settlement lets solver risk review happen before exposure is accepted.

## Sources

- `vibe-papers`: Neelo DDQ, "DDQ - General Introduction".
- `vibe-architecture`: Vibe intent quotation and solver acceptance context.
- `symmio-intent-lifecycle`: intent monitoring, locking, and lifecycle event context.

## Related Pages

- `authored-vibe-intent-architecture`
- `authored-bilateral-intent-lifecycle`
- `authored-soft-quote-last-look-risk-gating`
- `neelo-08-due-diligence-questionnaire-08-docs-ddq-general-introduciton`
