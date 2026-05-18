---
name: gemini-live-api-dev
description: "Build Gemini Live API experiences with streaming-state checks, connection recovery, media boundary review, and safe logging. Use when expanding, reviewing, or operating Gemini CLI skills, rules, prompt kits, provider lanes, or generated-code handoffs in the TechTide skill library."
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
  output_format: gemini-live-api-development brief
---

# Gemini Live API Development

Build Gemini Live API experiences with streaming-state checks, connection recovery, media boundary review, and safe logging.

## Verified Surface

- Provider lane: gemini
- Native surface: Gemini CLI SKILL.md packages
- Harness export: gemini
- Import mode: direct-import-normalized
- Source evidence: load `references/source-evidence.md` before promoting third-party material.

## Workflow

1. Define session lifecycle, streaming events, media inputs, and reconnection behavior.
2. Keep credentials and private media out of examples.
3. Validate event ordering, partial responses, cancellation, and backpressure.
4. Add observable health checks for connection, latency, and error states.
5. Run manual or automated smoke tests before handing off to production code.

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
