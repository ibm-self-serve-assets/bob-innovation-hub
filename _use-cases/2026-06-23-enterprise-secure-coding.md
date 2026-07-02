---
id: ccbbcbbc-9065-4d74-a6fd-4a112adc2ec5
title: Enterprise Secure Coding
asset-owner: anand.awasthi@in.ibm.com
team: Service Engineering
type: Technical
domain: Security
problem: >+
  Modern enterprises are rapidly adopting generative AI coding assistants to
  accelerate software delivery. However, this creates severe security and
  governance challenges:


  - **Secret Sprawl:** Developers frequently and accidentally commit hardcoded
  credentials, API keys, and configuration secrets into source code
  repositories, leading to severe exposure risks.

  - **Ungoverned AI Actions:** AI agents often operate with broad, unchecked
  access to systemic capabilities. If an AI assistant has unrestricted tool
  access, it could execute destructive or unauthorized actions (such as dropping
  a database or deleting an entire secret storage mount) due to hallucinations
  or prompt injection attacks.

  - **Lack of Auditability:** Traditional local AI tool execution lacks
  centralized tracking, making it impossible for security teams to log, audit,
  and verify compliance for changes suggested or enacted by AI agents.

solution: >+
  The solution introduces a layered, secure-by-design architecture that
  seamlessly blends automated remediation with centralized enterprise
  governance:


  1. **AI-Driven Remediation (IBM Bob):** Operating in a dedicated *Secure
  Coding* mode, IBM Bob scans codebases for hardcoded configuration strings or
  connection secrets. It proposes secure refactoring patterns and rewrites the
  codebase to dynamically pull credentials at runtime.

  2. **Centralized Tool Governance (IBM MCP Gateway):** The MCP Gateway acts as
  a proxy firewall between the AI agent and backend enterprise tools. It creates
  a "Virtual MCP Server" that exposes only safe, explicitly allowed
  functionalities (e.g., `Read Secrets`, `Write Secrets`, `Create Mount`) while
  completely denying destructive capabilities (e.g., `Delete Mount`).

  3. **Dynamic Secret Management (HashiCorp Vault & Vault MCP Server):** Secrets
  are migrated directly out of code repositories and stored securely inside
  HashiCorp Vault. The application is rewired to consume these secrets natively
  at runtime, removing human or agent visibility over raw, static credentials.

business-value: |+
  - Mitigated Security and Compliance Risks
  - Controlled and Safe AI Adoption
  - Centralized Visibility and Compliance
  - Accelerated Developer Productivity

tech-stack:
  - IBM Bob
  - Vault
architecture_diagram: /docs/diagrams/architecture.png
demo: https://www.youtube.com/watch?v=unBYDNKAPyw
lab: https://github.com/ibm-self-serve-assets/bob-secure-coding-lab
slide_deck: /docs/slide_decks/Enterprise Secure Coding.pdf
featured: 5
---
This use case outlines an automated, "secure-by-design" development workflow that integrates AI-driven coding assistants into enterprise software development without compromising security. It demonstrates how an enterprise can orchestrate **IBM Bob** (an AI coding assistant running in a specialized "Secure Coding" custom mode) to automatically scan repositories, detect vulnerabilities such as hardcoded secrets, and safely remediate them. This entire operational lifecycle is governed by an **IBM Model Context Protocol (MCP) Gateway** to intercept and authorize tool actions, while utilizing **HashiCorp Vault** to store and provision just-in-time, least-privilege credentials.