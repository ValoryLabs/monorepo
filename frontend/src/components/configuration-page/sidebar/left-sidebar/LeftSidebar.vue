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
    <div class="pl-5 pt-2">
      <div
        @click="$router.push('/')"
        class="relative flex cursor-pointer items-center justify-baseline gap-2 py-3"
      >
        <Valory class="size-6" />
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
