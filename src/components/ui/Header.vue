<script setup lang="ts">
import Valory from '@/components/icons/Valory.vue'
import { SocialLinksData } from '@/data/SocialLinks.data.ts'
import { openLink } from '@/lib/utils'
import Button from '@/components/ui/button/Button.vue'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
import { Languages } from 'lucide-vue-next'
</script>

<template>
  <header class="bg-header relative flex h-10 items-center justify-between border-b px-5">
    <div @click="$router.push('/')" class="flex h-full cursor-pointer items-center gap-2">
      <Valory class="size-6" />
      <span
        class="font-valory mt-px inline-block bg-linear-to-b from-[#f2f2f2] to-[#dddddd] bg-clip-text text-base leading-none text-transparent"
        >VALORY</span
      >
    </div>
    <div class="inline-flex items-center gap-3">
      <Button
        v-for="link in SocialLinksData"
        :key="link.name"
        class="size-7"
        variant="ghost"
        @click="openLink(link.url)"
      >
        <component :is="link.icon" :size="18" />
      </Button>
      <LanguageSwitcher>
        <Button variant="ghost" class="size-7" aria-label="Language Switcher">
          <Languages class="size-4" />
        </Button>
      </LanguageSwitcher>
    </div>
  </header>
</template>
