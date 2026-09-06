#!/usr/bin/env node
/**
 * Generate the Agent Plugins 1.0 manifest (`plugin.json`) at the repo root.
 *
 * Spec: https://agent-plugins.org/specification (v1.0.0).
 *
 * The manifest schema is CLOSED: only $schema, name, version, description,
 * author, homepage, repository, license, keywords, and extensions are
 * permitted. Client-specific data belongs under `extensions` keyed by
 * reverse-domain namespace. Any other top-level field makes clients reject
 * the plugin, so this generator allowlists fields explicitly.
 *
 * This manifest is distinct from the vendor-specific manifests:
 *   .claude-plugin/plugin.json  (Claude Code plugin spec)
 *   .cursor-plugin/plugin.json  (Cursor plugin spec)
 *   plugins/*\/.codex-plugin/plugin.json (Codex plugin spec)
 * Those are untouched by this script.
 *
 * No mcp.json is emitted: mcp/official/ holds documentation bundles, not
 * launchable server configs, and inventing `command`/`url` values would
 * violate the repo's cross-harness rule against silent dependencies
 * (docs/compatibility.md). Spec section 6.2: a missing component location
 * is not an error.
 *
 * Output is sorted and deterministic so the manifest is reproducible across
 * runs and reviewable in change set.
 *
 * Mode:
 *   --check  exit 1 if the on-disk manifest does not match the generated one
 *   (default) overwrite the on-disk manifest
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(repoRoot, "plugin.json");
const pkgPath = join(repoRoot, "package.json");
const catalogSkillsPath = join(repoRoot, "catalog", "skills.json");
const catalogAgentsPath = join(repoRoot, "catalog", "agents.json");

const SCHEMA_URL = "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json";
const PLUGIN_NAME = "techtide-harness-kit";

const check = process.argv.includes("--check");

const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));

// Note 1: The spec closes the manifest schema. This allowlist is the
// enforcement point: adding a field here without checking the spec risks
// shipping a manifest every conformant client must reject.
const ALLOWED_TOP_LEVEL = new Set([
  "$schema",
  "name",
  "version",
  "description",
  "author",
  "homepage",
  "repository",
  "license",
  "keywords",
  "extensions",
]);

// Note 2: Name constraints (spec 5.5): 1-64 chars, lowercase alnum plus
// hyphen/period, alphanumeric ends, no "--" or "..".
if (
  PLUGIN_NAME.length < 1 ||
  PLUGIN_NAME.length > 64 ||
  !/^[a-z0-9][a-z0-9.-]*[a-z0-9]$/.test(PLUGIN_NAME) ||
  PLUGIN_NAME.includes("--") ||
  PLUGIN_NAME.includes("..")
) {
  console.error(`ERROR: plugin name ${JSON.stringify(PLUGIN_NAME)} violates Agent Plugins 5.5`);
  process.exit(2);
}

// Note 3: The author object allows only name/email/url with string values.
// package.json author has exactly { name, url }, which fits.
const author = { name: String(pkg.author?.name ?? ""), url: String(pkg.author?.url ?? "") };
if (!author.name || !author.url) {
  console.error("ERROR: package.json author name/url required for plugin manifest");
  process.exit(2);
}

let skillCount = 0;
let agentCount = 0;
try {
  skillCount = JSON.parse(readFileSync(catalogSkillsPath, "utf8")).length ?? 0;
  agentCount = JSON.parse(readFileSync(catalogAgentsPath, "utf8")).length ?? 0;
} catch {
  console.error("ERROR: catalog/skills.json or catalog/agents.json unreadable");
  process.exit(2);
}

const manifest = {
  $schema: SCHEMA_URL,
  name: PLUGIN_NAME,
  version: String(pkg.version),
  description: String(pkg.description),
  author,
  homepage: "https://github.com/TechTideOhio/techtide-harness-kit",
  repository: "https://github.com/TechTideOhio/techtide-harness-kit",
  license: String(pkg.license),
  keywords: [
    "agentic",
    "agents",
    "marketplace",
    "cloud",
    "aws",
    "azure",
    "gcp",
    "oci",
    "alibaba",
    "huawei",
    "kubernetes",
    "terraform",
    "zero-trust",
    "compliance",
  ],
  extensions: {
    "io.techtide.marketplace": {
      skills: skillCount,
      agents: agentCount,
      trustEvidence: "./catalog/skill-trust.json",
      installRoles: "./catalog/install-roles.json",
    },
  },
};

// Note 4: Defense in depth - verify the emitted object itself contains only
// allowed top-level fields, so a future edit to this file cannot silently
// add a spec-rejected field.
for (const key of Object.keys(manifest)) {
  if (!ALLOWED_TOP_LEVEL.has(key)) {
    console.error(`ERROR: manifest field ${JSON.stringify(key)} is not in the Agent Plugins 1.0 closed schema`);
    process.exit(2);
  }
}

const next = JSON.stringify(manifest, null, 2) + "\n";

if (check) {
  if (!existsSync(manifestPath)) {
    console.error(`ERROR: ${relative(repoRoot, manifestPath)} is missing; run npm run agent-plugins:write`);
    process.exit(1);
  }
  const current = readFileSync(manifestPath, "utf8");
  if (current !== next) {
    console.error(
      `ERROR: ${relative(repoRoot, manifestPath)} is stale; run npm run agent-plugins:write`,
    );
    process.exit(1);
  }
  console.log(`OK: agent plugins manifest is in sync (v${manifest.version}, ${skillCount} skills, ${agentCount} agents)`);
} else {
  writeFileSync(manifestPath, next);
  console.log(`OK: wrote ${relative(repoRoot, manifestPath)} (v${manifest.version})`);
}
