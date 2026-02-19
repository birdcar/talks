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
  gap: var(--space-3, 16px);
}

.section-icon {
  font-size: 2rem;
}

.section-text :deep(h1),
.section-text :deep(h2),
.section-text :deep(h3) {
  font-family: var(--font-display, sans-serif);
  font-weight: 700;
  color: var(--text-primary, #e0e0e0);
}

.accent-line {
  width: 48px;
  height: 3px;
  background: var(--brand-accent, #e89d0e);
  border-radius: 2px;
}
</style>
