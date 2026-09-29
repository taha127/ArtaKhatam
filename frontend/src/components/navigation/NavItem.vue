<template>
  <button
    type="button"
    :class="['nav-item', { 'nav-item--active': active }, className]"
    :aria-current="active ? 'page' : undefined"
    @click="emit('click')"
  >
    <component
      :is="icon"
      class="nav-item__icon"
      aria-hidden="true"
    />

    <span class="nav-item__label">{{ label }}</span>
  </button>
</template>

<script setup>
defineProps({
  icon: {
    type: [Object, Function],
    required: true,
  },

  label: {
    type: String,
    required: true,
  },

  active: {
    type: Boolean,
    default: false,
  },

  className: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["click"]);
</script>

<style scoped lang="scss">
.nav-item {
  --nav-item-width: 56px;
  --nav-item-height: 42px;
  --nav-item-gap: var(--space-1);
  --nav-item-color: var(--color-neutral-600);
  --nav-item-color-active: var(--color-turquoise-600);
  --nav-item-icon-size: var(--icon-md);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--nav-item-width);
  height: var(--nav-item-height);
  gap: var(--nav-item-gap);
  padding: 0;
  border: none;
  background: transparent;
  color: var(--nav-item-color);
  cursor: pointer;

  transition: color 0.2s ease;

  &--active {
    color: var(--nav-item-color-active);
  }

  &__icon {
    flex-shrink: 0;
    width: var(--nav-item-icon-size);
    height: var(--nav-item-icon-size);
    color: currentColor;
    stroke-width: var(--stroke-2);
  }

  &__label {
    color: currentColor;
    font-size: var(--text-label-xs-size);
    font-weight: var(--text-label-xs-weight);
    white-space: nowrap;
  }
}
</style>