---
id: "authored-options-intent-lifecycle"
title: "Options Intent Lifecycle"
section: "protocol-reference"
track: "Symmio Options"
status: "published"
sourceKeys: ["vibe-architecture", "symmio-core", "symmio-options-docs", "symmio-options-technical-architecture", "symmio-options-facets", "symmio-options-partya-open", "symmio-options-partyb-open", "symmio-options-partya-close", "symmio-options-partyb-close", "symmio-options-instant-layer"]
sourceUrls: ["https://docs.vibe.trading/architectural-overview.md", "https://docs.symm.io/getting-started/core-concepts.md", "https://docs.symm.io/contract-documentation/symmio-options-v0.2.1.md", "https://docs.symm.io/contract-documentation/symmio-options-v0.2.1/the-symmio-diamond.md", "https://docs.symm.io/contract-documentation/symmio-options-v0.2.1/facets.md", "https://docs.symm.io/contract-documentation/symmio-options-v0.2.1/facets/partya-open-facet.md", "https://docs.symm.io/contract-documentation/symmio-options-v0.2.1/facets/partyb-open-facet.md", "https://docs.symm.io/contract-documentation/symmio-options-v0.2.1/facets/partya-close-facet.md", "https://docs.symm.io/contract-documentation/symmio-options-v0.2.1/facets/partyb-close-facet.md", "https://docs.symm.io/contract-documentation/symmio-options-v0.2.1/helper-contracts/instant-layer.md"]
relatedGeneratedPages: ["authored-vibe-trade-flow", "authored-intents-and-solvers", "authored-symmio-party-a-party-b", "symmio-options-contracts", "symmio-settlement"]
---

# Options Intent Lifecycle

The options lifecycle should be documented as a sequence of explicit states, not as a generic "place trade" action. Vibe's public architecture explains the product-side pattern: a trader expresses a trade intention, solvers show executable offers, the trader accepts, and the accepted request proceeds into on-chain execution. Symmio's core docs explain the protocol vocabulary behind that pattern: PartyA creates the intent; PartyB is the solver/counterparty; collateral, margin, and lifecycle state are tracked by the protocol.

The Symmio options docs make this concrete. Opening an options position starts when PartyA submits an open intent. The intent stays pending until a PartyB locks and fills it. Only then does a live trade exist. Closing follows the same philosophy: PartyA creates a close intent against an open trade, and PartyB fills all or part of it at a price that must be favorable to PartyA's requested terms.

## Open Path

The open path has four user-visible states:

- PartyA submits an open intent with trade-agreement terms: symbol, quantity, strike price, expiration, margin type, side, exercise fee, solver fees, deadline, fee token, affiliate, and optional metadata.
- The intent is pending. It can expire if the deadline passes, or PartyA can request cancellation before fill.
- A registered PartyB locks the intent. Locking reserves the intent so another PartyB cannot act on it during the processing window.
- PartyB fills the intent, fully or partially. A full fill creates a trade. A partial fill creates a trade for the filled quantity and a residual intent for the unfilled quantity.

This is the options-specific form of the broader Symmio intent model. The key reader point is that an open intent is not yet a position. It is a source-backed, on-chain request for a PartyB to accept under bounded terms.

## Close Path

The close path mirrors the open path but starts from an existing trade:

- PartyA submits a close intent with trade id, quantity, price, and deadline.
- The close intent sits pending until PartyB fills it or the deadline passes.
- PartyB can fill the full quantity or a partial quantity.
- If PartyA cancels a live close intent, the cancellation can move through a pending acknowledgement path before final cancellation.

This matters for documentation because "close" is not a single button-level outcome. A page should tell the reader whether a close is pending, partially filled, expired, cancelled, or fully reflected in trade state.

## Diamond And Facets

The options implementation is organized through a Diamond architecture. The Diamond acts as the facade contract; facets hold function boundaries and use shared storage libraries. That structure is not reader decoration. It tells integrators where behavior lives:

- PartyA Open Facet: creation, cancellation, and expiry of open intents.
- PartyB Open Facet: locking, unlocking, filling, partial filling, and cancellation acknowledgement for open intents.
- PartyA Close Facet: creation, cancellation, and expiry of close intents.
- PartyB Close Facet: full or partial close fills and close-cancellation acknowledgement.
- Instant Layer: signed operation execution, replay protection, PartyB and MultiAccount registration, and template/batch execution paths.

The compendium should use these names whenever it explains options state. Vague lifecycle copy will not be precise enough for solvers, integrators, or support.

## Publication Boundary

The source-backed connection is this: Vibe exposes an intent-and-solver user experience, and Symmio options exposes open/close intent mechanics for options contracts. That is enough to document the conceptual lifecycle from product intention to protocol state.

The source-backed connection is not enough to publish a final Vibe-specific covered-call or vault-backed-inventory example without owner review. The page can say where such an example belongs: PartyA expresses demand, solver/PartyB evaluates and fills, inventory and collateral assumptions must be disclosed, and the live trade then follows the Symmio options open/close lifecycle. The exact Vibe product terms, vault source, coverage rules, and inventory accounting remain part of `G-008` until confirmed.

## Reader Implication

For a trader, the important question is "which state am I in?" Pending, locked, filled, partially filled, expired, cancelled, open, partially closed, and closed should be visible as distinct states.

For a solver, the important question is "what action am I responsible for now?" Locking, filling, unlocking, acknowledging cancellation, and handling partial fills are separate operational responsibilities.

For an integrator, the important question is "which contract surface owns this behavior?" The answer should point to the exact facet or helper contract, then to the higher-level product page that explains why the state exists.

## Sources

- `vibe-architecture`: Vibe intent, solver offer, execution, and hedging flow.
- `symmio-core`: PartyA, PartyB, intent, collateral, margin, and lifecycle vocabulary.
- `symmio-options-docs`: current Symmio options documentation index.
- `symmio-options-technical-architecture`: Diamond architecture and shared storage/facet model.
- `symmio-options-facets`: facet boundary model.
- `symmio-options-partya-open`: PartyA open intent lifecycle and parameters.
- `symmio-options-partyb-open`: PartyB lock/fill/partial-fill behavior.
- `symmio-options-partya-close`: PartyA close intent lifecycle.
- `symmio-options-partyb-close`: PartyB close fill/cancellation behavior.
- `symmio-options-instant-layer`: signed operation and instant-mode execution surface.

## Related Pages

- `authored-vibe-trade-flow`
- `authored-intents-and-solvers`
- `authored-symmio-party-a-party-b`
- `symmio-options-contracts`
