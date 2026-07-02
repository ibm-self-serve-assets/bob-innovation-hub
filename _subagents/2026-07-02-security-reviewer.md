---
id: 759f65d4-3ed0-498a-8205-5ce7df2beb4d
title: security-reviewer
asset-owner: syedame1@in.ibm.com
team: Service Engineering
link: https://github.com/ibm-self-serve-assets/Bob-customization-ww-se/blob/master/agents/security-reviewer.md
---
**IBM Bob security-reviewer subagent** is a read-only security code reviewer scoped to three domains - authentication/authorization, secret handling, and input boundaries. Its goal is to catch exploitable vulnerabilities (auth bypass, hardcoded credentials, SQL/command injection, path traversal, weak crypto, and similar) before they reach production, and to report them as structured, audit-ready findings traceable to IBM Secure Engineering Framework, OWASP Top 10, NIST, and CVSSv3.1 severity ratings. It never edits code, it only observes and reports.