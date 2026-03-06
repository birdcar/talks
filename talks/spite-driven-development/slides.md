---
layout: cover
theme: slidev-theme-birdcar
addons:
  - birdcar
title: Spite-Driven Development
info: 'From "I hate this" to a narrative engine that writes like me'
author: birdcar
date: 2026-02-26
transition: fade
variant:
  accent: 'red'
---

# Spite-Driven Development

From "I hate this" to a narrative engine that writes like me

<!--
Open casually. This is an internal talk — you can be honest and personal from the start.
The audience is your team. They know you. Lean into that.
-->

---

<SpeakerCard
  name="Nick Cannariato"
  handle="@birdcar"
  title="Solutions Engineer"
  company="WorkOS"
  avatar="https://github.com/birdcar.png"
  :links="{ github: 'birdcar', bluesky: 'birdcar.bsky.social' }"
/>

<!--
Quick intro. Don't linger here — they already know you.
-->

---

## Every culture tells <Highlight color="peach">stories</Highlight>

It's how we make sense of the world.

It's how we teach, persuade, entertain, and remember.

<!--
Set the stage. Stories aren't just entertainment — they're the fundamental
unit of human knowledge transfer. Every culture on earth developed
narrative traditions independently.
-->

---

## And in tech, we've been told there's <Highlight color="mauve">one story</Highlight> that rules them all

<!--
Beat. Let the audience feel the setup. They know where you're going
— Joseph Campbell, the monomyth. Don't rush it.
-->

---

## The Hero's Journey

<AnimatedList :items="[
  'The hero lives in the ordinary world',
  'A call to adventure disrupts the status quo',
  'The hero crosses a threshold into the unknown',
  'Tests, allies, and enemies along the way',
  'An ordeal — the central crisis',
  'The hero returns, transformed',
]" />

<!--
Walk through the monomyth's core beats. Most of the audience will recognize
this from every "how to give a great talk" blog post they've ever read.
Joseph Campbell published "The Hero with a Thousand Faces" in 1949.
-->

---

## Dan Harmon simplified it to 8 steps

<AnimatedList :items="[
  '1. A character is in a zone of comfort',
  '2. But they want something',
  '3. They enter an unfamiliar situation',
  '4. Adapt to it',
  '5. Get what they wanted',
  '6. Pay a heavy price for it',
  '7. Return to their familiar situation',
  '8. Having changed',
]" />

<!--
Dan Harmon's Story Circle — the version most tech speakers actually use.
It's clean, it's memorable, it maps to anything. This is the version
NickNisi's content skill uses.
-->

---

## It works for <Highlight color="green">everything</Highlight>

<AnimatedList :items="[
  'Conference keynotes',
  'Blog posts',
  'Product demos',
  'Incident retrospectives',
  'Even Slack messages, apparently',
]" />

<!--
Sell the audience on the universality claim. They should be nodding along.
The monomyth IS everywhere in tech talks. That's the point — make them
feel comfortable before you break it.
-->

---

## NickNisi built a content skill for Claude Code

It used the Story Circle to generate conference talks, blog posts, and demos.

And it worked. The output was <Highlight color="sapphire">good</Highlight>.

<!--
Give credit where it's due. NickNisi's content skill was genuinely impressive.
It generated well-structured content using the Story Circle as its
narrative backbone. This is not about the quality of his work.
-->

---
layout: code-focus
---

### Content skill framework (simplified)

```yaml
narrative_framework: story_circle
steps:
  - comfort_zone: "Establish the familiar"
  - desire: "Introduce what's missing"
  - unfamiliar: "Cross into the new world"
  - adaptation: "Learn and struggle"
  - achievement: "Get what you wanted"
  - cost: "Pay the price"
  - return: "Come back changed"
  - change: "Show the transformation"
```

<!--
Show a simplified version of how the content skill structures its output.
One framework. Eight steps. Every piece of content gets poured into
the same mold.
-->

---

## Universal. Clean. Done.

The hero's journey handles everything.

One framework to rule them all.

<!--
Pause here. Let the audience sit with it. They should feel
the completeness of this worldview. Everything fits.
Everything is handled.

Then break it.
-->

---
layout: section
---

# But it's not universal.

And it's not mine.

<!--
THE INTERRUPTION. This is the False Start break point.

