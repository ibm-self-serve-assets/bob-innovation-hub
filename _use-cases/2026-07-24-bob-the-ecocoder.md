---
id: 17c6b00b-3530-4931-9f57-d1cd14bdc728
title: Bob- The EcoCoder
asset-owner: anand.awasthi@in.ibm.com
team: Service Engineering
type: Technical
domain: Automation
problem: "Enterprises face three converging inefficiencies: legacy production
  code silently burns compute and carbon with no visibility on any ESG
  dashboard; AI code generators now ship functionally-correct-but-inefficient
  code at machine speed; and infrastructure optimization infrastructure tools
  like IBM Turbonomic can only resize around inefficient code — they can't open
  a source file to fix the root cause. Nobody today can answer \"which function
  is causing this resize, and what does it cost in dollars and carbon?\""
solution: >-
  EcoCoder is a set of Bob skills that bring carbon and cost visibility directly
  into the developer and platform-engineering workflow. A **Green Plan Review**
  skill runs during plan mode, before code is written, flagging unexamined
  architectural defaults — polling instead of webhooks, always-on services for
  periodic work, unbounded data retention — with defensible impact multipliers,
  and records each decision as an ADR.


  A **EcoCoder** skill scans existing codebases against 18 known waste patterns
  (N+1 queries, unbounded caches, full-file loads, missing batching, etc.),
  connects to a Turbonomic MCP server to pull real utilization data and pending
  resize actions, and correlates those actions with the specific code
  responsible for them. It computes energy and carbon impact using the Cloud
  Carbon Footprint methodology, then — on explicit approval — applies fixes in
  agent mode with test-gating, and predicts the resulting footprint reduction
  and the expected change in Turbonomic's recommendation.
tech-stack:
  - Turbonomic
  - Red Hat OpenShift
  - IBM Bob
skill: https://github.ibm.com/syedame1/EcoCoder/tree/main/.bob/skills
slide_deck: /docs/slide_decks/Bob-eco-coder.pdf
---
Enterprises spend millions on cloud bills and ESG compliance but developers write code completely blind to the carbon and cost impact of every function they ship. Three crises are converging: legacy code silently burning resources in production, AI-generated code shipping new inefficiencies at machine speed, and infra teams stuck resizing around code they can't touch. EcoCoder is the missing layer bringing carbon and cost visibility directly into the IDE, at the source, before the code ever ships.