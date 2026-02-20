# Slide Design Guide

Principles for creating distinctive, non-generic presentations with the birdcar theme.

## Core Philosophy

**Slides are not documents.** They support your spoken words. If someone can understand your talk just by reading the slides, you have too much text on them.

**Text-heavy with colorful typography.** The aesthetic leans into bold, colorful type rather than imagery. Catppuccin palette colors applied through `Highlight` and `RoughMark` make text itself the visual element. Geometric shapes and hand-drawn Rough Notation annotations provide accent and texture without requiring images or illustrations.

**Catppuccin color harmony.** Every color in the palette is designed to work together. Use the full range of `--ctp-*` variables through Highlight and RoughMark to create visual variety while maintaining a cohesive feel.

## Color

### Catppuccin Mocha Palette

The theme is built on [Catppuccin Mocha](https://catppuccin.com/). All palette colors are available as CSS custom properties.

**Semantic tokens** (use these for consistent theming):

| Token | Maps to | Hex | Purpose |
|-------|---------|-----|---------|
| `--slide-bg` | `--ctp-base` | `#1e1e2e` | Default slide background |
| `--slide-bg-alt` | `--ctp-mantle` | `#181825` | Alternate/darker background |
| `--slide-bg-raised` | `--ctp-surface0` | `#313244` | Raised surfaces, inline code bg |
| `--text-primary` | `--ctp-text` | `#cdd6f4` | Primary text color |
| `--text-secondary` | `--ctp-subtext0` | `#a6adc8` | Secondary/supporting text |
| `--text-muted` | `--ctp-overlay1` | `#7f849c` | Muted text, line numbers |
| `--accent` | `--ctp-sapphire` | `#74c7ec` | Primary accent (links, markers, highlights) |
| `--accent-alt` | `--ctp-peach` | `#fab387` | Secondary accent |
| `--border` | `--ctp-surface1` | `#45475a` | Borders and dividers |

**Full `--ctp-*` variables** (available for Highlight, RoughMark, and custom styles):

| Variable | Hex | Category |
|----------|-----|----------|
| `--ctp-rosewater` | `#f5e0dc` | Warm accent |
| `--ctp-flamingo` | `#f2cdcd` | Warm accent |
| `--ctp-pink` | `#f5c2e7` | Warm accent |
| `--ctp-mauve` | `#cba6f7` | Cool accent |
| `--ctp-red` | `#f38ba8` | Status / warm |
| `--ctp-maroon` | `#eba0ac` | Status / warm |
| `--ctp-peach` | `#fab387` | Warm accent (accent-alt) |
| `--ctp-yellow` | `#f9e2af` | Warm accent |
| `--ctp-green` | `#a6e3a1` | Status / cool |
| `--ctp-teal` | `#94e2d5` | Cool accent |
| `--ctp-sky` | `#89dceb` | Cool accent |
| `--ctp-sapphire` | `#74c7ec` | Cool accent (default accent) |
| `--ctp-blue` | `#89b4fa` | Cool accent |
| `--ctp-lavender` | `#b4befe` | Cool accent |
| `--ctp-text` | `#cdd6f4` | Text |
| `--ctp-subtext1` | `#bac2de` | Text |
| `--ctp-subtext0` | `#a6adc8` | Text |
| `--ctp-overlay2` | `#9399b2` | Surface |
| `--ctp-overlay1` | `#7f849c` | Surface |
| `--ctp-overlay0` | `#6c7086` | Surface |
| `--ctp-surface2` | `#585b70` | Surface |
| `--ctp-surface1` | `#45475a` | Surface |
| `--ctp-surface0` | `#313244` | Surface |
| `--ctp-base` | `#1e1e2e` | Background |
| `--ctp-mantle` | `#181825` | Background |
| `--ctp-crust` | `#11111b` | Background |

### Per-Talk Variants

Talks can override the Catppuccin flavor and accent color via frontmatter:

```yaml
variant:
  flavor: frappe   # mocha (default), macchiato, frappe, latte
  accent: mauve    # any ctp color name
```

The variant system injects `--ctp-*` overrides on `:root`, so all semantic tokens cascade automatically.

### Using the Accent Color

The accent color is the strongest visual tool in the theme. Use it intentionally:

**Bold usage (do this):**
- Full-width accent line on section breaks
- Accent-colored markers in KeyPoints and AnimatedList
- Code highlighting borders in CodeWalkthrough
- Terminal prompt color in TerminalDemo
- `Highlight` component for colorful keywords in headings

**Timid usage (don't do this):**
- Accent on a tiny icon nobody can see
- Muted accent that barely differs from the background
- Using accent everywhere so nothing stands out

### Color Rhythm

Alternate between slides that lean on the accent color and slides that are more neutral:

```
[Cover: accent line + geometric accents]
[Content: mostly neutral text with one Highlight word]
[Content: accent in component borders]
[Section break: prominent accent bar + circle cluster]
[Content: code-heavy, neutral]
[Quote: accent quotation mark + background ring]
```

## Typography

### Display Font (Clash Display)

Use for slide titles, section headers, and any text you want to feel bold and structural. Loaded in weights 500, 600, and 700.

- **H1**: 3.2rem, weight 600, tracking -0.02em -- content slide titles
- **H1 (cover)**: 4rem, weight 600, tracking -0.03em -- cover slide title
- **H1/H2 (section)**: 3rem, weight 600, tracking -0.02em -- section breaks
- **H2**: 2.4rem, weight 500, tracking -0.01em -- content slide subtitles (consistent across default, two-col, and other layouts)
- **H3**: 1.8rem, weight 500 -- sub-sections
- **Quote text**: 2.4rem, weight 500, italic -- quote layout

### Body Font (Satoshi)

Use for body text, bullet points, and explanatory content. Loaded in weights 400, 500, and 700 (plus 400 italic).

- Body: 1.4rem, weight 400, line-height 1.65
- Don't go below 0.9rem -- if text needs to be smaller, you have too much of it

### Code Font (JetBrains Mono)

Used in code blocks, terminal demos, inline code, and meta text (attribution, dates).

- Code blocks: 0.85rem, line-height 1.7, background `--ctp-crust`
- Inline code: 0.85em, background `--slide-bg-raised`, colored `--accent`
- Meta text (cover attribution): 0.9rem, uppercase, tracking 0.08em
- End slide contact: 1.1rem, mono, tracking 0.04em
- Keep code to 10-15 lines max per slide
- Use CodeWalkthrough for longer code that needs step-by-step explanation

### Typography Rules

**Do:**
- Use large, confident headings in Clash Display
- Use `Highlight` to make individual words pop with Catppuccin colors
- Use `RoughMark` for hand-drawn underlines, circles, and annotations
- Leave lots of space between text elements

**Don't:**
- Stack paragraphs of body text
- Use more than 2 font sizes on a single slide
- Put full sentences in bullet points

## Spacing

The theme uses an 8px base grid:

| Token | Value |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 16px |
| `--space-4` | 24px |
| `--space-5` | 32px |
| `--space-6` | 48px |
| `--space-7` | 64px |
| `--slide-padding` | 48px (space-6) |
| `--content-gap` | 24px (space-4) |

## Animations

### v-click Defaults

All `v-click` elements use a unified transition:

- **Hidden state**: `opacity: 0`, `translateY(8px)`, `blur(2px)`
- **Transition**: `0.35s ease` on opacity, transform, and filter
- **Effect**: Elements rise into place with a subtle blur clear -- feels physical without being distracting

### Geometric Accents Fade-In

The `GeometricAccents` component fades in with a `0.6s` delay after the slide appears:

- Container: `opacity 0 -> 1` over `0.8s ease`, delayed `0.6s`
- Large ring (cover/end): Additional `scale(0.8) -> scale(1)` animation at the same timing
- This delay lets the main content settle before decorations appear

### Animation Intent

Every animation should serve comprehension, not decoration.

**Good animation reasons:**
- Revealing list items one at a time because the order matters for understanding
- Highlighting code lines in sequence to walk through logic
- Showing terminal commands one step at a time to simulate a live demo

**Bad animation reasons:**
- Animating bullet points just because you can
- Fading in text that could all appear at once
- Adding transitions to seem more polished (it often seems slower)

## Geometric Decorations

The `GeometricAccents` component renders SVG shapes automatically based on the layout. These provide subtle structural texture without competing with content.

### Per-Layout Behavior

| Layout | Decorations | Description |
|--------|------------|-------------|
| `cover` | Corner brackets (TL + BR), large ring (BR), dot grid (TR quadrant) | Full decorative treatment; brackets frame the slide, ring and dots add depth |
| `end` | Corner brackets (TL + BR), large ring (BR), dot grid (TR quadrant) | Same as cover -- bookend symmetry |
| `section` | Circle cluster (left margin) | Three small circles near the left accent bar, accent + accent-alt colors |
| `quote` | Large unfilled ring (centered) | Single ring at 30% of slide size, 8% opacity -- very subtle background texture |
| `two-col` | Center divider line with diamond | Vertical line between columns with a rotated 8px diamond at the midpoint |
| `default` | Small corner bracket (TR) | Minimal treatment -- one small bracket at 25% opacity |
| `code-focus` | None | Disabled entirely to avoid competing with code |

### Style Details

- All geometric elements use `pointer-events: none` and sit at `z-index: 0`
- Corner brackets use `--ctp-overlay0` stroke at 25-35% opacity
- Rings and dots use `--accent` color at low opacity (8-20%)
- The circle cluster on `section` mixes `--accent` and `--accent-alt`
- Pass `disabled` prop to suppress decorations on any slide

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
| A keyword in a different Catppuccin color | `Highlight` |
| Hand-drawn underline, circle, or box on text | `RoughMark` |
| Automatic layout-aware decorative shapes | `GeometricAccents` |

### Highlight

Applies a Catppuccin color and bold weight to inline text. Accepts any `--ctp-*` color name.

```markdown
## Why <Highlight color="peach">observability</Highlight> matters
```

Use to make headings and key terms visually distinctive. Pairs well with `RoughMark` for layered emphasis.

### RoughMark

Hand-drawn annotation powered by Slidev's `v-mark` directive (Rough Notation). Supports Catppuccin color names.

```markdown
<RoughMark type="underline" color="mauve" :at="1">important concept</RoughMark>
```

Available types: `underline`, `circle`, `highlight`, `strike-through`, `crossed-off`, `bracket`, `box`.

Use `at` to tie the annotation to a specific `v-click` step. The hand-drawn style contrasts with the clean geometric aesthetic for intentional emphasis.

### GeometricAccents

Renders automatically in layouts. You rarely need to use this directly -- it's included in the theme's `global-bottom.vue`. Document its behavior so slides are designed with awareness of what appears in each layout.

### When NOT to Use Components

- Simple text that doesn't need structure -- just use markdown
- One-line statements -- a bare `## Heading` or `> quote` is fine
- When the component would make a simple thing look complex
- Don't layer Highlight + RoughMark + bold on the same word -- pick one emphasis technique

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
- Highlight only the relevant lines -- grayed-out context is fine
- One function per slide, not an entire module

### Text Density

- **3-5 bullet points** max per slide (prefer AnimatedList for progressive reveal)
- **1-2 sentences** of body text max
- If you need more words, put them in speaker notes

## Visual Rhythm

### Slide Pacing

Vary the visual weight of consecutive slides:

```
Heavy -> Light -> Heavy -> Light -> Breathing room
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

Use `layout: section` slides as breathing room between narrative framework stages. They give the audience a moment to process and signal a shift in topic. The left accent bar and circle cluster decoration reinforce the structural break.

## Slide Count Guide

| Duration | Slides | Pace |
|----------|--------|------|
| Lightning (5 min) | 10-15 | ~20-30 sec per slide |
| Standard (20 min) | 25-35 | ~35-50 sec per slide |
| Extended (45 min) | 50-70 | ~40-55 sec per slide |

These include section breaks and transition slides. Actual content slides are roughly 70% of the total.

### Pacing Tips

- **Lightning talks**: No time for preamble. Start with the problem, show the solution, end with the takeaway.
- **Standard talks**: You have room for one good demo and 2-3 code examples. Don't try to cover everything -- pick your best material.
- **Extended talks**: You can go deep. Add audience interaction, multiple demos, and a proper Q&A break. But the danger is losing energy -- keep the visual rhythm tight.

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
| `Highlight` for colorful keywords | Plain white text for everything |
| `RoughMark` for one key annotation | Hand-drawn marks on every word |
| Geometric accents as subtle texture | Custom SVG decorations competing with content |
