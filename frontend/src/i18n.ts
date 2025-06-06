import messages from '@intlify/unplugin-vue-i18n/messages'
import { useLocalStorage } from '@vueuse/core'
import { watch } from 'vue'
import type { I18n } from 'vue-i18n'
import { createI18n, registerMessageResolver } from 'vue-i18n'
import { resolveValue } from '@intlify/core-base'

registerMessageResolver(resolveValue)

// Конфигурация доступных языков
export const AVAILABLE_LOCALES = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' },
  { code: 'uk', name: 'Українська' },
  { code: 'kk', name: 'Қазақша' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
  { code: 'cn', name: '中文' },
] as const

type ValidLocale = (typeof AVAILABLE_LOCALES)[number]['code']

function getDefaultLocale(): ValidLocale {
  const saved = localStorage.getItem('lang')
  if (saved && AVAILABLE_LOCALES.some((l) => l.code === saved)) {
    return saved as ValidLocale
  }

  const browserLang = (navigator.language || navigator.userLanguage || 'en')
    .toLowerCase()
    .split('-')[0]

  return AVAILABLE_LOCALES.some((l) => l.code === browserLang) ? (browserLang as ValidLocale) : 'en'
}

const locale = useLocalStorage<ValidLocale>('lang', getDefaultLocale())

async function loadLocaleMessages(i18n: I18n, locale: ValidLocale) {
  try {
    const messages = await import(`./locales/${locale}.json`)
    i18n.global.setLocaleMessage(locale, messages.default)
  } catch (e) {
    console.error(`Failed to load ${locale} locale:`, e)
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: locale.value,
  fallbackLocale: 'en',
  messages,
})

async function setupI18n() {
  if (!i18n.global.availableLocales.includes('en')) {
    await loadLocaleMessages(i18n, 'en')
  }

  if (locale.value !== 'en') {
    await loadLocaleMessages(i18n, locale.value)
  }

  return i18n
}

watch(locale, async (newLocale) => {
  if (!i18n.global.availableLocales.includes(newLocale)) {
    await loadLocaleMessages(i18n, newLocale)
  }
  i18n.global.locale = newLocale
})

setupI18n()

export function setLocale(newLocale: ValidLocale) {
  locale.value = newLocale
}
