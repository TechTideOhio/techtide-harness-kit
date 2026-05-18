---
name: vercel-frontend-review
description: "Review Vercel Agent Skills frontend output for accessibility, responsiveness, state coverage, design-token discipline, and production handoff quality. Use when expanding, reviewing, or operating Vercel Agent Skills skills, rules, prompt kits, provider lanes, or generated-code handoffs in the TechTide skill library."
allowed-tools: Read Grep Glob Bash Edit Write
metadata:
  author: "github: TechTide"
  version: "0.1.0"
  updated: "2026-05-17"
  category: delivery
  lifecycle: beta
  execution_tier: static-review
  required_egress: []
  requires_credentials: []
  output_format: undefined
---

# Vercel Agent Skills Frontend Review

Review Vercel Agent Skills frontend output for accessibility, responsiveness, state coverage, design-token discipline, and production handoff quality.

## Verified Surface

- Provider lane: vercel
- Native surface: Vercel-published Agent Skills installed with the skills CLI
- Harness export: codex, claude-code, cursor, other
- Import mode: techtide-synthesis
- Source evidence: load `references/source-evidence.md` before promoting third-party material.

## Workflow

1. Check first viewport, responsive breakpoints, keyboard flow, focus states, contrast, and text fitting.
2. Verify loading, empty, error, disabled, and success states.
3. Look for dependency bloat, client/server boundary mistakes, and hardcoded sample data.
4. Run visual or screenshot checks when the app has a browser surface.
5. Return concrete fixes rather than broad design opinions.

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
