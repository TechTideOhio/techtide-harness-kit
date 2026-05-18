---
name: vercel-repo-reconnaissance
description: "Use Vercel Agent Skills to map an unfamiliar repository before implementation by finding entrypoints, commands, ownership boundaries, risks, and tests. Use when expanding, reviewing, or operating Vercel Agent Skills skills, rules, prompt kits, provider lanes, or generated-code handoffs in the TechTide skill library."
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
  output_format: undefined
---

# Vercel Agent Skills Repo Reconnaissance

Use Vercel Agent Skills to map an unfamiliar repository before implementation by finding entrypoints, commands, ownership boundaries, risks, and tests.

## Verified Surface

- Provider lane: vercel
- Native surface: Vercel-published Agent Skills installed with the skills CLI
- Harness export: codex, claude-code, cursor, other
- Import mode: techtide-synthesis
- Source evidence: load `references/source-evidence.md` before promoting third-party material.

## Workflow

1. Read package manifests, root guidance, tests, CI, and likely entrypoints first.
2. Identify framework, runtime, data stores, deployment path, and build artifacts.
3. Find the smallest files that govern the requested behavior.
4. Record unknowns that require live verification instead of guessing.
5. Return a compact implementation map with risk notes.

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
