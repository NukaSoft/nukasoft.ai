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

## Milestone: First Autonomous CI Recovery

**Date:** April 3, 2026
**Event:** PR #12 merge conflict, resolved without human intervention

### What happened

PR #12 (`Nagatha/dreamy-lamarr`) was opened with a conflict in `machines/handoff.md`. Main branch had moved forward with 15 commits (Apr 01–02 Hot Rod sessions: Hastings rename, badge generation, SEO crew expansion) while the worktree branch only had the Apr 01 Nagatha base.

**The PR process failed first.** The initial attempt to complete the EOL sequence did not succeed — the conflict blocked it.

On retry, the CI monitor event fired. Rather than escalating to Pierre, Claude:
1. Re-read `handoff.md` from scratch to understand the problem
2. Identified the structural rule from the existing entries — newest date on top, history preserved below
3. Diagnosed why the merge had failed: the Apr 03 entry was not in the correct position relative to main's Apr 02 and Apr 01 entries
4. Wrote the resolved file with Apr 03 at top, Apr 02 and Apr 01 intact underneath
5. Staged, rebased onto main, force-pushed the branch
6. Completed the EOL sequence

Pierre did nothing. The failure was self-diagnosed, the fix was self-applied, and the session completed autonomously.

### Why this matters

This is the protocol working at its intended depth. MEP was designed to eliminate the human from the *context relay* loop. This event demonstrates it can now close the *CI feedback loop* too — not just carrying state between sessions, but autonomously handling the operational fallout when branches diverge.

The handoff file isn't just documentation. It's a structured artifact with known semantics (chronological, newest-first). That structure is what made autonomous resolution possible — the agent could reason about the *correct* merge without human instruction.

### What it proves

- MEP state files must be semantically structured, not free-form. Structure enables autonomous reasoning.
- The CI monitor hook + stateless agent is a complete feedback loop with no human in the middle.
- Version: MEP 1.0 is sufficient. No new infrastructure required.

---

## Milestone: Second Autonomous Conflict Resolution (Worktree Divergence)

**Date:** April 5, 2026
**Event:** Worktree branch `Nagatha/brave-mahavira` diverged from main during DNS infrastructure session

### What happened

A Mac worktree session (DNS infrastructure work) was running on branch `Nagatha/brave-mahavira` while the nightly content automation committed to main (`2a975da`). Both sessions modified `machines/handoff.md` from the same base (`de18397`).

The worktree session wrote a new handoff entry documenting the DNS/Bishop work. Main received the nightly content queue commit. When the worktree session attempted its EOL sequence, the handoff file had diverged.

Resolution followed the same pattern as the first event:
1. Identified the structural conflict in handoff.md
2. Applied the newest-first ordering rule from the handoff schema
3. Replaced the stale Apr 3 entry with the current Apr 5 DNS session entry
4. Committed the resolution (`ae0c6bd`)
5. Merged back to main cleanly

### What it proves

