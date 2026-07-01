#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const validProfiles = new Set(["production", "staging"]);
const validModes = new Set(["extractive", "llm"]);

function usage() {
  return `Usage:
  node scripts/check-launch-readiness.mjs --site-url <url> --service-url <url> [options]

Options:
  --profile production|staging     Default: production
  --mode extractive|llm            Default: llm for production, extractive for staging
  --allow-local                    Permit localhost/http URLs in staging
  --write-smoke                    Let deployment smoke create one answer event and rating
  --run-verify                     Run node scripts/build-all.mjs --verify in this invocation
  --skip-production-env            Skip production env preflight in staging only
  --skip-deployment-smoke          Skip URL smoke in staging only

Environment fallbacks:
  SEARCH_BOOK_DEPLOYMENT_SITE_URL
  SEARCH_BOOK_ANSWER_ENGINE_URL
  SEARCH_BOOK_REVIEWER_OWNER
  SEARCH_BOOK_REVIEW_CADENCE
  SEARCH_BOOK_ANSWER_ENGINE_BACKUP_DIR or SEARCH_BOOK_BACKUP_STORAGE

This command prints launch evidence only. It never prints API keys or token values.`;
}

function parseArgs(argv) {
  const args = {
    profile: "production",
    siteUrl: process.env.SEARCH_BOOK_DEPLOYMENT_SITE_URL || "",
    serviceUrl: process.env.SEARCH_BOOK_ANSWER_ENGINE_URL || "",
    mode: "",
    allowLocal: false,
    writeSmoke: false,
    runVerify: false,
    skipProductionEnv: false,
    skipDeploymentSmoke: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--allow-local") {
      args.allowLocal = true;
      continue;
    }
    if (arg === "--write-smoke") {
      args.writeSmoke = true;
      continue;
    }
    if (arg === "--run-verify") {
      args.runVerify = true;
      continue;
    }
    if (arg === "--skip-production-env") {
      args.skipProductionEnv = true;
      continue;
    }
    if (arg === "--skip-deployment-smoke") {
      args.skipDeploymentSmoke = true;
      continue;
    }

    const next = argv[index + 1];
    if (!next || next.startsWith("--")) throw new Error(`${arg} requires a value.\n${usage()}`);
    if (arg === "--profile") args.profile = next;
    else if (arg === "--site-url") args.siteUrl = next;
    else if (arg === "--service-url") args.serviceUrl = next;
    else if (arg === "--mode") args.mode = next;
    else throw new Error(`Unknown argument: ${arg}\n${usage()}`);
    index += 1;
  }

  if (!validProfiles.has(args.profile)) throw new Error("--profile must be production or staging.");
  if (!args.mode) args.mode = args.profile === "production" ? "llm" : "extractive";
  if (!validModes.has(args.mode)) throw new Error("--mode must be extractive or llm.");
  if (args.profile === "production" && args.allowLocal) throw new Error("--allow-local is only valid for staging.");
  return args;
}

function tail(text, maxLength = 5000) {
  const value = String(text || "");
  return value.length > maxLength ? value.slice(value.length - maxLength) : value;
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(searchBookRoot, relativePath), "utf8"));
}

function parseJsonFromOutput(output) {
  const raw = String(output || "").trim();
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    for (let index = raw.lastIndexOf("{"); index >= 0; index = raw.lastIndexOf("{", index - 1)) {
      try {
        return JSON.parse(raw.slice(index));
      } catch {
        // Keep scanning for the outer object of the final JSON summary.
      }
    }
  }
  return null;
}

function addCheck(checks, { id, label, passed, detail = "", severity = "error", evidence = null }) {
  checks.push({
    id,
    label,
    severity,
    passed: Boolean(passed),
    detail,
    ...(evidence ? { evidence } : {}),
  });
}

