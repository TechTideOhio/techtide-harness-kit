# Source Patterns

This reference records sanitized anchors used to distill `techtide-v0-ui-prompt-hardener`. It does not copy raw local source material.

## Curated Anchors

- $TECHTIDE_ROOT/Claude/PATHSENSE-DESIGN-UPGRADE.md
- $TECHTIDE_ROOT/Claude/AUTOBROKER-DESIGN-UPGRADE.md
- $TECHTIDE_ROOT/Claude/skills/design/internal-design-research.md

## Extracted Pattern

Shape v0 UI prompts into implementable, accessible, responsive interface specifications with explicit data states, constraints, and handoff checks.

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
