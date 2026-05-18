#!/usr/bin/env node
/**
 * Print a deterministic enterprise mission demo.
 *
 * The demo is intentionally read-only: it shows the initialize -> route ->
 * execute -> verify -> evidence loop without touching external systems.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const missions = JSON.parse(fs.readFileSync(path.join(repoRoot, "catalog/enterprise-missions.json"), "utf8")).missions;
const trust = JSON.parse(fs.readFileSync(path.join(repoRoot, "catalog/skill-trust.json"), "utf8"));

const selected = missions.find((mission) => mission.id === (process.argv[2] ?? "govern")) ?? missions[0];
const trustById = new Map(trust.skills.map((entry) => [entry.id, entry]));

console.log(`# TechTide Enterprise Mission Demo: ${selected.name}`);
console.log("");
console.log(`Initialize: ${selected.summary}`);
console.log(`Route: mission=${selected.id}, risk=${selected.risk_tier}`);
console.log("");
console.log("Execute:");
for (const skillId of selected.recommended_skills) {
  const skillTrust = trustById.get(skillId);
  console.log(`- ${skillId}`);
  console.log(`  approvals: ${(skillTrust?.approval_gates ?? selected.approval_gates).join("; ")}`);
  console.log(`  network: ${skillTrust?.network_egress?.default ?? "deny"} by default`);
}
console.log("");
console.log("Verify:");
for (const check of selected.eval_guidance) {
  console.log(`- ${check}`);
}
console.log("");
console.log("Evidence:");
console.log("- TRUST.md");
console.log("- CONTROL-MAPPING.md");
console.log("- EVALS.md");
console.log("- catalog/skill-trust.json");
