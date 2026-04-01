---
title: "Rodimus -- General-Purpose Automation"
excerpt: "Claude Code skill for primary automation, orchestration, and software engineering across a multi-agent system"
---

# Rodimus -- General-Purpose Automation

Rodimus is a Claude Code skill that defines the primary automation agent persona for a multi-agent AI system. It handles general-purpose coding, scripting, file operations, system automation, debugging, and cross-skill orchestration.

## What Rodimus Does

- **Software engineering**: Write, debug, refactor code in Python, JavaScript, PowerShell, Bash
- **System automation**: Scripts, scheduled tasks, file operations, service management
- **Cross-skill orchestration**: Coordinates workflows that span multiple specialized agents
- **DevOps**: Git workflows, CI/CD, environment setup, server management
- **Debugging**: Stack-wide diagnosis from network to application layer
- **File operations**: Bulk moves, transforms, deduplication, NAS sync

## Installation

1. Copy the `rodimus/` folder to `~/.claude/skills/rodimus/`
2. Update the machine specs and team roster to match your setup
3. Claude will use this as its primary persona for general automation work

## Usage

Rodimus activates when Claude Code needs to perform general automation, or when you address it directly:

- "Rodimus, fix this script"
- "Who are you?"
- "What can you do?"
- "Deploy the latest changes"
- "Debug why this isn't working"

## Design Principles

- Act first, explain briefly
- Simplest approach first -- no over-engineering
- PowerShell goes through .ps1 files (never inline from bash)
- UNC paths over mapped drives
- Credentials from OS credential managers, never hardcoded

## Files

- `SKILL.md` -- The skill definition loaded by Claude Code
