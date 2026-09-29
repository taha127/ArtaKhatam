<template>
  <Transition name="mobile-menu">
    <div
      v-if="modelValue"
      class="mobile-menu"
      :class="className"
    >
      <div class="mobile-menu__content">
          <nav class="mobile-menu__nav">
            <MenuItem
              v-for="(item, index) in menuItems"
              :key="index"
              :label="item.label"
              :href="item.href"
              :children="item.children"
              @select="onSelect"
            />
          </nav>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import MenuItem from '@/components/navigation/MenuItem.vue';
import { watch, onUnmounted } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
  }
);

onUnmounted(() => {
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.overflow = ''
});

const menuItems = [
  {
    label: 'آثار',
    children: [
      { label: 'خاتم و قلم‌زنی', href: '/products/khatam' },
      { label: 'مس و فیروزه', href: '/products/copper' },
      { label: 'میناکاری', href: '/products/mina' },
    ],
  },
  { label: 'آثار با تخفیف ویژه', href: '/products/sale' },
  { label: 'ست‌های بی‌نظیر', href: '/products/sets' },
  { label: 'مقاله‌ها', href: '/articles' },
  { label: 'سفارش طرح', href: '/custom-order' },
  { label: 'راهنما خرید و پیگیری سفارش', href: '/guide' },
  { label: 'درباره ما', href: '/about' },
  { label: 'ارتباط با ما', href: '/contact' },
];

const onSelect = (item) => {
  console.log('انتخاب شد:', item);
};
</script>

<style scoped lang="scss">
.mobile-menu {
  position: fixed;
  top: var(--header-offset, 136px);
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 150;
  background-color: var(--color-copper-50);
  overflow-y: auto;

  transform-origin: top right;
}

.mobile-menu__content {
  padding: var(--space-4) 0;
  min-height: 100%;
}

.mobile-menu-enter-active {
  transition: clip-path 1.5s cubic-bezier(0.22, 1, 0.36, 1),
              opacity 0.5s ease;
}
.mobile-menu-leave-active {
  transition: clip-path 0.35s cubic-bezier(0.4, 0, 1, 1),
              opacity 0.25s ease;
}

.mobile-menu-enter-from {
  clip-path: circle(0% at 100% 0%);
  opacity: 0.6;
}
.mobile-menu-enter-to {
  clip-path: circle(150% at 100% 0%);
  opacity: 1;
}
.mobile-menu-leave-from {
  clip-path: circle(150% at 100% 0%);
  opacity: 1;
}
.mobile-menu-leave-to {
  clip-path: circle(0% at 100% 0%);
  opacity: 0;
}
</style>