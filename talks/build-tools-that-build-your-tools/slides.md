---
layout: cover
theme: slidev-theme-birdcar
addons:
  - birdcar
title: Build Tools That Build Your Tools
info: How a recursive plugin stack turned 4 hours of call prep into 5 minutes — and a Deal Hub
author: birdcar
date: 2026-05-21
variant:
  flavor: mocha
  accent: mauve
---

# Build Tools That <Highlight color="peach">Build Your Tools</Highlight>

How a recursive plugin stack turned hours of call prep into minutes — and a Deal Hub.

<!--
Hook: this is a talk about skill development, but it's actually a talk about
what happens when you take the meta-question seriously — "what tool would help
me build the tools I keep needing?" — and follow it all the way down.
-->

---
layout: section
---

# 4 months ago

A deal landed in my inbox.

<!--
Set the stage. This is the daily reality for AEs and SEs at WorkOS — and
honestly at every B2B company. Use this as the grounding shared reality.
-->

---
layout: quote
author: every SE, internally
---

What if you showed up to every call already knowing the answers? What if that took ~20min instead of an hour at best?

<!--
Concrete to concrete. Not "faster prep" — 5 minutes vs 4 hours. The gap is
the point. Let it land.
-->

---
layout: section
---

# Attempt one

I'll just have Claude write some markdown.

<!--
The False Start. This is where the story actually begins — me, last February,
deciding the answer was a Claude Code plugin. Easy, right?
-->

---

## February 2026: wiz-kid v0.1

<AnimatedList :items="[`Three skills: /discovery, /generate-packet, /generate-slides`, `~600 lines of 'hand-rolled' markdown`, `Glean for CRM data, Notion for storage`, `Worked. Sort of.`]" />

<!--
First commit was Feb 26. By the end of that day I had a working plugin that
researched accounts and dumped them into Notion. It was a real productivity
win. It was also the most fragile thing I'd ever shipped.
-->

---

## Then Anthropic shipped <Highlight color="sapphire">skill-creator</Highlight>

A single skill, 485 lines, that walks you through draft → eval → iterate → optimize.

<!--
Late March. I read it the day it dropped. It's good. Genuinely good. It has
ideas I hadn't had — eval viewers, blind comparators, description optimization
loops. I learned a lot from reading it.
-->

---

## What skill-creator gets right

<KeyPoints :points="[`Draft → test → review → improve as a first-class loop`, `Browser-based eval viewer for qualitative review`, `Description optimization with train/test split`, `skills are evaluated, not just written`]" title="The good ideas" />

<!--
Credit where credit is due. The eval-first mental model in skill-creator is
the right one. Most of what I built sits on top of that mental model.
-->

---

## What I still felt missing

<AnimatedList :items="[`A skill that requires you to spec before you generate`, `An intake gate so you can't ship half-baked ideas`, `A retrospective that learns across runs, not just within one`, `Subagents registered at the plugin level, right-sized per task`, `A scaffold that knows where it's going (project? global? marketplace?)`]" />

<!--
None of these are "skill-creator is wrong." They're "this is the shape of
the thing I keep wishing existed when I'm five skills into a plugin and
losing track of what I committed to in skill #2."
-->

---
layout: section
---

# Skill-forge

A meta-tool for building skills that don't drift.

<!--
The second big sparkline pivot. We've named the obstacle (skills-by-hand is
non-cumulative). Now I introduce the thing I actually built to fix that —
not to replace skill-creator, but to stack on top of its principles.
-->

---
layout: two-col
---

## What's in the box

::left::

**Three skills**

- `/forge-skill` — create from a brain dump
- `/improve-skill` — score + optimize an existing skill
- `/forge-harness` — scaffold agent harnesses into any repo

::right::

**Ten subagents**

- intake-analyst, skill-researcher
- skill-generator, skill-validator
- skill-optimizer, scaffold-writer
- grader, comparator, analyzer
- retrospective

<!--
Three skills, ten subagents, five commands, a deterministic validator script,
and a shared knowledge base of templates and anti-patterns. The numbers are
verifiable in the plugin.json.
-->

---
layout: section
---

# So I used it

To rebuild the thing that needed rebuilding.

<!--
Now we collapse the gap. Sparkline's final move: show the path from "what is"
to "what could be." The path is skill-forge → wiz-kid v2.
-->

---

## February: wiz-kid v0.1

