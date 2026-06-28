---
id: "authored-collateral-margin-cva"
title: "Collateral, Margin, And CVA"
section: "protocol-reference"
track: "Symmio Core"
status: "publication-candidate"
sourceKeys: ["symmio-core", "symmio-intent-lifecycle"]
sourceUrls: ["https://docs.symm.io/getting-started/core-concepts.md", "https://docs.symm.io/liquidity-provider-documentation/core-concepts/intent-lifecycle-and-event-monitoring.md"]
relatedGeneratedPages: ["symmio-core-concepts", "symmio-intent-lifecycle", "symmio-liquidations", "authored-symmio-party-a-party-b"]
---

# Collateral, Margin, And CVA

The Symmio docs separate three words that are easy to collapse in product copy: collateral, margin, and CVA.

Collateral is the money deposited into the system, usually described in the current docs as USDC. Margin is the portion of collateral locked to back a specific position. CVA is the extra buffer or security deposit used to protect against counterparty default.

The current core formula is:

```text
Collateral = Locked Margin + CVA + Available Balance
```

That formula is simple, but it is one of the most important reference anchors in the compendium. It tells a reader that not every deposited dollar is free balance, and not every locked dollar is identical risk.

## How It Enters The Lifecycle

Collateral is not an afterthought once the solver accepts a quote. The lifecycle source says that when a solver locks an intent, collateral is allocated and the position can open immediately or after hedging. This makes collateral allocation part of the transition from intent to enforceable position.

The same vocabulary matters during close, cancellation, and liquidation flows. If a page talks about available balance, locked margin, CVA, or liquidation without naming which bucket changed, it is likely too vague for serious users.

## What This Page Does Not Claim

This page does not publish a final isolation-versus-cross-margin comparison for Vibe products. The registered official sources in this slice support the base collateral/margin/CVA vocabulary and the lifecycle relationship between collateral allocation and quote locking. More specific public claims about isolated margin modes, cross-margin behavior, capital efficiency, or Vibe vault accounting need a dedicated primary source or product-owner confirmation before publication.

That restraint is not a docs weakness. It is the standard the whole compendium should hold: publish the protocol vocabulary now, park product-specific margin semantics until the source set proves them.

## Reader Implication

For traders, the key question is "which balance bucket changed?" For solvers, it is "what collateral is committed when I lock and open this quote?" For support, it is "are we explaining a deposit, locked margin, CVA, available balance, or liquidation buffer?"

## Sources

- `symmio-core`: definitions of collateral, margin, CVA, and the collateral formula.
- `symmio-intent-lifecycle`: solver locking and collateral allocation during the quote lifecycle.

## Related Pages

- `authored-bilateral-intent-lifecycle`
- `authored-symmio-party-a-party-b`
- `authored-token-margined-reflexivity-risk`
- `symmio-core-concepts`
