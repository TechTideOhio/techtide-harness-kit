---
name: gemini-interactions-api
description: "Design Gemini interaction flows with explicit conversation state, tool boundaries, safety review, and reproducible request traces. Use when expanding, reviewing, or operating Gemini CLI skills, rules, prompt kits, provider lanes, or generated-code handoffs in the TechTide skill library."
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
  output_format: gemini-interactions-api brief
---

# Gemini Interactions API

Design Gemini interaction flows with explicit conversation state, tool boundaries, safety review, and reproducible request traces.

## Verified Surface

- Provider lane: gemini
- Native surface: Gemini CLI SKILL.md packages
- Harness export: gemini
- Import mode: direct-import-normalized
- Source evidence: load `references/source-evidence.md` before promoting third-party material.

## Workflow

1. Map user intents, conversation state, tool calls, and completion criteria.
2. Separate system, developer, user, and tool context in the implementation plan.
3. Guard against prompt injection, stale state, and unapproved tool mutation.
4. Log redacted request metadata and verification evidence, not raw private prompts.
5. Test happy path, refusal path, tool failure, and recovery behavior.

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
