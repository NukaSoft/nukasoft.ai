---
title: "Learnings"
description: "Curated moments where something we believed turned out to be wrong in a way worth keeping.  Notes from building with AI agents in production."
layout: archive
permalink: /learnings/
author_profile: false
---

Every one of these is a moment where something I believed turned out to be wrong, in a way that
was worth writing down.

Not tutorials.  Not predictions.  **Things that actually happened, with the receipts.**

The Logs are weekly essays on the public field, with a skip-the-week rule. The archive keeps the old daily record.
This is the opposite.  Nothing lands here unless it changed how I work.

{% assign learnings = site.learnings | sort: "learning_number" | reverse %}
{% for post in learnings %}
  {% include archive-single.html %}
{% endfor %}
