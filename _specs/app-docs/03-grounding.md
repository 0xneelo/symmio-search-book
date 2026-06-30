# 03 — Grounding: verified product facts (the reference seed of truth)

The **reference-layer** truth that complements the manifesto (`02`). Use as the starting truth, verify against the code, then expand. All confirmed from the `onboarding-app` codebase + the Synchronicity (SYN) Linear project.

## Product
Vibe = a permissionless perps network on Symmio. Public app: `vibe.permissionless.credit`. Trade at `beta.vibe.trading`. The **onboarding-app dashboard** shows each referrer their network's estimated **revenue**, **volume**, and **points**.

## Revenue model (Phase A, live)
`referrerRevenue = networkVolume × platformFeeRate × referrerShare`. The two rates are server-config (handle per the transparency decision in `08`). `networkVolume` = trade volume summed across the referral tree (multi-level, excluding the user's own wallet). **Reconcile the exact depth** — the code/volume rollup uses **5 levels**, but some shipped copy says **15** and a canonical FAQ doc says "5, expanding to 10+".

Served by `GET /api/me/pulse`, polled ~90s; a **monotonic** "Earning live" odometer animates a measured **rate** (recent slope, else lifetime cold-start; a lifetime-average fallback for flat volume is pending, SYN-204), with a **~1¢/day** display-motion floor. Seed and massively expand from `docs/network-revenue.md` and `src/dashboard/revenue-doc.jsx`.

## Revenue venue/chain/phase matrix (AUTHORITATIVE)
Document each path precisely, including its data source and settlement.

**Protocol revenue** (platform fees Vibe earns; the referrer earns a share):

| Chain | Market | Phase | Settlement |
|---|---|---|---|
| Base | Vibecaps | alpha | Symmio |
| Base | Majors | alpha | Symmio |
| HyperEVM | Vibecaps | beta | Symmio |
| Hyperliquid | Majors | gamma | **NOT** Symmio (Hyperliquid-native) |

**Solver & LP revenue:**

| Chain | Market | Phase | Notes |
|---|---|---|---|
| HyperEVM | Vibecaps | beta + gamma | One contract version; **beta vs gamma differ only by frontend** |

Document explicitly: **gamma (Hyperliquid Majors) settles outside Symmio**, so its fee/data path differs from the Symmio-settled venues; **beta and gamma solver/LP revenue share the same contract version**. Map each revenue path to the exact data source (which subgraph / API supplies its volume and fees). This matrix also grounds the manifesto's Hyperliquid/HIP-3 argument (`02` Part III).

## Volume
Today from the Vibe backend wallet-volume API (`…/t2e/info/wallet/{wallet}/total/` — name it, no secret URLs): 6h stale-while-revalidate cache, daily snapshots, 18-decimal normalization. Planned **"Barometer"** upgrade → **Goldsky analytics subgraphs** (per-trader `TotalUserHistory`): same formula, sharper volume.

## Points (disentangle ALL of them)
- **Onboarding points** (this app: registration / tweet / video / referral bonuses; multi-level referral credit).
- **Network / trading points** (aggregated from the backend `total_points`).
- **Referral points.**
- **Vibe-points** (the Vibe protocol's native points earned trading on Vibe) — define precisely vs onboarding points; document **TGE settlement**: onboarding points settle at TGE with a multiplier on the network's **Vibecaps trading volume** (per the dashboard footer).

## Phase B economics (designed; bring in from the calculators + Symmio docs)
Revenue streams = **spread + liquidations + funding**; split = **LP / referral / management** (token buybacks change the *form* of LP pay, not its size); **Symmio settlement cost + SYMM rebate tiers**; valuation = annual cash flow × a market multiple. Plus per-venue revenue, vibecaps LP profits, points farmed.

## Dashboard surface
Zero-build React (CDN React + in-browser Babel, no bundler), hash-routed SPA (`dashboard.html`). Views: Overview, My invites, My network, Volume, Tasks, FAQ, Settings, and a hidden `#revenue` docs page. Document what each view does and shows.
