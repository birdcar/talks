<template>
  <div class="image-full-layout" :style="bgStyle">
    <div class="image-overlay">
      <div class="image-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ image?: string }>()

const bgStyle = computed(() =>
  props.image
    ? { backgroundImage: `url(${props.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {}
)
</script>

<style scoped>
.image-full-layout {
  width: 100%;
  height: 100%;
}

.image-overlay {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--slide-padding);
  height: 100%;
  background: linear-gradient(transparent 40%, rgba(0, 0, 0, 0.75) 100%);
}

.image-content :deep(h1),
.image-content :deep(h2),
.image-content :deep(h3) {
  color: #fff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.image-content :deep(p) {
  color: rgba(255, 255, 255, 0.85);
}
</style>
