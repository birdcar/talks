<template>
  <div class="code-focus-layout">
    <slot />
  </div>
</template>

<style scoped>
.code-focus-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--space-5) var(--space-6);
  height: 100%;
  background: var(--slide-bg);
}

.code-focus-layout :deep(h2),
.code-focus-layout :deep(h3) {
  font-size: 1.3rem;
  margin-bottom: var(--space-3);
  color: var(--text-secondary);
  font-weight: 500;
}

.code-focus-layout :deep(pre.slidev-code) {
  font-size: 1rem;
  line-height: 1.8;
}
</style>
