# Source Evidence

This reference records the verified sources for `replit-context-management`. It is evidence for packaging and promotion decisions.

## Primary Sources

- https://docs.replit.com/core-concepts/agent/skills

## Candidate Source

- Source path: synthesized/capabilities/context-management.md
- Import mode: techtide-synthesis
- Upstream author: TechTide synthesis from verified sources
- Duplicate hash: d172cd86fcfc943a7a551db58feb7434de91845dc4a70feb71bd3750011476ff

## Registry Entries

- gsd-build-get-shit-done: https://github.com/gsd-build/get-shit-done (MIT; verified-github-api)
- alirezarezvani-claude-skills: https://github.com/alirezarezvani/claude-skills (MIT; verified-github-api)
- replit-agent-skills-docs: https://docs.replit.com/core-concepts/agent/skills (documentation-reference-only; verified-primary-source)

## Native Surface

Replit Agent skills under /.agents/skills

## Packaging Notes

Package skills for project-level Replit Agent use with clear env, deploy, and review gates.

## Boundary

Treat public repl code and app previews as public surfaces unless the project is explicitly private.
