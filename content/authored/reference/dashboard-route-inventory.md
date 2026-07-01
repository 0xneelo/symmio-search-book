---
id: "authored-dashboard-route-inventory"
title: "Dashboard Route Inventory"
section: "dashboard-reference"
track: "Dashboard Views"
status: "published"
sourceKeys: ["dashboard-app", "dashboard-overview", "dashboard-codes", "dashboard-network", "dashboard-volume", "dashboard-tasks", "dashboard-faq", "dashboard-settings", "dashboard-revenue-doc", "server-pulse", "spec-03"]
sourceUrls: ["src/dashboard/app.jsx", "src/dashboard/overview.jsx", "src/dashboard/codes.jsx", "src/dashboard/network.jsx", "src/dashboard/volume.jsx", "src/dashboard/tasks.jsx", "src/dashboard/faq.jsx", "src/dashboard/settings.jsx", "src/dashboard/revenue-doc.jsx", "server/pulse.js", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["authored-dashboard-overview", "authored-dashboard-invites", "authored-dashboard-network", "authored-dashboard-volume", "authored-dashboard-tasks", "authored-dashboard-faq", "authored-dashboard-settings", "authored-estimated-network-revenue", "authored-dashboard-revenue-pulse", "local-dashboard-faq", "local-network-revenue"]
---

# Dashboard Route Inventory

The dashboard reference set covers every current dashboard route that the shell exposes for users, plus the hidden revenue explanation route. Visible routes are `#overview`, `#codes`, `#network`, `#volume`, `#tasks`, `#faq`, and `#settings`. The hidden route is `#revenue`, reached from the revenue estimate link and the FAQ rather than from the tab bar.

This page is a coverage map. It records which Search Book pages answer each route-level question, and it should not be read as a promise that every dashboard view is production-final. Revenue, referral depth, volume source, Discord-seeded FAQ, and frontend deploy boundaries still inherit their own source and operator-review gates.

## Route Coverage

| Dashboard route | User-facing view | Search Book coverage |
| --- | --- | --- |
| `#overview` | Overview | `authored-dashboard-overview` explains the compression layer for revenue, tasks, referral link, invites, and points. |
| `#codes` | My invites | `authored-dashboard-invites` covers masked invite values, filters, invite use, follow-up state, and referee progress. |
| `#network` | My network | `authored-dashboard-network` covers graph/tree navigation, focus state, 15-level public depth, and additive backfill. |
| `#volume` | Volume | `authored-dashboard-volume` covers network-volume inputs, wallet snapshots, daily refresh expectations, and Barometer/subgraph migration status. |
| `#tasks` | Tasks | `authored-dashboard-tasks` covers onboarding tasks, bonus actions, task events, and tab-badge behavior. |
| `#faq` | FAQ | `authored-dashboard-faq` covers the current product-copy FAQ while Discord/Lafa import remains parked. |
| `#settings` | Settings | `authored-dashboard-settings` covers contact metadata, handle storage, recovery-email capture, and the bearer-token API seam. |
| `#revenue` | Network revenue docs | `authored-estimated-network-revenue` and `authored-dashboard-revenue-pulse` cover the Phase A formula, default inputs, pulse behavior, and Phase B exclusion. |

## Reader Implication

If a user asks "which dashboard views are documented?", route them here first, then move them to the specific view page. If they ask a view-specific question, route directly to that view's authored page so citations stay narrow.

## Publication Boundary

The inventory can publish the current route list and the Search Book coverage map. It must keep the v1 revenue disclosure limited to Phase A, keep public referral depth at 15 levels with additive backfill, label volume as the current backend snapshot source rather than a live subgraph feed, and keep exact Discord/Lafa FAQ claims review-bound until an editor approves public paraphrases from the imported, text-redacted corpus.

## Sources

- `dashboard-app`: dashboard shell route list, visible tab filtering, and hidden revenue route.
- `dashboard-overview`: Overview card composition.
- `dashboard-codes`: My invites table and filtering behavior.
- `dashboard-network`: network graph/tree controls and 15-level display behavior.
- `dashboard-volume`: network-volume view and snapshot table.
- `dashboard-tasks`: onboarding checklist and task-badge behavior.
- `dashboard-faq`: current FAQ copy and links into revenue docs.
- `dashboard-settings`: contact and recovery-metadata settings.
- `dashboard-revenue-doc`: hidden `#revenue` route copy.
- `server-pulse`: Phase A revenue pulse implementation.
- `spec-03`: grounding matrix for dashboard, revenue, volume, points, and publication boundaries.

## Related Pages

- `authored-dashboard-overview`
- `authored-dashboard-invites`
- `authored-dashboard-network`
- `authored-dashboard-volume`
- `authored-dashboard-tasks`
- `authored-dashboard-faq`
- `authored-dashboard-settings`
- `authored-estimated-network-revenue`
