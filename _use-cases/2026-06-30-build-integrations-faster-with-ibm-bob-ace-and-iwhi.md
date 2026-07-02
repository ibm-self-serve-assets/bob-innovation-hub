---
id: 5ff8eea1-b7d3-43d9-9737-f3b15819b435
title: Build Integrations Faster with IBM Bob, ACE and IWHI
asset-owner: anand.awasthi@in.ibm.com
team: Service Engineering
type: Technical
domain: Automation
problem: >+
  Modern enterprise environments demand rapid development and deployment of
  complex integration projects to stay competitive. However, integration
  development teams face significant roadblocks:


  - **Slow Time-to-Market:** Traditional hand-coding of message flows, subflows,
  and ESQL logic within enterprise service buses like App Connect Enterprise is
  time-consuming and manual.

  - **Inconsistent Standards:** Ensuring that newly generated integration code
  strictly adheres to corporate architecture, security compliance, and
  organizational patterns requires tedious review processes.

  - **Governance and Silos:** When developers use decentralized AI coding tools
  or local testing environments, the resulting artifacts often lack the
  centralized visibility, lifecycle management, and auditability required by
  hybrid-cloud enterprise IT strategies.

solution: >+
  The solution addresses these challenges by merging generative AI with
  enterprise-grade development and control standards through three core phases:


  1. **AI-Driven Code Generation via Custom Modes:** The developer utilizes the
  Bob IDE running a tailored *ACE Developer mode* (incorporating the `ace-bob`
  skill). By providing a natural language prompt detailing specific API
  behaviors—such as exposed HTTP methods, query parameters, and backend URLs—IBM
  Bob automatically designs the plan, sets up the todo list, and generates the
  underlying ACE artifacts (message flows, subflows, and ESQL code).

  2. **Local Validation:** The generated project is verified locally. Developers
  can effortlessly import the AI-built `WeatherAPI` project directly into the
  standard *App Connect Enterprise Toolkit* to validate its structure, inspect
  endpoints, and conduct local curl-based testing.

  3. **Centralized Hybrid Management (Optional):** To eliminate operational
  silos, the integration server is registered with the *IBM webMethods Hybrid
  Integration (IWHI) Hybrid Control Plane*. This allows the compiled BAR file to
  be securely deployed, governed, and audited from a single, centralized
  administrative dashboard across hybrid cloud environments.

business-value: |+
  - Accelerated Integration Delivery
  - Enforced Enterprise Compliance
  - Unified Governance & Visibility
  - Reduced Developer Friction

tech-stack:
  - IBM Bob
  - webMethods Hybrid Integration
  - IBM App Connect
architecture_diagram: /docs/diagrams/sol_arch.png
demo: https://www.youtube.com/watch?v=UcbTj7bOGKs
lab: https://github.com/ibm-self-serve-assets/bob-ace-integration-lab
mode: https://github.com/ibm-self-serve-assets/ibm-ace-bob-mode
skill: https://github.com/ot4i/ace-bob
featured: 1
---
This use case demonstrates an end-to-end, AI-assisted integration workflow leveraging **IBM Bob** (configured with a specialized **ACE Developer custom mode**) alongside **IBM App Connect Enterprise (ACE) v13**.

In this scenario, an integration developer utilizes IBM Bob's chat interface inside the Bob IDE to automatically generate, build, and locally test a production-ready REST API. The generated API connects to an open-source backend weather service to expose two distinct endpoints (`/weather/current` and `/weather/alerts`). The solution also demonstrates an optional enterprise-grade governance extension where the completed App Connect Enterprise BAR (Broker Archive) file is deployed, monitored, and managed via the **IBM webMethods Hybrid Integration (IWHI) Hybrid Control Plane**.

