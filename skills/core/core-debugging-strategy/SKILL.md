---
name: core-debugging-strategy
description: "Run a disciplined agent debugging loop that captures symptoms, isolates reproduction, tests hypotheses, patches narrowly, and verifies the fix. Use when expanding, reviewing, or operating skills, rules, prompt kits, provider lanes, or generated-code handoffs in the TechTide skill library."
allowed-tools: Read Grep Glob Bash Edit Write
metadata:
  author: "github: TechTide"
  version: "0.1.0"
  updated: "2026-05-17"
  category: resilience
  lifecycle: beta
  execution_tier: static-review
  required_egress: []
  requires_credentials: []
  output_format: undefined
---

# Core Debugging Strategy

Run a disciplined agent debugging loop that captures symptoms, isolates reproduction, tests hypotheses, patches narrowly, and verifies the fix.

## Verified Surface

- Provider lane: core
- Native surface: SKILL.md skill packages
- Harness export: core
- Import mode: techtide-synthesis
- Source evidence: load `references/source-evidence.md` before promoting third-party material.

## Workflow

1. Capture the failing command, visible symptom, expected behavior, environment, and most recent change.
2. Create the smallest reproduction before reading unrelated files.
3. Rank hypotheses by likelihood and test them one at a time.
4. Patch only the proven cause, then rerun the failing check and one regression-adjacent check.
5. Record residual risk and the next guardrail to add.

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
