<template>
  <div class="cover-layout">
    <div class="accent-line" />
    <div class="cover-content">
      <slot />
    </div>
    <div class="cover-meta" v-if="$attrs.author || $attrs.date">
      <span v-if="$attrs.author">{{ $attrs.author }}</span>
      <span v-if="$attrs.author && $attrs.date" class="meta-sep">/</span>
      <span v-if="$attrs.date">{{ $attrs.date }}</span>
    </div>
  </div>
</template>

<style scoped>
.cover-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: var(--slide-padding);
  height: 100%;
  background: var(--slide-bg);
}

.cover-content {
  margin-top: var(--space-4);
}

.cover-content :deep(h1) {
  font-size: 3.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: var(--space-3);
}

.cover-content :deep(p) {
  font-size: 1.3rem;
  color: var(--text-secondary);
}

.cover-meta {
  position: absolute;
  bottom: var(--space-6);
  left: var(--slide-padding);
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-family: var(--font-mono);
}

.meta-sep {
  margin: 0 var(--space-2);
  color: var(--brand-accent);
}
</style>
