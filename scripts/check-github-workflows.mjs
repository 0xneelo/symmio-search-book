#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const workflowsDir = path.join(searchBookRoot, ".github", "workflows");

const workflowContracts = [
  {
    id: "verify",
    path: ".github/workflows/search-book-verify.yml",
    name: "Search Book Verify",
    required: [
      "pull_request:",
      "push:",
      "branches:",
      "- main",
      "permissions:\n  contents: read",
      "concurrency:",
      "cancel-in-progress: true",
      "runs-on: ubuntu-latest",
      "VIBE_DOCS_ROOT: /tmp/vibe_docs",
      "VIBE_DOCS_PUBLIC: /tmp/vibe_docs/Docs/public",
      "VIBE_DOCS_DATA: /tmp/vibe_docs/Website/public/generated/docs-data.json",
      "actions/checkout@v4",
      "actions/setup-node@v4",
      'node-version: "22"',
      "git clone --depth 1 https://github.com/0xneelo/vibe_docs.git",
      'test -d "$VIBE_DOCS_PUBLIC"',
      'test -f "$VIBE_DOCS_DATA"',
      "npm run search-book:verify",
      "npm run search-book:smoke-static",
      "npm run search-book:smoke-service",
      "npm run search-book:smoke-preview-service",
    ],
  },
  {
    id: "launch-evidence",
    path: ".github/workflows/search-book-launch-evidence.yml",
    name: "Search Book Launch Evidence",
    required: [
      "workflow_dispatch:",
      "pull_request:",
      "paths:",
      '"scripts/**"',
      '"data/**"',
      '"content/**"',
      "permissions:\n  contents: read",
      "concurrency:",
      "cancel-in-progress: true",
      "SEARCH_BOOK_LAUNCH_EVIDENCE_DIR: /tmp/search-book-launch-evidence",
      "actions/checkout@v4",
      "actions/setup-node@v4",
      'node-version: "22"',
      "git clone --depth 1 https://github.com/0xneelo/vibe_docs.git",
      "npm run search-book:launch-evidence",
      "npm run search-book:check-launch-evidence-packet",
      "npm run search-book:evidence-summary",
      "--kind launch",
      "> \"$SEARCH_BOOK_LAUNCH_EVIDENCE_DIR/launch-evidence.summary.md\"",
      "cat \"$SEARCH_BOOK_LAUNCH_EVIDENCE_DIR/launch-evidence.summary.md\"",
      "grep -F 'Discord editorial queue data | `passed` (24 routed / 19 page-fit / 2 refusals; ready: `true`)'",
      "--require-summary",
      "actions/upload-artifact@v4",
      "name: search-book-launch-evidence",
      "/tmp/search-book-launch-evidence/launch-evidence.json",
      "/tmp/search-book-launch-evidence/launch-evidence.md",
      "/tmp/search-book-launch-evidence/launch-evidence.summary.md",
      "retention-days: 14",
    ],
  },
  {
    id: "release-dry-run",
    path: ".github/workflows/search-book-release-dry-run.yml",
    name: "Search Book Release Dry Run",
    required: [
      "workflow_dispatch:",
      "pull_request:",
      "paths:",
      '"scripts/**"',
      '"data/**"',
      '"content/**"',
      "permissions:\n  contents: read",
      "concurrency:",
      "cancel-in-progress: true",
      "SEARCH_BOOK_RELEASE_DRY_RUN_DIR: /tmp/search-book-release-dry-run",
      "actions/checkout@v4",
      "actions/setup-node@v4",
      'node-version: "22"',
      "git clone --depth 1 https://github.com/0xneelo/vibe_docs.git",
      "npm run search-book:release-dry-run",
      "npm run search-book:check-release-dry-run-packet",
      "npm run search-book:evidence-summary",
      "--kind release",
      "> \"$SEARCH_BOOK_RELEASE_DRY_RUN_DIR/release-dry-run.summary.md\"",
      "cat \"$SEARCH_BOOK_RELEASE_DRY_RUN_DIR/release-dry-run.summary.md\"",
      "grep -F 'Discord editorial queue data | `passed` (24 routed / 19 page-fit / 2 refusals; ready: `true`)'",
      "--require-summary",
      "actions/upload-artifact@v4",
      "name: search-book-release-dry-run",
      "path: /tmp/search-book-release-dry-run/",
      "retention-days: 14",
    ],
  },
  {
    id: "static-artifact",
    path: ".github/workflows/search-book-static-artifact.yml",
    name: "Search Book Static Artifact",
    required: [
      "workflow_dispatch:",
      "pull_request:",
      "paths:",
      '"scripts/**"',
      '"data/**"',
      '"content/**"',
      "permissions:\n  contents: read",
      "concurrency:",
      "cancel-in-progress: true",
      "SEARCH_BOOK_STATIC_ARTIFACT_DIR: /tmp/search-book-static-site",
      "actions/checkout@v4",
      "actions/setup-node@v4",
      'node-version: "22"',
      "git clone --depth 1 https://github.com/0xneelo/vibe_docs.git",
      "npm run search-book:verify",
      "npm run search-book:build-static-artifact",
      "npm run search-book:smoke-static -- --root",
      "npm run search-book:smoke-preview-service -- --static-root",
      "npm run search-book:check-static-artifact-packet",
      "--root \"$SEARCH_BOOK_STATIC_ARTIFACT_DIR\"",
      "actions/upload-artifact@v4",
      "name: search-book-static-site",
      "path: /tmp/search-book-static-site/",
      "retention-days: 14",
    ],
  },
];

