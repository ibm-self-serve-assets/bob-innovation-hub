---
id: 1f9b4c32-9f1e-4b26-b7bd-94d701ba055e
title: Maximo Job Plan Management via MCP
asset-owner: sujamoha@in.ibm.com,ssnarasi@in.ibm.com
team: Service Engineering
type: Technical
domain: Automation
problem: |-
  Manual job plan creation, updates, and queries in IBM Maximo

  Bulk import is time-consuming and error-prone

  Requires technical knowledge for API interactions

  Leads to slower maintenance planning and higher effort
solution: >-
  The **Maximo Job Plan MCP Server** extends IBM Maximo by exposing its **Job
  Plan Management** capabilities through the **Model Context Protocol (MCP)**,
  enabling AI assistants such as **IBM Bob** to interact with Maximo using
  natural language.


  The solution acts as a secure bridge between IBM Bob and Maximo, exposing
  Maximo APIs as standardized MCP tools. Instead of navigating multiple Maximo
  screens or manually invoking APIs, maintenance planners and operations teams
  can simply ask conversational questions or request actions to manage job
  plans.


  The MCP Server provides secure connectivity to Maximo using API-based
  authentication and enables real-time access to key job plan management
  capabilities, including:


  - Importing job plans in bulk from CSV files

  - Listing and filtering job plans using OSLC queries

  - Retrieving detailed job plan information

  - Deleting obsolete or test job plans


  When a user submits a request through IBM Bob, the AI assistant invokes the
  appropriate MCP tool, which communicates directly with the Maximo Job Plan
  APIs and returns real-time information or executes the requested operation.
  This simplifies maintenance planning, reduces manual effort, and enables users
  to manage job plans without requiring deep knowledge of the Maximo user
  interface or APIs.


  By exposing Maximo Job Plan Management as reusable MCP tools, the solution
  accelerates maintenance operations, improves planner productivity, and
  provides a foundation for AI-driven maintenance workflows and intelligent
  asset management.
business-value: |-
  Improves efficiency by eliminating manual processes

  Enables natural language access for business users

  Accelerates job plan creation and retrieval

  Provides scalable foundation for AI-driven automation
tech-stack:
  - IBM Bob
  - Maximo
architecture_diagram: /docs/diagrams/Arch.jpg
lab: https://github.com/ibm-self-serve-assets/Bob-driven-Integration-for-Maximo-via-MCP
slide_deck: /docs/slide_decks/Maximo_jobplanManagement.pdf
---
See how to use Model Context Protocol (MCP) to interact with IBM Maximo for job plan management.