---
id: "section-07-token-margined-issues-perculator-07-docs-01-introduction-1-2-two-paradigms"
title: "Section 1: Introduction: 1.2 Two Paradigms"
section: "vision-sections"
track: "07 - Token-Margined Issues (Percolator)"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/01-introduction#1-2-two-paradigms"]
parentPageId: "neelo-07-token-margined-issues-perculator-07-docs-01-introduction"
sourcePath: "Docs/public/07_token_margined_issues_perculator/07_docs/01-Introduction.md"
headingId: "1-2-two-paradigms"
---

# Section 1: Introduction: 1.2 Two Paradigms

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/01-introduction#1-2-two-paradigms

## Extracted Section Draft

## 1.2 Two Paradigms

### Linear (USDC-Margined)

- Collateral and PnL denominated in stablecoin
- Payoff is linear: a $1 move in the underlying generates $1 PnL regardless of direction
- Collateral value is invariant to the traded asset's price

### Inverse (Token-Margined)

- Collateral and PnL denominated in the traded asset itself
- Payoff is non-linear (hyperbolic): `PnL = Contracts × (1/Entry − 1/Exit)`
- Collateral value moves in lockstep with the traded asset—creating reflexive dynamics

---
