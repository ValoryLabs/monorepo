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
import { AVAILABLE_LOCALES } from '@/i18n'
import { cn } from '@/lib/utils'
import { useLocalStorage } from '@vueuse/core'
import { ChevronsUpDown, Globe } from 'lucide-vue-next'
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(
  defineProps<{ variant?: 'default' | 'rounded'; class?: HTMLAttributes['class'] }>(),
  {
    variant: 'default',
  },
)

const { t, locale } = useI18n<{ locale: string; availableLocales: string[] }>()
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
        :variant="props.variant === 'default' ? 'ghost' : 'default'"
        :size="props.variant === 'default' ? 'sm' : 'default'"
        aria-label="Language Switcher"
        :class="
          cn(
            props.variant === 'default'
              ? 'gap-2'
              : 'mr-2 rounded-full border border-transparent bg-transparent text-white opacity-50 transition hover:border-white/10 hover:bg-white/10 hover:opacity-100',
            props.class,
          )
        "
      >
        <Globe class="size-4" />
        <span class="text-sm">{{ currentLanguageName }}</span>
        <ChevronsUpDown class="size-4 ml-2" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-40">
      <DropdownMenuLabel>
        {{ t('components.languageSwitcher') }}
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
