# Source Patterns

This reference records sanitized anchors used to distill `techtide-human-approval-gate-designer`. It does not copy raw local source material.

## Curated Anchors

- $TECHTIDE_ROOT/Docs/CONCERNS.md
- $TECHTIDE_ROOT/Claude/skills/hooks-config/SKILL.md
- $TECHTIDE_ROOT/Apps/TechTideAI/README.md

## Extracted Pattern

Design explicit human approval gates for agent workflows that can mutate production, spend money, contact external recipients, delete data, or change security posture.

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
