<template>
  <div class="callout" :class="`callout-${type}`">
    <div class="callout-icon">{{ icon }}</div>
    <div class="callout-body">
      <div v-if="title" class="callout-title">{{ title }}</div>
      <div class="callout-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'info' | 'warning' | 'tip' | 'danger'
  title?: string
}>(), {
  type: 'info',
})

const icon = computed(() => {
  const icons: Record<string, string> = {
    info: 'i',
    warning: '!',
    tip: '*',
    danger: 'x',
  }
  return icons[props.type] || 'i'
})
</script>

<style scoped>
.callout {
  display: flex;
  gap: var(--space-3, 16px);
  padding: var(--space-3, 16px) var(--space-4, 24px);
  border-radius: 8px;
  border-left: 3px solid;
  margin: var(--space-3, 16px) 0;
}

.callout-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono, monospace);
  font-weight: 700;
  font-size: 0.75rem;
}

.callout-title {
  font-family: var(--font-display, sans-serif);
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 4px;
}

.callout-content {
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Type variants */
.callout-info {
  background: hsla(210, 80%, 50%, 0.1);
  border-color: hsl(210, 80%, 55%);
}
.callout-info .callout-icon {
  background: hsl(210, 80%, 55%);
  color: white;
}
.callout-info .callout-title { color: hsl(210, 80%, 70%); }

.callout-warning {
  background: hsla(40, 90%, 50%, 0.1);
  border-color: hsl(40, 90%, 55%);
}
.callout-warning .callout-icon {
  background: hsl(40, 90%, 55%);
  color: hsl(40, 90%, 15%);
}
.callout-warning .callout-title { color: hsl(40, 90%, 70%); }

.callout-tip {
  background: hsla(150, 70%, 45%, 0.1);
  border-color: hsl(150, 70%, 45%);
}
.callout-tip .callout-icon {
  background: hsl(150, 70%, 45%);
  color: white;
}
.callout-tip .callout-title { color: hsl(150, 70%, 65%); }

.callout-danger {
  background: hsla(0, 80%, 55%, 0.1);
  border-color: hsl(0, 80%, 55%);
}
.callout-danger .callout-icon {
  background: hsl(0, 80%, 55%);
  color: white;
}
.callout-danger .callout-title { color: hsl(0, 80%, 70%); }
</style>
