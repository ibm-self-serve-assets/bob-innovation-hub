---
id: b2dac189-9b60-4779-95fe-8ace6ef33beb
title: Quantum Safe Coding with Bob
asset-owner: stirouca@in.ibm.com
team: Service Engineering
type: Technical
domain: Security
problem: "The emergence of quantum computing introduces a new class of security
  risk for enterprises: **Quantum-vulnerable cryptography is embedded across
  applications, APIs, and data flows**. Many organizations today lack visibility
  into where these vulnerabilities exist or how to remediate them effectively as
  they modernize their application landscape. This Use-case showcases how
  enterprises can identify and address quantum security risks early in the
  development lifecycle by **using IBM Bob and IBM Quantum technology.**"
solution: IBM Bob, operating in Quantum Safe Explorer mode, analyzes application
  source code to detect quantum-related cryptographic risks, consolidates
  findings and uploads the data into Guardium Cryptography Manager (GCM) that
  got other IT assets data from tools like Nmap, Vault, Qualys, and Nessus,
  forming the **Discover and Inventory** layer. The platform then **Assesses and
  Complies** by identifying crypto vulnerabilities, mapping them to business
  criticality, and prioritizing remediation. As part of **Managing Lifecycle**,
  Guardium centrally manages cryptographic assets such as keys and certificates,
  while **Protect and Adapt** layer enables remediation and migration to
  post-quantum cryptography (PQC) standards. **IBM Bob** plays an important role
  in modernizing the existing source code to comply to PQC standards and use the
  same as a best practice in new code development by integrating the Guardium
  capabilities into CI/CD pipeline.
business-value: |+
  - Centralizes Cryptography - No blind spots
  - Hybrid approach - Assess Legacy and Post Quantum Risk
  - Current Compliance - Built to pass audits

tech-stack:
  - IBM Bob
  - Guardium
demo: https://www.youtube.com/watch?v=5HEAE8i09qM
mode: https://github.com/ibm-self-serve-assets/ibm-quantumsafe-bob-mode
slide_deck: /docs/slide_decks/Quantum_Safe_with_Bob.pdf
---
AI Meets Quantum Security: Discovering and Remediating Quantum Vulnerabilities in Enterprise Applications**.** This use case showcases Quantum Safe coding with IBM Bob, Quantum Safe Explorer and Guradium Crypto Manager.