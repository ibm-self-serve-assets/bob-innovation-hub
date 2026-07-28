---
id: 3ab7176f-d2dd-4797-95b0-f56746fea9e3
title: Liberty Replatforming
asset-owner: anand.awasthi@in.ibm.com
team: Other
type: Technical
domain: Automation
premium_package: Java Modernization
problem: >+
  Thousands of enterprise Java applications remain trapped on outdated stacks —
  Java 8, WebSphere Traditional, Struts 2 — not because modernization is
  impossible, but because it is **slow, risky, and expensive** when done
  manually. Teams face:


  - **Lack of visibility** into every deprecated API, transitive dependency
  conflict, and Liberty incompatibility buried inside a large WAR or EAR.

  - **Manual, error-prone migration work** — updating build toolchains,
  generating Liberty configuration (`server.xml`), resolving security-manager
  API removals, and upgrading transitive library versions — that can take days
  or weeks per application.

  - **No safety net** during the process: teams are unsure whether the
  application actually runs on the new runtime until late in the cycle, when
  rollback is costly.

  - **No traceability**: ad-hoc manual changes leave no auditable record of what
  changed, when, and why, which is a blocker for enterprise governance and
  regulated industries.

solution: >+
  Bob's **Liberty Replatforming workflow** within the Java Modernization Premium
  Package solves this systematically:


  1. **Baseline Analysis** — Bob scans the project, identifies the Maven build
  toolchain, runs a clean build, and establishes a stable baseline before any
  changes are made.

  2. **AMA Integration** — The developer provides the AMA migration zip (deep
  binary scan output). Bob ingests it, unpacks 15 flagged rules with 166
  individual findings, and immediately generates two foundational artifacts: a
  `server.xml` (Liberty server configuration) and a `Containerfile` (multi-stage
  production container build using IBM Semeru JDK 21 and the official WebSphere
  Liberty image).

  3. **Automated Code Transformation** — Bob applies **47 OpenRewrite recipes**
  automatically: the Java compiler target is upgraded from Java 8 to Java 21,
  the Liberty Maven plugin is wired into the build, and all Liberty
  configuration files are correctly populated with required features
  (`servlet-3.1`, `jsp-2.3`, `jdbc-4.1`).

  4. **AI-Driven Critical Issue Resolution** — For issues that cannot be solved
  by deterministic recipes, Bob spawns dedicated subtasks:
    - A **charset-safety fix**: upgrades `javassist` from `3.20.0-GA → 3.29.2-GA` to resolve unsafe constructors on Java 17+.
    - A **SecurityManager compatibility fix**: overrides `ognl` to `3.4.11` via `<dependencyManagement>` to eliminate `UnsupportedOperationException` on Java 18+.
    - Both changes require **explicit developer approval** before being applied — Bob proposes, the human approves.
  5. **Live Deployment Validation** — Bob builds the WAR, creates and starts a
  Liberty server locally, reads the application logs, and confirms the
  application is live (`simple-pharmacy.war started in 1.560 seconds`). HTTP
  endpoints are validated — the dashboard returns HTTP 200 and all pharmacy
  routes respond correctly.

  6. **Git Flow & Audit Trail** — With Git Flow enabled, every meaningful change
  is committed to an isolated branch with descriptive messages, producing a
  complete, reviewable audit trail before anything reaches `main`.

  7. **Modernization Summary** — The workflow closes with a full structured
  summary: 166 findings analyzed, 47 recipes applied, 2 critical issues
  resolved, live deployment confirmed, 3 clean Git commits produced.

business-value: >+
  - Compresses days or weeks of manual migration effort into a single guided
  workflow session.

  - Every code change requires explicit developer approval — Bob proposes, the
  human decides.

  - Auto-generated Git commits on an isolated branch provide a precise,
  auditable record of every change.

  - Covers the full migration lifecycle — analysis, code transformation,
  configuration, and live deployment — in one workflow.

  - Bob explains its reasoning at every step, so developers always know what
  changed and why.

  - Delivers a containerized, Liberty-based application that is cloud and
  OpenShift ready from day one.

tech-stack:
  - IBM Bob
demo: https://ibm.seismic.com/Link/Content/DCfcbdM9pqXgBGWFJ6g6JBbTQd2B
featured: 34
---
IBM Bob's Java Modernization Premium Package demonstrates end-to-end automated replatforming of a legacy enterprise Java application — a Pharmacy Dashboard built on **Java 8, Struts 2 MVC, and IBM WebSphere Application Server Traditional** — to a modern, cloud-native stack running on **Java 21 and IBM WebSphere Liberty**, complete with a production-ready container image. The workflow is driven by the **Bob Unified Agent Harness** inside the IDE, augmented by output from the **Application Modernization Accelerator (AMA)**, and covers the full lifecycle: project analysis, automated code transformation via OpenRewrite recipes, AI-driven resolution of critical dependency violations, live local deployment validation, and a clean Git audit trail — all without a developer changing a single line of business logic.