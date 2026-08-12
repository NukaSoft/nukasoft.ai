---
title: "MEP Releases"
layout: single
permalink: /releases/
---

Every version of the Meat Puppet Elimination Protocol, newest first.  Generated from the changelog, so this page and the repository cannot disagree.

The current specification is **[MEP 2.4](/docs/mep-protocol/)**.

---

{% assign rels = site.releases | sort: "release_date" | reverse %}
| Version | Released | What changed |
|---------|----------|--------------|
{% for r in rels %}| [**{{ r.version }}**]({{ r.url }}) | {{ r.release_date | date: "%b %-d, %Y" }} | {{ r.excerpt }} |
{% endfor %}

---

Specifications published at a version:

- **[2.4](/docs/mep-protocol/)** | current
- **[MEEP-ReadOnly-v1](/docs/meep-readonly-v1/)** | sibling spec, read-only peer surface
- **[1.0](/docs/mep-protocol-v1/)** | archived, the original

Apache 2.0 for code, CC BY 4.0 for documents.
