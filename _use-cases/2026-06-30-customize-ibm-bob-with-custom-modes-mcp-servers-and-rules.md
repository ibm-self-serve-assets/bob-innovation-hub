---
id: c6ee6999-a8b1-4bac-8d48-9945b1e1b8dd
title: Customize IBM Bob with Custom Modes, MCP Servers and Rules
asset-owner: anand.awasthi@in.ibm.com
team: Other
type: Technical
domain: Automation
problem: >+
  General-purpose AI coding assistants often provide generic code completions
  based on outdated training data. This causes several challenges for enterprise
  development teams:


  - **Outdated Dependencies:** An AI might suggest software versions or
  dependencies based on its training cutoff (e.g., Quarkus 3.10), whereas a
  specific project might be running on an entirely different version (e.g.,
  Quarkus 3.2).

  - **Context Bleeding:** AI models have access to an overwhelming array of
  tools and frameworks, making them prone to proposing irrelevant tools (such as
  suggesting deployment tools like Argo CD when a developer is just writing pure
  Java code).

  - **Failure to Follow Internal Standards:** Standard LLMs often fail to
  consistently implement internal design patterns, specific project
  architectures, mandatory annotations, or explicit validation checks.

solution: >+
  The solution introduces a localized configuration system within a `.bob`
  directory in the project root to refine how the AI behaves. It consists of
  three core components:


  1. **Custom Modes:** Developers define a targeted persona (e.g., "Quarkus
  Developer") via a `custom_modes.yaml` file. This tells the AI precisely when
  to activate, what its specific expertise is, and restricts its tool access
  exclusively to what is relevant for that task.

  2. **MCP (Model Context Protocol) Servers:** By configuring an `MCP.json`
  file, the AI can connect to an external live server (like a Quarkus MCP
  server). This updates Bob's knowledge on-the-fly, allowing it to inspect the
  project and suggest real-time, exact dependency versions instead of guessing
  based on static training data.

  3. **Custom Rule Sets:** A dedicated `rules/` folder houses Markdown files
  containing strict project guidelines and explicit code examples (e.g.,
  requirements for creating LangChain4j interfaces). It enforces step-by-step
  procedures, specifies precise code formatting rules, and dictates mandatory
  self-validation checks (such as verifying that imports and annotations are
  applied correctly before finalizing output).

business-value: |+
  - Increased Code Quality and Consistency
  - Reduced Refactoring and Debugging
  - Hyper-Contextual Productivity

tech-stack:
  - IBM Bob
demo: https://www.youtube.com/watch?v=MzmcVd2DJmk
---
IBM Bob is an AI coding assistant designed to help developers generate content and write code. This use case focuses on extending and tailoring Bob’s knowledge base to meet the exact constraints and standards of a specific project. Instead of relying solely on the general data it was initially trained on, users can dynamically restrict, guide, and customize Bob's behavior directly within their project directory using Custom Modes, Model Context Protocol (MCP) servers, and custom validation rules.