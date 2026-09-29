<template>
  <div :class="['section-header', className]">
    <span class="section-header__title">
      <span class="section-header__dot" aria-hidden="true"></span>
      <h4>{{ title }}</h4>
    </span>

    <button
      v-if="showViewAll"
      type="button"
      class="section-header__view-all"
      @click="emit('view-all')"
    >
        <span>{{ viewAllText }}</span>
        <ArrowLeft class="section-header__view-all-icon" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup>
import { ArrowLeft } from "lucide-vue-next";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  viewAllText: {
    type: String,
    default: "مشاهده همه",
  },

  showViewAll: {
    type: Boolean,
    default: true,
  },

  className: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["view-all"]);
</script>

<style scoped lang="scss">
.section-header {
  --section-header-padding-inline: var(--space-3);
  --section-header-dot-color: var(--color-turquoise-700);
  --section-header-title-color: var(--color-neutral-900);
  --section-header-view-all-color: var(--color-turquoise-600);

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-inline: var(--section-header-padding-inline);
  background-color: transparent;

  &__title {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--section-header-title-color);
    font-size: var(--text-h4-size);
    font-weight: var(--text-h4-weight);
    white-space: nowrap;
  }

  &__dot {
    width: var(--icon-xs);
    height: var(--icon-xs);
    flex-shrink: 0;
    border-radius: var(--radius-full);
    background-color: var(--section-header-dot-color);
  }

  &__view-all {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    flex-shrink: 0;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--section-header-view-all-color);
    font-size: var(--text-body-sm-size);
    font-weight: var(--text-body-sm-weight);
    white-space: nowrap;
    cursor: pointer;
  }

  &__view-all-icon {
    width: var(--icon-sm);
    height: var(--icon-sm);
    flex-shrink: 0;
    stroke-width: var(--stroke-3);
  }
}
</style>