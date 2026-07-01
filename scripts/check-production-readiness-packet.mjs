#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const expectedOpenIds = [4, 11];
const reconciledResolvedIds = [2, 5, 6, 7, 12, 17];
const productionEnvPath = "/etc/symmio-search-book/search-book.env";

function read(relativePath) {
  return fs.readFileSync(path.join(searchBookRoot, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

function addCheck(checks, id, passed, detail = "", evidence = null) {
  checks.push({
    id,
    passed: Boolean(passed),
    detail,
    ...(evidence ? { evidence } : {}),
  });
}

function includesAll(text, fragments) {
  return fragments.every((fragment) => text.includes(fragment));
}

function sectionBetween(markdown, startMarker, endMarker) {
  const start = markdown.indexOf(startMarker);
  if (start === -1) return "";
  const afterStart = markdown.slice(start + startMarker.length);
  if (!endMarker) return afterStart;
  const end = afterStart.indexOf(endMarker);
  return end === -1 ? afterStart : afterStart.slice(0, end);
}

function parseInboxEntries(markdown) {
  const pattern = /^### \[(OPEN|RESOLVED)\] #(\d+)\s+[-\u2014]\s+(.+)$/gm;
  const matches = [...markdown.matchAll(pattern)];
  return matches.map((match, index) => {
    const next = matches[index + 1];
    return {
      status: match[1],
      id: Number(match[2]),
      title: match[3].trim(),
      body: markdown.slice(match.index, next?.index ?? markdown.length),
    };
  });
}

function sortedIds(entries) {
  return entries.map((entry) => entry.id).sort((a, b) => a - b);
}

function sameIds(actual, expected) {
  return actual.length === expected.length && actual.every((id, index) => id === expected[index]);
}

function countMatches(text, pattern) {
  return [...text.matchAll(pattern)].length;
}

const packet = read("PRODUCTION-READINESS-PACKET.md");
const inbox = read("_specs/app-docs/OPERATOR-INBOX.md");
const packageJson = readJson("package.json");
const requirementMap = readJson("data/requirement-map.json");
const sourceIngestion = readJson("data/source-ingestion.json");
const discordRouting = readJson("data/discord-review-routing.json");

const openEntries = parseInboxEntries(sectionBetween(inbox, "## Open", "## Resolved")).filter((entry) => entry.status === "OPEN");
const resolvedEntries = parseInboxEntries(sectionBetween(inbox, "## Resolved", "---")).filter((entry) => entry.status === "RESOLVED");
const openIds = sortedIds(openEntries);
const resolvedIds = sortedIds(resolvedEntries);
const currentBoundary = sectionBetween(packet, "## Current Boundary", "## #11 Production Env Install");
const releaseChecklist = sectionBetween(packet, "## Release Checklist", "");
const checks = [];

addCheck(
  checks,
  "script-registered",
  packageJson.scripts?.["search-book:check-production-packet"] === "node scripts/check-production-readiness-packet.mjs",
  "package.json must expose the production packet guard as npm run search-book:check-production-packet",
);

addCheck(
  checks,
  "operator-open-boundary",
  sameIds(openIds, expectedOpenIds),
  `open=${openIds.join(",") || "none"}; expected=${expectedOpenIds.join(",")}`,
  { openOperatorItems: openIds },
);

addCheck(
  checks,
  "resolved-items-not-reopened",
  reconciledResolvedIds.every((id) => resolvedIds.includes(id) && !openIds.includes(id)),
  `resolved=${resolvedIds.filter((id) => reconciledResolvedIds.includes(id)).join(",")}; reopened=${reconciledResolvedIds.filter((id) => openIds.includes(id)).join(",") || "none"}`,
);

addCheck(
  checks,
  "current-boundary-exact",
  includesAll(currentBoundary, [
    "Only these production gates remain:",
    "OPERATOR-INBOX #11",
    productionEnvPath,
    "OPERATOR-INBOX #4",
    "Local LLM env: complete in `.secrets/search-book.env`; do not print it",
    "source ingestion `17/17` with 0 partial / 0 parked / 0 missing source families",
    "quality gates `29/30`",
  ]) &&
    countMatches(currentBoundary, /OPERATOR-INBOX #\d+/g) === 2,
  "current boundary must name only #11/#4, the local-env-complete rule, source completeness, and quality boundary",
);

addCheck(
  checks,
  "generated-evidence-aligned",
  sourceIngestion.sourceCompletionReady === true &&
    (sourceIngestion.byStatus?.complete || 0) === 17 &&
    (sourceIngestion.byStatus?.partial || 0) === 0 &&
    (sourceIngestion.byStatus?.parked || 0) === 0 &&
    sourceIngestionMissing(sourceIngestion) === 0 &&
    (discordRouting.reviewPlan?.routeCoverage?.pageFitCoveredByPublicRoutes || 0) === (discordRouting.reviewPlan?.routeCoverage?.totalPageFitGroups || -1),
  "packet guard must run against current source-ingestion and Discord route-coverage evidence",
  {
    sourceIngestion: {
      complete: sourceIngestion.byStatus?.complete || 0,
      partial: sourceIngestion.byStatus?.partial || 0,
      parked: sourceIngestion.byStatus?.parked || 0,
      missing: sourceIngestionMissing(sourceIngestion),
    },
    discordPageFitCoverage: `${discordRouting.reviewPlan?.routeCoverage?.pageFitCoveredByPublicRoutes || 0}/${discordRouting.reviewPlan?.routeCoverage?.totalPageFitGroups || 0}`,
  },
);

addCheck(
  checks,
  "production-env-contract",
  includesAll(packet, [
    "SEARCH_BOOK_ANSWER_ENGINE_HOST=127.0.0.1",
    "SEARCH_BOOK_ANSWER_ENGINE_PORT=8787",
    "SEARCH_BOOK_ANSWER_ENGINE_URL=https://<answer-engine-host>",
    "SEARCH_BOOK_DEPLOYMENT_SITE_URL=https://<public-docs-route>",
    "SEARCH_BOOK_ANSWER_ENGINE_DB=/var/lib/symmio-search-book/search-book-answer-engine.sqlite",
    "SEARCH_BOOK_ANSWER_ENGINE_DEFAULT_MODE=llm",
    "SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS=https://<public-docs-route>",
    "SEARCH_BOOK_ANSWER_ENGINE_ENABLE_METRICS_EXPORT=true",
    "SEARCH_BOOK_LLM_API_STYLE=openai-compatible",
    "SEARCH_BOOK_LLM_ENDPOINT=https://api.openai.com/v1/chat/completions",
    "SEARCH_BOOK_LLM_MODEL=gpt-4.1-mini",
    "SEARCH_BOOK_LLM_API_KEY=<server-only-openai-key>",
    "SEARCH_BOOK_LLM_ALLOW_EXTERNAL_CONTEXT=true",
    "SEARCH_BOOK_REVIEWER_OWNER=<owner-or-rotation>",
    "SEARCH_BOOK_REVIEW_CADENCE=daily",
    "SEARCH_BOOK_ANSWER_ENGINE_BACKUP_DIR=/var/backups/symmio-search-book",
    "SEARCH_BOOK_ANSWER_ENGINE_BACKUP_MANIFEST=/var/backups/symmio-search-book/latest.manifest.json",
    "SEARCH_BOOK_BACKUP_MAX_AGE_HOURS=24",
  ]),
  "#11 env contract must include the production service, LLM, reviewer, and backup fields",
);

addCheck(
  checks,
  "operator-validation-commands",
  includesAll(packet, [
    "npm run search-book:check-production-env-fixture",
    "npm run search-book:check-deploy-templates",
    "npm run search-book:check-production-packet",
    "npm run search-book:check-backup-restore",
    "npm run search-book:check-github-workflows",
    "npm run search-book:check-living-docs-review",
    `node --env-file=${productionEnvPath} scripts/check-production-env.mjs`,
    "sudo systemctl enable --now symmio-search-book.service",
    "sudo systemctl enable --now symmio-search-book-backup.timer",
    "sudo test -s /var/backups/symmio-search-book/latest.manifest.json",
  ]),
  "packet validation for #11 must include the production packet guard and service/backup install checks",
);

addCheck(
  checks,
  "operator-pass-criteria",
  includesAll(packet, [
    "valuesPrinted is `false`",
    "LLM API key is reported only as configured/not configured",
    "DB path is absolute and outside the repo",
    "default mode is `llm`",
    "CORS origins are exact HTTPS public docs origins, never `*`",
    "reviewer owner/cadence and backup storage are configured",
    "no-secret local backup-restore evidence passes before relying on production backup manifests",
    "no-secret GitHub workflow contract guard passes before relying on CI/manual release artifacts",
    "no-secret living-docs reviewer evidence reports count-only summary output before enabling reviewer handoffs",
    "launch/release packet validators require the living-docs reviewer evidence before operator handoff",
  ]),
  "#11 pass criteria must preserve no-secret, LLM-first, backup, workflow, and reviewer boundaries",
);

addCheck(
  checks,
  "deploy-route-decision-contract",
  includesAll(packet, [
    "The backend decision is already locked: standalone answer-engine service plus SQLite.",
    "Public docs URL",
    "Public answer-engine URL",
    "Static hosting platform and repo owner",
    "Service host owner and reverse-proxy/TLS route",
    "Production CORS origin list for `SEARCH_BOOK_ANSWER_ENGINE_ALLOWED_ORIGINS`",
    "Monitoring owner for `/health`, `/api/search-book/metrics`, and service logs",
    "Backup owner and restore-check cadence",
    "Living-docs reviewer owner/cadence",
    "static site serves `index.html` and `data/*`",
    "answer-engine route serves `/health` and `/api/search-book/*`",
    "answer-engine service is behind HTTPS in production",
    "production SQLite DB and backups live outside the repo",
  ]),
  "#4 must remain scoped to the public frontend/deploy route, not the already-decided backend architecture",
);

addCheck(
  checks,
  "launch-validation-commands",
  includesAll(packet, [
    "npm run search-book:smoke-deployment -- \\",
    "node --env-file=/etc/symmio-search-book/search-book.env scripts/check-launch-readiness.mjs \\",
    "node --env-file=/etc/symmio-search-book/search-book.env scripts/build-launch-evidence-packet.mjs \\",
    "node --env-file=/etc/symmio-search-book/search-book.env scripts/check-monitoring-evidence.mjs \\",
    "--metrics-required",
  ]),
  "#4 validation must include deployment smoke, launch readiness, launch evidence, and monitoring evidence",
);

addCheck(
  checks,
  "production-pass-criteria",
  includesAll(packet, [
    "production env preflight passes",
    "deterministic verify runs in the launch gate",
    "source-ingestion launch check reports `17/17 complete`, 0 partial, 0 parked, and 0 missing source families",
    "sanitized Discord route-coverage launch check reports 19/19 page-fit groups covered",
    "Discord refusal runtime evidence reports 2/2 public-safe probes refused",
    "deployment smoke passes against non-local HTTPS URLs",
    "latest backup manifest reports restore-check `passed`",
    "backup-restore evidence reports 4/4 tables matched",
    "GitHub workflow contract evidence reports 4/4 expected workflows",
    "living-docs reviewer evidence reports raw internal summaries are privacy-flagged",
    "launch/release packet validators report living-docs review evidence `passed`",
    "reviewer owner/cadence evidence is configured",
    "no launch-blocking operator items remain for the chosen release scope",
    "`launch-evidence.json` and `launch-evidence.md` are attached or linked without secret values",
    "monitoring evidence reports health `ok`, unauthenticated metrics rejected, authenticated metrics `ok`, and no raw questions/secrets in metrics",
  ]),
  "production pass criteria must cover env, verify, source/Discord, deployment, backup, workflows, reviewer, launch, and monitoring evidence",
);

addCheck(
  checks,
  "release-checklist",
  includesAll(releaseChecklist, [
    "npm run search-book:verify",
    "npm run search-book:check-production-packet",
    "npm run search-book:check-backup-restore",
    "npm run search-book:check-github-workflows",
    "npm run search-book:check-living-docs-review",
    "node scripts/check-readiness-evidence.mjs",
    `node --env-file=${productionEnvPath} scripts/check-production-env.mjs`,
    `node --env-file=${productionEnvPath} scripts/check-launch-readiness.mjs \\`,
    `node --env-file=${productionEnvPath} scripts/check-monitoring-evidence.mjs \\`,
    "git diff --check",
  ]),
  "release checklist must include deterministic verify, packet guard, production env, launch, monitoring, and diff checks",
);

const secretPatterns = [
  { id: "openai-key", pattern: /\bsk-[A-Za-z0-9_-]{20,}\b/g },
  { id: "bearer-token", pattern: /\bBearer\s+[A-Za-z0-9._-]{20,}\b/g },
];
const secretMatches = secretPatterns.flatMap(({ id, pattern }) => [...packet.matchAll(pattern)].map((match) => ({ id, match: match[0].slice(0, 12) })));
addCheck(
  checks,
  "no-secret-values",
  secretMatches.length === 0,
  secretMatches.length ? `secret-looking values=${secretMatches.map((item) => item.id).join(",")}` : "no OpenAI key or bearer token values found",
);

const requirementOpenIds = (requirementMap.openOperatorItems || []).map((item) => Number(item.id)).sort((a, b) => a - b);
addCheck(
  checks,
  "requirement-map-boundary",
  sameIds(requirementOpenIds, expectedOpenIds),
  `requirementMap=${requirementOpenIds.join(",") || "none"}; expected=${expectedOpenIds.join(",")}`,
);

function sourceIngestionMissing(sourceIngestionReport) {
  return sourceIngestionReport.byStatus?.missing || 0;
}

const failed = checks.filter((check) => !check.passed);
const result = {
  status: failed.length ? "failed" : "passed",
  service: "search-book-production-readiness-packet",
  valuesPrinted: false,
  evidence: {
    productionEnvPath,
    openOperatorItems: openIds,
    resolvedItems: resolvedIds.filter((id) => reconciledResolvedIds.includes(id)),
    sourceIngestion: {
      complete: sourceIngestion.byStatus?.complete || 0,
      partial: sourceIngestion.byStatus?.partial || 0,
      parked: sourceIngestion.byStatus?.parked || 0,
      missing: sourceIngestionMissing(sourceIngestion),
    },
    discordPageFitCoverage: `${discordRouting.reviewPlan?.routeCoverage?.pageFitCoveredByPublicRoutes || 0}/${discordRouting.reviewPlan?.routeCoverage?.totalPageFitGroups || 0}`,
    secretMatches: secretMatches.length,
  },
  checks,
};

const rendered = JSON.stringify(result, null, 2);
if (failed.length) {
  console.error(rendered);
  process.exit(1);
}

console.log(rendered);
