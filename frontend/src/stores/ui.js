import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isRouteLoading = ref(false)

  function startLoading() {
    isRouteLoading.value = true
  }

  function stopLoading() {
    isRouteLoading.value = false
  }

  return { isRouteLoading, startLoading, stopLoading }
})