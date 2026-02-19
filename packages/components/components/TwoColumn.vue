<template>
  <div class="two-column" :style="{ gridTemplateColumns: `${ratio}fr ${1 - ratio}fr` }">
    <div class="column column-left">
      <slot name="left" />
    </div>
    <div class="column column-right">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  ratio?: number
}>(), {
  ratio: 0.5,
})
</script>

<style scoped>
.two-column {
  display: grid;
  gap: var(--space-5, 32px);
  height: 100%;
}

.column {
  display: flex;
  flex-direction: column;
}
</style>
