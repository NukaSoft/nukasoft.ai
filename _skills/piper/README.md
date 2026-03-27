---
title: "Piper -- Bug Triage & Community Engagement"
excerpt: "Claude Code skill for investigative bug reporting, deduplication, and issue tracking across GitHub repos"
---

# Piper -- Bug Triage & Community Engagement

Piper is a Claude Code skill that turns your AI assistant into an investigative bug reporter. She researches before filing, deduplicates against known issues, writes reports that maintainers actually want to read, and tracks everything through resolution.

## What Piper Does

- **Full bug lifecycle**: detect a bug, research existing issues, draft a properly formatted report, file it, track status
- **Deduplication-first**: Always searches for existing issues (open AND closed) before filing new ones
- **Environment auto-detection**: Captures OS, language versions, tool versions, and relevant configs automatically
- **Multi-platform tracking**: Maintains a local `bugs.json` tracker with full history across repos
- **Status polling**: Checks tracked issues for maintainer responses and status changes
- **Task queue integration**: Picks up `[Piper]` tasks from your task file and executes them
- **Activity logging**: Timestamped audit trail of every action taken

## Installation

1. Copy the `piper/` folder to `~/.claude/skills/piper/`
2. Ensure `gh` CLI is installed and authenticated:

```bash
gh auth status
```

3. Create the tracker file:

```bash
mkdir -p ~/.claude/skills/piper
echo '[]' > ~/.claude/skills/piper/bugs.json
```

## Usage

Once installed, Claude will automatically use Piper when you mention anything related to bug reports, issue filing, or tracking. Examples:

- "File a bug against repo/name about X"
- "Check if this is a known issue"
- "Search for existing issues about Y"
- "What's the status of our open bugs?"
- "Update tracked issues"
- "Check if anyone responded to that bug we filed"

### Commands

| Command | Description |
|---------|-------------|
| `piper file <repo> <description>` | Research, draft, and file an issue |
| `piper search <repo> <keywords>` | Search existing issues on a repo |
| `piper track` | Show all tracked bugs and their current status |
| `piper update` | Poll tracked issues for status changes |
| `piper platforms` | List configured platforms and repos |

## Bug Filing Workflow

1. **Intake** -- Extracts what happened, expected behavior, repro steps, and environment from conversation
2. **Research** -- Searches target repo for duplicates (open + closed). If found, links to existing issue instead
3. **Draft** -- Fills issue template with summary, environment, reproduction steps, expected vs actual, logs
4. **File** -- Creates issue via `gh issue create`, applies labels if permitted
5. **Track** -- Logs to `bugs.json` with repo, issue number, URL, title, status, date

## Requirements

- `gh` CLI (GitHub CLI) installed and authenticated
- Claude Code with tool access to Bash, WebSearch, WebFetch, Read, Write, Edit, Grep, Glob

## Files

- `SKILL.md` -- The skill definition loaded by Claude Code (the main file)
- `bugs.json` -- Local bug tracking database (created on first use)
- `activity.md` -- Timestamped action log (auto-maintained)

## Rules Piper Lives By

1. **Always dedup first.** Never file a duplicate.
2. **Always include environment.** OS, versions, configs.
3. **Always include repro steps.** Numbered, specific, reproducible.
4. **Never file without evidence.** Logs, screenshots, or concrete observations.
5. **Be respectful.** Clear, concise, grateful to maintainers.
6. **Track everything.** Every filed bug gets logged.
