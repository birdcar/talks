<template>
  <ul class="animated-list" :class="`animation-${animation}`">
    <template v-if="items && items.length">
      <li v-for="(item, i) in items" :key="i" v-click class="animated-item" :style="staggerStyle(i)">
        {{ item }}
      </li>
    </template>
    <template v-else-if="slotListItems.length">
      <li v-for="(children, i) in slotListItems" :key="i" v-click class="animated-item" :style="staggerStyle(i)">
        <VNodeRenderer :nodes="children" />
      </li>
    </template>
    <template v-else>
      <slot />
    </template>
  </ul>
</template>

<script setup lang="ts">
import { useSlots, computed, type VNode, type FunctionalComponent } from 'vue'

const VNodeRenderer: FunctionalComponent<{ nodes: VNode[] }> = (props) => props.nodes
VNodeRenderer.props = ['nodes']

const props = withDefaults(defineProps<{
  items?: string[]
  animation?: 'fade-up' | 'slide-right' | 'fade' | 'scale-in' | 'none'
  stagger?: number
}>(), {
  animation: 'fade-up',
  stagger: 0,
})

const slots = useSlots()

const slotListItems = computed<VNode[][]>(() => {
  if (props.items?.length || !slots.default) return []
  const vnodes = slots.default()
  const items: VNode[][] = []
  for (const vnode of vnodes) {
    if (typeof vnode.type === 'string' && (vnode.type === 'ul' || vnode.type === 'ol')) {
      const children = Array.isArray(vnode.children) ? vnode.children : []
      for (const child of children) {
        if (typeof child === 'object' && child !== null && 'type' in child && (child as VNode).type === 'li') {
          const liChildren = (child as VNode).children
          items.push(Array.isArray(liChildren) ? liChildren as VNode[] : liChildren ? [liChildren as VNode] : [])
        }
      }
    }
  }
  return items
})

function staggerStyle(i: number) {
  return props.stagger ? { transitionDelay: `${i * props.stagger}ms` } : undefined
}
</script>

<style scoped>
.animated-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.animated-item,
.animated-list :deep(li) {
  margin-bottom: var(--space-3);
  padding-left: var(--space-3);
  border-left: 2px solid var(--accent);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

/* Fade-up animation */
.animation-fade-up .animated-item.slidev-vclick-hidden,
.animation-fade-up :deep(li.slidev-vclick-hidden) {
  opacity: 0;
  transform: translateY(12px);
}

/* Slide-right animation */
.animation-slide-right .animated-item.slidev-vclick-hidden,
.animation-slide-right :deep(li.slidev-vclick-hidden) {
  opacity: 0;
  transform: translateX(-20px);
}

/* Fade animation */
.animation-fade .animated-item.slidev-vclick-hidden,
.animation-fade :deep(li.slidev-vclick-hidden) {
  opacity: 0;
}

/* Scale-in animation */
.animation-scale-in .animated-item.slidev-vclick-hidden,
.animation-scale-in :deep(li.slidev-vclick-hidden) {
  opacity: 0;
  transform: scale(0.95);
}
</style>
