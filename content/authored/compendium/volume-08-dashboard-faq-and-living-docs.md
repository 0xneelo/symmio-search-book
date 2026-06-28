---
id: "authored-volume-08-dashboard-faq-and-living-docs"
title: "Volume 08: Dashboard, FAQ, And Living Docs"
section: "compendium"
track: "Volume 08"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-08-dashboard-faq-and-living-docs"
sourceKeys: ["spec-03", "spec-06", "spec-09", "dashboard-app", "local-revenue-doc", "dashboard-revenue-doc"]
sourceUrls: ["_specs/app-docs/03-grounding.md", "_specs/app-docs/06-answer-engine.md", "_specs/app-docs/09-design-reference.md", "src/dashboard/app.jsx", "docs/network-revenue.md", "src/dashboard/revenue-doc.jsx"]
relatedGeneratedPages: ["authored-dashboard-overview", "authored-estimated-network-revenue", "authored-search-insights-loop", "authored-dashboard-faq"]
---

# Volume 08: Dashboard, FAQ, And Living Docs

The compendium ends where the user actually operates: the dashboard, the FAQ, and the answer-engine feedback loop. This is the reference layer that turns the manifesto into a self-serve product surface.

The dashboard pages need special discipline because they sit closest to current implementation. Revenue, volume, points, invite states, and tasks must cite code and local docs, and they must keep configurable or unresolved claims labeled. The FAQ layer remains local until the Discord and Lafa corpus is provided.

## What This Volume Does

- It documents every dashboard view as a first-class page.
- It gives the answer engine exact routes for revenue, volume, points, invites, settings, tasks, and FAQ questions.
- It explains the living-docs loop: question tracking, answer ratings, gaps, and demand-driven improvement.
- It keeps open operator decisions visible in the gap queue instead of hiding them in polished copy.

## Reader Implication

If you are using the dashboard, this volume should answer what each number means and why it can be trusted. If it cannot answer, the question should become a tracked gap.

## Sources

- `spec-03`: Dashboard and economics grounding.
- `spec-06`: Answer-engine and living-docs loop.
- `spec-09`: Mockup and visual IA target.
- `dashboard-app`: Current dashboard shell.
- `local-revenue-doc`: Local network-revenue explanation.
- `dashboard-revenue-doc`: In-app revenue documentation.

## Related Pages

- `authored-dashboard-overview`
- `authored-estimated-network-revenue`
- `authored-search-insights-loop`
- `authored-dashboard-faq`
