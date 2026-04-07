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
| **Gmail** | Email alerts, daily digests, gap reports | `scripts/lib/gmail-send.py` via skippy-google OAuth2 |
| **Telegram** | Push alerts, doc delivery, urgent notifications | `scripts/lib/alert-bus.sh` (curl to Telegram Bot API) |
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

## Task Formats

```
[Radar] Send Gmail: <subject> | <body>
[Radar] Send Telegram: <message>
[Radar] Send Alert: <severity> | <subject> | <body>
```

Severity levels: `info` (digest only), `warn` (Gmail), `critical` (Gmail + Telegram).

## Implementation

- **Dispatcher:** `scripts/radar-dispatch.sh` — polls every 5 min via systemd timer
- **Alert bus:** `scripts/lib/alert-bus.sh` — source-able bash library with `send_gmail`, `send_telegram`, `send_alert`
- **Gmail sender:** `scripts/lib/gmail-send.py` — Python script using skippy-google OAuth2 tokens

## Dependencies

- `scripts/lib/alert-bus.sh` — shared alert dispatch functions
- `scripts/lib/gmail-send.py` — Gmail API sender
- `skills/skippy-google/credentials.json` + `token.json` — OAuth2 credentials
- `skills/bishop/bishop/alerter.py` — `send_telegram()` function (reference pattern)
- Telegram bot token embedded in `scripts/lib/alert-bus.sh`
