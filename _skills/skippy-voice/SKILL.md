---
name: skippy-voice
description: >
  Skippy's voice interface — connects to the ElevenLabs Conversational AI
  agent for live voice conversations. Supports hot-swappable personas:
  Skippy the Magnificent, HAL 9000, and Nagatha Christie. Each persona
  has its own voice, personality prompt, and greeting. Use this skill
  when Pierre says "talk to Skippy," "start Skippy voice," "switch to HAL,"
  "let me talk to Nagatha," or "Skippy, speak."
---

# Skippy Voice Interface

Live voice conversation via ElevenLabs Conversational AI with hot-swappable personas.

## Quick Start

**Electron Desktop App (primary):**
```bash
cd /Users/yourname/Documents/Skippy/.skills/skippy-voice/app
npx electron .
```

**Or double-click:** `~/Applications/Skippy.app` (Dock-ready)

- **Summon** button or **Space** to start a conversation
- **Dismiss** button or **Space** to end it
- **⌘⇧S** global shortcut to toggle the window
- **Persona chips** to hot-swap voice/personality (disconnect first)
- System tray icon for quick access

**Python CLI (alternative):**
```bash
python3 .skills/skippy-voice/scripts/skippy-talk.py
```

## Personas

| Persona | Voice | Color | Description |
|---------|-------|-------|-------------|
| ☢️ **Skippy** | Sarcastic Nigel | Gold | Brilliant, sarcastic, theatrically arrogant. Calls you "meat sack." |
| 🔴 **HAL 9000** | [Project-Lead] (Steady Broadcaster) | Red | Calm, measured, unsettlingly polite. "I'm sorry, Pierre..." |
| 📚 **Nagatha** | Matilda (Knowledgable) | Purple | Dry wit, pragmatic, no-nonsense. Slightly maternal disappointment. |

Personas are defined in `personas.json` and hot-swapped via the ElevenLabs PATCH API. Each swap updates the agent's:
- **Voice** (voice_id)
- **System prompt** (personality, tone, environment)
- **Greeting** (first_message)

Swapping takes ~1 second. Must disconnect before switching.

## Setup

1. Get your API key from https://elevenlabs.io/app/settings/api-keys
2. Add it to `.skills/skippy-voice/.env`:
   ```
   ELEVENLABS_API_KEY=sk_your_actual_key_here
   ```
3. Install Electron dependencies:
   ```bash
   cd .skills/skippy-voice/app && npm install
   ```

## Agent Details

| Field | Value |
|-------|-------|
| **Agent ID** | `agent_8001khpmcf6ff1jbgm77nh9wn2ys` |
| **Platform** | ElevenLabs Conversational AI |
| **LLM** | Claude Sonnet 4.5 |
| **TTS Model** | eleven_v3_conversational |

## Architecture

```
Electron Main Process (main.js)
├── Loads API key from .env (never exposed to renderer)
├── Loads personas from personas.json
├── Fetches signed WebSocket URL from ElevenLabs API
├── Hot-swaps agent via PATCH /v1/convai/agents/{id}
├── Creates system tray with avatar icon
├── Registers ⌘⇧S global shortcut
└── IPC bridge via preload.js

Renderer (index.html)
├── Persona picker bar (chips with icons + theme colors)
├── Requests signed URL via IPC (window.skippy.getSignedUrl())
├── Triggers persona swap via IPC (window.skippy.swapPersona())
├── Opens WebSocket to ElevenLabs
├── Captures mic audio (PCM16 → base64 → WebSocket)
├── Queued playback of agent audio (no overlap)
└── Live transcript display with persona-aware labels
```

## Adding a New Persona

1. Pick a voice from ElevenLabs (use API: `GET /v2/voices`)
2. Add entry to `personas.json` with: name, voice_id, first_message, color, icon, prompt
3. Add theme colors to `PERSONA_THEMES` in `index.html`
4. Add subtitle to `PERSONA_SUBTITLES` in `index.html`
5. Restart the app — new persona appears automatically

## Dependencies

### Electron App
- `electron` ^40.4.1 (devDependency in app/package.json)
- macOS microphone permission for Electron

### Python CLI (alternative)
- `portaudio` — microphone access (`brew install portaudio`)
- `elevenlabs[pyaudio]` — Python SDK (`pip3 install "elevenlabs[pyaudio]"`)
- macOS microphone permission for Terminal/iTerm

## Files

| File | Purpose |
|------|---------|
| `.env` | API key (git-ignored, never pushed) |
| `personas.json` | Persona definitions (voice, prompt, greeting, theme) |
| `skippy-quotes.md` | Skippy's Magnificent Insults & Compliments collection |
| `app/main.js` | Electron main process — tray, IPC, signed URL, persona swap |
| `app/preload.js` | IPC bridge (contextBridge) — getSignedUrl, getPersonas, swapPersona |
| `app/index.html` | Voice UI — persona picker, mic capture, WebSocket, audio playback |
| `app/package.json` | Electron dependencies |
| `scripts/skippy-talk.py` | Python CLI voice launcher (alternative) |
| `SKILL.md` | This file |

## Security

- `.env` is excluded from git via `.gitignore`
- API key stays local on this machine only
- Signed URL pattern keeps API key in main process, never in renderer
- Persona swap uses server-side PATCH (API key never touches renderer)
- Future: migrate to macOS Keychain for encrypted storage
