# Control Mapping

This mapping explains how TechTide Harness Kit trust artifacts support common enterprise agent and software security expectations. It is evidence-supporting guidance, not a compliance attestation.

| Control family | Repo evidence |
| --- | --- |
| OWASP LLM01 Prompt Injection | [PROMPT-INJECTION.md](PROMPT-INJECTION.md), adversarial routing fixtures, skill security notes |
| OWASP LLM02 Sensitive Information Disclosure | [DATA-HANDLING.md](DATA-HANDLING.md), secret scans, catalog validation |
| OWASP LLM03 Supply Chain | package provenance, no lifecycle scripts, asset integrity manifest, external source quarantine |
| OWASP LLM06 Excessive Agency | approval gates, live-guard skills, risk tiers in [catalog/skill-trust.json](catalog/skill-trust.json) |
| OWASP Agentic Skills: malicious or over-privileged skills | source verification, permission metadata, network default deny, human approval gates |
| NIST AI RMF Govern | ownership, vulnerability policy, contribution policy, control mapping |
| NIST AI RMF Map | data classes, intended use, non-goals, provider and harness mapping |
| NIST AI RMF Measure | eval summary, fuzz/property tests, external skill scoring, validation commands |
| NIST AI RMF Manage | residual risk notes, rollback requirements, security disclosure path |
| MITRE ATLAS | prompt injection, tool misuse, credential access, exfiltration, and supply-chain scenarios in test fixtures |
| MCP security | MCP trust matrix, scoped tool guidance, explicit network and credential posture |
| OpenSSF | Scorecard badge, no lifecycle scripts, package provenance, SBOM/release notes |

## Primary References

- OWASP LLM Top 10: https://genai.owasp.org/llm-top-10/
- OWASP Agentic Skills Top 10: https://owasp.org/www-project-agentic-skills-top-10/
- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework
- MITRE ATLAS: https://atlas.mitre.org/
- MCP Security Best Practices: https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices
- OpenSSF Scorecard: https://github.com/ossf/scorecard
