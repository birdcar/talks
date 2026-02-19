# Slide Design Guide

Principles for creating distinctive, non-generic presentations with the birdcar theme.

## Core Philosophy

**Slides are not documents.** They support your spoken words. If someone can understand your talk just by reading the slides, you have too much text on them.

**Bold choices over safe ones.** Generic slides are forgettable. A distinctive color palette, intentional typography, and confident whitespace make your talk memorable.

## Typography

### Display Font (Space Grotesk)

Use for slide titles, section headers, and any text you want to feel bold and structural.

- H1: 2.8rem, weight 700 — cover slides and major section titles
- H2: 2rem, weight 600 — content slide titles
- H3: 1.5rem, weight 600 — sub-sections

### Body Font (DM Sans)

Use for body text, bullet points, and explanatory content.

- Keep body text at the default 1.1rem
- Don't go below 0.9rem — if text needs to be smaller, you have too much of it

### Code Font (JetBrains Mono)

Used automatically in code blocks, terminal demos, and inline code.

- Code blocks should be 0.85-0.9rem
- Keep code to 10-15 lines max per slide
- Use CodeWalkthrough for longer code that needs step-by-step explanation

### Typography Rules

**Do:**
- Use large, confident headings
- Leave lots of space between text elements
- Use the display font for emphasis (it draws the eye)

**Don't:**
- Stack paragraphs of body text
- Use more than 2 font sizes on a single slide
- Put full sentences in bullet points

## Color

### Using the Accent Color

The accent color is the strongest visual tool in the theme. Use it intentionally:

**Bold usage (do this):**
- Full-width accent line on section breaks
- Accent-colored markers in KeyPoints and AnimatedList
- Code highlighting borders in CodeWalkthrough
- Terminal prompt color in TerminalDemo

**Timid usage (don't do this):**
- Accent on a tiny icon nobody can see
- Muted accent that barely differs from the background
- Using accent everywhere so nothing stands out

### Color Rhythm

Alternate between slides that lean on the accent color and slides that are more neutral:

```
[Cover: accent line]
[Content: mostly neutral text]
[Content: accent in component borders]
[Section break: prominent accent]
[Content: code-heavy, neutral]
[Quote: accent on quotation mark]
```

## Content Density

### One Idea Per Slide

This is the single most important rule. If you find yourself saying "also" on the same slide, split it.

**Do:**
```markdown
## The Problem

Support tickets lack context.

<!--
Explain: 60% of escalations require back-and-forth
just to understand the customer's environment.
-->
```

**Don't:**
```markdown
## Problems

- Support tickets lack context
- Runbooks are outdated
- On-call rotation is unclear
- Monitoring alerts are noisy
- Deployment process is manual
```

(That's 5 ideas. Make 5 slides, or use AnimatedList if they build a single narrative.)

### Code Density

- **10-15 lines** max for static code blocks
- Use `CodeWalkthrough` for anything longer
- Highlight only the relevant lines — grayed-out context is fine
- One function per slide, not an entire module

### Text Density

- **3-5 bullet points** max per slide (prefer AnimatedList for progressive reveal)
- **1-2 sentences** of body text max
- If you need more words, put them in speaker notes

## Visual Rhythm

### Slide Pacing

Vary the visual weight of consecutive slides:

```
Heavy → Light → Heavy → Light → Breathing room
```

| Slide Type | Visual Weight | Examples |
|------------|--------------|---------|
| Heavy | Text + component | AnimatedList, KeyPoints, CodePlayground |
| Light | Single statement | One heading, one quote, one image |
| Breathing room | Section break | `layout: section`, `layout: quote` |

### The Rule of Three

Never stack more than 3 text-heavy slides in a row. After 3, insert:
- A section header
- A full-slide quote
- A demo or code slide
- A visual break

### Section Transitions

Use `layout: section` slides as breathing room between Story Circle stages. They give the audience a moment to process and signal a shift in topic.

## Component Selection

### Match Content to Component

| You want to show... | Use this |
|---------------------|----------|
| Points that build on each other | `AnimatedList` |
| A code file with context | `CodePlayground` |
| Code you'll walk through line by line | `CodeWalkthrough` |
| CLI commands and output | `TerminalDemo` |
| An important caveat or tip | `Callout` |
| A memorable quote (within content) | `QuoteBlock` |
| A memorable quote (full slide) | `layout: quote` |
| Side-by-side comparison | `layout: two-col` or `TwoColumn` |
| Summary takeaways | `KeyPoints` |
| Self-introduction | `SpeakerCard` |

### When NOT to Use Components

- Simple text that doesn't need structure — just use markdown
- One-line statements — a bare `## Heading` or `> quote` is fine
- When the component would make a simple thing look complex

## Animation Intent

Every animation should serve comprehension, not decoration.

**Good animation reasons:**
- Revealing list items one at a time because the order matters for understanding
- Highlighting code lines in sequence to walk through logic
- Showing terminal commands one step at a time to simulate a live demo

**Bad animation reasons:**
- Animating bullet points just because you can
- Fading in text that could all appear at once
- Adding transitions to seem more polished (it often seems slower)

## Slide Count Guide

| Duration | Slides | Pace |
|----------|--------|------|
| Lightning (5 min) | 10-15 | ~20-30 sec per slide |
| Standard (20 min) | 25-35 | ~35-50 sec per slide |
| Extended (45 min) | 50-70 | ~40-55 sec per slide |

These include section breaks and transition slides. Actual content slides are roughly 70% of the total.

### Pacing Tips

- **Lightning talks**: No time for preamble. Start with the problem, show the solution, end with the takeaway.
- **Standard talks**: You have room for one good demo and 2-3 code examples. Don't try to cover everything — pick your best material.
- **Extended talks**: You can go deep. Add audience interaction, multiple demos, and a proper Q&A break. But the danger is losing energy — keep the visual rhythm tight.

## Do This / Not That

| Do This | Not That |
|---------|----------|
| One idea per slide | Five bullet points crammed together |
| 10-line code blocks with highlights | 50-line files dumped on screen |
| AnimatedList for sequential reveals | Static lists with no hierarchy |
| Section breaks between topics | 8 content slides in a row |
| Speaker notes with talking points | Reading the slide text aloud |
| Bold accent color on key moments | Accent color on everything |
| Whitespace as a design element | Filling every pixel with content |
| CodeWalkthrough for complex code | Trying to explain 30 lines at once |
| `layout: quote` for key insights | Tiny italic text in a corner |
