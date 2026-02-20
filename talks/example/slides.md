---
layout: cover
theme: slidev-theme-birdcar
addons:
  - slidev-addon-birdcar
title: Example Talk
info: A template talk to validate the monorepo pipeline
author: birdcar
date: 2026-02-19
---

# Example Talk

A template presentation to validate the monorepo pipeline.

---

## Code Highlighting

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`
}

const message = greet('Slidev')
console.log(message)
```

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"
```

---

## Typography & Color

Text with <Highlight color="sapphire">colorful</Highlight> words that <Highlight color="peach">stand out</Highlight> and make text-heavy slides <Highlight color="mauve">visually dynamic</Highlight>.

- <Highlight color="green">Catppuccin</Highlight> palette with 14 accent colors
- <Highlight color="pink">Clash Display</Highlight> for expressive headings
- <Highlight color="yellow">Satoshi</Highlight> for comfortable body text

---
layout: section
---

# Component Library

Demonstrating the shared addon components.

---

## Animated List

<AnimatedList :items="['First point appears', 'Second point follows', 'Third point arrives', 'Fourth point lands']" animation="fade-up" />

---

## Terminal Demo

<TerminalDemo :steps="[
  { cmd: 'bun run new-talk my-talk', output: 'Created new talk: talks/my-talk' },
  { cmd: 'bun run dev my-talk', output: 'Listening on http://localhost:3030' },
]" />

---

## Speaker Card

<SpeakerCard
  name="Nick Cannariato"
  handle="@birdcar"
  title="Solutions Engineer"
  company="WorkOS"
  avatar="https://github.com/birdcar.png"
  :links="{ github: 'birdcar' }"
/>

---

## Callout Variants

<Callout type="tip" title="Pro tip">
  Always test your exports before presenting!
</Callout>

<Callout type="warning" title="Heads up">
  Monaco editor won't render in PDF exports.
</Callout>

---

## Rough Notation

Words can be <RoughMark type="underline" color="peach">underlined</RoughMark>,
<RoughMark type="circle" color="red">circled</RoughMark>, or
<RoughMark type="highlight" color="yellow">highlighted</RoughMark> with hand-drawn annotations.

<RoughMark type="box" color="sapphire">Boxed text</RoughMark> and
<RoughMark type="strike-through" color="maroon">struck through</RoughMark> are also available.

---

## Key Points

<KeyPoints :points="[
  'Shared theme with per-talk variants',
  'Component library grows with each talk',
  'Single CLI for dev, build, and export',
  'Unified site deployment',
]" />

---

## Quote Block

<QuoteBlock author="Alan Kay" source="1971">
  The best way to predict the future is to invent it.
</QuoteBlock>

---
layout: two-col
---

## Two Column Layout

::left::

**Left Column**

- First point
- Second point
- Third point

::right::

**Right Column**

- Fourth point
- Fifth point
- Sixth point

---
layout: code-focus
---

### Code Focus Layout

```typescript {all|1-4|6-8|all}
interface Talk {
  title: string
  slug: string
  date: string
}

function createTalk(title: string): Talk {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return { title, slug, date: new Date().toISOString() }
}
```

---
layout: quote
author: Alan Kay
---

The best way to predict the future is to invent it.

---

## Speaker Notes

This slide has speaker notes attached.

<!--
These are speaker notes!
Only visible in presenter mode.
-->

---
layout: end
---

## Thanks!

birdcar.dev

@birdcar
