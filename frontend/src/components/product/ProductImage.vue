<template>
  <div
    :class="[
      'product-image',
      `product-image--${size}`,
      className,
    ]"
  >
    <!-- Product Image -->
    <img
        class="product-image__img"
        :src="src"
        :alt="alt"
    />

    <!-- Favorite Button -->
    <button
        v-if="showFavorite"
        type="button"
        class="product-image__favorite"
        :class="{
          'product-image__favorite--active': favorite,
        }"
        :aria-label="favorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'"
        :aria-pressed="favorite"
        @click="toggleFavorite"
    >
        <Heart
            class="product-image__heart"
            :fill="favorite ? 'currentColor' : 'none'"
            aria-hidden="true"
        />
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Heart } from "lucide-vue-next";

defineProps({
    src: {
        type: String,
        required: true,
    },

    alt: {
        type: String,
        default: "تصویر محصول",
    },

    size: {
        type: String,
        default: "medium",
        validator: (value) =>
          ["small", "medium", "large"].includes(value),
    },

    showFavorite: {
        type: Boolean,
        default: true,
    },

    className: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["favorite-change"]);

const favorite = ref(false);

const toggleFavorite = () => {
    favorite.value = !favorite.value;
    emit("favorite-change", favorite.value);
};
</script>

<style scoped lang="scss">
.product-image {
    --product-image-width: 100%;
    --product-image-height: 150px;  
    --product-image-radius: var(--radius-lg);   
    --product-image-favorite-size: 28px;
    --product-image-favorite-icon-size: var(--icon-sm); 
    --product-image-favorite-bg: var(--color-neutral-50);
    --product-image-favorite-color: var(--color-neutral-700);
    --product-image-favorite-active: var(--color-copper-600);   
    position: relative; 
    width: var(--product-image-width);
    height: var(--product-image-height);   
    flex-shrink: 0; 
    overflow: hidden;  
    cursor: pointer; 
    border-radius: var(--product-image-radius); 
    background-color: var(--color-neutral-100);
}

.product-image__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.product-image__favorite {
    position: absolute;
    top: var(--space-2);
    inset-inline-end: var(--space-2);
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--product-image-favorite-size);
    height: var(--product-image-favorite-size);
    padding: 0;
    border: none;
    border-radius: var(--radius-full);
    background-color: var(--product-image-favorite-bg);
    color: var(--product-image-favorite-color);
    cursor: pointer;
    transition:
        color 0.2s ease,
        background-color 0.2s ease,
        transform 0.2s ease;
    &:hover {
        transform: scale(1.05);
    }   
    &:focus-visible {
        outline: var(--stroke-2) solid var(--color-turquoise-700);
        outline-offset: 2px;
    }   
    &--active {
        color: var(--product-image-favorite-active);
    }
}

.product-image__heart {
    width: var(--product-image-favorite-icon-size);
    height: var(--product-image-favorite-icon-size);
    stroke-width: var(--stroke-2);
}

.product-image--small {
    --product-image-width: 116px;
    --product-image-height: 120px;
}

.product-image--medium {
    --product-image-width: 144px;
    --product-image-height: 150px;
}

.product-image--large {
    --product-image-width: 100%;
    --product-image-height: 240px;
}
</style>