Three skills, hand-rolled.

```
discovery/        # research an account
generate-packet/  # closer doc
generate-slides/  # pitch deck
```

<!--
Anchor the before-state. Pure markdown. No agents registered at the plugin
level. No tests. No internal consistency between skills.
-->

---
layout: two-col
---

## May: wiz-kid v0.5 — the <Highlight color="mauve">MEDDPICC</Highlight> reformulation

::left::

**Capture & coach**

- `/discovery`
- `/review-call`
- `/coach-deal`
- `/coach`
- `/update-stage`

::right::

**Prep & produce**

- `/prepare-pipeline`
- `/prepare-developing`
- `/prepare-advancing`
- `/prepare-commit`
- `/generate-packet`
- `/generate-poc`
- `/generate-slides`

<!--
3 → 12 skills, with every skill held to the same description engineering,
trigger-test, and validation discipline. The whole plugin is now a coherent
sales coaching surface, not a grab bag of automations. That's the lift
skill-forge gave me.
-->

---

## One deal, one demo

<RoughMark type="box" color="mauve">Enlighten Clinical Solutions</RoughMark>

A real WorkOS opportunity. Real Discovery Profile. Real MEDDPICC capture. Real call prep.

<!--
Now I'm going to show you what 4 hours of toil looks like compressed into
2.5 minutes of screen capture. This is wiz-kid running against an actual
account in our Notion Deals database.
-->

---
layout: default
---

## Watch this

<video controls preload="metadata" style="width: 100%; max-height: 75vh; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.4);">
  <source src="/wiz-kid-demo.mp4" type="video/mp4" />
</video>

<!--
2.5 minute screencast. Talking points while it plays:
- Discovery skill spawns parallel researchers
- MEDDPICC profile gets populated additively
- Prep-pipeline skill takes profile → call brief
- All written to a single Notion hub page per deal
Stop talking. Let the demo carry it.
-->

---

## The <Highlight color="peach">moneyshot</Highlight>

<KeyPoints :points="[
  '4 hours of call research → ~13 minutes',
  '12 skills covering every forecast stage from Pipeline to Commit',
  'Every deal hub additive — runs never blow away what came before',
  'Built by skill-forge, which was built to solve this exact toil',
]" title="What the recursion bought" />

<!--
This is the punchline of the talk. Restate it. Don't be subtle. The
recursive bet — building a tool to build the tool — is what made the
12-skill MEDDPICC version possible in a weekend instead of a quarter.
-->

---
layout: default
---

## Your Deal Hub is ready

For Enlighten Clinical Solutions, the profile is live now:

[notion.so/workos/Enlighten-Clinical-Solutions](https://www.notion.so/workos/Enlighten-Clinical-Solutions-367d458aea8b818384d5c8e1df9b72b1)

<Callout type="tip" title="If you're the AE on this account">
  Open the link. The MEDDPICC capture, suggested questions, and stage gaps
  are already there. Spend the saved time on the parts of the call only
  <Highlight color="peach">you</Highlight> can do.
</Callout>

<!--
This is the call to action. The Deal Hub for Enlighten is the takeaway —
not the talk, not the slides, not the plugin. It's the deliverable. The
audience leaves and has something concrete to use today.
-->

---
layout: section
---

# The pattern

Build the tool that builds your tools.

<!--
Optional final beat — the generalizable lesson. The trick isn't wiz-kid.
The trick is noticing that "this task is annoying me" plus "I keep doing
this task" equals "the leverage isn't in the task, it's in the tool."
-->

---

## What to take home

<AnimatedList :items="[`Notice the toil that compounds — not the one-off chores`, `Build the meta-tool before the second instance of the work`, `Make the meta-tool opinionated where you'd be lazy`, `Let it learn between sessions, not just within one`, `Then go close the deal you couldn't prep for before`]" />

<!--
Five takeaways but they're really one: the leverage is in tools that build
tools, but only if those tools enforce the discipline you wouldn't enforce
on yourself. Skill-forge → wiz-kid is one instance of that pattern. Find yours.
-->

---
layout: end
---

# Thanks

[github.com/birdcar](https://github.com/birdcar) · [@birdcar](https://bsky.app/profile/birdcar.bsky.social) · <nick.cannariato@workos.com>

<!--
Wrap up. Take questions. Plug the Deal Hub link one more time on the way out.
-->
