<template>
  <nav :class="['footer-quick-links', className]">
    <FooterLinkItem
      v-for="link in links"
      :key="link.text"
      :text="link.text"
      :href="link.href"
    />
  </nav>
</template>

<script setup>
import FooterLinkItem from "./FooterLinkItem.vue";

defineProps({
  // [{ text: 'محصولات جدید', href: '/new' }, ...]
  links: {
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
.footer-quick-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  width: 100%;
}
</style>