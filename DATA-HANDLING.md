# Data Handling Policy

This repo is designed for public release. Published assets must use sanitized examples, public documentation, fake identifiers, and redacted evidence.

## Allowed Data

- Public cloud and platform documentation.
- Source code in the current repository when the user has authorized review.
- Sanitized architecture notes, runbooks, test fixtures, and workflow descriptions.
- Redacted operational evidence such as resource type, region class, risk category, and validation status.

## Forbidden Data In Published Assets

- API keys, tokens, passwords, private keys, session cookies, recovery codes, and service-role secrets.
- Customer PII, PHI, payment data, lead lists, CRM exports, subscriber lists, or production support transcripts.
- Raw `.env` files, DSNs, database dumps, billing exports, or internal endpoint inventories.
- Private local paths that identify a user, customer, or non-public project unless converted to placeholders.

## Logging And Evidence

- Store presence, scope, classification, and risk; do not store raw secret values.
- Use placeholders such as `<FAKE-API-KEY>` in tests and examples.
- Keep audit events focused on action, approver, tool, redacted arguments, result, and residual risk.
- Do not claim compliance certification from generated evidence. The repo supports evidence collection and engineering review.

## Human Approval

Human approval is required before any workflow:

- writes to a repo or filesystem,
- mutates cloud or production state,
- sends data externally,
- uses credentials,
- deletes, migrates, or backfills data,
- changes security posture,
- spends money or changes quota/budget settings.
