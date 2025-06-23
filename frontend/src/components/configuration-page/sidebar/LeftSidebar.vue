<script setup lang="ts">
import { Valory } from '@/components/icons'
import { ProfileMenu } from './profile-menu'
</script>

<template>
  <aside class="mt-2 flex justify-between h-full w-56 flex-col pb-2 transition-all">
    <div @click="$router.push('/')" class="relative flex cursor-pointer items-center gap-2">
      <Valory class="size-6" />
      <span
        class="font-valory mt-px inline-block bg-linear-to-b from-[#f2f2f2] to-[#dddddd] bg-clip-text text-base leading-none text-transparent"
        >VALORY</span
      >
    </div>
    <div class="flex flex-col gap-1">
      <ProfileMenu />
    </div>
  </aside>
</template>