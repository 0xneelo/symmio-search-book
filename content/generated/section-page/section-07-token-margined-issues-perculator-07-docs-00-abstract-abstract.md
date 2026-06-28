---
id: "section-07-token-margined-issues-perculator-07-docs-00-abstract-abstract"
title: "Why Token-Margined Protocols Are Structurally Problematic: Abstract"
section: "vision-sections"
track: "07 - Token-Margined Issues (Percolator)"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/00-abstract#abstract"]
parentPageId: "neelo-07-token-margined-issues-perculator-07-docs-00-abstract"
sourcePath: "Docs/public/07_token_margined_issues_perculator/07_docs/00-Abstract.md"
headingId: "abstract"
---

# Why Token-Margined Protocols Are Structurally Problematic: Abstract

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/00-abstract#abstract

## Extracted Section Draft

## Abstract

Token-margined (inverse) perpetual contracts, where the traded asset simultaneously serves as both collateral and settlement currency, introduce structural risks that no amount of engineering can fully remediate. This dissertation examines these risks through Percolator—an open-source perpetuals engine on Solana built by Anatoly Yakovenko—and its derivative Percolator SOV, a deflationary memecoin market that epitomizes the coin-margined design.

We demonstrate that the architecture suffers from seven compounding failure modes: reflexive collateral risk, negative convexity in payoff functions, a lose-lose equilibrium for liquidity providers, capital inefficiency that negates the purpose of derivatives, oracle-circuit-breaker paradoxes, spot-perp manipulation vectors, and historically validated death spirals.

We conclude that while Percolator succeeds as a technical proof-of-concept for fully on-chain derivatives on Solana, its token-margined instantiation is economically unsound for volatile assets. The path forward for permissionless low-cap perpetuals lies in USDC-margined hybrid vault architectures with active risk management—systems that separate the inventory provider from the settlement layer, governed by intelligent solvers that dynamically manage pricing, funding, and insurance.

---
