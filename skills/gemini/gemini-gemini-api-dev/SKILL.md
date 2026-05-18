---
name: gemini-gemini-api-dev
description: "Build Gemini API integrations with verified source evidence, environment separation, request/response validation, safety settings, and testable examples. Use when expanding, reviewing, or operating Gemini CLI skills, rules, prompt kits, provider lanes, or generated-code handoffs in the TechTide skill library."
allowed-tools: Read Grep Glob Bash Edit Write
metadata:
  author: "github: TechTide"
  version: "0.1.0"
  updated: "2026-05-17"
  category: ai
  lifecycle: stable
  execution_tier: static-review
  required_egress: []
  requires_credentials: []
  output_format: gemini-api-development brief
---

# Gemini API Development

Build Gemini API integrations with verified source evidence, environment separation, request/response validation, safety settings, and testable examples.

## Verified Surface

- Provider lane: gemini
- Native surface: Gemini CLI SKILL.md packages
- Harness export: gemini
- Import mode: direct-import-normalized
- Source evidence: load `references/source-evidence.md` before promoting third-party material.

## Workflow

1. Confirm the target Gemini API capability, model family, auth method, and runtime.
2. Keep API keys in environment variables and document only variable names.
3. Validate request payloads, response parsing, retries, timeouts, and error handling.
4. Add small examples or tests that can run without exposing production data.
5. Review safety, logging, and rate-limit behavior before deployment.

## Output Contract

Return:

- provider lane and native surface
- source evidence used
- promotion decision or operating recommendation
- security and privacy notes
- verification still required

## Guardrails

- Keep third-party source bodies out of public artifacts unless direct import has clean license, attribution, and manual review.
- Do not use star counts, popularity, screenshots, or social posts as the sole evidence for promotion.
- Do not install or execute unreviewed external scripts as part of source research.
- Quarantine missing licenses, unclear ownership, vague prompt packs, duplicate skill packs, and unsupported native-surface claims.
- Preserve Alex Cinovoj / TechTide ownership for TechTide-authored synthesis while citing third-party sources as references.
