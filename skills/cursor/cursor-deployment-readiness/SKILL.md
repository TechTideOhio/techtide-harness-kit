---
name: cursor-deployment-readiness
description: "Use Cursor to decide whether an app, feature, or prototype is ready for deployment, rollback, and operational ownership. Use when expanding, reviewing, or operating Cursor skills, rules, prompt kits, provider lanes, or generated-code handoffs in the TechTide skill library."
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

# Cursor Deployment Readiness

Use Cursor to decide whether an app, feature, or prototype is ready for deployment, rollback, and operational ownership.

## Verified Surface

- Provider lane: cursor
- Native surface: Cursor project rules in .cursor/rules, not native SKILL.md
- Harness export: cursor
- Import mode: techtide-synthesis
- Source evidence: load `references/source-evidence.md` before promoting third-party material.

## Workflow

1. Confirm build, test, lint, smoke, and environment checks are green or explicitly waived.
2. Verify secrets, migrations, feature flags, observability, and rollback steps.
3. Check user-facing flows at the smallest practical production-like boundary.
4. Block deploys with unreviewed auth, payment, destructive data, or external-recipient writes.
5. Produce a go, no-go, or conditional-go recommendation with evidence.

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
