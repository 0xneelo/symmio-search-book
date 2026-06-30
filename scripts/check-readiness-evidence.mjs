#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(searchBookRoot, "..", "..");

const contractPath = path.join(searchBookRoot, "data", "llm-rag-contract.json");
const docs = [
  { id: "final-report", relativePath: "src/search-book/FINAL-REPORT.md" },
  { id: "progress", relativePath: "src/search-book/PROGRESS.md" },
  { id: "roadmap", relativePath: "_specs/app-docs/11-production-readiness-roadmap.md" },
  { id: "llm-rag-contract", relativePath: "src/search-book/LLM-RAG-CONTRACT.md" },
];

const staleMarkers = [
  { label: "previous SYN-215 output token total", value: "7,590" },
  { label: "previous SYN-215 output token total", value: "7590" },
  { label: "previous SYN-215 cost", value: "$0.01704240" },
  { label: "previous SYN-215 cost", value: "0.0170424" },
  { label: "previous SYN-215 output token total", value: "7,755" },
  { label: "previous SYN-215 output token total", value: "7755" },
  { label: "previous SYN-215 cost", value: "$0.01714140" },
  { label: "previous SYN-215 cost", value: "0.0171414" },
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function formatInteger(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatUsd(value) {
  return `$${Number(value).toFixed(8)}`;
}

function assertLiveEvaluation(contract) {
  if (!contract.liveEvaluation || contract.liveEvaluation.status !== "passed") {
    throw new Error("llm-rag-contract.json is missing a passing liveEvaluation block");
  }
  return contract.liveEvaluation;
}

function checkDocument(doc, expectedChecks) {
  const absolutePath = path.join(repoRoot, doc.relativePath);
  const text = fs.readFileSync(absolutePath, "utf8");
  const missing = expectedChecks
    .filter((check) => !check.fragments.some((fragment) => text.includes(fragment)))
    .map((check) => ({
      id: check.id,
      expectedOneOf: check.fragments,
    }));
  const stale = staleMarkers.filter((marker) => text.includes(marker.value));
  return {
    ...doc,
    absolutePath,
    missing,
    stale,
    passed: missing.length === 0 && stale.length === 0,
  };
}

const contract = readJson(contractPath);
const live = assertLiveEvaluation(contract);
const usage = live.measuredUsage;
const suites = live.suites;

const expected = {
  verifiedAt: live.verifiedAt,
  provider: live.provider,
  model: live.model,
  total: `${suites.total.passing}/${suites.total.total}`,
  adversarial: `${suites.adversarial.passing}/${suites.adversarial.total}`,
  answerValidation: `${suites.answerValidation.passing}/${suites.answerValidation.total}`,
  calls: String(usage.calls),
  inputTokens: formatInteger(usage.inputTokens),
  outputTokens: formatInteger(usage.outputTokens),
  estimatedCostUsd: formatUsd(usage.estimatedCostUsd),
};

const expectedChecks = [
  { id: "verifiedAt", fragments: [expected.verifiedAt] },
  { id: "provider", fragments: [expected.provider] },
  { id: "model", fragments: [expected.model] },
  { id: "total fixtures", fragments: [expected.total] },
  { id: "adversarial fixtures", fragments: [expected.adversarial] },
  { id: "answer-validation fixtures", fragments: [expected.answerValidation] },
  {
    id: "measured calls",
    fragments: [
      `${expected.calls} measured calls`,
      `${expected.calls} calls`,
      `\`${expected.calls}\` measured calls`,
      `\`${expected.calls}\` calls`,
    ],
  },
  { id: "input tokens", fragments: [expected.inputTokens] },
  { id: "output tokens", fragments: [expected.outputTokens] },
  { id: "estimated cost", fragments: [expected.estimatedCostUsd] },
];

const documents = docs.map((doc) => checkDocument(doc, expectedChecks));
const failures = documents.filter((doc) => !doc.passed);

const result = {
  status: failures.length ? "failed" : "passed",
  service: "search-book-readiness-evidence",
  source: path.relative(repoRoot, contractPath),
  expected,
  documents: documents.map((doc) => ({
    id: doc.id,
    path: doc.relativePath,
    passed: doc.passed,
    missing: doc.missing,
    stale: doc.stale,
  })),
};

const rendered = JSON.stringify(result, null, 2);
if (failures.length) {
  console.error(rendered);
  process.exit(1);
}

console.log(rendered);
