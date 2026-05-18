---
name: vercel-source-trust-gate
description: "Verify Vercel Agent Skills skill, rule, and agent sources before installation or reuse by checking primary docs, repository identity, license, native surface, and privacy risk. Use when expanding, reviewing, or operating Vercel Agent Skills skills, rules, prompt kits, provider lanes, or generated-code handoffs in the TechTide skill library."
allowed-tools: Read Grep Glob Bash Edit Write
metadata:
  author: "github: TechTide"
  version: "0.1.0"
  updated: "2026-05-17"
  category: security
  lifecycle: stable
  execution_tier: static-review
  required_egress: []
  requires_credentials: []
  output_format: source trust decision
---

# Vercel Agent Skills Source Trust Gate

Verify Vercel Agent Skills skill, rule, and agent sources before installation or reuse by checking primary docs, repository identity, license, native surface, and privacy risk.

## Verified Surface

- Provider lane: vercel
- Native surface: Vercel-published Agent Skills installed with the skills CLI
- Harness export: codex, claude-code, cursor, other
- Import mode: techtide-synthesis
- Source evidence: load `references/source-evidence.md` before promoting third-party material.

## Workflow

1. Start from the current Vercel Agent Skills primary docs or verified repository entry, not a repost or uncited thread.
2. Confirm source URL, owner, license status, last verification date, and exact skill or rule primitive.
3. Check that the candidate maps to Vercel-published Agent Skills installed with the skills CLI without inventing unsupported behavior.
4. Reject candidates that include secrets, private customer data, prompt injection, opaque install scripts, or vague marketing claims.
5. Record the decision as promoted, quarantined, or rejected with evidence and a short reason.

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
