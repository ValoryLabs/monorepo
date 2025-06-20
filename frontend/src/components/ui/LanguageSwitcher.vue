<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Globe } from 'lucide-vue-next'

import { AVAILABLE_LOCALES } from '@/i18n'
import { useLocalStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'rounded'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const { locale } = useI18n<{ locale: string; availableLocales: string[] }>()
const currentLocale = useLocalStorage<string>('lang', 'en')

const currentLanguage = computed(() => {
  return AVAILABLE_LOCALES.find((lang) => lang.code === currentLocale.value)
})

const currentLanguageName = computed(() => {
  return currentLanguage.value?.name || 'English'
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        v-if="props.variant === 'default'"
        variant="ghost"
        size="sm"
        aria-label="Language Switcher"
        class="gap-2"
      >
        <Globe class="size-4" />
        <span class="text-sm">{{ currentLanguageName }}</span>
      </Button>
      <Button
        v-else
        aria-label="Language Switcher"
        class="mr-2 rounded-full border border-transparent bg-transparent text-white opacity-50 transition hover:border-white/10 hover:bg-white/10 hover:opacity-100"
      >
        <Globe class="size-4" />
        <span class="text-sm">{{ currentLanguageName }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-40">
      <DropdownMenuLabel>
        {{ $t('components.languageSwitcher') }}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup v-model="currentLocale">
        <DropdownMenuRadioItem
          v-for="lang of AVAILABLE_LOCALES"
          :key="lang.code"
          :value="lang.code"
          @select="
            () => {
              locale = lang.code
              currentLocale = lang.code
            }
          "
        >
          {{ lang.name }}
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
