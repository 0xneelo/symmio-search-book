# 02 — The Narrative & Thesis (the manifesto spine)

## 2026-07-01 reconciliation note

This file preserves the original manifesto spine. For current launch truth, read `OPERATOR-INBOX.md` and `12-search-book-to-100-percent.md` first. The v1 corpus must not re-open original/oldest Symmio whitepaper recovery: OPERATOR-INBOX #6 is resolved as out of scope for v1, and launch-safe origin/history claims are bounded to the registered official GitHub/current-docs evidence. If a future source identifies an earlier artifact, register it as a new post-v1 source update rather than treating this spec text as an open blocker.

The intellectual core: the argument the compendium must make, in order. It doubles as the **guided "onboarding into the system" journey** — a reader starting at the top is carried from "what is this" to deep architecture. Every claim must be sourced (original + current Symmio whitepapers, Symmio/Vibe docs, neelo_docs, the team, the Discord). Where we assert *why*, cite or reason explicitly — never hand-wave.

> Framing: this is a **manifesto of intent-based derivatives**, jointly authored by the Symmio and Vibe teams and researchers. Conviction with rigor.

## Part I — Origin & vision
- The **2021 origin**: where the idea came from, why Symmio pursued intent-based derivatives *before* it was obvious. Dig into the **original / oldest whitepaper and earliest docs**.
- **How the idea formed** into what Symmio + Vibe are today — the through-line from first principles to the current system.

## Part II — The thesis: why this matters
- **Why do derivatives matter at all?** From first principles.
- **What is a perpetual? What is a swap?** The financial products you can trade — on **Symmio** vs on **Vibe**.
- **Why tokenization?** What it really is, and **why Vibe is a bet on tokenization** — permissionless derivatives for *any* token.
- **Why did Vibe + Symmio go all-in on permissionless derivatives?** Why *permissionless*, why *for any token*.

## Part III — The market argument: intents vs order books
- Order books **dominate** today. State the honest counter-argument: "we have order books, that's enough — you don't need other tooling."
- The rebuttal: **intents *complete* order books** — they complete the full market. **Intent-based derivatives** is what it's really about.
- **Bootstrapping markets is one of the hardest problems** — why, and **why intents are better suited to bootstrap markets** than order books.
- **Hyperliquid & HIP-3**: why Hyperliquid, despite being permissionless, **concentrates** HIP-3 deployments — and how **Vibe becomes the discovery layer** for HIP-3 deployers.

## Part IV — How it works: intents & solvers
- **What are intents** — in general, and **in the context of Symmio and Vibe**.
- **What are solvers** — in general, and **in the context of Symmio and Vibe**.
- **Protocol-operated solvers** vs **third-party solvers** — why you need *both*, and what each unlocks.
- Why intents are the right primitive to **bootstrap** new markets.

## Part V — Inside Symmio: the architecture
- The **application layer**; **Party A / Party B** and why the distinction matters.
- **Isolation** — what it is and **why it's essential**; isolation vs **cross-margin**.
- **Capital efficiency** — on the **solver** side *and* the **user** side.
- The **challenges of intent-based derivatives** — especially **UX**: why intents create more UX friction, why it's still worth solving, and the **long-term vision**.

## Part VI — The products & the system in practice
- The concrete products on Symmio and Vibe; how a trade actually flows (**intent → solver → settlement**).
- Bridge into the **reference layer** (`03-grounding.md`): the Vibe app/dashboard, revenue, volume, points, vibe-points — how the manifesto's ideas show up in the product a user actually touches.

## Guided journeys ("onboard me into the system")
Entry paths that ask *what the reader wants*, then route them:
- **"New — explain the whole thesis"** → Parts I→VI in order.
- **"Trader"** → products → how a trade flows → the dashboard.
- **"HIP-3 deployer / market creator"** → bootstrapping + the discovery-layer argument → how to launch.
- **"Solver / LP"** → solvers, capital efficiency, the economics.
- **"Researcher"** → origin, whitepapers, architecture, open challenges.
