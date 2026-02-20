<template>
  <span v-mark="markOptions" class="rough-mark" :class="{ 'rough-mark-highlight': type === 'highlight' }">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

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
    return getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim() || name
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
</script>

<style scoped>
.rough-mark {
  width: fit-content;
}

.rough-mark-highlight {
  transition: color 0.3s ease;
}

.rough-mark-highlight:has(svg) {
  color: var(--ctp-crust);
}
</style>
