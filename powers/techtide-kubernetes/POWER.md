---
name: "techtide-kubernetes"
displayName: "TechTide Frontier - Kubernetes"
description: "Curated Kubernetes agents for RBAC review, workload identity, Pod Security Admission, admission policies, network policies, ArgoCD GitOps, and live mutation guards across RBAC, admission, mesh, network, and rollout planes. Routes via techtide-kubernetes-maestro to specialist or live-guard agents. Cluster context and namespace must be confirmed before any live mutation."
keywords: ["kubernetes", "rbac", "workload-identity", "pod-security-admission", "admission-policies", "argocd", "live-guard"]
author: "Alex Cinovoj / TechTide"
---
# TechTide Frontier - Kubernetes

Curated Kubernetes agents for RBAC review, workload identity, Pod Security Admission, admission policies, network policies, ArgoCD GitOps, and live mutation guards across RBAC, admission, mesh, network, and rollout planes. Routes via techtide-kubernetes-maestro to specialist or live-guard agents. Cluster context and namespace must be confirmed before any live mutation.

## When to engage this Power

Activate when the task references Kubernetes, cluster, namespace, RBAC, or admission policy. Do not activate on unrelated requests - narrow keyword matching is required to avoid false activations (Kiro Powers convention).

## Routing pattern

- **`techtide-kubernetes-maestro-agent`** - classifies and routes the task to the right specialist

Use the maestro as the entry point: classify the task, then dispatch to one specialist or a parallel team of specialists. Never have the maestro itself execute a live mutation.

## Live-guard agents (gate_mode only)

- `techtide-kubernetes-live-admission-policy-guard-agent` - never auto-dispatched; gate_mode only
- `techtide-kubernetes-live-argocd-sync-guard-agent` - never auto-dispatched; gate_mode only
- `techtide-kubernetes-live-mesh-policy-guard-agent` - never auto-dispatched; gate_mode only
- `techtide-kubernetes-live-network-architecture-mutation-guard-agent` - never auto-dispatched; gate_mode only
- `techtide-kubernetes-live-network-policy-guard-agent` - never auto-dispatched; gate_mode only
- `techtide-kubernetes-live-rbac-mutation-guard-agent` - never auto-dispatched; gate_mode only
- `techtide-kubernetes-live-velero-restore-guard-agent` - never auto-dispatched; gate_mode only

Live-guard agents enforce approval, target confirmation, evidence capture, and rollback plans before executing a mutation. They are never auto-dispatched - the maestro must place them in `live-guard-gate` or `runtime-evidence-gate` mode.

## Invariants

- Confirm cluster context (kubeconfig + namespace) before any live mutation.
- Live-guard agents (kubernetes-live-*) must never be auto-dispatched; require approval and rollback plan.
- RBAC ClusterRole and ClusterRoleBinding changes affect every namespace - review blast radius first.
- Admission policies (Kyverno, ValidatingAdmissionPolicy) apply at cluster scope; review for unintended workload rejection.

## Where the agents live

Agent specs and adapters are part of the [TechTide Harness Kit](https://github.com/TechTideOhio/techtide-harness-kit) marketplace. For this provider, see `agents/kubernetes/` in that repository. All 16 agents in this provider ship a Kiro adapter (`harnesses/kiro-ide.agent.md`, `kiro-cli.agent.json`).

## Companion install paths

- **Claude Code:** `/plugin marketplace add TechTideOhio/techtide-harness-kit` then `/plugin install techtide-harness-kit@techtide-harness-kit`
- **Codex / Copilot / Cursor / Gemini CLI / Kiro (file export):** `npx thk-export-agents --platform <harness> --provider kubernetes --repo .`
