# 🟩 GCP Skills

<p align="center">
  <img src="../../assets/logos/cloud/gcp/google-cloud.svg" alt="Google Cloud logo" width="140" />
</p>

This folder contains GCP-focused skills curated for this marketplace.

## Local marketplace portfolio

As of **2026-05-09**, this folder contains **51** local GCP skills:

- `techtide-gcp-alloydb-ai-developer`
- `techtide-gcp-alloydb-cloudsql-dba`
- `techtide-gcp-anthos-multicloud-architect`
- `techtide-gcp-apigee-api-platform-operator`
- `techtide-gcp-bigquery-cost-performance-analyst`
- `techtide-gcp-certificate-manager-issuer-review`
- `techtide-gcp-change-impact-advisor`
- `techtide-gcp-cloud-auth-advisor`
- `techtide-gcp-cloud-run-functions-operator`
- `techtide-gcp-cloudbuild-deploy-cicd-operator`
- `techtide-gcp-compliance-assured-workloads`
- `techtide-gcp-compute-engine-operator`
- `techtide-gcp-cost-anomaly-watch-coordinator`
- `techtide-gcp-cost-finops-analyst`
- `techtide-gcp-daily-operations-briefing-coordinator`
- `techtide-gcp-data-pipeline-engineer`
- `techtide-gcp-event-driven-architecture-review`
- `techtide-gcp-firebase-developer`
- `techtide-gcp-gcs-data-perimeter-governor`
- `techtide-gcp-gemini-api-developer`
- `techtide-gcp-gke-platform-operator`
- `techtide-gcp-iac-change-safety-review`
- `techtide-gcp-iam-least-privilege-review`
- `techtide-gcp-landing-zone-architect`
- `techtide-gcp-live-bigquery-dataset-deletion-guard`
- `techtide-gcp-live-cloud-run-traffic-migration-guard`
- `techtide-gcp-live-cost-budget-action-guard`
- `techtide-gcp-live-gke-rollout-guard`
- `techtide-gcp-live-iam-policy-change-guard`
- `techtide-gcp-live-kms-key-destruction-guard`
- `techtide-gcp-load-balancer-traffic-engineer`
- `techtide-gcp-maestro`
- `techtide-gcp-migration-cutover-architect`
- `techtide-gcp-network-architect`
- `techtide-gcp-networking-observability`
- `techtide-gcp-observability-incident-responder`
- `techtide-gcp-registry-artifact-governor`
- `techtide-gcp-resilience-bcdr-review`
- `techtide-gcp-resource-inventory-analyst`
- `techtide-gcp-secret-kms-lifecycle-steward`
- `techtide-gcp-security-posture-hardening`
- `techtide-gcp-serverless-production-readiness`
- `techtide-gcp-solution-architect`
- `techtide-gcp-spanner-architect`
- `techtide-gcp-support-incident-coordinator`
- `techtide-gcp-ticket-triage-escalation-coordinator`
- `techtide-gcp-vertex-ai-mlops-engineer`
- `techtide-gcp-vpc-service-controls-architect`
- `techtide-gcp-waf-cost-optimization-review`
- `techtide-gcp-waf-reliability-review`
- `techtide-gcp-waf-security-review`

## Official upstream reference

When adding or reviewing GCP skills, check the official Google skills repository first:

- https://github.com/google/skills

Use it as the primary upstream reference for GCP-specific workflow ideas, patterns, and alignment with Google-maintained guidance. This local portfolio was bootstrapped from that upstream repository's GKE, BigQuery, AlloyDB, Cloud Run, Firebase, Gemini API, and WAF-pillar skills.

## Portfolio posture

Role-based GCP skills for evidence-backed architecture, operations, security, networking, FinOps, and guarded live-environment operations.

These skills are intentionally conservative:

- prefer `gcloud` CLI and Cloud Console evidence for live GCP state grounding
- prefer read-only discovery before mutation
- require explicit project ID, region (or global scope for VPC), IAM principal, approval, rollback posture, and verification for guarded live actions
- challenge overly broad IAM bindings, SA key sprawl, public GCS/BigQuery exposure, missing VPC Service Controls perimeters, and unclear resource ownership
- note that GCP VPC is **global** - networking mutations can affect all regions; always confirm scope
- use official GCP documentation and live `gcloud` CLI evidence when service behavior matters

Run `npm run validate` after changing cataloged GCP skills.
