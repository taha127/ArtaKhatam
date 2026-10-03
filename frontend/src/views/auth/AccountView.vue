<template>
  <div class="account-view">
    <h1>حساب من</h1>
    <p v-if="auth.user">سلام {{ auth.user.name }}</p>

    <button type="button" @click="handleLogout">خروج</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const handleLogout = () => {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<style scoped lang="scss">
.account-view {
  padding: var(--space-4);
}
</style>