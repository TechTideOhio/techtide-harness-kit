# Source Patterns

This reference records sanitized anchors used to distill `techtide-skill-extraction-promotion`. It does not copy raw local source material.

## Curated Anchors

- $TECHTIDE_ROOT/Claude/skills
- $TECHTIDE_ROOT/Docs/STRUCTURE.md
- $TECHTIDE_ROOT/Apps/TechTideAI/docs/API_REFERENCE.md

## Extracted Pattern

Extract new TechTide skills from local work safely by inventorying curated sources, scoring privacy and quality risk, generating candidates, and promoting only validated assets.

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
