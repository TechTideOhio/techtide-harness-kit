# AGENTS.md - Navigation Compass

141 agents across 18 providers. This file is the index; load provider files on demand.

## File structure

```
agents/<provider>/<agent-id>/AGENT.md          ← harness-neutral role contract (load this)
agents/<provider>/<agent-id>/harnesses/        ← 7 adapters: codex, copilot, claude-code,
                                                  cursor, gemini, kiro-ide, kiro-cli
agents/<provider>/<agent-id>/metadata.json     ← catalog mirror
catalog/agents.json                            ← machine-readable index of all 127 agents
```

## Agent tiers

| Tier | sandbox_mode | When to load |
|---|---|---|
| **review** | `read-only` | Audit, analysis, recommendations - never writes to live systems |
| **router / maestro** | `read-only` | Classifies task → dispatches narrowest specialist(s); never auto-dispatches live-guards |
| **live-guard** | `workspace-write` | Approval-gated mutations; requires current-state capture + explicit sign-off before every write |

Live-guard agents refuse to proceed without: target confirmation (cluster/account/region), current-state evidence (`kubectl get … -o yaml` / equivalent), and explicit platform-team or operator sign-off. Missing any one is a hard stop.

---

## 🟧 AWS - 43 agents → [`agents/aws/AGENTS.md`](aws/AGENTS.md)

**Entry point:** load `agents/aws/techtide-aws-maestro-agent/AGENT.md` for any AWS task; it routes to the right specialist and back.

| Category | Agents | Load when |
|---|---|---|
| **Router** | `techtide-aws-maestro-agent` | Any AWS task without a known specialist |
| **IAM / identity** | `techtide-aws-iam-least-privilege-review-agent`, `techtide-aws-kms-secrets-lifecycle-steward-agent`, `techtide-aws-s3-data-perimeter-governor-agent`, `techtide-aws-compliance-evidence-mapper-agent` | IAM policy, KMS key policy, S3 perimeter, compliance mapping |
| **Security posture** | `techtide-aws-security-posture-hardening-agent`, `techtide-aws-bedrock-agent-security-governor-agent` | Security Hub, GuardDuty, Bedrock agent trust |
| **Compute / EKS / ECS** | `techtide-aws-eks-platform-operator-agent`, `techtide-aws-ecs-fargate-platform-operator-agent`, `techtide-aws-ec2-compute-operations-steward-agent`, `techtide-aws-ecs-service-remediation-operator-agent` | EKS cluster ops, ECS/Fargate service review, EC2 operations |
| **Databases** | `techtide-aws-rds-aurora-performance-investigator-agent`, `techtide-aws-dynamodb-data-modeling-performance-review-agent` | RDS/Aurora query tuning, DynamoDB data model |
| **Serverless** | `techtide-aws-serverless-production-readiness-agent`, `techtide-aws-serverless-rollout-corrector-agent` | Lambda readiness, canary/alias rollout |
| **Networking / edge** | `techtide-aws-network-architect-agent`, `techtide-aws-api-edge-delivery-review-agent` | VPC/TGW/DirectConnect, API Gateway + CloudFront + WAF |
| **IaC** | `techtide-aws-iac-change-safety-review-agent`, `techtide-aws-iac-patch-executor-agent` | CDK/CFN/SAM/Terraform review, IaC file patching |
| **Cost / FinOps** | `techtide-aws-cost-optimization-governor-agent`, `techtide-aws-cost-anomaly-watch-coordinator-agent` | Cost Explorer, budget drift |
| **CI/CD / DevOps** | `techtide-aws-ci-cd-release-engineer-agent`, `techtide-aws-devops-agent-skill-designer-agent`, `techtide-aws-pipeline-fix-operator-agent`, `techtide-aws-deployment-hotfix-operator-agent` | CodePipeline, release gates, hotfix patching |
| **Architecture** | `techtide-aws-solution-architect-agent`, `techtide-aws-migration-cutover-architect-agent`, `techtide-aws-resilience-bcdr-review-agent`, `techtide-aws-event-driven-architecture-review-agent`, `techtide-aws-landing-zone-governor-agent`, `techtide-aws-network-architect-agent` | Solution design, migrations, BCDR, event-driven, Control Tower |
| **AI / Bedrock** | `techtide-aws-generative-ai-developer-agent`, `techtide-aws-agentcore-agent` | Bedrock app dev, AgentCore deployment |
| **Ops / observability** | `techtide-aws-observability-incident-responder-agent`, `techtide-aws-daily-operations-briefing-coordinator-agent`, `techtide-aws-ticket-triage-escalation-coordinator-agent`, `techtide-aws-change-impact-advisor-agent`, `techtide-aws-data-protection-backup-steward-agent`, `aws-limits-capacity-planner-agent`* | CloudWatch, incident triage, ops briefing |
| **Live-guard (5)** | `techtide-aws-live-deployment-guarded-operator-agent`, `techtide-aws-live-ecs-rollout-guard-agent`, `techtide-aws-live-iac-change-guard-agent`, `techtide-aws-live-pipeline-approval-operator-agent`, `techtide-aws-live-serverless-release-guard-agent` | Approval-gated live mutations; never auto-dispatched |

