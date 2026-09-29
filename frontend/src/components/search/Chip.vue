<template>
  <div :class="['chip-group', className]">
    <button
      v-for="(item, index) in items"
      :key="index"
      type="button"
      class="chip"
      @click="$emit('select', item)"
    >
      {{ item }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
})

defineEmits(['select'])
</script>

<style scoped lang="scss">
.chip-group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  gap: var(--space-2) var(--space-3);

  width: 100%;
  padding-left: var(--space-10);
}

.chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
  height: auto;
  padding: var(--space-2);

  border: 1px solid var(--color-turquoise-700);
  border-radius: var(--radius-2xl);

  background-color: transparent;
  color: var(--color-turquoise-700);

  cursor: pointer;
  white-space: nowrap;

  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: var(--color-turquoise-50);
  }
}
</style>