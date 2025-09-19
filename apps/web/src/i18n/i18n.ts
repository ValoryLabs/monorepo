import messages from '@intlify/unplugin-vue-i18n/messages'
import { useLocalStorage } from '@vueuse/core'
import { watch } from 'vue'
import { createI18n } from 'vue-i18n'
import type en from './locales/en.json'

export const AVAILABLE_LOCALES = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' },
] as const

type ValidLocale = (typeof AVAILABLE_LOCALES)[number]['code']
type Lang = typeof en

declare module 'vue-i18n' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefineLocaleMessage extends Lang {}
}

function getDefaultLocale(): ValidLocale {
  const saved = localStorage.getItem('lang')
  if (saved && AVAILABLE_LOCALES.some((l) => l.code === saved)) {
    return saved as ValidLocale
  }
  const browserLang = (navigator.language || 'en').toLowerCase().split('-')[0]
  return AVAILABLE_LOCALES.some((l) => l.code === browserLang) ? (browserLang as ValidLocale) : 'en'
}

const locale = useLocalStorage<ValidLocale>('lang', getDefaultLocale())

export const i18n = createI18n({
  legacy: false,
  locale: locale.value,
  fallbackLocale: 'en',
  messages,
})

async function loadLocaleMessages(locale: ValidLocale) {
  if (!i18n.global.availableLocales.includes(locale)) {
    try {
      const messages = await import(`./locales/${locale}.json`)
      i18n.global.setLocaleMessage(locale, messages.default)
    } catch (e) {
      console.error(`Failed to load ${locale} locale:`, e)
    }
  }
}

if (locale.value !== 'en') {
  loadLocaleMessages(locale.value)
}

watch(locale, async (newLocale) => {
  await loadLocaleMessages(newLocale)
  i18n.global.locale.value = newLocale
})

export function setLocale(newLocale: ValidLocale) {
  locale.value = newLocale
}
