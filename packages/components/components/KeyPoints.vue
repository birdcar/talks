<template>
  <div class="key-points">
    <div class="key-points-title" v-if="title">{{ title }}</div>
    <ul class="key-points-list">
      <li v-for="(point, i) in points" :key="i" class="key-point">
        <span class="key-point-marker">{{ i + 1 }}</span>
        <span class="key-point-text">{{ point }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  points: string[]
  title?: string
}>(), {
  title: 'Key Takeaways',
})
</script>

<style scoped>
.key-points {
  padding: var(--space-4, 24px);
  background: hsl(var(--brand-primary-h, 230), 20%, 14%);
  border-radius: 8px;
  border: 1px solid hsl(var(--brand-primary-h, 230), 15%, 22%);
}

.key-points-title {
  font-family: var(--font-display, sans-serif);
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--brand-accent, #e89d0e);
  margin-bottom: var(--space-3, 16px);
}

.key-points-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.key-point {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3, 16px);
  margin-bottom: var(--space-3, 16px);
}

.key-point:last-child {
  margin-bottom: 0;
}

.key-point-marker {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--brand-accent, #e89d0e);
  color: var(--slide-bg, #1a1a2e);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono, monospace);
  font-weight: 700;
  font-size: 0.75rem;
}

.key-point-text {
  font-size: 0.95rem;
  line-height: 1.4;
}
</style>
