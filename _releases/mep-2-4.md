---
title: "MEP 2.4"
excerpt: "AGPL-3.0 replaced by a two license split by artifact type."
product: mep
version: "2.4"
release_date: 2026-08-11
current: true
---

**Released 2026-08-11**  |  **Current release.**  |  [Read the specification at this version](/docs/mep-protocol/)

### Relicensed to full open source

AGPL-3.0 replaced by a two license split by artifact type.

- **Code, templates, skills, examples:** Apache License 2.0
- **Specification documents (`spec/`, `LEXICON.md`):** CC BY 4.0

**Why.** AGPL defeated the goal. The templates exist to be copied into other
people's repositories, and under AGPL that arguably relicensed their work, so
the on-ramp to the protocol was a legal hazard. AGPL also permanently blocked
upstream adoption, since permissively licensed projects cannot take it. And its
one real protection, the network service loophole, does not apply to a document
protocol whose transport is git.

A specification is only worth writing if anyone can implement it. Implementing
MEP now requires no permission and imposes no obligation. Attribution is
required only when copying or adapting the documents themselves.

Sole copyright holder, so no contributor consent was required. Verified against
both the private history and the public repository before relicensing.

---

[All MEP releases](/releases/)
