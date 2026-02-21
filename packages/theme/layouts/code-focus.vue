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

/* Terminal chrome around code blocks */
.code-focus-layout :deep(.slidev-code-wrapper) {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.code-focus-layout :deep(.slidev-code-wrapper)::before {
  content: '';
  display: block;
  height: 30px;
  background:
    radial-gradient(circle at 21px 15px, var(--ctp-red) 5px, transparent 5px),
    radial-gradient(circle at 37px 15px, var(--ctp-yellow) 5px, transparent 5px),
    radial-gradient(circle at 53px 15px, var(--ctp-green) 5px, transparent 5px),
    var(--slide-bg-alt);
  border-bottom: 1px solid var(--border);
}

.code-focus-layout :deep(pre.slidev-code) {
  font-size: 1rem;
  line-height: 1.8;
  background: var(--ctp-crust);
  border-radius: 0;
}
</style>
