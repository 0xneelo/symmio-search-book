---
id: "authored-state-migration-replication-risk"
title: "State Migration Is A Replication Risk"
section: "manifesto"
track: "08 — Competitive Architecture"
status: "published"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/08-competitive-analysis#8-2-architectural-lock-in"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-08-competitive-analysis-8-2-architectural-lock-in", "authored-hybrid-retrofit-is-new-protocol", "authored-replication-barriers-and-data-moats"]
---

# State Migration Is A Replication Risk

Even if an incumbent protocol decides to rebuild toward a hybrid architecture, it still has to migrate live state. That is a different problem from writing a new whitepaper.

Existing user positions may live in formats designed for a different matching and collateral model. Existing LP capital was deposited under a particular risk promise. Existing contracts, governance processes, audits, and upgrade paths constrain what can change without creating trust risk.

The source identifies three migration surfaces: user positions, LP capital, and smart-contract infrastructure. Each one can turn a strategic pivot into a coordination problem. Users may not consent to a new position format. LPs may withdraw if the new model changes their risk profile. Contract changes require audits, governance, and renewed confidence.

This makes incumbency double-edged. Existing protocols have users and capital, but that state is attached to the old architecture. Vibe's advantage, in the source's framing, is designing for traversal before the state becomes too large to move cleanly.

## Publication Boundary

This page is not a security claim about any named protocol. It documents the general migration barrier in Neelo's competitive analysis and should avoid speculation about specific governance votes, audits, or upgrade timelines.

## Sources

- `vibe-papers`: Neelo, "Section 8: The State Migration Problem".

## Related Pages

- `authored-hybrid-retrofit-is-new-protocol`
- `authored-replication-barriers-and-data-moats`
- `authored-protocol-defined-market-lifecycle`
