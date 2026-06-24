---
title: IBM Bob ConcertDef SBOM
team: Service Engineering
type: Technical
domain: Automation
demo: https://ibm-self-serve-assets.github.io/bob-innovation-hub/#/demos?q=ibm%20bob%20concertdef%20sbom
slide_deck: /docs/slide_decks/ConcertDef-SBOM_OnePager.pdf
---
This demo shows how an application SBOM (Software Bill of Materials) is automatically generated in IBM Concert format using a custom mode. It extracts key details like components, URLs, and image digests from vulnerability scan reports, producing both a standardized SBOM and a detailed processing report. The system integrates with a configured MCP server to upload artifacts such as SBOMs and scan reports into IBM Concert. It then demonstrates uploading the SBOM, image scan reports, and source code scan reports, with progress tracked in the Concert UI. The platform organizes components, logs events, and surfaces vulnerabilities (CVEs) across images and source code, providing a consolidated view for analysis and remediation.