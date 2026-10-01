<template>
    <button
        type="button"
        class="back-btn"
        aria-label="بستن جستجو"
        @click="handleClose"
    >
        <ArrowRight class="back-btn__back-icon" aria-hidden="true" />
    </button>
</template>

<script setup>
import { ArrowRight } from "lucide-vue-next";
import { useRouter } from 'vue-router'

const router = useRouter()

const handleClose = () => {
  router.back()
}

</script>

<style scoped lang="scss">

.back-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: none;
    background: transparent;
    color: var(--color-neutral-800);
    cursor: pointer;
    
    &__back-icon {
      width: var(--icon-lg);
      height: var(--icon-lg);
      stroke-width: var(--stroke-2);
    }

  }

</style>