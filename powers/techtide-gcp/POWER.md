---
name: "techtide-gcp"
displayName: "TechTide Frontier - GCP"
description: "Curated Google Cloud agents for IAM, GKE, Cloud Run, BigQuery, Vertex AI, and AlloyDB with live-mutation guards. Routes via techtide-gcp-maestro to specialist or live-guard agents. Mutations require project ID, region, and approval confirmation; org-level changes need additional review."
keywords: ["gcp", "iam", "gke", "cloud-run", "bigquery", "vertex-ai", "alloydb", "live-guard"]
author: "Alex Cinovoj / TechTide"
---
# TechTide Frontier - GCP

Curated Google Cloud agents for IAM, GKE, Cloud Run, BigQuery, Vertex AI, and AlloyDB with live-mutation guards. Routes via techtide-gcp-maestro to specialist or live-guard agents. Mutations require project ID, region, and approval confirmation; org-level changes need additional review.

## When to engage this Power

Activate when the task references GCP services, resources, or operations. Do not activate on unrelated requests - narrow keyword matching is required to avoid false activations (Kiro Powers convention).

## Routing pattern

- **`techtide-gcp-maestro-agent`** - classifies and routes the task to the right specialist

Use the maestro as the entry point: classify the task, then dispatch to one specialist or a parallel team of specialists. Never have the maestro itself execute a live mutation.

## Live-guard agents (gate_mode only)

- `techtide-gcp-live-bigquery-dataset-deletion-guard-agent` - never auto-dispatched; gate_mode only
- `techtide-gcp-live-cloud-run-traffic-migration-guard-agent` - never auto-dispatched; gate_mode only
- `techtide-gcp-live-cost-budget-action-guard-agent` - never auto-dispatched; gate_mode only
- `techtide-gcp-live-gke-rollout-guard-agent` - never auto-dispatched; gate_mode only
- `techtide-gcp-live-iam-policy-change-guard-agent` - never auto-dispatched; gate_mode only
- `techtide-gcp-live-kms-key-destruction-guard-agent` - never auto-dispatched; gate_mode only

Live-guard agents enforce approval, target confirmation, evidence capture, and rollback plans before executing a mutation. They are never auto-dispatched - the maestro must place them in `live-guard-gate` or `runtime-evidence-gate` mode.

## Invariants

- Confirm GCP project ID and region/zone before any live mutation.
- Live-guard agents (gcp-live-*) must never be auto-dispatched; require approval and rollback plan.
- IAM Conditions and workload identity federation are reviewed by gcp-iam-review-agent before activation.
- Org policy constraints take precedence over project-level IAM grants.

## Where the agents live

Agent specs and adapters are part of the [TechTide Harness Kit](https://github.com/TechTideOhio/techtide-harness-kit) marketplace. For this provider, see `agents/gcp/` in that repository. All 51 agents in this provider ship a Kiro adapter (`harnesses/kiro-ide.agent.md`, `kiro-cli.agent.json`).

## Companion install paths

- **Claude Code:** `/plugin marketplace add TechTideOhio/techtide-harness-kit` then `/plugin install techtide-harness-kit@techtide-harness-kit`
- **Codex / Copilot / Cursor / Gemini CLI / Kiro (file export):** `npx thk-export-agents --platform <harness> --provider gcp --repo .`
