# Launch Prompt: Source Ingestion Final Mile

Use this only after OPERATOR-INBOX #17 is resolved or when checking whether the Discord export has become readable.

You are a Search Book worker in the standalone repo:

```sh
cd /home/tabor/apps/symmio-search-book
```

Do not work in `~/projects/onboarding-app/src/search-book`; it is frozen legacy.

Current ground truth:

- Notion is complete and paraphrase-only.
- SSHE is complete for v1 using SuperFlow/SHE OpenAPI plus Symmio Foundation Meta-Solvers and Clearing Layers.
- Original/oldest whitepaper recovery is out of scope for v1.
- Discord access/export decision is resolved; only readable file release remains as #17 / SYN-289.
- Production env #11 and deploy route #4 are still production gates.

Task:

1. Read `docs/goals/source-ingestion/goal.md`, `plan.md`, and `execution-protocol.md`.
2. Read `_local/agent-worklog.md` and `_specs/app-docs/OPERATOR-INBOX.md`.
3. Confirm whether #17 is resolved or the export is readable.
4. If readable, run `scripts/build-discord-corpus.mjs`, fold launch-safe demand signals into the generated/ authored surfaces, and run `npm run search-book:verify`.
5. If still unreadable, do not reopen #2. Leave #17 as the single file-release follow-up and continue with non-Discord production-readiness work.
