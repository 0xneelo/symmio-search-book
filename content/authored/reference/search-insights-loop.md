---
id: "authored-search-insights-loop"
title: "The Living Docs Loop"
section: "answer-engine"
track: "Search Insights"
status: "publication-candidate"
sourceKeys: ["spec-06", "spec-09"]
sourceUrls: ["_specs/app-docs/06-answer-engine.md", "_specs/app-docs/09-design-reference.md"]
relatedGeneratedPages: []
---

# The Living Docs Loop

The answer engine is not only a search box. It is the intake system for documentation demand.

The loop is: a reader asks a question; the system routes to the best grounded page; the reader rates the answer; the system records the query, route, rating, and gap status; editors then improve or add the page that would have answered the question better. Search insights are the public operating surface for that loop.

In this prototype, the loop is local and browser-based. It stores questions, ratings, and gaps in `localStorage` and exposes them in Search insights. In production, the same event shape needs a real datastore, retention policy, abuse controls, and integration with the chosen docs platform or custom answer engine.

## Reader Implication

The docs improve when users ask real questions. A low rating is not a failure to hide; it is the signal that tells the team which page to deepen next.

## Sources

- `spec-06`: Answer-engine and living-docs requirements.
- `spec-09`: Design reference for Search insights.

## Related Pages

- `authored-estimated-network-revenue`
- `authored-referral-depth-open-question`
