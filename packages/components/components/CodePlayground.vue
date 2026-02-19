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
  background: var(--ctp-crust);
  border: 1px solid var(--border);
}

.playground-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: var(--slide-bg-alt);
  border-bottom: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.playground-filename {
  color: var(--text-primary);
  font-weight: 500;
}

.playground-lang {
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.playground-editor {
  padding: 16px;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  line-height: 1.7;
}

.playground-editor :deep(pre) {
  margin: 0;
  background: transparent !important;
}
</style>
