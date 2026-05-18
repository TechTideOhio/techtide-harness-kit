# 🛡️ Kyverno Agents

<p align="center">
  <span style="font-size:3.5em">🛡️</span>
</p>

Kyverno agent catalog for this marketplace.

## 🧱 Agent tiers

| Tier | Purpose | Default access | Live cluster mutation |
|---|---|---|---|
| Review agents | Audit Kyverno ClusterPolicy/Policy, PolicyException, failureAction | read-only | not allowed by default |
| Guarded live operators | Apply/delete admission policies on live clusters via kubectl | workspace-write | approval-gated and target-confirmed only |

## 📋 Policy review agents

| Agent | Primary use | Default live posture | Must refuse when |
|---|---|---|---|
| `techtide-kyverno-policy-review-agent` | Review ClusterPolicy/Policy, PolicyException, failureAction, background scan | read-only | - |

## 🔒 Live-guard operators (dispatched by techtide-kubernetes-maestro)

Live-guard agents for Kyverno are housed in `agents/kubernetes/` because they operate at the Kubernetes API layer:

| Agent | Primary use |
|---|---|
| `techtide-kubernetes-live-admission-policy-guard-agent` | Guard live `kubectl apply/delete` on Kyverno ClusterPolicy, Policy, PolicyException, ValidatingAdmissionPolicy |

## 🛡️ Operating note

- Review agents stay read-only - they never write to the cluster
- `failureAction: Enforce` changes are high-stakes - a malformed policy can break workload admission cluster-wide
- `PolicyException` reviews require evidence that the exception is time-bounded and scoped to the narrowest subject
- Always capture `kubectl get clusterpolicy <name> -o yaml` before any mutation
- All live-guard agents produce a structured verdict response - see [`docs/evidence-output-spec.md`](../../docs/evidence-output-spec.md)

## 📦 Install

```bash
# Install Kyverno review agent
npx thk-export-agents --platform claude-code --agents techtide-kyverno-policy-review-agent --repo .

# Install all Kubernetes admission security agents (includes live-guard)
npx thk-export-agents --platform claude-code --role kubernetes-admission-security-engineer --repo .
```
