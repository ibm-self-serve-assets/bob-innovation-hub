---
id: 26c32319-bb00-48d6-8d40-cb6938ad49c5
title: IBM JSphere Suite for Java & IBM Bob Java Premium Package
asset-owner: anand.awasthi@in.ibm.com
team: Service Engineering
type: Technical
domain: Modernization
premium_package: Java Modernization
problem: "Enterprises running mission-critical applications on Java 8 or earlier
  face mounting security exposure — many open-source libraries no longer support
  the runtime, and unpatched vulnerabilities are an active attack vector. At the
  same time, monolithic, non-cloud-native architectures slow feature delivery,
  and technical debt drives an estimated $2.4T+ per year in security,
  operational, and project failures. WebSphere Application Server (WAS)
  customers are especially exposed: WAS has not supported Java 17+ until now,
  leaving millions of apps stranded on an unsupported runtime, while 66% of
  application spending is projected to shift to cloud by 2025 and 84% of
  organizations rate modernization as a top priority for the next 2–3 years."
solution: "IBM JSphere Suite for Java, paired with IBM Bob, provides an
  automated path from Maintain to Modernize & Migrate to Innovate. The
  Application Modernization Accelerator (AMA) performs automated, rule-based
  scanning and refactoring for large-scale code analysis and migration, built on
  106+ recipes co-created with the OpenRewrite project plus proprietary recipes
  (e.g., JAX-RPC to JAX-WS) and 40+ AI-assisted fix prompts for complex
  migration issues. Enterprise Application Runtimes (EAR) give customers a
  target runtime for the migration: Liberty (cloud-native, full-featured Java
  runtime) for apps moving off WAS, WebLogic, or Tomcat; MoRE (Modernized
  Runtime Extension for Java) for Liberty plus traditional admin controls; and
  an enterprise build of Quarkus for new cloud-native, AI-ready application
  development. Library Support for Spring and Struts extends coverage beyond
  WAS-based estates, and IBM Bob is offered as a premium companion package."
business-value: >+
  - **Hybrid Agentic Automation:** Blending 100% precise OpenRewrite AST
  transformations with targeted LLM reasoning for complex WebSphere
  SPIs—lowering cost and eliminating hallucination risk.

  - **Native AMA Integration:** Direct ingestion of enterprise binary scans into
  Bob's context window, converting architecture policies into IDE-level
  execution.

  - **Purpose-Built Workflows:** A standardized, repeatable pipeline across all
  development teams.

  - **Enterprise Multi-Model Governance:** Decoupled specialized models with
  zero data retention for complete IP protection.

tech-stack:
  - IBM Bob
  - JSphere Suite for Java
demo: https://www.youtube.com/watch?v=SKFSqY1wfEE
slide_deck: /docs/slide_decks/Java_modernization.pdf
---
This use-case describes IBM's approach to modernizing enterprise legacy Java applications — primarily targeting existing WebSphere Application Server (WAS)/WebLogic/JBoss/Tomcat customers — using the automated scanning, refactoring, and AI-assisted migration tooling in IBM JSphere Suite for Java, together with IBM Bob.