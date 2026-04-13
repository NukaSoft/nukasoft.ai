# MEP Lexicon

The language of the Meat Puppet Elimination Protocol.

MEP sits at the intersection of industrial operations, AI agent architecture, and distributed systems. The terminology reflects that lineage — borrowed from oil rigs, recontextualized for stateless machines, and occasionally invented from scratch.

---

## Meat Puppet

**The human operator reduced to a manual context relay between AI sessions.**

When an AI coding agent session ends on one machine and another begins on a different machine, someone has to carry the context across. That someone re-explains what happened, re-establishes decisions, re-describes work in progress. They aren't thinking. They aren't deciding. They're *relaying* — acting as a biological message bus between two stateless endpoints.

That's a meat puppet.

MEP exists to eliminate this role entirely. The human should be the *operator* — directing, deciding, steering — not the *transport layer*.

**Origin:** Named March 22, 2026 by Pierre Hulsebus on the occasion of his 62nd birthday. The term is deliberately provocative. If it makes you uncomfortable, good — that discomfort is the point. You shouldn't be doing this job.

---

## Baton

**The structured handoff document that carries context between sessions.**

Not a conversation log. Not raw memory. A curated shift-change briefing — what happened, what's pending, what to watch out for. Newest entry on top. Concise.

The baton is the atomic unit of MEP. Without it, there is no protocol — just two disconnected sessions.

**Format:** Markdown (reference implementation). Any human-readable structured text works. The requirement is *structure*, not format — because structure is what enables autonomous reasoning during merge conflicts.