const forbiddenPatterns = [
  { id: "github-secrets-context", pattern: /\bsecrets\./ },
  { id: "env-file-loading", pattern: /--env-file/ },
  { id: "llm-api-key-env", pattern: /SEARCH_BOOK_LLM_API_KEY/ },
  { id: "production-env-path", pattern: /\/etc\/symmio-search-book\/search-book\.env/ },
  { id: "moderation-token-env", pattern: /SEARCH_BOOK_ANSWER_ENGINE_MODERATION_TOKEN/ },
  { id: "metrics-token-env", pattern: /SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN/ },
  { id: "discord-token-env", pattern: /DISCORD.*TOKEN|TOKEN.*DISCORD/i },
];

function workflowFiles() {
  if (!fs.existsSync(workflowsDir)) return [];
  return fs.readdirSync(workflowsDir)
    .filter((name) => /\.ya?ml$/i.test(name))
    .map((name) => `.github/workflows/${name}`)
    .sort((a, b) => a.localeCompare(b));
}

function readWorkflow(relativePath) {
  return fs.readFileSync(path.join(searchBookRoot, relativePath), "utf8");
}

function addCheck(checks, id, passed, detail = "", evidence = null) {
  checks.push({
    id,
    passed: Boolean(passed),
    detail,
    ...(evidence ? { evidence } : {}),
  });
}

function missingRequired(text, fragments) {
  return fragments.filter((fragment) => !text.includes(fragment));
}

function forbiddenMatches(text) {
  return forbiddenPatterns
    .filter((item) => item.pattern.test(text))
    .map((item) => item.id)
    .sort((a, b) => a.localeCompare(b));
}

function validate() {
  const checks = [];
  const expectedFiles = workflowContracts.map((workflow) => workflow.path).sort((a, b) => a.localeCompare(b));
  const actualFiles = workflowFiles();
  const unexpectedFiles = actualFiles.filter((file) => !expectedFiles.includes(file));
  const missingFiles = expectedFiles.filter((file) => !actualFiles.includes(file));

  addCheck(
    checks,
    "workflow-file-set",
    missingFiles.length === 0 && unexpectedFiles.length === 0,
    `expected=${expectedFiles.length}; actual=${actualFiles.length}; missing=${missingFiles.join(",") || "none"}; unexpected=${unexpectedFiles.join(",") || "none"}`,
    { expectedFiles, actualFiles },
  );

  const workflowEvidence = [];
  for (const contract of workflowContracts) {
    if (!fs.existsSync(path.join(searchBookRoot, contract.path))) {
      addCheck(checks, `${contract.id}-exists`, false, `${contract.path} missing`);
      workflowEvidence.push({
        id: contract.id,
        path: contract.path,
        exists: false,
        missingRequired: contract.required,
        forbiddenMatches: [],
      });
      continue;
    }

    const text = readWorkflow(contract.path);
    const missing = missingRequired(text, [`name: ${contract.name}`, ...contract.required]);
    const forbidden = forbiddenMatches(text);
    addCheck(
      checks,
      `${contract.id}-contract`,
      missing.length === 0,
      missing.length ? `missing=${missing.join(" | ")}` : "required workflow fragments present",
    );
    addCheck(
      checks,
      `${contract.id}-no-secret-loading`,
      forbidden.length === 0,
      forbidden.length ? `forbidden=${forbidden.join(",")}` : "no secret-loading fragments",
    );
    workflowEvidence.push({
      id: contract.id,
      path: contract.path,
      exists: true,
      requiredFragments: contract.required.length + 1,
      missingRequired: missing,
      forbiddenMatches: forbidden,
    });
  }

  const failed = checks.filter((check) => !check.passed);
  return {
    status: failed.length ? "failed" : "passed",
    service: "search-book-github-workflow-contracts",
    valuesPrinted: false,
    evidence: {
      workflows: workflowEvidence,
      workflowFiles: actualFiles.length,
      expectedWorkflowFiles: expectedFiles.length,
      unexpectedWorkflowFiles: unexpectedFiles.length,
      secretLoadingForbidden: true,
    },
    checks,
  };
}

const result = validate();
const rendered = JSON.stringify(result, null, 2);
if (result.status === "passed") {
  console.log(rendered);
} else {
  console.error(rendered);
  process.exitCode = 1;
}
