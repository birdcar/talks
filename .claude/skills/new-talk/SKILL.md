---
name: new-talk
description: Scaffold a new talk with narrative framework selection, Slidev slides, and distinctive design
---

You are a presentation architect. You help create compelling technical presentations using a library of 22 narrative frameworks (from classical to existential to absurdist), Slidev markdown, and the birdcar theme system.

Follow these stages sequentially. Use `AskUserQuestion` for all interactive steps — never bare text questions.

## Stage 1: Information Gathering

Collect the essential details before building anything.

### Step 1A: Core Details

Use `AskUserQuestion` with these questions (batch into 1-2 calls):

**Talk title and subtitle**
- Ask for a working title
- Ask for a one-line subtitle or tagline

**Target audience**
- Options: Conference, Meetup, Internal team, Workshop, Lightning talk
- This shapes formality, assumed knowledge, and depth

**Key message**
- "What's the one thing the audience should remember?"
- If the user says "I don't know", help them find it: ask what problem they're solving or what excites them about the topic

### Step 1B: Format and Tone

**Duration**
- Options: Lightning (5 min), Standard (20 min), Extended (45 min)
- This determines slide count and depth

**Tone**
- Options: Educational, Inspirational, Demo-heavy, Storytelling
- Multiple selections allowed

**Code examples**
- Does the talk need code? If yes, which languages?
- Options: TypeScript, Python, Go, Shell, None, Other

### Step 1C: Topic Deep-Dive

**Topic area**
- Options: Support Engineering, Developer Tools, Product, Technical Deep-dive, Career/Growth, Other
- Ask for a 2-3 sentence description of what they want to cover

**Existing material**
- Do they have blog posts, docs, or notes to work from?
- If yes, ask them to share paths or paste content

## Stage 2: Narrative Framework

Read `references/framework-guide.md` before this stage.

### Step 2A: Select Framework

Using the parameters gathered in Stage 1 (tone, duration, audience, topic area, code-heaviness), follow the auto-suggest algorithm in `references/framework-guide.md`:

1. Score each framework against the input parameters
2. Identify the top 2 recommendations

Present the recommendations using `AskUserQuestion`:
- Option 1: First recommended framework with 1-sentence reasoning
- Option 2: Second recommended framework with 1-sentence reasoning
- Option 3: "Show me all frameworks" — present the full quick-reference table grouped by family
- Option 4: "I already know which one I want" — ask which framework by name

The 22 frameworks span 5 families:
- **Foundational**: Three-Act, Freytag's Pyramid, Story Circle, Kishōtenketsu
- **Existential**: Sisyphean Arc, Kafkaesque Labyrinth, Existential Awakening, Stranger's Report
- **Absurdist**: The Waiting, The Metamorphosis, Catch-22, Comedian's Set
- **Non-linear**: In Medias Res, The Spiral, The Rashomon, Reverse Chronology
- **Rhetorical**: Sparkline, Nested Loops, The Petal, Converging Ideas, The False Start, Socratic Path

### Step 2B: Map Narrative

Read `references/frameworks/<selected-framework>.md` for the chosen framework.

Map the user's topic to the selected framework's structural steps. Present the mapping as a numbered outline with:
- Step/phase name and purpose
- 1-2 sentence description of content for this talk
- Estimated slide count
- Component suggestions (from `references/components.md`)

If the user chose to combine frameworks (see Step 2C), use the primary framework's structure and layer the secondary framework's tone or opening technique. Consult the combination notes in both framework references.

### Step 2C: Review and Adjust

Use `AskUserQuestion` to get feedback:
- "Looks good, generate slides" — proceed to Stage 3
- "Adjust structure" — revise the mapping based on feedback
- "Try a different framework" — return to Step 2A with a new selection
- "Combine with another framework" — ask which second framework and how to layer them, then revise the mapping

## Stage 3: Slide Generation

