<div align="center">

<img src="assets/logos/techtide-harness-kit-logo.png" alt="TechTide Harness Kit" width="140" />

# TechTide Harness Kit

**The enterprise skill platform for AI coding agents.**<br/>
385 production skills. 348 specialist agents. 6 cloud providers. 7 harnesses. One repo.

<br/>

<a href="https://www.npmjs.com/package/@techtideai/harness-kit"><img alt="npm" src="https://img.shields.io/npm/v/@techtideai/harness-kit.svg?style=flat-square&logo=npm&logoColor=white&color=CB3837" /></a>
<a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/license-Apache--2.0-3B82F6?style=flat-square" /></a>
<a href="https://github.com/TechTideOhio/techtide-harness-kit/actions/workflows/codeql.yml"><img alt="CodeQL" src="https://img.shields.io/github/actions/workflow/status/TechTideOhio/techtide-harness-kit/codeql.yml?branch=master&style=flat-square&label=CodeQL&logo=github" /></a>
<a href="https://scorecard.dev/viewer/?uri=github.com/TechTideOhio/techtide-harness-kit"><img alt="OpenSSF" src="https://img.shields.io/ossf-scorecard/github.com/TechTideOhio/techtide-harness-kit?style=flat-square&label=OpenSSF" /></a>
<a href="https://docs.npmjs.com/generating-provenance-statements"><img alt="Provenance" src="https://img.shields.io/badge/provenance-verified-26a566?style=flat-square&logo=npm&logoColor=white" /></a>

<br/><br/>

<a href="#-get-started">Get Started</a>&ensp;&middot;&ensp;<a href="#-works-with">Harnesses</a>&ensp;&middot;&ensp;<a href="#-cloud-coverage">Cloud Coverage</a>&ensp;&middot;&ensp;<a href="#-enterprise-trust">Trust</a>&ensp;&middot;&ensp;<a href="#-skill-anatomy">Anatomy</a>&ensp;&middot;&ensp;<a href="CATALOG.md">Full Catalog</a>&ensp;&middot;&ensp;<a href="CONTRIBUTING.md">Contribute</a>

<br/>

<img src="assets/readme/showcase-hero.svg" alt="385 skills, 348 agents, 27 providers flowing through the TechTide Harness Kit" width="100%" />

</div>

<br/>

> **Not an awesome-list.** Every skill ships with YAML-frontmatter tool scoping, inline assessment questions, safety checklists with blast-radius checks, and 9 JSON Schema contracts enforcing shape at CI time. Built for teams that answer to auditors, not just developers.

<br/>

## <img src="https://img.shields.io/badge/-Works_With-0D1117?style=flat-square" height="24" alt="Works With" />&ensp;Works With

<table>
<tr>
<td align="center" width="25%">

<br/>

<a href="docs/integrations/installation-guide.md#2-claude-code-anthropic"><img src="https://img.shields.io/badge/Claude_Code-D97706?style=for-the-badge&logo=anthropic&logoColor=white" alt="Claude Code" /></a>

**Anthropic Claude Code**

Native plugin marketplace. One command installs 348 agents with full trust metadata.

```
/plugin marketplace add
  TechTideOhio/techtide-harness-kit
```

<a href="docs/integrations/installation-guide.md#2-claude-code-anthropic">Install guide &rarr;</a>

<br/>

</td>
<td align="center" width="25%">

<br/>

<a href="docs/integrations/installation-guide.md#4-cursor"><img src="https://img.shields.io/badge/Cursor-00B4D8?style=for-the-badge&logo=cursor&logoColor=white" alt="Cursor" /></a>

**Cursor AI IDE**

Plugin directory integration. Clone once, get schema-validated skills across every provider lane.

```
git clone TechTideOhio/
  techtide-harness-kit
# Add as plugin directory
```

<a href="docs/integrations/installation-guide.md#4-cursor">Install guide &rarr;</a>

<br/>

</td>
<td align="center" width="25%">

<br/>

