---
id: "section-07-token-margined-issues-perculator-07-docs-03-reflexivity-and-convexity-3-2-negative-convexity-and-the-inverse-payoff-trap"
title: "Section 3: Reflexivity and Negative Convexity: 3.2 Negative Convexity and the Inverse Payoff Trap"
section: "vision-sections"
track: "07 - Token-Margined Issues (Percolator)"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/03-reflexivity-and-convexity#3-2-negative-convexity-and-the-inverse-payoff-trap"]
parentPageId: "neelo-07-token-margined-issues-perculator-07-docs-03-reflexivity-and-convexity"
sourcePath: "Docs/public/07_token_margined_issues_perculator/07_docs/03-Reflexivity-and-Convexity.md"
headingId: "3-2-negative-convexity-and-the-inverse-payoff-trap"
---

# Section 3: Reflexivity and Negative Convexity: 3.2 Negative Convexity and the Inverse Payoff Trap

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/03-reflexivity-and-convexity#3-2-negative-convexity-and-the-inverse-payoff-trap

## Extracted Section Draft

## 3.2 Negative Convexity and the Inverse Payoff Trap

### 3.2.1 The Hyperbolic Payoff

Inverse perpetuals use:

$$
\text{PnL}_{\text{tokens}} = \text{Contracts} \times \left(\frac{1}{P_{\text{entry}}} - \frac{1}{P_{\text{exit}}}\right)
$$

**Asymmetric profile in token terms**:
- **Upward moves**: Long PnL bounded (approaches limit as price → ∞)
- **Downward moves**: Short PnL **unbounded** (approaches ∞ as price → 0)

### 3.2.2 The Infinity Payout Problem

Short position on $PERC entered at $1.00:

| Exit Price | USD Profit | Token Payout Required |
|------------|------------|------------------------|
| $0.50 | $0.50 | 1.0 PERC |
| $0.10 | $0.90 | 9.0 PERC |
| $0.01 | $0.99 | 99.0 PERC |
| $0.001 | $0.999 | 999.0 PERC |

As price approaches zero, the protocol must pay **exponentially more tokens** for the same USD profit. A single large short during a 99% crash can drain the vault—token-denominated liability grows hyperbolically as the token loses value.

### 3.2.3 Contrast with Linear Systems

USDC-margined: same 99% crash creates **fixed USD liability**. Trader shorts $1,000 at $1.00; price drops to $0.01; profit = $990 USDC (fixed, bounded, payable). Payout does not expand. Vault's ability to pay is independent of asset price.

---
