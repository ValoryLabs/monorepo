<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useMagicKeys } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Content, RightSidebar } from '@/components/features/configuration-page/valorant'
import { useValorantOverlayStore, useUserStore } from '@/stores'

const { t } = useI18n()

useHead({
  title: t('pages.configurator.valorant'),
})

const userStore = useUserStore()
const valorantOverlayStore = useValorantOverlayStore()
const { configuratorActive } = storeToRefs(userStore)

const resetKeyString = userStore.resetShortcut

const { [resetKeyString]: resetKeyPressed } = useMagicKeys()

watch(resetKeyPressed, (v) => {
  if (v && configuratorActive) {
    valorantOverlayStore.reset()
  }
})
</script>

<template>
  <Content />
  <RightSidebar />
</template>
