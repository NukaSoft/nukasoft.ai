---
title: "Email PunchOut"
excerpt: "Kill email tracking with architecture, not extensions. Text-only ingestion that defeats the entire marketing surveillance economy in one design decision."
rarity: "Legendary"
ingredients: 5
header:
  overlay_color: "#ff6600"
toc: true
---

# Email PunchOut

**Rarity:** Legendary (Orange)
**Ingredients:** 5/5
**Category:** Privacy / Communications / AI Operations
**Time to Build:** 2-4 hours (initial), ongoing refinement
**Monthly Cost:** ~$14 (Google Workspace Business Starter, 2 users)

---

> *"They can't track what you never render."*

---

## What It Does

Email PunchOut is an architectural pattern that defeats email tracking — not by blocking pixels or filtering headers, but by **never rendering HTML in the first place**. Your AI agent reads all email as plain text. Tracking beacons, 1x1 pixels, UTM parameters, redirect chains, open-rate trackers, click-through URLs — all of it dies on contact because none of it ever executes.

This isn't a browser extension. It's not a plugin. It's not a setting you toggle. It's a **design decision** that makes the entire email marketing surveillance industry irrelevant to you.

Your AI reads every email. You read none of them (unless you want to). The AI classifies, creates tasks, and delivers what matters through your preferred channel. Everything else gets archived — never deleted, always searchable, permanently on record.

---

## The Problem

You have 6+ email accounts. Every one of them is a tracking vector:

- **Open tracking:** 1x1 invisible pixels phone home the moment you open an email, reporting your IP, device, location, and timestamp
- **Click tracking:** Every link is a redirect through an analytics server that logs your click before forwarding you to the actual destination
- **Read receipts:** Hidden headers that confirm delivery and engagement
- **Behavioral profiling:** Aggregated open/click data builds a behavioral profile that follows you across every marketing platform
- **Address selling:** Your email address is bought, sold, and traded across data brokers — and you have no way to trace who leaked it

You've tried unsubscribing. You've tried spam filters. You've tried "mark as read." None of it works because the surveillance happens at the protocol level, not the content level.

---

## The Insight

**If your email client never renders HTML, none of the tracking infrastructure works.**

Every email tracking system depends on the same assumption: that a human will open the email in a client that renders HTML, loads remote images, and follows redirects. Remove that assumption and the entire system collapses.

An AI agent reading email via API gets raw text. No rendering engine. No image loader. No JavaScript. No cookies. The tracking pixel is just a URL string in a text blob — it never fires.

This is not a workaround. It's an architectural elimination of the attack surface.

---

## Ingredient 1: The Code

### What You Need