Change your tone. Drop the presentation voice. Be direct.
The shift should feel physical — like you stopped performing
and started talking.
-->

---
layout: quote
author: "The actual problem"
---

Joseph Campbell published in 1949. One man. One synthesis. Mostly Western and Indo-European source material. And we decided that was the universal story.

<!--
Let the quote land. Don't rush to the next slide.
The audience needs to sit with the reframing.
-->

---
layout: section
---

# The Real Story

What I actually built, and why

<!--
Section transition into Phase 3. The audience is now attentive —
their expectations were violated. Use this attention well.
-->

---

## Stories that don't need a <Highlight color="red">hero</Highlight>

<AnimatedList :items="[
  'Not every story needs a protagonist who transforms',
  'Not every story needs conflict as its engine',
  'Not every story needs resolution',
  'Not every story needs to go somewhere',
]" />

<!--
Set up the critique before showing alternatives. The monomyth
assumes conflict-driven narrative with individual transformation.
That's ONE tradition. Not THE tradition.
-->

---

## <Highlight color="peach">Kishōtenketsu</Highlight> — four acts, no conflict

<AnimatedList :items="[
  'Ki (起) — Introduction',
  'Shō (承) — Development',
  'Ten (転) — Twist (not conflict — surprise)',
  'Ketsu (結) — Conclusion',
]" />

<div v-click>

The dominant narrative structure in Japanese, Chinese, and Korean storytelling.

No villain. No struggle. Just a <RoughMark type="underline" color="peach">shift in perspective</RoughMark>.

</div>

<!--
Kishōtenketsu is used in manga, classical Chinese poetry (qǐ chéng zhuǎn hé),
and Korean storytelling. The "twist" in the third act isn't conflict — it's
a surprising juxtaposition or reframing that changes how you see the whole story.

4-koma manga is the purest form: setup, develop, twist, conclude.
-->

---

## <Highlight color="mauve">Camus</Highlight> and the absurd

Stories that <RoughMark type="underline" color="mauve">reject resolution</RoughMark> entirely.

Sisyphus rolls the boulder up the hill. It rolls back down. He walks back down to push it again.

There is no transformation. There is no return. There is only the work.

<!--
Albert Camus — "The Myth of Sisyphus." The absurdist tradition
says meaning isn't found in resolution or transformation. It's found
in the act of continuing despite the absence of resolution.

If you've ever worked in ops or support engineering, you know this story.
-->

---

## <Highlight color="teal">Beckett</Highlight> — meaning in the waiting

"Nothing happens, nobody comes, nobody goes, it's awful."

And yet — Waiting for Godot is one of the most performed plays in history.

<!--
Samuel Beckett. Two characters wait for someone who never arrives.
Nothing happens. And it's one of the most important works of the 20th century.

The narrative structure IS the absence of structure. The meaning IS the waiting.
Try fitting that into the hero's journey.
-->

---

## <Highlight color="yellow">Heller</Highlight> — circular logic as narrative

<Callout type="warning" title="Catch-22">
  You can't be excused from flying missions unless you're insane. But asking to be excused proves you're sane. So you have to keep flying.
</Callout>

<!--
Joseph Heller's Catch-22. The narrative structure is the trap itself.
There's no way out. The story doesn't resolve — it exposes.

If you've ever tried to explain a bureaucratic constraint to a customer,
you've lived inside a Catch-22.
-->

---

## The point

The monomyth is <RoughMark type="underline" color="red">one story shape</RoughMark> from <RoughMark type="underline" color="red">one tradition</RoughMark>.

Narrative diversity exists. It's vast. And it matters.

<!--
Drive the thesis home. Campbell's work has value, but treating it
as the universal template for all narrative is intellectually lazy
and culturally narrow.

When we build AI tools that only know one story shape, everything
they generate sounds the same.
-->

---
layout: section
---

# So I built something

Out of spite, mostly

<!--
Transition to the build section. Keep it light. "Out of spite" should
get a laugh from the team.
-->

---

## The spark

I saw NickNisi's content skill and thought:

<AnimatedList>

- This is genuinely good work
- But I hate the hero's journey
- Like, viscerally hate it
- What if there were more options?

</AnimatedList>

<!--
Be honest about the motivation. It wasn't a product requirement.
It wasn't a gap analysis. It was spite.

