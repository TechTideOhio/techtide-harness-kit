# FinOps Skills

Cross-cloud FinOps skills for public-pricing analysis, AI workload economics,
Kubernetes rightsizing, FOCUS normalization, and carbon-cost pairing.

> Status: all FinOps skills are `lifecycle: experimental`. Use them for
> pre-production research, estimates, and human-reviewed planning. They do not
> accept billing credentials, kubeconfig files, bearer tokens, API keys, tenant
> IDs, or customer data.

## Portfolio

| Skill | Purpose | Lifecycle |
| --- | --- | --- |
| `techtide-finops-maestro` | Route FinOps tasks to the narrowest specialist or parallel team | experimental |
| `techtide-finops-cloud-price-advisor` | Public pricing across major and regional cloud providers | experimental |
| `techtide-fetch-foundation-model-pricing` | Token, image, and GPU-hour pricing across AI providers | experimental |
| `techtide-kubernetes-allocation-report` | OpenCost-compatible namespace, pod, and workload allocation | experimental |
| `techtide-rightsize-recommendation` | Request/limit recommendations from supplied metrics | experimental |
| `techtide-carbon-cost-pair` | Pair cost values with estimated carbon impact by region/service category | experimental |
| `techtide-focus-spec-normalizer` | Normalize vendor bills into FOCUS v1.2 columns | experimental |

## Conservative Defaults

- Fetch public prices from unauthenticated APIs only.
- Distinguish on-demand list price from effective price.
- Prefer live API lookups over cached or memory-based estimates.
- Normalize compute specs before comparing providers.
- Flag GPU and accelerated-compute costs explicitly.
- Label numeric output as `live-price`, `live-evidence`, `documentation-based`, `assumed`, or `excluded`.
- Emit FOCUS v1.2 column mappings where applicable.

## Scope Limits

- Reserved instances, savings plans, committed-use discounts, spot pricing, and negotiated contracts require separate review.
- Estimates are indicative and should not be used as final chargeback, contractual billing dispute evidence, or SLA-level forecasting without human review.
- If a pricing API is unavailable, the skill must return a timestamped documentation-based fallback or ask for a narrower query.
