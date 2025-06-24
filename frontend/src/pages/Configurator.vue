<script setup lang="ts">
import { Content } from '@/components/configuration-page'
import { Settings } from '@/components/configuration-page/settings'
import { LeftSidebar, RightSidebar } from '@/components/configuration-page/sidebar/'
import { ConfiguratorLayout } from '@/layouts'
import { useOverlayStore, useUserStore } from '@/stores'
import { useHead } from '@unhead/vue'
import { useMagicKeys } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: t('pages.configurator'),
})

const userStore = useUserStore()
const overlayStore = useOverlayStore()
const { configuratorActive } = storeToRefs(userStore)

const resetKeyString = userStore.resetShortcut
const fullKeyString = userStore.fullShortcut

const { [resetKeyString]: resetKeyPressed, [fullKeyString]: fullKeyPressed } = useMagicKeys()

watch(resetKeyPressed, (v) => {
  if (v && configuratorActive) {
    overlayStore.reset()
  }
})

watch(fullKeyPressed, (v) => {
  if (v && configuratorActive) {
    userStore.toggleFullscreen()
  }
})
</script>

<template>
  <ConfiguratorLayout>
    <LeftSidebar />
    <Content />
    <Settings />
    <RightSidebar />
  </ConfiguratorLayout>
</template>
