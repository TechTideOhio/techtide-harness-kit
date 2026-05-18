# Alex/TechTide Agent Skill Pack

Last reviewed: 2026-05-17

This pack captures Alex Cinovoj / TechTide's local engineering patterns as guarded, cataloged skills.

## Skills

- `techtide-ai-tool-decision-router` - Route development work to Cursor, Claude Code, Codex, Lovable, v0, Replit, or a human approval lane based on scope, blast radius, context size, and verification needs.
- `techtide-lovable-build-loop-operator` - Operate the Lovable build loop from prompt setup through scaffold, iteration, preview verification, export, and repo handoff while keeping app output inspectable.
- `techtide-lovable-self-heal-debugger` - Diagnose Lovable app failures with a repeatable wait, inspect, isolate, prompt, and verify loop for dependency, iframe, auth, routing, and preview-cache issues.
- `techtide-lovable-production-handoff` - Convert a Lovable prototype into a repo-owned production candidate by extracting code, documenting assumptions, replacing mocks, and adding tests and deployment gates.
- `techtide-v0-ui-prompt-hardener` - Shape v0 UI prompts into implementable, accessible, responsive interface specifications with explicit data states, constraints, and handoff checks.
- `techtide-replit-fullstack-bootstrap` - Bootstrap Replit projects with a clear app contract, environment variable model, test loop, deployment boundary, and migration path back into a durable repository.
- `techtide-cursor-claude-codex-workflow-router` - Coordinate Cursor, Claude Code, and Codex across a coding task so inline edits, repo reasoning, tests, and final review happen in the right lane.
- `techtide-agent-autopsy-report` - Perform post-run analysis of failed or risky agent work by reconstructing goal, context, tool calls, failure mode, missing guardrails, and preventive skill updates.
- `techtide-production-readiness-audit` - Audit rapidly built applications for production readiness across auth, secrets, data, tests, observability, rollback, deployment, and operational ownership.
- `techtide-ai-generated-code-security-hardener` - Harden untrusted code by reviewing authentication, authorization, injection surfaces, dependency risk, secret exposure, unsafe defaults, and data handling.
- `techtide-mcp-tool-trust-review` - Review MCP servers, tool connectors, and agent tool surfaces for trust boundaries, credential scope, network egress, mutation risk, logging, and approval gates.
- `techtide-context-packaging-onboarding` - Package a project for agent harnesses by preparing concise context files, command maps, architecture summaries, guardrails, and local override boundaries.
- `techtide-multi-agent-worktree-dispatch` - Split substantial engineering work across agents or worktrees with disjoint ownership, clear contracts, validation checkpoints, and integration review.
- `techtide-test-generation-validation-debt` - Turn implementation work into durable test coverage by mapping claims to unit, integration, smoke, visual, and residual-risk checks.
- `techtide-cost-aware-model-routing` - Choose models and coding tools with cost, latency, quota, context size, and task risk in mind while preserving verification and quality requirements.
- `techtide-prompt-to-architecture-extractor` - Convert rough prompts, transcripts, and prototype notes into architecture decisions, constraints, interfaces, data flows, and implementation-ready work packages.
- `techtide-design-stack-research-synthesizer` - Synthesize design-tool research into practical app-building guidance across Stitch, Figma, Claude Code, v0, Lovable, and repo-native frontend implementation.
- `techtide-marketing-automation-skill-distiller` - Extract reusable marketing automation and site-governance workflows into guarded skills without importing private lead lists, campaign exports, or customer data.
- `techtide-knowledge-ingestion-guardrail-review` - Review knowledge ingestion pipelines for source provenance, chunking, embedding, search behavior, redaction, access control, and evidence traceability.
- `techtide-windows-local-automation-guard` - Run local Windows automation safely by checking resolved paths, shell boundaries, destructive command risk, background process visibility, and approval needs.
- `techtide-human-approval-gate-designer` - Design explicit human approval gates for agent workflows that can mutate production, spend money, contact external recipients, delete data, or change security posture.
- `techtide-cross-harness-export-hygiene` - Prepare skills and agents for cross-harness export by separating canonical SKILL.md assets from Cursor rules, Kiro steering, and prompt-kit adapters.
- `techtide-skill-extraction-promotion` - Extract new TechTide skills from local work safely by inventorying curated sources, scoring privacy and quality risk, generating candidates, and promoting only validated assets.
- `techtide-live-coding-session-retro` - Turn a live coding session into reusable engineering memory by extracting decisions, failed paths, tool choices, verification evidence, and skill candidates.

## Adapter Shape

- Native skills: Claude Code, Codex, Gemini, Copilot, Kiro.
- Provider-native lanes after verification: Lovable, Replit, v0/Vercel.
- Companion adapters: Cursor rules, Kiro steering when context is workspace-specific, Lovable prompt kits, v0 prompt hardening kits, Replit bootstrap kits.

## Privacy Stance

The pack stores sanitized source anchors and pattern summaries only. It does not copy raw local source text, customer data, lead lists, logs, env files, or credentials.
