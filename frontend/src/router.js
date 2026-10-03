import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import { useUiStore } from '@/stores/ui'

const routes = [
  { path: '/', name: 'home', component: Home },
  {
    path: '/search', name: 'search',
    component: () => import('@/views/SearchView.vue'),
    meta: { transition: 'slide-down' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
  },
  {
    path: '/otp',
    name: 'otp',
    component: () => import('@/views/auth/OtpView.vue'),
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/auth/AccountView.vue'),
    // بعداً می‌توانی meta: { requiresAuth: true } بگذاری
  },
  //   { path: '/shop', name: 'shop', component: ShopView },
  //   { path: '/cart', name: 'cart', component: CartView },
  //   { path: '/favorites', name: 'favorites', component: FavoritesView },
  //   { path: '/account', name: 'account', component: AccountView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const ui = useUiStore()
  ui.startLoading()
  next()
})

router.afterEach(() => {
  const ui = useUiStore()
  setTimeout(() => {
    ui.stopLoading()
  }, 1000)
})

export default router;