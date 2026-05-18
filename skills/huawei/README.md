# 🔴 Huawei Cloud Skills

<p align="center">
  <img src="../../assets/logos/cloud/huawei/huawei-cloud.svg" alt="Huawei Cloud logo" width="140" />
</p>

This folder contains Huawei Cloud-focused skills curated for this marketplace.

## Local marketplace portfolio

As of **2026-05-09**, this folder contains **43** local Huawei Cloud skills:

- `techtide-huawei-cce-container-platform-operator`
- `techtide-huawei-certificate-manager-issuer-review`
- `techtide-huawei-change-impact-advisor`
- `techtide-huawei-codearts-devops-operator`
- `techtide-huawei-compliance-sovereignty`
- `techtide-huawei-cost-anomaly-watch-coordinator`
- `techtide-huawei-cost-finops-analyst`
- `techtide-huawei-daily-operations-briefing-coordinator`
- `techtide-huawei-dew-kms-lifecycle-steward`
- `techtide-huawei-drs-data-replication-operator`
- `techtide-huawei-dws-dli-data-analyst`
- `techtide-huawei-ecs-compute-operator`
- `techtide-huawei-event-driven-architecture-review`
- `techtide-huawei-functiongraph-serverless-operator`
- `techtide-huawei-gaussdb-rds-dba`
- `techtide-huawei-iac-change-safety-review`
- `techtide-huawei-iam-least-privilege-review`
- `techtide-huawei-ief-edge-computing-operator`
- `techtide-huawei-landing-zone-architect`
- `techtide-huawei-live-cce-rollout-guard`
- `techtide-huawei-live-cost-budget-action-guard`
- `techtide-huawei-live-gaussdb-mutation-guard`
- `techtide-huawei-live-iam-policy-change-guard`
- `techtide-huawei-live-kms-key-destruction-guard`
- `techtide-huawei-live-obs-bucket-policy-guard`
- `techtide-huawei-load-balancer-traffic-engineer`
- `techtide-huawei-maestro`
- `techtide-huawei-migration-architect`
- `techtide-huawei-modelarts-mlops-engineer`
- `techtide-huawei-network-architect`
- `techtide-huawei-obs-data-perimeter-governor`
- `techtide-huawei-obs-storage-steward`
- `techtide-huawei-observability-incident-responder`
- `techtide-huawei-registry-artifact-governor`
- `techtide-huawei-resilience-bcdr-review`
- `techtide-huawei-secmaster-security-operations`
- `techtide-huawei-serverless-production-readiness`
- `techtide-huawei-solution-architect`
- `techtide-huawei-support-incident-coordinator`
- `techtide-huawei-ticket-triage-escalation-coordinator`
- `techtide-huawei-waf-cost-optimization-review`
- `techtide-huawei-waf-reliability-review`
- `techtide-huawei-waf-security-review`

## Portfolio posture

Role-based Huawei Cloud skills for evidence-backed architecture, operations, security, networking, FinOps, and guarded live-environment operations.

These skills are intentionally conservative:

- prefer Huawei Cloud Console and `hcloud` CLI evidence for live state grounding
- prefer read-only discovery before mutation
- require explicit account ID, region, project, principal, approval, rollback posture, and verification for guarded live actions
- challenge overly broad IAM policies, missing SCP controls, DEW key sprawl, public OBS bucket exposure, and MLPS 2.0 Level 3 gaps
- note that **Enterprise Projects** are cost attribution constructs, not security boundaries - always verify IAM and SCP scope independently
- `techtide-huawei-compliance-sovereignty` is a prerequisite check before any workload is considered compliant for China government or regulated enterprise deployments
- note that ModelArts uses **Ascend NPU** flavor families in addition to Nvidia GPUs - confirm the flavor type before estimating cost or writing training job configs
- use official Huawei Cloud documentation at https://support.huaweicloud.com/intl/en-us/ when service behavior matters

Run `npm run validate` after changing cataloged Huawei Cloud skills.
