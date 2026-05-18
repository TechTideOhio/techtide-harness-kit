---
name: "techtide-aws"
displayName: "TechTide Frontier - AWS"
description: "Curated AWS agents for IAM, EKS, Lambda, RDS, S3, and Bedrock with live-mutation guards. Routes via techtide-aws-maestro to specialist or live-guard agents based on task scope. Mutations on real AWS environments require account-ID, region, and approval confirmation before execution."
keywords: ["aws", "iam", "eks", "lambda", "rds", "s3", "bedrock", "live-guard"]
author: "Alex Cinovoj / TechTide"
---
# TechTide Frontier - AWS

Curated AWS agents for IAM, EKS, Lambda, RDS, S3, and Bedrock with live-mutation guards. Routes via techtide-aws-maestro to specialist or live-guard agents based on task scope. Mutations on real AWS environments require account-ID, region, and approval confirmation before execution.

## When to engage this Power

Activate when the task references AWS services, resources, or operations. Do not activate on unrelated requests - narrow keyword matching is required to avoid false activations (Kiro Powers convention).

## Routing pattern

- **`techtide-aws-maestro-agent`** - classifies and routes the task to the right specialist

Use the maestro as the entry point: classify the task, then dispatch to one specialist or a parallel team of specialists. Never have the maestro itself execute a live mutation.

## Live-guard agents (gate_mode only)

- `techtide-aws-live-deployment-guarded-operator-agent` - never auto-dispatched; gate_mode only
- `techtide-aws-live-ecs-rollout-guard-agent` - never auto-dispatched; gate_mode only
- `techtide-aws-live-iac-change-guard-agent` - never auto-dispatched; gate_mode only
- `techtide-aws-live-pipeline-approval-operator-agent` - never auto-dispatched; gate_mode only
- `techtide-aws-live-serverless-release-guard-agent` - never auto-dispatched; gate_mode only

Live-guard agents enforce approval, target confirmation, evidence capture, and rollback plans before executing a mutation. They are never auto-dispatched - the maestro must place them in `live-guard-gate` or `runtime-evidence-gate` mode.

## Invariants

- Confirm AWS account ID and region before any live mutation.
- Live-guard agents (aws-live-*) must never be auto-dispatched; require explicit approval and rollback plan.
- IAM least-privilege review applies to every policy attachment, role assumption, and trust relationship.
- Cross-account access via assume-role must be reviewed by aws-iam-review-agent before activation.

## Where the agents live

Agent specs and adapters are part of the [TechTide Harness Kit](https://github.com/TechTideOhio/techtide-harness-kit) marketplace. For this provider, see `agents/aws/` in that repository. All 47 agents in this provider ship a Kiro adapter (`harnesses/kiro-ide.agent.md`, `kiro-cli.agent.json`).

## Companion install paths

- **Claude Code:** `/plugin marketplace add TechTideOhio/techtide-harness-kit` then `/plugin install techtide-harness-kit@techtide-harness-kit`
- **Codex / Copilot / Cursor / Gemini CLI / Kiro (file export):** `npx thk-export-agents --platform <harness> --provider aws --repo .`
