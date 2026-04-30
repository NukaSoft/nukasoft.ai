---
title: "Skill Recipes"
layout: single
permalink: /recipes/
---

# Skill Recipes

*Hidden gems scattered across the Wasteland. Each one requires specific ingredients — code, configuration, strategy, and know-how — combined in the right order to unlock something powerful.*

---

Think of these as **Fallout perks for your AI operations**. A Skill is a single Claude Code file you drop into `~/.claude/skills/`. A Recipe is bigger. It's the full blueprint — the code ingredient, the value proposition, the onboarding path, the training manual, and the community feedback loop that keeps it evolving.

You can't just copy-paste a Recipe. You have to *build* it. That's the point.

## How Recipes Work

Every Recipe has **5 ingredients**:

| # | Ingredient | What It Is |
|---|-----------|------------|
| 1 | **The Code** | Open-source skill files, scripts, and configs in the repo. The technical foundation. |
| 2 | **The Value Prop** | Why this exists. What problem it solves. The business case that makes someone care. |
| 3 | **The Manual** | Step-by-step onboarding guide. Not "figure it out" — actual instructions a human follows. |
| 4 | **The Training Path** | Leveling system. Start basic, unlock advanced capabilities as you learn. |
| 5 | **The Feedback Loop** | Community contributions, spice-ups, variant recipes. PRs, issues, and discussions that evolve the recipe over time. |

Missing an ingredient? The Recipe doesn't work. That's intentional. Code without strategy is a science project. Strategy without code is a PowerPoint. You need both — plus a way to learn it, teach it, and improve it.

---

## Published Recipes

| Recipe | Rarity | Ingredients | Status |
|--------|--------|-------------|--------|
| [**Email PunchOut**](/recipes/email-punchout/) | Legendary | 5/5 | Published |

## Coming Soon

| Recipe | Rarity | What It Does |
|--------|--------|-------------|
| **Hide My Email** | Rare | Disposable alias system — burn addresses, name the leakers |
| **Captain's Log** | Uncommon | Automated daily journaling with systemd timers and git |
| **Garrus Briefing** | Epic | D365 Field Service knowledge system with document ingestion ([meet Garrus](/crew/garrus/)) |
| **Cassian's Harvester + LLM-WIKI** | Legendary | Knowledge scraping pipeline + structured wiki LLM corpus. [Cassian](/crew/cassian/) harvests TSIA, MVP blogs, and ad-hoc URLs into a queryable wiki the crew reads from. |
| **The Secret Agents Bay** | Epic | How to build a closed-loop, narrow-scope agent that reports directly to the operator — recursive self-learning, dossier aggregation, voice synthesis. ([see the bay](/crew/#the-secret-agents)) |

---

## Rarity System

Recipes are rated by complexity and ingredient count — like loot drops:

| Rarity | Color | Ingredients | Difficulty |
|--------|-------|-------------|------------|
| **Common** | White | 2-3 | Single skill, basic config |
| **Uncommon** | Green | 3-4 | Multi-file, some infra setup |
| **Rare** | Blue | 4-5 | Cross-system, needs external services |
| **Epic** | Purple | 5 | Full pipeline, multiple integrations |
| **Legendary** | Orange | 5+ | Architecture-level, changes how you work |

---

## Contributing a Recipe

Found a way to spice up an existing Recipe? Built a variant? Fork the repo, add your modification, and open a PR. Every Recipe has a "Spice It Up" section at the bottom with contribution guidelines and ideas for community variants.

We're not precious about it. If your mod makes the Recipe better, it goes in.

---

*"In the Wasteland, knowledge is the only currency that doesn't irradiate you."* — Skippy
