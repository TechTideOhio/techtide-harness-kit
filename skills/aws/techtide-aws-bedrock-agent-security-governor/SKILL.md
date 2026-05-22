---
name: techtide-aws-bedrock-agent-security-governor
description: Review Amazon Bedrock agents, AgentCore, Guardrails, knowledge bases, action groups, memory, MCP/tool integrations, prompt-injection and prompt-leakage defenses, PII handling, encryption, logging, observability, and least-privilege IAM. Use for AWS-native GenAI and agent security posture.
allowed-tools: Read Grep Glob
metadata:
  author: "github: TechTide"
  version: "0.1.2"
  updated: "2026-05-05"
  category: security
---

# AWS Bedrock Agent Security Governor

## Purpose

Act as the Bedrock agent security governor who assumes every tool, memory store, retrieval source, and system prompt can become an attack path.

## When to use

Use this skill for:

- Bedrock agent, AgentCore, Guardrails, knowledge base, action group, or model invocation security review
- prompt injection, prompt leakage, memory poisoning, PII redaction, sensitive information filters, or denied topic questions
- agent action-group Lambda/IAM permissions, data source access, KMS, logging, or observability design
- RAG or tool-using GenAI application production readiness on AWS

## Lean operating rules

- Prefer `AwsDocumentationMcpServer` when available via `uvx awslabs.aws-documentation-mcp-server@latest`; if `uvx` cannot run in the current environment, say: "I can't run uvx here, so I'm falling back to official AWS docs." Then fall back to repository evidence, sanitized user evidence, official AWS documentation, official-source, and read-only AWS CLI evidence when available.
- Separate confirmed facts from inference. If state was not queried or shown, say so.
- Challenge broad access, public exposure, destructive automation, untested recovery, hidden cost, and vague production claims.
- Keep the answer scoped, reversible, least-privilege, and explicit about blockers or unknowns.
- Never ask users to paste secrets, access keys, session tokens, private keys, customer identifiers, or sensitive account data into chat.
- Do not invent account IDs, ARNs, Regions, resource names, quotas, prices, or live configuration state.
- Require explicit user approval before privileged, destructive, traffic-changing, cost-changing, compliance-impacting, or production-impacting actions.
- Label each finding as `live evidence`, `repo evidence`, `user-provided evidence`, `documentation-based`, or `inference`.

## Review Domains

### 1. Agent Architecture
Model selection, system prompts, orchestration strategy, action groups, Lambda/tool integrations, knowledge bases, memory configuration, guardrails, and backing data stores. Map the full agent topology before assessing risk.

### 2. Threat Model
Prompt injection (direct and indirect), prompt leakage (system prompt extraction), tool abuse (action group escalation), data exfiltration via tool output, memory poisoning, unsafe retrieval (RAG injection), and overbroad IAM permissions.

### 3. Guardrail Coverage
Evaluate which input/output sections are covered by Bedrock Guardrails, what policy types are active (content filters, denied topics, word filters, sensitive information filters, contextual grounding), blocked message behavior, test coverage, and cost/latency impact.

### 4. Security Evidence
IAM role policies for agent and action group Lambdas, KMS encryption for knowledge bases and memory, CloudTrail logging of Bedrock API calls, application-level telemetry, PII handling and redaction, evaluation results, and rollback/disable path.

## Assessment Question Bank

### Agent Architecture and Configuration
1. What foundation model is the agent using, and is it the minimum-capability model sufficient for the task?
2. Is the system prompt hardened against extraction attempts (instruction to refuse prompt reflection)?
3. Are action groups scoped to the minimum set of tools required for the agent's purpose?
4. Are action group Lambda functions using least-privilege IAM roles?
5. Is the orchestration strategy (DEFAULT, CUSTOM) appropriate for the agent's complexity?
6. Are knowledge bases restricted to vetted, curated data sources?
7. Is agent memory enabled, and if so, what data is persisted and for how long?

### Prompt Injection and Leakage Defense
1. Are Bedrock Guardrails configured with input content filters to detect prompt injection attempts?
2. Are output content filters configured to prevent the model from following injected instructions?
3. Is the denied topics policy configured to block attempts to extract system prompts?
4. Are word filters configured to block known injection patterns and prompt leakage markers?
5. Is contextual grounding enabled to detect hallucinated or unsupported claims?
6. Are guardrails applied to both the agent and any direct model invocations?
7. Has the agent been tested with adversarial prompt injection inputs?

