# Implementation Spec: Talks Monorepo - Phase 4: Claude Skill

**Contract**: ./contract.md
**Estimated Effort**: M

## Technical Approach

Phase 4 creates a repo-based Claude skill that lives inside this repository (not as an external plugin) for creating new talks. The skill combines three capabilities:

1. **Talk scaffolding** — creates a new talk directory with all required files
2. **Narrative structure** — uses the Story Circle framework (adapted from NickNisi's conference-talk-builder) to develop a compelling talk outline
3. **Slide generation** — produces initial Slidev markdown with the repo's custom components and theme
4. **Design guidance** — includes aesthetic direction adapted from the frontend-design philosophy, ensuring slides are visually distinctive

The skill will be invocable via `/new-talk` and will guide the user through talk creation interactively using `AskUserQuestion`.

The skill lives at `.claude/skills/new-talk/` in the repo root — a repo-local skill that's automatically available when working in this project.

## Feedback Strategy

**Inner-loop command**: `cat .claude/skills/new-talk/SKILL.md | head -50`

**Playground**: The skill files themselves — read and verify the skill content is correct and follows Claude skill conventions.

**Why this approach**: Skills are Markdown instruction files, not executable code. Validation is reading the output and testing by invoking the skill in Claude.

## File Changes

### New Files

| File Path | Purpose |
|-----------|---------|
| `.claude/skills/new-talk/SKILL.md` | Main skill instructions |
| `.claude/skills/new-talk/references/story-circle.md` | Story Circle narrative framework adapted for this repo |
| `.claude/skills/new-talk/references/slidev-syntax.md` | Slidev markdown syntax reference with this repo's conventions |
| `.claude/skills/new-talk/references/components.md` | Available shared components with usage examples |
| `.claude/skills/new-talk/references/theme-variants.md` | Theme variant configuration guide |
| `.claude/skills/new-talk/references/design-guide.md` | Aesthetic direction and slide design principles |

### Modified Files

| File Path | Changes |
|-----------|---------|
| `CLAUDE.md` | Add reference to the new-talk skill and repo conventions |

## Implementation Details

### SKILL.md — Main Skill Instructions

**Overview**: The core skill file that orchestrates the talk creation process. It should be a comprehensive guide that Claude follows step-by-step.

The skill must cover these stages:

**Stage 1: Information Gathering**
Use `AskUserQuestion` to collect:
- Talk title and working subtitle
- Target audience (internal team, conference, meetup, etc.)
- Key message / "one thing the audience should remember"
- Talk duration (5min lightning, 20min session, 45min keynote)
- Topic area (support engineering, product, technical deep-dive, etc.)
- Tone (educational, inspirational, demo-heavy, storytelling)
- Whether code examples are needed and in what language(s)

**Stage 2: Narrative Structure**
- Read `references/story-circle.md`
- Map the user's topic to the 8-step Story Circle framework
- Present the outline for review and iteration
- Adjust based on feedback

**Stage 3: Slide Generation**
- Read `references/slidev-syntax.md` and `references/components.md`
- Scaffold the talk directory using `scripts/new-talk.ts`
- Generate `slides.md` with:
  - Proper frontmatter (theme, addon, title, variant config)
  - Cover slide with SpeakerCard component
  - Section headers mapping to Story Circle stages
  - Content slides using appropriate components (CodePlayground, AnimatedList, CodeWalkthrough, TerminalDemo, etc.)
  - Speaker notes for each slide
  - End slide with contact info

**Stage 4: Design Direction**
- Read `references/design-guide.md` and `references/theme-variants.md`
- Suggest a per-talk variant (accent colors, background treatment) based on the talk's topic and tone
- Apply the variant in frontmatter
- Ensure component usage follows design principles (bold choices, not generic)

**Stage 5: Review and Iterate**
- Present the generated slides for feedback
- Make adjustments to content, structure, or design
- Verify the talk runs in the dev server

```markdown
# Skill file structure (conceptual)
---
name: new-talk
description: Scaffold a new talk with Story Circle narrative, Slidev slides, and distinctive design
---

## You are a presentation architect...

[Detailed instructions for each stage]
[References to bundled reference files]
[Examples of good output]
```

**Key decisions**:
- Skill uses `AskUserQuestion` for all interactive steps — never bare text questions
- Story Circle is the default framework but the skill should note when a different structure might work better (e.g., demo-heavy talks may not need all 8 steps)
- Generated slides should be 60-80% complete — enough structure to present from, but room for the user to add personal touches
- The skill should run `scripts/new-talk.ts` to scaffold, then write `slides.md` content

**Implementation steps**:
1. Write SKILL.md with all five stages
2. Include examples of each stage's expected output
3. Add error handling guidance (what if user says "I don't know" to a question)
4. Test skill invocation manually

### Story Circle Reference

**Overview**: Adapted from NickNisi's story-circle.md for this repo's specific context. The adaptation focuses on support engineering, product, and technical talks.

The Story Circle maps to presentation structure:

| Step | Story Circle | Talk Equivalent | Typical Slides |
|------|-------------|----------------|----------------|
| 1 | You (comfort zone) | Introduction — establish context | 1-2 slides |
| 2 | Need (desire) | Problem — why this matters | 2-3 slides |
| 3 | Go (unfamiliar) | Exploration — initial approaches | 2-3 slides |
| 4 | Search (adapt) | Deep dive — what you tried/learned | 3-5 slides |
| 5 | Find (discovery) | Solution — the breakthrough | 2-3 slides |
| 6 | Take (consequence) | Tradeoffs — what it cost / challenges | 2-3 slides |
| 7 | Return (familiar) | Application — how to use this | 2-3 slides |
| 8 | Change (transformed) | Conclusion — key takeaways | 1-2 slides |

**Implementation steps**:
1. Write story-circle.md adapted for this repo's talk topics
2. Include concrete examples for support engineering and product talks
3. Include guidance on when to compress or skip steps
4. Include mapping to slide counts for different talk durations

### Slidev Syntax Reference

**Overview**: Quick reference for Slidev markdown syntax specific to this repo. Covers frontmatter, layouts, directives, and click animations.

Content should include:
- Frontmatter schema (theme, addon, title, variant)
- Slide separation (`---`)
- Layout directive (`layout: cover`, `layout: two-col`, etc.)
- Click animations (`v-click`, `v-after`, `v-click-hide`)
- Speaker notes (HTML comments `<!-- notes -->`)
- Code blocks with line highlighting (`{1-3|5|7-9}`)
- Importing and using components
- Per-slide styling with `<style scoped>`)

