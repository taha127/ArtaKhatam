import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const pendingPhone = ref('')

  const isLoggedIn = computed(() => !!user.value)

  function setPendingPhone(phone) {
    pendingPhone.value = phone
  }

  function clearPendingPhone() {
    pendingPhone.value = ''
  }

  function login(userData = {}) {
    user.value = {
      phone: pendingPhone.value,
      ...userData,
    }
    pendingPhone.value = ''
  }

  function logout() {
    user.value = null
    pendingPhone.value = ''
  }

  return {
    user,
    pendingPhone,
    isLoggedIn,
    setPendingPhone,
    clearPendingPhone,
    login,
    logout,
  }
})