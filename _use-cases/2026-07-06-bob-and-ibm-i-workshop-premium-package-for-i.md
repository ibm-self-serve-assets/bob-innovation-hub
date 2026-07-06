---
id: d0bd98ea-7aa9-4bd1-8610-dbbbb238d897
title: Bob and IBM i workshop - Premium Package for i
asset-owner: benoit.marolleau@fr.ibm.com
team: Other
type: Technical
domain: Modernization
problem: >+
  Enterprises relying on core business applications running on IBM i struggle
  with compounding technical debt, developer bottlenecks, and architectural
  limitations due to legacy engineering paradigms:


  - **Outdated Tooling & Tribal Knowledge:** Developers rely heavily on
  monolithic "green screens" (SEU/PDM), which lack automated cross-referencing,
  lack visual documentation, and alienate newer engineering talent.

  - **Complex, Fragmented Codebases:** Core logic remains trapped in rigid
  fixed-format RPG (RPG III/IV) and Record-Level Access (RLA) patterns that are
  hard to scale, read, and maintain.

  - **Rigid Database Structures:** Databases structured in older Data
  Description Specifications (DDS) lack modern relational features, optimization
  layers, and cross-platform visibility.

  - **Fear of Change (High-Risk Scope Inflation):** Making minor functional
  changes (e.g., expanding a database field size) is highly risky because
  tracking down hidden upstream/downstream application dependencies manual
  analysis is error-prone and labor-intensive.

  - **Lack of Continuous Integration:** Development lacks standard automated
  unit-testing frameworks (like RPGUnit), making rapid deployment cycles unsafe.

solution: >+
  The solution leverages the automated capabilities, advanced developer
  workflows, and system-aware tools built into **IBM Bob Premium Package for i
  (PPi)**. Seamlessly integrated with the *Code for IBM i* extension pack, the
  platform delivers targeted modern tools to resolve these problems
  systematically through a guided, lab-proven lifecycle:


  1. **Automated Documentation & Visualization:** Developers use Bob's *Ask*
  mode alongside the `/erd` command to query the live system catalog (`QSYS2`)
  and instantly generate program-level documentation and visual
  Entity-Relationship Diagrams (ERDs) in Mermaid format.

  2. **AI-Driven Code Modernization:** Dedicated workflows cleanly migrate
  legacy, fixed-format RPG specifications into modern, free-format RPG IV.

  3. **Database Re-Engineering (DDS to SQL DDL):** Built-in Db2 skills
  dynamically translate DDS definitions to SQL DDL statements, mapping out
  performance optimization strategies and converting RLA code to modern SQL
  statements.

  4. **Automated End-to-End Impact Analysis:** By querying system metadata
  (`QSYS2.SYSDEP`, `QSYS2.SYSCST`), Bob automatically analyzes cross-stack
  dependencies. It generates detailed impact reports and modifies code
  coordinates seamlessly across tables, display files (DSPF), and embedded SQL
  programs.

  5. **Continuous Quality & Automated Testing:** Developers can automatically
  generate RPGUnit test stubs, executing automated test suites against isolated
  target environments before merging changes into shared Git branches.

business-value: |+
  - Accelerated Time-to-Market
  - Risk Reduction and Stability
  - Mitigated Talent Risk
  - Optimized System Performance
  - High Developer Agility

tech-stack:
  - IBM Bob
lab: https://github.com/bmarolleau/IBM-i-Application-Modernization-with-Bob/blob/main/lab100-premium-package-introduction.md
featured: 15
---
This use case outlines the comprehensive application modernization journey of a legacy enterprise IBM i application (represented by the SAMCO/Flight400 environments). Utilizing the **IBM Bob Premium Package for i (PPi)**—an AI-powered, expert-mode assistant embedded within a modern VS Code-based integrated development environment (IDE)—a development team transitions an older application from green-screen legacy development to modern, DevOps-driven practices. The transformation spans every critical phase of modernization, including automated code exploration, fixed-to-free RPG conversion, database re-engineering (DDS to SQL), full-stack impact analysis, and automated unit testing, while smoothly bridging the gap between host-based source libraries (QSYS) and Git-managed workspaces.