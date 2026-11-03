---
id: a986ecb2-9688-431b-8693-3343f64c5190
title: Java Swing to React UI Modernization
asset-owner: Suyash.Gupte2@ibm.com
team: Service Engineering
type: Technical
domain: Modernization
premium_package: Java Modernization
problem: >+
  Many organizations still run business-critical desktop applications built with
  Java Swing on outdated Java versions (such as Java 8). These applications:


  - Are tightly coupled to the desktop GUI and a local database, so they are
  hard to deploy, access remotely or scale.

  - Depend on unsupported runtimes and libraries with known CVE vulnerabilities.

  - Have little or no automated test coverage, so changes are risky.

  - Need a large manual rewrite to move to a modern web stack, which is slow,
  costly and error-prone.

solution: >+
  IBM Bob, with the Java Premium Package, guides the modernization end to end
  with minimal manual effort:


  - **Java Upgrade:** The Java Modernization workflow upgrades the project from
  Java 8 to Java 17. It applies OpenRewrite migration recipes, fixes build
  issues and remediates known CVEs in dependencies.

  - **Swing to React:** Bob is prompted to convert the Swing UI into a React web
  app using Vite and Material UI, with a Spring Boot backend. It scaffolds the
  full project structure, wires up the REST API and verifies database
  connectivity.

  - **Unit Testing:** The Java Unit Testing workflow installs JaCoCo, generates
  a test strategy and produces unit tests for all classes, with code coverage
  reporting.

  - **Vulnerability Remediation:** A final scan of the modernized backend lets
  Bob fix any remaining CVEs.

business-value: >+
  - Faster modernization: Bob automates the Java upgrade, UI conversion and test
  generation, which cuts manual effort and time-to-market.

  - Decoupled architecture: A React frontend and Spring Boot REST API give you a
  web-based, scalable, easier-to-maintain application.

  - Reduced security risk: Automated CVE scanning and remediation, run before
  and after modernization, give you a cleaner dependency posture.

  - Higher quality: Generated unit tests with JaCoCo coverage make future
  changes safer.

  - Lower cost and risk: Replacing a manual rewrite with a guided, repeatable
  workflow reduces errors and cost.

  - Repeatable pattern: The same approach applies to other Swing, JSF or Struts
  applications.

tech-stack:
  - IBM Bob
lab: https://github.com/SuyashGupte/ibm-bob-java-swing-to-react-ui-modernization
---
This lab shows how to use IBM Bob to modernize a legacy Java Swing patient management desktop application, a GUI backed by a local database, into a decoupled web application. The result is a React + Material UI frontend (built with Vite) and a Spring Boot REST API backend. The lab has five stages:

1. Run the legacy Swing application.
2. Upgrade Java 8 to Java 17 with the Bob Java Modernization workflow. This includes OpenRewrite recipes, build fixes and CVE remediation.
3. Convert the Swing UI to React and Spring Boot.
4. Generate unit tests with JaCoCo coverage.
5. Run a final vulnerability scan and remediation.

