<template>
  <div v-if="slides.length" ref="containerRef" :class="['hero-banner', className]">
    <div
      class="hero-banner__track"
      :style="trackStyle"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @transitionend="onTransitionEnd"
    >
      <div
        v-for="(slide, index) in extendedSlides"
        :key="index"
        class="hero-banner__slide"
      >
        <BannerSlide
          :image="slide.image"
          :title="slide.title"
          :subtitle="slide.subtitle"
          :alt="slide.alt"
        />
      </div>
    </div>

    <SliderDots
      v-if="slides.length > 1"
      class="hero-banner__dots"
      :count="slides.length"
      :active-index="activeIndex"
      @select="goTo"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import BannerSlide from "./BannerSlide.vue";
import SliderDots from "../common/SliderDots.vue";

const props = defineProps({
  slides: {
    type: Array,
    required: true,
  },

  autoplayInterval: {
    type: Number,
    default: 5000,
  },

  swipeThreshold: {
    type: Number,
    default: 0.15,
  },

  className: {
    type: String,
    default: "",
  },
});

const containerRef = ref(null);
const containerWidth = ref(0);
const isAnimating = ref(false);

const N = computed(() => props.slides.length);

const extendedSlides = computed(() => {
  if (N.value < 2) return props.slides;
  return [props.slides[N.value - 1], ...props.slides, props.slides[0]];
});

const extendedIndex = ref(N.value > 1 ? 1 : 0);

const activeIndex = computed(() => {
  if (N.value < 2) return 0;
  if (extendedIndex.value === 0) return N.value - 1;
  if (extendedIndex.value === N.value + 1) return 0;
  return extendedIndex.value - 1;
});

const isDragging = ref(false);
const isJumping = ref(false);
const dragOffset = ref(0);


let timer = null;
let resizeObserver = null;
let startX = 0;

const restTranslate = computed(() => -extendedIndex.value * containerWidth.value);

const translateX = computed(() =>
  isDragging.value ? restTranslate.value + dragOffset.value : restTranslate.value,
);

const trackStyle = computed(() => {
  if (!containerWidth.value) {
    return { transform: 'translateX(0)', transition: 'none' }
  }

  return {
    transform: `translateX(${translateX.value}px)`,
    transition:
      isDragging.value || isJumping.value
        ? 'none'
        : 'transform 0.5s cubic-bezier(1, 0.2, 0.1, 0.1)',
  }
})

const measure = () => {
  if (!containerRef.value) return
  const w = containerRef.value.offsetWidth
  if (w > 0) containerWidth.value = w
}

const goTo = (index) => {
  if (isAnimating.value || N.value < 2) return
  isAnimating.value = true
  extendedIndex.value = index + 1
  restartAutoplay()
}

const next = () => {
  if (isAnimating.value || N.value < 2) return
  isAnimating.value = true
  extendedIndex.value += 1
}

const prev = () => {
  if (isAnimating.value || N.value < 2) return
  isAnimating.value = true
  extendedIndex.value -= 1
}

const jumpTo = (targetExtendedIndex) => {
  isJumping.value = true
  extendedIndex.value = targetExtendedIndex

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      isJumping.value = false
      isAnimating.value = false
    })
  })
}

const onTransitionEnd = (event) => {
  if (event.propertyName !== 'transform') return
  if (event.target !== event.currentTarget) return

  if (extendedIndex.value <= 0) {
    jumpTo(N.value)
  } else if (extendedIndex.value >= N.value + 1) {
    jumpTo(1)
  } else {
    isAnimating.value = false
  }
}

const startAutoplay = () => {
  stopAutoplay();

  if (N.value < 2 || !props.autoplayInterval) return;

  timer = setInterval(next, props.autoplayInterval);
};

const stopAutoplay = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

const restartAutoplay = () => {
  startAutoplay();
};

/* -------------------- Drag / Swipe (mouse + touch) -------------------- */

const onPointerDown = (event) => {
  if (N.value < 2) return;

  isDragging.value = true;
  startX = event.clientX;
  dragOffset.value = 0;
  event.currentTarget.setPointerCapture(event.pointerId);

  stopAutoplay();
};

const onPointerMove = (event) => {
  if (!isDragging.value) return;

  const raw = event.clientX - startX;
  dragOffset.value = Math.max(-containerWidth.value, Math.min(containerWidth.value, raw));
};

const onPointerUp = () => {
  if (!isDragging.value) return;

  isDragging.value = false;

  const dragged = dragOffset.value;
  const threshold = containerWidth.value * props.swipeThreshold;

  if (dragged <= -threshold) {
    next();
  } else if (dragged >= threshold) {
    prev();
  }

  dragOffset.value = 0;
  restartAutoplay();
};

watch(
  () => props.slides,
  () => {
    extendedIndex.value = N.value > 1 ? 1 : 0;
    nextTick(measure);
    startAutoplay();
  },
);

const onVisibilityChange = () => {
  if (document.hidden) {
    stopAutoplay()
  } else {
    nextTick(() => {
      measure()
      if (extendedIndex.value <= 0) jumpTo(N.value)
      else if (extendedIndex.value >= N.value + 1) jumpTo(1)
      startAutoplay()
    })
  }
}

onMounted(() => {
  measure();
  startAutoplay();

  resizeObserver = new ResizeObserver(measure);
  if (containerRef.value) resizeObserver.observe(containerRef.value)
  document.addEventListener('visibilitychange', onVisibilityChange)
});

onUnmounted(() => {
  stopAutoplay();
  resizeObserver?.disconnect();
  document.removeEventListener('visibilitychange', onVisibilityChange)
});
</script>

<style scoped lang="scss">
.hero-banner {
  position: relative;
  width: 100%;
  overflow: hidden;
  height: fit-content;

  &__track {
    display: flex;
    width: 100%;
    height: 100%;
    aspect-ratio: 39 / 22;
    max-height: 480px;
    direction: ltr;
    touch-action: pan-y;
    cursor: grab;
    user-select: none;

    &:active {
      cursor: grabbing;
    }
  }

  &__slide {
    flex: 0 0 100%;
    min-width: 0;
    direction: rtl;
  }

  &__dots {
    position: absolute;
    bottom: var(--space-2);
    inset-inline: 0;
    margin-inline: auto;
  }
}
</style>