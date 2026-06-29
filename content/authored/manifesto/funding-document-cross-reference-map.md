---
id: "authored-funding-document-cross-reference-map"
title: "Funding Document Cross Reference Map"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/01-abstract#document-cross-reference"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-01-abstract-document-cross-reference", "authored-funding-abstract-accounting-roadmap", "authored-funding-key-innovations-summary"]
---

# Funding Document Cross Reference Map

Neelo's funding-model abstract ends with a cross-reference table that tells readers where each part of the specification is derived in more detail. That table is useful because the funding model is not one document. It is a connected derivation: state variables, utilization modes, dynamic pricing, bell-curve flattening, insurance and ADL, the defense hierarchy, the full objective, and worked examples all depend on each other.

The accounting sections point toward variable definitions and LP profit. The utilization and risk sections point toward utilization modes and the full objective. The control sections point toward dynamic pricing. The cross-market sections point toward bell-curve flattening. The defense sections point toward insurance, ADL, and defense hierarchy. The full system points back to the combined objective, and examples point to the worked-example file.

## How To Use This Map

Use the cross-reference as a reading order. A reader who asks "what is the model measuring?" should start with state variables and LP profit. A reader who asks "when does the market become stressed?" should move to utilization modes. A reader who asks "what knobs change?" should move to dynamic pricing. A reader who asks "what happens when a market cannot carry its own stress?" should move to bell-curve flattening, insurance, and ADL.

That matters for the compendium because exact routing should not send every funding question to the master formula. The formula is the compression. The cross-reference is the map that tells readers which derivation to open next.

## Publication Boundary

This page explains source-document structure. It does not certify that every source-time derivation is final production behavior, and it does not publish live parameter values, thresholds, eligibility rules, governance authority, or accounting treatment.

## Sources

- `vibe-papers`: Neelo, "Abstract", "Document Cross-Reference".

## Related Pages

- `authored-funding-abstract-accounting-roadmap`
- `authored-funding-abstract-control-surface`
- `authored-funding-full-objective`
