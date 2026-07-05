/**
 * Symmiopedia v3 (SYN-369): derive each page's real "last edited" date from
 * git history — the footer line uses it (DESIGN.MD Part A: "the footer's
 * 'last edited' line uses the page's real updated date"). No invention: a page
 * whose content file has no git history gets no entry and the footer degrades
 * by omitting the line.
 *
 * Output: web/src/data/page-dates.json  { <pageId>: "<ISO commit date>" }
 * Regenerate: node scripts/generate-page-dates.mjs
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// One git walk builds a last-touch map for every tracked path (800 per-file
// `git log -1` calls would take minutes).
const log = execFileSync("git", ["log", "--name-only", "--format=%x01%cI"], {
  cwd: root,
  encoding: "utf8",
  maxBuffer: 256 * 1024 * 1024,
});
const lastTouched = new Map();
let currentDate = null;
for (const line of log.split("\n")) {
  if (line.startsWith("")) {
    currentDate = line.slice(1).trim();
  } else if (line.trim() && currentDate && !lastTouched.has(line.trim())) {
    lastTouched.set(line.trim(), currentDate);
  }
}

const manifest = JSON.parse(fs.readFileSync(path.join(root, "page-manifest.json"), "utf8"));
const authored = JSON.parse(fs.readFileSync(path.join(root, "data", "authored-pages.json"), "utf8"));
const authoredPages = authored.pages || authored;

const dates = {};
let matched = 0;
const record = (id, file) => {
  if (!id || !file || dates[id]) return;
  const date = lastTouched.get(file.replace(/^\.\//, ""));
  if (date) {
    dates[id] = date;
    matched += 1;
  }
};
for (const page of authoredPages) record(page.id, page.file);
for (const page of manifest.pages || []) record(page.id, page.file || page.route);

const outPath = path.join(root, "web", "src", "data", "page-dates.json");
fs.writeFileSync(outPath, `${JSON.stringify(dates, null, 0)}\n`);
console.log(JSON.stringify({ status: "written", path: path.relative(root, outPath), pages: Object.keys(dates).length, matched }));
