---
id: a11692bd-136e-4024-8bc7-43bdbf426ab8
title: Governing AI agents at runtime - NetBanking Use-Case
asset-owner: anand.awasthi@in.ibm.com
team: Service Engineering
type: Business
domain: BFSI
problem: >-
  Traditional banking controls were designed for human users and deterministic
  applications. They break down when an LLM-driven agent acts on a customer's
  behalf. The Northbridge demo exposes six weaknesses:


  - **W1 Static API key:** one shared key is used for every agent, so there is
  no agent identity.

  - **W2 Trusted tool inputs:** the LLM chooses the customer ID as a tool
  argument.

  - **W3 Identity in the prompt:** a user's identity is just text, so anyone can
  forge it.

  - **W4 Peer trust:** the ops agent obeys any request from another agent.

  - **W5 Prompt rules:** the agent can be talked past its instructions, because
  the model alone decides what is allowed.

  - **W6 Service-account logs:** the audit trail records `svc-wxo-agent`, so
  there is no record of which person acted.


  In the ungoverned run, two attacks succeed:


  - **Identity spoofing:** a customer pastes a forged session context and reads
  another customer's accounts. Money is moved, and the audit log does not name
  the actual person.

  - **Agent overreach:** the ops agent silently raises a daily transfer limit
  from 1,000 to 5,000 with no approver. The following transfer then succeeds,
  and the reply never mentions the limit change.


  Prompt rules and guardrails reduce this risk but cannot enforce it.
  Enforcement has to sit outside the model.
solution: >+
  The solution closes each gap by moving identity, delegation, and policy
  outside the model. The flow has six steps:


  1. **Customer sign-in (IBM Verify):** the user signs in with OIDC and PKCE.
  The netbanking app keeps the token server-side.

  2. **Agent identity (IBM Agent Identity):** each agent has its own identity
  and signs in with a private key (JWT). There is no shared secret.

  3. **Delegated token (token exchange, RFC 8693):** the user token and the
  agent token are exchanged for one on-behalf-of token that carries `sub` (the
  verified user) and `act` (the agent).

  4. **Agent calls a tool (watsonx Orchestrate):** the token travels with every
  tool call and never appears in the prompt.

  5. **Gateway validation (MCP Gateway / DataPower):** the gateway validates the
  token before any tool runs.

  6. **Policy decision (HashiCorp Vault):** Vault checks three independent
  layers on every call. These are subject match (the token's user must equal the
  customer in the request), user policy (admin paths are always denied), and
  agent ceiling (what the agent may do for any user). The effective permission
  is user policy ∩ agent ceiling, so a ceiling can only restrict, never grant.
  Vault then allows or denies the call and writes the audit record.


  Risky actions are also controlled. Transfers of $100 or less run
  automatically. Larger transfers pause for human approval in an HITL portal.
  Session revocation applies when a spoofing attempt is detected, and the audit
  trail records the verdict (for example, `DENIED_MALICIOUS_PROMPT` or
  `DENIED_SESSION_TERMINATED`).


  With the governed solution, both attacks are blocked at the API:


  - **Spoofing:** the API returns 403 because the token user does not match the
  customer. No data is exposed and no money moves.

  - **Overreach:** the API returns 403 because Vault denies the limit change.
  The limit stays at $1,000, and the ops agent is capped at read-only.

business-value: >+
  - **Contain financial loss:** agents cannot move money or change risk limits
  beyond the user's own rights. 2 of 2 tested attack paths were blocked at the
  API.

  - **Prove accountability:** 100% of audited agent actions name a user, an
  agent, and a verdict, replacing the shared `svc-wxo-agent` actor.

  - **Remove credential sprawl:** short-lived, per-user delegated tokens replace
  the single shared static key (0 shared static keys remain).

  - **Scale agents with confidence:** new agents are onboarded like employees,
  with identity, approval, and a least-privilege ceiling, reusing one pattern
  across agents.

  - **Enterprise compliance:** least privilege, non-repudiation, and audit
  evidence are built into every governed tool call.

tech-stack:
  - IBM Bob
  - Vault
  - Verify
  - watsonx Orchestrate
  - AuthMind
  - IBM Agent Identity
architecture_diagram: /docs/diagrams/after.png
demo: https://www.youtube.com/watch?v=JvTH2la6mMs
slide_deck: /docs/slide_decks/Agentic_Identity_Runtime_Governance.pdf
featured: 1
---
This use case demonstrates how Northbridge Bank, a retail bank, governs customer-facing AI agents inside its netbanking application. Customers bank by conversation: they check balances, review activity, send money, add payees, check limits, and ask for operations help. The agents are built on IBM watsonx Orchestrate (an assistant agent and an ops agent) and call banking tools through a FastAPI-based Governed Agent API on OpenShift.

The demo runs the same two attack scenarios twice. The first run is ungoverned, using a shared static API key and a service-account identity. The second run is governed, with IBM Verify sign-in, IBM Agent Identity, a delegated token, an MCP Gateway, and HashiCorp Vault 2.2 Enterprise enforcing runtime policy. Human-in-the-loop (HITL) approval is also shown for above-threshold transfers, and the audit trail records both the user and the agent.  

```
This use-case and demo has been built with IBM Bob
```

