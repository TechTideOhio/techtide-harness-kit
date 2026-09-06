## 🛡️ v1.1.2 - *Provenance, Policy, Portability* - 2026-09-06

> _Multi-cloud agent marketplace · `AWS` · `Azure` · `OCI` · `Terraform`_
>
> Built for operators on the cloud frontier - least privilege, live evidence, safe rollback paths.


### fix

* commit root Agent Plugins manifest in release assets
- .releaserc.js git assets omitted plugin.json, so the v1.1.1 release commit left it at 1.1.0

- Synced to 1.1.1; full validate green

## 🛡️ v1.1.1 - *Provenance, Policy, Portability* - 2026-09-06

> _Multi-cloud agent marketplace · `AWS` · `Azure` · `OCI` · `Terraform`_
>
> Built for operators on the cloud frontier - least privilege, live evidence, safe rollback paths.


### docs

* sync counts, scopes, and accessibility across README and marketplace docs
- Correct 331->348 agent counts in plugin READMEs and installation guide

- Bump lovable-skills example release tag to v1.1.0

- Add alt text to README section badges (MD045 clean)

### fix

* repair release-pipeline version ordering and polling
- Run release-prepare after @semantic-release/npm so asset-integrity covers the bumped package.json

- Extend npm-visibility polling to ~6 min for brand-new packages

- Sync all plugin manifests to 1.1.0
* resolve 30 dependabot alerts with semver-range audit fix
- undici/js-yaml/tar/brace-expansion/postcss-selector-parser/ip-address/sigstore transitives

- All dev-toolchain-only; shipped package has zero runtime deps. Full validate green.

## 🛡️ v1.1.0 - *Provenance, Policy, Portability* - 2026-09-06

> _Multi-cloud agent marketplace · `AWS` · `Azure` · `OCI` · `Terraform`_
>
> Built for operators on the cloud frontier - least privilege, live evidence, safe rollback paths.


### fix

* publish package under @techtideai npm scope
* update coverage-map SVG skill count from 487 to 391
Aligns the bottom stats bar in coverage-map.svg with the actual
skill count after the clone removal in f93e8bb.

### docs

* record supply-chain hardening in distribution audit
* redesign README as professional landing page
- Hero section with centered logo, tagline, flat-square badge row
- Four hero harnesses front and center: Claude Code, Cursor, Codex,
  Lovable with for-the-badge style, install commands, and doc links
- Collapsible section for Copilot, Gemini, Kiro
- Two-column HTML tables for cloud coverage and enterprise trust
- Section headers using shield badges for visual consistency
- Side-by-side skill anatomy showing frontmatter and assessment questions
- Updated showcase-hero.svg: 487->391, added Lovable pill with brand
  colors for all four hero harnesses (amber, cyan, green, pink)
- By-the-numbers grid with 8 key metrics
- vs-alternatives comparison table

### feat

* add Agent Plugins 1.0 distribution and restore validation green
- Add Agent Plugins 1.0 root plugin.json via closed-schema generator with containment checks; flat skills build artifact at dist/agent-plugins

- Rebuild external skill research generator around the core lane (12 skills); purge stale provider-clone catalog entries

- Quote strict-YAML frontmatter (62 files): npx skills discovers 385/385 with zero skipped

- Remove 6 stale on-disk-only clone dirs; retarget Lovable packaging at core lane

- Move enriched AWS guidance into references/review-guidance.md (90-line progressive-disclosure rule)

- Register core lane in catalog validator; add validate:agent-plugins gate and CI job; wire plugin.json into npm files and release-prepare sync

- Docs: distribution audit, live verification log, Agent Plugins install path

### chore

* **actions:** bump github/codeql-action in the actions group (#4)
Bumps the actions group with 1 update: [github/codeql-action](https://github.com/github/codeql-action).

Updates `github/codeql-action` from 4.35.4 to 4.35.5
- [Release notes](https://github.com/github/codeql-action/releases)
- [Changelog](https://github.com/github/codeql-action/blob/main/CHANGELOG.md)
- [Commits](https://github.com/github/codeql-action/compare/68bde559dea0fdcac2102bfdf6230c5f70eb485e...9e0d7b8d25671d64c341c19c0152d693099fb5ba)
* replace local source-anchor path with generic placeholder

### refactor

* remove 96 clone skills, enrich AWS skills, add dedup CI gate
- Delete 96 harness-clone skills (cursor, codex, kiro, lovable, v0, replit
  directories + 12 clones each from gemini and vercel)
- Move 12 canonical skills from skills/claude/ to skills/core/ with
  updated frontmatter and metadata
- Inline assessment questions and validation checklists into top 5 AWS
  skills (39-52 lines -> 161-173 lines each)
- Add scripts/check-skill-dedup.mjs CI gate (exits 1 on hash collision)
- Wire dedup:check into npm run validate pipeline
- Update README.md counts: 487 -> 391 unique production skills
- Update CATALOG.md provider table to reflect actual state

Dedup check passes clean: 391 skills, zero duplicates.

# Changelog

This changelog records neutral TechTide Harness Kit release history. It
intentionally omits personal provenance, temporary branch names, original build
tooling, commit hashes, and pull-request links.

## 2.0.1 - 2026-05-17

- Rebranded the working tree as TechTide Harness Kit.
- Standardized package, plugin, CLI, marketplace, catalog, and asset IDs under
  the TechTide namespace.
- Added marketing-governance skills and agents, including consent, pixel data
  leakage, martech access governance, GPC, email authentication, programmatic
  supply chain, AI advertising fairness, EU AI Act classification, audience
  upload hygiene, retention, influencer disclosure, dark-pattern, and analytics
  minimization reviews.
- Expanded routing fixtures, validation coverage, and marketplace manifests for
  the current multi-harness catalog.
- Refreshed asset-integrity and skill manifests.

## 2.0.0

- Migrated cataloged assets to TechTide-prefixed IDs and paths.
- Added cross-harness marketplace support for Claude Code, Codex, Copilot,
  Cursor, Gemini, and Kiro.
- Added Kiro Powers for supported provider groups.
- Hardened install/export validation, provider scoping, and role coverage.

## 1.x

- Built the initial cloud, Kubernetes, Terraform, FinOps, and NVIDIA catalog.
- Added live-guard patterns for high-impact operations with approval,
  evidence, target-confirmation, and rollback requirements.
- Added schema validation, link validation, manifest integrity checks, routing
  fixtures, and supply-chain release guidance.
