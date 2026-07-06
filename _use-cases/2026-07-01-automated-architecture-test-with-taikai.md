---
id: 0c3afe7f-b5c3-4c00-acc4-e6192eb4eb9b
title: Automated architecture test with Taikai
asset-owner: Markus.Eisele@ibm.com
team: Other
type: Technical
domain: Automation
problem: >+
  As enterprise applications evolve over years of active development, they
  inevitably suffer from software rot, architectural drift, and structural
  decay:


  - **The "Spaghetti Code" Creep:** Without strict enforcement, developers under
  tight deadlines often introduce illegal package couplings (e.g., allowing a
  user-interface class to bypass the service layer and query a database
  component directly). This breaks modularity and turns microservice-ready
  systems back into tight monoliths.

  - **Invisible Violations during Code Reviews:** Architectural decay is
  notoriously difficult to catch during manual pull request reviews. Senior
  engineers cannot easily visualize how a minor code modification might
  introduce a cyclic dependency or violate established layering rules across an
  entire repository.

  - **Obsolete Technical Documentation:** Traditional architectural diagrams are
  static documents that become obsolete weeks after they are drawn, leaving the
  engineering team with no clear source of truth regarding the system’s actual
  boundaries and constraints.

solution: >+
  The implementation of IBM Bob in this automated architecture use case replaces
  manual oversight with a continuous, closed-loop validation pipeline:


  - **Automated Design Extraction:** IBM Bob acts as a deep repository
  intelligence agent, crawling local source files (e.g., Java packages, modules,
  or domain boundaries) to map out how components actually interact, outputting
  accurate, markdown-based living architecture documentation.

  - **Synthesis of Architecture-as-Code Tests:** Bob goes beyond static
  visualization by automatically writing executable testing frameworks (like
  ArchUnit assertions). It converts high-level architectural rules (e.g., *"The
  Controller layer must never be accessed by the Persistence layer"*) into
  concrete unit tests.

  - **Continuous CI/CD Gatekeeping:** These generated architecture tests are
  checked directly into the codebase. During routine compilations or pull
  request cycles, the testing framework scans the code layout automatically,
  alerting the developer immediately if a structural rule is violated.

business-value: |+
  - Guaranteed Long-Term Maintainability
  - Dramatic Reduction in Architectural Auditing Costs
  - Safeguards Microservices & Cloud Migrations
  - Frictionless Developer Onboarding

tech-stack:
  - IBM Bob
lab: https://github.com/IBM/bob-demo/tree/main/automated-architecture-taikai
---
This use case outlines how an enterprise software development team leverages **IBM Bob** during a software modernization or refactoring project to automatically discover, document, and enforce architectural boundaries within an existing codebase. Rather than manually auditing millions of lines of code, developers use Bob to crawl a complex application directory, analyze package relationships, and automatically generate living design documentation. Crucially, the AI agent translates these discovered patterns into automated **Architecture-as-Code test suites** (such as ArchUnit tests). These tests are integrated directly into the team's build pipeline to act as a continuous linting layer, immediately failing the build if a developer accidentally introduces illegal code dependencies or breaks structural layering.