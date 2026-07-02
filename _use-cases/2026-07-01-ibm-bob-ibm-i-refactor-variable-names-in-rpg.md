---
id: 9e258eba-de67-4aae-9a37-3574ed09a6a6
title: IBM Bob- IBM i Refactor Variable names in RPG
asset-owner: anand.awasthi@in.ibm.com
team: Other
type: Technical
domain: Modernization
problem: >+
  Enterprise maintenance teams trying to update or debug core IBM i business
  logic are severely bottlenecked by ancient source code styling:


  - **Cryptic and Truncated Naming Standards:** Due to old compiler constraints,
  decades-old RPG applications are filled with obscure, short variable names.
  These names offer zero contextual clues regarding what data they actually
  hold.

  - **Hybrid Syntax Friction:** Many active production systems feature a messy
  combination of Fixed-Format and Free-Format structures, making manual sitewide
  search-and-replace refactoring incredibly risky, error-prone, and
  time-consuming.

  - **Risk of Breaking Database Schemas:** If a developer attempts a bulk rename
  manually, they run a high risk of accidentally renaming an externally
  described database field or a core file indicator, which instantly causes
  compiler failures and crashes production jobs.

solution: >+
  Deploying IBM Bob into the active engineering environment creates an
  intelligent, syntax-aware refactoring assistant:


  - **Hybrid Context Parsing:** Bob seamlessly reads through both Fixed-Format
  and Free-Format sections simultaneously, accurately interpreting variable
  definitions and program loops regardless of the syntax era.

  - **Targeted Program-Variable Isolation:** The developer explicitly configures
  Bob to isolate and rename *only* local program variables while automatically
  protecting database fields, file schemas, and external data structures from
  modification.

  - **Intelligent Lexical Renaming:** Bob maps the application's runtime usage
  to deduce intent and updates declarations and inline calculations
  systematically. For example, it replaces obscure labels like `x1` with
  expressive, professional names like `loop_counter` or `increment`.

  - **Refactoring Impact Summary:** Upon completion, Bob provides a transparent
  analytics log that itemizes every variable successfully modernized alongside a
  precise record of database fields left intentionally untouched for safety.

business-value: |+
  - Drastic Drop in Maintenance Lead Time
  - Safe, Non-Disruptive Modernization
  - Accelerated Developer Onboarding
  - Clean Code Foundation for Future Upgrades

tech-stack:
  - IBM Bob
demo: https://www.youtube.com/watch?v=4wtDCmVpi5k
---
This use case demonstrates how an application developer utilizes **IBM Bob** to autonomously refactor old, cryptic variable names within a legacy RPG program to make the codebase modern and easily readable. In this scenario, the developer is working with a typical enterprise IBM i application that features a hybrid mix of classic Fixed-Format and modern Free-Format RPG specifications. The developer instructs Bob to pinpoint, analyze, and rename internal program variables—transforming short, ambiguous characters into clear, human-readable terms—without altering the underlying business logic or breaking links to external database fields.