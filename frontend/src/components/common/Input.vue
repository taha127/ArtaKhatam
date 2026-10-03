<template>
    <div
        class="input"
        :class="[
            `input--${variant}`,
            `input--${state}`,
        ]"
    >
        <!-- Label -->
        <label
            v-if="hasLabel"
            class="input__label text-label"
        >
            <span
                v-if="required"
                class="input__required"
                aria-hidden="true"
            >
                *
            </span>
            
            <span>{{ label }}</span>

        </label>

        <!-- Input Wrapper -->
        <div class="input__wrapper" @click="handleMainSearchClick">

            <!-- Search Icon -->
            <Search
                v-if="variant === 'search' || variant === 'main-search'"
                class="input__icon"
                aria-hidden="true"
            />

            <!-- Main Search custom placeholder -->
            <div
                v-if="showMainSearchPlaceholder"
                class="input__main-search-placeholder"
                aria-hidden="true"
            >
                <span class="input__main-search-text">
                  جستجو در
                  <span class="input__arta">
                      آرتا
                  </span>
                </span>
            </div>

            <!-- Real Input -->
            <input
              ref="inputRef"
              class="input__field"
              :type="inputType"
              :value="modelValue"
              :placeholder="inputPlaceholder"
              :disabled="state === 'disabled'"
              :aria-label="ariaLabel"
              @input="handleInput"
            />

            <!-- Password Toggle -->
            <button
                v-if="variant === 'password'"
                type="button"
                class="input__password-toggle"
                :aria-label="showPassword ? 'پنهان کردن رمز عبور' : 'نمایش رمز عبور'"
                :disabled="state === 'disabled'"
                @click="togglePassword"
            >
              <EyeOff
                v-if="showPassword"
                class="input__icon"
                aria-hidden="true"
              />

              <Eye
                v-else
                class="input__icon"
                aria-hidden="true"
              />
            </button>

        </div>
        <p v-if="error" class="input__error">
          {{ error }}
        </p>
    </div>
</template>

<script setup>
import { computed, ref } from "vue"
import { Search, Eye, EyeOff, } from "lucide-vue-next"

import { toPersianDigits, toEnglishDigits } from '@/utils/digits'

const props = defineProps({
    modelValue: {
        type: String,
        default: "",
    },

    label: {
        type: String,
        default: "",
    },

    placeholder: {
        type: String,
        default: "",
    },

    required: {
        type: Boolean,
        default: false,
    },

    variant: {
        type: String,
        default: "default",
        validator: (value) =>
            ["default", "search", "main-search", "password", "error"].includes(value),
    },

    state: {
        type: String,
        default: "enabled",
        validator: (value) =>
            ["enabled", "focused", "disabled"].includes(value),
    },

    error: {
      type: String,
      default: '',
    },
})

const emit = defineEmits(["update:modelValue", "open-search"])

const showPassword = ref(false);

const hasLabel = computed(() => {

    return (
        props.label &&
        props.variant !== "search" &&
        props.variant !== "main-search"
    )
})

const showMainSearchPlaceholder = computed(() => {
  return (
    props.variant === "main-search" &&
    !props.modelValue
  )
})

const inputPlaceholder = computed(() => {
    if (props.variant === "main-search") {
        return ""
    }

    return props.placeholder
})

const ariaLabel = computed(() => {
    if (props.variant === "main-search") {
        return "جستجو در آرتا";
    }

    return props.label || undefined
})

const inputType = computed(() => {
    if (props.variant === "password") {
        return showPassword.value ? "text" : "password"
    }

    return "text"
})

const handleInput = (event) => {
    
    let value = event.target.value

    value = toPersianDigits(value)
    event.target.value = value
    emit("update:modelValue", value)
}

const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const handleMainSearchClick = () => {
    if (props.variant === "main-search" && props.state !== "disabled") {
        emit("open-search")
    }
}

</script>

<style scoped lang="scss">
.input {
    --input-bg: var(--color-neutral-100);
    --input-border: var(--color-neutral-500);
    --input-text: var(--color-neutral-800);
    --input-placeholder: var(--color-neutral-400);
    --input-label: var(--color-neutral-600);
    --input-icon: var(--color-neutral-500);
    --input-gap: var(--space-1);
    --stroke-border: var(--stroke-2);

    display: flex;
    flex-direction: column;
    gap: var(--input-gap);

    width: 100%;

    transition: gap 0.3s ease;

    &__label {
        direction: rtl;
        color: var(--input-label);
    }

    &__required {
        color: #ff383c;
        margin-right: 2px;
    }

    &__wrapper {
        display: flex;
        align-items: center;
        width: 100%;
        min-height: 44px;
        padding: var(--space-2);
        gap: var(--space-1);
        background-color: var(--input-bg);
        border: var(--stroke-border) solid var(--input-border);
        border-radius: var(--radius-xl);

        transition:
            border-color 0.2s ease,
            background-color 0.2s ease;
    }

    &__field {
        flex: 1;

        min-width: 0;

        border: none;
        outline: none;

        background: transparent;

        color: var(--input-text);

        direction: rtl;
        text-align: right;

        &::placeholder {
            color: var(--input-placeholder);
        }

        &:disabled {
            cursor: not-allowed;
        }
    }

    &__icon {
        width: var(--icon-md);
        height: var(--icon-md);

        flex-shrink: 0;

        color: var(--input-icon);
        stroke-width: var(--stroke-2);
    }

    &__password-toggle {
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 0;

        color: var(--input-icon);

        cursor: pointer;
    }

    /* Focus */

    &--default,
    &--password {
        &:focus-within {
            --input-border: var(--color-turquoise-700);
            transition: border-color 0.5s ease, translate 1s ease;
            translate: 0 -1px;
        }
    }

    /* Disabled */

    &--disabled {
        --input-bg: var(--color-neutral-200);
        --input-border: var(--color-neutral-300);
        --input-text: var(--color-neutral-500);
        --input-label: var(--color-neutral-400);

        opacity: 0.7;

        .input__wrapper {
            cursor: not-allowed;
        }
    }

    /* Main Search */

    &--main-search {
        --input-bg: var(--color-neutral-50);
        --input-border: var(--color-neutral-600);
        --stroke-border: var(--stroke-1);
    }

    &__main-search-placeholder {
        color: var(--color-neutral-600);
    }

    &__main-search-text {
        display: flex;
        align-items: baseline;
        gap: var(--space-1);
    }

    &__arta {
        font-family: var(--font-nastaliq);
        font-size: var(--text-nastaliq-sm-size);
        line-height: var(--text-nastaliq-sm-line-height);
        font-weight: var(--text-nastaliq-sm-weight);
        color: var(--color-copper-600);
        transform: translateY(3px);
    }

    /* Search */

    &--search {
        --input-border: var(--color-neutral-600);
        --stroke-border: var(--stroke-1);
        --input-placeholder: var(--color-neutral-500);
        --input-bg: var(--color-neutral-200);
        .input__wrapper {
            gap: var(--space-1);
        }
    }

    &__error {
        padding-right: var(--space-1);
        color: #ff383c;
        font-size: var(--text-caption-md-size);
        font-weight: var(--text-caption-md-weight);
    }

    &--error {
        --input-border: #ff383c;
    }
}
</style>