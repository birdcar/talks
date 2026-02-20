# Implementation Spec: Talks Monorepo - Phase 3: Shared Component Library

**Contract**: ./contract.md
**Estimated Effort**: M

## Technical Approach

Phase 3 builds the shared component addon (`slidev-addon-birdcar`) that provides reusable Vue components for all presentations. These components handle common slide patterns: code playgrounds, animated lists, section headers with visual flair, two-column comparisons, speaker cards, and quote blocks.

The addon lives in `packages/components/` as a Slidev addon package. Components are Vue 3 SFCs with TypeScript and use the brand's CSS custom properties from the theme (Phase 2). Slidev auto-discovers components in the addon's `components/` directory — no explicit registration needed.

Key design principle: components should be usable directly in Markdown with minimal configuration. A code playground should be `<CodePlayground lang="typescript" />` not a 20-line config block. Sensible defaults, obvious overrides.

## Feedback Strategy

**Inner-loop command**: `cd talks/example && bunx slidev --port 3030`

**Playground**: Dev server — add slides using each component to the example talk and iterate visually.

**Why this approach**: Components are visual by nature. The dev server with hot reload on Vue SFCs provides instant feedback on component rendering, props, slots, and animations.

## File Changes

### New Files

| File Path | Purpose |
|-----------|---------|
| `packages/components/components/CodePlayground.vue` | Editable code block with live preview using Monaco |
| `packages/components/components/AnimatedList.vue` | List items that animate in sequentially with v-click |
| `packages/components/components/SectionHeader.vue` | Branded section header with optional icon/emoji |
| `packages/components/components/TwoColumn.vue` | Flexible two-column layout with configurable ratio |
| `packages/components/components/SpeakerCard.vue` | Speaker/author info card with avatar, name, title, links |
| `packages/components/components/QuoteBlock.vue` | Styled blockquote with attribution and optional source |
| `packages/components/components/CodeWalkthrough.vue` | Step-through code with highlighted lines per click |
| `packages/components/components/TerminalDemo.vue` | Animated terminal/CLI demo with typed commands |
| `packages/components/components/Callout.vue` | Info/warning/tip callout box |
| `packages/components/components/KeyPoints.vue` | Key takeaways summary with icons |

### Modified Files

| File Path | Changes |
|-----------|---------|
| `packages/components/package.json` | Add dependencies (if needed for Monaco integration) |
| `talks/example/slides.md` | Add demo slides showcasing each component |

### Deleted Files

| File Path | Reason |
|-----------|--------|
| `packages/components/components/Placeholder.vue` | Replaced by real components |

## Implementation Details

### CodePlayground Component

