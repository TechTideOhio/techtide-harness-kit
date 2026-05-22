# TechTide Harness Kit

<div align="center">
  <img src="assets/logos/techtide-harness-kit-logo.png" alt="TechTide Harness Kit" width="180" />

  <h3>391 enterprise-grade agent skills. 348 specialist agents. 6 cloud providers.<br/>One repo. Every harness.</h3>

  <p>
    <a href="https://www.npmjs.com/package/@techtide/harness-kit"><img alt="npm version" src="https://img.shields.io/npm/v/@techtide/harness-kit.svg?logo=npm" /></a>
    <a href="LICENSE"><img alt="License: Apache-2.0" src="https://img.shields.io/badge/license-Apache--2.0-blue.svg" /></a>
    <a href="https://github.com/TechTideOhio/techtide-harness-kit/actions/workflows/codeql.yml"><img alt="CodeQL" src="https://github.com/TechTideOhio/techtide-harness-kit/actions/workflows/codeql.yml/badge.svg?branch=master" /></a>
    <a href="https://github.com/TechTideOhio/techtide-harness-kit/actions/workflows/install-paths-smoke.yml"><img alt="Install Paths Smoke" src="https://github.com/TechTideOhio/techtide-harness-kit/actions/workflows/install-paths-smoke.yml/badge.svg?branch=master" /></a>
    <a href="https://scorecard.dev/viewer/?uri=github.com/TechTideOhio/techtide-harness-kit"><img alt="OpenSSF Scorecard" src="https://api.securityscorecards.dev/projects/github.com/TechTideOhio/techtide-harness-kit/badge" /></a>
    <a href="https://docs.npmjs.com/generating-provenance-statements"><img alt="npm provenance" src="https://img.shields.io/badge/npm-provenance-26a566.svg?logo=npm" /></a>
  </p>

  <p>
    <a href="#quick-start">Quick Start</a> &bull;
    <a href="#skill-catalog">Skill Catalog</a> &bull;
    <a href="#cloud-provider-coverage">Cloud Coverage</a> &bull;
    <a href="#supported-harnesses">Harnesses</a> &bull;
    <a href="#enterprise-trust">Enterprise Trust</a> &bull;
    <a href="#vs-alternatives">vs Alternatives</a> &bull;
    <a href="#contributing">Contributing</a>
  </p>

  <img src="assets/readme/showcase-hero.svg" alt="TechTide Harness Kit product overview" width="100%" />
</div>

---

## Why This Exists

Most agent skill repos are curated link lists or single-harness collections with no governance. TechTide Harness Kit is the opposite: **391 production-tested skills with schema-validated metadata, trust tiers, safety checklists, and approval gates** -- built for teams that ship to regulated environments.

Every skill includes:
- **Assessment question banks** with provider-specific validation checklists
- **Safety checklists** with blast-radius checks and rollback paths
- **Official doc references** grounded in vendor documentation, not training data
- **Trust metadata** with tool scopes, data classes, network posture, and audit events
- **9 JSON Schema contracts** enforcing skill shape, frontmatter, and trust fields

This is not an awesome-list. This is an enterprise skill platform.

## Quick Start

```bash
# Install and validate
npm install @techtide/harness-kit
npm run validate    # 25+ validation gates, no secrets required

# Export skills to your harness
npx thk-export-agents --platform claude-code --provider aws --repo .
npx thk-export-agents --platform codex --role cloud-security-engineer --repo .
npx thk-export-agents --platform gemini --all --repo .
```

Install directly in your harness:

| Harness | One-liner |
| --- | --- |
| **Claude Code** | `/plugin marketplace add TechTideOhio/techtide-harness-kit` |
| **OpenAI Codex** | `codex plugin marketplace add TechTideOhio/techtide-harness-kit` |
| **GitHub Copilot** | `copilot plugin marketplace add TechTideOhio/techtide-harness-kit` |
| **Cursor** | Clone repo, add as plugin directory |
| **Gemini CLI** | `npx thk-export-agents --platform gemini --all --repo .` |
| **Kiro** | Add `powers/techtide-*` directories |
| **Lovable** | `npm run lovable:write` (builds one ZIP per skill) |

Full install guide: [docs/integrations/installation-guide.md](docs/integrations/installation-guide.md)

## Skill Catalog

| Asset | Count |
| --- | ---: |
| Production skills | **391** |
| Specialist agents | **348** |
| Cloud provider lanes | **6** (AWS, Azure, GCP, Alibaba, Huawei, OCI) |
| Infrastructure lanes | **4** (Kubernetes, Terraform, CNCF, NVIDIA) |
| Governance lanes | **3** (marketing, FinOps, compliance) |
| Harness adapters | **7** (Claude Code, Codex, Copilot, Cursor, Gemini, Kiro, Lovable) |
| JSON Schema contracts | **9** |
| Validation gates | **25+** |