**Implementation steps**:
1. Write slidev-syntax.md with all syntax patterns
2. Include copy-pasteable examples for each pattern
3. Organize by frequency of use (most common first)

### Components Reference

**Overview**: Catalog of all shared components from Phase 3 with usage examples. This is the skill's "component palette" for choosing the right component for each slide.

For each component, document:
- Name and purpose (1 sentence)
- Props with types and defaults
- Usage example in slides.md context
- When to use it (what kind of content it's good for)
- PDF export behavior

**Implementation steps**:
1. Write components.md listing all addon components
2. Include code snippets showing usage in slides.md
3. Group by content type (code, text, media, layout)

### Design Guide Reference

**Overview**: Adapted from the frontend-design skill's aesthetic principles, focused specifically on presentation slides. This ensures the skill generates distinctive, non-generic slides.

Key principles:
- **Typography**: Use the brand's display and body fonts intentionally. Headers should feel bold and confident. Body text should be minimal — slides are not documents.
- **Color**: Use the variant accent color boldly. Full-slide accent backgrounds for emphasis slides. Don't be timid with color.
- **Content density**: Less is more. One idea per slide. Code blocks should be focused (10-15 lines max). If you need more, use CodeWalkthrough.
- **Visual rhythm**: Alternate between text-heavy and visual slides. Use section headers as breathing room. Don't stack 5 bullet-point slides in a row.
- **Animation intent**: Every animation should serve a purpose. Use AnimatedList when reveal order matters for comprehension. Don't animate just because you can.
- **Slide count guidance**: Lightning talk (5min) = 10-15 slides. Standard (20min) = 25-35 slides. Keynote (45min) = 50-70 slides.

**Implementation steps**:
1. Write design-guide.md with aesthetic principles
2. Include "do this / not that" examples
3. Include slide count and pacing guidance per talk duration
4. Reference specific components for specific content patterns

### Theme Variants Reference

**Overview**: Guide for configuring per-talk theme variants. Documents the available CSS custom properties, example color schemes, and how to apply them.

**Implementation steps**:
1. Write theme-variants.md documenting the variant system
2. Include 3-4 pre-defined variant presets (warm, cool, dark, vibrant)
3. Show how to create custom variants
4. Include color accessibility guidance (contrast ratios)

## Testing Requirements

### Manual Testing

- [ ] Skill file is discoverable by Claude when working in this repo
- [ ] `/new-talk` invocation triggers the skill
- [ ] Skill asks structured questions via AskUserQuestion
- [ ] Generated talk directory has correct structure
- [ ] Generated slides.md has proper frontmatter
- [ ] Generated slides use Story Circle narrative structure
- [ ] Generated slides reference correct components
- [ ] Generated slides include speaker notes
- [ ] Generated talk runs in dev server without errors
- [ ] All reference files are readable and accurate
- [ ] Design guide produces distinctive (non-generic) aesthetic suggestions

## Validation Commands

```bash
# Verify skill file exists and is valid
cat .claude/skills/new-talk/SKILL.md | head -20

# Verify all reference files exist
ls .claude/skills/new-talk/references/

# Test by invoking in Claude (manual)
# /new-talk

# Verify generated talk works
bun run dev <generated-talk-slug>
```

---

_This spec is ready for implementation. Follow the patterns and validate at each step._
