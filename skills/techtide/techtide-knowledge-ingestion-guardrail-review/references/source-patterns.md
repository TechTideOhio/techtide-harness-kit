# Source Patterns

This reference records sanitized anchors used to distill `techtide-knowledge-ingestion-guardrail-review`. It does not copy raw local source material.

## Curated Anchors

- $TECHTIDE_ROOT/Apps/TechTideAI/backend/src/services/knowledge-service.ts
- $TECHTIDE_ROOT/Apps/TechTideAI/docs/API_REFERENCE.md
- $TECHTIDE_ROOT/Apps/TechTideAI/agents/tools/knowledge-base.md

## Extracted Pattern

Review knowledge ingestion pipelines for source provenance, chunking, embedding, search behavior, redaction, access control, and evidence traceability.

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
