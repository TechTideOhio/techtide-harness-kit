#!/usr/bin/env python3
"""Validate the Agent Plugins 1.0 manifest and flat skills artifact.

Spec: https://agent-plugins.org/specification (v1.0.0).

Gates:
  1. plugin.json exists at the repo root and is valid JSON.
  2. Top-level fields are exactly the closed set ($schema, name, version,
     description, author, homepage, repository, license, keywords,
     extensions) - any other field makes conformant clients reject it.
  3. $schema is the canonical 1.0.0 identifier.
  4. name satisfies the 5.5 constraints (1-64 chars, lowercase alnum plus
     hyphen/period, alphanumeric ends, no "--" or "..").
  5. author holds only name/email/url string fields.
  6. version matches package.json (single source of truth; release-prepare
     syncs it post-bump).
  7. plugin.json is in the npm `files` allowlist so the published tarball
     carries it.
  8. The manifest generator is drift-free (delegated to
     scripts/generate-agent-plugins-manifest.mjs --check).
  9. The flat skills artifact (rebuilt into a temp dir) contains exactly the
     catalog skill set, each with SKILL.md whose name matches its directory
     (agentskills.io name==dir rule + spec 7.1 immediate-child discovery).
"""

from __future__ import annotations

import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
PLUGIN = REPO / "plugin.json"
PKG = REPO / "package.json"
CATALOG = REPO / "catalog" / "skills.json"
SCHEMA_URL = "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json"

ALLOWED_TOP_LEVEL = {
    "$schema",
    "name",
    "version",
    "description",
    "author",
    "homepage",
    "repository",
    "license",
    "keywords",
    "extensions",
}

NAME_RE = re.compile(r"^[a-z0-9][a-z0-9.-]*[a-z0-9]$")


def fail(msg: str) -> None:
    print(f"FAIL [agent-plugins] {msg}", file=sys.stderr)


def main() -> int:
    errors: list[str] = []
    if not PLUGIN.is_file():
        fail("plugin.json is missing at the repo root")
        return 1
    try:
        manifest = json.loads(PLUGIN.read_text(encoding="utf-8"))
    except Exception as exc:  # noqa: BLE001
        fail(f"plugin.json is not valid JSON: {exc}")
        return 1
    if not isinstance(manifest, dict):
        fail("plugin.json must be a JSON object")
        return 1

    unknown = sorted(set(manifest) - ALLOWED_TOP_LEVEL)
    if unknown:
        errors.append(f"unknown top-level fields rejected by closed schema: {unknown}")

    if manifest.get("$schema") != SCHEMA_URL:
        errors.append(f"$schema must be {SCHEMA_URL}")

    name = manifest.get("name")
    if not isinstance(name, str) or not (1 <= len(name) <= 64):
        errors.append("name must be a 1-64 character string")
    elif not NAME_RE.match(name) or "--" in name or ".." in name:
        errors.append(f"name {name!r} violates Agent Plugins 5.5 constraints")

    author = manifest.get("author")
    if not isinstance(author, dict):
        errors.append("author must be an object")
    else:
        bad_author = sorted(set(author) - {"name", "email", "url"})
        if bad_author:
            errors.append(f"author holds non-spec fields: {bad_author}")
        for key, value in author.items():
            if not isinstance(value, str):
                errors.append(f"author.{key} must be a string")

    if "keywords" in manifest and (
        not isinstance(manifest["keywords"], list)
        or not all(isinstance(k, str) for k in manifest["keywords"])
    ):
        errors.append("keywords must be a string array")
    if "extensions" in manifest and not isinstance(manifest["extensions"], dict):
        errors.append("extensions must be an object")

    try:
        pkg = json.loads(PKG.read_text(encoding="utf-8"))
    except Exception as exc:  # noqa: BLE001
        errors.append(f"package.json unreadable: {exc}")
        pkg = {}
    if manifest.get("version") != pkg.get("version"):
        errors.append(
            f"plugin.json version {manifest.get('version')!r} does not match "
            f"package.json {pkg.get('version')!r}"
        )
    if "plugin.json" not in (pkg.get("files") or []):
        errors.append("plugin.json is missing from the npm files allowlist")

    # Generator drift - re-run with --check.
    result = subprocess.run(
        ["node", str(REPO / "scripts" / "generate-agent-plugins-manifest.mjs"), "--check"],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        errors.append((result.stderr.strip() or result.stdout.strip() or "manifest generator drift"))

    # Flat artifact - rebuild into temp and verify against the catalog.
    try:
        catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    except Exception as exc:  # noqa: BLE001
        errors.append(f"catalog/skills.json unreadable: {exc}")
        catalog = []
    expected_ids = sorted(
        e["id"] for e in catalog if isinstance(e, dict) and e.get("type") == "skill"
    )
    with tempfile.TemporaryDirectory(prefix="thk-agent-plugins-") as tmp:
        build = subprocess.run(
            ["node", str(REPO / "scripts" / "generate-agent-plugins-skills.mjs"),
             "--out", tmp],
            capture_output=True,
            text=True,
        )
        if build.returncode != 0:
            errors.append("flat skills build failed: " + (build.stderr.strip() or build.stdout.strip()))
        else:
            flat = Path(tmp) / "skills"
            on_disk = sorted(p.name for p in flat.iterdir() if p.is_dir()) if flat.is_dir() else []
            if on_disk != expected_ids:
                missing = sorted(set(expected_ids) - set(on_disk))
                extra = sorted(set(on_disk) - set(expected_ids))
                errors.append(
                    f"flat artifact skill set != catalog "
                    f"(missing={missing[:1]}, extra={extra[:1]})"
                )
            for skill_id in expected_ids:
                skill_md = flat / skill_id / "SKILL.md"
                if not skill_md.is_file():
                    errors.append(f"{skill_id}: SKILL.md absent from flat artifact")
                    break
                text = skill_md.read_text(encoding="utf-8").lstrip("﻿")
                match = re.search(r"^name:\s*(.+?)\s*$", text, re.MULTILINE)
                claimed = (match.group(1) if match else "").strip().strip("'\"")
                if claimed != skill_id:
                    errors.append(f"{skill_id}: SKILL.md name does not match directory")
                    break

    if errors:
        for err in errors:
            fail(err)
        return 1

    print(
        f"OK: agent plugins manifest valid ({len(expected_ids)} flat skills, "
        f"version {manifest.get('version')})",
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