Browse the full catalog: [CATALOG.md](CATALOG.md)

## Cloud Provider Coverage

Every major cloud has deep, provider-specific skills -- not generic templates with names swapped.

| Provider | Skills | Highlights |
| --- | ---: | --- |
| **AWS** | 47 | WAF pillars, Bedrock agent security, Cost Explorer, ECS/EKS ops, IAM least-privilege |
| **GCP** | 51 | AlloyDB AI, Anthos multi-cloud, Cloud Run, GKE platform ops, WAF pillars with 50+ assessment questions |
| **Azure** | 36 | AI Foundry ops, AKS platform, App Service readiness, Entra ID, WAF pillars |
| **Alibaba Cloud** | 43 | ACK containers, AnalyticDB, China compliance, ActionTrail audit, Function Compute |
| **Huawei Cloud** | 43 | GaussDB HA, CCE containers, Cloud Eye monitoring, CBR backup, ELB |
| **Oracle Cloud (OCI)** | 41 | Autonomous Database, Cloud Guard, Full Stack DR, Fault Domain topology |

### Infrastructure and Governance

| Lane | Skills | Highlights |
| --- | ---: | --- |
| **Kubernetes** | 10 | External Secrets Operator, RBAC review, admission control |
| **NVIDIA** | 12 | CUDA kernel performance, TensorRT-LLM deployment, Triton inference, GPU operator hardening |
| **FinOps** | 7 | Cross-cloud cost governance, commitment optimization, showback |
| **Marketing** | 14 | Ad targeting fairness (FHA/ECOA/EU AI Act), analytics data minimization, sender authentication |
| **TechTide Core** | 24 | Production readiness audit, agent autopsy, cross-harness export, MCP trust review |
| **Core Skills** | 12 | Context management, security review, prompt hardening, deployment readiness |
| **European Cloud** | 30 | Hetzner, Contabo, IONOS, OVHcloud, Scaleway (6 each) |
| **CNCF** | 11 | ArgoCD, Cert-Manager, Cilium, Falco, FluxCD, Istio, Kyverno, Prometheus, Sigstore, Velero |

## Skill Anatomy

Every skill follows a consistent, agent-optimized structure:

```
skills/<provider>/<skill-id>/
  SKILL.md          # YAML frontmatter + workflow + assessment questions + validation checklist
  metadata.json     # Schema-validated: id, version, harnesses, official_docs, security_notes
  references/       # Safety checklists, official sources, extended guidance
    safety-checklist.md
    official-sources.md
    workflow-and-output.md
```

### What makes a TechTide skill different

```yaml
# SKILL.md frontmatter -- every skill declares its tool scope
---
name: techtide-aws-waf-reliability-review
description: "Review AWS workload reliability posture against the WAF Reliability Pillar..."
allowed-tools: Read Grep Glob    # Least-privilege: no Write, no Bash, no network
metadata:
  author: "github: TechTide"
  version: "0.1.0"
  category: resilience
---
```

**Inline assessment questions** (not hidden in reference files):
```markdown
## Assessment Question Bank
### SLO/SLI Definition and Error Budgets
1. Are SLIs defined based on user-observable outcomes?
2. Is an SLO set for each user-facing service with an error budget?
3. Is the error budget actively tracked and used to gate feature velocity?

## Validation Checklist
- [ ] SLIs defined for all user-facing services
- [ ] Autoscaling configured for all stateless compute
- [ ] Backup restore tested within the last 30 days
- [ ] Circuit breakers implemented for all external calls
```

## What Ships

| Surface | Purpose |
| --- | --- |
| `skills/` | Portable task workflows with frontmatter, assessment questions, and guardrails |
| `agents/` | Specialist roles with harness-specific adapters (Claude Code, Codex, Copilot, Cursor, Gemini, Kiro) |
| `rules/` | Harness-specific operating guidance |
| `mcp/` | Trusted MCP server integration references |
| `catalog/` | Machine-readable indexes, trust metadata, roles, and integrity hashes |
| `schemas/` | 9 JSON Schema contracts enforcing skill and agent shape |
| `powers/` | Kiro Power packages |
| `plugins/` | Codex and Claude Code plugin packages |

<img src="assets/readme/harness-flow.svg" alt="TechTide Harness Kit workflow" width="100%" />

## Supported Harnesses

| Harness | Format | Install path |
| --- | --- | --- |
| **Claude Code** | SKILL.md + plugin manifest | `/plugin marketplace add TechTideOhio/techtide-harness-kit` |
| **OpenAI Codex** | .agents/plugins/ | `codex plugin marketplace add TechTideOhio/techtide-harness-kit` |
| **GitHub Copilot** | .github/plugin/ | `copilot plugin marketplace add TechTideOhio/techtide-harness-kit` |
| **Cursor** | .cursor-plugin/ | Clone repo and add as plugin directory |
| **Gemini CLI** | Workspace skills | `npx thk-export-agents --platform gemini --all --repo .` |
| **Kiro** | Powers packages | Add `powers/techtide-*` directories |
| **Lovable** | ZIP archives | `npm run lovable:write` (one ZIP per skill) |

