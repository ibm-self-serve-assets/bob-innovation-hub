---
id: 93dc1001-c77d-44db-8eca-285b2890e6f3
title: IBM Bob - IBM i Generates Comments for Fixed Form RPG Programs
asset-owner: anand.awasthi@in.ibm.com
team: Other
type: Technical
domain: Modernization
problem: >+
  Enterprise engineering teams attempting to maintain or troubleshoot heritage
  core business logic are heavily stalled by undocumented legacy codebases:


  - **The "No-Comment" Legacy Reality:** The vast majority of
  production-critical Fixed-Format RPG programs running today were built decades
  ago with minimal to absolutely no inline documentation or commentary
  explaining why the logic was constructed.

  - **Archaic Code Comprehension Gaps:** Because Fixed-Format RPG relies on
  strict column alignments and truncated variable parameters rather than
  readable English commands, contemporary developers cannot easily decipher what
  a specific section of the program is executing.

  - **Massive Maintenance and Triage Lag:** When an application error occurs or
  a business logic rule needs updating, engineers must spend hours manually
  reversing the dense syntax just to locate the correct block of code,
  drastically slowing down software delivery and system triage.

solution: >+
  Deploying IBM Bob inside the active development terminal establishes a
  localized, intelligent code-annotation assistant:


  - **Deep Codebase Inspection:** The developer commands Bob to inspect the
  legacy program. Bob reads the entire structure to build an absolute functional
  map of the file, analyzing individual variable structures and data
  manipulation loops.

  - **Inline Comment Injection:** Upon receiving explicit developer permission,
  Bob steps through the code line-by-line and dynamically synthesizes clear,
  concise, and accurate documentation strings directly above or beside the dense
  Fixed-Format statements, creating a clear "before-and-after" visibility
  transformation.

  - **Interactive Human-in-the-Loop Validation:** Bob hands control back to the
  programmer to review the newly injected commentary. If a complex enterprise
  rule needs closer clarification, the developer can request iterative
  adjustments from Bob before finalizing the source member.

  - **Automated Action Reporting:** Bob concludes the compilation process by
  outputting a precise documentation summary log outlining exactly what
  variables, logic steps, and entry paths were processed and annotated.

business-value: |+
  - Instant Demystification of Legacy Intellectual Property
  - Drastic Reduction in Technical Discovery Time
  - Accelerated DevSecOps and Onboarding Velocity
  - Zero-Risk In-Place Modernization

tech-stack:
  - IBM Bob
demo: https://www.youtube.com/watch?v=JIB47ne0w8M
---
This use case outlines how an application developer or maintenance engineer uses **IBM Bob** to automatically analyze and insert meaningful, human-readable documentation directly inside legacy **Fixed-Format RPG** source files. In this scenario, the developer directs Bob to scan a completely undocumented, column-specific RPG/RPG II program inside their local development workspace. Operating line-by-line, Bob functions as a code analysis partner, breaking down archaic variable definitions, input/output sections, and procedural indicators to inject descriptive context comments inline without modifying the operational mechanics of the code.