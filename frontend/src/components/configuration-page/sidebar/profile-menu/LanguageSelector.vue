<script lang="ts" setup>
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuItem,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu'
import { Globe, Check } from 'lucide-vue-next'
import { AVAILABLE_LOCALES } from '@/i18n'
import { useLocalStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { locale } = useI18n()
const currentLocale = useLocalStorage('lang', 'en')

const currentLanguage = computed(() => {
  return AVAILABLE_LOCALES.find(lang => lang.code === currentLocale.value)
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
      <Globe class="size-4 mr-2" />
      <span>{{ $t('components.languageSwitcher') }}</span>
      <span class="ml-auto text-xs text-muted-foreground">{{ currentLanguageName }}</span>
    </DropdownMenuSubTrigger>
    <DropdownMenuPortal>
      <DropdownMenuSubContent>
        <DropdownMenuItem
          v-for="lang in AVAILABLE_LOCALES"
          :key="lang.code"
          @click="handleLanguageChange(lang.code)"
          class="cursor-pointer"
        >
          <Check
            v-if="currentLocale === lang.code"
            class="mr-2 h-4 w-4"
          />
          <span :class="currentLocale !== lang.code ? 'ml-8' : ''">
            {{ lang.name }}
          </span>
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  </DropdownMenuSub>
</template>
