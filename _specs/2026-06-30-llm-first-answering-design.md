> **Ported 2026-07-01 from `onboarding-app/docs/superpowers/specs/` during the repo
> extraction (SYN-253).** This design is **SHIPPED** — implemented as slice #1 on
> the old `search-book/research-dossier` branch and migrated here intact:
> `a86dd67` (default service to llm limited mode) → `45d5876` (smoke limited-mode
> fallbacks) → `80f2f91` (limited-mode UI banner). Kept verbatim below as the
> design record. **Path note:** the subtree split flattened paths to repo root,
> so every `src/search-book/scripts/…` reference below now lives at `scripts/…`
> (and `src/search-book/index.html` → `index.html`). Slices #2/#3 (reuse cache,
> dynamic chips) shipped on top; slice #4 = SYN-254 (backlog).

---

# Search Book — LLM-first answering with graceful "limited mode" fallback

**Date:** 2026-06-30
**Status:** Approved design, ready for implementation plan
**Scope:** Slice #1 of the Search Book answering roadmap (see "Roadmap context" below)

## Problem

The Search Book answer engine defaults to `extractive` mode, which routes
queries to deterministic authored/stub pages. Users get unhelpful "routed
answer" stubs (e.g. *"Managing VibeCaps Margin — this companion page is source
mapped, but not fully written yet"*) instead of a synthesized answer.

Separately, when `llm` mode is requested but the service has no model
credentials, the engine returns a **hard refusal** (`serviceConfigRefusal`,
`operator-blocked-refusal`) that reads to the user as *"Answer unavailable"* —
indistinguishable from a real content guardrail.

We want the engine to **synthesize answers with the LLM by default**, and when
the LLM is unavailable, **degrade gracefully** to the curated/extractive corpus
with a clear "limited mode" notice — never a hard refusal.

## Goal

1. LLM-first: synthesize a grounded, cited answer on every request by default.
2. Graceful degradation: when the LLM is unavailable (no creds, provider error,
   or user/IP over limit), serve the extractive/curated answer flagged as
   `degraded`, and tell the user they're in "limited mode."
3. Preserve guardrails: genuine content refusals (Discord/Lafa source family,
   secrets, prompt-injection, internal-draft pages) stay strict and unchanged.

## Core behavior: three outcomes, clearly separated

The design splits today's single "refuse" path into **degrade** vs **refuse**:

| Situation | Today | After this change |
| --- | --- | --- |
| LLM available, answer grounded | synthesized answer (only if `llm` forced) | **Synthesized answer (default)** |
| LLM **unavailable** — no creds, provider error, over limit | hard "Answer unavailable" refusal | **Degrade**: extractive/curated answer + `degraded` flag → UI shows "limited mode" |
| Content **guardrail** — Lafa/Discord, secrets, prompt-injection, internal-draft | refuse | **Refuse, unchanged** |

**Invariant:** "LLM is down" must never look like "we refuse to answer." Only
genuine content guardrails produce a refusal status.

## Changes (4 files, no schema change)

The persisted store already holds everything the future roadmap needs:
`search_book_questions.response_json` (full answer), `citations_json`, `mode`,
`confidence`, `llm_usage_json`, plus a linked `search_book_ratings` table
(`src/search-book/scripts/serve-answer-engine.mjs:98-130`). **No migration is
required for this slice.**

### 1. `src/search-book/scripts/run-llm-rag-answer.mjs` — `llmAnswer`
- When `assertLlmConfig` fails (missing/invalid creds), do **not** throw. Return
  `extractiveAnswer(...)` tagged with `degraded: { reason: "llm-unavailable" }`.
- When the provider call errors out after the existing retries, return
  `extractiveAnswer(...)` tagged `degraded: { reason: "llm-error" }`.
- The existing post-validation extractive fallback (currently
  `fallback: "extractive-after-validation-failure"`) stays as-is.
- Add a small helper to wrap an extractive response with a `degraded` marker so
  the shape is consistent across all degrade paths. `degraded` is absent on
  normal answered/refusal responses.

### 2. `src/search-book/scripts/serve-answer-engine.mjs`
- Default mode → `llm`: change the `defaultMode` default from `"extractive"` to
  `"llm"` (env `SEARCH_BOOK_ANSWER_ENGINE_DEFAULT_MODE` still overrides).
- Delete the `serviceConfigRefusal` conversion in `handleAnswer`'s catch block;
  the runtime now degrades instead of throwing the config error. Keep `throw`
  for genuinely unexpected errors.
- Rate-limit degrade: when `checkRateLimit` trips on an `llm` request, serve the
  extractive answer tagged `degraded: { reason: "rate-limited" }` instead of an
  error response. **This is the exact hook the future volume/points limiter
  (slice #4) plugs into.**

### 3. `src/search-book/index.html`
- Default `serviceMode` to `llm` when no param/localStorage value is set.
- Render a "limited mode" banner when `response.degraded` is present. Proposed
  copy: *"⚡ Limited mode — I can only answer from saved questions right now.
  Try one of the examples below."* Tailor copy when
  `degraded.reason === "rate-limited"` (e.g. mention the limit). Surface the
  curated example chips prominently in this state.

### 4. `src/search-book/scripts/smoke-answer-engine-service.mjs`
- Assert no-creds `llm` request → real extractive answer carrying `degraded`
  (reason `llm-unavailable`), **status `answered`/extractive, NOT a refusal**.
- Assert a Discord/Lafa query → still returns a refusal (guardrail intact).
- Full LLM synthesis remains covered by the existing `--eval-live` harness
  (requires a real key) and is out of scope for the offline smoke.

## Out of scope (deliberately)

- **Slice #2** — reuse-cache: serve a stored helpful-rated answer for a similar
  prior question instead of regenerating (the exact-match vs embeddings fork).
- **Slice #3** — dynamic example chips generated from top-rated user questions.
- **Slice #4** — per-user question limits based on trading volume / points. The
  `degraded: { reason: "rate-limited" }` plumbing built here is its mount point.

## Caveat (set expectations)

LLM-first makes answers fluent and synthesized, but they remain **grounded in
retrieved chunks with validated citations** — that guardrail stays. Thin corpus
areas (e.g. the half-written VibeCaps Margin page) still produce thin answers
until the corpus grows. The rated-Q&A loop in slices #2/#3 is what grows it.

## Testing

- Extend `smoke-answer-engine-service` per change #4 (offline, no live LLM).
- Manual: run the engine with no creds → confirm "limited mode" banner + a
  curated answer, not "Answer unavailable." Add creds → confirm synthesized
  answers. Ask a Lafa question → confirm it still refuses.

## Roadmap context

This is slice #1 of a 4-part vision discussed with the operator:
1. **(this spec)** LLM-first answering + graceful fallback.
2. Rated Q&A reuse-cache (answer + rating already persisted; needs a
   "similar question" match — exact-normalized vs embeddings).
3. Dynamic example chips derived from highly-rated real questions; curated list
   demoted to fallback-only.
4. Per-user question limits by trading volume / points, mounted on the
   `degraded: rate-limited` path.
