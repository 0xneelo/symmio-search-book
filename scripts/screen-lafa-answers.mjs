#!/usr/bin/env node
// Contradiction screen for hydrated Lafa Discord answers (SYN-309).
//
// Reads a lafa-cite discord corpus (built by scripts/build-discord-corpus.mjs
// --publication-mode lafa-cite against the gitignored raw export) and screens
// each hydrated Lafa answer against the reconciled Search Book boundaries:
//   - G-003 referral depth (public = 15 levels)
//   - G-004 Phase-A/B revenue boundary (0.05% / 5 bps fee + 30% referrer share; Phase B out of scope for v1)
//   - G-006 exact Vibe market counts (publication-date verification, never a static fact)
//   - the Add-Token-Info disallowed static-payment phrases
//   - key-shape secret patterns
//
// Output is TRIAGE ONLY — answer ids + flag reasons + counts, never answer text —
// so it is safe to commit even when derived from a hydrated corpus. Auto-approved
// answers (no contradiction) are eligible to become discord-lafa chunks; flagged
// answers are excluded and surfaced count-only for human review.
//
// Usage:
//   node scripts/screen-lafa-answers.mjs [--corpus data/discord-corpus.json] [--out-json /tmp/lafa-screen.json]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");

function parseArgs(argv) {
  const args = {
    corpus: path.join(repoRoot, "data", "discord-corpus.json"),
    outJson: "",
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--corpus") args.corpus = argv[++index];
    else if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node scripts/screen-lafa-answers.mjs [--corpus path] [--out-json path]");
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

const keyShapePatterns = [
  { id: "openai-secret-key", re: /\bsk-(?:proj-)?[A-Za-z0-9]{20,}\b/ },
  { id: "github-token", re: /\bgh[opsu]_[A-Za-z0-9]{20,}\b/ },
  { id: "aws-access-key-id", re: /\bAKIA[0-9A-Z]{16}\b/ },
  { id: "pem-private-key", re: /-----BEGIN (?:[A-Z0-9 ]+ )?PRIVATE KEY-----/ },
];

// Add-Token-Info disallowed static-payment phrases (mirrors buildAnswerGuidance).
const disallowedPhrases = ["static fee amount", "static treasury address", "guessed payment chain"];

// Each rule returns a reason string when the answer text CONTRADICTS a reconciled
// boundary (or asserts a volatile fact that must be re-verified at publication).
const screenRules = [
  {
    id: "referral-depth-contradiction",
    test(text) {
      if (!/\b(referral|referrals)\b/i.test(text)) return false;
      if (!/\b(depth|level|levels)\b/i.test(text)) return false;
      // Contradiction: asserts a specific level count that is not the reconciled 15.
      const levelMatches = [...text.matchAll(/\b(\d{1,3})\s*(?:-?\s*)?levels?\b/gi)].map((m) => Number(m[1]));
      return levelMatches.some((n) => n !== 15);
    },
  },
  {
    id: "phase-b-revenue-out-of-scope",
    test(text) {
      // Contradiction: presents Phase B revenue as live/available in v1.
      return /\bphase\s*b\b/i.test(text) && /\b(live|available|now|shipped|enabled|in\s*v1)\b/i.test(text);
    },
  },
  {
    id: "revenue-rate-contradiction",
    test(text) {
      if (!/\b(fee|fees|revenue|referrer share|platform fee)\b/i.test(text)) return false;
      // Contradiction: cites a percentage fee/share that is not one of the reconciled defaults.
      const pcts = [...text.matchAll(/\b(\d{1,3}(?:\.\d+)?)\s*%/g)].map((m) => Number(m[1]));
      const reconciled = new Set([0.05, 30]);
      return pcts.some((p) => !reconciled.has(p));
    },
  },
  {
    id: "market-count-needs-publication-verification",
    test(text) {
      // G-006: any specific Vibe market count is a publication-date item, never static.
      return /\b\d{2,4}\+?\s*(markets?|pairs?|perps?)\b/i.test(text) && /\b(vibe|market)\b/i.test(text);
    },
  },
  {
    id: "add-token-disallowed-phrase",
    test(text) {
      const lower = text.toLowerCase();
      return disallowedPhrases.some((phrase) => lower.includes(phrase));
    },
  },
  {
    id: "secret-pattern",
    test(text) {
      return keyShapePatterns.some((pattern) => pattern.re.test(text));
    },
  },
];

function screenAnswer(candidate) {
  const text = String(candidate.answer || "");
  const reasons = [];
  for (const rule of screenRules) {
    try {
      if (rule.test(text)) reasons.push(rule.id);
    } catch {
      reasons.push(`${rule.id}-error`);
    }
  }
  return reasons;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const corpus = JSON.parse(fs.readFileSync(args.corpus, "utf8"));
  const candidates = (corpus.lafaAnswerCandidates || []).filter((candidate) => candidate.answer);
  const flagged = [];
  const autoApprovedIds = [];
  const reasonCounts = {};
  for (const candidate of candidates) {
    const reasons = screenAnswer(candidate);
    if (reasons.length) {
      flagged.push({ id: candidate.id, messageId: candidate.messageId, reasons });
      for (const reason of reasons) reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;
    } else {
      autoApprovedIds.push(candidate.id);
    }
  }
  const report = {
    generatedAt: "deterministic-screen",
    status: "lafa-answers-screened",
    corpusPublicationMode: corpus.publicationMode || "",
    corpusTextScope: corpus.textScope || "",
    screenPolicy: "auto-approve answers with no reconciled-boundary contradiction; exclude and surface flagged answers count-only for human review; triage stores ids + reasons only, never answer text",
    boundaries: screenRules.map((rule) => rule.id),
    totals: {
      hydratedAnswers: candidates.length,
      autoApproved: autoApprovedIds.length,
      flagged: flagged.length,
    },
    reasonCounts,
    autoApprovedIds,
    flagged,
  };
  const out = JSON.stringify(report, null, 2);
  if (args.outJson) {
    fs.mkdirSync(path.dirname(args.outJson), { recursive: true });
    fs.writeFileSync(args.outJson, `${out}\n`);
  }
  console.log(JSON.stringify({
    status: report.status,
    hydratedAnswers: report.totals.hydratedAnswers,
    autoApproved: report.totals.autoApproved,
    flagged: report.totals.flagged,
    reasonCounts,
  }, null, 2));
}

main();
