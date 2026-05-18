#!/usr/bin/env node
/**
 * Targeted tests for public proof-layer and enterprise credibility artifacts.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return fs.readFileSync(path.join(repoRoot, rel), "utf8");
}

function json(rel) {
  return JSON.parse(read(rel));
}

const skills = json("catalog/skills.json");
const agents = json("catalog/agents.json");
const quarantine = json("catalog/skill-research-quarantine.json");
const trust = json("catalog/skill-trust.json");
const missions = json("catalog/enterprise-missions.json");
const readme = read("README.md");
const catalogMd = read("CATALOG.md");
const evalsMd = read("EVALS.md");
const marketplace = read(".github/plugin/marketplace.json");

const promoted = (quarantine.entries ?? []).filter((entry) => entry.status === "promoted");

assert.match(readme, new RegExp(`${skills.length} skills`), "README must show generated skill count");
assert.match(readme, new RegExp(`${agents.length} agents`), "README must show generated agent count");
assert.match(catalogMd, new RegExp(`${skills.length} skills`), "CATALOG.md must show generated skill count");
assert.match(evalsMd, new RegExp(`\\| Skills \\| ${skills.length} \\|`), "EVALS.md must show generated skill count");
assert.match(marketplace, new RegExp(`${agents.length} agents`), "Copilot marketplace must show generated agent count");
assert.match(marketplace, new RegExp(`${skills.length} skills`), "Copilot marketplace must show generated skill count");

const stalePhrases = [
  ["373", "skills"].join(" "),
  ["331", "agents"].join(" "),
  ["286", "skills"].join(" "),
  ["no", "post-processing", "required"].join(" "),
  ["sufficient", "evidence", "for", "all", "mapped", "controls"].join(" "),
];
for (const stale of stalePhrases) {
  assert.equal(readme.includes(stale), false, `README contains stale or overclaiming phrase: ${stale}`);
}

assert.equal(trust.skills.length, skills.length, "trust manifest must cover every skill");
const skillIds = new Set(skills.map((skill) => skill.id));
for (const entry of trust.skills) {
  assert.equal(skillIds.has(entry.id), true, `${entry.id}: trust entry must map to catalog skill`);
  assert.ok(entry.risk_tier, `${entry.id}: missing risk_tier`);
  assert.ok(entry.data_classes?.length, `${entry.id}: missing data_classes`);
  assert.ok(entry.approval_gates?.length, `${entry.id}: missing approval_gates`);
  assert.equal(entry.tool_permissions?.secrets, "forbidden", `${entry.id}: secrets must default forbidden`);
  assert.equal(entry.network_egress?.default, "deny", `${entry.id}: network must default deny`);
  assert.ok(entry.agent_identity_mode, `${entry.id}: missing agent_identity_mode`);
  assert.ok(entry.audit_events?.length, `${entry.id}: missing audit_events`);
  assert.ok(entry.control_mappings?.length, `${entry.id}: missing control_mappings`);
  assert.ok(entry.evidence_links?.length, `${entry.id}: missing evidence_links`);
}

for (const entry of promoted) {
  assert.ok(entry.source_repo, `${entry.id}: promoted candidate missing source_repo`);
  assert.ok(entry.source_path, `${entry.id}: promoted candidate missing source_path`);
  assert.ok(entry.source_license, `${entry.id}: promoted candidate missing source_license`);
  assert.ok(entry.import_mode, `${entry.id}: promoted candidate missing import_mode`);
  assert.equal(entry.validation_status, "candidate-valid", `${entry.id}: promoted candidate must be valid`);
}

assert.equal(missions.missions.length, 5, "enterprise missions must cover the five-stage operating model");
for (const mission of missions.missions) {
  assert.ok(mission.risk_tier, `${mission.id}: missing risk_tier`);
  assert.ok(mission.approval_gates?.length, `${mission.id}: missing approval_gates`);
  assert.ok(mission.eval_guidance?.length, `${mission.id}: missing eval_guidance`);
  for (const skillId of mission.recommended_skills) {
    assert.equal(skillIds.has(skillId), true, `${mission.id}: missing recommended skill ${skillId}`);
  }
}

console.log(`OK: proof layer validated (${skills.length} skills, ${agents.length} agents, ${promoted.length} promoted candidates)`);
