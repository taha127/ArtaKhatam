<template>
  <article :class="['article-card', className]">
    <div class="article-card__image-wrap">
      <img
        class="article-card__image"
        :src="image"
        :alt="title"
      />
    </div>

    <div class="article-card__content">
      <h3 class="article-card__title">{{ title }}</h3>

      <p class="article-card__summary">{{ summary }}</p>

      <div class="article-card__footer">
            
            <button
                type="button"
                class="article-card__read-more"
                @click="emit('read-more')"
                >
                <span>بیشتر بخوانید</span>
                <ArrowLeft class="article-card__read-more-icon" aria-hidden="true" />
            </button>

            <span class="article-card__date">{{ date }}</span>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ArrowLeft } from "lucide-vue-next";

defineProps({
  image: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  summary: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  className: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["read-more"]);
</script>

<style scoped lang="scss">
.article-card {
  --article-card-width: 236px;
  --article-card-height: 300px;
  --article-card-padding: var(--space-2);
  --article-card-gap: var(--space-2);
  --article-card-bg: var(--color-neutral-0);
  --article-card-shadow: var(--shadow-xl);
  --article-card-radius-top: 36px;
  --article-card-radius-bottom: var(--radius-sm);

  --article-card-image-height: 136px;
  --article-card-title-height: 40px;
  --article-card-title-color: var(--color-copper-800);
  --article-card-summary-color: var(--color-neutral-700);
  --article-card-footer-height: 24px;
  --article-card-date-color: var(--color-neutral-700);
  --article-card-read-more-color: var(--color-turquoise-500);

  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  box-sizing: border-box;
  width: var(--article-card-width);
  height: var(--article-card-height);
  padding: var(--article-card-padding);
  gap: var(--article-card-gap);
  background-color: var(--article-card-bg);
  box-shadow: var(--article-card-shadow);
  border-radius:
    var(--article-card-radius-top)
    var(--article-card-radius-top)
    var(--article-card-radius-bottom)
    var(--article-card-radius-bottom);

  &__image-wrap {
    flex-shrink: 0;
    width: 100%;
    height: var(--article-card-image-height);
    overflow: hidden;
    border-radius:
      var(--article-card-radius-top)
      var(--article-card-radius-top)
      var(--article-card-radius-bottom)
      var(--article-card-radius-bottom);
  }

  &__image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__content {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    width: 100%;
    gap: var(--space-1);
  }

  &__title {
    flex-shrink: 0;
    margin: 0;
    width: 100%;
    color: var(--article-card-title-color);
    font-size: var(--text-label-md-size);
    font-weight: var(--text-label-md-weight);

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
    overflow-wrap: anywhere;
  }

  &__summary {
    flex-shrink: 0;
    margin: 0;
    width: 100%;
    color: var(--article-card-summary-color);
    font-size: var(--text-body-xs-size);
    font-weight: var(--text-body-xs-weight);
    line-height: var(--text-body-xs-line-height);

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    overflow: hidden;
    overflow-wrap: anywhere;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    height: var(--article-card-footer-height);
    width: 100%;
    margin-top: auto;
  }

  &__date {
    color: var(--article-card-date-color);
    font-size: var(--text-caption-sm-size);
    font-weight: var(--text-caption-sm-weight);
    white-space: nowrap;
  }

  &__read-more {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    flex-shrink: 0;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--article-card-read-more-color);
    font-size: var(--text-body-sm-size);
    font-weight: var(--text-body-sm-weight);
    white-space: nowrap;
    cursor: pointer;
  }

  &__read-more-icon {
    width: var(--icon-sm);
    height: var(--icon-sm);
    flex-shrink: 0;
    stroke-width: var(--stroke-3);
  }
}
</style>