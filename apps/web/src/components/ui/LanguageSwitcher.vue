<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChevronsUpDown, Globe } from 'lucide-vue-next'
import { useLocalStorage } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AVAILABLE_LOCALES } from '@/i18n'
import { cn } from '@/lib/utils'

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

const isRounded = computed(() => props.variant === 'rounded')
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        :variant="!isRounded ? 'ghost' : 'default'"
        :size="!isRounded ? 'sm' : 'default'"
        aria-label="Language Switcher"
        :class="
          cn(
            !isRounded
              ? 'gap-2'
              : 'mr-2 rounded-full border border-transparent bg-transparent text-white opacity-50 transition hover:border-white/10 hover:bg-white/10 hover:opacity-100',
            props.class,
          )
        "
      >
        <Globe class="size-4" />
        <span class="text-sm">{{ currentLanguageName }}</span>
        <ChevronsUpDown class="size-4 ml-2" v-if="!isRounded" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-40">
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