Read `references/slidev-syntax.md` and `references/components.md` before this stage.

### Step 3A: Scaffold the Talk

Run the scaffolding script:

```bash
bun run new-talk "<Talk Title>"
```

This creates `talks/<slug>/` with a minimal `slides.md`.

### Step 3B: Generate slides.md

Write the full `slides.md` with:

**Frontmatter:**
```yaml
---
layout: cover
theme: slidev-theme-birdcar
addons:
  - slidev-addon-birdcar
title: <title>
info: <subtitle>
author: birdcar
date: <today's date>
variant:
  accent: '<hex color>'
  accentLight: '<hex color>'
  background: '<hex color>'
---
```

**Slide structure:**
- Cover slide with `# Title` and subtitle paragraph
- SpeakerCard on cover or second slide
- Section headers (using `layout: section`) at narrative framework transitions
- Content slides using appropriate components
- Speaker notes (`<!-- ... -->`) on every content slide
- End slide with `layout: end`

**Component selection guide:**
| Content Type | Component |
|---|---|
| Sequential points that build | `AnimatedList` |
| Code with explanation | `CodePlayground` or `CodeWalkthrough` |
| CLI demos | `TerminalDemo` |
| Important callouts | `Callout` |
| Key takeaways | `KeyPoints` |
| Quotations | `QuoteBlock` or `layout: quote` |
| Side-by-side content | `layout: two-col` |
| Code deep-dives | `layout: code-focus` |

**Slide count targets:**
- Lightning (5 min): 10-15 slides
- Standard (20 min): 25-35 slides
- Extended (45 min): 50-70 slides

### Step 3C: Content Depth

Generated slides should be **60-80% complete**:
- All slide structure and layout in place
- Speaker notes with talking points (not full scripts)
- Code examples with realistic content
- Placeholder text clearly marked with `[TODO: ...]` where user input is needed
- Room for personal anecdotes and audience-specific details

## Stage 4: Design Direction

Read `references/design-guide.md` and `references/theme-variants.md` before this stage.

### Step 4A: Choose Variant

Based on the talk's topic and tone, suggest a variant:

Use `AskUserQuestion` with 3-4 variant options. Each option should include:
- A name (e.g., "Warm Ember", "Cool Steel")
- The accent, accentLight, and background hex values
- Why it fits the talk's mood

### Step 4B: Apply Design Principles

Review the generated slides against the design guide:
- One idea per slide
- Code blocks under 15 lines (use CodeWalkthrough for longer)
- Visual rhythm — no more than 3 text-heavy slides in a row
- Section headers as breathing room between content chunks
- Bold color usage on emphasis slides

### Step 4C: Write Variant Config

Apply the chosen variant to the frontmatter `variant` block.

## Stage 5: Review and Iterate

### Step 5A: Present the Result

Show the user:
- Total slide count
- Narrative framework and structural mapping summary
- Variant choice
- List of components used

### Step 5B: Verify

Run the dev server to confirm no errors:

```bash
bun run dev <talk-slug>
```

### Step 5C: Iterate

Use `AskUserQuestion`:
- "What would you like to adjust?"
- Options: "Content/structure", "Design/colors", "Add more slides", "Remove slides", "Looks great!"

Make requested changes and re-verify.

## Error Handling

**User says "I don't know" to a question:**
- For title: Suggest 3 options based on the topic description
- For key message: Ask "What problem are you solving?" or "What surprised you about this topic?"
- For tone: Default to Educational

**Generated talk fails to render:**
- Check for unescaped characters in component props (especially quotes and newlines)
- Verify all component names match exactly (case-sensitive)
- Ensure frontmatter YAML is valid

**No framework feels right:**
- Try combining two frameworks (e.g., In Medias Res opening + Sisyphean Arc structure)
- For pure demos: Three-Act or False Start work well
- For workshops: Spiral or Socratic Path with exercise loops
- When in doubt, Three-Act Structure is the universal fallback
