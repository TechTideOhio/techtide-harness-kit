import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  generate,
  check,
  lovableDescription,
} from "../scripts/generate-lovable-skills.mjs";

function tempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "thk-lovable-"));
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function testDescriptionStartsWithUseWhen() {
  const description = lovableDescription("Do the work. Use when reviewing a Lovable app before launch.");
  assert.equal(description, "Use when reviewing a Lovable app before launch.");
  console.log("OK: Lovable descriptions start with Use when");
}

function testGeneratesSingleSkillArchiveShape() {
  const out = tempDir();
  const manifest = generate({
    out,
    repo: "TechTideOhio/techtide-harness-kit",
    releaseTag: "v1.0.0",
    skills: ["lovable-native-packaging-bridge"],
  });
  assert.equal(manifest.skills.length, 1);
  const skill = manifest.skills[0];
  assert.equal(skill.id, "lovable-native-packaging-bridge");
  assert.ok(fs.existsSync(path.join(out, "skills", skill.id, "SKILL.md")));
  assert.ok(fs.existsSync(path.join(out, "archives", `${skill.id}.zip`)));
  const zip = fs.readFileSync(path.join(out, "archives", `${skill.id}.zip`));
  assert.equal(zip.readUInt32LE(0), 0x04034b50);
  assert.ok(zip.includes(Buffer.from(`${skill.id}/SKILL.md`)));
  assert.ok(skill.file_count <= 200);
  assert.ok(skill.total_bytes <= 10 * 1024 * 1024);
  console.log("OK: single-skill Lovable archive shape generated");
}

function testCheckValidatesGeneratedManifest() {
  const out = tempDir();
  generate({
    out,
    repo: "TechTideOhio/techtide-harness-kit",
    releaseTag: "v1.0.0",
    skills: ["techtide-lovable-production-handoff"],
  });
  const manifest = check({ out });
  assert.equal(manifest.skills[0].id, "techtide-lovable-production-handoff");
  const generated = readJson(path.join(out, "manifest.json"));
  assert.equal(generated.lovable_limits.max_files, 200);
  console.log("OK: generated Lovable manifest validates");
}

function testDefaultPackagesVibeCodingLanes() {
  const out = tempDir();
  const manifest = generate({
    out,
    repo: "TechTideOhio/techtide-harness-kit",
    releaseTag: "v1.0.0",
    skills: [],
  });
  const ids = new Set(manifest.skills.map((skill) => skill.id));
  assert.ok(ids.has("lovable-native-packaging-bridge"));
  assert.ok(ids.has("v0-prompt-hardening"));
  assert.ok(ids.has("vercel-frontend-review"));
  assert.ok(ids.has("replit-deployment-readiness"));
  assert.ok(ids.has("cursor-repo-reconnaissance"));
  assert.ok(ids.has("techtide-v0-ui-prompt-hardener"));
  assert.ok(ids.has("techtide-replit-fullstack-bootstrap"));
  console.log("OK: default Lovable package export includes vibe-coding lanes");
}

testDescriptionStartsWithUseWhen();
testGeneratesSingleSkillArchiveShape();
testCheckValidatesGeneratedManifest();
testDefaultPackagesVibeCodingLanes();