<a href="docs/integrations/installation-guide.md#7-openai-codex"><img src="https://img.shields.io/badge/Codex-10A37F?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI Codex" /></a>

**OpenAI Codex**

Marketplace plugin with dual-plugin architecture. Full agent catalog plus MCP trust references.

```
codex plugin marketplace add
  TechTideOhio/techtide-harness-kit
```

<a href="docs/integrations/installation-guide.md#7-openai-codex">Install guide &rarr;</a>

<br/>

</td>
<td align="center" width="25%">

<br/>

<a href="docs/integrations/lovable-skills.md"><img src="https://img.shields.io/badge/Lovable-FF3366?style=for-the-badge&logoColor=white" alt="Lovable" /></a>

**Lovable**

One ZIP per skill. Generate archives, upload to workspace. Vibe-coding with enterprise guardrails.

```bash
npm run lovable:write
# Upload ZIPs to Lovable workspace
```

<a href="docs/integrations/lovable-skills.md">Import guide &rarr;</a>

<br/>

</td>
</tr>
</table>

<details>
<summary><strong>More harnesses:</strong> GitHub Copilot, Gemini CLI, Kiro</summary>

<br/>

| Harness | Install | Format |
| --- | --- | --- |
| **GitHub Copilot** | `copilot plugin marketplace add TechTideOhio/techtide-harness-kit` | `.github/plugin/` manifest |
| **Gemini CLI** | `npx thk-export-agents --platform gemini --all --repo .` | Workspace skill adapters |
| **Kiro** | Add `powers/techtide-*` directories in Kiro panel | Powers packages |

Full comparison and install paths: [docs/integrations/installation-guide.md](docs/integrations/installation-guide.md)

</details>

<br/>

## <img src="https://img.shields.io/badge/-Get_Started-0D1117?style=flat-square" height="24" alt="Get Started" />&ensp;Get Started

```bash
npm install @techtideai/harness-kit

# Validate everything (25+ gates, no secrets required)
npm run validate

# Export agents for your harness
npx thk-export-agents --platform claude-code --provider aws --repo .
npx thk-export-agents --platform codex --role cloud-security-engineer --repo .
npx thk-export-agents --platform gemini --all --repo .
```

<br/>

## <img src="https://img.shields.io/badge/-By_The_Numbers-0D1117?style=flat-square" height="24" alt="By The Numbers" />&ensp;By The Numbers

| | | | |
| :---: | :---: | :---: | :---: |
| **385** | **348** | **6** | **33** |
| Production skills | Specialist agents | Cloud providers | Provider lanes |
| | | | |
| **9** | **25+** | **7** | **12** |
| JSON Schema contracts | Validation gates | Harness adapters | Core agent skills |

<br/>

## <img src="https://img.shields.io/badge/-Cloud_Coverage-0D1117?style=flat-square" height="24" alt="Cloud Coverage" />&ensp;Cloud Coverage

Every cloud has deep, provider-specific skills with inline assessment questions and validation checklists -- not generic templates with names swapped.

<img src="assets/readme/coverage-map.svg" alt="Coverage map: cloud, Kubernetes, NVIDIA, CNCF, FinOps, marketing, European cloud" width="100%" />

<table>
<tr>
<td width="50%">

**Major Cloud Providers**

| Provider | Skills | Highlights |
| --- | ---: | --- |
| **GCP** | 51 | AlloyDB AI, Anthos, Cloud Run, GKE, WAF (50+ questions) |
| **AWS** | 47 | WAF pillars, Bedrock security, Cost Explorer, IAM |
| **Alibaba** | 43 | ACK, AnalyticDB, China compliance, ActionTrail |
| **Huawei** | 43 | GaussDB HA, CCE, Cloud Eye, CBR backup |
| **OCI** | 41 | Autonomous DB, Cloud Guard, Full Stack DR |
| **Azure** | 36 | AI Foundry, AKS, App Service, Entra ID, WAF |

</td>
<td width="50%">

**Infrastructure & Governance**

