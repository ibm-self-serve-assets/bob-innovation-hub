---
id: 81c66a11-8e59-42b0-ace6-fe2eefed385e
title: Bob Self Hosted on OpenShift (Deployment Guide)
asset-owner: Suyash.Gupte2@ibm.com
team: Service Engineering
type: Technical
domain: Security
problem: Some organizations can't use a SaaS-hosted AI coding assistant. They
  may be bound by data residency, regulatory, security or air-gap requirements.
  They still want the productivity benefits of IBM Bob. They also need to choose
  their own LLM backend, control how their users sign in, and keep source code
  and prompts inside their own network.
solution: >+
  This repository provides an end-to-end, phased guide plus automation for a
  self-hosted Bob installation.


  1. **Prepare**
    - Provision an OpenShift 4.20+ cluster with 3 worker nodes of 16 vCPU × 64 GB each.
    - Verify the workstation tools: `oc`, Helm 3.14+ and openssl.
    - Obtain the IBM entitlement key.
    - Check registry reachability and storage classes.
    - Write `config.yaml` and `model-gateway.yaml`. Starter NVIDIA Nemotron templates are included.
  2. **Install**
    - Install cert-manager.
    - Apply the cluster-scoped resources with `bobctl generate-cluster-resources`.
    - Create the entitlement pull secrets and run an image pull smoke test.
    - Run `bobctl install`, which takes about 10–20 minutes.
  3. **Post-install**
    - Verify the operator and instance pods.
    - Extract the self-signed CA certificate.
    - Set the bootstrap admin password in Keycloak.
    - Add users, through local accounts, LDAP/AD or w3id SSO.
  4. **Clients**
    - Point Bob Shell 2.x and Bob IDE at the gateway URL.
    - Trust the CA certificate.
    - Run the end-to-end test: `bob --accept-license run "Hello"`.

  The repository also includes these supporting resources:


  - Helper
  scripts: `bob-autoinstall.sh`, `bob-cleanup.sh`, `package-client-kit.sh` and
  the client setup scripts.

  - Day-2 operations commands.

  - An air-gapped install guide.

  - A model inferencing troubleshooting guide.

  - Architecture diagrams.

business-value: >+
  - **Data control:** Source code and prompts stay inside the customer's own
  OpenShift environment.

  - **Compliance:** The air-gapped install option covers regulated and
  disconnected environments.

  - **Faster time to value:** A script-driven install cuts what would be a
  multi-day manual effort down to roughly 10–20 minutes for the core install,
  plus preparation time.

  - **LLM flexibility:** Customers choose their own model backend through the
  model gateway, with starter templates for NVIDIA Nemotron.

  - **Enterprise identity:** Keycloak with SSO (OIDC), LDAP and Active Directory
  integration fits existing identity management.

  - **Repeatable operations:** Documented scripts for install, client rollout,
  cleanup and day-2 operations reduce risk and support effort.

  - **Consistent developer experience:** Bob Shell and Bob IDE share one gateway
  configuration, so rollout is the same for both.

tech-stack:
  - IBM Bob
  - Red Hat OpenShift
architecture_diagram: /docs/diagrams/logical-architecture.svg
lab: https://github.com/ibm-self-serve-assets/bob-self-hosted-guide
---
This use case shows how to deploy IBM Bob on-premises on a Red Hat OpenShift cluster with the `bobctl` CLI. The deployment has three parts:

- Install the Bob platform.
- Connect it to an LLM backend, such as NVIDIA Nemotron, through a model gateway.
- Configure Bob Shell and Bob IDE clients to use the on-prem gateway.

