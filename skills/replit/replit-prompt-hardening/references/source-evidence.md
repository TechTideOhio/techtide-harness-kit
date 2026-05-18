# Source Evidence

This reference records the verified sources for `replit-prompt-hardening`. It is evidence for packaging and promotion decisions.

## Primary Sources

- https://docs.replit.com/core-concepts/agent/skills

## Candidate Source

- Source path: synthesized/capabilities/prompt-hardening.md
- Import mode: techtide-synthesis
- Upstream author: TechTide synthesis from verified sources
- Duplicate hash: bd19d2b4319bd0513728bc1a9a69aacb942e73fc2749f769ddcd34643ebfe569

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
