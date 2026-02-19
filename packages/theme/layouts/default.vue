<template>
  <div class="default-layout">
    <slot />
  </div>
</template>

<style scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  gap: var(--content-gap);
  padding: var(--slide-padding);
  height: 100%;
  background: var(--slide-bg);
}
</style>
