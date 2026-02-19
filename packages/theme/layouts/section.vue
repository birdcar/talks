<template>
  <div class="section-layout">
    <div class="section-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.section-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--slide-padding);
  padding-left: calc(var(--slide-padding) + 20px);
  height: 100%;
  background: var(--slide-bg);
  position: relative;
}

.section-layout::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--accent);
}

.section-content :deep(h1),
.section-content :deep(h2) {
  font-size: 3rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.section-content :deep(p) {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-top: var(--space-3);
}
</style>
