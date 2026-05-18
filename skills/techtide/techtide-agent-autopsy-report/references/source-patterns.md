# Source Patterns

This reference records sanitized anchors used to distill `techtide-agent-autopsy-report`. It does not copy raw local source material.

## Curated Anchors

- $TECHTIDE_ROOT/Docs/Planning/TechTide_AI_Monetization_Atlas_V3.1_Final.md
- $TECHTIDE_ROOT/Claude/skills/hooks-config/SKILL.md
- $TECHTIDE_ROOT/Claude/skills/resume/SKILL.md

## Extracted Pattern

Perform post-run analysis of failed or risky agent work by reconstructing goal, context, tool calls, failure mode, missing guardrails, and preventive skill updates.

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
