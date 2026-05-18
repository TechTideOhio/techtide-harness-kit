---
name: vercel-mcp-tool-safety
description: "Review Vercel Agent Skills tool and MCP usage for credential scope, network egress, mutation risk, logging, and human approval gates. Use when expanding, reviewing, or operating Vercel Agent Skills skills, rules, prompt kits, provider lanes, or generated-code handoffs in the TechTide skill library."
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

# Vercel Agent Skills MCP Tool Safety

Review Vercel Agent Skills tool and MCP usage for credential scope, network egress, mutation risk, logging, and human approval gates.

## Verified Surface

- Provider lane: vercel
- Native surface: Vercel-published Agent Skills installed with the skills CLI
- Harness export: codex, claude-code, cursor, other
- Import mode: techtide-synthesis
- Source evidence: load `references/source-evidence.md` before promoting third-party material.

## Workflow

1. List each tool, host, credential class, filesystem path, and external mutation capability.
2. Classify operations as read-only, workspace-write, external-read, or external-mutate.
3. Require explicit approval for destructive filesystem, production, billing, messaging, or security changes.
4. Verify secrets are never echoed, logged, or written into public artifacts.
5. Document minimum privileges and safe fallback behavior.

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
