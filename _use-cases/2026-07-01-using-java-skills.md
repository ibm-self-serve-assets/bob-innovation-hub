---
id: 6b758325-e793-48f1-b6f2-d13ee2541edb
title: Using Java Skills
asset-owner: anand.awasthi@in.ibm.com
team: Other
type: Technical
domain: Automation
problem: Traditional AI-assisted coding tools often struggle with complex,
  deterministic enterprise logic. They rely purely on LLM prompt-generation,
  which introduces non-determinism, hallucinatory syntax errors, or an inability
  to interface deeply with local Java build tools, APIs, and complex internal
  environments. For organizations modernizing or managing vast Java estates,
  reliance on simple Markdown-based AI rules is insufficient for long-running,
  multi-step agentic pipelines that require exact, type-safe execution, local
  compilation, and custom enterprise rules.
solution: >+
  This solution combines the flexible, intent-driven planning of IBM Bob's AI
  agents with the deterministic reliability of compiled Java code. Within the
  `.bob/skills` framework, a custom skill playbook is designed to delegate
  complex operations directly to compiled Java utilities.


  - **Intent Capture:** The developer or the orchestrator invokes a custom
  workflow via natural language.

  - **Deterministic Execution:** Instead of relying entirely on an LLM to guess
  the code logic, the Bob skill maps the task directly to local Java execution
  steps (`java -jar` or direct class execution).

  - **Tool-Aware Automation:** The Java tool runs locally, safely compiling
  code, handling environment variables, or analyzing syntax, and returns
  structured data back to the Bob AI environment to complete the development
  lifecycle loop.

business-value: |+
  - Enhanced AI Precision & Governance
  - First-Class Java Modernization
  - Enterprise Customizability
  - Higher Developer Velocity

tech-stack:
  - IBM Bob
lab: https://github.com/IBM/bob-demo/tree/main/using-java-skills
---
The "Using Java with Skills" module demonstrates how to configure and execute enterprise workflows in **IBM Bob** (an AI-first software engineering IDE) by combining **Skills** with custom **Java** logic. While basic Bob skills use Markdown and shell scripts to define playbooks, this advanced use case highlights how developers can write robust, compiled Java classes to act as the specialized execution backend or tooling mechanism for a skill. It showcases a project structure where an AI agent dynamically leverages native Java tools to orchestrate precise codebase manipulations, environment checks, or automated transformations.