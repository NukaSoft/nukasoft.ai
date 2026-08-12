---
title: "MEP 1.0"
excerpt: ""
product: mep
version: "1.0"
release_date: 2026-03-22
current: false
---

**Released 2026-03-22**  |  [Read the specification at this version](/docs/mep-protocol-v1/)

**Initial release.**

### Added
- Session protocol: identity file (`CLAUDE.md`) with mandatory start/end sequences
- Handoff file schema: three-section structure (what happened / pending / watch out for), newest-first ordering
- EOL trigger keywords: `/eol`, `p-out`, `ppp`, and natural language phrases
- Git as reference transport layer — encryption at rest, 2FA, conflict resolution built in
- Self-enforcement mechanism: agent reads own protocol from identity file

### Design Decisions
- Markdown chosen as reference baton format: diffable, autonomously mergeable, no tooling required
- Format-agnostic by design: any structured human-readable text is a valid baton
- No new infrastructure: Git, markdown, SSH — all pre-existing in any dev workflow

### Validated Transports
- Git (GitHub/GitLab): conformant ✅
- SMB/UMB file shares: rejected — non-deterministic file locking ❌
- iCloud, OneDrive, Google Docs: rejected — no structured diff support ❌

---

---

[All MEP releases](/releases/)  |  [Current specification](/docs/mep-protocol/)
