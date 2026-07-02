---
id: 14a9397e-8ba1-4e4a-9b8e-235a8237dff5
title: Docling Data Conversion Skill
asset-owner: syedame1@in.ibm.com
team: Service Engineering
link: https://github.com/syedame1/Bob-customization/tree/master/skills/docling-data-conversion
---
**Docling Data Conversion Skill**

The `docling-data-conversion` skill gives IBM Bob  the ability to parse and convert documents into structured, machine-readable formats using the open-source Docling library. It handles PDFs, Word, PowerPoint, HTML, EPUB, and images - outputting clean Markdown, JSON, or plain text. Beyond conversion, it extracts tables as CSVs, pulls out figures as PNGs, and chunks documents into RAG-ready JSONL. Everything is wired into a single `process_data.py` script with clear sub-commands, so the agent always knows exactly what to run.