---
id: f610e6a5-145b-414c-8648-ce20e7eae999
title: Java Upgrade
asset-owner: anand.awasthi@in.ibm.com
team: Other
type: Technical
domain: Automation
premium_package: Java Modernization
problem: >+
  Enterprise Java applications often rely on outdated Java baselines (e.g., Java
  8) and legacy frameworks running on traditional application servers. Upgrading
  these codebases manually presents several critical challenges:


  - **High Manual Effort & Time Investment:** Updating build configurations,
  compiler flags, and namespace migrations (e.g., `javax` to `jakarta`) across
  large codebases can take months of repetitive labor.

  - **Complex Transitive Dependency Issues:** Modernizing Java baselines often
  breaks indirect third-party dependencies (e.g., legacy libraries like
  Javassist pulled via Struts 2/OGNL), causing obscure build failures or runtime
  errors.

  - **Rework Risk & Operational Downtime:** Refactoring AST-level code manually
  risks introducing functional regressions, broken builds, or unhandled
  exceptions in production.

  - **Lack of Visibility & Auditability:** Tracking complex modernization steps,
  dependency overrides, and code modifications across teams often leads to poor
  documentation and difficult code reviews.

solution: >+
  IBM Bob streamlines and automates the entire upgrade lifecycle through an
  intelligent agent workflow:


  1. **Baseline & Prerequisite Validation:** Bob initiates an immediate
  background build to establish a clean initial baseline before modifying any
  source code, while verifying required SDK environments (e.g., SDKMan, IBM
  Semeru JDK).

  2. **Automated AST Refactoring:** Utilizes OpenRewrite recipes to
  automatically migrate legacy source files, compiler flags, and POM
  dependencies from legacy `javax` namespaces to modern `jakarta` standards.

  3. **AI-Assisted Root Cause & Dependency Analysis:** Detects build warnings or
  transitive dependency breakages, performs deep dependency tree investigations
  (identifying issues like legacy Javassist versions), and proposes targeted
  overrides in `pom.xml` while keeping the developer in control for approval.

  4. **Automated Verification & Packaging:** Runs full compilation, dependency
  tree checks, and packaging steps to confirm that clean WAR artifacts are
  generated without Java 21 or Jakarta compatibility failures.

  5. **Visual Auditability & Version Control:** Automatically commits verified
  changes to a new Git branch and generates a shareable Mermaid flow diagram for
  pull requests and documentation.

business-value: |+
  - Drastic Reduction in Migration Time:
  - Enhanced Developer Productivity & Focus
  - Reduced Risk & High Quality
  - Improved Auditability & Governance
  - Cost Efficiency & Platform Modernization

tech-stack:
  - IBM Bob
demo: https://ibm.seismic.com/Link/Content/DCCqJh3C2W4jh89MRhJRHGTfRc9j
featured: 34
---
The **IBM Bob Java Modernization Workflow (Java Upgrade Path)** provides an end-to-end, AI-driven automation process for upgrading legacy Java applications (e.g., legacy Java 8 applications using Struts 2 running on IBM WebSphere) to modern Java versions (such as Java 21) and updated runtime specifications like Jakarta EE 10.

The solution establishes a clean build baseline, checks system tooling (e.g., SDKMan), applies automated OpenRewrite AST refactoring recipes to source code and POM dependencies (migrating `javax` to `jakarta`), detects build and transitive dependency incompatibilities (such as outdated Javassist versions), and suggests targeted fixes. It validates the builds, automatically commits changes to dedicated Git branches, and generates an auditable Mermaid diagram documenting the entire migration process