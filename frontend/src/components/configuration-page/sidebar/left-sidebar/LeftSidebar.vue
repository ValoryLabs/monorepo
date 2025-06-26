<script setup lang="ts">
import { Navigation } from '@/components/configuration-page/sidebar/left-sidebar'
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
    class="border flex-shrink-0 flex justify-between w-61 flex-col transition-all bg-background"
  >
    <div class="p-2 border-b border-white/10">
      <div
        @click="$router.push('/')"
        class="relative flex cursor-pointer items-center justify-center gap-2 py-3"
      >
        <Valory class="size-6" />
        <span
          class="font-valory mt-px inline-block bg-linear-to-b from-[#f2f2f2] to-[#dddddd] bg-clip-text text-base leading-none text-transparent"
          >VALORY</span
        >
      </div>
    </div>
    <Navigation />
    <div class="p-2 border-t border-white/10">
      <div class="flex flex-col gap-1">
        <ProfileMenu />
      </div>
    </div>
  </aside>
</template>
