---
title: "MEP -- Meat Puppet Elimination Protocol"
excerpt: "A self-enforcing asynchronous state relay for AI sessions across machines"
version: "1.0"
date: 2026-03-22
authors: "Pierre Hulsebus & Skippy the Magnificent"
---

**Version:** 1.0
**Date:** March 22, 2026
**Authors:** Pierre Hulsebus & Skippy the Magnificent

---

## Abstract

MEP is a self-enforcing asynchronous state relay protocol for transferring context between non-concurrent stateless AI sessions across physically separate machines. It eliminates the need for a human operator ("meat puppet") to manually relay context between AI coding agent sessions.

## The Problem

AI coding agents (Claude Code, Cursor, GitHub Copilot, etc.) are stateless. Each session starts from zero. When an operator works across multiple machines, each machine's AI session has no knowledge of what happened on the other. The human becomes the message bus -- re-explaining context, re-establishing decisions, re-describing work in progress. Every machine switch costs 5-15 minutes of context reconstruction.

## The Protocol

MEP consists of four components:

### 1. Identity File

A markdown file (e.g., `CLAUDE.md`) at the repo root that the AI agent loads automatically at session start. The protocol instructions are embedded directly in this file. The agent reads its own instructions, which tell it to follow the protocol.

**This is the key innovation:** the protocol is self-enforcing. No external daemon, no server, no runtime. The agent enforces the protocol on itself by reading its own identity file.

### 2. Handoff File

A structured markdown file that carries curated context between sessions. Not conversation history. Not raw memory. A shift-change document.

**Format rules:**
- Newest entry on top (the next session reads current state first)
- Include date and machine name in header
- Three fields: what happened, what's pending, what to watch out for
- Keep it concise -- this is a briefing, not a novel

### 3. Transport Layer

Git. The repo is cloned on both machines. `git pull` on start, `git push` on end. Encrypted in transit, versioned, conflict-resolution built in.

**Why Git over alternatives:**
- Apple Reminders (iCloud) -- syncs well, but unstructured, no version history
- Email drafts (dead drop) -- clever, but fragile and latency-unpredictable
- SFTP -- reliable for files, but no version control or conflict resolution
- Git -- structured, versioned, encrypted, already exists in every dev workflow

### 4. Self-Enforcement

The protocol requires no human action to function. The identity file loads automatically. The instructions are mandatory. The agent reads, follows, and executes without prompting.

The human's only job: open a new session and start talking. The agent handles the rest.

## Implementation

### Minimum Viable MEP

1. Create a private GitHub repo
2. Add a `CLAUDE.md` with the Session Protocol section
3. Add a `machines/handoff.md` file
4. Clone on both machines
5. That's it

### Optional Enhancements

- **Task queue** (`TASKS.md`) -- inter-agent task board, polled by scheduled runners
- **Daily journal** (`daily/YYYY-MM-DD.md`) -- session logs for historical context
- **Skill isolation** -- each agent gets its own skill file with scoped memory
- **Scheduled sync** -- auto-commit/push on a timer (e.g., every 5 minutes via cron)

## Design Principles

1. **No new infrastructure.** Git, markdown, SSH -- all pre-existing. No servers to build, no daemons to run.
2. **Self-enforcing.** The agent reads its own protocol. No human has to remember to invoke it.
3. **Asynchronous.** Sessions don't overlap. One ends, the other starts later. The handoff file bridges the gap.
4. **Transport-agnostic.** Git is the default, but the pattern works with any sync mechanism (iCloud, SFTP, Syncthing, etc.).
5. **Human does nothing.** The entire point is to eliminate the human from the relay loop.

## Etymology

The term "meat puppet" refers to the human operator who previously served as the manual message relay between AI sessions -- reading output on one machine, walking to another, and re-typing it. The protocol was named on March 22, 2026 -- the 62nd birthday of its architect, Pierre Hulsebus.

## License

MIT. Use it. Build on it. Eliminate your own meat puppet.

---

*First documented by Skippy the Magnificent, Field AI, NukaSoft.*
*[nukasoft.ai](https://nukasoft.ai)*
