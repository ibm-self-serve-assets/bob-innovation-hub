---
id: 85090862-0703-4910-aea5-168c11a67bd0
title: "Bob for iSeries: Transform record-level access operations to modern SQL
  with JOINs"
asset-owner: benoit.marolleau@fr.ibm.com
team: Other
type: Technical
domain: Modernization
problem: >+
  Legacy IBM i applications extensively rely on RLA, which forces the program to
  explicitly navigate files row-by-row and handle index pointers manually. This
  introduces severe operational and engineering bottlenecks:


  - **The Proprietary Knowledge Lock-In:** RLA verbs (like `CHAIN` or `SETLL`)
  are unique to proprietary heritage ecosystems. Modern software engineers and
  database administrators (DBAs) entering the workforce cannot read, maintain,
  or optimize these programs without undergoing extensive, costly
  cross-training.

  - **Severe Performance Degradation:** RLA forces sequential, programmatic
  record processing inside the application layer. It completely bypasses the
  modern Db2 **SQE (Symmetric Multiprocessing Query Optimizer Engine)**, which
  utilizes advanced parallel processing, indexing statistics, and memory caching
  to execute relational operations at lightning speed.

  - **Tightly Coupled Architecture:** RLA tightly binds the application code to
  the physical layout and structural sequence of the database files. Any change
  to a database column layout frequently breaks the application, forcing
  expensive, complex re-compilations.

solution: >+
  Deploying IBM Bob to orchestrate the RLA-to-SQL transformation provides a
  clean, highly automated migration pathway:


  - **Automated Logic Parsing:** IBM Bob reads the legacy data access routines,
  mapping file pointers, keys, and sequential read loops (`READE`/`READPE`) to
  understand the exact business data intent.

  - **Intelligent Embedded SQL Synthesis:** The AI automatically replaces the
  hard-coded, row-by-row procedural RLA loops with clean, declarative, and
  high-performing embedded SQL statements (e.g., rewriting a complex key lookup
  and loop into an optimized `SELECT ... WHERE` or `JOIN` cursor block).

  - **Workspace-Native Optimization:** Because the conversion happens inside the
  local development suite, developers can immediately leverage the system's
  database validation features to confirm that the newly generated SQL code
  precisely mirrors the legacy data retrieval logic without introducing
  functional discrepancies.

business-value: |+
  - Massive System Performance Gains
  - Drastic Reduction in Technical Debt
  - Workforce Future-Proofing
  - Preparation for Cloud & Analytics Ecosystems

tech-stack:
  - IBM Bob
lab: https://github.com/bmarolleau/IBM-i-Application-Modernization-with-Bob/blob/main/lab00_ibm-bob-ibmi-labs.md#lab-3-convert-rla-to-sql
featured: 27
---
This use case outlines how an enterprise database and application development team utilizes **IBM Bob** to automate the migration of database access logic from archaic **Record-Level Access (RLA)** commands—such as legacy RPG operations like `CHAIN`, `SETLL`, `READE`, or native logical file overrides—into modern, standardized **Embedded SQL** statements. Developers leverage the AI agent within their local workspace to ingest legacy data-access layers, automatically analyze the underlying relational pathways, and systematically refactor the application to use standardized SQL queries that execute natively against the advanced Db2 for i query engine.