---
id: "authored-hybrid-retrofit-is-new-protocol"
title: "Hybrid Retrofit Is A New Protocol"
section: "manifesto"
track: "08 — Competitive Architecture"
status: "published"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/08-competitive-analysis#8-2-architectural-lock-in"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-08-competitive-analysis-8-2-architectural-lock-in", "authored-replication-barriers-and-data-moats", "authored-perp-protocol-framework"]
---

# Hybrid Retrofit Is A New Protocol

Neelo's competitive analysis says the strongest replication barrier is architectural lock-in. A protocol optimized for one point in the design space cannot simply toggle into a bootstrap-to-graduation system.

An order-book-first protocol would need more than a new listing screen. To serve bootstrap markets, it would need LP vaults, solver infrastructure, asynchronous execution, isolated-market risk treatment, and collateralization logic. Those are the mechanisms it did not need when it focused on mature, netted, synchronous markets.

A vault-first protocol has the opposite problem. It already has capitalized counterparty support, but it would need trader-to-trader matching, netting accounting, order-book infrastructure, and transition logic to become efficient at maturity.

That is why "just copy Vibe" understates the work. The source frames hybrid traversal as a foundational design choice. If the existing protocol was not built to move across market states, copying the idea means rebuilding the protocol around a different lifecycle model.

## Publication Boundary

This page should not claim that specific competitors cannot or will not respond. The source supports a narrower claim: retrofitting hybrid lifecycle behavior is structurally harder than adding a market, UI, or rewards feature.

## Sources

- `vibe-papers`: Neelo, "Section 8: Architectural Lock-In".

## Related Pages

- `authored-replication-barriers-and-data-moats`
- `authored-perp-protocol-framework`
- `authored-temporal-separation-of-concerns`
