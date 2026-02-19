# Implementation Spec: Talks Monorepo - Phase 5: Narrative Framework Library

**Contract**: ./contract.md
**Estimated Effort**: L

## Technical Approach

Phase 5 expands the new-talk skill's narrative capabilities from a single framework (Story Circle) to a comprehensive library of 22 frameworks across 5 families. Each framework gets its own detailed reference file mirroring the depth and structure of the existing `story-circle.md`. A new framework selection guide enables auto-suggestion based on talk parameters.

The existing `story-circle.md` moves into a `frameworks/` subdirectory alongside all new framework references. SKILL.md Stage 2 is rewritten to support framework selection instead of hardcoding Story Circle.

### Framework Families & Members

**Foundational (4)** — Classic structures that work for most talks:

| # | Framework | File | Core Idea |
|---|-----------|------|-----------|
| 1 | Three-Act Structure | `three-act.md` | Setup → Confrontation → Resolution |
| 2 | Freytag's Pyramid | `freytags-pyramid.md` | 5-act dramatic arc with rising/falling action and climax |
| 3 | Story Circle | `story-circle.md` | Dan Harmon's 8-step journey (already exists, moves to subdirectory) |
| 4 | Kishōtenketsu | `kishotenketsu.md` | 4-act without conflict: introduction, development, twist, reconciliation |

**Existential (4)** — Meaning through struggle, awareness, and the human condition:

| # | Framework | File | Core Idea |
|---|-----------|------|-----------|
| 5 | The Sisyphean Arc | `sisyphean-arc.md` | The struggle IS the point; finding meaning in repetition (Camus) |
| 6 | The Kafkaesque Labyrinth | `kafkaesque-labyrinth.md` | Navigating incomprehensible systems; the machinery is the villain (Kafka) |
| 7 | The Existential Awakening | `existential-awakening.md` | A moment of sudden awareness that changes everything (Sartre/Heidegger) |
| 8 | The Stranger's Report | `strangers-report.md` | Detached observation; presenting facts without imposing meaning (Camus) |

**Absurdist (4)** — Embracing the illogical, paradoxical, and meaningless:

| # | Framework | File | Core Idea |
|---|-----------|------|-----------|
| 9 | The Waiting | `the-waiting.md` | Nothing resolves but everything shifts; the waiting IS the content (Beckett) |
| 10 | The Metamorphosis | `the-metamorphosis.md` | Sudden transformation; adapting to the incomprehensible new reality (Kafka) |
| 11 | The Catch-22 | `catch-22.md` | Paradoxes and logical traps that can't be escaped (Heller) |
| 12 | The Comedian's Set | `comedians-set.md` | Setup, misdirection, punchline — absurdist comedy as structure |

**Non-linear (4)** — Breaking chronological and causal expectations:

| # | Framework | File | Core Idea |
|---|-----------|------|-----------|
| 13 | In Medias Res | `in-medias-res.md` | Start in the middle of the action, fill in context as you go |
| 14 | The Spiral | `the-spiral.md` | Revisit the same concept at increasing depth each pass |
| 15 | The Rashomon | `the-rashomon.md` | Same problem/event from multiple contradictory perspectives |
| 16 | Reverse Chronology | `reverse-chronology.md` | Start from the end, work backwards to reveal how we got there |

**Rhetorical (6)** — Presentation-native structures designed for live delivery:

| # | Framework | File | Core Idea |
|---|-----------|------|-----------|
| 17 | The Sparkline | `the-sparkline.md` | Alternating "what is" with "what could be" (Nancy Duarte) |
| 18 | Nested Loops | `nested-loops.md` | Multiple stories opened and closed around a central message |
| 19 | The Petal | `the-petal.md` | Multiple complete stories orbiting a central theme |
| 20 | Converging Ideas | `converging-ideas.md` | Separate threads that come together into one conclusion |
| 21 | The False Start | `the-false-start.md` | Begin one story, interrupt, restart with the real story |
| 22 | The Socratic Path | `socratic-path.md` | Questions that lead the audience to discover the answer |

