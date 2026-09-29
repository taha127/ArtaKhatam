<template>
  <section
    :class="['items-section', className]"
    :style="sectionStyles"
  >
    <div
      ref="trackRef"
      class="items-section__track"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointerleave="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <slot />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({

    gap: {
    type: [String, Number],
    default: 'var(--space-2)',
  },

  paddingX: {
    type: [String, Number],
    default: 'var(--space-4)',
  },

  paddingY: {
    type: [String, Number],
    default: 'var(--space-2)',
  },

  className: {
    type: String,
    default: '',
  },
})

const trackRef = ref(null)
const isDragging = ref(false)
const startX = ref(0)
const scrollLeftStart = ref(0)

const toCssValue = (value) => {
  if (value === 0 || value === '0') return '0'
  if (typeof value === 'number') return `${value}px`
  return value
}

const sectionStyles = computed(() => ({
  paddingInline: toCssValue(props.paddingX),
  paddingBlock: toCssValue(props.paddingY),
}))


const onPointerDown = (e) => {
  if (!trackRef.value) return

  isDragging.value = true
  startX.value = e.clientX
  scrollLeftStart.value = trackRef.value.scrollLeft

  trackRef.value.setPointerCapture(e.pointerId)
  trackRef.value.style.cursor = 'grabbing'
  trackRef.value.style.userSelect = 'none'
}

const onPointerMove = (e) => {
  if (!isDragging.value || !trackRef.value) return

  e.preventDefault()
  const walk = startX.value - e.clientX
  trackRef.value.scrollLeft = scrollLeftStart.value + walk
}

const onPointerUp = (e) => {
  if (!isDragging.value || !trackRef.value) return

  isDragging.value = false
  trackRef.value.releasePointerCapture?.(e.pointerId)
  trackRef.value.style.cursor = 'grab'
  trackRef.value.style.userSelect = ''
}
</script>

<style scoped lang="scss">
.items-section {
  width: 100%;

  &__track {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: v-bind('toCssValue(gap)');

    overflow-x: auto;
    padding-block: 32px;
    margin-block: -32px;

    padding-inline: 16px;
    margin-inline: -16px;

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    cursor: grab;
    touch-action: pan-y;
    -webkit-overflow-scrolling: touch;

    direction: rtl;
    justify-content: space-evenly;
  }
}
</style>