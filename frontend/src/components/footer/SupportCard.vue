<template>
  <section :class="['support-card', className]">
    <h3 class="support-card__header">{{ title }}</h3>

    <div class="support-card__body">
      <InfoRow :icon="Phone" title="شماره تماس پشتیبانی:" :text="phone"/>

      <InfoRow :icon="MapPin" title="آدرس:" :text="address">
        <div class="support-card__map">
            <slot name="map" />
        </div>
      </InfoRow>
    </div>
  </section>
</template>

<script setup>
import { Phone, MapPin } from "lucide-vue-next";
import InfoRow from "../common/InfoRow.vue";

defineProps({
  title: {
    type: String,
    default: "آدرس و پشتیبانی",
  },

  phone: {
    type: String,
    required: true,
  },

  address: {
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
.support-card {
  --support-card-bg: var(--color-turquoise-800);
  --support-card-border: var(--color-gold-600);
  --support-card-header-bg: var(--color-turquoise-800);
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: transparent;

  &__header {
    margin: 0;
    width: fit-content;
    padding: var(--space-2) var(--space-3);
    background-color: var(--support-card-header-bg);
    border-top: var(--stroke-3) solid var(--support-card-border);
    align-self: center;
    color: var(--color-gold-300);
    font-size: var(--text-h6-size);
    font-weight: var(--text-h6-weight);
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    text-align: center;
  }

  &__body {
    display: flex;
    flex-direction: column;
    background-color: var(--support-card-bg);
    border: var(--stroke-2) solid var(--support-card-border);
    border-radius: var(--radius-md);
    gap: var(--space-3);
    padding: var(--space-3) var(--space-2);
    box-shadow: var(--shadow-out-gold);
  }

  &__map {
    width: 100%;
    aspect-ratio: 300 / 88;
    max-height: 150px;
    overflow: hidden;
    border-radius: var(--radius-md);
    border: var(--stroke-2) solid var(--color-gold-600);
  
    :deep(img) {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>