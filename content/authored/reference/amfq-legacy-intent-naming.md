---
id: "authored-amfq-legacy-intent-naming"
title: "AMFQ Is Legacy Naming For Intents"
section: "product-reference"
track: "Trading Flow"
status: "published"
sourceKeys: ["vibe-architecture", "symmio-core", "symmio-intent-lifecycle", "styleguide"]
sourceUrls: ["https://docs.vibe.trading/architectural-overview.md", "https://docs.symm.io/getting-started/core-concepts.md", "https://docs.symm.io/liquidity-provider-documentation/core-concepts/intent-lifecycle-and-event-monitoring.md", "STYLEGUIDE.md"]
relatedGeneratedPages: ["vibe-architecture-amfq", "authored-vibe-intent-architecture", "authored-intents-and-solvers", "symmio-intent-lifecycle"]
---

# AMFQ Is Legacy Naming For Intents

AMFQ, sometimes written aMFQ, stands for Automated Market for Quotes. In the Vibe docs corpus, treat it as the old product name for the current Intents model.

The current reader-facing term should be intent. A trader expresses a desired trade outcome, solvers return executable offers, and the accepted request moves through collateral, counterparty acceptance, and protocol lifecycle state. AMFQ describes the quote-market shape of that same product idea; it should not be documented as a separate live system beside Intents.

## How To Use The Terms

Use intent when explaining current Vibe and Symmio behavior. Use AMFQ only when a reader is searching older docs, older diagrams, source labels, or archived architecture language.

The distinction matters because "Automated Market for Quotes" sounds like a standalone product category. The compendium's canonical framing is narrower and more durable: an intent-based derivatives flow where solvers compete to satisfy a requested outcome and Symmio records the accepted bilateral state.

## Reader Implication

If a user asks "what is AMFQ?", route them here first, then to Vibe Intent Architecture. The answer should translate the legacy name into current terms before explaining trade flow. That prevents duplicate vocabulary and keeps older source material searchable.

## Sources

- `vibe-architecture`: AMFQ/aMFQ naming, trade intention, solver offers, request-to-trade flow, collateral, and bilateral agreement.
- `symmio-core`: PartyA, PartyB, intent, collateral, and margin vocabulary.
- `symmio-intent-lifecycle`: quote events, solver monitoring, locking, and lifecycle state.
- `styleguide`: local terminology lock for current docs language.

## Related Pages

- `authored-vibe-intent-architecture`
- `authored-intents-and-solvers`
- `authored-bilateral-intent-lifecycle`
- `authored-solver-event-monitoring`
