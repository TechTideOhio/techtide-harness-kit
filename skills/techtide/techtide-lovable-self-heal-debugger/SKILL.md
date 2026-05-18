---
name: techtide-lovable-self-heal-debugger
description: "Diagnose Lovable app failures with a repeatable wait, inspect, isolate, prompt, and verify loop for dependency, iframe, auth, routing, and preview-cache issues. Use when an agent needs Alex Cinovoj / TechTide live-coding patterns, tool routing, guarded prototype-to-production workflows, or cross-harness prompt/skill adapters."
allowed-tools: Read Grep Glob Bash Edit Write
metadata:
  author: "Alex Cinovoj / TechTide"
  version: "0.1.0"
  updated: "2026-05-17"
  category: resilience
  lifecycle: stable
  execution_tier: static-review
  required_egress: []
  requires_credentials: []
  output_format: guarded-workflow-brief
---

# TechTide Lovable Self-Heal Debugger

Diagnose Lovable app failures with a repeatable wait, inspect, isolate, prompt, and verify loop for dependency, iframe, auth, routing, and preview-cache issues.

## Source Pattern

This skill is distilled from sanitized Alex Cinovoj / TechTide local workflow patterns. Load `references/source-patterns.md` when you need the source anchors and extraction rationale. Load `references/adapter-map.md` when preparing Cursor, Kiro, Lovable, v0, or Replit companion outputs.

## Workflow

1. Capture the visible failure, console symptom, affected route, and last prompt before changing anything.
2. Wait for Lovable's own auto-fix cycle when it is active, then refresh the preview before escalating.
3. Separate generation failures from preview iframe, browser extension, package, and auth-guard failures.
4. Send a narrow repair prompt that names the symptom, likely cause, file area, and expected proof.
5. Verify the fix in preview and record the pattern for future prompt hardening.

## Output Contract

Return a concise brief with these fields:

- failure classification
- repair prompt
- verification evidence
- lesson learned
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
