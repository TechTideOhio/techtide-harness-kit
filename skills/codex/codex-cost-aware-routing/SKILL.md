---
name: codex-cost-aware-routing
description: "Route OpenAI Codex and companion tool work by task risk, context size, model cost, latency, and verification needs. Use when expanding, reviewing, or operating OpenAI Codex skills, rules, prompt kits, provider lanes, or generated-code handoffs in the TechTide skill library."
allowed-tools: Read Grep Glob Bash Edit Write
metadata:
  author: "github: TechTide"
  version: "0.1.0"
  updated: "2026-05-17"
  category: finops
  lifecycle: beta
  execution_tier: static-review
  required_egress: []
  requires_credentials: []
  output_format: undefined
---

# OpenAI Codex Cost Aware Routing

Route OpenAI Codex and companion tool work by task risk, context size, model cost, latency, and verification needs.

## Verified Surface

- Provider lane: codex
- Native surface: Codex-compatible SKILL.md packages
- Harness export: codex
- Import mode: techtide-synthesis
- Source evidence: load `references/source-evidence.md` before promoting third-party material.

## Workflow

1. Classify the task as quick edit, multi-file change, research, prototype, or risky operation.
2. Use cheaper or narrower tools for low-risk local edits and stronger reasoning for cross-cutting decisions.
3. Avoid loading large context until the target files and question are known.
4. Escalate when security, production, data, or billing impact appears.
5. Record the chosen lane and validation loop.

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
