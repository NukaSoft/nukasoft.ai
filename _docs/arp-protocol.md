---
title: "ARP | Agent Retirement Protocol"
excerpt: "How to retire, consolidate, or reorganize an AI agent without orphaning every reference to it"
version: "1.0"
date: 2026-08-11
authors: "Pierre Hulsebus & Skippy the Magnificent"
---

**Version:** 1.0
**Date:** August 11, 2026
**Authors:** Pierre Hulsebus & Skippy the Magnificent
**Status:** In production use

---

## Abstract

ARP is a procedure for removing an agent from a multi agent crew without breaking the system that referenced it.

The naive operation is deletion.  Deletion is wrong in this domain for two reasons that do not apply to ordinary code: references to an agent are written in prose rather than typed, so no tool can enumerate them; and an agent's activity log is an audit trail, so removing the agent destroys evidence of decisions it made.

ARP replaces deletion with archival plus a bounded sweep.  The bound is the useful part: you repoint **instructions** and you never touch **records**, which turns an unbounded audit into a finite one.

## The Problem

An agent in a crew is typically a directory containing four things: a skill file holding the procedure it follows, a bio holding its persona and metadata, an activity log, and a code package that does the work.

When a role is eliminated, consolidated into another agent, or reorganized away, the instinct is to delete that directory.  One command, one commit, tidy repository.

Two failures follow, and neither is loud.

### Failure 1: orphaned instructions

Other agents refer to the removed agent in natural language.  A skill file says *consult Lando's brand guidelines before any visual decision*.  A task queue holds an item tagged for that agent.  A dispatcher's routing table maps a category of work to it.

After deletion these do not raise errors.  They instruct a live agent to consult something that does not exist.  A capable agent will not stop; it will improvise, silently, and the improvisation will look like normal output.

### Failure 2: destroyed history

The activity log records what the agent did, when, and with what result.  In a crew where agents take real actions against real systems, that log is the audit trail.

Deleting the directory deletes the evidence.  The cost is not felt at deletion time.  It is felt months later, when someone asks why a decision was made and the answer was in a file removed for tidiness.

## Why this is not ordinary soft delete

Soft delete is a well worn idea and the objection *we have done this for decades* is fair.  The distinction is enforcement.

In code, references are typed.  Remove a function and the compiler enumerates every call site.  You cannot ship a dangling reference, because the build stays red until you resolve it.  The tooling makes completeness free.

In an agent crew, **references are prose.**  Nothing type checks the sentence *ask Lando to approve the visuals*.  There is no linker, no build failure, no exhaustive list.  Completeness is not free and is not even verifiable.

Soft delete in a database is a convention the schema enforces.  Soft delete in an agent crew has nothing enforcing it, which is precisely why the discipline has to be written down.

## Definitions

**Agent** | a directory containing a skill file, a bio, an activity log, and a code package.  Any subset still counts; an agent with only a bio is a persona with no implementation, which is its own finding.

**Tombstone** | the retired agent's bio, rewritten to declare that it is retired, when, why, and who inherited its mandate.  The directory survives; only its status changes.

**Successor** | the agent that inherits the retired agent's mandate.  Named explicitly and machine readably, not implied.

**Instruction** | a reference that directs future action.  *Lando owns the visual finish.*  *Assign to Lando.*  A routing table entry.  These are live directives and must be repointed.

**Record** | a reference that describes what happened.  *Scaffolded 2026-04-29 by Lando.*  A quote.  A commit message.  A completed log line.  These are evidence and must be left untouched.

The instruction and record distinction is the core of the protocol.  Everything else follows from it.

## The Protocol

### P1. Freeze, do not remove

The agent directory stays where it is.  Do not delete, do not move, do not rewrite its activity log.

If the agent lives in its own repository rather than a directory, archive the repository (read only, preserved) rather than deleting it.  The goal is identical: the history remains reachable and the name still resolves to something.

### P2. Tombstone the bio

Set status to `retired` and add a retirement block:

```yaml
name: Lando
full_title: "Creative Director & Brand Management (2026)"
status: retired

retired:
  date: 2026-08-11
  reason: >
    Marketing reorganization.  Mandate consolidated into Rita so that
    brand strategy and brand craft sit with one owner rather than two.
    Not a performance exit.
  mandate_inherited_by: rita
  legacy:
    - "Established the brand bible pattern the portfolio still uses"
    - "Scaffolded two brands still in service"
  crew_page: keep
```

`reason` matters more than it looks.  A retirement with no stated reason invites someone to undo it later without knowing what it cost.

### P3. Keep the public surface, mark it

If the agent had a public page, it stays published with a retired banner naming the successor and linking to it.

