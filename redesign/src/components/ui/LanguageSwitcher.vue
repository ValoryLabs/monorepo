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

import Language from "@/components/icons/Language.vue";

import { AVAILABLE_LOCALES } from '@/i18n.ts'
import { useLocalStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n<{ locale: string; availableLocales: string[] }>()
const currentLocale = useLocalStorage<string>('lang', 'en')
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="px-2 w-9">
        <Language :size="16"/>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-40">
      <DropdownMenuLabel>
        {{  $t('components.languageSwitcher') }}
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