For Lovable imports, see [docs/integrations/lovable-skills.md](docs/integrations/lovable-skills.md).

## Enterprise Trust

This repo is built for teams that answer to auditors, not just developers.

| Layer | What it does |
| --- | --- |
| **Schema validation** | 9 JSON Schemas enforce skill shape, frontmatter, trust fields, and agent contracts |
| **Tool scoping** | Every skill declares `allowed-tools` in frontmatter -- least-privilege by default |
| **Safety checklists** | Pre-action checks for blast radius, rollback paths, and data impact |
| **Approval gates** | Risky operations are read-first, approval-gated, and target-confirmed |
| **Trust metadata** | Tool scopes, data classes, network posture, audit events per skill |
| **Provenance** | npm provenance + SHA-verified asset integrity hashes |
| **CodeQL** | Automated security scanning on every push |
| **OpenSSF Scorecard** | Supply chain security posture |

| Trust document | Purpose |
| --- | --- |
| [TRUST.md](TRUST.md) | Trust posture and verification model |
| [DATA-HANDLING.md](DATA-HANDLING.md) | Data handling and privacy practices |
| [PROMPT-INJECTION.md](PROMPT-INJECTION.md) | Prompt injection defenses |
| [CONTROL-MAPPING.md](CONTROL-MAPPING.md) | Compliance control mapping |
| [SECURITY.md](SECURITY.md) | Vulnerability reporting |
| [EVALS.md](EVALS.md) | Evaluation and validation summary |

## vs Alternatives

| Feature | TechTide Harness Kit | Awesome lists | Toolkit repos |
| --- | --- | --- | --- |
| **Skill count** | 391 production skills | Links only | 35-184 skills |
| **Cloud providers** | 6 (AWS, Azure, GCP, Alibaba, Huawei, OCI) | None | 1-2 |
| **Schema validation** | 9 JSON Schemas, 25+ gates | None | None |
| **Trust metadata** | Tool scopes, data classes, approval gates | None | None |
| **Safety checklists** | Per-skill blast radius + rollback | None | None |
| **Multi-harness** | 7 harness adapters | Single harness | 1-2 harnesses |
| **Assessment questions** | Provider-specific question banks | None | None |
| **Enterprise governance** | OpenSSF, CodeQL, provenance, control mapping | None | None |
| **European cloud** | Hetzner, Contabo, IONOS, OVHcloud, Scaleway | None | None |
| **NVIDIA / GPU** | CUDA, TensorRT-LLM, Triton, NGC | None | None |

## Common Commands

```bash
# Validate everything (25+ gates)
npm run validate

# Check trust metadata and proof layer
npm run trust:check
npm run proof-layer:check

# Export agents for your harness
npm run agents:export -- --list                                        # List available agents
npm run agents:export -- --platform claude-code --provider aws --repo . # AWS agents for Claude Code
npm run agents:export -- --platform codex --all --repo .               # All agents for Codex

# Regenerate derived artifacts
npm run proof-layer:write
npm run plugin-manifest:write
npm run manifest:write
npm run asset-integrity:write
```

## Docs

| Topic | Link |
| --- | --- |
| Installation guide | [docs/integrations/installation-guide.md](docs/integrations/installation-guide.md) |
| Harness compatibility | [docs/compatibility.md](docs/compatibility.md) |
| Cross-harness skills | [docs/cross-harness-skills.md](docs/cross-harness-skills.md) |
| Marketplace model | [docs/marketplace-model.md](docs/marketplace-model.md) |
| Quality bar | [docs/quality-bar.md](docs/quality-bar.md) |
| Taxonomy | [docs/taxonomy.md](docs/taxonomy.md) |
| External skill research | [docs/external-skill-research.md](docs/external-skill-research.md) |
| Lovable skill imports | [docs/integrations/lovable-skills.md](docs/integrations/lovable-skills.md) |

## Contributing

Contributions should be evidence-backed, source-grounded, and safe by default.

1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Run `npm run validate` before opening a PR
3. Every skill needs: SKILL.md with frontmatter, metadata.json matching schema, and official doc references

Report vulnerabilities through [SECURITY.md](SECURITY.md). Do not open public issues containing exploit details, real credentials, customer data, or internal system identifiers.

---

<div align="center">
  <p>
    <strong>Built by <a href="https://techtideai.io/">TechTide AI</a></strong> &bull;
    <a href="https://www.linkedin.com/in/alexcinovoj">Alex Cinovoj</a> &bull;
    Columbus, Ohio
  </p>
  <p>
    <a href="https://github.com/TechTideOhio/techtide-harness-kit/stargazers">Star us on GitHub</a> if this helps your team ship safer agent workflows.
  </p>
</div>
