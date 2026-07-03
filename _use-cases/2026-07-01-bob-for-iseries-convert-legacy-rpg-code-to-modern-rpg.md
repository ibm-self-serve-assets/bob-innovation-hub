---
id: c6462ca8-58e7-49ce-af35-564cd107b962
title: "Bob for iSeries: Convert legacy RPG code to modern RPG"
asset-owner: Brunda.Reddy@ibm.com
team: Other
type: Technical
domain: Modernization
problem: >+
  When enterprises transition from manual code refactoring to automated
  AI-assisted modernization, they face operational friction at the onset of the
  project:


  - **Toolchain Disconnect:** Organizations frequently struggle to bridge the
  gap between emerging generative AI tools and standard legacy development
  environments, creating workflow silos that prevent developers from adopting
  automated solutions.

  - **Lack of a Validated Workflow Blueprint:** Injecting an AI agent blindly
  into thousands of undocumented production files without a baseline
  verification step introduces severe operational risks, potentially breaking
  critical business logic during bulk code transformations.

  - **Developer Resistance and Friction:** In-house development teams are often
  skeptical of AI-generated code quality. Without a clear, hands-on framework to
  pilot, benchmark, and evaluate the AI's structural outputs on simple test
  cases, wide-scale adoption stalls.

solution: >+
  The onboarding and validation workflow defined by the lab provides a
  structured, secure launchpad for modernization:


  - **Workspace and Environment Integration:** The development team sets up a
  unified workspace, ensuring IBM Bob is integrated with native IBM i source
  physical file systems (`QSYS.LIB`) and standard modern IDE tools, creating a
  frictionless interface for the developers.

  - **Controlled Pilot Benchmarking (Lab 1 Focus):** Before touching complex
  system arrays, developers utilize Bob to execute a targeted, deterministic
  conversion on fixed-format source code. The AI transforms column-restricted
  layouts into clean, modern Free-Format specifications while maintaining
  identical compilation variables.

  - **In-Place Structural Verification:** Developers directly review the output
  code side-by-side against the legacy baseline within their established
  environment, validating that the AI perfectly preserves execution parameters
  before rolling out bulk automated tasks.

business-value: |+
  - Risk Mitigation via Controlled Execution:
  - Frictionless Developer Adoption
  - Standardized Engineering Toolchain
  - Proven ROI on Modernization Tooling

tech-stack:
  - IBM Bob
lab: https://github.com/bmarolleau/IBM-i-Application-Modernization-with-Bob/blob/main/lab00_ibm-bob-ibmi-labs.md#lab-1-rpg-fixed-to-free-conversion
---
This use case outlines the foundational setup, preparation, and pilot phase executed by an enterprise IT department adopting **IBM Bob** to drive large-scale, automated application modernization initiatives on the IBM i platform. It details how engineering teams establish a standardized workspace sandbox, configure essential local environment tooling (such as Visual Studio Code extensions for IBM i or Rational Developer for i), and execute their first benchmark validation test using Lab 1: RPG Fixed-to-Free Conversion. By systematically proving out the toolchain on a controlled set of legacy column-specific Fixed-Format RPG source members, the organization validates the AI agent's accuracy and establishes a repeatable blueprint for company-wide code modernization.