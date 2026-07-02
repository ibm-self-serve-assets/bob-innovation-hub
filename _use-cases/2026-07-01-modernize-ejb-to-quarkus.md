---
id: 386682ab-72f9-4f04-bbcb-6deb1cefe517
title: Modernize EJB to Quarkus
asset-owner: anand.awasthi@in.ibm.com
team: Other
type: Technical
domain: Modernization
problem: >+
  Enterprises are burdened by aging monolithic Java applications running on
  heavy, legacy application servers. These applications rely heavily on
  Enterprise JavaBeans (EJBs) for transactional logic and state management.
  Maintaining this footprint introduces several operational and technical
  friction points:


  - **High Infrastructure Costs & Resource Footprint:** Legacy EJB containers
  have slow startup times and high memory consumption, making them costly and
  inefficient to run in modern containerized, serverless, or cloud environments.

  - **Knowledge Rot & Staff Turnover:** Original application architects have
  often moved on, leaving current development teams hesitant to touch or
  refactor complex EJB configurations due to regression risks.

  - **Slow Developer Velocity:** The absence of modern local-development
  workflows (like live-coding or instantaneous testing) means modifying legacy
  EJB architectures results in lengthy build-deploy-test cycles.

  - **Manual Migration Friction:** Manual migration from EJBs to cloud-native
  frameworks is notoriously tedious, error-prone, and cost-prohibitive when
  scaled across a massive application estate.

solution: >+
  The solution uses **IBM Bob** as an AI co-pilot and agentic engineering tool
  to automate the complex refactoring of legacy EJBs into modern Quarkus
  constructs:


  1. **Application Analysis & Planning:** IBM Bob analyzes the enterprise
  codebase to identify stateless and stateful EJBs, configurations, and
  third-party dependencies.

  2. **Rule-Based & Agentic Code Rewriting:** * **Stateless Beans:**
  Automatically refactored into standard CDI beans exposed via JAX-RS/RESTful
  endpoints.
    - **Stateful Beans:** Converted into decoupled architectures where internal state management is migrated to modern cloud-native storage solutions (e.g., mapping session state to an external Redis cache).
  3. **Iterative Verification & Self-Healing:** Bob operates within a
  closed-loop shell execution environment. It automatically attempts to compile
  the new Quarkus application, catches compilation or runtime failures, modifies
  code logic intelligently to resolve errors, and generates updated unit tests
  to validate the modernized workload.

  4. **Automated Documentation:** After successfully upgrading the application,
  Bob automatically updates documentation (e.g., README files and Mermaid
  architectural diagrams) explaining the precise design changes and engineering
  decisions implemented.

business-value: |+
  - Drastic Infrastructure Savings
  - Accelerated Time-to-Market
  - Mitigated Migration Risk
  - Improved Developer Experience

tech-stack:
  - IBM Bob
lab: https://github.com/IBM/bob-demo/tree/main/modernize-ejb-to-quarkus
---
This use case showcases an automated, AI-driven migration of a legacy Enterprise Java (Jakarta EE/Java EE) application utilizing Enterprise JavaBeans (EJBs)—specifically stateless and stateful session beans—into a lightweight, cloud-native **Quarkus** application. Leveraging **IBM Bob** (an AI partner for the Software Development Lifecycle) combined with deterministic migration rules, the demo walks through scanning legacy enterprise source code, refactoring the EJB container dependencies, mapping the business logic to contemporary standards (such as CDI, RESTful APIs, and externalized state mechanisms like Redis), and automatically rewriting the application while maintaining absolute functional parity.