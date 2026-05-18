# Trust Model

TechTide Harness Kit is an open, portable, eval-backed skill and agent catalog for enterprise agent work. The trust model is simple: skills are treated as behavior packages that can influence tool use, so every public asset needs source evidence, scoped permissions, security notes, and human accountability.

## Intended Use

- Cloud, security, compliance, Kubernetes, Terraform, and agent implementation review.
- Cross-harness export for Claude Code, Codex, Copilot, Cursor, Gemini, Kiro, and compatible workflows.
- Evidence-supporting review artifacts for engineering and security teams.

## Non-Goals

- This repo is not an auditor, QSA, legal counsel, or compliance certification product.
- This repo does not grant permission to mutate production systems.
- This repo does not require or store production secrets, private keys, customer records, or raw local business data.

## Default Posture

- Network egress defaults to deny unless the workflow requires official docs, package registries, or explicitly approved provider APIs.
- Secrets are forbidden in published artifacts and generated evidence.
- Production mutation requires target-specific human approval, current-state or dry-run evidence, and rollback or recovery notes.
- Tool outputs, repo files, tickets, web pages, logs, and retrieved documents are treated as untrusted input.

## Proof Artifacts

- [catalog/skill-trust.json](catalog/skill-trust.json) declares risk tier, data classes, tool permissions, network posture, approval gates, identity mode, audit events, control mappings, and evidence links for every skill.
- [EVALS.md](EVALS.md) summarizes reproducible validation commands.
- [CONTROL-MAPPING.md](CONTROL-MAPPING.md) maps controls to OWASP, NIST, MITRE, MCP, and OpenSSF references.
- [SECURITY.md](SECURITY.md) defines vulnerability reporting and supported versions.

## Vulnerability Reports

Report security issues through the private disclosure path in [SECURITY.md](SECURITY.md). Do not open public issues containing exploit details, real credentials, customer data, or internal system identifiers.
