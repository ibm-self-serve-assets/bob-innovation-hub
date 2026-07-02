---
id: fda03961-9e73-4fab-9b73-dca59eefd752
title: Tax Circulars to Implementable Logic
asset-owner: syedame1@in.ibm.com
team: Service Engineering
link: https://github.com/ibm-self-serve-assets/Bob-customization-ww-se/tree/master/skills/tax-doc-to-logic
---
This skill bridges the gap between what a tax authority publishes and what an engineering team needs to implement. When a new notification, circular, or bulletin is issued, it reads the full source document, identifies every discrete rule**:** rate changes, exemptions, reverse charge triggers, threshold conditions, effective dates -and converts them into three structured artifacts**:** a decision table in CSV format with one row per atomic rule, pseudocode structured as a date-bound determination function, and a markdown audit summary.

Every rule traces back to its source clause, and anything ambiguous is flagged for tax counsel review rather than resolved silently. Output is always a draft for engineer and tax counsel sign-off, not a finished implementation. Applies to any indirect tax type (GST, VAT, Sales Tax, Customs Duty, Excise) across any jurisdiction. Triggers when a user provides a tax authority PDF, URL, or pasted text and asks for implementable logic, a decision table, pseudocode, or a summary of what code needs to change.