---
id: 7031c16e-fa5a-45d8-ae61-9b81ad2ee2a7
title: From Diagram to deploy using bobshell
asset-owner: anand.awasthi@in.ibm.com
team: Other
type: Technical
domain: Automation
problem: DevOps engineers are frequently tasked with translating complex
  architecture diagrams and text-based network/software requirements into code.
  Manually writing Terraform scripts to provision cloud networks (like VPCs,
  subnets, and servers) and writing Ansible playbooks for software configuration
  can be time-consuming, prone to syntax or logic errors, and tedious.
  Furthermore, ensuring that the generated code strictly adheres to industry
  best practices—such as keeping variables, configurations, and core code
  properly modularized and separated—adds extra overhead and slows down
  deployment cycles.
solution: >+
  The solution introduces **Bobshell**, an automation utility that accepts
  architectural requirements and generates production-ready code blocks
  following a clear execution plan:


  - **Automated Analysis:** It evaluates the inputted requirements and creates a
  sequential to-do list for code generation.

  - **Terraform Provisioning:** It builds out the complete infrastructure code
  required to set up the network components (web server and backend database)
  for a two-tier application.

  - **Ansible Configuration:** It writes the configuration management code
  needed to set up and manage the software environments on those servers.

  - **Best Practice Adherence:** The tool automatically structures the files
  appropriately, isolating variables and operational configurations from the
  primary code logic.

business-value: |+
  - Accelerated Time-to-Market
  - Standardization and Quality Control:
  - Increased Engineering Efficiency

tech-stack:
  - IBM Bob
demo: https://www.youtube.com/watch?v=flo7L7rVvKw
---
This use case demonstrates how a DevOps engineer can leverage an AI-powered assistant called **Bobshell** to automate the creation of Infrastructure as Code (IaC) and configuration management scripts. Starting from a provided architecture diagram and a list of specific requirements, the tool automatically generates fully structured Terraform and Ansible configurations to quickly move a two-tier web application from the planning phase straight to deployment readiness.