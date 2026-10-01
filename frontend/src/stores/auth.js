import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  const isLoggedIn = computed(() => !!user.value)

  function login(fakeUser = { id: 1, name: 'کاربر تست', phone: '09307191285' }) {
    user.value = fakeUser
  }

  function logout() {
    user.value = null
  }

  function setUser(userData) {
    user.value = userData
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
    setUser,
  }
})