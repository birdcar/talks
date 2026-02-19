# Slidev Syntax Reference

Quick reference for Slidev markdown syntax as used in this repo.

## Frontmatter

The first slide's frontmatter configures the entire deck:

```yaml
---
layout: cover
theme: slidev-theme-birdcar
addons:
  - slidev-addon-birdcar
title: My Talk Title
info: A subtitle or description
author: birdcar
date: 2026-01-15
transition: fade
variant:
  accent: '#e89d0e'
  accentLight: '#f0b060'
  background: '#1a1a2e'
---
```

**Required fields**: `theme`, `addons`, `title`
**Optional fields**: `layout`, `info`, `author`, `date`, `transition`, `variant`

Default slide transition is `fade`.

## Slide Separation

Slides are separated by `---` on its own line:

```markdown
---

## Slide One

Content here.

---

## Slide Two

More content.
```

## Layouts

Set a slide's layout with frontmatter between separators:

```markdown
---
layout: section
---

# Section Title
```

### Available Layouts

| Layout | Purpose | Slots | Frontmatter Attrs | Key Styles |
|--------|---------|-------|--------------------|------------|
| `cover` | Opening slide | `default` | `author`, `date` | h1: 4rem/600, accent-line, meta in mono/uppercase/tracking-wide (`--font-mono`), separator uses `--accent` |
| `default` | Standard content | `default` | — | Flexbox column with `gap: var(--content-gap)`, padded with `--slide-padding` |
| `section` | Section divider | `default` | — | Full-height accent bar (4px, `--accent`) on left edge, h1/h2: 3rem/600 |
| `two-col` | Side-by-side | `default`, `left`, `right` | — | Header slot above, 1fr/1fr grid with `gap: var(--space-5)`, columns use `gap: var(--content-gap)` |
| `code-focus` | Code-heavy | `default` | — | Vertically centered, h2/h3: 1.3rem/500 in `--text-secondary`, code at 1rem/1.8 line-height |
| `image-full` | Full-bleed image | `default` | `image` | Background image via `image` prop, gradient overlay (transparent 40% to black 75%), white text with shadow |
| `quote` | Quotation | `default` | `author` | Centered, quote text: 2rem/500 italic in `--font-display`, curly-quote accent, attribution: mono/uppercase/tracking (`--text-muted`) |
| `end` | Closing slide | `default` | — | h1/h2: 2.5rem/600, paragraph text: mono/uppercase/tracking-wide, links use `--accent` |

### Layout Details

**cover** (`cover.vue`)
- Classes: `.cover-layout`, `.accent-line`, `.cover-content`, `.cover-meta`, `.meta-sep`
- h1 styling: `font-size: 4rem; font-weight: 600; letter-spacing: -0.03em; line-height: 1.05`
- Paragraph: `font-size: 1.3rem; color: var(--text-secondary)`
- Meta bar: `font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted)`, positioned at bottom-left
- Meta separator (`/`): `color: var(--accent)`

**default** (`default.vue`)
- Classes: `.default-layout`
- Flexbox column with `gap: var(--content-gap)` for automatic spacing between child elements
- Padded with `var(--slide-padding)`, full height, `background: var(--slide-bg)`

**section** (`section.vue`)
- Classes: `.section-layout`, `.section-content`
- Vertically centered content
- `::before` pseudo-element: 4px-wide full-height accent bar on left using `background: var(--accent)`
- Content left-padded 20px past slide padding to clear the accent bar
- h1/h2: `font-size: 3rem; font-weight: 600; letter-spacing: -0.02em`
- Paragraph: `font-size: 1.2rem; color: var(--text-secondary)`

**two-col** (`two-col.vue`)
- Classes: `.two-col-layout`, `.two-col-header`, `.two-col-grid`, `.col`
- Default slot renders above columns as a header (with bottom margin `--space-4`)
- Grid: `grid-template-columns: 1fr 1fr; gap: var(--space-5)`
- Each `.col`: flexbox column with `gap: var(--content-gap)`

**code-focus** (`code-focus.vue`)
- Classes: `.code-focus-layout`
- Vertically centered, custom padding: `var(--space-5) var(--space-6)`
- h2/h3: `font-size: 1.3rem; font-weight: 500; color: var(--text-secondary)`
- Code blocks (`.slidev-code`): `font-size: 1rem; line-height: 1.8`

**image-full** (`image-full.vue`)
- Classes: `.image-full-layout`, `.image-overlay`, `.image-content`
- Props: `image` (string URL) — applied as `background-image` with `background-size: cover; background-position: center`
- Overlay: `linear-gradient(transparent 40%, rgba(0, 0, 0, 0.75) 100%)`, content aligned to bottom
- Text forced to white: headings get `text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5)`, paragraphs at `rgba(255, 255, 255, 0.85)`

**quote** (`quote.vue`)
- Classes: `.quote-layout`, `.quote-content`, `.quote-attribution`
- Centered both axes, `text-align: center`, padded `var(--space-7)`
- Quote text: `font-family: var(--font-display); font-size: 2rem; font-weight: 500; font-style: italic`
- Decorative open-quote (`\201C`) via `::before`: `color: var(--accent); font-size: 3rem`
- Attribution: `font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em`

