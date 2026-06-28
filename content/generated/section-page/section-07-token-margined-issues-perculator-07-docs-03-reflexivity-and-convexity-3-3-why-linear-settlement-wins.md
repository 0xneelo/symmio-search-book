---
id: "section-07-token-margined-issues-perculator-07-docs-03-reflexivity-and-convexity-3-3-why-linear-settlement-wins"
title: "Section 3: Reflexivity and Negative Convexity: 3.3 Why Linear Settlement Wins"
section: "vision-sections"
track: "07 - Token-Margined Issues (Percolator)"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/03-reflexivity-and-convexity#3-3-why-linear-settlement-wins"]
parentPageId: "neelo-07-token-margined-issues-perculator-07-docs-03-reflexivity-and-convexity"
sourcePath: "Docs/public/07_token_margined_issues_perculator/07_docs/03-Reflexivity-and-Convexity.md"
headingId: "3-3-why-linear-settlement-wins"
---

# Section 3: Reflexivity and Negative Convexity: 3.3 Why Linear Settlement Wins

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/03-reflexivity-and-convexity#3-3-why-linear-settlement-wins

## Extracted Section Draft

## 3.3 Why Linear Settlement Wins

| Scenario | Percolator (Inverse) | USDC-Margined (Linear) |
|----------|----------------------|-------------------------|
| Token drops 90% | Short payout: 9× contract size in tokens; vault hemorrhages | Short payout: 90% of notional in USDC; fixed, payable |
| Token pumps 10× | Long payout bounded; LP still loses tokens | Long payout: 9× notional in USDC; large but linear |
| Flash crash to near-zero | Infinite token liability; vault drained; ADL forced | Fixed USDC liability; bounded; insurance can cover |

The linear payoff eliminates the entire class of negative convexity risks that make token-margined systems structurally fragile.

---

*Next Section: LP Economics and the 1x Leverage Constraint →*
