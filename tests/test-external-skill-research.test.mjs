#!/usr/bin/env node
/**
 * Unit tests for verified external skill research guardrails.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  classifyExternalSourceCandidate,
  dedupeCandidates,
  inventorySourceTree,
  providerSurfaceFor,
} from "../scripts/external-skill-research.mjs";

const safeKiroCandidate = {
  provider: "kiro",
  url: "https://kiro.dev/docs/skills/",
  license: "documentation-reference-only",
  source_confirms_native: true,
  summary: `
    Kiro skills provide a verified native skill workflow with source evidence,
    license posture, security guardrails, validation steps, and testable
    packaging rules for workspace skill promotion. The candidate includes
    repeatable activation guidance, privacy review, human approval boundaries,
    source verification, and installation checks before any team reuse.
  `,
};

function testAcceptsVerifiedOfficialNativeSource() {
  const result = classifyExternalSourceCandidate(safeKiroCandidate);
  assert.equal(result.status, "accepted");
  assert.equal(result.validation_status, "candidate-valid");
  assert.equal(result.provider, "kiro");
  assert.match(result.native_skill_surface, /\.kiro\/skills/);
}

function testRejectsFakeRepository() {
  const result = classifyExternalSourceCandidate({
    provider: "codex",
    url: "https://not-real.example.invalid/skills",
    license: "MIT",
    summary: "workflow verification license source guardrail security skill test",
  });
  assert.equal(result.status, "rejected");
  assert.equal(result.validation_status, "rejected-source-unreachable");
}

function testRejectsSensitivePrivateData() {
  const result = classifyExternalSourceCandidate({
    provider: "claude",
    url: "https://code.claude.com/docs/en/skills",
    license: "documentation-reference-only",
    summary: `
      This skill workflow has verification license source guardrail security
      test material but includes token = "redacted_private_test_value".
    `,
  });
  assert.equal(result.status, "rejected");
  assert.equal(result.validation_status, "rejected-sensitive");
}

function testRejectsMissingLicense() {
  const result = classifyExternalSourceCandidate({
    provider: "codex",
    url: "https://github.com/ComposioHQ/awesome-codex-skills",
    summary: "workflow verification license source guardrail security skill test",
  });
  assert.equal(result.status, "rejected");
  assert.equal(result.validation_status, "rejected-missing-license");
}

function testAcceptsDirectNormalizedImport() {
  const result = classifyExternalSourceCandidate({
    provider: "gemini",
    source_id: "google-gemini-skills-repo",
    source_confirms_native: true,
    summary: `
      Gemini API development skill workflow with source evidence, license
      review, security guardrail, request validation, response parsing, tests,
      deployment review, privacy review, approval boundary, provider surface
      mapping, error handling, retry behavior, and reproducible verification
      steps for API integration work.
    `,
  });
  assert.equal(result.status, "accepted");
  assert.equal(result.license, "Apache-2.0");
}

function testQuarantinesDuplicate() {
  const result = classifyExternalSourceCandidate({
    provider: "gemini",
    url: "https://github.com/google-gemini/gemini-skills",
    license: "Apache-2.0",
    duplicate_of_existing: "gemini-source-trust-gate",
    summary: "workflow verification license source guardrail security skill test with enough words to pass quality checks",
  });
  assert.equal(result.status, "quarantined");
  assert.equal(result.validation_status, "quarantined-duplicate");
}

function testCursorMapsToRulesNotNativeSkill() {
  const surface = providerSurfaceFor("cursor");
  assert.equal(surface.rules_first, true);
  assert.match(surface.native_skill_surface, /rules/i);

  const result = classifyExternalSourceCandidate({
    provider: "cursor",
    url: "https://docs.cursor.com/context/rules",
    license: "documentation-reference-only",
    claimed_native_skill: true,
    summary: "workflow verification license source guardrail security skill test with enough words to pass quality checks",
  });
  assert.equal(result.status, "rejected");
  assert.equal(result.validation_status, "rejected-unsupported-native-skill-surface");
}

function testNativePlatformsRequirePrimarySourceConfirmation() {
  for (const provider of ["kiro", "lovable", "replit", "v0", "vercel"]) {
    const surface = providerSurfaceFor(provider);
    assert.ok(surface.native_skill_surface.length > 10);
    const result = classifyExternalSourceCandidate({
      provider,
      url: surface.docs[0],
      license: "documentation-reference-only",
      summary: "workflow verification license source guardrail security skill test with enough words to pass quality checks",
    });
    assert.equal(result.status, "rejected");
    assert.equal(result.validation_status, "rejected-unverified-native-skill-surface");
  }
}

function testDeduplicatesCandidateFingerprints() {
  const candidates = dedupeCandidates([
    {
      id: "first",
      provider: "claude",
      name: "Debugging Strategy",
      category: "resilience",
      summary: "A repeated workflow for source verification, guardrail review, security test, and debugging.",
    },
    {
      id: "second",
      provider: "claude",
      name: "Debugging Strategy",
      category: "resilience",
      summary: "A repeated workflow for source verification, guardrail review, security test, and debugging.",
    },
  ]);
  assert.equal(candidates[1].duplicate_of_existing, "first");
}

function testInventoriesSourceTree() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "external-skill-inventory-"));
  try {
    fs.mkdirSync(path.join(root, "skills", "demo"), { recursive: true });
    fs.writeFileSync(path.join(root, "skills", "demo", "SKILL.md"), "---\nname: demo\n---\n", "utf8");
    fs.mkdirSync(path.join(root, ".cursor", "rules"), { recursive: true });
    fs.writeFileSync(path.join(root, ".cursor", "rules", "demo.mdc"), "description: demo\n", "utf8");
    fs.mkdirSync(path.join(root, "node_modules", "ignored"), { recursive: true });
    fs.writeFileSync(path.join(root, "node_modules", "ignored", "SKILL.md"), "ignored", "utf8");
    const inventory = inventorySourceTree(root, { id: "fixture", provider: "claude" });
    assert.equal(inventory.length, 2);
    assert.ok(inventory.some((item) => item.detector === "skill-md"));
    assert.ok(inventory.some((item) => item.detector === "cursor-rule"));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

for (const test of [
  testAcceptsVerifiedOfficialNativeSource,
  testRejectsFakeRepository,
  testRejectsSensitivePrivateData,
  testRejectsMissingLicense,
  testAcceptsDirectNormalizedImport,
  testQuarantinesDuplicate,
  testCursorMapsToRulesNotNativeSkill,
  testNativePlatformsRequirePrimarySourceConfirmation,
  testDeduplicatesCandidateFingerprints,
  testInventoriesSourceTree,
]) {
  test();
  console.log(`OK: ${test.name}`);
}
