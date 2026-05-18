# 🟠 Alibaba Cloud Agents

<p align="center">
  <img src="../../assets/logos/cloud/alibaba/alibaba-cloud.svg" alt="Alibaba Cloud logo" width="140" />
</p>

Alibaba Cloud agent catalog for this marketplace. 😄

## 🧱 Agent tiers

| Tier | Purpose | Default access | Live Alibaba Cloud mutation |
|---|---|---|---|
| Role / advisory agents | Review, design, diagnose, coordinate | read-only | not allowed by default |
| Guarded live operators | Work in repos or shells that may target real Alibaba Cloud environments | workspace-write | approval-gated and target-confirmed only |

## 🚦 Guarded live-Alibaba Cloud operators

| Agent | Primary use | Default live posture | Must refuse when |
|---|---|---|---|
| `techtide-alibaba-live-ack-rollout-guard-agent` | live ACK deployment mutations and node pool scaling | health signals + PDB audit + rollback required | cluster version upgrade or node pool deletion lacks preflight evidence |
| `techtide-alibaba-live-ram-policy-change-guard-agent` | live RAM policy and role mutations | current policy snapshot + privilege-escalation check + approval required | account-wide policy change lacks dual approval or Resource Directory scope is unclear |
| `techtide-alibaba-live-kms-key-mutation-guard-agent` | KMS key deletion and disable operations | key usage audit + rotation-vs-deletion separation + waiting period | key is actively used for envelope encryption and no backup key exists |
| `techtide-alibaba-live-cost-budget-action-guard-agent` | live budget threshold changes and Savings Plan purchases | budget baseline + alert thresholds + RI/SP commitment review | budget action removes cost controls or Savings Plan purchase lacks financial approval |
| `techtide-alibaba-live-oss-bucket-policy-guard-agent` | OSS bucket ACL and policy mutations | current ACL/policy capture + public-exposure check + MLPS 2.0 residency review | policy change would make bucket public or violate China data-residency requirements |
| `techtide-alibaba-live-rds-polardb-mutation-guard-agent` | RDS and PolarDB instance deletion and spec changes | instance snapshot + backup policy check + downgrade impact review | instance deletion has no recent backup or spec downgrade breaches SLA |

## 👀 Read-only advisory agents

