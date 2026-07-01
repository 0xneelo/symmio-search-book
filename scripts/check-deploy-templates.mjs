#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const unitPaths = {
  service: "deploy/symmio-search-book.service",
  backupService: "deploy/symmio-search-book-backup.service",
  backupTimer: "deploy/symmio-search-book-backup.timer",
};

function read(relativePath) {
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

function includesAll(text, fragments) {
  return fragments.every((fragment) => text.includes(fragment));
}

const checks = [];
const missingUnits = Object.values(unitPaths).filter((relativePath) => !fs.existsSync(path.join(searchBookRoot, relativePath)));
addCheck(checks, "unit-files-exist", missingUnits.length === 0, missingUnits.length ? `missing=${missingUnits.join(",")}` : "3 unit files present");

const service = missingUnits.includes(unitPaths.service) ? "" : read(unitPaths.service);
const backupService = missingUnits.includes(unitPaths.backupService) ? "" : read(unitPaths.backupService);
const backupTimer = missingUnits.includes(unitPaths.backupTimer) ? "" : read(unitPaths.backupTimer);
const packet = read("PRODUCTION-READINESS-PACKET.md");
const deployment = read("DEPLOYMENT.md");

addCheck(
  checks,
  "answer-service-unit-contract",
  includesAll(service, [
    "After=network-online.target",
    "Wants=network-online.target",
    "WorkingDirectory=/opt/symmio-search-book",
    "ExecStart=/usr/bin/node --env-file=/etc/symmio-search-book/search-book.env scripts/serve-answer-engine.mjs",
    "Restart=on-failure",
    "StateDirectory=symmio-search-book",
    "User=symmio-search-book",
    "Group=symmio-search-book",
    "ReadWritePaths=/var/lib/symmio-search-book",
  ]),
  "answer service unit must load the production env file, run the answer-engine service, and keep SQLite writable outside the repo",
);

addCheck(
  checks,
  "answer-service-hardening",
  includesAll(service, [
    "NoNewPrivileges=true",
    "PrivateTmp=true",
    "ProtectSystem=strict",
    "ProtectHome=true",
  ]),
  "answer service unit must keep the basic systemd sandboxing controls enabled",
);

addCheck(
  checks,
  "backup-service-unit-contract",
  includesAll(backupService, [
    "Wants=symmio-search-book.service",
    "After=symmio-search-book.service",
    "WorkingDirectory=/opt/symmio-search-book",
    "ExecStart=/usr/bin/node --env-file=/etc/symmio-search-book/search-book.env scripts/backup-answer-engine-db.mjs",
    "StateDirectory=symmio-search-book",
    "User=symmio-search-book",
    "Group=symmio-search-book",
    "UMask=0077",
    "ReadWritePaths=/var/lib/symmio-search-book /var/backups/symmio-search-book",
  ]),
  "backup unit must load the same production env file, use the backup script, and write only DB/backups paths",
);

addCheck(
  checks,
  "backup-service-hardening",
  includesAll(backupService, [
    "NoNewPrivileges=true",
    "PrivateTmp=true",
    "ProtectSystem=strict",
    "ProtectHome=true",
  ]),
  "backup unit must keep the basic systemd sandboxing controls enabled",
);

addCheck(
  checks,
  "backup-timer-contract",
  includesAll(backupTimer, [
    "OnCalendar=*-*-* 03:17:00",
    "Persistent=true",
    "RandomizedDelaySec=15m",
    "Unit=symmio-search-book-backup.service",
    "WantedBy=timers.target",
  ]),
  "backup timer must run the backup service daily with persistence and jitter",
);

addCheck(
  checks,
  "operator-packet-install-commands",
  includesAll(packet, [
    "sudo cp deploy/symmio-search-book.service /etc/systemd/system/",
    "sudo cp deploy/symmio-search-book-backup.service /etc/systemd/system/",
    "sudo cp deploy/symmio-search-book-backup.timer /etc/systemd/system/",
    "sudo systemctl daemon-reload",
    "sudo systemctl enable --now symmio-search-book.service",
    "sudo systemctl enable --now symmio-search-book-backup.timer",
    "sudo systemctl start symmio-search-book-backup.service",
    "sudo test -s /var/backups/symmio-search-book/latest.manifest.json",
  ]),
  "production readiness packet must install/start the service and backup timer and require the first backup manifest",
);

addCheck(
  checks,
  "deployment-doc-install-commands",
  includesAll(deployment, [
    "sudo cp deploy/symmio-search-book.service /etc/systemd/system/",
    "sudo cp deploy/symmio-search-book-backup.service /etc/systemd/system/",
    "sudo cp deploy/symmio-search-book-backup.timer /etc/systemd/system/",
    "sudo systemctl daemon-reload",
    "sudo systemctl enable --now symmio-search-book.service",
    "sudo systemctl enable --now symmio-search-book-backup.timer",
    "sudo systemctl start symmio-search-book-backup.service",
    "sudo test -s /var/backups/symmio-search-book/latest.manifest.json",
  ]),
  "deployment doc must keep the same service/timer install and first-backup flow as the production packet",
);

addCheck(
  checks,
  "env-path-consistency",
  [service, backupService, packet, deployment].every((text) => text.includes("/etc/symmio-search-book/search-book.env")),
  "service, backup service, production packet, and deployment doc must use the canonical production env path",
);

const failed = checks.filter((check) => !check.passed);
const result = {
  status: failed.length ? "failed" : "passed",
  service: "search-book-deploy-template-check",
  valuesPrinted: false,
  evidence: {
    units: unitPaths,
    productionEnvPath: "/etc/symmio-search-book/search-book.env",
    workingDirectory: "/opt/symmio-search-book",
    serviceUser: "symmio-search-book",
    stateDirectory: "symmio-search-book",
    backupTimer: "daily",
  },
  checks,
};

const rendered = JSON.stringify(result, null, 2);
if (failed.length) {
  console.error(rendered);
  process.exit(1);
}

console.log(rendered);
