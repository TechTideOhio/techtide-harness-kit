# Waf Cost Optimization Review Review Guidance

Deep reference material for `techtide-aws-waf-cost-optimization-review`. Load this only when executing the full review.

## Core Principles

### 1. Cloud Financial Management
Enable Cost Explorer, deliver Cost and Usage Reports (CUR) to S3, configure Budgets per account/project, activate Cost Anomaly Detection, and enforce a tagging policy. Financial management is a first-class operational discipline.

### 2. Expenditure Awareness
Achieve 100% resource tagging (env, team, app, cost-center), enable Cost Allocation Tags in billing, and produce charge-back / show-back reports. You cannot optimize what you cannot attribute.

### 3. Cost-Effective Resources
Evaluate Graviton vs. x86 for compute, select appropriate instance families, review S3 storage class usage, and assess RDS instance type vs. Aurora Serverless fit. Choose the right resource for each workload pattern.

### 4. Usage Optimization
Configure Auto Scaling for stateless compute, enable S3 Intelligent Tiering or lifecycle rules, adopt Spot Instances for fault-tolerant workloads, and implement dev environment auto-shutdown. Eliminate idle and over-provisioned resources.

### 5. Rate Optimization
Maximize commitment discounts through Savings Plans coverage (Compute > EC2 > SageMaker), Reserved Instances for database/cache, and Hybrid Benefit for Windows/SQL. Reduce effective unit cost through strategic purchasing.

## Relevant AWS Products

- **Cost Visibility:** Cost Explorer, Cost and Usage Reports (CUR), Cost Anomaly Detection, Budgets, Cost Allocation Tags
- **Optimization Tools:** Compute Optimizer, Cost Optimization Hub, Trusted Advisor (cost checks), S3 Storage Lens
- **Commitment Discounts:** Savings Plans (Compute, EC2, SageMaker), Reserved Instances (RDS, ElastiCache, Redshift, OpenSearch)
- **Compute Efficiency:** Graviton instances, Spot Instances, Auto Scaling, Lambda, Fargate
- **Storage Efficiency:** S3 Intelligent Tiering, S3 Lifecycle Policies, EBS gp3 migration, EFS Infrequent Access
- **Data Transfer:** CloudFront, VPC endpoints, PrivateLink, NAT Gateway optimization

## Assessment Question Bank

### Cloud Financial Management
1. Is Cost Explorer enabled and actively used by engineering and finance teams?
2. Are Cost and Usage Reports (CUR) delivered to S3 for detailed analysis?
3. Are AWS Budgets configured per account, project, or team with alert thresholds?
4. Is Cost Anomaly Detection active with alert recipients configured?
5. Is there an enforced tagging policy for cost attribution?
6. Is there a regular cadence (monthly/quarterly) for cost review meetings with stakeholders?

### Expenditure Awareness and Tagging
1. What percentage of resources are tagged with the required cost allocation tags (env, team, app, cost-center)?
2. Are Cost Allocation Tags activated in the billing console?
3. Are charge-back or show-back reports produced and distributed to team leads?
4. Can spend be attributed to a specific application, team, or environment using tags alone?
5. Are untagged resources identified and remediated on a regular cadence?

### Cost-Effective Resource Selection
1. Has Graviton been evaluated for compute workloads (EC2, RDS, ElastiCache, Lambda)?
2. Are instance families right-sized based on Compute Optimizer recommendations?
3. Are S3 storage classes reviewed - is data in the right tier (Standard, IA, Glacier, Intelligent Tiering)?
4. Have managed/serverless alternatives been evaluated for appropriate workloads (Aurora Serverless, Fargate, Lambda)?
5. Are EBS volumes on gp3 (vs. gp2) for cost and performance improvement?
6. Are idle or underutilized resources identified and actioned?

### Usage Optimization
1. Is Auto Scaling configured for all stateless compute tiers?
2. Are S3 Lifecycle policies or Intelligent Tiering configured for data that ages out?
3. Are Spot Instances adopted for fault-tolerant workloads (batch, CI/CD, stateless)?
4. Are dev/staging environments auto-shutdown during non-business hours?
5. Are orphaned resources (unattached EBS volumes, unused Elastic IPs, idle load balancers) identified and removed?
6. Is logging volume managed (CloudWatch log retention, VPC flow log sampling)?

