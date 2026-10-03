<template>
    <AuthLayout>
        <form class="otp-form" @submit.prevent="onSubmit">
            <h2 class="otp-form__title">به فروشگاه صنایع دستی آرتا خوش آمدید</h2>
            <p class="otp-form__description">
                کد تایید برای شماره 
                <strong>{{ displayPhone }}</strong>
                 پیامک شد.
            </p>
            <OtpInput
                v-model="otpCode"
                label="کد تایید"
                required
                :length="4"
                :error="otpError"
                @complete="onOtpComplete"
            />

            <div class="otp-form__meta">
                <button
                    type="button"
                    class="otp-form__change-phone"
                    @click="goChangePhone"
                >
                  تغییر شماره
                </button>
              
                <span v-if="remainingSeconds > 0" class="otp-form__timer">
                    {{ formattedTime }}
                </span>
              
                <button
                  v-else
                  type="button"
                  class="otp-form__resend"
                  @click="resendCode"
                >
                  ارسال مجدد کد
                </button>
            </div>
            <Button
                class="otp-form__submit-btn"
                type="submit"
                variant="tertiary"
                :icon="ArrowLeft"
                :text="'تایید'"
            >
                ورود
            </Button>
        </form>
    </AuthLayout>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ArrowLeft } from 'lucide-vue-next'

import OtpInput from '@/components/auth/OtpInput.vue'
import Button from '@/components/common/Button.vue'
import AuthLayout from '@/components/auth/AuthLayout.vue'

const router = useRouter()
const auth = useAuthStore()

const otpCode = ref('')
const otpError = ref('')

const TOTAL_SECONDS = 2 * 60
const remainingSeconds = ref(TOTAL_SECONDS)
let timerId = null

const formattedTime = computed(() => {
  const m = Math.floor(remainingSeconds.value / 60)
  const s = remainingSeconds.value % 60
  const fa = (n) => String(n).padStart(2, '0').replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d])
  return `${fa(m)}:${fa(s)}`
})

const startTimer = () => {
  stopTimer()
  remainingSeconds.value = TOTAL_SECONDS
  timerId = setInterval(() => {
    if (remainingSeconds.value <= 1) {
      remainingSeconds.value = 0
      stopTimer()
      return
    }
    remainingSeconds.value -= 1
  }, 1000)
}

const stopTimer = () => {
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
}

const goChangePhone = () => {
  auth.clearPendingPhone()
  router.push({ name: 'login' })
}

onMounted(() => {
    if (!auth.pendingPhone) {
        router.replace({ name: 'login' })
        return
    }
    startTimer()
})

onUnmounted(() => {
    stopTimer()
})

const FA = '۰۱۲۳۴۵۶۷۸۹'
const toFa = (v) => String(v).replace(/[0-9]/g, (d) => FA[d])

const displayPhone = computed(() => toFa(auth.pendingPhone || ''))

const onOtpComplete = (code) => {
  otpCode.value = code
}

const onSubmit = () => {
  if (!otpCode.value || otpCode.value.length < 4) {
    otpError.value = 'کد تایید را کامل وارد کنید'
    return
  }

  otpError.value = ''

  auth.login({ phone: auth.pendingPhone })
  router.push({ name: 'account' })
}

</script>

<style scoped lang="scss">
@use "@/styles/mixins" as *;

.otp-form {
    @include form-auth;

    &__meta {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0 var(--space-10);
    }

    &__change-phone {
        padding: 0;
        border: none;
        background: transparent;
        color: var(--color-copper-600);
        text-decoration: underline;
        cursor: pointer;
    }

    &__timer {
        color: var(--color-turquoise-700);
        font-variant-numeric: tabular-nums;
    }

    &__resend {
        padding: 0;
        border: none;
        background: transparent;
        color: var(--color-turquoise-700);
        text-decoration: underline;
        cursor: pointer;
    }
}
</style>