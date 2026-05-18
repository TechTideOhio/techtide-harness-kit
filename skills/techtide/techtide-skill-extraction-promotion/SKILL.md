---
name: techtide-skill-extraction-promotion
description: "Extract new TechTide skills from local work safely by inventorying curated sources, scoring privacy and quality risk, generating candidates, and promoting only validated assets. Use when an agent needs Alex Cinovoj / TechTide live-coding patterns, tool routing, guarded prototype-to-production workflows, or cross-harness prompt/skill adapters."
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

# TechTide Skill Extraction Promotion

Extract new TechTide skills from local work safely by inventorying curated sources, scoring privacy and quality risk, generating candidates, and promoting only validated assets.

## Source Pattern

This skill is distilled from sanitized Alex Cinovoj / TechTide local workflow patterns. Load `references/source-patterns.md` when you need the source anchors and extraction rationale. Load `references/adapter-map.md` when preparing Cursor, Kiro, Lovable, v0, or Replit companion outputs.

## Workflow

1. Inventory only curated local source classes and exclude secrets, logs, raw datasets, lead lists, and build artifacts.
2. Summarize reusable patterns without copying private source text.
3. Score each candidate for clarity, security, privacy, reproducibility, and harness fit.
4. Generate schema-valid skill metadata, references, and catalog entries.
5. Run validation and require manual review before public release.

## Output Contract

Return a concise brief with these fields:

- source inventory
- candidate score
- skill draft
- promotion decision
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
