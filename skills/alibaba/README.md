# 🟠 Alibaba Cloud Skills

<p align="center">
  <img src="../../assets/logos/cloud/alibaba/alibaba-cloud.svg" alt="Alibaba Cloud logo" width="140" />
</p>

This folder contains Alibaba Cloud-focused skills curated for this marketplace.

## Local marketplace portfolio

As of **2026-05-09**, this folder contains **43** local Alibaba Cloud skills:

- `techtide-alibaba-ack-container-platform-operator`
- `techtide-alibaba-actiontrail-audit-analyst`
- `techtide-alibaba-analyticdb-realtime`
- `techtide-alibaba-certificate-manager-issuer-review`
- `techtide-alibaba-change-impact-advisor`
- `techtide-alibaba-china-compliance`
- `techtide-alibaba-cost-anomaly-watch-coordinator`
- `techtide-alibaba-cost-finops-analyst`
- `techtide-alibaba-daily-operations-briefing-coordinator`
- `techtide-alibaba-devops-cicd-operator`
- `techtide-alibaba-ecs-compute-operator`
- `techtide-alibaba-event-driven-architecture-review`
- `techtide-alibaba-function-serverless-operator`
- `techtide-alibaba-iac-change-safety-review`
- `techtide-alibaba-kms-secret-lifecycle-steward`
- `techtide-alibaba-landing-zone-architect`
- `techtide-alibaba-live-ack-rollout-guard`
- `techtide-alibaba-live-cost-budget-action-guard`
- `techtide-alibaba-live-kms-key-mutation-guard`
- `techtide-alibaba-live-oss-bucket-policy-guard`
- `techtide-alibaba-live-ram-policy-change-guard`
- `techtide-alibaba-live-rds-polardb-mutation-guard`
- `techtide-alibaba-load-balancer-traffic-engineer`
- `techtide-alibaba-maestro`
- `techtide-alibaba-maxcompute-dataworks-analyst`
- `techtide-alibaba-migration-architect`
- `techtide-alibaba-mse-microservice-engine`
- `techtide-alibaba-network-architect`
- `techtide-alibaba-observability-incident-responder`
- `techtide-alibaba-oss-data-perimeter-governor`
- `techtide-alibaba-oss-storage-steward`
- `techtide-alibaba-polardb-rds-dba`
- `techtide-alibaba-ram-iam-review`
- `techtide-alibaba-registry-artifact-governor`
- `techtide-alibaba-resilience-bcdr-review`
- `techtide-alibaba-security-center-hardening`
- `techtide-alibaba-serverless-production-readiness`
- `techtide-alibaba-solution-architect`
- `techtide-alibaba-support-incident-coordinator`
- `techtide-alibaba-ticket-triage-escalation-coordinator`
- `techtide-alibaba-waf-cost-optimization-review`
- `techtide-alibaba-waf-reliability-review`
- `techtide-alibaba-waf-security-review`

## Portfolio posture

Role-based Alibaba Cloud skills for evidence-backed architecture, operations, security, networking, FinOps, and guarded live-environment operations.

These skills are intentionally conservative:

- prefer Alibaba Cloud Console and `aliyun` CLI evidence for live state grounding
- prefer read-only discovery before mutation
- require explicit account ID, region (clearly distinguish CN-* mainland China regions from international regions), principal, approval, rollback posture, and verification for guarded live actions
- challenge overly broad RAM policies, public OSS bucket exposure, missing MLPS 2.0 controls, and unclear Resource Directory boundaries
- note that **China mainland (cn-*) and international regions use separate billing accounts** - always confirm which account context applies
- `techtide-alibaba-china-compliance` is a prerequisite check before any workload launched in CN-* regions is considered production-ready
- use official Alibaba Cloud documentation at https://www.alibabacloud.com/help/en/ when service behavior matters

Run `npm run validate` after changing cataloged Alibaba Cloud skills.
