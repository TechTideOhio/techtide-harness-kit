# Lovable Skill Imports

Lovable workspace skills are single-skill imports. Do not import the full TechTide Harness Kit repository or a multi-skill folder such as `skills/lovable`, because Lovable downloads and validates the repository as one skill package.

Verified Lovable import rules, current as of May 18, 2026:

- GitHub import requires a public repository with a `SKILL.md` at the repository root or inside one top-level folder.
- ZIP import requires a `.zip` file with a `SKILL.md` at the archive root or inside one wrapping folder.
- Each repository or ZIP represents one skill.
- ZIP uploads can be up to 50 MB.
- A skill package can contain up to 200 files, up to 10 MB total, with each bundled file up to 1 MB.

Source: [Lovable skills documentation](https://docs.lovable.dev/features/skills).

## Generate Lovable ZIPs

From the repo root:

```bash
npm run lovable:write
```

This writes one Lovable-compliant archive per supported vibe-coding skill. The default export covers the repo's Lovable, v0, Vercel, Replit, Cursor, and TechTide adapter skills that are useful inside Lovable:

```text
exports/lovable/
├── README.md
├── manifest.json
├── archives/
│   ├── lovable-native-packaging-bridge.zip
│   └── ...
└── skills/
    ├── lovable-native-packaging-bridge/
    │   ├── SKILL.md
    │   └── references/
    └── ...
```

Upload one ZIP at a time in Lovable:

1. Open Settings, Skills, Import.
2. Choose Archive.
3. Upload one ZIP from `exports/lovable/archives/`.
4. Repeat for each skill your workspace needs.

## Generate One Skill

```bash
node scripts/generate-lovable-skills.mjs --write --skill lovable-native-packaging-bridge
```

Use this when you want a small archive for a specific workflow.

## Generate One Provider Lane

```bash
node scripts/generate-lovable-skills.mjs --write --provider lovable
node scripts/generate-lovable-skills.mjs --write --provider v0,vercel
node scripts/generate-lovable-skills.mjs --write --provider replit,cursor
```

Use `--lovable-only` when you only want the Lovable-native lane. Use `--all-vibe-providers` to also include Kiro adapter skills.

## Validate Generated ZIPs

```bash
npm run lovable:check
```

The validator checks that every generated package has `SKILL.md`, stays within Lovable file limits, and includes an archive file.

## Release Assets

For public distribution, generate the packages with a release tag:

```bash
node scripts/generate-lovable-skills.mjs --write --release-tag v1.0.2
```

Then upload the files in `exports/lovable/archives/` to the matching GitHub release. The generated manifest includes release asset URLs for each archive.

## Why Not A GitHub Folder URL

Lovable's GitHub importer is documented around a public repository that contains one skill. A URL like `https://github.com/TechTideOhio/techtide-harness-kit/tree/master/skills/lovable` is not a single-skill repository. If Lovable resolves that URL as the full repository, it sees thousands of files and returns `ZIP file contains too many files`.

Use the generated ZIP archives until Lovable supports multi-skill repository imports or subdirectory-scoped GitHub imports.
