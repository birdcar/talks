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
  padding: var(--space-4);
  background: var(--slide-bg-raised);
  border-radius: 8px;
  border: 1px solid var(--border);
}

.key-points-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.3rem;
  color: var(--accent);
  margin-bottom: var(--space-3);
}

.key-points-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.key-point {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.key-point:last-child {
  margin-bottom: 0;
}

.key-point-marker {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--accent);
  color: var(--ctp-crust);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.9rem;
}

.key-point-text {
  font-size: 1.2rem;
  line-height: 1.4;
}
</style>
