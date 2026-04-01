---
title: "Garrus -- D365 Field Service Tactical Advisor"
excerpt: "Claude Code skill for Dynamics 365 Field Service expertise, market research, and knowledge management"
---

# Garrus -- D365 Field Service Tactical Advisor

Garrus is a Claude Code skill that turns your AI assistant into a Dynamics 365 Field Service tactical advisor. It carries deep knowledge of FS architecture, scheduling, RSO, competitive positioning, and implementation patterns -- backed by a structured knowledge store with analyst research, methodology docs, and market analysis.

## What Garrus Does

- **Expert Q&A**: Answer D365 Field Service questions from a curated knowledge base
- **Topic briefings**: Structured briefings with executive summary, key points, and recommendations
- **Market research**: Vertical market analysis combining catalogue, analyst reports, and field expertise
- **Document ingestion**: PDF and text ingestion into the knowledge store with manifest tracking
- **Knowledge dumps**: Capture and structure expert brain dumps
- **Search**: Full-text search across the manifest database
- **Publish**: Sanitize and export documents for public consumption

## Installation

1. Copy the `d365/` folder to `~/.claude/skills/d365/`
2. Create the knowledge store directory structure under `memory/d365/`
3. Populate with your D365 FS knowledge (fundamentals, methodology, research, etc.)
4. Claude will reference the store when answering FS questions

## Usage

Invoke with `/d365` followed by a command:

| Command | Description |
|---------|-------------|
| `ask "question"` | Answer from knowledge base with citations |
| `brief <topic>` | Generate structured topic briefing |
| `research <market>` | Market analysis for a vertical |
| `ingest pdf <path>` | Ingest PDF into knowledge store |
| `dump "title"` | Capture a brain dump |
| `index` | Show knowledge base catalog |
| `search "keywords"` | Search the manifest |

## Knowledge Store Structure

```
memory/d365/
  fundamentals/    Core D365 FS concepts
  catalogue/       Microsoft Business Process Catalogue
  methodology/     Implementation patterns
  research/        Analyst reports (Gartner, TSIA)
  markets/         Vertical market research
  sales/           Discovery questions, competitive positioning
  releases/        Wave release summaries
  training/        Cert guides, readiness
  patterns/        Implementation patterns by vertical
  braindumps/      Raw expert knowledge dumps
```

## Files

- `SKILL.md` -- The skill definition loaded by Claude Code
