<template>
  <RouterView v-slot="{ Component }">
    <Transition :name="transitionName" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const transitionName = ref('fade')

router.beforeEach((to, from) => {
  if (to.name === 'search' || from.name === 'search') {
    transitionName.value = 'slide-down'
  } else {
    transitionName.value = 'fade'
  }
})
</script>