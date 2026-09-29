<template>
  <div :class="['search-overlay', className]">
    <!-- Head -->
    <div class="search-overlay__head">

        <button
        type="button"
        class="search-overlay__back-btn"
        aria-label="بستن جستجو"
        @click="handleClose"
      >
        <ArrowRight class="search-overlay__back-icon" aria-hidden="true" />
      </button>

      <Input
        variant="search"
        placeholder="جستجو در همه آثار"
        class="search-overlay__input"
        v-model="searchQuery"
      />
    </div>
    <div class="search-overlay__body">
      <slot />
      <PromoBanner
        image="src\assets\images\set-khatam.jpeg"
        alt="تخفیف ویژه"
        @click="handleBannerClick"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Input from '@/components/common/Input.vue'
import PromoBanner from '@/components/search/PromoBanner.vue'
import { ArrowRight } from 'lucide-vue-next'

defineProps({
  className: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['close'])

const searchQuery = ref('')

const handleClose = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
.search-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background-color: var(--color-background);
  color: var(--color-neutral-900);
  direction: rtl;
  font-family: var(--font-family);
  overflow-y: auto;

  &__head {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    width: 100%;
    padding: var(--space-3);
  }

  &__back-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: var(--space-1);
    border: none;
    background: transparent;
    color: var(--color-neutral-800);
    cursor: pointer;
  }

  &__back-icon {
    width: var(--icon-lg);
    height: var(--icon-lg);
    stroke-width: var(--stroke-2);
  }

  &__input {
    flex: 1;
    min-width: 0;
  }
}

.search-overlay-enter-active {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.3s ease;
}

.search-overlay-leave-active {
  transition: transform 0.5s cubic-bezier(0.4, 0, 1, 1),
              opacity 0.25s ease;
}

.search-overlay-enter-from,
.search-overlay-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.search-overlay-enter-to,
.search-overlay-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>