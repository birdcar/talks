<template>
  <div class="code-playground">
    <div class="playground-header" v-if="filename">
      <span class="playground-filename">{{ filename }}</span>
      <span class="playground-lang">{{ lang }}</span>
    </div>
    <div class="playground-editor">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  lang?: string
  editable?: boolean
  runnable?: boolean
  height?: string
  filename?: string
}>(), {
  lang: 'typescript',
  editable: true,
  runnable: false,
  height: 'auto',
})
</script>

<style scoped>
.code-playground {
  border-radius: 8px;
  overflow: hidden;
  background: hsl(var(--brand-primary-h, 230), 20%, 8%);
  border: 1px solid hsl(var(--brand-primary-h, 230), 15%, 20%);
}

.playground-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: hsl(var(--brand-primary-h, 230), 20%, 12%);
  border-bottom: 1px solid hsl(var(--brand-primary-h, 230), 15%, 20%);
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
}

.playground-filename {
  color: var(--text-primary, #e0e0e0);
  font-weight: 500;
}

.playground-lang {
  color: var(--text-secondary, #888);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.playground-editor {
  padding: 16px;
  font-family: var(--font-mono, monospace);
  font-size: 0.9rem;
  line-height: 1.7;
}

.playground-editor :deep(pre) {
  margin: 0;
  background: transparent !important;
}
</style>
