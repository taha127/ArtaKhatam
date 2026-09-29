<template>
  <section
    :class="['common-section', className]"
    :style="sectionStyles"
  >
    <slot />
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({

  gap: {
    type: [String, Number],
    default: 0,
  },

  paddingY: {
    type: [String, Number],
    default: 'var(--space-2)',
  },

  paddingX: {
    type: [String, Number],
    default: 0,
  },

  className: {
    type: String,
    default: '',
  },
})

const sectionStyles = computed(() => {
  const toCssValue = (value) => {
    if (value === 0 || value === '0') return '0'
    if (typeof value === 'number') return `${value}px`
    return value
  }

  return {
    gap: toCssValue(props.gap),
    paddingBlock: toCssValue(props.paddingY),
    paddingInline: toCssValue(props.paddingX),
  }
})
</script>

<style scoped lang="scss">
.common-section {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>