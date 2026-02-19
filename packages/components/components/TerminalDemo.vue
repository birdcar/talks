<template>
  <div class="terminal-demo">
    <div class="terminal-chrome">
      <div class="terminal-dots">
        <span class="dot dot-red" />
        <span class="dot dot-yellow" />
        <span class="dot dot-green" />
      </div>
      <span class="terminal-title">{{ title }}</span>
    </div>
    <div class="terminal-body">
      <div v-for="(step, i) in steps" :key="i" v-click class="terminal-step">
        <div class="terminal-line">
          <span class="terminal-prompt">{{ prompt }}</span>
          <span class="terminal-cmd">{{ step.cmd }}</span>
        </div>
        <pre v-if="step.output" class="terminal-output">{{ step.output }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  steps?: Array<{ cmd: string; output?: string }>
  speed?: number
  prompt?: string
  title?: string
}>(), {
  steps: () => [],
  speed: 30,
  prompt: '$ ',
  title: 'Terminal',
})
</script>

<style scoped>
.terminal-demo {
  border-radius: 8px;
  overflow: hidden;
  background: var(--ctp-crust);
  border: 1px solid var(--border);
  font-family: var(--font-mono);
}

.terminal-chrome {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: var(--slide-bg-alt);
  border-bottom: 1px solid var(--border);
}

.terminal-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot-red { background: var(--ctp-red); }
.dot-yellow { background: var(--ctp-yellow); }
.dot-green { background: var(--ctp-green); }

.terminal-title {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.terminal-body {
  padding: 16px;
  font-size: 0.85rem;
  line-height: 1.6;
}

.terminal-step {
  margin-bottom: 12px;
  transition: opacity 0.3s ease;
}

.terminal-step:last-child {
  margin-bottom: 0;
}

.terminal-prompt {
  color: var(--accent);
}

.terminal-cmd {
  color: var(--text-primary);
}

.terminal-output {
  margin: 4px 0 0 0;
  padding: 0;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.8rem;
  white-space: pre-wrap;
}
</style>
