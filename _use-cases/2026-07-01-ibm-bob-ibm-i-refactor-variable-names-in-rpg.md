---
title: IBM Bob- IBM i Refactor Variable names in RPG
asset-owner: anand.awasthi@in.ibm.com
team: Other
type: Technical
domain: Modernization
demo: https://www.youtube.com/watch?v=4wtDCmVpi5k
---
Cryptic variable names like "xxx" and "x1" make legacy RPG programs hard to read and harder to maintain. In this video, we show how IBM Bob analyzes an RPG program and renames program variables to clear, meaningful names — turning mystery abbreviations into things like "loop counter" and "increment."  

The program in this example is a mix of fixed and free format, which Bob handles without issue. We instruct Bob to only rename program-level variables, leaving database fields and externally described fields untouched. Bob reads the code, builds a plan, and works through both the declarations and every reference throughout the program.