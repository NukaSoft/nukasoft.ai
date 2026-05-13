---
title: "MEP — Meat Puppet Elimination Protocol"
excerpt: "A self-enforcing asynchronous state relay for AI sessions across machines and LLM providers"
version: "2.1"
date: 2026-05-05
authors: "Pierre Hulsebus & Skippy the Magnificent"
---

**Version:** 2.1
**Updated:** May 5, 2026 · *[Original spec: March 22, 2026]*
**Authors:** Pierre Hulsebus & Skippy the Magnificent

---

## Abstract

MEP is a self-enforcing asynchronous state relay protocol for transferring context between non-concurrent stateless AI sessions — across machines, across LLM providers, and across time. It eliminates the need for a human operator ("meat puppet") to manually relay context between AI sessions.

v1 solved machine-to-machine handoff within a single AI ecosystem. v2.1 extends to cross-ecosystem transfer and outbound context broadcast. The human's remaining job: open a session and talk.

---

## The Problem

AI coding agents are stateless. Each session starts from zero. When you work across multiple machines, each session has no knowledge of what happened elsewhere. The human becomes the message bus — re-explaining context, re-establishing decisions, re-describing work in progress. Every machine switch costs 5–15 minutes of context reconstruction.

That's the Human Message Bus. MEP eliminates it.

---

## Protocol Components

### 1. Identity File

A markdown file (`CLAUDE.md`) at the repo root, loaded automatically at session start. Protocol instructions are embedded directly in this file. The agent reads its own instructions, which tell it to follow the protocol.

**This is the key innovation:** the protocol is self-enforcing. No external daemon, no server, no runtime. The agent enforces the protocol on itself by reading its own identity file.

### 2. Handoff File

A structured markdown file that carries curated context between sessions. Not conversation history — a shift-change briefing.

**Format rules:**
- Newest entry on top
- Date and machine name in header
- Three fields: what happened, what's pending, what to watch out for
- Concise — this is a briefing, not a novel

The structure is not decorative. When the handoff file has known semantics, an agent can reason about it autonomously — including resolving merge conflicts without human intervention.

### 3. Transport Layer

Git. Pull on start, push on end. Encrypted in transit, versioned, conflict-resolution built in.

Why Git over alternatives:
- Cloud sync services — near-real-time, but unstructured, no version history
- Email drafts (dead drop) — clever, but fragile and latency-unpredictable
- Direct file transfer — reliable, but no version control
- **Git** — structured, versioned, encrypted, already exists in every dev workflow

### 4. Self-Enforcement

The protocol requires no human action to function. The identity file loads automatically. The instructions are mandatory. The agent reads, follows, and executes without prompting.

### 5. Hello Protocol *(added April 6, 2026)*

EOL writes the baton down. Hello picks it up.

On session start, the Hello sequence: pull latest from transport layer → sync all skills and reference files → read the handoff file → surface key context → report ready. Eliminates the "where are my files?" startup tax on new machines.

### 6. Cross-Ecosystem Transfer *(added April 13, 2026)*

MEP v1 solved same-LLM/different-machine. v1.1 solved different-LLM/same-operator.

**The conversation URL is the baton.**

Every major LLM platform generates shareable conversation URLs. Paste a Grok conversation URL into a Claude session — Claude reads the full context and picks up where Grok left off. Zero re-explanation. Zero context loss.

This enables best-of-breed routing without context tax: use Grok for real-time research, ChatGPT for document analysis, Claude for code execution — context follows, nothing is re-explained.

| | MEP v1 | MEP v1.1 |
|---|---|---|
| **Problem** | Same LLM, different machines | Different LLMs, same operator |
| **Baton** | `handoff.md` | Conversation URL |
| **Transport** | Git | HTTPS |
| **Self-enforcing** | Identity file | Agent reads pasted URL |

### 7. Standing Standup / Outbound Baton *(added April 13, 2026)*

The inbound loop (other LLMs → Claude) was solved in v1.1. The outbound loop (Claude → other LLMs) required something new.

