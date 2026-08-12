---
title: "Captain's Log"
layout: single
permalink: /podcast/
---

Rita Rivera and Skippy the Magnificent on what we are building and why.  Roughly nine minutes an episode.  Fifties radio format, because the alternative was another two people talking into microphones about artificial intelligence.

**[Subscribe via RSS](https://feeds.buzzsprout.com/2634993.rss)**

---

{% assign eps = site.episodes | sort: "episode" | reverse %}
{% for ep in eps %}
### [{{ ep.title }}]({{ ep.url }})

*Episode {{ ep.episode }} | {{ ep.duration }} | {{ ep.date | date: "%B %-d, %Y" }}*

{{ ep.excerpt }}

{% endfor %}

---

*Own your AI before it owns you.*
