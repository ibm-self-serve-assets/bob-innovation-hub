---
id: 6d531015-1967-4ced-9b18-1cb987f0b984
title: Building AI Agents with watsonx Orchestrate and IBM Bob
asset-owner: jukka.juselius@fi.ibm.com
team: Other
type: Technical
domain: Automation
problem: >+
  Organizations want to advance from static, prompt-based generative AI chatbots
  to autonomous **Agentic AI systems** capable of multi-step reasoning, tool
  usage, and systemic action. However, building enterprise-ready agents presents
  steep technical hurdles:


  - **Brittle Integration:** Seamlessly connecting agents to custom enterprise
  databases, tools, and legacy backend systems without complex, hard-coded
  integrations.

  - **Lack of Determinism & Guardrails:** Ensuring LLM-driven agents
  consistently follow enterprise business rules, operate safely within
  behavioral limits, and resist prompt injection attacks.

  - **Evaluation & Trust Gap:** The difficulty of systematically testing,
  evaluating, and "red-teaming" non-deterministic agent outputs before pushing
  them to production.

  - **Complexity in Orchestration:** Managing coordination, data routing, and
  state sharing across *multiple* highly specialized agents working toward a
  common business workflow.

solution: >+
  The workshop addresses these challenges by walking developers through a highly
  structured, module-by-module architecture built on IBM Bob and watsonx:


  - **Custom Tooling & MCP Integration:** Training agents to interface with real
  backend services and product databases natively using the open Model Context
  Protocol (MCP).

  - **AI Gateways & Model Selection:** Dynamically routing tasks across
  different foundation models based on cost, capability, or latency
  requirements.

  - **Guidelines, Guardrails, & Custom Rules:** Implementing rigid system
  constraints using Bob IDE's custom rules and system guidelines to ensure
  behavioral predictability.

  - **Deterministic Workflows & Multi-Agent Orchestration:** Moving beyond pure
  autonomous chaos into structured, multi-agent cooperative workflows that
  combine rule-based execution with fluid LLM reasoning.

  - **Automated Evaluation & Testing:** Using automated "red-teaming" techniques
  to pressure-test safety, robustness, and performance metrics before final
  ecosystem deployment.

business-value: |+
  - Accelerated Time-to-Market
  - Enhanced Enterprise Security & Compliance
  - Optimized Operational ROI
  - Scalable Business Automation

tech-stack:
  - watsonx Orchestrate
  - IBM Bob
lab: https://juseljuk.github.io/bobchestrate-workshop/
---
The **Bobchestrate Workshop** is an intensive, end-to-end practical course designed to teach developers how to build, test, secure, and scale enterprise-grade Agentic AI solutions. Utilizing **IBM Bob** (the orchestration IDE/agent framework) alongside **watsonx Orchestrate**, the workshop guides participants from basic "Hello World" agent creation to complex multi-agent architectures. Key areas covered include Model Context Protocol (MCP) servers for backend connectivity, model routing via AI Gateways, guardrails, automated evaluation, red-teaming, and deployment.