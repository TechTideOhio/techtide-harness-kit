#!/usr/bin/env node
/**
 * Public-surface hygiene scanner for production release artifacts.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const requiredFiles = [
  "README.md",
  "CATALOG.md",
  "EVALS.md",
  "TRUST.md",
  "SECURITY.md",
];

const recursiveDirs = [
  ".github/ISSUE_TEMPLATE",
];

function listFiles(dir) {
  const abs = path.join(repoRoot, dir);
  if (!fs.existsSync(abs)) return [];
  const out = [];
  for (const item of fs.readdirSync(abs, { withFileTypes: true })) {
    const rel = path.join(dir, item.name).split(path.sep).join("/");
    if (item.isDirectory()) out.push(...listFiles(rel));
    else if (/\.(md|json|jsonl|mjs|yml|yaml)$/.test(item.name)) out.push(rel);
  }
  return out;
}

const scanFiles = [...new Set([...requiredFiles, ...recursiveDirs.flatMap(listFiles)])];

const forbidden = [
  [/[\uFFFD]/, "replacement character"],
  [/\b(?:\u00C2|\u00E2\u20AC[\u201C\u201D\u2122\u02DC]|\u00F0\u0178)/, "mojibake marker"],
  [/[\u2013\u2014]/, "non-ASCII dash"],
  [/C:\\Users\\Admin\\/i, "raw local Windows path"],
  [/\/Users\/[^/\s]+\/(Downloads|Desktop|Documents)\//i, "raw local user path"],
  [/endorsed by/i, "unsupported endorsement claim"],
  [/approved by/i, "unsupported approval claim"],
  [/would hire alex/i, "unsupported hiring claim"],
  [/actual customer proof/i, "unsupported customer-proof claim"],
  [/real customer endorsement/i, "unsupported customer endorsement claim"],
  [/SOC 2 compliant/i, "unsupported SOC 2 compliance claim"],
  [/ISO 27001 certified/i, "unsupported ISO certification claim"],
  [/HIPAA compliant/i, "unsupported HIPAA compliance claim"],
  [/AKIA[0-9A-Z]{16}/, "AWS access key shape"],
  [/ghp_[A-Za-z0-9_]{20,}/, "GitHub token shape"],
  [/sk-[A-Za-z0-9]{20,}/, "OpenAI-style key shape"],
  [/-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/, "private key block"],
];

const errors = [];
for (const rel of requiredFiles) {
  if (!fs.existsSync(path.join(repoRoot, rel))) errors.push(`${rel}: required hygiene file missing`);
}

for (const rel of scanFiles) {
  const abs = path.join(repoRoot, rel);
  if (!fs.existsSync(abs)) continue;
  const text = fs.readFileSync(abs, "utf8");
  for (const [pattern, reason] of forbidden) {
    if (pattern.test(text)) errors.push(`${rel}: ${reason}`);
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exit(1);
}

console.log(`OK: hygiene check passed (${scanFiles.length} public files scanned)`);
