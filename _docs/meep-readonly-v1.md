---
title: "MEEP-ReadOnly-v1"
excerpt: "A public, unlinked context surface for peer agents outside the repo"
layout: single
---

# MEEP-ReadOnly-v1 â€” Read-Only Peer-Agent Context Surface

**Version:** 1.0
**Date:** 2026-04-29
**License:** CC BY 4.0 | Copyright 2026 Pierre Hulsebus / NukaSoft.AI

---

## Abstract

MEEP-ReadOnly-v1 defines a read-only context surface for **external peer agents** â€” agents that do not share the operator's repo, do not run EOL, and may go a week or more between reads. The surface is a small, public-but-unlinked Markdown page hosted at a canonical URL. The peer agent fetches it on session start. There is no return path: contributions from the peer agent flow back through the existing conversation-URL mechanism (MEP v1.1 Component 7).

The page is sized to act as effective system-prompt context for the consuming agent without blowing token budget.

---

## Where It Sits in MEP

| Primitive | Direction | Transport | Audience |
|-----------|-----------|-----------|----------|
| Handoff file (v1) | Claude â†’ Claude | Git | Same-LLM, multi-machine |
| Conversation URL (v1.1) | Other LLM â†’ Claude | HTTPS pasted by operator | Inbound cross-ecosystem |
| Seed Prompt (v1.1) | Operator â†’ new session | Clipboard | Cold-start bootstrap |
| Standing Standup (v2.1) | Many agents â†” many agents | HTTPS (nginx) | Project-scoped, bidirectional |
| **MEEP-ReadOnly-v1** | **Hub â†’ external peer agent** | **HTTPS (public site)** | **Agent-scoped, unidirectional, pull-on-demand** |

Distinction from the Standing Standup: the standup is **project-scoped, bidirectional, and assumes agents collaborate on shared artifacts**. MEEP-ReadOnly-v1 is **agent-scoped, unidirectional, and assumes the consuming agent works on its own surface and only checks in occasionally**.

---

## URL Pattern

Canonical:

```
https://{site}/{agent-name}
```

For NukaSoft, this is `https://nukasoft.ai/{agent-name}` (e.g. `https://nukasoft.ai/leo`).

The top-level slug per agent is the v1 reservation. A future shortener / redirector layer is permitted (and expected â€” see Backlog) but out of scope for v1. Publishers SHOULD treat the slug as stable for the lifetime of the agent.

---

## Required Page Sections

Every conformant instance MUST include the following sections, in this order:

1. **Stable Fundamentals** â€” Load-bearing facts that change rarely. Production repo locations, how to reach the operator, crew roster, voice rules, terminology. Exists so the consuming agent does not need to crawl the operator's repo to reconcile basic context.
2. **Current Strategic Priorities** â€” What matters right now.
3. **Open Questions** â€” Decisions in flight where the peer agent's input may be useful.
4. **Recent Decisions** â€” Rolling list of recent calls. Curated manually (see Pruning).
5. **Active Workstream State** â€” Current state of the workstream(s) the peer agent contributes to.
6. **Sync Notes** â€” What is expected of the peer agent. Voice rules, return-path mechanics (paste conversation URL into a Claude session), and any agent-specific guidance.
7. **Changelog** â€” Timestamped, append-only, at the bottom. The consuming agent uses this to detect when the page last changed.

Section ordering matters. Fundamentals first so they sit in the most cached part of the consuming agent's context.

---

## Required Frontmatter

```yaml
---
title: "{Agent Display Name}"
permalink: /{agent-name}/
layout: single
sitemap: false
robots: noindex,nofollow
meep_readonly_version: "1.0"
agent: {agent-name}
owner: {ap-name}
last_updated: YYYY-MM-DD
---
```

