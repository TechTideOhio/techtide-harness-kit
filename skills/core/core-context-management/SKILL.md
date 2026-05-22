---
name: core-context-management
description: "Keep agent sessions from drifting by packaging concise project context, current state, decisions, and verification results. Use when expanding, reviewing, or operating skills, rules, prompt kits, provider lanes, or generated-code handoffs in the TechTide skill library."
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

# Core Context Management

Keep agent sessions from drifting by packaging concise project context, current state, decisions, and verification results.

## Verified Surface

- Provider lane: core
- Native surface: SKILL.md skill packages
- Harness export: core
- Import mode: techtide-synthesis
- Source evidence: load `references/source-evidence.md` before promoting third-party material.

## Workflow

1. Separate durable project rules from temporary task state.
2. Summarize architecture, commands, risks, and current decisions in compact handoff form.
3. Refresh context from files before trusting chat memory.
4. Prune obsolete assumptions and stale tool claims.
5. Use file-based state only when it helps future agents resume safely.

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
