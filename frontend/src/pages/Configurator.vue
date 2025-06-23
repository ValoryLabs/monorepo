<script setup lang="ts">
import { Content } from '@/components/configuration-page'
import { LeftSidebar, RightSidebar} from '@/components/configuration-page/sidebar/'
import { useOverlayStore, useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'
import { useHead } from '@unhead/vue'
import { Settings } from '@/components/configuration-page/settings'
import { useI18n } from 'vue-i18n'
import { ConfiguratorLayout } from "@/layouts";

const { t } = useI18n()

useHead({
  title: t('pages.configurator'),
})

const userStore = useUserStore()
const overlayStore = useOverlayStore()
const { fullscreen, configuratorActive } = storeToRefs(userStore)

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
  <ConfiguratorLayout>
    <div
      class="relative flex w-dvw flex-row gap-3 h-dvh"
      :class="fullscreen ? 'p-0' : 'p-3'"
    >
      <LeftSidebar/>
      <Content />
      <Settings />
      <RightSidebar />
    </div>
  </ConfiguratorLayout>
</template>
