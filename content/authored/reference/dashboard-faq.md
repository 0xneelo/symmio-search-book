---
id: "authored-dashboard-faq"
title: "Dashboard FAQ"
section: "dashboard-reference"
track: "Dashboard Views"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["dashboard-app", "dashboard-faq", "dashboard-revenue-doc"]
sourceUrls: ["src/dashboard/app.jsx", "src/dashboard/faq.jsx", "src/dashboard/revenue-doc.jsx"]
relatedGeneratedPages: ["local-dashboard-faq", "local-network-revenue"]
---

# Dashboard FAQ

The FAQ view is the dashboard's short-answer layer. It is routed as `#faq` and groups questions into rewards and referral payouts, then invites and tracking. It also links revenue questions to the hidden `#revenue` reference route.

The FAQ covers why revenue is estimated, how network revenue is calculated, when referral points credit, how rewards work, invite statuses, how to get more invites, what "Dashboard opened" means, what the Follow up tag means, and why invite values are hidden. It is the closest local substitute for the missing Discord/Lafa demand signal until that corpus is provided.

## Reader Implication

This page should be treated as a seed FAQ, not the final Discord-seeded FAQ. It is useful because it shows actual support questions already encoded in product copy, but the broader docs still need community mining.

## Open Gaps

Operator inbox item `#2` blocks Discord/Lafa import. Operator inbox items `#1` and `#3` affect final revenue and referral-depth answers.

## Sources

- `dashboard-app`: dashboard route registration.
- `dashboard-faq`: FAQ question groups and answers.
- `dashboard-revenue-doc`: hidden revenue page linked from FAQ.

## Related Pages

- `authored-search-insights-loop`
- `authored-dashboard-invites`
- `local-dashboard-faq`
