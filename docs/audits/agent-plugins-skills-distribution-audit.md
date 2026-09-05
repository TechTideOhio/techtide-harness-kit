# Agent Plugins 1.0 + skills.sh / gh skill Distribution Audit

Date: 2026-09-05. Method: live local checks against this checkout (`master`,
`@techtide/harness-kit@1.0.3`). Every claim below names the command that
produced it. No code was changed in this pass (Step 1 of the approved
blueprint).

## Verdict

5 blocking gaps. The repo is **not yet consumable** via Agent Plugins 1.0
clients, is **partially consumable** via `npx skills` (329/391 skills), and is
**not yet published** via `gh skill`. The fixes are Steps 2-5 of the blueprint.

## Gap table

| # | Requirement | Current state | Evidence | Fix step |
|---|---|---|---|---|
| 1 | Agent Plugins 1.0 `plugin.json` at plugin root | Missing | `Test-Path plugin.json` = False | Step 2 |
| 2 | Agent Plugins 1.0 `mcp.json` at plugin root | Missing (acceptable per spec 6.2) | `Test-Path mcp.json` = False | Step 2 (ship without; see 6) |
| 3 | Skills discoverable at `skills/<skill>/SKILL.md` (immediate child, spec 7.1) | Canonical tree is `skills/<provider>/<skill>/SKILL.md` (2 levels); Agent Plugins clients discover **0 skills** | `(Get-ChildItem -Recurse -Filter SKILL.md skills).Count` = 391, all at depth 3 | Step 3 (flat build artifact; do NOT move canonical tree) |
| 4 | Strict-YAML frontmatter (`npx skills`, `skills-ref`, `gh skill`) | **62/391 SKILL.md skipped** by `npx skills add . --list` | CLI count 62; local heuristic reproduces exactly 62 (see table) | Step 4 |
| 5 | Repo supply-chain for `gh skill` publish checks | `master` branch **not protected** (HTTP 404); secret scanning **disabled**; code scanning null via API | `gh api .../branches/master/protection`, `gh api repos/... --jq secret/code scanning` | Step 5 |

## Finding 4 detail: strict-YAML failures by lane

Root causes: unquoted `description:` values containing `: ` (e.g.
`skills/azure/techtide-azure-ai-foundry-ops-governor/SKILL.md:3`) and unquoted
`author: github: TechTide` (e.g. same file line 6). The repo's own
`validate:skill-schema` uses a tolerant hand-rolled parser, so these pass
local CI but fail strict YAML loaders (`skills` CLI 1.5.23, and by extension
`skills-ref validate` / `gh skill` / strict clients).

| Lane | Files skipped | Cause |
|---|---|---|
| oci | 30 | unquoted `author: github: ...` |
| azure | 25 | 24 unquoted author + 1 unquoted description |
| ovhcloud | 2 | unquoted description |
| scaleway | 2 | unquoted description |
| contabo, kubernetes, marketing | 1 each | description/author quoting |

## Finding 6: stale on-disk skills invisible to catalog but visible to ecosystem

6 directories exist on disk with SKILL.md but have **no** `catalog/skills.json`
entry (leftovers of the removed per-provider clone era):

- `skills/gemini/gemini-gemini-api-dev`
- `skills/gemini/gemini-interactions-api`
- `skills/gemini/gemini-live-api-dev`
- `skills/vercel/vercel-frontend-review`
- `skills/vercel/vercel-tdd-red-green-refactor`
- `skills/vercel/vercel-test-generation`

`npx skills add . --list` **does surface these** (tail output shows
`vercel-tdd-red-green-refactor`, `vercel-test-generation`). The ecosystem sees
content the catalog disowns. Disk 391 vs catalog 385. Fix: delete the 6 stale
dirs (Step 3/4), then re-run manifest + integrity writers.

## Finding 7: MCP cannot honestly populate `mcp.json` yet

`mcp/official/` holds 3 doc bundles (AWS, Azure, Oracle markdown +
`.metadata.json`), not launchable server configs. Agent Plugins `mcp.json`
requires `command` (single token) or absolute remote `url` per entry; inventing
these would violate the repo's own cross-harness rule ("silent dependencies
are defects", `docs/compatibility.md:24`). Decision: ship v1 plugin
**without** `mcp.json` (spec 6.2: missing location is not an error); add
`mcp.json` only when a real server mapping exists.

## Already-conformant (no work needed)

- agentskills.io naming: 0 violations across 391 files (lowercase, 64-char
  limit, name == directory). Max description 942 chars (limit 1024) at
  `skills/kubernetes/techtide-kubernetes-network-architecture-review/SKILL.md`.
- `vercel-labs/skills` CLI discovery handles our depth-3 layout; skills.sh
  registration is telemetry-driven (no manual publish step).
- Existing vendor manifests untouched: `.claude-plugin/` (348 agents),
  `.cursor-plugin/`, `.github/plugin/`, `.agents/plugins/` (Codex, 2 plugins),
  `powers/` (14 Kiro Powers). Root `plugin.json` (Agent Plugins) does not
  collide with `.claude-plugin/plugin.json`.
- `docs/integrations/skills-cli.md` already documents the
  `npx skills add TechTideOhio/techtide-harness-kit` path and its
  lower-trust posture (raw HEAD, no pinning) - keep that warning.
- CI (`.github/workflows/ci.yml`) runs 6 read-only gates; the full
  `npm run validate` chain is local-only. New gates belong in Step 7.

## Commands run (repro)

```powershell
Test-Path -LiteralPath "plugin.json"        # False
Test-Path -LiteralPath "mcp.json"           # False
(Get-ChildItem -Recurse -Filter "SKILL.md" -Path "skills" | Measure-Object).Count  # 391
node -e "console.log(require('./catalog/skills.json').length)"  # 385
npx --yes skills add . --list               # 62 Skipped (YAML parse errors)
gh extension list                           # (empty - gh skill not installed)
gh api repos/TechTideOhio/techtide-harness-kit --jq "..."  # secret_scanning disabled
gh api repos/.../branches/master/protection # 404 Branch not protected
```