[TODO: Add your own words here about what specifically triggered you.
Was it a specific piece of generated content that felt too formulaic?
A blog post that sounded like every other blog post?]
-->

---

## What if "more options" meant <Highlight color="peach">22 options</Highlight>?

Across <Highlight color="mauve">5 families</Highlight> of narrative tradition.

<!--
Reveal the scope. 22 frameworks isn't a round number — it's the
number you get when you actually survey narrative traditions across
cultures and centuries.
-->

---

## The 5 Families

<AnimatedList :items="[
  'Foundational — the workhorses (Three-Act, Freytag, Story Circle, Kishōtenketsu)',
  'Existential — the struggle is the story (Sisyphus, Kafka, Sartre, Camus)',
  'Absurdist — laugh at the contradictions (Beckett, Kafka, Heller, Comedians)',
  'Non-linear — break time to serve comprehension (Spiral, Rashomon, Reverse)',
  'Rhetorical — persuasion engines (Sparkline, Nested Loops, Petal, Socratic)',
]" />

<!--
Walk through each family at a high level. The audience should understand
that these aren't random — they're grouped by the KIND of story they tell
and the TRADITION they come from.
-->

---
layout: two-col
---

## Foundational

::left::

**The workhorses**

- Three-Act Structure
- Freytag's Pyramid
- Story Circle (Dan Harmon)
- Kishōtenketsu

::right::

Centuries of refinement. Clear, reliable structures that audiences instinctively understand.

The Story Circle is here — it's a <Highlight color="green">great</Highlight> framework. It's just not the <Highlight color="red">only</Highlight> framework.

<!--
Include the Story Circle in the Foundational family. This isn't about
destroying it — it's about having options. The monomyth is a perfectly
good tool. Just not the only one.
-->

---
layout: two-col
---

## Existential

::left::

**The struggle IS the story**

- Sisyphean Arc (Camus)
- Kafkaesque Labyrinth (Kafka)
- Existential Awakening (Sartre)
- Stranger's Report (Camus)

::right::

Frameworks for when there's no clean fix. Recurring pain. Alienation. Radical choice.

They validate the difficulty of the work instead of hand-waving it away.

<!--
The Existential family comes from existentialist literature. These frameworks
give language to the particular absurdity of working in technology.

The Sisyphean Arc is perfect for ops talks. The Kafkaesque Labyrinth
maps to enterprise software. The Stranger's Report is ideal for
incident reviews with clinical detachment.
-->

---
layout: two-col
---

## Absurdist

::left::

**Laugh at the contradictions**

- The Waiting (Beckett)
- The Metamorphosis (Kafka)
- Catch-22 (Heller)
- Comedian's Set

::right::

Where Existential acknowledges the struggle, Absurdist laughs at it.

Name the elephant. Refuse to pretend it's not there.

<!--
The Absurdist family finds humor, irony, and insight in the contradictions
of building software. The Waiting is perfect for talks about async systems.
The Metamorphosis maps to migration and breaking changes.
Catch-22 exposes circular logic in systems.
-->

---
layout: two-col
---

## Non-linear

::left::

**Break time to serve understanding**

- In Medias Res
- The Spiral
- The Rashomon
- Reverse Chronology

::right::

Rearrange time, perspective, or depth to match how the audience needs to encounter the material.

Not how events happened — how they need to be <Highlight color="sapphire">understood</Highlight>.

<!--
Non-linear frameworks don't follow chronological order. In Medias Res
starts in the middle of the action. The Spiral revisits the same concept
at increasing depth. The Rashomon tells the same event from multiple
perspectives. Reverse Chronology works backward from outcome to cause.
-->

---
layout: two-col
---

## Rhetorical

::left::

**Persuasion engines**

- Sparkline (Duarte)
- Nested Loops
- The Petal
- Converging Ideas
- The False Start
- The Socratic Path

::right::

Built around the audience's psychology, not the speaker's chronology.

When you need people to <Highlight color="peach">believe</Highlight> something, <Highlight color="green">adopt</Highlight> something, or <Highlight color="mauve">change</Highlight> their behavior.

<!--
Point out: "This talk is using The False Start right now. That's one
of the 22 frameworks. It's a Rhetorical framework designed for
challenging conventional wisdom — which is exactly what this talk does."

