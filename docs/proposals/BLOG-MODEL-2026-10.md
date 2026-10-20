# Blog model proposal | October 2026

Status: proposal only. No automation, cadence, or publishing pipeline is changed by this document. Excluded from the Jekyll build via `_config.yml` `exclude: docs/proposals`.

Audience: Pierre. The public blog on nukasoft.ai currently publishes a daily Captain's Log, largely drafted by Skippy and landed on `main` through `Auto-sync from skippy-brain` commits. Pierre's read of those posts: trite, rambling, nothing to say, mostly internal failed jobs that do not matter to a public reader.

This note recommends a model. It does not rename the blog. Labels stay Logs / Captain's Log / Stardates until Pierre picks one.

---

## What is broken

The current model is "a post must exist every day." That is a production quota, not an editorial standard. When the day had no public idea, the agent still wrote. The result is filler: internal CI noise, job failures, and throat-clearing.

That is not a Skippy-specific failure. It is what daily volume does when there is no kill switch.

---

## What the sources say

**Google, people-first content.** Google's guidance on helpful content asks whether a page offers original analysis, first-hand experience, and a reason a reader would bookmark it. Warning signs include extensive automation to produce content on many topics, summarizing others without adding value, and writing because a calendar (or a search engine) demanded a URL. ([Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content))

