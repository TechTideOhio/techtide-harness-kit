# AWS Skills

<p align="center">
  <img src="../../assets/logos/cloud/aws/aws-cdnlogo.png" alt="AWS logo" width="140" />
</p>


This folder contains AWS-focused skills curated for this marketplace.

## Local marketplace portfolio

As of **2026-04-29**, this folder contains **42** local AWS skills:

- `techtide-aws-agentcore`
- `techtide-aws-api-edge-delivery-review`
- `techtide-aws-bedrock-agent-security-governor`
- `techtide-aws-change-impact-advisor`
- `techtide-aws-ci-cd-release-engineer`
- `techtide-aws-compliance-evidence-mapper`
- `techtide-aws-cost-anomaly-watch-coordinator`
- `techtide-aws-cost-optimization-governor`
- `techtide-aws-daily-operations-briefing-coordinator`
- `techtide-aws-data-protection-backup-steward`
- `techtide-aws-deployment-hotfix-operator`
- `techtide-aws-devops-agent-skill-designer`
- `techtide-aws-dynamodb-data-modeling-performance-review`
- `techtide-aws-ec2-compute-operations-steward`
- `techtide-aws-ecs-fargate-platform-operator`
- `techtide-aws-ecs-service-remediation-operator`
- `techtide-aws-eks-platform-operator`
- `techtide-aws-event-driven-architecture-review`
- `techtide-aws-generative-ai-developer`
- `techtide-aws-iac-change-safety-review`
- `techtide-aws-iac-patch-executor`
- `techtide-aws-iam-least-privilege-review`
- `techtide-aws-kms-secrets-lifecycle-steward`
- `techtide-aws-landing-zone-governor`
- `techtide-aws-live-deployment-guarded-operator`
- `techtide-aws-live-ecs-rollout-guard`
- `techtide-aws-live-iac-change-guard`
- `techtide-aws-live-pipeline-approval-operator`
- `techtide-aws-live-serverless-release-guard`
- `techtide-aws-migration-cutover-architect`
- `techtide-aws-network-architect`
- `techtide-aws-non-destructive-task-automation-advisor`
- `techtide-aws-observability-incident-responder`
- `techtide-aws-pipeline-fix-operator`
- `techtide-aws-rds-aurora-performance-investigator`
- `techtide-aws-resilience-bcdr-review`
- `techtide-aws-s3-data-perimeter-governor`
- `techtide-aws-security-posture-hardening`
- `techtide-aws-serverless-production-readiness`
- `techtide-aws-serverless-rollout-corrector`
- `techtide-aws-solution-architect`
- `techtide-aws-ticket-triage-escalation-coordinator`

## Portfolio posture

Role-based AWS skills for evidence-backed architecture, operations, security, resilience, migration, agentic systems, FinOps workflows, bounded execution, and guarded live-environment operations.

These skills are intentionally conservative:

- prefer `AwsDocumentationMcpServer` via `uvx awslabs.aws-documentation-mcp-server@latest` when available for AWS documentation grounding,
- if `uvx` cannot run in the current environment, say: "I can't run uvx here, so I'm falling back to official AWS docs." Then fall back to official AWS docs, official-source, repo evidence, and read-only AWS CLI evidence when available,
- prefer read-only discovery before mutation,
- separate repo patching from live AWS mutation,
- require explicit target confirmation, approval, rollback posture, and verification for guarded live actions,
- challenge broad IAM, public exposure, untested recovery, skipped previews, and unclear ownership,
- use official AWS documentation and official-source grounding when service behavior matters.

Run `npm run validate` after changing cataloged AWS skills.
