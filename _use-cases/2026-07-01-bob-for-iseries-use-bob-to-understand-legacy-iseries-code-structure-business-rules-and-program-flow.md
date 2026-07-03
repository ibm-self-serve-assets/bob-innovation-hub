---
id: 80c7bef4-ff33-4eac-907f-5f8a76ae004a
title: "Bob for iSeries: Use Bob to understand legacy iSeries code structure,
  business rules, and program flow"
asset-owner: Brunda.Reddy@ibm.com
team: Service Engineering
type: Technical
domain: Modernization
problem: >+
  Before an enterprise can execute an application modernization or
  cloud-migration project, they are paralyzed by the initial "Discovery Phase"
  due to deep technical barriers:


  - **The "Black Box" Monolith:** Heritage systems like the SAMCO application
  have evolved over 20 to 40 years. The original architects are often retired,
  leaving behind a "black box" system with zero up-to-date documentation, call
  diagrams, or logic flowcharts.

  - **Massive Onboarding Interia:** New developers, architects, or external
  consultants assigned to the modernization project face a massive learning
  curve. Sifting through thousands of interconnected RPG, CL (Command Language),
  and DDS (Data Description Specifications) source members to understand basic
  application flows wastes valuable engineering hours.

  - **High Assessment Risk:** Because the cross-dependencies between modules are
  invisible, IT leadership cannot accurately gauge the blast radius, timeline,
  or resource requirements of a modernization sprint. Making a blind update to a
  single program could trigger a catastrophic failure across the entire SAMCO
  ecosystem.

solution: >+
  Deploying IBM Bob as an automated discovery and application intelligence agent
  transforms the repository assessment from a manual chore into an instant,
  automated process:


  - **Automated Codebase Crawling & Analysis:** IBM Bob parses the complete
  directory structure of the SAMCO application, recognizing the relationships
  between disparate components (such as display files, database structures,
  control logic, and batch routines).

  - **AI-Synthesized Application Overviews:** The agent distills complex,
  multi-layered column syntax into clear, human-readable markdown overviews. It
  answers core architectural questions instantly, such as: *What does this
  module do? Which tables does it touch? What are its primary entry and exit
  points?*

  - **Interactive Architecture Q&A:** Developers can conversationally
  interrogate the SAMCO codebase within their IDE (e.g., asking Bob to trace a
  specific business transaction or isolate the exact validation logic used for
  an inventory calculation), bridging the legacy knowledge gap on demand.

business-value: |+
  - Drastic Compression of Discovery Timelines
  - De-Risked Scoping and Planning
  - Frictionless Developer Onboarding
  - Eradication of Tribal Knowledge Dependence

tech-stack:
  - IBM Bob
lab: https://github.com/bmarolleau/IBM-i-Application-Modernization-with-Bob/blob/main/lab00_ibm-bob-ibmi-labs.md#lab-0-discover-the-samco-application
---
This use case outlines how a cross-functional enterprise IT team (comprising architects, newly hired developers, and product owners) uses **IBM Bob** to perform automated, comprehensive code discovery and application mapping on **SAMCO**—a massive, monolithic, and undocumented legacy business application running on the IBM i platform. Instead of spending weeks manually tracing control flows or deciphering complex source physical files (`QSYS.LIB`), developers task the AI agent with reading the entire codebase. Bob ingests the legacy structures, reverse-engineers the system's operational architecture, and builds an exhaustive functional profile of the SAMCO application natively within the workspace.