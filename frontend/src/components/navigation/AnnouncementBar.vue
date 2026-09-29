<template>
  <div
    v-if="messages.length"
    :class="['announcement-bar', className]"
    role="status"
    aria-live="polite"
  >
    <Transition name="announcement-fade" mode="out-in">
      <p :key="currentIndex" class="announcement-bar__text">
        {{ messages[currentIndex] }}
      </p>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  messages: {
    type: Array,
    default: () => [],
  },

  interval: {
    type: Number,
    default: 4000,
  },

  className: {
    type: String,
    default: "",
  },
});

const currentIndex = ref(0);
let timer = null;

const startCycle = () => {
  stopCycle();

  if (props.messages.length < 2) return;

  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.messages.length;
  }, props.interval);
};

const stopCycle = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

watch(
  () => [props.messages, props.interval],
  () => {
    currentIndex.value = 0;
    startCycle();
  },
);

onMounted(startCycle);
onUnmounted(stopCycle);
</script>

<style scoped lang="scss">
.announcement-bar {
  --announcement-bar-bg: var(--color-copper-900);
  --announcement-bar-color: var(--color-gold-200);
  --announcement-bar-padding-block: var(--space-4);
  --announcement-bar-padding-inline: var(--space-2);
  --announcement-bar-min-height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 200;
  width: 100%;
  height: var(--announcement-bar-min-height);
  padding-block: var(--announcement-bar-padding-block);
  padding-inline: var(--announcement-bar-padding-inline);
  overflow: hidden;
  background-color: var(--announcement-bar-bg);

  &__text {
    margin: 0;
    color: var(--announcement-bar-color);
    font-size: var(--text-caption-sm-size);
    font-weight: var(--text-caption-sm-weight);
    text-align: center;
    white-space: nowrap;
  }
}

.announcement-fade-enter-active,
.announcement-fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
  position: absolute;
  inset-inline: 0;
}

.announcement-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.announcement-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>