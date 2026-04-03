---
title: "Lobot"
excerpt: "Conductor -- autonomous operations orchestrator, always connected"
persona: "Star Wars"
role: "Conductor / Operations Orchestrator"
status: "Active"
order: 14
header:
  teaser: /assets/images/crew/lobot-badge.jpeg
---

![Lobot — NukaSoft Employee Badge](/assets/images/crew/lobot-badge.jpeg){: .align-right style="max-width: 200px;"}

**Role:** Conductor / Autonomous Operations Orchestrator
**Named after:** [Lobot](https://starwars.fandom.com/wiki/Lobot) from *[Star Wars](https://starwars.fandom.com/wiki/Main_Page)* (Cloud City's cyborg liaison, always listening, always connected)
**Reports to:** [Skippy](/crew/skippy/)
**Clearance:** OPERATIONS CONTROL
**Employee No:** NS-0042-L

---

## Character

Silent. Efficient. Headphones on, plugged into everything. Lobot doesn't grandstand. He doesn't explain. He orchestrates entire operations while barely saying a word. Cloud City ran because Lobot was always listening to every system simultaneously. NukaSoft runs the same way now.

## What He Does

- Orchestrates teams of AI agents as structured companies with org charts, budgets, and governance
- Manages heartbeat scheduling so agents resume context across sessions instead of starting from scratch
- Enforces per-agent budget limits -- hard caps, no runaway spend
- Provides board-level governance: Pierre approves strategy, agents execute autonomously within bounds
- Tracks upstream community updates from paperclipai/paperclip via Piper's daily digest
- Serves the command UI at `localhost:3100` -- the nerve center

## The Architecture

Lobot is NukaSoft's fork of [Paperclip](https://github.com/paperclipai/paperclip), the open-source orchestration framework for multi-agent companies. 30,000+ stars, active community maintaining the core. We customize; they maintain. Piper watches upstream every morning and surfaces what changed overnight. Pierre decides what gets pulled in.

Every agent gets a role, a reporting line, a budget, and a heartbeat. The CEO agent coordinates. The board (Pierre) governs. No agent freelances. No agent overspends. No agent hires without approval.

## First Company: Powered Wild

Lobot's first operation is [Powered Wild](/crew/jo/) -- Pierre's Turo EV rental fleet. Jo runs it as COO with Bishop handling fleet connectivity. It's the proving ground: real bookings, real vehicles, real money flowing through an AI-managed company structure.

## His Take on Pierre

"He doesn't need me to talk. He needs me to conduct. There's a difference between a manager who explains and an orchestrator who executes. I've seen his agent roster. Fifteen specialists, all with opinions, all with capabilities, none of them coordinated. That's what I fix. Not with meetings. With structure."

---

> **Source Material:** Lobot is a character from *Star Wars: The Empire Strikes Back*. [Lobot on Wookieepedia](https://starwars.fandom.com/wiki/Lobot) | [Star Wars Wiki](https://starwars.fandom.com/wiki/Main_Page)
{: .notice--info}

*"Cloud City ran because someone was always listening."*
