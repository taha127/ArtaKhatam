<template>
  <div :class="['product-promo-card', className]">
    <div class="product-promo-card__card">
      <div class="product-promo-card__content">
        <div v-if="title || subtitle" class="product-promo-card__texts">
          <h3 v-if="title" class="product-promo-card__title">
            {{ title }}
          </h3>
          <p v-if="subtitle" class="product-promo-card__subtitle">
            {{ subtitle }}
          </p>
        </div>
      </div>
      <Button
        v-if="buttonText"
        :text="buttonText"
        variant="tertiary"
        outline
        size="small"
        :icon="buttonIcon"
        class="product-promo-card__button"
      />
      <div v-if="image" class="product-promo-card__image-wrapper">
        <img
          :src="image"
          :alt="imageAlt || title || ''"
          class="product-promo-card__image"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "../common/Button.vue";

defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  buttonText: {
    type: String,
    default: "",
  },
  buttonIcon: {
    type: [Object, Function],
    default: null,
  },
  image: {
    type: String,
    default: "",
  },
  imageAlt: {
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
.product-promo-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-inline: var(--space-1);
  height: 300px;

  &__card {
    background-color: var(--color-copper-900);
    border-radius: var(--radius-xl);
    padding: var(--space-3);
    color: var(--color-neutral-0);
    display: flex;
    flex-direction: column;
    border: var(--stroke-2) solid var(--color-neutral-900);
    gap: var(--space-3);
    height: 100%;
  }

  &__content {
    display: flex;
    flex-direction: column;    
  }

  &__texts {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  &__title {
    margin: 0;
    color: var(--color-neutral-0);
    -webkit-text-stroke: var(--stroke-2) #000;
    paint-order: stroke fill;
    font-size: var(--text-h4-size);
    font-weight: var(--text-h4-weight);
  }

  &__subtitle {
    margin: 0;
    color: var(--color-neutral-0);
    font-size: var(--text-body-sm-size);
    font-weight: var(--text-body-sm-weight);
  }

  &__button {
    align-self: flex-start;
  }

  &__image-wrapper {
    position: relative;
    top: -5%;
    display: flex;
    justify-content: end;
    pointer-events: none;
  }

  &__image {
    width: 300px;
    height: auto;
    display: block;
    object-fit: contain;
  }
}
</style>