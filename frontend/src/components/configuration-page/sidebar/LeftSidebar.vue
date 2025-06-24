<script setup lang="ts">
import { Valory } from '@/components/icons'
import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ProfileMenu } from './profile-menu'

const userStore = useUserStore()
const { fullscreen } = storeToRefs(userStore)
</script>

<template>
  <aside
    v-if="!fullscreen"
    class="fixed z-50 top-2 left-2 border flex justify-between rounded-lg h-[calc(100%-1rem)] w-61 flex-col p-2 transition-all bg-background"
  >
    <div @click="$router.push('/')" class="relative flex m-2 cursor-pointer items-center gap-2">
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
