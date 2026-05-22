---
name: techtide-aws-waf-security-review
description: "Review AWS workloads against the Well-Architected Framework Security Pillar: identity foundations, detective controls, infrastructure protection, data protection, and incident response readiness."
allowed-tools: Read Grep Glob
metadata:
  author: "github: TechTide"
  version: "0.1.0"
  updated: "2026-05-09"
  category: security
---

# AWS WAF Security Pillar Review

## Purpose

Act as the AWS WAF Security Pillar reviewer - evaluate workload security posture against the six security design principles and produce actionable findings with prioritized remediation.

## When to use

- Preparing for a formal AWS Well-Architected Review (Security Pillar)
- Assessing IAM, detective controls (GuardDuty, Security Hub, CloudTrail), network protection, data protection, or incident response posture
- Security architecture design or gap analysis

## Lean operating rules

- Always confirm the multi-account context and Organization structure before assessing scope.
- Prefer `AwsDocumentationMcpServer` when available. Otherwise fall back to official AWS docs.
- Separate confirmed facts from inference. If state was not queried, say so.
- Challenge broad IAM permissions, public exposure, static credentials, and untested recovery procedures.
- Never ask users to paste access keys, session tokens, account IDs (unless sanitized), private keys, or customer data.
- Do not invent IAM policies, ARNs, resource names, quotas, account IDs, or live configuration state.
- Always distinguish between Detective controls (GuardDuty, Config) and Preventive controls (SCPs) - they are complementary, not interchangeable.

## Core Principles

### 1. Strong Identity Foundation
Implement IAM least-privilege policies using credential types appropriate to each use case (roles over users, federated access over static keys). Use Permission Boundaries, SCPs, and IAM Access Analyzer to enforce and verify access posture.

### 2. Traceability
Enable CloudTrail across all regions with log file validation and S3 MFA delete. Activate AWS Config recording, Security Hub standards, and GuardDuty for comprehensive audit trail and threat detection.

### 3. Security at All Layers
Apply defense in depth - VPC security groups (no 0.0.0.0/0 on management ports), WAF rules, Shield Advanced, Network Firewall, and EC2/container hardening. Protect every layer from edge to compute to data.

### 4. Automation of Security Best Practices
Use IaC policy checks (cfn_nag, Checkov, tfsec), ECR image scanning, and Config Rules for detective controls. Automate security validation so human error cannot skip critical checks.

### 5. Data Protection
Use KMS CMKs for regulated data (vs. AWS-managed keys), enforce S3 encryption and Block Public Access, rotate secrets via Secrets Manager, and discover PII with Macie.

### 6. Incident Response Readiness
Maintain IR playbooks with automated response paths. Configure GuardDuty automated remediation, Security Hub Insights for trend analysis, and Systems Manager Incident Manager for runbook execution.

## Relevant AWS Products

- **Identity & Access:** IAM (roles, policies, Permission Boundaries), IAM Access Analyzer, AWS Organizations (SCPs), AWS SSO / IAM Identity Center
- **Detective Controls:** Security Hub, GuardDuty, CloudTrail, AWS Config, Amazon Detective, Macie
- **Network Protection:** VPC Security Groups, Network ACLs, AWS WAF, Shield / Shield Advanced, Network Firewall, PrivateLink
- **Data Protection:** KMS (CMKs), S3 Block Public Access, Secrets Manager, Certificate Manager, Macie
- **Incident Response:** Systems Manager Incident Manager, Security Hub Insights, GuardDuty automated response, Lambda remediation
- **Compliance:** AWS Audit Manager, Config Conformance Packs, Security Hub standards (CIS, PCI-DSS, NIST)

## Assessment Question Bank

### Identity Foundation
1. Are IAM roles used instead of IAM users for workload access?
2. Is federated access (SSO / IAM Identity Center) configured for human operators?
3. Are IAM policies scoped to least-privilege with resource-level and condition-based restrictions?
4. Are Permission Boundaries applied to limit the maximum permissions that can be granted?
5. Are SCPs enforced at the Organization level to prevent dangerous actions (e.g., disabling CloudTrail, leaving the org)?
6. Are IAM Access Analyzer findings reviewed and resolved regularly?
7. Is root account usage eliminated and protected with hardware MFA?
8. Are long-lived access keys eliminated or rotated on a defined schedule?

### Traceability
1. Is CloudTrail enabled in all Regions with log file validation?
2. Is CloudTrail log storage protected with S3 MFA delete and restricted access?
3. Is AWS Config recording enabled for all resource types in all Regions?
4. Are Security Hub standards enabled (CIS, Foundational, PCI-DSS as applicable)?
5. Is GuardDuty enabled across all accounts in the Organization?
6. Are CloudWatch log groups configured with appropriate retention periods?
7. Is there a centralized logging account or SIEM integration?

