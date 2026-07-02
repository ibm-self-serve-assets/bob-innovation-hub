---
id: a91efd00-0321-4f94-96a9-c550867c85e4
title: "Bob for iSeries: Automate IBM i system management with Bob & ansible"
asset-owner: anand.awasthi@in.ibm.com
team: Other
type: Technical
domain: Modernization
problem: >+
  Organizations running mission-critical workloads on IBM i face substantial
  code management barriers as their legacy systems age:


  - **The "Fixed-Format" Syntax Barrier:** Legacy RPGLE code relies on rigid
  column alignments (Fixed-Format). This syntax is highly alien to modern
  software engineers who are accustomed to free-form languages like Java,
  Python, or TypeScript.

  - **Severe Talent Shortage:** As the veteran generation of RPG programmers
  retires, finding developers who can interpret and maintain column-specific
  code is becoming incredibly difficult.

  - **Black-Box Legacy Systems:** Decades-old RPG applications often completely
  lack internal code comments or up-to-date functional documentation, making any
  minor modification highly risky and prone to regressions.

solution: >+
  This lab demonstrates how **IBM Bob** acts as an automated migration and
  intelligence assistant to eliminate legacy code friction:


  - **Automated Code Analysis & Documentation:** Bob crawls the rigid
  fixed-format code block, understands its functional dependencies, variables,
  and logic flow, and auto-generates a clear, readable text blueprint explaining
  what the program does.

  - **Fixed-to-Free Refactoring:** With simple conversational or command-driven
  interactions, Bob automatically rewrites column-restricted declarations and
  logic blocks into modern Free-Format RPG syntax (e.g., converting legacy
  specifications into clean `/FREE` structures or fully free-form statements).

  - **Syntax Validation:** The framework ensures that the refactored output
  complies with modern compiler standards, making the newly modernized code
  instantly accessible to the next generation of engineers.

business-value: |+
  - Preserves Core Business Logic
  - Bridges the Generational Developer Gap
  - Drastically Speeds Up Maintenance
  - Boosts Enterprise Agility

tech-stack:
  - IBM Bob
  - Red Hat Ansible
lab: https://github.com/bmarolleau/IBM-i-Application-Modernization-with-Bob/blob/main/lab1-rpg-documentation-fixed-to-free.md
---
This lab, `lab1-rpg-documentation-fixed-to-free.md`, provides hands-on instructions for using **IBM Bob** to modernize legacy RPG (Report Program Generator) source code on the IBM i platform. The lab focuses on two core capabilities: automatically parsing and generating comprehensive Markdown-based technical documentation for legacy RPG programs, and seamlessly refactoring older column-reliant **Fixed-Format RPG** code into modern, maintainable **Free-Format RPG** code directly inside a developer's workspace.

