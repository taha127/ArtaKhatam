<template>
    <div class="auth-layout">
        <header class="auth-layout__header">
            <BackBtn />
            <Brand />
        </header> 
        <div class="auth-layout__content">
            <slot />
        </div>
    </div>
</template>

<script setup>
import Brand from '@/components/common/Brand.vue'
import BackBtn from '@/components/common/BackBtn.vue'

</script>

<style scoped lang="scss">
.auth-layout {
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    align-items: center;

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--space-4);
        width: 100%;
    }

    &__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-inline: var(--space-1);
        padding-block: var(--space-24);
        width: 100%;
        max-width: 500px;
    }
}
</style>