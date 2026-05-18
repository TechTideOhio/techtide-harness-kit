---
name: techtide-agent-autopsy-report
description: "Perform post-run analysis of failed or risky agent work by reconstructing goal, context, tool calls, failure mode, missing guardrails, and preventive skill updates. Use when an agent needs Alex Cinovoj / TechTide live-coding patterns, tool routing, guarded prototype-to-production workflows, or cross-harness prompt/skill adapters."
allowed-tools: Read Grep Glob Bash Edit Write
metadata:
  author: "Alex Cinovoj / TechTide"
  version: "0.1.0"
  updated: "2026-05-17"
  category: observability
  lifecycle: stable
  execution_tier: static-review
  required_egress: []
  requires_credentials: []
  output_format: guarded-workflow-brief
---

# TechTide Agent Autopsy Report

Perform post-run analysis of failed or risky agent work by reconstructing goal, context, tool calls, failure mode, missing guardrails, and preventive skill updates.

## Source Pattern

This skill is distilled from sanitized Alex Cinovoj / TechTide local workflow patterns. Load `references/source-patterns.md` when you need the source anchors and extraction rationale. Load `references/adapter-map.md` when preparing Cursor, Kiro, Lovable, v0, or Replit companion outputs.

## Workflow

1. State the intended outcome and the actual outcome without blame.
2. Reconstruct the context, assumptions, tool calls, diffs, logs, and user interruptions that mattered.
3. Classify the failure as context loss, tool misuse, validation gap, unsafe autonomy, prompt ambiguity, or external dependency.
4. Identify the earliest practical detection point.
5. Produce a patch, test, rule, or skill update that would prevent recurrence.

## Output Contract

Return a concise brief with these fields:

- autopsy report
- root cause
- detection point
- prevention patch
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