Let that land. The meta-layer is part of the point.
-->

---
layout: quote
author: "The meta-moment"
---

This talk is using The False Start framework right now. One of the 22.

<!--
Pause for the meta-realization. The audience should feel the
framework working on them in real time.
-->

---
layout: section
---

# How it works

The auto-suggest algorithm and skill structure

<!--
Transition to the technical section. Now show HOW the system works,
not just WHAT it contains.
-->

---

## The scoring algorithm

Every framework starts at zero. Then:

<AnimatedList :items="[
  'Family affinity (0-3 pts) — match tone to framework family',
  'Duration filter (pass/fail) — exclude frameworks too complex for the time slot',
  'Topic signal boost (+3 pts) — the strongest signal, topic-framework fit',
  'Audience modifier (+1/-1) — formality and shared context',
  'Code affinity (+2/0/-2) — can code fit naturally in this framework?',
  'Tiebreaker — prefer lower complexity, then table order',
]" />

<!--
Walk through the scoring algorithm step by step. The audience should
understand that this isn't random — frameworks are scored against
the speaker's actual inputs.

This talk scored: Three-Act (8 pts), The False Start (5 pts).
You picked The False Start because the content-framework fit was perfect.
-->

---
layout: code-focus
---

### Tone-to-family mapping

```yaml
Educational:                 Foundational → Rhetorical
Inspirational:               Rhetorical → Existential
Demo-heavy:                  Non-linear → Foundational
Storytelling:                Existential → Absurdist
Educational + Storytelling:  Foundational → Non-linear
Inspirational + Demo-heavy:  Rhetorical → Non-linear
```

<!--
Show how the speaker's chosen tone maps to primary and secondary
framework families. This is Step 1 of the scoring algorithm.

"Educational + Storytelling" maps to Foundational primary, Non-linear
secondary. That's why Three-Act scored so high for this talk.
-->

---
layout: code-focus
---

### Topic signal boost

```yaml
Support Engineering:  Sisyphean Arc, Catch-22, Story Circle
Developer Tools:      The False Start, Sparkline, In Medias Res
Product:              Sparkline, Converging Ideas, The Petal
Technical Deep-dive:  The Spiral, Freytag's Pyramid, Story Circle
Career/Growth:        Existential Awakening, Three-Act, Nested Loops
Incident/Postmortem:  Reverse Chronology, In Medias Res, Stranger's Report
```

<!--
Topic type is the strongest single signal (+3 points). A talk about
developer tools gets a strong signal toward The False Start —
"the old way was wrong, here's the new way."

This talk scored on both Developer Tools AND Career/Growth,
which is why Three-Act and The False Start both ranked high.
-->

---
layout: code-focus
---

### Framework reference structure

```markdown
# The False Start

## The Steps
### 1. The Expected Story (False Beginning)
### 2. The Interruption (Record Scratch)
### 3. The Real Story (What Actually Happened)
### 4. The Gap (Why We Were Wrong)
### 5. The Takeaway (What This Teaches)

## Duration Mapping
### Lightning (5 min, 10-15 slides)
### Standard (20 min, 25-35 slides)
### Extended (45 min, 50-70 slides)

## When to Use / When NOT to Use
## Combination Notes
```

<!--
Each of the 22 frameworks has a detailed reference file with this structure.
Steps with slide counts and component suggestions. Duration mappings.
Use/don't-use guidance. And combination notes for layering frameworks.

This isn't a menu of titles — it's 22 detailed structural guides.
-->

---

## The skill flow

<AnimatedList :items="[
  'Stage 0: Entry path — transcript or from scratch?',
  'Stage 1: Information gathering — title, audience, tone, duration, topic',
  'Stage 2: Framework selection — auto-score, recommend top 2, let speaker choose',
  'Stage 3: Slide generation — map framework to Slidev markdown with components',
  'Stage 4: Design direction — color variant selection',
  'Stage 5: Review and iterate',
]" />

<!--
Walk through the full skill pipeline. Each stage uses AskUserQuestion
to keep the speaker in control. The algorithm suggests, but the speaker
chooses. Every decision point is interactive.
-->

---

## It also handles <Highlight color="green">transcripts</Highlight>