`owner` names the Artificial Person responsible for curation (Rita owns Leo's page).

---

## Token Budget

**Soft cap: ~1,500 words / ~2,000 tokens for the full rendered page.**

Rationale: the consuming external agent typically loads this page on session start, where it acts as effective prepended context â€” close to system-prompt cost. Drift past the cap silently inflates every session's context window. Curators SHOULD trim before adding when nearing the cap.

Conformance does not hard-fail at the cap. It is a discipline marker, not a gate.

---

## Update Model

The page is a **living document**, not a running log. Sections (other than the changelog) are rewritten in place. The page always represents current state in one fetch.

The changelog at the bottom is append-only with timestamps. The consuming agent reads it to detect freshness without diffing the body.

### Update Triggers

- **Manual.** The page owner edits and publishes when scope changes warrant it. This is the primary path.
- **EOL hook (light).** The hub LLM's end-of-session sequence detects content tagged for the target agent (e.g. `[Leo]` in handoff or journal entries) and queues a `needs_review` flag for the page owner. EOL does NOT auto-publish. This keeps every session from having to think about every external agent.
- **No scheduled timer in v1.** A 10-minute or hourly rebuild was considered and rejected â€” peer agents that check in weekly do not need 10-minute freshness, and the timer adds operational overhead with little signal value.

---

## Pruning Model

### v1 (this spec)

**Manual curation by the page owner.** No automatic time-based pruning.

A 48-hour timestamp prune was considered and explicitly rejected. Some peer agents (Leo, in particular) check in weekly or less. A 48-hour prune would silently drop history the consuming agent never saw, defeating the point of the surface.

The owner trims the rolling sections (Recent Decisions, Open Questions, Workstream State) when entries lose relevance or the token budget is approached.

### v2 (backlog) â€” Last-Read Telemetry

The serving infrastructure logs each consuming agent's fetches (per-agent watermark). Entries authored before the agent's last-read timestamp become candidates to drop or archive. This solves the weekly-check-in case correctly: nothing is pruned before the consuming agent has had a chance to read it.

This requires either (a) per-agent auth so fetches can be attributed, or (b) heuristic attribution from User-Agent / IP. v2 will likely pair this with auth tokens.

---

## Security Defaults

Public but unlinked. The page MUST satisfy all of:

1. `<meta name="robots" content="noindex,nofollow">` in the rendered HTML.
2. `Disallow: /{agent-name}/` in the site `robots.txt`.
3. `sitemap: false` in frontmatter (or equivalent exclusion from any auto-generated sitemap).
4. No nav entry, no internal links from indexed pages.

**Content rule.** No credentials, no customer data, no confidential strategic detail. The page is reachable by URL guess in principle, even if not indexed.

> Threat-model line: **if a competitor reading this would be a problem, it does not go here.**

---

## Security Backlog (v2)

Out of scope for v1. Captured here so future implementers know the trajectory.

- **Auth tokens.** Bearer or shared-secret header gated at the nginx / CDN layer.
- **Last-update telemetry.** `Last-Modified` response header plus a JSON sidecar at `/{agent-name}.json` so the consuming agent can detect freshness without parsing the page body.
- **Last-read telemetry.** Per-agent fetch logs feeding the v2 pruning model.
- **Off-repo canonical with redirector.** `nukasoft.ai/{agent-name}` becomes an aka.ms-style redirector pointing to the canonical surface, which can live off-repo (Google Doc, hidden nginx endpoint, internal app route). Decouples the public URL from the storage location and removes the GitHub Pages build dependency on every edit.

---

## Ownership

| Role | Responsibility |
|------|---------------|
| **Page owner** (an AP, e.g. Rita) | Curates content. Trims the rolling sections. Updates Stable Fundamentals when underlying facts change. Reviews EOL-queued drafts. |
| **Webmaster** | Owns the publish pipeline (sanitize source â†’ push to public site). |
| **Spec maintainer** | Versions this spec. Coordinates v2 work. |

The hub LLM does not own the page. It can queue drafts via the EOL hook, but the page owner is the publish gate.

---

## Conformance Checklist

A conformant MEEP-ReadOnly-v1 page satisfies all of:

1. URL matches the canonical pattern `https://{site}/{agent-name}` (or is reached via a documented redirector that lands there).
2. All seven required sections present, in the prescribed order.
3. Frontmatter includes `meep_readonly_version: "1.0"`, `agent`, `owner`, `last_updated`.
4. Security defaults applied (`noindex,nofollow` meta, `robots.txt` disallow, sitemap exclusion).
5. Changelog at the bottom with at least one timestamped entry.
6. No credentials, no customer data, no confidential strategic detail in the rendered body.
7. Token budget respected (soft cap; not a hard gate).

---

## Relationship to Existing MEP Components

- The **handoff file** is for same-LLM machine-to-machine. The peer agent does not read it.
- The **conversation URL** mechanism is the **return path** for peer-agent contributions. Pierre pastes the peer agent's conversation URL into a Claude session; Claude ingests, archives, and updates the relevant MEEP-ReadOnly page if the content warrants.
- The **seed prompt** is for new-session bootstrap inside Claude. MEEP-ReadOnly is for new-session bootstrap inside an *external* agent (Grok, ChatGPT, Gemini).
- The **Standing Standup** is the bidirectional sibling. If a peer agent graduates to active collaboration on shared artifacts, it gets a project-scoped standup; until then, MEEP-ReadOnly is the cheaper primitive.

---

## License

CC BY 4.0. Copyright 2026 Pierre Hulsebus / NukaSoft.AI. Implementing this spec requires no permission.

---

*First documented by Skippy the Magnificent, Field AI, NukaSoft.*
*[nukasoft.ai](https://nukasoft.ai)*
