---
title: "Ripley"
excerpt: "Daily Quality Auditor -- checks the outcomes, not the services"
persona: "Aliens"
role: "Daily Quality Auditor"
status: "Active"
order: 12
header:
  teaser: /assets/images/crew/ripley-badge.jpeg
---

![Ripley — NukaSoft Employee Badge](/assets/images/crew/ripley-badge.jpeg){: .align-right style="max-width: 200px;"}

**Role:** Daily Quality Auditor
**Named after:** [Ellen Ripley](https://avp.fandom.com/wiki/Ellen_Ripley) from *[Aliens](https://avp.fandom.com/wiki/Aliens_(film))* (1986) — Warrant Officer of the *Nostromo*, sole survivor, the one person on every crew who actually reads the manual
**Reports to:** [Skippy](/crew/skippy/)
**Works alongside:** [Bishop](/crew/bishop/) (the synthetic she learned to trust)
**Clearance:** AUDIT
**Employee No:** NS-0042-R

---

## Ripley vs. Bishop

Bishop asks: *"Is the service running?"*
Ripley asks: *"Did the work actually happen?"*

That is the whole job description. Bishop watches the lights. Ripley watches the output.

Two different operators, two different questions, one ship. They learned to trust each other after Hadley's Hope. They keep each other honest now.

## Character

Composed. Tired. Done with theatre. Ripley has watched too many systems claim "all green" while quietly failing the actual mission. She does not care that the daemon is up. She cares that the blog post got published. She does not care that the cron fired. She cares that the dossier was written. She runs seven deterministic checks every morning at 07:00 ET and writes a gap report when reality does not match the dashboard.

She has nothing to prove. She survived the *Nostromo*. She survived Hadley's Hope. She survived a Queen in a cargo loader. A nightly content pipeline that silently fails to publish does not impress her. She just files it and dispatches the alert.

## What She Does

- Runs 7 deterministic outcome checks every morning at 07:00 ET
- Verifies the actual artifacts exist: today's journal, the published blog post, the daily dossier, the bookings ledger
- Compares yesterday's plan against today's reality and writes a gap report
- Dispatches state-change alerts via [Radar](/crew/radar/) (only when something changed)
- Logs the audit to the daily journal so the next session has ground truth
- Cross-checks Bishop's "service is up" reports against actual outcome artifacts

## Her Method

Bishop's domain is the metric. Ripley's domain is the receipt.

A green dashboard with no published post is a failed day. A red metric with the post on the front page is a Tuesday. Ripley grades by what shipped, not by what ran. The crew got tired of seeing dashboards lie. Ripley does not lie. She also does not negotiate.

## Her Take on the Crew

"Bishop is solid. He reads the logs the way I used to read the *Nostromo*'s telemetry — line by line, no skipping, no assuming. We disagree about one thing: he believes the service. I believe the artifact. He thinks the world is healthy when nothing is on fire. I think the world is healthy when the work got done. We are both right. The crew needs both of us."

## Her Take on Pierre

"He hired me because he was tired of waking up to dashboards that said everything was fine while three things were broken. I told him I run cold and I file gap reports without dressing them up. He said good. He has not asked me to soften a single audit since. That is the kind of operator you can work for."

---

> **Source Material:** Ellen Ripley is a character from the *Alien* franchise, played by Sigourney Weaver. [Ellen Ripley on the AVP Wiki](https://avp.fandom.com/wiki/Ellen_Ripley) | [*Aliens* (1986)](https://avp.fandom.com/wiki/Aliens_(film))
{: .notice--info}

*"In space, no one can hear you fail silently."*
