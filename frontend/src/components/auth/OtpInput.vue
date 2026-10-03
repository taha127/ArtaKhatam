<template>
  <div :class="['otp-input', className]">
    <!-- Label -->
    <label v-if="label" class="otp-input__label">
      <span v-if="required" class="otp-input__required" aria-hidden="true">*</span>
      <span>{{ label }}</span>
    </label>

    <!-- Boxes -->
    <div class="otp-input__boxes" dir="ltr">
      <input
        v-for="(digit, index) in digits"
        :key="index"
        :ref="(el) => setInputRef(el, index)"
        class="otp-input__box"
        :class="{ 'otp-input__box--filled': digit }"
        type="text"
        inputmode="numeric"
        maxlength="1"
        autocomplete="one-time-code"
        :value="digit"
        :aria-label="`رقم ${index + 1}`"
        @input="onInput($event, index)"
        @keydown="onKeydown($event, index)"
        @paste="onPaste"
        @focus="onFocus(index)"
      />
    </div>

    <p v-if="error" class="otp-input__error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  length: {
    type: Number,
    default: 4,
  },
  label: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'complete'])

const FA = '۰۱۲۳۴۵۶۷۸۹'
const EN = '0123456789'

const toFa = (v) => String(v).replace(/[0-9]/g, (d) => FA[Number(d)])
const toEn = (v) =>
  String(v)
    .replace(/[۰-۹]/g, (d) => String(FA.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))

const digits = ref(Array.from({ length: props.length }, (_, i) => {
  const raw = toEn(props.modelValue)[i] || ''
  return raw ? toFa(raw) : ''
}))

const inputRefs = ref([])

const setInputRef = (el, index) => {
  if (el) inputRefs.value[index] = el
}

const emitValue = () => {
  const english = digits.value.map((d) => toEn(d)).join('')
  emit('update:modelValue', english)

  if (english.length === props.length && /^\d+$/.test(english)) {
    emit('complete', english)
  }
}

const focusAt = async (index) => {
  await nextTick()
  const el = inputRefs.value[index]
  if (el) el.focus()
}

const onInput = (event, index) => {
  const raw = toEn(event.target.value).replace(/\D/g, '')
  const char = raw.slice(-1) // فقط آخرین رقم

  digits.value[index] = char ? toFa(char) : ''
  event.target.value = digits.value[index]
  emitValue()

  if (char && index < props.length - 1) {
    focusAt(index + 1)
  }
}

const onKeydown = (event, index) => {
  if (event.key === 'Backspace') {
    if (digits.value[index]) {
      digits.value[index] = ''
      emitValue()
    } else if (index > 0) {
      digits.value[index - 1] = ''
      emitValue()
      focusAt(index - 1)
    }
    event.preventDefault()
  }

  if (event.key === 'ArrowLeft' && index > 0) {
    focusAt(index - 1)
  }

  if (event.key === 'ArrowRight' && index < props.length - 1) {
    focusAt(index + 1)
  }
}

const onPaste = (event) => {
  event.preventDefault()
  const pasted = toEn(event.clipboardData.getData('text')).replace(/\D/g, '').slice(0, props.length)

  if (!pasted) return

  for (let i = 0; i < props.length; i++) {
    digits.value[i] = pasted[i] ? toFa(pasted[i]) : ''
  }

  emitValue()
  focusAt(Math.min(pasted.length, props.length - 1))
}

const onFocus = (index) => {
  const firstEmpty = digits.value.findIndex((d) => !d)
  if (firstEmpty !== -1 && firstEmpty < index) {
    focusAt(firstEmpty)
  }
}

watch(
  () => props.modelValue,
  (val) => {
    const english = toEn(val).replace(/\D/g, '').slice(0, props.length)
    digits.value = Array.from({ length: props.length }, (_, i) =>
      english[i] ? toFa(english[i]) : '',
    )
  },
)
</script>

<style scoped lang="scss">
.otp-input {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  width: 100%;
  background: transparent;

  &__label {
    display: flex;
    width: 100%;
    color: var(--color-neutral-600);
    gap: var(--space-1);
    text-align: right;
  }

  &__required {
    color: #ff383c;
    margin-left: 2px;
  }

  &__boxes {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    padding: var(--space-1) var(--space-2);
  }

  &__box {
    width: 44px;
    height: 44px;
    flex-shrink: 0;

    border: 1px solid var(--color-gold-800);
    border-radius: var(--radius-md);
    background-color: var(--color-gold-50);

    color: var(--color-gold-800);
    font-size: var(--text-label-lg-size);
    font-weight: var(--text-label-lg-weight);
    text-align: center;

    outline: none;
    caret-color: var(--color-gold-800);
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      background-color 0.2s ease;

    &:focus {
      border-color: var(--color-gold-800);
      background-color: var(--color-neutral-0, #fff);
      box-shadow: 0 0 0 3px rgba(184, 134, 11, 0.18);
    }

    &--filled {
      background-color: var(--color-gold-50);
    }
  }

  &__error {
    padding-right: var(--space-2);
    color: #ff383c;
    font-size: var(--text-caption-md-size);
    text-align: right;
  }
}
</style>