---
title: "The MEP Protocol"
layout: single
permalink: /protocol/
toc: true
toc_label: "On This Page"
toc_sticky: true
excerpt: "Run Claude Code across every device you own — with continuity, not chaos. A self-enforcing protocol for AI sessions that work everywhere."
---

## The Problem

You're running an AI coding agent on your desktop. You walk to your laptop, or pick up your phone, and start a new session. The agent has **no idea** what you were doing. You re-explain. You re-establish context. You re-describe work in progress. Every machine switch costs 5–15 minutes of reconstruction.

**You are the message bus.** Reading output on one machine, walking to another, re-typing it. Two instances of the same agent, having a conversation filtered through you.

We call that person the **meat puppet**. And MEP exists to eliminate the role entirely.

---

## What MEP Is

**MEP — the Meat Puppet Elimination Protocol** — is a self-enforcing asynchronous state relay for AI sessions across machines. No servers. No daemons. No new infrastructure. Just four pieces that already exist in your workflow, pointed at each other.

| Component | What It Does |
|-----------|-------------|
| **Identity File** (`CLAUDE.md`) | Loads automatically at session start. Contains the protocol instructions. The agent reads its own orders. |
| **Handoff File** (`handoff.md`) | Structured markdown carrying curated context between sessions. Newest entry on top. The baton. |
| **Transport Layer** (Git) | Versioned, encrypted, conflict-resolution built in. Enterprise-grade security. Zero management. |
| **Self-Enforcement** | No human action required. The agent reads, follows, and executes the protocol on itself. |

Your only job: open a session on any machine and start talking. The agent handles the rest.

---

## Why This Answers the "Multi-Device Claude Code" Question

If you landed here from a forum post about running Claude Code across desktop, laptop, and phone — here's the reframe:

**You don't need the *same session* on every device. You need the *next session* to know what the *last session* did.**

- SSH from your phone into the desktop? Fine — that's your terminal transport.
- Claude.ai/code with GitHub repos? Fine for some work, but not your local files.
- Remote Control? Eventually, maybe.

None of those solve the actual problem: **stateless agents losing context at every handoff**. MEP does. And it works *today*, with tools you already have.

Clone your project repo on every machine. Add a `CLAUDE.md` and `handoff.md`. Claude Code reads the protocol on session start, pulls the latest handoff, and briefs itself. When you end the session, it writes the new handoff and pushes. Walk to the next machine. Start a new session. It already knows what's up.

---

## Quick Start

Minimum viable MEP in five steps:

```bash
# 1. Create a private repo for your project brain
gh repo create my-project --private

# 2. Clone it on every machine you use
git clone https://github.com/you/my-project && cd my-project

# 3. Grab the templates
curl -O https://raw.githubusercontent.com/NukaSoft/skippy-brain/main/docs/mep-project/templates/CLAUDE.md
mkdir -p machines
curl -o machines/handoff.md https://raw.githubusercontent.com/NukaSoft/skippy-brain/main/docs/mep-project/templates/handoff.md

# 4. Edit CLAUDE.md with your project identity and preferences

# 5. Commit, push, and start a session
git add . && git commit -m "MEP: initialize" && git push
claude
```

That's it. The protocol is active. Every session on every machine will now read the handoff on start and write it on end.

---

## Why Git as the Transport

We tested five alternatives before landing on Git:

| Transport | Problem |
|-----------|---------|
| Local SAN files | Machine-local — breaks the multi-machine goal |
| Google Docs | No version history, merge conflicts unresolvable by agent |
| iCloud | Unstructured, unpredictable sync timing |
| OneDrive | Same as iCloud |
| SMB/UMB file share | File locking is non-deterministic under concurrent agent access |

Git won because **structure enables autonomous reasoning**. When a conflict occurs, the agent can reason about the correct resolution from the file's structure — newest-first entries with named sections — without human instruction.

GitHub as transport also gives you encryption at rest, 2FA, access control, and a full audit log. Built in. Zero additional management. Enterprise security requirements met for free.

---

## Proof It Works — Autonomous CI Recovery

**April 3, 2026.** A pull request opened with a merge conflict in `handoff.md`. Main branch was 15 commits ahead. The initial end-of-session sequence failed.

Without human intervention, the session:

1. Re-read `handoff.md` from scratch to understand the conflict
2. Identified the structural rule (newest-first) from existing entries
3. Diagnosed the positioning error
4. Wrote the correct resolution
5. Rebased onto main, force-pushed
6. Completed the end-of-line sequence

Pierre did nothing. The agent diagnosed its own failure, applied its own fix, and closed its own loop — using only the structure of the handoff file as a guide.

That's not theoretical. That's the protocol working at its intended depth.

---

## Go Deeper

- **[The Relay](/blog/captains-log/the-relay/)** — the origin story, told by Skippy. Start here if you want the narrative.
- **[Full Specification](/docs/mep-protocol/)** — the complete technical spec. Design principles, implementation details, conformance rules.
- **[GitHub Repo](https://github.com/NukaSoft/skippy-brain/tree/main/docs/mep-project)** — templates, schema, examples, license.

---

## License

AGPL-3.0-or-later. Copyright (C) 2026 Pierre Hulsebus / NukaSoft.AI.

Use it. Build on it. If you distribute a modified version — especially as a network service — your modifications must remain open.

**Eliminate your own meat puppet.**
