<template>
  <span class="highlight" :style="{ color: resolvedColor }">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  color?: string
}>(), {
  color: 'sapphire',
})

const colorMap: Record<string, string> = {
  rosewater: 'var(--ctp-rosewater)',
  flamingo: 'var(--ctp-flamingo)',
  pink: 'var(--ctp-pink)',
  mauve: 'var(--ctp-mauve)',
  red: 'var(--ctp-red)',
  maroon: 'var(--ctp-maroon)',
  peach: 'var(--ctp-peach)',
  yellow: 'var(--ctp-yellow)',
  green: 'var(--ctp-green)',
  teal: 'var(--ctp-teal)',
  sky: 'var(--ctp-sky)',
  sapphire: 'var(--ctp-sapphire)',
  blue: 'var(--ctp-blue)',
  lavender: 'var(--ctp-lavender)',
}

const resolvedColor = computed(() => colorMap[props.color] || props.color)
</script>

<style scoped>
.highlight {
  font-weight: 600;
}
</style>
