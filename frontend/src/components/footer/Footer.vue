<template>
  <footer :class="['footer', className]">
    <FooterBrandSummary :text="brandSummaryText" />

    <SupportCard :phone="phone" :address="address">
      <template #map>
        <img v-if="mapImage" :src="mapImage" alt="نقشه آدرس" />
      </template>
    </SupportCard>

    <FooterQuickLinks :links="quickLinks" />

    <FooterBottom :copyright-text="copyrightText" :socials="socials" />
  </footer>
</template>

<script setup>
import FooterBrandSummary from "./FooterBrandSummary.vue";
import SupportCard from "./SupportCard.vue";
import FooterQuickLinks from "./FooterQuickLinks.vue";
import FooterBottom from "./FooterBottom.vue";

defineProps({
  brandSummaryText: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  mapImage: {
    type: String,
    default: "",
  },

  quickLinks: {
    type: Array,
    required: true,
  },

  copyrightText: {
    type: String,
    default: "© ۱۴۰۲ تمامی حقوق محفوظ است.",
  },

  socials: {
    type: Array,
    required: true,
  },

  className: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.footer {
  --footer-bg: var(--color-copper-900);
  --footer-padding-block: var(--space-6);
  --footer-padding-inline: var(--space-4);
  --footer-gap: var(--space-4);

  display: flex;
  flex-direction: column;
  gap: var(--footer-gap);
  width: 100%;
  padding-block: var(--footer-padding-block);
  padding-inline: var(--footer-padding-inline);
  background-color: var(--footer-bg);
}
</style>