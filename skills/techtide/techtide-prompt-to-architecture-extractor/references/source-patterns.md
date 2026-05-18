# Source Patterns

This reference records sanitized anchors used to distill `techtide-prompt-to-architecture-extractor`. It does not copy raw local source material.

## Curated Anchors

- $TECHTIDE_ROOT/Claude/BUILD-LOOP.md
- $TECHTIDE_ROOT/Docs/STRUCTURE.md
- $TECHTIDE_ROOT/Apps/TechTideAI/docs/ARCHITECTURE.md

## Extracted Pattern

Convert rough prompts, transcripts, and prototype notes into architecture decisions, constraints, interfaces, data flows, and implementation-ready work packages.

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
