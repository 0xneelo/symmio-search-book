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
  "RAW_GENERATED_ANSWER_SHOULD_NOT_PRINT",
  "RAW_PUBLICATION_PAGE_ID_SHOULD_NOT_PRINT",
  "RAW_REVIEWER_NOTE_SHOULD_NOT_PRINT",
  "sk-test-secret-should-not-print",
  "Bearer token-should-not-print",
];

const fixtureCommit = "summary-validator-fixture";

function addCheck(checks, id, passed, detail = "") {
  checks.push({ id, passed: Boolean(passed), detail });
}

function makeLaunchPacket() {
  return {
    status: "passed",
    generatedAt: "deterministic-summary-fixture",
    repository: {
      branch: "main",
      commit: fixtureCommit,
      dirty: false,
      dirtyStatus: [],
    },
    secrets: {
      valuesPrinted: false,
      llmApiKeyConfigured: true,
      rawTokenValue: "sk-test-secret-should-not-print",
    },
    readiness: {
      sourceCompletionReady: true,
      sourceRequirements: {
        complete: 17,
        partial: 0,
        parked: 0,
        missing: 0,
      },
      discordRouteCoverage: {
        coverageReady: true,
        totalPageFitGroups: 19,
        pageFitCoveredByPublicRoutes: 19,
        pageFitSingleRouteRemaining: 0,
        pageFitWithoutPublicRoute: 0,
      },
      livingDocsControls: {
        pageFeedback: true,
      },
      openOperatorItems: [
        { id: 11, title: "Production VPS LLM/service env install", linearTask: "SYN-281" },
        { id: 4, title: "Final docs platform and repository owner decision", linearTask: "SYN-285" },
      ],
    },
    launchEvidence: {
      passed: true,
      parsed: {
        status: "passed",
        rawQuestion: "RAW_DISCORD_QUESTION_SHOULD_NOT_PRINT",
        checks: [
          {
            id: "fresh-verify",
            passed: true,
            evidence: {
              status: "passed",
              mode: "build-and-verify",
              syntaxChecks: 92,
              productionReadinessPacket: { passed: true },
            },
          },
        ],
      },
    },
    monitoringEvidence: {
      passed: true,
      parsed: {
        status: "passed",
        authorization: "Bearer token-should-not-print",
      },
    },
    sourceFreshnessEvidence: {
      passed: true,
      parsed: {
        status: "passed",
        totals: {
          passed: 4,
          checks: 4,
          sourcesFetched: 2,
          sources: 2,
        },
        secrets: {
          valuesPrinted: false,
          sourceBodiesPrinted: false,
        },
        sourceBody: "SOURCE_BODY_SHOULD_NOT_PRINT",
      },
    },
    statusEvidence: {
      passed: true,
      parsed: {
        status: "passed",
        documents: [{ passed: true }, { passed: true }, { passed: true }, { passed: true }],
        evidence: {
          openOperatorItems: [4, 11],
        },
      },
    },
    specReconciliation: {
      passed: true,
      parsed: {
        status: "passed",
        evidence: {
          sourceIngestion: "17/17",
          sourcePartial: 0,
          sourceParked: 0,
          sourceMissing: 0,
          sourceCompletionReady: true,
          competitiveSweep: "49/50",
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
      passed: true,
      parsed: {
        status: "passed",
        summary: {
          routingReady: true,
          routedItems: 24,
          rawDiscordTextIncluded: false,
          sourceAnswerTextIncluded: false,
          valuesPrinted: false,
          rawKeyHits: 0,
          sampleLeaks: 0,
          rawText: "RAW_DISCORD_QUESTION_SHOULD_NOT_PRINT",
          routeCoverage: {
            totalPageFitGroups: 19,
            coveredPageFitGroups: 19,
            pageFitSingleRouteRemaining: 0,
            pageFitWithoutPublicRoute: 0,
            sourceBackedPageFitGroups: 19,
            triageReadyPageFitGroups: 19,
            publicCopyReadyPageFitGroups: 19,
            publicCopyReviewRequired: 0,
            coverageReady: true,
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
        editorialQueueData: {
          status: "passed",
          queueReady: true,
          routedItems: 24,
          pageFitReviewReady: 19,
          refusalReviewReady: 2,
          disposition: {
            readyForReviewerHandoff: true,
            pageFitGroups: 19,
            pageFitKeepExistingPublicCopy: 19,
            pageFitNeedsPublicCopyChange: 0,
            refusalItems: 2,
            refusalKeepPolicy: 2,
            refusalNeedsPolicyReview: 0,
            publicCopyChangesProposed: 0,
            exactDiscordStatementsPromoted: 0,
          },
          reviewerWorkflow: {
            status: "ready",
            mode: "no-raw-source-backed-review",
            phases: 4,
            pageFitGroups: 19,
            refusalItems: 2,
            publicCopyChangesAllowed: 0,
            exactDiscordStatementsAllowed: 0,
          },
          rawKeyHits: 0,
          sampleLeaks: 0,
          valuesPrinted: false,
          generatedAnswer: "RAW_GENERATED_ANSWER_SHOULD_NOT_PRINT",
        },
      },
    },
    discordRefusalRuntime: {
      passed: true,
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
        checks: [{ id: "runtime-refusal-probes", passed: true }],
      },
    },
    publicationBoundaries: {
      passed: true,
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
    backupRestoreEvidence: {
      passed: true,
      parsed: {
        status: "passed",
        valuesPrinted: false,
        secrets: {
          valuesPrinted: false,
          llmCredentialsLoaded: false,
        },
        evidence: {
          manifestStatus: "passed",
          restoreCheckStatus: "passed",
          integrity: "ok",
          tablesChecked: 4,
          tablesMatched: 4,
          backupSizePositive: true,
          checksumPresent: true,
          latestManifestWritten: true,
          seededCounts: {
            questions: 2,
            ratings: 2,
            gaps: 2,
            answerCache: 0,
          },
          rawContentPrinted: false,
          rawQuestion: "RAW_DISCORD_QUESTION_SHOULD_NOT_PRINT",
        },
        checks: [
          { id: "backup-command-passed", passed: true },
          { id: "restore-check-passed", passed: true },
          { id: "required-tables-matched", passed: true },
          { id: "raw-content-not-printed", passed: true },
        ],
      },
    },
    livingDocsReviewEvidence: {
      passed: true,
      parsed: {
        status: "passed",
        valuesPrinted: false,
        secrets: {
          valuesPrinted: false,
          llmCredentialsLoaded: false,
        },
        evidence: {
          rawSummaryStatus: "ok",
          rawSummaryFlaggedInternal: true,
          totals: {
            questions: 4,
            ratings: 2,
            gaps: 4,
          },
          queueCounts: {
            gapBacklog: 3,
            lowRatedAnswers: 2,
            unansweredQuestions: 2,
            repeatedQuestions: 1,
            recommendations: 3,
          },
          byQuestionStatus: {
            answered: 2,
            refused: 2,
          },
          seededRawValuesInRawSummary: 5,
          seededRawValuesInSanitizedEvidence: 0,
          rawKeyHitsInSanitizedEvidence: 0,
          rawContentPrinted: false,
          reviewerNote: "RAW_REVIEWER_NOTE_SHOULD_NOT_PRINT",
        },
        checks: [
          { id: "raw-summary-internal-flag", passed: true },
          { id: "sanitized-evidence-no-seeded-values", passed: true },
          { id: "sanitized-evidence-no-raw-keys", passed: true },
        ],
      },
    },
    evidenceSummaryRenderer: {
      passed: true,
      parsed: {
        status: "passed",
        evidence: {
          launchSummaryLines: 38,
          releaseSummaryLines: 42,
          appendedBytes: 4742,
          valuesPrinted: false,
        },
        checks: [{ id: "summary-output-no-secret", passed: true }],
      },
    },
  };
}

function makeReleasePacket() {
  return {
    status: "passed",
    generatedAt: "deterministic-summary-fixture",
    repository: {
      branch: "main",
      commit: fixtureCommit,
      dirty: false,
      dirtyStatus: [],
    },
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
      secrets: {
        sensitiveMatches: 0,
      },
    },
    steps: [
      { id: "build-static-artifact", status: "passed", passed: true },
      { id: "smoke-static-artifact", status: "passed", passed: true },
      { id: "smoke-artifact-answer-service", status: "passed", passed: true },
      { id: "build-launch-evidence", status: "passed", passed: true },
    ],
    readiness: {
      sourceCompletionReady: true,
      sourceRequirements: {
        complete: 17,
        partial: 0,
        parked: 0,
        missing: 0,
      },
      discordRouteCoverage: {
        coverageReady: true,
        pageFitCoveredByPublicRoutes: 19,
        totalPageFitGroups: 19,
        pageFitSingleRouteRemaining: 0,
        pageFitWithoutPublicRoute: 0,
      },
      livingDocsControls: {
        pageFeedback: true,
      },
      openOperatorItems: [
        { id: 11, title: "Production VPS LLM/service env install", linearTask: "SYN-281" },
        { id: 4, title: "Final docs platform and repository decision", linearTask: "SYN-285" },
      ],
    },
    launchEvidence: {
      status: "passed",
      launchStatus: "passed",
      monitoringStatus: "passed",
      sourceFreshnessStatus: "passed",
      statusEvidenceStatus: "passed",
      specReconciliationStatus: "passed",
      discordReviewArtifactsStatus: "passed",
      discordRefusalRuntimeStatus: "passed",
      publicationBoundariesStatus: "passed",
      backupRestoreEvidenceStatus: "passed",
      livingDocsReviewEvidenceStatus: "passed",
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
          competitiveSweep: "49/50",
          llmProvider: "OpenAI",
          llmModel: "gpt-4.1-mini",
          openOperatorIds: [4, 11],
        },
      },
      discordReviewArtifacts: {
        summary: {
          routingReady: true,
          routedItems: 24,
          rawDiscordTextIncluded: false,
          sourceAnswerTextIncluded: false,
          valuesPrinted: false,
          rawKeyHits: 0,
          sampleLeaks: 0,
          sourceAnswer: "RAW_LAFA_EXCERPT_SHOULD_NOT_PRINT",
          routeCoverage: {
            totalPageFitGroups: 19,
            coveredPageFitGroups: 19,
            pageFitSingleRouteRemaining: 0,
            pageFitWithoutPublicRoute: 0,
            sourceBackedPageFitGroups: 19,
            triageReadyPageFitGroups: 19,
            publicCopyReadyPageFitGroups: 19,
            publicCopyReviewRequired: 0,
            coverageReady: true,
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
        editorialQueueData: {
          status: "passed",
          queueReady: true,
          routedItems: 24,
          pageFitReviewReady: 19,
          refusalReviewReady: 2,
          disposition: {
            readyForReviewerHandoff: true,
            pageFitGroups: 19,
            pageFitKeepExistingPublicCopy: 19,
            pageFitNeedsPublicCopyChange: 0,
            refusalItems: 2,
            refusalKeepPolicy: 2,
            refusalNeedsPolicyReview: 0,
            publicCopyChangesProposed: 0,
            exactDiscordStatementsPromoted: 0,
          },
          reviewerWorkflow: {
            status: "ready",
            mode: "no-raw-source-backed-review",
            phases: 4,
            pageFitGroups: 19,
            refusalItems: 2,
            publicCopyChangesAllowed: 0,
            exactDiscordStatementsAllowed: 0,
          },
          rawKeyHits: 0,
          sampleLeaks: 0,
          valuesPrinted: false,
          generatedAnswer: "RAW_GENERATED_ANSWER_SHOULD_NOT_PRINT",
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
      backupRestoreEvidence: {
        status: "passed",
        valuesPrinted: false,
        secrets: {
          valuesPrinted: false,
          llmCredentialsLoaded: false,
        },
        evidence: {
          manifestStatus: "passed",
          restoreCheckStatus: "passed",
          integrity: "ok",
          tablesChecked: 4,
          tablesMatched: 4,
          backupSizePositive: true,
          checksumPresent: true,
          latestManifestWritten: true,
          seededCounts: {
            questions: 2,
            ratings: 2,
            gaps: 2,
            answerCache: 0,
          },
          rawContentPrinted: false,
          rawQuestion: "RAW_DISCORD_QUESTION_SHOULD_NOT_PRINT",
        },
        checks: { passed: 4, total: 4 },
      },
      livingDocsReviewEvidence: {
        status: "passed",
        valuesPrinted: false,
        secrets: {
          valuesPrinted: false,
          llmCredentialsLoaded: false,
        },
        evidence: {
          rawSummaryStatus: "ok",
          rawSummaryFlaggedInternal: true,
          totals: {
            questions: 4,
            ratings: 2,
            gaps: 4,
          },
          queueCounts: {
            gapBacklog: 3,
            lowRatedAnswers: 2,
            unansweredQuestions: 2,
            repeatedQuestions: 1,
            recommendations: 3,
          },
          seededRawValuesInRawSummary: 5,
          seededRawValuesInSanitizedEvidence: 0,
          rawKeyHitsInSanitizedEvidence: 0,
          rawContentPrinted: false,
          ratingNote: "RAW_REVIEWER_NOTE_SHOULD_NOT_PRINT",
        },
        checks: { passed: 3, total: 3 },
      },
      evidenceSummaryRendererStatus: "passed",
      evidenceSummaryRenderer: {
        status: "passed",
        evidence: {
          launchSummaryLines: 38,
          releaseSummaryLines: 42,
          appendedBytes: 4742,
          valuesPrinted: false,
        },
        checks: { passed: 1, total: 1 },
      },
    },
  };
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function makeValidatorLaunchPacket() {
  const packet = cloneJson(makeLaunchPacket());
  delete packet.sourceFreshnessEvidence.parsed.sourceBody;
  return packet;
}

function makeValidatorReleasePacket() {
  const packet = cloneJson(makeReleasePacket());
  delete packet.launchEvidence.sourceFreshness.sourceBody;
  return packet;
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

function runPacketValidator(scriptName, args) {
  const result = spawnSync(process.execPath, [
    path.join(searchBookRoot, "scripts", scriptName),
    ...args,
  ], {
    cwd: searchBookRoot,
    encoding: "utf8",
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
  const launchSummaryPath = path.join(tmpDir, "launch-evidence.summary.md");
  const releaseSummaryPath = path.join(tmpDir, "release-dry-run.summary.md");
  const validatorDir = path.join(tmpDir, "validator");
  const validatorLaunchPath = path.join(validatorDir, "launch-evidence.json");
  const validatorReleasePath = path.join(validatorDir, "release-dry-run.json");
  const validatorNestedLaunchDir = path.join(validatorDir, "launch-evidence");
  const validatorNestedLaunchPath = path.join(validatorNestedLaunchDir, "launch-evidence.json");
  const validatorLaunchSummaryPath = path.join(validatorDir, "launch-evidence.summary.md");
  const validatorReleaseSummaryPath = path.join(validatorDir, "release-dry-run.summary.md");
  const stepSummaryPath = path.join(tmpDir, "github-step-summary.md");
  const launchPacket = makeLaunchPacket();
  const validatorLaunchPacket = makeValidatorLaunchPacket();
  fs.mkdirSync(validatorNestedLaunchDir, { recursive: true });
  fs.writeFileSync(launchPath, `${JSON.stringify(launchPacket, null, 2)}\n`);
  fs.writeFileSync(validatorLaunchPath, `${JSON.stringify(validatorLaunchPacket, null, 2)}\n`);
  fs.writeFileSync(validatorNestedLaunchPath, `${JSON.stringify(validatorLaunchPacket, null, 2)}\n`);
  fs.writeFileSync(releasePath, `${JSON.stringify(makeReleasePacket(), null, 2)}\n`);
  fs.writeFileSync(validatorReleasePath, `${JSON.stringify(makeValidatorReleasePacket(), null, 2)}\n`);

  const checks = [];
  const launch = runSummary("launch", launchPath, stepSummaryPath);
  const release = runSummary("release", releasePath, stepSummaryPath);
  fs.writeFileSync(launchSummaryPath, launch.stdout);
  fs.writeFileSync(releaseSummaryPath, release.stdout);
  const appended = fs.readFileSync(stepSummaryPath, "utf8");
  const combined = `${launch.stdout}\n${release.stdout}\n${appended}`;
  fs.writeFileSync(validatorLaunchSummaryPath, launch.stdout);
  fs.writeFileSync(validatorReleaseSummaryPath, release.stdout);

  const strictLaunch = runPacketValidator("check-launch-evidence-packet.mjs", ["--packet", validatorLaunchPath, "--require-summary"]);
  const strictRelease = runPacketValidator("check-release-dry-run-packet.mjs", ["--packet", validatorReleasePath, "--require-summary"]);
  const missingSummaryLaunch = runPacketValidator("check-launch-evidence-packet.mjs", ["--packet", validatorNestedLaunchPath, "--require-summary"]);
  const tamperedDispositionReleaseSummary = release.stdout.replace(
    "Discord editorial disposition | ready `true` (keep-copy `19/19`; keep-refusal `2/2`; copy changes `0`; promoted `0`)",
    "Discord editorial disposition | ready `false` (keep-copy `19/19`; keep-refusal `2/2`; copy changes `1`; promoted `1`)",
  );
  fs.writeFileSync(validatorReleaseSummaryPath, tamperedDispositionReleaseSummary);
  const tamperedDispositionSummaryRelease = runPacketValidator("check-release-dry-run-packet.mjs", ["--packet", validatorReleasePath, "--require-summary"]);
  const tamperedWorkflowReleaseSummary = release.stdout.replace(
    "Discord reviewer workflow | ready `ready` (4 phases; page-fit `19`; refusals `2`; copy changes allowed `0`; exact promotions allowed `0`)",
    "Discord reviewer workflow | ready `stale` (3 phases; page-fit `18`; refusals `1`; copy changes allowed `1`; exact promotions allowed `1`)",
  );
  fs.writeFileSync(validatorReleaseSummaryPath, tamperedWorkflowReleaseSummary);
  const tamperedWorkflowSummaryRelease = runPacketValidator("check-release-dry-run-packet.mjs", ["--packet", validatorReleasePath, "--require-summary"]);

  addCheck(checks, "launch-render-passed", launch.status === 0 && !launch.error, `exit=${launch.status}; ${launch.stderr || launch.error}`);
  addCheck(checks, "release-render-passed", release.status === 0 && !release.error, `exit=${release.status}; ${release.stderr || release.error}`);
  addCheck(checks, "strict-launch-summary-validation-passed", strictLaunch.status === 0 && !strictLaunch.error, `exit=${strictLaunch.status}`);
  addCheck(checks, "strict-release-summary-validation-passed", strictRelease.status === 0 && !strictRelease.error, `exit=${strictRelease.status}`);
  addCheck(checks, "missing-summary-rejected", missingSummaryLaunch.status !== 0, `exit=${missingSummaryLaunch.status}`);
  addCheck(checks, "tampered-disposition-summary-rejected", tamperedDispositionSummaryRelease.status !== 0, `exit=${tamperedDispositionSummaryRelease.status}`);
  addCheck(checks, "tampered-workflow-summary-rejected", tamperedWorkflowSummaryRelease.status !== 0, `exit=${tamperedWorkflowSummaryRelease.status}`);
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
      && /Discord editorial queue data \| `passed` \(24 routed \/ 19 page-fit \/ 2 refusals; ready: `true`\)/.test(combined)
      && /Discord editorial disposition \| ready `true` \(keep-copy `19\/19`; keep-refusal `2\/2`; copy changes `0`; promoted `0`\)/.test(combined)
      && /Discord reviewer workflow \| ready `ready` \(4 phases; page-fit `19`; refusals `2`; copy changes allowed `0`; exact promotions allowed `0`\)/.test(combined)
      && /Discord refusal runtime \| `passed` \(2\/2 probes; LLM credentials loaded: `false`\)/.test(combined)
      && /Discord leakage checks \| raw keys `0`, sample leaks `0`, queue-data raw keys `0`, queue-data sample leaks `0`, queue raw tables `0`/.test(combined)
      && /Spec reconciliation \| `passed` \(10\/10 checks; source 17\/17; open #4, #11\)/.test(combined)
      && /Publication public\/source pages \| `800\/792 pages`/.test(combined)
      && /Publication exact\/FAQ routes \| `820\/820 routes`/.test(combined)
      && /Backup restore tables \| `4\/4 tables`; restore `passed`; integrity `ok`/.test(combined)
      && /Backup restore seed counts \| questions `2`, ratings `2`, gaps `2`, answer cache `0`/.test(combined)
      && /Backup restore checks \| `4\/4`; values printed: `false`; raw content printed: `false`/.test(combined)
      && /Living-docs review evidence \| `passed`/.test(combined)
      && /Living-docs review queue \| gap backlog `3`, low-rated `2`, unanswered `2`, repeated `1`, recommendations `3`/.test(combined)
      && /Living-docs review privacy \| raw internal `true`; sanitized seeded hits `0`; raw keys `0`; raw content printed `false`/.test(combined)
      && /Living-docs review checks \| `3\/3`; values printed: `false`; LLM credentials loaded: `false`/.test(combined),
    "",
  );
  const leakedValues = forbiddenValues.filter((value) => combined.includes(value));
  addCheck(checks, "forbidden-values-absent", leakedValues.length === 0, leakedValues.length ? `leaked=${leakedValues.join(",")}` : "none");
  addCheck(checks, "secret-like-values-absent", !/\bsk-[A-Za-z0-9_-]{8,}\b|Bearer\s+[A-Za-z0-9._-]{8,}/i.test(combined), "summary output must not include token-like values");
  addCheck(checks, "raw-field-labels-absent", !/\b(rawText|rawQuestion|answerExcerpt|relatedQuestion|generatedAnswer|sourceBody|sourceAnswer|pageIds|reviewerNote|ratingNote)\b/.test(combined), "summary output must not include raw field labels");

  const failed = checks.filter((check) => !check.passed);
  const result = {
    status: failed.length ? "failed" : "passed",
    service: "search-book-evidence-summary-renderer-check",
    evidence: {
      launchSummaryLines: launch.stdout.split(/\r?\n/).filter(Boolean).length,
      releaseSummaryLines: release.stdout.split(/\r?\n/).filter(Boolean).length,
      appendedBytes: Buffer.byteLength(appended),
      strictSummaryValidation: true,
      missingSummaryRejected: missingSummaryLaunch.status !== 0,
      tamperedDispositionSummaryRejected: tamperedDispositionSummaryRelease.status !== 0,
      tamperedWorkflowSummaryRejected: tamperedWorkflowSummaryRelease.status !== 0,
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
