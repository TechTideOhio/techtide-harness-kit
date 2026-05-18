#!/usr/bin/env node
/**
 * Generate and validate the Alex Cinovoj / TechTide skill extraction pack.
 *
 * The script intentionally stores sanitized pattern summaries, not raw local
 * source text. Local source paths are normalized to $TECHTIDE_ROOT anchors so
 * the public repo does not embed workstation-specific absolute paths.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const generatedBy = "scripts/techtide-skill-ingestion.mjs";
const updated = "2026-05-17";
const author = "Alex Cinovoj / TechTide";
const catalogAuthor = "github: TechTide";
const provider = "techtide";
const version = "0.1.0";
const harnesses = ["codex", "claude-code", "copilot", "gemini", "cursor", "kiro", "other"];
const nativeSkillHarnesses = new Set(["codex", "claude-code", "copilot", "gemini", "kiro"]);
const adapterHarnesses = new Set(["cursor", "lovable", "v0", "replit", "other"]);

const curatedRoots = [
  "$TECHTIDE_ROOT/Claude/skills",
  "$TECHTIDE_ROOT/Claude/*.md",
  "$TECHTIDE_ROOT/Docs",
  "$TECHTIDE_ROOT/Apps/TechTideAI",
  "$TECHTIDE_ROOT/Apps/Lovable2",
  "$TECHTIDE_ROOT/Apps/TheLovables",
  "$TECHTIDE_ROOT/Apps/*/{AGENTS.md,CLAUDE.md,README.md,docs,runbooks}",
];

const excludedSourceClasses = [
  ".git",
  "node_modules",
  "dist",
  "build",
  ".next",
  ".cache",
  ".env",
  "*.csv",
  "*.log",
  "raw lead lists",
  "customer/prospect exports",
  "tokens, keys, DSNs, JWTs, and service-role secrets",
];

const officialDocs = {
  claude: "https://docs.anthropic.com/en/docs/claude-code/overview",
  codex: "https://developers.openai.com/codex/",
  copilot: "https://code.visualstudio.com/docs/copilot/customization/agent-skills",
  gemini: "https://ai.google.dev/gemini-api/docs",
  cursor: "https://docs.cursor.com/context/rules",
  kiro: "https://kiro.dev/docs/skills/",
  lovable: "https://docs.lovable.dev/features/skills",
  v0: "https://vercel.com/docs/agent-resources/skills",
  replit: "https://docs.replit.com/core-concepts/agent/skills",
  npm: "https://docs.npmjs.com/",
};

const sharedAdapterNotes = [
  "Keep Claude Code, Codex, Gemini, Copilot, and Kiro exports as real SKILL.md assets when their native surface is targeted.",
  "Represent Cursor as focused project rules or workflow notes, not a fake skill bundle.",
  "Represent Kiro steering separately from Kiro skills when the workflow is project context rather than a portable package.",
  "Represent Lovable, v0/Vercel, and Replit with provider-native packaging only after primary-source verification; otherwise keep prompt kits, readiness checklists, and handoff workflows.",
  "Do not copy private local project data into any adapter output.",
];

