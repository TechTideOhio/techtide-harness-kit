# Source Patterns

This reference records sanitized anchors used to distill `techtide-cross-harness-export-hygiene`. It does not copy raw local source material.

## Curated Anchors

- $TECHTIDE_ROOT/Apps/techtide-harness-kit/docs/cross-harness-skills.md
- $TECHTIDE_ROOT/Apps/techtide-harness-kit/docs/marketplace-model.md
- $TECHTIDE_ROOT/Claude/skills/init/SKILL.md

## Extracted Pattern

Prepare skills and agents for cross-harness export by separating canonical SKILL.md assets from Cursor rules, Kiro steering, and prompt-kit adapters.

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
