<script setup lang="ts">
import { Valory } from '@/components/icons'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
import ProfileMenu from './ProfileMenu.vue'
</script>

<template>
  <header class="bg-header sticky flex h-12 items-center justify-between px-5">
    <div @click="$router.push('/')" class="relative flex h-full cursor-pointer items-center gap-2">
      <Valory class="size-6" />
      <span
        class="font-valory mt-px inline-block bg-linear-to-b from-[#f2f2f2] to-[#dddddd] bg-clip-text text-base leading-none text-transparent"
        >VALORY</span
      >
    </div>
    <div class="inline-flex items-center gap-1">
      <LanguageSwitcher />
      <ProfileMenu />
    </div>
  </header>
</template>
