<script setup lang="ts">
import { LeftSidebar } from '@/components/configuration-page/sidebar/left-sidebar'
import { useUserStore } from '@/stores'
import { useMagicKeys } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

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
    <main class="inline-flex w-dvw h-dvh bg-background">
      <router-view />
    </main>
  </div>
</template>
