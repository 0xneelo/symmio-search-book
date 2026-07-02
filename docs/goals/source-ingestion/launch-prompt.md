# Launch Prompt: Source Ingestion Maintenance

Use this for future source-ingestion maintenance or when a new Discord export is intentionally imported. The v1 Discord/#17 follow-up is already resolved.

You are a Search Book worker in the standalone repo:

```sh
cd /home/tabor/apps/symmio-search-book
```

Do not work in `~/projects/onboarding-app/src/search-book`; it is frozen legacy.

Current ground truth:

- Notion is complete and paraphrase-only.
- SSHE is complete for v1 using SuperFlow/SHE OpenAPI plus Symmio Foundation Meta-Solvers and Clearing Layers.
- Original/oldest whitepaper recovery is out of scope for v1.
- Discord access/export and readable file release #17 / SYN-289 are resolved; the committed corpus is imported-needs-review with 5,000 messages, 723 question clusters, 837 configured Lafa answer candidates, and no raw message text stored in committed data.
- Production env #11 and deploy route #4 are still production gates.

Task:

1. Read `docs/goals/source-ingestion/goal.md`, `plan.md`, and `execution-protocol.md`.
2. Read `_local/agent-worklog.md` and `_specs/app-docs/OPERATOR-INBOX.md`.
3. Confirm the open operator boundary is still only #11 and #4.
4. If a new source corpus is intentionally imported, run the existing importer, fold only launch-safe demand signals into generated/authored surfaces, and run `npm run search-book:verify`.
5. Do not reopen #2, #5, #6, #7, #12, or #17. If a genuinely new post-reconciliation source issue appears, create one new scoped inbox item.
