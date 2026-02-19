# Talks Monorepo Contract

**Created**: 2026-02-19
**Confidence Score**: 95/100
**Status**: Draft

## Problem Statement

Giving talks — internal and external — currently means starting from scratch each time: new project, new styling, no shared components, no consistent way to deploy or export. There's no single home for presentations, no component library that grows over time, and no Claude-assisted workflow for scaffolding new talks with a proven narrative structure. Building each deck in isolation wastes effort and prevents compounding returns on custom components, themes, and tooling.

## Goals

1. **Single monorepo for all presentations** — every talk lives in one repo with shared tooling, theme, and components, managed via Bun workspaces
2. **Markdown-first authoring** — write slides in Markdown with the ability to embed rich custom components inline (code playgrounds, animated demos, interactive navigation)
3. **Deployable as unified site** — the entire monorepo deploys to a single domain (e.g., talks.birdcar.dev) with each talk at `/talks/<slug>`, plus a root index page listing all talks. Individual talks can also be built standalone.
4. **Reliable PDF/PPTX export** — every presentation can be exported to PDF (required) and PPTX (nice-to-have) with consistent rendering
5. **Growing shared component library** — a shared addon/package of reusable components (code blocks, animated diagrams, section headers, etc.) that grows with each new talk
6. **Personal brand theme with per-talk variants** — a base theme reflecting a designed personal brand identity, with per-talk accent/variant customization
7. **Claude skill for talk creation** — a repo-based skill that scaffolds new talk directories, generates narrative outlines (Story Circle), produces initial slides with custom components, and includes design guidance for visual quality

## Success Criteria

- [ ] A new talk can be scaffolded with a single Claude skill invocation (`/new-talk`)
- [ ] Slides are authored in Markdown with custom components usable inline
- [ ] `bun run dev --talk <name>` starts a local dev server for any talk
- [ ] `bun run build --talk <name>` produces a deployable static site
- [ ] `bun run export --talk <name> --pdf` produces a well-rendered PDF
- [ ] Shared components from the component library render correctly in all talks
- [ ] The full site deploys to a single domain with talks at `/talks/<slug>`
- [ ] A root index page lists all available talks with links
- [ ] Individual talks can also be built standalone for independent deployment
- [ ] The base theme applies consistently across talks with per-talk variant overrides
- [ ] Live code playgrounds (Monaco editor) work in browser-served presentations
- [ ] Animated demos and slide transitions render smoothly
- [ ] The Claude skill generates a Story Circle outline and initial slide content
- [ ] The Claude skill includes design guidance that produces distinctive, non-generic aesthetics

## Scope Boundaries

### In Scope

- **Framework**: Slidev (Vue-based) as the presentation engine — best-in-class feature set for developer presentations (Monaco editor, draw mode, presenter mode, animations, PDF/PPTX export, addon system)
- **Monorepo structure**: Bun workspaces with shared packages for theme, components, and tooling
- **Shared component addon**: A Slidev addon package containing reusable Vue components for all talks
- **Base theme**: A custom Slidev theme package with personal brand identity (typography, colors, layout) designed as part of this project
- **Per-talk variants**: Theme configuration per talk for accent colors, backgrounds, and custom styling
- **PDF export**: Via Slidev's built-in Chromium-based export pipeline
- **CLI scripts**: Bun scripts for dev, build, export, and scaffolding workflows
- **Claude skill**: Repo-based skill for scaffolding talks, generating Story Circle outlines, producing initial slides, and guiding visual design
- **Starter components**: Initial set of shared components (code playground, section header, animated list, two-column layout, speaker card, quote block)
- **Unified deployment**: Root site at talks.birdcar.dev with talks index page and each talk at `/talks/<slug>`, deployable to Cloudflare Pages/Vercel/Netlify
- **Standalone deployment**: Individual talks can also be built and deployed independently

### Out of Scope

- **Audience polling/Q&A backend** — deferred to a future phase; focus on core presentation system first
- **Keynote export** — nice-to-have; Slidev exports to PPTX which Keynote can import, but native Keynote conversion is not in scope
- **React components** — Slidev is Vue-based; components will be written in Vue SFC with TypeScript. Claude skill abstracts this away.
- **Custom presentation engine** — not building from scratch; leveraging Slidev's proven infrastructure
- **CI/CD pipeline** — deployment automation is out of scope; manual deploy via CLI is sufficient for now
- **Content for existing talks** — this project builds the tooling; migrating existing talks is separate work

### Future Considerations

- Audience polling/Q&A via WebSocket/SSE service or external integration (Slido, etc.)
- Keynote-native export tooling
- CI/CD for automatic deployment on push
- Talk index/portfolio site that lists all deployed presentations
- Recording and video export capabilities
- Analytics on deployed talks (views, engagement)

---

_This contract was generated from brain dump input. Review and approve before proceeding to specification._