> For operational rules, credential chain guidance, and MCP tool usage → [`agents/aws/AGENTS.md`](aws/AGENTS.md)

---

## 🟦 Azure - 32 agents → [`agents/azure/AGENTS.md`](azure/AGENTS.md)

**Entry point:** load `agents/azure/techtide-azure-maestro-agent/AGENT.md` for any Azure task.

| Category | Agents | Load when |
|---|---|---|
| **Router** | `techtide-azure-maestro-agent` | Any Azure task without a known specialist |
| **Identity / RBAC** | `techtide-azure-rbac-review-agent`, `techtide-azure-role-selector-agent`, `techtide-azure-entra-id-specialist-agent`, `techtide-azure-identity-governance-review-agent` | Role assignments, custom roles, Entra ID posture, identity governance |
| **AKS / containers** | `techtide-azure-aks-platform-operator-agent` | AKS cluster ops, node pool, networking |
| **App Service** | `techtide-azure-app-service-production-readiness-agent` | Web Apps, Function Apps, deployment slots |
| **Databases** | `techtide-azure-cosmosdb-platform-operator-agent`, `techtide-azure-cosmosdb-performance-investigator-agent`, `techtide-azure-cosmosdb-application-developer-agent` | CosmosDB ops, query perf, app dev patterns |
| **Key Vault / secrets** | `techtide-azure-key-vault-secret-lifecycle-auditor-agent` | Secret rotation, access policy, purge-protection |
| **Cost / FinOps** | `techtide-azure-cost-optimization-governor-agent`, `techtide-azure-cost-estimation-review-agent` | Spend governance, estimate review |
| **Networking** | `techtide-azure-network-topology-review-agent`, `techtide-azure-private-endpoint-adoption-planner-agent` | Hub-spoke, Private Link, DNS |
| **IaC / governance** | `techtide-azure-governance-policy-guardrails-agent`, `techtide-azure-subscription-resource-organization-agent`, `techtide-azure-landing-zone-architect-agent` | Policy, management groups, landing zones |
| **CI/CD / DevOps** | `techtide-azure-platform-automation-devops-agent` | Pipelines, automation, platform DevOps |
| **AI / Foundry** | `techtide-azure-ai-foundry-ops-governor-agent` | AI Foundry, model deployments, governance |
| **Architecture** | `azure-solution-architect-agent`*, `techtide-azure-migrate-landing-zone-cutover-agent`, `techtide-azure-resilience-bcdr-review-agent` | Solution design, migrations, BCDR |
| **Observability / ops** | `techtide-azure-observability-investigator-agent`, `techtide-azure-resource-health-incident-triage-agent`, `techtide-azure-security-posture-hardening-agent` | Monitor, Log Analytics, incident triage |
| **Live-guard (7)** | `techtide-azure-live-aks-rollout-guard-agent`, `techtide-azure-live-app-service-slot-swap-guard-agent`, `techtide-azure-live-arm-deployment-stack-guard-agent`, `techtide-azure-live-cost-budget-action-guard-agent`, `techtide-azure-live-entra-role-assignment-guard-agent`, `techtide-azure-live-keyvault-rotation-purge-guard-agent`, `techtide-azure-live-pim-jit-activation-guard-agent` | Approval-gated live mutations; never auto-dispatched |

> For permission models, PIM gate details, and MCP guidance → [`agents/azure/AGENTS.md`](azure/AGENTS.md)

