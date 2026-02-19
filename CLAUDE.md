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

## Skills

### `/new-talk` — Guided Talk Creation

Located at `.claude/skills/new-talk/SKILL.md`. Creates a new talk interactively using the Story Circle narrative framework.

Stages: Information gathering → Narrative structure → Slide generation → Design direction → Review

Reference files in `.claude/skills/new-talk/references/`:
- `story-circle.md` — Story Circle framework adapted for tech talks
- `slidev-syntax.md` — Slidev markdown syntax for this repo
- `components.md` — All shared components with usage examples
- `theme-variants.md` — Per-talk color variant system
- `design-guide.md` — Slide design principles

### `/update-refs` — Regenerate Skill References

Located at `.claude/skills/update-refs/SKILL.md`. Reads current component, layout, and theme source files and regenerates the new-talk skill reference documents to keep them in sync.

Run this after adding/modifying components, layouts, or theme styles.

## Hooks

A **Stop hook** runs `scripts/check-skill-refs.sh` at the end of each session. It checks whether component, layout, or theme files were modified without corresponding reference doc updates, and flags stale references. If flagged, run `/update-refs` to regenerate.

## Package Manager

Bun. Always use `bun install`, never npm/yarn/pnpm.
