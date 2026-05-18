---
name: "techtide-alibaba"
displayName: "TechTide Frontier - Alibaba Cloud"
description: "Curated Alibaba Cloud agents for RAM, ACK, PolarDB, OSS, and MaxCompute with live-mutation guards and China-region compliance. Routes via techtide-alibaba-maestro to specialist or live-guard agents. China mainland (cn-*) and international regions have separate billing and regulatory scope - always confirm context."
keywords: ["alibaba-cloud", "ram", "ack", "polardb", "oss", "maxcompute", "mlps-2", "live-guard"]
author: "Alex Cinovoj / TechTide"
---
# TechTide Frontier - Alibaba Cloud

Curated Alibaba Cloud agents for RAM, ACK, PolarDB, OSS, and MaxCompute with live-mutation guards and China-region compliance. Routes via techtide-alibaba-maestro to specialist or live-guard agents. China mainland (cn-*) and international regions have separate billing and regulatory scope - always confirm context.

## When to engage this Power

Activate when the task references Alibaba Cloud services, resources, or operations. Do not activate on unrelated requests - narrow keyword matching is required to avoid false activations (Kiro Powers convention).

## Routing pattern

- **`techtide-alibaba-maestro-agent`** - classifies and routes the task to the right specialist

Use the maestro as the entry point: classify the task, then dispatch to one specialist or a parallel team of specialists. Never have the maestro itself execute a live mutation.

## Live-guard agents (gate_mode only)

- `techtide-alibaba-live-ack-rollout-guard-agent` - never auto-dispatched; gate_mode only
- `techtide-alibaba-live-cost-budget-action-guard-agent` - never auto-dispatched; gate_mode only
- `techtide-alibaba-live-kms-key-mutation-guard-agent` - never auto-dispatched; gate_mode only
- `techtide-alibaba-live-oss-bucket-policy-guard-agent` - never auto-dispatched; gate_mode only
- `techtide-alibaba-live-ram-policy-change-guard-agent` - never auto-dispatched; gate_mode only
- `techtide-alibaba-live-rds-polardb-mutation-guard-agent` - never auto-dispatched; gate_mode only

Live-guard agents enforce approval, target confirmation, evidence capture, and rollback plans before executing a mutation. They are never auto-dispatched - the maestro must place them in `live-guard-gate` or `runtime-evidence-gate` mode.

## Invariants

- Confirm region: China mainland (cn-hangzhou, cn-beijing, etc.) and international regions have separate billing accounts and different regulatory scope.
- MLPS 2.0 Level 3 mandates specific service configurations - techtide-alibaba-china-compliance-agent flags gaps before live changes.
- Live-guard agents (alibaba-live-*) must never be auto-dispatched; require approval and rollback plan.
- OSS bucket policies must be reviewed for public exposure and PIPL/DSL data-residency compliance before live changes.

## Where the agents live

Agent specs and adapters are part of the [TechTide Harness Kit](https://github.com/TechTideOhio/techtide-harness-kit) marketplace. For this provider, see `agents/alibaba/` in that repository. All 43 agents in this provider ship a Kiro adapter (`harnesses/kiro-ide.agent.md`, `kiro-cli.agent.json`).

## Companion install paths

- **Claude Code:** `/plugin marketplace add TechTideOhio/techtide-harness-kit` then `/plugin install techtide-harness-kit@techtide-harness-kit`
- **Codex / Copilot / Cursor / Gemini CLI / Kiro (file export):** `npx thk-export-agents --platform <harness> --provider alibaba --repo .`
