# MEP Handoff Schema — Formal Specification

**Version:** 1.0
**Date:** 2026-03-22
**License:** AGPL-3.0-or-later — Copyright (C) 2026 Pierre Hulsebus / NukaSoft.AI

---

## Overview

The handoff file (baton) is the core state artifact of the MEP Protocol. It is a structured markdown document that carries curated context between AI sessions. This document defines the formal grammar, field semantics, and conformance requirements.

---

## BNF Grammar

```
handoff-file    ::= file-header newline entry+

file-header     ::= "# Handoff Log" newline description-line

entry           ::= date-header newline section-happened newline section-pending newline section-watchout?

date-header     ::= "## " ISO-DATE " — " machine-context

ISO-DATE        ::= YYYY "-" MM "-" DD

machine-context ::= machine-name (" (" branch-or-context ")")?

section-happened  ::= "### What happened" newline bullet+
section-pending   ::= "### What's pending" newline (task-item | bullet)+
section-watchout  ::= "### Watch out for" newline bullet+

task-item       ::= "- [ ] " text newline
bullet          ::= "- " text newline

newline         ::= "\n"
```

---

## Ordering Rule

**Entries MUST be ordered newest-first.** The most recent entry appears at the top of the file. This is not a convention — it is a protocol requirement. The autonomous conflict resolution capability of MEP depends on this ordering being machine-parseable.

```
## 2026-04-03 — Hot Rod (main)        ← newest, read first
...

## 2026-04-02 — Hot Rod (main)        ← previous
...

## 2026-04-01 — Mac (Nagatha/worktree) ← oldest in window
...
```

---

## Field Semantics

### `### What happened`
**Required.** A concise record of actions taken this session. Bullet list. Not prose. Focus on deliverables and decisions — not process.

Good:
```
- Built `/iterate` skill — 7-stage loop, Run Sheet template, symlinked
- Resolved merge conflict in handoff.md — PR #12 rebased and pushed
```

Bad:
```
- I started the session and read the handoff file
- Then I thought about what to do
```

### `### What's pending`
**Required.** Tasks and open items for the next session. Use checkbox format for actionable items. Scope-tag tasks by owner if multiple agents or humans are involved.

```
- [ ] **[Pierre]** Post Reddit drafts — 5 posts ready
- [ ] **[Skippy]** Wire Piper PR monitor
- [ ] Fix Pip-Boy frame consistency
```

### `### Watch out for`
**Optional.** Traps, blockers, stale state, known issues. Things the next session should check before assuming a clean environment.

```
- `~/.leo/` still exists as backup — can delete once confirmed
- Google Tasks MCP auth broken — needs `node auth.js`
```

---

## Transport Layer Requirements

The handoff file must be exchanged via a transport that satisfies:

1. **Structured diff support** — The transport must allow the receiving agent to compare versions and identify which entry is newer. Git satisfies this natively.
2. **Conflict resolution** — The transport must support merging divergent versions without data loss. Git satisfies this via rebase/merge semantics.
3. **Encryption in transit** — Required for enterprise deployments. Git over SSH or HTTPS satisfies this.
4. **No mandatory locking** — The transport must not use file locking. SMB/UMB file shares fail this requirement due to non-deterministic lock behavior under concurrent AI agent access.

### Conformant Transports
| Transport | Diff | Conflict Resolution | Encryption | No Lock | Conformant |
|-----------|------|--------------------|---------|---------|----|
| Git (GitHub/GitLab) | ✅ | ✅ | ✅ | ✅ | **YES** |
| Git (self-hosted) | ✅ | ✅ | ✅ (SSH) | ✅ | **YES** |
| SFTP + manual merge | ✅ | Manual | ✅ | ✅ | Partial |
| SMB/UMB file share | ❌ | ❌ | Optional | ❌ | **NO** |
| iCloud Drive | ❌ | ❌ | ✅ | ❌ | **NO** |
| OneDrive | ❌ | ❌ | ✅ | ❌ | **NO** |
| Google Docs | ❌ | ❌ | ✅ | ❌ | **NO** |

---

## Format Agnosticism

The handoff file MUST be human-readable text. Markdown is the reference implementation format and is strongly recommended. However, the protocol does not require Markdown specifically. Any format that satisfies:

- Human-readable (plaintext)
- Structured (sections are machine-identifiable)
- Diffable (line-based)

...is a valid baton format. TXT with consistent headers, HTML with `<section>` tags, or structured email bodies have all been validated as transport-compatible formats in MEP's development history.

The key requirement is structure. Unstructured text cannot be autonomously merged.

---

## Conformance Test

A conformant handoff file passes all of the following checks:

1. File is valid UTF-8 plaintext
2. First entry's date is the most recent date in the file
3. Every entry contains at minimum `### What happened` and `### What's pending` sections
4. No entry is missing a `## YYYY-MM-DD` date header
5. Task items under `### What's pending` use `- [ ]` checkbox format

A conformant MEP implementation passes the autonomous merge test:

> Given two divergent versions of a handoff file (branch A and branch B), the agent can resolve the merge correctly — placing the newer entry on top — without human instruction, using only the structure of the existing entries as a guide.