function commandResult(commandArgs) {
  const result = spawnSync(process.execPath, commandArgs, {
    cwd: searchBookRoot,
    encoding: "utf8",
    env: process.env,
    maxBuffer: 1024 * 1024 * 20,
  });
  const stdout = tail(result.stdout);
  const stderr = tail(result.stderr);
  let parsed = null;
  for (const candidate of [result.stdout, result.stderr]) {
    parsed = parseJsonFromOutput(candidate);
    if (parsed) break;
  }
  return {
    exitCode: result.status,
    signal: result.signal,
    passed: result.status === 0,
    stdout,
    stderr,
    parsed,
    error: result.error?.message || "",
  };
}

function checkUrl(checks, { id, label, value, profile, allowLocal }) {
  if (!value) {
    addCheck(checks, {
      id,
      label,
      passed: false,
      detail: "missing URL",
    });
    return;
  }

  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    addCheck(checks, {
      id,
      label,
      passed: false,
      detail: "invalid URL",
    });
    return;
  }

  const isHttp = parsed.protocol === "http:" || parsed.protocol === "https:";
  const isLocal = ["localhost", "127.0.0.1", "::1"].includes(parsed.hostname);
  const productionSafe = parsed.protocol === "https:" && !isLocal;
  const stagingSafe = isHttp && (!isLocal || allowLocal);
  addCheck(checks, {
    id,
    label,
    passed: profile === "production" ? productionSafe : stagingSafe,
    detail:
      profile === "production"
        ? `https=${parsed.protocol === "https:"}, local=${isLocal}`
        : `http=${isHttp}, local=${isLocal}, allowLocal=${allowLocal}`,
  });
}

function checkBuiltEvidence(checks, profile) {
  const quality = readJson("data/quality-audit.json");
  const requirements = readJson("data/requirement-map.json");
  const livingDocs = readJson("data/living-docs-events.json");
  const llm = readJson("data/llm-rag-contract.json");

  addCheck(checks, {
    id: "manifest-target",
    label: "Compendium remains inside the 500-800 page target",
    passed: quality.totals?.manifestWithinTarget === true,
    detail: `${quality.totals?.manifestPages || 0} manifest pages`,
  });
  addCheck(checks, {
    id: "answer-engine-runtime",
    label: "Answer-engine runtime and live eval evidence are ready",
    passed:
      quality.totals?.answerEngineDeterministicReady === true &&
      quality.totals?.llmRagRuntimeImplemented === true &&
      llm.liveEvaluation?.status === "passed",
    detail: `deterministic=${quality.totals?.answerEngineDeterministicReady === true}, llmRuntime=${quality.totals?.llmRagRuntimeImplemented === true}, liveEval=${llm.liveEvaluation?.status || "missing"}`,
  });
  addCheck(checks, {
    id: "living-docs-controls",
    label: "Living-docs service controls are implemented",
    passed:
      livingDocs.datastoreImplemented === true &&
      livingDocs.frontendServiceIntegrationImplemented === true &&
      livingDocs.retentionPolicyImplemented === true &&
      livingDocs.moderationExportImplemented === true &&
      livingDocs.metricsExportImplemented === true &&
      livingDocs.corsPolicyImplemented === true &&
      livingDocs.backupRestoreImplemented === true &&
      livingDocs.productionPreflightImplemented === true,
    detail: `datastore=${livingDocs.datastoreImplemented === true}, frontendBridge=${livingDocs.frontendServiceIntegrationImplemented === true}, retention=${livingDocs.retentionPolicyImplemented === true}, moderation=${livingDocs.moderationExportImplemented === true}, metrics=${livingDocs.metricsExportImplemented === true}, cors=${livingDocs.corsPolicyImplemented === true}, backup=${livingDocs.backupRestoreImplemented === true}, preflight=${livingDocs.productionPreflightImplemented === true}`,
  });

  const unresolved = [
    ...(requirements.byStatus?.partial ? [`partial=${requirements.byStatus.partial}`] : []),
    ...(requirements.byStatus?.parked ? [`parked=${requirements.byStatus.parked}`] : []),
    ...((requirements.openOperatorItems || []).length ? [`openOperatorItems=${requirements.openOperatorItems.length}`] : []),
  ];
  addCheck(checks, {
    id: "completion-boundary",
    label: "No unresolved completion requirements remain",
    passed: profile !== "production" || requirements.completionReady === true,
    severity: profile === "production" ? "error" : "warning",
    detail: requirements.completionReady === true ? "completionReady=true" : unresolved.join(", "),
    evidence: {
      completionReady: requirements.completionReady === true,
      byStatus: requirements.byStatus,
      openOperatorItems: (requirements.openOperatorItems || []).map((item) => ({
        id: item.id,
        title: item.title,
      })),
    },
  });
}

