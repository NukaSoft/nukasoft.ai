---
title: "MEP 2.1"
excerpt: ""
product: mep
version: "2.1"
release_date: 2026-04-13
current: false
---

**Released 2026-04-13**

**Outbound Baton + Unified Handoff Schema**

### Added
- **Component 9: Outbound Baton** — Shared handoff file on Google Drive.  All agents (Claude, Grok, ChatGPT, Gemini) read AND append to the same file.  Same handoff schema as v1 — not a new format.
- **Multi-agent tag-in/tag-out** in handoff schema — extended header: `## DATE — Agent | Platform | session-type` + `**Tag-in:** TIME | **Tag-out:** TIME`.  Backward-compatible with v1 headers.
- **Shared surface protocol** — any agent reads on start, appends on end.  One file, many agents, same rules.
- Static context header (who Pierre is, active projects, crew, voice rules) + rolling handoff entries.
- Platform-specific setup for Grok (upload), ChatGPT (project knowledge file), Gemini (native Drive read).
- Complete loop diagram: publish → read → contribute → ingest → update → publish.

### Standing Standup Reframing
- **The shared handoff surface is a "Standing Standup"** — a persistent standup meeting with history and pointers that agents walk into, read, work, and append to.
- **Project-scoped, not universe-scoped.**  Each project gets its own standup.  Eliminates the "Unimind" problem — no master document trying to contain everything.
- Standup contains: project scope, artifacts inventory, pointers (public URLs), party line (active agents), and a standup log (tag-in/tag-out entries).
- Not a briefing doc.  It is a live meeting that never ends.

### Design Decisions
- **One template, not many.**  The handoff schema is the SAME format for machine-to-machine, LLM-to-LLM, and shared surfaces.  Only the header extends.
- Google Drive as shared surface transport.  Claude has MCP write access; other agents need Pierre to copy entries back (until API access available).
- The file is a projection of the repo.  Sanitized of private details.
- Append-only entries prevent conflict.  No agent modifies another's entries.  Newest on top.
- **Standing Standup is always project-scoped.**  Agents only see context for the project they are working on.

---

---

[All MEP releases](/releases/)  |  [Current specification](/docs/mep-protocol/)