const skillDefinitions = [
  {
    id: "techtide-ai-tool-decision-router",
    name: "TechTide Tool Decision Router",
    category: "ai",
    lifecycle: "stable",
    summary: "Route development work to Cursor, Claude Code, Codex, Lovable, v0, Replit, or a human approval lane based on scope, blast radius, context size, and verification needs.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Docs/Planning/TechTide_AI_Monetization_Atlas_V3.1_Final.md",
      "$TECHTIDE_ROOT/Docs/STACK.md",
      "$TECHTIDE_ROOT/Claude/skills/cost/SKILL.md",
    ],
    workflow: [
      "Classify the request as quick edit, multi-file implementation, prototype, UI generation, deployable app, research, or risky operation.",
      "Choose Cursor for fast local editing and single-file iteration, Claude Code or Codex for multi-file reasoning and validation, Lovable/v0/Replit for prototype surfaces, and human approval for risky changes.",
      "State the selected tool lane and the reason in one sentence before acting.",
      "Define the smallest validation loop that proves the work, including tests, screenshots, scans, or manual review.",
      "Escalate to a stronger lane when the task crosses repository, security, data, or production boundaries.",
    ],
    outputs: ["tool lane", "reason", "handoff prompt", "validation loop", "approval gate"],
    docs: [officialDocs.claude, officialDocs.codex, officialDocs.cursor, officialDocs.replit],
    security: "Never route secret handling, live credentials, production mutation, or customer data through a prototype tool. Require explicit approval before external network or deploy actions.",
  },
  {
    id: "techtide-lovable-build-loop-operator",
    name: "TechTide Lovable Build Loop Operator",
    category: "delivery",
    lifecycle: "stable",
    summary: "Operate the Lovable build loop from prompt setup through scaffold, iteration, preview verification, export, and repo handoff while keeping app output inspectable.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Claude/BUILD-LOOP.md",
      "$TECHTIDE_ROOT/Claude/LOVABLE-PATTERNS.md",
      "$TECHTIDE_ROOT/Claude/LESSONS.md",
    ],
    workflow: [
      "Prepare one concise build prompt with user goal, stack, pages, data model, states, and non-goals.",
      "Let Lovable scaffold, then wait for task completion before judging the result.",
      "Verify the preview by route, viewport, console, and visible app state instead of trusting the tool summary.",
      "Use focused follow-up prompts for errors, missing dependencies, auth bypasses, and design token corrections.",
      "Export or mirror the result into a normal repo before treating it as production candidate code.",
    ],
    outputs: ["Lovable prompt", "iteration log", "verification notes", "handoff checklist"],
    docs: [officialDocs.lovable, officialDocs.claude],
    security: "Use mock data by default. Do not paste real credentials, customer records, or private business exports into Lovable prompts or previews.",
  },
  {
    id: "techtide-lovable-self-heal-debugger",
    name: "TechTide Lovable Self-Heal Debugger",
    category: "resilience",
    lifecycle: "stable",
    summary: "Diagnose Lovable app failures with a repeatable wait, inspect, isolate, prompt, and verify loop for dependency, iframe, auth, routing, and preview-cache issues.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Claude/SELF-HEAL.md",
      "$TECHTIDE_ROOT/Claude/LESSONS.md",
      "$TECHTIDE_ROOT/Claude/LOVABLE-PATTERNS.md",
    ],
    workflow: [
      "Capture the visible failure, console symptom, affected route, and last prompt before changing anything.",
      "Wait for Lovable's own auto-fix cycle when it is active, then refresh the preview before escalating.",
      "Separate generation failures from preview iframe, browser extension, package, and auth-guard failures.",
      "Send a narrow repair prompt that names the symptom, likely cause, file area, and expected proof.",
      "Verify the fix in preview and record the pattern for future prompt hardening.",
    ],
    outputs: ["failure classification", "repair prompt", "verification evidence", "lesson learned"],
    docs: [officialDocs.lovable],
    security: "Do not disable authentication, authorization, or validation in production code. Temporary mock bypasses must be labeled as prototype-only.",
  },
  {
    id: "techtide-lovable-production-handoff",
    name: "TechTide Lovable Production Handoff",
    category: "delivery",
    lifecycle: "beta",
    summary: "Convert a Lovable prototype into a repo-owned production candidate by extracting code, documenting assumptions, replacing mocks, and adding tests and deployment gates.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Claude/BUILD-LOOP.md",
      "$TECHTIDE_ROOT/Claude/Lovable_Comprehensive_Analysis.md",
      "$TECHTIDE_ROOT/Docs/TESTING.md",
    ],
    workflow: [
      "Inventory routes, components, data calls, auth behavior, environment variables, and dependencies.",
      "Mark every mock, localStorage fallback, and placeholder integration before replacing anything.",
      "Move code into a normal repo with package manager, lint, test, build, and deployment scripts.",
      "Add smoke tests around user-critical flows and visual checks for the first viewport.",
      "Block production promotion until secrets, auth, observability, and rollback posture are documented.",
    ],
    outputs: ["handoff inventory", "mock replacement plan", "test plan", "production gate report"],
    docs: [officialDocs.lovable, officialDocs.npm],
    security: "Treat app code as untrusted until reviewed for auth bypasses, permissive CORS, exposed keys, injection risks, and missing rate limits.",
  },
  {
    id: "techtide-v0-ui-prompt-hardener",
    name: "TechTide v0 UI Prompt Hardener",
    category: "delivery",
    lifecycle: "beta",
    summary: "Shape v0 UI prompts into implementable, accessible, responsive interface specifications with explicit data states, constraints, and handoff checks.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Claude/PATHSENSE-DESIGN-UPGRADE.md",
      "$TECHTIDE_ROOT/Claude/AUTOBROKER-DESIGN-UPGRADE.md",
      "$TECHTIDE_ROOT/Claude/skills/design/persyn-design-stack-research.md",
    ],
    workflow: [
      "Translate vague UI intent into screen, component, state, interaction, and responsive requirements.",
      "Name the data shape and loading, empty, error, disabled, and success states before generation.",
      "Specify accessibility, contrast, keyboard, focus, and text-fitting constraints.",
      "Ask v0 for implementation-ready code plus notes about assumptions and unsupported pieces.",
      "Review output for overbroad dependencies, hardcoded secrets, unusable layouts, and missing states.",
    ],
    outputs: ["v0 prompt", "UI state checklist", "handoff review", "follow-up patch prompt"],
    docs: [officialDocs.v0],
    security: "Do not request real customer data, private brand exports, or production credentials in UI prompts. Replace secrets with placeholders.",
  },
  {
    id: "techtide-replit-fullstack-bootstrap",
    name: "TechTide Replit Full-Stack Bootstrap",
    category: "delivery",
    lifecycle: "beta",
    summary: "Bootstrap Replit projects with a clear app contract, environment variable model, test loop, deployment boundary, and migration path back into a durable repository.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Docs/Planning/TechTide_AI_Monetization_Atlas_V3.1_Final.md",
      "$TECHTIDE_ROOT/Docs/TESTING.md",
      "$TECHTIDE_ROOT/Claude/skills/init/SKILL.md",
    ],
    workflow: [
      "Define runtime, package manager, app entrypoint, persistence layer, and public/private environment variables.",
      "Generate only the smallest vertical slice that can run in Replit and prove the app loop.",
      "Add a health check, smoke test, and README commands before expanding features.",
      "Keep credentials in Replit secrets and record only variable names in code or docs.",
      "Plan repo migration once the prototype needs CI, private deployment, custom infrastructure, or deep tests.",
    ],
    outputs: ["bootstrap prompt", "env contract", "smoke test plan", "repo migration checklist"],
    docs: [officialDocs.replit, officialDocs.npm],
    security: "Do not store production secrets in files. Treat public repls as public code and data surfaces.",
  },
  {
    id: "techtide-cursor-claude-codex-workflow-router",
    name: "TechTide Cursor Claude Codex Workflow Router",
    category: "ai",
    lifecycle: "stable",
    summary: "Coordinate Cursor, Claude Code, and Codex across a coding task so inline edits, repo reasoning, tests, and final review happen in the right lane.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Docs/Planning/TechTide_AI_Monetization_Atlas_V3.1_Final.md",
      "$TECHTIDE_ROOT/Apps/TechTideAI/AGENTS.md",
      "$TECHTIDE_ROOT/Claude/skills/init/SKILL.md",
    ],
    workflow: [
      "Use Cursor for narrow IDE-local edits, symbol-aware refactors, and quick UI or type fixes.",
      "Use Claude Code or Codex for repository-wide exploration, multi-file implementation, test repair, and safety review.",
      "Keep one source of truth for plan, assumptions, and validation so tools do not fork the task.",
      "After cross-tool work, run tests and scan the diff from a neutral reviewer stance.",
      "Record tool-specific discoveries as reusable rules, not one-off chat memory.",
    ],
    outputs: ["tool split", "handoff context", "validation transcript", "rule candidate"],
    docs: [officialDocs.cursor, officialDocs.claude, officialDocs.codex],
    security: "Never let one tool silently undo another tool's edits. Review diffs before committing or deploying code.",
  },
  {
    id: "techtide-agent-autopsy-report",
    name: "TechTide Agent Autopsy Report",
    category: "observability",
    lifecycle: "stable",
    summary: "Perform post-run analysis of failed or risky agent work by reconstructing goal, context, tool calls, failure mode, missing guardrails, and preventive skill updates.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Docs/Planning/TechTide_AI_Monetization_Atlas_V3.1_Final.md",
      "$TECHTIDE_ROOT/Claude/skills/hooks-config/SKILL.md",
      "$TECHTIDE_ROOT/Claude/skills/resume/SKILL.md",
    ],
    workflow: [
      "State the intended outcome and the actual outcome without blame.",
      "Reconstruct the context, assumptions, tool calls, diffs, logs, and user interruptions that mattered.",
      "Classify the failure as context loss, tool misuse, validation gap, unsafe autonomy, prompt ambiguity, or external dependency.",
      "Identify the earliest practical detection point.",
      "Produce a patch, test, rule, or skill update that would prevent recurrence.",
    ],
    outputs: ["autopsy report", "root cause", "detection point", "prevention patch"],
    docs: [officialDocs.claude, officialDocs.codex],
    security: "Redact secrets, PII, tokens, and private customer details from logs before including them in an autopsy artifact.",
  },
  {
    id: "techtide-production-readiness-audit",
    name: "TechTide Production Readiness Audit",
    category: "architecture",
    lifecycle: "stable",
    summary: "Audit rapidly built applications for production readiness across auth, secrets, data, tests, observability, rollback, deployment, and operational ownership.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Docs/CONCERNS.md",
      "$TECHTIDE_ROOT/Docs/TESTING.md",
      "$TECHTIDE_ROOT/Apps/TechTideAI/DEPLOYMENT.md",
    ],
    workflow: [
      "Inventory user flows, privileged actions, data stores, external services, and deploy surfaces.",
      "Check auth, authorization, secret handling, rate limits, input validation, and data retention.",
      "Run or define build, unit, integration, smoke, and rollback validation.",
      "Classify gaps as launch-blocking, pre-launch, post-launch, or accepted risk.",
      "Produce a go/no-go recommendation with owners and evidence links.",
    ],
    outputs: ["readiness matrix", "risk register", "test evidence", "go/no-go recommendation"],
    docs: [officialDocs.claude, officialDocs.codex],
    security: "Treat absent auth, leaked secrets, destructive migrations, and untested payment or data flows as launch blockers.",
  },
  {
    id: "techtide-ai-generated-code-security-hardener",
    name: "TechTide Code Security Hardener",
    category: "security",
    lifecycle: "stable",
    summary: "Harden untrusted code by reviewing authentication, authorization, injection surfaces, dependency risk, secret exposure, unsafe defaults, and data handling.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Claude/skills/design/SECURITY-AUDIT.md",
      "$TECHTIDE_ROOT/Docs/CONVENTIONS.md",
      "$TECHTIDE_ROOT/Docs/CONCERNS.md",
    ],
    workflow: [
      "Identify changed files, external dependencies, runtime permissions, and data flows.",
      "Review auth boundaries, access checks, input validation, output encoding, CORS, storage, and logging.",
      "Search for secret patterns, broad tokens, hardcoded URLs, admin defaults, and mock bypasses.",
      "Require tests or manual proofs for each security claim.",
      "Return a prioritized fix list with exact files, risk, and verification method.",
    ],
    outputs: ["security findings", "fix list", "verification checklist", "residual risk"],
    docs: [officialDocs.claude, officialDocs.codex],
    security: "Do not execute unknown code or dependency install scripts unless the user explicitly approves the risk.",
  },
  {
    id: "techtide-mcp-tool-trust-review",
    name: "TechTide MCP Tool Trust Review",
    category: "security",
    lifecycle: "stable",
    summary: "Review MCP servers, tool connectors, and agent tool surfaces for trust boundaries, credential scope, network egress, mutation risk, logging, and approval gates.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Docs/STACK.md",
      "$TECHTIDE_ROOT/Claude/skills/hooks-config/SKILL.md",
      "$TECHTIDE_ROOT/Docs/CONVENTIONS.md",
    ],
    workflow: [
      "List every tool, host, credential, filesystem path, and mutation capability.",
      "Classify tools as read-only, workspace-write, external read, or external mutate.",
      "Verify least-privilege tokens, scoped env vars, logging redaction, and allowed egress.",
      "Add approval gates for destructive filesystem, cloud, billing, messaging, or production actions.",
      "Document what the agent must never collect, echo, or store.",
    ],
    outputs: ["tool trust matrix", "credential scope", "approval gates", "redaction rules"],
    docs: [officialDocs.claude, officialDocs.codex],
    security: "Never include raw secrets or service-role keys in trust review artifacts. Record presence, scope, and rotation status only.",
  },
  {
    id: "techtide-context-packaging-onboarding",
    name: "TechTide Context Packaging Onboarding",
    category: "delivery",
    lifecycle: "stable",
    summary: "Package a project for agent harnesses by preparing concise context files, command maps, architecture summaries, guardrails, and local override boundaries.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Claude/skills/init/SKILL.md",
      "$TECHTIDE_ROOT/Apps/TechTideAI/CLAUDE.md",
      "$TECHTIDE_ROOT/Docs/STRUCTURE.md",
    ],
    workflow: [
      "Scan package, build, test, deployment, and architecture sources before writing context.",
      "Summarize commands, ownership boundaries, data stores, integrations, and known sharp edges.",
      "Separate durable project rules from local machine overrides and private secrets.",
      "Add tool-specific notes for Claude Code, Codex, Cursor, and Copilot only where behavior differs.",
      "Keep context short enough for agents to load without drowning out the user's request.",
    ],
    outputs: ["AGENTS/CLAUDE context", "command map", "risk notes", "local override stub"],
    docs: [officialDocs.claude, officialDocs.codex, officialDocs.cursor],
    security: "Do not write machine-specific secrets, personal tokens, or private endpoint credentials into shared context files.",
  },
  {
    id: "techtide-multi-agent-worktree-dispatch",
    name: "TechTide Multi-Agent Worktree Dispatch",
    category: "delivery",
    lifecycle: "stable",
    summary: "Split substantial engineering work across agents or worktrees with disjoint ownership, clear contracts, validation checkpoints, and integration review.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Claude/skills/agent-dispatch/SKILL.md",
      "$TECHTIDE_ROOT/Apps/TechTideAI/agents/README.md",
      "$TECHTIDE_ROOT/Apps/TechTideAI/CONTRIBUTING.md",
    ],
    workflow: [
      "Decompose work by independent files, modules, or verification surfaces.",
      "Assign each agent a bounded write scope, task contract, and expected output.",
      "Keep the critical path local when immediate decisions depend on the result.",
      "Integrate by reviewing diffs, running combined tests, and resolving overlapping assumptions.",
      "Close or archive transient agent artifacts when they are no longer needed.",
    ],
    outputs: ["dispatch map", "agent contracts", "integration checklist", "verification record"],
    docs: [officialDocs.claude, officialDocs.codex],
    security: "Do not delegate production mutations, secret handling, or external-recipient writes without explicit approval and audit logs.",
  },
  {
    id: "techtide-test-generation-validation-debt",
    name: "TechTide Test Generation Validation Debt",
    category: "delivery",
    lifecycle: "stable",
    summary: "Turn implementation work into durable test coverage by mapping claims to unit, integration, smoke, visual, and residual-risk checks.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Docs/TESTING.md",
      "$TECHTIDE_ROOT/Apps/TechTideAI/docs/DEV_SETUP.md",
      "$TECHTIDE_ROOT/Claude/VALIDATION.md",
    ],
    workflow: [
      "Extract each behavioral claim, user flow, and failure mode introduced by the change.",
      "Choose the cheapest reliable test type for each claim.",
      "Add fixtures for edge cases, permissions, empty states, and bad external responses.",
      "Run the focused tests first, then broader validation when shared behavior changed.",
      "Document untested residual risk when environment or external services block verification.",
    ],
    outputs: ["claim-to-test matrix", "test additions", "run results", "residual risk"],
    docs: [officialDocs.claude, officialDocs.codex],
    security: "Do not mark security, billing, or data-loss behaviors as verified without a direct test or explicit manual proof.",
  },
  {
    id: "techtide-cost-aware-model-routing",
    name: "TechTide Cost Aware Model Routing",
    category: "cost-management",
    lifecycle: "beta",
    summary: "Choose models and coding tools with cost, latency, quota, context size, and task risk in mind while preserving verification and quality requirements.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Claude/skills/cost/SKILL.md",
      "$TECHTIDE_ROOT/Docs/STACK.md",
      "$TECHTIDE_ROOT/Docs/CONCERNS.md",
    ],
    workflow: [
      "Estimate task complexity, context size, expected tool calls, and quality bar before selecting a model.",
      "Prefer lower-cost lanes for simple classification, formatting, and local edits.",
      "Use stronger reasoning lanes for architecture, security, cross-file changes, and high ambiguity.",
      "Track quota and latency symptoms and switch lanes when a model is exhausted or underperforming.",
      "Record cost-sensitive decisions without storing raw provider keys or private telemetry.",
    ],
    outputs: ["model/tool choice", "cost rationale", "fallback lane", "verification plan"],
    docs: [officialDocs.claude, officialDocs.codex, officialDocs.gemini],
    security: "Do not expose telemetry rows, provider keys, or customer prompt contents in cost reports.",
  },
  {
    id: "techtide-prompt-to-architecture-extractor",
    name: "TechTide Prompt To Architecture Extractor",
    category: "architecture",
    lifecycle: "stable",
    summary: "Convert rough prompts, transcripts, and prototype notes into architecture decisions, constraints, interfaces, data flows, and implementation-ready work packages.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Claude/BUILD-LOOP.md",
      "$TECHTIDE_ROOT/Docs/STRUCTURE.md",
      "$TECHTIDE_ROOT/Apps/TechTideAI/docs/ARCHITECTURE.md",
    ],
    workflow: [
      "Extract nouns as domain objects, verbs as workflows, and warnings as constraints.",
      "Separate confirmed requirements from guesses and optional ideas.",
      "Map data flows, trust boundaries, storage, integrations, and UI surfaces.",
      "Turn the architecture into implementation slices with acceptance criteria.",
      "Mark unknowns that require user, schema, or live-system verification.",
    ],
    outputs: ["architecture brief", "data flow", "decision log", "implementation slices"],
    docs: [officialDocs.claude, officialDocs.codex],
    security: "Do not infer security or compliance posture from marketing copy. Mark it unverified until source evidence exists.",
  },
  {
    id: "techtide-design-stack-research-synthesizer",
    name: "TechTide Design Stack Research Synthesizer",
    category: "architecture",
    lifecycle: "beta",
    summary: "Synthesize design-tool research into practical app-building guidance across Stitch, Figma, Claude Code, v0, Lovable, and repo-native frontend implementation.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Claude/skills/design/persyn-design-stack-research.md",
      "$TECHTIDE_ROOT/Claude/PATHSENSE-DESIGN-UPGRADE.md",
      "$TECHTIDE_ROOT/Claude/AUTOBROKER-DESIGN-UPGRADE.md",
    ],
    workflow: [
      "Identify the desired artifact: concept, wireframe, component code, design system, or production patch.",
      "Route exploratory visuals to design generators and implementation work to repo-native code.",
      "Convert research into concrete tokens, components, states, and accessibility rules.",
      "Reject purely decorative or generic design guidance that cannot be implemented or tested.",
      "Close with visual QA across relevant viewports.",
    ],
    outputs: ["design stack recommendation", "implementation spec", "visual QA checklist"],
    docs: [officialDocs.v0, officialDocs.lovable, officialDocs.claude],
    security: "Do not upload proprietary brand assets, private user screenshots, or customer data to external design tools without approval.",
  },
  {
    id: "techtide-marketing-automation-skill-distiller",
    name: "TechTide Marketing Automation Skill Distiller",
    category: "ai",
    lifecycle: "experimental",
    summary: "Extract reusable marketing automation and site-governance workflows into guarded skills without importing private lead lists, campaign exports, or customer data.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Claude/skills/marketing",
      "$TECHTIDE_ROOT/Docs/Planning/TechTide_AI_Monetization_Atlas_V3.1_Final.md",
      "$TECHTIDE_ROOT/Apps/TechTideAI/agents/skills/worker-research.md",
    ],
    workflow: [
      "Identify whether the source is a reusable method, campaign-specific plan, or private lead/customer artifact.",
      "Extract only durable workflow structure, compliance checks, and output formats.",
      "Replace company, person, email, subscriber, and revenue details with placeholders.",
      "Add legal, privacy, and platform-policy boundaries where marketing data is involved.",
      "Validate the skill against sanitized fixtures before catalog promotion.",
    ],
    outputs: ["candidate skill", "redaction notes", "privacy risk", "promotion recommendation"],
    docs: [officialDocs.claude, officialDocs.codex],
    security: "Reject raw CRM exports, email lists, subscriber logs, and ad-platform credentials. Work from sanitized examples only.",
  },
  {
    id: "techtide-knowledge-ingestion-guardrail-review",
    name: "TechTide Knowledge Ingestion Guardrail Review",
    category: "data",
    lifecycle: "stable",
    summary: "Review knowledge ingestion pipelines for source provenance, chunking, embedding, search behavior, redaction, access control, and evidence traceability.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Apps/TechTideAI/backend/src/services/knowledge-service.ts",
      "$TECHTIDE_ROOT/Apps/TechTideAI/docs/API_REFERENCE.md",
      "$TECHTIDE_ROOT/Apps/TechTideAI/agents/tools/knowledge-base.md",
    ],
    workflow: [
      "Define allowed source classes, required metadata, and forbidden sensitive content.",
      "Review chunking, overlap, token accounting, embedding batch behavior, and failure handling.",
      "Verify search results preserve title, source, document id, chunk id, and relevance evidence.",
      "Confirm access control and tenant boundaries before indexing private documents.",
      "Add deletion, reindexing, and stale-source handling to the operational runbook.",
    ],
    outputs: ["ingestion policy", "source metadata contract", "redaction checks", "search evidence review"],
    docs: [officialDocs.codex],
    security: "Do not index secrets, raw PII, privileged customer documents, or service-role keys. Store redacted presence/classification only when auditing sensitive sources.",
  },
  {
    id: "techtide-windows-local-automation-guard",
    name: "TechTide Windows Local Automation Guard",
    category: "security",
    lifecycle: "stable",
    summary: "Run local Windows automation safely by checking resolved paths, shell boundaries, destructive command risk, background process visibility, and approval needs.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Claude/skills/sandbox-config/SKILL.md",
      "$TECHTIDE_ROOT/Docs/runbooks/startup.md",
      "$TECHTIDE_ROOT/Docs/runbooks/9router-troubleshoot.md",
    ],
    workflow: [
      "Resolve absolute target paths before move, delete, copy, or recursive operations.",
      "Use one shell end-to-end for filesystem mutations and prefer native PowerShell cmdlets on Windows.",
      "Treat background services, network listeners, and process restarts as operational changes.",
      "Preview destructive actions and require explicit approval when the target is broad or ambiguous.",
      "Record commands run and verification results without exposing local secrets.",
    ],
    outputs: ["command safety review", "path verification", "approval gate", "verification output"],
    docs: [officialDocs.claude, officialDocs.codex],
    security: "Never compose recursive deletes from unverified paths. Never echo environment variables or secrets into logs.",
  },
  {
    id: "techtide-human-approval-gate-designer",
    name: "TechTide Human Approval Gate Designer",
    category: "compliance",
    lifecycle: "stable",
    summary: "Design explicit human approval gates for agent workflows that can mutate production, spend money, contact external recipients, delete data, or change security posture.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Docs/CONCERNS.md",
      "$TECHTIDE_ROOT/Claude/skills/hooks-config/SKILL.md",
      "$TECHTIDE_ROOT/Apps/TechTideAI/README.md",
    ],
    workflow: [
      "Identify the risky action, target system, actor, blast radius, reversibility, and evidence required.",
      "Define the exact approval phrase or UI checkpoint needed before execution.",
      "Require dry-run output, rollback plan, and target confirmation for live changes.",
      "Log approval metadata without storing secrets or sensitive payloads.",
      "Block automation if approval is stale, ambiguous, or mismatched to the target.",
    ],
    outputs: ["approval contract", "dry-run evidence", "rollback plan", "audit fields"],
    docs: [officialDocs.claude, officialDocs.codex],
    security: "Approval gates must be explicit and target-specific. A generic yes is not enough for live mutation.",
  },
  {
    id: "techtide-cross-harness-export-hygiene",
    name: "TechTide Cross Harness Export Hygiene",
    category: "delivery",
    lifecycle: "stable",
    summary: "Prepare skills and agents for cross-harness export by separating canonical SKILL.md assets from Cursor rules, Kiro steering, and prompt-kit adapters.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Apps/techtide-harness-kit/docs/cross-harness-skills.md",
      "$TECHTIDE_ROOT/Apps/techtide-harness-kit/docs/marketplace-model.md",
      "$TECHTIDE_ROOT/Claude/skills/init/SKILL.md",
    ],
    workflow: [
      "Start from the canonical skill and identify which harnesses have a compatible skill primitive.",
      "Strip or transform frontmatter only for harnesses with stricter schemas.",
      "Use notices, rules, steering, or prompt kits where a platform lacks SKILL.md support.",
      "Run exporter coverage and bundling tests after catalog changes.",
      "Document lossy adapter behavior honestly.",
    ],
    outputs: ["harness matrix", "adapter notes", "export validation", "catalog update"],
    docs: [officialDocs.copilot, officialDocs.gemini, officialDocs.codex, officialDocs.cursor, officialDocs.kiro],
    security: "Do not claim feature parity where a harness lacks a native primitive. Avoid exporting resource-heavy skills into always-on rule files.",
  },
  {
    id: "techtide-skill-extraction-promotion",
    name: "TechTide Skill Extraction Promotion",
    category: "ai",
    lifecycle: "stable",
    summary: "Extract new TechTide skills from local work safely by inventorying curated sources, scoring privacy and quality risk, generating candidates, and promoting only validated assets.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Claude/skills",
      "$TECHTIDE_ROOT/Docs/STRUCTURE.md",
      "$TECHTIDE_ROOT/Apps/TechTideAI/docs/API_REFERENCE.md",
    ],
    workflow: [
      "Inventory only curated local source classes and exclude secrets, logs, raw datasets, lead lists, and build artifacts.",
      "Summarize reusable patterns without copying private source text.",
      "Score each candidate for clarity, security, privacy, reproducibility, and harness fit.",
      "Generate schema-valid skill metadata, references, and catalog entries.",
      "Run validation and require manual review before public release.",
    ],
    outputs: ["source inventory", "candidate score", "skill draft", "promotion decision"],
    docs: [officialDocs.claude, officialDocs.codex],
    security: "Reject candidates containing raw PII, credentials, private customer data, local machine secrets, or old provenance markers.",
  },
  {
    id: "techtide-live-coding-session-retro",
    name: "TechTide Live Coding Session Retro",
    category: "observability",
    lifecycle: "beta",
    summary: "Turn a live coding session into reusable engineering memory by extracting decisions, failed paths, tool choices, verification evidence, and skill candidates.",
    sourceAnchors: [
      "$TECHTIDE_ROOT/Claude/LESSONS.md",
      "$TECHTIDE_ROOT/Claude/skills/resume/SKILL.md",
      "$TECHTIDE_ROOT/Docs/Planning/TechTide_AI_Monetization_Atlas_V3.1_Final.md",
    ],
    workflow: [
      "Collect the task goal, timeline, tools used, major prompts, diffs, tests, and interruptions.",
      "Separate reusable patterns from one-off project details.",
      "Identify missed checks, cost spikes, model/tool mismatches, and context gaps.",
      "Convert durable lessons into rules, checklist items, or skill backlog entries.",
      "Store only sanitized summaries and evidence links.",
    ],
    outputs: ["session retro", "decision record", "lesson list", "skill backlog"],
    docs: [officialDocs.claude, officialDocs.codex],
    security: "Redact private paths, customer data, prompt payloads with secrets, and production identifiers before publishing a retro.",
  },
];

