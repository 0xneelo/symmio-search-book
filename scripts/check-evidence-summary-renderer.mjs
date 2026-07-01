#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const forbiddenValues = [
  "RAW_DISCORD_QUESTION_SHOULD_NOT_PRINT",
  "RAW_LAFA_EXCERPT_SHOULD_NOT_PRINT",
  "SOURCE_BODY_SHOULD_NOT_PRINT",
  "RAW_PUBLICATION_PAGE_ID_SHOULD_NOT_PRINT",
  "sk-test-secret-should-not-print",
  "Bearer token-should-not-print",
];

function addCheck(checks, id, passed, detail = "") {
  checks.push({ id, passed: Boolean(passed), detail });
}

function makeLaunchPacket() {
  return {
    status: "passed",
    secrets: {
      valuesPrinted: false,
      llmApiKeyConfigured: true,
      rawTokenValue: "sk-test-secret-should-not-print",
    },
    readiness: {
      openOperatorItems: [
        { id: 11, title: "Production VPS LLM/service env install" },
        { id: 4, title: "Final docs platform and repository owner decision" },
      ],
    },
    launchEvidence: {
      parsed: {
        status: "passed",
        rawQuestion: "RAW_DISCORD_QUESTION_SHOULD_NOT_PRINT",
      },
    },
    monitoringEvidence: {
      parsed: {
        status: "passed",
        authorization: "Bearer token-should-not-print",
      },
    },
    sourceFreshnessEvidence: {
      parsed: {
        status: "passed",
        totals: { passed: 4, checks: 4 },
        secrets: {
          valuesPrinted: false,
          sourceBodiesPrinted: false,
        },
        sourceBody: "SOURCE_BODY_SHOULD_NOT_PRINT",
      },
    },
    statusEvidence: {
      parsed: {
        status: "passed",
        documents: [{ passed: true }, { passed: true }, { passed: true }, { passed: true }],
        evidence: {
          openOperatorItems: [4, 11],
        },
      },
    },
    specReconciliation: {
      parsed: {
        status: "passed",
        evidence: {
          sourceIngestion: "17/17",
          sourcePartial: 0,
          sourceParked: 0,
          sourceMissing: 0,
          sourceCompletionReady: true,
          llmProvider: "OpenAI",
          llmModel: "gpt-4.1-mini",
          openOperatorIds: [4, 11],
        },
        checks: [
          { id: "operator-open-items", passed: true },
          { id: "source-ingestion-current", passed: true },
          { id: "discord-import-current", passed: true },
          { id: "llm-provider-current", passed: true },
          { id: "spec-narrative-thesis", passed: true },
          { id: "spec-grounding", passed: true },
          { id: "spec-sources", passed: true },
          { id: "spec-answer-engine", passed: true },
          { id: "spec-research-session", passed: true },
          { id: "spec-implementation-session", passed: true },
        ],
      },
    },
    discordReviewArtifacts: {
      parsed: {
        status: "passed",
        summary: {
          routedItems: 24,
          rawKeyHits: 0,
          sampleLeaks: 0,
          rawText: "RAW_DISCORD_QUESTION_SHOULD_NOT_PRINT",
          routeCoverage: {
            totalPageFitGroups: 19,
            coveredPageFitGroups: 19,
            sourceBackedPageFitGroups: 19,
            triageReadyPageFitGroups: 19,
            publicCopyReadyPageFitGroups: 19,
            publicCopyReviewRequired: 0,
            triageReady: true,
            publicCopyReady: true,
          },
        },
        editorialQueue: {
          pageFitReviewReady: 19,
          refusalReviewReady: 2,
          refusalPolicyReadyItems: 2,
          refusalPolicyReviewRequired: 0,
          rawTableHits: 0,
          sampleLeaks: 0,
          answerExcerpt: "RAW_LAFA_EXCERPT_SHOULD_NOT_PRINT",
        },
      },
    },
    discordRefusalRuntime: {
      parsed: {
        status: "passed",
        secrets: {
          valuesPrinted: false,
          llmCredentialsLoaded: false,
        },
        evidence: {
          routingRefusals: 2,
          probes: [
            {
              id: "discord-repeated-solver-question",
              status: "refusal",
              refusalReason: "discord-corpus-review-required",
              gapId: "G-001",
              citations: 0,
              answerBytes: 0,
              rawQuestion: "RAW_DISCORD_QUESTION_SHOULD_NOT_PRINT",
            },
            {
              id: "lafa-identity-public-safe",
              status: "refusal",
              refusalReason: "discord-corpus-review-required",
              gapId: "G-001",
              citations: 0,
              answerBytes: 0,
              answerExcerpt: "RAW_LAFA_EXCERPT_SHOULD_NOT_PRINT",
            },
          ],
        },
      },
    },
    publicationBoundaries: {
      parsed: {
        status: "passed",
        valuesPrinted: false,
        evidence: {
          publicNavigationPages: 800,
          sourceCompanionPages: 792,
          exactRoutes: 820,
          faqAnswerable: 820,
          sourceCompanionRuntimeChunks: 1321,
          internalDraftRuntimeChunks: 0,
        },
        checks: [{ id: "public-navigation-count", passed: true }],
        pageIds: ["RAW_PUBLICATION_PAGE_ID_SHOULD_NOT_PRINT"],
      },
    },
  };
}

