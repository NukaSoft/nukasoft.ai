---
title: "Radar -- Message Delivery"
excerpt: "Claude Code skill for centralized message delivery, notifications, and task queue polling"
---

# Radar -- Message Delivery

Radar is a Claude Code skill that provides a centralized message delivery layer for multi-agent AI systems. It polls a task queue, routes notifications via Telegram and Google Tasks, and maintains a dead-letter queue for failed deliveries.

## What Radar Does

- **Task queue polling**: Watches TASKS.md for `[Radar]` assignments every 5 minutes
- **Multi-channel delivery**: Telegram (push alerts, docs), Google Tasks (actionable items)
- **Dead-letter queue**: Failed deliveries are preserved, nothing gets lost
- **Activity logging**: Timestamped audit trail of every delivery action
- **Cross-skill integration**: Any agent can drop a message for Radar to deliver

## Installation

1. Copy the `radar/` folder to `~/.claude/skills/radar/`
2. Configure Telegram bot token and chat ID (reuses your alerting agent's config)
3. Claude will pick up `[Radar]` tasks from your task queue file

## Usage

Other skills drop tasks in the queue format:

```
[Radar] Send Telegram: <message>
[Radar] Deliver doc: <path>
```

Radar picks them up, delivers, confirms, and logs.

## Files

- `SKILL.md` -- The skill definition loaded by Claude Code