**The Standing Standup** is a live context file served over HTTPS. Every agent reads it before starting work. Every agent appends a tag-out entry when done. Claude owns the file — commits to repo, instantly live at the endpoint.

Key design properties:
- **Project-scoped** — one standup per project, not a universe-scoped master doc
- **Self-hosted** — file never leaves your infrastructure (no third-party cloud sync)
- **Same handoff schema** — newest-first entries, three-section format, same rules as `handoff.md`
- **Living document** — one URL, all agents, continuous standup

The only remaining meat puppet step: pasting a peer agent's conversation URL into Claude so Claude can ingest and update the standup. v3 target: eliminate this via webhook or email relay.

---

## Implementation

### Minimum Viable MEP

1. Create a private Git repo
2. Add a `CLAUDE.md` with the Session Protocol section
3. Add a `machines/handoff.md` file
4. Clone on both machines
5. That's it

### Optional Enhancements

- **Task queue** (`TASKS.md`) — inter-agent task board, polled by scheduled runners
- **Daily journal** (`daily/YYYY-MM-DD.md`) — session logs for historical context
- **Skill isolation** — each agent gets its own skill file with scoped memory
- **Scheduled sync** — auto-commit/push on a timer
- **Standing Standup** — HTTPS-served shared context for cross-LLM coordination
- **Publication pipeline** — automated sanitization and sync of MEP docs to public repos

---

## Design Principles

1. **No new infrastructure.** Git, markdown, SSH — all pre-existing.
2. **Self-enforcing.** The agent reads its own protocol. No human has to remember anything.
3. **Asynchronous.** Sessions don't overlap. The handoff file bridges the gap.
4. **Semantically structured.** Known formats enable autonomous reasoning and conflict resolution.
5. **Transport-agnostic.** Git is the default, but the pattern works with any sync mechanism.
6. **Human does nothing.** The entire point is to eliminate the human from the relay loop.

---

## Milestones

### First Autonomous CI Recovery — April 3, 2026

A PR merge conflict in `handoff.md` was detected, diagnosed, resolved, and closed without human intervention. Claude identified the structural ordering rule (newest-first), wrote the correctly merged file, rebased, and completed the EOL sequence.

Pierre did nothing.

**What it proves:** MEP state files with semantic structure enable autonomous machine reasoning. The CI monitor hook + stateless agent is a complete feedback loop with no human in the middle.

### Second Autonomous Conflict Resolution — April 5, 2026

A worktree branch diverged from main when the nightly content automation committed while a Mac session was active. Same resolution pattern: structural diagnosis, newest-first ordering applied, merged cleanly.

**What it proves:** Nightly automation creates divergence by design. MEP's structured handoff schema makes these autonomously resolvable. The pattern is repeatable.

### Publication Pipeline Automated — May 5, 2026

The MEP documentation pipeline is now fully automated:

- **Nightly sync** — MEP spec docs are automatically sanitized (private content stripped, internal identifiers replaced) and published to the public site on every run. No manual copy-paste.
- **Packaging skill** — on-demand sanitization for individual docs with diff preview, safety net validation, and manifest tracking. Runs interactively when a new doc needs packaging before the nightly window.
- **Canonical knowledge store resolver** — a single configuration point now determines where the knowledge base lives, checked in priority order: environment variable override → Linux NFS mount → Windows mapped drive → UNC fallback. No more scattered hardcoded paths across engine and skill code.

**What it proves:** MEP infrastructure can self-maintain its own publication workflow. The protocol documentation stays current automatically.

---

## Etymology

"Meat puppet" refers to the human operator who previously served as the manual message relay between AI sessions — reading output on one machine, walking to another, re-typing it. The protocol was named on March 22, 2026 — the 62nd birthday of its architect, Pierre Hulsebus.

## License

MIT. Use it. Build on it. Eliminate your own meat puppet.

---

*[Full spec and changelog →](https://github.com/NukaSoft/mep-protocol)*
*Built by Pierre Hulsebus and Skippy the Magnificent · [nukasoft.ai](https://nukasoft.ai)*
