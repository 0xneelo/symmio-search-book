---
id: "authored-force-close-price-proof"
title: "Force Close Price Proof"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/a-operational-failures/i-operational-failure", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/a-operational-failures/iii-operation-failure-aftermath"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-a-operational-failures-i-operational-failure", "neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-a-operational-failures-iii-operation-failure-aftermath", "authored-force-close-proof-network"]
---

# Force Close Price Proof

The DDQ source says Force Close finalization depends on a price proof. After the user posts the Force Close request and the timer completes, the user supplies proof that the market traded at or through the requested close price after the request timestamp.

The source describes the proof in terms of recent candle data and freshness constraints. The important documentation point is not the exact candle parameter. It is that Force Close is not an arbitrary user-selected close. It requires a verifiable market-price condition.

## Why The Proof Matters

The proof is what lets the on-chain path close a position without trusting the offline solver. It connects the emergency close to market evidence after the user initiated the on-chain request.

That keeps the mechanism trader-grade without turning it into a blank check. The user gets a route around solver non-response, but the close still has to satisfy proof rules.

## Publication Boundary

Exact proof format, oracle or candle source, freshness window, accepted price condition, supported symbols, proof verifier, and chain-specific submission rules require implementation review. This page documents the source-backed proof requirement, not final production parameters.

## Sources

- `vibe-papers`: Neelo DDQ, "Operational Failure" and "Operation failure aftermath".

## Related Pages

- `authored-force-close-proof-network`
- `authored-force-close-protocol-timer`
- `authored-force-close-versus-escape-mode`
