---
title: "Bishop -- Network Operations Admin"
excerpt: "Claude Code skill for Ubiquiti UniFi network management with self-evaluating evals"
---

# Bishop -- Network Operations Admin

Bishop is a Claude Code skill for Ubiquiti UniFi network management. It gives Claude deep knowledge of the UniFi API, network diagnostics methodology, and autonomous health monitoring capabilities.

## What Bishop Does

- **11 core capabilities**: health checks, WiFi troubleshooting, security audits, device management, client investigation, firmware status, performance baselining, port/switch diagnostics, VLAN/firewall review, geo-blocking, and automated alerting
- **AT&T BGW210-700 gateway management**: broadband stats, IP Passthrough config, diagnostics
- **Autonomous medbay cycle**: scheduled 10-minute health checks with auto-healing for safe operations and an approval queue ("hypersleep") for unsafe changes
- **Flight recorder**: JSONL audit log of all actions taken
- **Encrypted credentials**: AES-256-GCM credential storage, no plaintext passwords
- **OSI top-down diagnostics**: structured troubleshooting methodology built in

## Installation

1. Copy the `bishop/` folder to `~/.claude/skills/bishop/`
2. Edit `SKILL.md` and replace placeholder values in the Site Inventory section with your actual network devices, IPs, and MACs
3. Create the config directory and file:

```bash
mkdir -p ~/.bishop
```

4. Create `~/.bishop/config.json` with your controller details:

```json
{
  "controller_url": "https://YOUR-CONTROLLER-IP",
  "username": "api-readonly",
  "password": "",
  "site": "default",
  "email_to": "your-email@example.com",
  "alert_thresholds": {
    "cpu_percent": 80,
    "mem_percent": 80,
    "temp_celsius": 70,
    "latency_ms": 50,
    "packet_loss_percent": 2,
    "channel_utilization_percent": 70,
    "client_signal_dbm": -75,
    "uptime_min_hours": 1,
    "poe_utilization_percent": 80,
    "port_error_count": 50,
    "firmware_age_days": 90,
    "geo_threat_events_per_day": 50
  }
}
```

5. (Optional) Set up encrypted credentials for autonomous operation:

```bash
python bishop/creds.py setup
```

## Usage

Once installed, Claude will automatically use Bishop when you mention anything related to your UniFi network. Examples:

- "Check my network"
- "What's going on with WiFi?"
- "Any security issues?"
- "Check firmware status"
- "Who's eating bandwidth?"
- "Is my network getting worse?"
- "Check switch port status"
- "Are my VLANs set up right?"
- "Block traffic from China"

## Requirements

- Ubiquiti UniFi controller (UDM, UDM Pro, UDM SE, Cloud Gateway, or self-hosted)
- A UniFi local account with at least read-only access (admin for device actions)
- Python 3.8+ with `requests`, `cryptography`, `urllib3` for the autonomous agent modules
- (Optional) Chrome MCP for AT&T BGW210 gateway management

## Files

- `SKILL.md` — The skill definition loaded by Claude Code (the main file)
- `bishop/` — Python package for autonomous operations (medbay, auto-heal, alerter, audit log)
- `benchmark.md` — Evaluation results showing skill effectiveness
- `evals/evals.json` — Test scenarios for benchmarking

## Benchmarks

With the skill loaded, Claude achieves a **93.6% pass rate** on network management tasks vs **70.2% without** — a +23.4 percentage point improvement. See `benchmark.md` for details.
