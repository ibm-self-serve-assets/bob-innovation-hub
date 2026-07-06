---
id: 849b3903-592a-4c6d-a126-8cf119b6df40
title: IBM Bob - IBM i Generate Documentation for RPG
asset-owner: benoit.marolleau@fr.ibm.com
team: Other
type: Technical
domain: Modernization
problem: >+
  Enterprises managing core operations on heritage IBM i ERP environments face
  existential operational risks due to undocumented system complexity:


  - **Extreme Generational Code Friction:** Many core transactional loops are
  written in archaic RPG/36 formats. This syntax is completely foreign to
  contemporary software developers, transforming critical applications into
  unreadable "black boxes."

  - **Absolute Absence of Living Documentation:** Over 30 to 40 years of
  continuous patches, original technical specifications are completely lost or
  obsolete. No clear record remains detailing how programs connect, what
  databases are touched, or how system layers are organized.

  - **Invisible, Untraceable Business Rules:** Crucial corporate operations
  (such as credit card accounting, budget management, and accounts payable
  processes) are entirely hardcoded across thousands of scattered files.
  Compliance officers and IT architects cannot audit, review, or verify these
  policies without executing months of expensive manual source code parsing.

solution: >+
  Deploying IBM Bob into the codebase workspace establishes an automated,
  multi-tiered reverse-engineering and visualization pipeline:


  - **Comprehensive Workspace Synthesis:** Bob analyzes the full matrix of
  interconnected file objects, tracing relationships between backend database
  schemas, peripheral panel layouts, and batch execution scripts.

  - **Hierarchical Documentation Generation:** The agent automatically
  constructs an ordered directory structure containing distinct technical and
  administrative artifacts:
    - **System & Library Context Blueprints:** Generates diagrams mapping out active IBM i library structures (`QSYS.LIB`) and wide-scope user access patterns.
    - **Isolated Business Rule Extraction:** Automatically parses the programmatic conditional logic to pull and isolate core functional flows (e.g., separating credit card processing or billing parameters into clean, individual textual definitions).
    - **Visual Architecture Overviews:** Delivers end-to-end system layer diagrams, database pipeline visuals, and flow charts tracking entry and exit vectors.

business-value: |+
  - Drastic Compression of Discovery Costs
  - De-Risked Strategic Modernization
  - Immediate Compliance and Audit Readiness
  - Preservation of Institutional Capital

tech-stack:
  - IBM Bob
demo: https://www.youtube.com/watch?v=ULEJQwgzieg
---
This use case outlines how an enterprise IT department utilizes **IBM Bob** to autonomously extract, map, and document the complete functional architecture of an exceptionally old, large-scale **RPG II / RPG III (RPG/36) Enterprise Resource Planning (ERP)** application running on the IBM i platform. Instead of relying on manual code reviews to track decades of legacy systems, developers instruct Bob to scan the entire workspace—including Control Language (CL) programs, physical and logical files, printer overrides, DDS schemas, panel groups, and massive volumes of legacy RPG code. Working as an advanced repository intelligence agent, Bob builds an operational blueprint of the software, generating an exhaustive documentation package containing high-level executive summaries, library mappings, data flows, and structural business rule diagrams.