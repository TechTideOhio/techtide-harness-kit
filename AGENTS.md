# AGENTS.md

## Purpose
- Cloud and zero-trust agentic marketplace for skills, agents, rules, MCP references, and npm distribution.
- Optimize for evidence-backed security workflows: least privilege, source grounding, manifests, validation, and safe automation.

## Stack Map
- `.code-review-graph/` -> generated local graph cache; do not edit.
- `.git/` -> Git internals; do not edit.
- `agents/` -> Markdown/JSON agent definitions; provider/domain layout.
- `assets/` -> curated logos and visual assets.
- `catalog/` -> JSON marketplace indexes, skill integrity manifest, and role taxonomy.
- `docs/` -> lean production docs for install, compatibility, taxonomy, release, security, and quality guidance.
- `mcp/` -> Markdown/JSON MCP references.
- `rules/` -> Markdown/JSON harness rules.
- `schemas/` -> JSON Schema metadata contracts.
- `skills/` -> Markdown/JSON skill packages with reference files.
- `templates/` -> starter Markdown/JSON asset templates.
- `tests/` -> validation scripts.
- `package.json` -> npm package metadata and validation scripts.

## Workflows
- `npm run validate` -> full production validation: catalog, schemas, links, integrity, trust matrix, install coverage, routing, plugin manifests, Kiro Powers, and marketplace checks.
- `npm run lint:docs` -> advisory markdownlint + codespell.
- `npm run manifest:write` -> refresh `catalog/skill-manifest.json` after intentional skill edits.
- `npm run plugin-manifest:write` -> regenerate `.claude-plugin/plugin.json` from `catalog/agents.json` after intentional agent additions or removals.
- `npm run cursor-plugin:write` -> regenerate `.cursor-plugin/plugin.json` from `catalog/agents.json`.
- `npm run kiro-powers:write` -> regenerate Kiro Powers under `powers/techtide-*`.
- `npm run asset-integrity:write` -> refresh `catalog/asset-integrity.json` after intentional file additions/removals.
- `npm pack --dry-run` -> inspect npm package contents before publish.
- `thk-export-agents --list-roles` -> list available role IDs with agent counts.
- `thk-export-agents --platform <platform> --role <role-id> --repo <path>` -> install agents for a role.
- `thk-export-agents --platform <platform> --role <role-id> --provider <provider> --repo <path>` -> install role agents for one provider.

## Change Rules
- Update catalog JSON when adding, moving, or removing cataloged assets.
- Regenerate the skill manifest after any intentional change under cataloged `skills/**`.
- Keep skill frontmatter metadata under `metadata`, including `metadata.version` and `metadata.author`; use the GitHub-style author value such as `github: TechTide`.
- Keep `author` and `version` truth in the canonical contract plus adjacent `metadata.json` unless a harness's official docs verify executable metadata support.
- Keep README human-friendly; keep this file agent-focused and compressed.
- Do not add secrets, credentials, tokens, wallets, tenant IDs, or customer data.
- Prefer official docs and live evidence over memory for cloud/compliance claims.
- Treat broad permissions, destructive automation, and MCP mutation paths as high-risk.
- When adding agents, update `catalog/install-roles.json` if the agent belongs to one or more roles.
- All live-guard and review agents must produce the evidence fields defined in `docs/evidence-output-spec.md`.

## Role-Based Pattern
`catalog/install-roles.json` defines six cross-provider roles. Each role is a curated list of agent and skill IDs that practitioners in that function need.

| Role ID | Who uses it |
| --- | --- |
| `cloud-security-engineer` | IAM reviewers, security posture teams, compliance engineers |
| `cloud-platform-engineer` | Infrastructure/SRE, IaC owners, Kubernetes platform teams |
| `cloud-dba` | Database administrators, data platform engineers |
| `cloud-finops-analyst` | FinOps leads, cost governance teams |
| `cloud-solutions-architect` | Cloud architects, migration leads, generative platform engineers |
| `cloud-devops-engineer` | CI/CD engineers, release managers, SRE ops |

Roles overlap intentionally; an agent useful to both a security engineer and a platform engineer appears in both lists.

Pipeline enforcement is documented in `docs/ci-cd-enforcement-pattern.md`.
Evidence output for structured verdict responses is documented in `docs/evidence-output-spec.md`.

## Load When
- editing `agents/` -> `agents/AGENTS.md`
- editing `catalog/` -> `catalog/AGENTS.md`
- editing `docs/` -> root `AGENTS.md`
- editing `mcp/` -> `mcp/AGENTS.md`
- editing `rules/` -> `rules/AGENTS.md`
- editing `schemas/` -> `schemas/AGENTS.md`
- editing `skills/` -> `skills/AGENTS.md`
- editing `templates/` -> `templates/AGENTS.md`
- editing `tests/` or validation scripts -> `tests/AGENTS.md`
