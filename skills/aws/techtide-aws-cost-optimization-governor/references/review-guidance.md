# Cost Optimization Governor Review Guidance

Deep reference material for `techtide-aws-cost-optimization-governor`. Load this only when executing the full review.

## Review Domains

Check these areas before giving a verdict:

### 1. Cost Scope and Coverage
Account/OU/team/service/tag coverage, currency, amortization, and discount assumptions. Establish what is being measured and what is excluded.

### 2. Budgets and Cost Visibility
Budgets, alerts, Cost Explorer queries, Cost Optimization Hub findings, and recommendation evidence. Verify the organization can see and react to cost changes.

### 3. Rightsizing and Idle Resources
Rightsizing opportunities, idle resources, commitments, storage lifecycle, data transfer, logging volume, and support cost. Identify waste across all resource types.

### 4. Risk Controls
Rollback paths, workload owner approval, SLO impact, security impact, and measurement after change. Every savings recommendation must have a safety net.

## Assessment Question Bank

### Cost Scope and Visibility
1. Is Cost Explorer enabled and actively reviewed by engineering and finance stakeholders?
2. Are Cost and Usage Reports (CUR) delivered to S3 for Athena or BI tool analysis?
3. Are AWS Budgets configured with alert thresholds per account, project, or team?
4. Is Cost Anomaly Detection active with configured alert recipients?
5. Is Cost Optimization Hub enabled and findings reviewed regularly?
6. What are the top 5 services by monthly spend? Is this breakdown understood by engineering leads?

### Tagging and Attribution
1. Are cost allocation tags activated in the billing console?
2. What is the tagging compliance rate across all accounts (target: 90%+)?
3. Can spend be attributed to specific applications, teams, or environments using tags alone?
4. Are show-back or charge-back reports produced and distributed?
5. Are untagged resources flagged and remediated on a defined cadence?

### Rightsizing and Resource Efficiency
1. Are Compute Optimizer recommendations reviewed and actioned within the last 30 days?
2. Has Graviton been evaluated for eligible EC2, RDS, ElastiCache, and Lambda workloads?
3. Are EBS volumes on gp3 (vs. gp2)?
4. Are idle resources identified: unattached EBS volumes, unused Elastic IPs, idle load balancers, orphaned snapshots?
5. Is there a process for workload owners to confirm before rightsizing changes are applied?

### Commitment Strategy
1. What is the current Savings Plans coverage percentage across compute spend?
2. Are Reserved Instances in place for database (RDS), cache (ElastiCache), and data warehouse (Redshift)?
3. Is the commitment term (1-year vs. 3-year) and payment option justified for each purchase?
4. Are expiring commitments tracked with a renewal or adjustment plan?
5. Has the RI/SP purchase been validated against the instance family and term lock-in risk?

### Storage, Data Transfer, and Operational Waste
1. Are S3 Lifecycle policies or Intelligent Tiering configured for aging data?
2. Is CloudWatch log retention set appropriately (not unlimited)?
3. Is NAT Gateway data transfer cost reviewed and minimized via VPC endpoints?
4. Are dev/staging environments auto-shutdown during non-business hours?
5. Are Spot Instances adopted for fault-tolerant workloads (batch, CI/CD, stateless workers)?

## Validation Checklist

### Cost Visibility
- [ ] Cost Explorer enabled and accessible to engineering leads
- [ ] CUR delivered to S3 with query integration (Athena/QuickSight)
- [ ] AWS Budgets configured with alerts at 80% and 100% thresholds
- [ ] Cost Anomaly Detection active with recipients configured
- [ ] Cost Optimization Hub enabled and findings triaged

### Tagging and Attribution
- [ ] Required tags defined and enforced (env, team, app, cost-center)
- [ ] Cost Allocation Tags activated in billing console
- [ ] Tagging compliance at 90%+ across all accounts
- [ ] Show-back or charge-back reports produced and distributed

### Rightsizing and Idle Resources
- [ ] Compute Optimizer recommendations reviewed within last 30 days
- [ ] Graviton evaluated for eligible workloads
- [ ] EBS gp2 to gp3 migration completed where applicable
- [ ] Orphaned resources identified and removal approved by workload owners
- [ ] Workload owner sign-off obtained before any resource deletion

### Commitment Coverage
- [ ] Savings Plans coverage at target percentage (60-80% of steady-state compute)
- [ ] Reserved Instances in place for database, cache, and data warehouse
- [ ] Expiring commitments tracked with renewal plan
- [ ] Purchase validated against term lock-in and instance family coverage

### Storage and Operational Efficiency
- [ ] S3 Lifecycle or Intelligent Tiering configured for aging data
- [ ] CloudWatch log retention policies set (not unlimited)
- [ ] Dev/staging auto-shutdown implemented for non-business hours
- [ ] NAT Gateway costs reviewed and VPC endpoints deployed where beneficial
- [ ] Spot adoption evaluated for fault-tolerant workloads

## Response Shape

Return this structure:

```
# AWS Cost Optimization Governor: <scope>
## Executive verdict
- Status: READY / READY WITH RISKS / NOT READY / NEEDS EVIDENCE
- Biggest risk:
- Evidence level:
## Scope and assumptions
- Confirmed:
- Unknown:
- Out of scope:
## Findings
| Severity | Finding | Evidence | Why it matters | Minimum safe action |
|---|---|---|---|---|
## Recommended actions
1. <action> - owner: <owner>, validation: <check>, rollback: <rollback>
## Validation
- Commands or checks:
- Expected result:
## Residual risk
- <risk or explicit none>
```

At minimum, every response must include: the scoped target and evidence level, the main risks or control gaps, the safest next actions, validation or rollback notes where relevant, and the assumptions or blockers that prevent stronger conclusions.