## File Changes

### New Files

| File Path | Purpose |
|-----------|---------|
| `.claude/skills/new-talk/references/framework-guide.md` | Framework selection guide with decision matrix and auto-suggest logic |
| `.claude/skills/new-talk/references/frameworks/three-act.md` | Three-Act Structure reference |
| `.claude/skills/new-talk/references/frameworks/freytags-pyramid.md` | Freytag's Pyramid reference |
| `.claude/skills/new-talk/references/frameworks/kishotenketsu.md` | Kishōtenketsu reference |
| `.claude/skills/new-talk/references/frameworks/sisyphean-arc.md` | Sisyphean Arc reference |
| `.claude/skills/new-talk/references/frameworks/kafkaesque-labyrinth.md` | Kafkaesque Labyrinth reference |
| `.claude/skills/new-talk/references/frameworks/existential-awakening.md` | Existential Awakening reference |
| `.claude/skills/new-talk/references/frameworks/strangers-report.md` | Stranger's Report reference |
| `.claude/skills/new-talk/references/frameworks/the-waiting.md` | The Waiting reference |
| `.claude/skills/new-talk/references/frameworks/the-metamorphosis.md` | The Metamorphosis reference |
| `.claude/skills/new-talk/references/frameworks/catch-22.md` | Catch-22 reference |
| `.claude/skills/new-talk/references/frameworks/comedians-set.md` | Comedian's Set reference |
| `.claude/skills/new-talk/references/frameworks/in-medias-res.md` | In Medias Res reference |
| `.claude/skills/new-talk/references/frameworks/the-spiral.md` | The Spiral reference |
| `.claude/skills/new-talk/references/frameworks/the-rashomon.md` | The Rashomon reference |
| `.claude/skills/new-talk/references/frameworks/reverse-chronology.md` | Reverse Chronology reference |
| `.claude/skills/new-talk/references/frameworks/the-sparkline.md` | The Sparkline reference |
| `.claude/skills/new-talk/references/frameworks/nested-loops.md` | Nested Loops reference |
| `.claude/skills/new-talk/references/frameworks/the-petal.md` | The Petal reference |
| `.claude/skills/new-talk/references/frameworks/converging-ideas.md` | Converging Ideas reference |
| `.claude/skills/new-talk/references/frameworks/the-false-start.md` | The False Start reference |
| `.claude/skills/new-talk/references/frameworks/socratic-path.md` | Socratic Path reference |

### Modified Files

| File Path | Changes |
|-----------|---------|
| `.claude/skills/new-talk/SKILL.md` | Replace Stage 2 with framework selection and adaptive narrative mapping |
| `.claude/skills/new-talk/references/story-circle.md` | Move to `references/frameworks/story-circle.md` |
| `.claude/skills/new-talk/references/components.md` | Update component suggestions to not assume Story Circle |
| `CLAUDE.md` | Note the expanded framework library |

### Deleted Files

| File Path | Reason |
|-----------|--------|
| `.claude/skills/new-talk/references/story-circle.md` | Moved to `references/frameworks/story-circle.md` |

## Implementation Details

### Component 1: Framework Selection Guide

**File**: `.claude/skills/new-talk/references/framework-guide.md`

This is the decision engine. It maps talk parameters (collected in Stage 1) to framework recommendations.

**Structure:**

1. **Quick reference table** — All 22 frameworks in one table with: name, family, one-line description, best-for tags
2. **Auto-suggest decision matrix** — Given these inputs from Stage 1:
   - `tone` → maps to framework families (storytelling → foundational/non-linear; educational → rhetorical; existential/personal → existential/absurdist)
   - `duration` → filters by complexity (lightning talks → simpler structures; extended → can handle complex non-linear)
   - `audience` → adjusts formality (conference → more structured; meetup → can be experimental)
   - `topic_type` → strong signals (postmortem → Reverse Chronology or Kafkaesque; tooling demo → False Start or Three-Act; philosophical → Existential family)
   - `code_heavy` → deprioritizes frameworks that don't have natural "show code" moments
