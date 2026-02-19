<script setup lang="ts">
import { watchEffect, getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const slidev = instance?.appContext.config.globalProperties.$slidev

watchEffect(() => {
  const variant = slidev?.configs?.variant as Record<string, string> | undefined
  if (!variant) return
  const root = document.documentElement
  if (variant.accent) root.style.setProperty('--variant-accent', variant.accent)
  if (variant.accentLight) root.style.setProperty('--variant-accent-light', variant.accentLight)
  if (variant.background) root.style.setProperty('--variant-background', variant.background)
})
</script>

<template>
  <div />
</template>
