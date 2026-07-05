import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
export const searchBookRoot = path.resolve(scriptsDir, "..");
export const livingDocsDir = path.join(searchBookRoot, "docs");

export function livingDocPath(fileName) {
  return path.join(livingDocsDir, fileName);
}

export function livingDocRelative(fileName) {
  return path.posix.join("docs", fileName);
}
