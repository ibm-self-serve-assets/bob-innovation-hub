---
id: 38ef5042-fbd7-4844-a8a6-b35bc0600715
title: "Quarkus AI integration "
asset-owner: Markus.Eisele@ibm.com
team: Other
type: Technical
domain: Modernization
problem: >+
  Enterprise development teams face significant roadblocks when trying to adopt
  Generative AI patterns into their core software ecosystems:


  - **The "Python-Only" Paradigm Myth:** Much of the modern GenAI toolchain
  (libraries, orchestration frameworks, agents) natively defaults to Python. For
  established enterprises, abandoning high-performance, strongly-typed Java
  stacks where their core business logic resides is costly, risky, and
  resource-intensive.

  - **Complex, Fragile AI Integrations:** Hand-crafting point-to-point
  connections between Large Language Models (LLMs), internal vector databases
  (like PostgreSQL with pgvector), and business APIs results in brittle, tightly
  coupled code that is difficult to maintain or switch between different AI
  models.

  - **The AI Agent Security Gap:** Allowing autonomous AI coding tools to
  manipulate an application runtime without standard interfaces or a
  "human-in-the-loop" approval process introduces severe architectural,
  security, and quality compliance risks.

solution: >+
  The solution demonstrates a standardized, enterprise-ready architecture for
  Java-based AI development by integrating three core pillars:


  1. **Quarkus + LangChain4j as the Runtime Foundation:** Quarkus provides a
  lightweight, cloud-native Java runtime optimized for fast startup and low
  memory footprints. Through the Quarkus LangChain4j extension, developers use
  declarative, annotation-driven programming models to embed AI capabilities
  (like connecting to local Ollama or IBM Granite models) using standard
  Dependency Injection (CDI).

  2. **Model Context Protocol (MCP) for Standardization:** Instead of building
  custom integrations, the architecture utilizes the `quarkus-agent-mcp` server.
  MCP acts like a "USB-C port" for AI, establishing a clean contract between the
  AI agent and the application. It exposes tools that allow the agent to safely
  bootstrap projects, manage application status, run tests, and index
  version-aware Quarkus documentation.

  3. **IBM Bob as the Agentic Co-Pilot:** Implemented with specialized modes and
  extension skills, IBM Bob orchestrates code updates, automates the TDD
  (Test-Driven Development) workflow, and hooks directly into the Quarkus Dev
  UI/Dev Services. Bob can autonomously write or refactor code while respecting
  security boundaries and requiring human validation before committing changes.

business-value: |+
  - Preservation of Existing Java Investments
  - Accelerated Time-to-Market (Developer Velocity)
  - Future-Proof and Model-Agnostic Architecture
  - Enhanced Governance and Cost Control

tech-stack:
  - IBM Bob
lab: https://github.com/IBM/bob-demo/tree/main/quarkus-ai-integration
---
The `quarkus-ai-integration` module demonstrates an enterprise-grade, end-to-end business use case: **building and deploying an intelligent, context-aware Virtual Assistant that interacts with transactional business data.** In a real-world scenario—such as a banking assistant handling loan applications or an e-commerce bot checking inventory—the application uses **Quarkus and LangChain4j** to build the user-facing AI chat feature. This assistant doesn't just generate generic text; it connects to live enterprise databases via **Retrieval-Augmented Generation (RAG)** and performs actual tasks (like updating a record) using secure **Function Calling**.

Crucially, the use case also demonstrates how an autonomous AI coding agent (**IBM Bob**) works behind the scenes alongside the developer. Instead of manually writing complex code to connect the AI assistant to specific databases or security rules, the developer uses IBM Bob to automatically generate the integration logic, wire up the database tools, and test the conversational flows, turning a multi-week development cycle into a structured, assisted session.