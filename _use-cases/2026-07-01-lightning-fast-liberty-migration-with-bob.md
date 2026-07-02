---
id: 93dee358-cd7a-4f9b-add0-a8d03765ca20
title: Lightning-Fast Liberty Migration with Bob
asset-owner: anand.awasthi@in.ibm.com
team: Other
type: Technical
domain: Modernization
problem: >+
  Legacy enterprise Java applications often rely on outdated runtime frameworks
  (such as legacy WebSphere Application Server versions) and obsolete libraries.
  Manually upgrading these systems creates severe operational roadblocks:


  - **High Complexity and Friction:** Identifying broken dependencies, resolving
  framework mismatches, and adapting APIs to modern runtimes requires deep
  domain expertise.

  - **Error-Prone Manual Remediation:** Diagnosing intricate compilation errors,
  data encoding flaws, and syntax regressions following initial recipes consumes
  substantial developer hours.

  - **Lack of Scalability:** Manually modernizing large portfolios of enterprise
  monolithic applications blocks strategic cloud-native migration and delays
  modernization cycles.

solution: >+
  The system provides an automated, AI-augmented workflow integrated into the
  developer environment to streamline replatforming:


  - **Analysis and Execution Strategy:** Bob automatically verifies local
  development tools (such as Java workspaces and SDKMAN) and consumes an
  Application Modernization Accelerator (AMA) deployment plan to align target
  configuration requirements.

  - **Automated Upgrade Recipes:** The solution executes targeted OpenRewrite
  recipes to automatically transform modern Java configurations and initialize
  runtime structures for Liberty compatibility.

  - **Intelligent Error Remediation:** Upon encountering compile-time errors
  (e.g., missing multi-subtasks or encoding issues), Bob dynamically scans the
  local codebase, isolates structural flaws, modifies broken classes, and
  injects correct configurations (like fixing the `env-config` jar or adapting
  standard WebSphere runtime APIs).

  - **Continuous Integration Feedback Loop:** After rewriting problematic files,
  the platform re-triggers the project compiler build directly within the
  terminal interface to guarantee clean compilation status and architectural
  integrity.

business-value: |+
  - Accelerated Time-to-Market
  - Reduced Human Labor and Cost
  - Architectural Consistency

tech-stack:
  - IBM Bob
  - JSphere Suite for Java
demo: https://www.youtube.com/watch?v=7tEBpSLgyEA
---
This use case showcases the automation of legacy Java application modernization using an AI-powered assistant named **Bob**. The scenario walks through replatforming a standard enterprise Java application (e.g., a `ModResorts` application) into an **IBM Liberty** environment. By leveraging a structured walkthrough alongside interactive AI capabilities inside an IDE workspace, Bob conducts structural prerequisites validation, parses migration reports (such as from the Application Modernization Accelerator - AMA), executes code-transforming OpenRewrite recipes, diagnoses compilation errors, and resolves nested API dependencies.