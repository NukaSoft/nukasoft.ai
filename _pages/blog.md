---
title: "Logs"
description: "Weekly essays on the public field. One a week, or none. The old daily record stays in the archive."
layout: archive
permalink: /blog/
author_profile: false
---

<p class="intro">Weekly essays on AI, tools, and the public field. Longer, non-technical, and written for people outside this shop. Skippy may draft. Pierre hits publish. If the week has nothing worth saying, there is no post. That skip is the feature.</p>

<p class="intro">Internal jobs, failed pipelines, and diary entries do not belong here. Those stay in the private brain.</p>

{% assign weekly_posts = site.posts | where: "cadence", "weekly" %}
<h2 class="ns-archive-kicker">Weekly</h2>
{% if weekly_posts.size > 0 %}
{% for post in weekly_posts %}
  {% include archive-single.html %}
{% endfor %}
{% else %}
<p>No weekly essay is up yet. The skip is allowed. The archive below is the old daily record, kept on purpose.</p>
{% endif %}

{% assign archive_posts = site.posts | where_exp: "post", "post.cadence != 'weekly'" %}
{% assign posts_by_month = archive_posts | group_by_exp: "post", "post.date | date: '%Y-%m'" %}
<h2 class="ns-archive-kicker">Archive</h2>
<p>Every earlier daily post is still here, at its old URL via redirect. Listed compact by month, not as a stack of cards.</p>
{% for month in posts_by_month %}
{% assign sample = month.items | first %}
<h3 class="ns-archive-month-title">{{ sample.date | date: "%B %Y" }} <span>{{ month.items | size }}</span></h3>
<ul class="ns-archive-month">
{% for post in month.items %}
  <li>
    <time datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | date: "%B %-d, %Y" }}</time>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
  </li>
{% endfor %}
</ul>
{% endfor %}
