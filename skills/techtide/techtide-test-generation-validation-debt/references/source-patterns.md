# Source Patterns

This reference records sanitized anchors used to distill `techtide-test-generation-validation-debt`. It does not copy raw local source material.

## Curated Anchors

- $TECHTIDE_ROOT/Docs/TESTING.md
- $TECHTIDE_ROOT/Apps/TechTideAI/docs/DEV_SETUP.md
- $TECHTIDE_ROOT/Claude/VALIDATION.md

## Extracted Pattern

Turn implementation work into durable test coverage by mapping claims to unit, integration, smoke, visual, and residual-risk checks.

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
