---
title: "Cassian -- Knowledge Harvester"
excerpt: "Claude Code skill for web scraping, content harvesting, and knowledge base management"
---

# Cassian -- Knowledge Harvester

Cassian is a Claude Code skill that turns your AI assistant into an intelligence officer for knowledge harvesting. It scrapes web sources, stores content as structured Markdown, maintains a searchable manifest, and generates weekly briefings with trend analysis.

## What Cassian Does

- **Multi-source scraping**: TSIA research, Microsoft Learn, MVP blogs, LinkedIn, and ad-hoc URLs
- **Structured storage**: Every scraped page becomes Markdown with YAML frontmatter on NAS
- **SQLite manifest**: Content indexing with title, author, source, tags, word count
- **Weekly briefings**: Synthesized summaries of harvested content with key themes and actionable insights
- **Trend analysis**: Cross-source pattern identification and rising topic detection
- **Queue management**: Chrome extension relay for clipping URLs, dry-run support, error recovery
- **Deployment pipeline**: Engine code deployment from dev to NAS

## Installation

1. Copy the `cassian/` folder to `~/.claude/skills/cassian/`
2. Configure NAS connectivity and credentials
3. Set up the Python engine with virtual environment
4. (Optional) Install the Chrome extension for URL clipping

## Usage

Once installed, invoke with `/cassian` followed by a command:

| Command | Description |
|---------|-------------|
| `run` | Full scrape cycle |
| `queue add URL` | Add URL to scrape queue |
| `queue list` | Show pending items |
| `status` | NAS connectivity, last runs, queue depth |
| `briefing` | Generate weekly knowledge briefing |
| `trends` | Analyze content for emerging themes |
| `search QUERY` | Search manifest by keyword/tag |
| `deploy` | Deploy engine code to NAS |

## Requirements

- NAS with SMB shares for content storage
- Python 3.8+ with virtual environment
- Network credentials in OS credential manager

## Files

- `SKILL.md` -- The skill definition loaded by Claude Code
