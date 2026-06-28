---
id: "section-15-funding-model-15-docs-05-utilization-modes-why-two-modes"
title: "05. Utilization Modes: Token Inventory vs Insurance Fund: Why Two Modes?"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/05-utilization-modes#why-two-modes"]
parentPageId: "neelo-15-funding-model-15-docs-05-utilization-modes"
sourcePath: "Docs/public/15_funding_model/15_docs/05_utilization_modes.md"
headingId: "why-two-modes"
---

# 05. Utilization Modes: Token Inventory vs Insurance Fund: Why Two Modes?

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/05-utilization-modes#why-two-modes

## Extracted Section Draft

## Why Two Modes?

### Problem with Single Mode

If we only used token inventory utilization:
- No mechanism to price risk when exposure exceeds tokens
- No connection to insurance capacity
- Can't distinguish "slightly over tokens" from "insurance exhausted"

### Benefits of Two Modes

1. **Capital efficiency**: Normal operations only need token-based pricing
2. **Risk sensitivity**: Insurance mode captures tail risk
3. **Smooth transition**: No discontinuous jumps
4. **ADL integration**: `u₂ > 1` naturally triggers ADL consideration

---