function checkOperationalAssignments(checks, profile) {
  const reviewerOwner = process.env.SEARCH_BOOK_REVIEWER_OWNER || "";
  const reviewerCadence = process.env.SEARCH_BOOK_REVIEW_CADENCE || "";
  const backupStorage = process.env.SEARCH_BOOK_ANSWER_ENGINE_BACKUP_DIR || process.env.SEARCH_BOOK_BACKUP_STORAGE || "";
  const severity = profile === "production" ? "error" : "warning";

  addCheck(checks, {
    id: "reviewer-owner",
    label: "Living-docs reviewer owner is assigned",
    passed: Boolean(reviewerOwner),
    severity,
    detail: reviewerOwner ? "configured" : "SEARCH_BOOK_REVIEWER_OWNER is missing",
  });
  addCheck(checks, {
    id: "reviewer-cadence",
    label: "Living-docs review cadence is assigned",
    passed: Boolean(reviewerCadence),
    severity,
    detail: reviewerCadence ? "configured" : "SEARCH_BOOK_REVIEW_CADENCE is missing",
  });
  addCheck(checks, {
    id: "backup-storage",
    label: "Answer-engine backup storage is assigned",
    passed: Boolean(backupStorage),
    severity,
    detail: backupStorage ? "configured" : "SEARCH_BOOK_ANSWER_ENGINE_BACKUP_DIR or SEARCH_BOOK_BACKUP_STORAGE is missing",
  });
}

function checkFreshVerify(checks, args) {
  if (!args.runVerify) {
    addCheck(checks, {
      id: "fresh-verify",
      label: "Fresh deterministic verify was run in this launch check",
      passed: args.profile !== "production",
      severity: args.profile === "production" ? "error" : "warning",
      detail: "pass --run-verify for launch evidence",
    });
    return;
  }

  const result = commandResult(["scripts/build-all.mjs", "--verify"]);
  addCheck(checks, {
    id: "fresh-verify",
    label: "Fresh deterministic verify was run in this launch check",
    passed: result.passed,
    detail: result.parsed
      ? `status=${result.parsed.status}, buildSteps=${result.parsed.buildSteps}, syntaxChecks=${result.parsed.syntaxChecks}`
      : `exitCode=${result.exitCode}`,
    evidence: result.parsed || { exitCode: result.exitCode, error: result.error, stdoutTail: tail(result.stdout, 1200), stderrTail: tail(result.stderr, 1200) },
  });
}

function checkProductionEnv(checks, args) {
  if (args.skipProductionEnv) {
    addCheck(checks, {
      id: "production-env-preflight",
      label: "Production env preflight passes",
      passed: args.profile !== "production",
      severity: args.profile === "production" ? "error" : "warning",
      detail: "skipped by --skip-production-env",
    });
    return;
  }

  if (args.profile === "staging") {
    addCheck(checks, {
      id: "production-env-preflight",
      label: "Production env preflight passes",
      passed: true,
      severity: "warning",
      detail: "skipped for staging; run without --profile staging for production launch evidence",
    });
    return;
  }

  const result = commandResult(["scripts/check-production-env.mjs", "--json"]);
  addCheck(checks, {
    id: "production-env-preflight",
    label: "Production env preflight passes",
    passed: result.passed,
    detail: result.parsed
      ? `status=${result.parsed.status}, passed=${result.parsed.totals?.passed}/${result.parsed.totals?.checks}, failed=${result.parsed.totals?.failed}`
      : `exitCode=${result.exitCode}`,
    evidence: result.parsed || { exitCode: result.exitCode, error: result.error, stdoutTail: tail(result.stdout, 1200), stderrTail: tail(result.stderr, 1200) },
  });
}

