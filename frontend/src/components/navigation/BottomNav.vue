<template>
  <nav :class="['bottom-nav', className]">
    <NavItem
      v-for="tab in tabs"
      :key="tab.id"
      :icon="tab.icon"
      :label="tab.label"
      :active="modelValue === tab.id"
      @click="handleSelect(tab.id)"
    />
  </nav>
</template>

<script setup>
import NavItem from "./NavItem.vue";

const props = defineProps({

    tabs: {
    type: Array,
    required: true,
  },

  modelValue: {
    type: String,
    default: "",
  },

  className: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const handleSelect = (id) => {
  emit("update:modelValue", id);
};
</script>

<style scoped lang="scss">
.bottom-nav {
  --bottom-nav-height: 64px;
  --bottom-nav-padding-inline: var(--space-3);
  --bottom-nav-bg: var(--color-neutral-50);

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-top: var(--stroke-1) solid var(--color-turquoise-300);
  width: 100%;
  height: var(--bottom-nav-height);
  padding-inline: var(--bottom-nav-padding-inline);
  background-color: var(--bottom-nav-bg);
}
</style>