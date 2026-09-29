<template>
  <div :class="['category-item', className]">
    <div class="category-item__image-wrap">
      <img
        class="category-item__image"
        :src="image"
        :alt="title"
      />
    </div>

    <h2 class="category-item__title">{{ title }}</h2>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  className: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.category-item {
  --category-item-height: 96px;
  --category-item-gap: var(--space-2);
  --category-item-image-size: 68px;
  --category-item-border-color: var(--color-copper-700);
  --category-item-border-width: var(--stroke-2);
  --category-item-shadow: var(--shadow-2xl);
  --category-item-title-color: var(--color-neutral-800);

  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  height: var(--category-item-height);
  gap: var(--category-item-gap);
  background-color: transparent;

  &__image-wrap {
    flex-shrink: 0;
    width: var(--category-item-image-size);
    height: var(--category-item-image-size);
    border-radius: var(--radius-full);
    border: var(--category-item-border-width) solid var(--category-item-border-color);
    box-shadow: var(--category-item-shadow);
    overflow: hidden;
  }

  &__image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__title {
    width: fit-content;
    max-width: 100%;
    color: var(--category-item-title-color);
    font-size: var(--text-label-md-size);
    font-weight: var(--text-label-md-weight);
    line-height: var(--text-label-md-line-height);
    white-space: nowrap;
    text-align: center;
  }
}
</style>