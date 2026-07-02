---
id: a91efd00-0321-4f94-96a9-c550867c85e4
title: "Bob for iSeries: Automate IBM i system management with Bob & ansible"
asset-owner: anand.awasthi@in.ibm.com
team: Other
type: Technical
domain: Modernization
problem: >+
  Enterprises running core backend workloads (such as banking, logistics, or ERP
  systems) on IBM i face operational stagnation due to the nature of their
  heritage codebases:


  - **The Legacy Syntax Bottleneck:** Millions of lines of production code are
  written in Fixed-Format RPG, which relies on rigid column alignments. To
  modern software engineers trained in Java, Python, or TypeScript, this layout
  looks like a foreign language, creating a massive barrier to entry.

  - **The Retiring Talent Pool:** The global pool of veteran RPG developers who
  understand column-restricted specifications is rapidly shrinking due to
  retirement. Finding new talent willing to learn archaic, column-dependent
  syntax is nearly impossible.

  - **The "Black Box" Risk:** These foundational applications often lack
  comments or accurate technical documentation. Because developers cannot easily
  decipher what a 30-year-old Fixed-Format program is doing, making even small
  functional updates carries a high risk of catastrophic system regression.

solution: >+
  Deploying IBM Bob into the developer workspace provides an automated,
  closed-loop modernization and documentation pipeline:


  - **Automated Living Documentation:** IBM Bob reads the dense, column-specific
  legacy code block and automatically extracts its functional logic, variables,
  and business rules, generating clear, human-readable markdown descriptions.
  This strips the "black box" mystery away from the application.

  - **Syntax Transformation Engine:** With straightforward directional prompts,
  Bob intelligently rewrites column-restricted specifications into modern
  Free-Format RPG syntax (converting legacy formatting rules into clean,
  free-form statements).

  - **Workspace-Native Refactoring:** Because Bob works natively inside the
  developer’s active workspace, the transformation occurs in place, allowing
  developers to instantly compile, review, and test the modernized code against
  their existing IBM i environment.

business-value: |+
  - Preservation of Core IP
  - Workforce Democratization
  - Drastic Reduction in Technical Debt & Discovery Cost
  - Future-Proofing for DevSecOps

tech-stack:
  - IBM Bob
  - Red Hat Ansible
lab: https://github.com/bmarolleau/IBM-i-Application-Modernization-with-Bob/blob/main/lab1-rpg-documentation-fixed-to-free.md
---
This use case outlines how an enterprise IT organization uses **IBM Bob** to automate the syntax transformation and documentation of core legacy **RPG (Report Program Generator)** applications running on the IBM i platform. In this scenario, application developers leverage Bob within their localized development workspace to ingest ancient, column-specific **Fixed-Format RPG** source code. The AI agent acts as a specialized technical translator: it analyzes the code, produces human-readable markdown documentation detailing its functional logic, and automatically refactors the codebase into modern **Free-Format RPG syntax** without altering the underlying business rules.