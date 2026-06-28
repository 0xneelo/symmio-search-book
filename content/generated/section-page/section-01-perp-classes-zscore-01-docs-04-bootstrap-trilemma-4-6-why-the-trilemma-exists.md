---
id: "section-01-perp-classes-zscore-01-docs-04-bootstrap-trilemma-4-6-why-the-trilemma-exists"
title: "Section 4: The Bootstrap Trilemma: 4.6 Why the Trilemma Exists"
section: "vision-sections"
track: "01 — Perps Categories & Bootstrap Trilemma"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/04-bootstrap-trilemma#4-6-why-the-trilemma-exists"]
parentPageId: "neelo-01-perp-classes-zscore-01-docs-04-bootstrap-trilemma"
sourcePath: "Docs/public/01_perp_classes_zscore/01_docs/04-Bootstrap-Trilemma.md"
headingId: "4-6-why-the-trilemma-exists"
---

# Section 4: The Bootstrap Trilemma: 4.6 Why the Trilemma Exists

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/04-bootstrap-trilemma#4-6-why-the-trilemma-exists

## Extracted Section Draft

## 4.6 Why the Trilemma Exists

The trilemma is not a design failure—it reflects fundamental constraints:

### 4.6.1 Information Economics

**New markets have adverse selection**:
- Informed traders (insiders) want to take one side
- Uninformed counterparties would lose
- No uninformed counterparty will volunteer
- Therefore, a capitalized counterparty must be paid to take the risk

This capitalized counterparty requires compensation → fees → reduced capital efficiency.

### 4.6.2 Risk Transfer Reality

**Risk doesn't disappear—it gets transferred**:
- In netted systems: Risk stays with traders (balanced by matching)
- In collateralized systems: Risk transfers to LPs (compensated by fees)

**During bootstrap**:
- No traders to balance → risk cannot stay with traders
- Risk MUST transfer somewhere
- Transfer requires compensation
- Compensation reduces efficiency

### 4.6.3 Bootstrapping Economics

**The cold-start problem**:
```
Traders want: Liquidity
Liquidity requires: Capital
Capital wants: Returns
Returns require: Volume
Volume requires: Traders

Circular dependency broken only by:
- External capital injection (reduces efficiency)
- Existing trader base (not permissionless)
```

---
