---
id: "section-13-framework-value-permissionless-perps-13-docs-01-introduction-1-3-the-challenge-of-low-cap-perpetuals"
title: "Section 1: Introduction: 1.3 The Challenge of Low-Cap Perpetuals"
section: "vision-sections"
track: "13 — Proof of Value Framework"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/01-introduction#1-3-the-challenge-of-low-cap-perpetuals"]
parentPageId: "neelo-13-framework-value-permissionless-perps-13-docs-01-introduction"
sourcePath: "Docs/public/13_framework_value_permissionless_perps/13_docs/01-Introduction.md"
headingId: "1-3-the-challenge-of-low-cap-perpetuals"
---

# Section 1: Introduction: 1.3 The Challenge of Low-Cap Perpetuals

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/01-introduction#1-3-the-challenge-of-low-cap-perpetuals

## Extracted Section Draft

## 1.3 The Challenge of Low-Cap Perpetuals

Low-cap token perpetuals present unique challenges:

**Capital efficiency**: Full collateralization of potential payouts is prohibitively expensive. A $1M open interest position with 10x leverage implies $10M+ in potential payout. Who backs it?

**LP risk perception**: External LPs (especially USDC depositors) perceive low-cap perp risk as extreme. Observed yield demands: **50–80% APR**. At that level, protocols cannot sustain operations—fees and spreads would need to exceed what traders will pay.

**Token-margined pitfalls**: Using the traded asset as collateral creates reflexivity: collateral and exposure move together. Price drops trigger margin collapse, liquidations cascade, and death spirals emerge. Historical precedent: Futureswap, Drift v1, Synthetix inverse synths.

**Oracle and manipulation risk**: Low-cap tokens have thin spot liquidity. Oracle manipulation and spot-perp arbitrage become profitable. Protocols must design for attack economics, not just "normal" conditions.

---
