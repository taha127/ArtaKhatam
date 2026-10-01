<template>
  <div>
    <AppLoader :show="ui.isRouteLoading" full-page />
    <RouterView v-slot="{ Component }">
        <component :is="Component" />
    </RouterView>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUiStore } from '@/stores/ui'
import AppLoader from '@/components/common/AppLoader.vue'

const ui = useUiStore()
</script>