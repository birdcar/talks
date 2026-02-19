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
variant:
  accent: '#e89d0e'
  accentLight: '#f0b060'
  background: '#1a1a2e'
---
```

**Required fields**: `theme`, `addons`, `title`
**Optional fields**: `layout`, `info`, `author`, `date`, `variant`

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

| Layout | Purpose | Key Features |
|--------|---------|-------------|
| `cover` | Opening slide | Large title, accent line, author/date meta |
| `default` | Standard content | Body text, lists, components |
| `section` | Section divider | Centered title with accent line |
| `two-col` | Side-by-side | Two columns via `::left::` / `::right::` slots |
| `code-focus` | Code-heavy | Maximized code area with syntax highlighting |
| `image-full` | Full-bleed image | Background image via `image` frontmatter |
| `quote` | Quotation | Centered italic text with attribution via `author` |
| `end` | Closing slide | Centered content for sign-off |

### Layout Examples

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

## Click Animations

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

Add scoped styles to individual slides:

```markdown
## Custom Styled Slide

<style scoped>
h2 {
  color: var(--brand-accent);
  font-size: 3rem;
}
</style>
```

## Presenter Mode

- Press `P` to enter presenter mode
- Shows current slide, next slide, speaker notes, and timer
- Navigate with arrow keys or click

## PDF Export

```bash
bun run export <talk-slug>
```

Note: Monaco editor and some animations won't render in PDF. Use static code blocks for PDF-friendly talks.
