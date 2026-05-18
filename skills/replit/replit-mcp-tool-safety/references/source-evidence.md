# Source Evidence

This reference records the verified sources for `replit-mcp-tool-safety`. It is evidence for packaging and promotion decisions.

## Primary Sources

- https://docs.replit.com/core-concepts/agent/skills

## Candidate Source

- Source path: synthesized/capabilities/mcp-tool-safety.md
- Import mode: techtide-synthesis
- Upstream author: TechTide synthesis from verified sources
- Duplicate hash: 3290412264e0754aec0b33027af1f3d8d76b361ae8ec7d82a64628f1a2481960

## Registry Entries

- alirezarezvani-claude-skills: https://github.com/alirezarezvani/claude-skills (MIT; verified-github-api)
- sickn33-antigravity-awesome-skills: https://github.com/sickn33/antigravity-awesome-skills (MIT; verified-github-api)
- replit-agent-skills-docs: https://docs.replit.com/core-concepts/agent/skills (documentation-reference-only; verified-primary-source)

## Native Surface

Replit Agent skills under /.agents/skills

## Packaging Notes

Package skills for project-level Replit Agent use with clear env, deploy, and review gates.

## Boundary

Treat public repl code and app previews as public surfaces unless the project is explicitly private.