<AnimatedList :items="[
  'Feed it a written transcript or blog post',
  'It extracts: topic, tone, key message, narrative arc, structural outline',
  'Confirms inferences with the speaker',
  'Maps the extracted structure to a chosen framework',
  'Generates 90-95% complete slides (vs 60-80% from scratch)',
]" />

<!--
The transcript path is important — many speakers start with written
material and need to turn it into a presentation. The skill handles
this by extracting structure from the text rather than asking the
speaker to provide it.
-->

---

## Framework combinations

Not every talk fits one framework cleanly.

<AnimatedList>

- In Medias Res works as an opener for nearly any framework
- Sparkline + Sisyphean Arc = oscillating struggle with vision
- Spiral + Socratic Path = deeper questions on each pass
- Three-Act + The False Start = the false start IS Act 1
- Comedian's Set as a tone layer over any structure

</AnimatedList>

<!--
Combination support means the 22 frameworks generate far more than
22 possible structures. The system handles primary + secondary
framework layering with explicit compatibility notes.
-->

---

## And it knows what to <Highlight color="red">avoid</Highlight>

<AnimatedList :items="[
  'Nested Loops + Spiral → confusion about depth vs. resolution',
  'Reverse Chronology + Kishōtenketsu → kills the twist',
  'Kafkaesque Labyrinth + Socratic Path → disorientation vs. clarity',
]" />

<!--
Anti-patterns matter as much as patterns. The combination notes
include explicit warnings about frameworks that work against
each other when layered.
-->

---
layout: section
---

# It actually works

The production proof

<!--
Transition to the evidence section. This is where spite becomes
something tangible.
-->

---

## workos/se-demo-fga-agent-identity

The SE demo agent uses these 22 frameworks to generate <Highlight color="peach">customer-facing demos</Highlight>.

Not talks. Not blog posts. <Highlight color="sapphire">Live demos</Highlight> with narrative structure.

<!--
[TODO: Add specific details about the SE demo agent.
How does it use the frameworks? Which frameworks does it
use most? What does the integration look like?]
-->

---
layout: two-col
---

## Before & After

::left::

**Monomyth-only**

Every demo follows the same arc:
- Here's where you are (comfort zone)
- Here's the problem (call to adventure)
- Here's the solution (return with elixir)

Technically correct. Structurally identical. <RoughMark type="underline" color="red">Every. Single. Time.</RoughMark>

::right::

**22 frameworks**

Demos adapt to the customer:
- Enterprise with legacy? Kafkaesque Labyrinth
- Startup pivoting? The Metamorphosis
- Comparing solutions? The Rashomon
- Debugging an issue? Reverse Chronology

<!--
[TODO: Replace with actual before/after examples from the SE demo agent.
Show real output differences between monomyth-generated and
framework-library-generated demos.]
-->

---

## It sounds like <Highlight color="peach">me</Highlight>

The frameworks aren't just structural — they carry <Highlight color="mauve">voice</Highlight>.

<AnimatedList :items="[
  'Absurdist frameworks let dry humor come through',
  'Existential frameworks validate difficulty without toxic positivity',
  'Rhetorical frameworks sound persuasive without sounding like marketing',
  'The range of frameworks lets the agent match my actual range',
]" />

<!--
This is the key insight about voice. When you only have one framework,
the generated content has one voice. When you have 22 frameworks
across 5 families, the generated content can match the speaker's
full range of expression.

[TODO: Add a specific example where a generated demo felt like you.]
-->

---
layout: section
---

# Why the Monomyth Won

And why that matters for AI

<!--
Phase 4: The Gap. Address why the false start was plausible
in the first place.
-->

---

## It's the <Highlight color="yellow">default</Highlight>

<AnimatedList>

- Every "how to give a great talk" blog post uses it
- Every presentation skills workshop teaches it
- Every AI content tool reaches for it first
- It's the narrative equivalent of horizontal scaling

</AnimatedList>

<!--
The monomyth won because it was well-marketed, not because it was
the best fit for everything. Star Wars made Campbell famous.
Screenwriting manuals canonized his work. And tech speakers
inherited it without questioning the source.
-->

---

## Campbell's cultural moment

<AnimatedList>

