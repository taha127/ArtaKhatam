<template>
  <section :class="['search-section', className]">
    <div class="search-section__head">
      <h3 class="search-section__title">
        {{ title }}
      </h3>
      <component
        :is="icon"
        v-if="icon"
        class="search-section__icon"
        aria-hidden="true"
      />
    </div>
    <div class="search-section__content">
      <slot />
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: [Object, Function],
    default: null,
  },
  className: {
    type: String,
    default: '',
  },
})
</script>

<style scoped lang="scss">
.search-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: var(--space-2);

  padding-inline: var(--space-3);
  padding-top: var(--space-1);
  padding-bottom: var(--space-2);

  &__head {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--space-1);
    width: 100%;
  }

  &__icon {
    width: var(--icon-lg);
    height: var(--icon-lg);
    flex-shrink: 0;
    color: var(--color-neutral-900);
    stroke-width: var(--stroke-2);
  }

  &__title {
    margin: 0;
    color: var(--color-neutral-900);
    font-size: (--text-body-sm-size);
    font-weight: (--text-body-sm-weight);
  }

  &__content {
    width: 100%;
  }
}
</style>