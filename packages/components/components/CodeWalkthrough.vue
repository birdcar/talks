<template>
  <div class="code-walkthrough">
    <div class="walkthrough-code">
      <pre class="walkthrough-pre"><code><template v-for="(line, i) in codeLines" :key="i"><span
        class="walkthrough-line"
        :class="{ highlighted: isHighlighted(i + 1) }"
      ><span v-if="showLineNumbers" class="line-number">{{ i + 1 }}</span>{{ line }}
</span></template></code></pre>
    </div>
    <div class="walkthrough-note" v-if="currentNote">
      {{ currentNote }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  lang?: string
  steps?: Array<{ lines: string; note?: string }>
  showLineNumbers?: boolean
}>(), {
  lang: 'typescript',
  showLineNumbers: true,
  steps: () => [],
})

const slots = defineSlots<{ default(): any }>()
const currentStep = ref(0)
const slotContent = ref('')

onMounted(() => {
  const el = document.querySelector('.code-walkthrough .walkthrough-code code')
  if (el) slotContent.value = el.textContent || ''

  // Listen for Slidev click events to advance steps
  const handler = () => {
    if (currentStep.value < props.steps.length - 1) {
      currentStep.value++
    }
  }
  document.addEventListener('slidev:nav:clicks', handler)
  onUnmounted(() => document.removeEventListener('slidev:nav:clicks', handler))
})

const codeLines = computed(() => {
  return slotContent.value.split('\n')
})

const highlightedLines = computed(() => {
  if (!props.steps.length || currentStep.value >= props.steps.length) return new Set<number>()
  const step = props.steps[currentStep.value]
  const lines = new Set<number>()
  for (const range of step.lines.split(',')) {
    const trimmed = range.trim()
    if (trimmed.includes('-')) {
      const [start, end] = trimmed.split('-').map(Number)
      for (let i = start; i <= end; i++) lines.add(i)
    } else {
      lines.add(Number(trimmed))
    }
  }
  return lines
})

const currentNote = computed(() => {
  if (!props.steps.length || currentStep.value >= props.steps.length) return ''
  return props.steps[currentStep.value].note || ''
})

function isHighlighted(lineNum: number): boolean {
  if (!props.steps.length) return false
  return highlightedLines.value.has(lineNum)
}
</script>

<style scoped>
.code-walkthrough {
  display: flex;
  gap: var(--space-4, 24px);
  border-radius: 8px;
  overflow: hidden;
  background: hsl(var(--brand-primary-h, 230), 20%, 8%);
}

.walkthrough-code {
  flex: 1;
  overflow-x: auto;
}

.walkthrough-pre {
  margin: 0;
  padding: var(--space-4, 24px);
  font-family: var(--font-mono, monospace);
  font-size: 0.85rem;
  line-height: 1.8;
}

.walkthrough-line {
  display: block;
  padding: 0 var(--space-2, 8px);
  border-left: 3px solid transparent;
  transition: background 0.3s, border-color 0.3s;
}

.walkthrough-line.highlighted {
  background: hsl(var(--brand-accent-h, 30), 30%, 15%);
  border-left-color: var(--brand-accent, #e89d0e);
}

.line-number {
  display: inline-block;
  width: 2.5em;
  color: var(--text-secondary, #666);
  opacity: 0.5;
  user-select: none;
  text-align: right;
  margin-right: var(--space-3, 16px);
}

.walkthrough-note {
  width: 240px;
  padding: var(--space-4, 24px);
  background: hsl(var(--brand-primary-h, 230), 20%, 12%);
  font-size: 0.9rem;
  color: var(--text-secondary, #aaa);
  display: flex;
  align-items: center;
  border-left: 1px solid hsl(var(--brand-primary-h, 230), 15%, 20%);
}
</style>
