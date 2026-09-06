# Waf Reliability Review Review Guidance

Deep reference material for `techtide-aws-waf-reliability-review`. Load this only when executing the full review.

## Core Principles

### 1. Recover Automatically from Failure
Use CloudWatch alarms to trigger Auto Scaling, Lambda retries, SQS DLQ routing, and automated EC2 recovery. Design systems to detect failures and self-heal without manual intervention.

### 2. Test Recovery Procedures
Run AWS FIS experiments, GameDays, chaos engineering, and DR drills (Route 53 failover, RDS failover, EC2 ASG replacement). Never assume recovery works - prove it regularly.

### 3. Scale Horizontally
Use EC2 ASG with target tracking, ECS/EKS service autoscaling, DynamoDB auto scaling, RDS read replicas, and SQS decoupling to absorb load increases without manual intervention.

### 4. Stop Guessing Capacity
Review Service Quotas, run load tests, check Trusted Advisor limits, and act on AWS Compute Optimizer recommendations. Replace capacity guesswork with data-driven provisioning.

### 5. Manage Change Through Automation
Use CodeDeploy blue/green, CloudFormation drift detection, rolling updates, and deployment circuit breakers. All changes should flow through tested automation, not manual processes.

## Relevant AWS Products

- **Compute & Scaling:** EC2 Auto Scaling Groups, ECS/EKS service autoscaling, Lambda concurrency, Elastic Beanstalk
- **Load Balancing & Networking:** Application Load Balancer, Network Load Balancer, Route 53 (failover routing, health checks), Global Accelerator
- **Data & Storage:** RDS Multi-AZ, Aurora Global Database, DynamoDB Global Tables, S3 Cross-Region Replication, ElastiCache Multi-AZ
- **Messaging & Queues:** SQS (DLQs, visibility timeout), SNS, EventBridge, Step Functions
- **Observability:** CloudWatch (alarms, metrics, logs, dashboards), X-Ray, CloudWatch Synthetics
- **Backup & DR:** AWS Backup, RDS automated snapshots, DynamoDB PITR, S3 versioning, Elastic Disaster Recovery
- **Deployment Safety:** CodeDeploy (blue/green, canary), CloudFormation (drift detection, rollback), AWS FIS

## Assessment Question Bank

### Automatic Failure Recovery
1. Are CloudWatch alarms configured to trigger automated recovery actions for critical resources?
2. Are SQS dead-letter queues (DLQs) enabled for all asynchronous processing queues?
3. Is DLQ consumer logic tested and are CloudWatch alarms configured for DLQ depth?
4. Are Auto Scaling health checks configured to replace unhealthy instances automatically?
5. Are Lambda retry policies and DLQ/destination configured for all event-driven functions?
6. Is there an automated remediation path for the most common failure modes?

### Recovery Procedure Testing
1. Are chaos engineering experiments (AWS FIS) performed in pre-production environments?
2. Is a GameDay schedule maintained and followed at least annually for critical workloads?
3. Are DR drills (Route 53 failover, RDS failover, ASG replacement) tested on a regular cadence?
4. Are failure scenarios documented with expected vs. actual results?
5. Are runbooks validated by actual execution during GameDays rather than review only?
6. Is the blast radius of each experiment scoped and approved before execution?

### Horizontal Scalability
1. Are workloads designed to scale out (add instances) rather than scale up (increase instance size)?
2. Are EC2 Auto Scaling policies configured with target tracking for meaningful metrics (request count, queue depth)?
3. Is there capacity headroom to absorb unexpected traffic spikes without manual intervention?
4. Are stateful components (databases, caches) able to scale horizontally or handle peak load without bottlenecks?
5. Are scaling decisions based on meaningful metrics (latency, queue depth) rather than just CPU utilization?
6. Are scale-in operations safe - do they wait for in-flight requests to drain before terminating instances?

