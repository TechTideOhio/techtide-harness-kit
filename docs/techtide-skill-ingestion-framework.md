# TechTide Skill Ingestion Framework

Last reviewed: 2026-05-17

## Purpose

This framework turns Alex Cinovoj / TechTide local live-coding patterns into public-safe marketplace skills. It extracts reusable methods, guardrails, validation loops, and tool-routing policies without copying private business data.

## Source Boundary

Allowed source classes:

- $TECHTIDE_ROOT/Claude/skills
- $TECHTIDE_ROOT/Claude/*.md
- $TECHTIDE_ROOT/Docs
- $TECHTIDE_ROOT/Apps/TechTideAI
- $TECHTIDE_ROOT/Apps/Lovable2
- $TECHTIDE_ROOT/Apps/TheLovables
- $TECHTIDE_ROOT/Apps/*/{AGENTS.md,CLAUDE.md,README.md,docs,runbooks}

Excluded source classes:

- .git
- node_modules
- dist
- build
- .next
- .cache
- .env
- *.csv
- *.log
- raw lead lists
- customer/prospect exports
- tokens, keys, DSNs, JWTs, and service-role secrets

## Promotion Rubric

A candidate can be promoted only when it has:

- reusable workflow steps
- clear inputs and outputs
- a verification method
- privacy and security guardrails
- a native skill target or honest companion adapter target
- Alex Cinovoj / TechTide attribution

Reject a candidate when it contains raw PII, credentials, private lead/customer records, local-only secrets, old provenance, or vague advice that cannot be tested.

## Harness Policy

Claude Code, Codex, Gemini, Copilot, and Kiro can receive canonical `SKILL.md` assets. Cursor remains rules-first. Lovable, Replit, and v0/Vercel can receive provider-native packages only after primary-source verification; otherwise they stay as prompt kits, readiness checklists, and handoff workflows.

External provider lane research is generated separately:

```bash
npm run external-skills:research
npm run external-skills:promote
npm run external-skills:check
```

## Commands

```bash
npm run techtide-skills:write
npm run techtide-skills:check
npm run test:techtide-skill-ingestion
```

The write command regenerates the TechTide skill pack, catalog entries, sanitized ingestion manifest, and these docs. The check command fails when generated assets drift.
