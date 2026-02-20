<template>
  <div class="quote-layout">
    <div class="quote-content">
      <slot />
    </div>
    <div class="quote-attribution" v-if="$attrs.author">
      — {{ $attrs.author }}
    </div>
  </div>
</template>

<style scoped>
.quote-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: var(--space-7);
  height: 100%;
  background: var(--slide-bg);
}

.quote-content :deep(p) {
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 1.4;
  color: var(--text-primary);
  font-style: italic;
}

.quote-content :deep(p)::before {
  content: '\201C';
  color: var(--accent);
  font-size: 3rem;
  line-height: 0;
  vertical-align: -0.3em;
  margin-right: 4px;
}

.quote-content :deep(p)::after {
  content: '\201D';
  color: var(--accent);
  font-size: 3rem;
  line-height: 0;
  vertical-align: -0.3em;
  margin-left: 4px;
}

.quote-attribution {
  margin-top: var(--space-4);
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
</style>
