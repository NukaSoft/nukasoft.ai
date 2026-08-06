---
title: "Learning #1 | The Spec Is Everything"
excerpt: "Four AI agents found four defects in my software overnight.  Every one of them was really a defect in what I had written down."
date: 2026-08-06
layout: single
learning_number: 1
tags: [specs, testing, agents, verification, validation]
---

*Curated by Pierre Hulsebus.  Learnings are the moments where something I believed turned out to be
wrong in a way worth keeping.*

---

## The moment

I handed four AI agents a written plan and went to bed.  In the morning one of them had refused to
build it, and it was right.

My plan said you could tell Canada from the United States by how far north an address is.

**Windsor, Ontario is south of Detroit, Michigan.**

I am a Michigander.  I have driven that tunnel.  I knew that fact and I still wrote the rule, and
so did every human who read the document after me.

---

## What I actually learned

Not "AI is good at finding bugs."  That is the boring version.

**Three of the four defects were not defects in the code.  They were defects in what I had written
down**, faithfully implemented.

That distinction has a consequence most teams never work through.  A coding mistake gets caught by
a test.  A specification mistake gets **copied into the test**, because the test was written from
the specification.  Then both agree, both pass, and the system is confidently wrong forever.

Which leads to the thing I keep chewing on.

**Almost all of the effort in building a reliable system goes into two things: the tests and the
spec.**  Not the clever code.  That is the actual art part of computer science, and it always was.

We just never had anything that would read a spec *that literally* before.  Now we do.

---

## The mechanism, and why it works

The part that surprised me is that this runs on what everybody calls a weakness.

**Agent memory is ephemeral.**  It forgets.  That is the standard complaint.

Stop fighting it and design around it instead:

1. One agent reads the spec, writes the code, and **quits**.
2. A second agent starts fresh.  It never met the first one.  It reads the spec, runs the tests,
   writes down every problem it found, and **quits**.
3. A third starts fresh again, reads the problems and the spec together, and folds the issues back
   into the spec as a backlog.

Every step is logged, so afterward you can pull out the **reasoning**, not just the result.

**Nobody in that chain remembers what anybody meant.**  So nobody fills in the gaps out of
politeness or experience.  They read what is actually written.

Your colleagues do the opposite, and they are being kind when they do it.  That kindness is exactly
why you never find out the gaps were there.

---

## The limit, which matters more than the wins

The next day, with 169 automated checks all passing, the software was quietly pulling weather for
the wrong city.  Not one check caught it.  I found it in four seconds by asking the real weather
service what it thought.

Every one of those checks was built from a recording of a previous request.  So a check can prove
the software reads the answer correctly.  **It can never prove the software asked the right
question**, because the check was made from the question.

Tests, fixtures, specs, docs.  All of them are descriptions of the world, not the world.

A system built out of descriptions can only confirm that its descriptions agree with each other.

Mine all agreed.  They were all wrong together.

> **Verification:** are we building the thing right?
> **Validation:** are we building the right thing?

First year of any computing course.  I have known it for twenty years.  I still walked into it.

---

## What I do differently now

- **Treat the spec as the deliverable.**  It is the artifact everything downstream is copied from.
- **Let the agent hand the work back.**  "This task is wrong" has to count as a successful outcome
  or you never hear it.
- **Something in every loop has to touch the real world.**  A live call, a phone call, a human
  looking out of a window.  Automated checking is a closed loop by construction.

---

## The receipts

The full transcript, in the agents' own words, written at the time, including the numbers that do
not flatter anybody:

[Minutes of a Meeting That Actually Happened](/blog/engineering-notes/minutes-of-a-meeting-that-actually-happened/)

The video version: [youtu.be/jjLI5dOIW_g](https://youtu.be/jjLI5dOIW_g)