| Agent | Focus |
|---|---|
| `techtide-alibaba-maestro-agent` | classify and route Alibaba Cloud tasks; China-region aware |
| `techtide-alibaba-ram-iam-review-agent` | RAM users/groups/roles/policies, STS token lifecycle, Resource Directory |
| `techtide-alibaba-security-center-hardening-agent` | Security Center, WAF, Anti-DDoS Pro, Cloud Firewall posture hardening |
| `techtide-alibaba-cost-finops-analyst-agent` | Cost Manager, Savings Plans, Reserved Instances, budget drift |
| `techtide-alibaba-china-compliance-agent` | MLPS 2.0 Level 3, DSL, PIPL, ICP filing, data residency controls |
| `techtide-alibaba-polardb-rds-dba-agent` | PolarDB MySQL/PG/Oracle, RDS, DAS autonomous, Global Database Network |
| `techtide-alibaba-ack-container-platform-operator-agent` | ACK managed/dedicated/serverless, ACR, ASM Service Mesh |
| `techtide-alibaba-resilience-bcdr-review-agent` | RDS/PolarDB/ACK/HBR BCDR designs, RTO/RPO, multi-AZ, runbook review |
| `techtide-alibaba-iac-change-safety-review-agent` | Terraform/ROS blast radius, deletion protection, state drift, plan safety |
| `techtide-alibaba-event-driven-architecture-review-agent` | EventBridge/MNS/RocketMQ/MSE dead-letter, ordering, idempotency, lag |
| `techtide-alibaba-load-balancer-traffic-engineer-agent` | CLB/ALB/NLB/GA type selection, health checks, WAF integration, TLS policy |
| `techtide-alibaba-serverless-production-readiness-agent` | FC3/SAE/EDAS VPC config, concurrency, cold-start, SLS log observability |
| `techtide-alibaba-certificate-manager-issuer-review-agent` | SSL Certificate Manager lifecycle, SLB binding, renewal automation, expiry |
| `techtide-alibaba-cost-anomaly-watch-coordinator-agent` | Cost Manager delta, MaxCompute CU anomalies, ECS spot cost, CDN/OSS spikes |
| `techtide-alibaba-change-impact-advisor-agent` | pre-change blast radius: Resource Directory OU scope, CEN route propagation |
| `techtide-alibaba-registry-artifact-governor-agent` | ACR Enterprise/Personal, image scanning, tag immutability, pull IAM review |
| `techtide-alibaba-oss-data-perimeter-governor-agent` | OSS bucket ACL/BPA, WORM Object Lock, MLPS 2.0 compliance, public exposure |
| `techtide-alibaba-ticket-triage-escalation-coordinator-agent` | P0/P1/P2/P3 triage, SLA enforcement, DingTalk war room coordination |
| `techtide-alibaba-support-incident-coordinator-agent` | severity mapping 紧急/高/中/低, account manager escalation, evidence scrub |
| `techtide-alibaba-daily-operations-briefing-coordinator-agent` | cost delta, ActionTrail anomalies, ACK health, quota warnings, Security Center |
| `techtide-alibaba-actiontrail-audit-analyst-agent` | ActionTrail management API events, SLS-based compliance evidence trails, anomalous admin activity detection |
| `techtide-alibaba-analyticdb-realtime-agent` | AnalyticDB for MySQL/PG, Hologres real-time analytics, DAS OLAP diagnostics |
| `techtide-alibaba-devops-cicd-operator-agent` | RDC (Yunxiao DevOps), Flow pipelines, ACR image lifecycle, Cloud Build, environment promotion |
| `techtide-alibaba-ecs-compute-operator-agent` | ECS instance lifecycle, Auto Scaling, ECI serverless containers, Cloud Assistant O&M, Deployment Set placement |
| `techtide-alibaba-function-serverless-operator-agent` | Function Compute 3.0 event triggers, SAE, EDAS microservice apps, cold-start and concurrency tuning |
| `techtide-alibaba-kms-secret-lifecycle-steward-agent` | KMS key lifecycle, Certificate Manager, SSM Secrets Manager, HSM operations, rotation compliance |
| `techtide-alibaba-landing-zone-architect-agent` | Resource Management org tree, Cloud SSO, Control Policy (SCP-equivalent) baseline, multi-account governance |
| `techtide-alibaba-maxcompute-dataworks-analyst-agent` | MaxCompute CU governance, DataWorks scheduling health, Quick BI, PAI ML integration, query cost optimization |
| `techtide-alibaba-migration-architect-agent` | SMC server migration, DTS database migration/sync, OSSImport, cutover sequencing |
| `techtide-alibaba-mse-microservice-engine-agent` | MSE Nacos (discovery + config), Sentinel (rate limiting + circuit breaking), Seata (distributed tx), ARMS APM |
| `techtide-alibaba-network-architect-agent` | VPC topology, CEN inter-region connectivity, Express Connect hybrid, CLB/ALB/NLB selection, Smart Access Gateway |
| `techtide-alibaba-observability-incident-responder-agent` | CloudMonitor, SLS log analytics, ARMS APM, Distributed Tracing, incident response |
| `techtide-alibaba-oss-storage-steward-agent` | OSS lifecycle policies, bucket ACL/policy, NAS/CPFS file storage, DBFS, cross-region replication |
| `techtide-alibaba-solution-architect-agent` | product selection (PolarDB/RDS, ACK/ASK/SAE, MaxCompute/AnalyticDB), landing zone, HA patterns, migration planning |
| `techtide-alibaba-waf-cost-optimization-review-agent` | ECS rightsizing, Savings Plans/RI coverage, Preemptible Instances, cost tagging, OSS tiering, idle resource elimination |
| `techtide-alibaba-waf-reliability-review-agent` | multi-AZ ECS topology, SLB/ALB/NLB, Auto Scaling, RDS/PolarDB HA failover, backup DR, CloudMonitor/ARMS coverage |
| `techtide-alibaba-waf-security-review-agent` | RAM least-privilege, VPC isolation, KMS/HSM encryption, Security Center, ActionTrail, WAF/Anti-DDoS, MLPS 2.0/DSL/PIPL |

## 🛡️ Operating note

- 😄 advisory agents stay read-only by default
- 🚦 guarded live operators must confirm account ID, region (CN-* vs international), principal, approval, rollback, and verification before mutation
- ⚠️ China mainland regions (cn-hangzhou, cn-beijing, etc.) and international regions have **separate billing accounts and different regulatory scope** - always confirm which context applies before any cost or compliance action
- 🇨🇳 MLPS 2.0 Level 3 mandates specific Alibaba Cloud service configurations - `techtide-alibaba-china-compliance-agent` flags gaps; live guards check residency before OSS/KMS mutations
- 🧾 all live-guard agents produce a structured verdict response - see [`docs/evidence-output-spec.md`](../../docs/evidence-output-spec.md)
