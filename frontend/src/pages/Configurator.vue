<script setup lang="ts">
import Content from '@/components/Content.vue'
import { LeftSidebar } from '@/components/sidebar/'
import { useOverlayStore, useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'
import { useHead } from '@unhead/vue'
import { Settings } from '@/components/settings'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: t('pages.configurator'),
})

const userStore = useUserStore()
const overlayStore = useOverlayStore()
const { showHeader, configuratorActive } = storeToRefs(userStore)

const resetKeyString = userStore.resetShortcut
const fullKeyString = userStore.fullShortcut

const { [resetKeyString]: resetKeyPressed, [fullKeyString]: fullKeyPressed } = useMagicKeys()

watch(resetKeyPressed, (v) => {
  if (v && configuratorActive) {
    overlayStore.reset()
    console.log(`Reset triggered by ${resetKeyString}`)
  }
})

watch(fullKeyPressed, (v) => {
  if (v && configuratorActive) {
    userStore.toggleSidebar()
    console.log(`Fullscreen triggered by ${fullKeyString}`)
  }
})
</script>

<template>
  <div
    class="relative flex w-dvw flex-row gap-1 p-1 px-5 pb-2"
    :class="showHeader ? 'h-[calc(100dvh-3rem)]' : 'h-dvh'"
  >
    <LeftSidebar />
    <Content />
    <Settings />
  </div>
</template>
