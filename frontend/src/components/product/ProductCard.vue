<template>
  <article
    :class="['product-card', className]"
  >
    <ProductImage
      class="product-card__image"
      size="medium"
      :src="image"
      :alt="imageAlt || title"
      @favorite-change="emit('favorite-change', $event)"
    />

    <div class="product-card__body">
      <!-- Title -->
      <h3 class="product-card__title">{{ title }}</h3>
      <div class="product-card__price-group">
          <!-- Discount + Old price -->
          <div v-if="discountPercent" class="product-card__discount-row">
            <span v-if="discountPercent" class="product-card__badge">
              {{ formattedDiscount }}
            </span>
    
            <del v-if="oldPrice" class="product-card__old-price">
              {{ formattedOldPrice }}
            </del>
          </div>
      </div>

      <!-- Final price -->
      <p class="product-card__price">
        <span class="product-card__price-value">{{ formattedPrice }}</span>
        <span class="product-card__price-currency">{{ currency }}</span>
      </p>
    </div>
  </article>
</template>

<script setup>
import { computed } from "vue";
import ProductImage from "./ProductImage.vue";

const props = defineProps({
  image: {
    type: String,
    required: true,
  },

  imageAlt: {
    type: String,
    default: "",
  },

  title: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  oldPrice: {
    type: Number,
    default: null,
  },

  discount: {
    type: Number,
    default: null,
  },

  currency: {
    type: String,
    default: "تومان",
  },

  className: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["favorite-change"]);

/* ---------- Helpers ---------- */

const formatNumber = (value) =>
  new Intl.NumberFormat("fa-IR", { useGrouping: true })
    .format(value)
    .replace(/[٬،]/g, ",");

/* ---------- Computed ---------- */

const discountPercent = computed(() => {
  if (props.discount !== null) return props.discount;

  if (props.oldPrice && props.oldPrice > props.price) {
    return Math.round(((props.oldPrice - props.price) / props.oldPrice) * 100);
  }

  return 0;
});

const formattedPrice = computed(() => formatNumber(props.price));
const formattedOldPrice = computed(() => formatNumber(props.oldPrice));
const formattedDiscount = computed(
  () => `${formatNumber(discountPercent.value)}٪`,
);
</script>

<style scoped lang="scss">
.product-card {
  --product-card-width: 160px;
  --product-card-height: 280px;
  --product-card-padding: var(--space-2);
  --product-card-radius: var(--radius-xl);
  --product-card-bg: var(--color-neutral-50);
  --product-card-shadow: var(--shadow-xl);

  --product-card-title-color: var(--color-neutral-900);
  --product-card-old-price-color: var(--color-neutral-500);
  --product-card-price-color: var(--color-copper-800);
  --product-card-currency-color: var(--color-neutral-600);

  --product-card-badge-bg: var(--color-red-500, #f43f3f);
  --product-card-badge-color: var(--color-neutral-0);

  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  flex-shrink: 0;
  box-sizing: border-box;
  cursor: pointer;
  width: var(--product-card-width);
  height: var(--product-card-height);
  padding: var(--product-card-padding);
  border-radius: var(--product-card-radius);
  background-color: var(--product-card-bg);
  box-shadow: var(--product-card-shadow);
}

.product-card__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  gap: var(--space-1);
  min-width: 0;
  text-align: start;
}

.product-card__title {
  color: var(--product-card-title-color);
  font-size: var(--text-label-sm-size);
  font-weight: var(--text-label-sm-weight);
  line-height: var(--text-label-sm-line-height);
  margin: 0;
  flex-shrink: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  overflow-wrap: anywhere;
}

.product-card__price-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    flex-shrink: 0;
    margin-top: auto;
}

.product-card__discount-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  height: 24px;
}

.product-card__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  padding-inline: var(--space-2);
  border-radius: var(--radius-full);
  background-color: var(--product-card-badge-bg);
  color: var(--product-card-badge-color);
  font-size: var(--text-caption-md-size);
  font-weight: var(--text-caption-md-weight);
  line-height: var(--text-caption-md-line-height);
}

.product-card__old-price {
  color: var(--product-card-old-price-color);
  font-size: var(--text-body-sm-size);
  line-height: var(--text-body-sm-line-height);
  text-decoration: line-through;
}

.product-card__price {
  display: flex;
  align-items: baseline;
  gap: var(--space-1);
  height: 28px;
  margin: 0;
  white-space: nowrap;
}

.product-card__price-value {
  color: var(--product-card-price-color);
  font-size: var(--text-h4-size);
  font-weight: var(--text-h4-weight);
  line-height: var(--text-h4-line-height);
}

.product-card__price-currency {
  color: var(--product-card-currency-color);
  font-size: var(--text-body-sm-size);
  line-height: var(--text-body-sm-line-height);
}
</style>