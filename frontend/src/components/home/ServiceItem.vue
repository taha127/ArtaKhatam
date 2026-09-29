<template>
  <li :class="['service-item', className]">
    <span class="service-item__icon-wrap">
      <component
        v-if="icon"
        :is="icon"
        class="service-item__icon"
        aria-hidden="true"
      />
    </span>

    <h5 class="service-item__text">
      {{ text }}
    </h5>
  </li>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },

  icon: {
    type: [Object, Function],
    default: null,
  },

  className: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.service-item {
  --service-item-icon-wrap-size: 36px;
  --service-item-icon-size: var(--icon-md);
  --service-item-icon-bg: var(--color-turquoise-50);
  --service-item-icon-color: var(--color-turquoise-800);
  --service-item-text-color: var(--color-neutral-800);
  --service-item-gap: var(--space-2);

  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: var(--service-item-gap);
  position: relative;
  background-color: transparent;

  &__icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--service-item-icon-wrap-size);
    height: var(--service-item-icon-wrap-size);
    border-radius: var(--radius-full);
    background-color: var(--service-item-icon-bg);
    box-shadow: var(--shadow-inner-copper), var(--shadow-xl);
  }

  &__icon {
    flex-shrink: 0;
    width: var(--service-item-icon-size);
    height: var(--service-item-icon-size);
    color: var(--service-item-icon-color);
    stroke-width: var(--stroke-2);
  }

  &__text {
    width: fit-content;
    color: var(--service-item-text-color);
    font-size: var(--text-h5-size);
    font-weight: var(--text-h5-weight);
    white-space: nowrap;
  }
}
</style>