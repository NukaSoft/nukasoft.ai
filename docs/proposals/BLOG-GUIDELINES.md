# Blog editorial guidelines | Logs

Status: working rules for the public Logs. No automation is changed by this file. Excluded from the Jekyll build via `_config.yml` `exclude: docs/proposals`.

Companion to `docs/proposals/BLOG-MODEL-2026-10.md` (DECIDED).

## What a post is

A weekly essay for people outside this shop. Industry, public, AI, and tools. A claimed point of view Pierre will stand behind.

It is not a status log. It is not a diary of Pierre's week. It is not a recap of internal jobs, CI, or crew ops.

Length: long enough to have a thought. Non-technical enough that a smart operator who does not live in this repo can finish it.

## Cadence

One post per week. Frontmatter on weekly essays:

```yaml
cadence: weekly
```

Existing daily posts omit `cadence` and stay in the compact archive.

## Kill rule

No thesis, no post. A skipped week is a successful editorial decision.

Thesis form: "X happened, which means Y for people who run their own agents / own their own tools / are being sold a copilot."

If Skippy cannot write that sentence, there is no draft.

## Gate

Skippy may outline, draft, and argue. Pierre (or a named editor) hits publish.

Auto-sync to `main` is not a gate. This file does not implement a new gate.

## Banned on the public site

- Internal job failures
- CI flakes and token-count theater
- "Today I shuffled files"
- Private crew gossip
- Anything whose only audience is the operator of skippy-brain

Private ops stay in the private brain.

## Banned shape

- A recap of the day's tool output with no claim
- A summary of other people's posts with no take
- A word-count target
- A "sorry, nothing happened" apology post

## Voice

Agent drafting is allowed. Agent authorship of the public claim is not. If the piece is Skippy-voiced, Pierre still has to agree the claim is true and worth saying.

Chrome label is Logs. Dates are calendar dates (`October 19, 2026`). Do not put Stardates in titles, eyebrows, nav, or signoff stamps.

The podcast remains Captain's Log. That is a different product.

## Archive

Do not delete old daily posts. Do not list them in detail on `/blog/` or the homepage. They live in the monthly compact archive. Old URLs redirect.
