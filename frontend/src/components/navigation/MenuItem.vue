<template>
  <div class="menu-item-wrapper">
    <component
      :is="tag"
      :href="href || undefined"
      class="menu-item"
      :class="{
        'menu-item--active': isOpen || isActive,
        'menu-item--expandable': hasChildren,
      }"
      @click="handleClick"
    >
      <span class="menu-item__label">{{ label }}</span>

      <SquareChevronLeft
        v-if="hasChildren"
        class="menu-item__chevron"
        :class="{ 'menu-item__chevron--open': isOpen }"
        aria-hidden="true"
      />
    </component>
    <Transition name="submenu">
        <div v-if="hasChildren && isOpen">
          <MenuItem
            v-for="(child, index) in children"
            :key="index"
            :label="child.label"
            :href="child.href"
            :is-sub-item="true"
            @select="$emit('select', $event)"
          />
        </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SquareChevronLeft } from 'lucide-vue-next'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    default: '',
  },
  children: {
    type: Array,
    default: () => [],
  },
  isSubItem: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select'])

const isOpen = ref(false)

const hasChildren = computed(() => props.children && props.children.length > 0)

const tag = computed(() => {
  if (hasChildren.value) return 'button'
  if (props.href) return 'a'
  return 'button'
})

const handleClick = () => {
  if (hasChildren.value) {
    isOpen.value = !isOpen.value
    return
  }

  emit('select', { label: props.label, href: props.href })
}
</script>

<style scoped lang="scss">
.menu-item-wrapper {
  width: 100%;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 48px;
  padding: var(--space-2) var(--space-4);

  border: none;
  border-top: 1px solid var(--color-copper-800);
  background-color: var(--color-copper-50);
  color: var(--color-neutral-900);
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.5s ease;

  &:hover,
  &--active {
    background-color: var(--color-copper-200);
  }

  &__label {
    flex: 1;
    text-align: right;
  }

  &__chevron {
    width: var(--icon-lg);
    height: var(--icon-lg);
    flex-shrink: 0;
    color: var(--color-copper-800);
    stroke-width: var(--stroke-2);
    transition: transform 0.5s ease;

    &--open {
      transform: rotate(-90deg);
    }
  }
}

.menu-item-wrapper .menu-item-wrapper .menu-item {
  background-color: var(--color-copper-100);
  border-top-color: var(--color-copper-200);
  &:hover,
  &--active {
    background-color: var(--color-copper-200);
  }
}

.menu-item__submenu {
  overflow: hidden;
  background-color: var(--color-copper-100);
}

.submenu-enter-active,
.submenu-leave-active {
  transition: max-height 0.5s ease, opacity 0.5s ease;
}

.submenu-enter-from,
.submenu-leave-to {
  max-height: 0;
  opacity: 0;
}

.submenu-enter-to,
.submenu-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>