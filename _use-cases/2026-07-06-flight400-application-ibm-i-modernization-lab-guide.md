---
id: 9e6b7230-c5c1-4649-882b-2b687f695acb
title: FLIGHT400 Application — IBM i Modernization Lab Guide
asset-owner: benoit.marolleau@fr.ibm.com
team: Other
type: Technical
domain: Modernization
problem: >+
  Many enterprise organizations rely on foundational legacy applications running
  on IBM i architectures that are robust, secure, and business-critical.
  However, they face significant operational bottlenecks:


  - **The "Black Box" Monolith:** Decades of core business logic trapped in
  massive RPG/RPGLE structures, making it difficult to isolate functionality or
  safely introduce modern features.

  - **Developer Skill Silos:** Traditional Green-Screen tools and specialized
  native build cycles create a disconnect between veteran IBM i teams and modern
  cloud-native developers.

  - **Lack of Agility:** Traditional compilation and manual management slow down
  development cycles, leaving organizations unable to rapidly roll out modern
  web/mobile user interfaces or expose features via standard REST APIs.

solution: >+
  The repository acts as a blueprint for implementing structural and tooling
  modernization on IBM i using the `flight400` ecosystem:


  - **Modern Build Automation:** Utilizes next-generation build tools like **Bob
  (Better Object Builder)** to migrate native software asset compilation into a
  modern, dependency-aware, and source-control-friendly (Git-compatible) format.

  - **Architecture Modernization (Refactoring):** Isolates monolithic business
  layers (like seat allocation, flight tracking, and schedules) into modular
  service programs.

  - **API and Open Source Integration:** Demonstrates how to bridge classic DB2
  structures and backend logic to web applications or open-source languages
  (such as Node.js or Python running in PASE) via flexible connectivity layers,
  transitioning the app from a terminal system to a service-oriented
  architecture.

business-value: |+
  - Preservation of Core IP
  - Accelerated Time-to-Market
  - Bridging the Developer Talent Gap
  - Enhanced Competitive Agility

tech-stack:
  - IBM Bob
lab: https://github.com/bmarolleau/flight400-demo
featured: 28
---
The `flight400-demo` is a baseline application and architectural template designed to illustrate the progressive modernization of legacy applications on the **IBM i (AS/400)** platform. Centered around a mock flight booking/management system, this repository serves as a hands-on proof of concept (PoC). It showcases how monolithic RPGLE code and DB2 for i databases can seamlessly interface with modern DevOps build tools (such as "Bob" / Better Object Builder), CI/CD pipelines, and microservices/web components without forcing a risky or costly total platform rip-and-replace.