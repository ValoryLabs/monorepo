<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { LeftSidebar } from '@/components/features/configuration-page/left-sidebar'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const { configuratorActive } = storeToRefs(userStore)

const fullKeyString = userStore.fullShortcut

const { [fullKeyString]: fullKeyPressed } = useMagicKeys()

watch(fullKeyPressed, (v) => {
  if (v && configuratorActive) {
    userStore.toggleFullscreen()
  }
})
</script>

<template>
  <div class="inline-flex w-dvw h-dvh overflow-x-hidden">
    <LeftSidebar />
    <main class="inline-flex w-dvw h-dvh bg-background overflow-scroll">
      <router-view />
    </main>
  </div>
</template>
