<template>
    <AuthLayout>
        <form class="login-form" @submit.prevent="onSubmit">
            <h2 class="login-form__title">به فروشگاه صنایع دستی آرتا خوش آمدید</h2>
            <p class="login-form__description">
                برای ورود یا ثبت نام لطفا شماره موبایل خود را به طور کامل وارد کنید.
            </p>
            <Input
                v-model="phoneNumber"
                label="شماره موبایل"
                placeholder="+++++++++۰۹"
                required
                :state="phoneError ? 'error' : 'enabled'"
                :error="phoneError"
            />
            <Button
                class="login-form__submit-btn"
                type="submit"
                variant="tertiary"
                :icon="ArrowLeft"
                :text="'ورود به آرتا'"
            />
        </form>
    </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ArrowLeft } from 'lucide-vue-next'

import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'
import AuthLayout from '@/components/auth/AuthLayout.vue'

const router = useRouter()
const auth = useAuthStore()

const phoneNumber = ref('')
const phoneError = ref('')

const normalizePhone = (value) => {
  return value
    .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
    .replace(/\s|-/g, '')
}

const validatePhone = (value) => {
  const phone = normalizePhone(value)

  if (!phone) {
    return 'شماره موبایل الزامی است'
  }

  if (!phone.startsWith('09')) {
    return 'شماره موبایل باید با ۰۹ شروع شود'
  }

  if (!/^09\d{9}$/.test(phone)) {
    return 'شماره موبایل باید ۱۱ رقم باشد'
  }

  return ''
}

const onSubmit = () => {
    phoneError.value = validatePhone(phoneNumber.value)

    if (phoneError.value) return
    const phone = normalizePhone(phoneNumber.value)

    auth.setPendingPhone(phone)
    router.push({ name: 'otp' })
}

</script>

<style scoped lang="scss">
@use "@/styles/mixins" as *;
.login-form {
    @include form-auth;
}
</style>