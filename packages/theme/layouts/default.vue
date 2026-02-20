<template>
  <div class="default-layout">
    <slot />
  </div>
</template>

<style scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--content-gap);
  padding: var(--slide-padding) 15%;
  height: 100%;
  background: var(--slide-bg);
}
</style>
