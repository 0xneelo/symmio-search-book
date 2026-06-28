---
id: "section-01-perp-classes-zscore-01-docs-01-introduction-1-4-why-existing-solutions-fail"
title: "Section 1: Introduction: 1.4 Why Existing Solutions Fail"
section: "vision-sections"
track: "01 — Perps Categories & Bootstrap Trilemma"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/01-introduction#1-4-why-existing-solutions-fail"]
parentPageId: "neelo-01-perp-classes-zscore-01-docs-01-introduction"
sourcePath: "Docs/public/01_perp_classes_zscore/01_docs/01-Introduction.md"
headingId: "1-4-why-existing-solutions-fail"
---

# Section 1: Introduction: 1.4 Why Existing Solutions Fail

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/01-introduction#1-4-why-existing-solutions-fail

## Extracted Section Draft

## 1.4 Why Existing Solutions Fail

One might ask: why can't existing perpetual protocols simply list more assets?

The answer lies in architectural constraints that we will explore in detail throughout this paper. In brief:

**Order Book Protocols (Hyperliquid, dYdX)**
Cannot bootstrap markets from zero. Order books require buyers AND sellers simultaneously. For a new, unproven asset, one side will always be missing. These protocols can only list assets that already have established trading interest.

**Collateralized Protocols (GMX, Gains Network)**
Can technically list any asset but face severe capital efficiency constraints. LPs must fully collateralize potential payouts, leading to high fees, wide spreads, and limited leverage. This model works for a handful of major assets but cannot scale to thousands.

**Hybrid Attempts (Derp.fun, Imperial)**
Recent protocols have attempted to combine asynchronous matching with netted positions. As we will demonstrate, this combination fails catastrophically at market bootstrap because there is no defined counterparty to pay winning traders.

---