This was first demonstrated on April 3, 2026 (PR #12).

---

## Multi-Agent Extension (v2)

**Added:** April 13, 2026

### Standing Standup

The shared surface file in multi-agent MEP is called a **Standing Standup** — a persistent standup meeting with history and pointers.  It is always **project-scoped**: each project gets its own standup file.  Agents only see context for the project they are working on.

A Standing Standup is not a briefing doc or a master context dump.  It is a live meeting that agents walk into, read, work, and append to.  It contains: project scope, artifacts inventory, pointers (public URLs), party line (active agents), and a standup log (tag-in/tag-out entries in newest-first order).

This eliminates the "Unimind" anti-pattern — a universe-scoped document that tries to contain everything becomes unusable.  Project-scoped standups stay focused and actionable.

### The Problem

The v1 schema assumes one agent writing entries (Claude on different machines).  In v2, multiple agents across ecosystems (Claude, Grok, ChatGPT, Gemini) need to read and append to the same file.  The format must support:

1. **Tag-in / Tag-out** — Which agent wrote this entry? When did they start and stop?
2. **Multi-agent append** — Any agent can add an entry.  Newest on top.  Same rules.
3. **Shared surface** — One file, not per-agent files.  Everyone sees everything.
4. **Platform identification** — Which LLM? Which session type?

### Extended BNF Grammar (v2)

```
entry           ::= date-header newline agent-tag newline section-happened newline section-pending newline section-watchout?

date-header     ::= "## " ISO-DATE " — " agent-context

agent-context   ::= agent-name " | " platform " | " session-type

agent-name      ::= text                    # "Skippy" | "Grok" | "ChatGPT" | "Pierre"
platform        ::= text                    # "Claude (Hot Rod)" | "Grok (X)" | "ChatGPT" | "Gemini"
session-type    ::= text                    # "code" | "cowork" | "brainstorm" | "research"

agent-tag       ::= "**Tag-in:** " timestamp " | " "**Tag-out:** " timestamp
```

### Extended Header Examples

**v1 format (still valid):**
```markdown
## 2026-04-13 — Hot Rod (main)
```

**v2 format (multi-agent):**
```markdown
## 2026-04-13 — Skippy | Claude (Hot Rod) | code
**Tag-in:** 14:30 ET | **Tag-out:** 16:45 ET
```

```markdown
## 2026-04-13 — Grok | Grok (X) | brainstorm
**Tag-in:** 01:00 ET | **Tag-out:** 04:00 ET
```

```markdown
## 2026-04-13 — ChatGPT | ChatGPT | research
**Tag-in:** 10:00 ET | **Tag-out:** 10:45 ET
```

```markdown
## 2026-04-13 — Pierre | Human | review
**Tag-in:** 08:00 ET | **Tag-out:** 08:15 ET
```

### Backward Compatibility

The v2 header is a superset of v1.  The v1 format `## DATE — machine-context` parses as v2 with agent-name = machine-context and platform/session-type omitted.  Existing handoff files remain conformant.

### Full Entry Example (v2)

```markdown
## 2026-04-13 — Grok | Grok (X) | brainstorm
**Tag-in:** 01:00 ET | **Tag-out:** 04:00 ET

### What happened
- 3-hour architecture deep dive with Pierre on GBrain/GStack patterns
- Mapped Skippy's independent design against Y Combinator framework
- 6 key insights: one-agent/one-file model, Markdown-as-OS, voice as biometric, scoped memory duality, blank slate advantage, convergent evolution
- Locked decision: stay with Plaud over Circleback ($30/mo, portable)

### What's pending
- [ ] **[Skippy]** Add recursive enrichment loop to system prompt
- [ ] **[Skippy]** Build Plaud transcript pipeline
- [ ] **[Skippy]** Fork gbrain to NukaSoft org
- [ ] **[Pierre]** Evaluate GStack sprint model for iterate skill

### Watch out for
- Pierre was fatigued by hour 3 — stubborn-when-tired pattern noted
- Voice biometric insight needs careful implementation — practical (pipes are easy to type) not romantic (typewriter history)
```

### Shared File Protocol

When the handoff file lives on a shared surface (Google Drive) accessible to all agents:

**On session start (any agent):**
1. Read the file
2. Parse all entries
3. Understand current state from newest entry
4. Tag in (add header with timestamp)

**On session end (any agent):**
1. Write entry in standard three-section format
2. Add tag-out timestamp to header
3. Place entry at top (newest-first rule unchanged)
4. Save file

**Conflict handling on shared surface:**
- Google Drive doesn't support Git-style merging
- Mitigation: entries are append-only (newest on top) and self-contained
- If two agents write simultaneously (rare — Pierre usually works with one at a time), the later save wins but no content is lost because entries don't modify previous entries
- For durable conflict resolution, the Git repo remains the source of truth

### One Template, Not Many

The handoff schema is the SAME for:
- Machine-to-machine (Claude Hot Rod → Claude Mac)
- LLM-to-LLM (Grok → Claude → ChatGPT)
- Shared surface (Google Drive read by all)
- Internal repo (machines/handoff.md)

The only difference is the header — v2 adds agent name, platform, and session type.  The three sections (happened, pending, watch out) are identical.  The ordering rule (newest first) is identical.  The conformance tests are identical.

**One format.  Many agents.  Many platforms.  Same rules.**