---

## 🟥 OCI - 35 agents → [`agents/oci/AGENTS.md`](oci/AGENTS.md)

**Entry point:** load `agents/oci/techtide-oci-maestro-agent/AGENT.md` for any OCI task.

| Category | Agents | Load when |
|---|---|---|
| **Router** | `techtide-oci-maestro-agent` | Any OCI task without a known specialist |
| **IAM / identity** | `techtide-oci-identity-access-governor-agent`, `techtide-oci-cloud-guard-responder-agent` | OCI IAM policies, dynamic groups, Cloud Guard |
| **Compute** | `techtide-oci-compute-platform-operator-agent`, `techtide-oci-compute-instance-agent-operator-agent` | Instances, autoscaling, instance agents |
| **Databases** | `techtide-oci-autonomous-database-architect-agent`, `techtide-oci-exadata-platform-architect-agent`, `techtide-oci-database-platform-dba-agent`, `techtide-oci-mysql-heatwave-ai-specialist-agent`, `techtide-oci-goldengate-replication-operator-agent`, `techtide-oci-recovery-service-operator-agent`, `techtide-oci-dbtools-sql-analyst-agent` | ADB, Exadata, DBA ops, HeatWave, GoldenGate, recovery |
| **OKE / containers** | `techtide-oci-devops-container-platform-engineer-agent` | OKE, DevOps pipelines, container registry |
| **Networking** | `techtide-oci-network-architect-agent`, `techtide-oci-load-balancer-traffic-engineer-agent` | VCN, FastConnect, LBaaS, DRG |
| **Storage / backup** | `techtide-oci-storage-backup-steward-agent`, `techtide-oci-registry-artifact-governor-agent` | Object Storage, backups, OCIR |
| **Cost / FinOps** | `techtide-oci-cost-finops-analyst-agent`, `techtide-oci-limits-capacity-planner-agent` | Cost analysis, limits, quotas |
| **Architecture** | `techtide-oci-solution-architect-agent`, `techtide-oci-migration-cutover-architect-agent`, `techtide-oci-multi-cloud-architect-agent`, `oci-resilience-bcdr-architect-agent`* | Solution design, migrations, multi-cloud |
| **Observability / support** | `techtide-oci-observability-incident-responder-agent`, `techtide-oci-support-incident-coordinator-agent`, `techtide-oci-resource-search-inventory-analyst-agent` | Monitoring, support SRs, resource inventory |
| **Specialist** | `techtide-oci-security-compliance-reviewer-agent`, `techtide-oci-iot-digital-twin-engineer-agent`, `techtide-oci-fusion-apps-environment-operator-agent` | Security posture, IoT/OIC, Fusion SaaS |
| **Live-guard (7)** | `techtide-oci-live-autonomous-db-lifecycle-guard-agent`, `techtide-oci-live-cost-budget-runaway-guard-agent`, `techtide-oci-live-iam-policy-compartment-guard-agent`, `techtide-oci-live-network-security-rule-guard-agent`, `techtide-oci-live-oke-rollout-guard-agent`, `techtide-oci-live-resource-manager-stack-guard-agent`, `techtide-oci-live-vault-key-destruction-guard-agent` | Approval-gated live mutations; never auto-dispatched |

> For compartment scoping, Resource Manager rules, and OCI MCP guidance → [`agents/oci/AGENTS.md`](oci/AGENTS.md)

---

## ☁️ OVHcloud - 6 agents → [`agents/ovhcloud/README.md`](ovhcloud/README.md)

**Entry point:** load `agents/ovhcloud/techtide-ovhcloud-maestro-agent/AGENT.md` for any OVHcloud task.

| Category | Agents | Load when |
|---|---|---|
| **Router** | `techtide-ovhcloud-maestro-agent` | Any OVHcloud task without a known specialist |
| **IAM** | `techtide-ovhcloud-iam-policy-review-agent` | IAM policy conditions, identity groups, OAuth2 access |
| **Cost / FinOps** | `techtide-ovhcloud-cost-finops-analyst-agent` | Public Cloud cost, commitments, idle waste |
| **Kubernetes** | `techtide-ovhcloud-kubernetes-platform-operator-agent` | MCK lifecycle, node pools, workload placement |
| **Networking** | `techtide-ovhcloud-network-architect-agent` | vRack design, network isolation, connectivity |
| **Live-guard (1)** | `techtide-ovhcloud-live-kms-key-destruction-guard-agent` | KMS key destruction; approval-gated, never auto-dispatched |

