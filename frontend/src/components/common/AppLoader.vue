<template>
  <div
    v-if="show"
    class="app-loader"
    :class="{ 'app-loader--full': fullPage }"
    role="status"
    aria-live="polite"
    aria-label="در حال بارگذاری"
  >
    <div class="loader"></div>
    <p v-if="text" class="app-loader__text">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: true,
  },
  fullPage: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.app-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-4);

  &--full {
    position: fixed;
    inset: 0;
    z-index: 999;
    background: rgba(255, 255, 255, 0.7);
  }

  &__text {
    margin: 0;
    color: var(--color-neutral-600);
    font-size: var(--text-caption-sm-size);
  }
}

/* لودر کپی‌شده از سایت */
.loader {
  width: 50px;
  aspect-ratio: 1;
  color: #398EB6; /* بعداً با رنگ پروژه عوض کن */
  position: relative;
  animation: l40 0.5s infinite alternate;
}

.loader:before,
.loader:after {
  content: "";
  position: absolute;
  inset: 0;
  background-size: 25px 25px;
  background-position: 0 0, 100% 0, 100% 100%, 0 100%;
  background-repeat: no-repeat;
}

.loader:before {
  background-image:
    radial-gradient(farthest-side at top left, currentColor 96%, #0000),
    radial-gradient(farthest-side at top right, currentColor 96%, #0000),
    radial-gradient(farthest-side at bottom right, currentColor 96%, #0000),
    radial-gradient(farthest-side at bottom left, currentColor 96%, #0000);
  animation: l40-1 1s infinite;
}

.loader:after {
  background-image:
    radial-gradient(farthest-side at top left, #0000 94%, currentColor 96%),
    radial-gradient(farthest-side at top right, #0000 94%, currentColor 96%),
    radial-gradient(farthest-side at bottom right, #0000 94%, currentColor 96%),
    radial-gradient(farthest-side at bottom left, #0000 94%, currentColor 96%);
  animation: l40-2 1s infinite;
}

@keyframes l40-1 {
  0%, 10%, 90%, 100% { inset: 0; }
  40%, 60% { inset: -10px; }
}

@keyframes l40-2 {
  0%, 40% { transform: rotate(0); }
  60%, 100% { transform: rotate(90deg); }
}
</style>