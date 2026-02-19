<template>
  <blockquote class="quote-block">
    <div class="quote-text">
      <slot />
    </div>
    <footer v-if="author" class="quote-footer">
      <span class="quote-author">{{ author }}</span>
      <span v-if="source" class="quote-source">, {{ source }}</span>
    </footer>
  </blockquote>
</template>

<script setup lang="ts">
defineProps<{
  author?: string
  source?: string
}>()
</script>

<style scoped>
.quote-block {
  border: none;
  padding: 0;
  margin: var(--space-4, 24px) 0;
  position: relative;
  padding-left: var(--space-4, 24px);
  border-left: 3px solid var(--brand-accent, #e89d0e);
}

.quote-text {
  font-size: 1.2rem;
  line-height: 1.5;
  font-style: italic;
  color: var(--text-primary, #e0e0e0);
}

.quote-footer {
  margin-top: var(--space-3, 16px);
  font-family: var(--font-mono, monospace);
  font-size: 0.8rem;
  color: var(--text-secondary, #888);
  font-style: normal;
}

.quote-author {
  color: var(--brand-accent-light, #f0b060);
}
</style>
