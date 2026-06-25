---
title: MCP Context-Forge
link: https://github.com/IBM/mcp-context-forge
featured: 10
---
**ContextForge** is an open source registry and proxy that federates tools, agents, and APIs into one clean endpoint for your AI clients. It provides centralized governance, discovery, and observability across your AI infrastructure:

- **Tools Gateway** — MCP, REST, gRPC-to-MCP translation, and TOON compression
- **Agent Gateway** — A2A protocol, OpenAI-compatible and Anthropic agent routing
- **API Gateway** — Rate limiting, auth, retries, and reverse proxy for REST services
- **Plugin Extensibility** — 40+ plugins for additional transports, protocols, and integrations
- **Observability** — OpenTelemetry tracing with Phoenix, Jaeger, Zipkin, and other OTLP backends

It runs as a fully compliant MCP server, deployable via PyPI or Docker, and scales to multi-cluster environments on Kubernetes with Redis-backed federation and caching.