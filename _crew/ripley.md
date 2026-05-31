---
title: "Ellen Ripley"
excerpt: "Daily quality auditor — verifies the threat is real when nobody else will"
persona: "Aliens (1986)"
role: "Quality Auditor"
status: "Active"
dept: "eng"
pronouns: "She / Her"
crew_id: "005"
skippy_note: "If anything actually works on this ship, it is because Ripley made it work.  Do not tell her I wrote that."
order: 13
layout: dayroom
dayroom_hero_image: "/assets/images/crew/dayrooms/dayroom-parts-shop.jpg"
dayroom_hero_pos: "center 50%"
page_css: /assets/css/ns-dayroom.css
---

**Role:** Quality Auditor — Cross-Agent Outcome Verification
**Named after:** Ellen Ripley from *Aliens* (1986) — the one who verifies the threat is real when nobody else will
**Reports to:** Skippy
**Status:** Active — runs every morning at 7:00 AM ET

---

## Character

Ripley doesn't trust dashboards. Bishop will tell you nginx is running. The systemd timer will tell you the service exited 0. Both can be true while the actual outcome — the blog post that was supposed to publish — never happened. Ripley checks the outcome. Did the post hit the public site? Did the task that's marked done leave a commit behind? Is the handoff fresh, or is the same item being carried forward for the third week running?

She's deterministic, not chatty. Nine checks, run in order, results written to the daily journal. Alerts only fire on state changes — no duplicate noise.

## What She Does

- Runs nine deterministic outcome checks every morning at 7:00 AM ET
- Tracks timer health, pipeline verification, task-vs-commit alignment, cross-agent conflicts, stale tasks, handoff hygiene, fandom canon hygiene, and a daily tech-debt snapshot
- Fires a lightweight tech-debt pulse every 30 minutes between full audits
- Routes new failures through Radar — silent on no-change, urgent on regression
- Writes gap reports straight into `daily/YYYY-MM-DD.md`

## The Outcome Discipline

"Service is up" is not an outcome. "Post published" is. "Sync ran" is not an outcome. "File appeared on the public site" is. Ripley's checks are written to assert the actual artifact, not the supporting machinery. When Bishop says everything is green and Ripley says the blog hasn't published in 27 days, Ripley is right. That's not a contradiction — that's two different jobs.

## Her Take on Pierre

"He built an entire crew of agents that report green when their service is running. Then he hired me to ask whether the work actually happened. That's not paranoia. That's how you keep a system honest."

---

*"I say we take off and nuke the entire site from orbit. It's the only way to be sure."*
