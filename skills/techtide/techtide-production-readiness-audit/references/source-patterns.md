# Source Patterns

This reference records sanitized anchors used to distill `techtide-production-readiness-audit`. It does not copy raw local source material.

## Curated Anchors

- $TECHTIDE_ROOT/Docs/CONCERNS.md
- $TECHTIDE_ROOT/Docs/TESTING.md
- $TECHTIDE_ROOT/Apps/TechTideAI/DEPLOYMENT.md

## Extracted Pattern

Audit rapidly built applications for production readiness across auth, secrets, data, tests, observability, rollback, deployment, and operational ownership.

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
