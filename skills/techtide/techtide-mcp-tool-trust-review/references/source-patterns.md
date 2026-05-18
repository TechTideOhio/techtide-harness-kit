# Source Patterns

This reference records sanitized anchors used to distill `techtide-mcp-tool-trust-review`. It does not copy raw local source material.

## Curated Anchors

- $TECHTIDE_ROOT/Docs/STACK.md
- $TECHTIDE_ROOT/Claude/skills/hooks-config/SKILL.md
- $TECHTIDE_ROOT/Docs/CONVENTIONS.md

## Extracted Pattern

Review MCP servers, tool connectors, and agent tool surfaces for trust boundaries, credential scope, network egress, mutation risk, logging, and approval gates.

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
