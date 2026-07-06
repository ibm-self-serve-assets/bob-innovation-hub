---
id: de03a385-5c61-4d1c-a36d-2706b477fe1b
title: Squash security issues in your code
asset-owner: anand.awasthi@in.ibm.com
team: Other
type: Technical
domain: Security
problem: When adopting or evaluating open-source software, software development
  and security teams must ensure the application does not introduce security
  vulnerabilities into their environment. Manually reviewing dependency audit
  logs and static code analysis (like ESLint) outputs is time-consuming,
  tedious, and prone to human error, which ultimately delays the integration and
  deployment of critical application updates.
solution: >+
  The solution leverages an AI assistant to streamline code hardening. The
  process unfolds as follows:


  - **Dependency Auditing:** The developer inputs the dependency audit report.
  The AI assistant analyzes the file, generates a structured checklist,
  automatically installs secure versions of required packages, and
  restarts/tests the application to verify functionality.

  - **Static Code Analysis Remediation:** The developer provides the ESLint
  output report within the same ongoing context window. The AI reviews the
  static code analysis errors, appends new remediation steps to its active
  checklist, fixes the code, and re-runs the scanner to double-check that no
  remaining security issues exist.

business-value: |+
  - Accelerated Time-to-Market
  - Continuous Context & Precision
  - Enhanced Code Quality and Trust

tech-stack:
  - IBM Bob
demo: https://www.youtube.com/watch?v=T4A04Jsxogs
featured: 57
---
This use case outlines the process of using an AI coding assistant (referred to as "Bob") to automatically audit, identify, and remediate security vulnerabilities within an open-source Node.js application's dependencies and source code.