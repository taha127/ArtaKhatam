<template>
  <div :class="['slider-dots', className]" role="tablist" :aria-label="ariaLabel">
    <button
      v-for="index in count"
      :key="index"
      type="button"
      class="slider-dots__dot"
      :class="{ 'slider-dots__dot--active': index - 1 === activeIndex }"
      role="tab"
      :aria-selected="index - 1 === activeIndex"
      :aria-label="`اسلاید ${index}`"
      @click="emit('select', index - 1)"
    />
  </div>
</template>

<script setup>
defineProps({
  count: {
    type: Number,
    required: true,
  },

  activeIndex: {
    type: Number,
    default: 0,
  },

  ariaLabel: {
    type: String,
    default: "ناوبری اسلایدر",
  },

  className: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["select"]);
</script>

<style scoped lang="scss">
.slider-dots {
  --slider-dots-width: 120px;
  --slider-dots-height: 18px;
  --slider-dots-padding-y: var(--space-2);
  --slider-dots-padding-x: var(--space-5);
  --slider-dots-radius: 8px;
  --slider-dots-dot-size: 4px;
  --slider-dots-dot-inactive: rgb(255 255 255 / 75%);
  --slider-dots-dot-active: rgb(94 234 212 / 75%);

  display: flex;
  align-items: center;
  gap: var(--space-5);
  justify-content: center;
  width: fit-content;
  height: var(--slider-dots-height);
  padding: var(--slider-dots-padding-y) var(--slider-dots-padding-x);
  border-radius: var(--slider-dots-radius);
  border: 1px solid rgb(255 255 255 / 25%);
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  box-shadow: 
    inset 1px 0 0 0 rgba(255, 255, 255, 0.5),
    inset 1px 0 0 0 rgba(255, 255, 255, 0.5),
    inset -1px 0 0 0 rgba(255, 255, 255, 0.5),
    inset -1px 0 1px 0 rgba(255, 255, 255, 0.5);

  &__dot {
    width: var(--slider-dots-dot-size);
    height: var(--slider-dots-dot-size);
    flex-shrink: 0;
    padding: 0;
    border: none;
    border-radius: var(--radius-full);
    background-color: var(--slider-dots-dot-inactive);
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;

    &--active {
      background-color: var(--slider-dots-dot-active);
      transform: scale(1.2);
    }
  }
}
</style>
