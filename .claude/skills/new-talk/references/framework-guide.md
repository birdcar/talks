# Framework Guide

Decision engine for selecting a narrative framework for a technical presentation. Used during Stage 2 of the new-talk skill to recommend the best structure based on Stage 1 inputs.

## 1. Quick Reference Table

| # | Name | Family | One-line Description | Best For |
|---|------|--------|---------------------|----------|
| 1 | Three-Act Structure | Foundational | Setup, confrontation, resolution in three clean beats | `general`, `educational`, `any-duration` |
| 2 | Freytag's Pyramid | Foundational | Five-phase arc with rising action, climax, and falling action | `deep-dive`, `postmortem`, `extended` |
| 3 | Story Circle (Dan Harmon) | Foundational | Eight-step hero's journey adapted for technical talks | `journey`, `transformation`, `standard` |
| 4 | Kishotenketsu | Foundational | Four-act structure with twist instead of conflict | `surprising-insight`, `reframing`, `no-villain` |
| 5 | Sisyphean Arc (Camus) | Existential | Recurring struggle reframed as meaningful through persistence | `ops`, `support`, `reliability`, `on-call` |
| 6 | Kafkaesque Labyrinth (Kafka) | Existential | Navigating absurd bureaucratic or systemic complexity | `enterprise`, `legacy-systems`, `process-critique` |
| 7 | Existential Awakening (Sartre) | Existential | Confronting radical freedom and the weight of choosing your tools | `career`, `architecture-decisions`, `greenfield` |
| 8 | Stranger's Report (Camus) | Existential | Detached, observational analysis of a system's inner contradictions | `audit`, `code-review`, `incident-review` |
| 9 | The Waiting (Beckett) | Absurdist | Tension and meaning found in the space where nothing happens | `async`, `queues`, `waiting-for-ci`, `distributed-systems` |
| 10 | The Metamorphosis (Kafka) | Absurdist | Waking up to discover everything has fundamentally changed | `migration`, `breaking-changes`, `rewrite` |
| 11 | Catch-22 (Heller) | Absurdist | Exposing circular logic and no-win constraints in systems | `tech-debt`, `tradeoffs`, `impossible-requirements` |
| 12 | Comedian's Set | Absurdist | Setup-punchline rhythm with callbacks and escalating bits | `lightning`, `meetup`, `high-energy`, `entertainment` |
| 13 | In Medias Res | Non-linear | Open in the middle of the action, then rewind to explain | `incident`, `demo-first`, `hook-heavy` |
| 14 | The Spiral | Non-linear | Revisit the same concept at increasing depth each pass | `layered-concept`, `workshop`, `progressive-disclosure` |
| 15 | The Rashomon | Non-linear | Same event told from multiple perspectives | `architecture`, `cross-team`, `empathy`, `tradeoffs` |
| 16 | Reverse Chronology | Non-linear | Start with the outcome and work backward to the cause | `postmortem`, `debugging`, `root-cause` |
| 17 | The Sparkline (Duarte) | Rhetorical | Alternate between "what is" and "what could be" to build desire | `vision`, `product`, `persuasion`, `keynote` |
| 18 | Nested Loops | Rhetorical | Layer stories inside stories, resolving them in reverse order | `storytelling`, `extended`, `multiple-anecdotes` |
| 19 | The Petal | Rhetorical | Multiple independent stories that all support one central thesis | `examples-heavy`, `diverse-audience`, `standard` |
| 20 | Converging Ideas | Rhetorical | Separate threads that merge into a single conclusion | `interdisciplinary`, `synthesis`, `multi-topic` |
| 21 | The False Start | Rhetorical | Begin with a conventional approach, then reveal why it fails | `refactoring`, `paradigm-shift`, `myth-busting` |
| 22 | The Socratic Path | Rhetorical | Drive the talk through questions the audience is already asking | `educational`, `workshop`, `interactive` |

## 2. Auto-Suggest Decision Matrix

### Tone to Family Mapping

| Tone (from Stage 1) | Primary Family | Secondary Family |
|---------------------|---------------|-----------------|
| Educational | Foundational | Rhetorical |
| Inspirational | Rhetorical | Existential |
| Demo-heavy | Non-linear | Foundational |
| Storytelling | Existential | Absurdist |
| Educational + Storytelling | Foundational | Non-linear |
| Inspirational + Demo-heavy | Rhetorical | Non-linear |

### Duration to Complexity Filter

| Duration | Max Complexity | Excluded Frameworks |
|----------|---------------|-------------------|
| Lightning (5 min) | Low | Freytag's Pyramid, Story Circle (full 8-step), Nested Loops, The Spiral, Reverse Chronology |
| Standard (20 min) | Medium | Nested Loops (risky, needs tight control) |
| Extended (45 min) | High | Comedian's Set (hard to sustain), In Medias Res (impact fades at length) |

