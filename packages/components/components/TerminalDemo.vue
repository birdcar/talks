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
  background: hsl(0, 0%, 8%);
  border: 1px solid hsl(0, 0%, 18%);
  font-family: var(--font-mono, monospace);
}

.terminal-chrome {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: hsl(0, 0%, 12%);
  border-bottom: 1px solid hsl(0, 0%, 18%);
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

.dot-red { background: #ff5f57; }
.dot-yellow { background: #febc2e; }
.dot-green { background: #28c840; }

.terminal-title {
  font-size: 0.75rem;
  color: hsl(0, 0%, 50%);
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
  color: var(--brand-accent, #e89d0e);
}

.terminal-cmd {
  color: hsl(0, 0%, 90%);
}

.terminal-output {
  margin: 4px 0 0 0;
  padding: 0;
  background: transparent;
  color: hsl(0, 0%, 60%);
  font-size: 0.8rem;
  white-space: pre-wrap;
}
</style>
