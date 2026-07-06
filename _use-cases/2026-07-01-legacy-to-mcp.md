---
id: baf84fc3-4b9a-4563-83da-b27e8494bd05
title: Legacy to MCP
asset-owner: Markus.Eisele@ibm.com
team: Other
type: Technical
domain: Automation
problem: >+
  Enterprise organizations possess highly valuable business logic and data
  locked within legacy, monolithic, or on-premises software. Bringing these
  systems into the era of Generative AI poses significant hurdles:


  - **Invasive Technical Debt:** Modifying decades-old, brittle codebases to
  support modern communication protocols risks service disruption and requires
  intensive regression testing.

  - **Lack of Integration Standards:** Legacy apps rarely expose endpoints in a
  manner that Large Language Models (LLMs) can naturally discover, understand,
  or interact with safely.

  - **Resource and Skill Scarcity:** Rewriting entire systems to be "AI-ready"
  is cost-prohibitive and technically unfeasible given the dwindling pool of
  developers with deep legacy domain expertise.

  - **Context Windows & Over-exposure:** Exposing an entire heavy system
  architecture to an AI agent wastes token context, costs excessively, and poses
  massive data governance and security risks.

solution: >+
  The solution uses **IBM Bob** to auto-generate a secure, non-invasive
  translation bridge using the open-source Model Context Protocol (MCP). The
  workflow executes as follows:


  1. **Specification Parsing:** IBM Bob analyzes the legacy application’s
  contract (e.g., parsing an OpenAPI/Swagger JSON schema for an endpoint like
  `/pets`).

  2. **Granular Filtering:** The developer directs Bob to isolate only specific
  low-risk operations (such as read-only queries), excluding state-changing
  operations.

  3. **Automated MCP Server Generation:** Bob auto-scaffolds a wrapper service
  (e.g., using a Quarkus REST client or FastMCP) that translates those local
  endpoints into strict, documented `@Tool` definitions.

  4. **Sidecar Containerization:** Bob compiles the necessary configuration
  files and generates a Kubernetes deployment manifest. This configures the
  newly minted MCP server to deploy as a **sidecar container** inside the same
  pod as the legacy application.

  5. **Agentic Consumption:** The local MCP server talks directly to the legacy
  app over `localhost` while securely presenting standardized, bite-sized tools
  to IBM Bob’s orchestration layer—or any connected LLM—completely bypassing the
  need to touch the legacy codebase.

business-value: |+
  - Zero-Touch Modernization
  - Enhanced Safety & Governance
  - Drastic Cost & Token Optimization
  - Developer Productivity

tech-stack:
  - IBM Bob
lab: https://github.com/IBM/bob-demo/tree/main/legacy-to-mcp
---
The **Legacy-to-MCP** use case demonstrates how to extend the utility of legacy or monolithic enterprise applications (such as a Spring Boot Java app or a local on-premises service) by converting their core functional boundaries into Model Context Protocol (MCP) tools using **IBM Bob**.

Rather than re-architecting the entire application or touching its underlying codebase, IBM Bob reads existing application metadata (such as an OpenAPI specification) and automatically scaffolds a localized, lightweight integration layer (typically using Quarkus or Python). This layer exposes specific, read-only REST endpoints as standard `@Tool` definitions. The resulting MCP server is then packaged into a containerized sidecar pattern, deploying alongside the legacy application within the same environment (like a Kubernetes pod) to effortlessly integrate old systems into modern AI agentic workflows.