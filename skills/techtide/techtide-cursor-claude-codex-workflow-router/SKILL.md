---
name: techtide-cursor-claude-codex-workflow-router
description: "Coordinate Cursor, Claude Code, and Codex across a coding task so inline edits, repo reasoning, tests, and final review happen in the right lane. Use when an agent needs Alex Cinovoj / TechTide live-coding patterns, tool routing, guarded prototype-to-production workflows, or cross-harness prompt/skill adapters."
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

# TechTide Cursor Claude Codex Workflow Router

Coordinate Cursor, Claude Code, and Codex across a coding task so inline edits, repo reasoning, tests, and final review happen in the right lane.

## Source Pattern

This skill is distilled from sanitized Alex Cinovoj / TechTide local workflow patterns. Load `references/source-patterns.md` when you need the source anchors and extraction rationale. Load `references/adapter-map.md` when preparing Cursor, Kiro, Lovable, v0, or Replit companion outputs.

## Workflow

1. Use Cursor for narrow IDE-local edits, symbol-aware refactors, and quick UI or type fixes.
2. Use Claude Code or Codex for repository-wide exploration, multi-file implementation, test repair, and safety review.
3. Keep one source of truth for plan, assumptions, and validation so tools do not fork the task.
4. After cross-tool work, run tests and scan the diff from a neutral reviewer stance.
5. Record tool-specific discoveries as reusable rules, not one-off chat memory.

## Output Contract

Return a concise brief with these fields:

- tool split
- handoff context
- validation transcript
- rule candidate
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