**Overview**: An editable code block powered by Monaco editor (Slidev's built-in) with optional live output. For presentations about code, this is the hero component.

```vue
<!-- Usage in slides.md -->
<CodePlayground lang="typescript" :editable="true" :runnable="false">
const greet = (name: string) => `Hello, ${name}!`
console.log(greet('World'))
</CodePlayground>
```

Props:
- `lang` (string): Language for syntax highlighting (default: 'typescript')
- `editable` (boolean): Allow audience/presenter to edit (default: true)
- `runnable` (boolean): Show run button with eval output (default: false)
- `height` (string): Container height (default: 'auto')
- `filename` (string): Optional filename label

**Key decisions**:
- Uses Slidev's built-in Monaco integration, not a separate Monaco instance
- `runnable` mode uses a sandboxed eval for JS/TS — safety is presenter's responsibility
- Falls back to static code block in PDF export

**Implementation steps**:
1. Create component with Monaco editor integration
2. Add prop-driven configuration
3. Add filename label bar styling
4. Handle PDF export fallback (static code block)
5. Test with TypeScript, Python, and bash examples

**Feedback loop**:
- **Playground**: Dev server with a CodePlayground slide
- **Experiment**: Type in the editor, change language, toggle editable/runnable, resize, test PDF export
- **Check command**: `cd talks/example && bunx slidev --port 3030`

### AnimatedList Component

**Overview**: A list where items appear one-by-one on click, with configurable animation direction and style.

```vue
<!-- Usage in slides.md -->
<AnimatedList :items="['First point', 'Second point', 'Third point']" animation="fade-up" />

<!-- Or with slot content for rich items -->
<AnimatedList animation="slide-right">
  <li>First point with <strong>bold</strong></li>
  <li>Second point with `code`</li>
</AnimatedList>
```

Props:
- `items` (string[]): Simple text items (alternative to slots)
- `animation` ('fade-up' | 'slide-right' | 'fade' | 'none'): Animation style (default: 'fade-up')
- `stagger` (number): Delay between items in ms (default: 0, uses v-click)

**Implementation steps**:
1. Create component using Slidev's `v-click` directive for sequencing
2. Add CSS animations for each animation style
3. Support both `items` prop and slot-based content
4. Test with 3, 5, and 10 items

**Feedback loop**:
- **Playground**: Dev server, click through animated list
- **Experiment**: Test each animation style, test with long text items, test with 10+ items
- **Check command**: `cd talks/example && bunx slidev --port 3030`

### CodeWalkthrough Component

**Overview**: A code block where different lines highlight on each click, with optional annotation text per step. Perfect for explaining code line-by-line.

```vue
<!-- Usage in slides.md -->
<CodeWalkthrough lang="typescript" :steps="[
  { lines: '1-3', note: 'Import dependencies' },
  { lines: '5-8', note: 'Define the handler' },
  { lines: '10-12', note: 'Handle the error case' },
]">
import { serve } from 'bun'
import { handleRequest } from './handler'
import { logger } from './logger'

const server = serve({
  port: 3000,
  fetch: handleRequest,
})

if (!server) {
  logger.error('Failed to start server')
  process.exit(1)
}
</CodeWalkthrough>
```

Props:
- `lang` (string): Language for highlighting
- `steps` (Array<{lines: string, note?: string}>): Highlight steps
- `showLineNumbers` (boolean): Show line numbers (default: true)

**Key decisions**:
- Uses Shiki for syntax highlighting (consistent with theme)
- Line highlighting uses CSS background color on targeted lines
- Steps integrate with Slidev's click system

**Implementation steps**:
1. Create component with Shiki code rendering
2. Add click-based step progression
3. Add line highlighting CSS transitions
4. Add annotation note panel (appears alongside code)
5. Test with multi-step walkthroughs

### TerminalDemo Component

**Overview**: A fake terminal that "types" commands and shows output, simulating a CLI demo without actually running commands.

```vue
<!-- Usage in slides.md -->
<TerminalDemo :steps="[
  { cmd: 'bun create slidev my-talk', output: '✓ Project created' },
  { cmd: 'cd my-talk && bun run dev', output: '  Slidev v53.0.0\n  Listening on http://localhost:3030' },
]" />
```

Props:
- `steps` (Array<{cmd: string, output?: string}>): Commands and their output
- `speed` (number): Typing speed in ms per character (default: 30)
- `prompt` (string): Shell prompt string (default: '$ ')
- `title` (string): Terminal window title (default: 'Terminal')

**Implementation steps**:
1. Create terminal chrome (window bar, title, dark bg)
2. Add typing animation for command text
3. Show output after typing completes
4. Integrate with Slidev clicks (each step = one click)
5. Style with monospace font from brand

### SpeakerCard Component

**Overview**: A compact card showing speaker info — avatar, name, title, company, and social links. Used on cover slides or introduction slides.

```vue
<SpeakerCard
  name="Nick Cannariato"
  title="Solutions Engineer"
  avatar="https://github.com/birdcar.png"
  :links="{ github: 'birdcar' }"
/>
```

Props:
- `name` (string): Speaker name
- `title` (string): Job title
- `company` (string): Company name
- `avatar` (string): Path to avatar image
- `links` (Record<string, string>): Social links (github, bluesky, linkedin, website)

**Implementation steps**:
1. Create card layout with avatar, text, and link icons
2. Add brand styling
3. Handle missing avatar gracefully (initials fallback)
4. Test with various link combinations

### Callout Component

**Overview**: An info/warning/tip box for calling out important points.

```vue
<Callout type="tip" title="Pro tip">
  Always test your exports before presenting!
</Callout>
```

Props:
- `type` ('info' | 'warning' | 'tip' | 'danger'): Visual style (default: 'info')
- `title` (string): Optional header text

**Implementation steps**:
1. Create box layout with icon, title, and content slot
2. Define color variants per type using brand accent colors
3. Add subtle left-border or icon treatment
4. Test each type variant

### Remaining Components

**SectionHeader**, **TwoColumn**, **QuoteBlock**, and **KeyPoints** follow similar patterns:
- Vue SFC with typed props
- Brand CSS custom properties for styling
- Slot-based content where appropriate
- Sensible defaults

**Implementation steps** (for each):
1. Create component Vue SFC
2. Add brand styling
3. Add to example talk slides
4. Verify in dev server

## Testing Requirements

### Manual Testing

- [ ] CodePlayground renders and is editable in the browser
- [ ] CodePlayground falls back gracefully in PDF export
- [ ] AnimatedList items appear on click with chosen animation
- [ ] AnimatedList handles 3, 5, and 10+ items
- [ ] CodeWalkthrough highlights correct lines per step
- [ ] CodeWalkthrough annotation notes appear alongside code
- [ ] TerminalDemo types commands with realistic speed
- [ ] TerminalDemo shows output after each command
- [ ] SpeakerCard renders with full and partial info
- [ ] Callout renders all four type variants
- [ ] SectionHeader, TwoColumn, QuoteBlock, KeyPoints render correctly
- [ ] All components use brand CSS custom properties (work with variants)
- [ ] All components render in PDF export (static fallback where needed)
- [ ] Components are auto-discovered by Slidev (no manual imports needed)

## Error Handling

| Error Scenario | Handling Strategy |
|---------------|-------------------|
| Monaco not available (PDF export) | Render as static `<pre>` code block |
| Missing avatar image | Show initials-based fallback |
| Empty slot content | Show placeholder or hide component gracefully |
| Invalid `lang` prop | Fall back to plain text highlighting |

## Validation Commands

```bash
# Dev server for visual testing
cd talks/example && bunx slidev --port 3030

# Build to verify components compile
bun run build example

# PDF export to verify fallbacks
bun run export example

# Full site build
bun run build:site
```

---

_This spec is ready for implementation. Follow the patterns and validate at each step._
