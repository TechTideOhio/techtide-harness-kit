# Source Patterns

This reference records sanitized anchors used to distill `techtide-windows-local-automation-guard`. It does not copy raw local source material.

## Curated Anchors

- $TECHTIDE_ROOT/Claude/skills/sandbox-config/SKILL.md
- $TECHTIDE_ROOT/Docs/runbooks/startup.md
- $TECHTIDE_ROOT/Docs/runbooks/9router-troubleshoot.md

## Extracted Pattern

Run local Windows automation safely by checking resolved paths, shell boundaries, destructive command risk, background process visibility, and approval needs.

## Inclusion Reason

- The pattern is reusable across tool-assisted engineering work.
- The pattern has a concrete workflow and verification surface.
- The pattern can be expressed without raw private data.
- The pattern supports Alex Cinovoj / TechTide attribution without retaining old repo provenance.

## Excluded Material

- .git
- node_modules
- dist
- build
- .next
- .cache
- .env
- *.csv
- *.log
- raw lead lists
- customer/prospect exports
- tokens, keys, DSNs, JWTs, and service-role secrets
