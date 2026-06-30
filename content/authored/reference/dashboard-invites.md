---
id: "authored-dashboard-invites"
title: "Dashboard My Invites"
section: "dashboard-reference"
track: "Dashboard Views"
status: "published"
sourceKeys: ["dashboard-app", "dashboard-codes", "dashboard-faq"]
sourceUrls: ["src/dashboard/app.jsx", "src/dashboard/codes.jsx", "src/dashboard/faq.jsx"]
relatedGeneratedPages: ["local-dashboard-faq"]
---

# Dashboard My Invites

My invites is the operational table for referral-code distribution. It shows every invite assigned to the user, masked invite values, status, who redeemed the invite, follow-up flags, dashboard-opened state, used timestamp, and referee progress.

The view is routed as `#codes` in the dashboard shell and implemented by `DashCodes`. Its filters separate all invites, used invites, available invites, follow-up cases, and invitees who have opened their dashboard. The source deliberately keeps raw invite values out of the browser table: masked values are shown, and users are directed to share the personal referral link rather than copying full invite codes.

## Reader Implication

This page should explain the difference between a redeemed invite and a completed referral. A used invite is only the start of attribution; the FAQ says the invitee still needs to open the dashboard and finish onboarding before referral points credit.

## Sources

- `dashboard-app`: dashboard route registration.
- `dashboard-codes`: My invites table, filters, masked invite values, and referee progress states.
- `dashboard-faq`: invite statuses, dashboard-opened explanation, follow-up language, and masked-invite safety copy.

## Related Pages

- `authored-dashboard-faq`
- `authored-referral-depth-open-question`
- `local-dashboard-faq`