> Conditional IAM policies (IP, tag, expiration) are unique - always audit policy scope before approval.

---

## 🌐 IONOS Cloud - 6 agents → [`agents/ionos/README.md`](ionos/README.md)

**Entry point:** load `agents/ionos/techtide-ionos-maestro-agent/AGENT.md` for any IONOS Cloud task.

| Category | Agents | Load when |
|---|---|---|
| **Router** | `techtide-ionos-maestro-agent` | Any IONOS Cloud task without a known specialist |
| **DCD topology** | `techtide-ionos-datacenter-designer-reviewer-agent` | Data Center Designer review, multi-AZ placement, blast radius |
| **Compliance** | `techtide-ionos-security-compliance-reviewer-agent` | GDPR posture, data residency, encryption audit |
| **Kubernetes** | `techtide-ionos-kubernetes-platform-operator-agent` | Managed K8s, node pools, workload placement |
| **Cost / FinOps** | `techtide-ionos-cost-optimization-analyst-agent` | Cost analysis, resource utilization |
| **Live-guard (1)** | `techtide-ionos-live-database-lifecycle-guard-agent` | DBaaS failover/scaling/backup; approval-gated |

> DCD changes have multi-AZ topology blast radius; live-guards must snapshot current state before any mutation.

---

## 🇫🇷 Scaleway - 6 agents → [`agents/scaleway/README.md`](scaleway/README.md)

**Entry point:** load `agents/scaleway/techtide-scaleway-maestro-agent/AGENT.md` for any Scaleway task.

| Category | Agents | Load when |
|---|---|---|
| **Router** | `techtide-scaleway-maestro-agent` | Any Scaleway task without a known specialist |
| **IAM** | `techtide-scaleway-iam-policy-review-agent` | IAM bindings, service accounts, API key governance |
| **Kapsule (K8s)** | `techtide-scaleway-kapsule-platform-operator-agent` | Managed K8s readiness, node pools, CNI choice, placement |
| **Cost / FinOps** | `techtide-scaleway-cost-optimizer-agent` | Instance type review, reserved utilization, rightsizing |
| **Networking** | `techtide-scaleway-network-architect-agent` | VPC, security groups, placement groups for HA |
| **Live-guard (1)** | `techtide-scaleway-live-kapsule-rollout-guard-agent` | Kapsule cluster + node pool mutations; approval-gated |

> Placement groups orchestrate HA; Kapsule control-plane and CNI choice are immutable post-creation.

---

## 🇩🇪 Hetzner Cloud - 6 agents → [`agents/hetzner/README.md`](hetzner/README.md)

**Entry point:** load `agents/hetzner/techtide-hetzner-maestro-agent/AGENT.md` for any Hetzner Cloud task.

| Category | Agents | Load when |
|---|---|---|
| **Router** | `techtide-hetzner-maestro-agent` | Any Hetzner Cloud task without a known specialist |
| **Cost / FinOps** | `techtide-hetzner-cost-optimization-analyst-agent` | Instance type review, resource utilization, cost savings |
| **Infra review** | `techtide-hetzner-infrastructure-reviewer-agent` | Firewall rules, LB config, network design, public-IP exposure |
| **Capacity** | `techtide-hetzner-capacity-planner-agent` | Resource limits, quota, growth planning, region distribution |
| **Live-guard (2)** | `techtide-hetzner-live-firewall-rule-guard-agent`, `techtide-hetzner-live-server-lifecycle-guard-agent` | Firewall rule + server lifecycle mutations; approval-gated |

> No official Terraform provider - agents recommend REST API / hcloud-python over community Terraform.

---

## 💰 Contabo - 6 agents → [`agents/contabo/README.md`](contabo/README.md)

**Entry point:** load `agents/contabo/techtide-contabo-maestro-agent/AGENT.md` for any Contabo task.

