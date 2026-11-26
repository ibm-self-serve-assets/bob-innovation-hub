---
id: 786e1940-0d79-4aca-9862-4290718368e8
title: Real-time dynamic pricing for retail, powered by Confluent Cloud (Kafka,
  Flink, Streamhouse) and IBM watsonx Orchestrate | Built with IBM Bob
asset-owner: anand.awasthi@in.ibm.com
team: Service Engineering
type: Business
domain: Retail
problem: >-
  Traditional retail pricing is slow, blind and unexplained. The Thread & Co.
  storefront today shows three weaknesses:


  - **W1 The price is static:** it does not know what happened in the last hour.
  A city event, a viral moment, a competitor's flash sale or a size that is
  almost sold out changes nothing until someone notices.

  - **W2 There is no awareness:** pricing cannot see demand, stock levels or
  what competitors charge. The data to fix this already exists in POS systems,
  web clicks, inventory counts and competitor feeds. It is trapped in different
  systems and batch jobs.

  - **W3 There is no explanation:** customers see a number and have to trust it.


  Batch pipelines cannot close this gap. A single order tells you nothing. What
  matters is a pattern: is demand surging, is stock depleting faster than
  expected, did a competitor just drop their price? Pricing needs data in
  motion, AI agents that can act on it, and a way to reach every channel within
  seconds.
solution: >-
  The solution moves Thread & Co. from batch data to data in motion and adds AI
  agents that act on it. It works as a closed loop: events flow in, are
  processed in motion, are made queryable for agents, and decisions flow back
  out. It has six steps:


  1. **Capture events (Confluent Kafka):** sales, web orders, inventory counts
  and competitor prices each land on a durable, governed, decoupled topic. The
  POS does not need to know a pricing engine exists.

  2. **Turn events into signals (Confluent Flink):** Flink continuously
  correlates and enriches events as they arrive, with no overnight batch. Three
  signal streams (demand, inventory and market) are joined into one record per
  product on `retail.pricing.context-events`. This is the single, trusted
  picture of the business, updating continuously.

  3. **Make it queryable for agents (Confluent Streamhouse):** an agent can't
  wait on a batch warehouse and shouldn't scan a raw Kafka log. Streamhouse
  gives two things from the same stream:
    - **Lightning Tables:** a continuously updated table with sub-second point lookups in plain SQL. The built-in MCP server lets an agent ask "what is the live situation for this product?" in a fraction of a second, with no custom integration code.
    - **Tableflow:** the same stream written, with no ETL, to Iceberg and Delta. Analysts, BI tools and data scientists get history for demand models, while the agents get now.
  4. **Decide with focused agents (IBM watsonx Orchestrate):** instead of one
  giant opaque model, a team of agents each has one job. Each returns a
  structured result with a reason, for example "Demand: high, because it's
  selling fast" and "Inventory: low, because current stock won't cover the last
  hour's orders". The price agent combines these and calls a deterministic
  pricing calculator, so the math is governed. It returns a decision with its
  justification, and the reasoning trace shows which agent was called, what it
  concluded and why.

  5. **Act on every channel (Kafka):** the decision is published to
  `retail.pricing.updates`. The website, mobile app, smart mirrors, shelf labels
  and POS subscribe to it, so every channel shows the same price.

  6. **Explain the price (storefront):** each price move carries a trend badge
  and arrow. The product page's live activity panel shows items sold, people
  viewing and demand level. When demand is up and stock is tight, the price
  rises. When stock is replenished or competitors undercut, it drops. Both
  directions are intentional.


  Because the pipeline is event-driven, you can add guardrails, human approval
  for large changes, or new agents such as a promotions agent, without rewriting
  it.
business-value: >-
  ✓ **Higher revenue in high-demand moments:** prices rise automatically when
  demand is up and stock is tight, instead of waiting for someone to notice.


  ✓ **Better conversion when demand is soft:** prices drop when stock is
  replenished or competitors undercut, so the retailer stays competitive.


  ✓ **Less manual repricing:** the loop runs from event to every channel in
  seconds, replacing the spreadsheet-and-push cycle that takes hours or days.


  ✓ **Customer trust:** every price change is explained by a trend badge, live
  activity data and agent reasoning, so the customer trusts the number.


  ✓ **Consistent price across channels:** the same decision reaches the website,
  mobile app, smart mirrors, shelf labels and POS, so the phone and the shelf
  agree.


  ✓ **AI decisions you can inspect and govern:** focused agents give structured
  results with reasons, a deterministic calculator keeps the math governed, and
  the trace shows who concluded what. Guardrails and human approval can be added
  without rewriting the pipeline.


  ✓ **One pipeline, two uses:** Streamhouse serves live agents (Lightning Tables
  over MCP) and historical analytics (Tableflow into Iceberg and Delta) from the
  same stream.


  ✓ **Extend without rebuilding:** new data sources are just new topics, and new
  agents plug into Orchestrate.
tech-stack:
  - IBM Confluent
  - watsonx Orchestrate
  - Flink
  - Kafka
  - TableFlow
  - Streamhouse
  - IBM Bob
architecture_diagram: /docs/diagrams/architecture-diagram.png
demo: https://www.youtube.com/watch?v=bMfzjiA4xa0
slide_deck: /docs/slide_decks/Dynamic_Pricing_Retail_Use_Case_Deck.pdf
featured: 1
---
This use case demonstrates how Thread & Co., a fictional apparel retailer, moves from reacting late to acting instantly on pricing. The demo opens with a question: how often does your price change when something big happens in your market? For most retailers the honest answer is "when someone notices, opens a spreadsheet and pushes a change", which can take hours or days. It then shows Thread & Co.'s storefront as it works today, with static prices, and the same store rebuilt for live pricing.

On the modernized storefront, prices change with no page refresh and no one touching a pricing tool. A live insight banner shows items sold in the last hour, people viewing right now, and whether a product is trending in the region. A trend badge and ↑ / ↓ arrow explain each price move. The same decision also reaches in-store smart mirrors, digital shelf labels and POS, so a customer sees the same price on her phone as on the shelf.

This use case and demo has been built with IBM Bob.