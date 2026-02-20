<template>
  <div class="two-col-layout">
    <div class="two-col-inner">
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
  </div>
</template>

<style scoped>
.two-col-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--slide-padding);
  height: 100%;
  background: var(--slide-bg);
}

.two-col-inner {
  width: 100%;
  max-width: 1100px;
}

.two-col-header {
  margin-bottom: var(--space-5);
}

.two-col-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
}

.col {
  display: flex;
  flex-direction: column;
  gap: var(--content-gap);
}
</style>
