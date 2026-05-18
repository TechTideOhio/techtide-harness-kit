---
name: techtide-production-readiness-audit
description: "Audit rapidly built applications for production readiness across auth, secrets, data, tests, observability, rollback, deployment, and operational ownership. Use when an agent needs Alex Cinovoj / TechTide live-coding patterns, tool routing, guarded prototype-to-production workflows, or cross-harness prompt/skill adapters."
allowed-tools: Read Grep Glob Bash Edit Write
metadata:
  author: "Alex Cinovoj / TechTide"
  version: "0.1.0"
  updated: "2026-05-17"
  category: architecture
  lifecycle: stable
  execution_tier: static-review
  required_egress: []
  requires_credentials: []
  output_format: guarded-workflow-brief
---

# TechTide Production Readiness Audit

Audit rapidly built applications for production readiness across auth, secrets, data, tests, observability, rollback, deployment, and operational ownership.

## Source Pattern

This skill is distilled from sanitized Alex Cinovoj / TechTide local workflow patterns. Load `references/source-patterns.md` when you need the source anchors and extraction rationale. Load `references/adapter-map.md` when preparing Cursor, Kiro, Lovable, v0, or Replit companion outputs.

## Workflow

1. Inventory user flows, privileged actions, data stores, external services, and deploy surfaces.
2. Check auth, authorization, secret handling, rate limits, input validation, and data retention.
3. Run or define build, unit, integration, smoke, and rollback validation.
4. Classify gaps as launch-blocking, pre-launch, post-launch, or accepted risk.
5. Produce a go/no-go recommendation with owners and evidence links.

## Output Contract

Return a concise brief with these fields:

- readiness matrix
- risk register
- test evidence
- go/no-go recommendation
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
