---
id: "authored-superflow-she-api-boundary"
title: "SuperFlow SHE API Boundary"
section: "protocol-reference"
track: "Source Ingestion"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["superflow-she-openapi", "spec-04"]
sourceUrls: ["https://dev.superflow.exchange/openapi.json", "_specs/app-docs/04-sources.md"]
relatedGeneratedPages: ["authored-symmio-clearing-house-layer", "authored-bilateral-intent-lifecycle", "authored-barometer-subgraph-upgrade"]
---

# SuperFlow SHE API Boundary

The operator-provided SuperFlow Redoc URL resolves to an OpenAPI document titled `SYMMIO Hybrid Exchange(SHE)`, version `1.0`. Treat this as a source for the SHE API surface, not as proof that the still-named `SSHE` source family has been identified.

That distinction matters. The source proves that there is a SuperFlow/SHE-style exchange API with market data, order, account, position, funding, authentication, and developer/admin surfaces. It does not, by itself, prove how Vibe uses the API, whether every endpoint is production-public, or whether `SSHE` is a separate source family, an older name, or a typo in the source plan.

## What The Spec Covers

The OpenAPI paths describe a broad exchange-facing API:

- market data: `GET /markets`, `/ticker`, `/orderbook`, `/trades`, `/ohlcv`, `/mark-price`, `/last-price`, and `/klines`;
- order flow: `POST`, `GET`, and `DELETE /order`, batch orders, open orders, force orders, and user trade history;
- account and position state: account information, positions, position lookup, leverage, margin mode, position mode, isolated-balance modification, balances, income history, and listen-key lifecycle;
- funding: funding rate, funding-rate history, and funding history;
- authentication: token login, SIWE nonce/register/login, refresh token, user creation, API-key creation, password change, and Web3 address binding;
- developer/admin utilities: signature generation, users, ping, balance modification, VIP tier modification, market listing, delisting, filter changes, and `GET /healthz`.

The OpenAPI description also documents WebSocket streams for trades, order book, mark price, last price, funding rate, klines, and a combined market stream.

## Publication Boundary

Do not present this page as a Vibe production integration claim. The safe source-backed claim is that the operator-provided SuperFlow source exposes an exchange API titled `SYMMIO Hybrid Exchange(SHE)`.

The docs should not:

- call the source `SSHE` without a confirming source;
- treat dev/admin endpoints as normal public-user capabilities;
- infer live Vibe endpoint URLs, credentials, account permissions, or venue routing;
- claim which parts are used by Vibe, Symmio, SuperFlow, solvers, or frontends without implementation evidence.

## Reader Implication

When readers ask what SuperFlow contributes to the source map, route them here first. The answer is currently source-ingestion context: the API surface looks like a hybrid exchange access layer around market data, orders, positions, funding, auth, and operational controls. Final product claims still need an implementation source or operator confirmation.

## Sources

- `superflow-she-openapi`: operator-provided Redoc/OpenAPI source at `https://dev.superflow.exchange/openapi.json`.
- `spec-04`: required source-family list naming SuperFlow / SSHE.

## Related Pages

- `authored-symmio-clearing-house-layer`
- `authored-bilateral-intent-lifecycle`
- `authored-barometer-subgraph-upgrade`
