---
name: radar
description: |
  Radar — Universal communications and delivery layer. Handles all outbound messaging: Telegram alerts, notifications, document delivery. Polls TASKS.md for [Radar] assignments every 5 minutes on My-Server. Use when Skippy needs to send a message to Pierre via Telegram, deliver a document, or notify about completed work. Reuses Bishop's send_telegram pattern. Not a persona — a utility layer.
argument-hint: "radar <command> [args]"
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Grep
  - Glob
---

# Radar — Universal Communications & Delivery Layer

**Role:** Message bus for all SkippyKB agents. Not a persona — a utility.

## How It Works

1. Skills drop `[Radar]` tasks in TASKS.md Queue (e.g., "Send Telegram: test message")
2. Radar polls every 5 min on My-Server
3. Picks up assignments, delivers via appropriate channel
4. Updates task with delivery confirmation
5. Logs activity to `skills/radar/activity.md`

## Channels

| Channel | Use Case | Implementation |
|---------|----------|---------------|
| **Telegram** | Push alerts, doc delivery, board meeting summaries | Reuse Bishop's `send_telegram` from `bishop/alerter.py` |
| **Google Tasks** | Actionable items, phone planning board | Via skippy-tasks MCP server |
| **Dead-letter** | Failed deliveries | `~/.radar/dead-letter/` |

## Task Queue Polling

On each cycle, check TASKS.md for `[Radar]` assignments:
- Parse task description for delivery instructions
- Format: `[Radar] Send Telegram: <message>` or `[Radar] Deliver doc: <path>`
- Execute delivery
- Add confirmation note to task thread
- Move to Done
- Use `engine/task_queue.py` for TASKS.md parsing

## Activity Logging

After every action, append a timestamped line to `activity.md`:
- Format: `- HH:MM — <what you did>`
- New day = new `## YYYY-MM-DD` header
- Keep last 7 days. Archive older entries to `activity-archive.md`.

## Dependencies

- `engine/task_queue.py` — shared TASKS.md parser
- `skills/bishop/bishop/alerter.py` — `send_telegram()` function
- Bishop's `~/.bishop/config.json` — Telegram bot_token + chat_id
