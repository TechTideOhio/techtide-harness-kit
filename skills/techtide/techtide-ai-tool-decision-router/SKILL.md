---
name: techtide-ai-tool-decision-router
description: "Route development work to Cursor, Claude Code, Codex, Lovable, v0, Replit, or a human approval lane based on scope, blast radius, context size, and verification needs. Use when an agent needs Alex Cinovoj / TechTide live-coding patterns, tool routing, guarded prototype-to-production workflows, or cross-harness prompt/skill adapters."
allowed-tools: Read Grep Glob Bash Edit Write
metadata:
  author: "Alex Cinovoj / TechTide"
  version: "0.1.0"
  updated: "2026-05-17"
  category: ai
  lifecycle: stable
  execution_tier: static-review
  required_egress: []
  requires_credentials: []
  output_format: guarded-workflow-brief
---

# TechTide Tool Decision Router

Route development work to Cursor, Claude Code, Codex, Lovable, v0, Replit, or a human approval lane based on scope, blast radius, context size, and verification needs.

## Source Pattern

This skill is distilled from sanitized Alex Cinovoj / TechTide local workflow patterns. Load `references/source-patterns.md` when you need the source anchors and extraction rationale. Load `references/adapter-map.md` when preparing Cursor, Kiro, Lovable, v0, or Replit companion outputs.

## Workflow

1. Classify the request as quick edit, multi-file implementation, prototype, UI generation, deployable app, research, or risky operation.
2. Choose Cursor for fast local editing and single-file iteration, Claude Code or Codex for multi-file reasoning and validation, Lovable/v0/Replit for prototype surfaces, and human approval for risky changes.
3. State the selected tool lane and the reason in one sentence before acting.
4. Define the smallest validation loop that proves the work, including tests, screenshots, scans, or manual review.
5. Escalate to a stronger lane when the task crosses repository, security, data, or production boundaries.

## Output Contract

Return a concise brief with these fields:

- tool lane
- reason
- handoff prompt
- validation loop
- approval gate
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
