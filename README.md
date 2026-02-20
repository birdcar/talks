# talks

A monorepo for my conference talks, built on [Slidev](https://sli.dev) with a custom [Catppuccin](https://catppuccin.com/)-based theme and a shared component library.

## Why this exists

I got tired of rebuilding slide decks from scratch. This repo gives every talk the same visual foundation — dark Catppuccin Mocha palette, opinionated typography (Clash Display / Satoshi / JetBrains Mono), and a library of presentation components — while keeping each talk in its own isolated workspace.

The theme and components live in shared packages. Individual talks are just Markdown files that reference them.

## Structure

```
packages/
  theme/          → slidev-theme-birdcar — layouts, styles, fonts, palette system
  components/     → slidev-addon-birdcar — reusable Vue components
talks/
  <slug>/         → one workspace per talk (slides.md + config)
scripts/          → CLI wrappers for dev, build, export, scaffolding
site/             → index page builder for deploying all talks together
```

## Quick start

```bash
# Install dependencies
bun install

# Scaffold a new talk
bun run new-talk "My Talk Title"

# Start the dev server
bun run dev my-talk-title
```

## Commands

| Command | What it does |
|---------|-------------|
| `bun run dev <talk>` | Start Slidev dev server with hot reload |
| `bun run build <talk>` | Build static SPA for a single talk |
| `bun run export <talk>` | Export to PDF (add `--pptx` for PowerPoint) |
| `bun run new-talk "<name>"` | Scaffold a new talk from the template |
| `bun run build:site` | Build the full site — index page + all talks |

## Theme

The theme (`slidev-theme-birdcar`) is a dark-only Slidev theme built on Catppuccin Mocha with sapphire as the default accent color.

**Palette.** All 26 Catppuccin Mocha colors are exposed as `--ctp-*` CSS custom properties, plus semantic tokens like `--accent`, `--text-primary`, `--slide-bg`. Per-talk color variants (flavor + accent) are supported through frontmatter.

**Typography.** Three font families, all bundled locally:
- **Clash Display** — headings and display text
- **Satoshi** — body text and bullet points
- **JetBrains Mono** — code blocks, terminal output, meta text

**Layouts:**

| Layout | Purpose |
|--------|---------|
| `cover` | Opening slide with title, accent line, author/date meta |
| `default` | Standard content slide, vertically centered |
| `section` | Section divider with left accent bar |
| `two-col` | Side-by-side columns with optional header |
| `code-focus` | Code-heavy slide with subdued headings |
| `quote` | Centered quotation with decorative curly quotes |
| `image-full` | Full-bleed background image with gradient overlay |
| `end` | Closing slide |

## Components

The addon (`slidev-addon-birdcar`) ships these components, available in any slide without imports:

| Component | What it does |
|-----------|-------------|
| `<Highlight>` | Inline colored text using any Catppuccin color |
| `<RoughMark>` | Hand-drawn annotations (underline, circle, highlight, box) via [Rough Notation](https://roughnotation.com/) |
| `<AnimatedList>` | Click-through bullet points with entrance animations |
| `<KeyPoints>` | Numbered takeaway list with accent-colored markers |
| `<Callout>` | Tip/warning/info boxes with type-based coloring |
| `<QuoteBlock>` | Inline quote with attribution (for content slides) |
| `<SpeakerCard>` | Speaker intro card with avatar, handle, links |
| `<TerminalDemo>` | Simulated terminal with click-through commands |
| `<CodeWalkthrough>` | Step-through code explanation with highlighted regions |
| `<CodePlayground>` | Editable code with Monaco editor |
| `<SectionHeader>` | Reusable section header block |

## Talk anatomy

Each talk lives in `talks/<slug>/` and contains:

```
talks/my-talk/
  slides.md          ← slide content (Markdown + Vue components)
  package.json       ← workspace package referencing theme + addon
  slidev.config.ts   ← Slidev configuration overrides
```

The `slides.md` frontmatter wires everything together:

```yaml
---
theme: slidev-theme-birdcar
addons:
  - slidev-addon-birdcar
title: My Talk Title
---
```

## AI-assisted authoring

This repo includes a [Claude Code](https://docs.anthropic.com/en/docs/claude-code) skill (`/new-talk`) that walks through creating a talk interactively — from narrative framework selection (22 frameworks covering story circles, Freytag's pyramid, absurdist structures, and more) through slide generation and design direction. It uses reference docs that stay in sync with the actual theme and component source code.

## License

These are my personal talks. The theme and component code are MIT-licensed; talk content is mine.
