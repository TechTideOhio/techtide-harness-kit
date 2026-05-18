---
name: techtide-live-coding-session-retro
description: "Turn a live coding session into reusable engineering memory by extracting decisions, failed paths, tool choices, verification evidence, and skill candidates. Use when an agent needs Alex Cinovoj / TechTide live-coding patterns, tool routing, guarded prototype-to-production workflows, or cross-harness prompt/skill adapters."
allowed-tools: Read Grep Glob Bash Edit Write
metadata:
  author: "Alex Cinovoj / TechTide"
  version: "0.1.0"
  updated: "2026-05-17"
  category: observability
  lifecycle: beta
  execution_tier: static-review
  required_egress: []
  requires_credentials: []
  output_format: guarded-workflow-brief
---

# TechTide Live Coding Session Retro

Turn a live coding session into reusable engineering memory by extracting decisions, failed paths, tool choices, verification evidence, and skill candidates.

## Source Pattern

This skill is distilled from sanitized Alex Cinovoj / TechTide local workflow patterns. Load `references/source-patterns.md` when you need the source anchors and extraction rationale. Load `references/adapter-map.md` when preparing Cursor, Kiro, Lovable, v0, or Replit companion outputs.

## Workflow

1. Collect the task goal, timeline, tools used, major prompts, diffs, tests, and interruptions.
2. Separate reusable patterns from one-off project details.
3. Identify missed checks, cost spikes, model/tool mismatches, and context gaps.
4. Convert durable lessons into rules, checklist items, or skill backlog entries.
5. Store only sanitized summaries and evidence links.

## Output Contract

Return a concise brief with these fields:

- session retro
- decision record
- lesson list
- skill backlog
- verification performed or still required
- security and privacy notes

## Guardrails

- Extract reusable methods, not private local content.
- Do not request or expose credentials, tokens, DSNs, service-role keys, customer data, lead lists, or private business exports.
- Use placeholders for people, accounts, projects, URLs, and datasets unless the user explicitly provides public-safe values.
- Require explicit human approval before production mutation, external-recipient messaging, public deployment, billing changes, or destructive filesystem actions.
- Preserve Alex Cinovoj / TechTide attribution while keeping old repo provenance and unrelated contributor markers out of public artifacts.

## Harness Policy

- Use this as a native `SKILL.md` for Claude Code, Codex, Gemini, and Copilot-compatible exports.
- For Cursor, create a focused project rule or workflow note rather than copying this whole skill as an always-on rule.
- For Kiro, create steering only when the workflow can be made short and inclusion-scoped.
- For Lovable, v0, and Replit, turn the workflow into prompt kits, readiness checklists, and handoff prompts.