3. **Suggestion algorithm** (as prose, not code):
   - Score each framework against the input parameters
   - Present top 2 recommendations with reasoning
   - Group remaining frameworks by family for browsing
   - Always include the option "I want something different"
4. **Framework compatibility notes** — Which frameworks combine well (e.g., Sparkline + Sisyphean Arc; In Medias Res as an opener for any framework; Comedian's Set as a tone layer over other structures)
5. **Family overviews** — 2-3 sentence description of each family's personality and when to reach for it

**Implementation steps:**
1. Write the quick reference table with all 22 frameworks
2. Write the decision matrix with parameter-to-framework mappings
3. Write the suggestion algorithm as natural language instructions
4. Write compatibility and combination notes
5. Write family overviews

### Component 2: Framework Reference Files (Template Pattern)

All 21 new framework references (Story Circle already exists) follow the same structure. Each file must include:

**Required sections:**

1. **Title and one-paragraph description** — What this framework is, where it comes from, why it works for talks
2. **The Steps/Acts/Phases** — The framework's structural elements, each with:
   - Step name and purpose
   - "In a talk" example — concrete illustration for a tech talk
   - "Slide approach" — how many slides, what kind
   - "Components" — which repo components fit this step
3. **Duration Mapping** — How to adapt the framework for:
   - Lightning talk (5 min / 10-15 slides)
   - Standard talk (20 min / 25-35 slides)
   - Extended talk (45 min / 50-70 slides)
4. **When to Use This Framework** — Specific signals that suggest this framework (topic types, tones, audiences)
5. **When NOT to Use** — Anti-patterns and bad fits
6. **Example Mapping** — At least one fully worked example mapping a tech topic to this framework (table format like Story Circle's examples)
7. **Combination Notes** — How this framework pairs with others (e.g., "Can open with In Medias Res before transitioning to Sisyphean Arc's main structure")

**Pattern to follow:** `.claude/skills/new-talk/references/frameworks/story-circle.md` (moved from current location)

**Implementation steps — for each framework file:**
1. Write the description and philosophical/literary context
2. Define the structural steps adapted for presentations
3. Write "In a talk" examples for each step (use support engineering, developer tools, or product as topic domains)
4. Map to slide counts and component suggestions
5. Write duration adaptations
6. Write use/don't-use guidance
7. Write at least one worked example
8. Write combination notes

**Framework-specific notes:**

**Foundational family:**
- `three-act.md` — The simplest structure. Good baseline reference. Acts: Setup (world + problem), Confrontation (attempts + obstacles), Resolution (solution + impact).
- `freytags-pyramid.md` — More granular than Three-Act. 5 phases: Exposition, Rising Action, Climax, Falling Action, Denouement. Best for talks with a clear dramatic peak.
- `kishotenketsu.md` — Conflict-free. 4 acts: Ki (introduction), Shō (development), Ten (twist/surprise), Ketsu (reconciliation). Great for exploratory talks where the twist recontextualizes everything. Emphasize that the twist is NOT a conflict — it's a new perspective.

**Existential family:**
- `sisyphean-arc.md` — Structure: Establish the task → Show the repetition → Reveal the futility → Find meaning in the doing. The audience should feel the weight of the boulder AND the satisfaction of pushing it. Tech mapping: debugging the same class of bug, maintaining legacy systems, fighting entropy. The key insight is always "and we keep going, and that's okay."
- `kafkaesque-labyrinth.md` — Structure: Normal entry → System reveals its rules → Rules contradict each other → You're deeper in than before → You adapt (or don't). Tech mapping: enterprise bureaucracy, regulatory compliance, dependency management, cloud provider UIs. The villain is the system itself, never a person.
- `existential-awakening.md` — Structure: Going through the motions → Something breaks the routine → Sudden clarity → Everything is re-evaluated → New way of being. Tech mapping: realizing your architecture is wrong, discovering your metrics measure the wrong thing, the moment you understand the customer's actual problem.
- `strangers-report.md` — Structure: Present observations without interpretation → Let patterns emerge → Audience draws their own conclusions → (Optional) offer your reading last. Tech mapping: data-driven talks, incident analysis where you present the timeline flatly, showing system behavior without editorializing. The power is in what you DON'T say.

**Absurdist family:**
- `the-waiting.md` — Structure: Introduce what we're waiting for → It doesn't come → We fill the time → Something shifts → We're still waiting, but we're different. Tech mapping: waiting for the perfect tool, the feature that never ships, the migration that never completes. Circularity is intentional — acts 1 and 5 mirror each other.
- `the-metamorphosis.md` — Structure: Normal morning → Sudden transformation → Others react → You adapt → New normal (which is absurd). Tech mapping: your codebase overnight after a major dependency update, waking up to find your API deprecated, the day the AI tools arrived. The audience should feel the disorientation AND the pragmatic adaptation.
- `catch-22.md` — Structure: Present the goal → Show the rule that enables it → Show the rule that prevents it → They're the same rule → Explore the paradox → (Maybe) find a lateral escape. Tech mapping: security vs. usability, consistency vs. availability, the meeting about reducing meetings.
- `comedians-set.md` — Structure: Setup (establish expectation) → Build (reinforce the pattern) → Misdirect (subtle turn) → Punchline (subvert expectation) → Tag (callback that deepens the joke). Can be applied at slide level (each slide is a bit) or talk level (the whole talk is one long setup for a reveal). Tech mapping: any talk where humor and surprise are core to the message.

**Non-linear family:**
- `in-medias-res.md` — Structure: Drop into the middle of the action → Build curiosity ("how did we get here?") → Flash back to setup → Catch up to the opening moment → Continue to resolution. Tech mapping: start with the production incident, the failing test, the customer complaint — then rewind.
- `the-spiral.md` — Structure: Introduce concept simply → Return with more depth → Return with nuance → Return with full complexity → The simple version was right all along (or wasn't). Tech mapping: explaining a concept like "eventual consistency" at 4 levels of depth; each pass adds a layer.
- `the-rashomon.md` — Structure: Present Event A from Perspective 1 → Same event from Perspective 2 → Same event from Perspective 3 → Reconcile (or don't). Tech mapping: the bug that's a feature, the outage from ops/dev/customer/business perspectives, the PR that 3 reviewers see completely differently.
- `reverse-chronology.md` — Structure: Start with the outcome → "How did we get here?" → Peel back each layer → Arrive at the root → The origin recontextualizes the outcome. Tech mapping: start with the successful launch, then show each failure that preceded it; start with the clean architecture, then show the mess it replaced.

**Rhetorical family:**
- `the-sparkline.md` — Structure: Alternate between "what is" (current reality) and "what could be" (ideal future) throughout the talk. The gap between them creates tension. End by showing the path from is to could-be. Based on Nancy Duarte's analysis of great speeches (MLK, Steve Jobs).
- `nested-loops.md` — Structure: Open Story A → Open Story B → Open Story C (core message) → Close Story C → Close Story B → Close Story A. The innermost story carries the key message; outer stories provide context and emotional framing.
- `the-petal.md` — Structure: Central theme → Story 1 (returns to center) → Story 2 (returns to center) → Story 3 (returns to center) → Synthesis. Each petal is a complete mini-narrative. Unlike Nested Loops, petals don't need to open/close in order.
- `converging-ideas.md` — Structure: Thread 1 (independent) → Thread 2 (independent) → Thread 3 (independent) → Convergence point → "These seemingly separate things are actually one thing." Tech mapping: showing how 3 different teams independently arrived at the same architectural decision.
- `the-false-start.md` — Structure: Begin telling a conventional story → Interrupt yourself → "Actually, that's not what happened" → Tell the real story. The contrast between the expected and real narrative IS the message. Tech mapping: "We thought the problem was X... [record scratch] ...it was actually Y."
- `socratic-path.md` — Structure: Pose question → Explore answer → That raises a new question → Explore → Deeper question → Arrive at insight the audience discovered "themselves." Never state the conclusion first. Tech mapping: debugging narratives, architecture decision records, "why did we choose X?"

### Component 3: Update SKILL.md Stage 2

**File**: `.claude/skills/new-talk/SKILL.md`

Replace the current Stage 2 ("Narrative Structure") entirely. The new Stage 2 should:

**Step 2A: Select Framework**
- Read `references/framework-guide.md`
- Using the parameters gathered in Stage 1 (tone, duration, audience, topic, code-heaviness), follow the auto-suggest algorithm
- Present 2 recommended frameworks with reasoning using `AskUserQuestion`
- Include options: the 2 recommendations + "Show me all frameworks" + "I already know which one I want"
- If user picks "Show me all", present the full quick-reference table grouped by family
- If user picks "I already know", ask which one

**Step 2B: Map Narrative**
- Read `references/frameworks/<selected-framework>.md`
- Map the user's topic to the selected framework's structural steps
- Present the mapping as a numbered outline with: step name, content description, estimated slide count, component suggestions

**Step 2C: Review and Adjust**
- Present the narrative mapping for feedback via `AskUserQuestion`
- Options: "Looks good, generate slides", "Adjust structure", "Try a different framework", "Combine with another framework"
- If "Try a different framework": return to Step 2A
- If "Combine": ask which second framework and how to layer them (Step 2B handles this using combination notes from both framework references)

**Also update other Stage references:**
- Stage 3's slide generation should reference the selected framework (not hardcoded Story Circle section headers)
- Remove any hardcoded "Story Circle stages" language from Stages 3-5

### Component 4: Move story-circle.md and Update Cross-References

**Steps:**
1. Move `.claude/skills/new-talk/references/story-circle.md` → `.claude/skills/new-talk/references/frameworks/story-circle.md`
2. Update `references/components.md` — replace any Story Circle-specific references with generic framework language (e.g., "narrative section transitions" instead of "Story Circle stages")
3. Update `references/design-guide.md` — replace "Story Circle stages" with "narrative framework sections" in the Visual Rhythm section
4. Update `CLAUDE.md` — note the expanded framework library in the Skills section

## Testing Requirements

### Manual Testing

- [ ] SKILL.md Stage 2 no longer hardcodes Story Circle
- [ ] Framework selection guide has complete decision matrix
- [ ] All 22 framework files exist in `references/frameworks/`
- [ ] Each framework file has all required sections (steps, duration mapping, when to use, examples)
- [ ] Story Circle reference still exists at new path
- [ ] Components.md has no Story Circle-specific language
- [ ] Design guide has no Story Circle-specific language
- [ ] CLAUDE.md reflects the expanded framework library
- [ ] No broken cross-references between files

## Validation Commands

```bash
# Verify all framework files exist (should be 22)
ls .claude/skills/new-talk/references/frameworks/ | wc -l

# Verify framework guide exists
cat .claude/skills/new-talk/references/framework-guide.md | head -20

# Verify Story Circle moved (old path should not exist)
test ! -f .claude/skills/new-talk/references/story-circle.md && echo "OK: old path removed"

# Verify SKILL.md was updated
grep -c "framework-guide" .claude/skills/new-talk/SKILL.md

# Verify no hardcoded Story Circle in SKILL.md stages
grep -c "Story Circle" .claude/skills/new-talk/SKILL.md
# Should be 0 or only in the framework list, not in stage instructions
```

## Acceptance Criteria

- [ ] 22 framework reference files, each with consistent structure matching story-circle.md depth
- [ ] Framework selection guide with auto-suggest decision matrix
- [ ] SKILL.md Stage 2 replaced with framework-aware selection and mapping
- [ ] All cross-references updated (no orphaned Story Circle references)
- [ ] Each framework includes at least one worked tech talk example
- [ ] Existential and absurdist frameworks (8 total) have rich philosophical context adapted for presentations
- [ ] Framework combination guidance exists for compatible pairings

---

_This spec is ready for implementation. Follow the patterns and validate at each step._
