---
name: core-native-packaging-bridge
description: "Translate TechTide-authored workflows into the documented packaging surface without pretending every agent uses the same activation model. Use when expanding, reviewing, or operating skills, rules, prompt kits, provider lanes, or generated-code handoffs in the TechTide skill library."
allowed-tools: Read Grep Glob Bash Edit Write
metadata:
  author: "github: TechTide"
  version: "0.1.0"
  updated: "2026-05-17"
  category: delivery
  lifecycle: stable
  execution_tier: static-review
  required_egress: []
  requires_credentials: []
  output_format: provider packaging brief
---

# Core Native Packaging Bridge

Translate TechTide-authored workflows into the documented packaging surface without pretending every agent uses the same activation model.

## Verified Surface

- Provider lane: core
- Native surface: SKILL.md skill packages
- Harness export: core
- Import mode: techtide-synthesis
- Source evidence: load `references/source-evidence.md` before promoting third-party material.

## Workflow

1. Read the target docs and identify the native primitive before writing content.
2. Use a focused SKILL.md with concise frontmatter, optional references, and deterministic scripts only when needed.
3. Keep activation descriptions precise, short, and tied to concrete task triggers.
4. Move long examples, commands, and checklists into references so the core instruction stays lean.
5. Run catalog validation and quarantine any package whose provider semantics are uncertain.

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
