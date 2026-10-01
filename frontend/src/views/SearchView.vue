<template>
  <div class="search-view">
    <!-- Head -->
    <div class="search-view__head">
      <button
        type="button"
        class="search-view__back-btn"
        aria-label="بستن جستجو"
        @click="handleClose"
      >
        <ArrowRight class="search-view__back-icon" aria-hidden="true" />
      </button>

      <Input
        variant="search"
        placeholder="جستجو در همه آثار"
        class="search-view__input"
        v-model="searchQuery"
      />
    </div>

    <!-- Body: Chipها اینجا هستند -->
    <div class="search-view__body">
      <SearchSection title="جستجوهای پرطرفدار" :icon="TrendingUp">
        <Chip :items="popularSearches" @select="onChipSelect" />
      </SearchSection>

      <SearchSection title="جستجو بر اساس" :icon="Funnel">
        <Chip :items="basedSearches" @select="onChipSelect" />
      </SearchSection>

      <SearchSection title="جستجو روی انواع آثار" :icon="PackageSearch">
        <Chip :items="typeSearches" @select="onChipSelect" />
      </SearchSection>

      <PromoBanner
        image="src/assets/images/set-khatam.jpeg"
        alt="تخفیف ویژه"
        @click="handleBannerClick"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Input from '@/components/common/Input.vue'
import SearchSection from '@/components/search/SearchSection.vue'
import Chip from '@/components/search/Chip.vue'
import PromoBanner from '@/components/search/PromoBanner.vue'
import { ArrowRight, TrendingUp, Funnel, PackageSearch } from 'lucide-vue-next'

const router = useRouter()
const searchQuery = ref('')

const popularSearches = [
  'قلمزنی و خاتم',
  'جام مینیاتوری',
  'گلدان خاتم',
  'جعبه خاتم',
  'قندان فیروزه‌کوبی',
]

const basedSearches = [
  'ارزان‌ترین',
  'محبوب‌ترین',
  'جدیدترین',
  'گران‌ترین',
  'قابل سفارش دادن',
  'پرفروش‌ترین',
  'موجود',
  'تخفیف‌دار',
]

const typeSearches = [
  'شیرینی‌خوری',
  'سینی',
  'گلدان',
  'شمعدان',
  'ست‌های تزئینی',
  'جام و ظروف',
]

const handleClose = () => {
  router.back()
}

const onChipSelect = (item) => {
  console.log('selected:', item)
  searchQuery.value = item
}

const handleBannerClick = () => {
  console.log('banner clicked')
}
</script>

<style scoped lang="scss">
.search-view {
  &__head {
    display: flex;
    flex-direction: row;
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

</style>