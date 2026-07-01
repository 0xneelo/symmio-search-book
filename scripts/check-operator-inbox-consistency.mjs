#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const expectedOpenItems = new Map([
  [4, {
    title: "Final docs platform and repository owner decision",
    linearTask: "SYN-285",
  }],
  [11, {
    title: "Production VPS LLM/service env install",
    linearTask: "SYN-281",
  }],
]);
const reconciliationResolvedIds = new Set([2, 5, 6, 7, 12]);
const resolvedRuntimeIds = new Set([17]);
const allowedOpenIds = new Set(expectedOpenItems.keys());

function readText(relativePath) {
  return fs.readFileSync(path.join(searchBookRoot, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(searchBookRoot, relativePath), "utf8"));
}

function sectionBetween(markdown, startMarker, endMarker) {
  const start = markdown.indexOf(startMarker);
  if (start === -1) return "";
  const afterStart = markdown.slice(start + startMarker.length);
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

function ids(items) {
  return items.map((item) => item.id).sort((a, b) => a - b);
}

function sameIds(actual, expected) {
  return actual.length === expected.length && actual.every((id, index) => id === expected[index]);
}

function parseLinearOperatorTask(body) {
  return body.match(/Linear operator task:\s*(SYN-\d+)/)?.[1] || null;
}

function addCheck(checks, id, passed, detail, evidence = null) {
  checks.push({
    id,
    passed: Boolean(passed),
    detail,
    ...(evidence ? { evidence } : {}),
  });
}

const inboxMarkdown = readText("_specs/app-docs/OPERATOR-INBOX.md");
const requirementMap = readJson("data/requirement-map.json");
const openEntries = parseInboxEntries(sectionBetween(inboxMarkdown, "## Open", "## Resolved"))
  .filter((entry) => entry.status === "OPEN");
const resolvedEntries = parseInboxEntries(sectionBetween(inboxMarkdown, "## Resolved", "---"))
  .filter((entry) => entry.status === "RESOLVED");
const entries = [...openEntries, ...resolvedEntries];
const openIds = ids(openEntries);
const expectedOpenIds = [...expectedOpenItems.keys()].sort((a, b) => a - b);
const resolvedIds = new Set(resolvedEntries.map((entry) => entry.id));
const requirementOpenIds = ids(requirementMap.openOperatorItems || []);
const forbiddenOpenIds = openIds.filter((id) => !allowedOpenIds.has(id));
const missingResolvedReconciliationIds = [...reconciliationResolvedIds].filter((id) => !resolvedIds.has(id));
const missingResolvedRuntimeIds = [...resolvedRuntimeIds].filter((id) => !resolvedIds.has(id));
const reopenedResolvedIds = [...reconciliationResolvedIds, ...resolvedRuntimeIds].filter((id) => openIds.includes(id));
const requirementBlockIds = [...new Set((requirementMap.requirements || [])
  .flatMap((requirement) => requirement.blocks || [])
  .map((block) => Number(String(block).match(/OPERATOR-INBOX #(\d+)/)?.[1]))
  .filter(Number.isFinite))].sort((a, b) => a - b);
const unexpectedRequirementBlockIds = requirementBlockIds.filter((id) => !allowedOpenIds.has(id));
const entryById = new Map(entries.map((entry) => [entry.id, entry]));
const item11 = entryById.get(11);
const item4 = entryById.get(4);
const openLinearTasks = openEntries.map((entry) => ({
  id: entry.id,
  linearTask: parseLinearOperatorTask(entry.body),
}));
const missingOpenLinearTasks = openLinearTasks
  .filter((entry) => !entry.linearTask)
  .map((entry) => entry.id);
const mismatchedOpenLinearTasks = [...expectedOpenItems]
  .map(([id, expected]) => ({
    id,
    actual: parseLinearOperatorTask(entryById.get(id)?.body || ""),
    expected: expected.linearTask,
  }))
  .filter((entry) => entry.actual !== entry.expected);

const checks = [];
addCheck(
  checks,
  "reconciliation-banner",
  inboxMarkdown.includes("only two production operator gates remain, #11 and #4") &&
    inboxMarkdown.includes("local LLM env file is complete") &&
    inboxMarkdown.includes("#2, #5, #6, #7, and #12 must not be re-opened"),
  "2026-07-01 reconciliation banner records #11/#4 only and local LLM env complete",
);
addCheck(
  checks,
  "open-items-exact",
  sameIds(openIds, expectedOpenIds),
  `open=${openIds.join(",") || "none"}; expected=${expectedOpenIds.join(",")}`,
  { openItems: openEntries.map((item) => ({ id: item.id, title: item.title })) },
);
addCheck(
  checks,
  "open-item-titles",
  [...expectedOpenItems].every(([id, expected]) => entryById.get(id)?.title === expected.title),
  [...expectedOpenItems]
    .map(([id, expected]) => `#${id}=${entryById.get(id)?.title || "missing"} expected=${expected.title}`)
    .join("; "),
);
addCheck(
  checks,
  "open-items-linear-tasks-present",
  missingOpenLinearTasks.length === 0,
  missingOpenLinearTasks.length
    ? `missing Linear operator task markers on open items=${missingOpenLinearTasks.join(",")}`
    : "every open operator item carries a Linear operator task marker",
  { openLinearTasks },
);
addCheck(
  checks,
  "open-items-linear-tasks-current",
  mismatchedOpenLinearTasks.length === 0,
  mismatchedOpenLinearTasks.length
    ? mismatchedOpenLinearTasks.map((entry) => `#${entry.id}=${entry.actual || "missing"} expected=${entry.expected}`).join("; ")
    : "open operator tasks match SYN-281/#11 and SYN-285/#4",
  {
    expectedOpenLinearTasks: [...expectedOpenItems]
      .map(([id, expected]) => ({ id, linearTask: expected.linearTask }))
      .sort((a, b) => a.id - b.id),
  },
);
addCheck(
  checks,
  "no-unexpected-open-items",
  forbiddenOpenIds.length === 0,
  forbiddenOpenIds.length ? `unexpected=${forbiddenOpenIds.join(",")}` : "only #4/#11 open",
);
addCheck(
  checks,
  "resolved-reconciliation-items-present",
  missingResolvedReconciliationIds.length === 0,
  missingResolvedReconciliationIds.length ? `missing resolved=${missingResolvedReconciliationIds.join(",")}` : "resolved #2/#5/#6/#7/#12 present",
);
addCheck(
  checks,
  "resolved-runtime-items-present",
  missingResolvedRuntimeIds.length === 0,
  missingResolvedRuntimeIds.length ? `missing resolved=${missingResolvedRuntimeIds.join(",")}` : "resolved #17 present",
);
addCheck(
  checks,
  "resolved-items-not-reopened",
  reopenedResolvedIds.length === 0,
  reopenedResolvedIds.length ? `reopened=${reopenedResolvedIds.join(",")}` : "resolved reconciliation/runtime ids not reopened",
);
addCheck(
  checks,
  "local-llm-env-not-parked",
  Boolean(item11?.body.includes("Local `.secrets/search-book.env` is complete") &&
    item11.body.includes("only production VPS env install remains") &&
    item11.body.includes("/etc/symmio-search-book/search-book.env")),
  "#11 is scoped to production VPS env install; local LLM env is complete",
);
addCheck(
  checks,
  "backend-decision-recorded",
  Boolean(item4?.body.includes("Backend architecture is decided as a standalone service with SQLite") ||
    item4?.body.includes("backend decided as standalone service + SQLite")),
  "#4 keeps backend decided and only public frontend platform/repo/deploy route open",
);
addCheck(
  checks,
  "requirement-open-items-match-inbox",
  sameIds(requirementOpenIds, openIds),
  `requirementMap=${requirementOpenIds.join(",") || "none"}; inbox=${openIds.join(",") || "none"}`,
);
addCheck(
  checks,
  "requirement-blocks-reconciled",
  unexpectedRequirementBlockIds.length === 0,
  unexpectedRequirementBlockIds.length
    ? `unexpected requirement blocks=${unexpectedRequirementBlockIds.join(",")}`
    : "requirement blockers reference only currently open operator ids",
);

const failed = checks.filter((check) => !check.passed);
const result = {
  status: failed.length ? "failed" : "passed",
  service: "search-book-operator-inbox-consistency",
  evidence: {
    openOperatorItems: openIds,
    requirementMapOpenOperatorItems: requirementOpenIds,
    openOperatorLinearTasks: openLinearTasks,
    resolvedReconciliationItems: [...reconciliationResolvedIds].sort((a, b) => a - b),
    resolvedRuntimeItems: [...resolvedRuntimeIds].sort((a, b) => a - b),
    requirementBlockIds,
  },
  checks,
};

const rendered = JSON.stringify(result, null, 2);
if (failed.length) {
  console.error(rendered);
  process.exit(1);
}

console.log(rendered);
