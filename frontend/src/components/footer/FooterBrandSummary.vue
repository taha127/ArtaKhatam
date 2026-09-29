<template>
  <div :class="['footer-brand-summary', className]">
    <div class="footer-brand-summary__brand">
        <span class="footer-brand-summary__dot" aria-hidden="true"></span>
      <h2 class="footer-brand-summary__name">{{ brandName }}</h2>
    </div>

    <p class="footer-brand-summary__text">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  brandName: {
    type: String,
    default: "آرتا",
  },

  text: {
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
.footer-brand-summary {
  --footer-brand-summary-gap: var(--space-4);
  --footer-brand-summary-brand-gap: var(--space-2);
  --footer-brand-summary-dot-size: var(--icon-xs);
  --footer-brand-summary-name-color: var(--color-gold-300);
  --footer-brand-summary-dot-color: var(--color-turquoise-700);
  --footer-brand-summary-text-color: var(--color-neutral-300);

  display: flex;
  flex-direction: column;
  gap: var(--footer-brand-summary-gap);
  width: 100%;

  &__brand {
    display: flex;
    align-items: center;
    gap: var(--footer-brand-summary-brand-gap);
    width: 100%;
  }

  &__name {
    font-family: var(--font-nastaliq);
    font-size: var(--text-nastaliq-md-size);
    font-weight: var(--text-nastaliq-md-weight);
    line-height: var(--text-nastaliq-md-line-height);
    color: var(--footer-brand-summary-name-color);
    transform: translateY(5px);
  }

  &__dot {
    width: var(--footer-brand-summary-dot-size);
    height: var(--footer-brand-summary-dot-size);
    flex-shrink: 0;
    border-radius: var(--radius-full);
    background-color: var(--footer-brand-summary-dot-color);
  }

  &__text {
    margin: 0;
    width: 100%;
    color: var(--footer-brand-summary-text-color);
    font-size: var(--text-caption-md-size);
    font-weight: var(--text-caption-md-weight);
    line-height: var(--text-caption-md-line-height);
  }
}
</style>