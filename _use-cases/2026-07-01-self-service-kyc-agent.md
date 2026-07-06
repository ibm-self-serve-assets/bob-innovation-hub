---
id: 116742f9-5bdc-4c8a-9309-0ce8fc32c586
title: Self-service KYC Agent
asset-owner: manoj.jahgirdar@in.ibm.com
team: Service Engineering
type: Business
domain: BFSI
problem: >+
  When a user requests to open a bank account, Know you customer (KYC) needs to
  be done to identify customer risk. Front office, mid office and back office
  spend manual efforts on identifying the customer and creating customer risk
  profile and performing extended due diligence.

solution: >+
  - Document extraction workflow: Deterministic agentic workflow to extract PII
  from Aadhaar, DL & PAN cards. (can be extended to other documents)

  - CDD risk profile: AI Agent reasons through to perform customer due diligence
  and provides report

  - EDD risk profile: If CDD is flagged high risk, extended due diligence is
  performed automatically.

business-value: >+
  - Extract PII from the uploaded documents accurately with multi-modal LLMs.

  - Efficiently generate a detailed report for customers risk profile including
  adverse news, PEP, extended due diligence, etc

  - Front office job such as application submission and identifying customer can
  be easily done by the agentic workflow.

  - Mid office job such as identity verification customer due diligence and
  extended due diligence can be handled by agent’s reasoning

tech-stack:
  - IBM Bob
  - watsonx Orchestrate
architecture_diagram: /docs/diagrams/Picture1.png
lab: https://ibm.github.io/select-t-partner-market-launchpad/tracks/track-01/labs/lab-301/financial-services/self-service-kyc/lab-guide/
slide_deck: /docs/slide_decks/self-service kyc agent.pdf
---
In the financial services industry, Know Your Customer (KYC) compliance is critical but often time-consuming. The Self-service KYC Agent streamlines customer onboarding by automating identity verification, document validation, and compliance checks.