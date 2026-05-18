# Source Patterns

This reference records sanitized anchors used to distill `techtide-lovable-production-handoff`. It does not copy raw local source material.

## Curated Anchors

- $TECHTIDE_ROOT/Claude/BUILD-LOOP.md
- $TECHTIDE_ROOT/Claude/Lovable_Comprehensive_Analysis.md
- $TECHTIDE_ROOT/Docs/TESTING.md

## Extracted Pattern

Convert a Lovable prototype into a repo-owned production candidate by extracting code, documenting assumptions, replacing mocks, and adding tests and deployment gates.

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