| Component | What | Where |
|-----------|------|-------|
| **Google Workspace** | Enterprise email with API access | [workspace.google.com](https://workspace.google.com) |
| **Gmail API MCP Server** | Claude Code skill that reads/sends email via API | `skills/skippy-google/` |
| **Inbox Processing Skill** | Classification rules, task creation, archival | `skills/skippy-inbox/` |
| **Outbound Delivery Skill** | Clean outbound messaging (strips tracking from replies) | `skills/radar/` |
| **Catch-All Routing** | `*@yourdomain.com → ai-agent@yourdomain.com` | Google Admin Console |

### Architecture

```
INBOUND (all accounts forward to one AI-managed inbox)
──────────────────────────────────────────────────────
personal@gmail.com           ─┐
work@company.com             ─┤
old-account@hotmail.com      ─┼──► ai-agent@yourdomain.com (Gmail inbox)
*@yourdomain.com (catch-all) ─┤         │
*@alias-domain.com           ─┘         ▼
                                  Gmail API (text-only read)
                                        │
                                        ▼
                                  Classification Engine
                                  (rules → labels → tasks)
                                        │
                              ┌─────────┼─────────┐
                              ▼         ▼         ▼
                          Archive    Task      Alert
                          (label)   (create)  (deliver)
```

### Core Code Pattern

The key implementation detail is brutally simple. When reading email via the Gmail API, you request the `text/plain` MIME part only:

```python
# Gmail API — read text only, never HTML
def read_email_safe(service, msg_id):
    """Read email as plain text. HTML never touches memory."""
    msg = service.users().messages().get(
        userId='me',
        id=msg_id,
        format='full'
    ).execute()

    # Extract ONLY text/plain parts
    payload = msg.get('payload', {})
    text_body = extract_text_parts(payload)

    return {
        'from': get_header(msg, 'From'),
        'to': get_header(msg, 'To'),
        'subject': get_header(msg, 'Subject'),
        'date': get_header(msg, 'Date'),
        'body': text_body,  # Plain text only. No HTML. No images. No tracking.
        'labels': msg.get('labelIds', [])
    }


def extract_text_parts(payload):
    """Recursively extract text/plain from MIME structure."""
    parts = payload.get('parts', [])
    if not parts:
        # Single-part message
        if payload.get('mimeType') == 'text/plain':
            import base64
            data = payload.get('body', {}).get('data', '')
            return base64.urlsafe_b64decode(data).decode('utf-8', errors='replace')
        return ''  # Skip HTML, images, attachments — they don't exist to us

    # Multi-part: recurse, only collect text/plain
    text_parts = []
    for part in parts:
        if part.get('mimeType') == 'text/plain':
            import base64
            data = part.get('body', {}).get('data', '')
            text_parts.append(
                base64.urlsafe_b64decode(data).decode('utf-8', errors='replace')
            )
        elif part.get('mimeType', '').startswith('multipart/'):
            text_parts.append(extract_text_parts(part))
    return '\n'.join(filter(None, text_parts))
```

**That's it.** The `text/plain` filter is the entire anti-tracking mechanism. Everything else is classification and delivery logic.

### Outbound Sanitization

When replying, strip tracking artifacts from quoted text:

```python
import re

def sanitize_outbound(body):
    """Remove tracking URLs and artifacts from outbound email."""
    # Kill UTM parameters
    body = re.sub(r'[?&]utm_[a-z]+=\S+', '', body)
    # Kill common tracking redirects
    body = re.sub(r'https?://[^\s]*click\.[^\s]*', '[link removed]', body)
    body = re.sub(r'https?://[^\s]*track\.[^\s]*', '[link removed]', body)
    body = re.sub(r'https?://[^\s]*open\.[^\s]*', '[link removed]', body)
    # Kill tracking pixels in any residual HTML
    body = re.sub(r'<img[^>]*width=["\']?1["\']?[^>]*>', '', body)
    body = re.sub(r'<img[^>]*height=["\']?1["\']?[^>]*>', '', body)
    return body
```

---

## Ingredient 2: The Value Proposition

### For Individuals

| Before | After |
|--------|-------|
| 6+ email accounts, all tracked | One AI-managed inbox, zero tracking |
| Hours/week managing email | Zero — AI reads everything, surfaces what matters |
| No idea who sold your address | Disposable aliases trace every leak |
| Marketing profiles built from your behavior | No opens registered, no clicks tracked, no profile built |
| Unsubscribe links that confirm you're alive | Never opened = never confirmed |

### For Organizations

| Capability | Business Value |
|------------|---------------|
| **Anti-surveillance architecture** | Eliminates marketing attribution leakage — competitors can't track your team's email behavior |
| **Enterprise compliance** | Full email archive, timestamped, searchable, never deleted. Litigation-ready without e-discovery costs |
| **Zero inbox management** | AI-managed email eliminates 5-10 hrs/week of executive time across the org |
| **Disposable alias system** | Trace data breaches to source — prove which vendor leaked addresses |
| **Vendor accountability** | Public "Who Sold My Email" reports create reputational consequences for data sellers |

### The Elevator Pitch

> "We don't block email trackers. We made them architecturally impossible. Our AI reads email as plain text — tracking pixels never fire, click redirects never execute, behavioral profiles never build. It's not a setting. It's not a plugin. It's a design decision that kills the entire email surveillance economy for anyone who adopts it."

### ROI Math

| Item | Value |
|------|-------|
| Executive email time eliminated | 5-10 hrs/week × $150/hr = $3,900-7,800/mo |
| Marketing surveillance eliminated | Priceless (or: cost of a data breach × probability) |
| Google Workspace cost | -$14/mo |
| **Net monthly value** | **$3,886-7,786/mo** |
| **Annual ROI** | **$46,632-93,432/yr** |

*Conservative estimate for a single executive. Multiply by headcount for org-wide deployment.*

---

## Ingredient 3: The Manual

### Prerequisites

- [ ] A domain you control (any registrar)
- [ ] Google Workspace Business Starter ($7/user/mo)
- [ ] Claude Code with MCP server support
- [ ] Node.js 18+ (for MCP server)
- [ ] A Google Cloud Project with Gmail API enabled

### Step 1: Set Up Google Workspace (30 min)

1. Sign up at [workspace.google.com](https://workspace.google.com) — Business Starter tier
2. Verify your domain (TXT record at your registrar)
3. Create two accounts:
   - `you@yourdomain.com` — Super Admin (your human account)
   - `agent@yourdomain.com` — Admin (your AI agent's account)
4. Set MX records per Google's instructions

### Step 2: Enable Catch-All Routing (10 min)

1. Google Admin Console → Apps → Google Workspace → Gmail → Routing
2. Add routing rule: catch-all for `*@yourdomain.com` → deliver to `agent@yourdomain.com`
3. Repeat for each alias domain you add later

*Now any email sent to any address at your domain lands in your agent's inbox.*

### Step 3: Set Up the Gmail API MCP Server (45 min)

1. Create a Google Cloud Project at [console.cloud.google.com](https://console.cloud.google.com)
2. Enable the Gmail API
3. Create OAuth 2.0 credentials (Desktop application type)
4. Download `credentials.json`
5. Install the MCP server:

```bash
cd ~/.claude/skills/skippy-google/
npm install
node auth.js  # Opens browser, completes OAuth flow, saves token
```

6. Add to your `.mcp.json`:

```json
{
  "mcpServers": {
    "skippy-google": {
      "command": "node",
      "args": ["/path/to/skills/skippy-google/server.js"]
    }
  }
}
```

### Step 4: Configure Email Forwarding (15 min per account)

For each of your existing email accounts, set up auto-forwarding to `agent@yourdomain.com`:

- **Gmail:** Settings → Forwarding → Add forwarding address → Verify → Forward a copy
- **Outlook/Live:** Settings → Mail → Forwarding → Enable → Enter address
- **Work/Exchange:** Ask IT (or use Outlook rules if allowed)

### Step 5: Build Classification Rules (30 min)

Create your inbox processing rules. Example structure:

```markdown
## Classification Rules

| Pattern | Label | Action |
|---------|-------|--------|
| From: *@company-client.com | clients/ | Create task |
| Subject contains "invoice" | finance/ | Archive |
| From: *@newsletter.* | noise/ | Archive, no task |
| Unknown sender | triage/ | Create task for review |
| Subject contains "urgent" | priority/ | Alert via Telegram |
```

### Step 6: Verify It Works (15 min)

1. Send a test email to `randomstring@yourdomain.com` — should arrive in agent's inbox (catch-all)
2. Send a tracking-heavy marketing email to your forwarded account — agent should read it as text only
3. Check that no open/click events register in the sender's analytics (use a test tool like [mailtrack.io](https://mailtrack.io) to verify)

**Total setup time: ~2-4 hours**

---

## Ingredient 4: The Training Path

### Level 1: Text-Only Reader (Beginner)

- Set up Google Workspace + Gmail API
- Agent reads email as plain text
- Manual classification (you tell the agent what to do with each email)
- **Unlocks:** Zero tracking, basic email automation

### Level 2: Auto-Classifier (Intermediate)

- Build classification rules
- Agent auto-labels and archives by pattern
- Task creation for important emails
- Catch-all routing for all domains
- **Unlocks:** Zero inbox management, multi-domain support

### Level 3: Disposable Aliases (Advanced)

- Generate unique aliases per service/signup
- Track which alias gets spam
- Burn compromised aliases
- Map alias → service for breach tracing
- **Unlocks:** "Who Sold My Email" accountability, spam source identification

### Level 4: Outbound Sanitization (Expert)

- Strip tracking from outbound replies
- Clean forwarded chains
- Rewrite URLs to remove UTM parameters
- **Unlocks:** Full anti-surveillance for both inbound AND outbound

### Level 5: Public Accountability (Legendary)

- Auto-generate "Who Sold My Email" reports
- Publish evidence: alias, service, date created, date spam arrived
- SEO-optimized public shame for data sellers
- Community contributions of verified leakers
- **Unlocks:** Reputational consequences for the email surveillance economy

---

## Ingredient 5: The Feedback Loop

### How to Spice It Up

This Recipe is alive. It gets better when people use it, break it, and improve it.

#### Contribute via GitHub

- **Fork the repo** → make your modification → **open a PR**
- Tag your PR with `recipe:email-punchout`
- Include: what you changed, why, and test results

#### Variant Recipes Welcome

Built a version that works with a different email provider? Different AI agent? Different classification engine? Submit it as a variant:

```
_recipes/email-punchout/variants/
├── outlook-variant.md      # Microsoft 365 / Graph API version
├── fastmail-variant.md     # Fastmail JMAP version
├── self-hosted-variant.md  # Postfix + local LLM version
└── your-variant.md         # Your contribution
```

#### Ideas for Community Spice-Ups

| Idea | Difficulty | Impact |
|------|-----------|--------|
| **Microsoft Graph API variant** | Medium | Unlocks M365/Outlook deployments |
| **Fastmail JMAP variant** | Medium | Privacy-focused alternative to Google |
| **Self-hosted Postfix + Ollama** | Hard | Zero cloud dependency, full local |
| **Shared "Who Sold My Email" database** | Medium | Community-sourced leak tracking |
| **Browser extension companion** | Easy | Visual dashboard for alias management |
| **Automated GDPR/CCPA complaint generator** | Medium | Turn leak evidence into legal action |
| **Corporate deployment playbook** | Medium | IT admin guide for org-wide rollout |
| **Tracking pixel honeypot** | Hard | Deliberately load pixels from a sandboxed environment to collect tracker intelligence |

#### Community Channels

- **GitHub Issues:** Bug reports, feature requests, questions
- **GitHub Discussions:** Show your setup, share classification rules, compare results
- **PRs:** Code, docs, variants, spice-ups — all welcome

---

## Why "PunchOut"?

In the Fallout universe, a PunchOut is when you bypass the standard interface and connect directly to the source — skipping the middleman, the markup, and the surveillance. That's exactly what this does to email.

The marketing industry built an entire surveillance apparatus on the assumption that humans read email through HTML-rendering clients. PunchOut bypasses that assumption entirely. Your AI agent connects directly to the mailbox via API, reads raw text, and the entire tracking infrastructure becomes irrelevant.

No pixels fire. No clicks register. No profiles build. You punched out.

---

## Files in This Recipe

```
_recipes/email-punchout/
├── README.md               ← This file (the full recipe)
└── variants/               ← Community variant recipes
```

**Referenced skills (in the private brain repo):**

| Skill | Role in Recipe |
|-------|---------------|
| `skippy-google` | Gmail API MCP server — reads/sends email |
| `skippy-inbox` | Classification rules and task creation |
| `radar` | Outbound delivery and sanitization |
| `hide-my-email` | Disposable alias management (future) |

---

## License

MIT. Take it, use it, modify it, deploy it. No attribution required (but appreciated).

If you build something cool with it, open an issue and tell us about it.

---

*"The best way to win the email tracking game is to not play it."* — Skippy the Magnificent