| Category | Agents | Load when |
|---|---|---|
| **Router** | `techtide-contabo-maestro-agent` | Any Contabo task without a known specialist |
| **Cost / FinOps** | `techtide-contabo-cost-optimization-analyst-agent` | Contract period analysis, VPS sizing, addon utilization |
| **Capacity** | `techtide-contabo-capacity-planner-agent` | Resource planning, region coverage, instance sizing |
| **Security** | `techtide-contabo-security-hardening-agent` | SSH key management, default user policy, firewall posture |
| **Live-guard (2)** | `techtide-contabo-live-instance-lifecycle-guard-agent`, `techtide-contabo-live-storage-operations-guard-agent` | VPS/VDS + Object Storage mutations; approval-gated |

> Contractual periods (1/3/6/12 months) drive billing; live-guards demand explicit period acknowledgment before any lifecycle change. No official Terraform/SDK - automation via `cntb` CLI or REST API.

---

## ☸️ Kubernetes - 13 agents → [`agents/kubernetes/README.md`](kubernetes/README.md)

**Entry point:** load `agents/kubernetes/techtide-kubernetes-maestro-agent/AGENT.md` - routes to all K8s specialists (including CNCF domain agents below) and enforces the live-guard gate.

| Agent | Tier | Load when |
|---|---|---|
| [`techtide-kubernetes-maestro-agent`](kubernetes/techtide-kubernetes-maestro-agent/AGENT.md) | router | Any Kubernetes task; dispatches to the right specialist(s) in parallel |
| [`techtide-kubernetes-rbac-review-agent`](kubernetes/techtide-kubernetes-rbac-review-agent/AGENT.md) | review | Roles, ClusterRoles, RoleBindings, ClusterRoleBindings, escalation paths |
| [`techtide-kubernetes-workload-identity-review-agent`](kubernetes/techtide-kubernetes-workload-identity-review-agent/AGENT.md) | review | IRSA, Azure Workload Identity, GKE WI Federation, projected tokens, OIDC trust policy |
| [`techtide-kubernetes-psa-review-agent`](kubernetes/techtide-kubernetes-psa-review-agent/AGENT.md) | review | Pod Security Admission labels, enforce/audit/warn modes, PSP migration |
| [`techtide-kubernetes-pod-spec-review-agent`](kubernetes/techtide-kubernetes-pod-spec-review-agent/AGENT.md) | review | Pod securityContext, capabilities, privileged containers, host network/PID/IPC, readOnly filesystem |
| [`techtide-external-secrets-operator-review-agent`](kubernetes/techtide-external-secrets-operator-review-agent/AGENT.md) | review | ESO SecretStore, ClusterSecretStore, ExternalSecret, PushSecret scope and auth |
| [`techtide-kubecost-chargeback-allocation-review-agent`](kubernetes/techtide-kubecost-chargeback-allocation-review-agent/AGENT.md) | review | Kubecost label taxonomy, shared cost model, idle allocation, namespace budget alerts |
| [`techtide-kubernetes-live-rbac-mutation-guard-agent`](kubernetes/techtide-kubernetes-live-rbac-mutation-guard-agent/AGENT.md) | live-guard | kubectl apply/delete on Roles/ClusterRoles/Bindings |
| [`techtide-kubernetes-live-admission-policy-guard-agent`](kubernetes/techtide-kubernetes-live-admission-policy-guard-agent/AGENT.md) | live-guard | kubectl apply/delete on Kyverno ClusterPolicy/Policy/PolicyException, VAP |
| [`techtide-kubernetes-live-argocd-sync-guard-agent`](kubernetes/techtide-kubernetes-live-argocd-sync-guard-agent/AGENT.md) | live-guard | argocd sync, AppProject mutations, sync-window changes |
| [`techtide-kubernetes-live-mesh-policy-guard-agent`](kubernetes/techtide-kubernetes-live-mesh-policy-guard-agent/AGENT.md) | live-guard | kubectl apply/delete on Istio AuthorizationPolicy, PeerAuthentication |
| [`techtide-kubernetes-live-network-policy-guard-agent`](kubernetes/techtide-kubernetes-live-network-policy-guard-agent/AGENT.md) | live-guard | kubectl apply/delete on CiliumNetworkPolicy, NetworkPolicy |
| [`techtide-kubernetes-live-velero-restore-guard-agent`](kubernetes/techtide-kubernetes-live-velero-restore-guard-agent/AGENT.md) | live-guard | velero restore create, backup schedule deletion, backup lifecycle operations |

---

