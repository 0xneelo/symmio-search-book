---
id: "section-17-referral-program-17-docs-13-hypothetical-tokenized-points-perps-13-3-base-hypothetical-flow"
title: "Section 13: Hypothetical Scenarios for Tokenized Points Perpetual Markets: 13.3 Base Hypothetical Flow"
section: "vision-sections"
track: "17 — Referral Program Architecture"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/13-hypothetical-tokenized-points-perps#13-3-base-hypothetical-flow"]
parentPageId: "neelo-17-referral-program-17-docs-13-hypothetical-tokenized-points-perps"
sourcePath: "Docs/public/17_referral_program/17_docs/13-Hypothetical-Tokenized-Points-Perps.md"
headingId: "13-3-base-hypothetical-flow"
---

# Section 13: Hypothetical Scenarios for Tokenized Points Perpetual Markets: 13.3 Base Hypothetical Flow

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/13-hypothetical-tokenized-points-perps#13-3-base-hypothetical-flow

## Extracted Section Draft

## 13.3 Base Hypothetical Flow

### Step 1: Point Accrual
- users earn points from trading, referrals, LP activity, and selected programs.

### Step 2: On-Chain Finalization
- users claim points on-chain after vesting rules.

### Step 3: Pack Conversion Layer
- points can remain as direct exposure or convert into packs and artifacts.

### Step 4: Fractionalization Contract
- an independent contract accepts deposited packs,
- mints an ERC-20 token that is a fractionalized representation of pooled pack exposure,
- and enables transferable, fungible claims on that basket.

### Step 5: Market Listing by Third Parties
- external actors list that ERC-20 on permissionless spot venues (for example, Uniswap),
- then list the token as a perp on Vibe Trading, since any token with a qualifying DEX pool can be listed.

### Step 6: Derivatives Layer
- traders can express long/short views on point-linked value through leverage markets built by independent builders on Vibe Trading.
