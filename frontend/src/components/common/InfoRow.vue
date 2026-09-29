<template>
  <div :class="['info-row', className]">
    <div class="info-row__header">
      <component :is="icon" class="info-row__icon" aria-hidden="true" />
      <h4 class="info-row__title">{{ title }}</h4>
    </div>

    <div class="info-row__content">
      <p v-if="text" class="info-row__text">{{ text }}</p>
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: [Object, Function],
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    default: "",
  },

  className: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.info-row {
  --info-row-icon-color: var(--color-gold-300);
  --info-row-title-color: var(--color-gold-300);
  --info-row-text-color: var(--color-gold-300);
  --info-row-header-gap: var(--space-1);

  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 100%;

  &__header {
    display: flex;
    align-items: center;
    gap: var(--info-row-header-gap);
    width: 100%;
  }

  &__icon {
    flex-shrink: 0;
    width: var(--icon-md);
    height: var(--icon-md);
    color: var(--info-row-icon-color);
    stroke-width: var(--stroke-2);
  }

  &__title {
    margin: 0;
    color: var(--info-row-title-color);
    font-size: var(--text-label-md-size);
    font-weight: var(--text-label-md-weight);
  }

  &__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  &__text {
    margin: 0;
    color: var(--info-row-text-color);
    font-size: var(--text-body-sm-size);
    font-weight: var(--text-body-sm-weight);
    line-height: var(--text-body-sm-line-height);
  }
}
</style>