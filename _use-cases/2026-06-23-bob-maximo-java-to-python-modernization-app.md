---
id: ea3ebd62-0896-4b31-9959-9c5fef0377ef
title: Bob + Maximo (Java to python modernization app)
asset-owner: ranjan.kumar.jena@ibm.com
team: Service Engineering
type: Technical
domain: Modernization
problem: >-
  Monolithic Java customization combined lifecycle logic, validations, actions,
  and SLA conditions.  

  Manual responsibility mapping to Maximo launch points is slow and dependent on
  SME knowledge.  

  Regression testing across scenarios, statuses, and related records requires
  heavy manual effort. Documentation, traceability, and repeatable test assets
  are often missing in legacy customizations
solution: >-
  Bob automatically discovers and analyzes legacy Maximo Java customizations
  from any source (like Cloud Object Storage, Git, ..)  

  Modular Python automation scripts are generated with consistent coding
  patterns  

  Test plans, YAML scenarios, seed data, and API runners are produced alongside
  the scripts
business-value: >+
  - Bob discovers Java source, analyzes methods, and groups logic by
  responsibility. 

  - It generates deployable OBJECT, ATTRIBUTE, ACTION, and CONDITION scripts
  with consistent patterns. 

  - It also creates test plans, YAML scenarios, seed data, and API runners for
  rapid validation. 

  - Teams can review, refine, and deploy outputs faster with clearer
  traceability

tech-stack:
  - IBM Bob
  - Maximo
architecture_diagram: /docs/diagrams/bob-maximo-architecture.png
demo: https://www.youtube.com/watch?v=ZD-PbxxTOz0
slide_deck: /docs/slide_decks/Bob_Maximo_one_pager.pdf
featured: 65
---
Bob is an intelligent automation solution designed to modernize and streamline legacy IBM Maximo customizations. It automatically discovers and analyzes Java-based custom code stored in IBM Cloud Object Storage (COS), eliminating the need for manual assessment. Based on this analysis, Bob generates modular, production-ready Python automation scripts that follow consistent and standardized coding practices. Beyond code generation, Bob accelerates the testing lifecycle by producing comprehensive test assets alongside the scripts. This includes detailed test plans, YAML-based test scenarios, seed data, and API runners, enabling faster validation and deployment. By combining code intelligence with automated testing support, Bob significantly reduces modernization effort, improves code quality, and enhances overall development efficiency.