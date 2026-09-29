<template>
  <a :href="href" :class="['footer-link-item', className]">
    <span class="footer-link-item__dot" aria-hidden="true"></span>
    <span class="footer-link-item__text">{{ text }}</span>
  </a>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },

  href: {
    type: String,
    default: "#",
  },

  className: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.footer-link-item {
  --footer-link-item-dot-color: var(--color-turquoise-700);
  --footer-link-item-text-color: var(--color-gold-300);

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--space-1);
  width: 100%;
  background-color: transparent;
  text-decoration: none;

  &__dot {
    width: 8px;
    height: 8px;
    flex-shrink: 0;
    border-radius: var(--radius-full);
    background-color: var(--footer-link-item-dot-color);
  }

  &__text {
    color: var(--footer-link-item-text-color);
    font-size: var(--text-body-sm-size);
    font-weight: var(--text-body-sm-weight);
    white-space: nowrap;
  }
}
</style>