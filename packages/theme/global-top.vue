<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const slidev = instance?.appContext.config.globalProperties.$slidev

const currentLayout = computed(() => {
  const slide = slidev?.nav?.currentSlideRoute?.meta?.slide
  return slide?.frontmatter?.layout || 'default'
})

const geometryDisabled = computed(() => {
  const slide = slidev?.nav?.currentSlideRoute?.meta?.slide
  return slide?.frontmatter?.geometry === false
})
</script>

<template>
  <GeometricAccents
    :layout="currentLayout"
    :disabled="geometryDisabled"
  />
</template>
