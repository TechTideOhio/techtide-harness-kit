---
name: techtide-lovable-build-loop-operator
description: "Operate the Lovable build loop from prompt setup through scaffold, iteration, preview verification, export, and repo handoff while keeping app output inspectable. Use when an agent needs Alex Cinovoj / TechTide live-coding patterns, tool routing, guarded prototype-to-production workflows, or cross-harness prompt/skill adapters."
allowed-tools: Read Grep Glob Bash Edit Write
metadata:
  author: "Alex Cinovoj / TechTide"
  version: "0.1.0"
  updated: "2026-05-17"
  category: delivery
  lifecycle: stable
  execution_tier: static-review
  required_egress: []
  requires_credentials: []
  output_format: guarded-workflow-brief
---

# TechTide Lovable Build Loop Operator

Operate the Lovable build loop from prompt setup through scaffold, iteration, preview verification, export, and repo handoff while keeping app output inspectable.

## Source Pattern

This skill is distilled from sanitized Alex Cinovoj / TechTide local workflow patterns. Load `references/source-patterns.md` when you need the source anchors and extraction rationale. Load `references/adapter-map.md` when preparing Cursor, Kiro, Lovable, v0, or Replit companion outputs.

## Workflow

1. Prepare one concise build prompt with user goal, stack, pages, data model, states, and non-goals.
2. Let Lovable scaffold, then wait for task completion before judging the result.
3. Verify the preview by route, viewport, console, and visible app state instead of trusting the tool summary.
4. Use focused follow-up prompts for errors, missing dependencies, auth bypasses, and design token corrections.
5. Export or mirror the result into a normal repo before treating it as production candidate code.

## Output Contract

Return a concise brief with these fields:

- Lovable prompt
- iteration log
- verification notes
- handoff checklist
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