**end** (`end.vue`)
- Classes: `.end-layout`, `.accent-line`, `.end-content`
- Vertically centered, left-aligned
- h1/h2: `font-size: 2.5rem; font-weight: 600`
- Paragraph: `font-family: var(--font-mono); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-secondary)`
- Links: `color: var(--accent)`

### Layout Examples

**Cover:**
```markdown
---
layout: cover
author: birdcar
date: 2026-02-19
---

# Talk Title

A subtitle or brief description
```

**Two-column:**
```markdown
---
layout: two-col
---

## Comparison

::left::

**Before**
- Old approach
- Manual process

::right::

**After**
- New approach
- Automated
```

**Quote:**
```markdown
---
layout: quote
author: Grace Hopper
---

The most dangerous phrase in the language is "we've always done it this way."
```

**Image full-bleed:**
```markdown
---
layout: image-full
image: https://example.com/photo.jpg
---

## Caption over image
```

**Code focus:**
```markdown
---
layout: code-focus
---

### Function Name

\`\`\`typescript {all|1-3|5-8|all}
interface Config {
  name: string
  version: string
}

function loadConfig(path: string): Config {
  const raw = readFileSync(path, 'utf-8')
  return JSON.parse(raw)
}
\`\`\`
```

**Section divider:**
```markdown
---
layout: section
---

# Part Two

The second act begins
```

**End slide:**
```markdown
---
layout: end
---

# Thank You

nick@example.com

[github.com/birdcar](https://github.com/birdcar)
```

## Click Animations

Elements use `v-click` to appear incrementally. The theme applies custom animation defaults:

```css
.slidev-vclick-target {
  transition: opacity 0.35s ease, transform 0.35s ease, filter 0.35s ease;
}
.slidev-vclick-hidden {
  opacity: 0;
  transform: translateY(8px);
  filter: blur(2px);
}
```

Hidden elements fade in, slide up 8px, and unblur on reveal.

### v-click

Elements appear on click:

```markdown
<div v-click>This appears on first click</div>
<div v-click>This appears on second click</div>
```

### v-click with ranges

```markdown
<div v-click="1">Appears on click 1</div>
<div v-click="3">Appears on click 3</div>
```

### v-click-hide

```markdown
<div v-click-hide>This disappears on click</div>
```

### v-after

Appears simultaneously with the previous `v-click`:

```markdown
<div v-click>Appears on click</div>
<div v-after>Also appears on same click</div>
```

## Code Blocks

### Basic

````markdown
```typescript
const x = 1
```
````

### Line Highlighting

Highlight specific lines, with click-through steps separated by `|`:

````markdown
```typescript {1-3|5|7-9}
// Lines 1-3 highlighted first
interface User {
  name: string
}
// Line 5 highlighted on click
const user: User = { name: 'Nick' }
// Lines 7-9 highlighted on next click
function greet(u: User) {
  return `Hello, ${u.name}`
}
```
````

### With Filename

````markdown
```typescript {*} {filename: 'config.ts'}
export const config = { debug: true }
```
````

## Speaker Notes

Add notes visible only in presenter mode using HTML comments:

```markdown
## My Slide

Content visible to audience.

<!--
These are speaker notes.
Only visible in presenter mode (press P).
Can be multiple lines.
-->
```

## Using Components

Components from `slidev-addon-birdcar` are auto-imported. Use them directly in markdown:

```markdown
## My Slide

<AnimatedList :items="['First', 'Second', 'Third']" />
```

### Props with Arrays/Objects

Use Vue's `:prop` binding syntax for non-string values:

```markdown
<TerminalDemo :steps="[
  { cmd: 'npm install', output: 'added 42 packages' },
  { cmd: 'npm test', output: 'All tests passed' },
]" />
```

**Important**: Keep inline prop values on few lines. For complex data, avoid newlines inside string values (they cause parse errors).

### Slot Content

Some components use slots for rich content:

```markdown
<Callout type="tip" title="Pro tip">
  This content goes in the default slot.
  **Markdown works here.**
</Callout>
```

## Per-Slide Styling

Add scoped styles to individual slides. Use the theme's CSS custom properties:

```markdown
## Custom Styled Slide

<style scoped>
h2 {
  color: var(--accent);
  font-size: 3rem;
}
</style>
```

Available tokens: `--accent`, `--accent-alt`, `--text-primary`, `--text-secondary`, `--text-muted`, `--slide-bg`, `--slide-bg-alt`, `--slide-bg-raised`, `--border`, `--font-display` (Clash Display), `--font-body` (Satoshi), `--font-mono` (JetBrains Mono), `--content-gap`, `--slide-padding`, `--space-1` through `--space-7`, and the full `--ctp-*` Catppuccin Mocha palette.

## Presenter Mode

- Press `P` to enter presenter mode
- Shows current slide, next slide, speaker notes, and timer
- Navigate with arrow keys or click

## PDF Export

```bash
bun run export <talk-slug>
```

Note: Monaco editor and some animations won't render in PDF. Use static code blocks for PDF-friendly talks.
