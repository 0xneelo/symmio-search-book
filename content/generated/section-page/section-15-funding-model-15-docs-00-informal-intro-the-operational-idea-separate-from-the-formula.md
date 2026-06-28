---
id: "section-15-funding-model-15-docs-00-informal-intro-the-operational-idea-separate-from-the-formula"
title: "Informal intro: what the derivation is for (and what it is not): The operational idea (separate from “the formula”)"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/00-informal-intro#the-operational-idea-separate-from-the-formula"]
parentPageId: "neelo-15-funding-model-15-docs-00-informal-intro"
sourcePath: "Docs/public/15_funding_model/15_docs/00_informal_intro.md"
headingId: "the-operational-idea-separate-from-the-formula"
---

# Informal intro: what the derivation is for (and what it is not): The operational idea (separate from “the formula”)

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/00-informal-intro#the-operational-idea-separate-from-the-formula

## Extracted Section Draft

## The operational idea (separate from “the formula”)

The **product/protocol proposal** is not identical to the master objective written on paper. Informally, the direction is:

1. **Start at z-score zero** (or an equivalent “cold start” regime): flows are **not fully netted**; matching is **highly asynchronous**; a **residual solver** sits in the middle of the flow.
2. The solver begins from something like **1× systemic leverage** in spirit: **fully hedged** in aggregate, using available **capital** to stay hedged across positions.
3. **Increase effective leverage gradually** only as the process supports it; when stress appears, **ADL and similar tools step in**—a “two steps forward, one step back” loop rather than a one-way ratchet.
4. Over time, **better algorithms** (including **external solvers**) can improve *how* and *when* to move—but still as **approximation and control**, not as “solving” the market.

So: we believe there is a **path** and a **problem shape** we can name; we do not claim to know **exact timing** or **full dynamics** ex ante. We make **assumptions**, **approximations**, and **updates** from live data—moving **up** the z-score / netting spectrum when conditions allow, and **down** again when not, using ADL and parameter resets as part of learning and safety.

---