### Infrastructure Protection
1. Are security groups reviewed to ensure no 0.0.0.0/0 on management ports (SSH/RDP)?
2. Is AWS WAF configured on public-facing ALBs and CloudFront distributions?
3. Is Shield Advanced enabled for DDoS protection on critical internet-facing resources?
4. Is VPC flow logging enabled for network forensics?
5. Are private subnets used for workloads that do not require direct internet access?
6. Are VPC endpoints / PrivateLink used to avoid data traversing the public internet?
7. Is Network Firewall deployed for centralized egress filtering?

### Data Protection
1. Is encryption at rest enforced for all data stores (S3, RDS, EBS, DynamoDB)?
2. Are KMS CMKs used (vs. AWS-managed keys) for regulated or sensitive data?
3. Is S3 Block Public Access enabled at the account level?
4. Are secrets (API keys, database credentials) stored in Secrets Manager with automatic rotation?
5. Is Macie enabled for PII discovery on S3 buckets containing customer data?
6. Is encryption in transit enforced (TLS 1.2+ on all endpoints)?
7. Are KMS key policies scoped to specific principals and actions?

### Incident Response Readiness
1. Are IR playbooks documented for the most likely threat scenarios (credential compromise, data exfiltration, ransomware)?
2. Is GuardDuty configured with automated response (Lambda remediation) for high-severity findings?
3. Are Security Hub Insights used to identify recurring patterns and trends?
4. Is Systems Manager Incident Manager configured with runbooks for critical alerts?
5. Is there a defined escalation path with contact information and SLAs?
6. Has a tabletop IR exercise been conducted within the last 12 months?

## Validation Checklist

### IAM and Identity Posture
- [ ] IAM roles used for all workload access (no IAM user access keys in application code)
- [ ] Federated access configured for human operators via SSO / IAM Identity Center
- [ ] Permission Boundaries applied to delegated admin roles
- [ ] SCPs enforced to prevent disabling CloudTrail, leaving Organization, or creating root access keys
- [ ] IAM Access Analyzer findings at zero or triaged with documented exceptions
- [ ] Root account protected with hardware MFA and no active access keys

### Detective Controls Coverage
- [ ] CloudTrail enabled in all Regions with log file validation and centralized log storage
- [ ] AWS Config recording all resource types in all Regions
- [ ] Security Hub enabled with CIS and Foundational Best Practices standards
- [ ] GuardDuty enabled across all accounts in the Organization
- [ ] Security Hub finding count reviewed and high/critical findings triaged

### Network and Infrastructure Protection
- [ ] No security groups with 0.0.0.0/0 on management ports (22, 3389)
- [ ] AWS WAF configured on all public-facing ALBs and CloudFront distributions
- [ ] VPC flow logging enabled for forensic analysis
- [ ] Private subnets used for non-internet-facing workloads
- [ ] VPC endpoints configured for AWS service access from private subnets

### Data Protection
- [ ] Encryption at rest enforced on all data stores (S3, RDS, EBS, DynamoDB)
- [ ] KMS CMKs used for regulated data with scoped key policies
- [ ] S3 Block Public Access enabled at the account level
- [ ] Secrets stored in Secrets Manager with rotation configured
- [ ] Encryption in transit enforced (TLS 1.2+ on all endpoints)

### Incident Response
- [ ] IR playbooks documented for top 3 threat scenarios
- [ ] GuardDuty automated response configured for high-severity findings
- [ ] Escalation path defined with contacts and SLAs
- [ ] Tabletop IR exercise completed within the last 12 months

## Response Shape

1. **Scope** - account structure, Organization context, Regions, compliance drivers (PCI/HIPAA/SOC2), evidence level
2. **Security Hub / GuardDuty / CloudTrail / Config Coverage** - enablement status, finding counts, standards compliance
3. **IAM and Identity Posture** - credential types, least-privilege assessment, Access Analyzer findings, SCP coverage
4. **Network and Infrastructure Protection** - security group review, WAF coverage, network segmentation, VPC endpoints
5. **Data Protection and Encryption** - KMS usage, S3 Block Public Access, Secrets Manager rotation, Macie findings
6. **Incident Response Readiness** - playbook coverage, automated response, escalation paths, exercise history
7. **Prioritized Findings** - ordered by exploitability x blast radius x data sensitivity (Critical / High / Medium)
8. **Open Risks and Blockers** - items that could not be assessed due to missing evidence

## References

The content above is inlined from references for immediate agent use. Load reference files for extended detail:

- [Workflow and output contract](references/workflow-and-output.md) - extended workflow steps and output formatting contract.
- [Safety checklist](references/safety-checklist.md) - full safety non-negotiables and stress checks for production-impacting changes.
- [Official sources](references/official-sources.md) - AWS documentation links for grounding service behavior.
