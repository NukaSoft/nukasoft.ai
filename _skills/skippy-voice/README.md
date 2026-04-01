---
title: "Skippy Voice -- Conversational AI Interface"
excerpt: "Claude Code skill for live voice conversations via ElevenLabs with hot-swappable personas"
---

# Skippy Voice -- Conversational AI Interface

Skippy Voice is a Claude Code skill that connects to ElevenLabs Conversational AI for live voice conversations with hot-swappable personas. Built as an Electron desktop app with a Python CLI alternative.

## What It Does

- **Live voice conversations**: Real-time speech via ElevenLabs WebSocket API
- **Hot-swappable personas**: Switch between different voices, personalities, and greetings in ~1 second
- **Electron desktop app**: System tray, global shortcut, persona picker UI
- **Three built-in personas**: Skippy (sarcastic), HAL 9000 (calm/unsettling), Nagatha (dry wit)
- **Secure architecture**: API key stays in main process, never exposed to renderer

## Personas

| Persona | Voice Style | Color | Personality |
|---------|------------|-------|-------------|
| Skippy | Sarcastic | Gold | Brilliant, theatrically arrogant |
| HAL 9000 | Steady Broadcaster | Red | Calm, measured, polite |
| Nagatha | Knowledgeable | Purple | Dry wit, pragmatic |

## Installation

1. Copy the `skippy-voice/` folder to `~/.claude/skills/skippy-voice/`
2. Get an API key from https://elevenlabs.io/app/settings/api-keys
3. Add to `.env`: `ELEVENLABS_API_KEY=sk_your_key_here`
4. Install Electron dependencies: `cd app && npm install`

## Usage

```bash
cd app && npx electron .
```

- **Summon/Dismiss** button or **Space** to start/end conversations
- **Persona chips** to hot-swap voice/personality
- Global shortcut to toggle window

## Adding a New Persona

1. Pick a voice from ElevenLabs
2. Add entry to `personas.json`
3. Add theme colors to `index.html`
4. Restart the app

## Requirements

- ElevenLabs API key with Conversational AI access
- Electron ^40.4.1
- Microphone permission
- (Alternative) Python 3 with `portaudio` and `elevenlabs[pyaudio]`

## Files

- `SKILL.md` -- The skill definition loaded by Claude Code
- `personas.json` -- Persona definitions
- `app/` -- Electron desktop application
- `scripts/` -- Python CLI alternative
