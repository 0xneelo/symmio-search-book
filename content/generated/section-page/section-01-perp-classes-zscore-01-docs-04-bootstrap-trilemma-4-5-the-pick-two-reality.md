---
id: "section-01-perp-classes-zscore-01-docs-04-bootstrap-trilemma-4-5-the-pick-two-reality"
title: "Section 4: The Bootstrap Trilemma: 4.5 The Pick-Two Reality"
section: "vision-sections"
track: "01 — Perps Categories & Bootstrap Trilemma"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/04-bootstrap-trilemma#4-5-the-pick-two-reality"]
parentPageId: "neelo-01-perp-classes-zscore-01-docs-04-bootstrap-trilemma"
sourcePath: "Docs/public/01_perp_classes_zscore/01_docs/04-Bootstrap-Trilemma.md"
headingId: "4-5-the-pick-two-reality"
---

# Section 4: The Bootstrap Trilemma: 4.5 The Pick-Two Reality

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/04-bootstrap-trilemma#4-5-the-pick-two-reality

## Extracted Section Draft

## 4.5 The Pick-Two Reality

### Combination 1: Permissionless + Capital Efficient (❌ Reliable Counterparty)

**This is Derp.fun's approach**

- Lists anything: ✓
- No collateral requirements: ✓
- Who pays winning longs during bootstrap: ???

**Outcome**: Markets fail immediately because winning traders cannot be paid.

### Combination 2: Capital Efficient + Reliable Counterparty (❌ Permissionless)

**This is Hyperliquid's approach**

- Order book efficiency: ✓
- Netted positions + insurance fund: ✓
- Can you list a token with no traders: ✗

**Outcome**: Excellent for established markets. Cannot serve new markets.

### Combination 3: Permissionless + Reliable Counterparty (❌ Capital Efficient)

**This is GMX's approach**

- List anything with LP capital: ✓
- Vault backs all payouts: ✓
- Competitive fees and leverage: ✗

**Outcome**: Works for bootstrap. Cannot compete at scale.

---
