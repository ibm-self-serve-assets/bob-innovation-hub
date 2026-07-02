---
id: 186a2394-1f43-4e1c-8713-b54c404abe9a
title: IBM Bob- IBM i Convert fixed form RPG to free form RPG
asset-owner: anand.awasthi@in.ibm.com
team: Other
type: Technical
domain: Modernization
problem: >+
  Organizations seeking to modernize heritage core systems on IBM i encounter
  severe technical debt embedded inside old RPG code layouts:


  - **Obsolete and Messy Structures (O-Specs):** Ancient Fixed-Format RPG code
  heavily relies on Output Specifications (O-Specs) to format reports and
  screens. O-Specs do not exist in modern Free-Format RPG layouts, making direct
  automated conversions break down when encountering them.

  - **High Operational Translation Overhead:** Manually decoupling archaic
  structural blocks, building standalone external print drivers, and tracking
  indicator lines down to modern, column-free expressions requires meticulous
  attention to detail and consumes massive amounts of developer time.

  - **Compounding Code Unreadability:** Leaving massive, multi-decade-old fixed
  positioning inside production source files makes the core codebase
  unmaintainable for modern software engineers, cementing a heavy dependency on
  shrinking veteran talent pools.

solution: >+
  Deploying IBM Bob provides an intelligent, context-aware architectural
  compilation and refactoring framework:


  - **Contextual Modernization Instructions:** The developer initiates the
  conversion task while passing explicit design patterns to Bob, instructing the
  agent to break out any embedded O-Specs into external definitions.

  - **Automated Component Decoupling:** Bob crawls the Fixed-Format code block,
  identifies the O-Specs, extracts their underlying format rules, and constructs
  a completely clean, standalone modern **Print File** asset.

  - **Line-by-Line Logic Refactoring:** Bob parses through the core
  computational logic, stripping out the legacy output definitions entirely, and
  converts the procedural code line-by-line into fully modern Free-Format
  syntax.

  - **Clean-State Application Call Injection:** Bob hooks the new print assets
  seamlessly back to the main logic, replacing the deleted O-Spec blocks with
  standardized modern call directives to ensure functionality remains entirely
  identical.

business-value: |+
  - True Structural Modernization vs. Surface Level Tweak
  - Drastic Reduction in Migration Timelines
  - Workforce Accessibility
  - Zero-Regression Code Integrity

tech-stack:
  - IBM Bob
demo: https://www.youtube.com/watch?v=ojjinfQ2HLc
---
This use case demonstrates how an enterprise development team utilizes **IBM Bob** to handle advanced **Fixed-Format to Free-Format RPG conversion** on the IBM i platform, specifically addressing complex, deprecated code structures like **Output Specifications (O-Specs)**. Instead of executing a simple text-string replacement, the developer gives Bob architectural rules on how to modernly refactor the old layout. The AI agent reads the heritage code, extracts the archaic, embedded output printing configurations, isolates them into standalone modern **Print Files**, and automatically converts the main program logic line-by-line into clean, readable, fully Free-Format RPG syntax.