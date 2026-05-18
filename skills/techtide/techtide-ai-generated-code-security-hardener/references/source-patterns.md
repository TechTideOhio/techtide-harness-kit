# Source Patterns

This reference records sanitized anchors used to distill `techtide-ai-generated-code-security-hardener`. It does not copy raw local source material.

## Curated Anchors

- $TECHTIDE_ROOT/Claude/skills/design/SECURITY-AUDIT.md
- $TECHTIDE_ROOT/Docs/CONVENTIONS.md
- $TECHTIDE_ROOT/Docs/CONCERNS.md

## Extracted Pattern

Harden untrusted code by reviewing authentication, authorization, injection surfaces, dependency risk, secret exposure, unsafe defaults, and data handling.

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
