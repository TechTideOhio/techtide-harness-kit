---
name: vercel-prompt-hardening
description: "Harden Vercel Agent Skills prompts so the work has explicit scope, constraints, data states, guardrails, and validation evidence. Use when expanding, reviewing, or operating Vercel Agent Skills skills, rules, prompt kits, provider lanes, or generated-code handoffs in the TechTide skill library."
allowed-tools: Read Grep Glob Bash Edit Write
metadata:
  author: "github: TechTide"
  version: "0.1.0"
  updated: "2026-05-17"
  category: ai
  lifecycle: beta
  execution_tier: static-review
  required_egress: []
  requires_credentials: []
  output_format: undefined
---

# Vercel Agent Skills Prompt Hardening

Harden Vercel Agent Skills prompts so the work has explicit scope, constraints, data states, guardrails, and validation evidence.

## Verified Surface

- Provider lane: vercel
- Native surface: Vercel-published Agent Skills installed with the skills CLI
- Harness export: codex, claude-code, cursor, other
- Import mode: techtide-synthesis
- Source evidence: load `references/source-evidence.md` before promoting third-party material.

## Workflow

1. Rewrite vague intent into goal, non-goals, target files, constraints, and acceptance checks.
2. Name risky operations that require approval before execution.
3. Specify data shapes, empty states, error states, and rollback requirements.
4. Ask the agent to state assumptions and verification steps before finalizing.
5. Reject outputs that invent APIs, credentials, or unsupported platform behavior.

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
