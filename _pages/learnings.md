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

The Captain's Log is the daily record and it runs whether anything interesting happened or not.
This is the opposite.  Nothing lands here unless it changed how I work.

{% assign items = site.learnings | sort: "learning_number" | reverse %}
{% for item in items %}
  {% include archive-single.html post=item %}
{% endfor %}
