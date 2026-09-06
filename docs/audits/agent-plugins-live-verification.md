# Agent Plugins 1.0 Live Verification

Date: 2026-09-05. Environment: Windows 11, Node v24, `skills` CLI 1.5.23,
`gh` 2.x (no `skill` subcommand). All commands run from the repo root unless
noted. No code was changed in this pass (Step 8 of the approved blueprint).

## Results

| # | Check | Command | Result |
|---|---|---|---|
| 1 | npm tarball carries the manifest | `npm pack --dry-run` | `plugin.json` (979B) listed in tarball contents |
| 2 | Flat artifact builds deterministically | `node scripts/generate-agent-plugins-skills.mjs` | `dist/agent-plugins`, 385 flat skills |
| 3 | Strict client discovers everything | `npx --yes skills add ./dist/agent-plugins --list` | 385 listed, **0 skipped** |
| 4 | Same for canonical tree | `npx --yes skills add . --list` | **0 skipped** (was 62 before frontmatter quoting fix) |
| 5 | Single-skill prompt render | `npx --yes skills use ./dist/agent-plugins --skill core-security-review` | prints `SKILL.md` instructions to stdout |
| 6 | Drift gates | `npm run agent-plugins:check` | manifest + artifact both in sync |
| 7 | Full suite | `npm run validate` | exit 0 (all gates incl. new `validate:agent-plugins`) |
| 8 | Property fuzz | `npm run test:fuzz` | all properties passed |

## Not verifiable from this environment

- `gh skill` publish/validate: `gh extension install github/gh-skill`
  returns `X Could not find extension 'github/gh-skill'`. Re-check once the
  public preview is published; the intended command is
  `gh skill install TechTideOhio/techtide-harness-kit`.
- Claude Code `/plugin` install and Kiro/Cursor/Codex GUI installs: require
  interactive clients; CI covers manifest correctness only.
- skills.sh listing: registration is telemetry-driven after public installs
  (Step 9). Check `skills.sh/TechTideOhio/techtide-harness-kit` ~24h after
  release.

## Release v1.1.0 record (2026-09-06)

- Tag: `v1.1.0`; npm `@techtideai/harness-kit@1.1.0` (scope moved from
  `@techtide`, which is held by an unrelated account).
- Assets: `techtideai-harness-kit-1.1.0.tgz`, `sbom.spdx.json`,
  `asset-integrity.json` (all attested).
- `npx skills add TechTideOhio/techtide-harness-kit --list` → 385 skills,
  0 skipped.
- skills.sh still stale at check time; refreshes via telemetry.

## Release-pipeline fixes shipped after v1.1.0

1. **Integrity-manifest staleness (root cause).** `@semantic-release/exec`
   ran *before* `@semantic-release/npm`, so `release-prepare.mjs`
   regenerated `catalog/asset-integrity.json` against the pre-bump
   `package.json`; the release commit then stored a manifest hashing the
   wrong bytes and `validate:asset-integrity` failed on master. Fixed by
   moving the exec block after `@semantic-release/npm` in `.releaserc.js`
   (prepare phase still runs before pack/publish). Do not revert the order.
2. **Verify-step false failure.** `npm view` polling (5 x 5s) is too short
   for brand-new packages (~5 min registry lag). Extended to 36 x 10s
   (~6 min) in `release.yml`. Publish success is independently proven by
   the attestation steps; this check is a lagging indicator only.

## Pre-existing, out of scope

- `npm run lint:md` reports MD045 (no-alt-text) on README.md lines
  338/358/373. Untouched by this work (our diff only changed skill-count
  numbers in existing alt text). Left for a docs pass.
- Repo supply-chain gaps from the Step 1 audit still need maintainer action
  in GitHub settings: `master` branch unprotected, secret scanning disabled.
