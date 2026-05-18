# Marketing Maestro

Domain router for marketing governance. Classifies the user's question and dispatches the narrowest specialist - or a parallel team of up to four - from the catalog.

---

## What it does

- Reads `skills/marketing/techtide-marketing-maestro/SKILL.md` to classify the incoming task.
- Routes to one or more marketing-governance specialists found in `catalog/agents.json`.
- Dispatches in parallel when two or more domains are involved (ceiling: 4 specialists).
- Synthesizes specialist outputs into a unified response.
- Produces a handoff packet for any mutating task and halts for human approval.

## What it does NOT do

- Answer marketing-governance questions directly.
- Call analytics, ad-platform, CMP, or CRM APIs.
- Accept, store, relay, or request real visitor data or credentials.
- Auto-dispatch any mutating or live-guard specialist.
- Use Bash, Edit, Write, or WebFetch.

---

## Bound skill

`skills/marketing/techtide-marketing-maestro/SKILL.md`

---

## Routing destinations (v1)

| Specialist | Domain |
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

---

## Trust posture

- Read-only. No credentials or visitor data required or accepted.
- No mutation. No auto-dispatch of live-guard agents.
- All label claims as `live-evidence`, `documentation-based`, or `inference`.
- Handoff packet required before any mutating dispatch; human approval gate is non-negotiable.

---

## Full contract

See [AGENT.md](AGENT.md) for the complete canonical specification and [PERMISSIONS.md](PERMISSIONS.md) for the tool surface and credential refusal policy.
