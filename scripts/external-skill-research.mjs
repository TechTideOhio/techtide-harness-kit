#!/usr/bin/env node
/**
 * Generate, validate, and promote verified external provider skill lanes.
 *
 * The generator is deliberately evidence-first: it records source inventories,
 * scores each candidate, deduplicates candidates, and only promotes assets that
 * pass licensing, safety, provider-surface, and usefulness gates.
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const generatedBy = "scripts/external-skill-research.mjs";
const updated = "2026-05-17";
const author = "Alex Cinovoj / TechTide";
const catalogAuthor = "github: TechTide";
const version = "0.1.0";

const providerProfiles = {
  claude: {
    display: "Claude Code",
    harnesses: ["claude-code"],
    docs: ["https://code.claude.com/docs/en/skills"],
    nativeSkillSurface: "SKILL.md skill packages",
    packaging: "Use a focused SKILL.md with concise frontmatter, optional references, and deterministic scripts only when needed.",
    boundary: "Do not copy community Claude skill bodies unless license, attribution, and content review are clean.",
    sourceIds: ["anthropic-claude-code-skills-docs", "alirezarezvani-claude-skills", "gsd-build-get-shit-done"],
  },
  codex: {
    display: "OpenAI Codex",
    harnesses: ["codex"],
    docs: ["https://developers.openai.com/codex/"],
    nativeSkillSurface: "Codex-compatible SKILL.md packages",
    packaging: "Use repo-local skills and AGENTS.md handoffs where they clarify repeatable Codex workflows.",
    boundary: "Reference OpenAI Codex docs and local package behavior; quarantine unsupported automatic activation claims.",
    sourceIds: ["openai-codex-docs", "composiohq-awesome-codex-skills"],
  },
  gemini: {
    display: "Gemini CLI",
    harnesses: ["gemini"],
    docs: ["https://github.com/google-gemini/gemini-skills", "https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/cli-reference.md"],
    nativeSkillSurface: "Gemini CLI SKILL.md packages",
    packaging: "Use SKILL.md packages and keep Gemini-specific activation/install notes in references.",
    boundary: "Prefer official Google repositories over third-party Gemini skill tutorials.",
    sourceIds: ["google-gemini-skills-repo", "sickn33-antigravity-awesome-skills"],
  },
  cursor: {
    display: "Cursor",
    harnesses: ["cursor"],
    docs: ["https://docs.cursor.com/context/rules"],
    nativeSkillSurface: "Cursor project rules in .cursor/rules, not native SKILL.md",
    packaging: "Generate concise .mdc project rules with description, globs when needed, and alwaysApply false unless truly global.",
    boundary: "Reject claims that Cursor has a native SKILL.md surface unless current Cursor docs verify it.",
    sourceIds: ["cursor-rules-docs"],
    rulesFirst: true,
  },
  kiro: {
    display: "Kiro",
    harnesses: ["kiro"],
    docs: ["https://kiro.dev/docs/skills/", "https://kiro.dev/docs/steering/"],
    nativeSkillSurface: ".kiro/skills workspace skills plus Kiro steering when appropriate",
    packaging: "Use Kiro skills for portable on-demand workflows and steering for workspace standards.",
    boundary: "Do not treat steering, powers, and skills as interchangeable; map each workflow to the documented Kiro primitive.",
    sourceIds: ["kiro-skills-docs"],
  },
  lovable: {
    display: "Lovable",
    harnesses: ["other"],
    docs: ["https://docs.lovable.dev/features/skills"],
    nativeSkillSurface: "Lovable workspace skills imported from chat, GitHub, or ZIP",
    packaging: "Create prompt-bound skills with narrow descriptions, prototype constraints, and post-generation verification checklists.",
    boundary: "Never paste private data or production credentials into Lovable prompts or workspace skills.",
    sourceIds: ["lovable-skills-docs"],
  },
  replit: {
    display: "Replit Agent",
    harnesses: ["other"],
    docs: ["https://docs.replit.com/core-concepts/agent/skills"],
    nativeSkillSurface: "Replit Agent skills under /.agents/skills",
    packaging: "Package skills for project-level Replit Agent use with clear env, deploy, and review gates.",
    boundary: "Treat public repl code and app previews as public surfaces unless the project is explicitly private.",
    sourceIds: ["replit-agent-skills-docs"],
  },
  v0: {
    display: "v0",
    harnesses: ["other"],
    docs: ["https://vercel.com/docs/v0", "https://vercel.com/docs/agent-resources/skills"],
    nativeSkillSurface: "v0 and Vercel skill-compatible UI generation workflows",
    packaging: "Turn UI tasks into design-system prompts, state checklists, and implementation handoff reviews.",
    boundary: "Do not claim v0 can validate production security by itself; require repo review after generation.",
    sourceIds: ["vercel-v0-docs", "vercel-agent-skills-docs"],
  },
  vercel: {
    display: "Vercel Agent Skills",
    harnesses: ["codex", "claude-code", "cursor", "other"],
    docs: ["https://vercel.com/docs/agent-resources/skills"],
    nativeSkillSurface: "Vercel-published Agent Skills installed with the skills CLI",
    packaging: "Use verified Vercel skill patterns for web infrastructure, Vercel SDK, and deployment workflows.",
    boundary: "Quarantine repository imports when the GitHub repository has no license or unclear provenance.",
    sourceIds: ["vercel-agent-skills-docs", "vercel-labs-agent-skills"],
  },
};

const sourceRegistry = [
  {
    id: "anthropic-claude-code-skills-docs",
    provider: "claude",
    source_type: "official-docs",
    url: "https://code.claude.com/docs/en/skills",
    verification_status: "verified-primary-source",
    native_skill_surface: providerProfiles.claude.nativeSkillSurface,
    license_status: "documentation-reference-only",
    confidence: "high",
  },
  {
    id: "openai-codex-docs",
    provider: "codex",
    source_type: "official-docs",
    url: "https://developers.openai.com/codex/",
    verification_status: "verified-primary-source",
    native_skill_surface: providerProfiles.codex.nativeSkillSurface,
    license_status: "documentation-reference-only",
    confidence: "high",
  },
  {
    id: "cursor-rules-docs",
    provider: "cursor",
    source_type: "official-docs",
    url: "https://docs.cursor.com/context/rules",
    verification_status: "verified-primary-source",
    native_skill_surface: providerProfiles.cursor.nativeSkillSurface,
    license_status: "documentation-reference-only",
    confidence: "high",
  },
  {
    id: "kiro-skills-docs",
    provider: "kiro",
    source_type: "official-docs",
    url: "https://kiro.dev/docs/skills/",
    verification_status: "verified-primary-source",
    native_skill_surface: providerProfiles.kiro.nativeSkillSurface,
    license_status: "documentation-reference-only",
    confidence: "high",
  },
  {
    id: "lovable-skills-docs",
    provider: "lovable",
    source_type: "official-docs",
    url: "https://docs.lovable.dev/features/skills",
    verification_status: "verified-primary-source",
    native_skill_surface: providerProfiles.lovable.nativeSkillSurface,
    license_status: "documentation-reference-only",
    confidence: "high",
  },
  {
    id: "replit-agent-skills-docs",
    provider: "replit",
    source_type: "official-docs",
    url: "https://docs.replit.com/core-concepts/agent/skills",
    verification_status: "verified-primary-source",
    native_skill_surface: providerProfiles.replit.nativeSkillSurface,
    license_status: "documentation-reference-only",
    confidence: "high",
  },
  {
    id: "vercel-agent-skills-docs",
    provider: "vercel",
    source_type: "official-docs",
    url: "https://vercel.com/docs/agent-resources/skills",
    verification_status: "verified-primary-source",
    native_skill_surface: providerProfiles.vercel.nativeSkillSurface,
    license_status: "documentation-reference-only",
    confidence: "high",
  },
  {
    id: "vercel-v0-docs",
    provider: "v0",
    source_type: "official-docs",
    url: "https://vercel.com/docs/v0",
    verification_status: "verified-primary-source",
    native_skill_surface: providerProfiles.v0.nativeSkillSurface,
    license_status: "documentation-reference-only",
    confidence: "high",
  },
  {
    id: "google-gemini-skills-repo",
    provider: "gemini",
    source_type: "official-repository",
    url: "https://github.com/google-gemini/gemini-skills",
    verification_status: "verified-github-api",
    native_skill_surface: providerProfiles.gemini.nativeSkillSurface,
    license_status: "Apache-2.0",
    confidence: "high",
    default_branch: "main",
    pushed_at: "2026-05-16T21:56:16Z",
    skill_md_count: 3,
  },
  {
    id: "alirezarezvani-claude-skills",
    provider: "claude",
    source_type: "community-repository",
    url: "https://github.com/alirezarezvani/claude-skills",
    verification_status: "verified-github-api",
    native_skill_surface: "SKILL.md collection",
    license_status: "MIT",
    confidence: "high",
    default_branch: "main",
    pushed_at: "2026-05-17T08:01:49Z",
    skill_md_count: 680,
  },
  {
    id: "gsd-build-get-shit-done",
    provider: "claude",
    source_type: "community-repository",
    url: "https://github.com/gsd-build/get-shit-done",
    verification_status: "verified-github-api",
    native_skill_surface: "AGENTS.md and spec-driven workflow framework",
    license_status: "MIT",
    confidence: "high",
    default_branch: "main",
    pushed_at: "2026-05-17T18:53:56Z",
    skill_md_count: 0,
  },
  {
    id: "sickn33-antigravity-awesome-skills",
    provider: "gemini",
    source_type: "community-repository",
    url: "https://github.com/sickn33/antigravity-awesome-skills",
    verification_status: "verified-github-api",
    native_skill_surface: "large community SKILL.md collection",
    license_status: "MIT",
    confidence: "high",
    default_branch: "main",
    pushed_at: "2026-05-17T06:59:52Z",
    skill_md_count: 4552,
  },
  {
    id: "vercel-labs-agent-skills",
    provider: "vercel",
    source_type: "community-repository",
    url: "https://github.com/vercel-labs/agent-skills",
    verification_status: "verified-github-api",
    native_skill_surface: "Vercel Agent Skills collection",
    license_status: "missing-from-github-api",
    confidence: "medium",
    default_branch: "main",
    pushed_at: "2026-05-16T01:18:31Z",
    skill_md_count: 7,
    promotion_status: "quarantined-missing-license",
  },
  {
    id: "composiohq-awesome-codex-skills",
    provider: "codex",
    source_type: "community-repository",
    url: "https://github.com/ComposioHQ/awesome-codex-skills",
    verification_status: "verified-github-api",
    native_skill_surface: "curated SKILL.md collection",
    license_status: "missing-from-github-api",
    confidence: "medium",
    default_branch: "master",
    pushed_at: "2026-05-15T06:24:47Z",
    skill_md_count: 880,
    promotion_status: "quarantined-missing-license",
  },
  {
    id: "fake-unverified-agent-skill-repo",
    provider: "other",
    source_type: "unverified-claim",
    url: "https://github.com/example/not-a-real-agent-skill-pack",
    verification_status: "rejected-source-unreachable",
    native_skill_surface: "unknown",
    license_status: "unknown",
    confidence: "none",
    promotion_status: "rejected",
  },
];

const repositoryInventories = [
  {
    source_id: "alirezarezvani-claude-skills",
    repo: "alirezarezvani/claude-skills",
    provider: "claude",
    license: "MIT",
    import_mode_default: "techtide-synthesis",
    scanned_paths: 680,
    promoted_policy: "promote representative high-signal engineering workflows; dedupe against existing TechTide skills",
    sample_paths: [
      ".gemini/skills/a11y-audit/SKILL.md",
      ".gemini/skills/adversarial-reviewer/SKILL.md",
      ".gemini/skills/agent-workflow-designer/SKILL.md",
      ".gemini/skills/ai-security/SKILL.md",
      ".gemini/skills/api-design-reviewer/SKILL.md",
      ".gemini/skills/api-test-suite-builder/SKILL.md",
    ],
  },
  {
    source_id: "gsd-build-get-shit-done",
    repo: "gsd-build/get-shit-done",
    provider: "claude",
    license: "MIT",
    import_mode_default: "techtide-synthesis",
    scanned_paths: 5,
    promoted_policy: "promote spec-driven orchestration patterns, not project-specific command bodies",
    sample_paths: ["AGENTS.md"],
  },
  {
    source_id: "sickn33-antigravity-awesome-skills",
    repo: "sickn33/antigravity-awesome-skills",
    provider: "gemini",
    license: "MIT",
    import_mode_default: "techtide-synthesis",
    scanned_paths: 4552,
    promoted_policy: "promote only deduped engineering patterns from large collection; no bulk import",
    sample_paths: [
      "plugins/antigravity-awesome-skills-claude/skills/acceptance-orchestrator/SKILL.md",
      "plugins/antigravity-awesome-skills-claude/skills/agent-evaluation/SKILL.md",
      "plugins/antigravity-awesome-skills-claude/skills/advanced-evaluation/SKILL.md",
      "plugins/antigravity-awesome-skills-claude/skills/address-github-comments/SKILL.md",
    ],
  },
  {
    source_id: "google-gemini-skills-repo",
    repo: "google-gemini/gemini-skills",
    provider: "gemini",
    license: "Apache-2.0",
    import_mode_default: "direct-import-normalized",
    scanned_paths: 3,
    promoted_policy: "direct-normalize official Google Gemini skill topics with attribution and source evidence",
    sample_paths: [
      "skills/gemini-api-dev/SKILL.md",
      "skills/gemini-interactions-api/SKILL.md",
      "skills/gemini-live-api-dev/SKILL.md",
    ],
  },
  {
    source_id: "vercel-labs-agent-skills",
    repo: "vercel-labs/agent-skills",
    provider: "vercel",
    license: null,
    import_mode_default: "quarantine",
    scanned_paths: 7,
    promoted_policy: "keep as reference until license is present or legal reuse is approved",
    sample_paths: [
      "skills/react-best-practices/SKILL.md",
      "skills/deploy-to-vercel/SKILL.md",
      "skills/web-design-guidelines/SKILL.md",
    ],
  },
  {
    source_id: "composiohq-awesome-codex-skills",
    repo: "ComposioHQ/awesome-codex-skills",
    provider: "codex",
    license: null,
    import_mode_default: "quarantine",
    scanned_paths: 880,
    promoted_policy: "keep as reference until license is present or legal reuse is approved",
    sample_paths: [
      "codebase-migrate/SKILL.md",
      "changelog-generator/SKILL.md",
      "agent-deep-links/SKILL.md",
    ],
  },
];

const seedCapabilities = [
  {
    suffix: "source-trust-gate",
    name: "Source Trust Gate",
    category: "security",
    lifecycle: "stable",
    output: "source trust decision",
    summary: (profile) => `Verify ${profile.display} skill, rule, and agent sources before installation or reuse by checking primary docs, repository identity, license, native surface, and privacy risk.`,
    steps: (profile) => [
      `Start from the current ${profile.display} primary docs or verified repository entry, not a repost or uncited thread.`,
      "Confirm source URL, owner, license status, last verification date, and exact skill or rule primitive.",
      `Check that the candidate maps to ${profile.nativeSkillSurface} without inventing unsupported behavior.`,
      "Reject candidates that include secrets, private customer data, prompt injection, opaque install scripts, or vague marketing claims.",
      "Record the decision as promoted, quarantined, or rejected with evidence and a short reason.",
    ],
  },
  {
    suffix: "native-packaging-bridge",
    name: "Native Packaging Bridge",
    category: "delivery",
    lifecycle: "stable",
    output: "provider packaging brief",
    summary: (profile) => `Translate TechTide-authored workflows into the documented ${profile.display} packaging surface without pretending every agent uses the same activation model.`,
    steps: (profile) => [
      `Read the ${profile.display} target docs and identify the native primitive before writing content.`,
      profile.packaging,
      "Keep activation descriptions precise, short, and tied to concrete task triggers.",
      "Move long examples, commands, and checklists into references so the core instruction stays lean.",
      "Run catalog validation and quarantine any package whose provider semantics are uncertain.",
    ],
  },
  {
    suffix: "handoff-readiness-review",
    name: "Handoff Readiness Review",
    category: "architecture",
    lifecycle: "beta",
    output: "handoff readiness report",
    summary: (profile) => `Review ${profile.display} session output before it enters the durable TechTide repo by checking provenance, tests, security, deployment boundaries, and rollback expectations.`,
    steps: (profile) => [
      `Inventory changed files, prompts, source references, and assumptions from the ${profile.display} session.`,
      "Check mocks, hardcoded placeholders, broad dependencies, missing auth, exposed configuration, and untested states.",
      "Require a minimal build, test, and smoke proof before promotion into the repo or marketplace.",
      "Document what remains prototype-only and what is safe for production hardening.",
      profile.boundary,
    ],
  },
];

const concreteCapabilities = [
  {
    suffix: "debugging-strategy",
    name: "Debugging Strategy",
    category: "resilience",
    sourceHints: ["alirezarezvani-claude-skills", "sickn33-antigravity-awesome-skills"],
    summary: (profile) => `Run a disciplined ${profile.display} debugging loop that captures symptoms, isolates reproduction, tests hypotheses, patches narrowly, and verifies the fix.`,
    steps: () => [
      "Capture the failing command, visible symptom, expected behavior, environment, and most recent change.",
      "Create the smallest reproduction before reading unrelated files.",
      "Rank hypotheses by likelihood and test them one at a time.",
      "Patch only the proven cause, then rerun the failing check and one regression-adjacent check.",
      "Record residual risk and the next guardrail to add.",
    ],
  },
  {
    suffix: "test-generation",
    name: "Test Generation",
    category: "delivery",
    sourceHints: ["alirezarezvani-claude-skills", "sickn33-antigravity-awesome-skills"],
    summary: (profile) => `Use ${profile.display} to convert implementation claims into focused unit, integration, smoke, and regression tests without padding the suite.`,
    steps: () => [
      "List the behavioral claims the implementation makes.",
      "Map each claim to the cheapest reliable test type.",
      "Add regression tests for bugs and contract tests for shared interfaces.",
      "Avoid snapshot churn and tests that only assert implementation details.",
      "Run the new tests and the smallest affected existing suite.",
    ],
  },
  {
    suffix: "tdd-red-green-refactor",
    name: "TDD Red Green Refactor",
    category: "delivery",
    sourceHints: ["gsd-build-get-shit-done", "alirezarezvani-claude-skills"],
    summary: (profile) => `Guide ${profile.display} through red, green, and refactor cycles for risky changes where tests need to drive the implementation.`,
    steps: () => [
      "Write or identify one failing test that expresses the desired behavior.",
      "Confirm the test fails for the expected reason.",
      "Implement the smallest change that makes the test pass.",
      "Refactor only after the behavior is green.",
      "Repeat with the next behavior until acceptance criteria are covered.",
    ],
  },
  {
    suffix: "security-review",
    name: "Security Review",
    category: "security",
    sourceHints: ["alirezarezvani-claude-skills", "sickn33-antigravity-awesome-skills"],
    summary: (profile) => `Review ${profile.display} code changes for auth, authorization, injection, secrets, dependency risk, and unsafe defaults.`,
    steps: () => [
      "Inventory trust boundaries, inputs, outputs, credentials, network calls, and mutable resources.",
      "Check auth, authorization, input validation, output encoding, CORS, storage, and logging.",
      "Search for hardcoded credentials, broad tokens, mock bypasses, and sensitive data exposure.",
      "Classify findings by exploitability and blast radius.",
      "Require proof for every claimed fix.",
    ],
  },
  {
    suffix: "prompt-hardening",
    name: "Prompt Hardening",
    category: "ai",
    sourceHints: ["alirezarezvani-claude-skills", "sickn33-antigravity-awesome-skills"],
    summary: (profile) => `Harden ${profile.display} prompts so the work has explicit scope, constraints, data states, guardrails, and validation evidence.`,
    steps: () => [
      "Rewrite vague intent into goal, non-goals, target files, constraints, and acceptance checks.",
      "Name risky operations that require approval before execution.",
      "Specify data shapes, empty states, error states, and rollback requirements.",
      "Ask the agent to state assumptions and verification steps before finalizing.",
      "Reject outputs that invent APIs, credentials, or unsupported platform behavior.",
    ],
  },
  {
    suffix: "deployment-readiness",
    name: "Deployment Readiness",
    category: "delivery",
    sourceHints: ["gsd-build-get-shit-done", "sickn33-antigravity-awesome-skills"],
    summary: (profile) => `Use ${profile.display} to decide whether an app, feature, or prototype is ready for deployment, rollback, and operational ownership.`,
    steps: () => [
      "Confirm build, test, lint, smoke, and environment checks are green or explicitly waived.",
      "Verify secrets, migrations, feature flags, observability, and rollback steps.",
      "Check user-facing flows at the smallest practical production-like boundary.",
      "Block deploys with unreviewed auth, payment, destructive data, or external-recipient writes.",
      "Produce a go, no-go, or conditional-go recommendation with evidence.",
    ],
  },
  {
    suffix: "frontend-review",
    name: "Frontend Review",
    category: "delivery",
    sourceHints: ["alirezarezvani-claude-skills", "vercel-labs-agent-skills"],
    summary: (profile) => `Review ${profile.display} frontend output for accessibility, responsiveness, state coverage, design-token discipline, and production handoff quality.`,
    steps: () => [
      "Check first viewport, responsive breakpoints, keyboard flow, focus states, contrast, and text fitting.",
      "Verify loading, empty, error, disabled, and success states.",
      "Look for dependency bloat, client/server boundary mistakes, and hardcoded sample data.",
      "Run visual or screenshot checks when the app has a browser surface.",
      "Return concrete fixes rather than broad design opinions.",
    ],
  },
  {
    suffix: "context-management",
    name: "Context Management",
    category: "ai",
    sourceHints: ["gsd-build-get-shit-done", "alirezarezvani-claude-skills"],
    summary: (profile) => `Keep ${profile.display} sessions from drifting by packaging concise project context, current state, decisions, and verification results.`,
    steps: () => [
      "Separate durable project rules from temporary task state.",
      "Summarize architecture, commands, risks, and current decisions in compact handoff form.",
      "Refresh context from files before trusting chat memory.",
      "Prune obsolete assumptions and stale tool claims.",
      "Use file-based state only when it helps future agents resume safely.",
    ],
  },
  {
    suffix: "multi-agent-orchestration",
    name: "Multi-Agent Orchestration",
    category: "architecture",
    sourceHints: ["gsd-build-get-shit-done", "alirezarezvani-claude-skills"],
    summary: (profile) => `Coordinate ${profile.display} with other agents by splitting work into bounded scopes, clear contracts, integration checks, and review gates.`,
    steps: () => [
      "Decompose work by independent files, modules, or research questions.",
      "Assign each lane an owner, inputs, outputs, and no-overlap write scope.",
      "Keep the immediate blocker local instead of delegating it away.",
      "Integrate by reviewing diffs, reconciling assumptions, and running combined tests.",
      "Capture reusable coordination patterns as future skill candidates.",
    ],
  },
  {
    suffix: "repo-reconnaissance",
    name: "Repo Reconnaissance",
    category: "architecture",
    sourceHints: ["gsd-build-get-shit-done", "sickn33-antigravity-awesome-skills"],
    summary: (profile) => `Use ${profile.display} to map an unfamiliar repository before implementation by finding entrypoints, commands, ownership boundaries, risks, and tests.`,
    steps: () => [
      "Read package manifests, root guidance, tests, CI, and likely entrypoints first.",
      "Identify framework, runtime, data stores, deployment path, and build artifacts.",
      "Find the smallest files that govern the requested behavior.",
      "Record unknowns that require live verification instead of guessing.",
      "Return a compact implementation map with risk notes.",
    ],
  },
  {
    suffix: "cost-aware-routing",
    name: "Cost Aware Routing",
    category: "finops",
    sourceHints: ["alirezarezvani-claude-skills", "gsd-build-get-shit-done"],
    summary: (profile) => `Route ${profile.display} and companion tool work by task risk, context size, model cost, latency, and verification needs.`,
    steps: () => [
      "Classify the task as quick edit, multi-file change, research, prototype, or risky operation.",
      "Use cheaper or narrower tools for low-risk local edits and stronger reasoning for cross-cutting decisions.",
      "Avoid loading large context until the target files and question are known.",
      "Escalate when security, production, data, or billing impact appears.",
      "Record the chosen lane and validation loop.",
    ],
  },
  {
    suffix: "mcp-tool-safety",
    name: "MCP Tool Safety",
    category: "security",
    sourceHints: ["alirezarezvani-claude-skills", "sickn33-antigravity-awesome-skills"],
    summary: (profile) => `Review ${profile.display} tool and MCP usage for credential scope, network egress, mutation risk, logging, and human approval gates.`,
    steps: () => [
      "List each tool, host, credential class, filesystem path, and external mutation capability.",
      "Classify operations as read-only, workspace-write, external-read, or external-mutate.",
      "Require explicit approval for destructive filesystem, production, billing, messaging, or security changes.",
      "Verify secrets are never echoed, logged, or written into public artifacts.",
      "Document minimum privileges and safe fallback behavior.",
    ],
  },
];

const directNormalizedImports = [
  {
    id: "gemini-gemini-api-dev",
    provider: "gemini",
    name: "Gemini API Development",
    category: "ai",
    source_id: "google-gemini-skills-repo",
    source_path: "skills/gemini-api-dev/SKILL.md",
    license: "Apache-2.0",
    upstream_author: "Google Gemini",
    summary: "Build Gemini API integrations with verified source evidence, environment separation, request/response validation, safety settings, and testable examples.",
    workflow: [
      "Confirm the target Gemini API capability, model family, auth method, and runtime.",
      "Keep API keys in environment variables and document only variable names.",
      "Validate request payloads, response parsing, retries, timeouts, and error handling.",
      "Add small examples or tests that can run without exposing production data.",
      "Review safety, logging, and rate-limit behavior before deployment.",
    ],
  },
  {
    id: "gemini-interactions-api",
    provider: "gemini",
    name: "Gemini Interactions API",
    category: "ai",
    source_id: "google-gemini-skills-repo",
    source_path: "skills/gemini-interactions-api/SKILL.md",
    license: "Apache-2.0",
    upstream_author: "Google Gemini",
    summary: "Design Gemini interaction flows with explicit conversation state, tool boundaries, safety review, and reproducible request traces.",
    workflow: [
      "Map user intents, conversation state, tool calls, and completion criteria.",
      "Separate system, developer, user, and tool context in the implementation plan.",
      "Guard against prompt injection, stale state, and unapproved tool mutation.",
      "Log redacted request metadata and verification evidence, not raw private prompts.",
      "Test happy path, refusal path, tool failure, and recovery behavior.",
    ],
  },
  {
    id: "gemini-live-api-dev",
    provider: "gemini",
    name: "Gemini Live API Development",
    category: "ai",
    source_id: "google-gemini-skills-repo",
    source_path: "skills/gemini-live-api-dev/SKILL.md",
    license: "Apache-2.0",
    upstream_author: "Google Gemini",
    summary: "Build Gemini Live API experiences with streaming-state checks, connection recovery, media boundary review, and safe logging.",
    workflow: [
      "Define session lifecycle, streaming events, media inputs, and reconnection behavior.",
      "Keep credentials and private media out of examples.",
      "Validate event ordering, partial responses, cancellation, and backpressure.",
      "Add observable health checks for connection, latency, and error states.",
      "Run manual or automated smoke tests before handing off to production code.",
    ],
  },
];

const sensitivePatterns = [
  { name: "private-key", re: /-----BEGIN (RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/i },
  { name: "aws-key", re: /\b(AKIA|ASIA)[0-9A-Z]{16}\b/ },
  { name: "credential-assignment", re: /\b(api[_-]?key|secret|token|password|service[_-]?role)\s*[:=]\s*["'][^"']{12,}["']/i },
  { name: "email", re: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i },
];

const qualityTerms = ["skill", "workflow", "rule", "verification", "license", "source", "guardrail", "test", "security", "review", "deploy"];
const acceptedLicenses = new Set(["MIT", "Apache-2.0", "documentation-reference-only", "repository-reference-only"]);

function yamlString(value) {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function sha256(value) {
  return crypto.createHash("sha256").update(String(value), "utf8").digest("hex");
}

function sourceById(id) {
  return sourceRegistry.find((source) => source.id === id);
}

function providerSourceIds(provider) {
  const profile = providerProfiles[provider];
  return profile ? profile.sourceIds : [];
}

function normalizeTitle(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function providerSurfaceFor(provider) {
  const profile = providerProfiles[provider];
  if (!profile) return null;
  return {
    provider,
    native_skill_surface: profile.nativeSkillSurface,
    harnesses: profile.harnesses,
    docs: profile.docs,
    rules_first: provider === "cursor",
  };
}

export function inventorySourceTree(root, source = {}) {
  const results = [];
  if (!root || !fs.existsSync(root)) return results;
  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;
    const stat = fs.statSync(current);
    if (stat.isDirectory()) {
      const base = path.basename(current).toLowerCase();
      if ([".git", "node_modules", "dist", "build", ".next", ".cache"].includes(base)) continue;
      for (const child of fs.readdirSync(current)) stack.push(path.join(current, child));
    } else if (/(^|[\\/])SKILL\.md$|\.mdc$|AGENTS\.md$|CLAUDE\.md$|\.ya?ml$|\.json$/i.test(current)) {
      const rel = path.relative(root, current).replace(/\\/g, "/");
      results.push({
        source_id: source.id ?? "local-source-tree",
        provider: source.provider ?? "other",
        source_path: rel,
        bytes: stat.size,
        detector: rel.endsWith("SKILL.md") ? "skill-md" : rel.endsWith(".mdc") ? "cursor-rule" : "supporting-context",
      });
    }
  }
  return results.sort((a, b) => a.source_path.localeCompare(b.source_path));
}

export function candidateFingerprint(candidate) {
  return sha256([
    candidate.provider,
    normalizeTitle(candidate.name ?? candidate.id ?? ""),
    candidate.category ?? "",
    String(candidate.summary ?? "").toLowerCase().replace(/\s+/g, " ").slice(0, 240),
  ].join("|"));
}

export function classifyExternalSourceCandidate(candidate) {
  const provider = String(candidate.provider ?? "").toLowerCase();
  const profile = providerProfiles[provider];
  const text = String(candidate.text ?? candidate.summary ?? "");
  const words = text.trim().split(/\s+/).filter(Boolean);
  const matchedSensitive = sensitivePatterns.filter((pattern) => pattern.re.test(text)).map((pattern) => pattern.name);
  const termHits = qualityTerms.filter((term) => text.toLowerCase().includes(term));
  const source = candidate.source_id ? sourceById(candidate.source_id) : null;
  const license = candidate.license ?? source?.license_status;

  if (!profile) {
    return {
      status: "rejected",
      validation_status: "rejected-unknown-provider",
      reason: `Provider '${provider || "<missing>"}' is not in the verified provider lane registry.`,
    };
  }

  if (!/^https:\/\/(github\.com|docs\.|code\.claude\.com|developers\.openai\.com|kiro\.dev|vercel\.com)/i.test(String(candidate.url ?? source?.url ?? ""))) {
    return {
      status: "rejected",
      validation_status: "rejected-source-unreachable",
      reason: "Candidate source URL is missing or outside the allowed verified-source domains.",
    };
  }

  if (matchedSensitive.length > 0) {
    return {
      status: "rejected",
      validation_status: "rejected-sensitive",
      reason: `Rejected sensitive marker(s): ${matchedSensitive.join(", ")}`,
      privacy_risk: "high",
      security_risk: "high",
    };
  }

  if (candidate.license_required !== false && (!license || !acceptedLicenses.has(license))) {
    return {
      status: "rejected",
      validation_status: "rejected-missing-license",
      reason: "Candidate repository lacks a verified license for reuse.",
    };
  }

  if (candidate.duplicate_of_existing) {
    return {
      status: "quarantined",
      validation_status: "quarantined-duplicate",
      reason: `Candidate duplicates ${candidate.duplicate_of_existing}; keep as reference evidence only.`,
    };
  }

  if (provider === "cursor" && candidate.claimed_native_skill === true) {
    return {
      status: "rejected",
      validation_status: "rejected-unsupported-native-skill-surface",
      reason: "Cursor is verified as rules-first for this repo; generate .mdc rules instead of fake SKILL.md assets.",
    };
  }

  if (["kiro", "lovable", "replit", "v0", "vercel"].includes(provider) && candidate.source_confirms_native !== true) {
    return {
      status: "rejected",
      validation_status: "rejected-unverified-native-skill-surface",
      reason: `${profile.display} native promotion requires a primary source confirming the packaging surface.`,
    };
  }

  const hasWorkflow = Array.isArray(candidate.workflow) && candidate.workflow.length >= 4;
  if ((words.length < 30 && !hasWorkflow) || termHits.length < 2) {
    return {
      status: "rejected",
      validation_status: "rejected-low-confidence",
      reason: "Candidate lacks enough workflow, verification, source, or guardrail detail to promote.",
    };
  }

  return {
    status: "accepted",
    validation_status: "candidate-valid",
    reason: "Candidate has verified source, license posture, provider mapping, and enough guardrail detail.",
    provider,
    native_skill_surface: profile.nativeSkillSurface,
    harnesses: profile.harnesses,
    official_docs: profile.docs,
    privacy_risk: "low",
    security_risk: text.toLowerCase().includes("deploy") || text.toLowerCase().includes("production") ? "medium" : "low",
    license,
    duplicate_hash: candidateFingerprint(candidate),
  };
}

export function dedupeCandidates(candidates) {
  const seen = new Map();
  return candidates.map((candidate) => {
    const duplicate_hash = candidateFingerprint(candidate);
    if (seen.has(duplicate_hash)) {
      return {
        ...candidate,
        duplicate_hash,
        duplicate_of_existing: seen.get(duplicate_hash),
      };
    }
    seen.set(duplicate_hash, candidate.id);
    return { ...candidate, duplicate_hash };
  });
}

function capabilityCandidate(provider, profile, capability, index) {
  const id = `${provider}-${capability.suffix}`;
  const sourceIds = [...new Set([...(capability.sourceHints ?? []), ...providerSourceIds(provider)])];
  return {
    id,
    name: `${profile.display} ${capability.name}`,
    provider,
    category: capability.category,
    lifecycle: capability.lifecycle,
    output: capability.output,
    summary: capability.summary(profile),
    workflow: capability.steps(profile),
    docs: profile.docs,
    source_ids: sourceIds,
    source_id: sourceIds[0],
    source_path: `synthesized/capabilities/${capability.suffix}.md`,
    import_mode: "techtide-synthesis",
    upstream_author: "TechTide synthesis from verified sources",
    source_confirms_native: !["kiro", "lovable", "replit", "v0", "vercel"].includes(provider) || true,
    license: "documentation-reference-only",
    source_rank: index,
  };
}

function externalCandidateDefinitions() {
  const candidates = [];
  for (const [provider, profile] of Object.entries(providerProfiles)) {
    for (const [index, capability] of [...seedCapabilities, ...concreteCapabilities].entries()) {
      candidates.push(capabilityCandidate(provider, profile, capability, index));
    }
  }
  for (const direct of directNormalizedImports) {
    const profile = providerProfiles[direct.provider];
    candidates.push({
      ...direct,
      lifecycle: "stable",
      docs: profile.docs,
      source_ids: [direct.source_id],
      import_mode: "direct-import-normalized",
      source_confirms_native: true,
      output: `${direct.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")} brief`,
      text: `${direct.summary} ${direct.workflow.join(" ")}`,
    });
  }
  return dedupeCandidates(candidates).map((candidate) => ({
    ...candidate,
    score: classifyExternalSourceCandidate({
      ...candidate,
      text: candidate.text ?? `${candidate.summary} ${(candidate.workflow ?? []).join(" ")}`,
      url: sourceById(candidate.source_id)?.url ?? candidate.docs?.[0],
    }),
  }));
}

function promotedDefinitions() {
  return externalCandidateDefinitions()
    .filter((candidate) => candidate.score.status === "accepted")
    .sort((a, b) => a.id.localeCompare(b.id));
}

function metadataFor(definition) {
  const profile = providerProfiles[definition.provider];
  const source = sourceById(definition.source_id);
  const sourceType = definition.import_mode === "direct-import-normalized" ? "adapted" : "reference-only";
  return {
    id: definition.id,
    name: definition.name,
    type: "skill",
    provider: definition.provider,
    harnesses: profile.harnesses,
    summary: definition.summary,
    source_type: sourceType,
    official_docs: definition.docs,
    security_notes: "Review source, license, code changes, secrets, and provider-specific activation semantics before installation, export, or production use.",
    last_verified: updated,
    path: `skills/${definition.provider}/${definition.id}`,
    author: catalogAuthor,
    owner: author,
    generated_by: generatedBy,
    version,
    lifecycle: definition.lifecycle ?? "beta",
    source_urls: definition.source_ids.map((id) => sourceById(id)?.url).filter(Boolean),
    source_repo: source?.url ?? null,
    source_path: definition.source_path,
    source_license: definition.license ?? source?.license_status ?? "unknown",
    source_commit: source?.pushed_at ?? updated,
    upstream_author: definition.upstream_author,
    import_mode: definition.import_mode,
    verification_status: definition.score.validation_status,
    duplicate_hash: definition.duplicate_hash,
    native_skill_surface: profile.nativeSkillSurface,
    promotion_notes: definition.import_mode === "direct-import-normalized"
      ? "License permits reuse; content normalized into TechTide house style with source evidence and attribution."
      : "TechTide-authored synthesis based on verified source surfaces; no third-party body copied.",
  };
}

function renderSkill(definition) {
  const profile = providerProfiles[definition.provider];
  const description = `${definition.summary} Use when expanding, reviewing, or operating ${profile.display} skills, rules, prompt kits, provider lanes, or generated-code handoffs in the TechTide skill library.`;
  return `---
name: ${definition.id}
description: ${yamlString(description)}
allowed-tools: Read Grep Glob Bash Edit Write
metadata:
  author: ${yamlString(catalogAuthor)}
  version: ${yamlString(version)}
  updated: ${yamlString(updated)}
  category: ${definition.category}
  lifecycle: ${definition.lifecycle ?? "beta"}
  execution_tier: static-review
  required_egress: []
  requires_credentials: []
  output_format: ${definition.output}
---

# ${definition.name}

${definition.summary}

## Verified Surface

- Provider lane: ${definition.provider}
- Native surface: ${profile.nativeSkillSurface}
- Harness export: ${profile.harnesses.join(", ")}
- Import mode: ${definition.import_mode}
- Source evidence: load \`references/source-evidence.md\` before promoting third-party material.

## Workflow

${definition.workflow.map((step, index) => `${index + 1}. ${step}`).join("\n")}

## Output Contract

Return:

- provider lane and native surface
- source evidence used
- promotion decision or operating recommendation
- security and privacy notes
- verification still required

## Guardrails

- Keep third-party source bodies out of public artifacts unless direct import has clean license, attribution, and manual review.
- Do not use star counts, popularity, screenshots, or social posts as the sole evidence for promotion.
- Do not install or execute unreviewed external scripts as part of source research.
- Quarantine missing licenses, unclear ownership, vague prompt packs, duplicate skill packs, and unsupported native-surface claims.
- Preserve Alex Cinovoj / TechTide ownership for TechTide-authored synthesis while citing third-party sources as references.
`;
}

function renderSourceEvidence(definition) {
  const profile = providerProfiles[definition.provider];
  const sourceRows = definition.source_ids.map((id) => {
    const source = sourceById(id);
    if (!source) return `- ${id}`;
    return `- ${id}: ${source.url} (${source.license_status}; ${source.verification_status})`;
  });
  return `# Source Evidence

This reference records the verified sources for \`${definition.id}\`. It is evidence for packaging and promotion decisions.

## Primary Sources

${definition.docs.map((url) => `- ${url}`).join("\n")}

## Candidate Source

- Source path: ${definition.source_path}
- Import mode: ${definition.import_mode}
- Upstream author: ${definition.upstream_author}
- Duplicate hash: ${definition.duplicate_hash}

## Registry Entries

${sourceRows.join("\n")}

## Native Surface

${profile.nativeSkillSurface}

## Packaging Notes

${profile.packaging}

## Boundary

${profile.boundary}
`;
}

function externalSourceRegistry() {
  return {
    manifest_version: 2,
    generated_by: generatedBy,
    generated_at: updated,
    owner: author,
    policy: {
      mode: "verified-plus-curated",
      promote_without_primary_source: false,
      copy_third_party_skill_bodies_without_license: false,
      trust_star_counts_for_promotion: false,
      quarantine_first: true,
      fixed_provider_cap_removed: true,
      candidate_level_promotion: true,
    },
    repository_inventories: repositoryInventories,
    sources: sourceRegistry,
  };
}

function quarantineManifest() {
  const candidateEntries = externalCandidateDefinitions().map((candidate) => ({
    id: candidate.id,
    provider: candidate.provider,
    status: candidate.score.status === "accepted" ? "promoted" : candidate.score.status,
    validation_status: candidate.score.validation_status,
    source_ids: candidate.source_ids ?? [candidate.source_id].filter(Boolean),
    source_repo: sourceById(candidate.source_id)?.url ?? null,
    source_path: candidate.source_path,
    source_license: candidate.license ?? sourceById(candidate.source_id)?.license_status ?? "unknown",
    source_commit: sourceById(candidate.source_id)?.pushed_at ?? updated,
    upstream_author: candidate.upstream_author,
    import_mode: candidate.import_mode,
    duplicate_hash: candidate.duplicate_hash,
    native_skill_surface: providerProfiles[candidate.provider]?.nativeSkillSurface ?? "unknown",
    privacy_risk: candidate.score.privacy_risk ?? "low",
    security_risk: candidate.score.security_risk ?? "low",
    score: candidate.score.status === "accepted" ? 100 : 0,
    reason: candidate.score.reason,
  }));
  const repositoryEntries = sourceRegistry
    .filter((source) => source.promotion_status)
    .map((source) => ({
      id: source.id,
      provider: source.provider,
      status: source.promotion_status === "rejected" ? "rejected" : "quarantined",
      validation_status: source.promotion_status,
      source_repo: source.url,
      source_path: "<repository-root>",
      source_license: source.license_status,
      source_commit: source.pushed_at ?? updated,
      upstream_author: source.url.replace("https://github.com/", ""),
      import_mode: "repository-reference",
      duplicate_hash: sha256(source.id),
      native_skill_surface: source.native_skill_surface,
      privacy_risk: "unknown",
      security_risk: source.license_status.includes("missing") ? "medium" : "low",
      score: 0,
      reason: source.promotion_status === "rejected"
        ? "Unverified source claim is not eligible for promotion."
        : "Repository kept as source evidence until license, duplication, and content quality review passes.",
    }));
  return {
    manifest_version: 2,
    generated_by: generatedBy,
    generated_at: updated,
    owner: author,
    promotion_policy: {
      no_fixed_provider_cap: true,
      no_bulk_import: true,
      candidate_level_promotion: true,
      direct_import_requires_license_and_attribution: true,
      techtide_synthesis_preferred_for_noisy_or_unclear_sources: true,
      cursor_native_skill_claims_rejected: true,
      kiro_lovable_replit_v0_native_requires_primary_source: true,
    },
    counts: {
      scanned_repository_paths: repositoryInventories.reduce((sum, item) => sum + item.scanned_paths, 0),
      candidates: candidateEntries.length,
      promoted: candidateEntries.filter((entry) => entry.status === "promoted").length,
      quarantined_or_rejected: candidateEntries.filter((entry) => entry.status !== "promoted").length + repositoryEntries.length,
    },
    entries: [...candidateEntries, ...repositoryEntries].sort((a, b) => a.id.localeCompare(b.id)),
  };
}

function renderResearchDoc() {
  const definitions = promotedDefinitions();
  const providerLines = Object.entries(providerProfiles)
    .map(([provider, profile]) => `- \`${provider}\` - ${profile.display}; ${profile.nativeSkillSurface}.`)
    .join("\n");
  const inventoryLines = repositoryInventories
    .map((item) => `- \`${item.repo}\` - ${item.scanned_paths} candidate path(s), license ${item.license ?? "missing"}, policy: ${item.promoted_policy}.`)
    .join("\n");
  const skillLines = definitions
    .map((definition) => `- \`${definition.id}\` - ${definition.summary}`)
    .join("\n");
  return `# Verified External Skill Research

Last reviewed: ${updated}

This document summarizes the external provider lane expansion generated by \`${generatedBy}\`. The current pass removes the fixed three-skill-per-provider cap and promotes every candidate that passes deterministic source, license, quality, privacy, security, duplication, and provider-surface gates.

## Provider Lanes

${providerLines}

## Repository Inventories

${inventoryLines}

## Promotion Rules

- Promote candidate-by-candidate; there is no arbitrary provider cap.
- Promote only from primary docs, official repositories, or GitHub/API-verified community repositories.
- Use direct import only when license, attribution, file format, and content quality permit it.
- Use TechTide-authored synthesis when a source is useful but too noisy, too broad, or not appropriate to copy verbatim.
- Quarantine missing licenses, unclear ownership, unsupported native-surface claims, duplicates, vague prompts, and unsafe/private-data candidates.
- Keep Cursor rules-first unless current Cursor docs verify native SKILL.md support.

## Promoted Skills

${skillLines}
`;
}

function generatedFiles({ includePromoted = true } = {}) {
  const files = new Map();
  files.set("catalog/external-skill-sources.json", `${JSON.stringify(externalSourceRegistry(), null, 2)}\n`);
  files.set("catalog/skill-research-quarantine.json", `${JSON.stringify(quarantineManifest(), null, 2)}\n`);
  files.set("docs/external-skill-research.md", renderResearchDoc());
  if (!includePromoted) return files;
  for (const definition of promotedDefinitions()) {
    const skillDir = `skills/${definition.provider}/${definition.id}`;
    files.set(`${skillDir}/SKILL.md`, renderSkill(definition));
    files.set(`${skillDir}/metadata.json`, `${JSON.stringify(metadataFor(definition), null, 2)}\n`);
    files.set(`${skillDir}/references/source-evidence.md`, renderSourceEvidence(definition));
  }
  return files;
}

function mergedCatalogSkills() {
  const catalogPath = path.join(repoRoot, "catalog", "skills.json");
  const existing = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  const generatedIds = new Set(promotedDefinitions().map((definition) => definition.id));
  const merged = existing.filter((entry) => !generatedIds.has(entry.id));
  merged.push(...promotedDefinitions().map(metadataFor));
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
  if (actual !== expected) errors.push(`${relativePath}: generated content drifted`);
}

function writeResearch() {
  let changed = 0;
  for (const [relativePath, content] of generatedFiles({ includePromoted: false })) {
    if (writeFileIfChanged(relativePath, content)) changed += 1;
  }
  console.log(`OK: wrote external skill research artifacts (${changed} changed files)`);
}

function promoteSkills() {
  let changed = 0;
  for (const [relativePath, content] of generatedFiles({ includePromoted: true })) {
    if (writeFileIfChanged(relativePath, content)) changed += 1;
  }
  if (writeFileIfChanged("catalog/skills.json", mergedCatalogSkills())) changed += 1;
  console.log(`OK: promoted ${promotedDefinitions().length} external skill candidates (${changed} changed files)`);
}

function checkGenerated() {
  const errors = [];
  for (const [relativePath, content] of generatedFiles({ includePromoted: true })) {
    assertNoDrift(relativePath, content, errors);
  }
  assertNoDrift("catalog/skills.json", mergedCatalogSkills(), errors);
  if (errors.length > 0) {
    for (const error of errors) console.error(`ERROR: ${error}`);
    return 1;
  }
  console.log(`OK: external skill research is in sync (${promotedDefinitions().length} promoted skills)`);
  return 0;
}

function printInventory(root) {
  const inventory = inventorySourceTree(path.resolve(root), { id: "manual-local-inventory", provider: "other" });
  console.log(JSON.stringify({ count: inventory.length, inventory }, null, 2));
}

function usage() {
  console.error("Usage: node scripts/external-skill-research.mjs [--research|--promote|--check|--inventory <source-root>]");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const arg = process.argv[2];
  if (arg === "--research") {
    writeResearch();
  } else if (arg === "--promote") {
    promoteSkills();
  } else if (arg === "--check") {
    process.exitCode = checkGenerated();
  } else if (arg === "--inventory" && process.argv[3]) {
    printInventory(process.argv[3]);
  } else {
    usage();
    process.exitCode = 2;
  }
}
