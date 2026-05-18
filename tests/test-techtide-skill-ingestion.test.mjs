#!/usr/bin/env node
/**
 * Unit tests for the Alex Cinovoj / TechTide skill ingestion guardrails.
 */

import assert from "node:assert/strict";
import { mapHarnessTargets, scoreCandidate } from "../scripts/techtide-skill-ingestion.mjs";

const safeCandidate = {
  name: "techtide-safe-workflow-candidate",
  source_path: "$TECHTIDE_ROOT/Claude/LESSONS.md",
  intended_harnesses: ["claude-code", "codex", "cursor", "kiro", "lovable", "v0", "replit"],
  summary: "Reusable prompt and validation workflow from Alex Cinovoj / TechTide live coding.",
  text: `
    This workflow captures a reusable agent pattern for Lovable, Cursor, Claude,
    and Codex. It describes the prompt, validation loop, security guardrail,
    handoff checklist, test evidence, approval step, and agent routing rule
    without copying any raw private project data. It is reproducible because
    another agent can follow the steps and verify the output.
  `,
};

const sensitiveCandidate = {
  name: "techtide-sensitive-candidate",
  source_path: "$TECHTIDE_ROOT/Docs/private-note.md",
  intended_harnesses: ["claude-code"],
  text: `
    Workflow for production deployment.
    api_key = "redacted_private_test_value"
    Contact person@example.test after deploy.
  `,
};

const vagueCandidate = {
  name: "techtide-vague-candidate",
  source_path: "$TECHTIDE_ROOT/Claude/IDEA.md",
  intended_harnesses: ["claude-code"],
  text: "Make agents better and use coding tools well.",
};

function testAcceptsSafeCuratedSource() {
  const result = scoreCandidate(safeCandidate);
  assert.equal(result.status, "accepted");
  assert.equal(result.validation_status, "candidate-valid");
  assert.equal(result.privacy_risk, "low");
  assert.equal(result.source_path, "$TECHTIDE_ROOT/Claude/LESSONS.md");
}

function testRejectsPrivateData() {
  const result = scoreCandidate(sensitiveCandidate);
  assert.equal(result.status, "rejected");
  assert.equal(result.validation_status, "rejected-sensitive");
  assert.equal(result.privacy_risk, "high");
  assert.match(result.reason, /credential-assignment|email/);
}

function testRejectsLowConfidencePattern() {
  const result = scoreCandidate(vagueCandidate);
  assert.equal(result.status, "rejected");
  assert.equal(result.validation_status, "rejected-low-confidence");
}

function testPreservesAlexTechTideAttribution() {
  const result = scoreCandidate(safeCandidate);
  assert.equal(result.skill_candidate.author, "Alex Cinovoj / TechTide");
  assert.equal(result.skill_candidate.provider, "techtide");
}

function testProducesSchemaValidCandidateBasics() {
  const result = scoreCandidate(safeCandidate);
  assert.match(result.skill_candidate.name, /^[a-z0-9][a-z0-9-]*$/);
  assert.match(result.skill_candidate.version, /^\d+\.\d+\.\d+$/);
}

function testMapsNonNativeToolsToAdapters() {
  const result = mapHarnessTargets(["claude-code", "codex", "gemini", "copilot", "cursor", "kiro", "lovable", "v0", "replit"]);
  assert.deepEqual(result.native_skill_harnesses, ["claude-code", "codex", "gemini", "copilot", "kiro"]);
  assert.deepEqual(result.companion_adapters, ["cursor", "lovable", "v0", "replit"]);
}

for (const test of [
  testAcceptsSafeCuratedSource,
  testRejectsPrivateData,
  testRejectsLowConfidencePattern,
  testPreservesAlexTechTideAttribution,
  testProducesSchemaValidCandidateBasics,
  testMapsNonNativeToolsToAdapters,
]) {
  test();
  console.log(`OK: ${test.name}`);
}