function makeReleasePacket() {
  return {
    status: "passed",
    secrets: {
      valuesPrinted: false,
      sensitiveMatches: [],
      apiKey: "sk-test-secret-should-not-print",
    },
    staticArtifact: {
      status: "passed",
      integrity: "passed",
      files: 1650,
      bytes: 52935258,
    },
    steps: [
      { id: "build-static-artifact", status: "passed" },
      { id: "smoke-static-artifact", status: "passed" },
      { id: "smoke-artifact-answer-service", status: "passed" },
      { id: "build-launch-evidence", status: "passed" },
    ],
    readiness: {
      discordRouteCoverage: {
        pageFitCoveredByPublicRoutes: 19,
        totalPageFitGroups: 19,
      },
      openOperatorItems: [
        { id: 11, title: "Production VPS LLM/service env install" },
        { id: 4, title: "Final docs platform and repository decision" },
      ],
    },
    launchEvidence: {
      launchStatus: "passed",
      monitoringStatus: "passed",
      sourceFreshnessStatus: "passed",
      statusEvidenceStatus: "passed",
      specReconciliationStatus: "passed",
      discordReviewArtifactsStatus: "passed",
      discordRefusalRuntimeStatus: "passed",
      publicationBoundariesStatus: "passed",
      sourceFreshness: {
        totals: { passed: 4, checks: 4 },
        secrets: {
          valuesPrinted: false,
          sourceBodiesPrinted: false,
        },
        sourceBody: "SOURCE_BODY_SHOULD_NOT_PRINT",
      },
      statusEvidence: {
        documents: { passed: 4, total: 4 },
      },
      specReconciliation: {
        status: "passed",
        checks: { passed: 10, total: 10 },
        evidence: {
          sourceIngestion: "17/17",
          sourcePartial: 0,
          sourceParked: 0,
          sourceMissing: 0,
          sourceCompletionReady: true,
          llmProvider: "OpenAI",
          llmModel: "gpt-4.1-mini",
          openOperatorIds: [4, 11],
        },
      },
      discordReviewArtifacts: {
        summary: {
          routedItems: 24,
          rawKeyHits: 0,
          sampleLeaks: 0,
          sourceAnswer: "RAW_LAFA_EXCERPT_SHOULD_NOT_PRINT",
          routeCoverage: {
            totalPageFitGroups: 19,
            coveredPageFitGroups: 19,
            sourceBackedPageFitGroups: 19,
            triageReadyPageFitGroups: 19,
            publicCopyReadyPageFitGroups: 19,
            publicCopyReviewRequired: 0,
            triageReady: true,
            publicCopyReady: true,
          },
        },
        editorialQueue: {
          pageFitReviewReady: 19,
          refusalReviewReady: 2,
          refusalPolicyReadyItems: 2,
          refusalPolicyReviewRequired: 0,
          rawTableHits: 0,
          sampleLeaks: 0,
          relatedQuestion: "RAW_DISCORD_QUESTION_SHOULD_NOT_PRINT",
        },
      },
      discordRefusalRuntime: {
        status: "passed",
        probes: [
          {
            id: "discord-repeated-solver-question",
            status: "refusal",
            refusalReason: "discord-corpus-review-required",
            gapId: "G-001",
            citations: 0,
            answerBytes: 0,
            rawQuestion: "RAW_DISCORD_QUESTION_SHOULD_NOT_PRINT",
          },
          {
            id: "lafa-identity-public-safe",
            status: "refusal",
            refusalReason: "discord-corpus-review-required",
            gapId: "G-001",
            citations: 0,
            answerBytes: 0,
            answerExcerpt: "RAW_LAFA_EXCERPT_SHOULD_NOT_PRINT",
          },
        ],
        secrets: {
          valuesPrinted: false,
          llmCredentialsLoaded: false,
        },
      },
      publicationBoundaries: {
        status: "passed",
        valuesPrinted: false,
        evidence: {
          publicNavigationPages: 800,
          sourceCompanionPages: 792,
          exactRoutes: 820,
          faqAnswerable: 820,
          sourceCompanionRuntimeChunks: 1321,
          internalDraftRuntimeChunks: 0,
        },
        checks: { passed: 1, total: 1 },
        pageIds: ["RAW_PUBLICATION_PAGE_ID_SHOULD_NOT_PRINT"],
      },
    },
  };
}

