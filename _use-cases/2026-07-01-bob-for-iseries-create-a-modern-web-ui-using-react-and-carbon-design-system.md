---
id: 7b556c5c-944c-4ed6-b845-dc31510c22b0
title: "Bob for iSeries: Create a modern web UI using React and Carbon Design System"
asset-owner: benoit.marolleau@fr.ibm.com
team: Other
type: Technical
domain: Modernization
problem: >+
  Once core legacy source code is updated to modern syntax, organizations face
  severe friction when exposing that data to modern business frontends:


  - **The Green-Screen Access Silo:** Core business inventory, articles, or
  product tables are trapped inside Db2 physical files. Accessing or listing
  these records typically requires traditional, text-based subfile programming,
  which cannot be natively consumed by modern web browsers or mobile apps.

  - **Repetitive Boilerplate Waste:** Manually writing the data-transfer layers,
  CRUD (Create, Read, Update, Delete) routines, and JSON/HTML listing components
  for every single inventory array creates a tedious engineering bottleneck.

  - **The "Lost Logic" Gap:** Developers frequently struggle to efficiently map
  complex backend multi-member database fields into modern array structures
  without introducing performance lag or formatting errors.

solution: >+
  Utilizing IBM Bob to construct the article listing component streamlines the
  development cycle into a highly automated, secure pipeline:


  - **Automated Data-to-List Mapping:** IBM Bob evaluates the structural schema
  of the backend article table and automatically generates the modern runtime
  code required to fetch, format, and structure the data into an array or
  collection format.

  - **AI-Generated Service Layers:** The developer prompts Bob to synthesize the
  necessary listing logic. Bob provides clean, performant service layers that
  transform standard IBM i records into lightweight, modern lists optimized for
  fast rendering.

  - **Frictionless UI Prototyping:** Developers can rapidly spin up modern
  frontend templates (such as web tables or interactive dashboard components)
  that populate dynamically with authentic data straight from the host
  environment, bypassing weeks of manual full-stack drafting.

business-value: |+
  - Drastic Reduction in Time-to-Market
  - Seamless Modernization Paths
  - Maximized Developer Productivity
  - Lightweight and Maintainable Architecture

tech-stack:
  - IBM Bob
lab: https://github.com/bmarolleau/IBM-i-Application-Modernization-with-Bob/blob/main/lab00_ibm-bob-ibmi-labs.md#lab-2-build-a-simple-article-list
featured: 26
---
This use case demonstrates how a development team uses **IBM Bob** to quickly prototype and build standard data-driven business applications—specifically a web-based **Article/Product List display**—that interacts directly with foundational IBM i backend data structures. Instead of writing boilerplate database access code and data mapping functions by hand, developers use Bob to interpret raw data layouts, generate modern display logic, and assemble the microservices or UI components needed to serve a clean, scannable item catalog to end users.