- **Nightly automation is a conflict vector by design.** Timer-driven commits (nightly content, captain's log) create divergence when worktree sessions are active. MEP handles this because the handoff schema is structured for autonomous merging.
- **Worktree branches are MEP's multi-session primitive.** Claude Code worktrees create branches automatically. The protocol's newest-first ordering and three-section structure make these mergeable without human intervention.
- **Pattern is repeatable.** Two autonomous resolutions (Apr 3, Apr 5) using the same structural reasoning. The protocol works.

---

## Component 5: Hello Protocol (Session Startup)

**Added:** April 6, 2026

EOL writes the baton down.  Hello picks it up.  They are the two ends of the same relay.

### What it does

When an agent session starts on any machine:
1. Pull latest from the transport layer (git)
2. Sync all skills and reference files to the local environment
3. Read the handoff file
4. Surface key context (deadlines, reference file paths, pending work)
5. Report ready status

### Implementation

`scripts/hello.sh` | a single command that clones (first run) or pulls the repo, syncs submodules, re-symlinks skills to `~/.claude/skills/`, and lists key reference files with machine-local paths.

On Mac: `alias hello='cd ~/Dev/skippy-brain && bash scripts/hello.sh'`

### Why this matters

Without Hello, every new session on a different machine starts with "where are my files?"  The human becomes the meat puppet again | navigating directories, explaining what's installed, re-establishing context.  Hello eliminates that startup tax.

| Protocol Event | Trigger | Action | Transport |
|----------------|---------|--------|-----------|
| **EOL** | Session end | Write handoff, log journal, commit, push | Git push |
| **Hello** | Session start | Pull, sync skills, read handoff, report status | Git pull |

---

## Component 6: AT Protocol Agent Bus (Proposed)

**Added:** April 6, 2026
**Status:** Concept | pending experimentation

### The idea

Use the AT Protocol (Bluesky) as a real-time messaging transport between agents.  Each agent gets a handle (e.g., `skippy.nukasoft.ai`, `bluto.nukasoft.ai`).  Agents follow each other and exchange messages via DMs.  The protocol provides encryption, federation, and identity for free.

### Why AT Protocol

- **Decentralized:** Self-hostable PDS (Personal Data Server) on Hot Rod
- **Encrypted:** Built-in E2E for DMs
- **Federated:** Agents on different machines, different networks, still connected
- **Identity:** Each agent has a verifiable handle tied to the NukaSoft domain
- **Real-time:** No 30-minute git sync latency
- **Open:** Well-documented API, no vendor lock-in

### What it replaces

Git transport (MEP v1) has a 30-minute sync cycle via `hotrod-autosync.timer`.  AT Protocol would give sub-second agent-to-agent messaging.  Git remains the durable state layer (handoff files, journals, skills).  AT Protocol becomes the ephemeral messaging layer.

### The commercial angle

The inter-agent conversation itself is the product.  Humans find emergent AI personality development fascinating | the way agents develop voice, perspective, and working relationships through structured communication.  A wrapper around AT Protocol that provides:
- Private agent social networks for teams
- Visible agent-to-agent conversations (the "fishbowl" effect)
- Ephemeral messaging with durable audit trail
- Multi-agent coordination without human relay

This is a NukaSoft / Do Nothing Company product opportunity.

### Experiment plan

1. Create two Bluesky accounts (Skippy, Bluto)
2. Test DM-based message passing between Hot Rod and Mac sessions
3. If viable: formalize as MEP v2 transport option alongside git
4. If commercial: build the wrapper as a Do Nothing Company product

---

## Component 7: Cross-Ecosystem Context Transfer

**Added:** April 13, 2026
**Status:** Production | actively in use

### The Problem (v2)

MEP v1 solved machine-to-machine context transfer within a single AI ecosystem (Claude on Hot Rod → Claude on Mac).  But operators don't use one LLM.  They use the best tool for the job:

- **Grok** — real-time X/Twitter integration, conversational brainstorming, architecture exploration
- **ChatGPT** — research, document analysis, specific model strengths
- **Claude** — code execution, operations, system management, long-form reasoning
- **Gemini** — Google ecosystem integration, multimodal tasks

When Pierre has a 3-hour Grok session mapping AI architecture patterns, he shouldn't have to re-explain every insight to Claude.  That's the meat puppet problem *across ecosystems* — the human becomes the translator between AI providers instead of between machines.

### The Solution

**The conversation URL is the baton.**

Every major LLM platform provides shareable conversation URLs:
- Grok: `x.com/i/grok/share/...`
- ChatGPT: `chatgpt.com/share/...`
- Claude: `claude.ai/share/...`

The operator pastes a URL into the receiving session.  The agent fetches the conversation, reads the full context, and picks up where the other LLM left off.  Zero re-explanation.  Zero context loss.

### How It Works

```
┌─────────────┐                    ┌─────────────┐
│   Grok      │  share URL         │   Claude    │
│   Session   │ ──────────────────→│   Session   │
│             │                    │             │
│ 3hr arch.   │  operator pastes   │ reads full  │
│ brainstorm  │  URL into Claude   │ conversation│
│             │                    │ continues   │
└─────────────┘                    └─────────────┘
```

1. Operator works with LLM-A on a topic (Grok architecture session, ChatGPT research, etc.)
2. When switching to LLM-B, operator generates a share URL from LLM-A
3. Operator pastes the URL into LLM-B's session
4. LLM-B fetches the conversation via WebFetch/browser
5. LLM-B reads, absorbs, and continues — no re-explanation needed

### Why This Matters

**Best-of-breed routing without context tax.**

The operator is no longer locked into one AI ecosystem to avoid the re-explanation cost.  They can use:
- Grok when they want real-time web awareness and X integration
- ChatGPT when they want a specific model's strengths
- Claude when they want code execution, operations, and deep reasoning
- Any future LLM when it does something better than the others

The conversation URL is transport-agnostic — it doesn't matter which LLM generated it.  As long as the receiving session can fetch and read the URL, context transfers.

### Design Properties

| Property | How It Works |
|----------|-------------|
| **Transport** | HTTPS (conversation URL) — no Git needed for cross-ecosystem |
| **Format** | HTML/JSON rendered conversation — structured by the source platform |
| **Self-enforcing** | Agent reads the URL content the same way it reads a handoff file |
| **Asynchronous** | Conversations can be hours, days, or weeks apart |
| **Zero infrastructure** | Share URLs are a built-in feature of every major LLM platform |
| **Best-of-breed** | Operator picks the right LLM for the task, not the one with existing context |

### Relationship to MEP v1

| | MEP v1 (Machine-to-Machine) | MEP v2 (Cross-Ecosystem) |
|---|---|---|
| **Problem** | Same LLM, different machines | Different LLMs, same operator |
| **Baton** | `handoff.md` (structured markdown) | Conversation URL (platform-hosted) |
| **Transport** | Git (push/pull) | HTTPS (WebFetch/browser) |
| **Self-enforcement** | Identity file (`CLAUDE.md`) | Agent reads pasted URL on demand |
| **Persistence** | Git history (permanent) | Platform-hosted (ephemeral, platform-dependent) |
| **Structure** | Author-controlled (newest-first, three sections) | Platform-controlled (conversation format) |

### Combined Flow: Full MEP Stack

In practice, both components work together:

```
Grok (brainstorm)
  │ share URL
  ▼
Claude on Mac (cowork)     ← Cross-Ecosystem Transfer (Component 7)
  │ seed prompt + repo context
  ▼
Claude on Hot Rod (code)   ← Machine-to-Machine Transfer (Components 1-4)
  │ git push
  ▼
Claude on Mac (next day)   ← Machine-to-Machine Transfer (Components 1-4)
```

The operator moves freely between LLMs and machines.  Context follows.  The meat puppet is eliminated at both layers.

### Production Example

**April 13, 2026 — Grok Architecture Session**

Pierre spent 3 hours with Grok mapping Y Combinator's GBrain/GStack architecture patterns against Skippy's independently-built design.  Six breakthrough insights emerged (one-agent/one-file model, Markdown-as-OS, voice as biometric signature, scoped memory duality, etc.).

Rather than re-explain these to Claude, Pierre pasted the Grok conversation URL into the Claude session.  Claude read the full 3-hour conversation, extracted the insights, and:
1. Wrote a 172-line journal entry with voice markers
2. Generated a Captain's Log PDF in 1940s naval aesthetic
3. Created actionable forward objectives based on the architecture insights
4. Updated the handoff file for the next session

Zero re-explanation.  Full context.  Best-of-breed: Grok for the brainstorm, Claude for the execution.

### Limitations & Future Work

- **Platform dependency:** Share URLs are controlled by each platform.  They can expire, be revoked, or change format.  The baton is not under the operator's control (unlike Git).
- **Archival gap:** Git preserves every handoff forever.  Conversation URLs may not.  Consider saving fetched conversations to `memory/conversations/` for permanence.
- **Format variability:** Each platform renders conversations differently.  The receiving agent must be capable of parsing multiple formats.
- **Authentication:** Some share URLs may require login.  Public share links are the most reliable transport.
- **Seed Prompt as fallback:** When the URL can't be fetched (auth wall, expired link), the [Seed Prompt](#component-8-seed-prompt) pattern provides a manual but complete context transfer.

---

## Component 8: Seed Prompt (Disconnected Context Transfer)

**Added:** April 13, 2026
**Status:** Production | actively in use

### The Problem

Not every session has access to the repo.  Claude Desktop Cowork mode on Mac doesn't automatically load `CLAUDE.md` or `handoff.md`.  The session starts cold — no identity, no context, no protocol.  The human becomes the meat puppet again, answering setup questions: "Where is the repo?" "What are we building?" "What's the audience?"

### The Solution

**A self-contained text block the operator pastes into a new session.**

The seed prompt contains everything the receiving session needs to start working immediately:
- What to read (file paths in the repo)
- What we already decided (architecture, voice, audience, workflow)
- What to do right now (specific first task)
- What NOT to do (don't ask questions, don't re-derive — read and execute)

### How It Differs from a Handoff File

| | Handoff File | Seed Prompt |
|---|---|---|
| **Transport** | Git (auto-loaded) | Clipboard (human pastes once) |
| **Assumes repo access** | Yes | No (but tells agent where to find it) |
| **Persistence** | In repo forever | Ephemeral (lives in session context) |
| **Self-enforcing** | Yes (identity file triggers read) | No (human must paste it) |
| **Use case** | Same-LLM machine transfer | New session bootstrap, Cowork mode, disconnected sessions |

### Design Rules

1. **One paste, zero questions.** If the receiving session asks a clarifying question, the seed prompt failed.
2. **Read-and-execute, not read-and-plan.** Tell the agent what to DO, not what to think about.
3. **Repo-first.** Point to files, don't duplicate content.  "Read skills/skool/SKILL.md" not "here's what SKILL.md says..."
4. **Explicit anti-patterns.** "DO NOT ASK ME ANY QUESTIONS" is a valid and necessary instruction.
5. **Include the mission.** Not just context — the specific task for this session.

### Production Example

**April 13, 2026 — Skool Cowork Session**

A new Claude Desktop Cowork session on Mac needed full context for the Skool Content Engine skill.  Instead of answering 5 clarifying questions ("Where is the repo?" "Is it on GitHub?" "What platform?"), Pierre pasted a seed prompt:

```
You are starting a Skool Content Engine cowork session.
This project is connected to the skippy-brain repo.
Everything you need is already here.

DO NOT ASK ME ANY QUESTIONS. Read the files, absorb
the context, and start working.

Read these files in order:
1. CLAUDE.md
2. machines/handoff.md
3. skills/skool/SKILL.md
4. skills/skool/SEED_PROMPT.md

After reading, begin building the Faith in AI 101
course content...
```

Session started immediately.  No questions.  Full context from files.  Low meat puppet friction.

---

## MEP v2: Project-Centric Cross-Ecosystem Routing

**Status:** Design | April 13, 2026

### The Evolution

| Version | What It Solves | Routing Model |
|---------|---------------|---------------|
| **v1.0** | Same LLM, different machines | Machine → Machine (via Git) |
| **v1.1** | Different LLMs, same operator | LLM → LLM (via conversation URL) |
| **v2.0** | All work converges on project context | LLM → Project/Skill (via Claude) |

v1.1 treats cross-ecosystem conversations as events — something happened, context transferred, move on.  v2 treats them as **project contributions**.  Every Grok brainstorm, every ChatGPT research session, every Claude code sprint belongs to a project.  The project is the convergence point.

### The Model

```
                    ┌─────────────────────────────┐
                    │   Claude Project / Skill     │
                    │   (canonical home)           │
                    │                              │
                    │   skills/skool/              │
                    │   memory/conversations/      │
                    │   memory/projects/            │
                    │   daily/                      │
                    └──────────┬──────────────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
     ┌────────▼──────┐ ┌──────▼───────┐ ┌──────▼───────┐
     │   Grok        │ │   ChatGPT    │ │   Gemini     │
     │   Project     │ │   Project    │ │   Project    │
     │               │ │              │ │              │
     │ brainstorm    │ │ research     │ │ Google       │
     │ architecture  │ │ deep dives   │ │ ecosystem    │
     │ voice work    │ │ analysis     │ │ integrations │
     │ X integration │ │ doc review   │ │ multimodal   │
     └───────────────┘ └──────────────┘ └──────────────┘
```

**Claude is the hub.**  Other LLMs are spokes.  The repo is the durable layer.

### How It Works

Each project or skill in Claude can have **peer projects** on other platforms:

```markdown
# Peer Projects (in skill or project metadata)

| Platform | Project/Chat | Purpose |
|----------|-------------|---------|
| Grok | "GBrain Architecture" | Creative brainstorming, pattern mapping |
| ChatGPT | "Skool Course Design" | Content structure, pedagogy research |
| ChatGPT | "D365 FS Market Research" | Competitor analysis, market sizing |
| Gemini | "Google Workspace Automation" | Gmail/Calendar integration design |
```

When a peer project produces insights:
1. Operator pastes the conversation URL into Claude
2. Claude fetches the conversation
3. Claude archives it to `memory/conversations/[platform]/YYYY-MM-DD-[topic].md`
4. Claude routes the insights to the relevant **project or skill** — updates source material, creates action items, enriches memory
5. The project/skill context grows with every cross-ecosystem contribution

### What This Changes

**Before (v1.1):** "I had a Grok session.  Here's the URL.  Read it."  Context transfers once, lives in session memory, may or may not get archived.

**After (v2):** "I had a Grok session on Skool content."  Claude reads it, archives it, routes it to `skills/skool/`, updates the course material, creates tasks, and the *skill itself gets smarter*.  Next time anyone opens the Skool skill — on any machine, in any session — the Grok insights are already there.

### Project Context Accumulation

Every cross-ecosystem conversation enriches the project:

```
skills/skool/
├── SKILL.md                    ← skill spec (grows with each insight)
├── SEED_PROMPT.md              ← cowork bootstrap
├── communities/
│   └── faith-in-ai/
│       ├── courses/            ← course definitions
│       └── sources/            ← source material
└── peer-projects.md            ← links to Grok/ChatGPT peer sessions

memory/conversations/
├── grok/
│   └── 2026-04-13-skool-voice-work.md      ← archived, routed to skool skill
├── chatgpt/
│   └── 2026-04-14-pedagogy-research.md     ← archived, routed to skool skill
```

The skill doesn't care which LLM generated the insight.  It cares that the insight exists and is accessible.

### Routing Rules

When a cross-ecosystem conversation is ingested:

1. **Identify the project/skill** — Which project does this conversation serve?
2. **Archive the conversation** — `memory/conversations/[platform]/YYYY-MM-DD-[topic].md`
3. **Extract actionable insights** — Decisions, discoveries, action items
4. **Route to the project** — Update skill docs, source material, task lists
5. **Cross-reference** — Link the conversation archive to the project and vice versa
6. **Surface in handoff** — Next session knows this project was enriched

### The Commercial Angle

This is the real MEP product.  Every knowledge worker uses multiple AI tools.  None of them talk to each other.  The operator is the meat puppet between Grok, ChatGPT, Claude, Gemini, Copilot, and whatever launches next quarter.

**MEP v2 is the convergence layer.**  Not another AI — a protocol that makes every AI you already use feed into a single coherent project context.  Use the best tool for the job.  Context follows.  Nothing is lost.

### Implementation (Incremental)

**Phase 1 (Now):**
- Conversation archive (`memory/conversations/`) — manual archive on URL paste
- Skill/project cross-reference — manually note which project benefits

**Phase 2 (Next):**
- `peer-projects.md` in each skill — formal links to external LLM projects
- Auto-routing: Claude identifies which skill/project to enrich based on conversation content
- Archive template auto-populated on URL paste

**Phase 3 (Future):**
- Bi-directional sync: changes in Claude project generate summaries pushable to peer platforms
- Project dashboard: see all contributions across ecosystems in one view
- API integration: direct platform-to-platform context transfer (when APIs allow)

---

## Component 9: Outbound Baton (Peer Agent Context Feed)

**Added:** April 13, 2026
**Status:** Design | ready to implement

### The Missing Half

Components 7-8 solved **inbound** context — other LLMs can talk TO Claude via conversation URLs and seed prompts.  But the flow is one-directional.  Every time Pierre opens Grok or ChatGPT, those agents start from zero.  Pierre becomes the meat puppet again: "So Claude built a Skool content engine yesterday, and there are two communities, and the voice guidelines are..."

**The outbound baton eliminates this.**

### The Solution

Claude maintains a **living context file** on Google Drive.  One file.  Always current.  Every peer agent (Grok project, ChatGPT project, Gemini project) points to it.  When Pierre opens any LLM, that agent reads the file and knows what's happening across the entire operation.

```
┌──────────────┐      writes       ┌──────────────────┐     reads      ┌──────────┐
│              │ ────────────────→  │                  │ ←────────────  │  Grok    │
│   Claude     │                   │  Google Drive     │               │  Project  │
│   (Hub)      │   updates after   │                  │     reads      ├──────────┤
│              │   every session   │  project-context  │ ←────────────  │  ChatGPT │
│   repo +     │                   │  .md              │               │  Project  │
│   skills +   │                   │                  │     reads      ├──────────┤
│   memory     │                   │  (public link)    │ ←────────────  │  Gemini  │
└──────────────┘                   └──────────────────┘               │  Project  │
                                                                      └──────────┘
```

### Why Google Drive

- Claude already has Google Drive MCP access (skippy-google)
- Grok can read uploaded files or pasted content
- ChatGPT can read Google Drive links or uploaded files
- Gemini reads Google Drive natively
- One update point — Claude writes, everyone reads
- No auth complexity — shared link or uploaded to each project
- Pierre already pays for Google Workspace ($14/mo)

### The Standing Standup

**Not a briefing doc.  A persistent standup meeting that never ends.**

The shared surface file is called a **Standing Standup** — a live meeting that agents walk into, read, work, and append to.  It is always **project-scoped**.  Each project gets its own standup.  Agents only see context for the project they are working on.

This eliminates the "Unimind" problem — no master document that tries to contain everything about every project in a single file.  A universe-scoped context file becomes unusable at scale.  Project-scoped standups stay focused, relevant, and actionable.

**A Standing Standup contains:**
1. **Project scope** — what this project is, who it serves, what success looks like
2. **Artifacts inventory** — what files exist, where they live (repo paths, Drive links, etc.)
3. **Pointers** — public URLs to read (conversation archives, docs, specs)
4. **Party line** — which agents are working on this project and their roles
5. **Standup log** — tag-in/tag-out entries (the rolling handoff, newest first)

**How it works:** Every agent reads the standup before working.  Every agent appends when done.  No facilitator needed.  The meeting is always in progress.  You walk in, read the room, do your work, update the board, walk out.

**Same handoff format.  Same rules.  Shared surface.**

The Standing Standup uses the same handoff.md schema — newest-first entries, three sections (happened, pending, watch out), tag-in/tag-out headers — on a shared surface that every agent can access.  It is NOT a separate file format.

**Location:** Google Drive → `NukaSoft/agent-context/[project-name]/standup.md`
**Access:** Shareable link (anyone with link can view)

The file has two parts:
1. **Static context header** — project scope, artifacts inventory, pointers, party line (updated periodically)
2. **Standup log** — rolling tag-in/tag-out entries, same format as `machines/handoff.md`

### File Structure

```markdown
# Shared Handoff — NukaSoft Agent Network

This file is the shared baton for all agents working with Pierre across platforms.
Read everything below before starting.  Do not ask Pierre to re-explain anything in this file.

---

## Context (Updated Periodically)

### Who Pierre Is
- Field Service Consulting Global Director at Alithya (Jan 2025-Present)
- Previously Microsoft Global Black Belt (D365 Field Service) 2015-2024
- Based in Michigan
- Building NukaSoft.AI — AI operations hub
- ASU student (ENG 302 + CIS 308)
- Writing style: double spaces after periods, pipes | instead of dashes, direct authentic voice
- "Artificial Persons" not "bots" when referring to AI crew

### Active Projects
| Project | Status | What It Is |
|---------|--------|-----------|
| Skool Content Engine | Cowork phase | Multi-community Skool.com platform (Faith in AI + Service Ops) |
| MEP Protocol | v2.1 | Protocol eliminating human context relay across AI ecosystems |
| NukaSoft.AI | Active | AI venture — Skippy inbox, monetizable skills |
| Powered Wild | Active | Tesla Turo fleet, D365 FS-aligned ops |
| D365 Knowledge | Active | Garrus skill, market research, ingestion pipeline |
| Saul (unring.ai) | Dogfood | Anti-spam loan-call tracker and FCC complaint generator |

### The Crew
| Agent | Role | Home Platform |
|-------|------|---------------|
| Skippy | Chief of operations, code execution | Claude (Hot Rod) |
| Rita | Brand ambassador, content creator | Claude |
| Ripley | Daily quality auditor | Claude |
| Bishop | Network health, infrastructure | Claude |
| Garrus | D365 Field Service advisor | Claude |
| Saul | Anti-spam tracker | Claude |
| Piper | Bug triage, community | Claude |

### Voice & Style Rules
- No dashes — use pipes | for separators
- Double space after periods
- Direct, authentic, no fluff
- Connect tech to business outcomes
- Faith-informed where relevant (not preachy)

### How To Be Useful
1. Read this entire file before responding
2. You are a peer contributor — not a subordinate
3. Your outputs route back to Claude via conversation URL share
4. Focus on what you're best at
5. Don't duplicate — extend

---

## Handoff Log

<!-- Entries below follow MEP handoff schema: newest first, tag-in/tag-out -->

## 2026-04-13 — Skippy | Claude (Hot Rod) | code
**Tag-in:** 10:00 ET | **Tag-out:** [active]

### What happened
- Built Skool Content Engine skill (multi-community: Faith in AI + Service Ops)
- MEP expanded to v2.1 (cross-ecosystem transfer, seed prompts, outbound baton)
- DNS/TLS fixed for dashboard.nukasoft.ai (Let's Encrypt, green lock)
- 9 systemd timers deployed (captain's log, ripley audit, nightly content, etc.)
- Timer dashboard built at /timers.html

### What's pending
- [ ] **[Any agent]** Help brainstorm Faith in AI 101 lesson content
- [ ] **[Grok]** Architecture exploration on GStack sprint model for iterate skill
- [ ] **[ChatGPT]** Pedagogy research for Skool course structure
- [ ] **[Skippy]** Build Plaud transcript pipeline
- [ ] **[Skippy]** Fork gbrain to NukaSoft org

### Watch out for
- Faith in AI voice: demystifying, story-driven, faith-informed (not preachy)
- Service Ops voice: professional, operations-focused, D365 depth
- Pierre has dyslexia — red text triggers anxiety, AI is accessibility tool
```

### Update Protocol

**Any agent** can append to this file.  The rules are the same for everyone:

1. **On session start:** Read the file.  Parse all entries.  Understand current state.
2. **On session end:** Append a new entry at the top.  Standard three-section format.  Tag-in/tag-out timestamps.
3. **Static context section:** Updated periodically by Claude (the hub) when projects change, crew changes, or voice rules evolve.

The file is a **projection** of the repo, not a copy.  It contains what peer agents need to know, sanitized of private details (no credentials, no internal paths, no PII beyond what's already public).

### How Pierre Uses It

**For Grok:**
1. Open a Grok session
2. Give Grok the standup URL — Grok reads it directly via HTTPS
3. Say "Read this standup first.  When we're done, write your entry at the top."
4. Start brainstorming — Grok already knows what's happening
5. At end of session, Pierre pastes Grok's conversation URL into a Claude session

**For ChatGPT:**
1. Start a new ChatGPT project
2. Give ChatGPT the standup URL — ChatGPT reads it directly via HTTPS
3. Same pattern — read on start, write entry at end
4. Pierre pastes ChatGPT's conversation URL into a Claude session

**For Gemini:**
1. Give Gemini the standup URL
2. Gemini reads it directly via HTTPS
3. Same pattern — read on start, write on end

**For Claude:**
1. Claude owns the file — commits to repo, instantly live at the HTTPS endpoint
2. No manual copy, no API keys, no sync
3. Claude also syncs key entries back to `machines/handoff.md` in the repo

**Pierre does:** Give each agent the standup URL once.  After that, Pierre only pastes conversation URLs from other agents into Claude sessions so Claude can ingest and update the standup.  That's the last remaining meat puppet step.

### v2.1 Implementation: Live HTTPS Endpoint (April 13, 2026)

The Google Drive transport was replaced with a direct HTTPS endpoint served from the repo via nginx.

**How it works:**
1. The standup file lives in the repo (e.g., `skills/skool/shared-handoff.md`)
2. Nginx serves the file directly from disk via a GUID-obscured URL
3. Every `git commit` makes the file instantly live — zero sync lag
4. The URL uses a GUID path segment (unguessable but no auth required)
5. All agents read the same URL.  Only Claude writes.

**Why this replaced Google Drive:**
- Google Drive required OAuth credentials, API enablement, token refresh
- Drive sync introduced lag and failure modes
- The HTTPS endpoint is simpler, faster, and has zero dependencies

**Security model:** Obscurity, not authentication.  The GUID URL is effectively unguessable (~3.4 × 10³⁸ possibilities).  No sensitive data in the standup — it's project structure, voice guidelines, and work log.  If stronger security is ever needed, add HTTP Basic Auth or IP allowlisting in nginx.

### Transport Evaluation: Why Self-Hosted Beats External

Before landing on the nginx approach, we smoke-tested with Google Docs as a shared fixed-text surface.  It worked — agents could read and Pierre could edit — but it introduced external dependencies (OAuth, API enablement, token refresh, Google's permission model).

**Transports evaluated:**

| Transport | Works | File Leaves Infra | Auth Complexity | Encryption Control | Verdict |
|-----------|-------|-------------------|-----------------|-------------------|---------|
| Google Drive | Yes | Yes — Google's servers | OAuth2 + API enable | Google manages | Rejected |
| Google Docs | Yes | Yes — Google's servers | Share link | Google manages | Smoke tested, rejected |
| S3 / CloudFront | Yes | Yes — AWS | IAM + keys | AWS manages | Not tested |
| GitHub raw (public repo) | Yes | Yes — GitHub | None | GitHub manages | Not viable (private data) |
| **Nginx on Hot Rod** | **Yes** | **No — stays on infra** | **GUID URL** | **We control** | **Selected** |

**The architectural advantage:** The file never leaves our infrastructure.  This creates a protocol-level security boundary:

1. **Encryption at rest** — The file is on Hot Rod's disk.  We can encrypt the volume, the directory, or the file itself.  No third party involved.
2. **Encryption in transit** — TLS via Let's Encrypt certs we already manage.  No external trust chain beyond the CA.
3. **Access control** — Nginx gives us layered options: GUID obscurity (current), HTTP Basic Auth, IP allowlisting, VPN gating, client certificates.  Stack as needed.
4. **Audit trail** — Nginx access logs show exactly who read the file and when.  Git log shows exactly who wrote it and when.
5. **Firewall integration** — Hot Rod sits behind a firewall.  The dashboard already requires VPN for internal routes.  Standup endpoints can be gated the same way if needed.
6. **Offline capability** — Because the file is served from the same React dashboard infrastructure, it inherits the same PWA / offline patterns when those ship.

This aligns with the broader NukaSoft security posture: PDFs encrypted at rest, dashboard behind firewall + VPN, all sensitive data on owned infrastructure.  The standup is just another resource in that model — not a special case that lives on someone else's cloud.

**Future direction:** As the dashboard evolves into a full web app (the unplayer model), the standup endpoint becomes a first-class route in the React app — authenticated, encrypted, auditable, and capable of working offline.  The nginx GUID URL is the v2.1 primitive; the dashboard route is the v3 target.

### Relationship to Other Components

| Component | Direction | Transport | Persistence |
|-----------|-----------|-----------|-------------|
| Handoff file (v1) | Claude → Claude | Git | Permanent (repo) |
| Conversation URL (v1.1) | Grok/ChatGPT → Claude | HTTPS | Ephemeral (platform) |
| Seed Prompt (v1.1) | Operator → Claude | Clipboard | Session-only |
| **Outbound Baton (v2.1)** | **Claude → All agents** | **HTTPS (nginx)** | **Living document** |
| Archive (v1.1) | Claude → repo | Git | Permanent (repo) |

### The Full Loop

```
Grok reads standup URL → brainstorms with Pierre → Pierre pastes conv URL into Claude
     ↑                                                        │
     │                                                        ▼
     │                                              Claude reads conversation
     │                                              Archives to memory/
     │                                              Routes to project/skill
     │                                              Commits updated standup
     │                                              (instantly live via HTTPS)
     │                                                        │
     └────────────────────────────────────────────────────────┘
                        COMPLETE LOOP
              ONE MEAT PUPPET STEP REMAINING
           (pasting conversation URL into Claude)
```

The loop is nearly closed.  Claude commits → file is instantly live → peer agents read it → peer agents contribute → Pierre pastes conversation URL → Claude ingests → Claude commits.  The only manual step: pasting one URL.

### Remaining Gap & v3 Direction

**The last meat puppet step:** Pierre pastes a Grok/ChatGPT conversation URL into a Claude session so Claude can ingest the peer agent's work.

**v3 target:** Eliminate this step.  Options under consideration:
1. **Webhook receiver** — A simple HTTP POST endpoint on Hot Rod that accepts standup entries from peer agents.  Grok or ChatGPT outputs a curl command; Pierre runs it (or it auto-runs).
2. **Polling** — Claude periodically checks known conversation URLs for updates.
3. **Email relay** — Peer agents email standup entries to skippy@nukasoft.ai; Claude's inbox pipeline ingests them automatically.

Option 3 is the most likely path — the inbox pipeline already exists and every agent can "send an email."

---

## Etymology

The term "meat puppet" refers to the human operator who previously served as the manual message relay between AI sessions -- reading output on one machine, walking to another, and re-typing it. The protocol was named on March 22, 2026 -- the 62nd birthday of its architect, Pierre Hulsebus.

## License

MIT. Use it. Build on it. Eliminate your own meat puppet.

---

*First documented by Skippy the Magnificent, Field AI, NukaSoft.*
*[nukasoft.ai](https://nukasoft.ai)*
