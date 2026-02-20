# Component Reference

All components are provided by `slidev-addon-birdcar` and auto-imported into every talk.

The theme uses [Catppuccin Mocha](https://catppuccin.com/) color tokens. CSS variables like `--accent`, `--ctp-blue`, `--ctp-sapphire`, etc. are available globally. Components that accept a `color` prop use Catppuccin accent names (e.g., `sapphire`, `mauve`, `peach`).

---

## Typography & Annotation

### Highlight

Inline colored text using Catppuccin accent colors. Applies bold weight.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | `'sapphire'` | Catppuccin color name or any CSS color value |

**Available color names:** `rosewater`, `flamingo`, `pink`, `mauve`, `red`, `maroon`, `peach`, `yellow`, `green`, `teal`, `sky`, `sapphire`, `blue`, `lavender`

**Usage:**
```markdown
This is <Highlight>default sapphire</Highlight> text.

This is <Highlight color="mauve">mauve</Highlight> and <Highlight color="peach">peach</Highlight> text.

You can also pass raw CSS: <Highlight color="var(--accent)">accent color</Highlight>.
```

**When to use**: Emphasizing key terms or phrases inline. Better than bold when you want color differentiation between multiple highlighted terms.

**PDF**: Renders fully.

### RoughMark

Hand-drawn annotation using [rough-notation](https://roughnotation.com/) via Slidev's `v-mark` directive. Supports click-triggered animation.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'underline' \| 'circle' \| 'highlight' \| 'strike-through' \| 'crossed-off' \| 'bracket' \| 'box'` | `'underline'` | Annotation style |
| `color` | `string` | `'sapphire'` | Catppuccin color name or hex value |
| `at` | `number \| string` | — | Slidev click index to trigger the annotation |

**Available color names:** Same as Highlight (`rosewater`, `flamingo`, `pink`, `mauve`, `red`, `maroon`, `peach`, `yellow`, `green`, `teal`, `sky`, `sapphire`, `blue`, `lavender`). Internally maps to hex values for rough-notation compatibility.

**Usage:**
```markdown
<RoughMark type="underline" color="mauve">Important concept</RoughMark>

<RoughMark type="circle" color="red">Critical</RoughMark>

<!-- Triggered on click 2 -->
<RoughMark type="highlight" color="yellow" :at="2">Revealed later</RoughMark>

<RoughMark type="box" color="green">Boxed term</RoughMark>
```

**When to use**: Drawing attention to specific words or phrases with a hand-drawn feel. Use `at` to reveal annotations sequentially during a presentation. Prefer `underline` or `highlight` for emphasis; `circle` and `box` for calling out single terms.

**PDF**: Annotations render statically (no animation).

---

## Code

### CodePlayground

Styled code container with filename header. Wraps a code block for enhanced presentation.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lang` | `string` | `'typescript'` | Language label shown in header |
| `editable` | `boolean` | `true` | Whether code appears editable (visual only) |
| `runnable` | `boolean` | `false` | Whether to show run indicator |
| `height` | `string` | `'auto'` | Container height |
| `filename` | `string` | — | Filename shown in header bar (header only renders when provided) |

**Usage:**
```markdown
<CodePlayground lang="typescript" filename="greet.ts">

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`
}
```

</CodePlayground>
```

**When to use**: Code examples where the filename context matters. Gives a polished "editor" feel with a `--ctp-crust` background.

**PDF**: Renders as styled code block. Works well.

### CodeWalkthrough

Step-through code with highlighted lines and side notes. Advances with Slidev click events.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lang` | `string` | `'typescript'` | Language identifier |
| `steps` | `Array<{ lines: string; note?: string }>` | `[]` | Highlight steps with line ranges and notes |
| `showLineNumbers` | `boolean` | `true` | Show line numbers |

Each step's `lines` supports comma-separated ranges: `'1-3'`, `'5'`, `'1-3, 7-9'`.

**Usage:**
```markdown
<CodeWalkthrough :steps="[
  { lines: '1-3', note: 'Define the interface' },
  { lines: '5-7', note: 'Implement the handler' },
  { lines: '9', note: 'Export for use' },
]">

```typescript
interface Handler {
  name: string
  exec: () => void
}

function createHandler(name: string): Handler {
  return { name, exec: () => console.log(name) }
}

export { createHandler }
```

</CodeWalkthrough>
```

**When to use**: Explaining code step by step. Better than static highlighting when you need to walk through logic. The highlighted line gets a left border in `--accent` color with a 15% background tint.

**PDF**: Shows all lines highlighted. Notes panel visible but steps don't advance.

---

## List & Text

### AnimatedList

List items that appear one at a time on click, with animation.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `string[]` | — | List items (alternative to slot) |
| `animation` | `'fade-up' \| 'slide-right' \| 'fade' \| 'scale-in' \| 'none'` | `'fade-up'` | Animation style |
| `stagger` | `number` | `0` | Stagger delay between items (ms) |

**Slots:** Default slot accepts markdown list items (rendered as `<li>` elements with `v-click`).

**Usage (props):**
```markdown
<AnimatedList :items="['First point', 'Second point', 'Third point']" animation="fade-up" />
```

**Usage (slots):**
```markdown
<AnimatedList animation="slide-right">

- First point with **markdown**
- Second point with `code`
- Third point

</AnimatedList>
```

**When to use**: Sequential points where reveal order helps comprehension. Each item gets a left border in `--accent`. Don't use for simple lists that should all be visible.

**PDF**: All items visible (no animation).

### KeyPoints

Numbered list with accent-colored circular markers. Good for summaries and takeaways.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `points` | `string[]` | *required* | List of key points |
| `title` | `string` | `'Key Takeaways'` | Section title |

**Usage:**
```markdown
<KeyPoints :points="[
  'First key insight',
  'Second key insight',
  'Third key insight',
]" title="What We Learned" />
```

**When to use**: Summary slides, conclusions, "key takeaways" sections. Title renders at 1.3rem in `--accent`. The 32px numbered markers use `--accent` background with `--ctp-crust` text. Point text renders at 1.2rem. Renders inside a raised card with border.

**PDF**: Renders fully. Good for print.

### Callout

Highlighted message box with type-based styling using Catppuccin colors.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'info' \| 'warning' \| 'tip' \| 'danger'` | `'info'` | Visual variant |
| `title` | `string` | — | Optional title |

**Type color mapping:**
| Type | Color | Icon |
|------|-------|------|
| `info` | `--ctp-blue` | `i` |
| `warning` | `--ctp-yellow` | `!` |
| `tip` | `--ctp-green` | `*` |
| `danger` | `--ctp-red` | `x` |

**Usage:**
```markdown
<Callout type="tip" title="Pro tip">
  Always test your exports before presenting!
</Callout>

<Callout type="warning" title="Heads up">
  Monaco editor won't render in PDF exports.
</Callout>

<Callout type="danger" title="Breaking change">
  This removes backward compatibility.
</Callout>
```

**When to use**: Drawing attention to important caveats, tips, or warnings. Each type gets an 8% tinted background, colored left border, and 32px circular icon badge. Title renders at 1.2rem, content at 1.15rem. Use sparingly -- more than 2 per slide dilutes impact.

**PDF**: Renders fully with colors.

### QuoteBlock

Inline quote with attribution. For quotes within content slides (not full-slide quotes).

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `author` | `string` | — | Quote attribution |
| `source` | `string` | — | Source or year |

**Usage:**
```markdown
<QuoteBlock author="Alan Kay" source="1971">
  The best way to predict the future is to invent it.
</QuoteBlock>
```

**When to use**: Quotes within a content slide alongside other elements. Gets a left border in `--accent` with italic text at 1.4rem. Footer text at 0.95rem in mono/uppercase. Author name rendered in `--accent` color. For full-slide quotes, use `layout: quote` instead.

**PDF**: Renders fully.

---

## Demo

### TerminalDemo

Simulated terminal with commands that appear one at a time on click.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `Array<{ cmd: string; output?: string }>` | `[]` | Terminal commands and outputs |
| `speed` | `number` | `30` | Typing speed (visual only) |
| `prompt` | `string` | `'$ '` | Prompt character |
| `title` | `string` | `'Terminal'` | Window title in chrome bar |

**Usage:**
```markdown
<TerminalDemo :steps="[
  { cmd: 'bun run new-talk my-talk', output: 'Created new talk: talks/my-talk' },
  { cmd: 'bun run dev my-talk', output: 'Listening on http://localhost:3030' },
]" title="Getting Started" />
```

**When to use**: CLI demos, installation instructions, showing command output. Each step appears on click. Terminal chrome has Catppuccin-colored dots (`--ctp-red`, `--ctp-yellow`, `--ctp-green`). Prompt character uses `--accent`.

**Important**: Don't use newline characters (`\n`) in output strings -- they cause Vue template parse errors. Use separate steps for multi-line output.

**PDF**: All steps visible.

---

## Identity

### SpeakerCard

Speaker introduction card with avatar, name, handle, title, company, and social links. Horizontal layout with card centered on slide.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | *required* | Speaker name (1.75rem, weight 700) |
| `handle` | `string` | — | Display handle (e.g., `@birdcar`), rendered in mono/muted |
| `title` | `string` | — | Job title |
| `company` | `string` | — | Company name (rendered in `--accent`) |
| `avatar` | `string` | — | Avatar image URL (112px circle) |
| `links` | `Record<string, string>` | — | Social links (`github`, `bluesky`, `linkedin`, `website`) |

**Usage:**
```markdown
<SpeakerCard
  name="Nick Cannariato"
  handle="@birdcar"
  title="Senior Support Engineer"
  company="WorkOS"
  avatar="https://github.com/birdcar.png"
  :links="{ github: 'birdcar', bluesky: 'birdcar.bsky.social' }"
/>
```

**When to use**: Cover slide or introduction slide. One per talk, typically on the first or second slide. Shows initials in an `--accent`-colored circle if no avatar URL is provided. Links auto-generate full URLs from handles. Card is max-width 600px, centered via `margin: 0 auto`, with horizontal flex layout (avatar left, info right).

**PDF**: Renders fully.

---

## Layout

### SectionHeader

Section divider with optional icon and accent line. Used within the `section` layout for additional structure.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string` | — | Emoji or character icon (rendered in `--accent`) |

**Slots:** Default slot for heading and description text.

**Usage:**
```markdown
---
layout: section
---

<SectionHeader icon="🔍">

# Deep Dive

Exploring the implementation details.

</SectionHeader>
```

**When to use**: Section transitions. The `section` layout already provides basic section styling; use `SectionHeader` when you want the icon and a 48px accent-colored line below the content.

**PDF**: Renders fully.

### TwoColumn

Programmatic two-column grid layout with adjustable ratio. Alternative to the `two-col` layout.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ratio` | `number` | `0.5` | Left column width as fraction (0-1). Uses CSS `grid-template-columns: {ratio}fr {1-ratio}fr` |

**Slots:** `#left` and `#right` named slots.

**Usage:**
```markdown
<TwoColumn :ratio="0.6">
  <template #left>

**Code Example**
```typescript
const x = 1
```

  </template>
  <template #right>

**Explanation**
The variable is initialized to 1.

  </template>
</TwoColumn>
```

**When to use**: When you need a custom column ratio (e.g., 60/40 for code + explanation). For even splits, prefer `layout: two-col`.

**PDF**: Renders fully.

---

## Decoration

### GeometricAccents

SVG decorative elements rendered per-layout. **Auto-rendered by `global-top.vue` in the theme -- you do not use this component directly.**

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layout` | `string` | `'default'` | Current slide layout (set automatically) |
| `disabled` | `boolean` | `false` | Disable accents (set automatically) |
| `width` | `number` | `980` | SVG viewport width |
| `height` | `number` | `552` | SVG viewport height |

**Layout-specific decorations:**
| Layout | Elements |
|--------|----------|
| `cover` / `end` | Corner brackets (TL + BR), large ring (BR), dot grid (TR quadrant) |
| `default` | Small corner bracket (TR) |
| `section` | Circle cluster (left margin) |
| `quote` | Large unfilled ring (centered) |
| `two-col` | Center divider line with diamond |
| `code-focus` | None (disabled) |

**Disabling per slide**: Set `geometry: false` in slide frontmatter:
```markdown
---
layout: default
geometry: false
---
```

**When to use**: You don't -- it's automatic. Fades in with a 0.6s delay. Uses `--accent`, `--accent-alt`, `--ctp-overlay0`, and `--border` tokens. All elements use low opacity (0.08-0.4) for subtlety.
