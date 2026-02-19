# Talks Monorepo

Bun workspace monorepo for Slidev presentations.

## Structure

```
packages/theme/       → slidev-theme-birdcar (shared theme)
packages/components/  → slidev-addon-birdcar (shared Vue components)
talks/<slug>/         → individual talk workspaces
scripts/              → CLI scripts (dev, build, export, new-talk, build-site)
site/                 → index page template and build script
```

## Commands

```bash
bun run dev <talk>          # Start dev server for a talk
bun run build <talk>        # Build static site for a talk
bun run export <talk>       # Export PDF (add --pptx for PPTX)
bun run new-talk "<name>"   # Scaffold a new talk from template
bun run build:site          # Build entire site (index + all talks)
```

## Creating a New Talk

```bash
bun run new-talk "My Talk Title"
bun run dev my-talk-title
```

Each talk gets `talks/<slug>/` with `slides.md`, `package.json`, and `slidev.config.ts`.

## Conventions

- Slides are authored in Markdown (`slides.md` is the entry point)
- Shared components go in `packages/components/components/` as Vue SFCs
- Theme styles go in `packages/theme/styles/`
- Each talk references the theme and addon via frontmatter in `slides.md`
- Use `workspace:*` for local package dependencies
- Build output goes to `dist/` (gitignored)

## Talk Frontmatter

```yaml
---
theme: slidev-theme-birdcar
addons:
  - slidev-addon-birdcar
title: Talk Title
---
```

## Package Manager

Bun. Always use `bun install`, never npm/yarn/pnpm.
