---
title: "MEP 1.1"
excerpt: ""
version: "1.1"
release_date: 2026-04-13
---

**Released 2026-04-13**

**Cross-Ecosystem Context Transfer + Seed Prompt**

### Added
- **Component 7: Cross-Ecosystem Context Transfer** — conversation URLs from Grok, ChatGPT, Gemini, or any LLM become the baton for cross-provider context relay.  Operator pastes URL, receiving agent reads full conversation, continues without re-explanation.  Best-of-breed AI routing without context tax.
- **Component 8: Seed Prompt** — self-contained text block for bootstrapping disconnected sessions (Cowork mode, Claude Desktop, any session without repo access).  One paste, zero questions.  "DO NOT ASK ME ANY QUESTIONS" is a valid protocol instruction.
- Combined flow diagram: Grok (brainstorm) → Claude Mac (cowork) → Claude Hot Rod (code) → Claude Mac (next day).  Context follows the operator across LLMs AND machines.

### Design Decisions
- Conversation URL is transport-agnostic — works regardless of source platform
- Seed prompts are read-and-execute, not read-and-plan
- Cross-ecosystem transfer is ephemeral (platform-hosted); recommend archiving fetched conversations to `memory/conversations/` for permanence
- "Low meat puppet friction" adopted as design standard for all context handoff patterns

### Production Milestones
- **Grok → Claude architecture transfer** (Apr 13): 3-hour Grok session on GBrain/GStack patterns transferred to Claude via URL.  Claude produced 172-line journal, Captain's Log PDF, and forward objectives.  Zero re-explanation.
- **Skool cowork seed prompt** (Apr 13): New Claude Desktop session bootstrapped with paste-and-go seed prompt.  No clarifying questions.  Immediate productive work.

---

---

[All releases](/releases/) | [Current specification](/docs/mep-protocol/)
