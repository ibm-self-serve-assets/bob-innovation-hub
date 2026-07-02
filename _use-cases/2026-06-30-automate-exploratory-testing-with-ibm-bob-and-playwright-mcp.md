---
id: 2223e28c-9058-481a-81f6-ee3d6d4fb103
title: Automate Exploratory Testing with IBM Bob and Playwright MCP
asset-owner: anand.awasthi@in.ibm.com
team: Other
type: Technical
domain: Automation
problem: Manually conducting exploratory testing on web applications is
  time-consuming and labor-intensive. Furthermore, once an exploration or manual
  use-case test is complete, QA engineers or developers must manually write,
  configure, and maintain automated test scripts (like Playwright). This gap
  between finding a working use case and writing the code to continuously test
  it delays development velocity and can lead to gaps in test coverage if the
  codebase changes and tests break.
solution: >+
  The video demonstrates an AI-driven, end-to-end automation workflow using IBM
  Bob:


  - **Automated Exploration:** The user instructs the AI to explore a specific
  host/website. The AI spins up a browser, identifies elements (like a search
  bar), inputs test data (e.g., searching for "Matrix"), and validates the UI
  behavior.

  - **Environment Adaptation:** The AI automatically checks the local software
  project structure to see if necessary testing dependencies (like Playwright)
  exist. Finding them missing, it uses a framework-specific server (Quarkus MCP)
  to automatically inject the correct dependencies into the configuration.

  - **Code Generation & Setup:** The AI writes clean, structured Playwright test
  scripts directly matching the use cases discovered during exploration. It also
  handles prerequisite setup steps, such as installing the required headless
  browser binaries (e.g., Chromium).

  - **Self-Healing & Verification:** The AI executes the generated tests to
  ensure they pass. If a test fails or code changes, the AI is capable of
  evaluating the failure and self-healing (fixing) the test script automatically
  until it matches the website's reality.

business-value: |+
  - Accelerated Time-to-Market
  - Lower Maintenance Overhead
  - Improved Software Quality
  - Reduced Friction for Developers

tech-stack:
  - IBM Bob
demo: https://www.youtube.com/watch?v=oLEzLcTiceI
---
The use case demonstrates how an AI assistant (IBM Bob) can be utilized to automate exploratory testing and subsequent test script generation for a web application (a movie catalog website). By leveraging Model Context Protocol (MCP) servers—specifically the Quarkus MCP server and the Playwright MCP server—the AI navigates a live web browser, discovers UI components, validates a search function, updates the local development environment, writes actual Playwright test scripts, and executes them to verify success.