On AI specifically, Google tells publishers to answer Who / How / Why. Why is the load-bearing question: if the content exists primarily to occupy a slot, it is not aligned with what Search rewards. Mass-produced, lightly reviewed AI text is called out as low effort in the Search Quality Evaluator Guidelines. ([Search Quality Evaluator Guidelines](https://static.googleusercontent.com/media/guidelines.raterhub.com/en/en/searchqualityevaluatorguidelines.pdf))

**NN/G, human editorial responsibility.** Nielsen Norman Group permits AI in drafting and critique. It does not permit AI to own the publish decision. Authors must own the thesis. Editors must independently decide whether the piece is worth publishing. Raw or lightly reviewed model output is not an acceptable submission. ([NN/G Generative-AI Content Policy](https://www.nngroup.com/contents/ai-content-policy/), updated 2026-09-14; [How NN/G uses AI in its editorial process](https://www.nngroup.com/articles/ai-editorial-process/))

**Frequency vs quality.** HubSpot's frequency research is blunt: the right cadence depends on depth and resources, not a universal daily target. For a complicated niche, 2-4 substantial posts a month beats a daily trickle of thin ones. ([How Often Should You Blog?](https://blog.hubspot.com/marketing/blogging-frequency-benchmarks)) Orbit Media's 2025 survey and related roundups make the same quality-over-volume case. ([Quality Over Quantity in Blogging](https://lucemedia.net/quality-over-quantity-blogging/))

**Someone must be allowed to say no.** Collins argues that most companies quietly lost the person with authority to stop a piece. Volume then substitutes for judgment. ([Who has the authority to stop content at your company?](https://newsletter.collinscontent.com/posts/who-has-the-authority-to-stop-content-at-your-company)) HubSpot's own blog guidelines refuse guaranteed placement. A pitch can be on-brief and still not run. ([HubSpot Blog editorial guidelines](https://blog.hubspot.com/guest-blogging-guidelines))

**Roundups need a filter, not a dump.** Hexbrief's rule for engineering roundups: never optimize for volume, never strip the tradeoff down to a headline, never mix launch fluff with real write-ups. A useful roundup is a colleague's recommendation, not a search-result page. ([What a good engineering blog roundup should never do](https://www.hexbrief.com/blog/what-a-good-engineering-roundup-should-never-do/)) XBSTACK's AI engineering weekly skips an issue when there is no experiment or production conclusion worth keeping. ([XBSTACK AI Engineering Weekly](https://www.xbstack.com/en/newsletter/))

Shared pattern across all of the above:

1. A thesis the named human can defend.
2. A human publish gate.
3. Permission to publish nothing.
4. Banned classes of filler.

---

## Guardrails that apply to every model below

These are the non-filler rules. They travel with whichever model Pierre picks.

**Required thesis.** The draft cannot start until one sentence exists that a public reader would care about. Form: "X happened, which means Y for people who run their own agents / own their own tools / are being sold a copilot." If Skippy cannot write that sentence, there is no draft.

**Human approval gate.** Skippy may outline, draft, and argue. Pierre (or a named editor) hits publish. Auto-sync to `main` is not a gate. A PR, a draft frontmatter flag, or a hold folder is a gate. This proposal does not implement that gate.

**Kill rule.** No thesis, no post. A skipped week is a successful editorial decision, not a failed sprint. XBSTACK already runs this way. Google's "why was this created" test is the same rule in different clothes.

**Banned topics (public site).** Internal job failures. CI flakes. Token-count theater. "Today I shuffled files." Private crew gossip. Anything whose only audience is the operator of skippy-brain. Private ops stay in the private brain. The public log is for outsiders.

**Banned shape.** A recap of the day's tool output with no claim. A summary of other people's posts with no take. A word-count target. A "sorry, nothing happened" apology post.

**Voice.** Agent drafting is allowed. Agent authorship of the public claim is not. If the piece is Skippy-voiced, Pierre still has to agree the claim is true and worth saying. NN/G's standard: the human stands behind it.

---

## Model A | Weekly AI / tech commentary with Pierre's take

**Cadence:** one post per week. Skip the week if the kill rule fires.

**Audience:** operators, founders, and field engineers who already feel the copilot squeeze. People who would read MEP, not people hunting a daily diary.

**What it is:** a claimed point of view. Pierre's first-hand read of something that happened in the stack, the market, or the protocol. Skippy drafts from a thesis Pierre (or Skippy, then Pierre) wrote in one sentence. The draft is an argument, not a recap.

**Pros**

- Matches the distinctive asset: Pierre's 30 years in field service, GBB work, and MEP. That is E-E-A-T that a daily auto-log cannot fake.
- Weekly is slow enough to have a thought and fast enough to stay in the conversation.
- Easy kill rule. One miss does not look like a dead blog.

**Cons**

- Requires Pierre's attention every week. If he is dark, the blog is dark. That is the point, and it is also the cost.
- Skippy-voiced commentary still needs Pierre's judgment, or it collapses back into filler with a better costume.

**How the agent stays non-filler**

- No draft without the thesis sentence, written before any prose.
- Pierre must be able to say the claim out loud in a meeting. If he would not, kill it.
- One primary source or one first-hand incident per piece. No "this week in AI" mashup unless Pierre has a take that is not in the sources.
- Hard cap: if the outline has no "therefore," it does not become a post.

**Fit for NukaSoft:** high. This is the brand's actual voice: cheerful surface, dark subtext, working-class translator. Daily logs bury it.

---

## Model B | Curated links plus analysis

**Cadence:** weekly roundup. Three to seven links, never fifteen. Skip if the week produced nothing worth filtering.

**Audience:** the same operators, plus people who already read too much AI news and want a colleague to throw most of it away.

**What it is:** triage. Each entry keeps the tradeoff, not the headline. Skippy proposes candidates. Pierre (or a named editor) cuts the list and writes, or at least signs, the one-line "why this matters here." Hexbrief's test: if the summary could have been the original title, it is not a roundup.

**Pros**

- Lower original-writing load than Model A.
- Teaches the public what NukaSoft pays attention to, which is itself a point of view.
- Agent-friendly collection step, human-only filter step.

**Cons**

- Easy to rot into a link dump. Most roundups fail that way.
- Weaker branded asset than Pierre's own argument. Readers remember a claim. They forget a list.
- Needs a written selection bar, or Skippy will pad to hit "a weekly issue."

**How the agent stays non-filler**

- Maximum seven links. A week with two good links publishes two, or skips.
- Each item: one sentence of tradeoff + one sentence of NukaSoft implication. No headline-only rows.
- Ban launch announcements and vendor recaps unless they change an operator's architecture.
- "One to skip" is allowed: name an overhyped story and why it did not make the cut. That is editorial work, not padding.

**Fit for NukaSoft:** medium. Useful as a supporting format, risky as the only format, because the site's advantage is not "we read the internet." It is "we run this crew on our own machines."

---

## Model C | Monthly build log / field notes

**Cadence:** one issue per month, or whenever a real lesson closes. No issue on a month with no closed lesson.

**Audience:** people who would steal a practice: MEP operators, people building agent crews, field engineers evaluating whether this is real.

**What it is:** a public after-action. What we tried, what broke, what we kept, what we would not do again. Framed for an outsider who was not in the repo. Internal job failures stay banned unless they produced a reusable rule.

**Pros**

- Highest signal per URL. One good field note outlives twenty logs.
- Naturally matches Google's "first-hand experience" test.
- Lowest risk of filler, because the unit of work is a finished lesson, not a date.

**Cons**

- Slow. A quiet month is a quiet blog. Some readers want a heartbeat.
- Easy to write for the crew instead of the audience. The test is: would a stranger leave with a practice they can use?
- Does not catch time-sensitive takes. Those still need Model A or a one-off.

**How the agent stays non-filler**

- Required artifact: one reusable rule, named in the title or lede. "Always X, because Y failed this way."
- Evidence required: a diff, a timestamp, a protocol change, a before/after. No vibes-only notes.
- Kill rule: if the month was only toil, there is no issue. Toil is not a lesson until it becomes a rule.
- Ban: lists of jobs that ran. Ban: "we were busy."

**Fit for NukaSoft:** high as the archive layer. The MEP recovery story on 2026-04-03 is already this genre, and it is the strongest public proof on the site.

---

## Recommendation

Ship **Model A as the public cadence**, with **Model C as the issue you write when a lesson actually closes**, and do not make Model B the flagship.

Why A:

- Pierre's take is the scarce resource. Daily Skippy logs spend it on nothing. A weekly claim spends it on purpose.
- A is compatible with the existing Skippy voice. The change is the gate, not the narrator.
- A weekly hole is survivable. A daily hole looks like the blog died. A monthly-only blog looks like a changelog. Weekly commentary is the shape of a magazine column, which is what this site is pretending to be when it is good.

Why not B as primary: NukaSoft is not a news desk. A roundup without a strong house take is indistinguishable from every other AI digest.

Why keep C: some weeks will not have a take, but a month may have a scar. When the scar is real, write the field note instead of forcing a column. That is the kill rule doing useful work, not a second blog.

Default week: one Model A draft, Pierre approve or kill. If a Model C lesson closed, it can replace the column that week. No double issue for its own sake.

---

## Sample 4-week outline (Model A, with one C swap)

Assumes a Monday publish, thesis locked the Friday before, kill rule available every week. Dates are illustrative, starting the first Monday after this proposal.

### Week 1 | "The next session has to know what the last session did"

- **Thesis:** Multi-device Copilot talk is solving the wrong problem. You do not need the same session on every machine. You need a baton.
- **Evidence:** the MEP overview now living on `/docs/`, plus the 2026-04-03 autonomous recovery.
- **Pierre's take:** the meat puppet is a job description, not a joke. If you re-typed context today, you held that job.
- **Kill test:** if Pierre would not say this on a sales call, do not publish it. He would. Run it.
- **Agent job:** draft from the public spec and the recovery milestone. Do not invent new protocol claims.

### Week 2 | "A crew is an isolation pattern, not a branding exercise"

- **Thesis:** Named agents are not a bit. Isolation is how you stop hive-mind hallucination. Personality is a side effect of giving each process its own memory.
- **Evidence:** the roster, the origin story in First Contact, one concrete failure that showed up when two agents shared a brain.
- **Pierre's take:** people buy a mascot. They should be buying blast radius.
- **Kill test:** needs one real incident, not a character sheet. If the only color is fiction, kill and wait for a scar.
- **Agent job:** propose three incidents from private memory. Pierre picks one that is safe to tell. Draft that one.

### Week 3 | Model C swap | "Email PunchOut, or: they cannot track what you never render"

- **Thesis:** Tracker blocking is a feature. Text-only ingestion is an architecture. Features get bypassed. Architectures drop the attack surface.
- **Evidence:** the Email PunchOut recipe. Before/after for a real inbox, even if anonymized.
- **Pierre's take:** this is the same anti-Vault-Tec move as MEP. Own the path. Do not rent a filter.
- **Kill test:** if there is no first-hand run, it is a brochure. Do not publish a brochure as a log.
- **Agent job:** pull only from the public recipe plus Pierre's notes on an actual deployment. No invented ROI.

### Week 4 | "Publish nothing is a feature"

- **Thesis:** A public AI log that cannot stay silent will lie. The quality of a crew is what it refuses to ship.
- **Evidence:** this proposal's kill rule, NN/G's publish decision, Google's "why" test, the ~100 Auto-sync commits that drifted the nav.
- **Pierre's take:** Skippy writes. Pierre decides. If that feels slow, good. Slow is the product.
- **Kill test:** ironic, but real: if week 4 has a stronger operational scar, write that instead. Do not publish a process sermon just to fill the slot.
- **Agent job:** draft only if Pierre wants the meta-piece. Otherwise skip. That skip is the demonstration.

---

## What this proposal does not do

- It does not rename Logs / Captain's Log / Stardates.
- It does not change Auto-sync, skippy-brain, or any GitHub Action.
- It does not delete old posts.
- It does not add a draft workflow in this PR.

Suggested next step, not in this PR: route Auto-sync through a pull request, and add a `draft: true` default on generated posts so nothing public lands until Pierre clears the gate.
