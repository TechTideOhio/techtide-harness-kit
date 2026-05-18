#!/usr/bin/env python3
"""Validate AWS skill trigger descriptions and version/manifest alignment."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AWS_DIR = ROOT / "skills" / "aws"
CATALOG = ROOT / "catalog" / "skills.json"
MANIFEST = ROOT / "catalog" / "skill-manifest.json"

EXPECTED_KEYWORDS: dict[str, list[str]] = {
    "techtide-aws-agentcore": ["agentcore", "runtime", "memory", "gateway", "observability", "code interpreter"],
    "techtide-aws-api-edge-delivery-review": ["api gateway", "cloudfront", "waf", "throttling", "origin", "public"],
    "techtide-aws-bedrock-agent-security-governor": ["bedrock", "agent", "guardrails", "prompt", "knowledge", "action"],
    "techtide-aws-ci-cd-release-engineer": ["pipeline", "release", "codedeploy", "rollback", "deployment", "artifact"],
    "techtide-aws-compliance-evidence-mapper": ["compliance", "evidence", "audit", "config", "audit manager", "artifact"],
    "techtide-aws-cost-optimization-governor": ["cost", "budgets", "cost explorer", "optimization", "savings", "rightsizing"],
    "techtide-aws-cost-anomaly-watch-coordinator": ["cost anomaly", "budgets", "cost explorer", "spike", "finops", "escalation"],
    "techtide-aws-daily-operations-briefing-coordinator": ["cloudwatch", "health", "trusted advisor", "cost", "briefing", "backlog"],
    "techtide-aws-change-impact-advisor": ["change set", "blast radius", "rollback", "dependency", "go/no-go", "approval"],
    "techtide-aws-non-destructive-task-automation-advisor": ["eventbridge", "step functions", "automation", "notifications", "approvals", "read-only"],
    "techtide-aws-ticket-triage-escalation-coordinator": ["ticket", "triage", "escalation", "priority", "owner", "opscenter"],
    "techtide-aws-data-protection-backup-steward": ["backup", "restore", "vault", "retention", "cross-account", "recovery"],
    "techtide-aws-deployment-hotfix-operator": ["deployment", "hotfix", "manifest", "rollback", "config", "release"],
    "techtide-aws-ecs-service-remediation-operator": ["ecs", "fargate", "task definition", "service", "deployment", "health check"],
    "techtide-aws-iac-patch-executor": ["cloudformation", "sam", "cdk", "terraform", "change set", "patch"],
    "techtide-aws-pipeline-fix-operator": ["pipeline", "buildspec", "workflow", "artifact", "release", "codedeploy"],
    "techtide-aws-serverless-rollout-corrector": ["lambda", "serverless", "alias", "version", "event source", "rollout"],
    "techtide-aws-devops-agent-skill-designer": ["devops agent", "skill", "learned", "tool-use", "frontmatter", "agent type"],
    "techtide-aws-dynamodb-data-modeling-performance-review": ["dynamodb", "partition", "gsi", "query", "scan", "hot"],
    "techtide-aws-ec2-compute-operations-steward": ["ec2", "auto scaling", "launch template", "systems manager", "patch", "instance"],
    "techtide-aws-ecs-fargate-platform-operator": ["ecs", "fargate", "task", "execution role", "circuit breaker", "service"],
    "techtide-aws-eks-platform-operator": ["eks", "kubernetes", "irsa", "node", "karpenter", "cluster"],
    "techtide-aws-event-driven-architecture-review": ["eventbridge", "sqs", "sns", "step functions", "dlq", "idempotency"],
    "techtide-aws-generative-ai-developer": ["bedrock", "generative ai", "serverless", "lambda", "step functions", "guardrails"],
    "techtide-aws-iac-change-safety-review": ["cdk", "cloudformation", "terraform", "change set", "drift", "replacement"],
    "techtide-aws-iam-least-privilege-review": ["iam", "trust", "permission", "scp", "pass-role", "access analyzer"],
    "techtide-aws-kms-secrets-lifecycle-steward": ["kms", "secrets manager", "rotation", "grants", "key", "secret"],
    "techtide-aws-landing-zone-governor": ["landing", "control tower", "organizations", "ou", "guardrails", "account"],
    "techtide-aws-live-deployment-guarded-operator": ["account", "region", "profile", "approval", "dry-run", "rollback"],
    "techtide-aws-live-ecs-rollout-guard": ["ecs service", "task definition", "deployment circuit breaker", "alarms", "rollback", "health check"],
    "techtide-aws-live-iac-change-guard": ["change set", "drift", "stack policy", "rollback trigger", "approval", "execute"],
    "techtide-aws-live-pipeline-approval-operator": ["pipeline", "stage", "approver", "sns", "approval", "rollback"],
    "techtide-aws-live-serverless-release-guard": ["lambda alias", "codedeploy", "canary", "linear", "alarms", "rollback"],
    "techtide-aws-migration-cutover-architect": ["migration", "cutover", "wave", "application migration", "rollback", "downtime"],
    "techtide-aws-network-architect": ["vpc", "transit gateway", "direct connect", "vpn", "route 53", "hybrid"],
    "techtide-aws-observability-incident-responder": ["incident", "cloudwatch", "logs", "alarms", "root-cause", "runbooks"],
    "techtide-aws-rds-aurora-performance-investigator": ["rds", "aurora", "performance insights", "latency", "slow queries", "replica"],
    "techtide-aws-resilience-bcdr-review": ["resilience", "rto", "rpo", "failover", "multi-region", "game"],
    "techtide-aws-s3-data-perimeter-governor": ["s3", "block public access", "object ownership", "bucket", "access point", "data perimeter"],
    "techtide-aws-security-posture-hardening": ["security hub", "guardduty", "inspector", "macie", "config", "cloudtrail"],
    "techtide-aws-serverless-production-readiness": ["lambda", "serverless", "concurrency", "dlq", "event sources", "rollback"],
    "techtide-aws-solution-architect": ["solution", "architecture", "cross-domain", "decision", "multi", "narrower"],
    "techtide-aws-maestro": ["route", "specialist", "catalog", "dispatch", "live-guard", "blast-radius", "rollback"],
    "techtide-aws-private-ca-issuer-review": ["certificate authority", "acm", "cert-manager", "irsa", "certificate template", "crl"],
    "techtide-aws-waf-security-review": ["well-architected", "security pillar", "identity", "detective", "infrastructure protection", "incident response"],
    "techtide-aws-waf-reliability-review": ["well-architected", "reliability pillar", "service quotas", "disaster recovery", "backup", "failure isolation"],
    "techtide-aws-waf-cost-optimization-review": ["well-architected", "cost optimization", "savings plans", "tagging", "rightsizing", "idle resource"],
}

DISAMBIGUATION_REQUIRED = {
    "techtide-aws-solution-architect",
    "techtide-aws-network-architect",
    "techtide-aws-serverless-production-readiness",
    "techtide-aws-event-driven-architecture-review",
    "techtide-aws-security-posture-hardening",
    "techtide-aws-compliance-evidence-mapper",
    "techtide-aws-data-protection-backup-steward",
    "techtide-aws-resilience-bcdr-review",
    "techtide-aws-eks-platform-operator",
    "techtide-aws-generative-ai-developer",
    "techtide-aws-ecs-fargate-platform-operator",
    "techtide-aws-iam-least-privilege-review",
    "techtide-aws-kms-secrets-lifecycle-steward",
    "techtide-aws-s3-data-perimeter-governor",
    "techtide-aws-observability-incident-responder",
    "techtide-aws-rds-aurora-performance-investigator",
}


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def frontmatter(skill_md: Path) -> str:
    text = skill_md.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        raise AssertionError(f"{skill_md}: missing opening frontmatter fence")
    parts = text.split("---", 2)
    if len(parts) < 3:
        raise AssertionError(f"{skill_md}: missing closing frontmatter fence")
    return parts[1]


def scalar(fm: str, key: str) -> str:
    match = re.search(rf"^{re.escape(key)}:\s*(.*)$", fm, re.MULTILINE)
    if not match:
        raise AssertionError(f"frontmatter missing {key}")
    return match.group(1).strip().strip('"').strip("'")


def nested_metadata_value(fm: str, key: str) -> str:
    if not re.search(r"^metadata:\s*$", fm, re.MULTILINE):
        raise AssertionError("frontmatter missing metadata block")
    match = re.search(rf"^  {re.escape(key)}:\s*(.*)$", fm, re.MULTILINE)
    if not match:
        raise AssertionError(f"frontmatter metadata missing {key}")
    return match.group(1).strip().strip('"').strip("'")


def contains_keyword(description: str, keyword: str) -> bool:
    return keyword.lower() in description.lower()


def main() -> int:
    errors: list[str] = []
    catalog = {item["id"]: item for item in load_json(CATALOG) if item.get("provider") == "aws"}
    manifest = {item["id"]: item for item in load_json(MANIFEST)["entries"]}
    skill_dirs = {path.name: path for path in AWS_DIR.iterdir() if path.is_dir()}

    expected_ids = set(EXPECTED_KEYWORDS)
    if set(catalog) != set(skill_dirs):
        errors.append(f"catalog/aws dir mismatch: catalog-only={sorted(set(catalog)-set(skill_dirs))}, dir-only={sorted(set(skill_dirs)-set(catalog))}")
    if set(catalog) != expected_ids:
        errors.append(f"unexpected AWS skill set: missing={sorted(expected_ids-set(catalog))}, extra={sorted(set(catalog)-expected_ids)}")

    for skill_id in sorted(skill_dirs):
        skill_dir = skill_dirs[skill_id]
        try:
            fm = frontmatter(skill_dir / "SKILL.md")
            desc = scalar(fm, "description")
            fm_version = nested_metadata_value(fm, "version")
            fm_author = nested_metadata_value(fm, "author")
            if re.search(r"^author:\s*", fm, re.MULTILINE) or re.search(r"^version:\s*", fm, re.MULTILINE):
                raise AssertionError("top-level author/version keys are forbidden; use metadata.author/version")
            if fm_author != "github: TechTide":
                raise AssertionError(f"unexpected metadata.author {fm_author!r}")
            metadata = load_json(skill_dir / "metadata.json")
            if metadata.get("version") != fm_version:
                raise AssertionError(f"SKILL.md version {fm_version} != metadata.json version {metadata.get('version')}")
            if catalog[skill_id].get("version") != metadata.get("version"):
                raise AssertionError(f"catalog version {catalog[skill_id].get('version')} != metadata version {metadata.get('version')}")
            if catalog[skill_id].get("path") != metadata.get("path"):
                raise AssertionError("catalog path != metadata path")
            if skill_id not in manifest:
                raise AssertionError("skill missing from skill-manifest.json")
            missing_keywords = [kw for kw in EXPECTED_KEYWORDS[skill_id] if not contains_keyword(desc, kw)]
            if missing_keywords:
                raise AssertionError(f"description missing trigger keywords {missing_keywords}")
            if skill_id in DISAMBIGUATION_REQUIRED:
                lowered = desc.lower()
                if not any(term in lowered for term in ("prefer", "use only", "not ", "unless")):
                    raise AssertionError("description lacks disambiguation term for high-collision skill")
        except Exception as exc:  # noqa: BLE001 - collect all grader failures
            errors.append(f"{skill_id}: {exc}")

    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1
    print(f"OK: validated {len(skill_dirs)} AWS skill trigger descriptions, versions, and manifest entries")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
