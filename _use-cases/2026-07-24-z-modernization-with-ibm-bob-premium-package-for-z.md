---
id: bf538ab9-98e1-4cfe-8b1f-4baf8328cfc4
title: Z-modernization with IBM Bob Premium Package for Z
asset-owner: anand.awasthi@in.ibm.com
team: Other
type: Technical
domain: Modernization
premium_package: Z
problem: >+
  Enterprise Z applications present unique challenges that generic AI models are
  fundamentally unequipped to handle:


  - **Context gap at scale** — A real Z application spans thousands of programs
  and millions of lines of code. Any AI model only ever sees a small slice at a
  time, missing the broader application context needed to make safe, accurate
  recommendations.

  - **Cryptic legacy naming conventions** — Variable and program names (e.g.,
  `VOFILE`, `PGMTOX001`, `WK10QUDIST`) originate from 1980s conventions
  understood only by retiring developers. A generic model cannot infer business
  meaning from these names.

  - **Tribal knowledge locked outside the model** — Critical business logic
  lives in data dictionaries and institutional knowledge that no general-purpose
  AI has ever been trained on.

  - **Multi-language complexity** — Z codebases combine COBOL, PL/1, Assembler,
  REXX, JCL, SQL, CICS, and IMS, each with shop-specific standards the model
  cannot know.

  - **Dynamic call resolution failures** — Static file-based search tools like
  `grep` miss programs that are called via dynamic variable calls in COBOL,
  leading to incomplete and dangerously wrong impact analysis. In the demo, a
  generic agent found only 21 dependent files while the Premium Package found 40
  — a gap with real production risk.

  - **Asymmetric risk** — On mission-critical mainframe workloads, a wrong
  refactor does not just break a side project; it can bring down a bank's entire
  batch run. A confident wrong answer from AI is worse than no answer at all.

solution: >+
  IBM Bob's Premium Package for Z addresses the context problem through four
  core capabilities demonstrated in the use case:


  1. **At-Scale Visibility** — Metadata that spans the entire application, not
  just the open workspace. Bob can identify all dependent programs — including
  those missed by `grep` — by querying structured SQL metadata about program
  relationships. In the demo, this surfaced 40 programs dependent on a single
  utility file vs. 21 found by the generic agent.

  2. **Z Domain Expertise** — The agent is explicitly configured for z/OS with
  an IBM-curated Z RAG that integrates knowledge of CICS, IMS, JCL, and
  Z-specific conventions directly into every chat session.

  3. **Data-Driven Recommendations** — Deterministic metadata lookups are
  executed before the model is asked to fill in gaps, eliminating hallucinated
  interpretations of unknown variable names or program structures.

  4. **Data Dictionary Tooling** — A built-in skill walks through reading source
  files, generating enriched data dictionaries for opaque variable names (e.g.,
  `AT-IN119-DATE`), and presenting them for human review and sign-off before any
  code changes proceed.

  5. **Design-First, Code-Next Principle** — The package produces intermediate
  artefacts such as spec files, impact reports, and data models for human
  consumption and approval before code is ever generated.

business-value: |+
  - Reduced code archaeology time
  - Safer impact analysis
  - Modernisation without context loss
  - Higher reproducibility
  - Risk mitigation on mission-critical workloads

tech-stack:
  - IBM Bob
demo: https://ibm.seismic.com/Link/Content/DCm22D3JH4m9g8QTqmQFhH7GPD4P
---
IBM Bob's **Premium Package for Z** is a purpose-built AI extension for mainframe developers working in z/OS environments. Unlike generic AI assistants, it provides application-wide context, Z domain expertise, and orchestrated multi-step workflows — directly within the Bob IDE experience. It includes two specialised modes: **Z Code mode** and **Z Architect mode**, equipped with deterministic metadata lookups, IBM-curated Z RAG (covering CICS, IMS, JCL), data dictionary management, and a design-first approach that produces intermediate artefacts (spec files, impact reports, data models) before any code is written.