---
id: "authored-funding-derivation-document-index"
title: "Funding Derivation Document Index"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/02-index", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/02-index#document-index"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-02-index", "section-15-funding-model-15-docs-02-index-document-index", "authored-funding-model-reading-boundary", "authored-funding-document-cross-reference-map"]
---

# Funding Derivation Document Index

The funding-model source page frames the folder as a full mathematical derivation for Vibe perpetual markets: funding rates, dynamic spreads, insurance mechanisms, and auto-deleveraging logic. It also tells readers where to start. The abstract gives the system overview and master formula, while the informal intro explains why the math exists and what it does not claim to solve by itself.

The core document list then gives the structure of the derivation:

- informal intro for the thought process and limits of the math;
- abstract and specification table of contents;
- document index and quick reference;
- core concepts for gradient flow and attractor-repeller dynamics;
- variable definitions for state and notation;
- utilization modes for token inventory versus insurance fund stress;
- LP profit decomposition;
- dynamic pricing for funding, spread, and borrow;
- bell-curve flattening for cross-market mutualization;
- insurance and ADL;
- defense hierarchy;
- full combined objective;
- worked examples.

## Why The Index Deserves Its Own Page

The index is not just a table of contents. It is the source's strongest guide to how the funding system should be taught. A reader should not start with ADL, or with dynamic spread formulas, or with one worked example. They should understand why the problem is not solved by math alone, then read the system objective, then work through state, modes, profit, pricing, smoothing, defense, and examples.

That is also how the answer engine should route users. Questions about notation, variables, controls, insurance, or examples should land on their exact pages, while this index page should help readers see the whole derivation.

## Publication Boundary

This page describes the source folder's derivation structure. It does not claim that every file is final product documentation or that every source-time formula, example value, ADL path, or risk mechanism is live without implementation and operator review.

## Sources

- `vibe-papers`: Neelo, "Vibe Perpetual Market - Full Mathematical Derivation", source page and "Document Index".

## Related Pages

- `authored-funding-model-reading-boundary`
- `authored-funding-document-cross-reference-map`
- `authored-funding-worked-examples-reading-guide`
