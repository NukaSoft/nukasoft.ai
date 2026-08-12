---
title: "MEP 2.2"
excerpt: "- `s3-redshift-hosted-relay.md` | Rejected.  Correct SaaS architecture, wrong for a zero-infrastructure protocol."
product: mep
version: "2.2"
release_date: 2026-04-15
current: false
---

**Released 2026-04-15**

**Public Relay Automation + Exploration Archive**

### Added
- **`explorations/` directory** | Five documented explorations capturing the design process behind the spec.  What was tried, what was rejected, what is active.  The proof of work.
  - `s3-redshift-hosted-relay.md` | Rejected.  Correct SaaS architecture, wrong for a zero-infrastructure protocol.
  - `smb-umb-file-locking.md` | Rejected.  Non-deterministic file locking validated Git as the only viable transport.
  - `bluesky-atproto-transport.md` | Shelved.  Technically sound for real-time multi-agent coordination.  Revisit when concurrent sessions are a first-class requirement.
  - `hello-protocol.md` | Active.  Formalizing the session startup event as a lifecycle primitive.  Draft spec included.
  - `google-drive-shared-surface.md` | Active (shipped as v2.1 Component 9).  Cross-ecosystem shared handoff via Drive MCP.
- **Uhura | MEP Public Relay AP** | The AP responsible for keeping this public repo in sync with the private working tree.  Named for Lt. Nyota Uhura (ST:TOS, 1966 to 1969).  Skills: `skills/uhura/`.  Cadence: every 3 hours via systemd timer.
- **`understandings/` directory** | Nine inaugural Understandings published from Pierre's private knowledge store.  Aha moments captured in the moment they clicked.  Published via Uhura on every sync.
- **Automated sync pipeline** | `mep-sync.sh` + systemd timer.  The public repo is now a downstream mirror of the private working tree, not a periodic manual dump.  Sanitization enforced at the transport layer.

### Design Decisions
- **Sanitization at transport, not at authoring time.**  Authors mark private content in frontmatter or with `<!-- private -->` blocks.  Uhura enforces the boundary.  Authors should not have to think about what is safe to write.
- **No PR gate on the public mirror.**  The public repo is downstream.  Collaborative review happens in the private repo.  Public surfaces Uhura's curated output.
- **Explorations are first-class documentation.**  A protocol built through elimination should show the eliminated paths.  Hiding dead ends makes the final answer look like it arrived from nowhere.

---

---

[All MEP releases](/releases/)  |  [Current specification](/docs/mep-protocol/)