const sensitivePatterns = [
  { name: "email", re: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i },
  { name: "private-key", re: /-----BEGIN (RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/i },
  { name: "aws-key", re: /\b(AKIA|ASIA)[0-9A-Z]{16}\b/ },
  { name: "credential-assignment", re: /\b(api[_-]?key|secret|token|password|service[_-]?role)\s*[:=]\s*["'][^"']{12,}["']/i },
  { name: "phone", re: /\b\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/ },
];

const qualityTerms = [
  "workflow",
  "guardrail",
  "skill",
  "agent",
  "validation",
  "test",
  "approval",
  "security",
  "handoff",
  "prompt",
  "router",
  "lovable",
  "cursor",
  "codex",
  "claude",
  "replit",
  "v0",
];

function normalizeSlashes(value) {
  return value.replace(/\\/g, "/");
}

function sanitizeSourcePath(value) {
  const normalized = normalizeSlashes(value);
  const marker = "/TechTide/";
  const index = normalized.indexOf(marker);
  if (index >= 0) {
    return `$TECHTIDE_ROOT/${normalized.slice(index + marker.length)}`;
  }
  return normalized.replace(/^C:\/Users\/[^/]+\/TechTide\//i, "$TECHTIDE_ROOT/");
}

function splitWords(text) {
  return String(text).trim().split(/\s+/).filter(Boolean);
}

export function mapHarnessTargets(targets) {
  const native = [];
  const adapters = [];
  for (const target of targets) {
    const normalized = String(target).toLowerCase();
    if (nativeSkillHarnesses.has(normalized)) native.push(normalized);
    else if (adapterHarnesses.has(normalized)) adapters.push(normalized);
    else adapters.push("other");
  }
  return {
    native_skill_harnesses: [...new Set(native)],
    companion_adapters: [...new Set(adapters)],
  };
}

export function scoreCandidate(candidate) {
  const text = String(candidate.text ?? "");
  const words = splitWords(text);
  const matchedSensitive = sensitivePatterns.filter((pattern) => pattern.re.test(text)).map((pattern) => pattern.name);
  const termHits = qualityTerms.filter((term) => text.toLowerCase().includes(term));
  const harnessMap = mapHarnessTargets(candidate.intended_harnesses ?? []);
  const sourcePath = sanitizeSourcePath(String(candidate.source_path ?? ""));
  const sourceOk = sourcePath.startsWith("$TECHTIDE_ROOT/");

  if (matchedSensitive.length > 0) {
    return {
      status: "rejected",
      validation_status: "rejected-sensitive",
      privacy_risk: "high",
      security_risk: "high",
      reproducibility: "blocked",
      reason: `Rejected sensitive marker(s): ${matchedSensitive.join(", ")}`,
      source_path: sourcePath,
      ...harnessMap,
    };
  }

  if (!sourceOk) {
    return {
      status: "rejected",
      validation_status: "rejected-source-scope",
      privacy_risk: "medium",
      security_risk: "medium",
      reproducibility: "blocked",
      reason: "Source is outside the curated local TechTide scope.",
      source_path: sourcePath,
      ...harnessMap,
    };
  }

  if (words.length < 40 || termHits.length < 3) {
    return {
      status: "rejected",
      validation_status: "rejected-low-confidence",
      privacy_risk: "low",
      security_risk: "low",
      reproducibility: "weak",
      reason: "Candidate lacks enough workflow, guardrail, or validation detail to promote.",
      source_path: sourcePath,
      ...harnessMap,
    };
  }

  return {
    status: "accepted",
    validation_status: "candidate-valid",
    privacy_risk: "low",
    security_risk: text.toLowerCase().includes("production") || text.toLowerCase().includes("secret") ? "medium" : "low",
    reproducibility: "strong",
    reason: "Candidate has reusable workflow detail and no sensitive markers.",
    source_path: sourcePath,
    extracted_pattern_summary: candidate.summary ?? "Reusable Alex/TechTide agent workflow pattern.",
    required_human_approval_gates: text.toLowerCase().includes("production") ? ["production mutation", "external deployment"] : [],
    skill_candidate: {
      name: candidate.name ?? "techtide-extracted-skill-candidate",
      author,
      version,
      provider,
    },
    ...harnessMap,
  };
}

function yamlString(value) {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function renderSkill(definition) {
  const description = `${definition.summary} Use when an agent needs Alex Cinovoj / TechTide live-coding patterns, tool routing, guarded prototype-to-production workflows, or cross-harness prompt/skill adapters.`;
  return `---
name: ${definition.id}
description: ${yamlString(description)}
allowed-tools: Read Grep Glob Bash Edit Write
metadata:
  author: ${yamlString(author)}
  version: ${yamlString(version)}
  updated: ${yamlString(updated)}
  category: ${definition.category}
  lifecycle: ${definition.lifecycle}
  execution_tier: static-review
  required_egress: []
  requires_credentials: []
  output_format: guarded-workflow-brief
---

# ${definition.name}

${definition.summary}

## Source Pattern

This skill is distilled from sanitized Alex Cinovoj / TechTide local workflow patterns. Load \`references/source-patterns.md\` when you need the source anchors and extraction rationale. Load \`references/adapter-map.md\` when preparing Cursor, Kiro, Lovable, v0, or Replit companion outputs.

## Workflow

${definition.workflow.map((item, index) => `${index + 1}. ${item}`).join("\n")}

## Output Contract

Return a concise brief with these fields:

${definition.outputs.map((item) => `- ${item}`).join("\n")}
- verification performed or still required
- security and privacy notes

## Guardrails

- Extract reusable methods, not private local content.
- Do not request or expose credentials, tokens, DSNs, service-role keys, customer data, lead lists, or private business exports.
- Use placeholders for people, accounts, projects, URLs, and datasets unless the user explicitly provides public-safe values.
- Require explicit human approval before production mutation, external-recipient messaging, public deployment, billing changes, or destructive filesystem actions.
- Preserve Alex Cinovoj / TechTide attribution while keeping old repo provenance and unrelated contributor markers out of public artifacts.

## Harness Policy

- Use this as a native \`SKILL.md\` for Claude Code, Codex, Gemini, and Copilot-compatible exports.
- For Cursor, create a focused project rule or workflow note rather than copying this whole skill as an always-on rule.
- For Kiro, create steering only when the workflow can be made short and inclusion-scoped.
- For Lovable, v0, and Replit, turn the workflow into prompt kits, readiness checklists, and handoff prompts.
`;
}

function renderSourcePatterns(definition) {
  return `# Source Patterns

This reference records sanitized anchors used to distill \`${definition.id}\`. It does not copy raw local source material.

## Curated Anchors

${definition.sourceAnchors.map((item) => `- ${item}`).join("\n")}

## Extracted Pattern

${definition.summary}

## Inclusion Reason

- The pattern is reusable across tool-assisted engineering work.
- The pattern has a concrete workflow and verification surface.
- The pattern can be expressed without raw private data.
- The pattern supports Alex Cinovoj / TechTide attribution without retaining old repo provenance.

## Excluded Material

${excludedSourceClasses.map((item) => `- ${item}`).join("\n")}
`;
}

function renderAdapterMap(definition) {
  return `# Adapter Map

## Native Skill Harnesses

- Claude Code: export as \`SKILL.md\`.
- OpenAI Codex: export as \`SKILL.md\` with closed frontmatter filtering where required.
- Gemini: export as \`SKILL.md\`.
- GitHub Copilot: export as \`SKILL.md\`.

## Companion Adapters

${sharedAdapterNotes.map((item) => `- ${item}`).join("\n")}

## Suggested Adapter Output

- Cursor: one narrow rule with the trigger, constraints, and validation checklist.
- Kiro: one steering file only if the workflow should be loaded manually or by description.
- Lovable: one prompt kit plus post-generation verification checklist.
- v0: one UI prompt hardening checklist plus handoff review.
- Replit: one bootstrap prompt plus env and smoke-test checklist.
`;
}

function metadataFor(definition) {
  return {
    id: definition.id,
    name: definition.name,
    type: "skill",
    provider,
    harnesses,
    summary: definition.summary,
    source_type: "original",
    official_docs: definition.docs,
    security_notes: definition.security,
    last_verified: updated,
    path: `skills/${provider}/${definition.id}`,
    author: catalogAuthor,
    owner: author,
    generated_by: generatedBy,
    version,
    lifecycle: definition.lifecycle,
  };
}

function ingestionManifest() {
  return {
    manifest_version: 1,
    generated_by: generatedBy,
    generated_at: updated,
    owner: author,
    source_policy: {
      mode: "local-only-curated",
      curated_roots: curatedRoots,
      excluded_source_classes: excludedSourceClasses,
      absolute_paths_are_sanitized: true,
      raw_source_text_copied: false,
    },
    rubric: {
      accepted: [
        "reusable workflow",
        "specific validation surface",
        "clear security/privacy guardrails",
        "compatible native skill or companion adapter target",
        "no secrets or private data",
      ],
      rejected: [
        "raw PII or credentials",
        "private lead/customer exports",
        "low-confidence generic advice",
        "tool surface without guardrails",
        "old provenance or unrelated contributor markers",
      ],
    },
    entries: skillDefinitions.map((definition) => ({
      id: definition.id,
      source_paths: definition.sourceAnchors,
      source_type: "sanitized-local-pattern",
      extracted_pattern_summary: definition.summary,
      intended_harnesses: harnesses,
      companion_adapters: ["cursor", "kiro", "lovable", "v0", "replit"],
      security_risk: definition.category === "security" || definition.security.toLowerCase().includes("production") ? "medium" : "low",
      privacy_risk: "low",
      reproducibility: "strong",
      required_human_approval_gates: definition.security.toLowerCase().includes("approval") || definition.security.toLowerCase().includes("production") ? ["target-specific approval"] : [],
      validation_status: "cataloged",
      reason_for_inclusion: "Reusable Alex/TechTide workflow with explicit guardrails and cross-harness adapter policy.",
    })),
  };
}

function renderFrameworkDoc() {
  return `# TechTide Skill Ingestion Framework

Last reviewed: ${updated}

## Purpose

This framework turns Alex Cinovoj / TechTide local live-coding patterns into public-safe marketplace skills. It extracts reusable methods, guardrails, validation loops, and tool-routing policies without copying private business data.

## Source Boundary

Allowed source classes:

${curatedRoots.map((item) => `- ${item}`).join("\n")}

Excluded source classes:

${excludedSourceClasses.map((item) => `- ${item}`).join("\n")}

## Promotion Rubric

A candidate can be promoted only when it has:

- reusable workflow steps
- clear inputs and outputs
- a verification method
- privacy and security guardrails
- a native skill target or honest companion adapter target
- Alex Cinovoj / TechTide attribution

Reject a candidate when it contains raw PII, credentials, private lead/customer records, local-only secrets, old provenance, or vague advice that cannot be tested.

## Harness Policy

Claude Code, Codex, Gemini, Copilot, and Kiro can receive canonical \`SKILL.md\` assets. Cursor remains rules-first. Lovable, Replit, and v0/Vercel can receive provider-native packages only after primary-source verification; otherwise they stay as prompt kits, readiness checklists, and handoff workflows.

External provider lane research is generated separately:

\`\`\`bash
npm run external-skills:research
npm run external-skills:promote
npm run external-skills:check
\`\`\`

## Commands

\`\`\`bash
npm run techtide-skills:write
npm run techtide-skills:check
npm run test:techtide-skill-ingestion
\`\`\`

The write command regenerates the TechTide skill pack, catalog entries, sanitized ingestion manifest, and these docs. The check command fails when generated assets drift.
`;
}

function renderPackDoc() {
  return `# Alex/TechTide Agent Skill Pack

Last reviewed: ${updated}

This pack captures Alex Cinovoj / TechTide's local engineering patterns as guarded, cataloged skills.

## Skills

${skillDefinitions.map((definition) => `- \`${definition.id}\` - ${definition.summary}`).join("\n")}

## Adapter Shape

- Native skills: Claude Code, Codex, Gemini, Copilot, Kiro.
- Provider-native lanes after verification: Lovable, Replit, v0/Vercel.
- Companion adapters: Cursor rules, Kiro steering when context is workspace-specific, Lovable prompt kits, v0 prompt hardening kits, Replit bootstrap kits.

## Privacy Stance

The pack stores sanitized source anchors and pattern summaries only. It does not copy raw local source text, customer data, lead lists, logs, env files, or credentials.
`;
}

function generatedFiles() {
  const files = new Map();
  for (const definition of skillDefinitions) {
    const skillDir = `skills/${provider}/${definition.id}`;
    const metadata = metadataFor(definition);
    files.set(`${skillDir}/SKILL.md`, renderSkill(definition));
    files.set(`${skillDir}/metadata.json`, `${JSON.stringify(metadata, null, 2)}\n`);
    files.set(`${skillDir}/references/source-patterns.md`, renderSourcePatterns(definition));
    files.set(`${skillDir}/references/adapter-map.md`, renderAdapterMap(definition));
  }
  files.set("catalog/techtide-skill-ingestion-manifest.json", `${JSON.stringify(ingestionManifest(), null, 2)}\n`);
  files.set("docs/techtide-skill-ingestion-framework.md", renderFrameworkDoc());
  files.set("docs/techtide-agent-skill-pack.md", renderPackDoc());
  return files;
}

function mergedCatalogSkills() {
  const catalogPath = path.join(repoRoot, "catalog", "skills.json");
  const existing = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  const generatedIds = new Set(skillDefinitions.map((definition) => definition.id));
  const merged = existing.filter((entry) => !generatedIds.has(entry.id));
  merged.push(...skillDefinitions.map(metadataFor));
  merged.sort((a, b) => a.id.localeCompare(b.id));
  return `${JSON.stringify(merged, null, 2)}\n`;
}

function writeFileIfChanged(relativePath, content) {
  const absolutePath = path.join(repoRoot, relativePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  if (fs.existsSync(absolutePath) && fs.readFileSync(absolutePath, "utf8") === content) {
    return false;
  }
  fs.writeFileSync(absolutePath, content, "utf8");
  return true;
}

function assertNoDrift(relativePath, expected, errors) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(absolutePath)) {
    errors.push(`${relativePath}: missing generated file`);
    return;
  }
  const actual = fs.readFileSync(absolutePath, "utf8");
  if (actual !== expected) {
    errors.push(`${relativePath}: generated content drifted`);
  }
}

function writeGenerated() {
  let changed = 0;
  for (const [relativePath, content] of generatedFiles()) {
    if (writeFileIfChanged(relativePath, content)) changed += 1;
  }
  if (writeFileIfChanged("catalog/skills.json", mergedCatalogSkills())) changed += 1;
  console.log(`OK: wrote TechTide skill pack (${skillDefinitions.length} skills, ${changed} changed files)`);
}

function checkGenerated() {
  const errors = [];
  for (const [relativePath, content] of generatedFiles()) {
    assertNoDrift(relativePath, content, errors);
  }
  assertNoDrift("catalog/skills.json", mergedCatalogSkills(), errors);
  if (errors.length > 0) {
    for (const error of errors) console.error(`ERROR: ${error}`);
    return 1;
  }
  console.log(`OK: TechTide skill pack is in sync (${skillDefinitions.length} skills)`);
  return 0;
}

function isExcludedInventoryPath(filePath) {
  const normalized = normalizeSlashes(filePath).toLowerCase();
  return (
    normalized.includes("/.git/") ||
    normalized.includes("/node_modules/") ||
    normalized.includes("/dist/") ||
    normalized.includes("/build/") ||
    normalized.includes("/.next/") ||
    normalized.includes("/.cache/") ||
    normalized.endsWith(".env") ||
    normalized.includes(".env.") ||
    normalized.endsWith(".csv") ||
    normalized.endsWith(".log") ||
    normalized.endsWith(".sqlite") ||
    normalized.endsWith(".db")
  );
}

function inventoryDirectory(root) {
  const results = [];
  if (!fs.existsSync(root)) return results;
  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    if (!current || isExcludedInventoryPath(current)) continue;
    const stat = fs.statSync(current);
    if (stat.isDirectory()) {
      for (const child of fs.readdirSync(current)) stack.push(path.join(current, child));
    } else if (/\.(md|mdc|txt|json|ts|tsx|js|mjs|py|toml|yaml|yml)$/i.test(current)) {
      results.push({
        source_path: sanitizeSourcePath(current),
        bytes: stat.size,
      });
    }
  }
  return results.sort((a, b) => a.source_path.localeCompare(b.source_path));
}

function printInventory() {
  const homeRoot = process.env.TECHTIDE_ROOT || path.resolve(repoRoot, "..", "..", "..");
  const roots = [
    path.join(homeRoot, "Claude"),
    path.join(homeRoot, "Docs"),
    path.join(homeRoot, "Apps", "TechTideAI"),
    path.join(homeRoot, "Apps", "Lovable2"),
    path.join(homeRoot, "Apps", "TheLovables"),
  ];
  const inventory = roots.flatMap(inventoryDirectory);
  console.log(JSON.stringify({
    mode: "local-only-curated",
    raw_source_text_copied: false,
    count: inventory.length,
    inventory,
  }, null, 2));
}

function usage() {
  console.error("Usage: node scripts/techtide-skill-ingestion.mjs [--write|--check|--inventory]");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const arg = process.argv[2];
  if (arg === "--write") {
    writeGenerated();
  } else if (arg === "--check") {
    process.exitCode = checkGenerated();
  } else if (arg === "--inventory") {
    printInventory();
  } else {
    usage();
    process.exitCode = 2;
  }
}
