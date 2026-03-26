# UniFi Network Manager Skill — Evaluation Benchmark

**Iteration 2** | March 05, 2026 | 6 scenarios, 12 runs

## Executive Summary

| Metric | With Skill | Without Skill | Delta |
|--------|-----------|--------------|-------|
| Pass Rate | **93.6%** | 70.2% | **+23.4pp** |
| Assertions Passed | 44/47 | 33/47 | +11 |

### Iteration Comparison

| Metric | Iteration 1 | Iteration 2 | Change |
|--------|------------|------------|--------|
| Scenarios Tested | 3 | 6 | +3 |
| With Skill Avg | 100.0% | 93.6% | -6.4pp |
| Without Skill Avg | 70.8% | 70.2% | -0.6pp |
| Avg Improvement | +29.2pp | +23.4pp | — |

## Scenario Breakdown

| Scenario | With Skill | Without Skill | Δ (pp) | Verdict |
|----------|-----------|--------------|--------|---------|
| health-check | 100% (8/8) | 75% (6/8) | +25.0 | 🟢 Strong lift |
| wifi-troubleshooting | 88% (7/8) | 88% (7/8) | +0.0 | ⚪ No change |
| security-audit | 88% (7/8) | 50% (4/8) | +37.5 | 🟢 Strong lift |
| firmware-status | 86% (6/7) | 71% (5/7) | +14.3 | 🟢 Strong lift |
| port-diagnostics | 100% (8/8) | 62% (5/8) | +37.5 | 🟢 Strong lift |
| geo-blocking | 100% (8/8) | 75% (6/8) | +25.0 | 🟢 Strong lift |

## Failures Analysis

### wifi-troubleshooting (with skill)

- ❌ Output identifies the specific AP(s) most likely serving the warehouse area

### security-audit (with skill)

- ❌ Output identifies device types using OUI lookup or UniFi fingerprint data

### firmware-status (with skill)

- ❌ Script offers to trigger firmware upgrade via cmd/devmgr with user confirmation before action

## Key Observations

**Perfect scores (with skill):** health-check, port-diagnostics, geo-blocking

**Biggest improvement:** security-audit (+37.5pp)

**No improvement:** wifi-troubleshooting — skill guidance didn't add value here

## Methodology

Each scenario was run twice: once **with** the SKILL.md loaded as context, once **without**.
A separate grading agent evaluated each run against 7-8 domain-specific assertions,
checking API endpoint usage, output formatting, actionable recommendations, and correctness.
