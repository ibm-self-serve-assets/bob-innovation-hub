---
id: 51fca191-9257-4988-a36c-fec162ae1c1f
title: "Bob for iSeries: Configure Bob for IBM i development with MCP tools and
  custom modes"
asset-owner: Brunda.Reddy@ibm.com
team: Service Engineering
type: Technical
domain: Modernization
problem: >+
  When large enterprise organizations attempt to modernize core legacy
  applications hosted on IBM i platforms, they encounter critical technical
  roadblocks that stall progress:


  - **The "Black Box" Dependency Trap:** Over decades, legacy RPG or COBOL
  applications develop complex, undocumented interdependencies. Standard AI
  generation tools cannot safely analyze these because they lack visibility into
  how a program (`*PGM`) calls a physical file (`*FILE`) or data area inside the
  live operating environment.

  - **Context Isolation & Manual Overhead:** Developers must manually copy
  source code out of green-screen terminals or Rational Developer for i (RDi)
  and paste it into public cloud LLMs. This air-gapped workflow completely
  strips away the system telemetry, object attributes, and compiler feedback
  needed to make accurate modernization decisions.

  - **Brittle API Middleware Bottlenecks:** For an AI to safely understand a
  database layout or verify a physical file structure, engineers traditionally
  have to build and maintain bespoke REST API wrappers or JDBC middleware. This
  creates substantial engineering overhead and expands the enterprise attack
  surface.

solution: >+
  The implementation of IBM Bob in MCP Mode provides an interactive,
  live-grounded solution that transforms how engineers interact with legacy
  systems:


  - **Real-Time Environment Grounding:** The Model Context Protocol provides a
  uniform, secure bridge. When IBM Bob needs to understand an undocumented data
  structure, it asks its local MCP client to query the live IBM i catalog for
  that exact table layout dynamically.

  - **Contextual Discovery Tools:** The AI agent uses custom-configured MCP
  tools to inspect real-world system telemetry on demand. If a legacy program
  references an external system queue or a logical file, the AI queries the live
  environment to extract the underlying metadata automatically.

  - **Closed-Loop Code Verification:** Rather than guessing if a translated
  piece of code will compile or integrate cleanly with existing modern
  microservices, the AI leverages the MCP pipeline to validate dependencies
  against live schemas, iteratively self-correcting its outputs based on
  authentic environmental realities.

business-value: |+
  - Reduction in Discovery & Analysis Time
  - Drastic Drop in AI Hallucinations
  - Enterprise-Grade Access Control
  - Accelerated Time-to-Market for Digital Innovation

tech-stack:
  - IBM Bob
lab: https://github.com/bmarolleau/IBM-i-Application-Modernization-with-Bob/blob/main/lab4-ibmi-mcp-mode.md
---
This use case outlines how an enterprise software engineering team utilizes **IBM Bob** configured in **MCP (Model Context Protocol) Mode** to automate the reverse-engineering, analysis, and architectural modernization of legacy monolithic IBM i applications (such as COBOL or RPGLE programs). By deploying a dedicated MCP server acting as a secure real-time gateway, an autonomous AI agent is given safe, read-only operational context directly into the live IBM i partition. Instead of working on disconnected code snippets, the AI operates as an intelligent co-developer that can actively cross-reference active source files, system object descriptions (`*PGM`, `*FILE`), live Db2 schema catalogs, and program error logs to orchestrate a systematic step-by-step application transformation.

