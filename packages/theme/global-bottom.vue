<script setup lang="ts">
import { watchEffect, getCurrentInstance } from 'vue'
import { palettes, colorNames, type FlavorName, type AccentName } from '../palettes'

const instance = getCurrentInstance()
const slidev = instance?.appContext.config.globalProperties.$slidev

watchEffect(() => {
  const variant = slidev?.configs?.variant as
    | { flavor?: FlavorName; accent?: AccentName }
    | undefined
  if (!variant) return

  const root = document.documentElement

  // Apply flavor palette
  if (variant.flavor && variant.flavor in palettes) {
    const palette = palettes[variant.flavor]
    root.setAttribute('data-ctp-flavor', variant.flavor)
    for (const name of colorNames) {
      root.style.setProperty(`--ctp-${name}`, palette[name])
    }
  }

  // Remap accent
  if (variant.accent) {
    const flavor = variant.flavor || 'mocha'
    const palette = palettes[flavor]
    const accentKey = variant.accent as keyof typeof palette
    if (accentKey in palette) {
      root.style.setProperty('--accent', palette[accentKey])
    }
  }
})
</script>

<template>
  <div />
</template>
