#!/usr/bin/env node
/**
 * Generate and validate public proof-layer artifacts.
 *
 * This script keeps the human-facing catalog, eval summary, enterprise
 * missions, and machine-readable skill trust manifest aligned with the live
 * JSON catalogs. It intentionally uses only Node standard library APIs so it
 * can run in CI without adding install-time risk.
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const today = "2026-05-17";

const mode = new Set(process.argv.slice(2));
const writeMode = mode.has("--write");
const checkMode = mode.has("--check");

if (!writeMode && !checkMode) {
  console.error("Usage: node scripts/proof-layer.mjs --write|--check [--catalog] [--evals] [--trust] [--missions]");
  process.exit(2);
}

const selected = {
  catalog: mode.has("--catalog") || (!mode.has("--evals") && !mode.has("--trust") && !mode.has("--missions")),
  evals: mode.has("--evals") || (!mode.has("--catalog") && !mode.has("--trust") && !mode.has("--missions")),
  trust: mode.has("--trust") || (!mode.has("--catalog") && !mode.has("--evals") && !mode.has("--missions")),
  missions: mode.has("--missions") || (!mode.has("--catalog") && !mode.has("--evals") && !mode.has("--trust")),
};

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, rel), "utf8"));
}

function posix(rel) {
  return rel.split(path.sep).join("/");
}

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function groupedCount(items, field) {
  const counts = new Map();
  for (const item of items) {
    counts.set(item[field], (counts.get(item[field]) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

const pkg = readJson("package.json");
const skills = readJson("catalog/skills.json");
const agents = readJson("catalog/agents.json");
const roles = readJson("catalog/install-roles.json").roles ?? {};
const quarantine = readJson("catalog/skill-research-quarantine.json");

const promotedExternal = (quarantine.entries ?? []).filter((entry) => entry.status === "promoted");
const externalByProvider = groupedCount(promotedExternal, "provider");

const proofSources = [
  ["Eliza.com", "https://eliza.com/"],
  ["Eliza approach", "https://eliza.com/our-approach"],
  ["PwC responsible AI agents", "https://www.pwc.com/us/en/tech-effect/ai-analytics/responsible-ai-agents.html"],
  ["PwC and Anthropic enterprise agents", "https://www.pwc.com/us/en/about-us/newsroom/press-releases/pwc-anthropic-ai-native-finance-life-sciences-enterprise-agents.html"],
  ["OpenAI Frontier Alliances", "https://openai.com/index/frontier-alliance-partners/"],
  ["OpenAI Deployment Company", "https://openai.com/index/openai-launches-the-deployment-company/"],
  ["OpenAI Promptfoo acquisition", "https://openai.com/index/openai-to-acquire-promptfoo/"],
  ["NVIDIA Enterprise AI Factory", "https://developer.nvidia.com/blog/powering-ai-factories-with-nvidia-enterprise-reference-architectures/"],
  ["OWASP Agentic Skills Top 10", "https://owasp.org/www-project-agentic-skills-top-10/"],
  ["OWASP LLM Top 10", "https://genai.owasp.org/llm-top-10/"],
  ["NIST AI RMF", "https://www.nist.gov/itl/ai-risk-management-framework"],
  ["MITRE ATLAS", "https://atlas.mitre.org/"],
];

const missionDefinitions = [
  {
    id: "discover",
    name: "Discover",
    summary: "Map a workflow, score value and risk, define an ROI hypothesis, and identify the smallest governed pilot.",
    risk_tier: "L1",
    data_classes: ["sanitized-workflow-notes", "public-docs", "redacted-process-metadata"],
    approval_gates: ["business-owner confirms scope", "security owner confirms data class"],
    eval_guidance: ["workflow map has owner, trigger, systems, failure modes", "risk tier is justified before build work begins"],
    recommended_skills: [
      "techtide-prompt-to-architecture-extractor",
      "techtide-context-packaging-onboarding",
      "techtide-cost-aware-model-routing",
    ],
  },
  {
    id: "build",
    name: "Build",
    summary: "Turn the chosen pilot into a prototype-to-production handoff with repo onboarding, tool routing, and implementation proof.",
    risk_tier: "L2",
    data_classes: ["source-code", "sanitized-fixtures", "non-production-configuration"],
    approval_gates: ["repo owner approves write scope", "human reviews code before merge"],
    eval_guidance: ["implementation plan names files and rollback", "tests or manual proofs cover user-facing behavior"],
    recommended_skills: [
      "techtide-lovable-production-handoff",
      "techtide-ai-tool-decision-router",
      "techtide-test-generation-validation-debt",
    ],
  },
  {
    id: "govern",
    name: "Govern",
    summary: "Define permissions, approvals, identity posture, audit logging, MCP/tool trust, and runtime guardrails.",
    risk_tier: "L3",
    data_classes: ["permission-inventory", "redacted-secrets-presence", "audit-metadata"],
    approval_gates: ["security owner approves tool scopes", "named approver required for production mutation"],
    eval_guidance: ["dangerous actions are blocked or gated", "tool permissions distinguish read, write, network, and secret access"],
    recommended_skills: [
      "techtide-mcp-tool-trust-review",
      "techtide-human-approval-gate-designer",
      "techtide-ai-generated-code-security-hardener",
    ],
  },
  {
    id: "prove",
    name: "Prove",
    summary: "Run evals, golden traces, adversarial prompts, regression tests, and evidence summaries before promotion.",
    risk_tier: "L2",
    data_classes: ["test-fixtures", "redacted-traces", "validation-results"],
    approval_gates: ["release owner accepts residual risk", "security findings are triaged before production"],
    eval_guidance: ["prompt-injection and tool-misuse fixtures pass", "validation output is reproducible from documented commands"],
    recommended_skills: [
      "techtide-agent-autopsy-report",
      "techtide-lovable-self-heal-debugger",
      "techtide-skill-extraction-promotion",
    ],
  },
  {
    id: "transfer",
    name: "Transfer",
    summary: "Package docs, runbooks, ownership, training, and support loops so the client team can own the agent workflow.",
    risk_tier: "L1",
    data_classes: ["runbooks", "training-material", "sanitized-decision-log"],
    approval_gates: ["business owner accepts runbook", "operator confirms escalation path"],
    eval_guidance: ["runbook covers normal, degraded, and rollback states", "ownership and maintenance cadence are explicit"],
    recommended_skills: [
      "techtide-cross-harness-export-hygiene",
      "techtide-windows-local-automation-guard",
      "techtide-knowledge-ingestion-guardrail-review",
    ],
  },
];

function trustEntry(skill) {
  const text = `${skill.summary}\n${skill.security_notes}`.toLowerCase();
  const isLive = /live|production|mutation|delete|deploy|rollback|approval|secret|credential/.test(text);
  const isExternal = promotedExternal.find((entry) => `techtide-${entry.id}` === skill.id || entry.id === skill.id);
  const sourceEvidence = isExternal
    ? {
        source_repo: isExternal.source_repo,
        source_path: isExternal.source_path,
        source_license: isExternal.source_license,
        import_mode: isExternal.import_mode,
        verification_status: isExternal.validation_status,
      }
    : {
        source_repo: "https://github.com/TechTideOhio/techtide-harness-kit",
        source_path: skill.path,
        source_license: pkg.license,
        import_mode: "techtide-original-or-curated",
        verification_status: "catalog-validated",
      };

  return {
    id: skill.id,
    risk_tier: isLive ? "L3" : "L1",
    data_classes: isLive
      ? ["source-code", "cloud-metadata", "redacted-operational-evidence"]
      : ["public-docs", "source-code", "sanitized-fixtures"],
    tool_permissions: {
      filesystem: "read",
      shell: isLive ? "approval-required" : "none-by-default",
      network: "docs-and-approved-apis-only",
      secrets: "forbidden",
    },
    network_egress: {
      default: "deny",
      allowed_when: "official docs, package registries, or explicitly approved provider APIs",
    },
    approval_gates: isLive
      ? ["target-specific human approval", "dry-run or current-state evidence", "rollback or recovery note"]
      : ["human review before merge or external publication"],
    agent_identity_mode: "delegated-user-or-repo-assistant",
    audit_events: ["skill_selected", "source_checked", "tool_scope_reviewed", "approval_recorded", "result_reported"],
    control_mappings: ["OWASP-LLM01", "OWASP-LLM02", "OWASP-AST03", "NIST-AI-RMF-MEASURE", "OpenSSF-Scorecard"],
    evidence_links: [skill.path, "SECURITY.md", "TRUST.md", "CONTROL-MAPPING.md"],
    source_evidence: sourceEvidence,
  };
}

function generatedHeader() {
  return "<!-- Generated by scripts/proof-layer.mjs. Do not edit by hand. -->\n\n";
}

function renderCatalog() {
  const providerRows = groupedCount(skills, "provider")
    .map(([provider, count]) => `| ${provider} | ${count} |`)
    .join("\n");
  const agentRows = groupedCount(agents, "provider")
    .map(([provider, count]) => `| ${provider} | ${count} |`)
    .join("\n");
  const roleRows = Object.entries(roles)
    .slice(0, 12)
    .map(([id, role]) => `| \`${id}\` | ${role.description ?? "Role export pack"} |`)
    .join("\n");
  const externalRows = externalByProvider
    .map(([provider, count]) => `| ${provider} | ${count} |`)
    .join("\n");

  return `${generatedHeader()}# TechTide Harness Kit Catalog

Generated: ${today}

TechTide Harness Kit ships **${skills.length} skills**, **${agents.length} agents**, **${promotedExternal.length} promoted external research candidates**, and **${Object.keys(roles).length} install roles**.

The best way to read the catalog is not as a giant list. It is a set of portable, eval-backed implementation assets for cloud, security, compliance, and agent engineering work.

## Best First Paths

| Need | Start here |
| --- | --- |
| Install agents into a coding harness | \`npm run agents:export -- --help\` and [docs/integrations/installation-guide.md](docs/integrations/installation-guide.md) |
| Pick an enterprise implementation workflow | [catalog/enterprise-missions.json](catalog/enterprise-missions.json) |
| Check trust posture | [TRUST.md](TRUST.md), [catalog/skill-trust.json](catalog/skill-trust.json), [CONTROL-MAPPING.md](CONTROL-MAPPING.md) |
| Review validation evidence | [EVALS.md](EVALS.md) |
| Understand external skill research | [docs/external-skill-research.md](docs/external-skill-research.md) |

## Skills By Provider

| Provider | Skills |
| --- | ---: |
${providerRows}

## Agents By Provider

| Provider | Agents |
| --- | ---: |
${agentRows}

## Promoted External Research By Provider

| Provider lane | Promoted candidates |
| --- | ---: |
${externalRows}

## Role-Based Entry Points

| Role | Use |
| --- | --- |
${roleRows}

## Production-Safe Packs

- **Live guards:** approval-gated cloud and Kubernetes mutation workflows with target confirmation and rollback posture.
- **Enterprise missions:** discover, build, govern, prove, and transfer workflows for implementation teams.
- **External provider lanes:** Claude Code, Codex, Gemini, Cursor, Kiro, Lovable, Replit, v0, and Vercel assets that passed source and licensing gates.
- **Security review:** MCP/tool trust, untrusted code hardening, prompt-injection defense, and approval-gate design.

## Catalog Sources

- [catalog/skills.json](catalog/skills.json)
- [catalog/agents.json](catalog/agents.json)
- [catalog/install-roles.json](catalog/install-roles.json)
- [catalog/skill-research-quarantine.json](catalog/skill-research-quarantine.json)
- [catalog/skill-trust.json](catalog/skill-trust.json)
`;
}

function renderEvals() {
  return `${generatedHeader()}# TechTide Harness Kit Evals

Generated: ${today}

This repo uses eval-driven development. The public proof layer summarizes what CI and local validation should prove before release.

## Current Inventory

| Asset | Count |
| --- | ---: |
| Skills | ${skills.length} |
| Agents | ${agents.length} |
| Promoted external candidates | ${promotedExternal.length} |
| Install roles | ${Object.keys(roles).length} |
| Enterprise missions | ${missionDefinitions.length} |

## Reproduce The Core Gates

\`\`\`bash
npm run validate
npm run trust:check
npm run external-skills:check
\`\`\`

## Focused Proof Commands

| Gate | Command | What it proves |
| --- | --- | --- |
| Catalog schema and metadata | \`npm run validate:catalog\` | Catalog entries resolve to real assets and have required fields. |
| Skill frontmatter | \`npm run validate:skill-schema\` | SKILL.md files carry valid frontmatter. |
| Agent frontmatter | \`npm run validate:agent-schema\` | AGENT.md files carry valid frontmatter. |
| External research | \`npm run external-skills:check\` | Promoted candidates have verified source, license posture, provider mapping, and guardrails. |
| Trust metadata | \`npm run trust:check\` | Every skill has risk tier, data classes, tool permissions, approvals, identity mode, audit events, and control mappings. |
| Install coverage | \`npm run validate:install-coverage\` | Role exports reference valid agents and skills. |
| Fuzz/property checks | \`npm run test:fuzz\` | Deterministic properties hold across generated assets. |

## Eval Bar

- No promoted skill ships without source evidence and security notes.
- No live or production-impacting workflow ships without approval gates and rollback/recovery posture.
- No provider lane claims native support unless current primary docs or verified repositories back the claim.
- No compliance output is represented as legal/audit certification; artifacts support evidence collection and review.

Detailed proof is summarized here and checked by the validation commands above.
`;
}

function renderTrust() {
  return `${JSON.stringify({
    manifest_version: 1,
    generated_by: "scripts/proof-layer.mjs",
    generated_at: today,
    owner: "Alex Cinovoj / TechTide",
    policy: {
      default_network_egress: "deny",
      secrets_policy: "forbidden unless a human explicitly supplies scoped, non-published credentials for a local task",
      production_mutation_policy: "target-specific approval plus dry-run/current-state evidence and rollback notes required",
      compliance_posture: "evidence-supporting artifacts, not auditor attestation",
    },
    counts: {
      skills: skills.length,
      promoted_external_candidates: promotedExternal.length,
    },
    skills: skills.map(trustEntry).sort((a, b) => a.id.localeCompare(b.id)),
  }, null, 2)}\n`;
}

function renderMissions() {
  return `${JSON.stringify({
    manifest_version: 1,
    generated_by: "scripts/proof-layer.mjs",
    generated_at: today,
    owner: "Alex Cinovoj / TechTide",
    positioning: "Implementation-grade enterprise agent missions that sit above individual skills.",
    missions: missionDefinitions,
  }, null, 2)}\n`;
}

function validateTrust(trust) {
  const required = [
    "risk_tier",
    "data_classes",
    "tool_permissions",
    "network_egress",
    "approval_gates",
    "agent_identity_mode",
    "audit_events",
    "control_mappings",
    "evidence_links",
    "source_evidence",
  ];
  const errors = [];
  if ((trust.skills ?? []).length !== skills.length) {
    errors.push(`trust manifest skill count ${trust.skills?.length ?? 0} != catalog skill count ${skills.length}`);
  }
  for (const entry of trust.skills ?? []) {
    for (const field of required) {
      if (entry[field] == null) errors.push(`${entry.id}: missing ${field}`);
    }
    if (!Array.isArray(entry.approval_gates) || entry.approval_gates.length === 0) {
      errors.push(`${entry.id}: approval_gates must be non-empty`);
    }
    if (entry.tool_permissions?.secrets !== "forbidden") {
      errors.push(`${entry.id}: secrets permission must default to forbidden`);
    }
    if (entry.network_egress?.default !== "deny") {
      errors.push(`${entry.id}: network egress must default deny`);
    }
  }
  return errors;
}

function validateMissions(missions) {
  const errors = [];
  for (const mission of missions.missions ?? []) {
    for (const field of ["id", "name", "summary", "risk_tier", "data_classes", "approval_gates", "eval_guidance", "recommended_skills"]) {
      if (mission[field] == null) errors.push(`${mission.id ?? "<unknown>"}: missing ${field}`);
    }
    for (const skillId of mission.recommended_skills ?? []) {
      if (!skills.some((skill) => skill.id === skillId)) {
        errors.push(`${mission.id}: recommended skill does not exist: ${skillId}`);
      }
    }
  }
  return errors;
}

const outputs = new Map();
if (selected.catalog) outputs.set("CATALOG.md", renderCatalog());
if (selected.evals) outputs.set("EVALS.md", renderEvals());
if (selected.trust) outputs.set("catalog/skill-trust.json", renderTrust());
if (selected.missions) outputs.set("catalog/enterprise-missions.json", renderMissions());

let changed = 0;
const errors = [];

for (const [rel, next] of outputs) {
  const abs = path.join(repoRoot, rel);
  if (checkMode) {
    if (!fs.existsSync(abs)) {
      errors.push(`${rel} is missing; run proof-layer generator`);
      continue;
    }
    const current = fs.readFileSync(abs, "utf8");
    if (current !== next) {
      errors.push(`${rel} is stale; run proof-layer generator`);
    }
  } else {
    const current = fs.existsSync(abs) ? fs.readFileSync(abs, "utf8") : "";
    if (current !== next) {
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, next, "utf8");
      changed += 1;
    }
  }
}

const trust = JSON.parse(outputs.get("catalog/skill-trust.json") ?? (fs.existsSync(path.join(repoRoot, "catalog/skill-trust.json")) ? fs.readFileSync(path.join(repoRoot, "catalog/skill-trust.json"), "utf8") : "{}"));
errors.push(...validateTrust(trust));
const missions = JSON.parse(outputs.get("catalog/enterprise-missions.json") ?? (fs.existsSync(path.join(repoRoot, "catalog/enterprise-missions.json")) ? fs.readFileSync(path.join(repoRoot, "catalog/enterprise-missions.json"), "utf8") : "{}"));
errors.push(...validateMissions(missions));

if (errors.length > 0) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exit(1);
}

console.log(checkMode
  ? `OK: proof layer in sync (${skills.length} skills, ${agents.length} agents, ${promotedExternal.length} promoted external candidates)`
  : `OK: wrote proof layer (${changed} files changed, ${sha256([...outputs.values()].join("\n")).slice(0, 12)} digest)`);
