---
title: "MEP MEEP-ReadOnly-v1"
excerpt: ""
version: "MEEP-ReadOnly-v1"
release_date: 2026-04-29
---

**Released 2026-04-29** | [Read the specification at this version](/docs/meep-readonly-v1/)

**Read-only peer-agent context surface.**

### Added
- **`spec/meep-readonly-v1.md`** | New sibling spec defining a small, public-but-unlinked Markdown page that external peer agents (Grok, ChatGPT, Gemini) fetch on session start. Unidirectional, agent-scoped, pull-on-demand. Sized to act as effective system-prompt context without blowing token budget.
- **First instance:** Hastings (Leo) at `nukasoft.ai/leo`. Page owner: Rita. Source scaffolded at `site/_pages/leo.md`.
- **Required sections** | Stable Fundamentals, Current Strategic Priorities, Open Questions, Recent Decisions, Active Workstream State, Sync Notes, Changelog.
- **Token budget** | Soft cap ~1,500 words / ~2,000 tokens per page.

### Design Decisions
- **Not a Standing Standup.** The standup (v2.1) is bidirectional and project-scoped. MEEP-ReadOnly-v1 is unidirectional and agent-scoped. Different problem, different primitive.
- **No time-based pruning in v1.** A 48-hour prune was considered and rejected: peer agents that check in weekly would silently lose history they never read. Manual curation by the page owner instead. v2 path is last-read telemetry.
- **No scheduled rebuild timer in v1.** External peer agents do not need 10-minute freshness; the timer adds operational overhead with little signal value. Triggers are manual + a light EOL hook that queues drafts but does not auto-publish.
- **Security via obscurity + content discipline.** `noindex,nofollow`, `robots.txt` disallow, no sitemap entry. Content rule: if a competitor reading this would be a problem, it does not go on the page. Auth tokens are v2 backlog.
- **URL shortener / redirector deferred to v2.** Direct `nukasoft.ai/{agent-name}` is the v1 primitive; an aka.ms-style redirector to an off-repo canonical surface is the expected next step.

---

---

[All releases](/releases/) | [Current specification](/docs/mep-protocol/)