Complexity ratings:
- **Low**: Three-Act, Kishotenketsu, In Medias Res, Comedian's Set, The False Start, The Petal
- **Medium**: Story Circle, Sparkline, Socratic Path, Converging Ideas, Catch-22, Sisyphean Arc, Stranger's Report, The Metamorphosis, The Waiting
- **High**: Freytag's Pyramid, Nested Loops, The Spiral, The Rashomon, Reverse Chronology, Kafkaesque Labyrinth, Existential Awakening

### Audience to Formality Adjustment

| Audience (from Stage 1) | Formality | Effect |
|-------------------------|-----------|--------|
| Conference | High | Favor Rhetorical and Foundational families. Absurdist frameworks need confident delivery notes. |
| Meetup | Medium | All families viable. Absurdist and Non-linear frameworks play well. |
| Internal team | Low | Existential and Absurdist families resonate (shared context). Comedic tone is safer. |
| Workshop | Medium | Favor Foundational, Spiral, and Socratic Path. Needs participatory beats. |
| Lightning talk | Medium-High | Favor low-complexity frameworks. Every slide must earn its place. |

### Topic Type Signals

| Topic Type (from Stage 1) | Strong Signal Frameworks | Rationale |
|--------------------------|------------------------|-----------|
| Support Engineering | Sisyphean Arc, Catch-22, Story Circle | Recurring struggle, impossible constraints, transformation arcs |
| Developer Tools | The False Start, Sparkline, In Medias Res | "Old way was wrong", vision-casting, demo-first hooks |
| Product | Sparkline, Converging Ideas, The Petal | Persuasion, synthesis, multi-example proof |
| Technical Deep-dive | The Spiral, Freytag's Pyramid, Story Circle | Layered depth, classical arc, transformation journey |
| Career/Growth | Existential Awakening, Three-Act, Nested Loops | Freedom of choice, clean arc, layered personal stories |
| Incident/Postmortem | Reverse Chronology, In Medias Res, Stranger's Report | Work backward from outcome, start in the action, detached analysis |

### Code-Heavy Adjustment

When `code_heavy` is true, deprioritize frameworks that lack natural code insertion points:

| Framework | Code Affinity | Notes |
|-----------|--------------|-------|
| Story Circle | High | Code fits naturally in Search, Find, Return |
| The Spiral | High | Code deepens on each pass |
| Three-Act | High | Code in Act 2 (confrontation) |
| Sparkline | Medium | Code in "what could be" segments |
| In Medias Res | High | Open with the code that broke/worked |
| Freytag's Pyramid | High | Code throughout rising/falling action |
| Comedian's Set | Low | Code breaks comedic rhythm |
| Nested Loops | Low | Story layering conflicts with code focus |
| Kishotenketsu | Medium | Code in twist (ten) phase |
| Existential Awakening | Low | Abstract framework, code feels forced |
| The Waiting | Medium | Code for the "waiting" visualization |
| The Metamorphosis | Medium | Before/after code comparisons |
| Catch-22 | Medium | Code that demonstrates the circular constraint |
| Kafkaesque Labyrinth | Low | Narrative-driven, code is secondary |
| Sisyphean Arc | Medium | Code in the recurring cycle |
| Stranger's Report | Medium | Code as evidence in the report |
| The Rashomon | High | Same code from different perspectives |
| Reverse Chronology | High | Walk backward through code changes |
| The Petal | Medium | Code examples as individual petals |
| Converging Ideas | Medium | Code threads that merge |
| The False Start | High | Show the wrong code, then the right code |
| The Socratic Path | High | Code answers each question |

## 3. Suggestion Algorithm

The algorithm scores each of the 22 frameworks against the collected Stage 1 inputs and presents the top recommendations.

### Scoring Procedure

Start every framework at a base score of zero. Apply the following modifiers in order.

**Step 1: Family Affinity (0-3 points).** Look up the speaker's tone in the tone-to-family mapping table. Frameworks in the primary family receive 3 points. Frameworks in the secondary family receive 1 point. All others receive 0.

**Step 2: Duration Filter (pass/fail).** Check the framework's complexity rating against the duration's max complexity. If a framework exceeds the complexity ceiling, eliminate it from consideration entirely. Do not try to salvage an excluded framework with bonus points from other categories.

**Step 3: Topic Signal Boost (+3 points).** If the framework appears in the strong signal list for the speaker's topic type, add 3 points. This is the single strongest signal in the algorithm because topic-framework fit matters more than any other factor.

**Step 4: Audience Modifier (+1 or -1 point).** Apply a +1 bonus if the framework belongs to a family that the audience table marks as favorable. Apply a -1 penalty if the audience context makes the framework risky (for example, Absurdist frameworks at a formal conference without delivery experience notes).

**Step 5: Code Affinity (+2 / 0 / -2 points).** Only applies when `code_heavy` is true. Frameworks rated High code affinity receive +2. Medium receives 0. Low receives -2.

**Step 6: Tiebreaker.** If two or more frameworks share the top score, prefer the one with lower complexity (easier to execute well). If still tied, prefer the framework that appears earlier in the quick reference table (the order reflects general versatility).

### Presenting Results

