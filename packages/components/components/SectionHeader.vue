<template>
  <div class="section-header">
    <span v-if="icon" class="section-icon">{{ icon }}</span>
    <div class="section-text">
      <slot />
    </div>
    <div class="accent-line" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon?: string
}>()
</script>

<style scoped>
.section-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.section-icon {
  font-size: 2rem;
  color: var(--accent);
}

.section-text :deep(h1),
.section-text :deep(h2),
.section-text :deep(h3) {
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--text-primary);
}

.accent-line {
  width: 48px;
  height: 3px;
  background: var(--accent);
  border-radius: 2px;
}
</style>
