# Adapter Map

## Native Skill Harnesses

- Claude Code: export as `SKILL.md`.
- OpenAI Codex: export as `SKILL.md` with closed frontmatter filtering where required.
- Gemini: export as `SKILL.md`.
- GitHub Copilot: export as `SKILL.md`.

## Companion Adapters

- Keep Claude Code, Codex, Gemini, Copilot, and Kiro exports as real SKILL.md assets when their native surface is targeted.
- Represent Cursor as focused project rules or workflow notes, not a fake skill bundle.
- Represent Kiro steering separately from Kiro skills when the workflow is project context rather than a portable package.
- Represent Lovable, v0/Vercel, and Replit with provider-native packaging only after primary-source verification; otherwise keep prompt kits, readiness checklists, and handoff workflows.
- Do not copy private local project data into any adapter output.

## Suggested Adapter Output

- Cursor: one narrow rule with the trigger, constraints, and validation checklist.
- Kiro: one steering file only if the workflow should be loaded manually or by description.
- Lovable: one prompt kit plus post-generation verification checklist.
- v0: one UI prompt hardening checklist plus handoff review.
- Replit: one bootstrap prompt plus env and smoke-test checklist.
