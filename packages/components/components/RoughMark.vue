<template>
  <span v-mark="markOptions">
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

const colorHexMap: Record<string, string> = {
  rosewater: '#f5e0dc',
  flamingo: '#f2cdcd',
  pink: '#f5c2e7',
  mauve: '#cba6f7',
  red: '#f38ba8',
  maroon: '#eba0ac',
  peach: '#fab387',
  yellow: '#f9e2af',
  green: '#a6e3a1',
  teal: '#94e2d5',
  sky: '#89dceb',
  sapphire: '#74c7ec',
  blue: '#89b4fa',
  lavender: '#b4befe',
}

const resolvedColor = computed(() => colorHexMap[props.color] || props.color)

const markOptions = computed(() => {
  const opts: Record<string, unknown> = {
    type: props.type,
    color: resolvedColor.value,
  }
  if (props.at !== undefined) {
    opts.at = props.at
  }
  return opts
})
</script>