### Rate Optimization and Commitments
1. What is the current Savings Plans coverage percentage across compute spend?
2. Are Savings Plans type selections appropriate (Compute SP for flexibility, EC2 SP for deeper discount)?
3. Are Reserved Instances used for database (RDS), cache (ElastiCache), and data warehouse (Redshift) workloads?
4. Is the commitment term (1-year vs. 3-year) and payment option (no upfront, partial, all upfront) justified?
5. Is there a process for reviewing expiring commitments and renewing or adjusting?
6. Has the RI/SP purchase been validated against the commitment term and instance family lock-in?

## Validation Checklist

### Cost Visibility and Attribution
- [ ] Cost Explorer enabled and accessible to engineering leads
- [ ] CUR delivered to S3 with Athena or QuickSight integration
- [ ] AWS Budgets configured per account/team with alert thresholds at 80% and 100%
- [ ] Cost Anomaly Detection active with recipients configured
- [ ] Cost Allocation Tags activated in billing console

### Tagging Compliance
- [ ] Required tags defined (env, team, app, cost-center) in a tagging policy
- [ ] Tagging compliance at 90%+ across all resources
- [ ] Untagged resource remediation process in place
- [ ] Tag-based cost allocation reports produced and distributed

### Rightsizing and Resource Selection
- [ ] Compute Optimizer recommendations reviewed within the last 30 days
- [ ] Graviton evaluated for eligible compute workloads
- [ ] EBS volumes migrated from gp2 to gp3 where applicable
- [ ] Idle resources identified (unattached volumes, unused IPs, idle LBs) and actioned
- [ ] Workload owner confirmation obtained before any rightsizing changes

### Commitment Strategy
- [ ] Savings Plans coverage reviewed and at target percentage (typically 60-80% of steady-state compute)
- [ ] Savings Plans type selection justified (Compute vs. EC2 vs. SageMaker)
- [ ] Reserved Instances in place for database, cache, and data warehouse workloads
- [ ] Expiring commitments tracked with renewal/adjustment plan
- [ ] Commitment purchases validated against instance family and term lock-in

### Storage and Data Transfer
- [ ] S3 Lifecycle policies or Intelligent Tiering configured for aging data
- [ ] S3 Storage Lens enabled for bucket-level visibility
- [ ] CloudFront used to reduce data transfer costs for high-traffic endpoints
- [ ] NAT Gateway traffic reviewed for cost optimization opportunities

### Operational Efficiency
- [ ] Dev/staging environments auto-shutdown during non-business hours
- [ ] Spot Instances adopted for fault-tolerant workloads
- [ ] CloudWatch log retention policies set appropriately (not unlimited)
- [ ] Regular cost review cadence established (monthly or quarterly)

## Response Shape

1. **Scope** - monthly spend, top services, accounts, Regions, current commitment coverage, evidence level
2. **Cost Visibility and Attribution Assessment** - Cost Explorer, CUR, Budgets, Anomaly Detection status
3. **Tagging Compliance** - coverage percentage, untagged resource count, remediation process
4. **Rightsizing and Instance Family Opportunities** - Compute Optimizer findings, Graviton evaluation, idle resources
5. **Commitment Strategy** - Savings Plans coverage, RI coverage, expiring commitments, recommended purchases
6. **Spot and Managed Service Adoption** - Spot usage, serverless evaluation, managed service fit
7. **Storage and Data Transfer Optimization** - S3 tiering, EBS migration, data transfer costs
8. **Idle Resource Inventory** - unattached volumes, unused IPs, idle LBs, orphaned snapshots
9. **Prioritized Savings Opportunities** - ordered by estimated monthly dollar impact, each with confidence level, validation step, and rollback path
10. **Open Risks and Blockers** - items that could not be assessed due to missing spend data or evidence
