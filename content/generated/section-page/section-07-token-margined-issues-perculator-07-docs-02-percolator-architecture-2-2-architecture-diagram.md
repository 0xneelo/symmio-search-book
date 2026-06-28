---
id: "section-07-token-margined-issues-perculator-07-docs-02-percolator-architecture-2-2-architecture-diagram"
title: "Section 2: Percolator Architecture: 2.2 Architecture Diagram"
section: "vision-sections"
track: "07 - Token-Margined Issues (Percolator)"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/02-percolator-architecture#2-2-architecture-diagram"]
parentPageId: "neelo-07-token-margined-issues-perculator-07-docs-02-percolator-architecture"
sourcePath: "Docs/public/07_token_margined_issues_perculator/07_docs/02-Percolator-Architecture.md"
headingId: "2-2-architecture-diagram"
---

# Section 2: Percolator Architecture: 2.2 Architecture Diagram

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/02-percolator-architecture#2-2-architecture-diagram

## Extracted Section Draft

## 2.2 Architecture Diagram

```
┌──────────────────────────────────────────┐
│           PERCOLATOR PROGRAM              │
│  (Solana on-chain, formally verified)     │
├──────────────────────────────────────────┤
│  SLAB (Market Instance)                   │
│  ├── Header + Config                      │
│  ├── RiskEngine (zero-copy, in-place)     │
│  ├── User Accounts                        │
│  ├── LP Accounts                          │
│  └── Vault (token collateral)             │
├──────────────────────────────────────────┤
│  MATCHER (External program via CPI)       │
│  ├── Passive (oracle ± spread)            │
│  └── Custom (LP-deployed)                 │
├──────────────────────────────────────────┤
│  ORACLE (DexScreener / Pyth / Authority)  │
└──────────────────────────────────────────┘
```

---
