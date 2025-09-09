<script lang="ts" setup>
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import { AVAILABLE_LOCALES } from '@/i18n'
import { useLocalStorage } from '@vueuse/core'
import { Check, Globe } from 'lucide-vue-next'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const currentLocale = useLocalStorage('lang', 'en')

const currentLanguage = computed(() => {
  return AVAILABLE_LOCALES.find((lang) => lang.code === currentLocale.value)
})

const currentLanguageName = computed(() => {
  return currentLanguage.value?.name || 'English'
})

const handleLanguageChange = (langCode: string) => {
  locale.value = langCode
  currentLocale.value = langCode
}
</script>

<template>
  <DropdownMenuSub>
    <DropdownMenuSubTrigger>
      <Globe class="size-4 mr-1" />
      <span>{{ t('components.languageSwitcher') }}</span>
      <span class="ml-auto bg-white/10 rounded-sm py-1 px-2 text-xs text-muted-foreground">{{
        currentLanguageName
      }}</span>
    </DropdownMenuSubTrigger>
    <DropdownMenuPortal>
      <DropdownMenuSubContent>
        <DropdownMenuItem
          v-for="lang in AVAILABLE_LOCALES"
          :key="lang.code"
          @click="handleLanguageChange(lang.code)"
          class="cursor-pointer"
        >
          <Check v-if="currentLocale === lang.code" class="mr-2 h-4 w-4" />
          <span :class="currentLocale !== lang.code ? 'ml-8' : ''">
            {{ lang.name }}
          </span>
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  </DropdownMenuSub>
</template>