### Capacity Planning and Service Quotas
1. Have service quotas been reviewed for all critical AWS services in use?
2. Are Trusted Advisor limit checks monitored and alerted?
3. Has load testing been performed to validate capacity assumptions under expected peak traffic?
4. Are AWS Compute Optimizer recommendations reviewed and acted upon?
5. Are quota increase requests automated or pre-approved for services with tight headroom?

### Change Management Through Automation
1. Are deployments automated via CodeDeploy, CloudFormation, or equivalent IaC?
2. Are blue/green or canary deployment strategies used for critical services?
3. Is CloudFormation drift detection enabled and alerting on configuration drift?
4. Are deployment circuit breakers configured to halt rollouts on error rate increases?
5. Is there a tested rollback procedure for every deployment pipeline?
6. Are manual changes to production explicitly prohibited or gated behind approval workflows?

## Validation Checklist

### Multi-AZ / Multi-Region Topology
- [ ] All stateless compute tiers deployed across at least two Availability Zones
- [ ] RDS configured with Multi-AZ (synchronous standby) for all production databases
- [ ] ElastiCache configured with Multi-AZ automatic failover
- [ ] ALB/NLB health checks removing unhealthy targets automatically
- [ ] Route 53 failover routing configured with health checks for regional impairments
- [ ] Documented recovery procedure for a full AZ failure

### Auto Scaling and Health Checks
- [ ] Auto Scaling configured for all stateless compute (EC2 ASG, ECS services, Lambda concurrency)
- [ ] Scaling metrics reflect meaningful load signals (request count, queue depth) not just CPU
- [ ] Scale-in operations validated to drain connections before instance termination
- [ ] ELB health check intervals and unhealthy thresholds tuned for fast detection

### Queue and Messaging Resilience
- [ ] SQS dead-letter queues enabled for all processing queues
- [ ] DLQ consumer logic implemented, tested, and alerting on DLQ depth
- [ ] Retry policies configured with exponential backoff on all async integrations
- [ ] Consumer idempotency validated before increasing retry counts

### Data Backup and DR Strategy
- [ ] AWS Backup policies configured for all stateful services with automated schedules
- [ ] Backup restores tested within the last 30 days for critical stateful services
- [ ] RTO and RPO targets defined and validated through restore tests
- [ ] Backups stored in a separate account or region from primary data
- [ ] DynamoDB Point-in-Time Recovery (PITR) enabled for all production tables
- [ ] Backup success/failure alerts configured and monitored

### Deployment Safety
- [ ] Blue/green or canary deployments configured for critical services
- [ ] CloudFormation drift detection enabled and alerting
- [ ] Deployment circuit breakers configured to halt on error rate increase
- [ ] Rollback procedures documented, automated, and tested

### Chaos Engineering and DR Testing
- [ ] AWS FIS experiments conducted within the last 12 months for critical workloads
- [ ] Experiments run in non-production first with scoped blast radius
- [ ] DR drills (failover, backup restore) completed and results documented
- [ ] Runbooks validated by execution rather than review only

## Response Shape

1. **Scope** - workload name, accounts, Regions, SLO/RTO/RPO targets, evidence level (live / sanitized / documentation-based / inference)
2. **Service Quota and Capacity Assessment** - quota headroom, Compute Optimizer findings, load test results
3. **Multi-AZ / Multi-Region Topology** - AZ distribution, failover routing, replication status
4. **Auto Scaling and Health Check Coverage** - ASG policies, ELB health checks, scaling metrics
5. **Queue and Messaging Resilience** - DLQ coverage, retry policies, consumer idempotency
6. **Data Backup and DR Strategy** - backup policies, restore test results, RTO/RPO validation
7. **Change Management Safety** - deployment strategy, drift detection, rollback readiness
8. **Chaos Engineering / DR Test Status** - FIS experiments, GameDays, DR drill results
9. **Prioritized Findings and Recommendations** - ordered by RTO/RPO impact x probability x data loss risk, each with rollback path and validation test
10. **Open Risks and Blockers** - items that could not be assessed due to missing evidence