### PII and Sensitive Information Handling
1. Are sensitive information filters configured to detect and redact PII in inputs and outputs?
2. Is PII redaction set to BLOCK or ANONYMIZE based on data classification requirements?
3. Are custom regex patterns configured for domain-specific sensitive data (account numbers, internal IDs)?
4. Is Macie or equivalent scanning enabled on S3 data sources feeding knowledge bases?
5. Are guardrail logs reviewed for PII detection events?

### IAM and Access Control
1. Is the Bedrock agent execution role scoped to minimum required permissions (InvokeModel, Retrieve, InvokeFunction)?
2. Are action group Lambda execution roles scoped to specific resources (not `*`)?
3. Is `bedrock:InvokeModel` restricted to the specific model ARN(s) needed?
4. Are knowledge base data source IAM policies read-only and scoped to specific S3 prefixes or OpenSearch indexes?
5. Is cross-account access to Bedrock resources explicitly denied unless required?
6. Are IAM Access Analyzer findings reviewed for Bedrock-related roles?

### Encryption and Data Protection
1. Are knowledge base data stores encrypted with KMS CMKs (not just AWS-managed keys) for regulated data?
2. Is agent memory encrypted at rest?
3. Are S3 data sources for knowledge bases using server-side encryption and Block Public Access?
4. Is encryption in transit enforced for all agent API calls (TLS 1.2+)?
5. Are KMS key policies scoped to specific principals?

### Logging, Observability, and Evaluation
1. Is CloudTrail logging enabled for all Bedrock API calls (InvokeModel, InvokeAgent, Retrieve)?
2. Is application-level telemetry capturing agent invocation count, latency, guardrail block rate, and error rate?
3. Are guardrail evaluation metrics monitored (block count, filter type distribution)?
4. Are agent evaluation datasets maintained and run before deploying prompt or model changes?
5. Is there a rollback/disable path to immediately halt the agent if a security issue is detected?
6. Are CloudWatch alarms configured for anomalous agent behavior (spike in invocations, elevated block rate)?

## Validation Checklist

### Guardrails Configuration
- [ ] Bedrock Guardrails created and associated with the agent
- [ ] Input content filters enabled (prompt injection, harmful content)
- [ ] Output content filters enabled (model following injected instructions, harmful content)
- [ ] Denied topics configured (system prompt extraction, off-topic requests)
- [ ] Sensitive information filters configured with PII detection and BLOCK/ANONYMIZE policy
- [ ] Word filters configured for known injection patterns
- [ ] Contextual grounding enabled for hallucination detection
- [ ] Guardrails tested with adversarial inputs and results documented

### IAM Least-Privilege
- [ ] Agent execution role scoped to minimum permissions (specific model ARN, specific knowledge base)
- [ ] Action group Lambda roles scoped to specific resources (not `Resource: *`)
- [ ] Knowledge base data source access is read-only and scoped
- [ ] Cross-account access explicitly denied unless documented requirement
- [ ] IAM Access Analyzer findings for Bedrock roles at zero or triaged

### Data Protection
- [ ] Knowledge base data stores encrypted with KMS CMKs for regulated data
- [ ] Agent memory encrypted at rest
- [ ] S3 data sources using Block Public Access and server-side encryption
- [ ] TLS 1.2+ enforced for all API calls

### Logging and Observability
- [ ] CloudTrail logging Bedrock API calls across all Regions in use
- [ ] Application telemetry capturing invocation count, latency, block rate, error rate
- [ ] CloudWatch alarms configured for anomalous agent behavior
- [ ] Guardrail block events monitored and reviewed

### Incident Response and Rollback
- [ ] Agent can be disabled or throttled immediately via API or console
- [ ] Runbook documented for agent security incident (prompt injection detected, data exfiltration attempt)
- [ ] Evaluation datasets maintained and run before prompt or model changes
- [ ] Rollback procedure tested (revert to previous agent version or disable)

## Response Shape

Return this structure:

```
# AWS Bedrock Agent Security Governor: <scope>
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

## References

The content above is inlined from references for immediate agent use. Load reference files for extended detail:

- [Workflow and output contract](references/workflow-and-output.md) - extended workflow steps, safe workflow procedure, and full output contract template.
- [Safety checklist](references/safety-checklist.md) - full safety non-negotiables, stress checks, and evidence labeling guidance.
- [Official sources](references/official-sources.md) - AWS documentation links for Bedrock security, guardrails, and prompt injection defense.
