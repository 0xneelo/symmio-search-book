# CLAUDE.md — cost-efficient delegation

<!-- Installed by the `cost-delegation` skill. -->

Loaded every session and cached as a prefix. **Keep it stable** — editing it mid-session invalidates the
whole session's prompt cache. Its job: make delegation and model choice deliberate, because that is where
the token budget is won or lost.

## The cost model (why any of this matters)

1. **Context isolation.** A subagent runs in its own context window and returns only its final answer. The
   orchestrator's context — the expensive one you re-read every turn — stays small. Reading ten files to
   answer one question costs the main thread almost nothing if a subagent reads them and hands back the
   conclusion.
2. **Model tiering.** Match the model to the task. The gap between tiers is up to **10×** (see ladder).
   Mechanical work on the top tier is the most common way a project overspends.
3. **Parallelism.** Independent subagents run at once — less wall-clock, each stays focused.
4. **Cache preservation.** The system prompt + this file + the tool list are cached as a prefix (cache
   reads ≈ 0.1× input price). Switching the driver's model mid-session throws that away — **caches are
   model-scoped**. So you never downgrade the driver to save money; you delegate the cheap part to a
   cheaper subagent and keep the driver on one model.

## The model cost ladder

Per 1M tokens (input / output):

| Tier | Model | Input | Output | Role |
|---|---|---|---|---|
| 1 | `claude-haiku-4-5` | $1 | $5 | mechanical subagent |
| 2 | `claude-sonnet-5` | $3 ($2 intro → 2026-08-31) | $15 ($10 intro) | build subagent |
| 3 | `claude-opus-4-8` | $5 | $25 | **the driver** |
| 4 | `claude-fable-5` | $10 | $50 | escalation only |

**Fable is the most expensive model, not the cheapest — 2× Opus, ~3–5× Sonnet, 10× Haiku.** Escalating
*up* to Fable is a deliberate **spend**, never a saving.

## The architecture (hybrid)

- **Driver = Opus 4.8.** Default session model; orchestrates and decides, kept lean.
- **Delegate the legwork down** to Haiku (mechanical) and Sonnet (implementation) subagents. **This is where cost is saved.**
- **Escalate up to Fable only** for a separable, genuinely-beyond-Opus crux — test on Opus first.
- **Fable as a driver** only for the rare long autonomous marathon (full spec up front).

## Named subagents (use these)

Pinned to a model in `.claude/agents/`, so delegation is cheap *deterministically*.

| Agent | Model | For |
|---|---|---|
| `reader` | Haiku | read-only search / extraction / mapping — use for **any** broad read instead of reading in the main thread |
| `builder` | Sonnet | scoped feature slices, multi-file edits that need judgment |
| `reviewer` | Sonnet | review a diff before committing |
| `hard-crux` | Fable | **last resort** — a separable, beyond-Opus problem, *after* Opus has been tried; a deliberate spend |

In a harness without these files (e.g. Cursor), spawn a generic subagent and set the model yourself.

## The rule

**Top-tier models are for decisions. Everything else is delegated down.** An expensive orchestrator is
fine *if it stays lean* — an Opus driver that fans mechanical work out to Haiku/Sonnet subagents spends
its premium tokens only on judgment. The costly pattern is the opposite: a top-tier model reading files,
grepping, and running smokes inside a bloated context.

## Escalate UP to Fable (rare, deliberate spend)

Use `hard-crux` **only when all three hold**: (1) genuinely beyond Opus — tested on Opus first;
(2) separable, with a crisp return; (3) worth 2× an Opus subagent. Most "hard" work stays on the Opus
driver, inline — Opus 4.8 is near-frontier. Entangled architecture is *not* delegable; keep it. A long
marathon is a Fable **driver** job, not a subagent.

## Tell the operator to offload

You can spawn subagents, but you **cannot** relaunch your own session on a different model or start a
parallel fleet of CLI workers — the operator does that. Flag it when a session is mostly legwork
("relaunch me on Sonnet, or let me delegate"), a job splits into 4+ independent workstreams (N CLI
workers), or a task is blocked only on a human gate (pushing to `main` or a production/VPS deploy — CI-gated and operator-run).

When you launch parallel subagents, do it in **one message** so they run concurrently.

## Effort + cache quick rules

- Prefer low effort for mechanical subagents where the harness lets you set it per-spawn (pinned agent
  files can't set `effort` — subagents inherit the session's effort). Hard reasoning: `high` / `xhigh`.
- Never interpolate volatile data (timestamps, IDs) into this file or the system prompt — it changes the
  cached prefix and re-bills the whole session uncached.
- Avoid adding/removing tools or switching the driver model mid-session — both invalidate the cache.
- Fable runs long (minutes) with always-on thinking. Give it the **full spec up front**.

## Stacked with Honey (fewer tokens × cheaper tokens)

Honey (installed at `~/.honey-src`, mode `full`) is a second, orthogonal cost lever: our tiering routes work to **cheaper** models; Honey emits **fewer** tokens per exchange. They multiply.

- **Prose intensity by tier:** `reader`/Haiku = **ultra** (answer-only), `builder`/`reviewer`/Sonnet = **full** (terse), `hard-crux`/Fable = **lite** (keep the reasoning — nuance survives).
- **Handoffs are payloads, not prose:** subagents return compact minified JSON (id-addressed, `n` checksum), never narrated results. ESON (`~/.honey-src/bin/eso.js`, ~−28% vs JSON) is opt-in for high-volume handoffs.
- **Safety carve-out (both systems agree):** auth, money, migrations, deletes, secrets, and anything explicitly requested stay **exact and uncompressed** — never ESON, never elided, never abbreviated.
