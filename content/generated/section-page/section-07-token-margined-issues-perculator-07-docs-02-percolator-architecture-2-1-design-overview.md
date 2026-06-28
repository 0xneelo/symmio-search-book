---
id: "section-07-token-margined-issues-perculator-07-docs-02-percolator-architecture-2-1-design-overview"
title: "Section 2: Percolator Architecture: 2.1 Design Overview"
section: "vision-sections"
track: "07 - Token-Margined Issues (Percolator)"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/02-percolator-architecture#2-1-design-overview"]
parentPageId: "neelo-07-token-margined-issues-perculator-07-docs-02-percolator-architecture"
sourcePath: "Docs/public/07_token_margined_issues_perculator/07_docs/02-Percolator-Architecture.md"
headingId: "2-1-design-overview"
---

# Section 2: Percolator Architecture: 2.1 Design Overview

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/02-percolator-architecture#2-1-design-overview

## Extracted Section Draft

## 2.1 Design Overview

Percolator is a hybrid derivatives engine combining:

- **Synthetics-style risk**: Users trade against LP accounts (inventory holders). The engine enforces margin, liquidation, ADL/socialization, and withdrawal safety against a shared balance sheet.
- **Orderbook-style execution**: LPs provide a pluggable matcher program via CPI—can implement AMM, RFQ, or CLOB pricing logic.

**Key property**: One market = one slab account. Each market is an isolated unit with its own collateral vault, risk engine instance, and participants. No cross-margin across markets.

---
