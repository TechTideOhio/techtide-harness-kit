# Source Evidence

This reference records the verified sources for `replit-security-review`. It is evidence for packaging and promotion decisions.

## Primary Sources

- https://docs.replit.com/core-concepts/agent/skills

## Candidate Source

- Source path: synthesized/capabilities/security-review.md
- Import mode: techtide-synthesis
- Upstream author: TechTide synthesis from verified sources
- Duplicate hash: da93ba96fe4ef829c42f6289ccc03a5da823212c2e9544215a1cc032494369bd

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
