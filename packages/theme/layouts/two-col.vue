<template>
  <div class="two-col-layout">
    <div class="two-col-header" v-if="$slots.default">
      <slot />
    </div>
    <div class="two-col-grid">
      <div class="col">
        <slot name="left" />
      </div>
      <div class="col">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.two-col-layout {
  display: flex;
  flex-direction: column;
  padding: var(--slide-padding);
  height: 100%;
  background: var(--slide-bg);
}

.two-col-header {
  margin-bottom: var(--space-4);
}

.two-col-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-5);
  flex: 1;
}

.col {
  display: flex;
  flex-direction: column;
  gap: var(--content-gap);
}
</style>