## 📊 Prometheus - 1 agent → [`agents/prometheus/README.md`](prometheus/README.md)

| Agent | Tier | Load when |
|---|---|---|
| [`techtide-prometheus-alerting-cardinality-review-agent`](prometheus/techtide-prometheus-alerting-cardinality-review-agent/AGENT.md) | review | PromQL alerting rules, recording rules, label cardinality, AlertmanagerConfig routing, inhibition rules |

---

## 🦅 Falco - 1 agent → [`agents/falco/README.md`](falco/README.md)

| Agent | Tier | Load when |
|---|---|---|
| [`techtide-falco-runtime-threat-rules-review-agent`](falco/techtide-falco-runtime-threat-rules-review-agent/AGENT.md) | review | Falco rules, macros, exception blast radius, K8s audit webhook gaps, SIEM alert routing |

---

## 🔏 Sigstore - 1 agent → [`agents/sigstore/README.md`](sigstore/README.md)

| Agent | Tier | Load when |
|---|---|---|
| [`techtide-sigstore-cosign-supply-chain-review-agent`](sigstore/techtide-sigstore-cosign-supply-chain-review-agent/AGENT.md) | review | Cosign signing policy, SBOM attestation, Rekor inclusion, keyless trust root, admission enforcement |

---

## 🔐 cert-manager - 4 agents → [`agents/cert-manager/README.md`](cert-manager/README.md)

| Agent | Tier | Load when |
|---|---|---|
| [`techtide-cert-manager-issuer-trust-review-agent`](cert-manager/techtide-cert-manager-issuer-trust-review-agent/AGENT.md) | review | ClusterIssuer scope, CertificateRequestPolicy auto-approval gap, SAN wildcards, trust-manager bundle blast radius |
| [`techtide-aws-private-ca-issuer-review-agent`](aws/techtide-aws-private-ca-issuer-review-agent/AGENT.md) | review | AWS Private CA issuer: IRSA trust chain, PCA hierarchy, certificate template scope |
| [`techtide-azure-keyvault-certificate-issuer-review-agent`](azure/techtide-azure-keyvault-certificate-issuer-review-agent/AGENT.md) | review | Azure Key Vault cert issuer: Managed Identity auth, soft-delete, rotation trigger |
| [`techtide-oci-certificates-issuer-review-agent`](oci/techtide-oci-certificates-issuer-review-agent/AGENT.md) | review | OCI Certificates Service issuer: instance principal auth, validity duration, revocation policy |

---

## 🔄 FluxCD - 1 agent → [`agents/fluxcd/README.md`](fluxcd/README.md)

| Agent | Tier | Load when |
|---|---|---|
| [`techtide-fluxcd-kustomization-helmrelease-review-agent`](fluxcd/techtide-fluxcd-kustomization-helmrelease-review-agent/AGENT.md) | review | Kustomization SA scoping and prune safety, HelmRelease version pinning, SOPS encryption, multi-tenant isolation |

---

## 🎭 Backstage - 1 agent → [`agents/backstage/README.md`](backstage/README.md)

| Agent | Tier | Load when |
|---|---|---|
| [`techtide-backstage-scaffolder-template-review-agent`](backstage/techtide-backstage-scaffolder-template-review-agent/AGENT.md) | review | Scaffolder template action blast-radius, input injection, RBAC gate, secret scope, catalog entity poisoning |

---

## 💾 Velero - 1 live-guard → [`agents/velero/README.md`](velero/README.md)

| Agent | Tier | Load when |
|---|---|---|
| [`techtide-kubernetes-live-velero-restore-guard-agent`](kubernetes/techtide-kubernetes-live-velero-restore-guard-agent/AGENT.md) | live-guard | velero restore create, backup schedule deletion, backup lifecycle operations |

*Agent lives in `agents/kubernetes/` - dispatched via techtide-kubernetes-maestro*

---

## 🛡️ Kyverno - 1 agent → [`agents/kyverno/README.md`](kyverno/README.md)

| Agent | Tier | Load when |
|---|---|---|
| [`techtide-kyverno-policy-review-agent`](kyverno/techtide-kyverno-policy-review-agent/AGENT.md) | review | ClusterPolicy/Policy failureAction, PolicyException scope, background scan, Kyverno-vs-VAP decision |