| Lane | Skills | Highlights |
| --- | ---: | --- |
| **TechTide** | 24 | Production audit, agent autopsy, MCP trust |
| **Marketing** | 14 | Ad fairness (FHA/ECOA/EU AI Act), data min. |
| **Core** | 12 | Context mgmt, security, prompt hardening |
| **NVIDIA** | 12 | CUDA kernels, TensorRT-LLM, Triton, NGC |
| **Kubernetes** | 10 | External Secrets, RBAC, admission control |
| **CNCF** | 11 | Argo, Cilium, Falco, Istio, Kyverno, Velero |
| **FinOps** | 7 | Cross-cloud cost governance, showback |
| **European** | 30 | Hetzner, Contabo, IONOS, OVHcloud, Scaleway |

</td>
</tr>
</table>

<br/>

## <img src="https://img.shields.io/badge/-Skill_Anatomy-0D1117?style=flat-square" height="24" alt="Skill Anatomy" />&ensp;Skill Anatomy

Every skill follows a consistent, agent-optimized structure with least-privilege tool scoping:

```
skills/<provider>/<skill-id>/
  SKILL.md            # YAML frontmatter + workflow + assessment questions + checklist
  metadata.json       # Schema-validated: id, version, harnesses, official_docs
  references/         # Safety checklists, official sources, extended guidance
```

<table>
<tr>
<td width="50%">

**Frontmatter declares tool scope**

```yaml
---
name: techtide-aws-waf-reliability-review
description: "Review AWS workload reliability..."
allowed-tools: Read Grep Glob
metadata:
  author: "github: TechTide"
  version: "0.1.0"
  category: resilience
---
```

No `Write`. No `Bash`. No network. Least-privilege by default.

</td>
<td width="50%">

**Inline assessment questions + checklists**

```markdown
## Assessment Question Bank
### Compute and Autoscaling
1. Are all stateless tiers behind autoscaling?
2. Is scale-in protection set for in-flight?

## Validation Checklist
- [ ] Multi-AZ for all production compute
- [ ] Autoscaling configured for stateless
- [ ] Backup restore tested in last 30 days
- [ ] Circuit breakers on external calls
```

</td>
</tr>
</table>

<br/>

## <img src="https://img.shields.io/badge/-What_Ships-0D1117?style=flat-square" height="24" alt="What Ships" />&ensp;What Ships

| Surface | Purpose |
| --- | --- |
| `skills/` | Portable task workflows with frontmatter, assessment questions, and guardrails |
| `agents/` | Specialist roles with harness-specific adapters |
| `rules/` | Harness-specific operating guidance |
| `mcp/` | Trusted MCP server integration references |
| `catalog/` | Machine-readable indexes, trust metadata, roles, and integrity hashes |
| `schemas/` | 9 JSON Schema contracts enforcing skill and agent shape |
| `powers/` | Kiro Power packages |
| `plugins/` | Codex and Claude Code plugin packages |

<img src="assets/readme/harness-flow.svg" alt="Five-stage workflow: research, validate, export, review, ship" width="100%" />

<br/>

## <img src="https://img.shields.io/badge/-Enterprise_Trust-0D1117?style=flat-square" height="24" alt="Enterprise Trust" />&ensp;Enterprise Trust

<table>
<tr>
<td width="50%">

**Security & governance layers**

| Layer | What it does |
| --- | --- |
| Schema validation | 9 JSON Schemas enforce skill shape and trust fields |
| Tool scoping | `allowed-tools` in frontmatter -- least-privilege |
| Safety checklists | Blast radius, rollback paths, data impact |
| Approval gates | Read-first, approval-gated, target-confirmed |
| Trust metadata | Tool scopes, data classes, network posture |
| Provenance | npm provenance + SHA asset integrity hashes |
| CodeQL | Automated security scanning on every push |
| OpenSSF Scorecard | Supply chain security posture |

</td>
<td width="50%">

**Trust documentation**

