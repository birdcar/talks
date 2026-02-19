# Component Reference

All components are provided by `slidev-addon-birdcar` and auto-imported into every talk.

## Code Components

### CodePlayground

Styled code container with filename header. Wraps a code block for enhanced presentation.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lang` | `string` | `'typescript'` | Language label shown in header |
| `editable` | `boolean` | `true` | Whether code appears editable (visual only) |
| `runnable` | `boolean` | `false` | Whether to show run indicator |
| `height` | `string` | `'auto'` | Container height |
| `filename` | `string` | — | Filename shown in header bar |

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

**When to use**: Code examples where the filename context matters. Gives a polished "editor" feel.

**PDF**: Renders as styled code block. Works well.

### CodeWalkthrough

Step-through code with highlighted lines and side notes. Advances with Slidev clicks.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lang` | `string` | `'typescript'` | Language identifier |
| `steps` | `Array<{ lines: string; note?: string }>` | `[]` | Highlight steps with line ranges and notes |
| `showLineNumbers` | `boolean` | `true` | Show line numbers |

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

**When to use**: Explaining code step by step. Better than static highlighting when you need to walk through logic.

**PDF**: Shows all lines highlighted. Notes panel visible but steps don't advance.

## List & Text Components

### AnimatedList

List items that appear one at a time on click, with animation.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `string[]` | — | List items (alternative to slot) |
| `animation` | `'fade-up' \| 'slide-right' \| 'fade' \| 'none'` | `'fade-up'` | Animation style |
| `stagger` | `number` | `0` | Stagger delay between items |

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

**When to use**: Sequential points where reveal order helps comprehension. Don't use for simple lists that should all be visible.

**PDF**: All items visible (no animation).

### KeyPoints

Numbered list with accent markers. Good for summaries and takeaways.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `points` | `string[]` | — | List of key points (required) |
| `title` | `string` | `'Key Takeaways'` | Section title |

**Usage:**
```markdown
<KeyPoints :points="[
  'First key insight',
  'Second key insight',
  'Third key insight',
]" title="What We Learned" />
```

**When to use**: Summary slides, conclusions, "key takeaways" sections. The numbered markers give weight to each point.

**PDF**: Renders fully. Good for print.

### Callout

Highlighted message box with type-based styling.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'info' \| 'warning' \| 'tip' \| 'danger'` | `'info'` | Visual variant |
| `title` | `string` | — | Optional title |

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

**When to use**: Drawing attention to important caveats, tips, or warnings. Use sparingly — more than 2 per slide dilutes impact.

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

**When to use**: Quotes within a content slide alongside other elements. For full-slide quotes, use `layout: quote` instead.

**PDF**: Renders fully.

## Demo Components

### TerminalDemo

Simulated terminal with commands that appear on click.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `Array<{ cmd: string; output?: string }>` | `[]` | Terminal commands and outputs |
| `speed` | `number` | `30` | Typing speed (visual only) |
| `prompt` | `string` | `'$ '` | Prompt character |
| `title` | `string` | `'Terminal'` | Window title |

**Usage:**
```markdown
<TerminalDemo :steps="[
  { cmd: 'bun run new-talk my-talk', output: 'Created new talk: talks/my-talk' },
  { cmd: 'bun run dev my-talk', output: 'Listening on http://localhost:3030' },
]" title="Getting Started" />
```

**When to use**: CLI demos, installation instructions, showing command output. Each step appears on click.

**Important**: Don't use newline characters (`\n`) in output strings — they cause Vue template parse errors. Use separate steps for multi-line output.

**PDF**: All steps visible.

## Identity Components

### SpeakerCard

Speaker introduction card with name, title, company, and social links.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Speaker name (required) |
| `title` | `string` | — | Job title |
| `company` | `string` | — | Company name |
| `avatar` | `string` | — | Avatar image URL |
| `links` | `Record<string, string>` | — | Social links (github, twitter, linkedin, website) |

**Usage:**
```markdown
<SpeakerCard
  name="Nick Bird"
  title="Senior Support Engineer"
  company="WorkOS"
  :links="{ github: 'birdcar', twitter: 'birdcar' }"
/>
```

**When to use**: Cover slide or introduction slide. One per talk, typically on the first or second slide.

**PDF**: Renders fully. Shows initials if no avatar URL.

## Layout Components

### SectionHeader

Section divider with optional icon and accent line. Used within the `section` layout for additional structure.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string` | — | Emoji or character icon |

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

**When to use**: Section transitions. The `section` layout already provides basic section styling; use `SectionHeader` when you want the icon and accent line.

**PDF**: Renders fully.

### TwoColumn

Programmatic two-column layout with adjustable ratio. Alternative to the `two-col` layout.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ratio` | `number` | `0.5` | Left column width as fraction (0-1) |

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
