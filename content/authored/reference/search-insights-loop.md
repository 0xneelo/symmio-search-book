---
id: "authored-search-insights-loop"
title: "The Living Docs Loop"
section: "answer-engine"
track: "Search Insights"
status: "published"
sourceKeys: ["spec-06", "spec-09"]
sourceUrls: ["_specs/app-docs/06-answer-engine.md", "_specs/app-docs/09-design-reference.md"]
relatedGeneratedPages: []
---

# The Living Docs Loop

The answer engine is not only a search box. It is the intake system for documentation demand.

The loop is: a reader asks a question; the system routes to the best grounded page; the reader rates the answer; the system records the query, route, rating, and gap status; editors then improve or add the page that would have answered the question better. Search insights are the public operating surface for that loop.

In this prototype, the browser still has a `localStorage` fallback, but the standalone service now proves the production event shape with SQLite persistence. It stores questions, ratings, gap signals, helpful answer-cache rows, retention controls, a gated moderation export, gated metrics, a reviewer summary job, and backup/restore evidence. Search Insights can read the service when configured.

Discord adds a second demand source. The committed corpus records imported-message counts, question-cluster hashes, and Lafa-candidate metadata without raw text. Editors use local `/tmp` review packets plus sanitized routing reports to decide whether a repeated Discord question maps to an existing page, needs a new FAQ/page, or must remain a refusal.

## Reader Implication

The docs improve when users ask real questions. A low rating, an unanswered route, or a repeated Discord cluster is not a failure to hide; it is the signal that tells the team which page to deepen next.

## Sources

- `spec-06`: Answer-engine and living-docs requirements.
- `spec-09`: Design reference for Search insights.

## Related Pages

- `authored-estimated-network-revenue`
- `authored-referral-depth-open-question`