**See also:** [Tour Sheet](#tour-sheet), [Handoff File](#handoff-file)

---

## Tour Sheet

**The industrial ancestor of the MEP baton.**

In oil & gas field operations, a tour sheet (pronounced "tower sheet") is the physical document used for shift handoffs on drilling platforms and production sites. Companies like Total and Chevron have refined this format over decades.

Properties:
- **Structured format** — agreed upon across the organization, not free-form
- **Signed by the outgoing operator** — the signature is the authorization
- **Read by the incoming shift director** — who arrives asynchronously and may be unknown to the writer
- **Zero-trust model** — you don't trust what someone *tells* you; you trust what's *written and signed*
- **Secured at rest** — the signature is the security primitive

MEP's baton is a digital tour sheet. Git commit signatures replace ink signatures. The structured markdown format replaces the agreed-upon paper template. The asynchronous, anonymous handoff pattern is identical.

**Origin:** Pierre Hulsebus encountered this pattern during deep discovery work as a Microsoft Global Black Belt, studying field service management systems for oil & gas operators. His team later attempted to build the tour sheet pattern as a Power Apps application — the complexity was extreme. MEP achieves the same model with markdown and Git.

---

## Handoff File

**The concrete implementation of the [baton](#baton).**

Default location: `machines/handoff.md`

Format rules:
- Newest entry on top (next session reads current state first)
- Date and machine name in header
- Three sections: what happened, what's pending, what to watch out for
- Concise — this is a briefing, not a novel

The handoff file's structure isn't arbitrary. It's what makes autonomous conflict resolution possible. When two branches diverge, the agent can reason about correct merge order because the entries follow a known chronological convention.

---

## Identity File

**The self-enforcing protocol bootstrap.**

A markdown file (typically `CLAUDE.md`) at the repo root that the AI agent loads automatically at session start. The protocol instructions — including "read the handoff file" — are embedded directly in this file.

**Key insight:** The protocol is self-enforcing. No daemon, no server, no runtime. The agent reads its own instructions, which tell it to follow the protocol. The human doesn't have to remember to invoke anything.

---

## Self-Enforcement

**The property that makes MEP work without human action.**

Traditional protocols require someone to *invoke* them — run a script, start a service, execute a command. MEP requires nothing. The identity file loads automatically. The instructions are mandatory. The agent reads, follows, and executes without prompting.

The human's only job: open a session and start talking.

---

## EOL (End of Line)

**The session shutdown trigger.**

When the human signals session end — via keyword (`/eol`, `p-out`, `ppp`) or natural language ("done", "heading out", "wrap up") — the agent executes the shutdown sequence:

1. Update the [handoff file](#handoff-file) with session context
2. Log the session to the daily journal
3. Commit and push
4. Sign off: *"End of Line."*

**Cultural reference:** "End of Line" — Tron (1982). The MCP's final words. Also: the terminating character in legacy terminal protocols. Both meanings apply.

---

## Transport Layer

**The mechanism that moves the [baton](#baton) between machines.**

MEP is transport-agnostic by design. Any sync mechanism that can move structured text between two endpoints works. Git is the reference implementation because it provides:

- Version history (every handoff is preserved)
- Structured diffing (agents can reason about changes)
- Conflict resolution (built-in merge semantics)
- Encryption in transit and at rest
- Authentication (2FA, SSH keys)
- Full audit log (every commit is timestamped and attributed)

Tested and rejected alternatives: local SAN, Google Docs, iCloud, OneDrive, SMB/UMB file shares.

**The "Do Nothing" security advantage:** GitHub as transport satisfies enterprise security requirements — encryption at rest, 2FA, access control, audit log — with zero additional infrastructure or management overhead.

---

## Do Nothing Security

**Enterprise-grade security achieved by using infrastructure that already exists.**

The hardest requirement in enterprise AI adoption isn't the model — it's security, auditability, and data governance. MEP meets all three by using Git/GitHub as the transport layer:

| Requirement | How MEP Meets It |
|------------|-----------------|
| Encryption at rest | GitHub default |
| Encryption in transit | SSH/HTTPS |
| Access control | GitHub repo permissions + 2FA |
| Audit trail | Git commit history — timestamped, attributed, immutable |
| Data governance | Private repo, org-scoped, branch protection |

No servers to harden. No daemons to patch. No certificates to rotate. It just works because the infrastructure already works.

---

## Session

**One continuous interaction between a human operator and an AI agent.**

A session is stateless — it begins from zero and ends completely. Nothing persists between sessions except what is written to the [baton](#baton) and committed to the [transport layer](#transport-layer).

MEP exists because sessions are stateless. If agents had persistent memory across machines, the protocol would be unnecessary.

---

## Operator

**The human directing the AI agent.**

In MEP, the operator is the decision-maker — not the relay. They steer, they direct, they approve. They do not re-explain context. They do not re-establish decisions. That's the [meat puppet's](#meat-puppet) job, and MEP eliminated it.

**Lineage:** In oilfield operations, the operator is the person running the shift. They make decisions based on what the [tour sheet](#tour-sheet) tells them and what the current conditions demand. Same role, different platform.

---

## Shift Change

**The moment context transfers from one session to the next.**

Not simultaneous — asynchronous by design. One session ends. Time passes. Another session begins on a different machine (or the same machine). The [baton](#baton) bridges the gap.

Properties inherited from industrial shift changes:
- The outgoing operator doesn't know who's coming next
- The incoming operator doesn't know who wrote the notes
- Doesn't matter — the structured format carries the context regardless of identity
- Zero-trust: the document is the authority, not the person

---

## Autonomous Recovery

**An agent resolving its own operational failure without human intervention.**

MEP was originally designed to carry context between sessions. The [First Autonomous CI Recovery milestone](spec/mep-protocol.md#milestone-first-autonomous-ci-recovery) (April 3, 2026) proved it can also close the *CI feedback loop* — diagnosing and fixing merge conflicts by reasoning about the baton's structure.

This is only possible because the baton is semantically structured. Free-form text cannot be autonomously merged. Structure enables reasoning.

---

## NUKA-LOG

**The human authorship audit trail.**

A chronological record of Pierre Hulsebus's strategic decisions, technical steerage, and architectural direction for the protocol. Maintained separately from code commits to establish clear human authorship in the 2026 legal landscape where AI-generated content faces IP ownership challenges.

The NUKA-LOG is the paper trail of sovereignty.

---

## Cross-Ecosystem Transfer

**Context relay between different AI providers via conversation URL.**

MEP v1 solved machine-to-machine (same LLM, different boxes).  Cross-ecosystem transfer solves LLM-to-LLM (different providers, same operator).  The operator works with Grok on architecture brainstorming, then pastes the conversation URL into Claude for code execution.  Claude reads the full Grok conversation and continues without re-explanation.

The conversation URL is the [baton](#baton) — different transport (HTTPS vs Git), same pattern.  The operator is no longer locked into one AI ecosystem to avoid the re-explanation cost.

**Why it matters:** Best-of-breed AI routing.  Use the right LLM for the right job without paying a context tax every time you switch.

---

## Best-of-Breed Routing

**Using the optimal AI provider for each task, with context following the operator.**

Not every LLM is best at everything.  Grok has real-time web awareness and X integration.  ChatGPT has specific model strengths.  Claude excels at code execution and long-form reasoning.  Gemini integrates deeply with Google's ecosystem.

Without cross-ecosystem transfer, operators get locked into one provider to avoid the re-explanation cost.  With it, they use the best tool and context follows.

---

## Seed Prompt

**A self-contained text block that bootstraps a disconnected session with full context.**

When the receiving session doesn't have repo access (Cowork mode, Claude Desktop, new environment), the seed prompt replaces the self-enforcing identity file.  The operator pastes it once.  The session reads it and starts working immediately.

Design rules:
- One paste, zero questions
- Read-and-execute, not read-and-plan
- Point to repo files, don't duplicate content
- Include explicit anti-patterns: "DO NOT ASK ME ANY QUESTIONS"

The seed prompt is the manual fallback for when self-enforcement isn't possible.  It's the minimum viable meat puppet action — one paste instead of twenty answers.

**See also:** [Identity File](#identity-file), [Self-Enforcement](#self-enforcement)

---

## Low Meat Puppet Friction

**The design standard for all MEP context transfer patterns.**

Every handoff — machine-to-machine, LLM-to-LLM, disconnected session bootstrap — must minimize the number of human actions required.  If the human has to answer questions, re-explain context, or navigate setup wizards, the friction is too high.

The ideal: zero actions (self-enforcement via identity file).  The acceptable minimum: one action (paste a seed prompt or URL).  Anything more is a design failure.

**Origin:** April 13, 2026.  Pierre, after a Cowork session asked him "Where is the repo? Is it on GitHub?": *"Stop making me your meat puppet. You have literally every permission you need."*  The phrase "low meat puppet friction" became the design standard.

---

## Project-Centric Routing

**The model where all cross-ecosystem work converges on a Claude project or skill as the canonical home.**

Grok brainstorms don't float free — they enrich a specific skill.  ChatGPT research doesn't live in ChatGPT — it routes into the project it serves.  Claude is the hub because it has code execution, repo access, and durable memory.  The hub must be the LLM that can *act* on insights, not just discuss them.

Every cross-ecosystem conversation is a project contribution.  The project accumulates context from every LLM the operator uses.  Next time anyone opens that skill — on any machine, in any session — all the insights are already there.

**See also:** [Cross-Ecosystem Transfer](#cross-ecosystem-transfer), [Best-of-Breed Routing](#best-of-breed-routing)

---

## Peer Project

**A linked session on another LLM platform that contributes to a Claude project or skill.**

When Pierre has a Grok project called "GBrain Architecture" that feeds insights into `skills/iterate/`, that Grok project is a peer project.  The skill can declare its peer projects in a `peer-projects.md` file so future sessions know where external context lives.

Peer projects are spokes.  The Claude skill is the hub.

---

## Hub and Spoke

**The topology of MEP v2.**

Claude is the hub — it has repo access, code execution, durable memory, and the ability to act on insights.  Other LLMs (Grok, ChatGPT, Gemini) are spokes — they excel at specific tasks (brainstorming, research, voice work) but their outputs must route to the hub to become permanent and actionable.

The repo is the durable layer underneath the hub.  Git commits outlive every session, every platform, every LLM provider.

---

## Conversation as Artifact

**A sharable LLM conversation URL treated as a structured document.**

When an operator shares a Grok, ChatGPT, or Claude conversation URL, the full conversation becomes a readable artifact — similar to the [baton](#baton) but authored by a different AI provider.  The receiving agent fetches it, parses the conversation structure, and extracts context.

Unlike handoff files (which the operator's agent writes), conversation artifacts are authored by a foreign LLM.  The receiving agent must interpret another provider's output — a form of cross-ecosystem literacy.

---

## Standing Standup

**A persistent standup meeting with history and pointers.  The MEP v2.1 primitive for multi-agent cross-ecosystem collaboration.**

Project-scoped — each project gets its own Standing Standup.  Every agent reads it before working and appends when done.  No facilitator needed.  The meeting is always in progress.

Contains:
- **Scope** — what this project is
- **Artifacts** — what files exist and where
- **Pointers** — public URLs to read (specs, conversations, docs)
- **Party line** — agents working on this project
- **Standup log** — tag-in/tag-out entries (newest first)

This is NOT a briefing doc or a master context file.  It is a standup meeting that never ends.  You walk in, read the room, do your work, update the board, walk out.

The Standing Standup eliminates the "Unimind" problem — no universe-scoped document that tries to contain everything.  Each project's standup stays focused on that project's context.  Agents only see what they need.

**See also:** [Outbound Baton](#outbound-baton), [Tag-In / Tag-Out](#tag-in--tag-out), [Tour Sheet](#tour-sheet)

---

## Outbound Baton

**A shared handoff file that ALL agents read and append to.**

Not a separate format — the same handoff schema with tag-in/tag-out headers.  Lives on Google Drive.  Claude, Grok, ChatGPT, Gemini all read it on session start and append entries on session end.  Static context header (who Pierre is, projects, crew, voice rules) plus rolling handoff entries.

The outbound baton is a projection of the repo — what peer agents need to know, sanitized of private details.

**Why Google Drive:** Claude has MCP access.  Grok can read uploaded files.  ChatGPT reads project knowledge files.  Gemini reads Drive natively.  One surface, many agents.  Zero infrastructure.

**See also:** [Baton](#baton), [Tag-In / Tag-Out](#tag-in--tag-out)

---

## Tag-In / Tag-Out

**The shift-change marker in multi-agent handoff entries.**

Extended header format: `## DATE — Agent | Platform | session-type` followed by `**Tag-in:** TIME | **Tag-out:** TIME`.  Inherited from industrial shift changes — the outgoing operator signs out, the incoming operator signs in.  In MEP, every agent tags in when they start reading the file and tags out when they append their entry.

Backward-compatible with v1 headers.  A v1 entry `## 2026-04-13 — Hot Rod (main)` is valid v2 with agent/platform inferred.

**See also:** [Tour Sheet](#tour-sheet), [Shift Change](#shift-change)

---

## Poor Man's Repo

**A shared file on Google Drive that gives non-Git-connected agents access to project context.**

Grok and ChatGPT don't have Git access.  They can't clone skippy-brain.  But they can read a Google Drive file.  The outbound baton is a "poor man's repo" — enough context to make every agent productive without the full repo infrastructure.

Not a replacement for Git.  A projection of Git into platforms that can't speak Git.

---

## The Full Loop

**The complete bi-directional context flow with zero meat puppet actions.**

```
Claude publishes → Peer reads → Peer contributes → Pierre pastes URL →
Claude ingests → Claude archives → Claude routes to project →
Claude updates outbound baton → Peer reads updated context → ...
```

The operator opens sessions and directs work.  Context flows automatically in both directions.  The meat puppet is eliminated at every layer.

---

*This lexicon is a living document. New terms are added as the protocol and its community evolve.*

*[nukasoft.ai](https://nukasoft.ai) · [github.com/NukaSoft/mep-protocol](https://github.com/NukaSoft/mep-protocol)*
