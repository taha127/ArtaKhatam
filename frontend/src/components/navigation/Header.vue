<template>
  <header :class="['header', className]">
    <div class="header__row">
      <button
        type="button"
        class="header__icon-btn"
        :aria-label="isMenuOpen ? 'بستن منو' : 'منو'"
        @click="$emit('toggle-menu')"
      >
        <Transition name="icon-fade" mode="out-in">
          <X
            v-if="isMenuOpen"
            key="close"
            class="header__icon header__icon--menu"
            aria-hidden="true"
          />
          <Menu
            v-else
            key="menu"
            class="header__icon header__icon--menu"
            aria-hidden="true"
          />
        </Transition>
      </button>

      <span class="header__brand">
        <span class="header__brand-dot" aria-hidden="true"></span>
        <h1 class="header__brand-text">Arta</h1>
      </span>
    </div>

    <button
      type="button"
      class="header__icon-btn"
      aria-label="اعلان‌ها"
    >
      <Bell class="header__icon header__icon--bell" aria-hidden="true" />
    </button>

    <div class="header__search">
      <Input
        variant="main-search"
        @open-search="goToSearch"
      />
    </div>
  </header>
</template>

<script setup>
import Input from "@/components/common/Input.vue";
import { Bell, Menu, X } from "lucide-vue-next";
import { useRouter } from "vue-router";

defineProps({
  className: { type: String, default: "" },
  isMenuOpen: { type: Boolean, default: false },
});

defineEmits(["toggle-menu"]);

const router = useRouter();

const goToSearch = () => {
  router.push({ name: "search" });
};
</script>

<style scoped lang="scss">
.header {
  --header-gap-row: var(--space-2);
  --header-gap-column: 0px;
  --header-icon-color: var(--color-neutral-800);
  --header-icon-padding: var(--space-1);
  --header-brand-color: var(--color-copper-700);
  --header-brand-dot-color: var(--color-turquoise-700);

  display: grid;
  position: relative;
  background-color: var(--color-background);
  z-index: 200;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  width: 100%;
  row-gap: var(--header-gap-row);
  column-gap: var(--header-gap-column);
  justify-content: space-between;
  padding: var(--space-2);

  &__row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--space-4);
    min-width: 0;
  }

  &__icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    justify-self: end;
    flex-shrink: 0;
    width: fit-content;
    padding: var(--header-icon-padding);
    border: none;
    background: transparent;
    color: var(--header-icon-color);
    cursor: pointer;
  }

  &__icon {
    flex-shrink: 0;
    color: var(--header-icon-color);
    stroke-width: var(--stroke-2);

    &--bell {
      width: var(--icon-lg);
      height: var(--icon-lg);
    }

    &--menu {
      width: var(--icon-lg);
      height: var(--icon-lg);
    }
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-1);
  }

  &__brand-text {
    font-family: var(--font-fraunces);
    font-size: var(--text-fraunces-size);
    color: var(--header-brand-color);
  }

  &__brand-dot {
    width: var(--icon-xs);
    height: var(--icon-xs);
    flex-shrink: 0;
    border-radius: var(--radius-full);
    background-color: var(--header-brand-dot-color);
  }

  &__search {
    grid-column: 1 / -1;
    width: 100%;
  }
}
.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.icon-fade-enter-from,
.icon-fade-leave-to {
  opacity: 0;
  transform: scale(0.6) rotate(-90deg);
}
.icon-fade-enter-to,
.icon-fade-leave-from {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}
</style>