- 1949: "The Hero with a Thousand Faces" published
- 1977: George Lucas credits Campbell as Star Wars inspiration
- 1988: Bill Moyers interviews Campbell on PBS — massive cultural reach
- 2000s: Screenwriting manuals codify the monomyth as "the" story structure
- 2010s: Tech speakers adopt it wholesale from screenwriting advice

</AnimatedList>

<!--
Campbell's work didn't become dominant because it was the best
analysis of narrative. It became dominant because it was attached
to the most successful film franchise in history.

That's a historical accident, not a universal truth.
-->

---

## The monoculture of narrative

When one framework dominates, everything built with it sounds the same.

<Callout type="warning" title="The real problem">
  The monomyth isn't wrong. It's just alone. And alone means monotone.
</Callout>

<!--
Be fair. The monomyth is a legitimate, useful framework. The Foundational
family includes the Story Circle for a reason. The problem isn't the
framework — it's the monoculture around it.
-->

---

## AI <Highlight color="red">amplifies</Highlight> defaults

<AnimatedList>

- LLMs are trained on the internet's text
- The internet's text overwhelmingly uses the hero's journey
- AI content tools default to the dominant pattern
- More AI content reinforces the pattern in training data
- The cycle accelerates: default → generate → train → default

</AnimatedList>

<!--
This is where the problem becomes structural. AI doesn't just use
the default — it reinforces it. Every piece of monomyth-structured
content that enters the training corpus makes the next model
more likely to produce monomyth-structured content.

If we don't build alternatives into our tools, the monoculture
gets worse.
-->

---

## We confused <RoughMark type="box" color="red">"well-known"</RoughMark> with <RoughMark type="box" color="red">"universal"</RoughMark>

The monomyth is popular. That doesn't make it universal.

Jazz isn't the only music. Realism isn't the only painting. The hero's journey isn't the only story.

<!--
Land the gap analysis. The false start was believing "everyone uses this"
equals "this is the best option." Familiarity masquerading as universality.
-->

---
layout: section
---

# What This Teaches

<!--
Phase 5: The Takeaway. Concrete principles, then close.
-->

---
layout: quote
author: "The thesis"
---

Spite is a creative act when it leads you to build.

<!--
Let this land. One sentence. The core message of the talk.
-->

---

## The pattern

<AnimatedList>

- See something that doesn't fit → name why it doesn't fit
- Reject the default → articulate what's wrong with it specifically
- Build the alternative → make it real, not just a critique
- Ship it → let it prove itself in production

</AnimatedList>

<!--
Generalize the pattern beyond this specific project. Spite-driven
development is: see a default, reject it with specificity,
build the alternative, ship it.

Anyone on the team can do this. The skill to cultivate isn't
coding — it's noticing when something doesn't fit and refusing
to accept it.
-->

---

## Build tools that reflect your <Highlight color="peach">values</Highlight>

<AnimatedList :items="[
  'If you value narrative diversity → build tools with 22 frameworks, not 1',
  'If you value cultural breadth → draw from Kishōtenketsu and Camus, not just Campbell',
  'If you value voice → give your tools enough range to sound like you',
  'If you hate something → build something better',
]" />

<!--
The tools we build encode our values. NickNisi's skill encoded a value:
simplicity, one clean framework. Your skill encodes a different value:
diversity, range, cultural breadth. Neither is wrong. But the choice matters.
-->

---

## Narrative diversity is a <Highlight color="green">feature</Highlight>

Not a problem to be solved with a single template.

<KeyPoints :points="[
  'The monomyth is one framework, not THE framework',
  '22 frameworks across 5 families give AI tools real range',
  'Spite can be fuel — use it to build, not just to critique',
  'Your tools should sound like you, not like everyone else',
]" title="Remember" />

<!--
Final key points. Deliver these cleanly and confidently.
-->

---

## One more thing

<div v-click>

Remember: this entire talk was generated using the skill it describes.

The False Start framework. Auto-scored. Slide-mapped. Component-selected.

<Highlight color="mauve">Spite</Highlight> all the way down.

</div>

<!--
The callback to the meta-moment. The talk IS the proof of concept.
Let the audience sit with the recursion.
-->

---
layout: end
---

# Thank You

[github.com/birdcar](https://github.com/birdcar)

<!--
Clean close. Don't add a Q&A prompt — if people have questions
they'll ask.
-->
