<template>
  <svg
    v-if="layout !== 'code-focus' && !disabled"
    class="geometric-accents"
    :viewBox="`0 0 ${width} ${height}`"
    :width="width"
    :height="height"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Corner brackets — top-left -->
    <g v-if="showCornerBrackets" class="corner-bracket corner-tl" opacity="0.35">
      <line :x1="24" :y1="24" :x2="24" :y2="56" stroke="var(--ctp-overlay0)" stroke-width="1.5" />
      <line :x1="24" :y1="24" :x2="56" :y2="24" stroke="var(--ctp-overlay0)" stroke-width="1.5" />
    </g>

    <!-- Corner brackets — bottom-right -->
    <g v-if="showCornerBrackets" class="corner-bracket corner-br" opacity="0.35">
      <line :x1="width - 24" :y1="height - 24" :x2="width - 24" :y2="height - 56" stroke="var(--ctp-overlay0)" stroke-width="1.5" />
      <line :x1="width - 24" :y1="height - 24" :x2="width - 56" :y2="height - 24" stroke="var(--ctp-overlay0)" stroke-width="1.5" />
    </g>

    <!-- Small corner bracket — top-right (default layout) -->
    <g v-if="layout === 'default'" class="corner-bracket corner-tr" opacity="0.25">
      <line :x1="width - 24" :y1="24" :x2="width - 24" :y2="48" stroke="var(--ctp-overlay0)" stroke-width="1" />
      <line :x1="width - 24" :y1="24" :x2="width - 48" :y2="24" stroke="var(--ctp-overlay0)" stroke-width="1" />
    </g>

    <!-- Large ring — bottom-right (cover/end) -->
    <circle
      v-if="showLargeRing"
      class="large-ring"
      :cx="width - 100"
      :cy="height - 80"
      r="60"
      fill="none"
      stroke="var(--accent)"
      stroke-width="1.5"
      opacity="0.2"
    />

    <!-- Dot grid — top-right quadrant (cover/end) -->
    <g v-if="showDotGrid" class="dot-grid" opacity="0.15">
      <circle
        v-for="dot in dotGridPoints"
        :key="`${dot.x}-${dot.y}`"
        :cx="dot.x"
        :cy="dot.y"
        r="1.5"
        fill="var(--accent)"
      />
    </g>

    <!-- Floating circle cluster — left margin (section) -->
    <g v-if="layout === 'section'" class="circle-cluster" opacity="0.25">
      <circle cx="40" cy="200" r="4" fill="var(--accent)" />
      <circle cx="28" cy="230" r="6" fill="var(--accent-alt)" opacity="0.4" />
      <circle cx="50" cy="260" r="3" fill="var(--accent)" opacity="0.6" />
    </g>

    <!-- Large unfilled ring — centered (quote) -->
    <circle
      v-if="layout === 'quote'"
      class="quote-ring"
      :cx="width / 2"
      :cy="height / 2"
      :r="Math.min(width, height) * 0.3"
      fill="none"
      stroke="var(--accent)"
      stroke-width="1"
      opacity="0.08"
    />

    <!-- Two-col center divider with diamond -->
    <g v-if="layout === 'two-col'">
      <line
        :x1="width / 2" :y1="80"
        :x2="width / 2" :y2="height - 40"
        stroke="var(--border)"
        stroke-width="1"
        opacity="0.3"
      />
      <rect
        :x="width / 2 - 4"
        :y="height / 2 - 4"
        width="8"
        height="8"
        :transform="`rotate(45, ${width / 2}, ${height / 2})`"
        fill="var(--accent)"
        opacity="0.4"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  layout?: string
  disabled?: boolean
  width?: number
  height?: number
}>(), {
  layout: 'default',
  disabled: false,
  width: 980,
  height: 552,
})

const showCornerBrackets = computed(() =>
  ['cover', 'end'].includes(props.layout)
)

const showLargeRing = computed(() =>
  ['cover', 'end'].includes(props.layout)
)

const showDotGrid = computed(() =>
  ['cover', 'end'].includes(props.layout)
)

const dotGridPoints = computed(() => {
  const points: { x: number; y: number }[] = []
  const startX = props.width * 0.65
  const endX = props.width - 60
  const startY = 40
  const endY = props.height * 0.35
  const spacing = 20
  for (let x = startX; x < endX; x += spacing) {
    for (let y = startY; y < endY; y += spacing) {
      points.push({ x, y })
    }
  }
  return points
})
</script>

<style scoped>
.geometric-accents {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  animation: geometricFadeIn 0.8s ease 0.6s forwards;
}

@keyframes geometricFadeIn {
  to { opacity: 1; }
}

.large-ring {
  animation: ringScaleIn 0.8s ease 0.6s both;
  transform-origin: center;
}

@keyframes ringScaleIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 0.2;
  }
}
</style>
