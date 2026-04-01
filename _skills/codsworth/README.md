---
title: "Codsworth -- NAS File Organization"
excerpt: "Claude Code skill for Synology NAS management, file organization, and network storage operations"
---

# Codsworth -- NAS File Organization

Codsworth is a Claude Code skill that manages file organization and Synology NAS operations. It scans directories, categorizes files, detects duplicates, moves files to NAS with preserved timestamps, and integrates with the Synology API for folder creation and status checks.

## What Codsworth Does

- **File scanning**: Categorize files by type (18 categories), detect duplicates, calculate sizes
- **NAS operations**: Move files to organized NAS directories via UNC paths
- **Synology API integration**: Authentication, folder creation, share listing, status checks
- **Credential management**: Windows Credential Manager, macOS Keychain, Linux libsecret
- **Cross-platform**: Windows PowerShell, macOS bash, Linux bash
- **Timestamp preservation**: Always uses `cp -rp` for moves

## Installation

1. Copy the `codsworth/` folder to `~/.claude/skills/codsworth/`
2. Update NAS hostname, IP, and share paths in SKILL.md
3. Store NAS credentials in your OS credential manager
4. Claude will handle all file organization and NAS operations

## Usage

Invoke with `/codsworth` followed by a command:

| Command | Description |
|---------|-------------|
| `scan [path]` | Scan directory, categorize files, find duplicates |
| `move [path] [nas-dest]` | Move files to NAS (preserves timestamps) |
| `inventory [nas-path]` | Generate NAS contents report |
| `status` | Check NAS connectivity and share access |
| `creds store` | Store credentials in OS credential manager |
| `creds test` | Test stored credentials |
| `nas config` | Configure Synology settings |
| `nas folders [path]` | Create or list NAS folder structures |

## Design Principles

- UNC paths over mapped drives (don't drop after sleep)
- PowerShell always via .ps1 files (never inline from bash)
- Credentials from OS credential managers, never hardcoded
- Verify copies before deleting sources
- Confirm before bulk deletions

## Requirements

- Synology NAS with DSM and SMB shares
- Network connectivity to NAS
- OS credential manager for secure credential storage

## Files

- `SKILL.md` -- The skill definition loaded by Claude Code
