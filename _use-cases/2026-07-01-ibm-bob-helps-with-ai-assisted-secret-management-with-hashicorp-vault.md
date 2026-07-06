---
id: d71bcefa-0a54-4aad-97b7-7c45cf75de94
title: IBM Bob helps with AI-Assisted Secret Management with Hashicorp Vault
asset-owner: Ahmed.Azraq@ibm.com
team: Other
type: Technical
domain: Automation
problem: >+
  Software engineering teams frequently fight against "credential leakage" and
  improper secrets management during fast-paced development cycles:


  - **The Vulnerability of Hardcoded Secrets:** Developers under pressure often
  temporarily embed raw API keys, passwords, or connection strings directly
  inside source code components (such as a REST controller utility). If
  accidentally pushed to version control, these keys expose the enterprise to
  credential theft and malicious exploits.

  - **High Complexity of Security Tooling Onboarding:** Implementing dedicated
  secrets managers like HashiCorp Vault is traditionally a slow, manual process.
  A developer has to figure out how to configure custom framework extensions
  (e.g., Quarkus Vault extensions), establish precise key-value (KV) storage
  mounts, and safely rewrite data-injection annotations.

  - **Disrupted Local Environments:** Moving secrets out of properties files
  often breaks a developer's local runtime debugging stream, adding friction and
  tempting developers to revert to insecure, plain-text habits on their local
  machines.

solution: >+
  Deploying IBM Bob inside the workspace environment creates an automated,
  continuous security remediation loop:


  - **Automated Code and Secret Auditing:** The developer initiates a project
  audit via Bob. The AI agent scans the repository files, automatically surfaces
  exposed credentials, and reports clear risk boundaries.

  - **Dynamic Vault Provisioning & Population:** Upon being pointed to a running
  development instance of HashiCorp Vault, Bob connects via an MCP server
  standard to dynamically mount safe secret paths and securely write the target
  API key into a Vault key-value store.

  - **Automated Dependency Injection and Refactoring:** Bob automatically
  updates the project's build files to pull the required security extensions,
  establishes the connection configurations mapping directly to the Vault path,
  and refactors the underlying Java source code. It modifies configuration
  annotations (e.g., `@ConfigProperty`) to seamlessly pull the secret string
  straight from the Vault layer at runtime instead of a hardcoded string.

  - **End-to-End Verification Testing:** Bob completes the workflow by
  triggering local curl commands and checking server logs to verify that data
  flows flawlessly and that the application successfully pulls assets from the
  authenticated Vault engine.

business-value: |+
  - Proactive Security Leak Mitigation
  - Drastic Reduction in Security Setup Overhead
  - Seamless, Secure Local Development Experiences
  - Standardized DevSecOps Alignment

tech-stack:
  - IBM Bob
  - Vault
demo: https://www.youtube.com/watch?v=wHBPHmz8F48
---
This use case demonstrates how an application developer utilizes **IBM Bob** as an AI security partner to detect, isolate, and remediate hardcoded credentials within an active software project. In this scenario, Bob performs a deep inspection of a Quarkus-based Java REST API codebase, flags an exposed API key, and outlines the associated security risks. Working dynamically with the developer's local development environment, Bob leverages a dedicated **HashiCorp Vault MCP server** to mount security engines, securely store the raw credentials, inject required frame dependencies, and rewrite the application properties and source code to inject secrets securely at runtime.