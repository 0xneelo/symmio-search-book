---
id: "section-01-perp-classes-zscore-01-docs-02-framework-2-4-dimension-3-insurance-topology"
title: "Section 2: A Framework for Categorizing Perpetual Protocols: 2.4 Dimension 3: Insurance Topology"
section: "vision-sections"
track: "01 — Perps Categories & Bootstrap Trilemma"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/02-framework#2-4-dimension-3-insurance-topology"]
parentPageId: "neelo-01-perp-classes-zscore-01-docs-02-framework"
sourcePath: "Docs/public/01_perp_classes_zscore/01_docs/02-Framework.md"
headingId: "2-4-dimension-3-insurance-topology"
---

# Section 2: A Framework for Categorizing Perpetual Protocols: 2.4 Dimension 3: Insurance Topology

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/02-framework#2-4-dimension-3-insurance-topology

## Extracted Section Draft

## 2.4 Dimension 3: Insurance Topology

The third dimension concerns how risk is distributed across multiple markets within a protocol.

### 2.4.1 Cross-Margin / Global Insurance

**Definition**: All markets share a common insurance fund and/or risk engine. Profits from one market can offset losses in another.

**Characteristics**:
- Unified margin account across markets
- Portfolio margining possible
- Systemic risk coupling
- Capital efficiency through diversification

**Examples**: Hyperliquid (cross-margin mode), Binance Futures

**Advantages**:
- Better capital efficiency for multi-market traders
- Insurance fund benefits from diversification
- Profitable markets subsidize struggling ones

**Disadvantages**:
- Contagion risk between markets
- Complex risk calculations
- One bad market can drain shared resources

### 2.4.2 Isolated Markets

**Definition**: Each market maintains its own separate insurance fund, risk parameters, and margin requirements. No cross-subsidization occurs.

**Characteristics**:
- Independent risk per market
- No contagion between markets
- Simpler risk model
- Markets sink or swim on their own

**Examples**: Most early perp protocols, GMX individual pools

**Advantages**:
- No contagion risk
- Clear per-market economics
- Easier to reason about
- Better for permissionless listing

**Disadvantages**:
- Less capital efficient
- No portfolio benefits
- Each market must be independently viable

### 2.4.3 Implications for Market Bootstrap

**For bootstrapping new markets, isolated architecture is superior:**

1. A new, unproven market cannot drain resources from established markets
2. Risk parameters can be conservative without affecting other markets
3. The market can prove itself before integration
4. Failure is contained

However, **as markets mature**, cross-margin benefits become attractive:

1. Traders want unified positions
2. Capital efficiency improves
3. Portfolio hedging becomes possible
4. Integration with broader ecosystem

**This suggests a progressive model**: markets start isolated and integrate as they mature.

---
