---
name: v0-security-review
description: "Review v0 code changes for auth, authorization, injection, secrets, dependency risk, and unsafe defaults. Use when expanding, reviewing, or operating v0 skills, rules, prompt kits, provider lanes, or generated-code handoffs in the TechTide skill library."
allowed-tools: Read Grep Glob Bash Edit Write
metadata:
  author: "github: TechTide"
  version: "0.1.0"
  updated: "2026-05-17"
  category: security
  lifecycle: beta
  execution_tier: static-review
  required_egress: []
  requires_credentials: []
  output_format: undefined
---

# v0 Security Review

Review v0 code changes for auth, authorization, injection, secrets, dependency risk, and unsafe defaults.

## Verified Surface

- Provider lane: v0
- Native surface: v0 and Vercel skill-compatible UI generation workflows
- Harness export: other
- Import mode: techtide-synthesis
- Source evidence: load `references/source-evidence.md` before promoting third-party material.

## Workflow

1. Inventory trust boundaries, inputs, outputs, credentials, network calls, and mutable resources.
2. Check auth, authorization, input validation, output encoding, CORS, storage, and logging.
3. Search for hardcoded credentials, broad tokens, mock bypasses, and sensitive data exposure.
4. Classify findings by exploitability and blast radius.
5. Require proof for every claimed fix.

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
