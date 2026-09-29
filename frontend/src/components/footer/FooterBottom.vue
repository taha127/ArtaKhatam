<template>
  <div :class="['footer-bottom', className]">
    <div class="footer-bottom__divider" aria-hidden="true"></div>

    <div class="footer-bottom__row">
      <span class="footer-bottom__copyright">{{ copyrightText }}</span>

      <ul class="footer-bottom__socials">
        <li v-for="social in socials" :key="social.name">
          <a
            :href="social.href"
            class="footer-bottom__social-link"
            :aria-label="social.name"
            target="_blank"
            rel="noopener noreferrer"
          >
            <font-awesome-icon
              :icon="social.icon"
              class="footer-bottom__social-icon"
              aria-hidden="true"
            />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
defineProps({
  copyrightText: {
    type: String,
    default: "© ۱۴۰۲ تمامی حقوق محفوظ است.",
  },

  // [{ name: 'اینستاگرام', icon: Instagram, href: '...' }, ...]
  socials: {
    type: Array,
    required: true,
  },

  className: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.footer-bottom {
  --footer-bottom-gap: var(--space-3);
  --footer-bottom-divider-color: var(--color-gold-400);
  --footer-bottom-icon-gap: var(--space-5);
  --footer-bottom-icon-color: var(--color-gold-300);
  --footer-bottom-copyright-color: var(--color-neutral-300);

  display: flex;
  flex-direction: column;
  gap: var(--footer-bottom-gap);
  width: 100%;
  padding-bottom: var(--space-1);

  &__divider {
    width: 100%;
    height: 0;
    border-top: 1px solid var(--footer-bottom-divider-color);
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__copyright {
    color: var(--footer-bottom-copyright-color);
    font-size: var(--text-caption-sm-size);
    font-weight: var(--text-caption-sm-weight);
    white-space: nowrap;
  }

  &__socials {
    display: flex;
    align-items: center;
    gap: var(--footer-bottom-icon-gap);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__social-icon {
    width: var(--icon-md);
    height: var(--icon-md);
    color: var(--footer-bottom-icon-color);
    stroke-width: var(--stroke-2);
  }
}
</style>