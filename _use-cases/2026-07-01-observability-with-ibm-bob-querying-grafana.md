---
id: 2a843e7b-4709-498d-ad19-45883f448681
title: "Observability with IBM Bob: Querying Grafana"
asset-owner: anand.awasthi@in.ibm.com
team: Other
type: Technical
domain: Automation
problem: >+
  Developers often need to monitor how their applications behave in
  pre-production or production environments using tools like Grafana,
  Prometheus, and Loki. However, this introduces several pain points:


  - **Context Switching:** Teams must constantly jump back and forth between
  their code/IDE and external monitoring systems.

  - **Complex Query Languages:** Gathering specific telemetry requires writing
  complex queries like PromQL (for Prometheus) or LogQL (for Loki).

  - **Data Interpretation:** Reviewing raw log outputs or metric graphs across
  multiple microservices can be tedious and time-consuming during
  troubleshooting or morning routine checks.

solution: >+
  IBM Bob acts as an AI interface layer connected directly to the Grafana
  instance. It offers the following capabilities:


  - **Incident Management Checks:** Developers can ask conversational questions
  like *"Can you please find all the incidents?"* to get an instant system
  status.

  - **Automated Metric Queries:** The AI can look up a dashboard by name,
  formulate the appropriate PromQL queries automatically, pull specific
  telemetry (such as JVM heap memory usage), and present a concise summary of
  the data.

  - **Deep Linking & Screenshotting:** Bob can automatically generate deep links
  directly to specific Grafana panels, eliminating manual navigation.

  - **Log Aggregation & Summarization:** Developers can query logs by specific
  criteria across multiple services (e.g., pulling error or warning logs). Bob
  fetches the logs via Loki and provides intelligent summaries of what the
  application events mean (e.g., profiling startup times or metric publishing),
  filtering down to metadata like hostname and framework version.

business-value: |+
  - Increased Developer Productivity
  - Lower Technical Barrier
  - Faster Mean Time to Resolution (MTTR)

tech-stack:
  - IBM Bob
demo: https://www.youtube.com/watch?v=R1SI4fovqWg
featured: 41
---
The use case demonstrates how developers can leverage **IBM Bob**, an AI assistant, integrated with **Grafana** using a Model Context Protocol (MCP) server. Instead of navigating separate monitoring and logging dashboards, developers can interact with Bob via natural language within their existing development environment to query application metrics, look up active incidents, fetch logs, and interpret observability data.