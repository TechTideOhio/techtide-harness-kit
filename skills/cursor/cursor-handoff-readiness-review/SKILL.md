---
name: cursor-handoff-readiness-review
description: "Review Cursor session output before it enters the durable TechTide repo by checking provenance, tests, security, deployment boundaries, and rollback expectations. Use when expanding, reviewing, or operating Cursor skills, rules, prompt kits, provider lanes, or generated-code handoffs in the TechTide skill library."
allowed-tools: Read Grep Glob Bash Edit Write
metadata:
  author: "github: TechTide"
  version: "0.1.0"
  updated: "2026-05-17"
  category: architecture
  lifecycle: beta
  execution_tier: static-review
  required_egress: []
  requires_credentials: []
  output_format: handoff readiness report
---

# Cursor Handoff Readiness Review

Review Cursor session output before it enters the durable TechTide repo by checking provenance, tests, security, deployment boundaries, and rollback expectations.

## Verified Surface

- Provider lane: cursor
- Native surface: Cursor project rules in .cursor/rules, not native SKILL.md
- Harness export: cursor
- Import mode: techtide-synthesis
- Source evidence: load `references/source-evidence.md` before promoting third-party material.

## Workflow

1. Inventory changed files, prompts, source references, and assumptions from the Cursor session.
2. Check mocks, hardcoded placeholders, broad dependencies, missing auth, exposed configuration, and untested states.
3. Require a minimal build, test, and smoke proof before promotion into the repo or marketplace.
4. Document what remains prototype-only and what is safe for production hardening.
5. Reject claims that Cursor has a native SKILL.md surface unless current Cursor docs verify it.

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
