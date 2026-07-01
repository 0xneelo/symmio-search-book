#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

function readText(relativePath) {
  return fs.readFileSync(path.join(searchBookRoot, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function formatInteger(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function parseOpenOperatorIds(markdown) {
  const openSection = markdown.split("## Open")[1]?.split("## Resolved")[0] || "";
  return [...openSection.matchAll(/^### \[OPEN\] #(\d+)/gm)]
    .map((match) => Number(match[1]))
    .sort((a, b) => a - b);
}

function addCheck(checks, id, passed, detail, evidence = null) {
  checks.push({
    id,
    passed: Boolean(passed),
    detail,
    ...(evidence ? { evidence } : {}),
  });
}

const manifest = readJson("page-manifest.json");
const authored = readJson("data/authored-pages.json");
const sourceIngestion = readJson("data/source-ingestion.json");
const discord = readJson("data/discord-corpus.json");
const competitive = readJson("data/competitive-sweep.json");
const llm = readJson("data/llm-rag-contract.json");
const inbox = readText("_specs/app-docs/OPERATOR-INBOX.md");

const sourceComplete = sourceIngestion.byStatus?.complete || 0;
const sourcePartial = sourceIngestion.byStatus?.partial || 0;
const sourceParked = sourceIngestion.byStatus?.parked || 0;
const sourceMissing = sourceIngestion.byStatus?.missing || 0;
const sourceTotal = sourceIngestion.totalSourceRequirements;
const openOperatorIds = parseOpenOperatorIds(inbox);

const evidence = {
  manifestPages: manifest.pages.length,
  authoredPages: authored.totalPages,
  sourceIngestion: `${sourceComplete}/${sourceTotal}`,
  sourcePartial,
  sourceParked,
  sourceMissing,
  sourceCompletionReady: sourceIngestion.sourceCompletionReady,
  discordMessages: discord.totals?.importedMessages || 0,
  discordQuestionClusters: discord.totals?.questionClusters || 0,
  discordLafaCandidates: discord.totals?.lafaAnswerCandidates || 0,
  competitiveSweep: `${competitive.targetDocsReviewed}/${competitive.targetDocs}`,
  competitiveTargetDocs: competitive.targetDocs,
  competitiveReviewedDocs: competitive.targetDocsReviewed,
  llmProvider: llm.liveEvaluation?.provider || "",
  llmModel: llm.liveEvaluation?.model || "",
  openOperatorIds,
};

const specs = [
  {
    id: "narrative-thesis",
    path: "_specs/app-docs/02-narrative-thesis.md",
    fragments: [
      "## 2026-07-01 reconciliation note",
      "OPERATOR-INBOX.md",
      "12-search-book-to-100-percent.md",
      "OPERATOR-INBOX #6",
      "out of scope for v1",
      "official GitHub/current-docs evidence",
    ],
  },
  {
    id: "grounding",
    path: "_specs/app-docs/03-grounding.md",
    fragments: [
      "## 2026-07-01 reconciliation note",
      "public depth is 15 levels",
      "historical backfill is additive",
      "networkVolume x platformFeeRate x referrerPlatformShare",
      "0.05%",
      "5 bps",
      "30%",
      "Phase B economics remain out of scope for v1",
    ],
  },
  {
    id: "sources",
    path: "_specs/app-docs/04-sources.md",
    fragments: [
      "## 2026-07-01 reconciliation note",
      `\`${evidence.sourceIngestion}\` complete`,
      "Discord export/access is provided and imported internal-only",
      "Vibe Trading Notion is registered",
      "paraphrase-only public-use boundary",
      "original/oldest Symmio whitepaper recovery is out of scope for v1",
      "SuperFlow/SHE/SSHE is bounded",
      "Opyn is excluded",
      "#11 production VPS env install and #4 public frontend platform/repo/deploy route",
    ],
  },
  {
    id: "answer-engine",
    path: "_specs/app-docs/06-answer-engine.md",
    fragments: [
      "## 2026-07-01 reconciliation note",
      "OpenAI-compatible LLM RAG path",
      "strict citation validation",
      "deterministic/extractive fallback",
      evidence.llmModel,
      "Local `.secrets/search-book.env` is complete",
      "OPERATOR-INBOX #11 is only the production VPS env install",
      "/etc/symmio-search-book/search-book.env",
    ],
  },
  {
    id: "research-session",
    path: "_specs/app-docs/07-research-session.md",
    fragments: [
      "## 2026-07-01 reconciliation note",
      "Session 1 is complete for v1",
      `${evidence.manifestPages}-page manifest`,
      `${evidence.authoredPages} authored pages`,
      `${evidence.sourceIngestion} source-ingestion requirements complete`,
      "Discord/Lafa internal-only corpus",
      `${evidence.competitiveSweep} competitive sweep`,
      "Opyn excluded",
      "do not re-run access/blocker loops",
    ],
  },
  {
    id: "implementation-session",
    path: "_specs/app-docs/08-implementation-session.md",
    fragments: [
      "## 2026-07-01 reconciliation note",
      "standalone `symmio-search-book` repo",
      "Do not edit the frozen legacy",
      "authored compendium",
      "answer-engine runtime",
      "living-docs service boundary",
      "remaining production work",
      "OPERATOR-INBOX #11 production VPS env install and #4 public frontend platform/repo/deploy route",
    ],
  },
];

const appDocFragmentGuards = [
  {
    id: "mission-source-status",
    path: "_specs/app-docs/01-mission.md",
    required: [
      "Target: **500-800 substantive, cited pages**",
      "The **Symmio Discord mined/imported**",
      "internal-only evidence",
      "exact public Discord/Lafa statements require editorial review before publication",
    ],
    forbidden: [
      "100+ pages",
      "Requires a Discord export",
      "Discord import pending",
      "operator provides an export",
    ],
  },
  {
    id: "grounding-revenue-referrals",
    path: "_specs/app-docs/03-grounding.md",
    required: [
      "public depth is 15 levels",
      "historical backfill is additive and never lowers a balance",
      "networkVolume x platformFeeRate x referrerPlatformShare",
      "0.05%",
      "5 bps",
      "30%",
      "Public referral depth is resolved as **15 levels**",
    ],
    forbidden: [
      "Reconcile the exact depth",
      "Public answer TBD",
      "dashboard copy says 5 levels",
      "code/volume rollup uses **5 levels**",
    ],
  },
  {
    id: "sources-resolved-ingestion",
    path: "_specs/app-docs/04-sources.md",
    required: [
      "`17/17` complete",
      "Discord export/access is provided and imported internal-only",
      "Vibe Trading Notion is registered through MCP",
      "paraphrase-only public-use boundary",
      "original/oldest Symmio whitepaper recovery is out of scope for v1",
      "The only operator gates that remain are #11 production VPS env install and #4 public frontend platform/repo/deploy route.",
    ],
    forbidden: [
      "May need an export or share access",
      "Requires a Discord export",
      "if access is provided",
      "operator provides an export",
      "Notion pending",
      "SSHE unidentified",
    ],
  },
  {
    id: "answer-engine-provider-gate",
    path: "_specs/app-docs/06-answer-engine.md",
    required: [
      "OpenAI-compatible LLM RAG path",
      "gpt-4.1-mini",
      "Local `.secrets/search-book.env` is complete",
      "OPERATOR-INBOX #11 is only the production VPS env install",
      "/etc/symmio-search-book/search-book.env",
    ],
    forbidden: [
      "Local `.secrets/search-book.env` is pending",
      "pending operator MODEL+API_KEY",
      "answer with **Claude**",
      "vector index + Claude",
    ],
  },
  {
    id: "roadmap-open-gates",
    path: "_specs/app-docs/11-production-readiness-roadmap.md",
    required: [
      "Only two production operator gates remain",
      "production VPS env install at `/etc/symmio-search-book/search-book.env` (#11)",
      "public frontend platform/repo/deploy route (#4)",
      "source-ingestion map now reports 17/17 source families complete",
      "Notion, SSHE, oldest-whitepaper v1 boundary, and Discord/Lafa import are resolved for v1 source readiness",
      "OpenAI-compatible LLM RAG runtime exists",
    ],
    forbidden: [
      "Discord import pending",
      "Notion access pending",
      "oldest whitepaper recovery is parked",
      "source-ingestion map still reports",
      "known parked blockers",
      "production readiness depends on missing local LLM env",
      "missing production VPS LLM env",
      "launch-parked",
    ],
  },
];

const checks = [];

addCheck(
  checks,
  "operator-open-items",
  openOperatorIds.join(",") === "4,11",
  `open operator items=${openOperatorIds.join(",") || "none"}; expected=4,11`,
);

addCheck(
  checks,
  "source-ingestion-current",
  sourceIngestion.sourceCompletionReady === true &&
    sourceComplete === sourceTotal &&
    sourcePartial === 0 &&
    sourceParked === 0 &&
    sourceMissing === 0,
  `source ingestion ${sourceComplete}/${sourceTotal}; partial=${sourcePartial}; parked=${sourceParked}; missing=${sourceMissing}`,
);

addCheck(
  checks,
  "discord-import-current",
  discord.corpusReady === true &&
    discord.publicationMode === "internal-only" &&
    discord.storesMessageText === false &&
    evidence.discordMessages > 0 &&
    evidence.discordQuestionClusters > 0 &&
    evidence.discordLafaCandidates > 0,
  `messages=${formatInteger(evidence.discordMessages)}; clusters=${formatInteger(evidence.discordQuestionClusters)}; lafaCandidates=${formatInteger(evidence.discordLafaCandidates)}; storesMessageText=${discord.storesMessageText}`,
);

addCheck(
  checks,
  "llm-provider-current",
  evidence.llmProvider === "OpenAI" && evidence.llmModel === "gpt-4.1-mini",
  `provider=${evidence.llmProvider || "missing"}; model=${evidence.llmModel || "missing"}`,
);

for (const spec of specs) {
  const text = readText(spec.path);
  const top = text.slice(0, 1800);
  const missing = spec.fragments.filter((fragment) => !top.includes(fragment));
  addCheck(
    checks,
    `spec-${spec.id}`,
    missing.length === 0,
    missing.length ? `missing fragments: ${missing.join(" | ")}` : "reconciliation note is present and current",
    { path: spec.path },
  );
}

for (const guard of appDocFragmentGuards) {
  const text = readText(guard.path);
  const missing = guard.required.filter((fragment) => !text.includes(fragment));
  const stale = guard.forbidden.filter((fragment) => text.includes(fragment));
  addCheck(
    checks,
    `app-doc-${guard.id}`,
    missing.length === 0 && stale.length === 0,
    [
      missing.length ? `missing required fragments: ${missing.join(" | ")}` : "required fragments present",
      stale.length ? `stale forbidden fragments present: ${stale.join(" | ")}` : "no stale forbidden fragments",
    ].join("; "),
    { path: guard.path },
  );
}

const failed = checks.filter((check) => !check.passed);
const result = {
  status: failed.length ? "failed" : "passed",
  service: "search-book-spec-reconciliation",
  evidence,
  checks,
};

const rendered = JSON.stringify(result, null, 2);
if (failed.length) {
  console.error(rendered);
  process.exit(1);
}

console.log(rendered);
