# Marketing Maestro

A routing skill that classifies marketing-governance review tasks and dispatches them to the narrowest available specialist. Maestro never answers questions directly; it classifies domains, selects agents, and synthesizes outputs.

## Allowed tools

`Agent` `Skill` `Read` `Grep` `Glob`

## Usage

**Single domain:** Provide a task with a clear governance signal (e.g., "Do my analytics tags fire before the consent banner is accepted?"). Maestro routes to `techtide-marketing-consent-data-collection-review-agent`.

**Multi-domain:** Provide a task spanning two or more domains (e.g., "Audit our consent banner and check whether our pixels leak email addresses"). Maestro routes to `techtide-marketing-consent-data-collection-review-agent` and `techtide-marketing-pixel-data-leakage-review-agent` in parallel.

## Specialists (v1)

| Agent ID | Domain |
|---|---|
| `techtide-marketing-consent-data-collection-review-agent` | Consent and data-collection posture (GDPR/ePrivacy/CCPA) |
| `techtide-marketing-pixel-data-leakage-review-agent` | Advertising-pixel personal-data leakage to ad networks |
| `techtide-martech-access-governance-review-agent` | Least-privilege access governance across the martech stack |
| `techtide-marketing-gpc-signal-honoring-review-agent` | Global Privacy Control opt-out signal propagation |
| `techtide-email-sender-authentication-review-agent` | Email sender authentication (SPF/DKIM/DMARC/BIMI) |
| `techtide-programmatic-supply-chain-integrity-review-agent` | Programmatic supply-chain integrity (ads.txt/sellers.json) |
| `techtide-ai-advertising-targeting-fairness-review-agent` | AI ad-targeting fairness and protected-class risk |
| `techtide-eu-ai-act-marketing-system-review-agent` | EU AI Act marketing-system risk classification |
| `techtide-lookalike-audience-upload-compliance-review-agent` | Custom/lookalike audience upload compliance |
| `techtide-marketing-email-list-retention-review-agent` | Email list retention, consent records, hygiene |
| `techtide-influencer-disclosure-compliance-review-agent` | Influencer/creator disclosure compliance |
| `techtide-marketing-conversion-flow-dark-pattern-review-agent` | Conversion-flow dark patterns |
| `techtide-analytics-data-minimization-review-agent` | Analytics platform data minimization |

## Trust posture

Read-only. No live-guard agents exist in v1. Mutation requests are refused and escalated to a human operator. No real visitor data, credentials, API keys, or tenant data accepted at any point in the routing chain.

See [SKILL.md](SKILL.md) for the full routing protocol and response shape.
