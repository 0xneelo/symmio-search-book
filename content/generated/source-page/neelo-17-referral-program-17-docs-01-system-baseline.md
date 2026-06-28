---
id: "neelo-17-referral-program-17-docs-01-system-baseline"
title: "Section 1: System Baseline"
section: "vision-papers"
track: "17 — Referral Program Architecture"
granularity: "source-page"
status: "draft-imported-from-primary-source"
sourcePriority: "neeloVision"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/01-system-baseline"]
sourcePath: "Docs/public/17_referral_program/17_docs/01-System-Baseline.md"
---

# Section 1: System Baseline

> Draft status: imported from the primary markdown source. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/01-system-baseline

## Source Draft

# Section 1: System Baseline

## 1.1 Referral Identity

The baseline model uses a referral NFT minted during account creation.
This NFT acts as the user's referral identity anchor and code carrier.

## 1.2 Two Incentive Rails

The transcript describes two reward rails:

- **Trading rakeback**: based on the user's own rolling activity.
- **Referral Rewards**: based on referred-user activity over the same rolling window.

Both rails rely on tier logic and attribution integrity. The primary challenge is not computation, but consistent and auditable attribution.

## 1.3 Points Separation

Points are treated as a separate rewards layer from referral NFT state.
This separation improves iteration speed but introduces trust concentration if balances are only off-chain.

## 1.4 Operational Reality

The baseline system is functional for early-stage growth but has known limits:

- ambiguous referral graph portability,
- mixed on-chain/off-chain accountability,
- private deal logic that can obscure public economics,
- and weak guarantees if points are treated as economically transferable before hardened controls.

## 1.5 Design Requirement

The next architecture must preserve what works (speed and flexibility) while reducing hidden trust assumptions.
That means moving from "features that work" to "incentives that remain reliable under scale and adversarial behavior."
