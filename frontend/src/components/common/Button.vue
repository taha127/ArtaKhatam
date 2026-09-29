<template>
    <button
        class="button"
        :class="[
            `button--${size}`,
            `button--${variant}`,
            {
                'button--outline': outline,
            },
        ]"
        :disabled="state === 'disabled'"
        type="button"
    >
        <span 
            class="button__text"
            :class="{
                'text-button-sm': size === 'small',
                'text-button-md': size === 'medium',
                'text-button-lg': size === 'large',
            }"
        >
            {{ text }}
        </span>

        <component
            v-if="icon"
            :is="icon"
            class="button__icon"
            aria-hidden="true"
        />

    </button>
</template>

<script>
export default {
    name: "Button",

    props: {
        text: {
            type: String,
            default: "مشاهده و خرید آثار",
        },

        state: {
            type: String,
            default: "enabled",
            validator: (value) =>
                ["enabled", "disabled", "hovered"].includes(value),
        },

        variant: {
            type: String,
            default: "primary",
            validator: (value) =>
                ["primary", "secondary", "tertiary"].includes(value),
        },

        outline: {
            type: Boolean,
            default: false,
        },

        icon: {
            type: [Object, Function],
            default: null,
        },

        size: {
            type: String,
            default: "medium",
            validator: (value) =>
                ["small", "medium", "large"].includes(value),
        },
    },
};
</script>

<style scoped lang="scss">
.button {

    --button-bg: var(--color-turquoise-700);
    --button-bg-hover: var(--color-turquoise-800);
    --button-bg-hover-text: var(--color-neutral-0);
    --button-border: var(--color-neutral-0);
    --button-text: var(--color-neutral-0);
    --button-icon-size: var(--icon-md);
    --button-icon-color: var(--color-neutral-0);

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);

    padding: var(--space-3) var(--space-4);

    border: var(--stroke-2) solid transparent;
    border-color: var(--button-border);
    border-radius: var(--radius-2xl);

    background-color: var(--button-bg);
    color: var(--button-text);

    cursor: pointer;

    transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease;

    &__icon {
        width: var(--button-icon-size);
        height: var(--button-icon-size);
        color: var(--button-icon-color);
        stroke-width: var(--stroke-3);
        flex-shrink: 0;
    }

    &:hover:not(:disabled) {
        background-color: var(--button-bg-hover);
        color: var(--button-bg-hover-text);
        --button-icon-color: var(--button-bg-hover-text);
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    // -------------------------
    // Sizes
    // -------------------------

    &--small {
        min-height: 34px;
        padding: var(--space-2) var(--space-2);
        gap: var(--space-1);
        --button-icon-size: var(--icon-sm);
    }

    &--medium {
        min-height: 44px;
        padding: var(--space-3) var(--space-4);
    }

    &--large {
        min-height: 48px;
        padding: var(--space-3) var(--space-5);
    }

    
    // -------------------------
    // Secondary
    // -------------------------

    &--secondary {
        --button-bg: var(--color-copper-700);
        --button-bg-hover: var(--color-copper-800);
    }

    // -------------------------
    // Tertiary
    // -------------------------

    &--tertiary {
        --button-bg: var(--color-gold-300);
        --button-bg-hover: var(--color-gold-800);
        --button-bg-hover-text: var(--color-neutral-700)!important;
    }

    // -------------------------
    // Outline
    // -------------------------

    &--outline {
        background-color: transparent;
        --button-border: var(--button-bg);
        --button-text: var(--button-bg);
        --button-bg-hover: var(--button-bg);
        --button-bg-hover-text: var(--color-neutral-0);
        --button-icon-color: var(--button-bg);
    }
}
</style>