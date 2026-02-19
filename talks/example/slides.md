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

message = greet("Slidev")
print(message)
```

---
layout: section
---

# Section Divider

This layout is for introducing a new section of the talk.

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

## Click Animations

<v-click>

First, this appears.

</v-click>

<v-click>

Then, this appears.

</v-click>

<v-click>

Finally, this appears.

</v-click>

---

## Speaker Notes

This slide has speaker notes attached.

Press the presenter button to see them.

<!--
These are speaker notes!

They are only visible in presenter mode.
You can write **markdown** here too.
-->

---

## Addon Component

The Placeholder component comes from our shared addon:

<Placeholder>
  This content is rendered inside the Placeholder component.
</Placeholder>

---
layout: end
---

## Thanks!

birdcar.dev

@birdcar
