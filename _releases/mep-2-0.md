---
title: "MEP 2.0"
excerpt: ""
product: mep
version: "2.0"
release_date: 2026-04-13
current: false
---

**Released 2026-04-13**

**Project-Centric Cross-Ecosystem Routing**

### Added
- **MEP v2 design spec** — all cross-ecosystem work converges on Claude projects/skills as the canonical home.  Grok, ChatGPT, Gemini are spokes; Claude is the hub; the repo is the durable layer.
- **Peer projects model** — each skill/project can declare linked sessions on other platforms.  When a peer session produces insights, they route into the skill and enrich it permanently.
- **Project context accumulation** — cross-ecosystem conversations don't just transfer context once; they grow the project.  Every Grok brainstorm, every ChatGPT research session makes the skill smarter for every future session.
- **Routing rules** — 5-step ingestion: identify project → archive conversation → extract insights → route to project → surface in handoff.
- **3-phase implementation plan** — manual archive (now) → auto-routing (next) → bi-directional sync (future).
- **Commercial angle** — MEP v2 as convergence layer for knowledge workers using multiple AI tools.

### Design Decisions
- Claude is the hub, not because of vendor loyalty, but because it has code execution + repo access + durable memory.  The hub must be the LLM that can ACT on insights, not just discuss them.
- Conversations are project contributions, not events.  Archive them, route them, enrich the skill.
- The skill doesn't care which LLM generated the insight.  It cares that the insight exists.

---

---

[All MEP releases](/releases/)  |  [Current specification](/docs/mep-protocol/)
