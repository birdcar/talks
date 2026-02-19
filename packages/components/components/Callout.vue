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
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: 8px;
  border-left: 3px solid;
  margin: var(--space-3) 0;
}

.callout-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.75rem;
}

.callout-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 4px;
}

.callout-content {
  font-size: 0.9rem;
  line-height: 1.5;
}

.callout-info {
  background: color-mix(in srgb, var(--ctp-blue) 8%, transparent);
  border-color: var(--ctp-blue);
}
.callout-info .callout-icon {
  background: var(--ctp-blue);
  color: var(--ctp-crust);
}
.callout-info .callout-title { color: var(--ctp-blue); }

.callout-warning {
  background: color-mix(in srgb, var(--ctp-yellow) 8%, transparent);
  border-color: var(--ctp-yellow);
}
.callout-warning .callout-icon {
  background: var(--ctp-yellow);
  color: var(--ctp-crust);
}
.callout-warning .callout-title { color: var(--ctp-yellow); }

.callout-tip {
  background: color-mix(in srgb, var(--ctp-green) 8%, transparent);
  border-color: var(--ctp-green);
}
.callout-tip .callout-icon {
  background: var(--ctp-green);
  color: var(--ctp-crust);
}
.callout-tip .callout-title { color: var(--ctp-green); }

.callout-danger {
  background: color-mix(in srgb, var(--ctp-red) 8%, transparent);
  border-color: var(--ctp-red);
}
.callout-danger .callout-icon {
  background: var(--ctp-red);
  color: var(--ctp-crust);
}
.callout-danger .callout-title { color: var(--ctp-red); }
</style>
