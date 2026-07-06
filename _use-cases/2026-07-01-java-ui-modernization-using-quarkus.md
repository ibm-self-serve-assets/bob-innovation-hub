---
id: a2b98f0a-6ed2-477a-be3b-a475833fb380
title: Java UI Modernization using Quarkus
asset-owner: anand.awasthi@in.ibm.com
team: Other
type: Technical
domain: Modernization
problem: >+
  Many organizations still maintain critical business applications running on
  legacy stacks like JSF, Struts, and traditional Java EE backend servers. While
  these applications remain functional, they present several distinct
  challenges:


  - **Outdated User Experience (UX):** The user interfaces look dated and lack
  modern interactive features (such as responsive layouts or drag-and-drop
  mechanics) that modern users expect.

  - **Development Overhead & Upskilling:** Fully redesigning and rewriting these
  legacy systems using modern frontend stacks (like React) and modern backend
  frameworks takes an immense amount of time, creates high labor costs, and
  requires extensive developer upskilling.

  - **Inflexible Architectures:** Traditional enterprise Java applications rely
  on heavy, slow-starting application servers and complex XML configuration
  files (e.g., `web.xml`, `persistence.xml`), making them difficult to maintain,
  test, and deploy efficiently in cloud-native environments.

solution: >+
  The automated agent "Bob" handles the heavy lifting of the migration through
  an end-to-end transformation process:


  - **Deep Code Analysis:** Bob scans the legacy structure (XHTML pages, backing
  beans, EJBs, data models, and business logic) to map out data flows and build
  a comprehensive inventory of UI components.

  - **Backend Migration to Quarkus:** Bob swaps out the heavy Java EE stack for
  Quarkus (a cloud-native, GraalVM-ready framework). It converts Enterprise
  JavaBeans (EJBs) to Contexts and Dependency Injection (CDI) beans, updates JPA
  entities, and introduces reactive programming patterns for enhanced speed.

  - **Configuration Simplification:** Multiple legacy XML configuration files
  are streamlined into a single unified `application.properties` or YAML
  configuration file.

  - **Frontend Modernization to React:** The assistant converts legacy JSF pages
  into modular, sleek React components. It sets up proper state management,
  converts complex elements into reusable component hierarchies, improves form
  validation, and seamlessly adds modern UX enhancements (such as bold UI
  styling and drag-and-drop capability).

  - **Automated Testing & Documentation:** Bob creates architecture
  documentation in Markdown with visual Mermaid diagrams, establishes localized
  launch/deployment configurations, and generates automated integration test
  suites for both React and Quarkus to ensure functional parity.

business-value: |+
  - Drastic Reduction in Time-to-Market
  - Resource Optimization
  - Significantly Enhanced Performance
  - Improved User and Developer Experience

tech-stack:
  - IBM Bob
demo: https://www.youtube.com/watch?v=gqZG_afyQyg
featured: 36
---
This use case demonstrates how an automated AI assistant named "Bob" modernizes a legacy, dated Java Enterprise Edition (Java EE) application. Specifically, the tool takes an older Taskboard application built with a traditional Java server-side UI framework (like JSF or Struts) and fully migrates it into a modern, decoupled web application featuring a high-performance Java backend and a reactive frontend.