*Live mutation of Kyverno policies → `techtide-kubernetes-live-admission-policy-guard-agent` (above)*

---

## 🔄 Argo CD - 2 agents → [`agents/argocd/README.md`](argocd/README.md)

| Agent | Tier | Load when |
|---|---|---|
| [`techtide-argocd-gitops-review-agent`](argocd/techtide-argocd-gitops-review-agent/AGENT.md) | review | AppProject blast-radius, sync impersonation, RollingSync, sync-window scope |
| [`techtide-argo-rollouts-progressive-delivery-review-agent`](argocd/techtide-argo-rollouts-progressive-delivery-review-agent/AGENT.md) | review | Canary analysis templates, traffic provider wiring, PDB/maxUnavailable deadlock, blue-green autoPromotion |

*Live ArgoCD mutations → `techtide-kubernetes-live-argocd-sync-guard-agent` (above)*

---

## 🕸️ Istio - 1 agent → [`agents/istio/README.md`](istio/README.md)

| Agent | Tier | Load when |
|---|---|---|
| [`techtide-istio-ambient-mesh-review-agent`](istio/techtide-istio-ambient-mesh-review-agent/AGENT.md) | review | Ambient mesh, ztunnel L4 vs waypoint L7 enforcement, silent-bypass trap, PeerAuthentication, mTLS posture |

*Live Istio policy mutations → `techtide-kubernetes-live-mesh-policy-guard-agent` (above)*

---

## 🐝 Cilium - 1 agent → [`agents/cilium/README.md`](cilium/README.md)

| Agent | Tier | Load when |
|---|---|---|
| [`techtide-cilium-network-policy-review-agent`](cilium/techtide-cilium-network-policy-review-agent/AGENT.md) | review | CiliumNetworkPolicy, ClusterMesh trust, 169.254.169.254 egress posture, WireGuard encryption |

*Live Cilium policy mutations → `techtide-kubernetes-live-network-policy-guard-agent` (above)*

---

## 📡 OpenTelemetry - 1 agent → [`agents/opentelemetry/README.md`](opentelemetry/README.md)

| Agent | Tier | Load when |
|---|---|---|
| [`techtide-opentelemetry-collector-config-review-agent`](opentelemetry/techtide-opentelemetry-collector-config-review-agent/AGENT.md) | review | Collector pipeline, memory_limiter position, receiver exposure, exporter cardinality, no-exporter silent loss |

---

## 🟩 Terraform - 2 agents → [`agents/terraform/README.md`](terraform/README.md)

| Agent | Tier | Load when |
|---|---|---|
| [`techtide-terraform-maestro-agent`](terraform/techtide-terraform-maestro-agent/AGENT.md) | router | Any IaC task; routes to review or plan-safety sub-flow |
| [`techtide-terraform-reviewer`](terraform/techtide-terraform-reviewer/AGENT.md) | review | Module safety, provider pinning, plan diff assessment, state assumptions |

---

## 💰 FinOps / Multi-cloud - 1 agent → [`agents/finops/README.md`](finops/README.md)

| Agent | Tier | Load when |
|---|---|---|
| [`techtide-finops-cloud-price-advisor-agent`](finops/techtide-finops-cloud-price-advisor-agent/AGENT.md) | review | Live public pricing from AWS + Azure + OCI APIs; cost estimation for live or prototype environments |

---

## Operational rules

- Move agents by updating both `metadata.json` and `catalog/agents.json` in the same commit.
- Run `npm run validate` after any agent metadata change.
- Never auto-dispatch a live-guard agent from a router or orchestration flow - the human must confirm target + current state first.
- Never flatten harness variants into the provider root; canonical identity always lives in `AGENT.md`.
- IDs are always `-agent` suffixed to avoid collision with skill IDs.
- `AGENT.md` and Markdown harness adapters must be flush-left after frontmatter; indented content renders as code blocks.

## Load sequence for multi-domain tasks

1. Start with the domain's maestro (AWS / Azure / OCI / Kubernetes / Terraform).
2. Maestro classifies and dispatches ≤4 specialists in parallel.
3. For Kubernetes tasks spanning mesh + network + admission: load `techtide-kubernetes-maestro-agent` - it holds the full K8s routing table and multi-domain dispatch logic.
4. Never load a live-guard agent without explicit operator intent; maestros surface the live-guard name but do not call it directly.
