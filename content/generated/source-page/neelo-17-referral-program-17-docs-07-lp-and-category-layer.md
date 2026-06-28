---
id: "neelo-17-referral-program-17-docs-07-lp-and-category-layer"
title: "Section 7: LP and Category Layer"
section: "vision-papers"
track: "17 — Referral Program Architecture"
granularity: "source-page"
status: "draft-imported-from-primary-source"
sourcePriority: "neeloVision"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/07-lp-and-category-layer"]
sourcePath: "Docs/public/17_referral_program/17_docs/07-LP-and-Category-Layer.md"
---

# Section 7: LP and Category Layer

> Draft status: imported from the primary markdown source. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/07-lp-and-category-layer

## Source Draft

# Section 7: LP and Category Layer

## 7.1 Market-Scoped Referral

The transcript outlines a second referral surface at market creation:

- referrals can be attached at pool creation time,
- attribution is tied to that specific market's fee flow,
- and no attachment means no market-level referral share.

## 7.2 LP-Style Revenue Share Framing

A practical implementation framing is to model referral share as a bounded slice of LP-side economics.
This creates predictable accounting and reuse of existing fee plumbing.

## 7.3 Category Programs

For strategic partners, category-level overlays can apply elevated platform fees on tagged market groups, with uplift split between platform and partner.

This is distinct from user-level referral and should be tracked separately.

## 7.4 Integration Requirements

- deterministic category tagging,
- clear precedence rules between global referral and market referral,
- and explicit payout accounting per market and partner bucket.

## 7.5 Strategic Role

This layer turns referral from pure user acquisition into market supply expansion.
It aligns creators, LPs, and distribution partners around listing velocity.