| Document | Purpose |
| --- | --- |
| [TRUST.md](TRUST.md) | Trust posture and verification model |
| [DATA-HANDLING.md](DATA-HANDLING.md) | Data handling and privacy practices |
| [PROMPT-INJECTION.md](PROMPT-INJECTION.md) | Prompt injection defenses |
| [CONTROL-MAPPING.md](CONTROL-MAPPING.md) | Compliance control mapping |
| [SECURITY.md](SECURITY.md) | Vulnerability reporting |
| [EVALS.md](EVALS.md) | Evaluation and validation summary |

</td>
</tr>
</table>

<br/>

## <img src="https://img.shields.io/badge/-vs_Alternatives-0D1117?style=flat-square" height="24" alt="vs Alternatives" />&ensp;vs Alternatives

| Feature | TechTide Harness Kit | Awesome lists | Toolkit repos |
| --- | :---: | :---: | :---: |
| **Production skills** | 385 | Links only | 35-184 |
| **Cloud providers** | 6 | 0 | 1-2 |
| **Schema validation** | 9 schemas, 25+ gates | None | None |
| **Trust metadata** | Per-skill scopes + approval gates | None | None |
| **Safety checklists** | Blast radius + rollback | None | None |
| **Multi-harness** | 7 adapters | 1 | 1-2 |
| **Assessment questions** | Provider-specific banks | None | None |
| **Enterprise governance** | OpenSSF, CodeQL, provenance | None | None |
| **European cloud** | 5 providers, 30 skills | None | None |
| **NVIDIA / GPU** | CUDA, TensorRT, Triton | None | None |

<br/>

## <img src="https://img.shields.io/badge/-Commands-0D1117?style=flat-square" height="24" alt="Common Commands" />&ensp;Common Commands

```bash
# Validate everything (25+ gates)
npm run validate

# Check trust + proof layer
npm run trust:check && npm run proof-layer:check

# Export agents
npm run agents:export -- --list
npm run agents:export -- --platform claude-code --provider aws --repo .
npm run agents:export -- --platform codex --all --repo .

# Regenerate artifacts
npm run proof-layer:write && npm run plugin-manifest:write
```

<br/>

## <img src="https://img.shields.io/badge/-Documentation-0D1117?style=flat-square" height="24" alt="Documentation" />&ensp;Documentation

| Topic | Link |
| --- | --- |
| Installation guide | [docs/integrations/installation-guide.md](docs/integrations/installation-guide.md) |
| Harness compatibility | [docs/compatibility.md](docs/compatibility.md) |
| Cross-harness skills | [docs/cross-harness-skills.md](docs/cross-harness-skills.md) |
| Marketplace model | [docs/marketplace-model.md](docs/marketplace-model.md) |
| Quality bar | [docs/quality-bar.md](docs/quality-bar.md) |
| Taxonomy | [docs/taxonomy.md](docs/taxonomy.md) |
| Lovable skill imports | [docs/integrations/lovable-skills.md](docs/integrations/lovable-skills.md) |
| External skill research | [docs/external-skill-research.md](docs/external-skill-research.md) |

<br/>

## <img src="https://img.shields.io/badge/-Contributing-0D1117?style=flat-square" height="24" alt="Contributing" />&ensp;Contributing

Contributions should be evidence-backed, source-grounded, and safe by default.

1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Run `npm run validate` before opening a PR
3. Every skill needs: `SKILL.md` with frontmatter, `metadata.json` matching schema, and official doc references

Report vulnerabilities through [SECURITY.md](SECURITY.md). Do not open public issues containing exploit details, real credentials, customer data, or internal system identifiers.

---

<div align="center">

<br/>

**Built by [TechTide AI](https://techtideai.io/)** &ensp;&middot;&ensp; [Alex Cinovoj](https://www.linkedin.com/in/alexcinovoj) &ensp;&middot;&ensp; Columbus, Ohio

[Star this repo](https://github.com/TechTideOhio/techtide-harness-kit/stargazers) if it helps your team ship safer agent workflows.

<br/>

</div>
