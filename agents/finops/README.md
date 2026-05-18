# FinOps Agents

Cross-cloud FinOps agent catalog for public-pricing analysis, AI workload
economics, Kubernetes rightsizing, and safe routing.

> Status: all FinOps agents are `lifecycle: experimental`. Use them for
> pre-production analysis and human-reviewed estimates. They do not accept
> billing credentials, kubeconfig files, bearer tokens, API keys, tenant IDs, or
> customer data.

## Agent Tiers

| Tier | Purpose | Default access | Live cost mutation |
| --- | --- | --- | --- |
| Orchestrator | Routes FinOps tasks to the narrowest specialist or parallel team | read-only | never auto-dispatches mutating agents |
| Advisory agents | Fetch public prices, estimate costs, rightsize workloads, normalize bills | read-only | not allowed by default |

## Agents

| Agent | Primary use | Providers covered | Lifecycle |
| --- | --- | --- | --- |
| `techtide-finops-maestro-agent` | Route FinOps tasks to the narrowest specialist or parallel team, max 4 | multi-cloud | experimental |
| `techtide-finops-ai-economist-agent` | AI workload economics: token economics, GPU-hour, training-vs-inference TCO | Anthropic, OpenAI, Bedrock, Azure OpenAI, Vertex, OCI Generative AI | experimental |
| `techtide-finops-kubernetes-rightsizer-agent` | Pod request/limit rightsizing from supplied metrics; never executes `kubectl` | Kubernetes | experimental |
| `techtide-finops-cloud-price-advisor-agent` | Fetch public on-demand prices and compare AWS, Azure, OCI, and regional providers | multi-cloud | experimental |

## Operating Notes

- Public unauthenticated pricing APIs only.
- No billing credentials, tenant data, kubeconfig files, or API keys are accepted.
- Prices are on-demand list prices unless an output explicitly says otherwise.
- Reserved instances, savings plans, committed-use discounts, and negotiated contracts require separate human review.
- Every numeric value should be labeled as `live-price`, `live-evidence`, `documentation-based`, `assumed`, or `excluded`.
- Mutation requests must stop at a handoff packet with human approval requirements.

## Routing

The maestro routes across three domains:

| Domain | Example triggers | Agent |
| --- | --- | --- |
| AI economics | tokens, inference, model, LLM, GPU, prompt cache | `techtide-finops-ai-economist-agent` |
| Kubernetes rightsizing | pod, node pool, request, limit, p95, Karpenter, OpenCost | `techtide-finops-kubernetes-rightsizer-agent` |
| Cloud price advisory | AWS pricing, Azure pricing, OCI pricing, regional cloud pricing, egress | `techtide-finops-cloud-price-advisor-agent` |

Hard ceiling: four specialists per routed task. Split broader work into multiple
queries.