function checkDeploymentSmoke(checks, args) {
  if (args.skipDeploymentSmoke) {
    addCheck(checks, {
      id: "deployment-smoke",
      label: "URL-driven deployment smoke passes",
      passed: args.profile !== "production",
      severity: args.profile === "production" ? "error" : "warning",
      detail: "skipped by --skip-deployment-smoke",
    });
    return;
  }

  const commandArgs = [
    "scripts/smoke-deployment.mjs",
    "--site-url",
    args.siteUrl,
    "--service-url",
    args.serviceUrl,
    "--mode",
    args.mode,
  ];
  if (args.writeSmoke) commandArgs.push("--write");
  const result = commandResult(commandArgs);
  addCheck(checks, {
    id: "deployment-smoke",
    label: "URL-driven deployment smoke passes",
    passed: result.passed,
    detail: result.parsed
      ? `status=${result.parsed.status}, mode=${result.parsed.mode}, write=${result.parsed.writeEnabled}`
      : `exitCode=${result.exitCode}`,
    evidence: result.parsed || { exitCode: result.exitCode, error: result.error, stdoutTail: tail(result.stdout, 1200), stderrTail: tail(result.stderr, 1200) },
  });
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const checks = [];

  checkBuiltEvidence(checks, args.profile);
  checkOperationalAssignments(checks, args.profile);
  checkUrl(checks, {
    id: "site-url",
    label: "Public docs site URL is configured for the launch profile",
    value: args.siteUrl,
    profile: args.profile,
    allowLocal: args.allowLocal,
  });
  checkUrl(checks, {
    id: "service-url",
    label: "Answer-engine service URL is configured for the launch profile",
    value: args.serviceUrl,
    profile: args.profile,
    allowLocal: args.allowLocal,
  });
  checkFreshVerify(checks, args);
  checkProductionEnv(checks, args);
  checkDeploymentSmoke(checks, args);

  const failed = checks.filter((check) => check.severity === "error" && !check.passed);
  const warnings = checks.filter((check) => check.severity === "warning" && !check.passed);
  const result = {
    status: failed.length ? "failed" : "passed",
    service: "search-book-launch-readiness",
    generatedAt: new Date().toISOString(),
    profile: args.profile,
    mode: args.mode,
    writeSmoke: args.writeSmoke,
    secrets: {
      valuesPrinted: false,
      llmApiKeyConfigured: Boolean(process.env.SEARCH_BOOK_LLM_API_KEY),
      moderationTokenConfigured: Boolean(process.env.SEARCH_BOOK_ANSWER_ENGINE_MODERATION_TOKEN),
      metricsTokenConfigured: Boolean(process.env.SEARCH_BOOK_ANSWER_ENGINE_METRICS_TOKEN),
    },
    totals: {
      checks: checks.length,
      passed: checks.filter((check) => check.passed).length,
      failed: failed.length,
      warnings: warnings.length,
    },
    checks,
  };

  const rendered = JSON.stringify(result, null, 2);
  if (failed.length) {
    console.error(rendered);
    process.exitCode = 1;
    return;
  }
  console.log(rendered);
}

try {
  main();
} catch (error) {
  console.error(JSON.stringify({
    status: "failed",
    service: "search-book-launch-readiness",
    message: error.message,
    secrets: { valuesPrinted: false },
  }, null, 2));
  process.exitCode = 1;
}