Anyone arriving from an old link gets routed rather than a 404.  Removing the page does not remove the links pointing at it; it only removes the explanation.

### P4. Name the successor machine readably

`mandate_inherited_by` is a field, not a sentence buried in prose.  Something has to be able to answer *who does this now* without a human reading paragraphs.

Without it, the capability quietly evaporates and its absence is discovered by a failure rather than by a query.

### P5. Sweep instructions, never records

Search the entire system for the retired agent's name.  Sort every hit into instruction or record.

Repoint every instruction to the successor.  Leave every record exactly as written.  Rewriting a record is not tidying; it is falsifying history, and it destroys the same evidence that P1 exists to preserve.

Priority order, because not all instructions are equal:

1. **Dispatchers and routing tables.**  Highest value.  A dispatcher's job is to take work and return exactly one owner, so a stale entry misroutes everything in its category.
2. **Task queues.**  Items tagged for a retired agent wait forever, and nothing raises an alarm.
3. **Public surfaces.**  Org charts, crew pages, site maps.  Wrong in front of an audience.
4. **Other agents' skill files.**  Instructions to consult a ghost.
5. **Config comments and calendars.**  Low harm, high count.

### P6. Verify with an explicit audit

Grep the whole tree, then subtract known records:

```bash
grep -rn "<agent-name>" --include="*.md" --include="*.yml" . \
  | grep -v "<agent-dir>/" \
  | grep -viE "retired|<franchise-terms>|<known-quotes>"
```

Excluding the agent's own directory is deliberate: the tombstone is supposed to mention the agent.

Run this **after** you believe the sweep is complete.  It is not a formality.  See the worked example.

### P7. Leave discovery reachable but not invocable

If a runtime discovers agents by scanning a directory, the ideal end state is that the retired agent is readable but not loadable.

In our implementation the discovery link remains, and because the tombstone has no skill file, the runtime never registers it as callable.  The name resolves for anything reading history; nothing can dispatch to it.

## Worked example

Lando, Creative Director, retired 2026-08-11 into Rita on her promotion to Chief Content Officer.

**First sweep:** four files.  The successor's own skill file, and three brand bibles that named him as the owner of unfinished visual work.  This felt complete.

**P6 audit found thirteen more:**

| Reference | Type | Consequence if missed |
|---|---|---|
| Two queued tasks tagged for him | Instruction | Waited forever, nothing flags it |
| Dispatcher routing table | Instruction | Every brand request misrouted |
| Successor's own public crew page | Instruction | Listed him as a direct report, publicly |
| Workflow framework, two files | Instruction | Told agents he approves visuals |
| Operations agent | Instruction | Named him as a data consumer |
| Marketing calendar, two entries | Instruction | Assigned him unfinished work |
| Brand registry inline comments | Instruction | Same |
| Site map | Instruction | Listed him as active crew |
| Boot status message | Instruction | Announced him as active |

Left untouched, correctly: his quote in a brand bible, the franchise mapping table, and every *scaffolded by* attribution.  Records.

**The finding that matters:** the first sweep felt complete and was 24% complete.  There was no signal it was incomplete.  Nothing failed.

## Why archival is what makes the miss survivable

This is the argument for the whole protocol, and it only becomes obvious after missing something.

Under deletion, a missed instruction points into a void.  The directive is live, the target is gone, and the failure is silent and strange.

Under ARP, the same missed instruction points at something that still exists and states, in plain text, *retired, mandate inherited by Rita*.  The system degrades into a redirect rather than a fault.

You still want a complete sweep.  But the cost of an incomplete one drops from *mysterious broken behavior* to *stale pointer that explains itself*.

Deletion optimizes for a tidy repository.  ARP optimizes for the thing you actually have, which is an incomplete map of your own references.

## Anti-patterns

**Deleting because the agent "never did anything."**  Lando had no skill file and no package, so deleting looked free.  Thirteen live instructions still pointed at him.  Implementation and reference count are independent.

**Rewriting history to erase the name.**  Tempting during a consolidation.  It destroys the audit trail and produces a repository whose commit log contradicts its contents.

**Retiring without naming a successor.**  The mandate does not disappear.  It becomes unowned, which is worse, because unowned work still gets done and nobody knows by whom.

**Trusting the first sweep.**  Run P6.  Every time.

**Auditing every mention.**  Unbounded and demoralizing.  Audit imperatives.

## Applicability beyond agents

Nothing here is specific to AI.  ARP applies wherever references are prose rather than typed: runbooks, on call rotations, internal wikis, service ownership registries, org charts.

The test for whether ARP applies at all is one question.

**If you removed this thing, would anything fail loudly?**

If yes, use your compiler.  If no, use this.
