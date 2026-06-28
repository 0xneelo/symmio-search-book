---
id: "section-07-token-margined-issues-perculator-07-docs-02-percolator-architecture-2-3-the-inverted-market-mode"
title: "Section 2: Percolator Architecture: 2.3 The Inverted Market Mode"
section: "vision-sections"
track: "07 - Token-Margined Issues (Percolator)"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/02-percolator-architecture#2-3-the-inverted-market-mode"]
parentPageId: "neelo-07-token-margined-issues-perculator-07-docs-02-percolator-architecture"
sourcePath: "Docs/public/07_token_margined_issues_perculator/07_docs/02-Percolator-Architecture.md"
headingId: "2-3-the-inverted-market-mode"
---

# Section 2: Percolator Architecture: 2.3 The Inverted Market Mode

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/02-percolator-architecture#2-3-the-inverted-market-mode

## Extracted Section Draft

## 2.3 The Inverted Market Mode

Percolator supports "inverted" mode where internal price representation is `1/price`. For SOL/USD inverted, collateralized in SOL:

- **Going long** = long USD exposure (profit if SOL drops)
- **Going short** = short USD exposure (profit if SOL rises)
- **Collateral, fees, funding, PnL** — all denominated in SOL

In Percolator SOV, PERC serves simultaneously as collateral token, traded asset, and settlement currency.

---