function runSummary(kind, packetPath, summaryPath = "") {
  const env = { ...process.env };
  if (summaryPath) env.GITHUB_STEP_SUMMARY = summaryPath;
  const result = spawnSync(process.execPath, [
    path.join(searchBookRoot, "scripts", "render-evidence-summary.mjs"),
    "--kind",
    kind,
    "--packet",
    packetPath,
  ], {
    cwd: searchBookRoot,
    encoding: "utf8",
    env,
  });
  return {
    status: result.status,
    stdout: result.stdout || "",
    stderr: result.stderr || "",
    error: result.error?.message || "",
  };
}

function main() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "search-book-evidence-summary-check-"));
  const launchPath = path.join(tmpDir, "launch-evidence.json");
  const releasePath = path.join(tmpDir, "release-dry-run.json");
  const stepSummaryPath = path.join(tmpDir, "github-step-summary.md");
  fs.writeFileSync(launchPath, `${JSON.stringify(makeLaunchPacket(), null, 2)}\n`);
  fs.writeFileSync(releasePath, `${JSON.stringify(makeReleasePacket(), null, 2)}\n`);

  const checks = [];
  const launch = runSummary("launch", launchPath, stepSummaryPath);
  const release = runSummary("release", releasePath, stepSummaryPath);
  const appended = fs.readFileSync(stepSummaryPath, "utf8");
  const combined = `${launch.stdout}\n${release.stdout}\n${appended}`;

  addCheck(checks, "launch-render-passed", launch.status === 0 && !launch.error, `exit=${launch.status}; ${launch.stderr || launch.error}`);
  addCheck(checks, "release-render-passed", release.status === 0 && !release.error, `exit=${release.status}; ${release.stderr || release.error}`);
  addCheck(checks, "append-summary-created", appended.includes("Search Book Launch Evidence") && appended.includes("Search Book Release Dry Run"), "");
  addCheck(checks, "stdout-summaries-rendered", launch.stdout.includes("Search Book Launch Evidence") && release.stdout.includes("Search Book Release Dry Run"), "");
  addCheck(
    checks,
    "expected-counts-rendered",
    /Discord routed items \| `24`/.test(combined)
      && /Discord route coverage \| `19\/19 page-fit groups`/.test(combined)
      && /Discord source-backed triage \| `19\/19 page-fit groups`/.test(combined)
      && /Discord public copy ready \| `19\/19 page-fit groups`/.test(combined)
      && /Discord refusal policy \| `2\/2 refusals`/.test(combined)
      && /Discord refusal runtime \| `passed` \(2\/2 probes; LLM credentials loaded: `false`\)/.test(combined)
      && /Spec reconciliation \| `passed` \(10\/10 checks; source 17\/17; open #4, #11\)/.test(combined)
      && /Publication public\/source pages \| `800\/792 pages`/.test(combined)
      && /Publication exact\/FAQ routes \| `820\/820 routes`/.test(combined),
    "",
  );
  const leakedValues = forbiddenValues.filter((value) => combined.includes(value));
  addCheck(checks, "forbidden-values-absent", leakedValues.length === 0, leakedValues.length ? `leaked=${leakedValues.join(",")}` : "none");
  addCheck(checks, "secret-like-values-absent", !/\bsk-[A-Za-z0-9_-]{8,}\b|Bearer\s+[A-Za-z0-9._-]{8,}/i.test(combined), "summary output must not include token-like values");
  addCheck(checks, "raw-field-labels-absent", !/\b(rawText|rawQuestion|answerExcerpt|relatedQuestion|sourceBody|sourceAnswer|pageIds)\b/.test(combined), "summary output must not include raw field labels");

  const failed = checks.filter((check) => !check.passed);
  const result = {
    status: failed.length ? "failed" : "passed",
    service: "search-book-evidence-summary-renderer-check",
    evidence: {
      launchSummaryLines: launch.stdout.split(/\r?\n/).filter(Boolean).length,
      releaseSummaryLines: release.stdout.split(/\r?\n/).filter(Boolean).length,
      appendedBytes: Buffer.byteLength(appended),
      valuesPrinted: false,
    },
    checks,
  };

  const rendered = JSON.stringify(result, null, 2);
  if (failed.length) {
    console.error(rendered);
    process.exitCode = 1;
  } else {
    console.log(rendered);
  }
}

try {
  main();
} catch (error) {
  console.error(JSON.stringify({
    status: "failed",
    service: "search-book-evidence-summary-renderer-check",
    message: error.message,
    secrets: { valuesPrinted: false },
  }, null, 2));
  process.exitCode = 1;
}
