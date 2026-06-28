---
id: "section-13-framework-value-permissionless-perps-13-docs-03-lp-value-proposition-3-2-the-usdc-side-solver-funded-not-lp-funded"
title: "Section 3: LP Value Proposition: 3.2 The USDC Side: Solver-Funded, Not LP-Funded"
section: "vision-sections"
track: "13 — Proof of Value Framework"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/03-lp-value-proposition#3-2-the-usdc-side-solver-funded-not-lp-funded"]
parentPageId: "neelo-13-framework-value-permissionless-perps-13-docs-03-lp-value-proposition"
sourcePath: "Docs/public/13_framework_value_permissionless_perps/13_docs/03-LP-Value-Proposition.md"
headingId: "3-2-the-usdc-side-solver-funded-not-lp-funded"
---

# Section 3: LP Value Proposition: 3.2 The USDC Side: Solver-Funded, Not LP-Funded

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/03-lp-value-proposition#3-2-the-usdc-side-solver-funded-not-lp-funded

## Extracted Section Draft

## 3.2 The USDC Side: Solver-Funded, Not LP-Funded

### 3.2.1 No External USDC LPs

Vibe does **not** ask external LPs to deposit USDC. The stablecoin liquidity required for settlement and hedging is **self-funded by the protocol and the solver**.

### 3.2.2 How It Works

The solver's USDC usage functions as **short-term deployment**: capital deployed on one chain is typically recovered on another within a short cycle. Because the solver can **pre-hedge** before accepting exposure, risk on these flows is tightly bounded.

**Implications**:
- Extremely high capital efficiency on the USDC side (rapid recycling, not locking)
- No need for large external stablecoin pools
- Internal yield on solver-deployed USDC believed to exceed alternative deployments
- System self-sustaining without external USDC LPs

### 3.2.3 Why Closed USDC Pool?

An external USDC LP would need to trust the operator entirely and would demand yield commensurate with perceived risk—lending stablecoins to a leveraged low-cap perp protocol is high-risk. Keeping the pool protocol-operated avoids this mismatch.

---
