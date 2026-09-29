<template>
  <section :class="['service-section', className]">
    <slot>
      <ul class="service-section__list">
        <ServiceItem
          v-for="item in items"
          :key="item.text"
          :icon="item.icon"
          :text="item.text"
        />
      </ul>
    </slot>
  </section>
</template>

<script setup>
import ServiceItem from "@/components/home/ServiceItem.vue";

defineProps({
  items: {
    type: Array,
    default: () => [],
  },

  className: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.service-section {
  --service-section-padding-block: var(--space-3);
  --service-section-padding-inline: var(--space-4);

  display: flex;
  width: 100%;
  padding-block: var(--service-section-padding-block);
  padding-inline: var(--service-section-padding-inline);

  &__list {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    justify-items: center;
    gap: var(--space-2);
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }
}
</style>