---
id: 35455a96-0940-439c-915f-f4ccf6285f3e
title: Use IBM Bob and Sterling MCP server for supply chain management
asset-owner: sujamoha@in.ibm.com
team: Service Engineering
type: Business
domain: SupplyChain
problem: >-
  Enterprise users rely on IBM Sterling OMS to manage orders, inventory, and
  shipments, but accessing this information typically requires navigating
  multiple OMS screens, understanding complex APIs, or involving technical
  teams. Business users and customer service representatives cannot easily
  retrieve operational insights or perform actions using natural language,
  resulting in slower decision-making, longer resolution times, and increased
  operational effort.


  There is a need for a secure, AI-driven interface that enables users to
  interact with Sterling OMS conversationally while allowing AI assistants to
  retrieve real-time business data and execute OMS operations through a
  standardized integration framework.
solution: >-
  The **Sterling OMS MCP Server** extends IBM Sterling Order Management by
  exposing its business capabilities through the **Model Context Protocol
  (MCP)**, enabling AI assistants such as **IBM Bob** to securely interact with
  Sterling OMS using natural language.


  The solution acts as a bridge between IBM Bob and Sterling OMS by exposing OMS
  APIs as standardized MCP tools. Instead of navigating multiple OMS screens or
  manually invoking APIs, users can simply ask business questions or request
  actions in conversational language.


  The MCP Server provides secure, certificate-based connectivity to Sterling OMS
  and offers real-time access to key business functions, including:


  - Order Management (create, retrieve, update, and cancel orders)

  - Inventory Management (check inventory levels and product availability)

  - Shipment Management (track shipments and monitor deliveries)

  - Product Search and Information


  When a user submits a request in IBM Bob, the AI assistant invokes the
  appropriate MCP tool, which communicates directly with Sterling OMS APIs and
  returns live business data. This enables business users, customer service
  representatives, and operations teams to retrieve information and perform OMS
  operations without requiring technical expertise.


  By standardizing OMS capabilities as reusable MCP tools, the solution
  simplifies AI integration, improves operational efficiency, reduces manual
  effort, and lays the foundation for intelligent, agentic workflows across the
  order management lifecycle.
business-value: >+
  - Faster Operations: Enables users to retrieve orders, inventory, and shipment
  information through natural language, reducing the time spent navigating OMS
  screens and APIs.

  - Improved Productivity: Automates common OMS tasks such as order lookup,
  inventory checks, and shipment tracking, allowing business and support teams
  to focus on higher-value activities.

  - Real-Time Decision Making: Provides live access to Sterling OMS data,
  helping operations teams respond quickly to customer inquiries, inventory
  issues, and fulfillment exceptions.

  - Foundation for Agentic AI: Exposes OMS capabilities as standardized MCP
  tools, enabling IBM Bob and future AI agents to execute intelligent, automated
  workflows across the order management lifecycle.

tech-stack:
  - IBM Bob
  - Sterling OMS
lab: https://github.com/ibm-self-serve-assets/sterling-oms-mcp-server
---
Use IBM Bob to interact with **Sterling Order Management System (OMS)** for order management, inventory tracking, shipment monitoring, and analytics.