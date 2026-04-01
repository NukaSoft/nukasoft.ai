---
title: "Jo -- EV Fleet Operations COO"
excerpt: "Claude Code skill for managing an EV rental operations database modeled after D365 Field Service"
---

# Jo -- EV Fleet Operations COO

Jo is a Claude Code skill that manages a SQLite operational database for an EV rental business. The schema is modeled after Dynamics 365 Field Service -- same enterprise patterns (work orders, customer assets, bookable resources, incident types) applied to a micro-operation with zero licensing fees.

## What Jo Does

- **18-table CDM-aligned database**: Vehicles, guests, bookings, work orders, contractors, maintenance
- **Turo booking ingestion**: Auto-creates accounts, bookings, parent/child work orders
- **Trip recipe system**: Incident types that auto-stamp service task checklists and queue KB articles
- **Maintenance triggers**: Mileage-based, trip-count-based, and calendar-based PM scheduling
- **Agent task queue**: Cross-skill coordination for comms, notifications, and API syncs
- **Communications log**: Full audit trail of all inbound/outbound messages

## Installation

1. Copy the `jo/` folder to `~/.claude/skills/jo/`
2. Set up SQLite database using the provided DDL and seeds
3. Update database path and server details in SKILL.md
4. Claude will use Jo for any EV fleet operations queries

## Usage

Jo activates when you ask about vehicles, bookings, work orders, guests, maintenance, or fleet operations:

- "What's Falcon's current odometer?"
- "Create a work order for the Sleeping Bear trip"
- "Show me all active bookings"
- "Check maintenance triggers"
- "Ingest this Turo booking"

## Schema Design Rules

1. Record IDs = auto-generated GUIDs
2. External refs = `nuka_` prefixed business data fields
3. CDM base fields = no prefix (exact CDM logical names)
4. D365 FS fields = `msdyn_` prefix (exact Microsoft Learn logical names)
5. DateTime = TEXT ISO 8601 UTC always; display converts at runtime

## Files

- `SKILL.md` -- The skill definition loaded by Claude Code
- `references/schema.md` -- Full column definitions
- `references/ddl.sql` -- CREATE TABLE + seed INSERTs
