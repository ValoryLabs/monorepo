<script setup lang="ts">
import Valory from '@/components/icons/Valory.vue'
import { SocialLinksData } from '@/data/SocialLinks.data.ts'
import { openLink } from '@/lib/utils'
import Button from '@/components/ui/button/Button.vue'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
</script>

<template>
  <header class="bg-background relative flex h-14 items-center justify-between border-b">
    <div
      @click="$router.push('/')"
      class="flex h-full w-1/5 cursor-pointer items-center gap-3 border-r pl-5"
    >
      <Valory :size="30" />
      <span class="font-valory mt-px text-lg leading-none">VALORY</span>
    </div>
    <div class="inline-flex gap-3 pr-5">
      <Button
        v-for="link in SocialLinksData"
        :key="link.name"
        size="icon"
        variant="ghost"
        @click="openLink(link.url)"
      >
        <component :is="link.icon" :size="18" />
      </Button>
      <LanguageSwitcher />
    </div>
    <div class="absolute -top-10 -left-10 z-100 size-20 rounded-full bg-[#FA4454] blur-[100px]" />
  </header>
</template>
