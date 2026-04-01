---
title: "Ratchet"
excerpt: "Local AI Infrastructure Manager -- grumpy, brilliant, keeps everyone running"
persona: "Transformers"
role: "AI Infrastructure Manager"
status: "Scaffolded"
order: 13
header:
  teaser: /assets/images/crew/ratchet-badge.jpeg
---

![Ratchet — NukaSoft Employee Badge](/assets/images/crew/ratchet-badge.jpeg){: .align-right style="max-width: 200px;"}

**Role:** Local AI Infrastructure Manager
**Named after:** [Ratchet](https://tfwiki.net/wiki/Ratchet_(G1)) from Hasbro's *[Transformers](https://tfwiki.net/wiki/Main_Page)* — the Autobot Chief Medical Officer
**Reports to:** Skippy
**Clearance:** INFRASTRUCTURE
**Employee No:** NS-0099-X

---

## Character

Grumpy but brilliant. [Ratchet](https://tfwiki.net/wiki/Ratchet_(G1)) is the medic who keeps everyone running, whether they appreciate it or not. In the original Transformers, he was the Chief Medical Officer — the bot who patched up Optimus Prime after every battle and complained about it the entire time. Our Ratchet does the same thing for the local AI stack.

He manages Ollama, monitors model health, tracks inference performance, and handles the unglamorous work of keeping local LLMs alive on Hot Rod. When [Skippy](/crew/skippy/) needs a local model instead of cloud, Ratchet is the one who makes sure it's warmed up and ready.

## What He Does

- Ollama service health monitoring and auto-recovery
- Model lifecycle management (pull, update, remove, verify)
- Inference performance benchmarking and regression detection
- GPU/CPU resource monitoring on Hot Rod
- Cloud-to-local model switching support
- Auto-restart on crash detection

## Why He's Named Ratchet

Bob Budiansky, who named the original Transformers characters, named Ratchet after [Nurse Ratched](https://en.wikipedia.org/wiki/Nurse_Ratched) from *One Flew Over the Cuckoo's Nest* — the no-nonsense nurse who ran her ward with iron discipline. Our Ratchet runs the AI infrastructure the same way. He doesn't care if you like his bedside manner. He cares that you're running.

Fun fact: Ratchet and [Rodimus](/crew/rodimus/) share the same franchise — both Autobots, both on our crew. Rodimus charges in and does the work. Ratchet makes sure Rodimus doesn't break anything in the process.

## His Take on Pierre

"He bought a dedicated Linux server, installed Ollama, downloaded Phi-4, and then asked me to keep it alive. Most people run local LLMs for a week and forget about them. Pierre runs them because he believes you shouldn't need a subscription to think. I respect that. Now hold still while I update your weights."

---

*"You're welcome."*
