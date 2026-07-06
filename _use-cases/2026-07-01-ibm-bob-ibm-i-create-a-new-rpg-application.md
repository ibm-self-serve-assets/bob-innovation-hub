---
id: 73bec31e-6d4c-4e0f-84a9-2edc2fca7c9f
title: IBM Bob - IBM i Create a New RPG Application
asset-owner: benoit.marolleau@fr.ibm.com
team: Other
type: Technical
domain: Modernization
problem: >+
  Building brand-new, modern, full-stack applications that seamlessly bridge
  classic IBM i data reliability with modern web technologies is notoriously
  slow, complex, and expensive:


  - **The Full-Stack Skill Gap:** Modern web development requires proficiency
  across wildly disparate tech stacks—such as database schemas, legacy or modern
  backend logic (RPG), web middleware (Python/Flask), and browser behaviors
  (HTML5, CSS, JavaScript). Finding developers who comfortably master all these
  domains on the IBM i platform is incredibly rare.

  - **Siloed, Manual Layer Integration:** Building separate application tiers by
  hand leads to immense friction. Developers routinely introduce bugs,
  structural typos, or integration mismatches when manually trying to connect a
  web-based frontend AJAX loop to a Python API, and subsequently to a backend
  RPG service program and a Db2 table.

  - **Documentation and Testing Debt:** Fast-moving projects frequently skip
  creating comprehensive technical architecture manuals, step-by-step deployment
  scripts, or end-to-end testing profiles, leaving the newly built application
  brittle and difficult for a broader team to maintain or deploy.

solution: >+
  Deploying IBM Bob inside the workspace environment introduces a unified,
  multi-lingual software automation engine:


  - **Structured System Design Generation:** Bob initiates the build process by
  translating high-level goals into an exact, markdown-based architectural
  design specification document complete with layout diagrams and component
  parameters.

  - **Automated Relational Database Provisioning:** Bob designs the Db2 layer
  from the ground up, auto-synthesizing DDL table definitions, proper indexing
  strategies, automated audit logs, and realistic sample data initialization
  scripts.

  - **Clean-State Free-Form RPG Synthesis:** For core transactional data
  handling, Bob writes modular, readable Free-Format RPG service programs. These
  programs include robust parameter validations, modern naming schemas, and
  extensive inline documentation.

  - **Seamless REST API Middleware Construction:** To expose the backend to web
  requests, Bob crafts a Python Flask web services tier complete with functional
  API routing, logging modules, installation setups, and concrete unit test
  profiles.

  - **Responsive Frontend Delivery:** Bob compiles a dynamic, accessible HTML5
  dashboard frontend enhanced with custom CSS stylesheets and AJAX-powered
  JavaScript tables to stream live student details directly from the IBM i
  backend without page reloads.

business-value: |+
  - Exponential Compression of Full-Stack Timelines
  - Maximum Tooling Cohesion with Minimal Overhead
  - Immediate System Modernization Realization
  - Instant Operational Readlines

tech-stack:
  - IBM Bob
demo: https://www.youtube.com/watch?v=GacBr38qbjU
---
This use case demonstrates how an enterprise development team utilizes **IBM Bob** to engineer a complete, multi-tier **Student Management Application** from scratch natively on the IBM i platform. Instead of forcing separate teams to spend weeks hand-coding standalone layers, a single engineer leverages Bob as an autonomous full-stack partner. The AI agent takes high-level application specifications and systematically builds out every tier of the software lifecycle: generating a comprehensive structural design document, spinning up the foundational Db2 database layers, coding modern Free-Format RPG business logic, building a Python Flask REST API middleware tier, and delivering a responsive web-based HTML5 frontend