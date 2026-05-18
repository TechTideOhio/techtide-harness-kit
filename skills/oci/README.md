# 🟥 OCI Skills

<p align="center">
  <img src="../../assets/logos/cloud/oci/oracle-cloud-infrastructure.png" alt="Oracle Cloud Infrastructure logo" width="140" />
</p>

This folder contains OCI-focused skills curated for this marketplace.

## Local marketplace portfolio

This folder contains **37** local OCI skills:

- `techtide-oci-autonomous-database-architect`
- `techtide-oci-cloud-guard-responder`
- `techtide-oci-compute-instance-agent-operator`
- `techtide-oci-compute-platform-operator`
- `techtide-oci-cost-finops-analyst`
- `techtide-oci-database-platform-dba`
- `techtide-oci-dbtools-sql-analyst`
- `techtide-oci-devops-container-platform-engineer`
- `techtide-oci-exadata-database-architect`
- `techtide-oci-exadata-platform-architect`
- `techtide-oci-fusion-apps-environment-operator`
- `techtide-oci-goldengate-replication-operator`
- `techtide-oci-identity-access-governor`
- `techtide-oci-iot-digital-twin-engineer`
- `techtide-oci-limits-capacity-planner`
- `techtide-oci-live-autonomous-db-lifecycle-guard`
- `techtide-oci-live-cost-budget-runaway-guard`
- `techtide-oci-live-iam-policy-compartment-guard`
- `techtide-oci-live-network-security-rule-guard`
- `techtide-oci-live-oke-rollout-guard`
- `techtide-oci-live-resource-manager-stack-guard`
- `techtide-oci-live-vault-key-destruction-guard`
- `techtide-oci-load-balancer-traffic-engineer`
- `techtide-oci-maestro`
- `techtide-oci-migration-cutover-architect`
- `techtide-oci-multi-cloud-architect`
- `techtide-oci-mysql-heatwave-ai-specialist`
- `techtide-oci-network-architect`
- `techtide-oci-observability-incident-responder`
- `techtide-oci-recovery-service-operator`
- `techtide-oci-registry-artifact-governor`
- `techtide-oci-resource-search-inventory-analyst`
- `techtide-oci-security-compliance-reviewer`
- `techtide-oci-solution-architect`
- `techtide-oci-storage-backup-steward`
- `techtide-oci-support-incident-coordinator`
- `techtide-oracle-oci-mcp-grounded-advisor`

## Portfolio posture

Role-based OCI skills for evidence-backed architecture, database operations, security, networking, FinOps, identity governance, and guarded live-environment operations.

These skills are intentionally conservative:

- prefer `techtide-oracle-oci-mcp-grounded-advisor` via OCI MCP server when available for live OCI state grounding
- prefer read-only discovery before mutation
- require explicit OCID, compartment, tenancy confirmation, approval, rollback posture, and verification for guarded live actions
- challenge overly broad IAM policies, missing compartment isolation, public exposure, and unclear resource ownership
- use official OCI documentation and live CLI evidence when service behavior matters

Run `npm run validate` after changing cataloged OCI skills.
