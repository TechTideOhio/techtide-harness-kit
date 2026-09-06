#!/usr/bin/env node
/**
 * Build the flat Agent Plugins 1.0 skills artifact.
 *
 * Spec: https://agent-plugins.org/specification (v1.0.0), section 7.1:
 * skills are discovered as immediate children of `skills/` - each child
 * directory containing `SKILL.md` is one skill. The canonical repo layout
 * (`skills/<provider>/<skill>/SKILL.md`) is two levels deep, so conformant
 * clients would discover zero skills from a raw checkout.
 *
 * This script does NOT move the canonical tree (that would break
 * catalog/skills.json paths, thk-export-agents, and the npm layout).
 * Instead it builds a flat mirror:
 *
 *   dist/agent-plugins/
 *     plugin.json          (copy of the root Agent Plugins manifest)
 *     LICENSE
 *     skills/<skill-id>/   (full copy of skills/<provider>/<skill-id>/)
 *
 * The output directory is a build artifact: gitignored, outside the
 * asset-integrity trust trees, and never hand-edited. It is rebuilt by
 * `npm run agent-plugins:write` and consumed by release packaging
 * (GitHub Release asset) and by `npx skills add <dir> --list` checks.
 *
 * Mode:
 *   --check        verify an existing artifact matches the catalog
 *   --out <dir>    override output directory (default dist/agent-plugins)
 *   (default)      rebuild the artifact
 */

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = join(repoRoot, "catalog", "skills.json");
const pluginManifestPath = join(repoRoot, "plugin.json");
const licensePath = join(repoRoot, "LICENSE");

function parseArgs(argv) {
  const args = { out: join(repoRoot, "dist", "agent-plugins"), check: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--check") args.check = true;
    else if (argv[i] === "--out" && argv[i + 1]) args.out = resolve(repoRoot, argv[++i]);
  }
  return args;
}

function contained(absPath, root) {
  const rel = relative(root, absPath);
  return rel !== "" && rel !== ".." && !rel.startsWith(`..${sep}`) && !isAbsolute(rel);
}

function loadCatalog() {
  const entries = JSON.parse(readFileSync(catalogPath, "utf8"));
  return entries
    .filter((e) => e && e.type === "skill" && typeof e.id === "string" && typeof e.path === "string")
    .sort((a, b) => a.id.localeCompare(b.id));
}

function build(outDir) {
  const catalog = loadCatalog();
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(join(outDir, "skills"), { recursive: true });
  for (const entry of catalog) {
    // Note 1: catalog paths are untrusted input. Fail closed on escapes.
    const src = join(repoRoot, entry.path);
    if (!contained(resolve(src), repoRoot)) {
      throw new Error(`${entry.id}: catalog path escapes repository: ${entry.path}`);
    }
    if (!existsSync(join(src, "SKILL.md"))) {
      throw new Error(`${entry.id}: missing SKILL.md at ${entry.path}`);
    }
    const dest = join(outDir, "skills", entry.id);
    if (!contained(resolve(dest), resolve(outDir))) {
      throw new Error(`${entry.id}: destination escapes artifact dir`);
    }
    cpSync(src, dest, { recursive: true });
  }
  for (const [src, name] of [[pluginManifestPath, "plugin.json"], [licensePath, "LICENSE"]]) {
    if (!existsSync(src)) throw new Error(`required file missing: ${relative(repoRoot, src)}`);
    writeFileSync(join(outDir, name), readFileSync(src));
  }
  return catalog.length;
}

function checkArtifact(outDir) {
  const errors = [];
  const catalog = loadCatalog();
  if (!existsSync(outDir)) {
    return [`artifact dir missing: ${relative(repoRoot, outDir)}; run npm run agent-plugins:write`];
  }
  const manifestCopy = join(outDir, "plugin.json");
  if (!existsSync(manifestCopy) || readFileSync(manifestCopy, "utf8") !== readFileSync(pluginManifestPath, "utf8")) {
    errors.push("plugin.json copy is missing or stale");
  }
  const skillsDir = join(outDir, "skills");
  const onDisk = existsSync(skillsDir)
    ? readdirSync(skillsDir).filter((n) => statSync(join(skillsDir, n)).isDirectory()).sort()
    : [];
  const expected = catalog.map((e) => e.id);
  const missing = expected.filter((id) => !onDisk.includes(id));
  const extra = onDisk.filter((id) => !expected.includes(id));
  if (missing.length > 0) errors.push(`${missing.length} catalog skills absent from artifact: e.g. ${missing[0]}`);
  if (extra.length > 0) errors.push(`${extra.length} artifact skills not in catalog: e.g. ${extra[0]}`);
  for (const entry of catalog) {
    const srcSkill = join(repoRoot, entry.path, "SKILL.md");
    const destSkill = join(skillsDir, entry.id, "SKILL.md");
    if (existsSync(destSkill) && existsSync(srcSkill)) {
      if (readFileSync(destSkill, "utf8") !== readFileSync(srcSkill, "utf8")) {
        errors.push(`${entry.id}: SKILL.md drifted from canonical tree`);
        break;
      }
    }
    // Note 2: agentskills.io requires name == directory. Enforce here so
    // the artifact never ships a skill strict clients would skip.
    if (existsSync(destSkill)) {
      const text = readFileSync(destSkill, "utf8").replace(/^﻿/, "");
      const m = text.match(/^name:\s*(.+?)\s*$/m);
      const name = (m ? m[1] : "").trim().replace(/^["']|["']$/g, "");
      if (name !== entry.id) {
        errors.push(`${entry.id}: SKILL.md name does not match directory`);
        break;
      }
    }
  }
  return errors;
}

const args = parseArgs(process.argv.slice(2));
if (args.check) {
  const errors = checkArtifact(args.out);
  if (errors.length > 0) {
    for (const e of errors) console.error(`ERROR: ${e}`);
    process.exit(1);
  }
  console.log(`OK: agent plugins skills artifact in sync (${loadCatalog().length} flat skills)`);
} else {
  const count = build(args.out);
  console.log(`OK: wrote ${relative(repoRoot, args.out)} (${count} flat skills)`);
}
