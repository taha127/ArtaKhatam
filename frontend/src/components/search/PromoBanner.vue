<template>
  <div :class="['promo-banner', className]">
    <a
      v-if="href"
      :href="href"
      class="promo-banner__link"
      :aria-label="alt || 'بنر تبلیغاتی'"
    >
      <img
        :src="image"
        :alt="alt"
        class="promo-banner__image"
      />
    </a>

    <button
      v-else
      type="button"
      class="promo-banner__link"
      :aria-label="alt || 'بنر تبلیغاتی'"
      @click="$emit('click')"
    >
      <img
        :src="image"
        :alt="alt"
        class="promo-banner__image"
      />
    </button>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  href: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: '',
  },
})

defineEmits(['click'])
</script>

<style scoped lang="scss">
.promo-banner {
  width: 100%;
  padding-inline: var(--space-2);
  margin-bottom: var(--space-10);
  &__link {
    display: block;
    width: 100%;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: var(--radius-xl);
    overflow: hidden;
  }

  &__image {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 374 / 204;
    object-fit: cover;
    border-radius: var(--radius-xl);
  }
}
</style>