<template>
  <div
    :class="['banner-slide', className]"
    :style="{ backgroundImage: `url(${image})` }"
    role="img"
    :aria-label="title || alt"
  >
    <div v-if="title || subtitle" class="banner-slide__glass">
      <h2 v-if="title" class="banner-slide__title">{{ title }}</h2>
      <p v-if="subtitle" class="banner-slide__subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },

  alt: {
    type: String,
    default: "بنر تبلیغاتی",
  },

  title: {
    type: String,
    default: "",
  },

  subtitle: {
    type: String,
    default: "",
  },

  className: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
@use "@/styles/mixins" as *;
.banner-slide {
  --banner-slide-padding-block: var(--space-2);
  --banner-slide-padding-inline: var(--space-3);

  --glass-radius: var(--radius-md);
  --glass-padding: var(--space-2);
  --glass-title-color: var(--color-gold-300);
  --glass-subtitle-color: var(--color-neutral-0);

  position: relative;
  display: flex;
  align-items: start;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-block: var(--banner-slide-padding-block);
  padding-inline: var(--banner-slide-padding-inline);
  background-size: cover;
  background-position: center;
  overflow: hidden;

  &__glass {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 100%;
    padding: var(--glass-padding);
    border-radius: var(--glass-radius);
    @include glass;
  }

  &__title {
    margin: 0;
    width: 100%;
    color: var(--glass-title-color);
    font-size: var(--text-label-md-size);
    font-weight: var(--text-label-md-weight);
  }

  &__subtitle {
    margin: 0;
    width: 100%;
    color: var(--glass-subtitle-color);
    font-size: var(--text-caption-sm-size);
    font-weight: var(--text-caption-sm-weight);
  }
}
</style>