Present the top 2 scoring frameworks as primary recommendations. For each, include: the framework name, its family, a 2-3 sentence explanation of why it fits this specific talk, and a brief sketch of how the talk's topic maps onto the framework's structure.

Below the top 2, group the remaining eligible frameworks by family. Display each family as a collapsed section the speaker can browse if neither recommendation feels right. Include a one-line note for each explaining what it would emphasize differently.

If the top score is 3 or below (weak match across the board), flag this explicitly and suggest the speaker describe their talk's "shape" in their own words so you can manually map it to a structure.

## 4. Framework Compatibility Notes

Some frameworks combine well as layers rather than alternatives. Use these pairings when a single framework does not cover the full talk.

### Universal Openers

**In Medias Res** works as an opening gambit for nearly any framework. Start with a dramatic moment (a production incident, a surprising benchmark, a failing test), then transition into your chosen framework's structure to explain how you got there. Particularly effective paired with Story Circle (open at Step 5, rewind to Step 1), Reverse Chronology (open at the end, keep going backward), and Three-Act Structure (open in Act 2, flash back to Act 1).

### Structural Combinations

**Sparkline + Sisyphean Arc.** The Sparkline's "what is / what could be" oscillation maps directly onto the Sisyphean cycle of struggle and reset. Use the Sparkline's rhetorical rhythm to structure each iteration of the Sisyphean loop. Strong for talks about operational work, reliability engineering, or any domain where the fight never ends but the approach keeps improving.

**The Spiral + The Socratic Path.** Each spiral pass can be framed as answering a deeper question. First pass: "What is this?" Second pass: "How does it work?" Third pass: "What are the edge cases?" The Socratic framing gives the audience a reason to revisit familiar ground.

**The Petal + Converging Ideas.** The Petal provides independent examples; Converging Ideas provides the moment where they merge. Use The Petal for the middle section and Converging Ideas for the conclusion.

**Three-Act + The False Start.** Act 1 is the false start (the approach that seems right). The moment it breaks becomes the Act 1/Act 2 boundary. Act 2 is the real exploration. Act 3 is the resolution. Clean and dramatic.

### Tone Layers

**Comedian's Set as tone layer.** The Comedian's Set does not need to be the primary structure. Its setup-punchline rhythm and callback technique can overlay any framework as a comedic delivery style. Apply it to a Three-Act talk for a lighthearted meetup version, or to a Sisyphean Arc to make the recurring pain funny rather than grim. Works best at meetups and internal talks where the speaker has room to be informal.

**Stranger's Report as analytical overlay.** The detached, observational voice of the Stranger's Report can be applied to any framework when the speaker wants to maintain critical distance. Useful for postmortems and code reviews where the speaker should avoid blame and instead present findings with clinical precision.

### Combinations to Avoid

**Nested Loops + The Spiral.** Both involve revisiting material, but for different reasons. Layering them creates confusion about whether the audience is going deeper (Spiral) or resolving an outer story (Nested Loops).

**Reverse Chronology + Kishotenketsu.** Kishotenketsu relies on a twist in the third act. Running it backward removes the surprise. The twist needs to land in sequence.

**Kafkaesque Labyrinth + The Socratic Path.** The Labyrinth's power comes from disorientation. The Socratic Path's power comes from clarity through questions. They work against each other.

## 5. Family Overviews

### Foundational

The workhorses. These four frameworks have been refined across centuries of storytelling and decades of presentation craft. They provide clear, reliable structures that audiences instinctively understand. Reach for a Foundational framework when you want the structure to disappear and the content to dominate, when the audience is large or unfamiliar, or when you are unsure what else to use.

### Existential

Frameworks drawn from existentialist literature that give language to the particular absurdity of working in technology. They treat struggle, alienation, and radical choice not as problems to solve but as conditions to navigate with honesty. Reach for an Existential framework when the talk is about recurring pain that has no clean fix, when the audience shares a specific institutional context, or when you want to validate the difficulty of the work rather than hand-wave it away.

### Absurdist

Where Existential frameworks acknowledge the struggle, Absurdist frameworks laugh at it. These structures find humor, irony, and insight in the contradictions of building software. They work by naming the elephant in the room and refusing to pretend it is not there. Reach for an Absurdist framework when the audience needs catharsis, when the topic involves impossible tradeoffs everyone recognizes, or when you want the talk to be memorable for its honesty and wit.

### Non-linear

Frameworks that break chronological order to serve comprehension. They rearrange time, perspective, or depth to match how the audience actually needs to encounter the material rather than how events happened. Reach for a Non-linear framework when the most interesting part of the story is not at the beginning, when the topic benefits from multiple viewpoints, or when progressive deepening serves the audience better than a single pass.

### Rhetorical

Persuasion engines. These frameworks are designed to move an audience from one position to another through deliberate structural choices. They excel at vision-casting, buy-in, and teaching because they are built around the audience's psychology rather than the speaker's chronology. Reach for a Rhetorical framework when you need the audience to believe something, adopt something, or change their behavior, or when the talk serves a strategic purpose beyond information transfer.
