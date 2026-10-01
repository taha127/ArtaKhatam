<template>
  <nav :class="['bottom-nav', className]">
    <NavItem
      v-for="tab in tabs"
      :key="tab.id"
      :icon="tab.icon"
      :label="tab.label"
      :active="currentTab === tab.id"
      @click="goTo(tab.id)"
    />
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import NavItem from '@/components/navigation/NavItem.vue'

defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
})

const route = useRoute()
const router = useRouter()

const currentTab = computed(() => {
  if (route.name === 'login' || route.name === 'account') {
    return 'account'
  }
  return route.name
})

const auth = useAuthStore()

function goTo(tabId) {
  if (tabId === 'account') {
    if (!auth.isLoggedIn) {
      router.push({ name: 'login' })
    }
    else {
      router.push({ name: 'account' })
    }
    return
  }
  if (route.name === tabId) return
  router.push({ name: tabId })
}
</script>

<style scoped lang="scss">
.bottom-nav {
  --bottom-nav-height: 64px;
  --bottom-nav-padding-inline: var(--space-3);
  --bottom-nav-bg: var(--color-neutral-50);

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  border-top: var(--stroke-1) solid var(--color-turquoise-300);
  width: 100%;
  height: var(--bottom-nav-height);
  padding-inline: var(--bottom-nav-padding-inline);
  background-color: var(--bottom-nav-bg);

  padding-bottom: env(safe-area-inset-bottom);
}
</style>