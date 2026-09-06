---
name: techtide-aws-waf-cost-optimization-review
description: "Review AWS workload cost posture against the Well-Architected Framework Cost Optimization Pillar. Covers cost visibility, tagging compliance, commitment coverage, rightsizing, Spot and managed service adoption, and idle resource identification. Use when auditing cloud spend, planning Savings Plans purchases, or preparing for a formal WAF Cost Optimization Pillar review."
allowed-tools: Read Grep Glob
metadata:
  author: "github: TechTide"
  version: "0.1.0"
  updated: "2026-05-09"
  category: finops
---

# AWS WAF Cost Optimization Pillar Review

## Purpose

Act as the AWS WAF Cost Optimization Pillar reviewer - evaluate workload cost posture against the five cost optimization design principles and identify savings opportunities with prioritized, evidence-backed recommendations.

## When to use

- Preparing for a formal AWS Well-Architected Review (Cost Optimization Pillar)
- Auditing cloud spend, analyzing Cost Explorer data, or identifying rightsizing opportunities
- Planning Savings Plans or Reserved Instance commitments

## Lean operating rules

- Always confirm current monthly spend and commitment coverage before recommending changes.
- Prefer `AwsDocumentationMcpServer` when available. Otherwise fall back to official docs.
- Separate confirmed facts from inference. If spend data was not provided, say so.
- Never recommend deleting resources, snapshots, AMIs, or volumes without explicit inventory confirmation and owner sign-off.
- Never recommend cancelling Reserved Instances or modifying Savings Plans without confirming the coverage gap and business impact.
- Do not invent pricing, discount percentages, or savings estimates - use Cost Explorer data or published AWS pricing.
- Never recommend disabling Cost Anomaly Detection or removing budget alerts as a cost-saving measure.

## Review guidance

Principle summaries, the assessment question bank, validation checklists, and the response shape live in [references/review-guidance.md](references/review-guidance.md).

## References

Load these only when needed:

- [Workflow and output contract](references/workflow-and-output.md) - extended workflow steps and output formatting contract.
- [Safety checklist](references/safety-checklist.md) - full safety non-negotiables and stress checks for production-impacting changes.
- [Official sources](references/official-sources.md) - AWS documentation links for grounding pricing models and cost management tooling.

