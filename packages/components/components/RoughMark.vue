<template>
  <span
    v-if="active"
    v-mark="markOptions"
    class="rough-mark rough-mark-active"
    :class="{ 'rough-mark-highlight': type === 'highlight' }"
  >
    <slot />
  </span>
  <span
    v-else
    ref="pendingEl"
    class="rough-mark"
    :class="{ 'rough-mark-highlight': type === 'highlight' }"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'underline' | 'circle' | 'highlight' | 'strike-through' | 'crossed-off' | 'bracket' | 'box'
  color?: string
  at?: number | string
}>(), {
  type: 'underline',
  color: 'sapphire',
})

const accentNames = [
  'rosewater', 'flamingo', 'pink', 'mauve', 'red', 'maroon', 'peach',
  'yellow', 'green', 'teal', 'sky', 'sapphire', 'blue', 'lavender',
] as const

function resolveColor(name: string): string {
  if (accentNames.includes(name as typeof accentNames[number])) {
    const cssVar = `--ctp-${name}`
    const hex = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim() || name
    if (props.type === 'highlight' && hex.startsWith('#')) {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, 0.3)`
    }
    return hex
  }
  return name
}

const markOptions = computed(() => {
  const opts: Record<string, unknown> = {
    type: props.type,
    color: resolveColor(props.color),
  }
  if (props.at !== undefined) {
    opts.at = props.at
  }
  return opts
})

const pendingEl = ref<HTMLElement>()
const active = ref(false)
let observer: MutationObserver | null = null

function isAncestorHidden(el: HTMLElement | undefined): boolean {
  if (!el) return false
  let node = el.parentElement
  while (node) {
    if (node.classList.contains('slidev-vclick-hidden')) return true
    if (node.classList.contains('slidev-page')) break
    node = node.parentElement
  }
  return false
}

onMounted(() => {
  // :at prop means the user is managing timing — activate immediately
  // and let the CSS safety net handle position if ancestor is hidden
  if (props.at !== undefined) {
    active.value = true
    return
  }

  // No hidden ancestor — activate immediately, animation plays normally
  if (!isAncestorHidden(pendingEl.value)) {
    active.value = true
    return
  }

  // Hidden ancestor, no :at — defer v-mark until ancestor becomes visible
  // so the hand-drawn animation plays while you're actually watching
  observer = new MutationObserver(() => {
    if (!isAncestorHidden(pendingEl.value)) {
      // Wait for v-click fade transition to finish before drawing
      setTimeout(() => {
        active.value = true
      }, 350)
      observer?.disconnect()
      observer = null
    }
  })

  const slide = pendingEl.value?.closest('.slidev-page')
  if (slide) {
    observer.observe(slide, {
      attributes: true,
      subtree: true,
      attributeFilter: ['class'],
    })
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.rough-mark {
  width: fit-content;
}

.rough-mark-highlight {
  transition: color 0.3s ease;
}

.rough-mark-highlight:has(svg) {
  color: var(--ctp-text);
}
</style>

<style>
/* Safety net for :at prop case: when v-mark is active inside a hidden ancestor,
   remove transform so rough-notation calculates correct SVG position.
   Only matches when v-mark has been applied (rough-mark-active class). */
.slidev-vclick-hidden:has(.rough-mark-active) {
  transform: none !important;
  filter: none !important;
}
</style>
