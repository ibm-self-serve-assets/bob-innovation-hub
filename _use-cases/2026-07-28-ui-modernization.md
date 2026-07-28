---
id: 74add3d2-f59f-42b4-869e-c48e83cd9aea
title: UI Modernization
asset-owner: anand.awasthi@in.ibm.com
team: Other
type: Technical
domain: Automation
premium_package: Java Modernization
problem: >+
  Traditional legacy enterprise applications suffer from several architectural
  and operational limitations:


  - **Tight Coupling:** Frontend templates (e.g., JSP) and backend business
  logic are tightly coupled, hindering frontend updates without modifying core
  backend code.

  - **Monolithic Overhead:** Reliance on heavy application servers like IBM
  WebSphere increases deployment complexity and startup times compared to modern
  cloud-native runtimes.

  - **Poor User Experience & Performance:** Server-side rendering requires full
  page reloads for every user interaction, resulting in a slow, rigid user
  interface.

  - **High Maintenance Costs & Slow Delivery:** The lack of clean API separation
  makes modernizing, scaling, or extending business features risky,
  time-consuming, and labor-intensive.

solution: >+
  Using the automated **UI Modernization** workflow within IBM Bob, the legacy
  Java Struts application is refactored end-to-end:


  1. **Automated Analysis & Assessment:** Bob analyzes the full source code
  (action classes, JSP templates, and domain models) to generate architectural
  analysis documents, Mermaid component diagrams, and modernization target
  configurations.

  2. **Backend Transformation:** Domain and repository logic are preserved
  intact, while JAX-RS REST services are automatically scaffolded to create a
  clean Jakarta EE API layer running on Open Liberty.

  3. **Frontend Scaffolding & Component Generation:** Bob sets up a React +
  TypeScript project using Vite and builds an accessible, enterprise-grade
  interface leveraging IBM’s Carbon Design System components (data tables, stat
  cards, toast notifications, and modal flows).

  4. **Automated Error Resolution & Build Validation:** Bob detects styling and
  TypeScript compilation errors during intermediate builds, automatically
  resolving missing imports and type mismatches until achieving a clean build.

  5. **End-to-End Integration:** Full routing, state management, and backend API
  hook integration are configured, delivering validated user flows (Dashboard,
  Prescriptions, Orders, and Medicines).

business-value: |+
  - Accelerated Time-to-Market
  - Enhanced User Experience & Accessibility
  - Lower Operational & Maintenance Costs
  - Reduced Refactoring Risk

tech-stack:
  - IBM Bob
demo: https://ibm.seismic.com/Link/Content/DCWqHpW738XqMGcT3mGPFDgDjVpV
---
This use case showcases the automated UI and architecture modernization of a legacy Java application using IBM Bob's UI Modernization workflow. The source system—a monolithic, server-rendered application built on Apache Struts 2 and running on IBM WebSphere—is transformed into a decoupled, modern two-tier architecture. The modernized system features a lightweight Jakarta EE REST API backend running on Open Liberty and a responsive Single Page Application (SPA) frontend built with React, TypeScript, Vite, and IBM’s Carbon Design System. The entire transformation, including code generation, build error resolution, routing, and end-to-end integration, is executed automatically within IBM Bob.