---
id: "authored-dashboard-settings"
title: "Dashboard Settings"
section: "dashboard-reference"
track: "Dashboard Views"
status: "published"
sourceKeys: ["dashboard-app", "dashboard-settings", "dashboard-data"]
sourceUrls: ["src/dashboard/app.jsx", "src/dashboard/settings.jsx", "src/dashboard/data.jsx"]
relatedGeneratedPages: ["local-dashboard-points-distinction"]
---

# Dashboard Settings

Settings is the user-maintained contact and recovery surface. It is routed as `#settings`, loads `/api/me`, lets a logged-in user choose a contact channel, edit the matching handle, optionally store a recovery email, and save the patch through `/api/me/settings`.

The component validates email shape in the browser, normalizes handles before sending them, and labels the recovery email as future recovery infrastructure rather than an email flow that is active today. The dashboard data seam sends authenticated calls with the bearer token and supports local-only mock fixtures for development.

## Reader Implication

This page should explain settings as metadata capture, not account custody. Users can update contact and recovery details, but the docs should avoid implying that email recovery is live until the backend recovery flow is actually public.

## Sources

- `dashboard-app`: dashboard route registration.
- `dashboard-settings`: contact channel, handle, recovery email, validation, and save behavior.
- `dashboard-data`: bearer-token API seam and localhost-only fixture mode.

## Related Pages

- `authored-dashboard-overview`
- `authored-glossary-core-terms`
- `local-dashboard-points-distinction`
