<template>
    <span class="brand">
        <span class="brand__brand-dot" aria-hidden="true"></span>
        <h1 class="brand__brand-text">Arta</h1>
    </span>
</template>


<style scoped lang="scss">
.brand {
    --header-brand-color: var(--color-copper-700);
    --header-brand-dot-color: var(--color-turquoise-700);
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-1);

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
}
</style>