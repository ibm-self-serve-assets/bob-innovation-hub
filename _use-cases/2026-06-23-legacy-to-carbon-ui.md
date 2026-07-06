---
id: fc77485f-a8e9-4534-a68e-5ea88af98547
title: Legacy to Carbon UI
asset-owner: anand.awasthi@in.ibm.com
team: Service Engineering
type: Technical
domain: Modernization
problem: >+
  Enterprise financial platforms often rely on mature, stable backend business
  logic that is unfortunately bound to legacy, monolithic frontends. For the
  WealthPlan application, this creates several critical business challenges:


  - **Inflexible User Experiences (UX):** Server-rendered JavaServer Pages (JSP)
  and fragmented, legacy Bootstrap styling make it difficult to deliver the
  dynamic, responsive interfaces expected by modern wealth managers and
  digital-first banking clients.

  - **Agility and Delivery Bottlenecks:** Because the UI logic is tightly
  coupled with the backend Java stack, front-end feature updates require full
  backend redeployments, slowing down time-to-market for competitive feature
  rollouts.

  - **The Modernization Dilemma:** A complete application rewrite is financially
  prohibitive, introduces immense operational risk to existing financial
  workflows, and creates potential compliance vulnerabilities. However, manually
  refactoring hundreds of views into modern code by hand is highly
  labor-intensive and prone to human error, risking functional regressions.

solution: >+
  The solution implements an intelligent, architecture-led modernization
  framework that completely refreshes the consumer experience while preserving
  backend business stability:


  - **Presentation Layer Decoupling:** Isolating core Spring Boot financial
  services and exposing them to an entirely decoupled, modular client
  architecture built on **React**.

  - **Standardized Enterprise UX via Carbon:** Replacing ad-hoc styling with the
  open-source **Carbon Design System**, ensuring that the interface across all
  user roles automatically conforms to strict enterprise accessibility (WCAG),
  usability, and visual identity standards.

  - **AI-Agent Accelerated Refactoring:** Utilizing an automated AI agent
  framework (**Bob IDE** equipped with custom `carbon-builder` skills) to parse
  legacy layout code and automatically generate production-ready React/Carbon
  components, guaranteeing functional parity at a fraction of manual coding
  time.

  - **Containerized, Cloud-Native Delivery:** Packaging the modernized
  presentation and service layers into Docker containers, managed and
  orchestrated via infrastructure-as-code manifests deployed directly onto **Red
  Hat OpenShift / Kubernetes** for elastic scaling and high availability.

business-value: |+
  - Dramatically Reduced Total Cost of Ownership (TCO)
  - Minimized Operational Risk
  - Elevated Brand Trust & Engagement
  - Modern Developer Ecosystem Alignment

tech-stack:
  - IBM Bob
demo: https://www.youtube.com/watch?v=fpoO_603duw
lab: https://github.com/ibm-self-serve-assets/ui-modernization-lab
featured: 39
---
This use case outlines the structural presentation-layer transformation of **WealthPlan**, a secure, multi-role wealth management platform utilized by Business Managers, Wealth Managers, and end-customers. Rather than initiating a high-risk, full-stack rewrite of core financial services, this use case demonstrates an in-place presentation-layer migration. It moves the application from a legacy, server-rendered presentation layer (Java, Spring Boot, JSP, and Bootstrap) to a decoupled, high-performance architecture driven by a modern **React** frontend and IBM's enterprise-grade **Carbon Design System**. To accelerate execution and lower delivery risk, the migration leverages specialized AI-driven software agents (**Bob IDE / Carbon Builder skills**) and targets a cloud-native deployment on **Red Hat OpenShift**.