<template>
  <div class="end-layout">
    <div class="accent-line" />
    <div class="end-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.end-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: var(--slide-padding);
  height: 100%;
  background: var(--slide-bg);
}

.end-content {
  margin-top: var(--space-4);
}

.end-content :deep(h1),
.end-content :deep(h2) {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: var(--space-4);
}

.end-content :deep(p) {
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 1rem;
}

.end-content :deep(a) {
  color: var(--brand-accent-light);
}
</style>
