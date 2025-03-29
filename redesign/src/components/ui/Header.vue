<script setup lang="ts">
import Valory from '@/components/icons/Valory.vue'
import { SocialLinksData } from '@/data/SocialLinks.d'
import { openLink } from '@/utils.ts'
import Button from './button/Button.vue'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
</script>

<template>
  <header class="relative flex h-14 items-center justify-between border-b bg-background px-10">
    <span @click="$router.push('/')" class="flex w-56 cursor-pointer items-center gap-3">
      <Valory :size="30" />
      <span class="font-valory mt-px text-lg leading-none">VALORY</span>
    </span>
    <div class="inline-flex gap-3">
      <Button
        v-for="link in SocialLinksData"
        :key="link.name"
        class="h-fit px-2"
        variant="ghost"
        @click="openLink(link.url)"
      >
        <component :is="link.icon" :size="18" />
      </Button>
      <LanguageSwitcher />
    </div>
    <div class="absolute -left-10 -top-10 size-20 rounded-full bg-[#FA4454] blur-[100px]" />
  </header>
</template>
