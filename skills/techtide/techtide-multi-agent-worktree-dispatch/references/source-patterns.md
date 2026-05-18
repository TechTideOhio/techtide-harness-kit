# Source Patterns

This reference records sanitized anchors used to distill `techtide-multi-agent-worktree-dispatch`. It does not copy raw local source material.

## Curated Anchors

- $TECHTIDE_ROOT/Claude/skills/agent-dispatch/SKILL.md
- $TECHTIDE_ROOT/Apps/TechTideAI/agents/README.md
- $TECHTIDE_ROOT/Apps/TechTideAI/CONTRIBUTING.md

## Extracted Pattern

Split substantial engineering work across agents or worktrees with disjoint ownership, clear contracts, validation checkpoints, and integration review.

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
